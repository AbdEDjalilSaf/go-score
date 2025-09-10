import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { ApiResponse } from '../types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export interface StartTestRequest {
  skillIds: number[];
  count: number;
}

export interface ApiStartTestResponse<T> {
  meta?: string;
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data: T;
}


// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshSuccess = await refreshAuthToken();
        if (refreshSuccess) {
          const token = Cookies.get('accessToken');
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Redirect to login or handle auth failure
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Refresh token function (implement based on your auth system)
// export const refreshAuthToken = async (): Promise<boolean> => {
//   try {
//     const refreshToken = Cookies.get('refreshToken');
//     if (!refreshToken) return false;

//     const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
//       refreshToken,
//     });

//     const { accessToken } = response.data;
//     Cookies.set('accessToken', accessToken);
//     return true;
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     Cookies.remove('accessToken');
//     Cookies.remove('refreshToken');
//     return false;
//   }
// };

// API service functions
export const getAnalyticalStatistics = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>('/api/Statistics/GetAnalyticalStatistics');
  return response.data;
};

export default apiClient;
















// API service functions
export interface Choice {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  value: string;
  answer: string;
  skillId: number;
  choices: Choice[];
}

export interface QuestionsResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: Question[];
}

export interface AnalyticalStatisticsResponse {
  data: {
    testTypes: any[];
  };
}


// Existing function (keeping your current implementation)
// export const getAnalyticalStatistics = async (): Promise<AnalyticalStatisticsResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/analytics/statistics`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add authorization header if needed
//         // 'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching analytical statistics:', error);
//     throw error;
//   }
// };

// New function to get all questions
// export const getAllQuestions = async (): Promise<QuestionsResponse> => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/Question/GetAllQuestions`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add authorization header if needed
//         // 'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: QuestionsResponse = await response.json();
    
//     if (!data.succeeded) {
//       throw new Error(data.message || 'Failed to fetch questions');
//     }

//     return data;
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     throw error;
//   }
// };

// Helper function to get questions by skill ID
export const getQuestionsBySkillId = async (skillId: number): Promise<Question[]> => {
  try {
    const response = await getAllQuestions();
    return response.data.filter(question => question.skillId === skillId);
  } catch (error) {
    let errorMessage = "Unknown error occurred"
    const refreshSuccess = await refreshAuthToken()

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (refreshSuccess) {
              return getQuestionsBySkillId(skillId)
            }
            errorMessage = "Authentication expired. Please log in again."
            window.location.href = "/login"
            break
          case 403:
            if (refreshSuccess) {
              return getQuestionsBySkillId(skillId)
            }
            errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
            window.location.href = "/login"
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
};

// Helper function to get questions by multiple skill IDs
export const getQuestionsBySkillIds = async (skillIds: number[]): Promise<Question[]> => {
  try {
    const response = await getAllQuestions();
    return response.data.filter(question => skillIds.includes(question.skillId));
  } catch (error) {
    let errorMessage = "Unknown error occurred"
    const refreshSuccess = await refreshAuthToken()

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (refreshSuccess) {
              return getQuestionsBySkillIds(skillIds)
            }
            errorMessage = "Authentication expired. Please log in again."
            window.location.href = "/login"
            break
          case 403:
            if (refreshSuccess) {
              return getQuestionsBySkillIds(skillIds)
            }
            errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
            window.location.href = "/login"
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
};












// API service functions
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-base-url.com';

// Types for API responses
export interface Choice {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  value: string;
  answer: string;
  skillId: number;
  choices: Choice[];
}

export interface QuestionsResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: Question[];
}

export interface AnalyticalStatisticsResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: {
    testTypes: any[];
  };
}

// API call function for analytical statistics (existing)
// export const getAnalyticalStatistics = async (): Promise<AnalyticalStatisticsResponse> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // Add authorization header if needed
//         // 'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching analytical statistics:', error);
//     throw error;
//   }
// };

// New API call function for getting all questions
export const getAllQuestions = async (): Promise<QuestionsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Question/GetAllQuestions`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.data;
    
    if (!data.succeeded) {
      throw new Error(data.message || 'فشل في جلب الأسئلة');
    }

    return data;
  } catch (error) {
    let errorMessage = "Unknown error occurred"
    const refreshSuccess = await refreshAuthToken()

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (refreshSuccess) {
              return getAllQuestions()
            }
            errorMessage = "Authentication expired. Please log in again."
            window.location.href = "/login"
            break
          case 403:
            if (refreshSuccess) {
              return getAllQuestions()
            }
            errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
            window.location.href = "/login"
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
};

// Function to get filtered questions based on selected skills
export const getFilteredQuestions = async (skillIds?: number[]): Promise<Question[]> => {
  try {
    const response = await getAllQuestions();
    
    if (!skillIds || skillIds.length === 0) {
      return response.data;
    }
    
    // Filter questions by selected skill IDs
    const filteredQuestions = response.data.filter(question => 
      skillIds.includes(question.skillId)
    );
    
    return filteredQuestions;
  } catch (error) {
        let errorMessage = "Unknown error occurred"
          const refreshSuccess = await refreshAuthToken()
    
          if (axios.isAxiosError(error)) {
            if (error.response) {
              switch (error.response.status) {
                case 401:
                  if (refreshSuccess) {
                    return getFilteredQuestions()
                  }
                  errorMessage = "Authentication expired. Please log in again."
                  window.location.href = "/login"
                  break
                case 403:
                  if (refreshSuccess) {
                    return getFilteredQuestions()
                  }
                  errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                  window.location.href = "/login"
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
};











// New API function for starting tests
export const startTest = async (request: StartTestRequest): Promise<ApiStartTestResponse<Question[]>> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Question/StartTest`,
        request,
      {
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log("response =========", response.data)
    if (!response.data) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error starting test:', error);
    throw error;
  }
};