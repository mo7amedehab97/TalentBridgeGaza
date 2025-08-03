import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role?: {
    id: number;
    name: string;
  };
  talentProfile?: {
    bio?: string;
    location?: string;
    hourlyRate?: number;
    yearOfExperience?: number;
    profilePictureUrl?: string;
    cvUrl?: string;
  };
  recruiterProfile?: {
    companyName?: string;
    companyTitle?: string;
    description?: string;
    imageUrl?: string;
  };
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
}

export interface ProfileState {
  userProfile: UserProfile | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
}

// Async Thunks
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch profile');
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ userId, data }: { userId: string; data: ProfileUpdateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/users/${userId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to update profile');
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        axiosError.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Initial state
const initialState: ProfileState = {
  userProfile: null,
  loading: false,
  updating: false,
  error: null,
};

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfile: (state) => {
      state.userProfile = null;
      state.loading = false;
      state.updating = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileError, resetProfile } = profileSlice.actions;
export default profileSlice.reducer; 