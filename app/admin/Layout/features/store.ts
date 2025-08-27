// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
  },
});