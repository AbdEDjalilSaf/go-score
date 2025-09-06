// "use client"

// import { useEffect, useCallback, useState } from "react"
// import { Lock, RotateCcw, Minus, Plus, AlertCircle, Loader2 } from "lucide-react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// // Types - Updated to handle the problematic object structure
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
//   errors: string[]
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

// // Add this interface to handle the problematic object
// interface ProblematicObject {
//   id: number
//   value: string
//   answer: string
//   skillId: number
//   choiceResponses: any[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// // Helper function to safely render any value
// const safeRender = (value: any): string => {
//   if (value === null || value === undefined) {
//     return ""
//   }
//   if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
//     return String(value)
//   }
//   if (typeof value === "object") {
//     // If it's an object, return a safe string representation
//     if (Array.isArray(value)) {
//       return `Array(${value.length})`
//     }
//     return `Object(${Object.keys(value).join(", ")})`
//   }
//   return String(value)
// }

// // Props interface - make sure to handle any props that might contain objects
// interface ExamSimulatorProps {
//   data?: any // Make this optional and handle it safely
//   initialData?: ExamData
//   // Add any other props that might be passed
//   [key: string]: any
// }

// export default function ExamSimulatorDebug(props: ExamSimulatorProps = {}) {
//   // Debug: Log all props to see what's being passed
//   console.log("ExamSimulatorDebug props:", props)

//   // State management with safe initialization
//   const [data, setData] = useState<ExamData>(() => {
//     // Safely initialize data, ignoring any problematic props
//     return {
//       title: "محاكي الاختبار",
//       description:
//         "بناءًا على ما هو متاح من الاختبار الحقيقي، يجب أن يكون لديك فهم جيد أو إلمام تام بالمعلومات وحل المشكلات وتوفير وقتك. ستساعدك ورقة مسودة كتابة الملاحظات وحل المسائلات بالتوقيت.",
//       instructions:
//         "يجب عليك أيضًا تخصيص جدول ساعتين لحل الاختبار اخبر عائلتك وأصدقائك بعدم مقاطعتك خلال هذا الوقت. نوصي بإجراء الاختبار بالكامل في جلسة واحدة للتدرب على سرعتك وبناء قدرتك على التحمل أثناء إجراء الاختبار وهو ما ستحتاج إليه في يوم الاختبار.",
//       remainingAttempts: 1,
//       examInfo: {
//         quantitative: "كامل القسم",
//         verbal: "كامل القسم",
//         questionCount: 120,
//         expectedTime: "02:05 ساعة",
//       },
//     }
//   })

//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [skillIds, setSkillIds] = useState<number[]>([])
//   const [questionCount, setQuestionCount] = useState(1)
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})

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

// useEffect(() => {
//  const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
//     setTestClassSelections((prev) => ({
//       ...prev,
//       [testClassName]: selectedSkills,
//     }))
//   }, [])

// }, [])



// // Calculate totals from all selected skills
// const calculateTotals = () => {
//     let totalQuestions = 0
//     const testClassTotals: { [key: string]: number } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       console.log("classTotal", classTotal)
//       totalQuestions += classTotal
//       testClassTotals[testClassName] = classTotal
//     })
// console.log("totalQuestions", totalQuestions)
//     return { totalQuestions, testClassTotals }
// }

// const totals = calculateTotals()
// // const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, count]) => count > 0)
// // const selectedSkillIds = getSelectedSkillIds()

// const getSelectedSkillIds = (): number[] => {
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
// }

// // Event handlers
// const handleReset = () => {
//     setQuestionCount(1)
//     setTestClassSelections({})
//     setTestStartError(null)
//     setTestId(null)
// }

// const incrementCount = () => {
//     if (questionCount < 100) {
//       setQuestionCount(questionCount + 1)
//     }
// }

// const decrementCount = () => {
//     if (questionCount > 1) {
//       setQuestionCount(questionCount - 1)
//     }
// }

// // Fetch test classes and skills with enhanced error handling
// const fetchTestClasses = async () => {
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
//         // Safely access the data with extensive validation
//         const testTypes = response.data.data?.testTypes
//         if (!Array.isArray(testTypes)) {
//           console.error("testTypes is not an array:", testTypes)
//           setError("تنسيق البيانات غير صحيح")
//           return
//         }

