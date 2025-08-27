"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""


// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

type LoginFormData = z.infer<typeof loginSchema>

// API Response type
interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: {
    jwtAuthResult: {
    accessToken: string
    refreshToken: {
      tokenString: string
      expireAt: string
    }
    }
    firstName: string
    lastName: string
    whatsUpNumber: string
  }
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const router = useRouter()
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword] = useState(false)
  const [apiError, setApiError] = useState<string>("")
  // const [isLoggedIn, setIsLoggedIn] = useState(false)



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (apiError) {
      setApiError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setApiError("")
    const token = Cookies.get("adminToken")
    try {
      // Validate form data with Zod first
      const validatedData = loginSchema.parse(formData)

      // Check for specific credentials before making API call
      if (validatedData.email !== "abde20303@gmail.com" || validatedData.password !== "Passw0rd#") {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        })
        return
      }

      // Make API call with axios
      const apiEndpoint = API_URL ? `${API_URL}/api/Authentication/AdminSignIn` : "/api/Authentication/AdminSignIn"

      const response = await axios.post<ApiResponse>(apiEndpoint, {
        email: validatedData.email,
        password: validatedData.password,
      })

      const apiResponse = response.data

      if (apiResponse.succeeded) {
        // Login successful
        console.log("Login successful:", apiResponse)

        // Store token in localStorage (you might want to use a more secure method)
        if (apiResponse.data.jwtAuthResult.accessToken) {
          localStorage.setItem("firstName", apiResponse.data.firstName)
          localStorage.setItem("lastName", apiResponse.data.lastName)
          localStorage.setItem("whatsUpNumber", apiResponse.data.whatsUpNumber)

                  Cookies.remove("adminToken");
                  Cookies.set("adminToken", apiResponse.data.jwtAuthResult.accessToken, {
                    expires: 7, // Token expires in 7 days
                    path: "/admin",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                  })
                  console.log("refresh token success")
                
        // Save access token to cookies
        

         Cookies.set("adminRefreshToken", apiResponse.data.jwtAuthResult.refreshToken.tokenString, {
          expires: 30, // Token expires in 30 days
          path: "/admin",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

          router.push("/admin") 
        }

        // alert(`Login successful! Welcome ${apiResponse.data.firstName} ${apiResponse.data.lastName}!`)

        // You can redirect here
        // window.location.href = "/dashboard"
      } else {
        // API returned success: false
        if (apiResponse.errors && apiResponse.errors.length > 0) {
          setApiError(apiResponse.errors.join(", "))
        } else {
          setApiError(apiResponse.message || "Login failed")
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else if (axios.isAxiosError(error)) {
        // Handle axios errors
        if (error.code === "ERR_NETWORK" || error.code === "ERR_CONNECTION_REFUSED") {
          setApiError("Unable to connect to the server. Please check if the API server is running.")
        } else if (error.response?.data) {
          const apiResponse = error.response.data as ApiResponse
          if (apiResponse.errors && apiResponse.errors.length > 0) {
            setApiError(apiResponse.errors.join(", "))
          } else {
            setApiError(apiResponse.message || "Login failed")
          }
        } else {
          setApiError("Network error. Please check your connection and try again.")
        }
      } else {
        console.error("Login error:", error)
        setApiError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">اهلا بعودتك</h1>
            <p className="text-gray-600">ارجوك سجل الدخول لحسابك</p>
          </div>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                الايميل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {/* <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button> */}
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  يتم تسجيل الدخول...
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          {/* Footer */}
          {/* <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up here
              </a>
            </p>
          </div> */}

          {/* Test Credentials */}
          {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Valid credentials:</p>
            <p className="text-xs text-gray-600">Email: abde20303@gmail.com</p>
            <p className="text-xs text-gray-600">Password: Passw0rd#</p>
          </div> */}

          {/* Debug Info */}
          {/* <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-500 mb-2">Debug Info:</p>
            <p className="text-xs text-blue-600">API URL: {API_URL}</p>
            <p className="text-xs text-blue-600">Full Endpoint: {API_URL}/api/Authentication/SignIn</p>
          </div> */}
          
        </div>
      </div>
    </div>
    
  )
}
