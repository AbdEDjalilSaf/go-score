// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import Layout from "@/app/admin/Layout/Layout"
// import { useRouter } from "next/navigation"
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Save, 
//   X, 
//   AlertCircle, 
//   Check, 
//   Loader2, 
//   ArrowRight,
//   BookOpen,
//   Search,
//   MoreVertical
// } from 'lucide-react'
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"

// interface TeacherSpecialty {
//   id: number
//   value: string
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// export default function TeacherSpecialtyManagement() {
//   const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [isAddingNew, setIsAddingNew] = useState<boolean>(false)
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [newSpecialtyValue, setNewSpecialtyValue] = useState<string>("")
//   const [editSpecialtyValue, setEditSpecialtyValue] = useState<string>("")
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  
//   const router = useRouter()

//   // Initial specialties that should always exist
//   const defaultSpecialties: TeacherSpecialty[] = [
//     { id: 0, value: "عام" },
//     { id: 1, value: "رياضيات" },
//     { id: 2, value: "علوم" },
//     { id: 3, value: "لغة عربية" },
//     { id: 4, value: "لغة إنجليزية" },
//     { id: 5, value: "تاريخ" },
//     { id: 6, value: "جغرافيا" },
//   ]

//   useEffect(() => {
//     fetchSpecialties()
//   }, [])

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => setSuccess(null), 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [success])

//   const fetchSpecialties = async () => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       // For now, we'll use the default specialties since the API endpoint for fetching isn't provided
//       // In a real implementation, you would fetch from an API endpoint like `/api/TeacherSpecialty/GetAllSpecialties`
//       await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
//       setSpecialties(defaultSpecialties)
//     } catch (error) {
//       console.error("Error fetching specialties:", error)
//       setError("فشل في تحميل التخصصات")
//       // Fallback to default specialties
//       setSpecialties(defaultSpecialties)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddSpecialty = async () => {
//     if (!newSpecialtyValue.trim()) {
//       setError("يرجى إدخال اسم التخصص")
//       return
//     }

//     setActionLoading("add")
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.post<ApiResponse<number>>(
//         `${BASE_URL}/api/TeacherSpecialty/AddTeacherSpecialty`,
//         {
//           value: newSpecialtyValue.trim()
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )

//       if (response.data.succeeded) {
//         const newSpecialty: TeacherSpecialty = {
//           id: response.data.data,
//           value: newSpecialtyValue.trim()
//         }
//         setSpecialties(prev => [...prev, newSpecialty])
//         setNewSpecialtyValue("")
//         setIsAddingNew(false)
//         setSuccess("تم إضافة التخصص بنجاح")
//         setError(null)
//       } else {
//         throw new Error(response.data.message || "فشل في إضافة التخصص")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ غير معروف"
      
//       if (axios.isAxiosError(error)) {
//         const refreshSuccess = await refreshAuthToken()
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//             case 403:
//               if (refreshSuccess) {
//                 return handleAddSpecialty()
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 400:
//               errorMessage = "بيانات غير صحيحة. يرجى التحقق من المدخلات."
//               break
//             case 409:
//               errorMessage = "التخصص موجود بالفعل"
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }
      
//       console.error("Error adding specialty:", error)
//       setError(errorMessage)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleEditSpecialty = async (id: number) => {
//     if (!editSpecialtyValue.trim()) {
//       setError("يرجى إدخال اسم التخصص")
//       return
//     }

//     setActionLoading(`edit-${id}`)
    
