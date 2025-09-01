// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle } from "lucide-react"

// interface AddQuestionRequest {
//   value: string
//   answer: string
//   skillId: number
//   choices: string[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AddNewQuestionPage() {
//   const router = useRouter()
//   const [questionValue, setQuestionValue] = useState("")
//   const [answer, setAnswer] = useState("")
//   const [skillId, setSkillId] = useState<number | string>("")
//   const [choices, setChoices] = useState<string[]>([])
//   const [newChoiceInput, setNewChoiceInput] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)

//   const choiceInputRef = useRef<HTMLInputElement>(null)

//   const handleAddChoice = () => {
//     if (newChoiceInput.trim() !== "") {
//       setChoices([...choices, newChoiceInput.trim()])
//       setNewChoiceInput("")
//       choiceInputRef.current?.focus()
//     }
//   }

//   const handleRemoveChoice = (indexToRemove: number) => {
//     setChoices(choices.filter((_, index) => index !== indexToRemove))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccessMessage(null)

//     if (!questionValue.trim() || !answer.trim() || skillId === "" || choices.length === 0) {
//       setError("يرجى ملء جميع الحقول وإضافة خيارات للسؤال.")
//       return
//     }

//     if (!choices.includes(answer.trim())) {
//       setError("يجب أن تكون الإجابة الصحيحة أحد الخيارات المتاحة.")
//       return
//     }

//     setIsSubmitting(true)

//     const requestBody: AddQuestionRequest = {
//       value: questionValue.trim(),
//       answer: answer.trim(),
//       skillId: Number(skillId),
//       choices: choices.map((choice) => choice.trim()),
//     }

//     try {
//       const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/api/Question/AddQuestion`, requestBody, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setSuccessMessage("تم إضافة السؤال بنجاح!")
//         // Optionally clear form or redirect
//         setQuestionValue("")
//         setAnswer("")
//         setSkillId("")
//         setChoices([])
//         setNewChoiceInput("")
//         setTimeout(() => {
//           router.push("/admin/pages/questionAndCourses")
//         }, 2000) // Redirect after 2 seconds
//       } else {
//         setError(response.data.message || "فشل في إضافة السؤال.")
//       }
//     } catch (err) {
//       let errorMessage = "حدث خطأ غير معروف"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(err)) {
//         if (err.response) {
//           switch (err.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSubmit(e) // Retry after token refresh
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSubmit(e) // Retry after token refresh
//               }
//               errorMessage = "تم رفض الوصول. قد يكون هذا بسبب انتهاء صلاحية المصادقة أو عدم كفاية الأذونات."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = `نقطة نهاية API غير موجودة (404). يرجى التحقق مما إذا كان عنوان URL صحيحًا: ${err.config?.url}`
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم (500). يرجى المحاولة مرة أخرى لاحقًا."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${err.response.status}): ${err.response.statusText}`
//           }
//         } else if (err.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${err.message}`
//         }
//       } else {
//         errorMessage = err instanceof Error ? err.message : "خطأ غير معروف"
//       }
//       console.error("Error adding question:", err)
//       setError(errorMessage)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">إضافة سؤال جديد</h1>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           {successMessage && (
//             <div
//               className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{successMessage}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="questionValue" className="block text-sm font-medium text-gray-700 mb-2">
//                 نص السؤال
//               </label>
//               <textarea
//                 id="questionValue"
//                 value={questionValue}
//                 onChange={(e) => setQuestionValue(e.target.value)}
//                 rows={4}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل نص السؤال هنا..."
//                 required
//               ></textarea>
//             </div>

//             <div>
//               <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
//                 الإجابة الصحيحة
//               </label>
//               <input
//                 type="text"
//                 id="answer"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل الإجابة الصحيحة"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="skillId" className="block text-sm font-medium text-gray-700 mb-2">
//                 معرف المهارة (Skill ID)
//               </label>
//               <input
//                 type="number"
//                 id="skillId"
//                 value={skillId}
//                 onChange={(e) => setSkillId(e.target.value)}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل معرف المهارة"
//                 required
//               />
//             </div>

