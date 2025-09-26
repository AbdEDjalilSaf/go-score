// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { BookOpen, FileQuestion, LandPlot } from "lucide-react"
// import Layout from "@/app/admin/Layout/Layout"
// import { Tent , AlertCircle, Trash2, Plus, X, Lock } from "lucide-react"

// interface Skill {
//   id: number
//   value: string 
//   testClassId: number
// }

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Array<{
//     id: string
//     value: string
//   }>
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function GetAllSkills() {
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const router = useRouter()

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-3 rounded-full ${color}`}>
//           <Icon className="h-6 w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )


//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }


//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاسئلة و الكورسات</h1>
//                 <p className="text-gray-600">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                 {questionsLoading && <p className="text-sm text-blue-600 mt-1">جاري تحميل الأسئلة المرتبطة...</p>}
//               </div>
//               {/* Add New Skill Button */}
//               <div className="flex-shrink-0">
//                 {activeOption === "الاسئلة" && (
//                   <button
//                     onClick={handleAddNewQuestion}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة سؤال جديد
//                   </button>
//                 )}
//                 {activeOption === "الكورسات" && (
//                   <button
//                     onClick={handleAddNewCourse}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة كورس جديد
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي الاسئلة" value={skills.length} icon={FileQuestion} color="bg-blue-500" />
//             <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//             <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//             <MetricCard title="الكورسات المستخدمة" value={referencedClassIds.size} icon={Tent} color="bg-orange-500" />
//             {/* <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" /> */}
//           </div>

//           {/* Toggle Buttons */}
//           <div className="w-md mx-auto my-2">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//               <div className="flex relative">
//                 <button
//                   name="الاسئلة"
//                   onClick={() => {
//                     setActiveOption("الاسئلة")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الاسئلة"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الاسئلة
//                 </button>
//                 <button
//                   name="الكورسات"
//                   onClick={() => {
//                     setActiveOption("الكورسات")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الكورسات"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الكورسات
//                 </button>
//               </div>
//             </div>
//           </div>

         

          
//         </div>
//       </div>

//     </Layout>
//   )
// }
















// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { FileQuestion, LandPlot, Tent, AlertCircle, Trash2, Plus, Lock } from "lucide-react"

// // interface Skill {
// //   id: number
// //   value: string
// //   testClassId: number
// // }

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Array<{
//     id: string
//     value: string
//   }>
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
// //   const [skills, setSkills] = useState<Skill[]>([])
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const router = useRouter()

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)

//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           // Extract referenced skill IDs
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (err) {
//         setError("Error fetching questions")
//         console.error("Error fetching questions:", err)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//         <Layout>
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري التحميل...</p>
//         </div>
//       </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//       <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">الاسئلة و الكورسات</h1>
//                 <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                 {questionsLoading && <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>}
//                 {error && (
//                   <div className="flex items-center mt-2 text-red-600">
//                     <AlertCircle className="h-4 w-4 ml-1" />
//                     <p className="text-xs sm:text-sm">{error}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Add New Button */}
//               <div className="flex-shrink-0">
//                 {activeOption === "الاسئلة" && (
//                   <button
//                     onClick={handleAddNewQuestion}
//                     className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                     إضافة سؤال جديد
//                   </button>
//                 )}
//                 {activeOption === "الكورسات" && (
//                   <button
//                     onClick={handleAddNewCourse}
//                     className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                     إضافة كورس جديد
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//             <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//             <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//             <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//             <MetricCard title="الكورسات المستخدمة" value={referencedClassIds.size} icon={Tent} color="bg-orange-500" />
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-6 sm:mb-8">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//               <div className="flex relative">
//                 <button
//                   onClick={() => setActiveOption("الاسئلة")}
//                   className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الاسئلة"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الاسئلة
//                 </button>
//                 <button
//                   onClick={() => setActiveOption("الكورسات")}
//                   className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الكورسات"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الكورسات
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//             {activeOption === "الاسئلة" ? (
//               <div>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                 {questions.length === 0 ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-3 sm:gap-4">
//                     {questions.map((question) => (
//                       <div
//                         key={question.id}
//                         className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                               {question.value}
//                             </h3>
//                             <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                             <div className="flex flex-wrap gap-1 sm:gap-2">
//                               {question.choices.map((choice) => (
//                                 <span
//                                   key={choice.id}
//                                   className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                 >
//                                   {choice.value}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2 flex-shrink-0">
//                             <button className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" type="button">
//                               <Trash2 className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                 <div className="text-center py-8 sm:py-12">
//                   <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   )
// }










// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { FileQuestion, LandPlot, Tent, AlertCircle, Trash2, Plus, Lock, Eye, Edit, MoreVertical } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Array<{
//     id: string
//     value: string
//   }>
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const router = useRouter()

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           // Extract referenced skill IDs
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (err) {
//         setError("Error fetching questions")
//         console.error("Error fetching questions:", err)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }
//     fetchQuestions()
//   }, [])

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     console.log(`View details for ${type}:`, id)
//     // Add your navigation logic here
//     // router.push(`/admin/pages/${type}s/${id}/details`)
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//     // Add your navigation logic here
//     // router.push(`/admin/pages/${type}s/${id}/edit`)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     // Add your delete logic here
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       // Perform delete operation
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       {/* Desktop buttons */}
//       <div className="hidden sm:flex items-center gap-1">
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
//           title="عرض التفاصيل"
//         >
//           <Eye className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700"
//           title="تعديل"
//         >
//           <Edit className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
//           title="حذف"
//         >
//           <Trash2 className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Mobile dropdown */}
//       <div className="sm:hidden">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-40">
//             <DropdownMenuItem onClick={() => handleViewDetails(id, type)} className="text-blue-600 focus:text-blue-700">
//               <Eye className="h-4 w-4 ml-2" />
//               عرض التفاصيل
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleEdit(id, type)} className="text-green-600 focus:text-green-700">
//               <Edit className="h-4 w-4 ml-2" />
//               تعديل
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => handleDelete(id, type)} className="text-red-600 focus:text-red-700">
//               <Trash2 className="h-4 w-4 ml-2" />
//               حذف
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   )

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <Button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </Button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <Button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }










// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { FileQuestion, LandPlot, Tent, AlertCircle, Trash2, Plus, Lock, Eye, Edit, MoreVertical, X } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Array<{
//     id: string
//     value: string
//   }>
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
//   const router = useRouter()

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           // Extract referenced skill IDs
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (err) {
//         setError("Error fetching questions")
//         console.error("Error fetching questions:", err)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }
//     fetchQuestions()
//   }, [])

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//       }
//     }
//     // Add course details logic here if needed
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//     // Add your navigation logic here
//     // router.push(`/admin/pages/${type}s/${id}/edit`)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     // Add your delete logic here
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       // Perform delete operation
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       {/* Desktop buttons */}
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//           >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button">
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors"
//           title="حذف"
//           type="button">
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       {/* Mobile dropdown */}
//       <div className="sm:hidden">
//         <div className="relative">
//           <button className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"           type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button onClick={closeDetailsModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-orange-700 mb-4">الخيارات المتاحة</h3>
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         {choice.value === selectedQuestion.answer && (
//                           <div className="flex-shrink-0">
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button">
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button">
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button">
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button">
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Question Details Modal */}
//         <QuestionDetailsModal />
//       </div>
//     </Layout>
//   )
// }









// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<string>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   const router = useRouter()

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           // Extract referenced skill IDs
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//          let errorMessage = "Unknown error occurred"
//               const refreshSuccess = await refreshAuthToken()
//               if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                   switch (error.response.status) {
//                     case 401:
//                       if (refreshSuccess) {
//                         return fetchQuestions()
//                       }
//                       errorMessage = "Authentication expired. Please log in again."
//                       router.push("/admin/login")
//                       break
//                     case 403:
//                       if (refreshSuccess) {
//                         return fetchQuestions()
//                       }
//                       errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                       console.log("errorMessage", errorMessage)
//                       router.push("/admin/login")
//                       break
//                     case 404:
//                       errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//                       break
//                     case 500:
//                       errorMessage = "Server error (500). Please try again later."
//                       break
//                     default:
//                       errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//                   }
//                 } else if (error.request) {
//                   errorMessage = "Network error. Please check your internet connection."
//                 } else {
//                   errorMessage = `Request error: ${error.message}`
//                 }
//               } else {
//                 errorMessage = error instanceof Error ? error.message : "Unknown error"
//               }
//               console.error("Error fetching data:", error)
//               setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/api/Choice/AddChoice`, {
//         value: newChoiceValue.trim(),
//         questionId: selectedQuestion.id,
//       },
//     {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("adminToken")}`,
//         "Content-Type": "application/json"
//       }
//     })

//       if (response.data.succeeded) {
//         // Create new choice object with the returned ID
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         // Update the selected question
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }
//         setSelectedQuestion(updatedQuestion)

//         // Update the questions list
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)

//         // Show success message (you can implement a toast notification here)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return handleAddChoice()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return handleAddChoice()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 console.log("errorMessage", errorMessage)
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Delete choice from question
//   const handleDeleteChoice = async (choiceId: string) => {
//     if (!selectedQuestion) return

//     if (!confirm("هل أنت متأكد من حذف هذا الخيار؟")) return

//     try {
//       // You'll need to implement the delete choice API endpoint
//       // const response = await axios.delete(`${BASE_URL}/api/Choice/DeleteChoice/${choiceId}`)

//       // For now, just update the UI (uncomment above when API is ready)
//       const updatedQuestion = {
//         ...selectedQuestion,
//         choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceId),
//       }
//       setSelectedQuestion(updatedQuestion)

//       setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
//     } catch (err) {
//       console.error("Error deleting choice:", err)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setNewChoiceValue("")
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors"
//           title="حذف"
//           type="button"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       <div className="sm:hidden">
//         <div className="relative">
//           <button
//             className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"
//             type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form */}
//               {/* {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <input
//                         type="text"
//                         value={newChoiceValue}
//                         onChange={(e) => setNewChoiceValue(e.target.value)}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none "
                        
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                       <button
//                         onClick={() => {
//                           setShowAddChoiceForm(false)
//                           setNewChoiceValue("")
//                           setAddChoiceError(null)
//                         }}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
//                         type="button"
//                       >
//                         إلغاء
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )} */}