//     try {
//       // Simulate API call for editing specialty
//       // In real implementation, you would call an API endpoint like `/api/TeacherSpecialty/UpdateTeacherSpecialty`
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       setSpecialties(prev => 
//         prev.map(specialty => 
//           specialty.id === id 
//             ? { ...specialty, value: editSpecialtyValue.trim() }
//             : specialty
//         )
//       )
//       setEditingId(null)
//       setEditSpecialtyValue("")
//       setSuccess("تم تحديث التخصص بنجاح")
//       setError(null)
//     } catch (error) {
//       console.error("Error editing specialty:", error)
//       setError("فشل في تحديث التخصص")
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleDeleteSpecialty = async (id: number) => {
//     setActionLoading(`delete-${id}`)
    
//     try {
//       // Simulate API call for deleting specialty
//       // In real implementation, you would call an API endpoint like `/api/TeacherSpecialty/DeleteTeacherSpecialty`
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       setSpecialties(prev => prev.filter(specialty => specialty.id !== id))
//       setShowDeleteConfirm(null)
//       setSuccess("تم حذف التخصص بنجاح")
//       setError(null)
//     } catch (error) {
//       console.error("Error deleting specialty:", error)
//       setError("فشل في حذف التخصص")
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const startEdit = (specialty: TeacherSpecialty) => {
//     setEditingId(specialty.id)
//     setEditSpecialtyValue(specialty.value)
//     setIsAddingNew(false)
//   }

//   const cancelEdit = () => {
//     setEditingId(null)
//     setEditSpecialtyValue("")
//   }

//   const cancelAdd = () => {
//     setIsAddingNew(false)
//     setNewSpecialtyValue("")
//   }

//   const filteredSpecialties = specialties.filter(specialty =>
//     specialty.value.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//             <p className="text-gray-600 text-sm sm:text-base">جاري التحميل...</p>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50" dir="rtl">
//         <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//           <div className="max-w-4xl mx-auto">
//             {/* Header */}
//             <div className="mb-4 sm:mb-6 lg:mb-8">
//               <div className="flex flex-col space-y-3 sm:space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => router.back()}
//                       className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
//                       type="button"
//                     >
//                       <ArrowRight className="h-5 w-5 text-gray-600" />
//                     </button>
//                     <div className="flex-1 min-w-0">
//                       <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-800 mb-1">
//                         إدارة تخصصات المعلمين
//                       </h1>
//                       <p className="text-xs sm:text-sm lg:text-base text-gray-600">
//                         يمكنك إضافة وتعديل وحذف تخصصات المعلمين
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setIsAddingNew(true)
//                       setEditingId(null)
//                       setNewSpecialtyValue("")
//                     }}
//                     disabled={isAddingNew}
//                     className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                     type="button"
//                   >
//                     <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
//                     إضافة تخصص جديد
//                   </button>
//                 </div>
                
//                 {/* Alert Messages */}
//                 {error && (
//                   <div className="flex items-start p-3 sm:p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
//                     <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs sm:text-sm break-words">{error}</p>
//                     </div>
//                     <button
//                       onClick={() => setError(null)}
//                       className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0"
//                       type="button"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}

//                 {success && (
//                   <div className="flex items-start p-3 sm:p-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
//                     <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs sm:text-sm break-words">{success}</p>
//                     </div>
//                     <button
//                       onClick={() => setSuccess(null)}
//                       className="ml-2 text-green-400 hover:text-green-600 flex-shrink-0"
//                       type="button"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Stats Card */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-600 mb-1">إجمالي التخصصات</p>
//                   <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
//                 </div>
//                 <div className="p-3 rounded-full bg-purple-100 flex-shrink-0 ml-4">
//                   <BookOpen className="h-6 w-6 text-purple-600" />
//                 </div>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="البحث في التخصصات..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Specialties List */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//               {/* Add New Specialty Form */}
//               {isAddingNew && (
//                 <div className="p-4 sm:p-6 border-b border-gray-200 bg-purple-50">
//                   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                     <div className="flex-1">
//                       <input
//                         type="text"
//                         placeholder="اسم التخصص الجديد..."
//                         value={newSpecialtyValue}
//                         onChange={(e) => setNewSpecialtyValue(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
//                         className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                         autoFocus
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleAddSpecialty}
//                         disabled={actionLoading === "add" || !newSpecialtyValue.trim()}
//                         className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
//                         type="button"
//                       >
//                         {actionLoading === "add" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Save className="h-4 w-4" />
//                         )}
//                         <span className="hidden sm:inline">حفظ</span>
//                       </button>
//                       <button
//                         onClick={cancelAdd}
//                         disabled={actionLoading === "add"}
//                         className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
//                         type="button"
//                       >
//                         <X className="h-4 w-4" />
//                         <span className="hidden sm:inline">إلغاء</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Specialties List */}
//               {filteredSpecialties.length === 0 ? (
//                 <div className="text-center py-8 sm:py-12 px-4">
//                   <div className="text-gray-400 mb-4">
//                     <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                   </div>
//                   <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
//                     {searchTerm ? "لا توجد نتائج" : "لا توجد تخصصات"}
//                   </h3>
//                   <p className="text-sm sm:text-base text-gray-500">
//                     {searchTerm 
//                       ? `لا توجد تخصصات تطابق "${searchTerm}"`
//                       : "لا توجد تخصصات في الوقت الحالي"
//                     }
//                   </p>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-gray-200">
//                   {filteredSpecialties.map((specialty) => (
//                     <div key={specialty.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
//                       {editingId === specialty.id ? (
//                         // Edit Mode
//                         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//                           <div className="flex-1">
//                             <input
//                               type="text"
//                               value={editSpecialtyValue}
//                               onChange={(e) => setEditSpecialtyValue(e.target.value)}
//                               onKeyPress={(e) => e.key === 'Enter' && handleEditSpecialty(specialty.id)}
//                               className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                             />
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleEditSpecialty(specialty.id)}
//                               disabled={actionLoading === `edit-${specialty.id}` || !editSpecialtyValue.trim()}
//                               className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
//                               type="button"
//                             >
//                               {actionLoading === `edit-${specialty.id}` ? (
//                                 <Loader2 className="h-4 w-4 animate-spin" />
//                               ) : (
//                                 <Save className="h-4 w-4" />
//                               )}
//                               <span className="hidden sm:inline">حفظ</span>
//                             </button>
//                             <button
//                               onClick={cancelEdit}
//                               disabled={actionLoading === `edit-${specialty.id}`}
//                               className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
//                               type="button"
//                             >
//                               <X className="h-4 w-4" />
//                               <span className="hidden sm:inline">إلغاء</span>
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         // View Mode
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center flex-1 min-w-0">
//                             <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3 sm:ml-4">
//                               <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                 <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                               </div>
//                             </div>
//                             <div className="min-w-0 flex-1">
//                               <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                 {specialty.value}
//                               </h3>
//                               <p className="text-xs sm:text-sm text-gray-500">
//                                 رقم التخصص: {specialty.id}
//                               </p>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//                             <button
//                               onClick={() => startEdit(specialty)}
//                               disabled={editingId !== null || isAddingNew}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                               type="button"
//                             >
//                               <Edit2 className="h-4 w-4" />
//                             </button>
                            
//                             {showDeleteConfirm === specialty.id ? (
//                               <div className="flex items-center gap-1">
//                                 <button
//                                   onClick={() => handleDeleteSpecialty(specialty.id)}
//                                   disabled={actionLoading === `delete-${specialty.id}`}
//                                   className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                 >
//                                   {actionLoading === `delete-${specialty.id}` ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <Check className="h-4 w-4" />
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => setShowDeleteConfirm(null)}
//                                   disabled={actionLoading === `delete-${specialty.id}`}
//                                   className="p-2 text-gray-600 hover:bg-gray-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => setShowDeleteConfirm(specialty.id)}
//                                 disabled={editingId !== null || isAddingNew}
//                                 className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                 type="button"
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Delete Confirmation Message */}
//                       {showDeleteConfirm === specialty.id && (
//                         <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//                           <p className="text-sm text-red-600">
//                             هل أنت متأكد من حذف التخصص "{specialty.value}"؟ لا يمكن التراجع عن هذا الإجراء.
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }











