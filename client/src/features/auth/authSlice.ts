import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, getSession } from 'next-auth/react';
import type { Session } from 'next-auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  accessToken: string;
  name?: string;
  gender?: string;
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
  gender: string;
  role: "CONTRACTOR" | "ADMIN" | "CLIENT" | "COMPANY";
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
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Get the session which now contains our user data
      const session = await getSession();
      
      if (!session?.user) {
        throw new Error('Failed to get user session');
      }

      // For now, we'll use empty strings for missing fields
      // These will be updated after the user profile is fetched
      return {
        id: session.user.id || '',
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ')[1] || '',
        email: session.user.email || '',
        phoneNumber: '', // Will be updated after fetching user profile
        roleId: session.user.roleId,
        accessToken: (session as Session).accessToken || ''
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Sign in failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (userData: SignUpData, { rejectWithValue }) => {
    try {
      // Map role to corresponding roleId
      const roleToIdMap = {
        'CONTRACTOR': 3,  // talent
        'CLIENT': 2,      // client
        'ADMIN': 1,       // admin
        'COMPANY': 2      // company maps to client role for now
      } as const;
      
      const roleId = roleToIdMap[userData.role as keyof typeof roleToIdMap] || 2; // Default to client

      const backendUserData = {
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email.trim(),
        password: userData.password,
        phoneNumber: userData.phoneNumber.trim(),
        gender: userData.gender || 'Not specified',
        roleId: roleId
      };

      const response = await axios.post<{ 
        success: boolean; 
        data: UserData;
        token: string;
        message: string;
      }>(
        `${API_URL}/api/auth/signup`,
        backendUserData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Signup failed');
      }

      // Auto sign in after successful sign up
      const signInResult = await nextAuthSignIn('credentials', {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      // Get session after successful sign in
      const session = await getSession();
      
      if (!session?.user) {
        throw new Error('Failed to get user session after signup');
      }

      return {
        id: session.user.id || '',
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ')[1] || '',
        email: session.user.email || '',
        phoneNumber: userData.phoneNumber,
        roleId: session.user.roleId,
        accessToken: (session as Session).accessToken || ''
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'Sign up failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await nextAuthSignOut({ redirect: false });
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Sign out failed';
      return rejectWithValue(errorMessage);
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
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // Store user data in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('authState', JSON.stringify({
            user: action.payload,
            loading: false,
            error: null
          }));
        }
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // Store user data in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('authState', JSON.stringify({
            user: action.payload,
            loading: false,
            error: null
          }));
        }
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });

    // Sign Out
    builder.addCase(signOutThunk.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer; 