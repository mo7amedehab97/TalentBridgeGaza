import { configureStore } from '@reduxjs/toolkit';
import talentsReducer from '../features/talents/talentsSlice';

const store = configureStore({
  reducer: {
    talents: talentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 