"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "@/app/admin/Layout/Layout"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  AlertCircle, 
  Check, 
  Loader2, 
  ArrowRight,
  BookOpen,
  Search,
} from 'lucide-react'
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import Cookies from "js-cookie"

interface TeacherSpecialty {
  id: number
  value: string
}

interface ApiResponse<T> {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: T
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export default function TeacherSpecialtyManagement() {
  const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newSpecialtyValue, setNewSpecialtyValue] = useState<string>("")
  const [editSpecialtyValue, setEditSpecialtyValue] = useState<string>("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  
  const router = useRouter()

  // Initial specialties that should always exist
//   const defaultSpecialties: TeacherSpecialty[] = [
//     { id: 0, value: "عام" },
//     { id: 1, value: "رياضيات" },
//     { id: 2, value: "علوم" },
//     { id: 3, value: "لغة عربية" },
//     { id: 4, value: "لغة إنجليزية" },
//     { id: 5, value: "تاريخ" },
//     { id: 6, value: "جغرافيا" },
//   ]

  useEffect(() => {
    fetchSpecialties()
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const fetchSpecialties = async () => {
    setLoading(true)
    setError(null)
    const token = Cookies.get("adminToken")
    
    try {
      const response = await axios.get<ApiResponse<TeacherSpecialty[]>>(
        `${BASE_URL}/api/TeacherSpecialty/GetAllTeacherSpecialties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (response.data.succeeded) {
        setSpecialties(response.data.data)
        console.log("response ++++++",response.data.data)
      } else {
        throw new Error(response.data.message || "فشل في تحميل التخصصات")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ غير معروف"
      
      if (axios.isAxiosError(error)) {
        const refreshSuccess = await refreshAuthToken()
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              if (refreshSuccess) {
                return fetchSpecialties()
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "لم يتم العثور على نقطة النهاية للتخصصات"
              break
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت."
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }
      
      console.error("Error fetching specialties:", error)
      setError(errorMessage)
      // Fallback to default specialties
    //   setSpecialties(defaultSpecialties)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSpecialty = async () => {
    if (!newSpecialtyValue.trim()) {
      setError("يرجى إدخال اسم التخصص")
      return
    }

    setActionLoading("add")
    const token = Cookies.get("adminToken")

    try {
      const response = await axios.post<ApiResponse<number>>(
        `${BASE_URL}/api/TeacherSpecialty/AddTeacherSpecialty`,
        {
          value: newSpecialtyValue.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (response.data.succeeded) {
        const newSpecialty: TeacherSpecialty = {
          id: response.data.data,
          value: newSpecialtyValue.trim()
        }
        setSpecialties(prev => [...prev, newSpecialty])
        setNewSpecialtyValue("")
        setIsAddingNew(false)
        setSuccess("تم إضافة التخصص بنجاح")
        setError(null)
      } else {
        throw new Error(response.data.message || "فشل في إضافة التخصص")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ غير معروف"
      
      if (axios.isAxiosError(error)) {
        const refreshSuccess = await refreshAuthToken()
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              if (refreshSuccess) {
                return handleAddSpecialty()
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
              router.push("/admin/login")
              break
            case 400:
              errorMessage = "بيانات غير صحيحة. يرجى التحقق من المدخلات."
              break
            case 409:
              errorMessage = "التخصص موجود بالفعل"
              break
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت."
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }
      
      console.error("Error adding specialty:", error)
      setError(errorMessage)
    } finally {
      setActionLoading(null)
    }
  }

  const handleEditSpecialty = async (id: number) => {
    if (!editSpecialtyValue.trim()) {
      setError("يرجى إدخال اسم التخصص")
      return
    }

    setActionLoading(`edit-${id}`)
    
    try {
      // Simulate API call for editing specialty
      // In real implementation, you would call an API endpoint like `/api/TeacherSpecialty/UpdateTeacherSpecialty`
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSpecialties(prev => 
        prev.map(specialty => 
          specialty.id === id 
            ? { ...specialty, value: editSpecialtyValue.trim() }
            : specialty
        )
      )
      setEditingId(null)
      setEditSpecialtyValue("")
      setSuccess("تم تحديث التخصص بنجاح")
      setError(null)
    } catch (error) {
      console.error("Error editing specialty:", error)
      setError("فشل في تحديث التخصص")
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteSpecialty = async (id: number) => {
    setActionLoading(`delete-${id}`)
    const token = Cookies.get("adminToken")
    try {
      // Simulate API call for deleting specialty
      // In real implementation, you would call an API endpoint like `/api/TeacherSpecialty/DeleteTeacherSpecialty`
      const response = await axios.delete<ApiResponse<number>>(
        `${BASE_URL}/api/TeacherSpecialty/DeleteTeacherSpecialty/${id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        }
      )

      if (response.data.succeeded) {
       
        setSpecialties(prev => prev.filter(specialty => specialty.id !== id))
        setShowDeleteConfirm(null)
        setSuccess("تم حذف التخصص بنجاح")
        setError(null)
      } else {
        throw new Error(response.data.message || "فشل في حذف التخصص")
      }
    } catch (error) {
        let errorMessage = "حدث خطأ غير معروف"
      
        if (axios.isAxiosError(error)) {
          const refreshSuccess = await refreshAuthToken()
          if (error.response) {
            switch (error.response.status) {
              case 401:
              case 403:
                if (refreshSuccess) {
                  return handleDeleteSpecialty(id)
                }
                errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
                router.push("/admin/login")
                break
              case 400:
                errorMessage = "بيانات غير صحيحة. يرجى التحقق من المدخلات."
                break
            
              case 409:
                errorMessage = "التخصص موجود بالفعل"
                break
              case 500:
                errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
                break
              default:
                errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
            }
          } else if (error.request) {
            errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت."
          } else {
            errorMessage = `خطأ في الطلب: ${error.message}`
          }
        } else {
          errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
        }
        
        console.error("Error adding specialty:", error)
        setError(errorMessage)
      } finally {
        setActionLoading(null)
      }
  }

  const startEdit = (specialty: TeacherSpecialty) => {
    setEditingId(specialty.id)
    setEditSpecialtyValue(specialty.value)
    setIsAddingNew(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditSpecialtyValue("")
  }

  const cancelAdd = () => {
    setIsAddingNew(false)
    setNewSpecialtyValue("")
  }

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">جاري التحميل...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.back()}
                      className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                      type="button"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-800 mb-1">
                        إدارة تخصصات المعلمين
                      </h1>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                        يمكنك إضافة وتعديل وحذف تخصصات المعلمين
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsAddingNew(true)
                      setEditingId(null)
                      setNewSpecialtyValue("")
                    }}
                    disabled={isAddingNew}
                    className="inline-flex items-center ml-4 lg:ml-0 px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    إضافة تخصص جديد
                  </button>
                </div>
                
                {/* Alert Messages */}
                {error && (
                  <div className="flex items-start p-3 sm:p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm break-words">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {success && (
                  <div className="flex items-start p-3 sm:p-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm break-words">{success}</p>
                    </div>
                    <button
                      onClick={() => setSuccess(null)}
                      className="ml-2 text-green-400 hover:text-green-600 flex-shrink-0"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 mb-1">إجمالي التخصصات</p>
                  <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 flex-shrink-0 ml-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="البحث في التخصصات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Specialties List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Add New Specialty Form */}
              {isAddingNew && (
                <div className="p-4 sm:p-6 border-b border-gray-200 bg-purple-50">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="اسم التخصص الجديد..."
                        value={newSpecialtyValue}
                        onChange={(e) => setNewSpecialtyValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddSpecialty}
                        disabled={actionLoading === "add" || !newSpecialtyValue.trim()}
                        className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
                        type="button"
                      >
                        {actionLoading === "add" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">حفظ</span>
                      </button>
                      <button
                        onClick={cancelAdd}
                        disabled={actionLoading === "add"}
                        className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                        <span className="hidden sm:inline">إلغاء</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Specialties List */}
              {filteredSpecialties.length === 0 ? (
                <div className="text-center py-8 sm:py-12 px-4">
                  <div className="text-gray-400 mb-4">
                    <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "لا توجد نتائج" : "لا توجد تخصصات"}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    {searchTerm 
                      ? `لا توجد تخصصات تطابق "${searchTerm}"`
                      : "لا توجد تخصصات في الوقت الحالي"
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredSpecialties.map((specialty) => (
                    <div key={specialty.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                      {editingId === specialty.id ? (
                        // Edit Mode
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={editSpecialtyValue}
                              onChange={(e) => setEditSpecialtyValue(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleEditSpecialty(specialty.id)}
                              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSpecialty(specialty.id)}
                              disabled={actionLoading === `edit-${specialty.id}` || !editSpecialtyValue.trim()}
                              className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
                              type="button"
                            >
                              {actionLoading === `edit-${specialty.id}` ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                              <span className="hidden sm:inline">حفظ</span>
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={actionLoading === `edit-${specialty.id}`}
                              className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex-shrink-0"
                              type="button"
                            >
                              <X className="h-4 w-4" />
                              <span className="hidden sm:inline">إلغاء</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3 sm:ml-4">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                {specialty.value}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-500">
                                رقم التخصص: {specialty.id}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                            <button
                              onClick={() => startEdit(specialty)}
                              disabled={editingId !== null || isAddingNew}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              type="button"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            
                            {showDeleteConfirm === specialty.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteSpecialty(specialty.id)}
                                  disabled={actionLoading === `delete-${specialty.id}`}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                >
                                  {actionLoading === `delete-${specialty.id}` ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(null)}
                                  disabled={actionLoading === `delete-${specialty.id}`}
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowDeleteConfirm(specialty.id)}
                                disabled={editingId !== null || isAddingNew}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                type="button"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Delete Confirmation Message */}
                      {showDeleteConfirm === specialty.id && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-600">
                            هل أنت متأكد من حذف التخصص "{specialty.value}"؟ لا يمكن التراجع عن هذا الإجراء.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}