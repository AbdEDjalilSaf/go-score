// "use client"

// import type React from "react"
// import Layout from "@/app/admin/Layout/Layout"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import { ArrowLeft } from "lucide-react"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"


// interface AddClassRequest {
//     value: string
//     testTypeId: number
//   }
  
//   interface AddClassResponse {
//     meta: string
//     succeeded: boolean
//     message: string
//     errors: string[]
//     data: number
//   }
  
//   interface TestType {
//     id: number
//     value: string
//   }
  
//   interface TestTypesResponse {
//     meta: string
//     succeeded: boolean
//     message: string
//     errors: string[]
//     data: TestType[]
//   }

//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AddNewClass() {
//   const [formData, setFormData] = useState<AddClassRequest>({
//     value: "",
//     testTypeId: 0,
//   })
//   const [loading, setLoading] = useState(false)
//   const [testClasses, setTestClasses] = useState<TestType[]>([])
//   const [response, setResponse] = useState<AddClassResponse | null>(null)
//   const [loadingTestClasses, setLoadingTestClasses] = useState<boolean>(true)
//   const [validationErrors, setValidationErrors] = useState<{
//     value?: string
//     testTypeId?: string
//   }>({})
//   const [error, setError] = useState<string | null>(null)

//   const router = useRouter()

//   const validateForm = (): boolean => {
//     const errors: { value?: string; testTypeId?: string } = {}

//     if (!formData.value.trim()) {
//       errors.value = "اسم المهارة مطلوب"
//     } else if (formData.value.trim().length < 2) {
//       errors.value = "اسم المهارة يجب أن يكون أكثر من حرفين"
//     }

//     if (formData.testTypeId < 0) {
//       errors.testTypeId = "معرف القسم يجب أن يكون رقم موجب"
//     }

//     setValidationErrors(errors)
//     return Object.keys(errors).length === 0
//   }


//   const handleInputChangeTestClass = (field: keyof AddClassRequest, value: string | number) => {
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

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "testTypeId" ? Number.parseInt(value) || 0 : value,
//     }))
//   }


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setResponse(null)

//     if (!validateForm()) {
//         return
//       }

//     try {
//       const result = await axios.post<AddClassResponse>("/api/TestClass/AddTestClass", 
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         })
//       setResponse(result.data)

//       if (result.data.succeeded) {
//         // Reset form on success
//         setFormData({ value: "", testTypeId: 0 })
//       }
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || err.message)
//       } else {
//         setError("An unexpected error occurred")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//    useEffect(() => {
//       fetchTestTypes()
//     }, [])


//     const fetchTestTypes = async () => {
//       try {
//         setLoadingTestClasses(true)
//         const response = await axios.get<TestTypesResponse>(`${BASE_URL}/api/TestType/GetAllTestTypes`, {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         })
  
//         if (response.data.succeeded) {
//           setTestClasses(response.data.data)
//         } else {
//           console.error("Failed to fetch test classes:", response.data.message)
//         }
//       } catch (error) {
//         console.error("Error fetching test classes:", error)
//       } finally {
//         setLoadingTestClasses(false)
//       }
//     }


//   const handleCancel = () => {
//     router.back()
//   }

//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//          {/* Header */}
//                   <div className="mb-6 sm:mb-8">
//                     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                       <div className="flex-1 min-w-0">
//                         <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-800 mb-2 truncate">
//                           إضافة قسم جديدة
//                         </h1>
//                         <p className="text-sm sm:text-base text-gray-600">أضف قسم جديدة إلى النظام</p>
//                       </div>
//                       <button
//                         onClick={handleCancel}
//                         className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto w-full"
//                         type="button"
//                       >
//                         العودة
//                         <ArrowLeft className="h-4 w-4 mr-2" />
//                       </button>
//                     </div>
//                   </div>
//         <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-900 text-center">اضف قسم جديد</h1>
//             <p className="text-gray-600 text-center mt-2">اضف قسم جديد إلى النظام</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
//                 قيمة القسم
//               </label>
//               <input
//                 type="text"
//                 id="value"
//                 name="value"
//                 value={formData.value}
//                 onChange={(e) => handleInputChangeTestClass("value",e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//                 placeholder="أدخل قيمة القسم"
//               />
//             </div>

//             {/* <div>
//               <label htmlFor="testTypeId" className="block text-sm font-medium text-gray-700 mb-2">
//                 نوع الاختبار
//               </label>
//               <select
//                 id="testTypeId"
//                 name="testTypeId"
//                 value={formData.testTypeId}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//               >
//                 <option value={0}>اختر نوع الاختبار</option>
//                 <option value={1}>اختبار 1</option>
//                 <option value={2}>اختبار 2</option>
//                 <option value={3}>اختبار 3</option>
//                 <option value={4}>اختبار 4</option>
//                 <option value={5}>اختبار 5</option>
//               </select>
//             </div> */}

