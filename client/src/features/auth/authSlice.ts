import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/signin', credentials);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Sign in failed');
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/signup', userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Sign up failed');
    }
  }
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/auth/logout');
      return true;
    } catch (err: any) {
      return rejectWithValue('Sign out failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false, error: null as string | null, user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer; 