//             {/* Add Choice Form */}
// {showAddChoiceForm && (
//   <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//     <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//     <div className="space-y-3">
//       <div>
//         <input
//           type="text"
//           value={newChoiceValue}
//           onChange={(e) => setNewChoiceValue(e.target.value)}
//           placeholder="أدخل نص الخيار الجديد..."
//           className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right"
//           dir="rtl"
//         />
//       </div>
//       {addChoiceError && (
//         <div className="flex items-center text-red-600 text-sm">
//           <AlertCircle className="h-4 w-4 ml-1" />
//           <span>{addChoiceError}</span>
//         </div>
//       )}
//       <div className="flex items-center gap-2 justify-end">
//         <button
//           onClick={() => {
//             setShowAddChoiceForm(false)
//             setNewChoiceValue("")
//             setAddChoiceError(null)
//           }}
//           className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
//           type="button"
//         >
//           إلغاء
//         </button>
//         <button
//           onClick={handleAddChoice}
//           disabled={isAddingChoice || !newChoiceValue.trim()}
//           className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors"
//           type="button"
//         >
//           {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//           {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => handleDeleteChoice(choice.id)}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Question Details Modal */}
//         <QuestionDetailsModal />
//       </div>
//     </Layout>
//   )
// }














// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<any>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)

//   const router = useRouter()

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       // Small delay to ensure the form is rendered
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()

//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }
//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle input key press
// //   const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter" && !isAddingChoice && newChoiceValue.trim()) {
// //       e.preventDefault()
// //       handleAddChoice()
// //     }
// //     if (e.key === "Escape") {
// //       handleCancelAddChoice()
// //     }
// //   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Delete choice from question
//   const handleDeleteChoice = async (choiceId: string) => {
//     if (!selectedQuestion) return
//     if (!confirm("هل أنت متأكد من حذف هذا الخيار؟")) return

//     try {
//       const updatedQuestion = {
//         ...selectedQuestion,
//         choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceId),
//       }
//       setSelectedQuestion(updatedQuestion)
//       setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
//     } catch (err) {
//       console.error("Error deleting choice:", err)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         // setNewChoiceValue("")
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors"
//           title="حذف"
//           type="button"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       <div className="sm:hidden">
//         <div className="relative">
//           <button
//             className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"
//             type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form - Fixed Version */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                           e.target.focus()
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200"
//                       />
                     
//                     </div>

//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}

//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm 
//                                  flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => handleDeleteChoice(choice.id)}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Question Details Modal */}
//         <QuestionDetailsModal />
//       </div>
//     </Layout>
//   )
// }













// "use client"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<any>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Delete confirmation states
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
//   const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
//   const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Show delete confirmation modal
//   const showDeleteChoiceConfirmation = (choice: Choice) => {
//     setChoiceToDelete(choice)
//     setShowDeleteConfirmation(true)
//   }

//   // Hide delete confirmation modal
//   const hideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setChoiceToDelete(null)
//   }

//   // Delete choice from question - Updated with API call
//   const handleDeleteChoice = async () => {
//     if (!selectedQuestion || !choiceToDelete) return

//     setDeletingChoiceId(choiceToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
//         }
//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
//         console.log("Choice deleted successfully!")
//         hideDeleteConfirmation()
//       } else {
//         // Show error message from API
//         alert(`فشل في حذف الخيار: ${response.data.message}`)
//         console.error("Failed to delete choice:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Choice not found or API endpoint not found."
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
//       console.error("Error deleting choice:", error)
//       alert(`خطأ في حذف الخيار: ${errorMessage}`)
//     } finally {
//       setDeletingChoiceId(null)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//     hideDeleteConfirmation()
//   }

//   // Delete Confirmation Modal Component
//   const DeleteConfirmationModal = () => {
//     if (!showDeleteConfirmation || !choiceToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         {/* <div
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           ></div> */}
// <button
//   type="button"
//   className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//   onClick={hideDeleteConfirmation}
//   aria-label="Close"
//   style={{ border: 'none', background: 'none', padding: 0, margin: 0 }}
// ></button>
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>

//               {/* Choice Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
//                     {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
//                         تحذير: هذا هو الجواب الصحيح
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteChoice}
//               disabled={deletingChoiceId === choiceToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingChoiceId === choiceToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors"
//           title="حذف"
//           type="button"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       <div className="sm:hidden">
//         <div className="relative">
//           <button
//             className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"
//             type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                           e.target.focus()
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200"
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm
//                                   flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => showDeleteChoiceConfirmation(choice)}
//                             disabled={deletingChoiceId === choice.id}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             {deletingChoiceId === choice.id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Question Details Modal */}
//         <QuestionDetailsModal />

//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmationModal />
//       </div>
//     </Layout>
//   )
// }










// "use client"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<string>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Delete confirmation states
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
//   const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
//   const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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

//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Show delete confirmation modal
//   const showDeleteChoiceConfirmation = (choice: Choice) => {
//     setChoiceToDelete(choice)
//     setShowDeleteConfirmation(true)
//   }

//   // Hide delete confirmation modal
//   const hideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setChoiceToDelete(null)
//   }

//   // Delete choice from question - Updated with API call
//   const handleDeleteChoice = async () => {
//     if (!selectedQuestion || !choiceToDelete) return

//     setDeletingChoiceId(choiceToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         console.log("Choice deleted successfully!")
//         hideDeleteConfirmation()
//       } else {
//         // Show error message from API
//         alert(`فشل في حذف الخيار: ${response.data.message}`)
//         console.error("Failed to delete choice:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Choice not found or API endpoint not found."
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

//       console.error("Error deleting choice:", error)
//       alert(`خطأ في حذف الخيار: ${errorMessage}`)
//     } finally {
//       setDeletingChoiceId(null)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     console.log(`Delete ${type}:`, id)
//     if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//       if (type === "question") {
//         setQuestions(questions.filter((q) => q.id !== id))
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//     hideDeleteConfirmation()
//   }

//   // Delete Confirmation Modal Component
//   const DeleteConfirmationModal = () => {
//     if (!showDeleteConfirmation || !choiceToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />

//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>

//               {/* Choice Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
//                     {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
//                         تحذير: هذا هو الجواب الصحيح
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteChoice}
//               disabled={deletingChoiceId === choiceToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingChoiceId === choiceToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors"
//           title="حذف"
//           type="button"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       <div className="sm:hidden">
//         <div className="relative">
//           <button
//             className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"
//             type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         ref={inputRef}
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         rows={3}
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => showDeleteChoiceConfirmation(choice)}
//                             disabled={deletingChoiceId === choice.id}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             {deletingChoiceId === choice.id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Question Details Modal */}
//         <QuestionDetailsModal />

//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmationModal />
//       </div>
//     </Layout>
//   )
// }












// "use client"
// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<string>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Delete confirmation states
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
//   const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
//   const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)

//   // Question deletion states
//   const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null)
//   const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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

//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Show delete confirmation modal
//   const showDeleteChoiceConfirmation = (choice: Choice) => {
//     setChoiceToDelete(choice)
//     setShowDeleteConfirmation(true)
//   }

//   // Hide delete confirmation modal
//   const hideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setChoiceToDelete(null)
//   }

//   // Delete choice from question - Updated with API call
//   const handleDeleteChoice = async () => {
//     if (!selectedQuestion || !choiceToDelete) return

//     setDeletingChoiceId(choiceToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         console.log("Choice deleted successfully!")
//         hideDeleteConfirmation()
//       } else {
//         // Show error message from API
//         alert(`فشل في حذف الخيار: ${response.data.message}`)
//         console.error("Failed to delete choice:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Choice not found or API endpoint not found."
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

//       console.error("Error deleting choice:", error)
//       alert(`خطأ في حذف الخيار: ${errorMessage}`)
//     } finally {
//       setDeletingChoiceId(null)
//     }
//   }

//   // Delete question with API call
//   const handleDeleteQuestion = async () => {
//     if (!questionToDelete) return

//     setDeletingQuestionId(questionToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Question/DeleteQuestion/${questionToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionToDelete.id))

//         // Update referenced skill IDs
//         const remainingQuestions = questions.filter((q) => q.id !== questionToDelete.id)
//         const skillIds = new Set(remainingQuestions.map((q) => q.skillId))
//         setReferencedSkillIds(skillIds)

//         console.log("Question deleted successfully!")
//         hideDeleteConfirmation()

