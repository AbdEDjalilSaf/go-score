// "use client"

// import { useState, useEffect } from "react"
// import { Check } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import axios from "axios"
// import Cookies from "js-cookie"

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
//   selected: boolean
// }

// interface TestClass {
//   id: number
//   value: string
//   skillTestsStatistics: SkillTestStatistic[]
//   selectAll: boolean
// }

// interface TestType {
//   id: number
//   value: string
//   testClasses: TestClass[]
// }

// interface ApiResponse {
//   data: {
//     testTypes: TestType[]
//   }
// }

// export default function Component() {
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Fetch data from API
//   useEffect(() => {
//     const fetchQudratData = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         const token = Cookies.get("accessToken") || ""

//         if (!token) {
//           setError("لا يوجد رمز وصول صالح")
//           setLoading(false)
//           return
//         }

//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//           timeout: 10000,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         console.log("API Response:", response.data)

//         const data = response.data

//         if (!data) {
//           throw new Error("لا توجد بيانات في الاستجابة")
//         }

//         if (!data.data.testTypes || !Array.isArray(data.data.testTypes)) {
//           console.error("Invalid data structure:", data)
//           throw new Error("هيكل البيانات غير صحيح - testTypes مفقود أو ليس مصفوفة")
//         }

//         if (data.data.testTypes.length === 0) {
//           setError("لا توجد أنواع اختبارات متاحة")
//           return
//         }

//         // Filter for Qudrat data
//         const qudratTestType = data.data.testTypes.find(
//           (testType) => testType?.value && testType.value.includes("Qudrat"),
//         )

//         if (qudratTestType) {
//           // Process test classes independently
//           const processedTestClasses: TestClass[] = []

//           if (qudratTestType.testClasses && Array.isArray(qudratTestType.testClasses)) {
//             qudratTestType.testClasses.forEach((testClass) => {
//               if (testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics)) {
//                 const processedSkills = testClass.skillTestsStatistics
//                   .filter((skill) => skill && skill.value)
//                   .map((skill) => ({
//                     ...skill,
//                     selected: false,
//                     questionsCount: skill.questionsCount || 0,
//                     correctAnswersCount: skill.correctAnswersCount || 0,
//                     ratio: skill.ratio || 0,
//                   }))

//                 if (processedSkills.length > 0) {
//                   processedTestClasses.push({
//                     ...testClass,
//                     skillTestsStatistics: processedSkills,
//                     selectAll: false,
//                   })
//                 }
//               }
//             })
//           }

//           if (processedTestClasses.length === 0) {
//             setError("لا توجد فئات متاحة في اختبارات القدرات")
//           } else {
//             setQudratTestClasses(processedTestClasses)
//           }
//         } else {
//           console.log(
//             "Available test types:",
//             data.data.testTypes.map((t) => t.value),
//           )
//           setError("لم يتم العثور على بيانات القدرات في الاستجابة")
//         }
//       } catch (err) {
//         console.error("Full error details:", err)
//         if (axios.isAxiosError(err)) {
//           if (err.response) {
//             console.error("Response data:", err.response.data)
//             console.error("Response status:", err.response.status)
//             setError(`خطأ في الخادم: ${err.response.status} - ${err.response.statusText}`)
//           } else if (err.request) {
//             console.error("Request details:", err.request)
//             setError("لا يمكن الوصول إلى الخادم - تحقق من الاتصال")
//           } else {
//             setError(`خطأ في الطلب: ${err.message}`)
//           }
//         } else if (err instanceof Error) {
//           setError(err.message)
//         } else {
//           setError("حدث خطأ غير متوقع")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQudratData()
//   }, [])

//   // Handle select all for a specific test class
//   const handleSelectAllForClass = (classId: number) => {
//     setQudratTestClasses((prevClasses) =>
//       prevClasses.map((testClass) => {
//         if (testClass.id === classId) {
//           const newSelectAll = !testClass.selectAll
//           return {
//             ...testClass,
//             selectAll: newSelectAll,
//             skillTestsStatistics: testClass.skillTestsStatistics.map((skill) => ({
//               ...skill,
//               selected: newSelectAll,
//             })),
//           }
//         }
//         return testClass
//       }),
//     )
//   }

