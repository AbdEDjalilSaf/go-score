'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from "@/app/api/auth";
// import { setCardentials } from "@/features/auth/authSlice"
// import { useDispatch } from "react-redux"
import Cookies from 'js-cookie';

// Define the response type from registerUser function
interface RegisterResponse {
  succeeded: boolean;
  data?: {
    user?: {
      id: string;
      email: string;
      // Add other user properties as needed
    };
    accessToken?: string;
    name: string;
  };
  error?: string;
}

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // const dispatch = useDispatch()
  
  const register = async(name: string, password: string, email: string, code: string): Promise<void> => {
    setError(null);
    
    // console.log("register started", { name, email, password, code });

    const { succeeded, data, error: registrationError }: RegisterResponse = await registerUser(name, password, email, code);

    // const userData = data;
    console.log("User Sign Up Data:", data, "=====", data?.name, "++++++++", data?.accessToken); // Log the response to verify its structure
    
      // Save to Redux
      // dispatch(setCardentials({ accessToken: data.accessToken, name: data?.name }));
      
      // Save to cookies
    
    if (succeeded && data && data.accessToken) {
      // Save the access token to cookies
      Cookies.set("accessToken", data.accessToken, {
        expires: 7, // Token expires in 1 days
        path: "/", // Available across the entire site
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict", // Restrict to same site to prevent CSRF
      });

      router.push("/dashboard/dashStudent");
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } else {
      setError(registrationError || "Register failed")
    }
  };

  return { register, error };
};