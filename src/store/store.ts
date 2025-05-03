import { configureStore } from '@reduxjs/toolkit';
import talentsReducer from './features/talents/talentsSlice';

export const store = configureStore({
  reducer: {
    talents: talentsReducer,
    // Add other reducers here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 