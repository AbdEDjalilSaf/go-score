// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import examData from "./data.json"

// export default function ExamInterface() {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   const [timeRemaining, setTimeRemaining] = useState("")
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   const [showExitModal, setShowExitModal] = useState(false)
//   const router = useRouter()

//   const handleExitAttempt = () => {
//     setShowExitModal(true)
//   }
//     const sectionsScrollRef = useRef<HTMLDivElement>(null)
//     const examContainerRef = useRef<HTMLDivElement>(null)

//   const { exam } = examData
//   const question = exam.questions[currentQuestion]

//     // Setup click outside detection
//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       // If the click is outside the exam container, trigger handleExitAttempt
//       if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
//         handleExitAttempt()
//       }
//     }

//     // Add event listener to document
//     document.addEventListener("click", handleDocumentClick)

//     // Cleanup
//     return () => {
//       document.removeEventListener("click", handleDocumentClick)
//     }
//   }, [handleExitAttempt])


  
//   // Generate question numbers array
//   const questionNumbers = Array.from({ length: exam.totalQuestions }, (_, i) => i + 1)


//   // Initialize timer from exam data
//   useEffect(() => {
//     const parseTimeString = (timeStr: string) => {
//       const parts = timeStr.split(":")
//       const hours = Number.parseInt(parts[0]) || 0
//       const minutes = Number.parseInt(parts[1]) || 0
//       const seconds = Number.parseInt(parts[2]) || 0
//       return hours * 3600 + minutes * 60 + seconds
//     }

//     const initialSeconds = parseTimeString(exam.timeRemaining)
//     setTotalSeconds(initialSeconds)
//     setTimeRemaining(exam.timeRemaining)
//   }, [exam.timeRemaining])

//   // Countdown timer effect
//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1

//         if (newSeconds <= 0) {
//           // Timer expired
//           setTimeRemaining("00:00:00")
//           return 0
//         }

//         // Format time as HH:MM:SS
//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60

//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

//         setTimeRemaining(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])


//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: answerIndex,
//     }))
//   }

//   const handleNext = () => {
//     if (currentQuestion < exam.questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1)
//       setSelectedAnswer(answers[currentQuestion + 1] ?? null)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1)
//       setSelectedAnswer(answers[currentQuestion - 1] ?? null)
//     }
//   }

//   const handleQuestionJump = (questionIndex: number) => {
//     setCurrentQuestion(questionIndex)
//     setSelectedAnswer(answers[questionIndex] ?? null)
//   }

//   const toggleMark = () => {
//     const newMarked = new Set(markedQuestions)
//     if (newMarked.has(currentQuestion)) {
//       newMarked.delete(currentQuestion)
//     } else {
//       newMarked.add(currentQuestion)
//     }
//     setMarkedQuestions(newMarked)
//   }


//    const scrollSections = (direction: "left" | "right") => {
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


//     // Get timer color based on remaining time
//   const getTimerColor = () => {
//     if (totalSeconds <= 300) return "text-red-400" // Last 5 minutes
//     if (totalSeconds <= 900) return "text-yellow-400" // Last 15 minutes
//     return "text-white"
//   }

//   return (
//         <div className="relative">
//     <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
   
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//         {/* Timer and Sections */}
//         <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
//           {/* Timer */}
//           <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
//             <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <span className={`font-bold text-lg transition-colors ${getTimerColor()} `}>{timeRemaining}</span>
//           </div>


//             {/* Section Indicators with Scroll */}
//           <div className="relative flex items-center max-w-[750px] w-full">
//             {/* Left Scroll Button */}
//             <button
//               onClick={() => scrollSections("left")}
//               className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections left"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
//               }}>
//               {exam.sections.map((section, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
//                 >
//                   <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                     {section.completed ? (
//                       <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     ) : (
//                       <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                     )}
//                   </div>
//                   <span className="text-sm whitespace-nowrap">{section.name}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Right Scroll Button */}
//             <button
//               onClick={() => scrollSections("right")}
//               className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//               aria-label="Scroll sections right"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Question Numbers */}
//         <div className="flex flex-wrap justify-center gap-1">
//           {questionNumbers.map((num, index) => (
//             <button
//               key={num}
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
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto p-4">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
//           {/* Question Header */}
//           <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => {}}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded text-sm font-medium"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 مراجعة
//               </button>
//               <button
//                 onClick={toggleMark}
//                 className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
//                   markedQuestions.has(currentQuestion)
//                     ? "bg-yellow-500 hover:bg-yellow-400 text-white"
//                     : "bg-gray-500 hover:bg-gray-400 text-white"
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 تمييز
//               </button>
//             </div>
//             <h2 className="text-xl font-bold">السؤال: ({currentQuestion + 1})</h2>
//           </div>

//           {/* Question Content */}
//           <div className="p-8">
//             <div className="text-center mb-8">
//               <p className="text-xl mb-8 leading-relaxed font-medium">{question.text}</p>
//               {question.image && (
//                 <div className="flex justify-center mb-8">
//                   <div className="border-2 border-purple-400 rounded-lg p-4 bg-blue-50">
//                     <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
//                       {/* Square outline */}
//                       <rect x="20" y="20" width="80" height="80" fill="none" stroke="#7c3aed" strokeWidth="2" />
//                       {/* Triangle */}
//                       <polygon points="20,100 100,100 100,20" fill="#93c5fd" stroke="#7c3aed" strokeWidth="2" />
//                       {/* Diagonal line */}
//                       <line x1="20" y1="100" x2="100" y2="20" stroke="#7c3aed" strokeWidth="2" />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Answer Options */}
//             <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
//               {question.options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelect(index)}
//                   className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                     selectedAnswer === index
//                       ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                       : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center gap-6">
//               <button
//                 onClick={handleNext}
//                 disabled={currentQuestion >= exam.questions.length - 1}
//                 className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-lg"
//               >
//                 التالي
//               </button>
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentQuestion === 0}
//                 className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
//               >
//                 السابق
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
  
//     </div>


//        {/* Exit Confirmation Modal */}
//       {showExitModal && (
//         <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
//           <div className="bg-white  flex items-center justify-center  rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
//             <div className="p-8 text-center" dir="rtl">
//               {/* Warning Icon */}
//               <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                 <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
//                   <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">!</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Message */}
//               <p className="text-gray-800 text-lg leading-relaxed mb-8">
//                 هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
//               </p>

