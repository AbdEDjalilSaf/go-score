'use client';
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '@/features/auth/authSlice';


const welcomePage = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log("token", token);
  console.log("user", user);

const welcomeUser = user ? `Welcome ${user}` : 'Welcome';
const tokenAbber = `${token.slice(0, 9)}...`;




  return (
    <>
      <h1>{welcomeUser}</h1>
      <p>Your token: {tokenAbber}</p>
      <p>Go to the user lists</p>
    </>
  );
}

export default welcomePage