//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">الخيارات المتاحة</h3>
//               <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                 <input
//                   type="text"
//                   ref={choiceInputRef}
//                   value={newChoiceInput}
//                   onChange={(e) => setNewChoiceInput(e.target.value)}
//                   className="block flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                   placeholder="أدخل خيارًا جديدًا"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddChoice}
//                   className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={newChoiceInput.trim() === ""}
//                 >
//                   <Plus className="h-4 w-4 ml-2" />
//                   إضافة خيار
//                 </button>
//               </div>
//               {choices.length > 0 ? (
//                 <ul className="space-y-2">
//                   {choices.map((choice, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3"
//                     >
//                       <span className="text-gray-800 text-sm sm:text-base break-words flex-1">{choice}</span>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveChoice(index)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded-full transition-colors"
//                         title="حذف الخيار"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-sm text-center py-4">لا توجد خيارات مضافة بعد.</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push("/admin/pages/questionAndCourses")}
//                 className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors text-sm sm:text-base font-medium"
//               >
//                 إلغاء
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 ml-2 animate-spin" />
//                     جاري الحفظ...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 ml-2" />
//                     حفظ السؤال
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   )
// }















// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

// interface AddQuestionRequest {
//   value: string
//   answer: string
//   skillId: number
//   choices: string[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AddNewQuestionPage() {
//   const router = useRouter()
//   const [questionValue, setQuestionValue] = useState("")
//   const [answer, setAnswer] = useState("")
//   const [skillId, setSkillId] = useState<number | string>("")
//   const [choices, setChoices] = useState<string[]>([])
//   const [newChoiceInput, setNewChoiceInput] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
//   const choiceInputRef = useRef<HTMLInputElement>(null)

//   const handleAddChoice = () => {
//     if (newChoiceInput.trim() !== "") {
//       setChoices([...choices, newChoiceInput.trim()])
//       setNewChoiceInput("")
//       choiceInputRef.current?.focus()
//     }
//   }

//   const handleRemoveChoice = (indexToRemove: number) => {
//     setChoices(choices.filter((_, index) => index !== indexToRemove))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccessMessage(null)

//     if (!questionValue.trim() || !answer.trim() || skillId === "" || choices.length === 0) {
//       setError("يرجى ملء جميع الحقول وإضافة خيارات للسؤال.")
//       return
//     }

//     if (!choices.includes(answer.trim())) {
//       setError("يجب أن تكون الإجابة الصحيحة أحد الخيارات المتاحة.")
//       return
//     }

//     setIsSubmitting(true)

//     const requestBody: AddQuestionRequest = {
//       value: questionValue.trim(),
//       answer: answer.trim(),
//       skillId: Number(skillId),
//       choices: choices.map((choice) => choice.trim()),
//     }

//     try {
//       const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/api/Question/AddQuestion`, requestBody, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setSuccessMessage("تم إضافة السؤال بنجاح!")
//         // Optionally clear form or redirect
//         setQuestionValue("")
//         setAnswer("")
//         setSkillId("")
//         setChoices([])
//         setNewChoiceInput("")
//         setTimeout(() => {
//           router.push("/admin/pages/questionAndCourses")
//         }, 2000) // Redirect after 2 seconds
//       } else {
//         setError(response.data.message || "فشل في إضافة السؤال.")
//       }
//     } catch (err) {
//       let errorMessage = "حدث خطأ غير معروف"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(err)) {
//         if (err.response) {
//           switch (err.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSubmit(e) // Retry after token refresh
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSubmit(e) // Retry after token refresh
//               }
//               errorMessage = "تم رفض الوصول. قد يكون هذا بسبب انتهاء صلاحية المصادقة أو عدم كفاية الأذونات."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = `نقطة نهاية API غير موجودة (404). يرجى التحقق مما إذا كان عنوان URL صحيحًا: ${err.config?.url}`
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم (500). يرجى المحاولة مرة أخرى لاحقًا."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${err.response.status}): ${err.response.statusText}`
//           }
//         } else if (err.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${err.message}`
//         }
//       } else {
//         errorMessage = err instanceof Error ? err.message : "خطأ غير معروف"
//       }

//       console.error("Error adding question:", err)
//       setError(errorMessage)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={() => router.back()}
//               className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               type="button">
//               <ArrowRight className="h-4 w-4 ml-2" />
//               العودة للصفحة السابقة
//             </button> 
//           </div>

