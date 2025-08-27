
// "use client"

// import { useState, useEffect } from "react"
// import { Lock, RotateCcw, Minus, Plus, AlertCircle, Loader2 } from "lucide-react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// // Types
// interface TestData {
//   testInfo: {
//     title: string
//     expectedTime: string
//     numberOfQuestions: number
//     startButtonText: string
//     remainingAttempts: string
//     labels: {
//       expectedTime: string
//       numberOfQuestions: string
//     }
//   }
// }

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
// }

// interface TestClassWithSkills {
//   id: number
//   value: string
//   skillTestsStatistics: SkillTestStatistic[]
// }

// interface TestType {
//   id: number
//   value: string
//   testClasses: TestClassWithSkills[]
// }

// interface ApiResponse {
//   meta: null
//   succeeded: boolean
//   message: string
//   errors: null
//   data: {
//     testTypes: TestType[]
//   }
// }

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface StartTestResponse {
//   meta: null
//   succeeded: boolean
//   message: string
//   errors: string[] | null
//   data: number
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// // Refresh token function
// // const refreshAuthToken = async (): Promise<boolean> => {
// //   try {
// //     const refreshToken = Cookies.get("refreshToken")
// //     if (!refreshToken) return false

// //     const response = await axios.post(`${BASE_URL}/api/Auth/RefreshToken`, {
// //       refreshToken,
// //     })

// //     if (response.data.succeeded) {
// //       Cookies.set("accessToken", response.data.data.accessToken)
// //       Cookies.set("refreshToken", response.data.data.refreshToken)
// //       return true
// //     }
// //     return false
// //   } catch (error) {
// //     console.error("Token refresh failed:", error)
// //     return false
// //   }
// // }

// export default function CollectionFull() {
//   // State management
//   const [testData, setTestData] = useState<TestData | null>(null)
//   const [testClasses, setTestClasses] = useState<number[]>([])
//   const [questionCount, setQuestionCount] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [testId, setTestId] = useState<number | null>(null)
//   const [remainingAttempts, setRemainingAttempts] = useState(3)

//   const router = useRouter()

//   // Helper functions
//   const getAuthToken = () => Cookies.get("accessToken")

//   const getHeaders = () => {
//     const token = getAuthToken()
//     return {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
//     setError(null)
//     setTestId(null)
//   }

//   const incrementCount = () => {
//     if (questionCount < 100) {
//       setQuestionCount(questionCount + 1)
//     }
//   }

//   const decrementCount = () => {
//     if (questionCount > 1) {
//       setQuestionCount(questionCount - 1)
//     }
//   }

//   // Load initial test data
//   useEffect(() => {
//     const loadTestData = async () => {
//       try {
//         const data: TestData = {
//           testInfo: {
//             title: "معلومات الاختبار",
//             expectedTime: "04:00 ساعة",
//             numberOfQuestions: 160,
//             startButtonText: "ابدأ الاختبار",
//             remainingAttempts: "3",
//             labels: {
//               expectedTime: "الزمن المتوقع",
//               numberOfQuestions: "عدد الأسئلة",
//             },
//           },
//         }
//         setTestData(data)
//       } catch (error) {
//         console.error("Error loading test data:", error)
//         setError("خطأ في تحميل البيانات")
//       }
//     }

//     loadTestData()
//   }, [])

//   // Fetch test classes from API
//   useEffect(() => {
    
//     const fetchTestClasses = async () => {
//       const token = getAuthToken()
//       if (!token) {
//         setLoading(false)
//         return
//       }

//       try {
//         setLoading(true)
//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         console.log("API Response:", response.data.data)

//         if (response.data.succeeded) {
//           // Find Qudrat test type and extract skill IDs
//           const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")

//           console.log("Qudrat Test Type:", qudratTestType)

//           if (qudratTestType) {
//             const skillIds: number[] = []
//             qudratTestType.testClasses.forEach((testClass) => {
//               testClass.skillTestsStatistics.forEach((skill) => {
//                 skillIds.push(skill.id)
//               })
//             })

//             console.log("Extracted Skill IDs:", skillIds)
//             setTestClasses(skillIds)
//           } else {
//             setError("لم يتم العثور على بيانات اختبار القدرات")
//           }
//         } else {
//           setError(response.data.message || "فشل في جلب البيانات")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"

//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 {
//                 const refreshSuccess = await refreshAuthToken()
//                 if (refreshSuccess) {
//                   return fetchTestClasses()
//                 }
//                 errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//                 router.push("/login")
//                 break
//                 }
//               case 403:
//                 {
//                 const refreshSuccess2 = await refreshAuthToken()
//                 if (refreshSuccess2) {
//                   return fetchTestClasses()
//                 }
//                 errorMessage = "ليس لديك صلاحية للوصول"
//                 router.push("/login")
//                 break
//               }
//               case 404:
//                 errorMessage = "لم يتم العثور على الخدمة المطلوبة"
//                 break
//               case 500:
//                 errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
//                 break
//               default:
//                 errorMessage = `خطأ في الخادم (${error.response.status})`
//             }
//           } else if (error.request) {
//             errorMessage = "خطأ في الشبكة. تحقق من اتصال الإنترنت"
//           } else {
//             errorMessage = `خطأ في الطلب: ${error.message}`
//           }
//         }

//         setError(errorMessage)
//         console.error("Error fetching test classes:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTestClasses()
//   }, [router])

//   // Start test function
//   const startTest = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setError("يجب تسجيل الدخول أولاً لبدء الاختبار")
//       return
//     }

//     if (remainingAttempts <= 0) {
//       setError("لقد استنفدت جميع المحاولات المجانية")
//       return
//     }

//     setIsLoading(true)
//     setError(null)

//     try {
//       const requestBody: StartTestRequest = {
//         skillIds: testClasses,
//         count: questionCount,
//       }

//       console.log("Start Test Request:", requestBody)

//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
//         headers: getHeaders(),
//         timeout: 10000,
//       })

//       const result = response.data
//       console.log("Start Test Response:", result)

//       if (result.succeeded) {
//         setTestId(result.data)
//         setRemainingAttempts((prev) => Math.max(0, prev - 1))

//         // Navigate to exam page
//         router.push(`/dashboard/dashStudent/examGlobalTest?testId=${result.data}`)
//       } else {
//         setError(result.message || "فشل في بدء الاختبار")
//         if (result.errors && result.errors.length > 0) {
//           setError(result.errors.join(", "))
//         }
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 401) {
//           const refreshSuccess = await refreshAuthToken()
//           if (refreshSuccess) {
//             return startTest()
//           }
//           setError("انتهت صلاحية جلسة المستخدم. يرجى تسجيل الدخول مرة أخرى")
//           router.push("/login")
//         } else if (error.response?.status === 403) {
//           setError("ليس لديك صلاحية لبدء الاختبار")
//         } else if (error.response?.data?.message) {
//           setError(error.response.data.message)
//         } else if (error.code === "ECONNABORTED") {
//           setError("انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى")
//         } else if (error.request) {
//           setError("لا يمكن الاتصال بالخادم. تحقق من اتصال الإنترنت")
//         } else {
//           setError("حدث خطأ في الاتصال بالخادم")
//         }
//       } else {
//         setError("حدث خطأ غير متوقع")
//       }
//       console.error("Error starting test:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Check authentication
//   const isAuthenticated = !!getAuthToken()

//   if (!isAuthenticated) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
//           <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-yellow-800 mb-2">تسجيل الدخول مطلوب</h2>
//           <p className="text-yellow-700 mb-4">يجب تسجيل الدخول للوصول إلى محاكي الاختبار</p>
//           <button
//             onClick={() => router.push("/login")}
//             className="bg-yellow-600 text-white px-6 py-2 rounded-md font-medium hover:bg-yellow-700 transition-colors"
//             type="button"
//           >
//             تسجيل الدخول
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     )
//   }

