// // "use client"

// // import { useState, useEffect } from "react"
// // import { Check } from "lucide-react"



// // interface Category {
// //    id: string
// //   text: string
// //   selected: boolean
// // }
// // interface QuizSectionsProps {
// //   title: string,
// //   id: string,
// //   categories: Category[]
// // }

// // export default function Component({ title, categories, id }: QuizSectionsProps) {
// //   // const [items, setItems] = useState<SelectableItem[]>([
// //   //   { id: "1", text: "إكتمال الجمل", selected: false },
// //   //   { id: "2", text: "النمط السياقي", selected: false },
// //   //   { id: "3", text: "المفردة الناقصة", selected: false },
// //   //   { id: "4", text: "استيعاب المقروء", selected: false },
// //   //   { id: "5", text: "التناظر اللفظي", selected: false },
// //   //   { id: "6", text: "", selected: false }, // Empty for layout
// //   // ])

// //    const [items, setItems] = useState<Category[]>(categories)

// //   const [selectAll, setSelectAll] = useState(false)

// //   // Update selectAll checkbox based on individual items
// //   useEffect(() => {
// //     const activeItems = items.filter((item) => item.text !== "")
// //     const allSelected = activeItems.length > 0 && activeItems.every((item) => item.selected)
// //     setSelectAll(allSelected)
// //   }, [items])

// //   // Handle select all checkbox
// //   const handleSelectAll = () => {
// //     const newSelectAll = !selectAll
// //     setSelectAll(newSelectAll)
// //     setItems(categories.map((item) => (item.text !== "" ? { ...item, selected: newSelectAll } : item)))
// //   }

// //   // Handle individual item selection
// //   const handleItemSelect = (id: string) => {
// //     setItems(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
// //   }

// //   return (
// //     <div className="max-w-[500px] w-[370px] sm:w-[480px] md:w-[300px] xl:w-[350px] lg:w-[320px] mx-auto p-6 bg-gray-100 rounded-lg">
// //       {/* Header with checkbox and title */}
// //       <div className="flex items-center gap-3 mb-6">
// //         <button
// //           onClick={handleSelectAll}
// //           className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
// //             selectAll ? "bg-green-600 border-green-600 text-white" : "border-gray-300 bg-white hover:border-gray-400"
// //           }`}
// //         >
// //           {selectAll && <Check className="w-4 h-4" />}
// //         </button>
// //         <h2 className="text-lg font-semibold text-gray-800" dir="rtl">
// //            {title}
// //         </h2>
// //       </div>

// //       {/* Grid of selectable items */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //         {items.map((item) =>
// //           item.text ? (
// //             <button
// //               key={item.id}
// //               onClick={() => handleItemSelect(item.id)}
// //               className={`p-4  rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 ${
// //                 item.selected
// //                   ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
// //                   : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
// //               }`}
// //               dir="rtl"
// //             >
// //               {item.text}
// //             </button>
// //           ) : (
// //             // Empty space for the last item to maintain grid layout
// //             <div key={item.id} className="hidden sm:block"></div>
// //           ),
// //         )}
// //       </div>

// //       {/* Selected count indicator */}
// //       {/* <div className="mt-4 text-sm text-gray-600 text-center" dir="rtl">
// //         تم اختيار {items.filter((item) => item.selected && item.text !== "").length} من{" "}
// //         {items.filter((item) => item.text !== "").length} عناصر
// //       </div> */}
// //     </div>
// //   )
// // }




// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Check, Lock } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// interface TestClassSelection {
//   [testClassName: string]: SkillTestStatistic[]
// }

// export default function Component() {
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([])
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
//   const [loading, setLoading] = useState(true)
//   const [questionCount, setQuestionCount] = useState(1)
//   const [error, setError] = useState<string | null>(null)
//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Calculate totals from all selected skills
//   const calculateTotals = useCallback(() => {
//     let totalQuestions = 0
//     let totalSkills = 0
//     const testClassTotals: { [key: string]: { questions: number; skills: number } } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classQuestions = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       const classSkills = skills.length

//       totalQuestions += classQuestions
//       totalSkills += classSkills
//       testClassTotals[testClassName] = { questions: classQuestions, skills: classSkills }
//     })

//     return { totalQuestions, totalSkills, testClassTotals }
//   }, [testClassSelections])

//   // Update selections when test classes change
//   const updateSelections = useCallback((updatedClasses: TestClass[]) => {
//     const newSelections: TestClassSelection = {}

//     updatedClasses.forEach((testClass) => {
//       const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//       if (selectedSkills.length > 0) {
//         newSelections[testClass.value] = selectedSkills
//       }
//     })

//     setTestClassSelections(newSelections)
//   }, [])

//   // Fetch data from API
//   useEffect(() => {
//     const fetchTahsiliData = async () => {
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