//   // Handle individual skill selection
//   const handleSkillSelect = (classId: number, skillId: number) => {
//     setQudratTestClasses((prevClasses) =>
//       prevClasses.map((testClass) => {
//         if (testClass.id === classId) {
//           const updatedSkills = testClass.skillTestsStatistics.map((skill) =>
//             skill.id === skillId ? { ...skill, selected: !skill.selected } : skill,
//           )

//           // Update selectAll based on individual selections
//           const allSelected = updatedSkills.every((skill) => skill.selected)

//           return {
//             ...testClass,
//             skillTestsStatistics: updatedSkills,
//             selectAll: allSelected,
//           }
//         }
//         return testClass
//       }),
//     )
//   }

//   // Calculate statistics for a specific class
//   const getClassStatistics = (testClass: TestClass) => {
//     const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//     const totalQuestions = selectedSkills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//     const totalCorrect = selectedSkills.reduce((sum, skill) => sum + skill.correctAnswersCount, 0)
//     const overallRatio = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0

//     return { selectedSkills, totalQuestions, totalCorrect, overallRatio }
//   }

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <Card>
//           <CardContent className="flex items-center justify-center h-48">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c] mx-auto mb-4"></div>
//               <p className="text-gray-600" dir="rtl">
//                 جاري تحميل بيانات القدرات...
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <Card>
//           <CardContent className="flex items-center justify-center h-48">
//             <div className="text-center text-red-600" dir="rtl">
//               <p>{error}</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
// <>
//       {qudratTestClasses.length === 0 ? (
//         <div className="max-w-6xl mx-auto p-6 space-y-6">
//         <Card>
//           <CardContent className="text-center py-8 text-gray-500" dir="rtl">
//             لا توجد بيانات متاحة لاختبارات القدرات
//           </CardContent>
//         </Card>
//         </div>

//       ) : (
        
//           <>
//           {qudratTestClasses.map((testClass) => {
//             const stats = getClassStatistics(testClass)
//             // let counts = 0;
//             // counts++;
//             // console.log("counts", counts)
//             console.log("Statistics for class:", testClass,"++++++", stats)
//             return (
//              <div key={testClass.id} className="max-w-6xl mx-auto p-6 space-y-6">
//               <div  className="space-y-6 flex flex-row">
//               <Card  className="bg-gray-50">
//               <div  className="mb-6 ">
//               <CardContent className="flex flex-col gap-4">
//                   {/* Class Header with select all */}
//                   <div className="flex items-center gap-3 mb-4">
//                     <button
//                       onClick={() => handleSelectAllForClass(testClass.id)}
//                       className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
//                         testClass.selectAll
//                           ? "bg-green-600 border-green-600 text-white"
//                           : "border-gray-300 bg-white hover:border-gray-400"
//                       }`}
//                     >
//                       {testClass.selectAll && <Check className="w-4 h-4" />}
//                     </button>
//                     <CardTitle className="text-xl font-semibold text-gray-800" dir="rtl">
//                       {testClass.value}
//                     </CardTitle>
//                   </div>

//                   {/* Statistics for selected skills in this class */}
//                   {/* {stats.selectedSkills.length > 0 && (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div className="bg-blue-50 p-3 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-blue-700" dir="rtl">
//                             إجمالي الأسئلة
//                           </span>
//                           <BarChart3 className="h-4 w-4 text-blue-600" />
//                         </div>
//                         <div className="text-lg font-bold text-blue-800">{stats.totalQuestions}</div>
//                       </div>

//                       <div className="bg-green-50 p-3 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-green-700" dir="rtl">
//                             الإجابات الصحيحة
//                           </span>
//                           <Target className="h-4 w-4 text-green-600" />
//                         </div>
//                         <div className="text-lg font-bold text-green-800">{stats.totalCorrect}</div>
//                       </div>