//   if (!testData) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">خطأ في تحميل البيانات</div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto overflow-hidden">
//       {/* Header Section */}
//       <div className="p-6">
//         <div className="text-center">
//           <div className="inline-flex items-center px-4 py-2 text-pink-700 rounded-full text-sm font-medium">
//             باقي لديك {remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </div>
//         </div>
//       </div>

//       {/* Advanced Options Section */}
//       <div className="bg-gray-50 rounded-2xl shadow-lg border-b border-gray-200">
//         <div className="p-6">
//           <button className="flex items-center justify-between w-full group" type="button">
//             <div className="flex items-center text-teal-600 font-semibold text-lg">
//               <span>خيارات متقدمة</span>
//             </div>
//           </button>

//           <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             {/* Question Bank Header */}
//             <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
//               <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
//                 <div className="flex items-center gap-3 text-white">
//                   <Lock className="h-5 w-5" />
//                   <span className="font-semibold text-lg">بنوك الأسئلة</span>
//                 </div>
//                 <div className="text-purple-100 text-sm bg-purple-400/30 px-3 py-1 rounded-full">
//                   تم إضافة أسئلة جديدة بتاريخ 11/05/2023
//                 </div>
//               </div>
//             </div>

//             {/* Question Count Controls */}
//             <div className="p-6">
//               <div className="space-y-6">
//                 <div className="flex flex-col items-center gap-4">
//                   <label className="text-sm font-medium text-gray-700">عدد الأسئلة</label>

