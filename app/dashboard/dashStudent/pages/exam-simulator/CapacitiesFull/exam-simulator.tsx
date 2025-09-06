// "use client"

// import { useState } from "react"
// import { Lock } from "lucide-react"
// // import RangeSlider from "./range-slider"
// import type { ExamData, ExamType } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/types/exam"
// import Link from "next/link"
// // import { useDispatch, useSelector } from 'react-redux';
// // import { changeTestExamlutor } from '@/features/auth/authSlice';


// interface ExamSimulatorProps {
//   data: ExamData
// }

// export default function ExamSimulator({ data }: ExamSimulatorProps) {
//   // const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
//   const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
//   const [questionCount, setQuestionCount] = useState(1)

//   // const dispatch = useDispatch();


//   // const makeCookiesType = (testExamlutorTitle: string) => {
//   //   // if(Cookies.get("nameType")){
//   //   //   Cookies.set("nameType", value, { 
//   //   //     expires: 1, // Token expires in 1 days
//   //   //     path: "/", // Available across the entire site
//   //   //     sameSite: "strict", // Restrict to same site to prevent CSRF
//   //   //   });
//   //   //   setTimeout(()=> {
//   //   //     window.location.reload();
//   //   //   },500);
//   //   // }else{
//   //   //   Cookies.set("nameType", value);
//   //   //   setTimeout(()=> {
//   //   //     window.location.reload();
//   //   //   },500);
//   //   // }
//   //   // Cookies.set("nameLink", name);
   
//   //   dispatch(changeTestExamlutor(testExamlutorTitle));
  
//   // }


//   // const toggleAdvanced = () => {
//   //   setIsAdvancedOpen(!isAdvancedOpen)
//   // }

//   const handleExamTypeSelect = (type: ExamType) => {
//     setSelectedExamType(type)
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
//   }

//   return (
//      <>


//       {/* Exam Type Selection */}
//       <div className="p-4">
       

//         {/* Remaining Attempts */}
//         <div className="mt-6 text-center text-pink-600">
//           باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//         </div>
//       </div>

//       {/* Advanced Options */}
//       <div className="bg-gray-100 p-4 border-t">
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
//                 <div className="w-full flex flex-row-reverse">
//                   {/* <RangeSlider  min={1} max={100} value={questionCount} onChange={setQuestionCount} /> */}

//                     <input
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

//       {/* Exam Information */}
//       <div className="p-4">
//         <h2 className="text-xl text-center text-orange-500 font-bold mb-4">معلومات الاختبار</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div>
//             <h3 className="text-blue-600 font-bold">كمي</h3>
//             <p className="text-gray-700">{data.examInfo.quantitative}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">لفظي</h3>
//             <p className="text-gray-700">{data.examInfo.verbal}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
//             <p className="text-gray-700">{data.examInfo.questionCount}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
//             <p className="text-gray-700">{data.examInfo.expectedTime}</p>
//           </div>
//         </div>
        
//         <Link href="/dashboard/dashStudent/examGlobalTest">
//         <div className="mt-12 flex justify-center">
//           <button className="bg-purple-800 text-white px-8 py-2 rounded-md font-bold">ابدأ الاختبار</button>
//         </div>
//         </Link>
//       </div>
//       </>
//   )
// }




// "use client"

// import { useState } from "react"
// import { Lock, RotateCcw } from "lucide-react"
// import Link from "next/link"
// import type { ExamData, ExamType } from "./types/exam"

// interface ExamSimulatorProps {
//   data: ExamData
// }

// export default function ExamSimulator({ data }: ExamSimulatorProps) {
//   const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
//   const [questionCount, setQuestionCount] = useState(1)

//   const handleExamTypeSelect = (type: ExamType) => {
//     setSelectedExamType(type)
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
//   }

//   return (
//     <div className="max-w-4xl mx-auto  rounded-xl  overflow-hidden  ">
//       {/* Header Section */}
//       <div className=" p-6 ">
//         {/* Remaining Attempts */}
//         <div className="text-center">
//           <div className="inline-flex items-center px-4 py-2  text-pink-700 rounded-full text-sm font-medium ">
//             {/* <span className="mr-2">⏰</span> */}
//             باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </div>
//         </div>
//       </div>

