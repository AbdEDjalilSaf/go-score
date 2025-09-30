// "use client"
// import React, { useState, useEffect, useRef } from 'react'
// import examData from "./data.json"
// import { useSelector } from 'react-redux'
// import { changeTimingLeftTest } from '@/features/auth/authSlice'
// import { useDispatch } from 'react-redux'

// const headerInfoExam = () => {
 
// const [totalSeconds, setTotalSeconds] = useState(0)
// const [timeRemaining, setTimeRemaining] = useState("")
// const [timing,setTiming] = useState("")
// const [currentQuestion, setCurrentQuestion] = useState(0)
// const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
// const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
// const [answers, setAnswers] = useState<{ [key: number]: number }>({})

// const sectionsScrollRef = useRef<HTMLDivElement>(null)
// const skillIdTest = useSelector((state: { background: { skillIdTest: string } }) => state.background.skillIdTest);
// const questionCountTest = useSelector((state: { background: { questionCountTest: string } }) => state.background.questionCountTest);
// const timingLeftTest = useSelector((state: { background: { timingLeftTest: string } }) => state.background.timingLeftTest);
// const dispatch = useDispatch()

// useEffect(() => {
//     if (!timingLeftTest) return

//     const parseTimeString = (timeStr: string) => {
//       const parts = timeStr.split(":")
//       console.log("parts",parts)
//       const hours = Number.parseInt(parts[0]) || 0
//       console.log("hours",hours)
//       const minutes = Number.parseInt(parts[1]) || 0
//       console.log("minutes",minutes)
//       const seconds = Number.parseInt(parts[2]) || 0
//       console.log("seconds",seconds)
//       return hours * 3600 + minutes * 60 + seconds
//     }

//     const initialSeconds = parseTimeString(timingLeftTest)
//     console.log("initialSeconds",initialSeconds)
//     setTotalSeconds(initialSeconds)
//     dispatch(changeTimingLeftTest(timingLeftTest))
// }, [])


// useEffect(()=>{
// setTiming(timingLeftTest)
// },[timingLeftTest])

// useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//             setTiming("00:00:00")
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTiming(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])


// const handleQuestionJump = (questionIndex: number) => {
//     if (questionIndex >= 0 && questionIndex < exam.questions.length) {
//       setCurrentQuestion(questionIndex)
//       setSelectedAnswer(answers[questionIndex] ?? null)
//     }
// }


// const scrollSections = (direction: "left" | "right") => {
//     if (sectionsScrollRef.current) {
//       const scrollAmount = 200
//       const currentScroll = sectionsScrollRef.current.scrollLeft
//       const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
//       sectionsScrollRef.current.scrollTo({
//         left: newScroll,
//         behavior: "smooth",
//       })
//     }
// }

// const { exam } = examData
// const questionNumbers = Array.from({ length: exam.totalQuestions || exam.questions.length }, (_, i) => i + 1)

// const getTimerColor = () => {
//         if (totalSeconds <= 300) return "text-red-400"
//         if (totalSeconds <= 900) return "text-yellow-400"
//         return "text-white"
//     }


//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//           {/* Timer and Sections */}
//           <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
//             {/* Timer */}
//             <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
//               <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               {/* <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timeRemaining}</span> */}
//               <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timing}</span>
//             </div>

//             {/* Section Indicators with Scroll */}
//             <div className="relative flex items-center max-w-[750px] w-full">
//               {/* Left Scroll Button */}
//               <button
//                 onClick={() => scrollSections("left")}
//                 className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//                 aria-label="Scroll sections left"
//                type="button">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               {/* Scrollable Sections Container */}
//               <div
//                 ref={sectionsScrollRef}
//                 className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
//                 style={{
//                   scrollbarWidth: "none",
//                   msOverflowStyle: "none",
//                 }}
//               >
//                 {exam.sections.map((section, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
//                   >
//                     <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                       {section.completed ? (
//                         <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       ) : (
//                         <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                       )}
//                     </div>
//                     <span className="text-sm whitespace-nowrap">{section.name}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Scroll Button */}
//               <button
//                 onClick={() => scrollSections("right")}
//                 className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//                 aria-label="Scroll sections right"
//                 type="button">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Question Numbers */}
//           <div className="flex flex-wrap justify-center gap-1">
//             {questionNumbers.map((num, index) => (
//               <button
//                 key={num}
//                 onClick={() => handleQuestionJump(index)}
//                 className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
//                   index === currentQuestion
//                     ? "bg-white text-purple-700 font-bold"
//                     : answers[index] !== undefined
//                       ? "bg-green-500 text-white"
//                       : markedQuestions.has(index)
//                         ? "bg-yellow-500 text-white"
//                         : "bg-purple-500 text-white hover:bg-purple-400 border border-purple-400"
//                 }`}
//               type="button">
//                 {num}
//               </button>
//             ))}
//           </div>
//         </div>
//     </>
//   )
// }