//                       <div className="bg-purple-50 p-3 rounded-lg">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-purple-700" dir="rtl">
//                             معدل النجاح
//                           </span>
//                           <TrendingUp className="h-4 w-4 text-purple-600" />
//                         </div>
//                         <div className="text-lg font-bold text-purple-800">{stats.overallRatio.toFixed(1)}%</div>
//                       </div>
//                     </div>
//                   )} */}
                

                
//                   {/* Skills Grid */}
//                   <div className="flex flex-col md:flex-row gap-4">
//                     {testClass.skillTestsStatistics.map((skill) => (
//                       <button
//                         key={skill.id}
//                         onClick={() => handleSkillSelect(testClass.id, skill.id)}
//                         className={`p-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 text-right ${
//                           skill.selected
//                             ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
//                             : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
//                         }`}
//                         dir="rtl"
//                       >
//                         <div className="space-y-2">
//                           <div className="font-semibold text-sm">{skill.value}</div>
//                           {/* <div className="text-xs opacity-80">
//                             <div>الأسئلة: {skill.questionsCount}</div>
//                             <div>الصحيحة: {skill.correctAnswersCount}</div>
//                             <div>النسبة: {(skill.ratio * 100).toFixed(1)}%</div>
//                           </div> */}
//                         </div>
//                       </button>
//                     ))}
//                   </div>

//                   {/* Selected count for this class */}
//                   <div className="mt-4 text-sm text-gray-600 text-center" dir="rtl">
//                     تم اختيار {stats.selectedSkills.length} من {testClass.skillTestsStatistics.length} مهارة في{" "}
//                     {testClass.value}
//                   </div>
//                   </CardContent>
//                   </div>
//                   </Card>
//                   </div>
//                   </div>
//                   )
//              })}
//                </> 
            
//       )}
//     </>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { Check } from "lucide-react"
// import { Card, CardContent, CardTitle } from "@/components/ui/card"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"

// interface SkillTestStatistic {
//   id: number
//   value: string
//   questionsCount: number
//   correctAnswersCount: number
//   ratio: number
//   selected: boolean
// }

// interface TestClass {
//   id: number
//   value: string
//   skillTestsStatistics: SkillTestStatistic[]
//   selectAll: boolean
// }

// interface TestType {
//   id: number
//   value: string
//   testClasses: TestClass[]
// }

// interface ApiResponse {
//   data: {
//     testTypes: TestType[]
//   }
// }

// interface QuizSectionsProps {
//   onSelectionChange: (selectedSkills: SkillTestStatistic[], testClassName: string) => void
// }

// export default function QuizSections({ onSelectionChange }: QuizSectionsProps) {
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Fetch data from API
//   useEffect(() => {
//     const fetchQudratData = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         const token = Cookies.get("accessToken") || ""

//         if (!token) {
//           setError("لا يوجد رمز وصول صالح")
//           setLoading(false)
//           return
//         }

//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
//           timeout: 10000,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         const data = response.data

//         if (!data || !data.data.testTypes || !Array.isArray(data.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح")
//         }

//         // Filter for Qudrat data and get unique test classes
//         const qudratTestType = data.data.testTypes.find((testType) => testType?.value && testType.value.includes("Qudrat"))

//         if (qudratTestType && qudratTestType.testClasses && Array.isArray(qudratTestType.testClasses)) {
//           const uniqueClasses = qudratTestType.testClasses.filter((testClass, index, array) => {
//             return array.findIndex((c) => c.value === testClass.value) === index
//           })

//           const processedTestClasses: TestClass[] = uniqueClasses
//             .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//             .map((testClass) => {
//               const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//                 return skill && skill.value && array.findIndex((s) => s.value === skill.value) === index
//               })

//               const processedSkills = uniqueSkills.map((skill) => ({
//                 ...skill,
//                 selected: false,
//                 questionsCount: skill.questionsCount || 0,
//                 correctAnswersCount: skill.correctAnswersCount || 0,
//                 ratio: skill.ratio || 0,
//               }))