//                   {/* Counter with buttons */}
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={decrementCount}
//                       disabled={questionCount <= 1 || isLoading}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                       type="button">
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
//                       <div className="text-xs text-gray-500">من 100</div>
//                     </div>
//                     <button
//                       onClick={incrementCount}
//                       disabled={questionCount >= 100 || isLoading}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                       type="button">
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="w-full max-w-md">
//                     <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
//                         style={{ width: `${questionCount}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500 mt-1">
//                       <span>1</span>
//                       <span>100</span>
//                     </div>
//                   </div>

//                   {/* Direct Input */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-600">أو أدخل العدد مباشرة:</span>
//                     <input
//                       type="number"
//                       value={questionCount}
//                       onChange={(e) =>
//                         setQuestionCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))
//                       }
//                       min="1"
//                       max="100"
//                       disabled={isLoading}
//                       className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
//                     />
//                   </div>
//                 </div>

//                 {/* Reset Button */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={handleReset}
//                     disabled={isLoading}
//                     className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                     type="button">
//                     <RotateCcw className="h-4 w-4" />
//                     إعادة تعيين
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Test Information Section */}
//       <div className="flex items-center justify-center p-4">
//         <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
//           <div className="bg-white p-6 sm:p-8 ">
//             {/* Title */}
//             <div className="text-center mb-8">
//               <h1 className="text-xl sm:text-2xl font-bold text-orange-500" dir="rtl">
//                 {testData.testInfo.title}
//               </h1>
//             </div>

//             {/* Test Information Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
//               {/* Expected Time */}
//               <div className="text-center space-y-2">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-800" dir="rtl">
//                   {testData.testInfo.labels.expectedTime}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600" dir="rtl">
//                   {testData.testInfo.expectedTime}
//                 </p>
//               </div>

//               {/* Number of Questions */}
//               <div className="text-center space-y-2">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-800" dir="rtl">
//                   {testData.testInfo.labels.numberOfQuestions}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600">{questionCount}</p>
//               </div>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//                   <p className="text-red-600 font-medium">{error}</p>
//                 </div>
//               </div>
//             )}