//         const qudratTestType = testTypes.find(
//           (testType) => testType && typeof testType.value === "string" && testType.value === "Tahsili",
//         )

//         if (qudratTestType && Array.isArray(qudratTestType.testClasses)) {
//           // Extract test classes for display - with extensive validation
//           const classesOnly: TestClass[] = []

//           qudratTestType.testClasses.forEach((testClass) => {
//             try {
//               if (testClass && typeof testClass.id === "number" && typeof testClass.value === "string") {
//                 classesOnly.push({
//                   id: testClass.id,
//                   value: testClass.value,
//                 })
//               } else {
//                 console.warn("Invalid test class:", testClass)
//               }
//             } catch (err) {
//               console.error("Error processing test class:", testClass, err)
//             }
//           })

//           setTestClasses(classesOnly)

//           // Extract all skill IDs for test starting - with extensive validation
//           const allSkillIds: number[] = []

//           qudratTestType.testClasses.forEach((testClass) => {
//             try {
//               if (testClass && Array.isArray(testClass.skillTestsStatistics)) {
//                 testClass.skillTestsStatistics.forEach((skill) => {
//                   try {
//                     if (skill && typeof skill.id === "number") {
//                       allSkillIds.push(skill.id)
//                     } else {
//                       console.warn("Invalid skill:", skill)
//                     }
//                   } catch (err) {
//                     console.error("Error processing skill:", skill, err)
//                   }
//                 })
//               }
//             } catch (err) {
//               console.error("Error processing test class skills:", testClass, err)
//             }
//           })

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

//   // Start test function with enhanced error handling
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
//             باقي لديك {safeRender(data.remainingAttempts)} محاولة مجانية في الباقة الأساسية
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
//                       <div className="text-3xl font-bold text-purple-600 mb-1">{safeRender(questionCount)}</div>
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
//               <span className="text-red-600 font-medium">{safeRender(error)}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {testClasses.length > 0 ? (
//               testClasses.map((testClass) => {
//                 // Extra safety check for each test class
//                 try {
//                   return (
//                     <div key={testClass.id} className="bg-white p-6 ">
//                       <div className="text-center">
//                         <h3 className="text-blue-600 font-bold text-lg mb-2">{safeRender(testClass.value)}</h3>
//                         <p className="text-gray-700 font-semibold">كامل الأقسام</p>
//                       </div>
//                     </div>
//                   )
//                 } catch (err) {
//                   console.error("Error rendering test class:", testClass, err)
//                   return (
//                     <div key={`error-${testClass.id || Math.random()}`} className="bg-red-50 p-6 ">
//                       <div className="text-center">
//                         <h3 className="text-red-600 font-bold text-lg mb-2">خطأ في البيانات</h3>
//                         <p className="text-gray-700 font-semibold text-xs">تعذر عرض هذا القسم</p>
//                       </div>
//                     </div>
//                   )
//                 }
//               })
//             ) : (
//               <div className="col-span-full text-center text-gray-500 py-8">لا توجد أقسام متاحة</div>
//             )}

//             <div className="bg-white p-6 ">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
//                 <p className="text-gray-700 font-semibold text-xl">{safeRender(questionCount)}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 ">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
//                 <p className="text-gray-700 font-semibold text-xl">{Math.ceil(totals.totalQuestions * 1.5)} دقيقة</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Messages */}
//         {testStartError && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{safeRender(testStartError)}</p>
//             </div>
//           </div>
//         )}

//         {/* Success Message */}
//         {testId && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-600 text-center font-medium">
//               تم إنشاء الاختبار بنجاح! معرف الاختبار: {safeRender(testId)}
//             </p>
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














// "use client"

// import { useEffect, useCallback, useState } from "react"
// import { Lock, RotateCcw, Minus, Plus, AlertCircle, Loader2 } from "lucide-react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// // Types - Updated to handle the problematic object structure
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
//   errors: string[]
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

// // Helper function to safely render any value
// const safeRender = (value: any): string => {
//   if (value === null || value === undefined) {
//     return ""
//   }
//   if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
//     return String(value)
//   }
//   if (typeof value === "object") {
//     if (Array.isArray(value)) {
//       return `Array(${value.length})`
//     }
//     return `Object(${Object.keys(value).join(", ")})`
//   }
//   return String(value)
// }