//               return {
//                 ...testClass,
//                 skillTestsStatistics: processedSkills,
//                 selectAll: false,
//               }
//             })
//             .filter((testClass) => testClass.skillTestsStatistics.length > 0)

//           setQudratTestClasses(processedTestClasses)
//         } else {
//           setError("لم يتم العثور على بيانات القدرات في الاستجابة")
//         }
//       } catch (error) {
//             let errorMessage = "Unknown error occurred"

//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         switch (error.response.status) {
//           case 401:
//             // Token expired or invalid
//             errorMessage = "Authentication expired. Please log in again."
//             // Clear the expired token
//             // Redirect to login or refresh token
//             window.location.href = '/login'
//             break
//           case 403:

//             // Try to refresh token if you have refresh token logic
//             const refreshSuccess = await refreshAuthToken()
//             if (refreshSuccess) {
//               return fetchQudratData() // Retry with new token
//             }
//             // Check if it's a token issue or permissions issue
//             errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."

//             break
//           case 404:
//             errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//             break
//           case 500:
//             errorMessage = "Server error (500). Please try again later."
//             break
//           default:
//             errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//         }
//       } else if (error.request) {
//         errorMessage = "Network error. Please check your internet connection."
//       } else {
//         errorMessage = `Request error: ${error.message}`
//       }
//     } else {
//       errorMessage = error instanceof Error ? error.message : "Unknown error"
//     }
//         console.error("Error fetching data:", error)
//         setError("حدث خطأ في تحميل البيانات")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQudratData()
//   }, [])

//   // Remove this entire useEffect block:
//   // useEffect(() => {
//   //   qudratTestClasses.forEach((testClass) => {
//   //     const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//   //     if (selectedSkills.length > 0) {
//   //       onSelectionChange(selectedSkills, testClass.value)
//   //     }
//   //   })
//   // }, [qudratTestClasses, onSelectionChange])

//   // Handle select all for a specific test class
//   const handleSelectAllForClass = (classId: number) => {
//     setQudratTestClasses((prevClasses) => {
//       const updatedClasses = prevClasses.map((testClass) => {
//         if (testClass.id === classId) {
//           const newSelectAll = !testClass.selectAll
//           return {
//             ...testClass,
//             selectAll: newSelectAll,
//             skillTestsStatistics: testClass.skillTestsStatistics.map((skill) => ({
//               ...skill,
//               selected: newSelectAll,
//             })),
//           }
//         }
//         return testClass
//       })

//       // Notify parent with all current selections after state update
//       setTimeout(() => {
//         updatedClasses.forEach((testClass) => {
//           const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//           onSelectionChange(selectedSkills, testClass.value)
//         })
//       }, 0)

//       return updatedClasses
//     })
//   }

//   // Handle individual skill selection
//   const handleSkillSelect = (classId: number, skillId: number) => {
//     setQudratTestClasses((prevClasses) => {
//       const updatedClasses = prevClasses.map((testClass) => {
//         if (testClass.id === classId) {
//           const updatedSkills = testClass.skillTestsStatistics.map((skill) =>
//             skill.id === skillId ? { ...skill, selected: !skill.selected } : skill,
//           )

//           const allSelected = updatedSkills.every((skill) => skill.selected)
//           return {
//             ...testClass,
//             skillTestsStatistics: updatedSkills,
//             selectAll: allSelected,
//           }
//         }
//         return testClass
//       })

//       // Notify parent with all current selections after state update
//       setTimeout(() => {
//         updatedClasses.forEach((testClass) => {
//           const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//           onSelectionChange(selectedSkills, testClass.value)
//         })
//       }, 0)