// export default headerInfoExam














// "use client"
// import { useState, useEffect, useRef } from "react"
// import examData from "./data.json"
// import { useSelector } from "react-redux"
// // import { changeTimingLeftTest } from "@/features/auth/authSlice"
// // import { useDispatch } from "react-redux"
// import { useRouter } from "next/navigation"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"


// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080"

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }


// interface Skill { 
//   id: number
//   value: string
//   completed: boolean
//   testClassId: number
// }



// // interface StartTestResponse {
// //   meta: string
// //   succeeded: boolean
// //   message: string
// //   errors: string[]
// //   data: {
// //     id: number
// //     skillId: number
// //     questionId: number
// //     answerId: number
// //     isCorrect: boolean
// //     createdAt: string
// //     updatedAt: string
// //   }
// // }

// const headerInfoExam = (currentQuestionIndex: any) => {
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   // const [timeRemaining, setTimeRemaining] = useState("")
//   const [timing, setTiming] = useState("")
//   const [loading, setLoading] = useState(false)
//   // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [error, setError] = useState<string | null>(null)
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const router = useRouter()
//   const sectionsScrollRef = useRef<HTMLDivElement>(null)

//   const responseTestLength = useSelector((state: { background: { responseTestLength: number } }) => state.background.responseTestLength)
//   const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
//   const timingLeftTest = useSelector((state: { background: { timingLeftTest: string } }) => state.background.timingLeftTest)

//   const getSkillsById = (skills: Skill[], skillIdTest: number[]): Skill[] => {
//     if (!skillIdTest || !skills.length) return [];
//     return skills.filter(skill => skillIdTest.includes(skill.id));  
//   };


//   useEffect(() => { 
//     setTiming(timingLeftTest) 
//   }, []) 

//   const questionCountTest = useSelector((state: { background: { questionCountTest: string } }) => state.background.questionCountTest)

//   // const dispatch = useDispatch()

//   // const convertToHoursMinutesSeconds = (totalMinutes: number): string => {
//   //   const hours = Math.floor(totalMinutes / 60)
//   //   const minutes = totalMinutes % 60
//   //   const seconds = 0
//   //   return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//   // }



//   const parseTimeInput = (timeInput: string | number): number => {
//     // If it's a number, treat it as minutes and convert to seconds
//     if (typeof timeInput === "number") {
//       return timeInput * 60
//     }

//     // If it's a string, check if it's just a number (minutes) or HH:MM:SS format
//     const timeStr = timeInput.toString()

//     // Check if it's just a number (minutes)
//     if (/^\d+$/.test(timeStr)) {
//       return Number.parseInt(timeStr) * 60
//     }

//     // Parse HH:MM:SS format
//     const parts = timeStr.split(":")
//     const hours = Number.parseInt(parts[0]) || 0
//     const minutes = Number.parseInt(parts[1]) || 0
//     const seconds = Number.parseInt(parts[2]) || 0
//     return hours * 3600 + minutes * 60 + seconds
//   }

//   useEffect(() => {
//     if (!timingLeftTest) return

//     const initialSeconds = parseTimeInput(timingLeftTest)
//     console.log("initialSeconds", initialSeconds)
//     setTotalSeconds(initialSeconds)
//     // dispatch(changeTimingLeftTest(timingLeftTest))
//   }, [])



//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//           setTiming("00:00:00")
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTiming(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])

//   const handleQuestionJump = (questionIndex: number) => {
//     if (questionIndex >= 0 && questionIndex < exam.questions.length) {
//       setCurrentQuestion(questionIndex)
//       setSelectedAnswer(answers[questionIndex] ?? null)
//     }
//   }


//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("accessToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setSkills(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch skills")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSkills()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSkills()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               console.log("errorMessage", errorMessage)
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//               break
//             case 500:
//               errorMessage = "Server error (500). Please try again later."
//               break
//             default:
//               errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "Network error. Please check your internet connection."
//         } else {
//           errorMessage = `Request error: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "Unknown error"
//       }
//       console.error("Error fetching skills:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