//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={() => {
//                     // Handle exit logic
//                     console.log("User confirmed exit")
//                     setShowExitModal(false)
//                     router.back();
//                   }}
//                   className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
//                 >
//                   خروج
//                 </button>
//                 <button
//                   onClick={() => setShowExitModal(false)}
//                   className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
//                 >
//                   إكمال
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { startTestFetch } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
// import HeaderInfoExam from "./headerInfoExam"
// import { useSelector } from "react-redux"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import Cookies from "js-cookie"
// import axios from 'axios'
// import examData from "./data.json"
 

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface questionResponse {
//   value: string
//   answer: string
//   skillId: number
//   choiceResponses: choiceResponse[]
// }

// interface choiceResponse {
//   id: string
//   value: string
// }

// // interface StartTestResponse {
// //   meta: string
// //   succeeded: boolean
// //   message: string
// //   errors: string[]
// //   data: number
// // }


// export default function ExamInterface() {
//   // All useState hooks first
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   const [timeRemaining, setTimeRemaining] = useState("")
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   const [data, setData] = useState<questionResponse[]>([])
//   const [testId, setTestId] = useState<number | null>(null)
//   const [showExitModal, setShowExitModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
//   const questionCountTest = useSelector(
//     (state: { background: { questionCountTest: number } }) => state.background.questionCountTest,
//   )

//   // All other hooks
//   const router = useRouter()
//   // const sectionsScrollRef = useRef<HTMLDivElement>(null)
//   const examContainerRef = useRef<HTMLDivElement>(null)

//   // All useEffect hooks
//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
//         handleExitAttempt()
//       }
//     }

//     document.addEventListener("click", handleDocumentClick)
//     return () => {
//       document.removeEventListener("click", handleDocumentClick)
//     }
//   }, [])

//   useEffect(() => {
//     try {
//       if (!examData || !examData.exam) {
//         throw new Error("Invalid exam data structure")
//       }

//       const { exam } = examData

//       if (!exam.questions || !Array.isArray(exam.questions) || exam.questions.length === 0) {
//         throw new Error("No questions found in exam data")
//       }

//       if (!exam.sections || !Array.isArray(exam.sections)) {
//         throw new Error("No sections found in exam data")
//       }

//       if (!exam.timeRemaining) {
//         throw new Error("No time remaining data found")
//       }

//       setIsLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load exam data")
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (!examData?.exam?.timeRemaining) return

//     const parseTimeString = (timeStr: string) => {
//       const parts = timeStr.split(":")
//       const hours = Number.parseInt(parts[0]) || 0
//       const minutes = Number.parseInt(parts[1]) || 0
//       const seconds = Number.parseInt(parts[2]) || 0
//       return hours * 3600 + minutes * 60 + seconds
//     }

//     const initialSeconds = parseTimeString(examData.exam.timeRemaining)
//     setTotalSeconds(initialSeconds)
//     setTimeRemaining(examData.exam.timeRemaining)
//   }, [])

//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//           setTimeRemaining("00:00:00")
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTimeRemaining(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])

//   // Function definitions
//   const handleExitAttempt = () => {
//     setShowExitModal(true)
//   }

//   const getAuthToken = () => {
//     return Cookies.get("accessToken")
//   }

//   const getHeaders = () => {
//     const token = getAuthToken()
//     return {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }
//   }

//   const startTest = async () => {
//     // const token = getAuthToken()

//     setIsLoading(true)
//     setError(null)

//     try {
//       const requestBody: StartTestRequest = {
//         skillIds: skillIdTest,
//         count: questionCountTest,
//       }

  
// const result = await startTestFetch(requestBody, getHeaders())
//       console.log("result ======", result)

//       if (result?.succeeded) {
//         setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
//         // Update remaining attempts
//         // setData((prevData) => ({
//         //   ...prevData,
//         //   remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
//         // }))
//    console.log("response is  +++++++++++",result)
//    console.log("data is ============",result.data);
//    setData(result.data)
//         // router.push(`/dashboard/dashStudent/examGlobalTest?testId=${result.data}`)
//       } else {
//         setError(result?.message || "فشل في بدء الاختبار")
//         if (result?.errors && result.errors.length > 0) {
//           setError(result.errors.join(", "))
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
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }


// useEffect(()=>{
//  startTest()
// },[])

//   // Now handle conditional rendering AFTER all hooks
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري تحميل الاختبار...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">خطأ في تحميل الاختبار</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           type="button">
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const { exam } = examData
//   const question = exam.questions[currentQuestion]

//   if (!question) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">السؤال غير موجود</div>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           type="button">
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // Generate question numbers array
//   // const questionNumbers = Array.from({ length: exam.totalQuestions || exam.questions.length }, (_, i) => i + 1)

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: answerIndex,
//     }))
//   }

//   const handleNext = () => {
//     if (currentQuestion < exam.questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1)
//       setSelectedAnswer(answers[currentQuestion + 1] ?? null)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1)
//       setSelectedAnswer(answers[currentQuestion - 1] ?? null)
//     }
//   }

//   // const handleQuestionJump = (questionIndex: number) => {
//   //   if (questionIndex >= 0 && questionIndex < exam.questions.length) {
//   //     setCurrentQuestion(questionIndex)
//   //     setSelectedAnswer(answers[questionIndex] ?? null)
//   //   }
//   // }

//   const toggleMark = () => {
//     const newMarked = new Set(markedQuestions)
//     if (newMarked.has(currentQuestion)) {
//       newMarked.delete(currentQuestion)
//     } else {
//       newMarked.add(currentQuestion)
//     }
//     setMarkedQuestions(newMarked)
//   }

//   // const scrollSections = (direction: "left" | "right") => {
//   //   if (sectionsScrollRef.current) {
//   //     const scrollAmount = 200
//   //     const currentScroll = sectionsScrollRef.current.scrollLeft
//   //     const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
//   //     sectionsScrollRef.current.scrollTo({
//   //       left: newScroll,
//   //       behavior: "smooth",
//   //     })
//   //   }
//   // }



//   return (
//     <div className="relative">
//       <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
//         {/* Header Section */}
//         {/* <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//           <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
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
//               <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timeRemaining}</span>
//             </div>

//             <div className="relative flex items-center max-w-[750px] w-full">
//               <button
//                 onClick={() => scrollSections("left")}
//                 className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//                 aria-label="Scroll sections left"
//                type="button">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

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
//         </div> */}

//       <HeaderInfoExam />








//         {/* Main Content */}
//         <div className="max-w-5xl mx-auto p-4">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
//             {/* Question Header */}
//             <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => {}}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded text-sm font-medium"
//                 type="button">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   مراجعة
//                 </button>
//                 <button
//                   onClick={toggleMark}
//                   className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
//                     markedQuestions.has(currentQuestion)
//                       ? "bg-yellow-500 hover:bg-yellow-400 text-white"
//                       : "bg-gray-500 hover:bg-gray-400 text-white"
//                   }`}
//                 type="button">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   تمييز
//                 </button>
//               </div>
//               {/* <h2 className="text-xl font-bold">السؤال: ({currentQuestion + 1})</h2> */}
//             </div>

//             {/* Question Content */}
//             <div className="p-8">
//               <div className="text-center mb-8">
  
//                 <p className="text-xl mb-8 leading-relaxed font-medium">{data[currentQuestion].value || "نص السؤال غير متوفر"}</p>
//                 {/* {data[currentQuestion].image && (
//                   <div className="flex justify-center mb-8">
//                     <div className="border-2 border-purple-400 rounded-lg p-4 bg-blue-50">
//                       <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" aria-hidden="true">
//                         <rect x="20" y="20" width="80" height="80" fill="none" stroke="#7c3aed" strokeWidth="2" />
//                         <polygon points="20,100 100,100 100,20" fill="#93c5fd" stroke="#7c3aed" strokeWidth="2" />
//                         <line x1="20" y1="100" x2="100" y2="20" stroke="#7c3aed" strokeWidth="2" />
//                       </svg>
//                     </div>
//                   </div>
//                 )} */}
//               </div>