//         if (!data || !data.data.testTypes || !Array.isArray(data.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح")
//         }

//         // Filter for Tahsili data
//         const tahsiliTestType = data.data.testTypes.find(
//           (testType) => testType?.value && testType.value.includes("Tahsili"),
//         )

//         if (tahsiliTestType && tahsiliTestType.testClasses && Array.isArray(tahsiliTestType.testClasses)) {
//           // Get unique test classes - filter out duplicates by value/name
//           const uniqueClasses = tahsiliTestType.testClasses.filter((testClass, index, array) => {
//             return array.findIndex((c) => c.value === testClass.value) === index
//           })

//           console.log(
//             `Original classes: ${tahsiliTestType.testClasses.length}, Unique classes: ${uniqueClasses.length}`,
//           )

//           const processedTestClasses: TestClass[] = uniqueClasses
//             .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//             .map((testClass) => {
//               // Process skills and remove duplicates within each class
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

//           if (processedTestClasses.length === 0) {
//             setError("لا توجد فئات متاحة في الاختبارات التحصيلية")
//           } else {
//             console.log(`Final processed classes: ${processedTestClasses.length}`)
//             setTahsiliTestClasses(processedTestClasses)
//           }
//         } else {
//           console.log(
//             "Available test types:",
//             data.data.testTypes.map((t) => t.value),
//           )
//           setError("لم يتم العثور على بيانات الاختبارات التحصيلية في الاستجابة")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"

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
//               return fetchTahsiliData() // Retry with new token
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
//         console.error("Error fetching Tahsili data:", error)
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             setError(`خطأ في الخادم: ${error.response.status}`)
//           } else if (error.request) {
//             setError("لا يمكن الوصول إلى الخادم")
//           } else {
//             setError(`خطأ في الطلب: ${error.message}`)
//           }
//         } else {
//           setError("حدث خطأ غير متوقع")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTahsiliData()
//   }, [])

//   // Handle select all for a specific test class
//   const handleSelectAllForClass = (classId: number) => {
//     setTahsiliTestClasses((prevClasses) => {
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

//       // Update selections after state change
//       setTimeout(() => updateSelections(updatedClasses), 0)
//       return updatedClasses
//     })
//   }

// const handleReset = () => {
//     setQuestionCount(1)
//     setTestClassSelections({})
// }

//   // Handle individual skill selection
//   const handleSkillSelect = (classId: number, skillId: number) => {
//     setTahsiliTestClasses((prevClasses) => {
//       const updatedClasses = prevClasses.map((testClass) => {
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
//       })

//       // Update selections after state change
//       setTimeout(() => updateSelections(updatedClasses), 0)
//       return updatedClasses
//     })
//   }

//   const handleStartTest = () => {
//     const totals = calculateTotals()
//     if (totals.totalQuestions > 0) {
//       alert(`بدء الاختبار! إجمالي الأسئلة: ${totals.totalQuestions}`)
//     } else {
//       alert("يرجى اختيار مهارة واحدة على الأقل لبدء الاختبار")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <Card>
//           <CardContent className="flex items-center justify-center h-48">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c] mx-auto mb-4"></div>
//               <p className="text-gray-600" dir="rtl">
//                 جاري تحميل بيانات الاختبارات التحصيلية...
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

//   const totals = calculateTotals()
//   const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, data]) => data.questions > 0)

//   return (
//     <div className="w-full mx-auto p-6 space-y-6">
//       {/* Remaining Attempts */}
    

//       {tahsiliTestClasses.length === 0 ? (
//         <Card>
//           <CardContent className="text-center py-8 text-gray-500" dir="rtl">
//             لا توجد بيانات متاحة للاختبارات التحصيلية
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           {/* Test Classes Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
//             {tahsiliTestClasses.map((testClass) => {
//               const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)

//               return (
//                 <Card key={testClass.id} className="bg-gray-50 w-full">
//                   <CardHeader>
//                     {/* Class Header with select all */}
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleSelectAllForClass(testClass.id)}
//                         className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
//                           testClass.selectAll
//                             ? "bg-green-600 border-green-600 text-white"
//                             : "border-gray-300 bg-white hover:border-gray-400"
//                         }`}
//                       >
//                         {testClass.selectAll && <Check className="w-4 h-4" />}
//                       </button>
//                       <CardTitle className="text-lg font-semibold text-gray-800" dir="rtl">
//                         {testClass.value}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     {/* Skills Grid */}
//                     <div className="flex flex-col md:flex-row gap-3">
//                       {testClass.skillTestsStatistics.map((skill) => (
//                         <button
//                           key={skill.id}
//                           onClick={() => handleSkillSelect(testClass.id, skill.id)}
//                           className={`p-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 text-right ${
//                             skill.selected
//                               ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
//                               : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
//                           }`}
//                           dir="rtl"
//                         >
//                           <div className="space-y-1">
//                             <div className="font-semibold text-sm">{skill.value}</div>
//                             {/* <div className="text-xs opacity-80">{skill.questionsCount} سؤال</div> */}
//                           </div>
//                         </button>
//                       ))}
//                     </div>