// useEffect(()=>{
// fetchSkills()
// },[])
  


// // const skillIdTestNumber = Number()
// const filteredSkills = getSkillsById(skills, skillIdTest);


// useEffect(() => {
//   console.log("skills =============", skills)
//   console.log("skillIdTest ---------", skillIdTest)
//   console.log("questionCountTest ++++++++",questionCountTest)
//   console.log("filteredSkills +++++", filteredSkills)
//   console.log("responseTestLength",responseTestLength);
// }, [skills, skillIdTest,questionCountTest,responseTestLength])


//   const scrollSections = (direction: "left" | "right") => {
//     if (sectionsScrollRef.current) {
//       const scrollAmount = 200
//       const currentScroll = sectionsScrollRef.current.scrollLeft
//       const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
//       sectionsScrollRef.current.scrollTo({
//         left: newScroll,
//         behavior: "smooth",
//       })
//     }
//   }

//   const { exam } = examData
//   const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)
  
//   const currentQuestionForIndex = questionNumbers[currentQuestionIndex];
             
//   const getTimerColor = () => {
//     if (totalSeconds <= 300) return "text-red-400"
//     if (totalSeconds <= 900) return "text-yellow-400"
//     return "text-white"
//   }



//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//         {/* Timer and Sections */}
//         <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
//           {/* Timer */}
//           <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
//             <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timing}</span>
//           </div>

//           {/* Section Indicators with Scroll */}
//           <div className="relative flex items-center max-w-[750px] w-full">
//             {/* Left Scroll Button */}
//             <button
//               onClick={() => scrollSections("left")}
//               className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections left"
//               type="button"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             {/* Scrollable Sections Container */}
//             <div
//               ref={sectionsScrollRef}
//               className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {filteredSkills.map((skill) => (
//                 <div
//                   key={skill.id}
//                   className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
//                 >
//                   {/* <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                     {skill.completed ? (
//                       <svg
//                         className="w-4 h-4 text-green-600"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         aria-hidden="true"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     ) : (
//                       <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                     )}
//                   </div> */}
//                   <span className="text-sm whitespace-nowrap">{skill.value || "لا توجد مواد"}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Right Scroll Button */}
//             <button
//               onClick={() => scrollSections("right")}
//               className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections right"
//               type="button"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Question Numbers */}
//         <div className="flex flex-wrap justify-center gap-1">
//           {questionNumbers.map((num, index) => (
//             <button
//               key={num.toString()}
//               onClick={() => handleQuestionJump(index)}
//               className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
//                 index === currentQuestion
//                   ? "bg-white text-purple-700 font-bold"
//                   : answers[index] !== undefined
//                     ? "bg-green-500 text-white"
//                     : markedQuestions.has(index)
//                       ? "bg-yellow-500 text-white"
//                       : "bg-purple-500 text-white hover:bg-purple-400 border border-purple-400"
//               }`}
//               type="button" 
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default headerInfoExam













// "use client"
// import { useState, useEffect, useRef } from "react"
// import examData from "./data.json"
// import { useSelector } from "react-redux"
// import { useRouter } from "next/navigation"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { useDispatch } from "react-redux"
// import { changeIsTimingStop } from "@/features/auth/authSlice"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080"

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// interface Skill { 
//   id: number
//   value: string
//   completed: boolean
//   testClassId: number
// }

// // Updated interface to accept props
// interface HeaderInfoExamProps {
//   currentQuestionIndex: number
//   onQuestionJump?: (index: number) => void // Optional callback for question jumping
// }

// const headerInfoExam = ({ currentQuestionIndex, onQuestionJump }: HeaderInfoExamProps) => {
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   const [timing, setTiming] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   // const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const router = useRouter()
//   const sectionsScrollRef = useRef<HTMLDivElement>(null)
//   const dispatch = useDispatch()

//   const responseTestLength = useSelector((state: { background: { responseTestLength: number } }) => state.background.responseTestLength)
//   const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
//   const timingLeftTest = useSelector((state: { background: { timingLeftTest: string } }) => state.background.timingLeftTest)
//   const questionCountTest = useSelector((state: { background: { questionCountTest: string } }) => state.background.questionCountTest)

//   const getSkillsById = (skills: Skill[], skillIdTest: number[]): Skill[] => {
//     if (!skillIdTest || !skills.length) return [];
//     return skills.filter(skill => skillIdTest.includes(skill.id));  
//   };

