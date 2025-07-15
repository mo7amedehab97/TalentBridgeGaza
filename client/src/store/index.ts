import { configureStore } from '@reduxjs/toolkit';
import talentsReducer from '../features/talents/talentsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    talents: talentsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 