// // Props interface
// interface ExamSimulatorProps {
//   data?: any
//   initialData?: ExamData
//   [key: string]: any
// }

// export default function ExamSimulatorDebug(props: ExamSimulatorProps = {}) {
//   console.log("ExamSimulatorDebug props:", props)

//   // State management with safe initialization
//   const [data, setData] = useState<ExamData>(() => ({
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
//   }))

//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [skillIds, setSkillIds] = useState<number[]>([])
//   const [questionCount, setQuestionCount] = useState(1)
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})

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

//   // Fixed: Move handleSelectionChange outside of useEffect
//   const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
//     setTestClassSelections((prev) => ({
//       ...prev,
//       [testClassName]: selectedSkills,
//     }))
//   }, [])

//   // Fixed: Calculate totals function
//   const calculateTotals = useCallback(() => {
//     let totalQuestions = 0
//     const testClassTotals: { [key: string]: number } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       totalQuestions += classTotal
//       testClassTotals[testClassName] = classTotal
//     })

//     return { totalQuestions, testClassTotals }
//   }, [testClassSelections])

//   const totals = calculateTotals()

//   const getSelectedSkillIds = useCallback((): number[] => {
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
//   }, [testClassSelections, skillIds])

//   // Event handlers
//   const handleReset = useCallback(() => {
//     setQuestionCount(1)
//     setTestClassSelections({})
//     setTestStartError(null)
//     setTestId(null)
//   }, [])

//   const incrementCount = useCallback(() => {
//     if (questionCount < 100) {
//       setQuestionCount(questionCount + 1)
//     }
//   }, [questionCount])

//   const decrementCount = useCallback(() => {
//     if (questionCount > 1) {
//       setQuestionCount(questionCount - 1)
//     }
//   }, [questionCount])

//   // Fetch test classes and skills with enhanced error handling
//   const fetchTestClasses = useCallback(async () => {
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
//         const testTypes = response.data.data?.testTypes
//         if (!Array.isArray(testTypes)) {
//           console.error("testTypes is not an array:", testTypes)
//           setError("تنسيق البيانات غير صحيح")
//           return
//         }

//         const qudratTestType = testTypes.find(
//           (testType) => testType && typeof testType.value === "string" && testType.value === "Tahsili",
//         )

//         if (qudratTestType && Array.isArray(qudratTestType.testClasses)) {
//           // Extract test classes for display - with extensive validation
//           const classesOnly: TestClass[] = []
//           qudratTestType.testClasses.forEach((testClass) => {
//             try {
//               if (testClass && typeof testClass.id === "number" && typeof testClass.value === "string") {
//                 classesOnly.push({
//                   id: testClass.id,
//                   value: testClass.value,
//                 })
//               } else {
//                 console.warn("Invalid test class:", testClass)
//               }
//             } catch (err) {
//               console.error("Error processing test class:", testClass, err)
//             }
//           })

//           setTestClasses(classesOnly)

//           // Extract all skill IDs for test starting - with extensive validation
//           const allSkillIds: number[] = []
//           qudratTestType.testClasses.forEach((testClass) => {
//             try {
//               if (testClass && Array.isArray(testClass.skillTestsStatistics)) {
//                 testClass.skillTestsStatistics.forEach((skill) => {
//                   try {
//                     if (skill && typeof skill.id === "number") {
//                       allSkillIds.push(skill.id)
//                     } else {
//                       console.warn("Invalid skill:", skill)
//                     }
//                   } catch (err) {
//                     console.error("Error processing skill:", skill, err)
//                   }
//                 })
//               }
//             } catch (err) {
//               console.error("Error processing test class skills:", testClass, err)
//             }
//           })

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
//   }, [router])

//   // Start test function with enhanced error handling
//   const startTest = useCallback(async () => {
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
//   }, [data.remainingAttempts, getSelectedSkillIds, questionCount, router])