//             {/* Success Message */}
//             {testId && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-green-600 text-center font-medium">
//                   تم إنشاء الاختبار بنجاح! معرف الاختبار: {testId}
//                 </p>
//                 <p className="text-green-600 text-center text-sm mt-1">سيتم توجيهك إلى صفحة الاختبار...</p>
//               </div>
//             )}

//             {/* Start Test Button */}
//             <div className="text-center">
//               <button
//                 onClick={startTest}
//                 disabled={isLoading || remainingAttempts <= 0}
//                 className="w-full mx-auto sm:w-auto px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[150px]"
//                 dir="rtl"
//                 type="button"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     جاري التحضير...
//                   </>
//                 ) : (
//                   testData.testInfo.startButtonText
//                 )}
//               </button>
//             </div>

//             {/* No Attempts Left Warning */}
//             {remainingAttempts <= 0 && (
//               <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-yellow-600 text-center font-medium">
//                   لقد استنفدت جميع المحاولات المجانية. يرجى ترقية باقتك للمتابعة.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }







// "use client"

// import { useEffect, useState } from "react"
// import { Lock, RotateCcw, Minus, Plus, AlertCircle, Loader2 } from "lucide-react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// // Types
// interface TestClass {
//   id: number
//   value: string
// }

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
//   selected?: boolean
// }

// interface TestClassWithSkills {
//   id: number
//   value: string
//   skillTestsStatistics: SkillTestStatistic[]
// }

// interface TestType {
//   id: number
//   value: string
//   testClasses: TestClassWithSkills[]
// }

// interface ApiResponse {
//   meta: any
//   succeeded: boolean
//   message: string
//   errors: any
//   data: {
//     testTypes: TestType[]
//   }
// }

