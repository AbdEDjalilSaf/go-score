
// "use client"

// import type React from "react"

// import { useState } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import Layout from "@/app/admin/Layout/Layout"
// import { ArrowLeft, Plus, AlertCircle, CheckCircle } from "lucide-react"

// interface AddSkillRequest {
//   value: string
//   testClassId: number
// }

// interface AddSkillResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: number
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AddSkill() {
//   const [formData, setFormData] = useState<AddSkillRequest>({
//     value: "",
//     testClassId: 0,
//   })
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<boolean>(false)
//   const [validationErrors, setValidationErrors] = useState<{
//     value?: string
//     testClassId?: string
//   }>({})

//   const router = useRouter()

//   const validateForm = (): boolean => {
//     const errors: { value?: string; testClassId?: string } = {}

//     if (!formData.value.trim()) {
//       errors.value = "اسم المهارة مطلوب"
//     } else if (formData.value.trim().length < 2) {
//       errors.value = "اسم المهارة يجب أن يكون أكثر من حرفين"
//     }

//     if (formData.testClassId < 0) {
//       errors.testClassId = "معرف القسم يجب أن يكون رقم موجب"
//     }

//     setValidationErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const handleInputChange = (field: keyof AddSkillRequest, value: string | number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))

//     // Clear validation error when user starts typing
//     if (validationErrors[field]) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         [field]: undefined,
//       }))
//     }

//     // Clear general error
//     if (error) {
//       setError(null)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)
//       setSuccess(false)

//       const response = await axios.post<AddSkillResponse>(`${BASE_URL}/api/Skill/AddSkill`, formData, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setSuccess(true)
//         // Reset form
//         setFormData({ value: "", testClassId: 0 })

//         // Redirect after success message
//         setTimeout(() => {
//           router.push("/admin/skills")
//         }, 2000)
//       } else {
//         setError(response.data.message || "فشل في إضافة المهارة")
//         if (response.data.errors && response.data.errors.length > 0) {
//           setError(response.data.errors.join(", "))
//         }
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء إضافة المهارة"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSubmit(e)
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSubmit(e)
//               }
//               errorMessage = "ليس لديك صلاحية للوصول. قد تكون المصادقة منتهية الصلاحية."
//               router.push("/admin/login")
//               break
//             case 400:
//               errorMessage = "بيانات غير صحيحة. يرجى التحقق من المدخلات."
//               break
//             case 409:
//               errorMessage = "المهارة موجودة بالفعل."
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم (500). يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error adding skill:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = () => {
//     router.back()
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col justify-between sm:flex-row sm:items-center gap-4">
//               <div className="flex-1">
//                 <h1 className="text-2xl sm:text-3xl font-normal text-gray-800 mb-2">إضافة مهارة جديدة</h1>
//                 <p className="text-gray-600 text-sm sm:text-base">أضف مهارة جديدة إلى النظام</p>
//               </div>
//               <button
//                 onClick={handleCancel}
//                 className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 self-start"
//                 type="button"
//               >
//                 العودة
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//               </button>
//             </div>
//           </div>

//           {/* Success Message */}
//           {success && (
//             <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
//               <div className="flex items-center">
//                 <CheckCircle className="h-5 w-5 text-green-400 ml-3" />
//                 <div>
//                   <h3 className="text-sm font-medium text-green-800">تم إضافة المهارة بنجاح!</h3>
//                   <p className="text-sm text-green-700 mt-1">سيتم توجيهك إلى قائمة المهارات خلال ثانيتين...</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center">
//                 <AlertCircle className="h-5 w-5 text-red-400 ml-3" />
//                 <div>
//                   <h3 className="text-sm font-medium text-red-800">خطأ</h3>
//                   <p className="text-sm text-red-700 mt-1">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Form */}
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="px-4 sm:px-6 py-4 bg-purple-700">
//               <h2 className="text-lg font-medium text-white">معلومات المهارة</h2>
//             </div>

//             <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
//               {/* Skill Name Field */}
//               <div>
//                 <label htmlFor="skillValue" className="block text-sm font-medium text-gray-700 mb-2">
//                   اسم المهارة <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="skillValue"
//                   value={formData.value}
//                   onChange={(e) => handleInputChange("value", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     validationErrors.value
//                       ? "border-red-300 bg-red-50"
//                       : "border-gray-300 bg-white hover:border-gray-400"
//                   }`}
//                   placeholder="أدخل اسم المهارة"
//                   disabled={loading}
//                 />
//                 {validationErrors.value && <p className="mt-1 text-sm text-red-600">{validationErrors.value}</p>}
//               </div>

//               {/* Test Class ID Field */}
//               <div>
//                 <label htmlFor="testClassId" className="block text-sm font-medium text-gray-700 mb-2">
//                   معرف القسم
//                 </label>
//                 <input
//                   type="number"
//                   id="testClassId"
//                   value={formData.testClassId}
//                   onChange={(e) => handleInputChange("testClassId", Number.parseInt(e.target.value) || 0)}
//                   className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     validationErrors.testClassId
//                       ? "border-red-300 bg-red-50"
//                       : "border-gray-300 bg-white hover:border-gray-400"
//                   }`}
//                   placeholder="أدخل معرف القسم (اختياري)"
//                   min="0"
//                   disabled={loading}
//                 />
//                 {validationErrors.testClassId && (
//                   <p className="mt-1 text-sm text-red-600">{validationErrors.testClassId}</p>
//                 )}
//                 <p className="mt-1 text-xs text-gray-500">اتركه 0 إذا لم يكن مرتبط بقسم معين</p>
//               </div>

//               {/* Form Actions */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="submit"
//                   disabled={loading || success}
//                   className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
//                 >
//                   {loading ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الإضافة...
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="h-5 w-5 ml-2" />
//                       إضافة المهارة
//                     </>
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={loading}
//                   className="flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Help Text */}
//           <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="mr-3">
//                 <h3 className="text-sm font-medium text-blue-800">نصائح</h3>
//                 <div className="mt-2 text-sm text-blue-700">
//                   <ul className="list-disc list-inside space-y-1">
//                     <li>اسم المهارة مطلوب ويجب أن يكون وصفياً</li>
//                     <li>معرف القسم اختياري - اتركه 0 إذا لم يكن مرتبط بقسم</li>
//                     <li>تأكد من عدم وجود مهارة بنفس الاسم</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }











"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import Cookies from "js-cookie"
import Layout from "@/app/admin/Layout/Layout"
import { ArrowLeft, Plus, AlertCircle, CheckCircle, Info } from "lucide-react"

interface AddSkillRequest {
  value: string
  testClassId: number
}

interface AddSkillResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: number
}

interface TestClass {
  id: number
  value: string
  testTypeId: number
}

interface TestClassResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: TestClass[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function AddSkill() {
  const [formData, setFormData] = useState<AddSkillRequest>({
    value: "",
    testClassId: 0,
  })
  const [testClasses, setTestClasses] = useState<TestClass[]>([])
  const [loadingTestClasses, setLoadingTestClasses] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<{
    value?: string
    testClassId?: string
  }>({})

  const router = useRouter()

  // Fetch test classes on component mount
  useEffect(() => {
    fetchTestClasses()
  }, [])

  const fetchTestClasses = async () => {
    try {
      setLoadingTestClasses(true)
      const response = await axios.get<TestClassResponse>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      })

      if (response.data.succeeded) {
        setTestClasses(response.data.data)
      } else {
        console.error("Failed to fetch test classes:", response.data.message)
      }
    } catch (error) {
      console.error("Error fetching test classes:", error)
    } finally {
      setLoadingTestClasses(false)
    }
  }

  const validateForm = (): boolean => {
    const errors: { value?: string; testClassId?: string } = {}

    if (!formData.value.trim()) {
      errors.value = "اسم المهارة مطلوب"
    } else if (formData.value.trim().length < 2) {
      errors.value = "اسم المهارة يجب أن يكون أكثر من حرفين"
    }

    if (formData.testClassId < 0) {
      errors.testClassId = "معرف القسم يجب أن يكون رقم موجب"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof AddSkillRequest, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }

    // Clear general error
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const response = await axios.post<AddSkillResponse>(`${BASE_URL}/api/Skill/AddSkill`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        setSuccess(true)
        // Reset form
        setFormData({ value: "", testClassId: 0 })
        // Redirect after success message
        setTimeout(() => {
          router.push("/admin/pages/analysis")
        }, 2000)
      } else {
        setError(response.data.message || "فشل في إضافة المهارة")
        if (response.data.errors && response.data.errors.length > 0) {
          setError(response.data.errors.join(", "))
        }
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء إضافة المهارة"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleSubmit(e)
              }
              errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleSubmit(e)
              }
              errorMessage = "ليس لديك صلاحية للوصول. قد تكون المصادقة منتهية الصلاحية."
              router.push("/admin/login")
              break
            case 400:
              errorMessage = "بيانات غير صحيحة. يرجى التحقق من المدخلات."
              break
            case 409:
              errorMessage = "المهارة موجودة بالفعل."
              break
            case 500:
              errorMessage = "خطأ في الخادم (500). يرجى المحاولة لاحقاً."
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }

      console.error("Error adding skill:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-800 mb-2 truncate">
                  إضافة مهارة جديدة
                </h1>
                <p className="text-sm sm:text-base text-gray-600">أضف مهارة جديدة إلى النظام</p>
              </div>
              <button
                onClick={handleCancel}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto w-full"
                type="button"
              >
                العودة
                <ArrowLeft className="h-4 w-4 mr-2" />
              </button>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 ml-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-green-800">تم إضافة المهارة بنجاح!</h3>
                  <p className="text-sm text-green-700 mt-1">سيتم توجيهك إلى قائمة المهارات خلال ثانيتين...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 ml-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-red-800">خطأ</h3>
                  <p className="text-sm text-red-700 mt-1 break-words">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-4 bg-purple-700 sm:px-6">
              <h2 className="text-lg font-medium text-white">معلومات المهارة</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <div className="space-y-6">
                {/* Skill Name Field */}
                <div>
                  <label htmlFor="skillValue" className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المهارة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="skillValue"
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base ${
                      validationErrors.value
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    placeholder="أدخل اسم المهارة"
                    disabled={loading}
                  />
                  {validationErrors.value && <p className="mt-1 text-sm text-red-600">{validationErrors.value}</p>}
                </div>

                {/* Test Class Selection */}
                <div>
                  <label htmlFor="testClassId" className="block text-sm font-medium text-gray-700 mb-2">
                    القسم
                  </label>
                  {loadingTestClasses ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500">
                      جاري تحميل الأقسام...
                    </div>
                  ) : (
                    <select
                      id="testClassId"
                      value={formData.testClassId}
                      onChange={(e) => handleInputChange("testClassId", Number.parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base ${
                        validationErrors.testClassId
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                      disabled={loading}
                    >
                      <option value={0}>بدون قسم محدد</option>
                      {testClasses.map((testClass) => (
                        <option key={testClass.id} value={testClass.id}>
                          {testClass.value}
                        </option>
                      ))}
                    </select>
                  )}
                  {validationErrors.testClassId && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.testClassId}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">اختر القسم المناسب</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-gray-200 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة المهارة
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-400 ml-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-blue-800">نصائح</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>اسم المهارة مطلوب ويجب أن يكون وصفياً</li>
                    <li>يمكنك ربط المهارة بقسم معين أو تركها بدون قسم</li>
                    <li>تأكد من عدم وجود مهارة بنفس الاسم</li>
                    <li>استخدم أسماء واضحة ومفهومة للمهارات</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
