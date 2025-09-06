"use client"

import { useState, useEffect } from 'react'
import LoginForm from "./login-form"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "./refreshAuthToken"
import axios from "axios"
import LoadDash from "../loadDash"



export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
const router = useRouter();

 useEffect(() => {
  const loadRefresh = async () => {

  try {
    const token = Cookies.get('adminToken');
    const secessRefreshToken = await refreshAuthToken();
      if(secessRefreshToken){
      router.push("/admin")
      console.log("success update admin token ++++++++++",token)
      // setTimeout(()=>{
      //   window.location.reload()
      // },2000)
    }
    if(token){
        setIsLoggedIn(!!token); 
    }
   
  } catch (error) {
      let errorMessage = "Unknown error occurred"
          const refreshSuccess = await refreshAuthToken()
          if (axios.isAxiosError(error)) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  if (refreshSuccess) {
                    return loadRefresh()
                  }
                  errorMessage = "Authentication expired. Please log in again."
                  router.push("/admin/login")
                  break
                case 403:
                  if (refreshSuccess) {
                    return loadRefresh()
                  }
                  errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                  router.push("/admin/login")
                  break
                case 404:
                  errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
                  break
                case 500:
                  errorMessage = "Server error (500). Please try again later."
                  break
                default:
                  errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
              }
            } else if (error.request) {
              errorMessage = "Network error. Please check your internet connection."
            } else {
              errorMessage = `Request error: ${error.message}`
            }
          } else {
            errorMessage = error instanceof Error ? error.message : "Unknown error"
          }
          console.error("Error fetching data:", error)
          
  }
}

loadRefresh()
}, []);


 useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin")
    }
}, [isLoggedIn]);

  
  return (
    <>
      {isLoggedIn ? (
        <LoadDash />
      ) : (
        <LoginForm />
      )}
    </>
  )
}