//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">إضافة سؤال جديد</h1>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           {successMessage && (
//             <div
//               className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{successMessage}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="questionValue" className="block text-sm font-medium text-gray-700 mb-2">
//                 نص السؤال
//               </label>
//               <textarea
//                 id="questionValue"
//                 value={questionValue}
//                 onChange={(e) => setQuestionValue(e.target.value)}
//                 rows={4}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل نص السؤال هنا..."
//                 required
//               ></textarea>
//             </div>

//             <div>
//               <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
//                 الإجابة الصحيحة
//               </label>
//               <input
//                 type="text"
//                 id="answer"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل الإجابة الصحيحة"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="skillId" className="block text-sm font-medium text-gray-700 mb-2">
//                 معرف المهارة (Skill ID)
//               </label>
//               <input
//                 type="number"
//                 id="skillId"
//                 value={skillId}
//                 onChange={(e) => setSkillId(e.target.value)}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل معرف المهارة"
//                 required
//               />
//             </div>

//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">الخيارات المتاحة</h3>
//               <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                 <input
//                   type="text"
//                   ref={choiceInputRef}
//                   value={newChoiceInput}
//                   onChange={(e) => setNewChoiceInput(e.target.value)}
//                   className="block flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                   placeholder="أدخل خيارًا جديدًا"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddChoice}
//                   className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={newChoiceInput.trim() === ""}
//                 >
//                   <Plus className="h-4 w-4 ml-2" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {choices.length > 0 ? (
//                 <ul className="space-y-2">
//                   {choices.map((choice, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3"
//                     >
//                       <span className="text-gray-800 text-sm sm:text-base break-words flex-1">{choice}</span>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveChoice(index)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded-full transition-colors"
//                         title="حذف الخيار"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-sm text-center py-4">لا توجد خيارات مضافة بعد.</p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push("/admin/pages/questionAndCourses")}
//                 className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors text-sm sm:text-base font-medium"
//               >
//                 إلغاء
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 ml-2 animate-spin" />
//                     جاري الحفظ...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 ml-2" />
//                     حفظ السؤال
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   )
// }










// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle, ArrowRight, ChevronDown } from "lucide-react"

// interface Skill {
//   id: number
//   value: string
//   testClassId: number
// }

// interface AddQuestionRequest {
//   value: string
//   answer: string
//   skillId: number
//   choices: string[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AddNewQuestionPage() {
//   const router = useRouter()
//   const [questionValue, setQuestionValue] = useState("")
//   const [answer, setAnswer] = useState("")
//   const [skillId, setSkillId] = useState<number | string>("")
//   const [choices, setChoices] = useState<string[]>([])
//   const [newChoiceInput, setNewChoiceInput] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)

//   // Skills state
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [isLoadingSkills, setIsLoadingSkills] = useState(true)
//   const [skillsError, setSkillsError] = useState<string | null>(null)

//   const choiceInputRef = useRef<HTMLInputElement>(null)

//   // Fetch skills on component mount
//   useEffect(() => {
//     fetchSkills()
//   }, []) 

//   const fetchSkills = async () => {
//     setIsLoadingSkills(true)
//     setSkillsError(null)

//     try {
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//         },
//       })

//       if (response.data.succeeded) {
//         setSkills(response.data.data)
//       } else {
//         setSkillsError(response.data.message || "فشل في تحميل المهارات")
//       }
//     } catch (err) {
//       let errorMessage = "حدث خطأ في تحميل المهارات"

//       if (axios.isAxiosError(err)) {
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           const refreshSuccess = await refreshAuthToken()
//           if (refreshSuccess) {
//             return fetchSkills() // Retry after token refresh
//           }
//           errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//           router.push("/admin/login")
//         } else if (err.response?.status === 404) {
//           errorMessage = "نقطة نهاية API غير موجودة"
//         } else if (err.response?.status === 500) {
//           errorMessage = "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا."
//         }
//       }

//       console.error("Error fetching skills:", err)
//       setSkillsError(errorMessage)
//     } finally {
//       setIsLoadingSkills(false)
//     }
//   }

