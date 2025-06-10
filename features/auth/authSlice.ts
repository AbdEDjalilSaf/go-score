// 'use client';
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { name: null, accessToken: null };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setCardentials: (state, action) => {
//         // const { user, token } = action.payload;
//         // state.user = user;
//         // state.token = token;
//       state.name = action.payload.user;
//       state.accessToken = action.payload.token;
//     },
//     logout: (state , action) => {
//       state.name = null;
//       state.accessToken = null;
//     },
//   },
// });

// export const { setCardentials, logout } = userSlice.actions;
// export default userSlice.reducer;

// export const selectCurrentUser = (state: any) => state.auth.name;
// export const selectCurrentToken = (state: any) => state.auth.accessToken;



// src/features/background/backgroundSlice.js
// import AchievementSection from '@/app/dashboard/dashStudent/pages/analytics/achievement-section';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'قدرات', // default white background
  titleGlobal: false,
  testExamlutorTitle: 'اختبار كامل',
  capacitiesFullCheck:false,
  capacitiesPartCheck:false,
  achievementChemistryCheck:false,
  achievementBiologyCheck:false,
  achievementMathCheck:false,
  achievementPhysicsCheck:false,
  globalName:'',
  globalEmail:'',
  globalPassword:'',
  globalWhatsUpPhone:'',
};

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    changeBackground: (state, action) => {
      state.name = action.payload;
    },
    changeTitleGlobal: (state, action) => {
      state.titleGlobal = action.payload;
    },
    changeTestExamlutor: (state, action) => {
      state.testExamlutorTitle = action.payload;
    },
    changeCapacitiesFullCheck: (state, action) => {
      state.capacitiesFullCheck = action.payload;
    }, 
    changeCapacitiesPartCheck: (state, action) => {
      state.capacitiesPartCheck = action.payload;
    },
    changeAchievementChemistryCheck: (state, action) => {
      state.achievementChemistryCheck = action.payload;
    },
    changeAchievementBiologyCheck: (state, action) => {
      state.achievementBiologyCheck = action.payload;
    },
    changeAchievementMathCheck: (state, action) => {
      state.achievementMathCheck = action.payload;
    },
    changeAchievementPhysicsCheck: (state, action) => {
      state.achievementPhysicsCheck = action.payload;
    },
    changeGlobalName: (state, action) => {
      state.globalName = action.payload;
    },
    changeGlobalEmail: (state, action) => {
      state.globalEmail = action.payload;
    },
    changeGlobalPassword: (state, action) => {
      state.globalPassword = action.payload;
    },
    changeGlobalWhatsUpPhone: (state, action) => {
      state.globalWhatsUpPhone = action.payload;
    },
  },
});

export const { changeBackground } = backgroundSlice.actions;
export const { changeTitleGlobal } = backgroundSlice.actions;
export const { changeTestExamlutor } = backgroundSlice.actions;

export const { changeCapacitiesFullCheck } = backgroundSlice.actions;
export const { changeCapacitiesPartCheck } = backgroundSlice.actions;
export const { changeAchievementChemistryCheck } = backgroundSlice.actions;
export const { changeAchievementBiologyCheck } = backgroundSlice.actions;
export const { changeAchievementMathCheck } = backgroundSlice.actions;
export const { changeAchievementPhysicsCheck } = backgroundSlice.actions;
export const { changeGlobalName } = backgroundSlice.actions;
export const { changeGlobalEmail } = backgroundSlice.actions;
export const { changeGlobalPassword } = backgroundSlice.actions;
export const { changeGlobalWhatsUpPhone } = backgroundSlice.actions;

export default backgroundSlice.reducer;
