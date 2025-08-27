// "use client"

// import { useState } from "react"
// import QuizSections from "./quiz-sections"
// // import  from "./range-slider"
// import RangeSlider from "./achivement"
// import { Lock } from "lucide-react"
// import TestInfo from "./test-info"
// import data from "./data/data.json"
// // import "./globals.css"

// interface ExamData {
//   verbalSection: {
//     title: string
//     categories: any[]
//   }
//   quantitativeSection: {
//     title: string
//     categories: any[]
//   }
//   testInfo: any
// }

// // interface ExamSimulatorProps {
// //   data: ExamData
// // }

// interface TestInfoProps {
//   testInfo: {
//     quantitativeSection: string
//     verbalSection: string
//     questionsCount: number
//     expectedTime: string
//   }
// }

// // Define ExamType according to your application's needs
// type ExamType = "verbal" | "quantitative"; // Example, adjust as needed

// export default function Home() {
//   const [quizData, setQuizData] = useState(data)
//   const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
//   const [questionCount, setQuestionCount] = useState(1)


//  const handleExamTypeSelect = (type: ExamType) => {
//     setSelectedExamType(type)
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
//   }


//   return (
//     <main className="max-w-3xl mx-auto p-4  font-sans">
//         <div className="mt-6 mb-4 text-center text-pink-600">
//           باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//         </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
//         <QuizSections
//           // title={quizData.quantitativeSection.title}
//           // categories={quizData.quantitativeSection.categories.map((cat: any) => ({
//           //   ...cat,
//           //   text: cat.text ?? cat.name ?? "",
//           //   selected: cat.selected ?? false,
//           // }))}
//           // id={quizData.quantitativeSection.id}
//         />
       

//       </div>

//       {/* <AdvancedOptions
//         sliderValue={sliderValue}
//         setSliderValue={setSliderValue}
//         inputValue={inputValue}
//         setInputValue={setInputValue}
//       /> */}
//  {/* Advanced Options */}
//       <div className="bg-gray-100 p-4 mt-6 border-t">
//         <button  className="flex items-center justify-between w-full">
//           <div className="flex items-center text-teal-600 font-medium">
//             <span>خيارات متقدمة</span>
//           </div>
         
//             {/* <ChevronUp className="h-5 w-5 text-teal-600" /> */}
         
//         </button>

//           <div className="mt-4 border rounded-lg bg-white p-4">
//             <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
//               <div className="flex items-center gap-2 text-purple-800">
//                 <Lock className="h-5 w-5" />
//                 <span>بنوك الأسئلة</span>
//               </div>
//               <div className="text-gray-600 text-sm">تم إضافة أسئلة جديدة بتاريخ 11/05/2023</div>
//             </div>

//             <div className="mt-6">
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
//                 <div className="w-full md:w-24 text-center">
//                   <input
//                     type="number"
//                     value={questionCount}
//                     onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                     min="1"
//                     max="100"
//                     className="w-full flex flex-row-reverse border rounded p-2 text-center"
//                   />
//                 </div>
//                 <div className="w-full relative flex flex-row-reverse">
//                   {/* <RangeSlider  min={1} max={100} value={questionCount} onChange={setQuestionCount} /> */}
//                       <input
//                       type="range"
//                       min={1}
//                       max={100}
//                       value={questionCount}
//                       onChange={e => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                       className="range text-purple-700 range-primary w-full"
//                     />
                  
//                 </div>
//               </div>
//               <div className="flex justify-start mt-4">
//                 <button
//                   onClick={handleReset}
//                   className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
//                 >
//                   إعادة تعيين
//                 </button>
//               </div>
//             </div>
//           </div>
        
//       </div>      

//       {/* <TestInfo testInfo={quizData.testInfo} /> */}

//        <div className="border border-gray-200 rounded-lg p-4 mt-4">
//       <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>

//       <div className="flex flex-col px-2 justify-between md:flex-row-reverse gap-7 text-center mb-6">
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
//           <p className="text-gray-800">{quizData.testInfo.expectedTime}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
//           <p className="text-gray-800">{quizData.testInfo.questionsCount}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">القسم اللفظي</h3>
//           <p className="text-gray-800">{quizData.testInfo.verbalSection}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">القسم الكمي</h3>
//           <p className="text-gray-800">{quizData.testInfo.quantitativeSection}</p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium">ابدأ الاختبار</button>
//       </div>
//     </div>
//     </main>
//   )
// }



// "use client"

// import { useState, useCallback } from "react"
// import QuizSections from "./quiz-sections"
// import { Lock } from "lucide-react"

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

// export default function Home() {
//   const [questionCount, setQuestionCount] = useState(1)
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
//   const [remainingAttempts] = useState(3)