//               {/* Test Class Selection */}
//               <div>
//                   <label htmlFor="testTypeId" className="block text-sm font-medium text-gray-700 mb-2">
//                     نوع الاختبار
//                   </label>
//                   {loadingTestClasses ? (
//                     <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500">
//                       جاري تحميل الاختبار...
//                     </div>
//                   ) : (
//                     <select
//                       id="testTypeId"
//                       value={formData.testTypeId}
//                       onChange={(e) => handleInputChangeTestClass("testTypeId", Number.parseInt(e.target.value) || 0)}
//                       className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-sm sm:text-base ${
//                         validationErrors.testTypeId 
//                           ? "border-red-300 bg-red-50"
//                           : "border-gray-300 bg-white hover:border-gray-400"
//                       }`}
//                       disabled={loading}
//                     >
//                       <option value={0}>بدون الاختبار محدد</option>
//                       {testClasses.map((testClass) => (
//                         <option key={testClass.id} value={testClass.id}>
//                           {testClass.value === "Qudrat" ? "قدرات" : "تحصيلي"}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                   {validationErrors.testTypeId && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors.testTypeId}</p>
//                   )}
//                   <p className="mt-1 text-xs text-gray-500">اختر الاختبار المناسب</p>
//                 </div>

//             <button
//               type="submit"
//               disabled={loading || !formData.value || formData.testTypeId === 0}
//               className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   إضافة الاختبار...
//                 </div>
//               ) : (
//                 "إضافة الاختبار"
//               )}
//             </button>
//           </form>

//           {/* Success Message */}
//           {response && response.succeeded && (
//             <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-green-800">تم اضافة الاختبار بنجاح!</h3>
//                   <p className="text-sm text-green-700 mt-1">{response.message}</p>
//                   {response.data && <p className="text-sm text-green-700 mt-1">معرف الاختبار: {response.data}</p>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {(error || (response && !response.succeeded)) && (
//             <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">خطأ</h3>
//                   <p className="text-sm text-red-700 mt-1">{error || response?.message || "فشل في إضافة الاختبار"}</p>
//                   {response && response.errors && response.errors.length > 0 && (
//                     <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
//                       {response.errors.map((err, index) => (
//                         <li key={index}>{err}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Response Details (for debugging) */}
//           {response && (
//             <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
//               <h4 className="text-sm font-medium text-gray-800 mb-2">تفاصيل الرد:</h4>
//               <div className="text-xs text-gray-600 space-y-1">
//                 <p>
//                   <span className="font-medium">Meta:</span> {response.meta}
//                 </p>
//                 <p>
//                   <span className="font-medium">تم النجاح:</span> {response.succeeded ? "نعم" : "لا"}
//                 </p>
//                 {response.data && (
//                   <p>
//                     <span className="font-medium">المعرف:</span> {response.data}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </Layout>
//   )
// }






"use client"

import type React from "react"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import { useEffect, useState } from "react"
import Layout from "@/app/admin/Layout/Layout"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie"

interface AddClassRequest {
  value: string
  testTypeId: number
}

interface AddClassResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: number
}

interface TestType {
  id: number
  value: string
}

