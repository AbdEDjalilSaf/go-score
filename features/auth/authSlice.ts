'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: null, accessToken: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCardentials: (state, action) => {
        // const { user, token } = action.payload;
        // state.user = user;
        // state.token = token;
      state.name = action.payload.user;
      state.accessToken = action.payload.token;
    },
    logout: (state , action) => {
      state.name = null;
      state.accessToken = null;
    },
  },
});

export const { setCardentials, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.name;
export const selectCurrentToken = (state: any) => state.auth.accessToken;

