'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, token: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCardentials: (state, action) => {
        // const { user, token } = action.payload;
        // state.user = user;
        // state.token = token;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state , action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCardentials, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;

