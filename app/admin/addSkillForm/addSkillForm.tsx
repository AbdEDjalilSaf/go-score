// "use client"
// import React, { useState } from 'react';
// import { Plus, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
// import Cookies from 'js-cookie';

// interface ApiResponse {
//   meta: string;
//   succeeded: boolean;
//   message: string;
//   errors: string[];
//   data: number;
// }

// interface SkillFormData {
//   value: string;
//   testClassId: number;
// }

// interface Toast {
//   id: string;
//   type: 'success' | 'error';
//   message: string;
// }

// const addSkillForm: React.FC = () => {
//   const [formData, setFormData] = useState<SkillFormData>({
//     value: '',
//     testClassId: 0
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [toasts, setToasts] = useState<Toast[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';


//   const validateForm = (): boolean => {
//     const newErrors: { [key: string]: string } = {};
    
//     if (!formData.value.trim()) {
//       newErrors.value = 'Skill value is required';
//     } else if (formData.value.trim().length < 2) {
//       newErrors.value = 'Skill value must be at least 2 characters';
//     }
    
//     if (formData.testClassId < 0) {
//       newErrors.testClassId = 'Test Class ID must be a positive number';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const addToast = (type: 'success' | 'error', message: string) => {
//     const id = Math.random().toString(36).substr(2, 9);
//     const newToast: Toast = { id, type, message };
//     setToasts(prev => [...prev, newToast]);
    
//     // Remove toast after 5 seconds
//     setTimeout(() => {
//       setToasts(prev => prev.filter(toast => toast.id !== id));
//     }, 5000);
//   };

//   const removeToast = (id: string) => {
//     setToasts(prev => prev.filter(toast => toast.id !== id));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
//     setErrors({});
    
//     try {
//       // Simulate API call - replace with actual endpoint
//       const token = Cookies.get("accessToken") || ""
//       const response = await fetch(`${BASE_URL}/api/Skill/AddSkill`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           value: formData.value.trim(),
//           testClassId: formData.testClassId
//         }),
//       });
      
//       const result: ApiResponse = await response.json();
      
//       if (result.succeeded) {
//         addToast('success', result.message || 'Skill added successfully!');
//         setFormData({ value: '', testClassId: 0 });
//       } else {
//         if (result.errors && result.errors.length > 0) {
//           result.errors.forEach(error => {
//             addToast('error', error);
//           });
//         } else {
//           addToast('error', result.message || 'Failed to add skill');
//         }
//       }
//     } catch (error) {
//       // For demo purposes, simulate a successful response
//       console.log('API call would be made with:', formData);
//       addToast('success', 'Skill added successfully! (Demo mode)');
//       setFormData({ value: '', testClassId: 0 });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (field: keyof SkillFormData, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     // if (errors[field]) {
//     //   setErrors(prev => ({ ...prev, [field]: '' }));
//     // }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//               <Plus className="w-8 h-8 text-blue-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Skill</h1>
//             <p className="text-gray-600">Enhance your profile with a new skill</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="skillValue" className="block text-sm font-medium text-gray-700 mb-2">
//                   Skill Name
//                 </label>
//                 <input
//                   type="text"
//                   id="skillValue"
//                   value={formData.value}
//                   onChange={(e) => handleInputChange('value', e.target.value)}
//                   className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.value 
//                       ? 'border-red-300 bg-red-50' 
//                       : 'border-gray-300 bg-white hover:border-gray-400 focus:bg-blue-50'
//                   }`}
//                   placeholder="e.g., React Development, Data Analysis"
//                   disabled={isLoading}
//                 />
//                 {errors.value && (
//                   <div className="flex items-center mt-2 text-red-600 text-sm">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {errors.value}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="testClassId" className="block text-sm font-medium text-gray-700 mb-2">
//                   Test Class ID
//                 </label>
//                 <input
//                   type="number"
//                   id="testClassId"
//                   value={formData.testClassId}
//                   onChange={(e) => handleInputChange('testClassId', parseInt(e.target.value))}
//                   className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent  border-gray-300 bg-white hover:border-gray-400 focus:bg-blue-50
//                   `}
//                   placeholder="0"
//                   disabled={isLoading}
//                 />
//                 {errors.testClassId && (
//                   <div className="flex items-center mt-2 text-red-600 text-sm">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {errors.testClassId}
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Adding Skill...
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <Plus className="w-5 h-5 mr-2" />
//                     Add Skill
//                   </div>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <div className="fixed top-4 right-4 z-50 space-y-2">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className={`flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 ${
//               toast.type === 'success'
//                 ? 'bg-green-100/90 text-green-800 border border-green-200'
//                 : 'bg-red-100/90 text-red-800 border border-red-200'
//             }`}
//           >
//             {toast.type === 'success' ? (
//               <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
//             ) : (
//               <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
//             )}
//             <span className="text-sm font-medium mr-3">{toast.message}</span>
//             <button
//               onClick={() => removeToast(toast.id)}
//               className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default addSkillForm;


"use client"
import React, { useState } from 'react';
import { Plus, Loader2, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { getCookie } from "./utils/cookies";

interface ApiResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: number;
}

interface SkillFormData {
  value: string;
  testClassId: number;
}

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

const SkillForm: React.FC = () => {
  const [formData, setFormData] = useState<SkillFormData>({
    value: '',
    testClassId: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

        const token = Cookies.get("accessToken") || ""
  // Configure axios instance
  const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor for authentication
  apiClient.interceptors.request.use(
    (config) => {
      const getToken = () => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('accessToken') || getCookie('accessToken');
        }
        return null;
      };
      
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.value.trim()) {
      newErrors.value = 'Skill name is required';
    } else if (formData.value.trim().length < 2) {
      newErrors.value = 'Skill name must be at least 2 characters';
    } else if (formData.value.trim().length > 100) {
      newErrors.value = 'Skill name must be less than 100 characters';
    }
    
    if (formData.testClassId < 0) {
      newErrors.testClassId = 'Test Class ID must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, type, message };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await apiClient.post<ApiResponse>('/api/Skill/AddSkill', {
        value: formData.value.trim(),
        testClassId: formData.testClassId
      });
      
      const result = response.data;
      console.log('API Response:', result);
      
      if (result.succeeded) {
        addToast('success', result.message || 'Skill added successfully!');
        setFormData({ value: '', testClassId: 0 });
      } else {
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(error => {
            addToast('error', error);
          });
        } else {
          addToast('error', result.message || 'Failed to add skill');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        
        // Handle specific HTTP status codes
        if (axiosError.response?.status === 403) {
          const token = getCookie('accessToken') || localStorage.getItem('accessToken');
          if (!token) {
            addToast('error', 'Authentication required. Please log in to continue.');
          } else {
            addToast('error', 'Access denied. You may not have permission to add skills or your session has expired.');
          }
        } else if (axiosError.response?.status === 401) {
          addToast('error', 'Authentication failed. Please log in again.');
        } else if (axiosError.response?.status === 400) {
          // Try to extract validation errors from response
          if (axiosError.response?.data) {
            const errorData = axiosError.response.data;
            if (errorData.errors && errorData.errors.length > 0) {
              errorData.errors.forEach(err => addToast('error', err));
            } else if (errorData.message) {
              addToast('error', errorData.message);
            } else {
              addToast('error', 'Invalid request. Please check your input and try again.');
            }
          } else {
            addToast('error', 'Invalid request. Please check your input and try again.');
          }
        } else if (axiosError.response?.status === 500) {
          addToast('error', 'Server error. Please try again later or contact support.');
        } else if (axiosError.code === 'ECONNABORTED') {
          addToast('error', 'Request timeout. Please check your connection and try again.');
        } else if (axiosError.code === 'ERR_NETWORK') {
          addToast('error', 'Network error. Please check your internet connection.');
        } else if (axiosError.response?.data) {
          // Try to get error message from response data
          const errorData = axiosError.response.data;
          if (errorData.errors && errorData.errors.length > 0) {
            errorData.errors.forEach(err => addToast('error', err));
          } else if (errorData.message) {
            addToast('error', errorData.message);
          } else {
            addToast('error', `Request failed with status ${axiosError.response.status}`);
          }
        } else {
          addToast('error', `Request failed: ${axiosError.message}`);
        }
      } else {
        addToast('error', 'An unexpected error occurred. Please try again.');
      }
      
      console.error('Error adding skill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SkillFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Add New Skill
            </h1>
            <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
              Enhance your profile with a new skill and showcase your expertise
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skill Name Field */}
              <div className="space-y-2">
                <label htmlFor="skillValue" className="block text-sm font-semibold text-gray-700 mb-3">
                  Skill Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="skillValue"
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
                      errors.value 
                        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 bg-white hover:border-gray-300 focus:bg-blue-50/30'
                    } text-gray-900 placeholder-gray-500 font-medium`}
                    placeholder="e.g., React Development, Data Analysis, UI/UX Design"
                    disabled={isLoading}
                    maxLength={100}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {formData.value.length}/100
                  </div>
                </div>
                {errors.value && (
                  <div className="flex items-center mt-3 text-red-600 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {errors.value}
                  </div>
                )}
              </div>

              {/* Test Class ID Field */}
              <div className="space-y-2">
                <label htmlFor="testClassId" className="block text-sm font-semibold text-gray-700 mb-3">
                  Test Class ID
                </label>
                <input
                  type="number"
                  id="testClassId"
                  value={formData.testClassId}
                  onChange={(e) => handleInputChange('testClassId', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 border-gray-200 bg-white hover:border-gray-300 focus:bg-blue-50/30 text-gray-900 placeholder-gray-500 font-medium`}
                  placeholder="Enter test class ID (0 for default)"
                  disabled={isLoading}
                  min="0"
                />
                {errors.testClassId && (
                  <div className="flex items-center mt-3 text-red-600 text-sm font-medium">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {errors.testClassId}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.value.trim()}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Adding Skill...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plus className="w-6 h-6 mr-3" />
                    Add Skill
                  </div>
                )}
              </button>
            </form>

            {/* Form Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Your skill will be reviewed and added to your profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start p-4 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 border ${
              toast.type === 'success'
                ? 'bg-emerald-50/95 text-emerald-800 border-emerald-200/50 shadow-emerald-500/10'
                : 'bg-red-50/95 text-red-800 border-red-200/50 shadow-red-500/10'
            } animate-in slide-in-from-right-full`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' ? (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 ml-2 p-1.5 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillForm;