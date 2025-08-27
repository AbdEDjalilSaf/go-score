// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Loader2, AlertCircle  } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import Cookies from "js-cookie"

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

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
//   selected: boolean
// }

// interface TestClassSelection {
//   [testClassName: string]: SkillTestStatistic[]
// }

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface StartTestResponse {
//   meta: null
//   succeeded: boolean
//   message: string
//   errors: null
//   data: any[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"


// export default function QudratTestClasses({ qestioCount }: { qestioCount: number }) {
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [loading, setLoading] = useState(true) 
//   const [error, setError] = useState<string | null>(null)
//   const [questionCount] = useState(1)
//   const [testClassSelections] = useState<TestClassSelection>({})
//   const [remainingAttempts] = useState(3)
//   const [isStartingTest, setIsStartingTest] = useState(false)
//   const [testStartError, setTestStartError] = useState<string | null>(null)
//  const router = useRouter()


 
//    const getSelectedSkillIds = (): number[] => {
//     const skillIds: number[] = []
//     Object.values(testClassSelections).forEach((skills) => {
//       skills.forEach((skill) => {
//         skillIds.push(skill.id)
//       })
//     })
//     return skillIds
//   }


//   const startTest = async () => {
//     const selectedSkillIds = getSelectedSkillIds()

//     if (selectedSkillIds.length === 0) {
//       setTestStartError("يرجى اختيار مهارة واحدة على الأقل")
//       return
//     }

//     setIsStartingTest(true)
//     setTestStartError(null)

//     try {
//       const token = Cookies.get("accessToken")

//       if (!token) {
//         setTestStartError("لا يوجد رمز وصول صالح")
//         return
//       }

//       const requestData: StartTestRequest = {
//         skillIds: selectedSkillIds,
//         count: questionCount,
//       }
// console.log("start test Request")
//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 15000,
//       })
// console.log("good test Request")

//       if (response.data.succeeded) {
//         // Handle successful test start
//         console.log("Test started successfully:", response.data)

//         // You can redirect to test page or handle the response data
//         // For example:
//         router.push('/dashboard/dashStudent/examGlobalTest')
//         // router.push('/test-session')
//         // or store test session data in state/context

//         // alert("تم بدء الاختبار بنجاح!")
//       } else {
//         setTestStartError(response.data.message || "فشل في بدء الاختبار")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:

//               if (refreshSuccess) {
//                 return startTest() // Retry with new token
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//               // Redirect to login
//               // window.location.href = "/login"
//               break
//             case 403:
//               // Try to refresh token
//               if (refreshSuccess) {
//                 return startTest() // Retry with new token
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
//       }

//       console.error("Error starting test:", error)
//       setTestStartError(errorMessage)
//     } finally {
//       setIsStartingTest(false)
//     }
//   }

//   useEffect(() => {
//     const fetchTestClasses = async () => {
//         const token = Cookies.get("accessToken")
//       try {

//         setLoading(true)
//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`,
//             {
//                 headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`
//                 }
//             }
//         )

//         if (response.data.succeeded) {
//           // Find Qudrat test type and extract only test classes values
//           const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")

//           if (qudratTestType) {
//             // Extract only the test classes without skillTestsStatistics
//             const classesOnly = qudratTestType.testClasses.map((testClass) => ({
//               id: testClass.id,
//               value: testClass.value,
//             }))
//             setTestClasses(classesOnly)
//           } else {
//             setError("لم يتم العثور على بيانات اختبار القدرات")
//           }
//         } else {
//           setError(response.data.message || "فشل في جلب البيانات")
//         }
//       } catch (error) {
//          let errorMessage = "Unknown error occurred"
//                 const refreshSuccess = await refreshAuthToken()
        
//                 if (axios.isAxiosError(error)) {
//                   if (error.response) {
//                     switch (error.response.status) {
//                       case 401:
//                         if (refreshSuccess) {
//                           return fetchTestClasses()
//                         }
//                         errorMessage = "Authentication expired. Please log in again."
//                         window.location.href = "/login"
//                         break
//                       case 403:
//                         if (refreshSuccess) {
//                           return fetchTestClasses()
//                         }
//                         errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                         console.log("errorMessage",errorMessage);
//                        
//                         break
//                       case 404:
//                         errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//                         break
//                       case 500:
//                         errorMessage = "Server error (500). Please try again later."
//                         break
//                       default:
//                         errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//                     }
//                   } else if (error.request) {
//                     errorMessage = "Network error. Please check your internet connection."
//                   } else {
//                     errorMessage = `Request error: ${error.message}`
//                   }
//                 } else {
//                   errorMessage = error instanceof Error ? error.message : "Unknown error"
//                 }
        
//                 console.error("Error fetching data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTestClasses()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="mr-2 text-gray-600">جاري تحميل البيانات...</span>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//         <div className="text-red-600 font-medium">{error}</div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">معلومات الاختبار</h1>

//       <div className="space-y-4 flex flex-col md:flex-row justify-between items-center">
//         {testClasses.map((testClass) => (
//           <div
//             key={testClass.id}
//             className="bg-white  p-4"
//           >
//             <div className="flex flex-col gap-2 items-center justify-between">
//               <h2 className="text-blue-600 font-bold">{testClass.value}</h2>
//               <p className=" text-gray-700 ">كامل الاقسام</p>
//             </div>
//           </div>
//         ))}
          
//           <div className="flex flex-col gap-2 items-center">
//             <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
//             <p className="text-gray-700">{qestioCount}</p>
//           </div>
//           <div className="flex flex-col gap-2 items-center">
//             <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
//             <p className="text-gray-700">{Math.ceil(qestioCount * 1.5)} دقيقة</p>
//           </div>


//         {error && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{error}</p>
//             </div>
//           </div>
//         )}


//         <div className="mt-12 flex justify-center">
//         </div>
          

//         {/* {data.remainingAttempts <= 0 && (
//           <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-600 text-center font-medium">
//               لقد استنفدت جميع المحاولات المجانية. يرجى ترقية باقتك للمتابعة.
//             </p>
//           </div>
//         )} */}
//       </div>

          

//       {testClasses.length === 0 && (
//         <div className="text-center text-gray-500 py-8">لا توجد أقسام متاحة لاختبار القدرات</div>
//       )}

//     </div>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { AlertCircle } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import Cookies from "js-cookie"


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

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
//   selected: boolean
// }

// interface TestClassSelection {
//   [testClassName: string]: SkillTestStatistic[]
// }

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface StartTestResponse {
//   meta: null
//   succeeded: boolean
//   message: string
//   errors: null
//   data: any[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function QudratTestClasses({ qestioCount }: { qestioCount: number }) {
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [questionCount] = useState(1)
//   const [testClassSelections] = useState<TestClassSelection>({})
//   const [remainingAttempts] = useState(3)
//   const [isStartingTest, setIsStartingTest] = useState(false)
//   const [testStartError, setTestStartError] = useState<string | null>(null)

//   const router = useRouter()


//   // Helper function to format time in hours and minutes
//   const formatExpectedTime = (totalMinutes: number): string => {
//     const hours = Math.floor(totalMinutes / 60)
//     const minutes = totalMinutes % 60

//     if (hours === 0) {
//       return `${minutes} دقيقة`
//     } else if (minutes === 0) {
//       return `${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
//     } else {
//       const hourText = hours === 1 ? "ساعة" : "ساعات"
//       return `${hours} ${hourText} و ${minutes} دقيقة`
//     }
//   }

//   const getSelectedSkillIds = (): number[] => {
//     const skillIds: number[] = []
//     Object.values(testClassSelections).forEach((skills) => {
//       skills.forEach((skill) => {
//         skillIds.push(skill.id)
//       })
//     })
//     return skillIds
//   }

// const startTest = async () => {
//     const selectedSkillIds = getSelectedSkillIds()
//     if (selectedSkillIds.length === 0) {
//       setTestStartError("يرجى اختيار مهارة واحدة على الأقل")
//       return
//     }

//     setIsStartingTest(true)
//     setTestStartError(null)

//     try {
//       const token = Cookies.get("accessToken")
//       if (!token) {
//         setTestStartError("لا يوجد رمز وصول صالح")
//         return
//       }

//       const requestData: StartTestRequest = {
//         skillIds: selectedSkillIds,
//         count: questionCount,
//       }

//       console.log("start test Request")
//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 15000,
//       })

//       console.log("good test Request")
//       if (response.data.succeeded) {
//         console.log("Test started successfully:", response.data)
//         router.push("/dashboard/dashStudent/examGlobalTest")
//       } else {
//         setTestStartError(response.data.message || "فشل في بدء الاختبار")
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
//               router.push("/login")
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
//       }

//       console.error("Error starting test:", error)
//       setTestStartError(errorMessage)
//     } finally {
//       setIsStartingTest(false)
//     }
//   }

//   useEffect(() => {
//     const fetchTestClasses = async () => {
//       const token = Cookies.get("accessToken")
//       try {
//         setLoading(true)
//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (response.data.succeeded) {
//           const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")
//           if (qudratTestType) {
//             const classesOnly = qudratTestType.testClasses.map((testClass) => ({
//               id: testClass.id,
//               value: testClass.value,
//             }))
//             setTestClasses(classesOnly)
//           } else {
//             setError("لم يتم العثور على بيانات اختبار القدرات")
//           }
//         } else {
//           setError(response.data.message || "فشل في جلب البيانات")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()

//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchTestClasses()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchTestClasses()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 console.log("errorMessage", errorMessage)
//                 break
//               case 404:
//                 errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//                 break
//               case 500:
//                 errorMessage = "Server error (500). Please try again later."
//                 break
//               default:
//                 errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//             }
//           } else if (error.request) {
//             errorMessage = "Network error. Please check your internet connection."
//           } else {
//             errorMessage = `Request error: ${error.message}`
//           }
//         } else {
//           errorMessage = error instanceof Error ? error.message : "Unknown error"
//         }

//         console.error("Error fetching data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTestClasses()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="mr-2 text-gray-600">جاري تحميل البيانات...</span>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
//         <div className="text-red-600 font-medium">{error}</div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">معلومات الاختبار</h1>
//       <div className="space-y-4 flex flex-col md:flex-row justify-between items-center">
//         {testClasses.map((testClass) => (
//           <div key={testClass.id} className="bg-white p-4">
//             <div className="flex flex-col gap-2 items-center justify-between">
//               <h2 className="text-blue-600 font-bold">{testClass.value}</h2>
//               <p className="text-gray-700">كامل الاقسام</p>
//             </div>
//           </div>
//         ))}

//         <div className="flex flex-col gap-2 items-center">
//           <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
//           <p className="text-gray-700">{qestioCount}</p>
//         </div>

//         <div className="flex flex-col gap-2 items-center">
//           <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
//           <p className="text-gray-700">{formatExpectedTime(Math.ceil(qestioCount * 1.5))}</p>
//         </div>

//         {error && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{error}</p>
//             </div>
//           </div>
//         )}

//         <div className="mt-12 flex justify-center"></div>
//       </div>

//       {testClasses.length === 0 && (
//         <div className="text-center text-gray-500 py-8">لا توجد أقسام متاحة لاختبار القدرات</div>
//       )}
//     </div>
//   )
// }












"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import Cookies from "js-cookie"

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
  selected: boolean
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
  meta: null
  succeeded: boolean
  message: string
  errors: null
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
  meta: null
  succeeded: boolean
  message: string
  errors: null
  data: any[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function QudratTestClasses({ qestioCount }: { qestioCount: number }) {
  const [testClasses, setTestClasses] = useState<TestClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [questionCount] = useState(1)
  const [testClassSelections] = useState<TestClassSelection>({})

  const router = useRouter()

  // Helper function to format time in hours and minutes
  const formatExpectedTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const seconds = 0 // Since we're working with whole minutes

    // Format as HH:MM:SS with zero padding
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const getSelectedSkillIds = (): number[] => {
    const skillIds: number[] = []
    Object.values(testClassSelections).forEach((skills) => {
      skills.forEach((skill) => {
        skillIds.push(skill.id)
      })
    })
    return skillIds
  }

  const startTest = async () => {
    const selectedSkillIds = getSelectedSkillIds()
    if (selectedSkillIds.length === 0) {
      setError("يرجى اختيار مهارة واحدة على الأقل")
      return
    }

    try {
      const token = Cookies.get("accessToken")
      if (!token) {
        setError("لا يوجد رمز وصول صالح")
        return
      }

      const requestData: StartTestRequest = {
        skillIds: selectedSkillIds,
        count: questionCount,
      }

      console.log("start test Request")
      const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      })

      console.log("good test Request")
      if (response.data.succeeded) {
        console.log("Test started successfully:", response.data)
        router.push("/dashboard/dashStudent/examGlobalTest")
      } else {
        setError(response.data.message || "فشل في بدء الاختبار")
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
              router.push("/login")
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
      }

      console.error("Error starting test:", error)
      setError(errorMessage)
    }
  }

  useEffect(() => {
    const fetchTestClasses = async () => {
      const token = Cookies.get("accessToken")
      try {
        setLoading(true)
        const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.succeeded) {
          const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")
          if (qudratTestType) {
            const classesOnly = qudratTestType.testClasses.map((testClass) => ({
              id: testClass.id,
              value: testClass.value,
            }))
            setTestClasses(classesOnly)
          } else {
            setError("لم يتم العثور على بيانات اختبار القدرات")
          }
        } else {
          setError(response.data.message || "فشل في جلب البيانات")
        }
      } catch (error) {
        let errorMessage = "Unknown error occurred"
        const refreshSuccess = await refreshAuthToken()

        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                if (refreshSuccess) {
                  return fetchTestClasses()
                }
                errorMessage = "Authentication expired. Please log in again."
                router.push("/login")
                break
              case 403:
                if (refreshSuccess) {
                  return fetchTestClasses()
                }
                errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                console.log("errorMessage", errorMessage)
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
      } finally {
        setLoading(false)
      }
    }

    fetchTestClasses()
  }, [])

useEffect(()=>{
  console.log("timeing +++++++++",formatExpectedTime(Math.ceil(qestioCount * 1.5)))
},[])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="mr-2 text-gray-600">جاري تحميل البيانات...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div className="text-red-600 font-medium">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">معلومات الاختبار</h1>
      <div className="space-y-4 flex flex-col md:flex-row justify-between items-center">
        {testClasses.map((testClass) => (
          <div key={testClass.id} className="bg-white p-4">
            <div className="flex flex-col gap-2 items-center justify-between">
              <h2 className="text-blue-600 font-bold">{testClass.value}</h2>
              <p className="text-gray-700">كامل الاقسام</p>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
          <p className="text-gray-700">{qestioCount}</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
          <p className="text-gray-700">{formatExpectedTime(Math.ceil(qestioCount * 1.5))}</p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center"></div>
      </div>

      {testClasses.length === 0 && (
        <div className="text-center text-gray-500 py-8">لا توجد أقسام متاحة لاختبار القدرات</div>
      )}
    </div>
  )
}
