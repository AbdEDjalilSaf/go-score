


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: false, // default white background
  details: 'details',
  userId: '',
  flagId: '',
 
};

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    changeTokenStatus: (state, action) => {
      state.token = action.payload;
    },
    changeShowDetails: (state, action) => {
      state.details = action.payload;
    },
     changeUserId: (state, action) => {
      state.userId = action.payload;
    },
    changeFlagId: (state, action) => {
      state.flagId = action.payload;
    },
  },
});

export const { changeTokenStatus } = backgroundSlice.actions;
export const { changeShowDetails } = backgroundSlice.actions;
export const { changeUserId } = backgroundSlice.actions;
export const { changeFlagId } = backgroundSlice.actions;


export default backgroundSlice.reducer;