//       return updatedClasses
//     })
//   }

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[1, 2].map((i) => (
//           <Card key={i} className="bg-gray-50">
//             <CardContent className="flex items-center justify-center h-48">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c]"></div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="bg-red-50">
//           <CardContent className="flex items-center justify-center h-48">
//             <p className="text-red-600 text-center" dir="rtl">
//               {error}
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {qudratTestClasses.map((testClass) => {
//         const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)

//         return (
//           <Card key={testClass.id} className="bg-gray-50">
//             <CardContent className="p-6">
//               {/* Class Header with select all */}
//               <div className="flex items-center gap-3 mb-4">
//                 <button
//                   onClick={() => handleSelectAllForClass(testClass.id)}
//                   className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
//                     testClass.selectAll
//                       ? "bg-green-600 border-green-600 text-white"
//                       : "border-gray-300 bg-white hover:border-gray-400"
//                   }`}
//                 >
//                   {testClass.selectAll && <Check className="w-4 h-4" />}
//                 </button>
//                 <CardTitle className="text-lg font-semibold text-gray-800" dir="rtl">
//                   {testClass.value}
//                 </CardTitle>
//               </div>

//               {/* Skills List */}
//               <div className="space-y-2">
//                 {testClass.skillTestsStatistics.map((skill) => (
//                   <button
//                     key={skill.id}
//                     onClick={() => handleSkillSelect(testClass.id, skill.id)}
//                     className={`w-full p-3 rounded-lg font-medium transition-all duration-200 border-2 text-right ${
//                       skill.selected
//                         ? "bg-[#59169c] text-white border-[#59169c]"
//                         : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
//                     }`}
//                     dir="rtl"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">{skill.value}</span>
//                       {/* <span className="text-xs opacity-80">{skill.questionsCount} سؤال</span> */}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Selection Summary */}
//               <div className="mt-4 text-center">
//                 <span className="text-sm text-gray-600" dir="rtl">
//                   تم اختيار {selectedSkills.length} من {testClass.skillTestsStatistics.length}
//                 </span>
//                 {/* {selectedSkills.length > 0 && (
//                   <div className="text-xs text-blue-600 mt-1" dir="rtl">
//                     إجمالي الأسئلة: {selectedSkills.reduce((sum, skill) => sum + skill.questionsCount, 0)}
//                   </div>
//                 )} */}
//               </div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"

interface SkillTestStatistic {
  id: number
  value: string
  questionsCount: number
  correctAnswersCount: number
  ratio: number
  selected: boolean
}

interface TestClass {
  id: number
  value: string
  skillTestsStatistics: SkillTestStatistic[]
  selectAll: boolean
}

interface TestType {
  id: number
  value: string
  testClasses: TestClass[]
}

interface ApiResponse {
  data: {
    testTypes: TestType[]
  }
}

interface QuizSectionsProps {
  onSelectionChange: (selectedSkills: SkillTestStatistic[], testClassName: string) => void
}

export default function QuizSections({ onSelectionChange }: QuizSectionsProps) {
  const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
const router = useRouter()
  // Fetch data from API
  useEffect(() => {
    const fetchQudratData = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = Cookies.get("accessToken") || ""

        if (!token) {
          setError("لا يوجد رمز وصول صالح")
          setLoading(false)
          return
        }

        const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Statistics/GetAnalyticalStatistics`, {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        const data = response.data
        if (!data || !data.data.testTypes || !Array.isArray(data.data.testTypes)) {
          throw new Error("هيكل البيانات غير صحيح")
        }

        // Filter for Qudrat data and get unique test classes
        const qudratTestType = data.data.testTypes.find(
          (testType) => testType?.value && testType.value.includes("Qudrat"),
        )

        if (qudratTestType && qudratTestType.testClasses && Array.isArray(qudratTestType.testClasses)) {
          const uniqueClasses = qudratTestType.testClasses.filter((testClass, index, array) => {
            return array.findIndex((c) => c.value === testClass.value) === index
          })

          const processedTestClasses: TestClass[] = uniqueClasses
            .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
            .map((testClass) => {
              const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
                return skill && skill.value && array.findIndex((s) => s.value === skill.value) === index
              })

              const processedSkills = uniqueSkills.map((skill) => ({
                ...skill,
                selected: false,
                questionsCount: skill.questionsCount || 0,
                correctAnswersCount: skill.correctAnswersCount || 0,
                ratio: skill.ratio || 0,
              }))

              return {
                ...testClass,
                skillTestsStatistics: processedSkills,
                selectAll: false,
              }
            })
            .filter((testClass) => testClass.skillTestsStatistics.length > 0)
console.log("processedTestClasses ++ :",processedTestClasses)
          setQudratTestClasses(processedTestClasses)
        } else {
          setError("لم يتم العثور على بيانات القدرات في الاستجابة")
        }
      } catch (error) {
        let errorMessage = "Unknown error occurred"
        const refreshSuccess = await refreshAuthToken()

        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                if (refreshSuccess) {
                  return fetchQudratData()
                }
                errorMessage = "Authentication expired. Please log in again."
                // window.location.href = "/login"
                router.push("/login")
                break
              case 403:
                if (refreshSuccess) {
                  return fetchQudratData()
                }
                errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                console.log("errorMessage",errorMessage);
                
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
        setError("حدث خطأ في تحميل البيانات")
      } finally {
        setLoading(false)
      }
    }

    fetchQudratData()
  }, [])

  // Handle select all for a specific test class
  const handleSelectAllForClass = (classId: number) => {
    setQudratTestClasses((prevClasses) => {
      const updatedClasses = prevClasses.map((testClass) => {
        if (testClass.id === classId) {
          const newSelectAll = !testClass.selectAll
          return {
            ...testClass,
            selectAll: newSelectAll,
            skillTestsStatistics: testClass.skillTestsStatistics.map((skill) => ({
              ...skill,
              selected: newSelectAll,
            })),
          }
        }
        return testClass
      })

      // Notify parent with all current selections after state update
      setTimeout(() => {
        updatedClasses.forEach((testClass) => {
          const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
          onSelectionChange(selectedSkills, testClass.value)
        })
      }, 0)

      return updatedClasses
    })
  }

  // Handle individual skill selection
  const handleSkillSelect = (classId: number, skillId: number) => {
    setQudratTestClasses((prevClasses) => {
      const updatedClasses = prevClasses.map((testClass) => {
        if (testClass.id === classId) {
          const updatedSkills = testClass.skillTestsStatistics.map((skill) =>
            skill.id === skillId ? { ...skill, selected: !skill.selected } : skill,
          )
          const allSelected = updatedSkills.every((skill) => skill.selected)
          return {
            ...testClass,
            skillTestsStatistics: updatedSkills,
            selectAll: allSelected,
          }
        }
        return testClass
      })

      // Notify parent with all current selections after state update
      setTimeout(() => {
        updatedClasses.forEach((testClass) => {
          const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
          onSelectionChange(selectedSkills, testClass.value)
        })
      }, 0)

      return updatedClasses
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="bg-gray-50">
            <CardContent className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c]"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-red-50">
          <CardContent className="flex items-center justify-center h-48">
            <p className="text-red-600 text-center" dir="rtl">
              {error}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {qudratTestClasses.map((testClass) => {
        const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
        return (
          <Card key={testClass.id} className="bg-gray-50">
            <CardContent className="p-6">
              {/* Class Header with select all */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => handleSelectAllForClass(testClass.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    testClass.selectAll
                      ? "bg-green-600 border-green-600 text-white"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                type="button">
                  {testClass.selectAll && <Check className="w-4 h-4" />}
                </button>
                <CardTitle className="text-lg font-semibold text-gray-800" dir="rtl">
                  {testClass.value}
                </CardTitle>
              </div>
              {/* Skills List */}
              <div className="space-y-2">
                {testClass.skillTestsStatistics.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => handleSkillSelect(testClass.id, skill.id)}
                    className={`w-full p-3 rounded-lg font-medium transition-all duration-200 border-2 text-right ${
                      skill.selected
                        ? "bg-[#59169c] text-white border-[#59169c]"
                        : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                    dir="rtl"
                  type="button">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{skill.value}</span>
                    </div>
                  </button>
                ))}
              </div>
              {/* Selection Summary */}
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600" dir="rtl">
                  تم اختيار {selectedSkills.length} من {testClass.skillTestsStatistics.length}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
