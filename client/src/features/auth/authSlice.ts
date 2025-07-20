import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, SignInResponse } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
  accessToken?: string;
}

export interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
}

// Async Thunks
export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      }) as SignInResponse & { accessToken?: string };

      if (result?.error) {
        throw new Error(result.error);
      }

      if (!result?.accessToken) {
        throw new Error('No access token received');
      }

      // Get user data from the API
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result.accessToken}`
        },
      });

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Sign in failed'
      );
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (userData: SignUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        // Auto sign in after successful sign up
        const { email, password } = userData;
        await nextAuthSignIn('credentials', {
          redirect: false,
          email,
          password,
        });
      }

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Sign up failed'
      );
    }
  }
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await nextAuthSignOut({ redirect: false });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign out failed');
    }
  }
);

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signInThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Up
    builder.addCase(signUpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Out
    builder.addCase(signOutThunk.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer; 