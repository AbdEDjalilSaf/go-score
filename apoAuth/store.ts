// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
// import userSlice from "../features/auth/authSlice";


// export const store = configureStore({ 
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: userSlice
//     },
// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true
// });


// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
  },
});