//         // Close details modal if the deleted question was being viewed
//         if (selectedQuestion && selectedQuestion.id === questionToDelete.id) {
//           closeDetailsModal()
//         }
//       } else {
//         // Show error message from API
//         alert(`فشل في حذف السؤال: ${response.data.message}`)
//         console.error("Failed to delete question:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Question not found or API endpoint not found."
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

//       console.error("Error deleting question:", error)
//       alert(`خطأ في حذف السؤال: ${errorMessage}`)
//     } finally {
//       setDeletingQuestionId(null)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setQuestionToDelete(question)
//         setShowDeleteConfirmation(true)
//       }
//     } else {
//       console.log(`Delete ${type}:`, id)
//       if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//         // Handle course deletion here
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//     hideDeleteConfirmation()
//   }

//   const hideQuestionDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setQuestionToDelete(null)
//   }

//   // Delete Confirmation Modal Component
//   const DeleteConfirmationModal = () => {
//     if (!showDeleteConfirmation || !questionToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد حذف السؤال</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا السؤال؟</p>
//               {/* Question Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words line-clamp-3">
//                       {questionToDelete.value}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {questionToDelete.id}</p>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {questionToDelete.choices.length} خيارات
//                       </span>
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         مهارة #{questionToDelete.skillId}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا السؤال وجميع خياراته نهائياً من قاعدة البيانات ولن يمكن
//                     استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteQuestion}
//               disabled={deletingQuestionId === questionToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingQuestionId === questionToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Delete Confirmation Modal Component
//   const DeleteChoiceConfirmationModal = () => {
//     if (!showDeleteConfirmation || !choiceToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>
//               {/* Choice Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
//                     {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
//                         تحذير: هذا هو الجواب الصحيح
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteChoice}
//               disabled={deletingChoiceId === choiceToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingChoiceId === choiceToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           disabled={deletingQuestionId === id}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="حذف"
//           type="button"
//         >
//           {deletingQuestionId === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
//         </button>
//       </div>
//       <div className="sm:hidden">
//         <div className="relative">
//           <button
//             className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center"
//             type="button"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>
//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>
//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>
//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div>
//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>
//               {/* Add Choice Form */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         ref={inputRef}
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         rows={3}
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => showDeleteChoiceConfirmation(choice)}
//                             disabled={deletingChoiceId === choice.id}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             {deletingChoiceId === choice.id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>
//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>
//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>
//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Question Details Modal */}
//         <QuestionDetailsModal />
//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmationModal />
//         {/* Delete Choice Confirmation Modal */}
//         <DeleteChoiceConfirmationModal />
//       </div>
//     </Layout>
//   )
// }










// "use client"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<string>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Delete confirmation states
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
//   const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
//   const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)

//   // Question deletion states
//   const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null)
//   const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)

//   // Mobile dropdown states
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   // Handle click outside dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdownId(null)
//       }
//     }

//     if (openDropdownId) {
//       document.addEventListener("mousedown", handleClickOutside)
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside)
//       }
//     }
//   }, [openDropdownId])

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Show delete confirmation modal
//   const showDeleteChoiceConfirmation = (choice: Choice) => {
//     setChoiceToDelete(choice)
//     setShowDeleteConfirmation(true)
//   }

//   // Hide delete confirmation modal
//   const hideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setChoiceToDelete(null)
//   }

//   // Delete choice from question - Updated with API call
//   const handleDeleteChoice = async () => {
//     if (!selectedQuestion || !choiceToDelete) return

//     setDeletingChoiceId(choiceToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         console.log("Choice deleted successfully!")
//         hideDeleteConfirmation()
//       } else {
//         // Show error message from API
//         // alert(`فشل في حذف الخيار: ${response.data.message}`)
//         console.error("Failed to delete choice:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Choice not found or API endpoint not found."
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
//       console.error("Error deleting choice:", error)
//       // alert(`خطأ في حذف الخيار: ${errorMessage}`)
//     } finally {
//       setDeletingChoiceId(null)
//     }
//   }

//   // Delete question with API call
//   const handleDeleteQuestion = async () => {
//     if (!questionToDelete) return

//     setDeletingQuestionId(questionToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Question/DeleteQuestion/${questionToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionToDelete.id))

//         // Update referenced skill IDs
//         const remainingQuestions = questions.filter((q) => q.id !== questionToDelete.id)
//         const skillIds = new Set(remainingQuestions.map((q) => q.skillId))
//         setReferencedSkillIds(skillIds)

//         console.log("Question deleted successfully!")
//         hideDeleteConfirmation()

//         // Close details modal if the deleted question was being viewed
//         if (selectedQuestion && selectedQuestion.id === questionToDelete.id) {
//           closeDetailsModal()
//         }
//       } else {
//         // Show error message from API
//         // alert(`فشل في حذف السؤال: ${response.data.message}`)
//         console.error("Failed to delete question:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Question not found or API endpoint not found."
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
//       console.error("Error deleting question:", error)
//       // alert(`خطأ في حذف السؤال: ${errorMessage}`)
//     } finally {
//       setDeletingQuestionId(null)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setAddChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setQuestionToDelete(question)
//         setShowDeleteConfirmation(true)
//       }
//     } else {
//       console.log(`Delete ${type}:`, id)
//       if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//         // Handle course deletion here
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//     hideDeleteConfirmation()
//   }

//   const hideQuestionDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setQuestionToDelete(null)
//   }

//   // Toggle dropdown
//   const toggleDropdown = (id: string) => {
//     setOpenDropdownId(openDropdownId === id ? null : id)
//   }

//   // Delete Confirmation Modal Component
//   const DeleteConfirmationModal = () => {
//     if (!showDeleteConfirmation || !questionToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد حذف السؤال</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا السؤال؟</p>
//               {/* Question Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words line-clamp-3">
//                       {questionToDelete.value}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {questionToDelete.id}</p>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {questionToDelete.choices.length} خيارات
//                       </span>
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         مهارة #{questionToDelete.skillId}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا السؤال وجميع خياراته نهائياً من قاعدة البيانات ولن يمكن
//                     استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteQuestion}
//               disabled={deletingQuestionId === questionToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingQuestionId === questionToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Delete Confirmation Modal Component
//   const DeleteChoiceConfirmationModal = () => {
//     if (!showDeleteConfirmation || !choiceToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>
//               {/* Choice Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
//                     {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
//                         تحذير: هذا هو الجواب الصحيح
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteChoice}
//               disabled={deletingChoiceId === choiceToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingChoiceId === choiceToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           disabled={deletingQuestionId === id}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="حذف"
//           type="button"
//         >
//           {deletingQuestionId === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       <div className="sm:hidden relative" ref={dropdownRef}>
//         <button
//           onClick={() => toggleDropdown(id)}
//           className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center transition-colors"
//           type="button"
//         >
//           <MoreVertical className="h-4 w-4" />
//         </button>

//         {/* Dropdown Menu */}
//         {openDropdownId === id && (
//           <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//             <div className="py-1">
//               <button
//                 onClick={() => handleViewDetails(id, type)}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                 type="button"
//               >
//                 <Eye className="h-4 w-4 ml-3" />
//                 عرض التفاصيل
//               </button>
//               <button
//                 onClick={() => handleEdit(id, type)}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                 type="button"
//               >
//                 <Edit className="h-4 w-4 ml-3" />
//                 تعديل
//               </button>
//               <button
//                 onClick={() => handleDelete(id, type)}
//                 disabled={deletingQuestionId === id}
//                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 type="button"
//               >
//                 {deletingQuestionId === id ? (
//                   <Loader2 className="h-4 w-4 ml-3 animate-spin" />
//                 ) : (
//                   <Trash2 className="h-4 w-4 ml-3" />
//                 )}
//                 {deletingQuestionId === id ? "جاري الحذف..." : "حذف"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div> 

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         ref={inputRef}
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         rows={3}
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-900 text-base">{choice.value}</p>
//                           <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           <button
//                             onClick={() => showDeleteChoiceConfirmation(choice)}
//                             disabled={deletingChoiceId === choice.id}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             title="حذف الخيار"
//                             type="button"
//                           >
//                             {deletingChoiceId === choice.id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Question Details Modal */}
//         <QuestionDetailsModal />

//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmationModal />

//         {/* Delete Choice Confirmation Modal */}
//         <DeleteChoiceConfirmationModal />
//       </div>
//     </Layout>
//   )
// }
















// "use client"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   FileQuestion,
//   LandPlot,
//   Tent,
//   AlertCircle,
//   Trash2,
//   Plus,
//   Lock,
//   Eye,
//   Edit,
//   MoreVertical,
//   X,
//   Save,
//   Loader2,
//   Check,
// } from "lucide-react"

// interface TestClass {
//   id: number
//   value: string
//   testTypeId: number
// }

// interface Choice {
//   id: string
//   value: string
// }

// interface Question {
//   id: string
//   value: string
//   answer: string
//   skillId: number
//   choices: Choice[]
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function AdminDashboard() {
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
//   const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

//   // New choice states
//   const [newChoiceValue, setNewChoiceValue] = useState<string>("")
//   const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
//   const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
//   const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)

//   // Edit choice states
//   const [editingChoiceId, setEditingChoiceId] = useState<string | null>(null)
//   const [editChoiceValue, setEditChoiceValue] = useState<string>("")
//   const [isEditingChoice, setIsEditingChoice] = useState<boolean>(false)
//   const [editChoiceError, setEditChoiceError] = useState<string | null>(null)

//   // Delete confirmation states
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
//   const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
//   const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)

//   // Question deletion states
//   const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null)
//   const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)

//   // Mobile dropdown states
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   // Add ref for input focus
//   const inputRef = useRef<HTMLInputElement>(null)
//   const editInputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   // Handle click outside dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdownId(null)
//       }
//     }

//     if (openDropdownId) {
//       document.addEventListener("mousedown", handleClickOutside)
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside)
//       }
//     }
//   }, [openDropdownId])

