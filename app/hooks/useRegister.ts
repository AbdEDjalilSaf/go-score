'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { registerUser } from '../api/auth';



// Define the response type from registerUser function
interface RegisterResponse {
  success: boolean;
  data?: {
    user?: {
      id: string;
      fullName: string;
      email: string;
      // Add other user properties as needed
    };
    token?: string;
  };
  error?: string;
}

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

const register = async (fullName:string,email:string,password:string): Promise<void> => {
  setError(null);
    

    // Type assertions for DOM elements
    // const fullNameElement = document.getElementById('fullName') as HTMLInputElement;
    // const emailElement = document.getElementById('email') as HTMLInputElement;
    // const passwordElement = document.getElementById('password') as HTMLInputElement;
    
    console.log("register started", { fullName, email, password });


    // const fullName = fullNameElement.value;
    // const email = emailElement.value;
    // const password = passwordElement.value;

// const { success, data, error: registrationError }: RegisterResponse = await registerUser(fullName, email, password);
      
//     if (success && data) {
//       router.push("/request-form");
//     } else {
//       setError(registrationError || "Registration failed");
//     }
  };

  return { register, error };
};