//               {/* Answer Options */}
//               <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
//                 {data[currentQuestion].choiceResponses &&
//                   data[currentQuestion].choiceResponses.map((option, index) => (
                    
//                     <button
//                       key={index}
//                       onClick={() => handleAnswerSelect(index)}
//                       className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                         selectedAnswer === index
//                           ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                       }`}
//                     type="button">
//                       {option}
//                     </button>
//                   ))}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-center gap-6">
//                 <button
//                   onClick={handleNext}
//                   disabled={currentQuestion >= exam.questions.length - 1}
//                   className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-lg"
//                 type="button">
//                   التالي
//                 </button>
//                 <button
//                   onClick={handlePrevious}
//                   disabled={currentQuestion === 0}
//                   className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
//                 type="button">
//                   السابق
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Exit Confirmation Modal */}
//       {showExitModal && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white flex items-center justify-center rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
//             <div className="p-8 text-center" dir="rtl">
//               {/* Warning Icon */}
//               <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                 <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
//                   <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">!</span>
//                   </div>
//                 </div>
//               </div>
//               {/* Message */}
//               <p className="text-gray-800 text-lg leading-relaxed mb-8">
//                 هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
//               </p>
//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={() => {
//                     console.log("User confirmed exit")
//                     setShowExitModal(false)
//                     router.back()
//                   }}
//                   className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
//                 type="button">
//                   خروج
//                 </button>
//                 <button
//                   onClick={() => setShowExitModal(false)}
//                   className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
//                 type="button">
//                   إكمال
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }














// "use client"

// import { useState, useEffect, useRef, useMemo } from "react"
// import { useRouter } from "next/navigation"
// import { startTestFetch } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
// import HeaderInfoExam from "./headerInfoExam"
// import { useSelector } from "react-redux"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import Cookies from "js-cookie"
// import axios from "axios"
// import examData from "./data.json"

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface questionResponse {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choiceResponses: choiceResponse[]
// }

// interface choiceResponse {
//   id: string
//   value: string
// }

// // interface StartTestResponse {
// //   meta: string
// //   succeeded: boolean
// //   message: string
// //   errors: string[]
// //   data: number
// // }

// // Create all options including the correct answer
// function createShuffledOptions(questionData) {
//   // Combine choice responses with the correct answer
//   const allOptions = [
//     ...questionData.choiceResponses.map((option, index) => ({
//       value: option.value,
//       originalIndex: index,
//       isCorrect: false
//     })),
//     {
//       value: questionData.answer,
//       originalIndex: questionData.answer,
//       isCorrect: true
//     }
//   ];
  
//   // Remove duplicates (in case the correct answer is already in choiceResponses)
//   const uniqueOptions = allOptions.filter((option, index, self) => 
//     index === self.findIndex(o => o.value === option.value)
//   );
  
//   // Shuffle the options
//   return shuffleArray(uniqueOptions);
// }

// function shuffleArray(array: any[]) {
//   return [...array].sort(() => Math.random() - 0.5);
// }


// export default function ExamInterface() {
//   // All useState hooks first
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   const [timeRemaining, setTimeRemaining] = useState("")
//   const [resultData, setResultData] = useState("")
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   const [data, setData] = useState<questionResponse[]>([])
//   const [testId, setTestId] = useState<number | null>(null)
//   const [showExitModal, setShowExitModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [shuffledOptionsState, setShuffledOptionsState] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null)

//   const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
//   const questionCountTest = useSelector(
//     (state: { background: { questionCountTest: number } }) => state.background.questionCountTest,
//   )

// const responseTestLength = useSelector(
//     (state: { background: { responseTestLength: number } }) => state.background.responseTestLength,
// )

// const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)

//   // All other hooks
//   const router = useRouter()
//   // const sectionsScrollRef = useRef<HTMLDivElement>(null)
//   const examContainerRef = useRef<HTMLDivElement>(null)

//   // All useEffect hooks
//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
//         handleExitAttempt()
//       }
//     }

//     document.addEventListener("click", handleDocumentClick)
//     return () => {
//       document.removeEventListener("click", handleDocumentClick)
//     }
//   }, [])

//   useEffect(() => {
//     try {
//       if (!examData || !examData.exam) {
//         throw new Error("Invalid exam data structure")
//       }

//       const { exam } = examData

//       if (!responseTestLength || !Array.isArray(responseTestLength) || responseTestLength.length === 0) {
//         throw new Error("No questions found in exam data")
//       }

//       if (!exam.sections || !Array.isArray(exam.sections)) {
//         throw new Error("No sections found in exam data")
//       }

//       if (!exam.timeRemaining) {
//         throw new Error("No time remaining data found")
//       }

//       setIsLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load exam data")
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (!examData?.exam?.timeRemaining) return

//     const parseTimeString = (timeStr: string) => {
//       const parts = timeStr.split(":")
//       const hours = Number.parseInt(parts[0]) || 0
//       const minutes = Number.parseInt(parts[1]) || 0
//       const seconds = Number.parseInt(parts[2]) || 0
//       return hours * 3600 + minutes * 60 + seconds
//     }

//     const initialSeconds = parseTimeString(examData.exam.timeRemaining)
//     setTotalSeconds(initialSeconds)
//     setTimeRemaining(examData.exam.timeRemaining)
//   }, [])

//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//           setTimeRemaining("00:00:00")
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTimeRemaining(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])

//   // Function definitions
//   const handleExitAttempt = () => {
//     setShowExitModal(true)
//   }

//   const getAuthToken = () => {
//     return Cookies.get("accessToken")
//   }

//   const getHeaders = () => {
//     const token = getAuthToken()
//     return {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }
//   }

//   const startTest = async () => {
//     // const token = getAuthToken()

//     setIsLoading(true)
//     setError(null)

//     try {
//       const requestBody: StartTestRequest = {
//         skillIds: skillIdTest,
//         count: questionCountTest,
//       }

//       const result = await startTestFetch(requestBody, getHeaders())
//       console.log("result ======", result)

//       if (result?.succeeded) {
//         setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
//         // Update remaining attempts
//         // setData((prevData) => ({
//         //   ...prevData,
//         //   remainingAttempts: Math.max(0, prevData.remainingAttempts - 1),
//         // }))
//         console.log("response is  +++++++++++", result)
//         console.log("data is ============", result.data)
//         setResultData
//         setData(result.data)
//         // router.push(`/dashboard/dashStudent/examGlobalTest?testId=${result.data}`)
//       } else {
//         setError(result?.message || "فشل في بدء الاختبار")
//         if (result?.errors && result.errors.length > 0) {
//           setError(result.errors.join(", "))
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
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     startTest()
//   }, [])