//   // Load data on component mount
//   useEffect(() => {
//     fetchTestClasses()
//   }, [fetchTestClasses])

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
//             باقي لديك {safeRender(data.remainingAttempts)} محاولة مجانية في الباقة الأساسية
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
//                       <div className="text-3xl font-bold text-purple-600 mb-1">{safeRender(questionCount)}</div>
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
//               <span className="text-red-600 font-medium">{safeRender(error)}</span>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {testClasses.length > 0 ? (
//               testClasses.map((testClass) => {
//                 try {
//                   return (
//                     <div key={testClass.id} className="bg-white p-6 ">
//                       <div className="text-center">
//                         <h3 className="text-blue-600 font-bold text-lg mb-2">{safeRender(testClass.value)}</h3>
//                         <p className="text-gray-700 font-semibold">كامل الأقسام</p>
//                       </div>
//                     </div>
//                   )
//                 } catch (err) {
//                   console.error("Error rendering test class:", testClass, err)
//                   return (
//                     <div
//                       key={`error-${testClass.id || Math.random()}`}
//                       className="bg-red-50 p-6 "
//                     >
//                       <div className="text-center">
//                         <h3 className="text-red-600 font-bold text-lg mb-2">خطأ في البيانات</h3>
//                         <p className="text-gray-700 font-semibold text-xs">تعذر عرض هذا القسم</p>
//                       </div>
//                     </div>
//                   )
//                 }
//               })
//             ) : (
//               <div className="col-span-full text-center text-gray-500 py-8">لا توجد أقسام متاحة</div>
//             )}

//             <div className="bg-white p-6 ">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
//                 <p className="text-gray-700 font-semibold text-xl">{safeRender(questionCount)}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 ">
//               <div className="text-center">
//                 <h3 className="text-blue-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
//                 <p className="text-gray-700 font-semibold text-xl">{Math.ceil(questionCount * 1.5)} دقيقة</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Messages */}
//         {testStartError && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{safeRender(testStartError)}</p>
//             </div>
//           </div>
//         )}

//         {/* Success Message */}
//         {testId && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-600 text-center font-medium">
//               تم إنشاء الاختبار بنجاح! معرف الاختبار: {safeRender(testId)}
//             </p>
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

import { useEffect, useCallback, useState } from "react"
import { Lock, RotateCcw, Minus, Plus, AlertCircle, Loader2 } from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { changeSkillIdTest, changeQuestionCountTest, changeTimingLeftTest, changeResponseTestLength } from "@/features/auth/authSlice"

// Types - Updated to handle the problematic object structure
interface TestClass {
  id: number
  value: string
}

interface SkillTestStatistic {
  id: number
  value: string
  questionsCount: number
  correctAnswersCount: number
  ratio: number
  selected?: boolean
}

interface TestClassWithSkills {
  id: number
  value: string
  skillTestsStatistics: SkillTestStatistic[]
}

interface TestType {
  id: number
  value: string
  testClasses: TestClassWithSkills[]
}

interface ApiResponse {
  meta: any
  succeeded: boolean
  message: string
  errors: string[]
  data: {
    testTypes: TestType[]
  }
}

interface TestClassSelection {
  [testClassName: string]: SkillTestStatistic[]
}

interface StartTestRequest {
  skillIds: number[]
  count: number
}

interface StartTestResponse {
  meta: any
  succeeded: boolean
  message: string
  errors: string[] | null
  data: any
}