//                     {/* Selected count for this class */}
//                     <div className="mt-4 text-sm text-gray-600 text-center" dir="rtl">
//                       تم اختيار {selectedSkills.length} من {testClass.skillTestsStatistics.length} مهارة
//                       {/* {selectedSkills.length > 0 && (
//                         <span className="block text-blue-600 font-medium">
//                           ({selectedSkills.reduce((sum, skill) => sum + skill.questionsCount, 0)} سؤال)
//                         </span>
//                       )} */}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//    <div className="bg-gray-100 p-4 mt-6 rounded border-t">
//         <button className="flex items-center justify-between w-full">
//           <div className="flex items-center text-teal-600 font-medium">
//             <span>خيارات متقدمة</span>
//           </div>
//         </button>

//         <div className="mt-4 border rounded-lg bg-white p-4">
//           <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
//             <div className="flex items-center gap-2 text-purple-800">
//               <Lock className="h-5 w-5" />
//               <span>بنوك الأسئلة</span>
//             </div>
//             <div className="text-gray-600 text-sm">تم إضافة أسئلة جديدة بتاريخ 11/05/2023</div>
//           </div>

//           <div className="mt-6">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
//               <div className="w-full md:w-24 text-center">
//                 <input
//                   type="number"
//                   value={questionCount}
//                   onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                   min="1"
//                   max="100"
//                   className="w-full flex flex-row-reverse border rounded p-2 text-center"
//                 />
//               </div>
//               <div className="w-full relative flex flex-row-reverse">
//                 <input
//                   type="range"
//                   min={1}
//                   max={100}
//                   value={questionCount}
//                   onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                   className="range text-purple-700 range-primary w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-start mt-4">
//               <button
//                 onClick={handleReset}
//                 className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
//               >
//                 إعادة تعيين
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//           {/* Test Information - Dynamic */}
//           <div className="bg-white rounded-lg w-full border border-gray-200 p-4 md:p-6">
//             <h2 className="text-xl font-bold text-orange-500 text-center mb-4" dir="rtl">
//               معلومات الاختبار
//             </h2>

//             <div className="flex flex-col gap-4 mb-6">
//               {/* First Row - Time and Total Questions */}
//               <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8">
//                 <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">الزمن المتوقع</h3>
//                   <p className="text-gray-600">{Math.ceil(totals.totalQuestions * 1.5)} دقيقة</p>
//                 </div>
//                 <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">عدد الأسئلة</h3>
//                   <p className="text-gray-600">{totals.totalQuestions}</p>
//                 </div>
//                 {/* <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">عدد المهارات</h3>
//                   <p className="text-gray-600">{totals.totalSkills}</p>
//                 </div> */}

//           {Object.entries(testClassSelections).map(
//                     ([testClassName, skills]) =>
//                       skills.length > 0 && (
//                         <div key={testClassName} className="bg-white p-2 ">
//                           <div className="text-sm font-semibold text-purple-700 mb-1" dir="rtl">
//                             {testClassName}
//                           </div>
//                           <div className="flex flex-wrap gap-1 mt-1">
//                             {skills.map((skill) => (
//                               <span key={skill.id} className="text-gray-600 flex gap-1 items-center px-2 py-1 rounded text-md">
//                                 {skills.length}  <span className="text-sm">قسم</span>
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       ),
//                   )}


//               </div>

//               {/* Second Row - Dynamic Test Classes */}
//               {activeTestClasses.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                   {activeTestClasses.map(([testClassName, data]) => (
//                     <div key={testClassName} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
//                       <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
//                         {testClassName}
//                       </h3>
//                       <div className="space-y-1">
//                         <p className="text-gray-700 text-xs">
//                           <span className="font-medium">{data.skills}</span> مهارة
//                         </p>
//                         <p className="text-gray-700 text-xs">
//                           <span className="font-medium">{data.questions}</span> سؤال
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Show message when no test classes are selected */}
//               {/* {activeTestClasses.length === 0 && (
//                 <div className="text-gray-500 text-sm text-center mt-4" dir="rtl">
//                   لم يتم اختيار أي مهارات بعد
//                 </div>
//               )} */}
//             </div>

           

//             {/* Start Test Button */}
//             <div className="flex justify-center">
//               <button
//                 onClick={handleStartTest}
//                 className={`px-6 py-2 font-medium rounded-md transition-colors duration-200 ${
//                   totals.totalQuestions > 0
//                     ? "bg-purple-700 hover:bg-purple-800 text-white"
//                     : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                 }`}
//                 disabled={totals.totalQuestions === 0}
//                 dir="rtl"
//               >
//                 ابدأ الاختبار {totals.totalQuestions > 0 && `(${totals.totalQuestions} سؤال)`}
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }








// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Check, Lock, Loader2 } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import axios from "axios"
// import { useRouter } from "next/navigation"
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

// export default function Component() {
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([])
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
//   const [loading, setLoading] = useState(true)
//   const [questionCount, setQuestionCount] = useState(1)
//   const [error, setError] = useState<string | null>(null)
//   const [isStartingTest, setIsStartingTest] = useState(false)
//   const [testStartError, setTestStartError] = useState<string | null>(null)
//   const router = useRouter();
//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Calculate totals from all selected skills
//   const calculateTotals = useCallback(() => {
//     let totalQuestions = 0
//     let totalSkills = 0
//     const testClassTotals: { [key: string]: { questions: number; skills: number } } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classQuestions = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       const classSkills = skills.length
//       totalQuestions += classQuestions
//       totalSkills += classSkills
//       testClassTotals[testClassName] = { questions: classQuestions, skills: classSkills }
//     })

//     return { totalQuestions, totalSkills, testClassTotals }
//   }, [testClassSelections])

//   // Get all selected skill IDs
//   const getSelectedSkillIds = useCallback((): number[] => {
//     const skillIds: number[] = []
//     Object.values(testClassSelections).forEach((skills) => {
//       skills.forEach((skill) => {
//         skillIds.push(skill.id)
//       })
//     })
//     return skillIds
//   }, [testClassSelections])

//   // Update selections when test classes change
//   const updateSelections = useCallback((updatedClasses: TestClass[]) => {
//     const newSelections: TestClassSelection = {}
//     updatedClasses.forEach((testClass) => {
//       const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//       if (selectedSkills.length > 0) {
//         newSelections[testClass.value] = selectedSkills
//       }
//     })
//     setTestClassSelections(newSelections)
//   }, [])

//   // Start test API call
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

//       console.log("Starting test with data:", requestData)

//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 15000,
//       })

//       if (response.data.succeeded) {
//         console.log("Test started successfully:", response.data)

//         // Handle successful test start
//         // You can redirect to test page or handle the response data
//         // For example:
//         router.push('/dashboard/dashStudent/examGlobalTest')
//         // or store test session data in state/context

//         alert(`تم بدء الاختبار بنجاح! عدد الأسئلة: ${questionCount}، عدد المهارات: ${selectedSkillIds.length}`)
//       } else {
//         setTestStartError(response.data.message || "فشل في بدء الاختبار")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
              
//               window.location.href = "/login"
//               break
//             case 403:
//               {
//             const refreshSuccess = await refreshAuthToken()
//               if (refreshSuccess) {
//                 return startTest() // Retry with new token
//               }
//               errorMessage = "ليس لديك صلاحية لبدء الاختبار"
//               console.log("errorMessage",errorMessage);
//               break
//             }
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

//   // Fetch data from API
//   useEffect(() => {
//     const fetchTahsiliData = async () => {
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

//         if (!data || !data.data.testTypes || !Array.isArray(data.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح")
//         }

//         // Filter for Tahsili data
//         const tahsiliTestType = data.data.testTypes.find(
//           (testType) => testType.value.includes("Tahsili"),
//         )

//         if (tahsiliTestType?.testClasses && Array.isArray(tahsiliTestType.testClasses)) {
//           const uniqueClasses = tahsiliTestType.testClasses.filter((testClass, index, array) => {
//             return array.findIndex((c) => c.value === testClass.value) === index
//           })

//           console.log(
//             `Original classes: ${tahsiliTestType.testClasses.length}, Unique classes: ${uniqueClasses.length}`,
//           )

//           const processedTestClasses: TestClass[] = uniqueClasses
//             .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//             .map((testClass) => {
//               const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//                 return skill?.value && array.findIndex((s) => s.value === skill.value) === index
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
            
// console.log("processedTestClasses ++ :",processedTestClasses)

//           if (processedTestClasses.length === 0) {
//             setError("لا توجد فئات متاحة في الاختبارات التحصيلية")
//           } else {
//             console.log(`Final processed classes: ${processedTestClasses.length}`)
//             setTahsiliTestClasses(processedTestClasses)
//           }
//         } else {
//           console.log(
//             "Available test types:",
//             data.data.testTypes.map((t) => t.value),
//           )
//           setError("لم يتم العثور على بيانات الاختبارات التحصيلية في الاستجابة")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()

//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:

//               if (refreshSuccess) {
//                   return fetchTahsiliData()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 // window.location.href = "/login"
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchTahsiliData()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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

