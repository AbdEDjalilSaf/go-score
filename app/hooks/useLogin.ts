"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/app/api/auth"
import { changeGlobalEmail,changeTitleGlobal, changeGlobalPassword } from "@/features/auth/authSlice"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
// import axios from "axios"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"

interface LoginResponse {
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

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>
  error: string | null
  isLoading: boolean
}


export const useLogin = (): UseLoginReturn => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)



  const login = async (email: string, password: string): Promise<void> => {
    setError(null)
    setIsLoading(true)

    try {
      const { succeeded, data, error: loginError }: LoginResponse = await loginUser(email, password)

      if (succeeded && data?.jwtAuthResult?.accessToken) {
        // Update Redux store
        dispatch(changeTitleGlobal(true))
        dispatch(changeGlobalEmail(email))
        dispatch(changeGlobalPassword(password))

        // Save access token to cookies
        Cookies.set("accessToken", data.jwtAuthResult.accessToken, {
          expires: 7, // Token expires in 7 days
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

        // dispatch(changeGlobalLeftLogoButton('لوحتي التعليمية'));

        // setTimeout(()=> {
        // window.location.reload();
        // }, 1200);

      } else {
        setError(loginError || "Login failed. Please try again.")
      }
    } catch (error) {
          // let errorMessage = "Unknown error occurred"
      
          // if (axios.isAxiosError(error)) {
          //   if (error.response) {
          //     switch (error.response.status) {
          //       case 401:
          //         // Token expired or invalid
          //         errorMessage = "Authentication expired. Please log in again."
          //         // Clear the expired token
          //         // Redirect to login or refresh token
          //         window.location.href = '/admin/login'
          //         break
          //       case 403:
      
          //         // Try to refresh token if you have refresh token logic
          //         // const refreshSuccess = await refreshAuthToken()
          //         // if (refreshSuccess) {
          //         //   return getAnalyticalStatistics() // Retry with new token
          //         // }
          //         // Check if it's a token issue or permissions issue
          //         errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
          //         break
          //       case 404:
          //         errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
          //         break
          //       case 500:
          //         errorMessage = "Server error (500). Please try again later."
          //         break
          //       default:
          //         errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
          //     }
          //   } else if (error.request) {
          //     errorMessage = "Network error. Please check your internet connection."
          //   } else {
          //     errorMessage = `Request error: ${error.message}`
          //   }
          // } else {
          //   errorMessage = error instanceof Error ? error.message : "Unknown error"
          // }
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, error, isLoading }
}