//   // Focus input when form shows
//   useEffect(() => {
//     if (showAddChoiceForm && inputRef.current) {
//       setTimeout(() => {
//         inputRef.current?.focus()
//       }, 100)
//     }
//   }, [showAddChoiceForm])

//   // Focus edit input when edit mode starts
//   useEffect(() => {
//     if (editingChoiceId && editInputRef.current) {
//       setTimeout(() => {
//         editInputRef.current?.focus()
//       }, 100)
//     }
//   }, [editingChoiceId])

//   // Fetch questions from API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setQuestionsLoading(true)
//         const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`)
//         if (response.data.succeeded) {
//           setQuestions(response.data.data)
//           const skillIds = new Set(response.data.data.map((q) => q.skillId))
//           setReferencedSkillIds(skillIds)
//         } else {
//           setError(response.data.message || "Failed to fetch questions")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchQuestions()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 router.push("/admin/login")
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
//         setError(errorMessage)
//       } finally {
//         setQuestionsLoading(false)
//         setLoading(false)
//       }
//     }

//     fetchQuestions()
//   }, [])

//   // Start editing a choice
//   const handleStartEditChoice = (choice: Choice) => {
//     setEditingChoiceId(choice.id)
//     setEditChoiceValue(choice.value)
//     setEditChoiceError(null)
//   }

//   // Cancel editing a choice
//   const handleCancelEditChoice = () => {
//     setEditingChoiceId(null)
//     setEditChoiceValue("")
//     setEditChoiceError(null)
//   }

//   // Save edited choice
//   const handleSaveEditChoice = async () => {
//     if (!selectedQuestion || !editingChoiceId || !editChoiceValue.trim()) {
//       setEditChoiceError("يرجى إدخال قيمة صحيحة للخيار")
//       return
//     }

//     setIsEditingChoice(true)
//     setEditChoiceError(null)

//     try {
//       const response = await axios.put<ApiResponse<boolean>>(
//         `${BASE_URL}/api/Choice/EditChoice`,
//         {
//           id: editingChoiceId,
//           value: editChoiceValue.trim(),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.map((choice) =>
//             choice.id === editingChoiceId
//               ? { ...choice, value: editChoiceValue.trim() }
//               : choice
//           ),
//         }

//         // Update answer if it matches the old choice value
//         if (selectedQuestion.answer === selectedQuestion.choices.find(c => c.id === editingChoiceId)?.value) {
//           updatedQuestion.answer = editChoiceValue.trim()
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => 
//           prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q))
//         )

//         // Reset edit state
//         setEditingChoiceId(null)
//         setEditChoiceValue("")
//         console.log("Choice updated successfully!")
//       } else {
//         setEditChoiceError(response.data.message || "فشل في تعديل الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSaveEditChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSaveEditChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
//       console.error("Error editing choice:", error)
//       setEditChoiceError(errorMessage)
//     } finally {
//       setIsEditingChoice(false)
//     }
//   }

//   // Add new choice to question
//   const handleAddChoice = async () => {
//     if (!selectedQuestion || !newChoiceValue.trim()) {
//       setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
//       return
//     }

//     setIsAddingChoice(true)
//     setAddChoiceError(null)

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/Choice/AddChoice`,
//         {
//           value: newChoiceValue.trim(),
//           questionId: selectedQuestion.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         const newChoice: Choice = {
//           id: response.data.data.toString(),
//           value: newChoiceValue.trim(),
//         }

//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: [...selectedQuestion.choices, newChoice],
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         // Reset form
//         setNewChoiceValue("")
//         setShowAddChoiceForm(false)
//         console.log("Choice added successfully!")
//       } else {
//         setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
//       console.error("Error adding choice:", error)
//       setAddChoiceError(errorMessage)
//     } finally {
//       setIsAddingChoice(false)
//     }
//   }

//   // Handle cancel add choice
//   const handleCancelAddChoice = () => {
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//   }

//   // Show delete confirmation modal
//   const showDeleteChoiceConfirmation = (choice: Choice) => {
//     setChoiceToDelete(choice)
//     setShowDeleteConfirmation(true)
//   }

//   // Hide delete confirmation modal
//   const hideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setChoiceToDelete(null)
//   }

//   // Delete choice from question - Updated with API call
//   const handleDeleteChoice = async () => {
//     if (!selectedQuestion || !choiceToDelete) return

//     setDeletingChoiceId(choiceToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         const updatedQuestion = {
//           ...selectedQuestion,
//           choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
//         }

//         setSelectedQuestion(updatedQuestion)
//         setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))

//         console.log("Choice deleted successfully!")
//         hideDeleteConfirmation()
//       } else {
//         // Show error message from API
//         // alert(`فشل في حذف الخيار: ${response.data.message}`)
//         console.error("Failed to delete choice:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteChoice()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Choice not found or API endpoint not found."
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
//       console.error("Error deleting choice:", error)
//       // alert(`خطأ في حذف الخيار: ${errorMessage}`)
//     } finally {
//       setDeletingChoiceId(null)
//     }
//   }

//   // Delete question with API call
//   const handleDeleteQuestion = async () => {
//     if (!questionToDelete) return

//     setDeletingQuestionId(questionToDelete.id)

//     try {
//       const response = await axios.delete<ApiResponse<string>>(
//         `${BASE_URL}/api/Question/DeleteQuestion/${questionToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update local state only after successful API call
//         setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionToDelete.id))

//         // Update referenced skill IDs
//         const remainingQuestions = questions.filter((q) => q.id !== questionToDelete.id)
//         const skillIds = new Set(remainingQuestions.map((q) => q.skillId))
//         setReferencedSkillIds(skillIds)

//         console.log("Question deleted successfully!")
//         hideDeleteConfirmation()

//         // Close details modal if the deleted question was being viewed
//         if (selectedQuestion && selectedQuestion.id === questionToDelete.id) {
//           closeDetailsModal()
//         }
//       } else {
//         // Show error message from API
//         // alert(`فشل في حذف السؤال: ${response.data.message}`)
//         console.error("Failed to delete question:", response.data.message)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteQuestion()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "Question not found or API endpoint not found."
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
//       console.error("Error deleting question:", error)
//       // alert(`خطأ في حذف السؤال: ${errorMessage}`)
//     } finally {
//       setDeletingQuestionId(null)
//     }
//   }

//   // Action handlers
//   const handleViewDetails = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setSelectedQuestion(question)
//         setShowDetailsModal(true)
//         setShowAddChoiceForm(false)
//         setAddChoiceError(null)
//         // Reset edit states when opening modal
//         setEditingChoiceId(null)
//         setEditChoiceValue("")
//         setEditChoiceError(null)
//       }
//     }
//   }

//   const handleEdit = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     console.log(`Edit ${type}:`, id)
//   }

//   const handleDelete = (id: string, type: "question" | "course") => {
//     setOpenDropdownId(null) // Close dropdown
//     if (type === "question") {
//       const question = questions.find((q) => q.id === id)
//       if (question) {
//         setQuestionToDelete(question)
//         setShowDeleteConfirmation(true)
//       }
//     } else {
//       console.log(`Delete ${type}:`, id)
//       if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
//         // Handle course deletion here
//       }
//     }
//   }

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false)
//     setSelectedQuestion(null)
//     setShowAddChoiceForm(false)
//     setNewChoiceValue("")
//     setAddChoiceError(null)
//     setEditingChoiceId(null)
//     setEditChoiceValue("")
//     setEditChoiceError(null)
//     hideDeleteConfirmation()
//   }

//   const hideQuestionDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false)
//     setQuestionToDelete(null)
//   }

//   // Toggle dropdown
//   const toggleDropdown = (id: string) => {
//     setOpenDropdownId(openDropdownId === id ? null : id)
//   }