//         console.error("Error fetching Tahsili data:", error)
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             setError(`خطأ في الخادم: ${error.response.status}`)
//           } else if (error.request) {
//             setError("لا يمكن الوصول إلى الخادم")
//           } else {
//             setError(`خطأ في الطلب: ${error.message}`)
//           }
//         } else {
//           setError("حدث خطأ غير متوقع")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTahsiliData()
//   }, [])

//   // Handle select all for a specific test class
//   const handleSelectAllForClass = (classId: number) => {
//     setTahsiliTestClasses((prevClasses) => {
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

//       setTimeout(() => updateSelections(updatedClasses), 0)
//       return updatedClasses
//     })
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
//     setTestClassSelections({})
//     setTestStartError(null)
//     // Reset all selections in test classes
//     setTahsiliTestClasses((prevClasses) =>
//       prevClasses.map((testClass) => ({
//         ...testClass,
//         selectAll: false,
//         skillTestsStatistics: testClass.skillTestsStatistics.map((skill) => ({
//           ...skill,
//           selected: false,
//         })),
//       })),
//     )
//   }

//   // Handle individual skill selection
//   const handleSkillSelect = (classId: number, skillId: number) => {
//     setTahsiliTestClasses((prevClasses) => {
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

//       setTimeout(() => updateSelections(updatedClasses), 0)
//       return updatedClasses
//     })
//   }

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <Card>
//           <CardContent className="flex items-center justify-center h-48">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c] mx-auto mb-4"></div>
//               <p className="text-gray-600" dir="rtl">
//                 جاري تحميل بيانات الاختبارات التحصيلية...
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

//   const totals = calculateTotals()
//   const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, data]) => data.questions > 0)
//   const selectedSkillIds = getSelectedSkillIds()

//   return (
//     <div className="w-full mx-auto p-6 space-y-6">
//       {tahsiliTestClasses.length === 0 ? (
//         <Card>
//           <CardContent className="text-center py-8 text-gray-500" dir="rtl">
//             لا توجد بيانات متاحة للاختبارات التحصيلية
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           {/* Test Classes Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
//             {tahsiliTestClasses.map((testClass) => {
//               const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
//               return (
//                 <Card key={testClass.id} className="bg-gray-50 w-full">
//                   <CardHeader>
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleSelectAllForClass(testClass.id)}
//                         className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
//                           testClass.selectAll
//                             ? "bg-green-600 border-green-600 text-white"
//                             : "border-gray-300 bg-white hover:border-gray-400"
//                         }`}
//                         type="button"
//                       >
//                         {testClass.selectAll && <Check className="w-4 h-4" />}
//                       </button>
//                       <CardTitle className="text-lg font-semibold text-gray-800" dir="rtl">
//                         {testClass.value}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-col md:flex-row gap-3">
//                       {testClass.skillTestsStatistics.map((skill) => (
//                         <button
//                           key={skill.id}
//                           onClick={() => handleSkillSelect(testClass.id, skill.id)}
//                           className={`p-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 text-right ${
//                             skill.selected
//                               ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
//                               : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
//                           }`}
//                           type="button"
//                           >
//                           <div className="space-y-1">
//                             <div className="font-semibold text-sm">{skill.value}</div>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                     <div className="mt-4 text-sm text-gray-600 text-center" dir="rtl">
//                       تم اختيار {selectedSkills.length} من {testClass.skillTestsStatistics.length} مهارة
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>

//           {/* Advanced Options */}
//           <div className="bg-gray-100 p-4 mt-6 rounded border-t">
//             <button className="flex items-center justify-between w-full" type="button">
//               <div className="flex items-center text-teal-600 font-medium">
//                 <span>خيارات متقدمة</span>
//               </div>
//             </button>
//             <div className="mt-4 border rounded-lg bg-white p-4">
//               <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
//                 <div className="flex items-center gap-2 text-purple-800">
//                   <Lock className="h-5 w-5" />
//                   <span>بنوك الأسئلة</span>
//                 </div>
//                 <div className="text-gray-600 text-sm">تم إضافة أسئلة جديدة بتاريخ 11/05/2023</div>
//               </div>
//               <div className="mt-6">
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
//                   <div className="w-full md:w-24 text-center">
//                     <input
//                       type="number"
//                       value={questionCount}
//                       onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                       min="1"
//                       max="100"
//                       className="w-full flex flex-row-reverse border rounded p-2 text-center"
//                     />
//                   </div>
//                   <div className="w-full relative flex flex-row-reverse">
//                     <input
//                       type="range"
//                       min={1}
//                       max={100}
//                       value={questionCount}
//                       onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                       className="range text-purple-700 range-primary w-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-start mt-4">
//                   <button
//                     onClick={handleReset}
//                     className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
//                     type="button"
//                   >
//                     إعادة تعيين
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Test Information */}
//           <div className="bg-white rounded-lg w-full border border-gray-200 p-4 md:p-6">
//             <h2 className="text-xl font-bold text-orange-500 text-center mb-4" dir="rtl">
//               معلومات الاختبار
//             </h2>
//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8">
//                 <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">الزمن المتوقع</h3>
//                   <p className="text-gray-600">{Math.ceil(questionCount * 1.5)} دقيقة</p>
//                 </div>
//                 <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">عدد الأسئلة</h3>
//                   <p className="text-gray-600">{questionCount}</p>
//                 </div>
//                 {/* <div className="text-center" dir="rtl">
//                   <h3 className="text-sm font-semibold text-purple-700">المهارات المختارة</h3>
//                   <p className="text-gray-600">{selectedSkillIds.length}</p>
//                 </div> */}