//       {/* Advanced Options Section */}
//       <div className="bg-gray-50 border-b shadow-2xl rounded-xl border-gray-200">
//         <div className="p-6">
//           <button className="flex items-center justify-between w-full group">
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
//                 {/* Number Input and Range Slider */}
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//                   {/* Number Input */}
//                     <div className="w-full md:w-24 text-center">
//                    <input
//                     type="number"
//                     value={questionCount}
//                     onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                     min="1"
//                     max="100"
//                     className="w-full flex flex-row-reverse border rounded p-2 text-center"
//                   />
//                 </div>
//                 <div className="w-full flex flex-row-reverse">
//                   {/* <RangeSlider  min={1} max={100} value={questionCount} onChange={setQuestionCount} /> */}

//                     <input
//                       type="range"
//                       min={1}
//                       max={100}
//                       value={questionCount}
//                       onChange={e => setQuestionCount(Number.parseInt(e.target.value) || 1)}
//                       className="range text-purple-700 range-primary w-full"
//                     />
                    
//                 </div>
//                 </div>

//                 {/* Reset Button */}
//                 <div className="flex justify-start">
//                   <button
//                     onClick={handleReset}
//                     className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
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
//       <div className="p-6 bg-gradient-to-b from-white to-gray-50">
//         <h2 className="text-2xl text-center text-orange-500 font-bold mb-8 relative">
//           معلومات الاختبار
//           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 rounded-full"></div>
//         </h2>

//         {/* Info Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-blue-600 font-bold text-lg">📊</span>
//               </div>
//               <h3 className="text-blue-600 font-bold text-lg mb-2">كمي</h3>
//               <p className="text-gray-700 font-semibold text-xl">{data.examInfo.quantitative}</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-green-600 font-bold text-lg">📝</span>
//               </div>
//               <h3 className="text-green-600 font-bold text-lg mb-2">لفظي</h3>
//               <p className="text-gray-700 font-semibold text-xl">{data.examInfo.verbal}</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-purple-600 font-bold text-lg">❓</span>
//               </div>
//               <h3 className="text-purple-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
//               <p className="text-gray-700 font-semibold text-xl">{data.examInfo.questionCount}</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <span className="text-orange-600 font-bold text-lg">⏱️</span>
//               </div>
//               <h3 className="text-orange-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
//               <p className="text-gray-700 font-semibold text-xl">{data.examInfo.expectedTime}</p>
//             </div>
//           </div>
//         </div>

//         {/* Start Exam Button */}
//         <Link href="/dashboard/dashStudent/examGlobalTest">
//           <div className="flex justify-center">
//             <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50">
//               <span className="relative z-10">ابدأ الاختبار</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
//             </button>
//           </div>
//         </Link>
//       </div>
//     </div>
//   )
// }













// "use client"

// import { useState } from "react"
// import { Lock, RotateCcw, Minus, Plus } from "lucide-react"
// import Link from "next/link"
// import type { ExamData, ExamType } from "./types/exam"

// interface ExamSimulatorProps {
//   data: ExamData
// }

// export default function ExamSimulatorAlternative({ data }: ExamSimulatorProps) {
//   const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
//   const [questionCount, setQuestionCount] = useState(1)

//   const handleExamTypeSelect = (type: ExamType) => {
//     setSelectedExamType(type)
//   }

//   const handleReset = () => {
//     setQuestionCount(1)
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

//   return (
//     <div className="max-w-4xl mx-auto  overflow-hidden ">
//       {/* Header Section */}
//       <div className=" p-6  ">
//         <div className="text-center">
//           <div className="inline-flex items-center px-4 py-2  text-pink-700 rounded-full text-sm font-medium ">
//             {/* <span className="mr-2">⏰</span> */}
//             باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </div>
//         </div>
//       </div>

