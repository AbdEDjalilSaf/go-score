// "use client"
// import type React from "react"
// import { useState, useEffect } from "react"
// import Layout from "../../Layout/Layout"
// import {
//   Users,
//   TrendingUp,
//   GraduationCap,
//   BookOpenText,
//   AlertCircle,
//   Loader2,
//   Mail,
//   Phone,
//   Calendar,
// } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const Students: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")

//   const router = useRouter();

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       // Refresh auth token before making the request
//       await refreshAuthToken()

//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetAllStudents`,
//         {
//             headers: {
//                 Authorization: `Bearer ${Cookies.get("adminToken")}`,
//                 "Content-Type": "application/json"
//             }
//         }
//       )

//       if (response.data.succeeded) {
//         setStudents(response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()

//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchStudents()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchStudents()
//                 }
//                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                 console.log("errorMessage",errorMessage);
//                 router.push("/admin/login")
//                 break;
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
//      } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
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

//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
//     return fullName.includes(searchTerm.toLowerCase())
//   })

//   return (
//     <Layout>
//     <div className="min-h-screen bg-gray-50 p-4 md:p-3">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">المستخدمون</h1>
//           <p className="text-gray-600 text-sm md:text-base">اهلا في  الرئيسية الخاصة بك</p>
//         </div>

//         {/* Metrics Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//           <MetricCard title="إجمالي المستخدمين" value={filteredStudents.length} icon={Users} color="bg-blue-500" />
//           <MetricCard title="الطلاب النشطون" value={students.length} icon={GraduationCap} color="bg-green-500" />
//           <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//           <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//         </div>

//         {/* Students Table */}
//         <div className="bg-white rounded-lg shadow-md border border-gray-200">
//           <div className="px-4 md:px-6 py-4 border-b border-gray-200">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 قائمة المستخدمين
//               </h2>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="البحث بالاسم الكامل..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-right"
//                 />
//                 <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               </div>
//             </div>
//           </div>

//           <div className="p-4 md:p-6">
//             {loading ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="flex items-center gap-3 text-gray-600">
//                   <Loader2 className="h-6 w-6 animate-spin" />
//                   <span>جاري تحميل البيانات...</span>
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="text-center">
//                   <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//                   <p className="text-red-600 mb-4">{error}</p>
//                   <button
//                     onClick={fetchStudents}
//                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     type="button"
//                   >
//                     إعادة المحاولة
//                   </button>
//                 </div>
//               </div>
//             ) : filteredStudents.length === 0 ? (
//               <div className="text-center py-12">
//                 <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">
//                   {searchTerm ? `لا توجد نتائج للبحث "${searchTerm}"` : "لا توجد بيانات المستخدمين متاحة"}
//                 </p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                     type="button"
//                   >
//                     مسح البحث
//                   </button>
//                 )}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الاسم الكامل</th>
//                       <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
//                         البريد الإلكتروني
//                       </th>
//                       <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                         رقم الواتساب
//                       </th>
//                       <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                         تاريخ التسجيل
//                       </th>
//                       {/* <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الإجراءات</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredStudents.map((student, index) => (
//                       <tr
//                         key={student.id}
//                         className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                           index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                         }`}
//                       >
//                         <td className="py-4 px-2 md:px-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                               <span className="text-blue-600 font-medium text-sm">
//                                 {student.firstName.charAt(0)}
//                                 {student.lastName.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900 text-sm md:text-base">
//                                 {student.firstName} {student.lastName}
//                               </p>
//                               <div className="sm:hidden">
//                                 <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                   <Mail className="h-3 w-3" />
//                                   {student.email}
//                                 </p>
//                                 {student.whatsUpNumber && (
//                                   <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                     <Phone className="h-3 w-3" />
//                                     {student.whatsUpNumber}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
//                           <div className="flex items-center gap-2">
//                             <Mail className="h-4 w-4 text-gray-400" />
//                             <span className="text-sm text-gray-600">{student.email}</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-2 md:px-4 hidden md:table-cell">
//                           <div className="flex items-center gap-2">
//                             <Phone className="h-4 w-4 text-gray-400" />
//                             <span className="text-sm text-gray-600">{student.whatsUpNumber || "غير متوفر"}</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4 text-gray-400" />
//                             <span className="text-sm text-gray-600">{formatDate(student.createdAt)}</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-2 md:px-4">
//                           <div className="flex items-center gap-2">
//                             {/* <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" type="button">
//                               <Mail className="h-4 w-4" />
//                             </button>
//                             <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" type="button">
//                               <Phone className="h-4 w-4" />
//                             </button> */}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   )
// }

// export default Students









// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Layout from "../../Layout/Layout"
// import {
//   Users,
//   TrendingUp,
//   GraduationCap,
//   BookOpenText,
//   AlertCircle,
//   Loader2,
//   Mail,
//   Phone,
//   Calendar,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const Students: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)
//   const router = useRouter()
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       // Refresh auth token before making the request
//       await refreshAuthToken()
//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetAllStudents`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setStudents(response.data.data)
//         console.log("students", response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchStudents()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchStudents()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const handleShowDetails = (student: Student) => {
//     console.log("Show details for:", student)
//     // Implement show details logic here
//     setOpenDropdown(null)
//   }

//   const handleEdit = (student: Student) => {
//     console.log("Edit student:", student)
//     // Implement edit logic here
//     setOpenDropdown(null)
//   }

//   const handleDelete = (student: Student) => {
//     console.log("Delete student:", student)
//     // Implement delete logic here
//     if (window.confirm(`هل أنت متأكد من حذف الطالب ${student.firstName} ${student.lastName}؟`)) {
//       // Add delete API call here
//     }
//     setOpenDropdown(null)
//   }

//   const toggleDropdown = (studentId: string) => {
//     setOpenDropdown(openDropdown === studentId ? null : studentId)
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

