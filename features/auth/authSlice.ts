

// src/features/background/backgroundSlice.js
// import AchievementSection from '@/app/dashboard/dashStudent/pages/analytics/achievement-section';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'قدرات', // default white background
  titleGlobal: 'الرئيسية',
  titleLogin: 'تسجيل الدخول',
  userClassType: 'الطلاب',
  skillOrSection: 'المهارات',
  testExamlutorTitle: 'اختبار كامل',
  skillIdTest: '',
  questionCountTest: '35',
  timingLeftTest: '01:00',
  responseTestLength: "",
  capacitiesFullCheck:false,
  capacitiesPartCheck:false,
  achievementChemistryCheck:false,
  achievementBiologyCheck:false,
  achievementMathCheck:false,
  achievementPhysicsCheck:false,
  globalName: "",
  globalEmail: "",
  globalPassword: "",
  globalWhatsUpPhone: "",
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
    changeTitleLogin: (state, action) => {
      state.titleLogin = action.payload;
    },
    changeTestExamlutor: (state, action) => {
      state.testExamlutorTitle = action.payload;
    },
    changeCapacitiesFullCheck: (state, action) => {
      state.capacitiesFullCheck = action.payload;
    }, 
    changeUserClassType: (state, action) => {
      state.userClassType = action.payload;
    },
    changeSkillIdTest: (state, action) => {
      state.skillIdTest = action.payload;
    },
    changeQuestionCountTest: (state, action) => {
      state.questionCountTest = action.payload;
    },
    changeTimingLeftTest: (state, action) => {
      state.timingLeftTest = action.payload;
    },
    changeSkillOrSection: (state, action) => {
      state.skillOrSection = action.payload;
    },
    changeCapacitiesPartCheck: (state, action) => {
      state.capacitiesPartCheck = action.payload;
    },
    changeAchievementChemistryCheck: (state, action) => {
      state.achievementChemistryCheck = action.payload;
    },
    changeResponseTestLength: (state, action) => {
      state.responseTestLength = action.payload;
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
      state.globalName = action.payload
    },
    changeGlobalEmail: (state, action) => {
      state.globalEmail = action.payload
    },
    changeGlobalPassword: (state, action) => {
      state.globalPassword = action.payload
    },
    changeGlobalWhatsUpPhone: (state, action) => {
      state.globalWhatsUpPhone = action.payload
    },
  },
});

export const { changeBackground } = backgroundSlice.actions;
export const { changeTitleGlobal } = backgroundSlice.actions;
export const { changeTitleLogin } = backgroundSlice.actions;
export const { changeTestExamlutor } = backgroundSlice.actions;

export const { changeCapacitiesFullCheck } = backgroundSlice.actions;
export const { changeCapacitiesPartCheck } = backgroundSlice.actions;
export const { changeAchievementChemistryCheck } = backgroundSlice.actions;
export const { changeAchievementBiologyCheck } = backgroundSlice.actions;
export const { changeAchievementMathCheck } = backgroundSlice.actions;
export const { changeAchievementPhysicsCheck } = backgroundSlice.actions;
export const { changeSkillOrSection } = backgroundSlice.actions;
export const { changeUserClassType } = backgroundSlice.actions;
export const { changeSkillIdTest } = backgroundSlice.actions;
export const { changeQuestionCountTest } = backgroundSlice.actions;
export const { changeTimingLeftTest } = backgroundSlice.actions;
export const { changeResponseTestLength } = backgroundSlice.actions;
export const { changeGlobalName, changeGlobalEmail, changeGlobalPassword, changeGlobalWhatsUpPhone } = backgroundSlice.actions

export default backgroundSlice.reducer;