//       {/* Advanced Options Section */}
//       <div className="bg-gray-50 rounded-2xl shadow-lg border-b border-gray-200">
//         <div className="p-6">
//           <button className="flex items-center justify-between w-full group">
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
//                 {/* Question Count Control with Buttons */}
//                 <div className="flex flex-col items-center gap-4">
//                   <label className="text-sm font-medium text-gray-700">عدد الأسئلة</label>

//                   {/* Counter with buttons */}
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={decrementCount}
//                       disabled={questionCount <= 1}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>

//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
//                       <div className="text-xs text-gray-500">من 100</div>
//                     </div>

//                     <button
//                       onClick={incrementCount}
//                       disabled={questionCount >= 100}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
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
//                       className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div> 
//                 </div>

//                 {/* Reset Button */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={handleReset}
//                     className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
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
//        {/* Exam Information */}
//        <div className="p-4">
//          <h2 className="text-xl text-center text-orange-500 font-bold mb-4">معلومات الاختبار</h2>

//          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//            <div>
//              <h3 className="text-blue-600 font-bold">كمي</h3>
//              <p className="text-gray-700">{data.examInfo.quantitative}</p>
//            </div>
//            <div>
//              <h3 className="text-blue-600 font-bold">لفظي</h3>
//              <p className="text-gray-700">{data.examInfo.verbal}</p>
//            </div>
//            <div>
//              <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
//              <p className="text-gray-700">{data.examInfo.questionCount}</p>
//            </div>
//            <div>
//              <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
//              <p className="text-gray-700">{data.examInfo.expectedTime}</p>
//            </div>
//          </div>
        
//          <Link href="/dashboard/dashStudent/examGlobalTest">
//          <div className="mt-12 flex justify-center">
//            <button className="bg-purple-800 text-white px-8 py-2 rounded-md font-bold">ابدأ الاختبار</button>
//          </div>
//          </Link>
//        </div>
//     </div>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import { Lock, RotateCcw, Minus, Plus, AlertCircle } from "lucide-react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"
// import QudratTestClasses from "./qudrat-test-classes"
// import { useDispatch } from "react-redux"
// import { changeSkillIdTest, changeQuestionCountTest, changeTimingLeftTest } from "@/features/auth/authSlice"
// import type { ExamData, ExamType, StartTestResponse } from "./types/exam"