//   const handleAddChoice = () => {
//     if (newChoiceInput.trim() !== "") {
//       setChoices([...choices, newChoiceInput.trim()])
//       setNewChoiceInput("")
//       choiceInputRef.current?.focus()
//     }
//   }

//   const handleRemoveChoice = (indexToRemove: number) => {
//     setChoices(choices.filter((_, index) => index !== indexToRemove))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccessMessage(null)

//     if (!questionValue.trim() || !answer.trim() || skillId === "" || choices.length === 0) {
//       setError("يرجى ملء جميع الحقول وإضافة خيارات للسؤال.")
//       return
//     }

//     if (!choices.includes(answer.trim())) {
//       setError("يجب أن تكون الإجابة الصحيحة أحد الخيارات المتاحة.")
//       return
//     }

//     setIsSubmitting(true)

//     const requestBody: AddQuestionRequest = {
//       value: questionValue.trim(),
//       answer: answer.trim(),
//       skillId: Number(skillId),
//       choices: choices.map((choice) => choice.trim()),
//     }

//     try {
//       const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/api/Question/AddQuestion`, requestBody, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setSuccessMessage("تم إضافة السؤال بنجاح!")
//         // Clear form
//         setQuestionValue("")
//         setAnswer("")
//         setSkillId("")
//         setChoices([])
//         setNewChoiceInput("")

//         setTimeout(() => {
//           router.push("/admin/pages/questionAndCourses")
//         }, 2000)
//       } else {
//         setError(response.data.message || "فشل في إضافة السؤال.")
//       }
//     } catch (err) {
//       let errorMessage = "حدث خطأ غير معروف"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(err)) {
//         if (err.response) {
//           switch (err.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSubmit(e)
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSubmit(e)
//               }
//               errorMessage = "تم رفض الوصول. قد يكون هذا بسبب انتهاء صلاحية المصادقة أو عدم كفاية الأذونات."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = `نقطة نهاية API غير موجودة (404). يرجى التحقق مما إذا كان عنوان URL صحيحًا: ${err.config?.url}`
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم (500). يرجى المحاولة مرة أخرى لاحقًا."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${err.response.status}): ${err.response.statusText}`
//           }
//         } else if (err.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${err.message}`
//         }
//       } else {
//         errorMessage = err instanceof Error ? err.message : "خطأ غير معروف"
//       }

//       console.error("Error adding question:", err)
//       setError(errorMessage)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={() => router.back()}
//               className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               type="button"
//             >
//               <ArrowRight className="h-4 w-4 ml-2" />
//               العودة للصفحة السابقة
//             </button>
//           </div>

//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">إضافة سؤال جديد</h1>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           {successMessage && (
//             <div
//               className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <span className="block sm:inline">{successMessage}</span>
//             </div>
//           )}

//           {skillsError && (
//             <div
//               className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6 flex items-center"
//               role="alert"
//             >
//               <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
//               <div className="flex-1">
//                 <span className="block sm:inline">{skillsError}</span>
//                 <button onClick={fetchSkills} className="mt-2 text-sm underline hover:no-underline" type="button">
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="questionValue" className="block text-sm font-medium text-gray-700 mb-2">
//                 نص السؤال
//               </label>
//               <textarea
//                 id="questionValue"
//                 value={questionValue}
//                 onChange={(e) => setQuestionValue(e.target.value)}
//                 rows={4}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل نص السؤال هنا..."
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
//                 الإجابة الصحيحة
//               </label>
//               <input
//                 type="text"
//                 id="answer"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                 placeholder="أدخل الإجابة الصحيحة"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="skillId" className="block text-sm font-medium text-gray-700 mb-2">
//                 المهارة
//               </label>
//               {isLoadingSkills ? (
//                 <div className="flex items-center justify-center py-4">
//                   <Loader2 className="h-5 w-5 animate-spin ml-2" />
//                   <span className="text-gray-600">جاري تحميل المهارات...</span>
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <select
//                     id="skillId"
//                     value={skillId}
//                     onChange={(e) => setSkillId(e.target.value)}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right appearance-none bg-white"
//                     required
//                   >
//                     <option value="">اختر المهارة</option>
//                     {skills.map((skill) => (
//                       <option key={skill.id} value={skill.id}>
//                         {skill.value} (ID: {skill.id})
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//                 </div>
//               )}
//             </div>