// const handleNextForIndex = ()=>{
//     if (currentQuestionIndex < questionNumbers.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
// }

// const handlePreviousForIndex = () => {
//   if (currentQuestionIndex > 0) {
//     setCurrentQuestionIndex(prev => prev - 1);
//   }
// };

//   const shuffledOptions = useMemo(() => {
//     if (!data[currentQuestion]) return [];
//     return createShuffledOptions(data[currentQuestion]);
//   }, [currentQuestion, data]);

//   useEffect(() => {
//     if (data[currentQuestion]) {
//       const options = data[currentQuestion].choiceResponses.map((opt: choiceResponse, index: number) => ({
//         value: opt.value,
//         isCorrect: opt.value === data[currentQuestion].answer,
//         originalIndex: index,
//       }));
  
//       setShuffledOptionsState(shuffleArray(options));
//     }
//   }, [currentQuestion, data]);

//   // Now handle conditional rendering AFTER all hooks
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري تحميل الاختبار...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">خطأ في تحميل الاختبار</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//             type="button"
//           >
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   } 

//   const { exam } = examData
//   const question = data[currentQuestion]

//   if (!question) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">السؤال غير موجود</div>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//             type="button"
//           >
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // Generate question numbers array
//   // const questionNumbers = Array.from({ length: exam.totalQuestions || exam.questions.length }, (_, i) => i + 1)

//   const handleAnswerSelect = (answerIndex: number) => {
//     console.log("answerIndex", answerIndex)
//     setSelectedAnswer(answerIndex)
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: answerIndex,
//     }))
//   }

//   const handleNext = () => {
//     if (currentQuestion < data.length - 1) {
//       setCurrentQuestion((prev) => prev + 1)
//       setSelectedAnswer(answers[currentQuestion + 1] ?? null)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1)
//       setSelectedAnswer(answers[currentQuestion - 1] ?? null)
//     }
//   }


//   // Add this function to handle question jumping from the header
// const handleQuestionJumpFromHeader = (questionIndex: number) => {
//   if (questionIndex >= 0 && questionIndex < data.length) {
//     setCurrentQuestion(questionIndex)
//     setCurrentQuestionIndex(questionIndex)
//     setSelectedAnswer(answers[questionIndex] ?? null)
//   }
// }


//   // const handleQuestionJump = (questionIndex: number) => {
//   //   if (questionIndex >= 0 && questionIndex < exam.questions.length) {
//   //     setCurrentQuestion(questionIndex)
//   //     setSelectedAnswer(answers[questionIndex] ?? null)
//   //   }
//   // }

//   const toggleMark = () => {
//     const newMarked = new Set(markedQuestions)
//     if (newMarked.has(currentQuestion)) {
//       newMarked.delete(currentQuestion)
//     } else {
//       newMarked.add(currentQuestion)
//     }
//     setMarkedQuestions(newMarked)
//   }

//   // const scrollSections = (direction: "left" | "right") => {
//   //   if (sectionsScrollRef.current) {
//   //     const scrollAmount = 200
//   //     const currentScroll = sectionsScrollRef.current.scrollLeft
//   //     const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
//   //     sectionsScrollRef.current.scrollTo({
//   //       left: newScroll,
//   //       behavior: "smooth",
//   //     })
//   //   }
//   // }

//   return (
//     <div className="relative">
//       <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
//         {/* Header Section */}
//         {/* <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
//           <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
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
//               <span className={`font-bold text-lg transition-colors ${getTimerColor()}`}>{timeRemaining}</span>
//             </div>

//             <div className="relative flex items-center max-w-[750px] w-full">
//               <button
//                 onClick={() => scrollSections("left")}
//                 className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
//                 aria-label="Scroll sections left"
//                type="button">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

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

//           <div className="flex flex-wrap justify-center gap-1">
//             {exam.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {}}
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
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div> */}

// <HeaderInfoExam 
//   currentQuestionIndex={currentQuestionIndex}
//   onQuestionJump={handleQuestionJumpFromHeader}
// />


//         {/* Main Content */}
//         <div className="max-w-5xl mx-auto p-4">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
//             {/* Question Header */}
//             <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
//               {/* <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => {}}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded text-sm font-medium"
//                   type="button"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   مراجعة
//                 </button>
//                 <button
//                   onClick={toggleMark}
//                   className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
//                     markedQuestions.has(currentQuestion)
//                       ? "bg-yellow-500 hover:bg-yellow-400 text-white"
//                       : "bg-gray-500 hover:bg-gray-400 text-white"
//                   }`}
//                   type="button"
//                 >
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   تمييز
//                 </button>
//               </div> */}
//               {/* <h2 className="text-xl font-bold">السؤال: ({currentQuestion + 1})</h2> */}
//             </div>

//             {/* Question Content */}
//             <div className="p-8">
//               <div className="text-center mb-8">
//                 <p className="text-xl mb-8 leading-relaxed font-medium">
//                   {data[currentQuestion].value || "نص السؤال غير متوفر"}
//                 </p>
//                 {/* {data[currentQuestion].image && (
//                   <div className="flex justify-center mb-8">
//                     <div className="border-2 border-purple-400 rounded-lg p-4 bg-blue-50">
//                       <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" aria-hidden="true">
//                         <rect x="20" y="20" width="80" height="80" fill="none" stroke="#7c3aed" strokeWidth="2" />
//                         <polygon points="20,100 100,100 100,20" fill="#93c5fd" stroke="#7c3aed" strokeWidth="2" />
//                         <line x1="20" y1="100" x2="100" y2="20" stroke="#7c3aed" strokeWidth="2" />
//                       </svg>
//                     </div>
//                   </div>
//                 )} */}
//               </div>

//               {/* Answer Options */}
//               <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
                    
//                 {data[currentQuestion].choiceResponses.map((option, index) => (
//                     <button
//                       key={index} 
//                       onClick={() => handleAnswerSelect(index)}
//                       className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                         selectedAnswer === index
//                           ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                       }`}
//                       type="button"
//                     >
//                     {option.value}
//                     </button> 
//                   ))} 
//                    <button
//                      key={data[currentQuestion].answer}
//                      onClick={() => handleAnswerSelect(data[currentQuestion].answer)}
//                      className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                        selectedAnswer === data[currentQuestion].answer
//                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                      }`}
//                      type="button"
//                    >
//                      {data[currentQuestion].answer}
//                    </button> 
 
