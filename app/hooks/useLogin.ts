"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { loginUser } from '../api/auth';


// Define the response type from loginUser function
interface LoginResponse {
  success: boolean;
  data?: {
    token?: string;
    user?: {
      id: string;
      email: string;
      // Add other user properties as needed
    };
  };
  error?: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const login = async (email:string,password:string): Promise<void> => {
    setError(null);
    

    // Type assertions for DOM elements
    // const emailElement = document.getElementById('email') as HTMLInputElement;
    // const passwordElement = document.getElementById('password') as HTMLInputElement;
    
    // const email = emailElement.value;
    // const password = passwordElement.value;


    console.log("login started", { email, password });

    // const { success, data, error: loginError }: LoginResponse = await loginUser(email, password);

    // console.log("Login response:", { success, data, loginError });

    // if (success && data) {
    //   router.push("/welcome");
    // } else {
    //   setError(loginError || "Login failed");
    // }
  };

  
  return { login, error };
};