//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">الخيارات المتاحة</h3>
//               <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                 <input
//                   type="text"
//                   ref={choiceInputRef}
//                   value={newChoiceInput}
//                   onChange={(e) => setNewChoiceInput(e.target.value)}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault()
//                       handleAddChoice()
//                     }
//                   }}
//                   className="block flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
//                   placeholder="أدخل خيارًا جديدًا واضغط Enter"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddChoice}
//                   className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={newChoiceInput.trim() === ""}
//                 >
//                   <Plus className="h-4 w-4 ml-2" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {choices.length > 0 ? (
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-600 mb-2">الخيارات المضافة ({choices.length}):</p>
//                   <ul className="space-y-2">
//                     {choices.map((choice, index) => (
//                       <li
//                         key={index}
//                         className={`flex items-center justify-between border rounded-md p-3 transition-colors ${
//                           choice === answer.trim() ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
//                         }`}
//                       >
//                         <div className="flex items-center flex-1">
//                           <span className="text-gray-800 text-sm sm:text-base break-words flex-1">{choice}</span>
//                           {choice === answer.trim() && (
//                             <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full mr-2">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveChoice(index)}
//                           className="text-red-600 hover:text-red-800 p-1 rounded-full transition-colors"
//                           title="حذف الخيار"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-sm text-center py-4 border-2 border-dashed border-gray-200 rounded-md">
//                   لا توجد خيارات مضافة بعد. أضف خيارات للسؤال أعلاه.
//                 </p>
//               )}
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push("/admin/pages/questionAndCourses")}
//                 className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors text-sm sm:text-base font-medium"
//               >
//                 إلغاء
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isSubmitting || isLoadingSkills}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 ml-2 animate-spin" />
//                     جاري الحفظ...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 ml-2" />
//                     حفظ السؤال
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   )
// }















"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Layout from "@/app/admin/Layout/Layout"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import Cookies from "js-cookie"
import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle, ArrowRight, ChevronDown } from "lucide-react"

interface Skill {
  id: number
  value: string
  testClassId: number
}

interface AddQuestionRequest {
  value: string
  answer: string
  skillId: number
  choices: string[]
}

interface ApiResponse<T> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function AddNewQuestionPage() {
  const router = useRouter()
  const [questionValue, setQuestionValue] = useState("")
  const [answer, setAnswer] = useState("")
  const [skillId, setSkillId] = useState<number | string>("")
  const [choices, setChoices] = useState<string[]>([])
  const [newChoiceInput, setNewChoiceInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Skills state
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoadingSkills, setIsLoadingSkills] = useState(true)
  const [skillsError, setSkillsError] = useState<string | null>(null)

  const choiceInputRef = useRef<HTMLInputElement>(null)

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setIsLoadingSkills(true)
    setSkillsError(null)

