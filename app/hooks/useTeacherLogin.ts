// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { loginUser } from "@/app/api/auth"
// import { changeGlobalEmail,changeTitleGlobal, changeGlobalPassword } from "@/features/auth/authSlice"
// import { useDispatch } from "react-redux"
// import Cookies from "js-cookie"

// interface LoginResponse {
//   succeeded: boolean
//   data?: {
//     user?: {
//       id: string
//       email: string
//     }
//     accessToken?: string
//     firstName: string
//     lastName: string
//   }
//   error?: string
// }

// interface UseLoginReturn {
//   login: (email: string, password: string) => Promise<void>
//   error: string | null
//   isLoading: boolean
// }

// export const useLogin = (): UseLoginReturn => {
//   const router = useRouter()
//   const dispatch = useDispatch()
//   const [error, setError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const login = async (email: string, password: string): Promise<void> => {
//     setError(null)
//     setIsLoading(true)

//     try {
//       const { succeeded, data, error: loginError }: LoginResponse = await loginUser(email, password)

//       if (succeeded && data?.accessToken) {
//         // Update Redux store
//         dispatch(changeTitleGlobal(true))
//         dispatch(changeGlobalEmail(email))
//         dispatch(changeGlobalPassword(password))

//         // Save access token to cookies
//         Cookies.set("accessToken", data.accessToken, {
//           expires: 7, // Token expires in 7 days
//           path: "/",
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//         })

//         // Save user name to localStorage
//         const fullName = `${data.firstName} ${data.lastName}`
//         localStorage.setItem("userName", fullName)

//         // Navigate to dashboard
//         router.push("/dashboard/dashTeacher")

//         // dispatch(changeGlobalLeftLogoButton('لوحتي التعليمية'));

//         // setTimeout(()=> {
//         // window.location.reload();
//         // }, 1200);

//       } else {
//         setError(loginError || "Login failed. Please try again.")
//       }
//     } catch (err) {
//       console.error("Login error:", err)
//       setError("An unexpected error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return { login, error, isLoading }
// }