//                 {Object.entries(testClassSelections).map(
//                   ([testClassName, skills]) =>
//                     skills.length > 0 && (
//                       <div key={testClassName} className="bg-white p-2">
//                         <div className="text-sm font-semibold text-purple-700 mb-1" dir="rtl">
//                           {testClassName}
//                         </div>
//                         <div className="flex flex-wrap gap-1 mt-1">
//                           {skills.map((skill) => (
//                             <span
//                               key={skill.id}
//                               className="text-gray-600 flex gap-1 items-center px-2 py-1 rounded text-md"
//                             >
//                               {skills.length} <span className="text-sm">قسم</span>
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     ),
//                 )}
//               </div>

//               {activeTestClasses.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//                   {activeTestClasses.map(([testClassName, data]) => (
//                     <div key={testClassName} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
//                       <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
//                         {testClassName}
//                       </h3>
//                       <div className="space-y-1">
//                         <p className="text-gray-700 text-xs">
//                           <span className="font-medium">{data.skills}</span> مهارة
//                         </p>
//                         <p className="text-gray-700 text-xs">
//                           <span className="font-medium">{data.questions}</span> سؤال
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Error Message */}
//             {testStartError && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-600 text-center text-sm" dir="rtl">
//                   {testStartError}
//                 </p>
//               </div>
//             )}

//             {/* Start Test Button */}
//             <div className="flex justify-center">
//               <button
//                 onClick={startTest}
//                 disabled={selectedSkillIds.length === 0 || isStartingTest}
//                 className={`px-6 py-2 font-medium rounded-md transition-colors duration-200 flex items-center gap-2 ${
//                   selectedSkillIds.length > 0 && !isStartingTest
//                     ? "bg-purple-700 hover:bg-purple-800 text-white"
//                     : "bg-gray-400 text-gray-600 cursor-not-allowed"
//                 }`}
//                 type="button"
//               >
//                 {isStartingTest && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {isStartingTest
//                   ? "جاري بدء الاختبار..."
//                   : `ابدأ الاختبار`}
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }











"use client"

