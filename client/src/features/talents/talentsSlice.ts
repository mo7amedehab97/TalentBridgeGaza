import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Talent {
  talent_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  bio: string | null;
  location: string | null;
  availability: 'full-time' | 'part-time' | 'unavailable';
  hourly_rate: number | null;
  profile_picture_url: string | null;
}

interface TalentsState {
  talents: Talent[];
  loading: boolean;
}

const initialState: TalentsState = {
  talents: [],
  loading: false,
};

export const fetchTalents = createAsyncThunk(
  'talents/fetchTalents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/talents');
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch talents');
    }
  }
);

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(fetchTalents.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default talentsSlice.reducer; 