// interface TestClassSelection {
//   [testClassName: string]: SkillTestStatistic[]
// }

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface StartTestResponse {
//   meta: any
//   succeeded: boolean
//   message: string
//   errors: string[] | null
//   data: any
// }

// interface ExamData {
//   title: string
//   description: string
//   instructions: string
//   remainingAttempts: number
//   examInfo: {
//     quantitative: string
//     verbal: string
//     questionCount: number
//     expectedTime: string
//   }
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function ExamSimulatorFixed() {
//   // State management
//   const [data, setData] = useState<ExamData>({
//     title: "محاكي الاختبار",
//     description:
//       "بناءًا على ما هو متاح من الاختبار الحقيقي، يجب أن يكون لديك فهم جيد أو إلمام تام بالمعلومات وحل المشكلات وتوفير وقتك. ستساعدك ورقة مسودة كتابة الملاحظات وحل المسائلات بالتوقيت.",
//     instructions:
//       "يجب عليك أيضًا تخصيص جدول ساعتين لحل الاختبار اخبر عائلتك وأصدقائك بعدم مقاطعتك خلال هذا الوقت. نوصي بإجراء الاختبار بالكامل في جلسة واحدة للتدرب على سرعتك وبناء قدرتك على التحمل أثناء إجراء الاختبار وهو ما ستحتاج إليه في يوم الاختبار.",
//     remainingAttempts: 1,
//     examInfo: {
//       quantitative: "كامل القسم",
//       verbal: "كامل القسم",
//       questionCount: 120,
//       expectedTime: "02:05 ساعة",
//     },
//   })

//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [skillIds, setSkillIds] = useState<number[]>([])
//   const [questionCount, setQuestionCount] = useState(1)
//   const [testClassSelections] = useState<TestClassSelection>({})

//   // Loading and error states
//   const [loading, setLoading] = useState(true)
//   const [isStartingTest, setIsStartingTest] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [testStartError, setTestStartError] = useState<string | null>(null)

//   // Success state
//   const [testId, setTestId] = useState<number | null>(null)

//   const router = useRouter()

//   // Helper functions
//   const getAuthToken = (): string | undefined => {
//     return Cookies.get("accessToken")
//   }

//   const getHeaders = () => {
//     const token = getAuthToken()
//     return {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }
//   }

//   const getSelectedSkillIds = (): number[] => {
//     // If we have specific skill selections, use those
//     if (Object.keys(testClassSelections).length > 0) {
//       const skillIdsList: number[] = []
//       Object.values(testClassSelections).forEach((skills) => {
//         skills.forEach((skill) => {
//           if (typeof skill.id === "number") {
//             skillIdsList.push(skill.id)
//           }
//         })
//       })
//       return skillIdsList
//     }
//     // Otherwise, use all available skill IDs
//     return skillIds.filter((id) => typeof id === "number")
//   }

//   // Event handlers
//   const handleReset = () => {
//     setQuestionCount(1)
//     setError(null)
//     setTestStartError(null)
//     setTestId(null)
//   }

//   const incrementCount = () => {
//     if (questionCount < 100) {
//       setQuestionCount(questionCount + 1)
//     }
//   }

//   const decrementCount = () => {
//     if (questionCount > 1) {
//       setQuestionCount(questionCount - 1)
//     }
//   }

//   // Fetch test classes and skills
//   const fetchTestClasses = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setError("يجب تسجيل الدخول أولاً")
//       setLoading(false)
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         timeout: 10000,
//       })

//       console.log("API Response:", response.data)

//       if (response.data && response.data.succeeded) {
//         // Safely access the data
//         const testTypes = response.data.data?.testTypes
//         if (!Array.isArray(testTypes)) {
//           setError("تنسيق البيانات غير صحيح")
//           return
//         }

//         const qudratTestType = testTypes.find(
//           (testType) => testType && typeof testType.value === "string" && testType.value === "Tahsili",
//         )

//         if (qudratTestType && Array.isArray(qudratTestType.testClasses)) {
//           // Extract test classes for display - with validation
//           const classesOnly: TestClass[] = qudratTestType.testClasses
//             .filter((testClass) => testClass && typeof testClass.id === "number" && typeof testClass.value === "string")
//             .map((testClass) => ({
//               id: testClass.id,
//               value: testClass.value,
//             }))

//           setTestClasses(classesOnly)

//           // Extract all skill IDs for test starting - with validation
//           const allSkillIds: number[] = qudratTestType.testClasses
//             .filter((testClass) => testClass && Array.isArray(testClass.skillTestsStatistics))
//             .flatMap((testClass) => testClass.skillTestsStatistics)
//             .filter((skill) => skill && typeof skill.id === "number")
//             .map((skill) => skill.id)

//           setSkillIds(allSkillIds)
//           console.log("Extracted skill IDs:", allSkillIds)

//           if (classesOnly.length === 0) {
//             setError("لا توجد أقسام متاحة")
//           }
//         } else {
//           setError("لم يتم العثور على بيانات اختبار التحصيلي")
//         }
//       } else {
//         setError(response.data?.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ في جلب البيانات"

//       // Try to refresh token first
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "ليس لديك صلاحية للوصول إلى هذه البيانات"
//               break
//             case 404:
//               errorMessage = "لم يتم العثور على البيانات المطلوبة"
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status})`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error fetching test classes:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Start test function
//   const startTest = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setTestStartError("يجب تسجيل الدخول أولاً لبدء الاختبار")
//       return
//     }

//     if (data.remainingAttempts <= 0) {
//       setTestStartError("لقد استنفدت جميع المحاولات المجانية")
//       return
//     }

//     const selectedSkillIds = getSelectedSkillIds()
//     if (selectedSkillIds.length === 0) {
//       setTestStartError("لا توجد مهارات متاحة للاختبار")
//       return
//     }

//     setIsStartingTest(true)
//     setTestStartError(null)

//     try {
//       const requestBody: StartTestRequest = {
//         skillIds: selectedSkillIds,
//         count: questionCount,
//       }

//       console.log("Start test request:", requestBody)

//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
//         headers: getHeaders(),
//         timeout: 15000,
//       })

//       console.log("Start test response:", response.data)

//       if (response.data && response.data.succeeded) {
//         const testIdValue = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data

//         if (testIdValue) {
//           setTestId(testIdValue)

//           // Update remaining attempts
//           setData((prevData) => ({
//             ...prevData,
//             remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
//           }))

//           // Redirect to test page
//           router.push(`/dashboard/dashStudent/examGlobalTest?testId=${testIdValue}`)
//         } else {
//           setTestStartError("لم يتم إرجاع معرف الاختبار")
//         }
//       } else {
//         setTestStartError(response.data?.message || "فشل في بدء الاختبار")
//         if (response.data?.errors && Array.isArray(response.data.errors) && response.data.errors.length > 0) {
//           setTestStartError(response.data.errors.join(", "))
//         }
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return startTest()
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return startTest()
//               }
//               errorMessage = "ليس لديك صلاحية لبدء الاختبار"
//               break
//             case 400:
//               errorMessage = "بيانات الطلب غير صحيحة"
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status})`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error starting test:", error)
//       setTestStartError(errorMessage)
//     } finally {
//       setIsStartingTest(false)
//     }
//   }