import { useState, useEffect, useCallback } from "react"
import { Check, Lock, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { changeSkillIdTest, changeQuestionCountTest, changeTimingLeftTest, changeResponseTestLength } from "@/features/auth/authSlice"
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

export default function Component() {
  const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([])
  const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
  const [loading, setLoading] = useState(true)
  const [questionCount, setQuestionCount] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isStartingTest, setIsStartingTest] = useState(false)
  const [testStartError, setTestStartError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const router = useRouter()
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

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

  // Calculate totals from all selected skills
  const calculateTotals = useCallback(() => {
    let totalQuestions = 0
    let totalSkills = 0
    const testClassTotals: { [key: string]: { questions: number; skills: number } } = {}

    Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
      const classQuestions = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
      const classSkills = skills.length
      totalQuestions += classQuestions
      totalSkills += classSkills
      testClassTotals[testClassName] = { questions: classQuestions, skills: classSkills }
    })

    return { totalQuestions, totalSkills, testClassTotals }
  }, [testClassSelections])

  // Get all selected skill IDs
  const getSelectedSkillIds = useCallback((): number[] => {
    const skillIds: number[] = []
    Object.values(testClassSelections).forEach((skills) => {
      skills.forEach((skill) => {
        skillIds.push(skill.id)
      })
    })
    return skillIds
  }, [testClassSelections])

  // Update selections when test classes change
  const updateSelections = useCallback((updatedClasses: TestClass[]) => {
    const newSelections: TestClassSelection = {}
    updatedClasses.forEach((testClass) => {
      const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
      if (selectedSkills.length > 0) {
        newSelections[testClass.value] = selectedSkills
      }
    })
    setTestClassSelections(newSelections)
  }, [])

  // Start test API call
  const startTest = async () => {
    const selectedSkillIds = getSelectedSkillIds()
    if (selectedSkillIds.length === 0) {
      setTestStartError("يرجى اختيار مهارة واحدة على الأقل")
      return
    }

    setIsStartingTest(true)
    setTestStartError(null)

    try {
      const token = Cookies.get("accessToken")
      if (!token) {
        setTestStartError("لا يوجد رمز وصول صالح")
        return
      }

      const requestData: StartTestRequest = {
        skillIds: selectedSkillIds,
        count: questionCount,
      }

      
      dispatch(changeSkillIdTest(requestData.skillIds))
      dispatch(changeQuestionCountTest(requestData.count))
      dispatch(changeTimingLeftTest(Math.ceil(questionCount * 1.5)))
      console.log("Starting test with data:", requestData)

      const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      })

      if (response.data.succeeded) {
        console.log("Test started successfully:", response.data)
        dispatch(changeResponseTestLength(response.data.data))
        router.push(`/dashboard/dashStudent/examGlobalTest?testId=${response.data.data}`)
        // alert(`تم بدء الاختبار بنجاح! عدد الأسئلة: ${questionCount}، عدد المهارات: ${selectedSkillIds.length}`)
      } else {
        setTestStartError(response.data.message || "فشل في بدء الاختبار")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ في بدء الاختبار"
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
              router.push("/login")
              break
            case 403: {
              const refreshSuccess = await refreshAuthToken()
              if (refreshSuccess) {
                return startTest() // Retry with new token
              }
              errorMessage = "ليس لديك صلاحية لبدء الاختبار"
              console.log("errorMessage", errorMessage)
              break
            }
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
      setTestStartError(errorMessage)
    } finally {
      setIsStartingTest(false)
    }
  }

  // Fetch data from API
  useEffect(() => {
    const fetchTahsiliData = async () => {
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

        console.log("API Response:", response.data)
        const data = response.data

        if (!data || !data.data.testTypes || !Array.isArray(data.data.testTypes)) {
          throw new Error("هيكل البيانات غير صحيح")
        }

        // Filter for Tahsili data
        const tahsiliTestType = data.data.testTypes.find((testType) => testType.value.includes("Tahsili"))

        if (tahsiliTestType?.testClasses && Array.isArray(tahsiliTestType.testClasses)) {
          const uniqueClasses = tahsiliTestType.testClasses.filter((testClass, index, array) => {
            return array.findIndex((c) => c.value === testClass.value) === index
          })

          console.log(
            `Original classes: ${tahsiliTestType.testClasses.length}, Unique classes: ${uniqueClasses.length}`,
          )

          const processedTestClasses: TestClass[] = uniqueClasses
            .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
            .map((testClass) => {
              const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
                return skill?.value && array.findIndex((s) => s.value === skill.value) === index
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

          console.log("processedTestClasses ++ :", processedTestClasses)

          if (processedTestClasses.length === 0) {
            setError("لا توجد فئات متاحة في الاختبارات التحصيلية")
          } else {
            console.log(`Final processed classes: ${processedTestClasses.length}`)
            setTahsiliTestClasses(processedTestClasses)
          }
        } else {
          console.log(
            "Available test types:",
            data.data.testTypes.map((t) => t.value),
          )
          setError("لم يتم العثور على بيانات الاختبارات التحصيلية في الاستجابة")
        }
      } catch (error) {
        let errorMessage = "Unknown error occurred"
        const refreshSuccess = await refreshAuthToken()

        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                if (refreshSuccess) {
                  return fetchTahsiliData()
                }
                errorMessage = "Authentication expired. Please log in again."
                break
              case 403:
                if (refreshSuccess) {
                  return fetchTahsiliData()
                }
                errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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

        console.error("Error fetching Tahsili data:", error)
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(`خطأ في الخادم: ${error.response.status}`)
          } else if (error.request) {
            setError("لا يمكن الوصول إلى الخادم")
          } else {
            setError(`خطأ في الطلب: ${error.message}`)
          }
        } else {
          setError("حدث خطأ غير متوقع")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTahsiliData()
  }, [])

  // Handle select all for a specific test class
  const handleSelectAllForClass = (classId: number) => {
    setTahsiliTestClasses((prevClasses) => {
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
      setTimeout(() => updateSelections(updatedClasses), 0)
      return updatedClasses
    })
  }

  const handleReset = () => {
    setQuestionCount(1)
    setTestClassSelections({})
    setTestStartError(null)
    // Reset all selections in test classes
    setTahsiliTestClasses((prevClasses) =>
      prevClasses.map((testClass) => ({
        ...testClass,
        selectAll: false,
        skillTestsStatistics: testClass.skillTestsStatistics.map((skill) => ({
          ...skill,
          selected: false,
        })),
      })),
    )
  }

  // Handle individual skill selection
  const handleSkillSelect = (classId: number, skillId: number) => {
    setTahsiliTestClasses((prevClasses) => {
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
      setTimeout(() => updateSelections(updatedClasses), 0)
      return updatedClasses
    })
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59169c] mx-auto mb-4"></div>
              <p className="text-gray-600" dir="rtl">
                جاري تحميل بيانات الاختبارات التحصيلية...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-48">
            <div className="text-center text-red-600" dir="rtl">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totals = calculateTotals()
  const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, data]) => data.questions > 0)
  const selectedSkillIds = getSelectedSkillIds()

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {tahsiliTestClasses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 text-gray-500" dir="rtl">
            لا توجد بيانات متاحة للاختبارات التحصيلية
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Test Classes Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {tahsiliTestClasses.map((testClass) => {
              const selectedSkills = testClass.skillTestsStatistics.filter((skill) => skill.selected)
              return (
                <Card key={testClass.id} className="bg-gray-50 w-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSelectAllForClass(testClass.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          testClass.selectAll
                            ? "bg-green-600 border-green-600 text-white"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                        type="button"
                      >
                        {testClass.selectAll && <Check className="w-4 h-4" />}
                      </button>
                      <CardTitle className="text-lg font-semibold text-gray-800" dir="rtl">
                        {testClass.value}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-3">
                      {testClass.skillTestsStatistics.map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => handleSkillSelect(testClass.id, skill.id)}
                          className={`p-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 text-right ${
                            skill.selected
                              ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
                              : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                          }`}
                          type="button"
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-sm">{skill.value}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600 text-center" dir="rtl">
                      تم اختيار {selectedSkills.length} من {testClass.skillTestsStatistics.length} مهارة
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Advanced Options */}
          <div className="bg-gray-100 p-4 mt-6 rounded border-t">
            <button className="flex items-center justify-between w-full" type="button">
              <div className="flex items-center text-teal-600 font-medium">
                <span>خيارات متقدمة</span>
              </div>
            </button>
            <div className="mt-4 border rounded-lg bg-white p-4">
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-purple-800">
                  <Lock className="h-5 w-5" />
                  <span>بنوك الأسئلة</span>
                </div>
                <div className="text-gray-600 text-sm">تم إضافة أسئلة جديدة بتاريخ 11/05/2023</div>
              </div>
              <div className="mt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
                  <div className="w-full md:w-24 text-center">
                    <input
                      type="number"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
                      min="1"
                      max="100"
                      className="w-full flex flex-row-reverse border rounded p-2 text-center"
                    />
                  </div>
                  <div className="w-full relative flex flex-row-reverse">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
                      className="range text-purple-700 range-primary w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <button
                    onClick={handleReset}
                    className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
                    type="button"
                  >
                    إعادة تعيين
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Test Information */}
          <div className="bg-white rounded-lg w-full border border-gray-200 p-4 md:p-6">
            <h2 className="text-xl font-bold text-orange-500 text-center mb-4" dir="rtl">
              معلومات الاختبار
            </h2>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8">
                <div className="text-center" dir="rtl">
                  <h3 className="text-sm font-semibold text-purple-700">الزمن المتوقع</h3>
                  <p className="text-gray-600">{formatExpectedTime(Math.ceil(questionCount * 1.5))}</p>
                </div>
                <div className="text-center" dir="rtl">
                  <h3 className="text-sm font-semibold text-purple-700">عدد الأسئلة</h3>
                  <p className="text-gray-600">{questionCount}</p>
                </div>

                {Object.entries(testClassSelections).map(
                  ([testClassName, skills]) =>
                    skills.length > 0 && (
                      <div key={testClassName} className="bg-white p-2">
                        <div className="text-sm font-semibold text-purple-700 mb-1" dir="rtl">
                          {testClassName}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skills.map((skill) => (
                            <span
                              key={skill.id}
                              className="text-gray-600 flex gap-1 items-center px-2 py-1 rounded text-md"
                            >
                              {skills.length} <span className="text-sm">قسم</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>

              {activeTestClasses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {activeTestClasses.map(([testClassName, data]) => (
                    <div key={testClassName} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                      <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
                        {testClassName}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-gray-700 text-xs">
                          <span className="font-medium">{data.skills}</span> مهارة
                        </p>
                        <p className="text-gray-700 text-xs">
                          <span className="font-medium">{data.questions}</span> سؤال
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {testStartError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center text-sm" dir="rtl">
                  {testStartError}
                </p>
              </div>
            )}

            {/* Start Test Button */}
            <div className="flex justify-center">
              <button
                onClick={startTest}
                disabled={selectedSkillIds.length === 0 || isStartingTest}
                className={`px-6 py-2 font-medium rounded-md transition-colors duration-200 flex items-center gap-2 ${
                  selectedSkillIds.length > 0 && !isStartingTest
                    ? "bg-purple-700 hover:bg-purple-800 text-white"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
                type="button"
              >
                {isStartingTest && <Loader2 className="w-4 h-4 animate-spin" />}
                {isStartingTest ? "جاري بدء الاختبار..." : `ابدأ الاختبار`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