// {/* <div className="grid gap-4">
// {shuffledOptionsState.map((option, index) => (
//   <button
//     key={`${currentQuestion}-${index}`}
//     onClick={() =>
//       handleAnswerSelect(
//         option.isCorrect ? data[currentQuestion].answer : option.originalIndex
//       )
//     }
//     className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//       selectedAnswer ===
//       (option.isCorrect ? data[currentQuestion].answer : option.originalIndex)
//         ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//         : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//     }`}
//     type="button"
//   >
//     {option.value}
//   </button>
// ))}
//     </div>  */}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-center gap-6">
//                 <button
//                   onClick={()=> {
//                     handleNext();
//                     handleNextForIndex();
//                   }}
//                   disabled={currentQuestion >= data.length - 1}
//                   className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-lg"
//                   type="button"
//                 >
//                   التالي
//                 </button>
//                 <button
//                   onClick={()=>{
//                     handlePrevious()
//                     handlePreviousForIndex()
//                   }}
//                   disabled={currentQuestion === 0}
//                   className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
//                   type="button"
//                 >
//                   السابق
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Exit Confirmation Modal */}
//       {showExitModal && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white flex items-center justify-center rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
//             <div className="p-8 text-center" dir="rtl">
//               {/* Warning Icon */}
//               <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                 <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
//                   <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">!</span>
//                   </div>
//                 </div>
//               </div>
//               {/* Message */}
//               <p className="text-gray-800 text-lg leading-relaxed mb-8">
//                 هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
//               </p>
//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={() => {
//                     console.log("User confirmed exit")
//                     setShowExitModal(false)
//                     router.back()
//                   }}
//                   className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
//                   type="button"
//                 >
//                   خروج
//                 </button>
//                 <button
//                   onClick={() => setShowExitModal(false)}
//                   className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
//                   type="button"
//                 >
//                   إكمال
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }













// "use client"

// import { useState, useEffect, useRef, useMemo } from "react"
// import { useRouter } from "next/navigation"
// import { startTestFetch } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
// import HeaderInfoExam from "./headerInfoExam"
// import { useSelector } from "react-redux"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import Cookies from "js-cookie"
// import axios from "axios"
// import examData from "./data.json"

// interface StartTestRequest {
//   skillIds: number[]
//   count: number
// }

// interface questionResponse {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choiceResponses: choiceResponse[]
// }

// interface choiceResponse {
//   id: string
//   value: string
// }

// // Create all options including the correct answer
// function createShuffledOptions(questionData) {
//   // Combine choice responses with the correct answer
//   const allOptions = [
//     ...questionData.choiceResponses.map((option, index) => ({
//       value: option.value,
//       originalIndex: index,
//       isCorrect: false
//     })),
//     {
//       value: questionData.answer,
//       originalIndex: questionData.answer,
//       isCorrect: true
//     }
//   ];
  
//   // Remove duplicates (in case the correct answer is already in choiceResponses)
//   const uniqueOptions = allOptions.filter((option, index, self) => 
//     index === self.findIndex(o => o.value === option.value)
//   );
  
//   // Shuffle the options
//   return shuffleArray(uniqueOptions);
// }

// function shuffleArray(array: any[]) {
//   return [...array].sort(() => Math.random() - 0.5);
// }

// export default function ExamInterface() {
//   // All useState hooks first
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [answers, setAnswers] = useState<{ [key: number]: number }>({})
//   const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
//   const [timeRemaining, setTimeRemaining] = useState("")
//   const [resultData, setResultData] = useState("")
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [totalSeconds, setTotalSeconds] = useState(0)
//   const [data, setData] = useState<questionResponse[]>([])
//   const [testId, setTestId] = useState<number | null>(null)
//   const [showExitModal, setShowExitModal] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [shuffledOptionsState, setShuffledOptionsState] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null)

//   const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
//   const questionCountTest = useSelector(
//     (state: { background: { questionCountTest: number } }) => state.background.questionCountTest,
//   )

// const responseTestLength = useSelector(
//     (state: { background: { responseTestLength: number } }) => state.background.responseTestLength,
// )

// const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)

//   // All other hooks
//   const router = useRouter()
//   const examContainerRef = useRef<HTMLDivElement>(null)

//   // Check if current question is the last one
//   const isLastQuestion = currentQuestion === data.length - 1

//   // All useEffect hooks
//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
//         handleExitAttempt()
//       }
//     }

//     document.addEventListener("click", handleDocumentClick)
//     return () => {
//       document.removeEventListener("click", handleDocumentClick)
//     }
//   }, [])

//   useEffect(() => {
//     try {
//       if (!examData || !examData.exam) {
//         throw new Error("Invalid exam data structure")
//       }

//       const { exam } = examData

//       if (!responseTestLength || !Array.isArray(responseTestLength) || responseTestLength.length === 0) {
//         throw new Error("No questions found in exam data")
//       }

//       if (!exam.sections || !Array.isArray(exam.sections)) {
//         throw new Error("No sections found in exam data")
//       }

//       if (!exam.timeRemaining) {
//         throw new Error("No time remaining data found")
//       }

//       setIsLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load exam data")
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (!examData?.exam?.timeRemaining) return

//     const parseTimeString = (timeStr: string) => {
//       const parts = timeStr.split(":")
//       const hours = Number.parseInt(parts[0]) || 0
//       const minutes = Number.parseInt(parts[1]) || 0
//       const seconds = Number.parseInt(parts[2]) || 0
//       return hours * 3600 + minutes * 60 + seconds
//     }

//     const initialSeconds = parseTimeString(examData.exam.timeRemaining)
//     setTotalSeconds(initialSeconds)
//     setTimeRemaining(examData.exam.timeRemaining)
//   }, [])

//   useEffect(() => {
//     if (totalSeconds <= 0) return

//     const timer = setInterval(() => {
//       setTotalSeconds((prevSeconds) => {
//         const newSeconds = prevSeconds - 1
//         if (newSeconds <= 0) {
//           setTimeRemaining("00:00:00")
//           return 0
//         }

//         const hours = Math.floor(newSeconds / 3600)
//         const minutes = Math.floor((newSeconds % 3600) / 60)
//         const seconds = newSeconds % 60
//         const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//         setTimeRemaining(formattedTime)
//         return newSeconds
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [totalSeconds])

//   // Function definitions
//   const handleExitAttempt = () => {
//     setShowExitModal(true)
//   }

//   const getAuthToken = () => {
//     return Cookies.get("accessToken")
//   }

//   const getHeaders = () => {
//     const token = getAuthToken()
//     return {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     }
//   }

//   const startTest = async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const requestBody: StartTestRequest = {
//         skillIds: skillIdTest,
//         count: questionCountTest,
//       }

//       const result = await startTestFetch(requestBody, getHeaders())
//       console.log("result ======", result)

//       if (result?.succeeded) {
//         setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
//         console.log("response is  +++++++++++", result)
//         console.log("data is ============", result.data)
//         setResultData
//         setData(result.data)
//       } else {
//         setError(result?.message || "فشل في بدء الاختبار")
//         if (result?.errors && result.errors.length > 0) {
//           setError(result.errors.join(", "))
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
//       setError(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     startTest()
//   }, [])

// const handleNextForIndex = ()=>{
//     if (currentQuestionIndex < questionNumbers.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
// }

// const handlePreviousForIndex = () => {
//   if (currentQuestionIndex > 0) {
//     setCurrentQuestionIndex(prev => prev - 1);
//   }
// };

//   const shuffledOptions = useMemo(() => {
//     if (!data[currentQuestion]) return [];
//     return createShuffledOptions(data[currentQuestion]);
//   }, [currentQuestion, data]);