interface ExamData {
  title: string
  description: string
  instructions: string
  remainingAttempts: number
  examInfo: {
    quantitative: string
    verbal: string
    questionCount: number
    expectedTime: string
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// Helper function to safely render any value
const safeRender = (value: any): string => {
  if (value === null || value === undefined) {
    return ""
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return `Array(${value.length})`
    }
    return `Object(${Object.keys(value).join(", ")})`
  }
  return String(value)
}

// Props interface
interface ExamSimulatorProps {
  data?: any
  initialData?: ExamData
  [key: string]: any
}

export default function ExamSimulatorDebug(props: ExamSimulatorProps = {}) {
  console.log("ExamSimulatorDebug props:", props)

  // Helper function to format time in hours and minutes
  const formatExpectedTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours === 0) {
      return `${minutes} دقيقة`
    } else if (minutes === 0) {
      return `${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
    } else {
      const hourText = hours === 1 ? "ساعة" : "ساعات"
      return `${hours} ${hourText} و ${minutes} دقيقة`
    }
  }

  // State management with safe initialization
  const [data, setData] = useState<ExamData>(() => ({
    title: "محاكي الاختبار",
    description:
      "بناءًا على ما هو متاح من الاختبار الحقيقي، يجب أن يكون لديك فهم جيد أو إلمام تام بالمعلومات وحل المشكلات وتوفير وقتك. ستساعدك ورقة مسودة كتابة الملاحظات وحل المسائلات بالتوقيت.",
    instructions:
      "يجب عليك أيضًا تخصيص جدول ساعتين لحل الاختبار اخبر عائلتك وأصدقائك بعدم مقاطعتك خلال هذا الوقت. نوصي بإجراء الاختبار بالكامل في جلسة واحدة للتدرب على سرعتك وبناء قدرتك على التحمل أثناء إجراء الاختبار وهو ما ستحتاج إليه في يوم الاختبار.",
    remainingAttempts: 1,
    examInfo: {
      quantitative: "كامل القسم",
      verbal: "كامل القسم",
      questionCount: 120,
      expectedTime: "02:05 ساعة",
    },
  }))

  const [testClasses, setTestClasses] = useState<TestClass[]>([])
  const [skillIds, setSkillIds] = useState<number[]>([])
  const [questionCount, setQuestionCount] = useState(1)
  const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [isStartingTest, setIsStartingTest] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testStartError, setTestStartError] = useState<string | null>(null)
  const dispatch = useDispatch()
  // Success state
  const [testId, setTestId] = useState<number | null>(null)

  const router = useRouter()

  // Helper functions
  const getAuthToken = (): string | undefined => {
    return Cookies.get("accessToken")
  }

  const getHeaders = () => {
    const token = getAuthToken()
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  // Fixed: Move handleSelectionChange outside of useEffect
//   const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
//     setTestClassSelections((prev) => ({
//       ...prev,
//       [testClassName]: selectedSkills,
//     }))
//   }, [])

  // Fixed: Calculate totals function
//   const calculateTotals = useCallback(() => {
//     let totalQuestions = 0
//     const testClassTotals: { [key: string]: number } = {}
//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       totalQuestions += classTotal
//       testClassTotals[testClassName] = classTotal
//     })
//     return { totalQuestions, testClassTotals }
//   }, [testClassSelections])

//   const totals = calculateTotals()

  const getSelectedSkillIds = useCallback((): number[] => {
    // If we have specific skill selections, use those
    if (Object.keys(testClassSelections).length > 0) {
      const skillIdsList: number[] = []
      Object.values(testClassSelections).forEach((skills) => {
        skills.forEach((skill) => {
          if (typeof skill.id === "number") {
            skillIdsList.push(skill.id)
          }
        })
      })
      return skillIdsList
    }
    // Otherwise, use all available skill IDs
    return skillIds.filter((id) => typeof id === "number")
  }, [testClassSelections, skillIds])

  // Event handlers
  const handleReset = useCallback(() => {
    setQuestionCount(1)
    setTestClassSelections({})
    setTestStartError(null)
    setTestId(null)
  }, [])

  const incrementCount = useCallback(() => {
    if (questionCount < 100) {
      setQuestionCount(questionCount + 1)
    }
  }, [questionCount])

  const decrementCount = useCallback(() => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1)
    }
  }, [questionCount])

  // Fetch test classes and skills with enhanced error handling
  const fetchTestClasses = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      setError("يجب تسجيل الدخول أولاً")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      })

      console.log("API Response:", response.data)

      if (response.data?.succeeded) {
        const testTypes = response.data?.data?.testTypes
        if (!Array.isArray(testTypes)) {
          console.error("testTypes is not an array:", testTypes)
          setError("تنسيق البيانات غير صحيح")
          return
        }

        const qudratTestType = testTypes.find(
          (testType) => testType && typeof testType.value === "string" && testType.value === "Tahsili",
        )

        if (qudratTestType && Array.isArray(qudratTestType.testClasses)) {
          // Extract test classes for display - with extensive validation
          const classesOnly: TestClass[] = []
          qudratTestType.testClasses.forEach((testClass) => {
            try {
              if (testClass && typeof testClass.id === "number" && typeof testClass.value === "string") {
                classesOnly.push({
                  id: testClass.id,
                  value: testClass.value,
                })
              } else {
                console.warn("Invalid test class:", testClass)
              }
            } catch (err) {
              console.error("Error processing test class:", testClass, err)
            }
          })

          setTestClasses(classesOnly)

          // Extract all skill IDs for test starting - with extensive validation
          const allSkillIds: number[] = []
          qudratTestType.testClasses.forEach((testClass) => {
            try {
              if (testClass && Array.isArray(testClass.skillTestsStatistics)) {
                testClass.skillTestsStatistics.forEach((skill) => {
                  try {
                    if (skill && typeof skill.id === "number") {
                      allSkillIds.push(skill.id)
                    } else {
                      console.warn("Invalid skill:", skill)
                    }
                  } catch (err) {
                    console.error("Error processing skill:", skill, err)
                  }
                })
              }
            } catch (err) {
              console.error("Error processing test class skills:", testClass, err)
            }
          })

          setSkillIds(allSkillIds)
          console.log("Extracted skill IDs:", allSkillIds)

          if (classesOnly.length === 0) {
            setError("لا توجد أقسام متاحة")
          }
        } else {
          setError("لم يتم العثور على بيانات اختبار التحصيلي")
        }
      } else {
        setError(response.data?.message || "فشل في جلب البيانات")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ في جلب البيانات"
      // Try to refresh token first
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchTestClasses()
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
              router.push("/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchTestClasses()
              }
              errorMessage = "ليس لديك صلاحية للوصول إلى هذه البيانات"
              break
            case 404:
              errorMessage = "لم يتم العثور على البيانات المطلوبة"
              break
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status})`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }

      console.error("Error fetching test classes:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [router])

  // Start test function with enhanced error handling
  const startTest = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      setTestStartError("يجب تسجيل الدخول أولاً لبدء الاختبار")
      return
    }

    if (data.remainingAttempts <= 0) {
      setTestStartError("لقد استنفدت جميع المحاولات المجانية")
      return
    }

    const selectedSkillIds = getSelectedSkillIds()
    if (selectedSkillIds.length === 0) {
      setTestStartError("لا توجد مهارات متاحة للاختبار")
      return
    }

    setIsStartingTest(true)
    setTestStartError(null)

    try {
      const requestBody: StartTestRequest = {
        skillIds: selectedSkillIds,
        count: questionCount,
      }

      dispatch(changeSkillIdTest(requestBody.skillIds))
      dispatch(changeQuestionCountTest(requestBody.count))
      dispatch(changeTimingLeftTest(Math.ceil(questionCount * 1.5)))
      console.log("timing left -----", formatExpectedTime(Math.ceil(questionCount * 1.5)))
      console.log("timing left Number -----", Math.ceil(questionCount * 1.5))
      console.log("requestBody +++++:", requestBody)

      console.log("Start test request:", requestBody)

      const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
        headers: getHeaders(),
        timeout: 15000,
      })

      console.log("Start test response:", response.data)

      if (response.data?.succeeded) {
        const testIdValue = Array.isArray(response.data?.data) ? response.data.data[0] : response.data.data
        if (testIdValue) {
          setTestId(testIdValue)
          // Update remaining attempts
          setData((prevData) => ({
            ...prevData,
            remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
          }))
          dispatch(changeResponseTestLength(response.data.data))
          // Redirect to test page
          router.push(`/dashboard/dashStudent/examGlobalTest?testId=${testIdValue}`)
        } else {
          setTestStartError("لم يتم إرجاع معرف الاختبار")
        }
      } else {
        setTestStartError(response.data?.message || "فشل في بدء الاختبار")
        if (response.data?.errors && Array.isArray(response.data.errors) && response.data.errors.length > 0) {
          setTestStartError(response.data.errors.join(", "))
        }
      }
    } catch (error) {
      let errorMessage = "حدث خطأ في بدء الاختبار"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return startTest()
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
              router.push("/login")
              break
            case 403:
              if (refreshSuccess) {
                return startTest()
              }
              errorMessage = "ليس لديك صلاحية لبدء الاختبار"
              break
            case 400:
              errorMessage = "بيانات الطلب غير صحيحة"
              break
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status})`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }

      console.error("Error starting test:", error)
      setTestStartError(errorMessage)
    } finally {
      setIsStartingTest(false)
    }
  }, [data.remainingAttempts, getSelectedSkillIds, questionCount, router])

  // Load data on component mount
  useEffect(() => {
    fetchTestClasses()
  }, [fetchTestClasses])

  // Check if user is authenticated
  const isAuthenticated = !!getAuthToken()

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-800 mb-2">تسجيل الدخول مطلوب</h2>
          <p className="text-yellow-700 mb-4">يجب تسجيل الدخول للوصول إلى محاكي الاختبار</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-md font-medium hover:bg-yellow-700 transition-colors"
            type="button"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-pink-700 rounded-full text-sm font-medium">
            باقي لديك {safeRender(data.remainingAttempts)} محاولة مجانية في الباقة الأساسية
          </div>
        </div>
      </div>

      {/* Advanced Options Section */}
      <div className="bg-gray-50 rounded-2xl shadow-lg border-b border-gray-200">
        <div className="p-6">
          <button className="flex items-center justify-between w-full group" type="button">
            <div className="flex items-center text-teal-600 font-semibold text-lg">
              <span>خيارات متقدمة</span>
            </div>
          </button>
          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Question Bank Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-white">
                  <Lock className="h-5 w-5" />
                  <span className="font-semibold text-lg">بنوك الأسئلة</span>
                </div>
                <div className="text-purple-100 text-sm bg-purple-400/30 px-3 py-1 rounded-full">
                  تم إضافة أسئلة جديدة بتاريخ 11/05/2023
                </div>
              </div>
            </div>
            {/* Question Count Controls */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-sm font-medium text-gray-700">عدد الأسئلة</h3>
                  {/* Counter with buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementCount}
                      disabled={questionCount <= 1 || isStartingTest}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{safeRender(questionCount)}</div>
                      <div className="text-xs text-gray-500">من 100</div>
                    </div>
                    <button
                      onClick={incrementCount}
                      disabled={questionCount >= 100 || isStartingTest}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${questionCount}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>
                  {/* Direct Input */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">أو أدخل العدد مباشرة:</span>
                    <input
                      type="number"
                      value={questionCount}
                      onChange={(e) =>
                        setQuestionCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))
                      }
                      min="1"
                      max="100"
                      disabled={isStartingTest}
                      className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>
                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    disabled={isStartingTest}
                    className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                  >
                    <RotateCcw className="h-4 w-4" />
                    إعادة تعيين
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Information Section */}
      <div className="p-6">
        <h2 className="text-2xl text-center text-orange-500 font-bold mb-8 relative">معلومات الاختبار</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="mr-2 text-gray-600">جاري تحميل البيانات...</span>
          </div>
        ) : error ? (
          <div className="p-4 text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-medium">{safeRender(error)}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {testClasses.length > 0 ? (
              testClasses.map((testClass) => {
                try {
                  return (
                    <div key={testClass.id} className="bg-white p-6 ">
                      <div className="text-center">
                        <h3 className="text-blue-600 font-bold text-lg mb-2">{safeRender(testClass.value)}</h3>
                        <p className="text-gray-700 font-semibold">كامل الأقسام</p>
                      </div>
                    </div>
                  )
                } catch (err) {
                  console.error("Error rendering test class:", testClass, err)
                  return (
                    <div key={`error-${testClass.id || Math.random()}`} className="bg-red-50 p-6 ">
                      <div className="text-center">
                        <h3 className="text-red-600 font-bold text-lg mb-2">خطأ في البيانات</h3>
                        <p className="text-gray-700 font-semibold text-xs">تعذر عرض هذا القسم</p>
                      </div>
                    </div>
                  )
                }
              })
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">لا توجد أقسام متاحة</div>
            )}
            <div className="bg-white p-6 ">
              <div className="text-center">
                <h3 className="text-blue-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
                <p className="text-gray-700 font-semibold text-xl">{safeRender(questionCount)}</p>
              </div>
            </div>
            <div className="bg-white p-6 ">
              <div className="text-center">
                <h3 className="text-blue-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
                <p className="text-gray-700 font-semibold text-xl">
                  {formatExpectedTime(Math.ceil(questionCount * 1.5))}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {testStartError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-600 font-medium">{safeRender(testStartError)}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {testId && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-center font-medium">
              تم إنشاء الاختبار بنجاح! معرف الاختبار: {safeRender(testId)}
            </p>
            <p className="text-green-600 text-center text-sm mt-1">سيتم توجيهك إلى صفحة الاختبار...</p>
          </div>
        )}

        {/* Start Test Button */}
        <div className="flex justify-center">
          <button
            onClick={startTest}
            disabled={isStartingTest || data.remainingAttempts <= 0 || loading}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
            type="button"
          >
            {isStartingTest ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                جاري التحضير...
              </>
            ) : (
              <>
                <span className="relative z-10">ابدأ الاختبار</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

