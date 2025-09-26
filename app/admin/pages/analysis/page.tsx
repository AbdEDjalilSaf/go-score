// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import Layout from "@/app/admin/Layout/Layout"
// import { Users, TrendingUp, GraduationCap, BookOpenText, AlertCircle, Trash2, Plus, X } from "lucide-react"
// import ArabicToggle from "./arabicToggle"

// interface Skill {
//   id: number
//   value: string
//   testClassId: number
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Skill[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function GetAllSkills() {
//   const [skills, setSkills] = useState<Skill[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
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

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
//               router.push("/admin/login")
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

//   const deleteSkill = async (skillId: number) => {
//     try {
//       setDeletingId(skillId)
//       const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         // Remove the deleted skill from the state
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
//         setShowDeleteConfirm(null)
//         setSelectedSkill(null)
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to delete skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف المهارة"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error deleting skill:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClick = (skill: Skill) => {
//     setSelectedSkill(skill)
//     setShowDeleteConfirm(skill.id)
//   }

//   const handleConfirmDelete = () => {
//     if (showDeleteConfirm) {
//       deleteSkill(showDeleteConfirm)
//     }
//   }

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(null)
//     setSelectedSkill(null)
//   }

//   const handleAddNewSkill = () => {
//     router.push("/admin/pages/analysis/addNewSkill")
//   }

//   useEffect(() => {
//     fetchSkills()
//   }, [])

//   const handleRetry = () => {
//     fetchSkills()
//   }

//   const handleGoBack = () => {
//     router.back()
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                 <div className="flex justify-center">
//                   <svg
//                     className="h-12 w-12 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
//                 <p className="mt-2 text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={handleRetry}
//                   className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                   type="button"
//                 >
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاقسام و المهارات</h1>
//                 <p className="text-gray-600">اهلا بك في صفحة الاقسام و المهارات</p>
//               </div>
//               {/* Add New Skill Button */}
//               <div className="flex-shrink-0">
//                 <button
//                   onClick={handleAddNewSkill}
//                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                   type="button"
//                 >
//                   <Plus className="h-5 w-5 ml-2" />
//                   إضافة مهارة جديدة
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المهارات" value={skills.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="الطلاب النشطون" value={20} icon={GraduationCap} color="bg-green-500" />
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//           </div>

//           <ArabicToggle />

//           {/* Skills Table */}
//           {skills.length === 0 ? (
//             <div className="text-center mt-7 py-12">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">لا يوجد مهارات</h3>
//               <p className="mt-2 text-sm text-gray-500">لا يوجد مهارات متاحة حالياً.</p>
//               {/* Add skill button in empty state */}
//               <div className="mt-6">
//                 <button
//                   onClick={handleAddNewSkill}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset- transition-colors duration-200"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4 ml-2" />
//                   إضافة أول مهارة
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-purple-700">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         معرف المهارة
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         اسم المهارة
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         معرف القسم
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         الإجراءات
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {skills.map((skill, index) => (
//                       <tr
//                         key={skill.id}
//                         className={`hover:bg-gray-50 transition-colors duration-150 ${
//                           index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                         }`}
//                       >
//                         <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           <span className="ml-2">id:</span>
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                             {skill.id}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           <div className="max-w-xs truncate" title={skill.value}>
//                             {skill.value}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {skill.testClassId ? (
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                               {skill.testClassId}
//                             </span>
//                           ) : (
//                             <span className="text-gray-400">-</span>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           <button
//                             onClick={() => handleDeleteClick(skill)}
//                             disabled={deletingId === skill.id}
//                             className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             type="button"
//                           >
//                             {deletingId === skill.id ? (
//                               <>
//                                 <svg
//                                   className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-700"
//                                   fill="none"
//                                   viewBox="0 0 24 24"
//                                   aria-hidden="true"
//                                 >
//                                   <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                   ></circle>
//                                   <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                   ></path>
//                                 </svg>
//                                 جاري الحذف...
//                               </>
//                             ) : (
//                               <>
//                                 <Trash2 className="h-3 w-3 mr-1" />
//                                 حذف
//                               </>
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {/* Table Footer with Stats */}
//               <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//                 <div className="flex items-center justify-center">
//                   <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Refresh Button */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleRetry}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               type="button"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//               تحديث المهارات
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Delete Confirmation Card Modal */}
//       {showDeleteConfirm && selectedSkill && (
//         <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             {/* Card Header */}
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDelete}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
//               </div>
//             </div>

//             {/* Card Body */}
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>

//                 {/* Skill Info Card */}
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم المهارة:</span>
//                     <span className="font-medium text-gray-900">{selectedSkill.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف المهارة:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedSkill.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedSkill.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDelete}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={deletingId === selectedSkill.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedSkill.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }














// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { BookOpen } from "lucide-react"
// import Layout from "@/app/admin/Layout/Layout"
// import { Users, TrendingUp, BookOpenText, AlertCircle, Trash2, Plus, X, Lock } from "lucide-react"
// // import ArabicToggle from "./arabicToggle"
// // import { useSelector } from 'react-redux';


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
//   const [activeOption, setActiveOption] = useState<"المهارات" | "الأقسام">("المهارات")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
//   const [showDeleteConfirmTwo, setShowDeleteConfirmTwo] = useState<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
//   const [selectedTestClass, setSelectedTestClass] = useState<TestClass | null>(null)
//   const [referencedClassIds, setReferencedClassIds] = useState<Set<number>>(new Set())
//   const router = useRouter()

// // const skillOrSection = useSelector((state: { background: { skillOrSection: string } }) => state.background.skillOrSection);

  
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

//   const fetchTestClasses = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<TestClass[]>>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch test classes")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
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
//       console.error("Error fetching test classes:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTestClass = async (classId: number) => {
//     try {
//       setDeletingId(classId)
//       const response = await axios.delete(`${BASE_URL}/api/TestClass/DeleteTestClass/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses((prevClasses) => prevClasses.filter((testClass) => testClass.id !== classId))
//         setShowDeleteConfirmTwo(null)
//         setSelectedTestClass(null)
//       } else {
//         setError(response.data.message || "Failed to delete test class")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف القسم"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
//       console.error("Error deleting test class:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }


//   const handleDeleteClickTwo = (testClass: TestClass) => {
//     setSelectedTestClass(testClass)
//     setShowDeleteConfirmTwo(testClass.id)
//   }

//   const handleConfirmDeleteTwo = () => {
//     if (showDeleteConfirmTwo) {
//       deleteTestClass(showDeleteConfirmTwo)
//     }
//   }

//   const handleCancelDeleteTwo = () => {
//     setShowDeleteConfirmTwo(null)
//     setSelectedTestClass(null)
//   }

//   const handleAddNewClass = () => {
//     router.push("/admin/pages/analysis/addNewTestClass")
//   }

//   const isClassReferenced = (classId: number) => {
//     return referencedClassIds.has(classId)
//   }

//   const getReferencedQuestionsCountTwo = (classId: number) => {
//     return questions.filter((question) => question.skillId === classId).length
//   }

//   useEffect(() => {
//     fetchTestClasses()
//     fetchQuestions()
//   }, [])

 
  
  
//   const fetchQuestions = async () => {
//     try {
//       setQuestionsLoading(true)
//       const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setQuestions(response.data.data)
//         // Extract unique skill IDs that are referenced by questions
//         const skillIds = new Set(
//           response.data.data.map((question) => question.skillId).filter((id) => id !== null && id !== undefined),
//         )
//         setReferencedSkillIds(skillIds)
//       } else {
//         console.error("Failed to fetch questions:", response.data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching questions:", error)
//       // Don't show error to user for questions fetch, as it's supplementary data
//     } finally {
//       setQuestionsLoading(false)
//     }
//   }

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
//               router.push("/admin/login")
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

//   const deleteSkill = async (skillId: number) => {
//     try {
//       setDeletingId(skillId)
//       const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         // Remove the deleted skill from the state
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
//         setShowDeleteConfirm(null)
//         setSelectedSkill(null)
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to delete skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف المهارة"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error deleting skill:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClick = (skill: Skill) => {
//     setSelectedSkill(skill)
//     setShowDeleteConfirm(skill.id)
//   }

//   const handleConfirmDelete = () => {
//     if (showDeleteConfirm) {
//       deleteSkill(showDeleteConfirm)
//     }
//   }

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(null)
//     setSelectedSkill(null)
//   }

//   const handleAddNewSkill = () => {
//     router.push("/admin/pages/analysis/addNewSkill")
//   }

//   const isSkillReferenced = (skillId: number) => {
//     return referencedSkillIds.has(skillId)
//   }

//   const getReferencedQuestionsCount = (skillId: number) => {
//     return questions.filter((question) => question.skillId === skillId).length
//   }

//   useEffect(() => {
//     // Fetch both skills and questions
//     fetchSkills()
//     fetchQuestions()
//   }, [])

//   const handleRetry = () => {
//     fetchSkills()
//     fetchTestClasses()
//     fetchQuestions()
//   }

//   const handleGoBack = () => {
//     router.back()
//   }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                 <div className="flex justify-center">
//                   <svg
//                     className="h-12 w-12 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
//                 <p className="mt-2 text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={handleRetry}
//                   className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                   type="button"
//                 >
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاقسام و المهارات</h1>
//                 <p className="text-gray-600">اهلا بك في صفحة الاقسام و المهارات</p>
//                 {questionsLoading && <p className="text-sm text-blue-600 mt-1">جاري تحميل الأسئلة المرتبطة...</p>}
//               </div>
//               {/* Add New Skill Button */}
//               <div className="flex-shrink-0">
//                 {activeOption === "المهارات" && 
//                 <button
//                   onClick={handleAddNewSkill}
//                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                   type="button"
//                 >
//                   <Plus className="h-5 w-5 ml-2" />
//                   إضافة مهارة جديدة
//                 </button>
//                 }
//                 {activeOption === "الأقسام" && 
//                  <button
//                  onClick={handleAddNewSkill}
//                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                  type="button"
//                >
//                  <Plus className="h-5 w-5 ml-2" />
//                  إضافة قسم جديد
//                </button>
//                }
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المهارات" value={skills.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="المهارات المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//           </div>

//           {/* ArabicToggle */}
//         <div className="w-md mx-auto my-2">
//         {/* Main Toggle Button */}
//         <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//           <div className="flex relative">
//            {/* المهارات Option */}
//             <button
//               name="المهارات"
//               onClick={() =>{
//                setActiveOption("المهارات")
//                    }}
//               className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                 activeOption === "المهارات" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//               }`}
//              type="button">
//                المهارات
//             </button>

//             {/* الأقسام Option */}
//             <button
//               name="الأقسام"
//               onClick={() =>{ 
//                 setActiveOption("الأقسام")
//                   }}
//               className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                 activeOption === "الأقسام" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//               }`}
//              type="button">
//               الأقسام 
//             </button>
//           </div>  
//         </div>
// </div>

//           {/* <ArabicToggle activeOption={activeOption} /> */}

//           {/* Skills Table */}
//           {activeOption === "الأقسام" && 
//             <>
//               {testClasses.length === 0 ? (
//                 <div className="text-center mt-7 py-8 sm:py-12">
//                   <BookOpen className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
//                   <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">لا يوجد أقسام</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد أقسام متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewClass}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus />
//                       <span className="mr-2">إضافة أول قسم</span>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   {/* Mobile Card View */}
//                   <div className="block sm:hidden">
//                     <div className="divide-y divide-gray-200">
//                       {testClasses.map((testClass, index) => {
//                         const isReferenced = isClassReferenced(testClass.id)
//                         const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                         return (
//                           <div key={testClass.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1 min-w-0">
//                                 <h3 className="text-sm font-medium text-gray-900 truncate">{testClass.value}</h3>
//                                 <div className="mt-1 flex items-center gap-2">
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     ID: {testClass.id}
//                                   </span>
//                                   {testClass.testTypeId && (
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                       Type: {testClass.testTypeId}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 {isReferenced ? (
//                                   <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                     <Lock />
//                                     <span className="mr-1">محمي</span>
//                                   </span>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-1"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </div>

//                   {/* Desktop Table View */}
//                   <div className="hidden sm:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف النوع
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {testClasses.map((testClass, index) => {
//                           const isReferenced = isClassReferenced(testClass.id)
//                           const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                           return (
//                             <tr
//                               key={testClass.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {testClass.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 <div className="max-w-xs truncate" title={testClass.value}>
//                                   {testClass.value}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {testClass.testTypeId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {testClass.testTypeId}
//                                   </span>
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock />
//                                       <span className="mr-1">محمي</span>
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-2"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         إجمالي الأقسام: {testClasses.length} | المحمية: {referencedClassIds.size} | المتاحة للحذف:{" "}
//                         {testClasses.length - referencedClassIds.size}
//                       </div>
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           }

//           {activeOption === "المهارات" && 
//           <>
//           {skills.length === 0 ? (
//             <div className="text-center mt-7 py-12">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">لا يوجد مهارات</h3>
//               <p className="mt-2 text-sm text-gray-500">لا يوجد مهارات متاحة حالياً.</p>
//               {/* Add skill button in empty state */}
//               <div className="mt-6">
//                 <button
//                   onClick={handleAddNewSkill}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset- transition-colors duration-200"
//                   type="button"
//                 >
//                   <Plus className="h-4 w-4 ml-2" />
//                   إضافة أول مهارة
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-purple-700">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         معرف المهارة
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         اسم المهارة
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         معرف القسم
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         الحالة
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                       >
//                         الإجراءات
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {skills.map((skill, index) => {
//                       const isReferenced = isSkillReferenced(skill.id)
//                       const questionsCount = getReferencedQuestionsCount(skill.id)

//                       return (
//                         <tr
//                           key={skill.id}
//                           className={`hover:bg-gray-50 transition-colors duration-150 ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                           }`}
//                         >
//                           <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             <span className="ml-2">id:</span>
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                               {skill.id}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             <div className="max-w-xs truncate" title={skill.value}>
//                               {skill.value}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {skill.testClassId ? (
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                 {skill.testClassId}
//                               </span>
//                             ) : (
//                               <span className="text-gray-400">-</span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {isReferenced ? (
//                               <div className="flex flex-col gap-1">
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                   <Lock className="h-3 w-3 mr-1" />
//                                   مستخدمة
//                                 </span>
//                                 <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                               </div>
//                             ) : (
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                 متاحة للحذف
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {isReferenced ? (
//                               <div className="flex items-center">
//                                 <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                   <Lock className="h-3 w-3 mr-1" />
//                                   محمية
//                                 </span>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => handleDeleteClick(skill)}
//                                 disabled={deletingId === skill.id}
//                                 className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 type="button"
//                               >
//                                 {deletingId === skill.id ? (
//                                   <>
//                                     <svg
//                                       className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-700"
//                                       fill="none"
//                                       viewBox="0 0 24 24"
//                                       aria-hidden="true"
//                                     >
//                                       <circle
//                                         className="opacity-25"
//                                         cx="12"
//                                         cy="12"
//                                         r="10"
//                                         stroke="currentColor"
//                                         strokeWidth="4"
//                                       ></circle>
//                                       <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                       ></path>
//                                     </svg>
//                                     جاري الحذف...
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Trash2 className="h-3 w-3 mr-1" />
//                                     حذف
//                                   </>
//                                 )}
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//               {/* Table Footer with Stats */}
//               <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-500">
//                     إجمالي المهارات: {skills.length} | المحمية: {referencedSkillIds.size} | المتاحة للحذف:{" "}
//                     {skills.length - referencedSkillIds.size}
//                   </div>
//                   <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</div>
//                 </div>
//               </div>
//             </div>
//           )}
//           </>
//           }

//           {/* Refresh Button */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleRetry}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               type="button"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//               تحديث المهارات
//             </button>
//           </div>
//         </div>
//       </div>


//       {showDeleteConfirmTwo && selectedTestClass && activeOption === "الأقسام" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             {/* Card Header */}
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDeleteTwo}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف القسم</h3>
//               </div>
//             </div>
//             {/* Card Body */}
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف القسم التالي؟</p>
//                 {/* Skill Info Card */}
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم القسم:</span>
//                     <span className="font-medium text-gray-900">{selectedTestClass.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedTestClass.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedTestClass.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDeleteTwo}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDeleteTwo}
//                   disabled={deletingId === selectedTestClass.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedTestClass.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

      

//       {/* Enhanced Delete Confirmation Card Modal */}
//       {showDeleteConfirm && selectedSkill && activeOption === "المهارات" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             {/* Card Header */}
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDeleteTwo}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
//               </div>
//             </div>
//             {/* Card Body */}
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>
//                 {/* Skill Info Card */}
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم المهارة:</span>
//                     <span className="font-medium text-gray-900">{selectedSkill.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف المهارة:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedSkill.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedSkill.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDelete}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={deletingId === selectedSkill.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedSkill.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }










// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { BookOpen, Edit2 } from "lucide-react"
// import Layout from "@/app/admin/Layout/Layout"
// import { Users, Shapes, Tent, Save , AlertCircle, Trash2, Plus, X, Lock } from "lucide-react"

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
//   const [editingSkill, setEditingSkill] = useState<number | null>(null)
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [isUpdating, setIsUpdating] = useState<boolean>(false)
//   const [activeOption, setActiveOption] = useState<"المهارات" | "الأقسام">("المهارات")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [editValue, setEditValue] = useState<string>("")
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
//   const [showDeleteConfirmTwo, setShowDeleteConfirmTwo] = useState<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
//   const [selectedTestClass, setSelectedTestClass] = useState<TestClass | null>(null)
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

//   // New function to check if a test class is referenced by skills
//   const isClassReferencedBySkills = (classId: number) => {
//     return skills.some((skill) => skill.testClassId === classId)
//   }

//   // New function to get count of skills that reference a test class
//   const getReferencedSkillsCount = (classId: number) => {
//     return skills.filter((skill) => skill.testClassId === classId).length
//   }

//   const fetchTestClasses = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<TestClass[]>>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch test classes")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
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
//       console.error("Error fetching test classes:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTestClass = async (classId: number) => {
//     try {
//       setDeletingId(classId)
//       const response = await axios.delete(`${BASE_URL}/api/TestClass/DeleteTestClass/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses((prevClasses) => prevClasses.filter((testClass) => testClass.id !== classId))
//         setShowDeleteConfirmTwo(null)
//         setSelectedTestClass(null)
//       } else {
//         setError(response.data.message || "Failed to delete test class")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف القسم"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
//       console.error("Error deleting test class:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClickTwo = (testClass: TestClass) => {
//     setSelectedTestClass(testClass)
//     setShowDeleteConfirmTwo(testClass.id)
//   }

//   const handleConfirmDeleteTwo = () => {
//     if (showDeleteConfirmTwo) {
//       deleteTestClass(showDeleteConfirmTwo)
//     }
//   }

//   const handleCancelDeleteTwo = () => {
//     setShowDeleteConfirmTwo(null)
//     setSelectedTestClass(null)
//   }

//   const handleAddNewClass = () => {
//     router.push("/admin/pages/analysis/addNewTestClass")
//   }

//   const isClassReferenced = (classId: number) => {
//     return referencedClassIds.has(classId)
//   }

//   const getReferencedQuestionsCountTwo = (classId: number) => {
//     return questions.filter((question) => question.skillId === classId).length
//   }

//   useEffect(() => {
//     fetchTestClasses()
//     fetchQuestions()
//   }, [])

//   const fetchQuestions = async () => {
//     try {
//       setQuestionsLoading(true)
//       const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setQuestions(response.data.data)
//         // Extract unique skill IDs that are referenced by questions
//         const skillIds = new Set(
//           response.data.data.map((question) => question.skillId).filter((id) => id !== null && id !== undefined),
//         )
//         setReferencedSkillIds(skillIds)
//       } else {
//         console.error("Failed to fetch questions:", response.data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching questions:", error)
//       // Don't show error to user for questions fetch, as it's supplementary data
//     } finally {
//       setQuestionsLoading(false)
//     }
//   }

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
//               router.push("/admin/login")
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


//   const editSkill = async (skillId: number, newValue: string) => {
//     try {
//       setIsUpdating(true)
//       const response = await axios.put<ApiResponse<boolean>>(
//         `${BASE_URL}/api/Skill/EditSkill`,
//         {
//           id: skillId,
//           value: newValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update the skill in the state
//         setSkills((prevSkills) =>
//           prevSkills.map((skill) => (skill.id === skillId ? { ...skill, value: newValue } : skill)),
//         )
//         setEditingSkill(null)
//         setEditValue("")
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to update skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء تحديث المهارة"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return editSkill(skillId, newValue)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return editSkill(skillId, newValue)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error updating skill:", error)
//       setError(errorMessage)
//     } finally {
//       setIsUpdating(false)
//     }
//   }


//   const handleEditClick = (skill: Skill) => {
//     setEditingSkill(skill.id)
//     setEditValue(skill.value)
//   }

//   const handleSaveEdit = () => {
//     if (editingSkill && editValue.trim()) {
//       editSkill(editingSkill, editValue.trim())
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingSkill(null)
//     setEditValue("")
//   }

//   const deleteSkill = async (skillId: number) => {
//     try {
//       setDeletingId(skillId)
//       const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         // Remove the deleted skill from the state
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
//         setShowDeleteConfirm(null)
//         setSelectedSkill(null)
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to delete skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف المهارة"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error deleting skill:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClick = (skill: Skill) => {
//     setSelectedSkill(skill)
//     setShowDeleteConfirm(skill.id)
//   }

//   const handleConfirmDelete = () => {
//     if (showDeleteConfirm) {
//       deleteSkill(showDeleteConfirm)
//     }
//   }

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(null)
//     setSelectedSkill(null)
//   }

//   const handleAddNewSkill = () => {
//     router.push("/admin/pages/analysis/addNewSkill")
//   }

//   const isSkillReferenced = (skillId: number) => {
//     return referencedSkillIds.has(skillId)
//   }

//   const getReferencedQuestionsCount = (skillId: number) => {
//     return questions.filter((question) => question.skillId === skillId).length
//   }

//   useEffect(() => {
//     // Fetch both skills and questions
//     fetchSkills()
//     fetchQuestions()
//   }, [])

//   const handleRetry = () => {
//     fetchSkills()
//     fetchTestClasses()
//     fetchQuestions()
//   }

//   // const handleGoBack = () => {
//   //   router.back()
//   // }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                 <div className="flex justify-center">
//                   <svg
//                     className="h-12 w-12 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
//                 <p className="mt-2 text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={handleRetry}
//                   className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                   type="button"
//                 >
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاقسام و المهارات</h1>
//                 <p className="text-gray-600">اهلا بك في صفحة الاقسام و المهارات</p>
//                 {questionsLoading && <p className="text-sm text-blue-600 mt-1">جاري تحميل الأسئلة المرتبطة...</p>}
//               </div>
//               {/* Add New Skill Button */}
//               <div className="flex-shrink-0">
//                 {activeOption === "المهارات" && (
//                   <button
//                     onClick={handleAddNewSkill}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة مهارة جديدة
//                   </button>
//                 )}
//                 {activeOption === "الأقسام" && (
//                   <button
//                     onClick={handleAddNewClass}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة قسم جديد
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المهارات" value={skills.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="المهارات المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//             <MetricCard title="إجمالي الأقسام" value={testClasses.length} icon={Shapes} color="bg-green-500" />
//             <MetricCard title="الأقسام المستخدمة" value={referencedClassIds.size} icon={Tent} color="bg-orange-500" />
//             {/* <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" /> */}
//           </div>

//           {/* Toggle Buttons */}
//           <div className="w-md mx-auto my-2">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//               <div className="flex relative">
//                 <button
//                   name="المهارات"
//                   onClick={() => {
//                     setActiveOption("المهارات")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المهارات"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المهارات
//                 </button>
//                 <button
//                   name="الأقسام"
//                   onClick={() => {
//                     setActiveOption("الأقسام")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الأقسام"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الأقسام
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Test Classes Table */}
//           {activeOption === "الأقسام" && 
//             <>
//               {testClasses.length === 0 ? (
//                 <div className="text-center mt-7 py-8 sm:py-12">
//                   <BookOpen className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
//                   <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">لا يوجد أقسام</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد أقسام متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewClass}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus />
//                       <span className="mr-2">إضافة أول قسم</span>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   {/* Mobile Card View */}
//                   <div className="block sm:hidden">
//                     <div className="divide-y divide-gray-200">
//                       {testClasses.map((testClass) => {
//                         const isReferencedByQuestions = isClassReferenced(testClass.id)
//                         const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                         const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                         const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                         const skillsCount = getReferencedSkillsCount(testClass.id)

//                         return (
//                           <div key={testClass.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1 min-w-0">
//                                 <h3 className="text-sm font-medium text-gray-900 truncate">{testClass.value}</h3>
//                                 <div className="mt-1 flex items-center gap-2">
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     ID: {testClass.id}
//                                   </span>
//                                   {testClass.testTypeId && (
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                       Type: {testClass.testTypeId}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 {isReferenced ? (
//                                   <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                     <Lock />
//                                     <span className="mr-1">محمي</span>
//                                   </span>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-1"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </div>

//                   {/* Desktop Table View */}
//                   <div className="hidden sm:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف النوع
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {testClasses.map((testClass, index) => {
//                           const isReferencedByQuestions = isClassReferenced(testClass.id)
//                           const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                           const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                           const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                           const skillsCount = getReferencedSkillsCount(testClass.id)

//                           return (
//                             <tr
//                               key={testClass.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {testClass.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 <div className="max-w-xs truncate" title={testClass.value}>
//                                   {testClass.value}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {testClass.testTypeId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {testClass.testTypeId === 1 ? "قدرات" : "تحصيلي"}
//                                   </span>
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock />
//                                       <span className="mr-1">محمي</span>
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-2"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
                                     
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         إجمالي الأقسام: {testClasses.length} | المحمية:{" "}
//                         {
//                           testClasses.filter((tc) => isClassReferenced(tc.id) || isClassReferencedBySkills(tc.id))
//                             .length
//                         }{" "}
//                         | المتاحة للحذف:{" "}
//                         {
//                           testClasses.filter((tc) => !isClassReferenced(tc.id) && !isClassReferencedBySkills(tc.id))
//                             .length
//                         }
//                       </div>
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           }

//           {/* Skills Table */}
//           {activeOption === "المهارات" && 
//             <>
//               {skills.length === 0 ? (
//                 <div className="text-center mt-7 py-12">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">لا يوجد مهارات</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد مهارات متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewSkill}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 ml-2" />
//                       إضافة أول مهارة
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف المهارة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم المهارة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {skills.map((skill, index) => {
//                           const isReferenced = isSkillReferenced(skill.id)
//                           const questionsCount = getReferencedQuestionsCount(skill.id)
//                           return (
//                             <tr
//                               key={skill.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {skill.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 <div className="max-w-xs truncate" title={skill.value}>
//                                   {skill.value} 
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {skill.testClassId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {skill.testClassId}
//                                   </span> 
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock className="h-3 w-3 mr-1" />
//                                       مستخدمة
//                                     </span>
//                                     <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاحة للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock className="h-3 w-3 mr-1" />
//                                       محمية
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClick(skill)}
//                                     disabled={deletingId === skill.id}
//                                     className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {/* {deletingId === skill.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-700"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 className="h-3 w-3 mr-1" />
//                                         حذف
//                                       </>
//                                     )} */}
//                                     {editingSkill === skill.id ? (
//                                   <>
//                                     <button
//                                       onClick={handleSaveEdit}
//                                       disabled={isUpdating || !editValue.trim()}
//                                       className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                       title="حفظ التغييرات"
//                                     type="button">
//                                       {isUpdating ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
//                                       ) : (
//                                         <Save className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={handleCancelEdit}
//                                       disabled={isUpdating}
//                                       className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="إلغاء التعديل"
//                                     type="button">
//                                       <X className="h-4 w-4" />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <button
//                                       onClick={() => handleEditClick(skill)}
//                                       className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
//                                       title="تعديل المهارة"
//                                     type="button">
//                                       <Edit2 className="h-4 w-4" />
//                                     </button>
//                                     <button
//                                       onClick={() => {
//                                         setSelectedSkill(skill)
//                                         setShowDeleteConfirm(skill.id)
//                                       }}
//                                       disabled={deletingId === skill.id}
//                                       className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="حذف المهارة"
//                                     type="button">
//                                       {deletingId === skill.id ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
//                                       ) : (
//                                         <Trash2 className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </>
//                                 )}
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="text-sm text-gray-500">
//                         إجمالي المهارات: {skills.length} | المحمية: {referencedSkillIds.size} | المتاحة للحذف:{" "}
//                         {skills.length - referencedSkillIds.size}
//                       </div>
//                       <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           }

//           {/* Refresh Button */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleRetry}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               type="button"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//               تحديث المهارات
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modals */}
//       {showDeleteConfirmTwo && selectedTestClass && activeOption === "الأقسام" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDeleteTwo}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف القسم</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف القسم التالي؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم القسم:</span>
//                     <span className="font-medium text-gray-900">{selectedTestClass.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedTestClass.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف النوع:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedTestClass.testTypeId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDeleteTwo}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDeleteTwo}
//                   disabled={deletingId === selectedTestClass.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedTestClass.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && selectedSkill && activeOption === "المهارات" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDelete}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم المهارة:</span>
//                     <span className="font-medium text-gray-900">{selectedSkill.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف المهارة:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedSkill.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedSkill.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDelete}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={deletingId === selectedSkill.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedSkill.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }












// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { BookOpen, Edit2 } from "lucide-react"
// import Layout from "@/app/admin/Layout/Layout"
// import { Users, Shapes, Tent, Save, AlertCircle, Trash2, Plus, X, Lock } from "lucide-react"

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


// interface EditTestClassProps {
//   testClass: TestClass
//   onUpdate: (updatedTestClass: TestClass) => void
//   onCancel: () => void
//   isUpdating?: boolean
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
//   const [editingSkill, setEditingSkill] = useState<number | null>(null)
//   const [questions, setQuestions] = useState<Question[]>([])
//   const [isUpdating, setIsUpdating] = useState<boolean>(false)
//   const [activeOption, setActiveOption] = useState<"المهارات" | "الأقسام">("المهارات")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [editValue, setEditValue] = useState<string>("")
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
//   const [showDeleteConfirmTwo, setShowDeleteConfirmTwo] = useState<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
//   const [selectedTestClass, setSelectedTestClass] = useState<TestClass | null>(null)
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

//   // New function to check if a test class is referenced by skills
//   const isClassReferencedBySkills = (classId: number) => {
//     return skills.some((skill) => skill.testClassId === classId)
//   }

//   // New function to get count of skills that reference a test class
//   const getReferencedSkillsCount = (classId: number) => {
//     return skills.filter((skill) => skill.testClassId === classId).length
//   }

//   const fetchTestClasses = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<TestClass[]>>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch test classes")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
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
//       console.error("Error fetching test classes:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTestClass = async (classId: number) => {
//     try {
//       setDeletingId(classId)
//       const response = await axios.delete(`${BASE_URL}/api/TestClass/DeleteTestClass/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses((prevClasses) => prevClasses.filter((testClass) => testClass.id !== classId))
//         setShowDeleteConfirmTwo(null)
//         setSelectedTestClass(null)
//       } else {
//         setError(response.data.message || "Failed to delete test class")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف القسم"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
//       console.error("Error deleting test class:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClickTwo = (testClass: TestClass) => {
//     setSelectedTestClass(testClass)
//     setShowDeleteConfirmTwo(testClass.id)
//   }

//   const handleConfirmDeleteTwo = () => {
//     if (showDeleteConfirmTwo) {
//       deleteTestClass(showDeleteConfirmTwo)
//     }
//   }

//   const handleCancelDeleteTwo = () => {
//     setShowDeleteConfirmTwo(null)
//     setSelectedTestClass(null)
//   }

//   const handleAddNewClass = () => {
//     router.push("/admin/pages/analysis/addNewTestClass")
//   }

//   const isClassReferenced = (classId: number) => {
//     return referencedClassIds.has(classId)
//   }

//   const getReferencedQuestionsCountTwo = (classId: number) => {
//     return questions.filter((question) => question.skillId === classId).length
//   }

//   useEffect(() => {
//     fetchTestClasses()
//     fetchQuestions()
//   }, [])

//   const fetchQuestions = async () => {
//     try {
//       setQuestionsLoading(true)
//       const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setQuestions(response.data.data)
//         // Extract unique skill IDs that are referenced by questions
//         const skillIds = new Set(
//           response.data.data.map((question) => question.skillId).filter((id) => id !== null && id !== undefined),
//         )
//         setReferencedSkillIds(skillIds)
//       } else {
//         console.error("Failed to fetch questions:", response.data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching questions:", error)
//       // Don't show error to user for questions fetch, as it's supplementary data
//     } finally {
//       setQuestionsLoading(false)
//     }
//   }

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
//               router.push("/admin/login")
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

//   const editSkill = async (skillId: number, newValue: string) => {
//     try {
//       setIsUpdating(true)
//       const response = await axios.put<ApiResponse<boolean>>(
//         `${BASE_URL}/api/Skill/EditSkill`,
//         {
//           id: skillId,
//           value: newValue,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("adminToken")}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         // Update the skill in the state
//         setSkills((prevSkills) =>
//           prevSkills.map((skill) => (skill.id === skillId ? { ...skill, value: newValue } : skill)),
//         )
//         setEditingSkill(null)
//         setEditValue("")
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to update skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء تحديث المهارة"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return editSkill(skillId, newValue)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return editSkill(skillId, newValue)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error updating skill:", error)
//       setError(errorMessage)
//     } finally {
//       setIsUpdating(false)
//     }
//   }

//   const handleEditClick = (skill: Skill) => {
//     setEditingSkill(skill.id)
//     setEditValue(skill.value)
//   }

//   const handleSaveEdit = () => {
//     if (editingSkill && editValue.trim()) {
//       editSkill(editingSkill, editValue.trim())
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingSkill(null)
//     setEditValue("")
//   }

//   const deleteSkill = async (skillId: number) => {
//     try {
//       setDeletingId(skillId)
//       const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         // Remove the deleted skill from the state
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
//         setShowDeleteConfirm(null)
//         setSelectedSkill(null)
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to delete skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف المهارة"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error deleting skill:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClick = (skill: Skill) => {
//     setSelectedSkill(skill)
//     setShowDeleteConfirm(skill.id)
//   }

//   const handleConfirmDelete = () => {
//     if (showDeleteConfirm) {
//       deleteSkill(showDeleteConfirm)
//     }
//   }

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(null)
//     setSelectedSkill(null)
//   }

//   const handleAddNewSkill = () => {
//     router.push("/admin/pages/analysis/addNewSkill")
//   }

//   const isSkillReferenced = (skillId: number) => {
//     return referencedSkillIds.has(skillId)
//   }

//   const getReferencedQuestionsCount = (skillId: number) => {
//     return questions.filter((question) => question.skillId === skillId).length
//   }

//   useEffect(() => {
//     // Fetch both skills and questions
//     fetchSkills()
//     fetchQuestions()
//   }, [])

//   const handleRetry = () => {
//     fetchSkills()
//     fetchTestClasses()
//     fetchQuestions()
//   }

//   // const handleGoBack = () => {
//   //   router.back()
//   // }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                 <div className="flex justify-center">
//                   <svg
//                     className="h-12 w-12 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
//                 <p className="mt-2 text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={handleRetry}
//                   className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                   type="button"
//                 >
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
//         <div className="mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاقسام و المهارات</h1>
//                 <p className="text-gray-600">اهلا بك في صفحة الاقسام و المهارات</p>
//                 {questionsLoading && <p className="text-sm text-blue-600 mt-1">جاري تحميل الأسئلة المرتبطة...</p>}
//               </div>
//               {/* Add New Skill Button */}
//               <div className="flex-shrink-0">
//                 {activeOption === "المهارات" && (
//                   <button
//                     onClick={handleAddNewSkill}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة مهارة جديدة
//                   </button>
//                 )}
//                 {activeOption === "الأقسام" && (
//                   <button
//                     onClick={handleAddNewClass}
//                     className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة قسم جديد
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المهارات" value={skills.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="المهارات المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
//             <MetricCard title="إجمالي الأقسام" value={testClasses.length} icon={Shapes} color="bg-green-500" />
//             <MetricCard title="الأقسام المستخدمة" value={referencedClassIds.size} icon={Tent} color="bg-orange-500" />
//             {/* <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//               <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" /> */}
//           </div>

//           {/* Toggle Buttons */}
//           <div className="w-md mx-auto my-2">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//               <div className="flex relative">
//                 <button
//                   name="المهارات"
//                   onClick={() => {
//                     setActiveOption("المهارات")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المهارات"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المهارات
//                 </button>
//                 <button
//                   name="الأقسام"
//                   onClick={() => {
//                     setActiveOption("الأقسام")
//                   }}
//                   className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "الأقسام"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   الأقسام
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Test Classes Table */}
//           {activeOption === "الأقسام" && (
//             <>
//               {testClasses.length === 0 ? (
//                 <div className="text-center mt-7 py-8 sm:py-12">
//                   <BookOpen className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
//                   <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">لا يوجد أقسام</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد أقسام متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewClass}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus />
//                       <span className="mr-2">إضافة أول قسم</span>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   {/* Mobile Card View */}
//                   <div className="block sm:hidden">
//                     <div className="divide-y divide-gray-200">
//                       {testClasses.map((testClass) => {
//                         const isReferencedByQuestions = isClassReferenced(testClass.id)
//                         const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                         const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                         const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                         const skillsCount = getReferencedSkillsCount(testClass.id)

//                         return (
//                           <div key={testClass.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1 min-w-0">
//                                 <h3 className="text-sm font-medium text-gray-900 truncate">{testClass.value}</h3>
//                                 <div className="mt-1 flex items-center gap-2">
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     ID: {testClass.id}
//                                   </span>
//                                   {testClass.testTypeId && (
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                       Type: {testClass.testTypeId}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 {isReferenced ? (
//                                   <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                     <Lock />
//                                     <span className="mr-1">محمي</span>
//                                   </span>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-1"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </div>

//                   {/* Desktop Table View */}
//                   <div className="hidden sm:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف النوع
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {testClasses.map((testClass, index) => {
//                           const isReferencedByQuestions = isClassReferenced(testClass.id)
//                           const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                           const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                           const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                           const skillsCount = getReferencedSkillsCount(testClass.id)

//                           return (
//                             <tr
//                               key={testClass.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {testClass.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 <div className="max-w-xs truncate" title={testClass.value}>
//                                   {testClass.value}
//                                 </div>
//                                 {/* <input
//                                   type="text"
//                                   value={editValue}
//                                   onChange={(e) => setEditValue(e.target.value)}
//                                   onKeyDown={handleKeyPress}
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                   placeholder="أدخل اسم القسم"
//                                   disabled={isLoading || isUpdating}
//                                  /> */}
               
//                                  {error && (
//                                   <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
//                                     <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
//                                     <span className="text-xs text-red-700">{error}</span>
//                                   </div>
//                                   )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {testClass.testTypeId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {testClass.testTypeId === 1 ? "قدرات" : "تحصيلي"}
//                                   </span>
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock />
//                                       <span className="mr-1">محمي</span>
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-2"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         إجمالي الأقسام: {testClasses.length} | المحمية:{" "}
//                         {
//                           testClasses.filter((tc) => isClassReferenced(tc.id) || isClassReferencedBySkills(tc.id))
//                             .length
//                         }{" "}
//                         | المتاحة للحذف:{" "}
//                         {
//                           testClasses.filter((tc) => !isClassReferenced(tc.id) && !isClassReferencedBySkills(tc.id))
//                             .length
//                         }
//                       </div>
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Skills Table */}
//           {activeOption === "المهارات" && (
//             <>
//               {skills.length === 0 ? (
//                 <div className="text-center mt-7 py-12">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">لا يوجد مهارات</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد مهارات متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewSkill}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus className="h-4 w-4 ml-2" />
//                       إضافة أول مهارة
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف المهارة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم المهارة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {skills.map((skill, index) => {
//                           const isReferenced = isSkillReferenced(skill.id)
//                           const questionsCount = getReferencedQuestionsCount(skill.id)
//                           return (
//                             <tr
//                               key={skill.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {skill.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 {/* <div className="max-w-xs truncate" title={skill.value}>
//                                   {skill.value}
//                                 </div> */}
//                                 {editingSkill === skill.id ? (
//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="text"
//                                     value={editValue} 
//                                     onChange={(e) => setEditValue(e.target.value)}
//                                     className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="اسم المهارة"
//                                     disabled={isUpdating}
//                                   />
//                                 </div>
//                               ) : (
//                                 skill.value
//                               )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {skill.testClassId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {skill.testClassId}
//                                   </span>
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock className="h-3 w-3 mr-1" />
//                                       مستخدمة
//                                     </span>
//                                     <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاحة للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock className="h-3 w-3 mr-1" />
//                                       محمية
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center gap-1">
//                                     {editingSkill === skill.id ? (
//                                       <>
//                                         <button
//                                           onClick={handleSaveEdit}
//                                           disabled={isUpdating || !editValue.trim()}
//                                           className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                           title="حفظ التغييرات"
//                                           type="button"
//                                         >
//                                           {isUpdating ? (
//                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
//                                           ) : (
//                                             <Save className="h-4 w-4" />
//                                           )}
//                                         </button>
//                                         <button
//                                           onClick={handleCancelEdit}
//                                           disabled={isUpdating}
//                                           className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
//                                           title="إلغاء التعديل"
//                                           type="button"
//                                         >
//                                           <X className="h-4 w-4" />
//                                         </button>
//                                       </>
//                                     ) : (
//                                       <>
//                                         <button
//                                           onClick={() => handleEditClick(skill)}
//                                           className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
//                                           title="تعديل المهارة"
//                                           type="button"
//                                         >
//                                           <Edit2 className="h-4 w-4" />
//                                         </button>
//                                         <button
//                                           onClick={() => {
//                                             setSelectedSkill(skill)
//                                             setShowDeleteConfirm(skill.id)
//                                           }}
//                                           disabled={deletingId === skill.id}
//                                           className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
//                                           title="حذف المهارة"
//                                           type="button"
//                                         >
//                                           {deletingId === skill.id ? (
//                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
//                                           ) : (
//                                             <Trash2 className="h-4 w-4" />
//                                           )}
//                                         </button>
//                                       </>
//                                     )}
//                                   </div>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="text-sm text-gray-500">
//                         إجمالي المهارات: {skills.length} | المحمية: {referencedSkillIds.size} | المتاحة للحذف:{" "}
//                         {skills.length - referencedSkillIds.size}
//                       </div>
//                       <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Refresh Button */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleRetry}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               type="button"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//               تحديث المهارات
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modals */}
//       {showDeleteConfirmTwo && selectedTestClass && activeOption === "الأقسام" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDeleteTwo}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف القسم</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف القسم التالي؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم القسم:</span>
//                     <span className="font-medium text-gray-900">{selectedTestClass.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedTestClass.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف النوع:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedTestClass.testTypeId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDeleteTwo}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDeleteTwo}
//                   disabled={deletingId === selectedTestClass.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedTestClass.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && selectedSkill && activeOption === "المهارات" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDelete}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم المهارة:</span>
//                     <span className="font-medium text-gray-900">{selectedSkill.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف المهارة:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedSkill.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedSkill.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDelete}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={deletingId === selectedSkill.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedSkill.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }















"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import Cookies from "js-cookie"
import { BookOpen, Edit2 } from "lucide-react"
import Layout from "@/app/admin/Layout/Layout"
import { Users, Shapes, Tent, Save, AlertCircle, Trash2, Plus, X, Lock } from "lucide-react"

interface Skill {
  id: number
  value: string
  testClassId: number
}

interface TestClass {
  id: number
  value: string
  testTypeId: number
}

interface Question {
  id: string
  value: string
  answer: string
  skillId: number
  choices: Array<{
    id: string
    value: string
  }>
}

interface ApiResponse<T> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function GetAllSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingSkill, setEditingSkill] = useState<number | null>(null)
  const [editingTestClass, setEditingTestClass] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isUpdatingTestClass, setIsUpdatingTestClass] = useState<boolean>(false)
  const [activeOption, setActiveOption] = useState<"المهارات" | "الأقسام">("المهارات")
  const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState<boolean>(true)
  const [testClasses, setTestClasses] = useState<TestClass[]>([])
  const [editValue, setEditValue] = useState<string>("")
  const [editTestClassValue, setEditTestClassValue] = useState<string>("")
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showDeleteConfirmTwo, setShowDeleteConfirmTwo] = useState<number | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedTestClass, setSelectedTestClass] = useState<TestClass | null>(null)
  const [referencedClassIds] = useState<Set<number>>(new Set())
  const router = useRouter()

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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )

  // New function to check if a test class is referenced by skills
  const isClassReferencedBySkills = (classId: number) => {
    return skills.some((skill) => skill.testClassId === classId)
  }

  // New function to get count of skills that reference a test class
  const getReferencedSkillsCount = (classId: number) => {
    return skills.filter((skill) => skill.testClassId === classId).length
  }

  const fetchTestClasses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<ApiResponse<TestClass[]>>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data.succeeded) {
        setTestClasses(response.data.data)
      } else {
        setError(response.data.message || "Failed to fetch test classes")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء جلب البيانات"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchTestClasses()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchTestClasses()
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
      console.error("Error fetching test classes:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const editTestClass = async (classId: number, newValue: string) => {
    try {
      setIsUpdatingTestClass(true)
      const response = await axios.put<ApiResponse<boolean>>(
        `${BASE_URL}/api/TestClass/EditTestClass`,
        {
          id: classId,
          value: newValue,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.succeeded) {
        // Update the test class in the state
        setTestClasses((prevClasses) =>
          prevClasses.map((testClass) => (testClass.id === classId ? { ...testClass, value: newValue } : testClass)),
        )
        setEditingTestClass(null)
        setEditTestClassValue("")
        // You could add a success toast here
      } else {
        setError(response.data.message || "Failed to update test class")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء تحديث القسم"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return editTestClass(classId, newValue)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return editTestClass(classId, newValue)
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
      console.error("Error updating test class:", error)
      setError(errorMessage)
    } finally {
      setIsUpdatingTestClass(false)
    }
  }

  const handleEditTestClassClick = (testClass: TestClass) => {
    setEditingTestClass(testClass.id)
    setEditTestClassValue(testClass.value)
  }

  const handleSaveTestClassEdit = () => {
    if (editingTestClass && editTestClassValue.trim()) {
      editTestClass(editingTestClass, editTestClassValue.trim())
    }
  }

  const handleCancelTestClassEdit = () => {
    setEditingTestClass(null)
    setEditTestClassValue("")
  }

  const deleteTestClass = async (classId: number) => {
    try {
      setDeletingId(classId)
      const response = await axios.delete(`${BASE_URL}/api/TestClass/DeleteTestClass/${classId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data.succeeded) {
        setTestClasses((prevClasses) => prevClasses.filter((testClass) => testClass.id !== classId))
        setShowDeleteConfirmTwo(null)
        setSelectedTestClass(null)
      } else {
        setError(response.data.message || "Failed to delete test class")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء حذف القسم"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return deleteTestClass(classId)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return deleteTestClass(classId)
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
      console.error("Error deleting test class:", error)
      setError(errorMessage)
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteClickTwo = (testClass: TestClass) => {
    setSelectedTestClass(testClass)
    setShowDeleteConfirmTwo(testClass.id)
  }

  const handleConfirmDeleteTwo = () => {
    if (showDeleteConfirmTwo) {
      deleteTestClass(showDeleteConfirmTwo)
    }
  }

  const handleCancelDeleteTwo = () => {
    setShowDeleteConfirmTwo(null)
    setSelectedTestClass(null)
  }

  const handleAddNewClass = () => {
    router.push("/admin/pages/analysis/addNewTestClass")
  }

  const isClassReferenced = (classId: number) => {
    return referencedClassIds.has(classId)
  }

  const getReferencedQuestionsCountTwo = (classId: number) => {
    return questions.filter((question) => question.skillId === classId).length
  }

  useEffect(() => {
    fetchTestClasses()
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setQuestionsLoading(true)
      const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data.succeeded) {
        setQuestions(response.data.data)
        // Extract unique skill IDs that are referenced by questions
        const skillIds = new Set(
          response.data.data.map((question) => question.skillId).filter((id) => id !== null && id !== undefined),
        )
        setReferencedSkillIds(skillIds)
      } else {
        console.error("Failed to fetch questions:", response.data.message)
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
      // Don't show error to user for questions fetch, as it's supplementary data
    } finally {
      setQuestionsLoading(false)
    }
  }

  const fetchSkills = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
              router.push("/admin/login")
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

  const editSkill = async (skillId: number, newValue: string) => {
    try {
      setIsUpdating(true)
      const response = await axios.put<ApiResponse<boolean>>(
        `${BASE_URL}/api/Skill/EditSkill`,
        {
          id: skillId,
          value: newValue,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.succeeded) {
        // Update the skill in the state
        setSkills((prevSkills) =>
          prevSkills.map((skill) => (skill.id === skillId ? { ...skill, value: newValue } : skill)),
        )
        setEditingSkill(null)
        setEditValue("")
        // You could add a success toast here
      } else {
        setError(response.data.message || "Failed to update skill")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء تحديث المهارة"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return editSkill(skillId, newValue)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return editSkill(skillId, newValue)
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
      console.error("Error updating skill:", error)
      setError(errorMessage)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill.id)
    setEditValue(skill.value)
  }

  const handleSaveEdit = () => {
    if (editingSkill && editValue.trim()) {
      editSkill(editingSkill, editValue.trim())
    }
  }

  const handleCancelEdit = () => {
    setEditingSkill(null)
    setEditValue("")
  }

  const deleteSkill = async (skillId: number) => {
    try {
      setDeletingId(skillId)
      const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      if (response.data.succeeded) {
        // Remove the deleted skill from the state
        setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
        setShowDeleteConfirm(null)
        setSelectedSkill(null)
        // You could add a success toast here
      } else {
        setError(response.data.message || "Failed to delete skill")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء حذف المهارة"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return deleteSkill(skillId)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return deleteSkill(skillId)
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
      console.error("Error deleting skill:", error)
      setError(errorMessage)
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteClick = (skill: Skill) => {
    setSelectedSkill(skill)
    setShowDeleteConfirm(skill.id)
  }

  const handleConfirmDelete = () => {
    if (showDeleteConfirm) {
      deleteSkill(showDeleteConfirm)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(null)
    setSelectedSkill(null)
  }

  const handleAddNewSkill = () => {
    router.push("/admin/pages/analysis/addNewSkill")
  }

  const isSkillReferenced = (skillId: number) => {
    return referencedSkillIds.has(skillId)
  }

  const getReferencedQuestionsCount = (skillId: number) => {
    return questions.filter((question) => question.skillId === skillId).length
  }

  useEffect(() => {
    // Fetch both skills and questions
    fetchSkills()
    fetchQuestions()
  }, [])

  const handleRetry = () => {
    fetchSkills()
    fetchTestClasses()
    fetchQuestions()
  }

  // const handleGoBack = () => {
  //   router.back()
  // }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex justify-center">
                  <svg
                    className="h-12 w-12 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
                <p className="mt-2 text-sm text-red-600">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  type="button"
                >
                  إعادة المحاولة
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">الاقسام و المهارات</h1>
                <p className="text-gray-600">اهلا بك في صفحة الاقسام و المهارات</p>
                {questionsLoading && <p className="text-sm text-blue-600 mt-1">جاري تحميل الأسئلة المرتبطة...</p>}
              </div>
              {/* Add New Skill Button */}
              <div className="flex-shrink-0">
                {activeOption === "المهارات" && (
                  <button
                    onClick={handleAddNewSkill}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
                    type="button"
                  >
                    <Plus className="h-5 w-5 ml-2" />
                    إضافة مهارة جديدة
                  </button>
                )}
                {activeOption === "الأقسام" && (
                  <button
                    onClick={handleAddNewClass}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
                    type="button"
                  >
                    <Plus className="h-5 w-5 ml-2" />
                    إضافة قسم جديد
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <MetricCard title="إجمالي المهارات" value={skills.length} icon={Users} color="bg-blue-500" />
            <MetricCard title="المهارات المستخدمة" value={referencedSkillIds.size} icon={Lock} color="bg-red-500" />
            <MetricCard title="إجمالي الأقسام" value={testClasses.length} icon={Shapes} color="bg-green-500" />
            <MetricCard title="الأقسام المستخدمة" value={referencedClassIds.size} icon={Tent} color="bg-orange-500" />
            {/* <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
              <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" /> */}
          </div>

          {/* Toggle Buttons */}
          <div className="max-w-md mx-auto my-2">
            <div className="bg-purple-700 rounded-full p-1 shadow-lg">
              <div className="flex flex-wrap relative">
                <button
                  name="المهارات"
                  onClick={() => {
                    setActiveOption("المهارات")
                  }}
                  className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                    activeOption === "المهارات"
                      ? "text-purple-700 bg-white shadow-md"
                      : "text-white hover:text-purple-100"
                  }`}
                  type="button"
                >
                  المهارات
                </button>
                <button
                  name="الأقسام"
                  onClick={() => {
                    setActiveOption("الأقسام")
                  }}
                  className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                    activeOption === "الأقسام"
                      ? "text-purple-700 bg-white shadow-md"
                      : "text-white hover:text-purple-100"
                  }`}
                  type="button"
                >
                  الأقسام
                </button>
              </div>
            </div>
          </div>

          {/* Test Classes Table */}
          {activeOption === "الأقسام" && (
            <>
              {testClasses.length === 0 ? (
                <div className="text-center mt-7 py-8 sm:py-12">
                  <BookOpen className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                  <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">لا يوجد أقسام</h3>
                  <p className="mt-2 text-sm text-gray-500">لا يوجد أقسام متاحة حالياً.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleAddNewClass}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                      type="button"
                    >
                      <Plus />
                      <span className="mr-2">إضافة أول قسم</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
                  {/* Mobile Card View */}
                  <div className="block sm:hidden">
                    <div className="divide-y divide-gray-200">
                      {testClasses.map((testClass) => {
                        const isReferencedByQuestions = isClassReferenced(testClass.id)
                        const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
                        const isReferenced = isReferencedByQuestions || isReferencedBySkills
                        const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
                        const skillsCount = getReferencedSkillsCount(testClass.id)

                        return (
                          <div key={testClass.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                {editingTestClass === testClass.id ? (
                                  <div className="flex items-center gap-2 mb-2">
                                    <input
                                      type="text"
                                      value={editTestClassValue}
                                      onChange={(e) => setEditTestClassValue(e.target.value)}
                                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="اسم القسم"
                                      disabled={isUpdatingTestClass}
                                    />
                                  </div>
                                ) : (
                                  <h3 className="text-sm font-medium text-gray-900 truncate">{testClass.value}</h3>
                                )}
                                <div className="mt-1 flex items-center gap-2">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    ID: {testClass.id}
                                  </span>
                                  {testClass.testTypeId && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      Type: {testClass.testTypeId}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                {isReferenced ? (
                                  <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      <Lock />
                                      <span className="mr-1">مستخدم</span>
                                    </span>
                                    {questionsCount > 0 && (
                                      <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
                                    )}
                                    {skillsCount > 0 && (
                                      <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    متاح للحذف
                                  </span>
                                )}
                              </div>
                              <div>
                                {isReferenced ? (
                                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
                                    <Lock />
                                    <span className="mr-1">محمي</span>
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    {editingTestClass === testClass.id ? (
                                      <>
                                        <button
                                          onClick={handleSaveTestClassEdit}
                                          disabled={isUpdatingTestClass || !editTestClassValue.trim()}
                                          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                          type="button"
                                        >
                                          {isUpdatingTestClass ? (
                                            <>
                                              <svg
                                                className="animate-spin h-3 w-3 text-green-700 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                              >
                                                <circle
                                                  className="opacity-25"
                                                  cx="12"
                                                  cy="12"
                                                  r="10"
                                                  stroke="currentColor"
                                                  strokeWidth="4"
                                                ></circle>
                                                <path
                                                  className="opacity-75"
                                                  fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                              </svg>
                                              حفظ...
                                            </>
                                          ) : (
                                            <>
                                              <Save />
                                              <span className="mr-1">حفظ</span>
                                            </>
                                          )}
                                        </button>
                                        <button
                                          onClick={handleCancelTestClassEdit}
                                          disabled={isUpdatingTestClass}
                                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50"
                                          type="button"
                                        >
                                          <X />
                                          <span className="mr-1">إلغاء</span>
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => handleEditTestClassClick(testClass)}
                                          className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                          type="button"
                                        >
                                          <Edit2 />
                                          <span className="mr-1">تعديل</span>
                                        </button>
                                        <button
                                          onClick={() => handleDeleteClickTwo(testClass)}
                                          disabled={deletingId === testClass.id}
                                          className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                          type="button"
                                        >
                                          {deletingId === testClass.id ? (
                                            <>
                                              <svg
                                                className="animate-spin h-3 w-3 text-red-700 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                              >
                                                <circle
                                                  className="opacity-25"
                                                  cx="12"
                                                  cy="12"
                                                  r="10"
                                                  stroke="currentColor"
                                                  strokeWidth="4"
                                                ></circle>
                                                <path
                                                  className="opacity-75"
                                                  fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                              </svg>
                                              جاري الحذف...
                                            </>
                                          ) : (
                                            <>
                                              <Trash2 />
                                              <span className="mr-1">حذف</span>
                                            </>
                                          )}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-purple-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            معرف القسم
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            اسم القسم
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            معرف النوع
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            الحالة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {testClasses.map((testClass, index) => {
                          const isReferencedByQuestions = isClassReferenced(testClass.id)
                          const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
                          const isReferenced = isReferencedByQuestions || isReferencedBySkills
                          const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
                          const skillsCount = getReferencedSkillsCount(testClass.id)

                          return (
                            <tr
                              key={testClass.id}
                              className={`hover:bg-gray-50 transition-colors duration-150 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span className="ml-2">id:</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {testClass.id}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {editingTestClass === testClass.id ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={editTestClassValue}
                                      onChange={(e) => setEditTestClassValue(e.target.value)}
                                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="اسم القسم"
                                      disabled={isUpdatingTestClass}
                                    />
                                  </div>
                                ) : (
                                  <div className="max-w-xs truncate" title={testClass.value}>
                                    {testClass.value}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {testClass.testTypeId ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {testClass.testTypeId === 1 ? "قدرات" : "تحصيلي"}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {isReferenced ? (
                                  <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      <Lock />
                                      <span className="mr-1">مستخدم</span>
                                    </span>
                                    {questionsCount > 0 && (
                                      <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
                                    )}
                                    {skillsCount > 0 && (
                                      <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    متاح للحذف
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {isReferenced ? (
                                  <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
                                      <Lock />
                                      <span className="mr-1">محمي</span>
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    {editingTestClass === testClass.id ? (
                                      <>
                                        <button
                                          onClick={handleSaveTestClassEdit}
                                          disabled={isUpdatingTestClass || !editTestClassValue.trim()}
                                          className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          title="حفظ التغييرات"
                                          type="button"
                                        >
                                          {isUpdatingTestClass ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                          ) : (
                                            <Save className="h-4 w-4" />
                                          )}
                                        </button>
                                        <button
                                          onClick={handleCancelTestClassEdit}
                                          disabled={isUpdatingTestClass}
                                          className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
                                          title="إلغاء التعديل"
                                          type="button"
                                        >
                                          <X className="h-4 w-4" />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => handleEditTestClassClick(testClass)}
                                          className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                                          title="تعديل القسم"
                                          type="button"
                                        >
                                          <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteClickTwo(testClass)}
                                          disabled={deletingId === testClass.id}
                                          className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                                          title="حذف القسم"
                                          type="button"
                                        >
                                          {deletingId === testClass.id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                          ) : (
                                            <Trash2 className="h-4 w-4" />
                                          )}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer with Stats */}
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-xs sm:text-sm text-gray-500">
                        إجمالي الأقسام: {testClasses.length} | المحمية:{" "}
                        {
                          testClasses.filter((tc) => isClassReferenced(tc.id) || isClassReferencedBySkills(tc.id))
                            .length
                        }{" "}
                        | المتاحة للحذف:{" "}
                        {
                          testClasses.filter((tc) => !isClassReferenced(tc.id) && !isClassReferencedBySkills(tc.id))
                            .length
                        }
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        آخر تحديث: {new Date().toLocaleDateString("ar-US")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Skills Table */}
          {activeOption === "المهارات" && (
            <>
              {skills.length === 0 ? (
                <div className="text-center mt-7 py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">لا يوجد مهارات</h3>
                  <p className="mt-2 text-sm text-gray-500">لا يوجد مهارات متاحة حالياً.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleAddNewSkill}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                      type="button"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة أول مهارة
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-purple-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            معرف المهارة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            اسم المهارة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            معرف القسم
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            الحالة
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                          >
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {skills.map((skill, index) => {
                          const isReferenced = isSkillReferenced(skill.id)
                          const questionsCount = getReferencedQuestionsCount(skill.id)
                          return (
                            <tr
                              key={skill.id}
                              className={`hover:bg-gray-50 transition-colors duration-150 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span className="ml-2">id:</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {skill.id}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {/* <div className="max-w-xs truncate" title={skill.value}>
                                  {skill.value}
                                </div> */}
                                {editingSkill === skill.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editValue} 
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="اسم المهارة"
                                    disabled={isUpdating}
                                  />
                                </div>
                              ) : (
                                skill.value
                              )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {skill.testClassId ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {skill.testClassId}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {isReferenced ? (
                                  <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      <Lock className="h-3 w-3 mr-1" />
                                      مستخدمة
                                    </span>
                                    <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    متاحة للحذف
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {isReferenced ? (
                                  <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
                                      <Lock className="h-3 w-3 mr-1" />
                                      محمية
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    {editingSkill === skill.id ? (
                                      <>
                                        <button
                                          onClick={handleSaveEdit}
                                          disabled={isUpdating || !editValue.trim()}
                                          className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          title="حفظ التغييرات"
                                          type="button"
                                        >
                                          {isUpdating ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                          ) : (
                                            <Save className="h-4 w-4" />
                                          )}
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          disabled={isUpdating}
                                          className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
                                          title="إلغاء التعديل"
                                          type="button"
                                        >
                                          <X className="h-4 w-4" />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => handleEditClick(skill)}
                                          className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                                          title="تعديل المهارة"
                                          type="button"
                                        >
                                          <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSelectedSkill(skill)
                                            setShowDeleteConfirm(skill.id)
                                          }}
                                          disabled={deletingId === skill.id}
                                          className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                                          title="حذف المهارة"
                                          type="button"
                                        >
                                          {deletingId === skill.id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                          ) : (
                                            <Trash2 className="h-4 w-4" />
                                          )}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* Table Footer with Stats */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        إجمالي المهارات: {skills.length} | المحمية: {referencedSkillIds.size} | المتاحة للحذف:{" "}
                        {skills.length - referencedSkillIds.size}
                      </div>
                      <div className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleDateString("ar-US")}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Refresh Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              type="button"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              تحديث المهارات
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modals */}
      {showDeleteConfirmTwo && selectedTestClass && activeOption === "الأقسام" && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
              <button
                onClick={handleCancelDeleteTwo}
                className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">تأكيد حذف القسم</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف القسم التالي؟</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">اسم القسم:</span>
                    <span className="font-medium text-gray-900">{selectedTestClass.value}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">معرف القسم:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedTestClass.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">معرف النوع:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {selectedTestClass.testTypeId || "-"}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDeleteTwo}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
                  type="button"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleConfirmDeleteTwo}
                  disabled={deletingId === selectedTestClass.id}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  type="button"
                >
                  {deletingId === selectedTestClass.id ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      تأكيد الحذف
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && selectedSkill && activeOption === "المهارات" && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
              <button
                onClick={handleCancelDelete}
                className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">اسم المهارة:</span>
                    <span className="font-medium text-gray-900">{selectedSkill.value}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">معرف المهارة:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedSkill.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">معرف القسم:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {selectedSkill.testClassId || "-"}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
                  type="button"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deletingId === selectedSkill.id}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  type="button"
                >
                  {deletingId === selectedSkill.id ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      تأكيد الحذف
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}





// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import { BookOpen } from "lucide-react"
// import Layout from "@/app/admin/Layout/Layout"
// import { Users, Shapes, Tent, AlertCircle, Trash2, Plus, X, Lock, Edit2, Save } from "lucide-react"

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
//   const [activeOption, setActiveOption] = useState<"المهارات" | "الأقسام">("المهارات")
//   const [referencedSkillIds, setReferencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading, setLoading] = useState<boolean>(true)
//   const [testClasses, setTestClasses] = useState<TestClass[]>([])
//   const [questionsLoading, setQuestionsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<number | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
//   const [showDeleteConfirmTwo, setShowDeleteConfirmTwo] = useState<number | null>(null)
//   const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
//   const [selectedTestClass, setSelectedTestClass] = useState<TestClass | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
//   const router = useRouter()

//   const [editingSkill, setEditingSkill] = useState<number | null>(null)
//   const [editValue, setEditValue] = useState<string>("")
//   const [isUpdating, setIsUpdating] = useState<boolean>(false)

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

//   // New function to check if a test class is referenced by skills
//   const isClassReferencedBySkills = (classId: number) => {
//     return skills.some((skill) => skill.testClassId === classId)
//   }

//   // New function to get count of skills that reference a test class
//   const getReferencedSkillsCount = (classId: number) => {
//     return skills.filter((skill) => skill.testClassId === classId).length
//   }

//   const fetchTestClasses = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<TestClass[]>>(`${BASE_URL}/api/TestClass/GetAllTestClasses`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses(response.data.data)
//       } else {
//         setError(response.data.message || "Failed to fetch test classes")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTestClasses()
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
//       console.error("Error fetching test classes:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTestClass = async (classId: number) => {
//     try {
//       setDeletingId(classId)
//       const response = await axios.delete(`${BASE_URL}/api/TestClass/DeleteTestClass/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setTestClasses((prevClasses) => prevClasses.filter((testClass) => testClass.id !== classId))
//         setShowDeleteConfirmTwo(null)
//         setSelectedTestClass(null)
//       } else {
//         setError(response.data.message || "Failed to delete test class")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف القسم"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteTestClass(classId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "القسم غير موجود أو تم حذفه مسبقاً"
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
//       console.error("Error deleting test class:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClickTwo = (testClass: TestClass) => {
//     setSelectedTestClass(testClass)
//     setShowDeleteConfirmTwo(testClass.id)
//   }

//   const handleConfirmDeleteTwo = () => {
//     if (showDeleteConfirmTwo) {
//       deleteTestClass(showDeleteConfirmTwo)
//     }
//   }

//   const handleCancelDeleteTwo = () => {
//     setShowDeleteConfirmTwo(null)
//     setSelectedTestClass(null)
//   }

//   const handleAddNewClass = () => {
//     router.push("/admin/pages/analysis/addNewTestClass")
//   }

//   const isClassReferenced = (classId: number) => {
//     return referencedClassIds.has(classId)
//   }

//   const getReferencedQuestionsCountTwo = (classId: number) => {
//     return questions.filter((question) => question.skillId === classId).length
//   }

//   useEffect(() => {
//     fetchTestClasses()
//     fetchQuestions()
//   }, [])

//   const fetchQuestions = async () => {
//     try {
//       setQuestionsLoading(true)
//       const response = await axios.get<ApiResponse<Question[]>>(`${BASE_URL}/api/Question/GetAllQuestions`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setQuestions(response.data.data)
//         // Extract unique skill IDs that are referenced by questions
//         const skillIds = new Set(
//           response.data.data.map((question) => question.skillId).filter((id) => id !== null && id !== undefined),
//         )
//         setReferencedSkillIds(skillIds)
//       } else {
//         console.error("Failed to fetch questions:", response.data.message)
//       }
//     } catch (error) {
//       console.error("Error fetching questions:", error)
//       // Don't show error to user for questions fetch, as it's supplementary data
//     } finally {
//       setQuestionsLoading(false)
//     }
//   }

  // const editSkill = async (skillId: number, newValue: string) => {
  //   try {
  //     setIsUpdating(true)
  //     const response = await axios.put<ApiResponse<boolean>>(
  //       `${BASE_URL}/api/Skill/EditSkill`,
  //       {
  //         id: skillId,
  //         value: newValue,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("adminToken")}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     )

  //     if (response.data.succeeded) {
  //       // Update the skill in the state
  //       setSkills((prevSkills) =>
  //         prevSkills.map((skill) => (skill.id === skillId ? { ...skill, value: newValue } : skill)),
  //       )
  //       setEditingSkill(null)
  //       setEditValue("")
  //       // You could add a success toast here
  //     } else {
  //       setError(response.data.message || "Failed to update skill")
  //     }
  //   } catch (error) {
  //     let errorMessage = "حدث خطأ أثناء تحديث المهارة"
  //     const refreshSuccess = await refreshAuthToken()

  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         switch (error.response.status) {
  //           case 401:
  //             if (refreshSuccess) {
  //               return editSkill(skillId, newValue)
  //             }
  //             errorMessage = "Authentication expired. Please log in again."
  //             router.push("/admin/login")
  //             break
  //           case 403:
  //             if (refreshSuccess) {
  //               return editSkill(skillId, newValue)
  //             }
  //             errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
  //             router.push("/admin/login")
  //             break
  //           case 404:
  //             errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
  //     console.error("Error updating skill:", error)
  //     setError(errorMessage)
  //   } finally {
  //     setIsUpdating(false)
  //   }
  // }

  // const handleEditClick = (skill: Skill) => {
  //   setEditingSkill(skill.id)
  //   setEditValue(skill.value)
  // }

  // const handleSaveEdit = () => {
  //   if (editingSkill && editValue.trim()) {
  //     editSkill(editingSkill, editValue.trim())
  //   }
  // }

  // const handleCancelEdit = () => {
  //   setEditingSkill(null)
  //   setEditValue("")
  // }

//   const fetchSkills = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await axios.get<ApiResponse<Skill[]>>(`${BASE_URL}/api/Skill/GetAllSkills`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
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
//               router.push("/admin/login")
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

//   const deleteSkill = async (skillId: number) => {
//     try {
//       setDeletingId(skillId)
//       const response = await axios.delete(`${BASE_URL}/api/Skill/DeleteSkill/${skillId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         // Remove the deleted skill from the state
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId))
//         setShowDeleteConfirm(null)
//         setSelectedSkill(null)
//         // You could add a success toast here
//       } else {
//         setError(response.data.message || "Failed to delete skill")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف المهارة"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteSkill(skillId)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "المهارة غير موجودة أو تم حذفها مسبقاً"
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
//       console.error("Error deleting skill:", error)
//       setError(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   const handleDeleteClick = (skill: Skill) => {
//     setSelectedSkill(skill)
//     setShowDeleteConfirm(skill.id)
//   }

//   const handleConfirmDelete = () => {
//     if (showDeleteConfirm) {
//       deleteSkill(showDeleteConfirm)
//     }
//   }

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(null)
//     setSelectedSkill(null)
//   }

//   const handleAddNewSkill = () => {
//     router.push("/admin/pages/analysis/addNewSkill")
//   }

//   const isSkillReferenced = (skillId: number) => {
//     return referencedSkillIds.has(skillId)
//   }

//   const getReferencedQuestionsCount = (skillId: number) => {
//     return questions.filter((question) => question.skillId === skillId).length
//   }

//   useEffect(() => {
//     // Fetch both skills and questions
//     fetchSkills()
//     fetchQuestions()
//   }, [])

//   const handleRetry = () => {
//     fetchSkills()
//     fetchTestClasses()
//     fetchQuestions()
//   }

//   // const handleGoBack = () => {
//   //   router.back()
//   // }

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-lg text-gray-600">تحميل المهارات...</p>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center">
//               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                 <div className="flex justify-center">
//                   <svg
//                     className="h-12 w-12 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-red-800">خطأ في جلب المهارات</h3>
//                 <p className="mt-2 text-sm text-red-600">{error}</p>
//                 <button
//                   onClick={handleRetry}
//                   className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                   type="button"
//                 >
//                   إعادة المحاولة
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <BookOpen className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">إدارة المهارات والأقسام</h1>
//                   <p className="text-sm text-gray-600 mt-1">إدارة وتنظيم المهارات والأقسام في النظام</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//             <div className="flex flex-col sm:flex-row">
//               <button
//                 onClick={() => setActiveOption("المهارات")}
//                 className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
//                   activeOption === "المهارات"
//                     ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               type="button">
//                 <div className="flex items-center justify-center gap-2">
//                   <Shapes className="h-4 w-4 sm:h-5 sm:w-5" />
//                   المهارات
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveOption("الأقسام")}
//                 className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
//                   activeOption === "الأقسام"
//                     ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               type="button">
//                 <div className="flex items-center justify-center gap-2">
//                   <Users className="h-4 w-4 sm:h-5 sm:w-5" />
//                   الأقسام
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           {activeOption === "المهارات" && (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               {/* Skills Header */}
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">قائمة المهارات</h2>
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                     <button
//                       onClick={fetchSkills}
//                       disabled={loading}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
//                     type="button">
//                       {loading ? "جاري التحديث..." : "تحديث القائمة"}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Skills Content */}
//               <div className="p-4 sm:p-6">
//                 {error && (
//                   <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
//                     <div className="flex items-start gap-3">
//                       <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
//                       <div className="text-sm text-red-700">{error}</div>
//                     </div>
//                   </div>
//                 )}

//                 {loading ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     <p className="mt-4 text-gray-600">جاري تحميل المهارات...</p>
//                   </div>
//                 ) : skills.length === 0 ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <Tent className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 text-sm sm:text-base">لا توجد مهارات متاحة</p>
//                   </div>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b border-gray-200">
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             المعرف
//                           </th>
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             اسم المهارة
//                           </th>
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             معرف القسم
//                           </th>
//                           <th className="text-center py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {skills.map((skill) => (
//                           <tr key={skill.id} className="border-b border-gray-100 hover:bg-gray-50">
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{skill.id}</td>
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">
                              // {editingSkill === skill.id ? (
                              //   <div className="flex items-center gap-2">
                              //     <input
                              //       type="text"
                              //       value={editValue}
                              //       onChange={(e) => setEditValue(e.target.value)}
                              //       className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              //       placeholder="اسم المهارة"
                              //       disabled={isUpdating}
                              //     />
                              //   </div>
                              // ) : (
                              //   skill.value
                              // )}
//                             </td>
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">
//                               {skill.testClassId}
//                             </td>
//                             <td className="py-3 px-2 sm:px-4">
//                               <div className="flex items-center justify-center gap-1 sm:gap-2">
//                                 {editingSkill === skill.id ? (
//                                   <>
//                                     <button
//                                       onClick={handleSaveEdit}
//                                       disabled={isUpdating || !editValue.trim()}
//                                       className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                       title="حفظ التغييرات"
//                                     type="button">
//                                       {isUpdating ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
//                                       ) : (
//                                         <Save className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={handleCancelEdit}
//                                       disabled={isUpdating}
//                                       className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="إلغاء التعديل"
//                                     type="button">
//                                       <X className="h-4 w-4" />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <button
//                                       onClick={() => handleEditClick(skill)}
//                                       className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
//                                       title="تعديل المهارة"
//                                     type="button">
//                                       <Edit2 className="h-4 w-4" />
//                                     </button>
//                                     <button
//                                       onClick={() => {
//                                         setSelectedSkill(skill)
//                                         setShowDeleteConfirm(skill.id)
//                                       }}
//                                       disabled={deletingId === skill.id}
//                                       className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="حذف المهارة"
//                                     type="button">
//                                       {deletingId === skill.id ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
//                                       ) : (
//                                         <Trash2 className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Test Classes Table */}
//           {activeOption === "الأقسام" && (
//             <>
//               {testClasses.length === 0 ? (
//                 <div className="text-center mt-7 py-8 sm:py-12">
//                   <BookOpen className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
//                   <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">لا يوجد أقسام</h3>
//                   <p className="mt-2 text-sm text-gray-500">لا يوجد أقسام متاحة حالياً.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleAddNewClass}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
//                       type="button"
//                     >
//                       <Plus />
//                       <span className="mr-2">إضافة أول قسم</span>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white mt-7 shadow-lg rounded-lg overflow-hidden">
//                   {/* Mobile Card View */}
//                   <div className="block sm:hidden">
//                     <div className="divide-y divide-gray-200">
//                       {testClasses.map((testClass) => {
//                         const isReferencedByQuestions = isClassReferenced(testClass.id)
//                         const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                         const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                         const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                         const skillsCount = getReferencedSkillsCount(testClass.id)

//                         return (
//                           <div key={testClass.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1 min-w-0">
//                                 <h3 className="text-sm font-medium text-gray-900 truncate">{testClass.value}</h3>
//                                 <div className="mt-1 flex items-center gap-2">
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     ID: {testClass.id}
//                                   </span>
//                                   {testClass.testTypeId && (
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                       Type: {testClass.testTypeId}
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 {isReferenced ? (
//                                   <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                     <Lock />
//                                     <span className="mr-1">محمي</span>
//                                   </span>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-1"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </div>

//                   {/* Desktop Table View */}
//                   <div className="hidden sm:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-purple-700">
//                         <tr>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             اسم القسم
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             معرف النوع
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الحالة
//                           </th>
//                           <th
//                             scope="col"
//                             className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
//                           >
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {testClasses.map((testClass, index) => {
//                           const isReferencedByQuestions = isClassReferenced(testClass.id)
//                           const isReferencedBySkills = isClassReferencedBySkills(testClass.id)
//                           const isReferenced = isReferencedByQuestions || isReferencedBySkills
//                           const questionsCount = getReferencedQuestionsCountTwo(testClass.id)
//                           const skillsCount = getReferencedSkillsCount(testClass.id)

//                           return (
//                             <tr
//                               key={testClass.id}
//                               className={`hover:bg-gray-50 transition-colors duration-150 ${
//                                 index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                               }`}
//                             >
//                               <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 <span className="ml-2">id:</span>
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {testClass.id}
//                                 </span>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 <div className="max-w-xs truncate" title={testClass.value}>
//                                   {testClass.value}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {testClass.testTypeId ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                     {testClass.testTypeId === 1 ? "قدرات" : "تحصيلي"}
//                                   </span>
//                                 ) : (
//                                   <span className="text-gray-400">-</span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex flex-col gap-1">
//                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                       <Lock />
//                                       <span className="mr-1">مستخدم</span>
//                                     </span>
//                                     {questionsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{questionsCount} سؤال</span>
//                                     )}
//                                     {skillsCount > 0 && (
//                                       <span className="text-xs text-gray-500">{skillsCount} مهارة</span>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     متاح للحذف
//                                   </span>
//                                 )}
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {isReferenced ? (
//                                   <div className="flex items-center">
//                                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed">
//                                       <Lock />
//                                       <span className="mr-1">محمي</span>
//                                     </span>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleDeleteClickTwo(testClass)}
//                                     disabled={deletingId === testClass.id}
//                                     className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button"
//                                   >
//                                     {deletingId === testClass.id ? (
//                                       <>
//                                         <svg
//                                           className="animate-spin h-3 w-3 text-red-700 ml-2"
//                                           fill="none"
//                                           viewBox="0 0 24 24"
//                                           aria-hidden="true"
//                                         >
//                                           <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                           ></circle>
//                                           <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                           ></path>
//                                         </svg>
//                                         جاري الحذف...
//                                       </>
//                                     ) : (
//                                       <>
//                                         <Trash2 />
//                                         <span className="mr-1">حذف</span>
//                                       </>
//                                     )}
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Stats */}
//                   <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         إجمالي الأقسام: {testClasses.length} | المحمية:{" "}
//                         {
//                           testClasses.filter((tc) => isClassReferenced(tc.id) || isClassReferencedBySkills(tc.id))
//                             .length
//                         }{" "}
//                         | المتاحة للحذف:{" "}
//                         {
//                           testClasses.filter((tc) => !isClassReferenced(tc.id) && !isClassReferencedBySkills(tc.id))
//                             .length
//                         }
//                       </div>
//                       <div className="text-xs sm:text-sm text-gray-500">
//                         آخر تحديث: {new Date().toLocaleDateString("ar-US")}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Skills Table */}
//           {activeOption === "المهارات" && (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               {/* Skills Header */}
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-900">قائمة المهارات</h2>
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                     <button
//                       onClick={fetchSkills}
//                       disabled={loading}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
//                     type="button">
//                       {loading ? "جاري التحديث..." : "تحديث القائمة"}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Skills Content */}
//               <div className="p-4 sm:p-6">
//                 {error && (
//                   <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
//                     <div className="flex items-start gap-3">
//                       <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
//                       <div className="text-sm text-red-700">{error}</div>
//                     </div>
//                   </div>
//                 )}

//                 {loading ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     <p className="mt-4 text-gray-600">جاري تحميل المهارات...</p>
//                   </div>
//                 ) : skills.length === 0 ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <Tent className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 text-sm sm:text-base">لا توجد مهارات متاحة</p>
//                   </div>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b border-gray-200">
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             المعرف
//                           </th>
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             اسم المهارة
//                           </th>
//                           <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             معرف القسم
//                           </th>
//                           <th className="text-center py-3 px-2 sm:px-4 text-sm sm:text-base font-medium text-gray-900">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {skills.map((skill) => (
//                           <tr key={skill.id} className="border-b border-gray-100 hover:bg-gray-50">
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">{skill.id}</td>
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">
//                               {editingSkill === skill.id ? (
//                                 <div className="flex items-center gap-2">
//                                   <input
//                                     type="text"
//                                     value={editValue}
//                                     onChange={(e) => setEditValue(e.target.value)}
//                                     className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="اسم المهارة"
//                                     disabled={isUpdating}
//                                   />
//                                 </div>
//                               ) : (
//                                 skill.value
//                               )}
//                             </td>
//                             <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-900">
//                               {skill.testClassId}
//                             </td>
//                             <td className="py-3 px-2 sm:px-4">
//                               <div className="flex items-center justify-center gap-1 sm:gap-2">
//                                 {editingSkill === skill.id ? (
//                                   <>
//                                     <button
//                                       onClick={handleSaveEdit}
//                                       disabled={isUpdating || !editValue.trim()}
//                                       className="p-1 sm:p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                       title="حفظ التغييرات"
//                                     type="button">
//                                       {isUpdating ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
//                                       ) : (
//                                         <Save className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={handleCancelEdit}
//                                       disabled={isUpdating}
//                                       className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="إلغاء التعديل"
//                                     type="button">
//                                       <X className="h-4 w-4" />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <button
//                                       onClick={() => handleEditClick(skill)}
//                                       className="p-1 sm:p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
//                                       title="تعديل المهارة"
//                                     type="button">
//                                       <Edit2 className="h-4 w-4" />
//                                     </button>
//                                     <button
//                                       onClick={() => {
//                                         setSelectedSkill(skill)
//                                         setShowDeleteConfirm(skill.id)
//                                       }}
//                                       disabled={deletingId === skill.id}
//                                       className="p-1 sm:p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
//                                       title="حذف المهارة"
//                                     type="button">
//                                       {deletingId === skill.id ? (
//                                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
//                                       ) : (
//                                         <Trash2 className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Refresh Button */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleRetry}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               type="button"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//               تحديث المهارات
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modals */}
//       {showDeleteConfirmTwo && selectedTestClass && activeOption === "الأقسام" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDeleteTwo}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف القسم</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف القسم التالي؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم القسم:</span>
//                     <span className="font-medium text-gray-900">{selectedTestClass.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedTestClass.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف النوع:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedTestClass.testTypeId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDeleteTwo}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDeleteTwo}
//                   disabled={deletingId === selectedTestClass.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedTestClass.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && selectedSkill && activeOption === "المهارات" && (
//         <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
//             <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white">
//               <button
//                 onClick={handleCancelDelete}
//                 className="absolute top-4 left-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
//                 type="button"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//               <div className="text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20 mb-4">
//                   <AlertCircle className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-bold">تأكيد حذف المهارة</h3>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600 mb-4">هل أنت متأكد من أنك تريد حذف المهارة التالية؟</p>
//                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">اسم المهارة:</span>
//                     <span className="font-medium text-gray-900">{selectedSkill.value}</span>
//                   </div>
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">معرف المهارة:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {selectedSkill.id}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">معرف القسم:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       {selectedSkill.testClassId || "-"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     <strong>تحذير:</strong> لا يمكن التراجع عن هذا الإجراء بعد التأكيد.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancelDelete}
//                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 border border-gray-300"
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={deletingId === selectedSkill.id}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   type="button"
//                 >
//                   {deletingId === selectedSkill.id ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         aria-hidden="true"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       جاري الحذف...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       تأكيد الحذف
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   )
// }