//   // Calculate totals from all selected skills
//   const calculateTotals = () => {
//     let totalQuestions = 0
//     const testClassTotals: { [key: string]: number } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       totalQuestions += classTotal
//       testClassTotals[testClassName] = classTotal
//     })

//     return { totalQuestions, testClassTotals }
//   }

//   const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
//     setTestClassSelections((prev) => ({
//       ...prev,
//       [testClassName]: selectedSkills,
//     }))
//   }, [])

//   const handleReset = () => {
//     setQuestionCount(1)
//     setTestClassSelections({})
//   }

//   const totals = calculateTotals()

//   // Get active test classes (those with selected skills)
//   const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, count]) => count > 0)

//   return (
//     <main className="max-w-3xl mx-auto p-4 font-sans">
//       <div className="mt-6 mb-4 text-center text-pink-600">
//         باقي لديك {remainingAttempts} محاولة مجانية في الباقة الأساسية
//       </div>

//       {/* Dynamic Test Classes */}
//       <QuizSections onSelectionChange={handleSelectionChange} />

//       {/* Advanced Options */}
//       <div className="bg-gray-100 p-4 mt-6 border-t">
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

//       {/* Test Information - Dynamic Test Classes */}
//       <div className="border border-gray-200 rounded-lg p-4 mt-4">
//         <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>

//         <div className="flex flex-col px-2 justify-between gap-4 text-center mb-6">
//           {/* First Row - Time and Total Questions */}
//           <div className="flex flex-col md:flex-row-reverse justify-center gap-8">
//             <div>
//               <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
//               <p className="text-gray-800">{Math.ceil(totals.totalQuestions * 1.5)} دقيقة</p>
//             </div>

//             <div>
//               <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
//               <p className="text-gray-800">{totals.totalQuestions}</p>
//             </div>
            
//   {Object.entries(testClassSelections).map(
//                 ([testClassName, skills]) =>
//                   skills.length > 0 && (
//                     <div key={testClassName} className="bg-white px-2 pb-2 ">
//                       <div className="text-md font-bold text-blue-600 mb-1" dir="rtl">
//                         {testClassName}
//                       </div>
//                       <div className="text-xs text-gray-600 space-y-1" dir="rtl">
//                         <div className="text-lg text-gray-800"> {skills.length} قسم </div>
//                         {/* <div>عدد الأسئلة: {skills.reduce((sum, skill) => sum + skill.questionsCount, 0)}</div> */}
//                         {/* <div className="flex flex-wrap gap-1 mt-1">
//                           {skills.map((skill) => (
//                             <span key={skill.id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
//                               {skill.value} ({skill.questionsCount})
//                             </span>
//                           ))}
//                         </div> */}
//                       </div>
//                     </div>
//                   ),
//               )}

//           </div>

//           {/* Second Row - Dynamic Test Classes */}
//           {activeTestClasses.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//               {activeTestClasses.map(([testClassName, questionCount]) => (
//                 <div key={testClassName} className="bg-blue-50 p-3 rounded-lg">
//                   <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
//                     {testClassName}
//                   </h3>
//                   <p className="text-gray-800">{questionCount} سؤال</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Show message when no test classes are selected */}
//           {/* {activeTestClasses.length === 0 && (
//             <div className="text-gray-500 text-sm mt-4" dir="rtl">
//               لم يتم اختيار أي مهارات بعد
//             </div>
//           )} */}
//         </div>

//         {/* Selected Skills Summary */}
      

//         <div className="flex justify-center">
//           <button
//             className={`py-2 px-8 rounded-md font-medium ${
//               totals.totalQuestions > 0
//                 ? "bg-purple-800 text-white hover:bg-purple-900"
//                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//             }`}
//             disabled={totals.totalQuestions === 0}
//           >
//             ابدأ الاختبار 
//           </button>
//         </div>
//       </div>
//     </main>
//   )
// }




























// "use client"

// import { useState, useCallback } from "react"
// import QuizSections from "./quiz-sections"
// import { Lock, Loader2 } from "lucide-react"
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

// export default function Home() {
//   const [questionCount, setQuestionCount] = useState(1)
//   const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
//   const [remainingAttempts] = useState(3)
//   const [isStartingTest, setIsStartingTest] = useState(false)
//   const [testStartError, setTestStartError] = useState<string | null>(null)
//   const router = useRouter();

//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Calculate totals from all selected skills
//   const calculateTotals = () => {
//     let totalQuestions = 0
//     const testClassTotals: { [key: string]: number } = {}

//     Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
//       const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
//       totalQuestions += classTotal
//       testClassTotals[testClassName] = classTotal
//     })

//     return { totalQuestions, testClassTotals }
//   }

//   // Get all selected skill IDs
//   const getSelectedSkillIds = (): number[] => {
//     const skillIds: number[] = []
//     Object.values(testClassSelections).forEach((skills) => {
//       skills.forEach((skill) => {
//         skillIds.push(skill.id)
//       })
//     })
//     return skillIds
//   }

