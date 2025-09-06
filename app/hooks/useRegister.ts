// 'use client'

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { registerUser } from "@/app/api/auth";
// import { changeGlobalEmail, changeGlobalPassword, changeGlobalWhatsUpPhone } from "@/features/auth/authSlice"
// import { useDispatch } from "react-redux"
// // import { useNavigate } from 'react-router-dom';
// // import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';

// // Define the response type from registerUser function
// interface RegisterResponse {
//   succeeded: boolean;
//   data?: {
//     user?: {
//       id: string;
//       email: string;
//       // Add other user properties as needed
//     };
//     accessToken?: string;
//     firstName: string;
//     lastName: string;
//   };
//   error?: string;
// }

// export const useRegister = () => {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch()
//   // const navigate = useNavigate();
//   // const userTitleGlobal = useSelector((state: { background: { titleGlobal: string } }) => state.background.titleGlobal);
  
//   const register = async(firstName: string,lastName: string,email: string, password: string, code: string, whatsUpNumber: (string | null)): Promise<void> => {
//     setError(null);
//     // const whatsUpNumberVerify = whatsUpNumber || null;
//     // console.log("register started", { name, email, password, code });

//     // const whatsUpNumberStr = whatsUpNumber ?? "";
//     const { succeeded, data, error: registrationError }: RegisterResponse = await registerUser(firstName,lastName,email, password, code, whatsUpNumber);

//     // const userData = data;
//     console.log("User Sign Up Data:", data, "=====", data?.firstName, "++++++++", data?.accessToken); // Log the response to verify its structure
    
//       // Save to Redux
//       // dispatch(setCardentials({ accessToken: data.accessToken, name: data?.name }));
      
//       // Save to cookies
    
//     if (succeeded && data && data.accessToken) {
//       dispatch(changeGlobalEmail(email));
//       dispatch(changeGlobalPassword(password));
//       dispatch(changeGlobalWhatsUpPhone(whatsUpNumber));

//       // console.log("userTitleGlobal", userTitleGlobal);
//       // Save the access token to cookies
//       Cookies.set("accessToken", data.accessToken, {
//         expires: 7, // Token expires in 1 days
//         path: "/", // Available across the entire site
//         secure: process.env.NODE_ENV === "production", // Secure in production
//         sameSite: "strict", // Restrict to same site to prevent CSRF
//       });

// // Save the full name to localStorage
// const fullName = `${data.firstName} ${data.lastName}`
// localStorage.setItem("userName", fullName);
// // navigate("/dashboard/dashStudent");
// redirect("/dashboard/dashStudent");
//       // router.push("/dashboard/dashStudent");
      
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 1200);
//     } else {
//       setError(registrationError || "Register failed")
//     }
//   };

//   return { register, error };
// };





"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/api/auth"
import { changeGlobalEmail, changeTitleGlobal, changeGlobalPassword, changeGlobalWhatsUpPhone } from "@/features/auth/authSlice"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"

interface RegisterResponse {
  succeeded: boolean
  data?: {
    user?: {
      id: string
      email: string
    }
    jwtAuthResult:{
    accessToken?: string
     refreshToken: {
        tokenString: string,
        expireAt: string
      }
    },
    firstName: string
    lastName: string
  }
  error?: string
}

interface UseRegisterReturn {
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    code: string,
    whatsUpNumber: string | null,
  ) => Promise<void>
  error: string | null
  isLoading: boolean
}

export const useRegister = (): UseRegisterReturn => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  code: string,
  whatsUpNumber: string | null
): Promise<void> => {
    setError(null)
    setIsLoading(true)

    try {
      // const {
      //   succeeded,
      //   data,
      //   error: registrationError,
      // }: RegisterResponse = await registerUser(firstName, lastName, email, password, code, whatsUpNumber)

       const { succeeded, data, error: registrationError }: RegisterResponse = await registerUser(firstName,lastName,email, password, code, whatsUpNumber);

      if (succeeded && data?.jwtAuthResult?.accessToken) {
        // Update Redux store
        dispatch(changeTitleGlobal(true))
        dispatch(changeGlobalEmail(email))
        dispatch(changeGlobalPassword(password))
        dispatch(changeGlobalWhatsUpPhone(whatsUpNumber || null))

        // Save access token to cookies
        Cookies.set("accessToken", data.jwtAuthResult.accessToken, {
          expires: 30, // Token expires in 30 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        Cookies.set("refreshToken", data.jwtAuthResult.refreshToken.tokenString, {
          expires: 30, // Token expires in 30 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        // Save user name to localStorage
        const fullName = `${data.firstName} ${data.lastName}`
        localStorage.setItem("userName", fullName)

        // Navigate to dashboard
        router.push("/dashboard/dashStudent")

          //  dispatch(changeGlobalLeftLogoButton('لوحتي التعليمية'));

        // setTimeout(()=> {
        // window.location.reload();
        // }, 1200);

        // Optional: You can also use router.replace() if you don't want the user to go back
        // router.replace("/dashboard/dashStudent");
      } else {
        setError(registrationError || "Registration failed. Please try again.")
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return { register, error, isLoading }
}