//   useEffect(() => {
//     if (data[currentQuestion]) {
//       const options = data[currentQuestion].choiceResponses.map((opt: choiceResponse, index: number) => ({
//         value: opt.value,
//         isCorrect: opt.value === data[currentQuestion].answer,
//         originalIndex: index,
//       }));
  
//       setShuffledOptionsState(shuffleArray(options));
//     }
//   }, [currentQuestion, data]);

//   // Function to handle exam finish
//   const handleFinishExam = () => {
//     // Add your exam submission logic here
//     console.log("Finishing exam...", answers)
//     // You might want to show a confirmation modal or submit the answers
//     // For now, we'll just navigate back or to a results page
//     router.push("/dashboard/dashStudent/exam-results") // Adjust the path as needed
//   }

//   // Now handle conditional rendering AFTER all hooks
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري تحميل الاختبار...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">خطأ في تحميل الاختبار</div>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//             type="button"
//           >
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   } 

//   const { exam } = examData
//   const question = data[currentQuestion]

//   if (!question) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">السؤال غير موجود</div>
//           <button
//             onClick={() => router.back()}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//             type="button"
//           >
//             العودة
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const handleAnswerSelect = (answerIndex: number) => {
//     console.log("answerIndex", answerIndex)
//     setSelectedAnswer(answerIndex)
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion]: answerIndex,
//     }))
//   }

//   const handleNext = () => {
//     if (currentQuestion < data.length - 1) {
//       setCurrentQuestion((prev) => prev + 1)
//       setSelectedAnswer(answers[currentQuestion + 1] ?? null)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prev) => prev - 1)
//       setSelectedAnswer(answers[currentQuestion - 1] ?? null)
//     }
//   }

//   // Add this function to handle question jumping from the header
// const handleQuestionJumpFromHeader = (questionIndex: number) => {
//   if (questionIndex >= 0 && questionIndex < data.length) {
//     setCurrentQuestion(questionIndex)
//     setCurrentQuestionIndex(questionIndex)
//     setSelectedAnswer(answers[questionIndex] ?? null)
//   }
// }

//   const toggleMark = () => {
//     const newMarked = new Set(markedQuestions)
//     if (newMarked.has(currentQuestion)) {
//       newMarked.delete(currentQuestion)
//     } else {
//       newMarked.add(currentQuestion)
//     }
//     setMarkedQuestions(newMarked)
//   }

//   return (
//     <div className="relative">
//       <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
//         <HeaderInfoExam 
//           currentQuestionIndex={currentQuestionIndex}
//           onQuestionJump={handleQuestionJumpFromHeader}
//         />

//         {/* Main Content */}
//         <div className="max-w-5xl mx-auto p-4">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
//             {/* Question Header */}
//             <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
//             </div>

//             {/* Question Content */}
//             <div className="p-8">
//               <div className="text-center mb-8">
//                 <p className="text-xl mb-8 leading-relaxed font-medium">
//                   {data[currentQuestion].value || "نص السؤال غير متوفر"}
//                 </p>
//               </div>

//               {/* Answer Options */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
//                 {data[currentQuestion].choiceResponses.map((option, index) => (
//                     <button
//                       key={index} 
//                       onClick={() => handleAnswerSelect(index)}
//                       className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                         selectedAnswer === index
//                           ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                           : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                       }`}
//                       type="button"
//                     >
//                     {option.value}
//                     </button> 
//                   ))} 
//                    <button
//                      key={data[currentQuestion].answer}
//                      onClick={() => handleAnswerSelect(data[currentQuestion].answer)}
//                      className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
//                        selectedAnswer === data[currentQuestion].answer
//                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
//                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
//                      }`}
//                      type="button"
//                    >
//                      {data[currentQuestion].answer}
//                    </button> 
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-center gap-6">
//                 {/* Next/Finish Button */}
//                 <button
//                   onClick={() => {
//                     if (isLastQuestion) {
//                       handleFinishExam();
//                     } else {
//                       handleNext();
//                       handleNextForIndex();
//                     }
//                   }}
//                   disabled={currentQuestion >= data.length - 1 && !isLastQuestion}
//                   className={`px-8 py-3 text-white rounded-lg font-medium text-lg transition-colors ${
//                     isLastQuestion 
//                       ? "bg-green-600 hover:bg-green-700" 
//                       : "bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   }`}
//                   type="button"
//                 >
//                   {isLastQuestion ? "انهاء الاختبار" : "التالي"}
//                 </button>
                
//                 {/* Previous Button */}
//                 <button
//                   onClick={() => {
//                     handlePrevious();
//                     handlePreviousForIndex();
//                   }}
//                   disabled={currentQuestion === 0}
//                   className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
//                   type="button"
//                 >
//                   السابق
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Exit Confirmation Modal */}
//       {showExitModal && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white flex items-center justify-center rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
//             <div className="p-8 text-center" dir="rtl">
//               {/* Warning Icon */}
//               <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                 <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
//                   <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">!</span>
//                   </div>
//                 </div>
//               </div>
//               {/* Message */}
//               <p className="text-gray-800 text-lg leading-relaxed mb-8">
//                 هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
//               </p>
//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={() => {
//                     console.log("User confirmed exit")
//                     setShowExitModal(false)
//                     router.back()
//                   }}
//                   className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
//                   type="button"
//                 >
//                   خروج
//                 </button>
//                 <button
//                   onClick={() => setShowExitModal(false)}
//                   className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
//                   type="button"
//                 >
//                   إكمال
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }




















"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { startTestFetch } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
import HeaderInfoExam from "./headerInfoExam"
import { useSelector } from "react-redux"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import Cookies from "js-cookie"
import axios from "axios"
import examData from "./data.json"
import { CheckCircle, XCircle, Award, BookOpen, RotateCcw, Home } from 'lucide-react';

interface StartTestRequest {
  skillIds: number[]
  count: number
}

interface questionResponse {
  id: string
  value: string
  answer: string
  skillId: number
  choiceResponses: choiceResponse[]
}

interface choiceResponse {
  id: string
  value: string
}

// Create all options including the correct answer
function createShuffledOptions(questionData) {
  // Combine choice responses with the correct answer
  const allOptions = [
    ...questionData.choiceResponses.map((option, index) => ({
      value: option.value,
      originalIndex: index,
      isCorrect: false
    })),
    {
      value: questionData.answer,
      originalIndex: questionData.answer,
      isCorrect: true
    }
  ];
  
  // Remove duplicates (in case the correct answer is already in choiceResponses)
  const uniqueOptions = allOptions.filter((option, index, self) => 
    index === self.findIndex(o => o.value === option.value)
  );
  
  // Shuffle the options
  return shuffleArray(uniqueOptions);
}