//   useEffect(() => { 
//     setTiming(timingLeftTest) 
//   }, [timingLeftTest]) 

//   const parseTimeInput = (timeInput: string | number): number => {
//     if (typeof timeInput === "number") {
//       return timeInput * 60
//     }

//     const timeStr = timeInput.toString()

//     if (/^\d+$/.test(timeStr)) {
//       return Number.parseInt(timeStr) * 60
//     }

//     const parts = timeStr.split(":")
//     const hours = Number.parseInt(parts[0]) || 0
//     const minutes = Number.parseInt(parts[1]) || 0
//     const seconds = Number.parseInt(parts[2]) || 0
//     return hours * 3600 + minutes * 60 + seconds
//   }

//   useEffect(() => {
//     if (!timingLeftTest) return

//     const initialSeconds = parseTimeInput(timingLeftTest)
//     console.log("initialSeconds", initialSeconds)
//     setTotalSeconds(initialSeconds)
//   }, [timingLeftTest])

//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//           setTiming("00:00:00")
//           dispatch(changeIsTimingStop(true))
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTiming(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])

//   // Updated handleQuestionJump to use the callback
//   const handleQuestionJump = (questionIndex: number) => {
//     if (onQuestionJump) {
//       onQuestionJump(questionIndex)
//     }
//   }

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("accessToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setSkills(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch skills")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSkills()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSkills()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               console.log("errorMessage", errorMessage)
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//               break
//             case 500:
//               errorMessage = "Server error (500). Please try again later."
//               break
//             default:
//               errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "Network error. Please check your internet connection."
//         } else {
//           errorMessage = `Request error: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "Unknown error"
//       }
//       console.error("Error fetching skills:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchSkills()
//   }, [])

//   const filteredSkills = getSkillsById(skills, skillIdTest);

//   const scrollSections = (direction: "left" | "right") => {
//     if (sectionsScrollRef.current) {
//       const scrollAmount = 200
//       const currentScroll = sectionsScrollRef.current.scrollLeft
//       const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
//       sectionsScrollRef.current.scrollTo({
//         left: newScroll,
//         behavior: "smooth",
//       })
//     }
//   }

//   const { exam } = examData
//   const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)
  
//   const getTimerColor = () => {
//     if (totalSeconds <= 300) return "text-red-400"
//     if (totalSeconds <= 900) return "text-yellow-400"
//     return "text-white"
//   }

//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//         {/* Timer and Sections */}
//         <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
//           {/* Timer */}
//           <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
//             <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timing}</span>
//           </div>

//           {/* Section Indicators with Scroll */}
//           <div className="relative flex items-center max-w-[750px] w-full">
//             {/* Left Scroll Button */}
//             <button
//               onClick={() => scrollSections("left")}
//               className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections left"
//               type="button"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             {/* Scrollable Sections Container */}
//             <div
//               ref={sectionsScrollRef}
//               className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {filteredSkills.map((skill) => (
//                 <div
//                   key={skill.id}
//                   className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
//                 >
//                   <span className="text-sm whitespace-nowrap">{skill.value || "لا توجد مواد"}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Right Scroll Button */}
//             <button
//               onClick={() => scrollSections("right")}
//               className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections right"
//               type="button"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Question Numbers - Now uses currentQuestionIndex prop */}
//         <div className="flex flex-wrap justify-center gap-1">
//           {questionNumbers.map((num, index) => (
//             <button
//               key={num.toString()}
//               onClick={() => handleQuestionJump(index)}
//               className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
//                 index === currentQuestionIndex // Use the prop instead of local state
//                   ? "bg-white text-purple-700 font-bold"
//                   : answers[index] !== undefined
//                     ? "bg-green-500 text-white"
//                     : markedQuestions.has(index)
//                       ? "bg-yellow-500 text-white"
//                       : "bg-purple-500 text-white hover:bg-purple-400 border border-purple-400"
//               }`}
//               type="button" 
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default headerInfoExam



















"use client"
import { useState, useEffect, useRef } from "react"
import examData from "./data.json"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { changeIsTimingStop } from "@/features/auth/authSlice"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080"

interface ApiResponse<T> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

interface Skill { 
  id: number
  value: string
  completed: boolean
  testClassId: number
}

interface HeaderInfoExamProps {
  currentQuestionIndex: number
  onQuestionJump?: (index: number) => void
}

