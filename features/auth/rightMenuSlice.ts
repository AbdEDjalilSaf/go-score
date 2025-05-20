import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  titleGlobal: '',
};

export const backgroundSlice = createSlice({
  name: 'rightMenu',
  initialState,
  reducers: {
    changeTitleGlobal: (state, action) => {
      state.titleGlobal = action.payload;
    },
  },
});

export const { changeTitleGlobal } = backgroundSlice.actions;

export default backgroundSlice.reducer;