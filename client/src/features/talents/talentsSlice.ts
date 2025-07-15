import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '@/store';

// Generic fetch thunk template
export function createFetchThunk<T>(name: string, url: string) {
  return createAsyncThunk<T, void, { rejectValue: string }>(
    `${name}/fetch`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || `Failed to fetch ${name}`);
      }
    }
  );
}

// Example: talents fetch thunk
export const fetchTalents = createFetchThunk<any[]>('talents', '/api/talents');

const talentsSlice = createSlice({
  name: 'talents',
  initialState: { talents: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch talents';
      });
  },
});

export default talentsSlice.reducer; 