//   // Delete Confirmation Modal Component
//   const DeleteConfirmationModal = () => {
//     if (!showDeleteConfirmation || !questionToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد حذف السؤال</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا السؤال؟</p>
//               {/* Question Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words line-clamp-3">
//                       {questionToDelete.value}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {questionToDelete.id}</p>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {questionToDelete.choices.length} خيارات
//                       </span>
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                         مهارة #{questionToDelete.skillId}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا السؤال وجميع خياراته نهائياً من قاعدة البيانات ولن يمكن
//                     استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingQuestionId === questionToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteQuestion}
//               disabled={deletingQuestionId === questionToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingQuestionId === questionToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Delete Confirmation Modal Component
//   const DeleteChoiceConfirmationModal = () => {
//     if (!showDeleteConfirmation || !choiceToDelete) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
//         {/* Backdrop */}
//         <button
//           type="button"
//           className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//           onClick={hideDeleteConfirmation}
//           aria-label="Close"
//           style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
//         />
//         {/* Modal */}
//         <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
//               </div>
//               <div className="mr-3 sm:mr-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
//                 <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
//               </div>
//             </div>
//             <button
//               onClick={hideDeleteConfirmation}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               <X className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>
//           {/* Content */}
//           <div className="p-4 sm:p-6" dir="rtl">
//             <div className="mb-4">
//               <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>
//               {/* Choice Preview */}
//               <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
//                       !
//                     </span>
//                   </div>
//                   <div className="mr-3 flex-1 min-w-0">
//                     <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
//                     <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
//                     {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
//                         تحذير: هذا هو الجواب الصحيح
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <div className="flex">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
//                 <div className="mr-3">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
//             <button
//               onClick={hideDeleteConfirmation}
//               className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//               type="button"
//               disabled={deletingChoiceId === choiceToDelete.id}
//             >
//               إلغاء
//             </button>
//             <button
//               onClick={handleDeleteChoice}
//               disabled={deletingChoiceId === choiceToDelete.id}
//               className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
//               type="button"
//             >
//               {deletingChoiceId === choiceToDelete.id ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   جاري الحذف...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="h-4 w-4" />
//                   تأكيد الحذف
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string
//     value: string | number
//     icon: any
//     color: string
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
//           <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   const ActionButtons = ({
//     id,
//     type,
//   }: {
//     id: string
//     type: "question" | "course"
//   }) => (
//     <div className="flex items-center gap-1 sm:gap-2">
//       <div className="hidden sm:flex items-center gap-1">
//         <button
//           onClick={() => handleViewDetails(id, type)}
//           className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
//           title="عرض التفاصيل"
//           type="button"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEdit(id, type)}
//           className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
//           title="تعديل"
//           type="button"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDelete(id, type)}
//           disabled={deletingQuestionId === id}
//           className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="حذف"
//           type="button"
//         >
//           {deletingQuestionId === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
//         </button>
//       </div>

//       {/* Mobile dropdown */}
//       <div className="sm:hidden relative" ref={dropdownRef}>
//         <button
//           onClick={() => toggleDropdown(id)}
//           className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center transition-colors"
//           type="button"
//         >
//           <MoreVertical className="h-4 w-4" />
//         </button>

//         {/* Dropdown Menu */}
//         {openDropdownId === id && (
//           <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
//             <div className="py-1">
//               <button
//                 onClick={() => handleViewDetails(id, type)}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                 type="button"
//               >
//                 <Eye className="h-4 w-4 ml-3" />
//                 عرض التفاصيل
//               </button>
//               <button
//                 onClick={() => handleEdit(id, type)}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                 type="button"
//               >
//                 <Edit className="h-4 w-4 ml-3" />
//                 تعديل
//               </button>
//               <button
//                 onClick={() => handleDelete(id, type)}
//                 disabled={deletingQuestionId === id}
//                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 type="button"
//               >
//                 {deletingQuestionId === id ? (
//                   <Loader2 className="h-4 w-4 ml-3 animate-spin" />
//                 ) : (
//                   <Trash2 className="h-4 w-4 ml-3" />
//                 )}
//                 {deletingQuestionId === id ? "جاري الحذف..." : "حذف"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )

//   const QuestionDetailsModal = () => {
//     if (!showDetailsModal || !selectedQuestion) return null

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">تفاصيل السؤال</h2>
//             <button
//               onClick={closeDetailsModal}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               type="button"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-6 space-y-6" dir="rtl">
//             {/* Question ID */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
//               <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
//             </div>

//             {/* Question Text */}
//             <div className="bg-blue-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
//               <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
//             </div>

//             {/* Correct Answer */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
//               <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
//             </div>

//             {/* Skill ID */}
//             <div className="bg-purple-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
//               <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
//             </div> 

//             {/* Choices */}
//             <div className="bg-orange-50 rounded-lg p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
//                 <button
//                   onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
//                   className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4" />
//                   إضافة خيار
//                 </button>
//               </div>

//               {/* Add Choice Form */}
//               {showAddChoiceForm && (
//                 <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <textarea
//                         ref={inputRef}
//                         value={newChoiceValue}
//                         onChange={(e) => {
//                           setNewChoiceValue(e.target.value)
//                         }}
//                         placeholder="أدخل نص الخيار الجديد..."
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                         rows={3}
//                       />
//                     </div>
//                     {addChoiceError && (
//                       <div className="flex items-center text-red-600 text-sm">
//                         <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                         <span>{addChoiceError}</span>
//                       </div>
//                     )}
//                     <div className="flex items-center gap-2 justify-end">
//                       <button
//                         onClick={handleCancelAddChoice}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         type="button"
//                         disabled={isAddingChoice}
//                       >
//                         إلغاء
//                       </button>
//                       <button
//                         onClick={handleAddChoice}
//                         disabled={isAddingChoice || !newChoiceValue.trim()}
//                         className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
//                         type="button"
//                       >
//                         {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
//                         {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Edit Choice Error */}
//               {editChoiceError && (
//                 <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//                   <div className="flex items-center text-red-600 text-sm">
//                     <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                     <span>{editChoiceError}</span>
//                   </div>
//                 </div>
//               )}

//               {/* Existing Choices */}
//               {selectedQuestion.choices.length > 0 ? (
//                 <div className="space-y-3">
//                   {selectedQuestion.choices.map((choice, index) => (
//                     <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
//                             {index + 1}
//                           </span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           {editingChoiceId === choice.id ? (
//                             // Edit Mode
//                             <div className="space-y-2">
//                               <input
//                                 type="text"
//                                 value={editChoiceValue}
//                                 onChange={(e) => setEditChoiceValue(e.target.value)}
//                                 className="w-full px-3 py-2 border border-blue-300 rounded-md text-right bg-blue-50 hover:border-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="تعديل نص الخيار..."
//                               />
//                               <div className="flex items-center gap-2 justify-end">
//                                 <button
//                                   onClick={handleCancelEditChoice}
//                                   disabled={isEditingChoice}
//                                   className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-xs transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                                   type="button"
//                                 >
//                                   إلغاء
//                                 </button>
//                                 <button
//                                   onClick={handleSaveEditChoice}
//                                   disabled={isEditingChoice || !editChoiceValue.trim()}
//                                   className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md text-xs flex items-center gap-1 transition-colors disabled:cursor-not-allowed"
//                                   type="button"
//                                 >
//                                   {isEditingChoice ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
//                                   {isEditingChoice ? "حفظ..." : "حفظ"}
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             // View Mode
//                             <>
//                               <p className="text-gray-900 text-base">{choice.value}</p>
//                               <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
//                             </>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {choice.value === selectedQuestion.answer && (
//                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               الإجابة الصحيحة
//                             </span>
//                           )}
//                           {editingChoiceId !== choice.id && (
//                             <>
//                               <button
//                                 onClick={() => handleStartEditChoice(choice)}
//                                 className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                                 title="تعديل الخيار"
//                                 type="button"
//                               >
//                                 <Edit className="h-4 w-4" />
//                               </button>
//                               <button
//                                 onClick={() => showDeleteChoiceConfirmation(choice)}
//                                 disabled={deletingChoiceId === choice.id}
//                                 className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 title="حذف الخيار"
//                                 type="button"
//                               >
//                                 {deletingChoiceId === choice.id ? (
//                                   <Loader2 className="h-4 w-4 animate-spin" />
//                                 ) : (
//                                   <Trash2 className="h-4 w-4" />
//                                 )}
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
//               )}
//             </div>

