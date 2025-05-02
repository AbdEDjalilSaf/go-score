"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "../api/auth"
import Cookies from "js-cookie"
// import { setCardentials } from "@/features/auth/authSlice"
// import { useDispatch } from "react-redux"

// Define the response type from loginUser function
interface LoginResponse {
  succeeded: boolean
  data?: {
    accessToken?: string
    name?: {
      id: string
      email: string
      // Add other user properties as needed
    }
  }
  error?: string
}

export const useLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  // const dispatch = useDispatch()

  const login = async (email: string, password: string): Promise<void> => {
    setError(null)

    // console.log("login started", { email, password });

    const { succeeded, data, error: loginError }: LoginResponse = await loginUser(email, password)

    // const userData = data;
    console.log("User Data:", data, data?.name, data?.accessToken) // Log the response to verify its structure

    // if (data) {
    //   dispatch(setCardentials({ accessToken: data.accessToken, name: data.name }));
    // } else {
    //   console.error("userData is undefined");
    // }

    // console.log("Login response:", { succeeded, data, loginError });

    if (succeeded && data && data.accessToken) {
      // Save the access token to cookies
      Cookies.set("accessToken", data.accessToken, {
        expires: 1, // Token expires in 1 days
        path: "/", // Available across the entire site
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict", // Restrict to same site to prevent CSRF
      });

      router.push("/dashboard/dashStudent");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(loginError || "Login failed")
    }
  }

  return { login, error }
}