//   // Handle question count change with validation
//   const handleQuestionCountChange = useCallback((value: string | number) => {
//     const numValue = typeof value === "string" ? Number.parseInt(value) : value
//     const validatedValue = Math.max(1, Math.min(100, numValue || 1))
//     setQuestionCount(validatedValue)
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

//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 15000,
//       })

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

//   const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
//     setTestClassSelections((prev) => ({
//       ...prev,
//       [testClassName]: selectedSkills,
//     }))
//   }, [])

//   const handleReset = () => {
//     setQuestionCount(1)
//     setTestClassSelections({})
//     setTestStartError(null)
//   }

//   const totals = calculateTotals()
//   const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, count]) => count > 0)
//   const selectedSkillIds = getSelectedSkillIds()

//   return (
//     <main className="max-w-3xl mx-auto p-4 font-sans">
//       <div className="mt-6 mb-4 text-center text-pink-600">
//         باقي لديك {remainingAttempts} محاولة مجانية في الباقة الأساسية
//       </div>

//       {/* Dynamic Test Classes */}
//       <QuizSections onSelectionChange={handleSelectionChange} />

//       {/* Advanced Options */}
//       <div className="bg-gray-100 p-4 mt-6 border-t">
//         <button className="flex items-center justify-between w-full" type="button">
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
//                   onChange={(e) => handleQuestionCountChange(e.target.value)}
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
//                   onChange={(e) => handleQuestionCountChange(e.target.value)}
//                   className="range text-purple-700 range-primary w-full"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-start mt-4">
//               <button
//                 onClick={handleReset}
//                 className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
//                 type="button"
//                 >
//                 إعادة تعيين
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Test Information - Dynamic Test Classes */}
//       <div className="border border-gray-200 rounded-lg p-4 mt-4">
//         <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>

//         <div className="flex flex-col px-2 justify-between gap-4 text-center mb-6">
//           {/* First Row - Time and Total Questions */}
//           <div className="flex flex-col md:flex-row-reverse justify-center gap-8">
//             <div>
//               <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
//               <p className="text-gray-800">{Math.ceil(questionCount * 1.5)} دقيقة</p>
//             </div>
//             <div>
//               <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
//               <p className="text-gray-800">{questionCount}</p>
//             </div>
//             {/* <div>
//               <h3 className="text-blue-600 font-bold mb-1">المهارات المختارة</h3>
//               <p className="text-gray-800">{selectedSkillIds.length}</p>
//             </div> */}

//             {Object.entries(testClassSelections).map(
//               ([testClassName, skills]) =>
//                 skills.length > 0 && (
//                   <div key={testClassName} className="bg-white px-2 pb-2">
//                     <div className="text-md font-bold text-blue-600 mb-1" dir="rtl">
//                       {testClassName}
//                     </div>
//                     <div className="text-xs text-gray-600 space-y-1" dir="rtl">
//                       <div className="text-lg text-gray-800">{skills.length} قسم</div>
//                     </div>
//                   </div>
//                 ),
//             )}
//           </div>

//           {/* Second Row - Dynamic Test Classes */}
//           {activeTestClasses.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//               {activeTestClasses.map(([testClassName, questionCount]) => (
//                 <div key={testClassName} className="bg-blue-50 p-3 rounded-lg">
//                   <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
//                     {testClassName}
//                   </h3>
//                   <p className="text-gray-800">{questionCount} سؤال</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Error Message */}
//         {testStartError && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-center text-sm" dir="rtl">
//               {testStartError}
//             </p>
//           </div>
//         )}

//         {/* Start Test Button */}
//         <div className="flex justify-center">
//           <button
//             onClick={startTest}
//             disabled={selectedSkillIds.length === 0 || isStartingTest}
//             className={`py-2 px-8 rounded-md font-medium flex items-center gap-2 ${
//               selectedSkillIds.length > 0 && !isStartingTest
//                 ? "bg-purple-800 text-white hover:bg-purple-900"
//                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//             }`}
//             type="button"
//           >
//             {isStartingTest && <Loader2 className="w-4 h-4 animate-spin" />}
//             {isStartingTest ? "جاري بدء الاختبار..." : "ابدأ الاختبار"}
//           </button>
//         </div>
//       </div>
//     </main>
//   )
// }












"use client"

import { useState, useCallback } from "react"
import QuizSections from "./quiz-sections"
import { Lock, Loader2 } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { useDispatch } from "react-redux"
import { changeSkillIdTest, changeQuestionCountTest, changeTimingLeftTest } from "@/features/auth/authSlice"