//   // Load data on component mount
//   useEffect(() => {
//     fetchTestClasses()
//   }, [])

//   // Check if user is authenticated
//   const isAuthenticated = !!getAuthToken()

//   if (!isAuthenticated) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
//           <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-yellow-800 mb-2">تسجيل الدخول مطلوب</h2>
//           <p className="text-yellow-700 mb-4">يجب تسجيل الدخول للوصول إلى محاكي الاختبار</p>
//           <button
//             onClick={() => router.push("/login")}
//             className="bg-yellow-600 text-white px-6 py-2 rounded-md font-medium hover:bg-yellow-700 transition-colors"
//             type="button"
//           >
//             تسجيل الدخول
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto overflow-hidden">
//       {/* Header Section */}
//       <div className="p-6">
//         <div className="text-center">
//           <div className="inline-flex items-center px-4 py-2 text-pink-700 rounded-full text-sm font-medium">
//             باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </div>
//         </div>
//       </div>

//       {/* Advanced Options Section */}
//       <div className="bg-gray-50 rounded-2xl shadow-lg border-b border-gray-200">
//         <div className="p-6">
//           <button className="flex items-center justify-between w-full group" type="button">
//             <div className="flex items-center text-teal-600 font-semibold text-lg">
//               <span>خيارات متقدمة</span>
//             </div>
//           </button>

//           <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             {/* Question Bank Header */}
//             <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
//               <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
//                 <div className="flex items-center gap-3 text-white">
//                   <Lock className="h-5 w-5" />
//                   <span className="font-semibold text-lg">بنوك الأسئلة</span>
//                 </div>
//                 <div className="text-purple-100 text-sm bg-purple-400/30 px-3 py-1 rounded-full">
//                   تم إضافة أسئلة جديدة بتاريخ 11/05/2023
//                 </div>
//               </div>
//             </div>

//             {/* Question Count Controls */}
//             <div className="p-6">
//               <div className="space-y-6">
//                 <div className="flex flex-col items-center gap-4">
//                   <h3 className="text-sm font-medium text-gray-700">عدد الأسئلة</h3>

//                   {/* Counter with buttons */}
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={decrementCount}
//                       disabled={questionCount <= 1 || isStartingTest}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                       type="button"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
//                       <div className="text-xs text-gray-500">من 100</div>
//                     </div>
//                     <button
//                       onClick={incrementCount}
//                       disabled={questionCount >= 100 || isStartingTest}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="w-full max-w-md">
//                     <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
//                         style={{ width: `${questionCount}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500 mt-1">
//                       <span>1</span>
//                       <span>100</span>
//                     </div>
//                   </div>

