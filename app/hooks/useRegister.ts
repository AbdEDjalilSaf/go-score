'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from "@/app/api/auth";
import { setCardentials } from "@/features/auth/authSlice"
import { useDispatch } from "react-redux"


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
  const dispatch = useDispatch()
  

const register = async(name:string,password:string,email:string,code:string): Promise<void> => {
  setError(null);
    
    
    // console.log("register started", { name, email, password, code });

const { succeeded, data, error: registrationError }: RegisterResponse = await registerUser(name, password, email, code);

// const userData = data;
console.log("User Sign Up Data:", data,"=====", data?.name,"++++++++", data?.accessToken ); // Log the response to verify its structure
if (data) {
  dispatch(setCardentials({ accessToken: data.accessToken, name: data?.name }));
} else {
  console.error("userData is undefined");
}



      if(error){ 
        console.log("error", error);
      }
    if (succeeded && data) {
      router.push("/pages/blogPage");
    } else {
      setError(registrationError || "Reason failed");
    }
  };

  return { register, error };
};