interface TestTypesResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: TestType[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function AddNewClass() {
  const [formData, setFormData] = useState<AddClassRequest>({
    value: "",
    testTypeId: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testTypes, setTestTypes] = useState<TestType[]>([])
  const [loadingTestTypes, setLoadingTestTypes] = useState(true)
  const [validationErrors, setValidationErrors] = useState<{
    value?: string
    testTypeId?: string
  }>({})
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
    details?: string[]
  }>({ type: null, message: "" })

  const router = useRouter()

  const validateForm = (): boolean => {
    const errors: { value?: string; testTypeId?: string } = {}

    if (!formData.value.trim()) {
      errors.value = "اسم القسم مطلوب"
    } else if (formData.value.trim().length < 2) {
      errors.value = "اسم القسم يجب أن يكون أكثر من حرفين"
    }

    if (formData.testTypeId <= 0) {
      errors.testTypeId = "يجب اختيار نوع الاختبار"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof AddClassRequest, value: string | number) => {
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

    // Clear submit status
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  const fetchTestTypes = async () => {
    try {
      setLoadingTestTypes(true)
      const token = Cookies.get("adminToken")

      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة")
      }

      const response = await axios.get<TestTypesResponse>(`${BASE_URL}/api/TestType/GetAllTestTypes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        setTestTypes(response.data.data)
      } else {
        throw new Error(response.data.message || "فشل في تحميل أنواع الاختبارات")
      }
    } catch (error) {
      console.error("Error fetching test types:", error)
      setSubmitStatus({
        type: "error",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || error.message || "خطأ في الشبكة"
          : "خطأ غير متوقع في تحميل أنواع الاختبارات",
      })
    } finally {
      setLoadingTestTypes(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const token = Cookies.get("adminToken")
      setError(null)

      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة")
      }

      const response = await axios.post<AddClassResponse>(`${BASE_URL}/api/TestClass/AddTestClass`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        setSubmitStatus({
          type: "success",
          message: response.data.message || "تم إضافة القسم بنجاح",
          details: response.data.data ? [`معرف القسم: ${response.data.data}`] : undefined,
        })
        // Reset form on success
        setFormData({ value: "", testTypeId: 0 })
      } else {
        setSubmitStatus({
          type: "error",
          message: response.data.message || "فشل في إضافة القسم",
          details: response.data.errors?.length > 0 ? response.data.errors : undefined,
        })
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

  const getTestTypeDisplayName = (value: string) => {
    switch (value.toLowerCase()) {
      case "qudrat":
        return "قدرات"
      case "tahsili":
        return "تحصيلي"
      default:
        return value
    }
  }

  useEffect(() => {
    fetchTestTypes()
  }, [])

  return (
    <Layout>
    <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">إضافة قسم جديد</h1>
              <p className="text-gray-600">أضف قسم جديد إلى النظام</p>
            </div>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 sm:w-auto w-full"
              type="button"
            >
              العودة
              <ArrowLeft className="h-4 w-4 mr-2" />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-purple-600">
            <h2 className="text-xl font-semibold text-white text-center">إضافة قسم جديد</h2>
            <p className="text-white text-center mt-1">املأ النموذج أدناه لإضافة قسم جديد</p>
          </div>

          {/* Card Content */}
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Class Name Input */}
              <div className="space-y-2">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                  اسم القسم *
                </label>
                <input
                  id="value"
                  type="text"
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  placeholder="أدخل اسم القسم"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                    validationErrors.value
                      ? "border-red-300 bg-red-50 text-red-900 placeholder-red-300"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                />
                {validationErrors.value && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.value}
                  </p>
                )}
              </div>

              {/* Test Type Selection */}
              <div className="space-y-2">
                <label htmlFor="testTypeId" className="block text-sm font-medium text-gray-700">
                  نوع الاختبار *
                </label>
                {loadingTestTypes ? (
                  <div className="flex items-center justify-center py-8 bg-gray-50 rounded-md border border-gray-200">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                    <span className="mr-2 text-gray-600">جاري تحميل أنواع الاختبارات...</span>
                  </div>
                ) : (
                  <select
                    id="testTypeId"
                    value={formData.testTypeId}
                    onChange={(e) => handleInputChange("testTypeId", Number.parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                      validationErrors.testTypeId
                        ? "border-red-300 bg-red-50 text-red-900"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                  >
                    <option value={0}>اختر نوع الاختبار</option>
                    {testTypes.map((testType) => (
                      <option key={testType.id} value={testType.id}>
                        {getTestTypeDisplayName(testType.value)}
                      </option>
                    ))}
                  </select>
                )}
                {validationErrors.testTypeId && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.testTypeId}
                  </p>
                )}
                <p className="text-sm text-gray-500">اختر نوع الاختبار المناسب للقسم</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.value.trim() || formData.testTypeId === 0}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    جاري الإضافة...
                  </>
                ) : (
                  "إضافة القسم"
                )}
              </button>
            </form>

            {/* Status Messages */}
            {submitStatus.type && (
              <div className="mt-6">
                <div
                  className={`rounded-md p-4 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="mr-3">
                      <h3
                        className={`text-sm font-medium ${
                          submitStatus.type === "success" ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {submitStatus.type === "success" ? "نجح!" : "خطأ!"}
                      </h3>
                      <div
                        className={`mt-1 text-sm ${
                          submitStatus.type === "success" ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        <p>{submitStatus.message}</p>
                        {submitStatus.details && submitStatus.details.length > 0 && (
                          <ul className="mt-2 list-disc list-inside">
                            {submitStatus.details.map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug Information (Optional - can be removed in production) */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">معلومات التطوير:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-medium">API Base URL:</span> {BASE_URL}
              </p>
              <p>
                <span className="font-medium">Token Available:</span> {Cookies.get("adminToken") ? "نعم" : "لا"}
              </p>
              <p>
                <span className="font-medium">Test Types Loaded:</span> {testTypes.length}
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
    </Layout>
  )
}