// // Map ExamType to skill IDs
// const EXAM_TYPE_TO_SKILL_ID: Record<ExamType, number> = {
//   quantitative: 1,
//   verbal: 2,
//   mixed: 0 // or whatever ID represents mixed/all skills
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ExamSimulatorProps {
//   data: ExamData
// }

// // interface TestClass {
// //   id: number
// // }

// interface TestClassSelection {
//   [testClassName: string]: SkillTestStatistic[]
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

// export default function ExamSimulator({ data: initialData }: ExamSimulatorProps) {
//   const [data, setData] = useState(initialData)
//   const [testClasses, setTestClasses] = useState<number[]>([])
//   const [questionCount, setQuestionCount] = useState(1)
//   // const [testClassSelections, setTestClassSelections] = useState<TestClassSelection>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [testId, setTestId] = useState<number | null>(null)
  
//   const dispatch = useDispatch()

// const router = useRouter();

//   // const getSelectedSkillIds = (): number[] => {
//   //   const skillIds: number[] = []
//   //   Object.values(testClassSelections).forEach((skills) => {
//   //     skills.forEach((skill) => {
//   //       skillIds.push(skill.id)
//   //     })
//   //   })
//   //   return skillIds
//   // }

//   // Get authorization token
//   const getAuthToken = () => {
//     return  Cookies.get("accessToken")
//   }

//   // Create axios headers with authorization
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

//  useEffect(() => {
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
// console.log("response",response.data.data);
//         if (response.data.succeeded) {  
//           // Find Qudrat test type and extract only test classes values
//           const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")
// console.log("qudratTestType",qudratTestType);

// if (qudratTestType) {
// const classesOnly = qudratTestType?.testClasses.map((testClass) => ({
//   id: testClass.id,
//   value: testClass.value,
//   skillTestsStatistics: testClass.skillTestsStatistics.map((skillTestsStatistic) => ({
//     id: skillTestsStatistic.id,
//     value: skillTestsStatistic.value 
//   }))
// }))

// const classSkillTestsStatistics = classesOnly.map((testClass) => testClass.skillTestsStatistics)

// console.log("classSkillTestsStatistics",classSkillTestsStatistics);

// const classSkillTestsStatisticsIds = classSkillTestsStatistics.map((skillTestsStatistic) => skillTestsStatistic.map((skillTestsStatistic) => skillTestsStatistic.id))

// console.log("classSkillTestsStatisticsIds",classSkillTestsStatisticsIds);

// const classSkillTestsStatisticsIdsFlattened = classSkillTestsStatisticsIds.flat()

// console.log("classSkillTestsStatisticsIdsFlattened",classSkillTestsStatisticsIdsFlattened);

          
           

//           setTestClasses(classSkillTestsStatisticsIdsFlattened)
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
//                         router.push("/login")
//                         break
//                       case 403:
//                         if (refreshSuccess) {
//                           return fetchTestClasses()
//                         }
//                         errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                         console.log("errorMessage",errorMessage);
//                         router.push("/login")
//                         break;
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

//   const startTest = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setError("يجب تسجيل الدخول أولاً لبدء الاختبار")
//       return
//     }

//     if (data.remainingAttempts <= 0) {
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

//       dispatch(changeSkillIdTest(testClasses))
//       dispatch(changeQuestionCountTest(questionCount))
//       dispatch(changeTimingLeftTest((Math.ceil(questionCount * 1.5))))
//       console.log("timing left -----",formatExpectedTime(Math.ceil(questionCount * 1.5)))
//       console.log("timing left Number -----",(Math.ceil(questionCount * 1.5)))
// console.log("requestBody +++++:",requestBody);

//       const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
//         headers: getHeaders(),
//         timeout: 10000,
//       })

//       const result = response.data
// console.log("result",result)
//       if (result.succeeded) {
//         setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
//         // Update remaining attempts
//         setData((prevData) => ({
//           ...prevData,
//           remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
//         }))

       
//   router.push(`/dashboard/dashStudent/examGlobalTest?testId=${result.data}`)
       
//       } else {
//         setError(result.message || "فشل في بدء الاختبار")
//         if (result.errors && result.errors.length > 0) {
//           setError(result.errors.join(", "))
//         }
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 401) {
//           setError("انتهت صلاحية جلسة المستخدم. يرجى تسجيل الدخول مرة أخرى")
//           // Clear invalid token
//           localStorage.removeItem("authToken")
//           sessionStorage.removeItem("authToken")
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

//   // Check if user is authenticated
//   const isAuthenticated = !!getAuthToken()

//   if (!isAuthenticated) {
//     return (
//       // <div className="max-w-4xl mx-auto p-6">
//       <div className="max-w-4xl mx-auto overflow-hidden">
//         <div className="p-6">
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
//                 {/* Question Count Control with Buttons */}
//                 <div className="flex flex-col items-center gap-4">
//                   <h3 className="text-sm font-medium text-gray-700">عدد الأسئلة</h3>
                  
//                   {/* Counter with buttons */}
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={decrementCount}
//                       disabled={questionCount <= 1 || isLoading}
//                       className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                       type="button"
//                       >
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
//                       type="button"
//                       >
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
//                     type="button"
//                     >
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
//       <div className="p-4">
//         {/* <h2 className="text-xl text-center text-orange-500 font-bold mb-4">معلومات الاختبار</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div>
//             <h3 className="text-blue-600 font-bold">كمي</h3>
//             <p className="text-gray-700">{data.examInfo.quantitative}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">لفظي</h3>
//             <p className="text-gray-700">{data.examInfo.verbal}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
//             <p className="text-gray-700">{questionCount}</p>
//           </div>
//           <div>
//             <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
//             <p className="text-gray-700">{data.examInfo.expectedTime}</p>
//           </div>
//         </div>

//         {error && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//               <p className="text-red-600 font-medium">{error}</p>
//             </div>
//           </div>
//         )}

//         {testId && (
//           <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-600 text-center font-medium">تم إنشاء الاختبار بنجاح! معرف الاختبار: {testId}</p>
//             <p className="text-green-600 text-center text-sm mt-1">سيتم توجيهك إلى صفحة الاختبار...</p>
//           </div>
//         )}

//         <div className="mt-12 flex justify-center">
//           <button
//             onClick={startTest}
//             disabled={isLoading || data.remainingAttempts <= 0}
//             className="bg-purple-800 text-white px-8 py-3 rounded-md font-bold hover:bg-purple-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[150px] justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 جاري التحضير...
//               </>
//             ) : (
//               "ابدأ الاختبار"
//             )}
//           </button>
//         </div>

//         {data.remainingAttempts <= 0 && (
//           <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-600 text-center font-medium">
//               لقد استنفدت جميع المحاولات المجانية. يرجى ترقية باقتك للمتابعة.
//             </p>
//           </div>
//         )} */}

//               <QudratTestClasses qestioCount={questionCount}/>
//             <button
//             onClick={startTest}
//             className="bg-purple-800 mx-auto text-white px-8 py-3 rounded-md font-bold hover:bg-purple-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex  items-center gap-2 min-w-[150px] justify-center"
//             type="button"
//             >
//               ابدأ الاختبار
//           </button>
//       </div>

//     </div>
//   )
// }













"use client"

import { useState, useEffect } from "react"
import { Lock, RotateCcw, Minus, Plus, AlertCircle } from "lucide-react"
import axios from "axios"
import Cookies from "js-cookie"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { useRouter } from "next/navigation"
import QudratTestClasses from "./qudrat-test-classes"
import { useDispatch } from "react-redux"
// import { useQuery } from '@tanstack/react-query'
import { changeSkillIdTest, changeQuestionCountTest, changeTimingLeftTest, changeResponseTestLength } from "@/features/auth/authSlice"
import type { ExamData, ExamType, StartTestResponse } from "./types/exam"

// Map ExamType to skill IDs
const EXAM_TYPE_TO_SKILL_ID: Record<ExamType, number> = {
  quantitative: 1,
  verbal: 2,
  mixed: 0, // or whatever ID represents mixed/all skills
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

interface ExamSimulatorProps {
  data: ExamData
}

interface TestClassSelection {
  [testClassName: string]: SkillTestStatistic[]
}

interface SkillTestStatistic {
  id: number
  value: string
  questionsCount: number
  correctAnswersCount: number
  ratio: number
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

interface StartTestRequest {
  skillIds: number[]
  count: number
}

export const startTestFetch = async ( requestBody: StartTestRequest,getHeaders: any ) => {
try{
  const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
    headers: getHeaders,
    timeout: 10000,
  })

  const result = response.data
  console.log("result ======", result)
return result
}catch{
  return null
}
}


export default function ExamSimulator({ data: initialData }: ExamSimulatorProps) {
  const [data, setData] = useState(initialData)
  const [testClasses, setTestClasses] = useState<number[]>([])
  const [questionCount, setQuestionCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testId, setTestId] = useState<number | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Get authorization token
  const getAuthToken = () => {
    return Cookies.get("accessToken")
  }

  // Create axios headers with authorization
  const getHeaders = () => {
    const token = getAuthToken()
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  const handleReset = () => {
    setQuestionCount(1)
    setError(null)
    setTestId(null)
  }

  const incrementCount = () => {
    if (questionCount < 100) {
      setQuestionCount(questionCount + 1)
    }
  }

  const decrementCount = () => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1)
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

        console.log("response", response.data.data)

        if (response.data.succeeded) {
          // Find Qudrat test type and extract only test classes values
          const qudratTestType = response.data.data.testTypes.find((testType) => testType.value === "Qudrat")
          console.log("qudratTestType", qudratTestType)

          if (qudratTestType) {
            const classesOnly = qudratTestType?.testClasses.map((testClass) => ({
              id: testClass.id,
              value: testClass.value,
              skillTestsStatistics: testClass.skillTestsStatistics.map((skillTestsStatistic) => ({
                id: skillTestsStatistic.id,
                value: skillTestsStatistic.value,
              })),
            }))

            const classSkillTestsStatistics = classesOnly.map((testClass) => testClass.skillTestsStatistics)
            console.log("classSkillTestsStatistics", classSkillTestsStatistics)

            const classSkillTestsStatisticsIds = classSkillTestsStatistics.map((skillTestsStatistic) =>
              skillTestsStatistic.map((skillTestsStatistic) => skillTestsStatistic.id),
            )
            console.log("classSkillTestsStatisticsIds", classSkillTestsStatisticsIds)

            const classSkillTestsStatisticsIdsFlattened = classSkillTestsStatisticsIds.flat()
            console.log("classSkillTestsStatisticsIdsFlattened", classSkillTestsStatisticsIdsFlattened)

            setTestClasses(classSkillTestsStatisticsIdsFlattened)
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
                router.push("/login")
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

  const startTest = async () => {
    const token = getAuthToken()
    if (!token) {
      setError("يجب تسجيل الدخول أولاً لبدء الاختبار")
      return
    }

    if (data.remainingAttempts <= 0) {
      setError("لقد استنفدت جميع المحاولات المجانية")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const requestBody: StartTestRequest = {
        skillIds: testClasses,
        count: questionCount,
      }

      dispatch(changeSkillIdTest(requestBody.skillIds))
      dispatch(changeQuestionCountTest(requestBody.count))
      dispatch(changeTimingLeftTest(Math.ceil(questionCount * 1.5)))
      console.log("timing left -----", formatExpectedTime(Math.ceil(questionCount * 1.5)))
      console.log("timing left Number -----", Math.ceil(questionCount * 1.5))
      console.log("requestBody +++++:", requestBody)

      // const response = await axios.post<StartTestResponse>(`${BASE_URL}/api/Question/StartTest`, requestBody, {
      //   headers: getHeaders(),
      //   timeout: 10000,
      // })
const result = await startTestFetch(requestBody, getHeaders())
      // const result = response.data
      console.log("result ======", result)

      if (result?.succeeded) {
        setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
        // Update remaining attempts
        setData((prevData) => ({
          ...prevData,
          remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
        }))
      dispatch(changeResponseTestLength(result.data))
       console.log("result.data.length",result.data)

        router.push(`/dashboard/dashStudent/examGlobalTest?testId=${result.data}`)
      } else {
        setError(result?.message || "فشل في بدء الاختبار")
        if (result?.errors && result.errors.length > 0) {
          setError(result.errors.join(", "))
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
    } finally {
      setIsLoading(false)
    }
  }

  const isAuthenticated = isHydrated ? !!getAuthToken() : false

  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="p-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2 max-w-xs mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 max-w-sm mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="p-6">
          <div className="text-center">
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
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-pink-700 rounded-full text-sm font-medium">
            باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
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
                {/* Question Count Control with Buttons */}
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-sm font-medium text-gray-700">عدد الأسئلة</h3>

                  {/* Counter with buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementCount}
                      disabled={questionCount <= 1 || isLoading}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                      type="button"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
                      <div className="text-xs text-gray-500">من 100</div>
                    </div>

                    <button
                      onClick={incrementCount}
                      disabled={questionCount >= 100 || isLoading}
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
                      disabled={isLoading}
                      className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    disabled={isLoading}
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
      <div className="p-4">

        <QudratTestClasses qestioCount={questionCount} />

        <div className="mt-12 flex justify-center">
          <button
            onClick={startTest}
            disabled={isLoading || data.remainingAttempts <= 0}
            className="bg-purple-800 text-white px-8 py-3 rounded-md font-bold hover:bg-purple-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[150px] justify-center"
            type="button"
          >
            {isLoading ? "جاري التحضير..." : "ابدأ الاختبار"}
          </button>
        </div>
      </div>
    </div>
  )
}