function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Exam Results Component
const ExamResultsPage = ({ examResults, onRetakeExam, onGoHome }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => {
    // Animate score on component mount
    const timer = setTimeout(() => {
      setAnimateScore(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getGradeColor = (score:number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage:number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const { 
    totalQuestions, 
    correctAnswers, 
    incorrectAnswers, 
    // timeSpent, 
    score, 
    grade,
    passed,
    examTitle,
    examDate,
    skillsBreakdown 
  } = examResults;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <Award className={`w-10 h-10 ${passed ? 'text-green-600' : 'text-red-600'}`} />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {passed ? 'تهانينا! لقد اجتزت الاختبار' : 'للأسف، لم تجتز الاختبار'}
          </h1>
          <p className="text-gray-600">{examTitle}</p>
          <p className="text-sm text-gray-500">{examDate}</p>
        </div>

        {/* Main Results Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            {/* Score Section */}
            <div className={`text-center py-12 ${
              passed ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
            } text-white`}>
              <div className="mb-4">
                <div className={`text-7xl font-bold mb-2 transition-all duration-1000 ${
                  animateScore ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}>
                  {score}%
                </div>
                <div className={`text-2xl font-semibold ${getGradeColor(score)} bg-white px-6 py-2 rounded-full inline-block`}>
                  {grade}
                </div>
              </div>
              <div className="text-lg opacity-90">
                {correctAnswers} من {totalQuestions} إجابة صحيحة
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-col sm:flex-row justify-evenly gap-6 p-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-gray-600">إجابات صحيحة</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                <div className="text-gray-600">إجابات خاطئة</div>
              </div>
              
              {/* <k className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{timeSpent}</div>
                <div className="text-gray-600">الوقت المستغرق</div>
              </k> */}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                تفصيل النتائج حسب المهارات
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-purple-600 hover:text-purple-700 font-medium"
                type="button"
              >
                {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
              </button>
            </div>

            <div className="space-y-6">
              {skillsBreakdown.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{skill.skill}</span>
                    <span className="text-sm text-gray-600">
                      {skill.correct}/{skill.total} ({skill.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(skill.percentage)}`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {showDetails && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">إحصائيات إضافية</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>النسبة المطلوبة للنجاح:</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>نسبتك:</span>
                        <span className={`font-medium ${getGradeColor(score)}`}>{score}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الفرق عن النسبة المطلوبة:</span>
                        <span className={`font-medium ${score >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                          {score >= 60 ? '+' : ''}{score - 60}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">توصيات للتحسن</h3>
                    <ul className="text-sm space-y-2 text-gray-600">
                      {skillsBreakdown
                        .filter((skill: any) => skill.percentage < 80)
                        .map((skill: any, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>راجع مهارات {skill.skill} - تحتاج تحسين</span>
                          </li>
                        ))}
                      {skillsBreakdown.filter((skill: any) => skill.percentage < 80).length === 0 && (
                        <li className="text-green-600">ممتاز! جميع المهارات في مستوى جيد</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetakeExam}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
              type="button"
            >
              <RotateCcw className="w-5 h-5" />
              إعادة الاختبار
            </button>
            
            <button
              onClick={onGoHome}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors"
              type="button"
            >
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </button>
          </div>

          {/* Motivational Message */}
          <div className="text-center mt-8">
            <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                {passed 
                  ? "رائع! استمر في التعلم والتطوير. يمكنك دائماً إعادة الاختبار لتحسين نتيجتك أكثر."
                  : "لا تستسلم! التعلم رحلة مستمرة. راجع المواد وأعد الاختبار عندما تشعر بالاستعداد."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExamInterface() {
  // All useState hooks first
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState("")
  const [resultData, setResultData] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [data, setData] = useState<questionResponse[]>([])
  const [testId, setTestId] = useState<number | null>(null)
  const [showExitModal, setShowExitModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shuffledOptionsState, setShuffledOptionsState] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [examResults, setExamResults] = useState(null)

const skillIdTest = useSelector((state: { background: { skillIdTest: number[] } }) => state.background.skillIdTest)
const questionCountTest = useSelector(
    (state: { background: { questionCountTest: number } }) => state.background.questionCountTest,
  )

const isTimingStop = useSelector((state: { background: { isTimingStop: boolean } }) => state.background.isTimingStop)

const responseTestLength = useSelector(
    (state: { background: { responseTestLength: number } }) => state.background.responseTestLength,
)

const questionNumbers = Array.from({ length: Number( Number(questionCountTest) > Number(responseTestLength.length) ? Number(responseTestLength.length) : Number(questionCountTest)) }, (_, i) => i + 1)

  // All other hooks
  const router = useRouter()
  const examContainerRef = useRef<HTMLDivElement>(null)
  const exitContainerRef = useRef<HTMLDivElement>(null)

  // Check if current question is the last one
  const isLastQuestion = currentQuestion === data.length - 1

  // All useEffect hooks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
        handleExitAttempt()
      }
    }

    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (exitContainerRef.current && !exitContainerRef.current.contains(e.target as Node)) {
        handleExitAttemptStop()
      }
    }

    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])
  

  useEffect(() => {
    try {
      if (!examData || !examData.exam) {
        throw new Error("Invalid exam data structure")
      }

      const { exam } = examData

      if (!responseTestLength || !Array.isArray(responseTestLength) || responseTestLength.length === 0) {
        throw new Error("No questions found in exam data")
      }

      if (!exam.sections || !Array.isArray(exam.sections)) {
        throw new Error("No sections found in exam data")
      }

      if (!exam.timeRemaining) {
        throw new Error("No time remaining data found")
      }

      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load exam data")
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!examData?.exam?.timeRemaining) return

    const parseTimeString = (timeStr: string) => {
      const parts = timeStr.split(":")
      const hours = Number.parseInt(parts[0]) || 0
      const minutes = Number.parseInt(parts[1]) || 0
      const seconds = Number.parseInt(parts[2]) || 0
      return hours * 3600 + minutes * 60 + seconds
    }

    const initialSeconds = parseTimeString(examData.exam.timeRemaining)
    setTotalSeconds(initialSeconds)
    setTimeRemaining(examData.exam.timeRemaining)
  }, [])

  useEffect(() => {
    if (totalSeconds <= 0) return

    const timer = setInterval(() => {
      setTotalSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1
        if (newSeconds <= 0) {
          setTimeRemaining("00:00:00")
          // Auto-finish exam when time runs out
          if (!showResults) {
            handleFinishExam()
          }
          return 0
        }

        const hours = Math.floor(newSeconds / 3600)
        const minutes = Math.floor((newSeconds % 3600) / 60)
        const seconds = newSeconds % 60
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        setTimeRemaining(formattedTime)
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [totalSeconds, showResults])

  // Function definitions
  const handleExitAttempt = () => {
    setShowExitModal(true)
  }
  const handleExitAttemptStop = () => {
    console.log("not yet ================")
    setShowExitModal(false)
    console.log("yes ================")
  }
  

  const getAuthToken = () => {
    return Cookies.get("accessToken")
  }

  const getHeaders = () => {
    const token = getAuthToken()
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  const startTest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const requestBody: StartTestRequest = {
        skillIds: skillIdTest,
        count: questionCountTest,
      }

      const result = await startTestFetch(requestBody, getHeaders())
      console.log("result ======", result)

      if (result?.succeeded) {
        setTestId(Array.isArray(result.data) ? result.data[0] : result.data)
        console.log("response is  +++++++++++", result)
        console.log("data is ============", result.data)
        setResultData
        setData(result.data)
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

  useEffect(() => {
    startTest()
  }, [])

const handleNextForIndex = ()=>{
    if (currentQuestionIndex < questionNumbers.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
}

const handlePreviousForIndex = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(prev => prev - 1);
  }
};

  const shuffledOptions = useMemo(() => {
    if (!data[currentQuestion]) return [];
    return createShuffledOptions(data[currentQuestion]);
  }, [currentQuestion, data]);

  useEffect(() => {
    if (data[currentQuestion]) {
      const options = data[currentQuestion].choiceResponses.map((opt: choiceResponse, index: number) => ({
        value: opt.value,
        isCorrect: opt.value === data[currentQuestion].answer,
        originalIndex: index,
      }));
  
      setShuffledOptionsState(shuffleArray(options));
    }
  }, [currentQuestion, data]);

  // Function to handle exam finish
  const handleFinishExam = () => {
    // Calculate results
    const correctAnswers = Object.entries(answers).reduce((count, [questionIndex, selectedAnswer]) => {
      const question = data[parseInt(questionIndex)];
      if (!question) return count;
      
      // Check if the selected answer matches the correct answer
      const isCorrect = question.choiceResponses[selectedAnswer]?.value === question.answer;
      return isCorrect ? count + 1 : count;
    }, 0);

    // Calculate grade based on score
    const score = Math.round((correctAnswers / data.length) * 100);
    const getGrade = (score) => {
      if (score >= 90) return "ممتاز";
      if (score >= 80) return "جيد جداً";
      if (score >= 70) return "جيد";
      if (score >= 60) return "مقبول";
      return "ضعيف";
    };

    // Process skills breakdown
    const skillsBreakdown = [
      { 
        skill: "المهارات العامة", 
        correct: correctAnswers, 
        total: data.length, 
        percentage: score 
      }
    ];

    const results = {
      totalQuestions: data.length,
      correctAnswers,
      incorrectAnswers: data.length - correctAnswers,
      unansweredQuestions: data.length - Object.keys(answers).length,
      answers,
      data,
      timeSpent: timeRemaining,
      examTitle: "اختبار المهارات الأساسية",
      examDate: new Date().toLocaleDateString('en-US'),
      score,
      grade: getGrade(score),
      passed: score >= 60,
      skillsBreakdown
    };

    console.log("Finishing exam...", results);
    setExamResults(results);
    setShowResults(true);
  };

  const handleRetakeExam = () => {
    // Reset all exam state
    setShowResults(false);
    setExamResults(null);
    setCurrentQuestion(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setMarkedQuestions(new Set());
    
    // Restart the test
    startTest();
  };

  const handleGoHome = () => {
    router.push("/dashboard/dashStudent/pages/exam-simulator");
  };

  // Show results page if exam is finished
  if ((showResults && isTimingStop) || examResults) {
    return (
      <ExamResultsPage 
        examResults={examResults}
        onRetakeExam={handleRetakeExam}
        onGoHome={handleGoHome}
      />
    );
  }

  // Now handle conditional rendering AFTER all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الاختبار...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">خطأ في تحميل الاختبار</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            type="button"
          >
            العودة
          </button>
        </div>
      </div>
    )
  } 

  const { exam } = examData
  const question = data[currentQuestion]

  if (!question) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">السؤال غير موجود</div>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            type="button"
          >
            العودة
          </button>
        </div>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    console.log("answerIndex", answerIndex)
    setSelectedAnswer(answerIndex)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(answers[currentQuestion + 1] ?? null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  // Add this function to handle question jumping from the header
const handleQuestionJumpFromHeader = (questionIndex: number) => {
  if (questionIndex >= 0 && questionIndex < data.length) {
    setCurrentQuestion(questionIndex)
    setCurrentQuestionIndex(questionIndex)
    setSelectedAnswer(answers[questionIndex] ?? null)
  }
}

  const toggleMark = () => {
    const newMarked = new Set(markedQuestions)
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion)
    } else {
      newMarked.add(currentQuestion)
    }
    setMarkedQuestions(newMarked)
  }

  return (
    <div className="relative">
      <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
 
         <HeaderInfoExam 
          currentQuestionIndex={currentQuestionIndex}
          onQuestionJump={handleQuestionJumpFromHeader}
        />

        {/* Main Content */}
        <div className="max-w-5xl mx-auto p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
            {/* Question Header */}
            <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
            </div>

            {/* Question Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-xl mb-8 leading-relaxed font-medium">
                  {data[currentQuestion].value || "نص السؤال غير متوفر"}
                </p>
              </div>

              {/* Answer Options */}
              <div className={`flex  ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} gap-1 mb-8  max-w-md   mx-auto`}>
                {data[currentQuestion].choiceResponses.map((option, index) => (
                    <button
                      key={index} 
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full h-16 text-xl font-bold border-2 rounded-lg transition-all ${
                        selectedAnswer === index
                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
                      }`}
                      type="button"
                    >
                    {option.value}
                    </button> 
                  ))}
                  <div className={`w-full`}> 
                   <button
                     key={data[currentQuestion].answer}
                     onClick={() => handleAnswerSelect(data[currentQuestion].answer)}
                     className={`w-full h-16 text-xl font-bold border-2 rounded-lg transition-all ${
                       selectedAnswer === data[currentQuestion].answer
                         ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
                         : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
                     }`}
                     type="button"
                   >
                     {data[currentQuestion].answer}
                   </button> 
                  </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-6">
                {/* Next/Finish Button */}
                <button
                  onClick={() => {
                    if (isLastQuestion) {
                      handleFinishExam();
                    } else {
                      handleNext();
                      handleNextForIndex();
                    }
                  }}
                  disabled={currentQuestion >= data.length - 1 && !isLastQuestion}
                  className={`px-8 py-3 text-white rounded-lg font-medium text-lg transition-colors ${
                    isLastQuestion 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  }`}
                  type="button"
                >
                  {isLastQuestion ? "انهاء الاختبار" : "التالي"}
                </button>
                
                {/* Previous Button */}
                <button
                  onClick={() => {
                    handlePrevious();
                    handlePreviousForIndex();
                  }}
                  disabled={currentQuestion === 0}
                  className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
                  type="button"
                >
                  السابق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal ? (
        <div ref={exitContainerRef} className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white flex items-center justify-center rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
            <div className="p-8 text-center" dir="rtl">
              {/* Warning Icon */}
              <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
                  <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                </div>
              </div>
              {/* Message */}
              <p className="text-gray-800 text-lg leading-relaxed mb-8">
                هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
              </p>
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    console.log("User confirmed exit")
                    setShowExitModal(false)
                    router.back()
                  }}
                  className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
                  type="button"
                >
                  خروج
                </button>
                <button
                  onClick={() => handleExitAttemptStop()}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                  type="button"
                >
                  إكمال
                </button>
              </div>
            </div>
          </div>
        </div>
      ): ""}
    </div>
  )
}