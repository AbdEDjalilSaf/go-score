// "use client"

// import { useState, useEffect } from 'react'
// import LoginForm from "./login-form"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "./refreshAuthToken"
// import axios from "axios"
// import LoadDash from "../loadDash"



// export default function Page() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [isRefreshingToken, setIsRefreshingToken] = useState(false)
// const router = useRouter();

// //  useEffect(() => {
// //   const loadRefresh = async () => {

// //   try {
// //     const token = Cookies.get('adminToken');
// //     const secessRefreshToken = await refreshAuthToken();
// //       if(secessRefreshToken){
// //       router.push("/admin")
// //       console.log("success update admin token ++++++++++",token)
// //       // setTimeout(()=>{
// //       //   window.location.reload()
// //       // },2000)
// //     }
// //     if(token){
// //         setIsLoggedIn(!!token); 
// //     }
   
// //   } catch (error) {
// //       let errorMessage = "Unknown error occurred"
// //           const refreshSuccess = await refreshAuthToken()
// //           if (axios.isAxiosError(error)) {
// //             if (error.response) {
// //               switch (error.response.status) {
// //                 case 401:
// //                   if (refreshSuccess) {
// //                     return loadRefresh()
// //                   }
// //                   errorMessage = "Authentication expired. Please log in again."
// //                   router.push("/admin/login")
// //                   break
// //                 case 403:
// //                   if (refreshSuccess) {
// //                     return loadRefresh()
// //                   }
// //                   errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
// //                   router.push("/admin/login")
// //                   break
// //                 case 404:
// //                   errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
// //                   break
// //                 case 500:
// //                   errorMessage = "Server error (500). Please try again later."
// //                   break
// //                 default:
// //                   errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
// //               }
// //             } else if (error.request) {
// //               errorMessage = "Network error. Please check your internet connection."
// //             } else {
// //               errorMessage = `Request error: ${error.message}`
// //             }
// //           } else {
// //             errorMessage = error instanceof Error ? error.message : "Unknown error"
// //           }
// //           console.error("Error fetching data:", error)
          
// //   }
// // }

// // loadRefresh()
// // }, []);

// useEffect(() => {
//   const returnToken = async () => {
//     const token = Cookies.get("adminToken")
//     if (!token) {
//       setIsLoggedIn(true)
//       try {
//         const refreshSuccess = await refreshAuthToken()
//         if (refreshSuccess) {
//           router.push("/admin")
//         }
//       } catch (error) {
//         console.error("Token refresh failed:", error)
//       } finally {
//         setIsLoggedIn(false)
//       }
//     }
//   }
//   returnToken()
// }, [router])


// //  useEffect(() => {
// //     if (isLoggedIn) {
// //       router.push("/admin")
// //     }
// // }, [isLoggedIn]);

  
//   return (
//     <>
//       {isLoggedIn ? (
//         <LoadDash />
//       ) : (
//         <LoginForm />
//       )}
//     </>
//   )
// }

















// "use client"

// import { useState, useEffect } from 'react'
// import LoginForm from "./login-form"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "./refreshAuthToken"
// // import axios from "axios"
// import LoadDash from "../loadDash"

// export default function Page() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [isRefreshingToken, setIsRefreshingToken] = useState(false)
//   const router = useRouter();

//   useEffect(() => {
//     const returnToken = async () => {
//       const token = Cookies.get("adminToken")
//       if (!token) {
//         setIsLoggedIn(true)
//         setIsRefreshingToken(true) // Start loading
//         try {
//           const refreshSuccess = await refreshAuthToken()
//           if (refreshSuccess) {
//             router.push("/admin")
//           }
//         } catch (error) {
//           console.error("Token refresh failed:", error)
//         } finally {
//           setIsLoggedIn(false)
//           setIsRefreshingToken(false) // Stop loading
//         }
//       }
//     }
//     returnToken()
//   }, [router])



//   return (
//     <>
//       {isRefreshingToken ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : isLoggedIn ? (
//         <LoadDash />
//       ) : (
//         <LoginForm />
//       )}
//     </>
//   )
// }












"use client"

import { useState, useEffect } from 'react'
import LoginForm from "./login-form"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "./refreshAuthToken"
import LoadDash from "../loadDash"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRefreshingToken, setIsRefreshingToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Added loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("adminToken")
      
      // If token exists, redirect immediately
      if (token) {
        router.push("/admin")
        return
      }
      
      // If no token exists, try to refresh
      setIsRefreshingToken(true)
      try {
        const refreshSuccess = await refreshAuthToken()
        if (refreshSuccess) {
          router.push("/admin")
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error("Token refresh failed:", error)
        setIsLoggedIn(false)
      } finally {
        setIsRefreshingToken(false)
        setIsLoading(false) // Stop loading when done
      }
    }

    checkAuth()
  }, [router])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : isLoggedIn ? (
        <LoadDash />
      ) : (
        <LoginForm />
      )}
    </>
  )
}