import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Talent } from './types';

interface TalentsState {
  talents: Talent[];
  selectedTalent: Talent | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TalentsState = {
  talents: [],
  selectedTalent: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchTalents = createAsyncThunk(
  'talents/fetchTalents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/talents');
      if (!response.ok) {
        throw new Error('Failed to fetch talents');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTalentById = createAsyncThunk(
  'talents/fetchTalentById',
  async (talentId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/talents/${talentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch talent');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {
    clearSelectedTalent: (state) => {
      state.selectedTalent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all talents
      .addCase(fetchTalents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.talents = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch single talent
      .addCase(fetchTalentById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTalentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTalent = action.payload;
      })
      .addCase(fetchTalentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllTalents = (state: RootState) => state.talents.talents;
export const selectTalentById = (state: RootState) => state.talents.selectedTalent;
export const selectTalentsStatus = (state: RootState) => state.talents.status;
export const selectTalentsError = (state: RootState) => state.talents.error;

// Actions
export const { clearSelectedTalent } = talentsSlice.actions;

export default talentsSlice.reducer; 