interface SkillTestStatistic {
  id: number
  value: string
  questionsCount: number
  correctAnswersCount: number
  ratio: number
  selected: boolean
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

export default function Home() {
  const [questionCount, setQuestionCount] = useState(1)
  const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
  const [remainingAttempts] = useState(3)
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
  const calculateTotals = () => {
    let totalQuestions = 0
    const testClassTotals: { [key: string]: number } = {}

    Object.entries(testClassSelections).forEach(([testClassName, skills]) => {
      const classTotal = skills.reduce((sum, skill) => sum + skill.questionsCount, 0)
      totalQuestions += classTotal
      testClassTotals[testClassName] = classTotal
    })

    return { totalQuestions, testClassTotals }
  }

  // Get all selected skill IDs
  const getSelectedSkillIds = (): number[] => {
    const skillIds: number[] = []
    Object.values(testClassSelections).forEach((skills) => {
      skills.forEach((skill) => {
        skillIds.push(skill.id)
      })
    })
    return skillIds
  }

  // Handle question count change with validation
  const handleQuestionCountChange = useCallback((value: string | number) => {
    const numValue = typeof value === "string" ? Number.parseInt(value) : value
    const validatedValue = Math.max(1, Math.min(100, numValue || 1))
    setQuestionCount(validatedValue)
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
      console.log("timing left -----", formatExpectedTime(Math.ceil(questionCount * 1.5)))
      console.log("timing left Number -----", Math.ceil(questionCount * 1.5))
      console.log("requestBody +++++:", requestData)

      const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      })

      if (response.data.succeeded) {
        console.log("Test started successfully:", response.data)
        router.push("/dashboard/dashStudent/examGlobalTest")
      } else {
        setTestStartError(response.data.message || "فشل في بدء الاختبار")
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
      setTestStartError(errorMessage)
    } finally {
      setIsStartingTest(false)
    }
  }

  const handleSelectionChange = useCallback((selectedSkills: SkillTestStatistic[], testClassName: string) => {
    setTestClassSelections((prev) => ({
      ...prev,
      [testClassName]: selectedSkills,
    }))
  }, [])

  const handleReset = () => {
    setQuestionCount(1)
    setTestClassSelections({})
    setTestStartError(null)
  }

  const totals = calculateTotals()
  const activeTestClasses = Object.entries(totals.testClassTotals).filter(([_, count]) => count > 0)
  const selectedSkillIds = getSelectedSkillIds()

  return (
    <main className="max-w-3xl mx-auto p-4 font-sans">
      <div className="mt-6 mb-4 text-center text-pink-600">
        باقي لديك {remainingAttempts} محاولة مجانية في الباقة الأساسية
      </div>

      {/* Dynamic Test Classes */}
      <QuizSections onSelectionChange={handleSelectionChange} />

      {/* Advanced Options */}
      <div className="bg-gray-100 p-4 mt-6 border-t">
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
                  onChange={(e) => handleQuestionCountChange(e.target.value)}
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
                  onChange={(e) => handleQuestionCountChange(e.target.value)}
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

      {/* Test Information - Dynamic Test Classes */}
      <div className="border border-gray-200 rounded-lg p-4 mt-4">
        <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>
        <div className="flex flex-col px-2 justify-between gap-4 text-center mb-6">
          {/* First Row - Time and Total Questions */}
          <div className="flex flex-col md:flex-row-reverse justify-center gap-8">
            <div>
              <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
              <p className="text-gray-800">{formatExpectedTime(Math.ceil(questionCount * 1.5))}</p>
            </div>
            <div>
              <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
              <p className="text-gray-800">{questionCount}</p>
            </div>

            {Object.entries(testClassSelections).map(
              ([testClassName, skills]) =>
                skills.length > 0 && (
                  <div key={testClassName} className="bg-white px-2 pb-2">
                    <div className="text-md font-bold text-blue-600 mb-1" dir="rtl">
                      {testClassName}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1" dir="rtl">
                      <div className="text-lg text-gray-800">{skills.length} قسم</div>
                    </div>
                  </div>
                ),
            )}
          </div>

          {/* Second Row - Dynamic Test Classes */}
          {activeTestClasses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {activeTestClasses.map(([testClassName, questionCount]) => (
                <div key={testClassName} className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-blue-600 font-bold mb-1 text-sm" dir="rtl">
                    {testClassName}
                  </h3>
                  <p className="text-gray-800">{questionCount} سؤال</p>
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
            className={`py-2 px-8 rounded-md font-medium flex items-center gap-2 ${
              selectedSkillIds.length > 0 && !isStartingTest
                ? "bg-purple-800 text-white hover:bg-purple-900"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            type="button"
          >
            {isStartingTest && <Loader2 className="w-4 h-4 animate-spin" />}
            {isStartingTest ? "جاري بدء الاختبار..." : "ابدأ الاختبار"}
          </button>
        </div>
      </div>
    </main>
  )
}