    try {
      const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
        },
      })

      if (response.data.succeeded) {
        setSkills(response.data.data)
      } else {
        setSkillsError(response.data.message || "فشل في تحميل المهارات")
      }
    } catch (err) {
      let errorMessage = "حدث خطأ في تحميل المهارات"

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          const refreshSuccess = await refreshAuthToken()
          if (refreshSuccess) {
            return fetchSkills() // Retry after token refresh
          }
          errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
          router.push("/admin/login")
        } else if (err.response?.status === 404) {
          errorMessage = "نقطة نهاية API غير موجودة"
        } else if (err.response?.status === 500) {
          errorMessage = "خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا."
        }
      }

      console.error("Error fetching skills:", err)
      setSkillsError(errorMessage)
    } finally {
      setIsLoadingSkills(false)
    }
  }

  const handleAddChoice = () => {
    if (newChoiceInput.trim() !== "") {
      setChoices([...choices, newChoiceInput.trim()])
      setNewChoiceInput("")
      choiceInputRef.current?.focus()
    }
  }

  const handleRemoveChoice = (indexToRemove: number) => {
    setChoices(choices.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!questionValue.trim() || !answer.trim() || skillId === "" || choices.length === 0) {
      setError("يرجى ملء جميع الحقول وإضافة خيارات للسؤال.")
      return
    }

    setIsSubmitting(true)

    const requestBody: AddQuestionRequest = {
      value: questionValue.trim(),
      answer: answer.trim(),
      skillId: Number(skillId),
      choices: choices.map((choice) => choice.trim()),
    }

    try {
      const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/api/Question/AddQuestion`, requestBody, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        setSuccessMessage("تم إضافة السؤال بنجاح!")
        // Clear form
        setQuestionValue("")
        setAnswer("")
        setSkillId("")
        setChoices([])
        setNewChoiceInput("")

        setTimeout(() => {
          router.push("/admin/pages/questionAndCourses")
        }, 2000)
      } else {
        setError(response.data.message || "فشل في إضافة السؤال.")
      }
    } catch (err) {
      let errorMessage = "حدث خطأ غير معروف"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
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
              errorMessage = "تم رفض الوصول. قد يكون هذا بسبب انتهاء صلاحية المصادقة أو عدم كفاية الأذونات."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = `نقطة نهاية API غير موجودة (404). يرجى التحقق مما إذا كان عنوان URL صحيحًا: ${err.config?.url}`
              break
            case 500:
              errorMessage = "خطأ في الخادم (500). يرجى المحاولة مرة أخرى لاحقًا."
              break
            default:
              errorMessage = `خطأ في الخادم (${err.response.status}): ${err.response.statusText}`
          }
        } else if (err.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت."
        } else {
          errorMessage = `خطأ في الطلب: ${err.message}`
        }
      } else {
        errorMessage = err instanceof Error ? err.message : "خطأ غير معروف"
      }

      console.error("Error adding question:", err)
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-[90vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              type="button"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للصفحة السابقة
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">إضافة سؤال جديد</h1>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 flex items-center"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center"
              role="alert"
            >
              <CheckCircle className="h-5 w-5 ml-2 flex-shrink-0" />
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          {skillsError && (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6 flex items-center"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
              <div className="flex-1">
                <span className="block sm:inline">{skillsError}</span>
                <button onClick={fetchSkills} className="mt-2 text-sm underline hover:no-underline" type="button">
                  إعادة المحاولة
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="questionValue" className="block text-sm font-medium text-gray-700 mb-2">
                نص السؤال
              </label>
              <textarea
                id="questionValue"
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
                placeholder="أدخل نص السؤال هنا..."
                required
              />
            </div>

            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                الإجابة الصحيحة
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
                placeholder="أدخل الإجابة الصحيحة"
                required
              />
            </div>

            <div>
              <label htmlFor="skillId" className="block text-sm font-medium text-gray-700 mb-2">
                المهارة
              </label>
              {isLoadingSkills ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin ml-2" />
                  <span className="text-gray-600">جاري تحميل المهارات...</span>
                </div>
              ) : (
                <div className="relative">
                  <select
                    id="skillId"
                    value={skillId}
                    onChange={(e) => setSkillId(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right appearance-none bg-white"
                    required
                  >
                    <option value="">اختر المهارة</option>
                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.value} (ID: {skill.id})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              )}
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">الخيارات المتاحة</h3>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  ref={choiceInputRef}
                  value={newChoiceInput}
                  onChange={(e) => setNewChoiceInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddChoice()
                    }
                  }}
                  className="block flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
                  placeholder="أدخل خيارًا جديدًا واضغط Enter"
                />
                <button
                  type="button"
                  onClick={handleAddChoice}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={newChoiceInput.trim() === ""}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة خيار
                </button>
              </div>

              {choices.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-2">الخيارات المضافة ({choices.length}):</p>
                  <ul className="space-y-2">
                    {choices.map((choice, index) => (
                      <li
                        key={index}
                        className={`flex items-center justify-between border rounded-md p-3 transition-colors bg-gray-50 border-gray-200`}
                      >
                        <div className="flex items-center flex-1">
                          <span className="text-gray-800 text-sm sm:text-base break-words flex-1">{choice}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveChoice(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full transition-colors"
                          title="حذف الخيار"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4 border-2 border-dashed border-gray-200 rounded-md">
                  لا توجد خيارات مضافة بعد. أضف خيارات للسؤال أعلاه.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/pages/questionAndCourses")}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors text-sm sm:text-base font-medium"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isLoadingSkills}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 ml-2" />
                    حفظ السؤال
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
