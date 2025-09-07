import axios, { type AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { useRouter } from "next/navigation"
// import { headers } from "next/headers"

interface QuestionCountRequest {
  skills: number[]
}
const router = useRouter()
interface ApiResponse<T> {
  meta: null
  succeeded: boolean
  message: string
  errors: null
  data: T
}
// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for logging or authentication
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("Response error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export async function getQuestionsCountPossible(skills: number[]): Promise<number> {
  try {
    const token = Cookies.get("accessToken")
    const requestData: QuestionCountRequest = { skills }

    const response: AxiosResponse<ApiResponse<number>> = await apiClient.post(
      "/Question/GetQuestionsCountPossible",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const result = response.data

    if (result.succeeded) {
      return result.data
    } else {
      throw new Error(result.message || "API request failed")
    }
  } catch (error) {
     let errorMessage = "Unknown error occurred"
     const refreshSuccess = await refreshAuthToken()

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:

          if (refreshSuccess) {
              return getQuestionsCountPossible(skills) // Retry with new token
            }
            // Token expired or invalid
            errorMessage = "Authentication expired. Please log in again."
            // Clear the expired token
           router.push("/login")
            // Redirect to login or refresh token
            // window.location.href = '/login'
            break
          case 403:

            // Try to refresh token if you have refresh token logic
            if (refreshSuccess) {
              return getQuestionsCountPossible(skills) // Retry with new token
            }
            // Check if it's a token issue or permissions issue
            errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
            console.log("errorMessage",errorMessage);
          
            router.push("/login")
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
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      if (error.response) {
        // Server responded with error status
        console.error("Server error:", error.response.status, error.response.data)
        throw new Error(`Server error: ${error.response.status}`)
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network error:", error.request)
        throw new Error("Network error: No response from server")
      } else {
        // Something else happened
        console.error("Request setup error:", error.message)
        throw new Error(`Request error: ${error.message}`)
      }
    } else {
      // Non-Axios error
      console.error("Unexpected error:", error)
      throw new Error("An unexpected error occurred")
    }
  }
}



// Additional utility functions for other API calls
// export async function getExamData(examId: string): Promise<any> {
//   try {
//     const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(`/Exam/GetExamData/${examId}`)

//     const result = response.data

//     if (result.succeeded) {
//       return result.data
//     } else {
//       throw new Error(result.message || "Failed to fetch exam data")
//     }
//   } catch (error) {
//     console.error("Error fetching exam data:", error)
//     throw error
//   }
// }



// export async function submitExamAnswers(examId: string, answers: any[]): Promise<any> {
//   try {
//     const response: AxiosResponse<ApiResponse<any>> = await apiClient.post("/Exam/SubmitAnswers", {
//       examId,
//       answers,
//     })

//     const result = response.data

//     if (result.succeeded) {
//       return result.data
//     } else {
//       throw new Error(result.message || "Failed to submit exam answers")
//     }
//   } catch (error) {
//     console.error("Error submitting exam answers:", error)
//     throw error
//   }
// }