//             {/* Question Statistics */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
//                   <p className="text-sm text-gray-600">عدد الخيارات</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
//                   <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
//                   <p className="text-sm text-gray-600">رقم المهارة</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
//             <button
//               onClick={() => handleEdit(selectedQuestion.id, "question")}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//               type="button"
//             >
//               <Edit className="h-4 w-4" />
//               تعديل السؤال
//             </button>
//             <button
//               onClick={closeDetailsModal}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//               type="button"
//             >
//               إغلاق
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const handleAddNewCourse = () => {
//     router.push("/admin/pages/questionAndCourses/addNewCourse")
//   }

//   const handleAddNewQuestion = () => {
//     router.push("/admin/pages/questionAndCourses/addNewQuestion")
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
//                     الاسئلة و الكورسات
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
//                   {questionsLoading && (
//                     <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
//                   )}
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
//                   )}
//                 </div>
//                 {/* Add New Button */}
//                 <div className="flex-shrink-0">
//                   {activeOption === "الاسئلة" && (
//                     <button
//                       onClick={handleAddNewQuestion}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة سؤال جديد
//                     </button>
//                   )}
//                   {activeOption === "الكورسات" && (
//                     <button
//                       onClick={handleAddNewCourse}
//                       className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                       إضافة كورس جديد
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
//               <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//               <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
//               <MetricCard
//                 title="الكورسات المستخدمة"
//                 value={referencedClassIds.size}
//                 icon={Tent}
//                 color="bg-orange-500"
//               />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("الاسئلة")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الاسئلة"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الاسئلة
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("الكورسات")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "الكورسات"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     الكورسات
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
//               {activeOption === "الاسئلة" ? (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
//                   {questions.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {questions.map((question) => (
//                         <div
//                           key={question.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {question.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
//                               <div className="flex flex-wrap gap-1 sm:gap-2">
//                                 {question.choices.map((choice) => (
//                                   <span
//                                     key={choice.id}
//                                     className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
//                                   >
//                                     {choice.value}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={question.id} type="question" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
//                   {testClasses.length === 0 ? (
//                     <div className="text-center py-8 sm:py-12">
//                       <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
//                     </div>
//                   ) : (
//                     <div className="grid gap-3 sm:gap-4">
//                       {testClasses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
//                                 {course.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
//                             </div>
//                             <div className="flex items-center justify-end sm:justify-start">
//                               <ActionButtons id={course.id.toString()} type="course" />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Question Details Modal */}
//         <QuestionDetailsModal />

//         {/* Delete Confirmation Modal */}
//         <DeleteConfirmationModal />

//         {/* Delete Choice Confirmation Modal */}
//         <DeleteChoiceConfirmationModal />
//       </div>
//     </Layout>
//   )
// }

















"use client"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Layout from "@/app/admin/Layout/Layout"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import Cookies from "js-cookie"
import {
  FileQuestion,
  LandPlot,
  Tent,
  AlertCircle,
  Trash2,
  Plus,
  Lock,
  Eye,
  Edit,
  MoreVertical,
  X,
  Save,
  Loader2,
  Check,
} from "lucide-react"

interface TestClass {
  id: number
  value: string
  testTypeId: number
}

interface Choice {
  id: string
  value: string
}

interface Question {
  id: string
  value: string
  answer: string
  skillId: number
  choices: Choice[]
}

interface ApiResponse<T> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function AdminDashboard() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeOption, setActiveOption] = useState<"الاسئلة" | "الكورسات">("الاسئلة")
  const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState<boolean>(true)
  const [testClasses] = useState<TestClass[]>([])
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [referencedClassIds] = useState<Set<number>>(new Set())
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
  
  // New choice states
  const [newChoiceValue, setNewChoiceValue] = useState<string>("")
  const [isAddingChoice, setIsAddingChoice] = useState<boolean>(false)
  const [addChoiceError, setAddChoiceError] = useState<string | null>(null)
  const [showAddChoiceForm, setShowAddChoiceForm] = useState<boolean>(false)
  
  // Edit choice states
  const [editingChoiceId, setEditingChoiceId] = useState<string | null>(null)
  const [editChoiceValue, setEditChoiceValue] = useState<string>("")
  const [isEditingChoice, setIsEditingChoice] = useState<boolean>(false)
  const [editChoiceError, setEditChoiceError] = useState<string | null>(null)
  
  // Delete confirmation states
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const [choiceToDelete, setChoiceToDelete] = useState<Choice | null>(null)
  const [deletingChoiceId, setDeletingChoiceId] = useState<string | null>(null)
  
  // Question deletion states
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null)
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)
  
  // Edit question states
  const [editingQuestion, setEditingQuestion] = useState<boolean>(false)
  const [editQuestionValue, setEditQuestionValue] = useState<string>("")
  const [editQuestionAnswer, setEditQuestionAnswer] = useState<string>("")
  const [isEditingQuestion, setIsEditingQuestion] = useState<boolean>(false)
  const [editQuestionError, setEditQuestionError] = useState<string | null>(null)
  
  // Mobile dropdown states
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Add ref for input focus
  const inputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  
  const router = useRouter()

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    if (openDropdownId) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [openDropdownId])

  // Focus input when form shows
  useEffect(() => {
    if (showAddChoiceForm && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [showAddChoiceForm])

  // Focus edit input when edit mode starts
  useEffect(() => {
    if (editingChoiceId && editInputRef.current) {
      setTimeout(() => {
        editInputRef.current?.focus()
      }, 100)
    }
  }, [editingChoiceId])

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuestionsLoading(true)
        const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`,
          {
              headers: {
              Authorization: `Bearer ${Cookies.get("adminToken")}`,
              "Content-Type": "application/json",
              },
          }
        )
        if (response.data.succeeded) {
          setQuestions(response.data.data)
          const skillIds = new Set(response.data.data.map((q) => q.skillId))
          setReferencedSkillIds(skillIds)
        } else {
          setError(response.data.message || "Failed to fetch questions")
        }
      } catch (error) {
        let errorMessage = "Unknown error occurred"
        const refreshSuccess = await refreshAuthToken()
        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                if (refreshSuccess) {
                  return fetchQuestions()
                }
                errorMessage = "Authentication expired. Please log in again."
                router.push("/admin/login")
                break
              case 403:
                if (refreshSuccess) {
                  return fetchQuestions()
                }
                errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
        console.error("Error fetching data:", error)
        setError(errorMessage)
      } finally {
        setQuestionsLoading(false)
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  // Start editing a choice
  const handleStartEditChoice = (choice: Choice) => {
    setEditingChoiceId(choice.id)
    setEditChoiceValue(choice.value)
    setEditChoiceError(null)
  }

  // Cancel editing a choice
  const handleCancelEditChoice = () => {
    setEditingChoiceId(null)
    setEditChoiceValue("")
    setEditChoiceError(null)
  }

  // Save edited choice
  const handleSaveEditChoice = async () => {
    if (!selectedQuestion || !editingChoiceId || !editChoiceValue.trim()) {
      setEditChoiceError("يرجى إدخال قيمة صحيحة للخيار")
      return
    }
    setIsEditingChoice(true)
    setEditChoiceError(null)
    try {
      const response = await axios.put<ApiResponse<boolean>>(
        `${BASE_URL}/api/Choice/EditChoice`,
        {
          id: editingChoiceId,
          value: editChoiceValue.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )
      if (response.data.succeeded) {
        // Update local state only after successful API call
        const updatedQuestion = {
          ...selectedQuestion,
          choices: selectedQuestion.choices.map((choice) =>
            choice.id === editingChoiceId
              ? { ...choice, value: editChoiceValue.trim() }
              : choice
          ),
        }
        // Update answer if it matches the old choice value
        if (selectedQuestion.answer === selectedQuestion.choices.find(c => c.id === editingChoiceId)?.value) {
          updatedQuestion.answer = editChoiceValue.trim()
        }
        setSelectedQuestion(updatedQuestion)
        setQuestions((prevQuestions) => 
          prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q))
        )
        // Reset edit state
        setEditingChoiceId(null)
        setEditChoiceValue("")
        console.log("Choice updated successfully!")
      } else {
        setEditChoiceError(response.data.message || "فشل في تعديل الخيار")
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleSaveEditChoice()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleSaveEditChoice()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
      console.error("Error editing choice:", error)
      setEditChoiceError(errorMessage)
    } finally {
      setIsEditingChoice(false)
    }
  }

  // Add new choice to question
  const handleAddChoice = async () => {
    if (!selectedQuestion || !newChoiceValue.trim()) {
      setAddChoiceError("يرجى إدخال قيمة للخيار الجديد")
      return
    }
    setIsAddingChoice(true)
    setAddChoiceError(null)
    try {
      const response = await axios.post<ApiResponse<number>>(
        `${BASE_URL}/api/Choice/AddChoice`,
        {
          value: newChoiceValue.trim(),
          questionId: selectedQuestion.id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )
      if (response.data.succeeded) {
        const newChoice: Choice = {
          id: response.data.data.toString(),
          value: newChoiceValue.trim(),
        }
        const updatedQuestion = {
          ...selectedQuestion,
          choices: [...selectedQuestion.choices, newChoice],
        }
        setSelectedQuestion(updatedQuestion)
        setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
        // Reset form
        setNewChoiceValue("")
        setShowAddChoiceForm(false)
        console.log("Choice added successfully!")
      } else {
        setAddChoiceError(response.data.message || "فشل في إضافة الخيار")
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleAddChoice()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleAddChoice()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
      console.error("Error adding choice:", error)
      setAddChoiceError(errorMessage)
    } finally {
      setIsAddingChoice(false)
    }
  }

  // Handle cancel add choice
  const handleCancelAddChoice = () => {
    setShowAddChoiceForm(false)
    setNewChoiceValue("")
    setAddChoiceError(null)
  }

  // Show delete confirmation modal
  const showDeleteChoiceConfirmation = (choice: Choice) => {
    setChoiceToDelete(choice)
    setShowDeleteConfirmation(true)
  }

  // Hide delete confirmation modal
  const hideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false)
    setChoiceToDelete(null)
  }

  // Delete choice from question - Updated with API call
  const handleDeleteChoice = async () => {
    if (!selectedQuestion || !choiceToDelete) return
    setDeletingChoiceId(choiceToDelete.id)
    try {
      const response = await axios.delete<ApiResponse<string>>(
        `${BASE_URL}/api/Choice/DeleteChoice/${choiceToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )
      if (response.data.succeeded) {
        // Update local state only after successful API call
        const updatedQuestion = {
          ...selectedQuestion,
          choices: selectedQuestion.choices.filter((choice) => choice.id !== choiceToDelete.id),
        }
        setSelectedQuestion(updatedQuestion)
        setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
        console.log("Choice deleted successfully!")
        hideDeleteConfirmation()
      } else {
        // Show error message from API
        // alert(`فشل في حذف الخيار: ${response.data.message}`)
        console.error("Failed to delete choice:", response.data.message)
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleDeleteChoice()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleDeleteChoice()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "Choice not found or API endpoint not found."
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
      console.error("Error deleting choice:", error)
      // alert(`خطأ في حذف الخيار: ${errorMessage}`)
    } finally {
      setDeletingChoiceId(null)
    }
  }

  // Delete question with API call
  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return
    setDeletingQuestionId(questionToDelete.id)
    try {
      const response = await axios.delete<ApiResponse<string>>(
        `${BASE_URL}/api/Question/DeleteQuestion/${questionToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )
      if (response.data.succeeded) {
        // Update local state only after successful API call
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionToDelete.id))
        // Update referenced skill IDs
        const remainingQuestions = questions.filter((q) => q.id !== questionToDelete.id)
        const skillIds = new Set(remainingQuestions.map((q) => q.skillId))
        setReferencedSkillIds(skillIds)
        console.log("Question deleted successfully!")
        hideDeleteConfirmation()
        // Close details modal if the deleted question was being viewed
        if (selectedQuestion && selectedQuestion.id === questionToDelete.id) {
          closeDetailsModal()
        }
      } else {
        // Show error message from API
        // alert(`فشل في حذف السؤال: ${response.data.message}`)
        console.error("Failed to delete question:", response.data.message)
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleDeleteQuestion()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleDeleteQuestion()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "Question not found or API endpoint not found."
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
      console.error("Error deleting question:", error)
      // alert(`خطأ في حذف السؤال: ${errorMessage}`)
    } finally {
      setDeletingQuestionId(null)
    }
  }

  // Edit question
  const handleEditQuestion = async () => {
    if (!selectedQuestion || !editQuestionValue.trim() || !editQuestionAnswer.trim()) {
      setEditQuestionError("يرجى إدخال قيم صحيحة للسؤال والإجابة")
      return
    }

    setIsEditingQuestion(true)
    setEditQuestionError(null)

    try {
      const response = await axios.put<ApiResponse<boolean>>(
        `${BASE_URL}/api/Question/EditQuestion`,
        {
          id: selectedQuestion.id,
          value: editQuestionValue.trim(),
          answer: editQuestionAnswer.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.succeeded) {
        // Update local state only after successful API call
        const updatedQuestion = {
          ...selectedQuestion,
          value: editQuestionValue.trim(),
          answer: editQuestionAnswer.trim(),
        }
        
        setSelectedQuestion(updatedQuestion)
        setQuestions((prevQuestions) => 
          prevQuestions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q))
        )
        
        // Reset edit state
        setEditingQuestion(false)
        setEditQuestionValue("")
        setEditQuestionAnswer("")
        console.log("Question updated successfully!")
      } else {
        setEditQuestionError(response.data.message || "فشل في تعديل السؤال")
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleEditQuestion()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleEditQuestion()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
      
      console.error("Error editing question:", error)
      setEditQuestionError(errorMessage)
    } finally {
      setIsEditingQuestion(false)
    }
  }

  // Action handlers
  const handleViewDetails = (id: string, type: "question" | "course") => {
    setOpenDropdownId(null) // Close dropdown
    if (type === "question") {
      const question = questions.find((q) => q.id === id)
      if (question) {
        setSelectedQuestion(question)
        setShowDetailsModal(true)
        setShowAddChoiceForm(false)
        setAddChoiceError(null)
        // Reset edit states when opening modal
        setEditingChoiceId(null)
        setEditChoiceValue("")
        setEditChoiceError(null)
        setEditingQuestion(false)
        setEditQuestionError(null)
      }
    }
  }

  useEffect(() => {
    if (showAddChoiceForm && inputRef.current) {
      // Add a longer timeout to ensure the element is fully rendered
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150) // Increased from 100 to 150
    }
  }, [showAddChoiceForm])
  
  useEffect(() => {
    if (editingChoiceId && editInputRef.current) {
      setTimeout(() => {
        editInputRef.current?.focus()
      }, 150) // Increased from 100 to 150
    }
  }, [editingChoiceId])
  

  const handleEdit = (id: string, type: "question" | "course") => {
    setOpenDropdownId(null) // Close dropdown
    
    if (type === "question") {
      const question = questions.find((q) => q.id === id)
      if (question) {
        setSelectedQuestion(question)
        setEditQuestionValue(question.value)
        setEditQuestionAnswer(question.answer)
        setEditingQuestion(true)
        setShowDetailsModal(true)
      }
    } else {
      console.log(`Edit ${type}:`, id)
    }
  }

  const handleDelete = (id: string, type: "question" | "course") => {
    setOpenDropdownId(null) // Close dropdown
    if (type === "question") {
      const question = questions.find((q) => q.id === id)
      if (question) {
        setQuestionToDelete(question)
        setShowDeleteConfirmation(true)
      }
    } else {
      console.log(`Delete ${type}:`, id)
      if (confirm(`هل أنت متأكد من حذف هذا ${type === "question" ? "السؤال" : "الكورس"}؟`)) {
        // Handle course deletion here
      }
    }
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedQuestion(null)
    setShowAddChoiceForm(false)
    setNewChoiceValue("")
    setAddChoiceError(null)
    setEditingChoiceId(null)
    setEditChoiceValue("")
    setEditChoiceError(null)
    setEditingQuestion(false)
    setEditQuestionValue("")
    setEditQuestionAnswer("")
    setEditQuestionError(null)
    hideDeleteConfirmation()
  }

  const hideQuestionDeleteConfirmation = () => {
    setShowDeleteConfirmation(false)
    setQuestionToDelete(null)
  }

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = () => {
    if (!showDeleteConfirmation || !questionToDelete) return null
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={hideDeleteConfirmation}
          aria-label="Close"
          style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
        />
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="mr-3 sm:mr-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد حذف السؤال</h3>
                <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
              </div>
            </div>
            <button
              onClick={hideQuestionDeleteConfirmation}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
              disabled={deletingQuestionId === questionToDelete.id}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          {/* Content */}
          <div className="p-4 sm:p-6" dir="rtl">
            <div className="mb-4">
              <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا السؤال؟</p>
              {/* Question Preview */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      !
                    </span>
                  </div>
                  <div className="mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 text-sm sm:text-base font-medium break-words line-clamp-3">
                      {questionToDelete.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">ID: {questionToDelete.id}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {questionToDelete.choices.length} خيارات
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        مهارة #{questionToDelete.skillId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div className="mr-3">
                  <p className="text-sm text-yellow-800">
                    <strong>تنبيه:</strong> سيتم حذف هذا السؤال وجميع خياراته نهائياً من قاعدة البيانات ولن يمكن
                    استرداده.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
            <button
              onClick={hideQuestionDeleteConfirmation}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={deletingQuestionId === questionToDelete.id}
            >
              إلغاء
            </button>
            <button
              onClick={handleDeleteQuestion}
              disabled={deletingQuestionId === questionToDelete.id}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              type="button"
            >
              {deletingQuestionId === questionToDelete.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  تأكيد الحذف
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Delete Confirmation Modal Component
  const DeleteChoiceConfirmationModal = () => {
    if (!showDeleteConfirmation || !choiceToDelete) return null
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={hideDeleteConfirmation}
          aria-label="Close"
          style={{ border: "none", background: "rgba(0, 0, 0, 0.5)", padding: 0, margin: 0 }}
        />
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="mr-3 sm:mr-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">تأكيد الحذف</h3>
                <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
              </div>
            </div>
            <button
              onClick={hideDeleteConfirmation}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
              disabled={deletingChoiceId === choiceToDelete.id}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          {/* Content */}
          <div className="p-4 sm:p-6" dir="rtl">
            <div className="mb-4">
              <p className="text-gray-700 text-sm sm:text-base mb-3">هل أنت متأكد من أنك تريد حذف هذا الخيار؟</p>
              {/* Choice Preview */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      !
                    </span>
                  </div>
                  <div className="mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 text-sm sm:text-base font-medium break-words">{choiceToDelete.value}</p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choiceToDelete.id}</p>
                    {selectedQuestion && choiceToDelete.value === selectedQuestion.answer && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2">
                        تحذير: هذا هو الجواب الصحيح
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div className="mr-3">
                  <p className="text-sm text-yellow-800">
                    <strong>تنبيه:</strong> سيتم حذف هذا الخيار نهائياً من قاعدة البيانات ولن يمكن استرداده.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200">
            <button
              onClick={hideDeleteConfirmation}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={deletingChoiceId === choiceToDelete.id}
            >
              إلغاء
            </button>
            <button
              onClick={handleDeleteChoice}
              disabled={deletingChoiceId === choiceToDelete.id}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm sm:text-base font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              type="button"
            >
              {deletingChoiceId === choiceToDelete.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  تأكيد الحذف
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string
    value: string | number
    icon: any
    color: string
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-4`}>
          <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
    </div>
  )

  const ActionButtons = ({
    id,
    type,
  }: {
    id: string
    type: "question" | "course"
  }) => (
    <div className="flex items-center gap-1 sm:gap-2">
      <div className="hidden sm:flex items-center gap-1">
        <button
          onClick={() => handleViewDetails(id, type)}
          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md flex items-center justify-center transition-colors"
          title="عرض التفاصيل"
          type="button"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleEdit(id, type)}
          className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-md flex items-center justify-center transition-colors"
          title="تعديل"
          type="button"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleDelete(id, type)}
          disabled={deletingQuestionId === id}
          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="حذف"
          type="button"
        >
          {deletingQuestionId === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
      {/* Mobile dropdown */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => toggleDropdown(id)}
          className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 rounded-md flex items-center justify-center transition-colors"
          type="button"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {/* Dropdown Menu */}
        {openDropdownId === id && (
          <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={() => handleViewDetails(id, type)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                type="button"
              >
                <Eye className="h-4 w-4 ml-3" />
                عرض التفاصيل
              </button>
              <button
                onClick={() => handleEdit(id, type)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                type="button"
              >
                <Edit className="h-4 w-4 ml-3" />
                تعديل
              </button>
              <button
                onClick={() => handleDelete(id, type)}
                disabled={deletingQuestionId === id}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {deletingQuestionId === id ? (
                  <Loader2 className="h-4 w-4 ml-3 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 ml-3" />
                )}
                {deletingQuestionId === id ? "جاري الحذف..." : "حذف"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const QuestionDetailsModal = () => {
    if (!showDetailsModal || !selectedQuestion) return null

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {editingQuestion ? "تعديل السؤال" : "تفاصيل السؤال"}
            </h2>
            <button
              onClick={closeDetailsModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              type="button"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 space-y-6" dir="rtl">
            {/* Edit Question Error */}
            {editQuestionError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
                  <span>{editQuestionError}</span>
                </div>
              </div>
            )}
            
            {/* Question ID */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">معرف السؤال</h3>
              <p className="text-gray-900 font-mono text-sm break-all">{selectedQuestion.id}</p>
            </div>
            
            {/* Question Text */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-700 mb-2">نص السؤال</h3>
              {editingQuestion ? (
                <textarea
                  value={editQuestionValue}
                  onChange={(e) => setEditQuestionValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  onFocus={() => inputRef.current?.focus()}
                />
              ) : (
                <p className="text-gray-900 text-base leading-relaxed">{selectedQuestion.value}</p>
              )}
            </div>
            
            {/* Correct Answer */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-700 mb-2">الإجابة الصحيحة</h3>
              {editingQuestion ? (
                <input
                  type="text"
                  value={editQuestionAnswer}
                  onChange={(e) => setEditQuestionAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 text-base font-medium">{selectedQuestion.answer}</p>
              )}
            </div>
            
            {/* Skill ID */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-purple-700 mb-2">معرف المهارة</h3>
              <p className="text-gray-900 text-base">{selectedQuestion.skillId}</p>
            </div> 
            
            {/* Choices */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-orange-700">الخيارات المتاحة</h3>
                <button
                  onClick={() => setShowAddChoiceForm(!showAddChoiceForm)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-colors"
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  إضافة خيار
                </button>
              </div>
              
              {/* Add Choice Form */}
              {showAddChoiceForm && (
                <div className="bg-white rounded-md p-4 border border-orange-200 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">إضافة خيار جديد</h4>
                  <div className="space-y-3">
                    <div>
                      <textarea
                        ref={inputRef}
                        value={newChoiceValue}
                        onChange={(e) => {
                          setNewChoiceValue(e.target.value)
                        }}
                        placeholder="أدخل نص الخيار الجديد..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows={3}
                        
                      />
                    </div>
                    {addChoiceError && (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
                        <span>{addChoiceError}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={handleCancelAddChoice}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        type="button"
                        disabled={isAddingChoice}
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={handleAddChoice}
                        disabled={isAddingChoice || !newChoiceValue.trim()}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
                        type="button"
                      >
                        {isAddingChoice ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isAddingChoice ? "جاري الحفظ..." : "حفظ الخيار"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Edit Choice Error */}
              {editChoiceError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
                    <span>{editChoiceError}</span>
                  </div>
                </div>
              )}
              
              {/* Existing Choices */}
              {selectedQuestion.choices.length > 0 ? (
                <div className="space-y-3">
                  {selectedQuestion.choices.map((choice, index) => (
                    <div key={choice.id} className="bg-white rounded-md p-3 border border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          {editingChoiceId === choice.id ? (
                            // Edit Mode
                            <div className="space-y-2">
                              <textarea
                                ref={editInputRef}
                                rows={2}
                                value={editChoiceValue}
                                onChange={(e) => setEditChoiceValue(e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-md text-right bg-blue-50 hover:border-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="تعديل نص الخيار..."
                              />
                              <div className="flex items-center gap-2 justify-end">
                                <button
                                  onClick={handleCancelEditChoice}
                                  disabled={isEditingChoice}
                                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-xs transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                  type="button"
                                >
                                  إلغاء
                                </button>
                                <button
                                  onClick={handleSaveEditChoice}
                                  disabled={isEditingChoice || !editChoiceValue.trim()}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md text-xs flex items-center gap-1 transition-colors disabled:cursor-not-allowed"
                                  type="button"
                                >
                                  {isEditingChoice ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                                  {isEditingChoice ? "حفظ..." : "حفظ"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <>
                              <p className="text-gray-900 text-base">{choice.value}</p>
                              <p className="text-xs text-gray-500 mt-1 font-mono">ID: {choice.id}</p>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {choice.value === selectedQuestion.answer && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              الإجابة الصحيحة
                            </span>
                          )}
                          {editingChoiceId !== choice.id && (
                            <>
                              <button
                                onClick={() => handleStartEditChoice(choice)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="تعديل الخيار"
                                type="button"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => showDeleteChoiceConfirmation(choice)}
                                disabled={deletingChoiceId === choice.id}
                                className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="حذف الخيار"
                                type="button"
                              >
                                {deletingChoiceId === choice.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">لا توجد خيارات متاحة لهذا السؤال</p>
              )}
            </div>
            
            {/* Question Statistics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">إحصائيات السؤال</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedQuestion.choices.length}</p>
                  <p className="text-sm text-gray-600">عدد الخيارات</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedQuestion.value.length}</p>
                  <p className="text-sm text-gray-600">عدد أحرف السؤال</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedQuestion.skillId}</p>
                  <p className="text-sm text-gray-600">رقم المهارة</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            {editingQuestion ? (
              <>
                <button
                  onClick={() => {
                    setEditingQuestion(false)
                    setEditQuestionError(null)
                  }}
                  disabled={isEditingQuestion}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  type="button"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleEditQuestion}
                  disabled={isEditingQuestion || !editQuestionValue.trim() || !editQuestionAnswer.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  type="button"
                >
                  {isEditingQuestion ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isEditingQuestion ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditQuestionValue(selectedQuestion.value)
                    setEditQuestionAnswer(selectedQuestion.answer)
                    setEditingQuestion(true)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  type="button"
                >
                  <Edit className="h-4 w-4" />
                  تعديل السؤال
                </button>
                <button
                  onClick={closeDetailsModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  type="button"
                >
                  إغلاق
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  const handleAddNewCourse = () => {
    router.push("/admin/pages/questionAndCourses/addNewCourse")
  }

  const handleAddNewQuestion = () => {
    router.push("/admin/pages/questionAndCourses/addNewQuestion")
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-[90vh] bg-gray-50" dir="rtl">
        <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">
                    الاسئلة و الكورسات
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة الأسئلة و الكورسات</p>
                  {questionsLoading && (
                    <p className="text-xs sm:text-sm text-blue-600">جاري تحميل الأسئلة المرتبطة...</p>
                  )}
                  {error && (
                    <div className="flex items-center mt-2 text-red-600">
                      <AlertCircle className="h-4 w-4 ml-1" />
                      <p className="text-xs sm:text-sm">{error}</p>
                    </div>
                  )}
                </div>
                {/* Add New Button */}
                <div className="flex-shrink-0">
                  {activeOption === "الاسئلة" && (
                    <button
                      onClick={handleAddNewQuestion}
                      className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
                      type="button"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                      إضافة سؤال جديد
                    </button>
                  )}
                  {activeOption === "الكورسات" && (
                    <button
                      onClick={handleAddNewCourse}
                      className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
                      type="button"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                      إضافة كورس جديد
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              <MetricCard title="إجمالي الاسئلة" value={questions.length} icon={FileQuestion} color="bg-blue-500" />
              <MetricCard title="الاسئلة المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
              <MetricCard title="إجمالي الكورسات" value={testClasses.length} icon={LandPlot} color="bg-green-500" />
              <MetricCard
                title="الكورسات المستخدمة"
                value={referencedClassIds.size}
                icon={Tent}
                color="bg-orange-500"
              />
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
                <div className="flex relative">
                  <button
                    onClick={() => setActiveOption("الاسئلة")}
                    className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
                      activeOption === "الاسئلة"
                        ? "text-purple-700 bg-white shadow-md"
                        : "text-white hover:text-purple-100"
                    }`}
                    type="button"
                  >
                    الاسئلة
                  </button>
                  <button
                    onClick={() => setActiveOption("الكورسات")}
                    className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
                      activeOption === "الكورسات"
                        ? "text-purple-700 bg-white shadow-md"
                        : "text-white hover:text-purple-100"
                    }`}
                    type="button"
                  >
                    الكورسات
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {activeOption === "الاسئلة" ? (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الأسئلة</h2>
                  {questions.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <FileQuestion className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm sm:text-base">لا توجد أسئلة متاحة</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:gap-4">
                      {questions.map((question) => (
                        <div
                          key={question.id}
                          className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
                                {question.value}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2">الإجابة: {question.answer}</p>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {question.choices.map((choice) => (
                                  <span
                                    key={choice.id}
                                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {choice.value}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-end sm:justify-start">
                              <ActionButtons id={question.id} type="question" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">قائمة الكورسات</h2>
                  {testClasses.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <LandPlot className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm sm:text-base">لا توجد كورسات متاحة</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:gap-4">
                      {testClasses.map((course) => (
                        <div
                          key={course.id}
                          className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base break-words">
                                {course.value}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600">معرف نوع الاختبار: {course.testTypeId}</p>
                            </div>
                            <div className="flex items-center justify-end sm:justify-start">
                              <ActionButtons id={course.id.toString()} type="course" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Question Details Modal */}
        <QuestionDetailsModal />
        
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal />
        
        {/* Delete Choice Confirmation Modal */}
        <DeleteChoiceConfirmationModal />
      </div>
    </Layout>
  )
}