//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
//     return fullName.includes(searchTerm.toLowerCase())
//   })

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 p-4 md:p-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">المستخدمون</h1>
//             <p className="text-gray-600 text-sm md:text-base">اهلا في الرئيسية الخاصة بك</p>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المستخدمين" value={filteredStudents.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="الطلاب النشطون" value={students.length} icon={GraduationCap} color="bg-green-500" />
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//           </div>

//           {/* Students Table */}
//           <div className="bg-white rounded-lg shadow-md border border-gray-200">
//             <div className="px-4 md:px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                   <Users className="h-5 w-5" />
//                   قائمة المستخدمين
//                 </h2>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="البحث بالاسم الكامل..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-right"
//                   />
//                   <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 md:p-6">
//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                     <span>جاري تحميل البيانات...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="text-center">
//                     <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button
//                       onClick={fetchStudents}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       type="button"
//                     >
//                       إعادة المحاولة
//                     </button>
//                   </div>
//                 </div>
//               ) : filteredStudents.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">
//                     {searchTerm ? `لا توجد نتائج للبحث "${searchTerm}"` : "لا توجد بيانات المستخدمين متاحة"}
//                   </p>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                       type="button"
//                     >
//                       مسح البحث
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الاسم الكامل</th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                           رقم الواتساب
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                           تاريخ التسجيل
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الإجراءات</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredStudents.map((student, index) => (
//                         <tr
//                           key={student.id}
//                           className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                           }`}
//                         >
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <span className="text-blue-600 font-medium text-sm">
//                                   {student.firstName.charAt(0)}
//                                   {student.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900 text-sm md:text-base">
//                                   {student.firstName} {student.lastName}
//                                 </p>
//                                 <div className="sm:hidden">
//                                   <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                     <Mail className="h-3 w-3" />
//                                     {student.email}
//                                   </p>
//                                   {student.whatsUpNumber && (
//                                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                       <Phone className="h-3 w-3" />
//                                       {student.whatsUpNumber}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.email}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden md:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.whatsUpNumber || "غير متوفر"}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{formatDate(student.createdAt)}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="relative" ref={dropdownRef}>
//                               <button
//                                 onClick={() => toggleDropdown(student.id)}
//                                 className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                                 type="button"
//                               >
//                                 <MoreVertical className="h-4 w-4" />
//                               </button>

//                               {openDropdown === student.id && (
//                                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                                   <div className="py-1">
//                                     <button
//                                       onClick={() => handleShowDetails(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Eye className="h-4 w-4 text-blue-500" />
//                                       عرض التفاصيل
//                                     </button>
//                                     <button
//                                       onClick={() => handleEdit(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Edit className="h-4 w-4 text-green-500" />
//                                       تعديل
//                                     </button>
//                                     <button
//                                       onClick={() => handleDelete(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Trash2 className="h-4 w-4 text-red-500" />
//                                       حذف
//                                     </button>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Students








// "use client"
// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Layout from "../../Layout/Layout"
// import {
//   Users,
//   TrendingUp,
//   GraduationCap,
//   BookOpenText,
//   AlertCircle,
//   Loader2,
//   Mail,
//   Phone,
//   Calendar,
//   MoreVertical,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"
// import ArabicToggle from "./arabicToggle"
// import { useRouter } from "next/navigation"

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// interface DeleteResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const Students: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const router = useRouter()
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       // Refresh auth token before making the request
//       await refreshAuthToken()

//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetAllStudents`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setStudents(response.data.data)
//         console.log("students", response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchStudents()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchStudents()
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

//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteStudent = async (studentId: string) => {
//     console.log("before start delete")
//     try {
//       setDeletingId(studentId)
//       // Refresh auth token before making the request
//       console.log("start delete")
//       await refreshAuthToken()

//       const response = await axios.delete<DeleteResponse>(`${BASE_URL}/api/Student/DeleteStudent/${studentId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       console.log("middle delete")

//       if (response.data.succeeded) {
//         // Remove the deleted student from the local state
//         setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId))
//       console.log("Done delete")
//         // Show success message (you can replace this with a toast notification)
//         alert(response.data.message || "تم حذف الطالب بنجاح")
//       } else {
//         // Handle API error response
//         const errorMessage =
//           response.data.errors?.length > 0
//             ? response.data.errors.join(", ")
//             : response.data.message || "فشل في حذف الطالب"
//         alert(errorMessage)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف الطالب"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteStudent(studentId)
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteStudent(studentId)
//               }
//               errorMessage = "ليس لديك صلاحية لحذف هذا الطالب"
//               break
//             case 404:
//               errorMessage = "الطالب غير موجود أو تم حذفه مسبقاً"
//               // Remove from local state if it was already deleted
//               setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId))
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.data?.message || error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error deleting student:", error)
//       alert(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const handleShowDetails = (student: Student) => {
//     console.log("Show details for:", student)
//     // Implement show details logic here
//     setOpenDropdown(null)
//   }

//   const handleEdit = (student: Student) => {
//     console.log("Edit student:", student)
//     // Implement edit logic here
//     setOpenDropdown(null)
//   }

// const handleDelete = async (student: Student) => {
//     console.log("Delete student:", student)

//     // Show confirmation dialog
//     const confirmed = window.confirm(
//       `هل أنت متأكد من حذف الطالب ${student.firstName} ${student.lastName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
//     )
//     console.log("confirmed", confirmed)

//     if (confirmed) {
//       await deleteStudent(student.id)
//     }

//     setOpenDropdown(null)
//   }

//   const toggleDropdown = (studentId: string) => {
//     setOpenDropdown(openDropdown === studentId ? null : studentId)
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

//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
//     return fullName.includes(searchTerm.toLowerCase())
//   })

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 p-4 md:p-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">المستخدمون</h1>
//             <p className="text-gray-600 text-sm md:text-base">اهلا في الرئيسية الخاصة بك</p>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المستخدمين" value={filteredStudents.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="الطلاب النشطون" value={students.length} icon={GraduationCap} color="bg-green-500" />
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//           </div>

//             <ArabicToggle />

//           {/* Students Table */}
//           <div className="bg-white rounded-lg shadow-md border border-gray-200">
//             <div className="px-4 md:px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                   <Users className="h-5 w-5" />
//                   قائمة المستخدمين
//                 </h2>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="البحث بالاسم الكامل..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-right"
//                   />
//                   <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 md:p-6">
//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                     <span>جاري تحميل البيانات...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="text-center">
//                     <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button
//                       onClick={fetchStudents}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       type="button"
//                     >
//                       إعادة المحاولة
//                     </button>
//                   </div>
//                 </div>
//               ) : filteredStudents.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">
//                     {searchTerm ? `لا توجد نتائج للبحث "${searchTerm}"` : "لا توجد بيانات المستخدمين متاحة"}
//                   </p>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                       type="button"
//                     >
//                       مسح البحث
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الاسم الكامل</th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                           رقم الواتساب
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                           تاريخ التسجيل
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الإجراءات</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredStudents.map((student, index) => (
//                         <tr
//                           key={student.id}
//                           className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                           }`}
//                         >
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <span className="text-blue-600 font-medium text-sm">
//                                   {student.firstName.charAt(0)}
//                                   {student.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900 text-sm md:text-base">
//                                   {student.firstName} {student.lastName}
//                                 </p>
//                                 <div className="sm:hidden">
//                                   <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                     <Mail className="h-3 w-3" />
//                                     {student.email}
//                                   </p>
//                                   {student.whatsUpNumber && (
//                                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                       <Phone className="h-3 w-3" />
//                                       {student.whatsUpNumber}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.email}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden md:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.whatsUpNumber || "غير متوفر"}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{formatDate(student.createdAt)}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="relative" ref={dropdownRef}>
//                               <button
//                                 onClick={() => toggleDropdown(student.id)}
//                                 className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
//                                 type="button"
//                                 disabled={deletingId === student.id}
//                               >
//                                 {deletingId === student.id ? (
//                                   <Loader2 className="h-4 w-4 animate-spin" />
//                                 ) : (
//                                   <MoreVertical className="h-4 w-4" />
//                                 )}
//                               </button>
//                               {openDropdown === student.id && deletingId !== student.id && (
//                                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                                   <div className="py-1">
//                                     <button
//                                       onClick={() => handleShowDetails(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Eye className="h-4 w-4 text-blue-500" />
//                                       عرض التفاصيل
//                                     </button>
//                                     <button
//                                       onClick={() => handleEdit(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Edit className="h-4 w-4 text-green-500" />
//                                       تعديل
//                                     </button>
//                                     <button
//                                       onClick={() => handleDelete(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Trash2 className="h-4 w-4 text-red-500" />
//                                       حذف
//                                     </button>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Students













// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Layout from "../../Layout/Layout"
// import {
//   Users,
//   TrendingUp,
//   GraduationCap,
//   BookOpenText,
//   AlertCircle,
//   Loader2,
//   Mail,
//   Phone,
//   Calendar,
//   MoreVertical,
// } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"
// import ArabicToggle from "./arabicToggle"
// import { useRouter } from "next/navigation"

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// interface DeleteResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const Students: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const router = useRouter()
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       // Refresh auth token before making the request
//       await refreshAuthToken()
//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetAllStudents`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       if (response.data.succeeded) {
//         setStudents(response.data.data)
//         console.log("students", response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchStudents()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchStudents()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteStudent = async (studentId: string) => {
//     console.log("before start delete")
//     try {
//       setDeletingId(studentId)
//       // Refresh auth token before making the request
//       console.log("start delete")
//       await refreshAuthToken()
//       const response = await axios.delete<DeleteResponse>(`${BASE_URL}/api/Student/DeleteStudent/${studentId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       console.log("middle delete")
//       if (response.data.succeeded) {
//         // Remove the deleted student from the local state
//         setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId))
//         console.log("Done delete")
//         // Show success message (you can replace this with a toast notification)
//         alert(response.data.message || "تم حذف الطالب بنجاح")
//       } else {
//         // Handle API error response
//         const errorMessage =
//           response.data.errors?.length > 0
//             ? response.data.errors.join(", ")
//             : response.data.message || "فشل في حذف الطالب"
//         alert(errorMessage)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف الطالب"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteStudent(studentId)
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteStudent(studentId)
//               }
//               errorMessage = "ليس لديك صلاحية لحذف هذا الطالب"
//               break
//             case 404:
//               errorMessage = "الطالب غير موجود أو تم حذفه مسبقاً"
//               // Remove from local state if it was already deleted
//               setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId))
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.data?.message || error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }
//       console.error("Error deleting student:", error)
//       alert(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [])

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const handleShowDetails = (student: Student) => {
//     console.log("Show details for:")
//     // Navigate to student details page
//     router.push(`/admin/pages/users/${student.id}`)
//     setOpenDropdown(null)
//   }

//   const handleEdit = (student: Student) => {
//     console.log("Edit student:", student)
//     // Implement edit logic here
//     setOpenDropdown(null)
//   }

// //   const handleDelete = async (student: Student) => {
// //     console.log("Delete student:", student)
// //     // Show confirmation dialog
// //     const confirmed = window.confirm(
// //       `هل أنت متأكد من حذف الطالب ${student.firstName} ${student.lastName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
// //     )
// //     console.log("confirmed", confirmed)
// //     if (confirmed) {
// //       await deleteStudent(student.id)
// //     }
// //     setOpenDropdown(null)
// //   }

//   const toggleDropdown = (studentId: string) => {
//     router.push(`/admin/pages/users/${studentId}`)
//     // setOpenDropdown(openDropdown === studentId ? null : studentId)
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

//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
//     return fullName.includes(searchTerm.toLowerCase())
//   })

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 p-4 md:p-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">المستخدمون</h1>
//             <p className="text-gray-600 text-sm md:text-base">اهلا في المستخدمين الخاصة بك</p>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard title="إجمالي المستخدمين" value={filteredStudents.length} icon={Users} color="bg-blue-500" />
//             <MetricCard title="الطلاب النشطون" value={students.length} icon={GraduationCap} color="bg-green-500" />
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//             <MetricCard title="المبيعات اليوم" value="1,234" icon={TrendingUp} color="bg-orange-500" />
//           </div>

//           <ArabicToggle />

//           {/* Students Table */}
//           <div className="bg-white rounded-lg shadow-md border border-gray-200">
//             <div className="px-4 md:px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                   <Users className="h-5 w-5" />
//                   قائمة المستخدمين
//                 </h2>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="البحث بالاسم الكامل..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-right"
//                   />
//                   <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 </div>
//               </div>
//             </div>
//             <div className="p-4 md:p-6">
//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                     <span>جاري تحميل البيانات...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="text-center">
//                     <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button
//                       onClick={fetchStudents}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       type="button"
//                     >
//                       إعادة المحاولة
//                     </button>
//                   </div>
//                 </div>
//               ) : filteredStudents.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600">
//                     {searchTerm ? `لا توجد نتائج للبحث "${searchTerm}"` : "لا توجد بيانات المستخدمين متاحة"}
//                   </p>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
//                       type="button"
//                     >
//                       مسح البحث
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الاسم الكامل</th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                           رقم الواتساب
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                           تاريخ التسجيل
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الإجراءات</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredStudents.map((student, index) => (
//                         <tr
//                           key={student.id}
//                           className={`border-b border-gray-100 z-10 transition-colors ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                           }`}
//                         >
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
//                                 <span className="text-purple-800 font-medium text-sm">
//                                   {student.firstName.charAt(0)}
//                                   {student.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900 text-sm md:text-base">
//                                   {student.firstName} {student.lastName}
//                                 </p>
//                                 <div className="sm:hidden">
//                                   <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                     <Mail className="h-3 w-3" />
//                                     {student.email}
//                                   </p>
//                                   {student.whatsUpNumber && (
//                                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                       <Phone className="h-3 w-3" />
//                                       {student.whatsUpNumber}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.email}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden md:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{student.whatsUpNumber || "غير متوفر"}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{formatDate(student.createdAt)}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="relative" ref={dropdownRef}>
//                               <button
//                                 onClick={() => toggleDropdown(student.id)}
//                                 className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
//                                 type="button"
//                                 disabled={deletingId === student.id}
//                               >
//                                 {deletingId === student.id ? (
//                                   <Loader2 className="h-4 w-4 animate-spin" />
//                                 ) : (
//                                   <MoreVertical className="h-4 w-4" />
//                                 )}
//                               </button>
//                               {/* {openDropdown === student.id && deletingId !== student.id && (
//                                 <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                                   <div className="py-1">
//                                     <button
//                                       onClick={() => {
//                                         console.log("start details")
//                                         handleShowDetails(student)
//                                       }}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Eye className="h-4 w-4 text-blue-500" />
//                                       عرض التفاصيل
//                                     </button>
//                                     <button
//                                       onClick={() => handleEdit(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Edit className="h-4 w-4 text-green-500" />
//                                       تعديل
//                                     </button>
//                                     <button
//                                       onClick={() => handleDelete(student)}
//                                       className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-right"
//                                       type="button"
//                                     >
//                                       <Trash2 className="h-4 w-4 text-red-500" />
//                                       حذف
//                                     </button>
//                                   </div>
//                                 </div>
//                               )} */}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Students















// "use client"
// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { useDispatch } from 'react-redux';
// import { changeUserClassType } from '@/features/auth/authSlice';
// import Layout from "../../Layout/Layout"
// import {
//   Users,
//   GraduationCap,
//   BookOpenText,
//   AlertCircle,
//   Loader2,
//   Mail,
//   Phone,
//   Calendar,
//   MoreVertical,
//   CheckCircle,
//   XCircle,
//   Building,
// } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface Teacher {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   isActive: boolean
//   whatsUpNumber: string
// }

// interface School {
//   id: string
//   name: string
//   createdAt: string
//   email: string
//   phone?: string
//   address?: string
// }

// type User = Student | Teacher | School

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: User[]
// }

// interface DeleteResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const UsersPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"الطلاب" | "المعلمون" | "المدارس">("الطلاب")
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null)
//   const [deletingId, setDeletingId] = useState<string | null>(null)
//   const router = useRouter()
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const dispatch = useDispatch();

//   const makeCookiesType = (name: string) => {
//     dispatch(changeUserClassType(name));
//   }

//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       await refreshAuthToken()
      
//       let endpoint = ""
//       switch (activeTab) {
//         case "الطلاب":
//           endpoint = `${BASE_URL}/api/Student/GetAllStudents`
//           break
//         case "المعلمون":
//           endpoint = `${BASE_URL}/api/Teacher/GetAllTeachers`
//           break
//         case "المدارس":
//           endpoint = `${BASE_URL}/api/School/GetAllSchools`
//           break
//       }
      
//       const response = await axios.get<ApiResponse>(endpoint, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       if (response.data.succeeded) {
//         setUsers(response.data.data)
//         console.log(`${activeTab}`, response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب البيانات")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchUsers()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchUsers()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteUser = async (userId: string) => {
//     try {
//       setDeletingId(userId)
//       await refreshAuthToken()
      
//       let endpoint = ""
//       switch (activeTab) {
//         case "الطلاب":
//           endpoint = `${BASE_URL}/api/Student/DeleteStudent/${userId}`
//           break
//         case "المعلمون":
//           endpoint = `${BASE_URL}/api/Teacher/DeleteTeacher/${userId}`
//           break
//         case "المدارس":
//           endpoint = `${BASE_URL}/api/School/DeleteSchool/${userId}`
//           break
//       }
      
//       const response = await axios.delete<DeleteResponse>(endpoint, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       if (response.data.succeeded) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
//         let successMessage = ""
//         switch (activeTab) {
//           case "الطلاب":
//             successMessage = "تم حذف الطالب بنجاح"
//             break
//           case "المعلمون":
//             successMessage = "تم حذف المعلم بنجاح"
//             break
//           case "المدارس":
//             successMessage = "تم حذف المدرسة بنجاح"
//             break
//         }
//         alert(response.data.message || successMessage)
//       } else {
//         const errorMessage =
//           response.data.errors?.length > 0
//             ? response.data.errors.join(", ")
//             : response.data.message || "فشل في الحذف"
//         alert(errorMessage)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء الحذف"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteUser(userId)
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteUser(userId)
//               }
//               errorMessage = "ليس لديك صلاحية للحذف"
//               break
//             case 404:
//               switch (activeTab) {
//                 case "الطلاب":
//                   errorMessage = "الطالب غير موجود أو تم حذفه مسبقاً"
//                   break
//                 case "المعلمون":
//                   errorMessage = "المعلم غير موجود أو تم حذفه مسبقاً"
//                   break
//                 case "المدارس":
//                   errorMessage = "المدرسة غير موجودة أو تم حذفها مسبقاً"
//                   break
//               }
//               setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.data?.message || error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }
//       console.error("Error deleting user:", error)
//       alert(errorMessage)
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [activeTab])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const handleShowDetails = (user: User) => {
//     let path = ""
//     switch (activeTab) {
//       case "الطلاب":
//         path = `/admin/pages/users/${user.id}`
//         break
//       case "المعلمون":
//         path = `/admin/pages/teachers/${user.id}`
//         break
//       case "المدارس":
//         path = `/admin/pages/schools/${user.id}`
//         break
//     }
//     router.push(path)
//     setOpenDropdown(null)
//   }

//   const handleEdit = (user: User) => {
//     console.log("Edit user:", user)
//     setOpenDropdown(null)
//   }

//   const handleDelete = async (user: User) => {
//     let userType = ""
//     switch (activeTab) {
//       case "الطلاب":
//         userType = "الطالب"
//         break
//       case "المعلمون":
//         userType = "المعلم"
//         break
//       case "المدارس":
//         userType = "المدرسة"
//         break
//     }
    
//     const userName = activeTab === "المدارس" 
//       ? (user as School).name 
//       : `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`
      
//     const confirmed = window.confirm(
//       `هل أنت متأكد من حذف ${userType} ${userName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
//     )
//     if (confirmed) {
//       await deleteUser(user.id)
//     }
//     setOpenDropdown(null)
//   }

//   const toggleDropdown = (userId: string) => {
//     setOpenDropdown(openDropdown === userId ? null : userId)
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

//   const filteredUsers = users.filter((user) => {
//     if (activeTab === "المدارس") {
//       return (user as School).name.toLowerCase().includes(searchTerm.toLowerCase())
//     } else {
//       const fullName = `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`.toLowerCase()
//       return fullName.includes(searchTerm.toLowerCase())
//     }
//   })

//   const activeUsersCount = activeTab === 'المعلمون' 
//     ? (users as Teacher[]).filter(teacher => teacher.isActive).length
//     : users.length

//   const inactiveUsersCount = activeTab === 'المعلمون' 
//     ? (users as Teacher[]).filter(teacher => !teacher.isActive).length
//     : 0

//   const ArabicToggle = () => (
//     <div className="max-w-md mx-auto my-2">
//       <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//         <div className="flex flex-wrap relative">
//           <button
//             name="الطلاب"
//             onClick={() => {
//               setActiveTab("الطلاب")
//               makeCookiesType("الطلاب")
//             }}
//             className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//               activeTab === "الطلاب" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//             }`}
//             type="button">
//             الطلاب
//           </button>
//           <button
//             name="المعلمون"
//             onClick={() => {
//               setActiveTab("المعلمون")
//               makeCookiesType("المعلمون")
//             }}
//             className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//               activeTab === "المعلمون" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//             }`}
//             type="button">
//             المعلمون
//           </button>
//           <button
//             name="المدارس"
//             onClick={() => {
//               setActiveTab("المدارس")
//               makeCookiesType("المدارس")
//             }}
//             className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//               activeTab === "المدارس" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//             }`}
//             type="button">
//             المدارس
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 p-4 md:p-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">
//               {activeTab === "الطلاب" ? 'الطلاب' : activeTab === "المعلمون" ? 'المعلمون' : 'المدارس'}
//             </h1>
//             <p className="text-gray-600 text-sm md:text-base">
//               {activeTab === "الطلاب" ? 'اهلا في الطلاب الخاصة بك' : 
//                activeTab === "المعلمون" ? 'اهلا بك في المعلمين الخاصة بك' : 'اهلا بك في المدارس الخاصة بك'}
//             </p>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//             <MetricCard 
//               title={
//                 activeTab === "الطلاب" ? "إجمالي الطلاب" : 
//                 activeTab === "المعلمون" ? "إجمالي المعلمين" : "إجمالي المدارس"
//               } 
//               value={filteredUsers.length} 
//               icon={Users} 
//               color="bg-blue-500" 
//             />
//             <MetricCard 
//               title={
//                 activeTab === "الطلاب" ? "الطلاب النشطون" : 
//                 activeTab === "المعلمون" ? "المعلمون النشطون" : "المدارس النشطة"
//               } 
//               value={activeUsersCount} 
//               icon={CheckCircle} 
//               color="bg-green-500" 
//             />
//             {activeTab === "المعلمون" && (
//               <MetricCard 
//                 title="المعلمون غير النشطين" 
//                 value={inactiveUsersCount} 
//                 icon={XCircle} 
//                 color="bg-red-500" 
//               />
//             )}
//             {activeTab === "المدارس" && (
//               <MetricCard 
//                 title="المدارس غير النشطة" 
//                 value={inactiveUsersCount} 
//                 icon={XCircle} 
//                 color="bg-red-500" 
//               />
//             )}
//             <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
//           </div>

//  {/* Arabic Toggle Component */}
//  <ArabicToggle />

//           {/* Users Table */}
//           <div className="bg-white rounded-lg shadow-md border border-gray-200">
//             <div className="px-4 md:px-6 py-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                   {activeTab === "الطلاب" ? <Users className="h-5 w-5" /> : 
//                    activeTab === "المعلمون" ? <GraduationCap className="h-5 w-5" /> : 
//                    <Building className="h-5 w-5" />}
//                   {activeTab === "الطلاب" ? 'قائمة الطلاب' : 
//                    activeTab === "المعلمون" ? 'قائمة المعلمين' : 'قائمة المدارس'}
//                 </h2>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder={
//                       activeTab === "المدارس" ? "البحث باسم المدرسة..." : "البحث بالاسم الكامل..."
//                     }
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-right"
//                   />
//                   {activeTab === "المدارس" ? 
//                     <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> :
//                     <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   }
//                 </div>
//               </div>
//             </div>
//             <div className="p-4 md:p-6">
//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                     <span>جاري تحميل البيانات...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="text-center">
//                     <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <button
//                       onClick={fetchUsers}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       type="button"
//                     >
//                       إعادة المحاولة
//                     </button>
//                   </div>
//                 </div>
//               ) : filteredUsers.length === 0 ? (
//                 <div className="text-center py-12">
//                   {activeTab === "المدارس" ? 
//                     <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" /> :
//                     <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   }
//                   <p className="text-gray-600">
//                     {searchTerm 
//                       ? `لا توجد نتائج للبحث "${searchTerm}"` 
//                       : activeTab === "الطلاب" 
//                         ? "لا توجد بيانات الطلاب متاحة" 
//                         : activeTab === "المعلمون"
//                           ? "لا توجد بيانات المعلمين متاحة"
//                           : "لا توجد بيانات المدارس متاحة"}
//                   </p>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
//                       type="button"
//                     >
//                       مسح البحث
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-200">
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">
//                           {activeTab === "المدارس" ? "اسم المدرسة" : "الاسم الكامل"}
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                           {activeTab === "المدارس" ? "رقم الهاتف" : "رقم الواتساب"}
//                         </th>
//                         {activeTab !== "الطلاب" && (
//                           <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                             الحالة
//                           </th>
//                         )}
//                         <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
//                           تاريخ التسجيل
//                         </th>
//                         {/* <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">الإجراءات</th> */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredUsers.map((user, index) => (
//                         <tr
//                           key={user.id}
//                           className={`border-b border-gray-100 z-10 transition-colors ${
//                             index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                           }`}
//                         >
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
//                                 <span className="text-purple-800 font-medium text-sm">
//                                   {activeTab === "المدارس" 
//                                     ? (user as School).name.charAt(0)
//                                     : `${(user as Student | Teacher).firstName.charAt(0)}${(user as Student | Teacher).lastName.charAt(0)}`
//                                   }
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-gray-900 text-sm md:text-base">
//                                   {activeTab === "المدارس" 
//                                     ? (user as School).name
//                                     : `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`
//                                   }
//                                 </p>
//                                 <div className="sm:hidden">
//                                   <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                     <Mail className="h-3 w-3" />
//                                     {user.email}
//                                   </p>
//                                   {activeTab === "المدارس" ? (
//                                     (user as School).phone && (
//                                       <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                         <Phone className="h-3 w-3" />
//                                         {(user as School).phone}
//                                       </p>
//                                     )
//                                   ) : (
//                                     (user as Student | Teacher).whatsUpNumber && (
//                                       <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                                         <Phone className="h-3 w-3" />
//                                         {(user as Student | Teacher).whatsUpNumber}
//                                       </p>
//                                     )
//                                   )}
//                                   {activeTab !== "الطلاب" && (user as Teacher | School).isActive !== undefined && (
//                                     <p className="text-xs flex items-center gap-1 mt-1">
//                                       {(user as Teacher | School).isActive ? (
//                                         <>
//                                           <CheckCircle className="h-3 w-3 text-green-500" />
//                                           <span className="text-green-600">نشط</span>
//                                         </>
//                                       ) : (
//                                         <>
//                                           <XCircle className="h-3 w-3 text-red-500" />
//                                           <span className="text-red-600">غير نشط</span>
//                                         </>
//                                       )}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{user.email}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4 hidden md:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">
//                                 {activeTab === "المدارس" 
//                                   ? (user as School).phone || "غير متوفر"
//                                   : (user as Student | Teacher).whatsUpNumber || "غير متوفر"
//                                 }
//                               </span>
//                             </div>
//                           </td>
//                           {activeTab !== "الطلاب" && (
//                             <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                               <div className="flex items-center gap-2">
//                                 {(user as Teacher | School).isActive ? (
//                                   <>
//                                     <CheckCircle className="h-4 w-4 text-green-500" />
//                                     <span className="text-sm text-green-600">نشط</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <XCircle className="h-4 w-4 text-red-500" />
//                                     <span className="text-sm text-red-600">غير نشط</span>
//                                   </>
//                                 )}
//                               </div>
//                             </td>
//                           )}
//                           <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                               <span className="text-sm text-gray-600">{formatDate(user.createdAt)}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-2 md:px-4">
//                             <div className="relative" ref={dropdownRef}>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default UsersPage















"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux';
import { changeUserClassType } from '@/features/auth/authSlice';
import Layout from "../../Layout/Layout"
import {
  Users,
  GraduationCap,
  BookOpenText,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Building,
} from "lucide-react"
import Link from "next/link"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface Student {
  id: string
  firstName: string
  lastName: string
  createdAt: string
  email: string
  whatsUpNumber: string
}

interface Teacher {
  id: string
  firstName: string
  lastName: string
  createdAt: string
  email: string
  isActive: boolean
  whatsUpNumber: string
}

interface School {
  id: string
  name: string
  createdAt: string
  email: string
  phone?: string
  address?: string
}

type User = Student | Teacher | School

interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: User[]
}

interface DeleteResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

const UsersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"الطلاب" | "المعلمون" | "المدارس">("الطلاب")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();

  const makeCookiesType = (name: string) => {
    dispatch(changeUserClassType(name));
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      await refreshAuthToken()

      let endpoint = ""
      switch (activeTab) {
        case "الطلاب":
          endpoint = `${BASE_URL}/api/Student/GetAllStudents`
          break
        case "المعلمون":
          endpoint = `${BASE_URL}/api/Teacher/GetAllTeachers`
          break
        case "المدارس":
          endpoint = `${BASE_URL}/api/School/GetAllSchools`
          break
      }
      
      const response = await axios.get<ApiResponse>(endpoint, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      
      if (response.data.succeeded) {
        setUsers(response.data.data)
        console.log(`${activeTab}`, response.data.data)
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
                return fetchUsers()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchUsers()
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
      console.error("Error fetching data:", error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      setDeletingId(userId)
      await refreshAuthToken()

      let endpoint = ""
      switch (activeTab) {
        case "الطلاب":
          endpoint = `${BASE_URL}/api/Student/DeleteStudent/${userId}`
          break
        case "المعلمون":
          endpoint = `${BASE_URL}/api/Teacher/DeleteTeacher/${userId}`
          break
        case "المدارس":
          endpoint = `${BASE_URL}/api/School/DeleteSchool/${userId}`
          break
      }
      
      const response = await axios.delete<DeleteResponse>(endpoint, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })
      
      if (response.data.succeeded) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
        let successMessage = ""
        switch (activeTab) {
          case "الطلاب":
            successMessage = "تم حذف الطالب بنجاح"
            break
          case "المعلمون":
            successMessage = "تم حذف المعلم بنجاح"
            break
          case "المدارس":
            successMessage = "تم حذف المدرسة بنجاح"
            break
        }
        alert(response.data.message || successMessage)
      } else {
        const errorMessage =
          response.data.errors?.length > 0
            ? response.data.errors.join(", ")
            : response.data.message || "فشل في الحذف"
        alert(errorMessage)
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء الحذف"
      const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return deleteUser(userId)
              }
              errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return deleteUser(userId)
              }
              errorMessage = "ليس لديك صلاحية للحذف"
              break
            case 404:
              switch (activeTab) {
                case "الطلاب":
                  errorMessage = "الطالب غير موجود أو تم حذفه مسبقاً"
                  break
                case "المعلمون":
                  errorMessage = "المعلم غير موجود أو تم حذفه مسبقاً"
                  break
                case "المدارس":
                  errorMessage = "المدرسة غير موجودة أو تم حذفها مسبقاً"
                  break
              }
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
              break
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
              break
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.data?.message || error.response.statusText}`
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
      }
      console.error("Error deleting user:", error)
      alert(errorMessage)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [activeTab])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleShowDetails = (user: User) => {
    let path = ""
    switch (activeTab) {
      case "الطلاب":
        path = `/admin/pages/users/${user.id}`
        break
      case "المعلمون":
        path = `/admin/pages/teachers/${user.id}`
        break
      case "المدارس":
        path = `/admin/pages/schools/${user.id}`
        break
    }
    router.push(path)
    setOpenDropdown(null)
  }

  const handleEdit = (user: User) => {
    console.log("Edit user:", user)
    setOpenDropdown(null)
  }

  const handleDelete = async (user: User) => {
    let userType = ""
    switch (activeTab) {
      case "الطلاب":
        userType = "الطالب"
        break
      case "المعلمون":
        userType = "المعلم"
        break
      case "المدارس":
        userType = "المدرسة"
        break
    }

    const userName = activeTab === "المدارس" 
      ? (user as School).name 
      : `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`
      
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف ${userType} ${userName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
    )
    if (confirmed) {
      await deleteUser(user.id)
    }
    setOpenDropdown(null)
  }

  const toggleDropdown = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId)
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

  const filteredUsers = users.filter((user) => {
    if (activeTab === "المدارس") {
      return (user as School).name.toLowerCase().includes(searchTerm.toLowerCase())
    } else {
      const fullName = `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`.toLowerCase()
      return fullName.includes(searchTerm.toLowerCase())
    }
  })

  const activeUsersCount = activeTab === 'المعلمون'
    ? (users as Teacher[]).filter(teacher => teacher.isActive).length
    : users.length

  const inactiveUsersCount = activeTab === 'المعلمون'
    ? (users as Teacher[]).filter(teacher => !teacher.isActive).length
    : 0

  const ArabicToggle = () => (
    <div className="max-w-md mx-auto my-2">
      <div className="bg-purple-700 rounded-full p-1 shadow-lg">
        <div className="flex flex-wrap relative">
          <button
            name="الطلاب"
            onClick={() => {
              setActiveTab("الطلاب")
              makeCookiesType("الطلاب")
            }}
            className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
              activeTab === "الطلاب" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
            }`}
            type="button"
          >
            الطلاب
          </button>
          <button
            name="المعلمون"
            onClick={() => {
              setActiveTab("المعلمون")
              makeCookiesType("المعلمون")
            }}
            className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
              activeTab === "المعلمون" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
            }`}
            type="button"
          >
            المعلمون
          </button>
          <button
            name="المدارس"
            onClick={() => {
              setActiveTab("المدارس")
              makeCookiesType("المدارس")
            }}
            className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
              activeTab === "المدارس" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
            }`}
            type="button"
          >
            المدارس
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-3">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-4 font-normal text-gray-800">
              {activeTab === "الطلاب" ? 'الطلاب' : activeTab === "المعلمون" ? 'المعلمون' : 'المدارس'}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {activeTab === "الطلاب" ? 'اهلا في الطلاب الخاصة بك' :
              activeTab === "المعلمون" ? 'اهلا بك في المعلمين الخاصة بك' : 'اهلا بك في المدارس الخاصة بك'}
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <MetricCard 
              title={
                activeTab === "الطلاب" ? "إجمالي الطلاب" : 
                activeTab === "المعلمون" ? "إجمالي المعلمين" : "إجمالي المدارس"
              } 
              value={filteredUsers.length} 
              icon={Users} 
              color="bg-blue-500" 
            />
            <MetricCard 
              title={
                activeTab === "الطلاب" ? "الطلاب النشطون" : 
                activeTab === "المعلمون" ? "المعلمون النشطون" : "المدارس النشطة"
              } 
              value={activeUsersCount} 
              icon={CheckCircle} 
              color="bg-green-500" 
            />
            {activeTab === "المعلمون" && (
              <MetricCard 
                title="المعلمون غير النشطين" 
                value={inactiveUsersCount} 
                icon={XCircle} 
                color="bg-red-500" 
              />
            )}
            {activeTab === "المدارس" && (
              <MetricCard 
                title="المدارس غير النشطة" 
                value={inactiveUsersCount} 
                icon={XCircle} 
                color="bg-red-500" 
              />
            )}
            <MetricCard title="الدورات المتاحة" value="12" icon={BookOpenText} color="bg-purple-500" />
          </div>
          
          {/* Arabic Toggle Component */}
          <ArabicToggle />

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  {activeTab === "الطلاب" ? <Users className="h-5 w-5" /> : 
                   activeTab === "المعلمون" ? <GraduationCap className="h-5 w-5" /> : 
                   <Building className="h-5 w-5" />}
                  {activeTab === "الطلاب" ? 'قائمة الطلاب' : 
                   activeTab === "المعلمون" ? 'قائمة المعلمين' : 'قائمة المدارس'}
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      activeTab === "المدارس" ? "البحث باسم المدرسة..." : "البحث بالاسم الكامل..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-right"
                  />
                  {activeTab === "المدارس" ? 
                    <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> :
                    <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  }
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>جاري تحميل البيانات...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                      onClick={fetchUsers}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      type="button"
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  {activeTab === "المدارس" ? 
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" /> :
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  }
                  <p className="text-gray-600">
                    {searchTerm 
                      ? `لا توجد نتائج للبحث "${searchTerm}"` 
                      : activeTab === "الطلاب" 
                        ? "لا توجد بيانات الطلاب متاحة" 
                        : activeTab === "المعلمون"
                          ? "لا توجد بيانات المعلمين متاحة"
                          : "لا توجد بيانات المدارس متاحة"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      type="button"
                    >
                      مسح البحث
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">
                          {activeTab === "المدارس" ? "اسم المدرسة" : "الاسم الكامل"}
                        </th>
                        <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden sm:table-cell">
                          البريد الإلكتروني
                        </th>
                        <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden md:table-cell">
                          {activeTab === "المدارس" ? "رقم الهاتف" : "رقم الواتساب"}
                        </th>
                        {activeTab !== "الطلاب" && (
                          <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
                            الحالة
                          </th>
                        )}
                        <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell">
                          تاريخ التسجيل
                        </th>
                        <th className="text-right py-3 px-2 md:px-4 text-sm font-medium text-gray-700">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className={`border-b border-gray-100 z-10 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="py-4 px-2 md:px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                                <span className="text-purple-800 font-medium text-sm">
                                  {activeTab === "المدارس" 
                                    ? (user as School).name.charAt(0)
                                    : `${(user as Student | Teacher).firstName.charAt(0)}${(user as Student | Teacher).lastName.charAt(0)}`
                                  }
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm md:text-base">
                                  {activeTab === "المدارس" 
                                    ? (user as School).name
                                    : `${(user as Student | Teacher).firstName} ${(user as Student | Teacher).lastName}`
                                  }
                                </p>
                                <div className="sm:hidden">
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                    <Mail className="h-3 w-3" />
                                    {user.email}
                                  </p>
                                  {activeTab === "المدارس" ? (
                                    (user as School).phone && (
                                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Phone className="h-3 w-3" />
                                        {(user as School).phone}
                                      </p>
                                    )
                                  ) : (
                                    (user as Student | Teacher).whatsUpNumber && (
                                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Phone className="h-3 w-3" />
                                        {(user as Student | Teacher).whatsUpNumber}
                                      </p>
                                    )
                                  )}
                                  {activeTab !== "الطلاب" && (user as Teacher | School).isActive !== undefined && (
                                    <p className="text-xs flex items-center gap-1 mt-1">
                                      {(user as Teacher | School).isActive ? (
                                        <>
                                          <CheckCircle className="h-3 w-3 text-green-500" />
                                          <span className="text-green-600">نشط</span>
                                        </>
                                      ) : (
                                        <>
                                          <XCircle className="h-3 w-3 text-red-500" />
                                          <span className="text-red-600">غير نشط</span>
                                        </>
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2 md:px-4 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{user.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 md:px-4 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {activeTab === "المدارس" 
                                  ? (user as School).phone || "غير متوفر"
                                  : (user as Student | Teacher).whatsUpNumber || "غير متوفر"
                                }
                              </span>
                            </div>
                          </td>
                          {activeTab !== "الطلاب" && (
                            <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
                              <div className="flex items-center gap-2">
                                {(user as Teacher | School).isActive ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-green-600">نشط</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <span className="text-sm text-red-600">غير نشط</span>
                                  </>
                                )}
                              </div>
                            </td>
                          )}
                          <td className="py-4 px-2 md:px-4 hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{formatDate(user.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 md:px-4">
                            <div className="relative" ref={dropdownRef}>
                              <Link href={`/admin/pages/users/${user.id}`}>
                              <button
                                onClick={() => toggleDropdown(user.id)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                type="button">
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                              </button>
                              </Link>
                              {/* {openDropdown === user.id && (
                                <div className="absolute left-0 bottom-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                  <button
                                    onClick={() => handleShowDetails(user)}
                                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    type="button">
                                    عرض التفاصيل
                                  </button>
                                  <button
                                    onClick={() => handleEdit(user)}
                                    className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    type="button">
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user)}
                                    className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    disabled={deletingId === user.id}
                                    type="button">
                                    {deletingId === user.id ? "جاري الحذف..." : "حذف"}
                                  </button>
                                </div>
                              )} */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UsersPage