//                   {/* Direct Input */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-600">أو أدخل العدد مباشرة:</span>
//                     <input
//                       type="number"
//                       value={questionCount}
//                       onChange={(e) =>
//                         setQuestionCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))
//                       }
//                       min="1"
//                       max="100"
//                       disabled={isStartingTest}
//                       className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
//                     />
//                   </div>
//                 </div>

//                 {/* Reset Button */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={handleReset}
//                     disabled={isStartingTest}
//                     className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                     type="button"
//                   >
//                     <RotateCcw className="h-4 w-4" />
//                     إعادة تعيين
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Exam Information Section */}
//       <div className="p-6">
//         <h2 className="text-2xl text-center text-orange-500 font-bold mb-8 relative">معلومات الاختبار</h2>

//         {loading ? (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//             <span className="mr-2 text-gray-600">جاري تحميل البيانات...</span>
//           </div>
//         ) : error ? (
//           <div className="p-4 text-center mb-6">
//             <div className="flex items-center justify-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600" />
//               <span className="text-red-600 font-medium">{error}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {testClasses.length > 0 ? (
//               testClasses.map((testClass) => (
//                 <div key={testClass.id} className="bg-white p-6 rounded-lg shadow-sm">
//                   <div className="text-center">
//                     <h3 className="text-blue-600 font-bold text-lg mb-2">{String(testClass.value)}</h3>
//                     <p className="text-gray-700 font-semibold">كامل الأقسام</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center text-gray-500 py-8">لا توجد أقسام متاحة</div>
//             )}

//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
//                 <p className="text-gray-700 font-semibold text-xl">{questionCount}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
//                 <p className="text-gray-700 font-semibold text-xl">45:00</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Messages */}
//         {testStartError && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{testStartError}</p>
//             </div>
//           </div>
//         )}

//         {/* Success Message */}
//         {testId && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-600 text-center font-medium">تم إنشاء الاختبار بنجاح! معرف الاختبار: {testId}</p>
//             <p className="text-green-600 text-center text-sm mt-1">سيتم توجيهك إلى صفحة الاختبار...</p>
//           </div>
//         )}

//         {/* Start Test Button */}
//         <div className="flex justify-center">
//           <button
//             onClick={startTest}
//             disabled={isStartingTest || data.remainingAttempts <= 0 || loading}
//             className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
//             type="button"
//           >
//             {isStartingTest ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin mr-2" />
//                 جاري التحضير...
//               </>
//             ) : (
//               <>
//                 <span className="relative z-10">ابدأ الاختبار</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
//               </>
//             )}
//           </button>
//         </div>

//         {/* No Attempts Warning */}
//         {data.remainingAttempts <= 0 && (
//           <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-600 text-center font-medium">
//               لقد استنفدت جميع المحاولات المجانية. يرجى ترقية باقتك للمتابعة.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }





"use client"

import React from "react"

import { Suspense } from "react"
import ExamSimulatorDebug from "./exam-simulator-debug"

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ExamSimulator Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        // <div className="max-w-4xl mx-auto p-6">
          <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">حدث خطأ في التطبيق</h2>
            <p className="text-red-700 mb-4">عذراً، حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
              type="button"
            >
              إعادة تحميل
            </button>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-red-600">تفاصيل الخطأ (للمطورين)</summary>
                <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">{this.state.error?.stack}</pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Safe wrapper component
export default function SafeExamSimulator(props: any = {}) {
  // Filter out any problematic props
  const safeProps: Record<string, any> = {}

  // Only pass through safe, primitive values
  Object.keys(props).forEach((key) => {
    const value = props[key]
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null ||
      value === undefined
    ) {
      console.log(`Passing through prop: ${key}`, value)
      safeProps[key] = value
    } else {
      console.warn(`Filtering out non-primitive prop: ${key}`, value)
    }
  })

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        }
      >
        <ExamSimulatorDebug {...safeProps} />
      </Suspense>
    </ErrorBoundary>
  )
}