const HeaderInfoExam = ({ currentQuestionIndex, onQuestionJump }: HeaderInfoExamProps) => {
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [timing, setTiming] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
  const [skills, setSkills] = useState<Skill[]>([])
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const router = useRouter()
  const sectionsScrollRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const responseTestLength = useSelector((state: { background: { responseTestLength: number } }) => state.background.responseTestLength)
  const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
  const timingLeftTest = useSelector((state: { background: { timingLeftTest: string } }) => state.background.timingLeftTest)
  const questionCountTest = useSelector((state: { background: { questionCountTest: string } }) => state.background.questionCountTest)

  const getSkillsById = (skills: Skill[], skillIdTest: number[]): Skill[] => {
    if (!skillIdTest || !skills.length) return [];
    return skills.filter(skill => skillIdTest.includes(skill.id));  
  };

  useEffect(() => { 
    setTiming(timingLeftTest) 
  }, [timingLeftTest]) 

  const parseTimeInput = (timeInput: string | number): number => {
    if (typeof timeInput === "number") {
      return timeInput * 60
    }

    const timeStr = timeInput.toString()

    if (/^\d+$/.test(timeStr)) {
      return Number.parseInt(timeStr) * 60
    }

    const parts = timeStr.split(":")
    const hours = Number.parseInt(parts[0]) || 0
    const minutes = Number.parseInt(parts[1]) || 0
    const seconds = Number.parseInt(parts[2]) || 0
    return hours * 3600 + minutes * 60 + seconds
  }

  useEffect(() => {
    if (!timingLeftTest) return

    const initialSeconds = parseTimeInput(timingLeftTest)
    console.log("initialSeconds", initialSeconds)
    setTotalSeconds(initialSeconds)
  }, [timingLeftTest])

  useEffect(() => {
    if (totalSeconds <= 0) return

    const timer = setInterval(() => {
      setTotalSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1
        if (newSeconds <= 0) {
          setTiming("00:00:00")
          // Use setTimeout to dispatch after the current render cycle
          setTimeout(() => {
            dispatch(changeIsTimingStop(true))
          }, 0)
          return 0
        }

        const hours = Math.floor(newSeconds / 3600)
        const minutes = Math.floor((newSeconds % 3600) / 60)
        const seconds = newSeconds % 60
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        setTiming(formattedTime)
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [totalSeconds, dispatch]) // Add dispatch to dependencies

  const handleQuestionJump = (questionIndex: number) => {
    if (onQuestionJump) {
      onQuestionJump(questionIndex)
    }
  }

  const fetchSkills = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data.succeeded) {
        setSkills(response.data.data)
      } else {
        setError(response.data.message || "Failed to fetch skills")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء جلب البيانات"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchSkills()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchSkills()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              console.log("errorMessage", errorMessage)
              router.push("/admin/login")
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
      console.error("Error fetching skills:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const filteredSkills = getSkillsById(skills, skillIdTest);

  const scrollSections = (direction: "left" | "right") => {
    if (sectionsScrollRef.current) {
      const scrollAmount = 200
      const currentScroll = sectionsScrollRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
      sectionsScrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  const { exam } = examData
  const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)
  
  const getTimerColor = () => {
    if (totalSeconds <= 300) return "text-red-400"
    if (totalSeconds <= 900) return "text-yellow-400"
    return "text-white"
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
        {/* Timer and Sections */}
        <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timing}</span>
          </div>

          {/* Section Indicators with Scroll */}
          <div className="relative flex items-center max-w-[750px] w-full">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollSections("left")}
              className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Scroll sections left"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Sections Container */}
            <div
              ref={sectionsScrollRef}
              className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
                >
                  <span className="text-sm whitespace-nowrap">{skill.value || "لا توجد مواد"}</span>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollSections("right")}
              className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Scroll sections right"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Question Numbers - Now uses currentQuestionIndex prop */}
        <div className="flex flex-wrap justify-center gap-1">
          {questionNumbers.map((num, index) => (
            <button
              key={num.toString()}
              onClick={() => handleQuestionJump(index)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? "bg-white text-purple-700 font-bold"
                  : answers[index] !== undefined
                    ? "bg-green-500 text-white"
                    : markedQuestions.has(index)
                      ? "bg-yellow-500 text-white"
                      : "bg-purple-500 text-white hover:bg-purple-400 border border-purple-400"
              }`}
              type="button" 
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default HeaderInfoExam