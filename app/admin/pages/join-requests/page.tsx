
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
//   const [questions] = useState<Question[]>([])
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون")
//   const [referencedSkillIds] = useState<Set<number>>(new Set())
//   const [loading] = useState<boolean>(false)
//   const [testClasses] = useState<TestClass[]>([])
//   const [error] = useState<string | null>(null)
//   const [referencedClassIds] = useState<Set<number>>(new Set())
 

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
//                    طلبات الانضمام
//                   </h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة طلبات الانضمام</p>
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600">
//                       <AlertCircle className="h-4 w-4 ml-1" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                     </div>
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
//                     onClick={() => setActiveOption("المعلمون")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المعلمون"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المعلمون
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("المدارس")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المدارس"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المدارس
//                   </button>
//                 </div>
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
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
// } from "lucide-react"

// interface TeacherJoiningRequest {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
//   createdAt: string
//   specialty: number
// }

// interface SchoolJoiningRequest {
//   id: string
//   schoolName: string
//   email: string
//   contactPerson: string
//   phone: string
//   createdAt: string
//   status: string
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const specialtyNames: { [key: number]: string } = {
//   0: "عام",
//   1: "رياضيات",
//   2: "علوم",
//   3: "لغة عربية",
//   4: "لغة إنجليزية",
//   5: "تاريخ",
//   6: "جغرافيا",
// }

// export default function AdminDashboard() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([])
//   const [schoolRequests, setSchoolRequests] = useState<SchoolJoiningRequest[]>([])
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون")
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set())
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [showFilters, setShowFilters] = useState<boolean>(false)
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null)

//   const router = useRouter()

//   useEffect(() => {
//     fetchData()
//   }, [activeOption])

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)
//    const token = Cookies.get("adminToken")
//     try {
//         const response = await axios.get<ApiResponse<TeacherJoiningRequest[]>>(
//           `${BASE_URL}/api/JoiningRequest/AllTeacherJoiningRequest`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           },
//         )
  
//         if (response.data.succeeded) {
//           setTeacherRequests(response.data.data)
//         } else {
//           throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين")
//         }
//       } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return fetchData()
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return fetchData()
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
//     } finally {
//       setLoading(false)
//     }
//   }



// //   const fetchTeacherRequests = async (token: string) => {
// //     try {
// //       const response = await axios.get<ApiResponse<TeacherJoiningRequest[]>>(
// //         `${BASE_URL}/api/JoiningRequest/AllTeacherJoiningRequest`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         },
// //       )

// //       if (response.data.succeeded) {
// //         setTeacherRequests(response.data.data)
// //       } else {
// //         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين")
// //       }
// //     } catch (error: any) {
// //         let errorMessage = "Unknown error occurred"
// //         const refreshSuccess = await refreshAuthToken()
// //         if (axios.isAxiosError(error)) {
// //           if (error.response) {
// //             switch (error.response.status) {
// //               case 401:
// //                 if (refreshSuccess) {
// //                   return fetchTeacherRequests(token)
// //                 }
// //                 errorMessage = "Authentication expired. Please log in again."
// //                 router.push("/admin/login")
// //                 break
// //               case 403:
// //                 if (refreshSuccess) {
// //                   return fetchTeacherRequests(token)
// //                 }
// //                 errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
// //                 router.push("/admin/login")
// //                 break
// //               case 404:
// //                 errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
// //                 break
// //               case 500:
// //                 errorMessage = "Server error (500). Please try again later."
// //                 break
// //               default:
// //                 errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
// //             }
// //           } else if (error.request) {
// //             errorMessage = "Network error. Please check your internet connection."
// //           } else {
// //             errorMessage = `Request error: ${error.message}`
// //           }
// //         } else {
// //           errorMessage = error instanceof Error ? error.message : "Unknown error"
// //         }
// //         console.error("Error fetching data:", error)
// //         setError(errorMessage)
// //     }
// //   }




//   const handleApprove = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }

//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return handleApprove(id)
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return handleApprove(id)
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
//     } finally {
//       setActionLoading(null)
//     }
//   }




//   const handleReject = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }

//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return handleReject(id)
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return handleReject(id)
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
//     } finally {
//       setActionLoading(null)
//     }
//   }




//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return

//     setActionLoading("bulk")
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       }

//       setSelectedRequests(new Set())
//     } catch (error) {
//         let errorMessage = "Unknown error occurred"
//         const refreshSuccess = await refreshAuthToken()
//         if (axios.isAxiosError(error)) {
//           if (error.response) {
//             switch (error.response.status) {
//               case 401:
//                 if (refreshSuccess) {
//                   return handleBulkAction(action)
//                 }
//                 errorMessage = "Authentication expired. Please log in again."
//                 router.push("/admin/login")
//                 break
//               case 403:
//                 if (refreshSuccess) {
//                   return handleBulkAction(action)
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
//         setError(errorMessage)    } finally {
//       setActionLoading(null)
//     }
//   }

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(id)) {
//         newSet.delete(id)
//       } else {
//         newSet.add(id)
//       }
//       return newSet
//     })
//   }

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolRequests
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set())
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)))
//     }
//   }

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase())

//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty

//     return matchesSearch && matchesSpecialty
//   })

//   const filteredSchoolRequests = schoolRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
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

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolRequests
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolRequests.length

//   return (
//     <Layout>
//       <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//         <div className="py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8">
//               <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-800 mb-2">طلبات الانضمام</h1>
//                   <p className="text-sm sm:text-base text-gray-600 mb-2">اهلا بك في صفحة طلبات الانضمام</p>
//                   {error && (
//                     <div className="flex items-center mt-2 text-red-600 bg-red-50 p-3 rounded-lg">
//                       <AlertCircle className="h-4 w-4 ml-1 flex-shrink-0" />
//                       <p className="text-xs sm:text-sm">{error}</p>
//                       <button onClick={() => setError(null)} className="mr-auto text-red-400 hover:text-red-600" type="button">
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
//               <MetricCard
//                 title={`إجمالي طلبات ${activeOption}`}
//                 value={totalRequests}
//                 icon={activeOption === "المعلمون" ? User : LandPlot}
//                 color="bg-blue-500"
//               />
//               <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//               <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//               <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-6 sm:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-md">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("المعلمون")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المعلمون"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المعلمون
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("المدارس")}
//                     className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center text-sm sm:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المدارس"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المدارس
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
//               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                 <div className="flex-1 w-full sm:max-w-md">
//                   <div className="relative">
//                     <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder={`البحث في طلبات ${activeOption}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                   {activeOption === "المعلمون" && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                         type="button">
//                         <Filter className="h-4 w-4" />
//                         <span className="text-sm">التخصص</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                       </button>

//                       {showFilters && (
//                         <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                           <div className="p-2">
//                             <button
//                               onClick={() => setSelectedSpecialty(null)}
//                               className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                 selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                               }`}
//                               type="button">
//                               جميع التخصصات
//                             </button>
//                             {Object.entries(specialtyNames).map(([key, value]) => (
//                               <button
//                                 key={key}
//                                 onClick={() => setSelectedSpecialty(Number.parseInt(key))}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === Number.parseInt(key) ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button">
//                                 {value}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {selectedRequests.size > 0 && (
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleBulkAction("approve")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         type="button">
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Check className="h-4 w-4" />
//                         )}
//                         <span className="text-sm">موافقة ({selectedRequests.size})</span>
//                       </button>
//                       <button
//                         onClick={() => handleBulkAction("reject")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         type="button">
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <X className="h-4 w-4" />
//                         )}
//                         <span className="text-sm">رفض ({selectedRequests.size})</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Requests List */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               {currentRequests.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="text-gray-400 mb-4">
//                     {activeOption === "المعلمون" ? (
//                       <User className="h-12 w-12 mx-auto" />
//                     ) : (
//                       <LandPlot className="h-12 w-12 mx-auto" />
//                     )}
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                   <p className="text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Desktop Table */}
//                   <div className="hidden lg:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             <input
//                               type="checkbox"
//                               checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                               onChange={toggleSelectAll}
//                               className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                             />
//                           </th>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "المعلم" : "المدرسة"}
//                           </th>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             البريد الإلكتروني
//                           </th>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "رقم الواتساب" : "جهة الاتصال"}
//                           </th>
//                           {activeOption === "المعلمون" && (
//                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               التخصص
//                             </th>
//                           )}
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             تاريخ الطلب
//                           </th>
//                           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {activeOption === "المعلمون"
//                           ? filteredTeacherRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-10 w-10">
//                                       <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                         <User className="h-5 w-5 text-purple-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-4">
//                                       <div className="text-sm font-medium text-gray-900">
//                                         {request.firstName} {request.lastName}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.email}
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.whatsUpNumber}
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     {formatDate(request.createdAt)}
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                                       type="button">
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                                       type="button">
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))
//                           : filteredSchoolRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-10 w-10">
//                                       <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                         <LandPlot className="h-5 w-5 text-green-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-4">
//                                       <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.email}
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div>
//                                     <div className="text-sm font-medium text-gray-900">{request.contactPerson}</div>
//                                     <div className="flex items-center text-sm text-gray-500">
//                                       <Phone className="h-3 w-3 ml-1" />
//                                       {request.phone}
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     {formatDate(request.createdAt)}
//                                   </div>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                                       type="button">
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
//                                       type="button">
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Mobile Cards */}
//                   <div className="lg:hidden">
//                     <div className="p-4 border-b border-gray-200 bg-gray-50">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                           onChange={toggleSelectAll}
//                           className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                         />
//                         <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                       </label>
//                     </div>

//                     <div className="divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <div key={request.id} className="p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3"
//                                   />
//                                   <div className="flex-shrink-0 h-10 w-10 ml-3">
//                                     <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-5 w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h3 className="text-sm font-medium text-gray-900">
//                                       {request.firstName} {request.lastName}
//                                     </h3>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                       {specialtyNames[request.specialty] || "غير محدد"}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button">
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button">
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>

//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.whatsUpNumber}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         : filteredSchoolRequests.map((request) => (
//                             <div key={request.id} className="p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3"
//                                   />
//                                   <div className="flex-shrink-0 h-10 w-10 ml-3">
//                                     <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <LandPlot className="h-5 w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h3 className="text-sm font-medium text-gray-900">{request.schoolName}</h3>
//                                     <p className="text-xs text-gray-500 mt-1">{request.contactPerson}</p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button">
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
//                                     type="button">
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>

//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.phone}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 </>
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
// import { Plus } from 'lucide-react'
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
//   Menu,
// } from "lucide-react"

// interface TeacherJoiningRequest {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
//   createdAt: string
//   specialty: number
// }

// interface SchoolJoiningRequest {
//   id: string
//   schoolName: string
//   email: string
//   contactPerson: string
//   phone: string
//   createdAt: string
//   status: string
// }

// interface ApiResponse<T> {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: T
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const specialtyNames: { [key: number]: string } = {
//   0: "عام",
//   1: "رياضيات",
//   2: "علوم",
//   3: "لغة عربية",
//   4: "لغة إنجليزية",
//   5: "تاريخ",
//   6: "جغرافيا",
// }

// export default function AdminDashboard() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([])
//   const [schoolRequests, setSchoolRequests] = useState<SchoolJoiningRequest[]>([])
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون")
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set())
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [showFilters, setShowFilters] = useState<boolean>(false)
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null)
//   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
//   const router = useRouter()

//   useEffect(() => {
//     fetchData()
//   }, [activeOption])

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<TeacherJoiningRequest[]>>(
//         `${BASE_URL}/api/JoiningRequest/AllTeacherJoiningRequest`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         setTeacherRequests(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchData()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error approving request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleReject = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error rejecting request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return
//     setActionLoading("bulk")
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       }
//       setSelectedRequests(new Set())
//     } catch (error) {
//       console.error("Error with bulk action:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(id)) {
//         newSet.delete(id)
//       } else {
//         newSet.add(id)
//       }
//       return newSet
//     })
//   }

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolRequests
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set())
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)))
//     }
//   }

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty
//     return matchesSearch && matchesSpecialty
//   })

//   const filteredSchoolRequests = schoolRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
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
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
//           <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
//         </div>
//       </div>
//     </div>
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

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolRequests
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolRequests.length

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50" dir="rtl">
//         <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-4 sm:mb-6 lg:mb-8">
//               <div className="flex flex-col space-y-3 sm:space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
//                       طلبات الانضمام
//                     </h1>
//                     <p className="text-xs sm:text-sm lg:text-base text-gray-600">اهلا بك في صفحة طلبات الانضمام</p>
//                   </div>
//                   <button
//                     onClick={() => router.push("/admin/pages/join-requests/specialty")}
//                     className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إضافة تخصص جديد
//                   </button>
//                   <button
//                     onClick={() => setShowMobileMenu(!showMobileMenu)}
//                     className="sm:hidden p-2 rounded-lg bg-white shadow-sm border border-gray-200"
//                     type="button"
//                   >
//                     <Menu className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
                
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
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
//               <MetricCard
//                 title={`إجمالي طلبات ${activeOption}`}
//                 value={totalRequests}
//                 icon={activeOption === "المعلمون" ? User : LandPlot}
//                 color="bg-blue-500"
//               />
//               <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//               <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//               <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("المعلمون")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المعلمون"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المعلمون
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("المدارس")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المدارس"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المدارس
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//               <div className="space-y-3 sm:space-y-4">
//                 {/* Search Bar */}
//                 <div className="w-full">
//                   <div className="relative">
//                     <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder={`البحث في طلبات ${activeOption}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                     />
//                   </div>
//                 </div>

//                 {/* Filters and Actions */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
//                   <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                     {activeOption === "المعلمون" && (
//                       <div className="relative">
//                         <button
//                           onClick={() => setShowFilters(!showFilters)}
//                           className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                           type="button"
//                         >
//                           <Filter className="h-4 w-4" />
//                           <span>التخصص</span>
//                           <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                         </button>
//                         {showFilters && (
//                           <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
//                             <div className="p-2 max-h-60 overflow-y-auto">
//                               <button
//                                 onClick={() => setSelectedSpecialty(null)}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button"
//                               >
//                                 جميع التخصصات
//                               </button>
//                               {Object.entries(specialtyNames).map(([key, value]) => (
//                                 <button
//                                   key={key}
//                                   onClick={() => setSelectedSpecialty(Number.parseInt(key))}
//                                   className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                     selectedSpecialty === Number.parseInt(key) ? "bg-purple-50 text-purple-700" : ""
//                                   }`}
//                                   type="button"
//                                 >
//                                   {value}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Bulk Actions */}
//                   {selectedRequests.size > 0 && (
//                     <div className="flex gap-2 w-full sm:w-auto">
//                       <button
//                         onClick={() => handleBulkAction("approve")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Check className="h-4 w-4" />
//                         )}
//                         <span>موافقة ({selectedRequests.size})</span>
//                       </button>
//                       <button
//                         onClick={() => handleBulkAction("reject")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <X className="h-4 w-4" />
//                         )}
//                         <span>رفض ({selectedRequests.size})</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Requests List */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//               {currentRequests.length === 0 ? (
//                 <div className="text-center py-8 sm:py-12 px-4">
//                   <div className="text-gray-400 mb-4">
//                     {activeOption === "المعلمون" ? (
//                       <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     ) : (
//                       <LandPlot className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     )}
//                   </div>
//                   <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                   <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Desktop Table */}
//                   <div className="hidden xl:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             <input
//                               type="checkbox"
//                               checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                               onChange={toggleSelectAll}
//                               className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                             />
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "المعلم" : "المدرسة"}
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             البريد الإلكتروني
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "رقم الواتساب" : "جهة الاتصال"}
//                           </th>
//                           {activeOption === "المعلمون" && (
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               التخصص
//                             </th>
//                           )}
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             تاريخ الطلب
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {activeOption === "المعلمون"
//                           ? filteredTeacherRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                         <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">
//                                         {request.firstName} {request.lastName}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.whatsUpNumber}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </span>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))
//                           : filteredSchoolRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                         <LandPlot className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div>
//                                     <div className="text-sm font-medium text-gray-900">{request.contactPerson}</div>
//                                     <div className="flex items-center text-sm text-gray-500">
//                                       <Phone className="h-3 w-3 ml-1" />
//                                       {request.phone}
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Mobile/Tablet Cards */}
//                   <div className="xl:hidden">
//                     <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                           onChange={toggleSelectAll}
//                           className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                         />
//                         <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                       </label>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.firstName} {request.lastName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                       {specialtyNames[request.specialty] || "غير محدد"}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.whatsUpNumber}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         : filteredSchoolRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <LandPlot className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.schoolName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//                                       {request.contactPerson}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.phone}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 </>
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
// import { Plus } from 'lucide-react'
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
//   Menu,
// } from "lucide-react"

// interface TeacherJoiningRequest {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
//   createdAt: string
//   specialty: number
// }

// interface SchoolJoiningRequest {
//   id: string
//   schoolName: string
//   email: string
//   contactPerson: string
//   phone: string
//   createdAt: string
//   status: string
// }

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

// export default function AdminDashboard() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([])
//   const [schoolRequests, setSchoolRequests] = useState<SchoolJoiningRequest[]>([])
//   const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([])
//   const [specialtiesLoading, setSpecialtiesLoading] = useState<boolean>(true)
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون")
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set())
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [showFilters, setShowFilters] = useState<boolean>(false)
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null)
//   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
//   const router = useRouter()

//   // Create a map of specialty IDs to names for easy lookup
//   const specialtyNames = specialties.reduce((acc, specialty) => {
//     acc[specialty.id] = specialty.value
//     return acc
//   }, {} as { [key: number]: string })

//   useEffect(() => {
//     fetchSpecialties()
//     fetchData()
//   }, [activeOption])

//   const fetchSpecialties = async () => {
//     setSpecialtiesLoading(true)
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<TeacherSpecialty[]>>(
//         `${BASE_URL}/api/TeacherSpecialty/GetAllTeacherSpecialties`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )

//       if (response.data.succeeded) {
//         setSpecialties(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل التخصصات")
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
//                 return fetchSpecialties()
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "لم يتم العثور على نقطة النهاية للتخصصات"
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
      
//       console.error("Error fetching specialties:", error)
//       // Use fallback specialties if API fails
//       setSpecialties([
//         { id: 0, value: "عام" },
//         { id: 1, value: "رياضيات" },
//         { id: 2, value: "علوم" },
//         { id: 3, value: "لغة عربية" },
//         { id: 4, value: "لغة إنجليزية" },
//         { id: 5, value: "تاريخ" },
//         { id: 6, value: "جغرافيا" },
//       ])
//     } finally {
//       setSpecialtiesLoading(false)
//     }
//   }

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<TeacherJoiningRequest[]>>(
//         `${BASE_URL}/api/JoiningRequest/AllTeacherJoiningRequest`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         setTeacherRequests(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين")
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchData()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error approving request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleReject = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error rejecting request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return
//     setActionLoading("bulk")
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       } else {
//         setSchoolRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       }
//       setSelectedRequests(new Set())
//     } catch (error) {
//       console.error("Error with bulk action:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(id)) {
//         newSet.delete(id)
//       } else {
//         newSet.add(id)
//       }
//       return newSet
//     })
//   }

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolRequests
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set())
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)))
//     }
//   }

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty
//     return matchesSearch && matchesSpecialty
//   })

//   const filteredSchoolRequests = schoolRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
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
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
//           <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   if (loading || specialtiesLoading) {
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

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolRequests
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolRequests.length

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50" dir="rtl">
//         <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-4 sm:mb-6 lg:mb-8">
//               <div className="flex flex-col space-y-3 sm:space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
//                       طلبات الانضمام
//                     </h1>
//                     <p className="text-xs sm:text-sm lg:text-base text-gray-600">اهلا بك في صفحة طلبات الانضمام</p>
//                   </div>
//                   <button
//                     onClick={() => router.push("/admin/pages/join-requests/specialty")}
//                     className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إدارة التخصصات
//                   </button>
//                   <button
//                     onClick={() => setShowMobileMenu(!showMobileMenu)}
//                     className="sm:hidden p-2 rounded-lg bg-white shadow-sm border border-gray-200"
//                     type="button"
//                   >
//                     <Menu className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
                
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
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
//               <MetricCard
//                 title={`إجمالي طلبات ${activeOption}`}
//                 value={totalRequests}
//                 icon={activeOption === "المعلمون" ? User : LandPlot}
//                 color="bg-blue-500"
//               />
//               <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//               <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//               <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("المعلمون")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المعلمون"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المعلمون
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("المدارس")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المدارس"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المدارس
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//               <div className="space-y-3 sm:space-y-4">
//                 {/* Search Bar */}
//                 <div className="w-full">
//                   <div className="relative">
//                     <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder={`البحث في طلبات ${activeOption}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                     />
//                   </div>
//                 </div>

//                 {/* Filters and Actions */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
//                   <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                     {activeOption === "المعلمون" && (
//                       <div className="relative">
//                         <button
//                           onClick={() => setShowFilters(!showFilters)}
//                           className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                           type="button"
//                         >
//                           <Filter className="h-4 w-4" />
//                           <span>التخصص</span>
//                           <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                         </button>
//                         {showFilters && (
//                           <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
//                             <div className="p-2 max-h-60 overflow-y-auto">
//                               <button
//                                 onClick={() => setSelectedSpecialty(null)}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button"
//                               >
//                                 جميع التخصصات
//                               </button>
//                               {specialties.map((specialty) => (
//                                 <button
//                                   key={specialty.id}
//                                   onClick={() => setSelectedSpecialty(specialty.id)}
//                                   className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                     selectedSpecialty === specialty.id ? "bg-purple-50 text-purple-700" : ""
//                                   }`}
//                                   type="button"
//                                 >
//                                   {specialty.value}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Bulk Actions */}
//                   {selectedRequests.size > 0 && (
//                     <div className="flex gap-2 w-full sm:w-auto">
//                       <button
//                         onClick={() => handleBulkAction("approve")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Check className="h-4 w-4" />
//                         )}
//                         <span>موافقة ({selectedRequests.size})</span>
//                       </button>
//                       <button
//                         onClick={() => handleBulkAction("reject")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <X className="h-4 w-4" />
//                         )}
//                         <span>رفض ({selectedRequests.size})</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Requests List */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//               {currentRequests.length === 0 ? (
//                 <div className="text-center py-8 sm:py-12 px-4">
//                   <div className="text-gray-400 mb-4">
//                     {activeOption === "المعلمون" ? (
//                       <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     ) : (
//                       <LandPlot className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     )}
//                   </div>
//                   <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                   <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Desktop Table */}
//                   <div className="hidden xl:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             <input
//                               type="checkbox"
//                               checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                               onChange={toggleSelectAll}
//                               className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                             />
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "المعلم" : "المدرسة"}
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             البريد الإلكتروني
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "رقم الواتساب" : "جهة الاتصال"}
//                           </th>
//                           {activeOption === "المعلمون" && (
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               التخصص
//                             </th>
//                           )}
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             تاريخ الطلب
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {activeOption === "المعلمون"
//                           ? filteredTeacherRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                         <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">
//                                         {request.firstName} {request.lastName}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.whatsUpNumber}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </span>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))
//                           : filteredSchoolRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                         <LandPlot className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div>
//                                     <div className="text-sm font-medium text-gray-900">{request.contactPerson}</div>
//                                     <div className="flex items-center text-sm text-gray-500">
//                                       <Phone className="h-3 w-3 ml-1" />
//                                       {request.phone}
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Mobile/Tablet Cards */}
//                   <div className="xl:hidden">
//                     <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                           onChange={toggleSelectAll}
//                           className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                         />
//                         <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                       </label>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.firstName} {request.lastName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                       {specialtyNames[request.specialty] || "غير محدد"}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.whatsUpNumber}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         : filteredSchoolRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <LandPlot className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.schoolName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//                                       {request.contactPerson}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.phone}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 </>
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
// import { Plus } from 'lucide-react'
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
//   Menu,
//   MapPin,
// } from "lucide-react"

// interface TeacherJoiningRequest {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
//   createdAt: string
//   specialty: number
// }

// interface SchoolOfficialJoiningRequest {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
//   createdAt: string
//   applicantSchool: number
//   schoolName: string
//   schoolCity: string
// }

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

// export default function AdminDashboard() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([])
//   const [schoolOfficialRequests, setSchoolOfficialRequests] = useState<SchoolOfficialJoiningRequest[]>([])
//   const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([])
//   const [specialtiesLoading, setSpecialtiesLoading] = useState<boolean>(true)
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون")
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set())
//   const [actionLoading, setActionLoading] = useState<string | null>(null)
//   const [showFilters, setShowFilters] = useState<boolean>(false)
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null)
//   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
//   const router = useRouter()

//   // Create a map of specialty IDs to names for easy lookup
//   const specialtyNames = specialties.reduce((acc, specialty) => {
//     acc[specialty.id] = specialty.value
//     return acc
//   }, {} as { [key: number]: string })

//   useEffect(() => {
//     fetchSpecialties()
//     fetchData()
//   }, [activeOption])

//   const fetchSpecialties = async () => {
//     setSpecialtiesLoading(true)
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<TeacherSpecialty[]>>(
//         `${BASE_URL}/api/TeacherSpecialty/GetAllTeacherSpecialties`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )

//       if (response.data.succeeded) {
//         setSpecialties(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل التخصصات")
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
//                 return fetchSpecialties()
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "لم يتم العثور على نقطة النهاية للتخصصات"
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
      
//       console.error("Error fetching specialties:", error)
//       // Use fallback specialties if API fails
//       setSpecialties([
//         { id: 0, value: "عام" },
//         { id: 1, value: "رياضيات" },
//         { id: 2, value: "علوم" },
//         { id: 3, value: "لغة عربية" },
//         { id: 4, value: "لغة إنجليزية" },
//         { id: 5, value: "تاريخ" },
//         { id: 6, value: "جغرافيا" },
//       ])
//     } finally {
//       setSpecialtiesLoading(false)
//     }
//   }

//   const fetchTeacherData = async () => {
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<TeacherJoiningRequest[]>>(
//         `${BASE_URL}/api/JoiningRequest/AllTeacherJoiningRequest`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         console.log("teacherRequests",response.data.data)
//         setTeacherRequests(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين")
//       }
//     } catch (error) {
//       throw error // Re-throw to be handled by main fetchData function
//     }
//   }

//   const fetchSchoolOfficialData = async () => {
//     const token = Cookies.get("adminToken")

//     try {
//       const response = await axios.get<ApiResponse<SchoolOfficialJoiningRequest[]>>(
//         `${BASE_URL}/api/JoiningRequest/AllSchoolOfficialJoiningRequest`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.succeeded) {
//         setSchoolOfficialRequests(response.data.data)
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المدارس")
//       }
//     } catch (error) {
//       throw error // Re-throw to be handled by main fetchData function
//     }
//   }

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)

//     try {
//       if (activeOption === "المعلمون") {
//         await fetchTeacherData()
//       } else {
//         await fetchSchoolOfficialData()
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchData()
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
//       console.error("Error fetching data:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error approving request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleReject = async (id: string) => {
//     setActionLoading(id)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id))
//       } else {
//         setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== id))
//       }
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(id)
//         return newSet
//       })
//     } catch (error) {
//       console.error("Error rejecting request:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return
//     setActionLoading("bulk")
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))
//       if (activeOption === "المعلمون") {
//         setTeacherRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       } else {
//         setSchoolOfficialRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)))
//       }
//       setSelectedRequests(new Set())
//     } catch (error) {
//       console.error("Error with bulk action:", error)
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(id)) {
//         newSet.delete(id)
//       } else {
//         newSet.add(id)
//       }
//       return newSet
//     })
//   }

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolOfficialRequests
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set())
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)))
//     }
//   }

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty
//     return matchesSearch && matchesSpecialty
//   })

//   const filteredSchoolOfficialRequests = schoolOfficialRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.schoolCity.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
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
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
//           <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   )

//   if (loading || specialtiesLoading) {
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

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolOfficialRequests
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolOfficialRequests.length

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50" dir="rtl">
//         <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-4 sm:mb-6 lg:mb-8">
//               <div className="flex flex-col space-y-3 sm:space-y-4">
//                 <div className="flex flex-col gap-6 md:gap-0 sm:flex-row items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
//                       طلبات الانضمام
//                     </h1>
//                     <p className="text-xs sm:text-sm lg:text-base text-gray-600">اهلا بك في صفحة طلبات الانضمام</p>
//                   </div>
//                   <button
//                     onClick={() => router.push("/admin/pages/join-requests/specialty")}
//                     className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إدارة التخصصات
//                   </button>
//                   {/* <button
//                     onClick={() => setShowMobileMenu(!showMobileMenu)}
//                     className="sm:hidden p-2 rounded-lg bg-white shadow-sm border border-gray-200"
//                     type="button"
//                   >
//                     <Menu className="h-5 w-5 text-gray-600" />
//                   </button> */}
//                 </div>
                
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
//               </div>
//             </div>

//             {/* Metrics Cards */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
//               <MetricCard
//                 title={`إجمالي طلبات ${activeOption}`}
//                 value={totalRequests}
//                 icon={activeOption === "المعلمون" ? User : LandPlot}
//                 color="bg-blue-500"
//               />
//               <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//               <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//               <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
//               <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
//                 <div className="flex relative">
//                   <button
//                     onClick={() => setActiveOption("المعلمون")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المعلمون"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المعلمون
//                   </button>
//                   <button
//                     onClick={() => setActiveOption("المدارس")}
//                     className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                       activeOption === "المدارس"
//                         ? "text-purple-700 bg-white shadow-md"
//                         : "text-white hover:text-purple-100"
//                     }`}
//                     type="button"
//                   >
//                     المدارس
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//               <div className="space-y-3 sm:space-y-4">
//                 {/* Search Bar */}
//                 <div className="w-full">
//                   <div className="relative">
//                     <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder={`البحث في طلبات ${activeOption}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                     />
//                   </div>
//                 </div>

//                 {/* Filters and Actions */}
//                 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
//                   <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                     {activeOption === "المعلمون" && (
//                       <div className="relative">
//                         <button
//                           onClick={() => setShowFilters(!showFilters)}
//                           className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                           type="button"
//                         >
//                           <Filter className="h-4 w-4" />
//                           <span>التخصص</span>
//                           <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                         </button>
//                         {showFilters && (
//                           <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
//                             <div className="p-2 max-h-60 overflow-y-auto">
//                               <button
//                                 onClick={() => setSelectedSpecialty(null)}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button"
//                               >
//                                 جميع التخصصات
//                               </button>
//                               {specialties.map((specialty) => (
//                                 <button
//                                   key={specialty.id}
//                                   onClick={() => setSelectedSpecialty(specialty.id)}
//                                   className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                     selectedSpecialty === specialty.id ? "bg-purple-50 text-purple-700" : ""
//                                   }`}
//                                   type="button"
//                                 >
//                                   {specialty.value}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Bulk Actions */}
//                   {selectedRequests.size > 0 && (
//                     <div className="flex gap-2 w-full sm:w-auto">
//                       <button
//                         onClick={() => handleBulkAction("approve")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Check className="h-4 w-4" />
//                         )}
//                         <span>موافقة ({selectedRequests.size})</span>
//                       </button>
//                       <button
//                         onClick={() => handleBulkAction("reject")}
//                         disabled={actionLoading === "bulk"}
//                         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                         type="button"
//                       >
//                         {actionLoading === "bulk" ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <X className="h-4 w-4" />
//                         )}
//                         <span>رفض ({selectedRequests.size})</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Requests List */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//               {currentRequests.length === 0 ? (
//                 <div className="text-center py-8 sm:py-12 px-4">
//                   <div className="text-gray-400 mb-4">
//                     {activeOption === "المعلمون" ? (
//                       <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     ) : (
//                       <LandPlot className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                     )}
//                   </div>
//                   <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                   <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Desktop Table */}
//                   <div className="hidden xl:block overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             <input
//                               type="checkbox"
//                               checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                               onChange={toggleSelectAll}
//                               className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                             />
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "المعلم" : "مسؤول المدرسة"}
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             البريد الإلكتروني
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {activeOption === "المعلمون" ? "رقم الواتساب" : "رقم الواتساب"}
//                           </th>
//                           {activeOption === "المعلمون" ? (
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               التخصص
//                             </th>
//                           ) : (
//                             <>
//                               <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 اسم المدرسة
//                               </th>
//                               <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 المدينة
//                               </th>
//                             </>
//                           )}
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             تاريخ الطلب
//                           </th>
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             الإجراءات
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {activeOption === "المعلمون"
//                           ? filteredTeacherRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                         <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">
//                                         {request.firstName} {request.lastName}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.whatsUpNumber}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </span>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))
//                           : filteredSchoolOfficialRequests.map((request) => (
//                               <tr key={request.id} className="hover:bg-gray-50">
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                   />
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                       <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                         <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
//                                       </div>
//                                     </div>
//                                     <div className="mr-3 lg:mr-4">
//                                       <div className="text-sm font-medium text-gray-900">
//                                         {request.firstName} {request.lastName}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                     <span className="truncate max-w-xs">{request.email}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.whatsUpNumber}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <MapPin className="h-4 w-4 ml-2 text-gray-400" />
//                                     {request.schoolCity}
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                   <div className="flex items-center text-sm text-gray-900">
//                                     <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                     <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                   </div>
//                                 </td>
//                                 <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                   <div className="flex items-center gap-2">
//                                     <button
//                                       onClick={() => handleApprove(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <Check className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={() => handleReject(request.id)}
//                                       disabled={actionLoading === request.id}
//                                       className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                       type="button"
//                                     >
//                                       {actionLoading === request.id ? (
//                                         <Loader2 className="h-4 w-4 animate-spin" />
//                                       ) : (
//                                         <X className="h-4 w-4" />
//                                       )}
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Mobile/Tablet Cards */}
//                   <div className="xl:hidden">
//                     <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                           onChange={toggleSelectAll}
//                           className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                         />
//                         <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                       </label>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.firstName} {request.lastName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                       {specialtyNames[request.specialty] || "غير محدد"}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.whatsUpNumber}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         : filteredSchoolOfficialRequests.map((request) => (
//                             <div key={request.id} className="p-3 sm:p-4">
//                               <div className="flex items-start justify-between mb-3">
//                                 <div className="flex items-center flex-1 min-w-0">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedRequests.has(request.id)}
//                                     onChange={() => toggleSelectRequest(request.id)}
//                                     className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                   />
//                                   <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                     <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div className="min-w-0 flex-1">
//                                     <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                       {request.firstName} {request.lastName}
//                                     </h3>
//                                     <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//                                       مسؤول في {request.schoolName}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="space-y-2 text-sm">
//                                 <div className="flex items-center text-gray-600">
//                                   <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.email}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.whatsUpNumber}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <LandPlot className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="truncate">{request.schoolName}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <MapPin className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span>{request.schoolCity}</span>
//                                 </div>
//                                 <div className="flex items-center text-gray-600">
//                                   <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }
















// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Layout from "@/app/admin/Layout/Layout"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
//   MapPin,
//   Plus,
//   Building,
// } from 'lucide-react';
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"


// interface TeacherJoiningRequest {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   whatsUpNumber: string;
//   createdAt: string;
//   specialty: number;
// }

// interface SchoolOfficialJoiningRequest {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   whatsUpNumber: string;
//   createdAt: string;
//   applicantSchool: number;
//   schoolName: string;
//   schoolCity: string;
// }

// interface TeacherSpecialty {
//   id: number;
//   value: string;
// }

// interface ApiResponse<T> {
//   meta: string;
//   succeeded: boolean;
//   message: string;
//   errors: string[];
//   data: T;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"


// function App() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([]);
//   const [schoolOfficialRequests, setSchoolOfficialRequests] = useState<SchoolOfficialJoiningRequest[]>([]);
//   const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([]);
//   const [specialtiesLoading, setSpecialtiesLoading] = useState<boolean>(true);
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [showFilters, setShowFilters] = useState<boolean>(false);
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const router = useRouter();
//   // Create axios instance with default config
//   const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       'Authorization': `Bearer ${Cookies.get("adminToken")}`,
//       'Content-Type': 'application/json',
//     },
//     timeout: 30000,
//   });

//   // Request interceptor for debugging
//   apiClient.interceptors.request.use((config) => {
//     console.log('Making request to:', config.url);
//     return config;
//   });

//   // Response interceptor for error handling
//   apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       console.error('API Error:', error);
//       return Promise.reject(error);
//     }
//   );

//   // Create a map of specialty IDs to names for easy lookup
//   const specialtyNames = specialties.reduce((acc, specialty) => {
//     acc[specialty.id] = specialty.value;
//     return acc;
//   }, {} as { [key: number]: string });

//   useEffect(() => {
//     fetchSpecialties();
//     fetchData();
//   }, [activeOption]);

//   // Auto-hide success message after 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchSpecialties = async () => {
//     setSpecialtiesLoading(true);
//     try {
//       const response = await apiClient.get<ApiResponse<TeacherSpecialty[]>>(
//         '/api/TeacherSpecialty/GetAllTeacherSpecialties'
//       );

//       if (response.data.succeeded) {
//         setSpecialties(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل التخصصات");
//       }
//     } catch (error) {
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSpecialties()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSpecialties()
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
//       console.error("Error updating test class:", error)
//     } finally {
//       setSpecialtiesLoading(false);
//     }
//   };

//   const fetchTeacherData = async () => {
//     try {
//       const response = await apiClient.get<ApiResponse<TeacherJoiningRequest[]>>(
//         '/api/JoiningRequest/AllTeacherJoiningRequest'
//       );

//       if (response.data.succeeded) {
//         console.log("teacherRequests", response.data.data);
//         setTeacherRequests(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين");
//       }
//     } catch (error) {
//       // For demo purposes, use mock data when API fails
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTeacherData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTeacherData()
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
//       console.error("Error updating test class:", error)
//     }
//   };

//   const fetchSchoolOfficialData = async () => {
//     try {
//       const response = await apiClient.get<ApiResponse<SchoolOfficialJoiningRequest[]>>(
//         '/api/JoiningRequest/AllSchoolOfficialJoiningRequest'
//       );

//       if (response.data.succeeded) {
//         console.log("schoolOfficialRequests", response.data.data);
//         setSchoolOfficialRequests(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المدارس");
//       }
//     } catch (error) {
//       // For demo purposes, use mock data when API fails
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSchoolOfficialData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSchoolOfficialData()
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
//       console.error("Error updating test class:", error)
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (activeOption === "المعلمون") {
//         await fetchTeacherData();
//       } else {
//         await fetchSchoolOfficialData();
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ غير معروف";
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
//               break;
//             case 403:
//               errorMessage = "ليس لديك صلاحية للوصول إلى هذه البيانات.";
//               break;
//             case 404:
//               errorMessage = `لم يتم العثور على نقطة النهاية المطلوبة: ${error.config?.url}`;
//               break;
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً.";
//               break;
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`;
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت.";
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`;
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف";
//       }
      
//       console.error("Error fetching data:", error);
//       // Don't set error for demo purposes since we're using mock data
//       // setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveTeacher = async (request: TeacherJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       const payload = {
//         joiningRequestId: request.id,
//         firstName: request.firstName,
//         lastName: request.lastName,
//         email: request.email,
//         whatsUpNumber: request.whatsUpNumber,
//       };

//       const response = await apiClient.post<ApiResponse<number>>(
//         '/api/Teacher/AddTeacherByRequest',
//         payload
//       );

//       if (response.data.succeeded) {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== request.id));
//         setSelectedRequests((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(request.id);
//           return newSet;
//         });
//         setSuccessMessage(`تم قبول طلب المعلم ${request.firstName} ${request.lastName} بنجاح`);
//       } else {
//         throw new Error(response.data.message || "فشل في قبول طلب المعلم");
//       }
//     } catch (error) {
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleApproveTeacher(request)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleApproveTeacher(request)
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
//       console.error("Error updating test class:", error)
//       setError(errorMessage)
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleApproveSchoolOfficial = async (request: SchoolOfficialJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       // For school officials, we would need a different endpoint
//       // For now, we'll simulate the API call
//       const payload = {
//         joiningRequestId: request.id,
//         firstName: request.firstName,
//         lastName: request.lastName,
//         email: request.email,
//         whatsUpNumber: request.whatsUpNumber,
//         schoolName: request.schoolName,
//         schoolCity: request.schoolCity,
//       };

//       // Simulate API call since we don't have the school official endpoint
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== request.id));
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(request.id);
//         return newSet;
//       });
//       setSuccessMessage(`تم قبول طلب مسؤول المدرسة ${request.firstName} ${request.lastName} بنجاح`);
//     } catch (error) {
//       console.error("Error approving school official:", error);
//       setError("فشل في قبول طلب مسؤول المدرسة");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleApprove = async (id: string) => {
//     if (activeOption === "المعلمون") {
//       const request = teacherRequests.find(req => req.id === id);
//       if (request) {
//         await handleApproveTeacher(request);
//       }
//     } else {
//       const request = schoolOfficialRequests.find(req => req.id === id);
//       if (request) {
//         await handleApproveSchoolOfficial(request);
//       }
//     }
//   };

//   const handleReject = async (id: string) => {
//     setActionLoading(id);
//     try {
//       // For rejection, we would typically have a different endpoint
//       // For now, we'll simulate the API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
      
//       if (activeOption === "المعلمون") {
//         const request = teacherRequests.find(req => req.id === id);
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== id));
//         if (request) {
//           setSuccessMessage(`تم رفض طلب المعلم ${request.firstName} ${request.lastName}`);
//         }
//       } else {
//         const request = schoolOfficialRequests.find(req => req.id === id);
//         setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== id));
//         if (request) {
//           setSuccessMessage(`تم رفض طلب مسؤول المدرسة ${request.firstName} ${request.lastName}`);
//         }
//       }
      
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(id);
//         return newSet;
//       });
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       setError("فشل في رفض الطلب");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return;
//     setActionLoading("bulk");
    
//     try {
//       const requestIds = Array.from(selectedRequests);
      
//       if (action === "approve") {
//         // Process approvals
//         for (const id of requestIds) {
//           if (activeOption === "المعلمون") {
//             const request = teacherRequests.find(req => req.id === id);
//             if (request) {
//               await handleApproveTeacher(request);
//             }
//           } else {
//             const request = schoolOfficialRequests.find(req => req.id === id);
//             if (request) {
//               await handleApproveSchoolOfficial(request);
//             }
//           }
//         }
//         setSuccessMessage(`تم قبول ${requestIds.length} طلب بنجاح`);
//       } else {
//         // Process rejections
//         await new Promise((resolve) => setTimeout(resolve, 1500));
        
//         if (activeOption === "المعلمون") {
//           setTeacherRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)));
//         } else {
//           setSchoolOfficialRequests((prev) => prev.filter((req) => !selectedRequests.has(req.id)));
//         }
//         setSuccessMessage(`تم رفض ${requestIds.length} طلب بنجاح`);
//       }
      
//       setSelectedRequests(new Set());
//     } catch (error) {
//       console.error("Error with bulk action:", error);
//       setError(`فشل في تنفيذ العملية المجمعة`);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   };

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolOfficialRequests;
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set());
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)));
//     }
//   };

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty;
//     return matchesSearch && matchesSpecialty;
//   });

//   const filteredSchoolOfficialRequests = schoolOfficialRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.schoolCity.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string;
//     value: string | number;
//     icon: any;
//     color: string;
//   }) => (
   
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
//           <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
//         </div>
//       </div>
//     </div>
   
//   );

//   if (loading || specialtiesLoading) {
//     return (
      
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-sm sm:text-base">جاري التحميل...</p>
//         </div>
//       </div>
     
//     );
//   }

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolOfficialRequests;
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolOfficialRequests.length;

//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//       <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-4 sm:mb-6 lg:mb-8">
//             <div className="flex flex-col space-y-3 sm:space-y-4">
//               <div className="flex flex-col gap-6 md:gap-0 sm:flex-row items-center justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
//                     طلبات الانضمام
//                   </h1>
//                   <p className="text-xs sm:text-sm lg:text-base text-gray-600">أهلاً بك في صفحة طلبات الانضمام</p>
//                 </div>
//                 <button
//                   className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                   type="button"
//                 >
//                   <Plus className="h-5 w-5 ml-2" />
//                   إدارة التخصصات
//                 </button>
//               </div>

//               {/* Success Message */}
//               {successMessage && (
//                 <div className="flex items-start p-3 sm:p-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
//                   <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs sm:text-sm break-words">{successMessage}</p>
//                   </div>
//                   <button
//                     onClick={() => setSuccessMessage(null)}
//                     className="ml-2 text-green-400 hover:text-green-600 flex-shrink-0"
//                     type="button"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="flex items-start p-3 sm:p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
//                   <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs sm:text-sm break-words">{error}</p>
//                   </div>
//                   <button
//                     onClick={() => setError(null)}
//                     className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0"
//                     type="button"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
//             <MetricCard
//               title={`إجمالي طلبات ${activeOption}`}
//               value={totalRequests}
//               icon={activeOption === "المعلمون" ? User : Building}
//               color="bg-blue-500"
//             />
//             <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//             <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//             <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
//               <div className="flex relative">
//                 <button
//                   onClick={() => setActiveOption("المعلمون")}
//                   className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المعلمون"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المعلمون
//                 </button>
//                 <button
//                   onClick={() => setActiveOption("المدارس")}
//                   className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المدارس"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المدارس
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//             <div className="space-y-3 sm:space-y-4">
//               {/* Search Bar */}
//               <div className="w-full">
//                 <div className="relative">
//                   <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder={`البحث في طلبات ${activeOption}...`}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                   />
//                 </div>
//               </div>

//               {/* Filters and Actions */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
//                 <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                   {activeOption === "المعلمون" && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                         type="button"
//                       >
//                         <Filter className="h-4 w-4" />
//                         <span>التخصص</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                       </button>
//                       {showFilters && (
//                         <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
//                           <div className="p-2 max-h-60 overflow-y-auto">
//                             <button
//                               onClick={() => setSelectedSpecialty(null)}
//                               className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                 selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                               }`}
//                               type="button"
//                             >
//                               جميع التخصصات
//                             </button>
//                             {specialties.map((specialty) => (
//                               <button
//                                 key={specialty.id}
//                                 onClick={() => setSelectedSpecialty(specialty.id)}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === specialty.id ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button"
//                               >
//                                 {specialty.value}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Bulk Actions */}
//                 {selectedRequests.size > 0 && (
//                   <div className="flex gap-2 w-full sm:w-auto">
//                     <button
//                       onClick={() => handleBulkAction("approve")}
//                       disabled={actionLoading === "bulk"}
//                       className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                       type="button"
//                     >
//                       {actionLoading === "bulk" ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Check className="h-4 w-4" />
//                       )}
//                       <span>موافقة ({selectedRequests.size})</span>
//                     </button>
//                     <button
//                       onClick={() => handleBulkAction("reject")}
//                       disabled={actionLoading === "bulk"}
//                       className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                       type="button"
//                     >
//                       {actionLoading === "bulk" ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <X className="h-4 w-4" />
//                       )}
//                       <span>رفض ({selectedRequests.size})</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Requests List */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//             {currentRequests.length === 0 ? (
//               <div className="text-center py-8 sm:py-12 px-4">
//                 <div className="text-gray-400 mb-4">
//                   {activeOption === "المعلمون" ? (
//                     <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                   ) : (
//                     <Building className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                   )}
//                 </div>
//                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                 <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table */}
//                 <div className="hidden xl:block overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         {/* <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <input
//                             type="checkbox"
//                             checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                             onChange={toggleSelectAll}
//                             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                           />
//                         </th> */}
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {activeOption === "المعلمون" ? "المعلم" : "مسؤول المدرسة"}
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           رقم الواتساب
//                         </th>
//                         {activeOption === "المعلمون" ? (
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             التخصص
//                           </th>
//                         ) : (
//                           <>
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               اسم المدرسة
//                             </th>
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               المدينة
//                             </th>
//                           </>
//                         )}
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           تاريخ الطلب
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           الإجراءات
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <tr key={request.id} className="hover:bg-gray-50">
//                               {/* <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                 />
//                               </td> */}
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                     <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div className="mr-3 lg:mr-4">
//                                     <div className="text-sm font-medium text-gray-900">
//                                       {request.firstName} {request.lastName}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                   <span className="truncate max-w-xs">{request.email}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.whatsUpNumber}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {specialtyNames[request.specialty] || "غير محدد"}
//                                 </span>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="موافقة"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="رفض"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         : filteredSchoolOfficialRequests.map((request) => (
//                             <tr key={request.id} className="hover:bg-gray-50">
//                               {/* <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                 />
//                               </td> */}
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                     <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div className="mr-3 lg:mr-4">
//                                     <div className="text-sm font-medium text-gray-900">
//                                       {request.firstName} {request.lastName}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                   <span className="truncate max-w-xs">{request.email}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.whatsUpNumber}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <MapPin className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.schoolCity}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="موافقة"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="رفض"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile/Tablet Cards */}
//                 <div className="xl:hidden">
//                   <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//                     {/* <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                         onChange={toggleSelectAll}
//                         className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                       />
//                       <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                     </label> */}
//                   </div>
//                   <div className="divide-y divide-gray-200">
//                     {activeOption === "المعلمون"
//                       ? filteredTeacherRequests.map((request) => (
//                           <div key={request.id} className="p-3 sm:p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex items-center flex-1 min-w-0">
//                                 {/* <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                 /> */}
//                                 <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                   <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                     <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                                   </div>
//                                 </div>
//                                 <div className="min-w-0 flex-1">
//                                   <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                     {request.firstName} {request.lastName}
//                                   </h3>
//                                   <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                 <button
//                                   onClick={() => handleApprove(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="موافقة"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <Check className="h-4 w-4" />
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => handleReject(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="رفض"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <X className="h-4 w-4" />
//                                   )}
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center text-gray-600">
//                                 <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.email}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.whatsUpNumber}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="text-xs">{formatDate(request.createdAt)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       : filteredSchoolOfficialRequests.map((request) => (
//                           <div key={request.id} className="p-3 sm:p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex items-center flex-1 min-w-0">
//                                 {/* <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                 /> */}
//                                 <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                   <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                     <User className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
//                                   </div>
//                                 </div>
//                                 <div className="min-w-0 flex-1">
//                                   <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                     {request.firstName} {request.lastName}
//                                   </h3>
//                                   <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//                                     مسؤول في {request.schoolName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                 <button
//                                   onClick={() => handleApprove(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="موافقة"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <Check className="h-4 w-4" />
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => handleReject(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="رفض"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <X className="h-4 w-4" />
//                                   )}
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center text-gray-600">
//                                 <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.email}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.whatsUpNumber}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Building className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.schoolName}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <MapPin className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.schoolCity}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="text-xs">{formatDate(request.createdAt)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// }

// export default App;


















// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Layout from "@/app/admin/Layout/Layout"
// import Cookies from "js-cookie"
// import {
//   LandPlot,
//   AlertCircle,
//   Eye,
//   X,
//   Loader2,
//   Check,
//   Clock,
//   Mail,
//   Phone,
//   User,
//   Calendar,
//   ChevronDown,
//   Search,
//   Filter,
//   MapPin,
//   Plus,
//   Building,
// } from 'lucide-react';
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"


// interface TeacherJoiningRequest {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   whatsUpNumber: string;
//   createdAt: string;
//   specialty: number;
// }

// interface SchoolOfficialJoiningRequest {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   whatsUpNumber: string;
//   createdAt: string;
//   applicantSchool: number;
//   schoolName: string;
//   schoolCity: string;
// }

// interface TeacherSpecialty {
//   id: number;
//   value: string;
// }

// interface ApiResponse<T> {
//   meta: string;
//   succeeded: boolean;
//   message: string;
//   errors: string[];
//   data: T;
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"


// function App() {
//   const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([]);
//   const [schoolOfficialRequests, setSchoolOfficialRequests] = useState<SchoolOfficialJoiningRequest[]>([]);
//   const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([]);
//   const [specialtiesLoading, setSpecialtiesLoading] = useState<boolean>(true);
//   const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [showFilters, setShowFilters] = useState<boolean>(false);
//   const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const router = useRouter();
//   // Create axios instance with default config
//   const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       'Authorization': `Bearer ${Cookies.get("adminToken")}`,
//       'Content-Type': 'application/json',
//     },
//     timeout: 30000,
//   });

//   // Request interceptor for debugging
//   apiClient.interceptors.request.use((config) => {
//     console.log('Making request to:', config.url);
//     return config;
//   });

//   // Response interceptor for error handling
//   apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       console.error('API Error:', error);
//       return Promise.reject(error);
//     }
//   );

//   // Create a map of specialty IDs to names for easy lookup
//   const specialtyNames = specialties.reduce((acc, specialty) => {
//     acc[specialty.id] = specialty.value;
//     return acc;
//   }, {} as { [key: number]: string });

//   useEffect(() => {
//     fetchSpecialties();
//     fetchData();
//   }, [activeOption]);

//   // Auto-hide success message after 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchSpecialties = async () => {
//     setSpecialtiesLoading(true);
//     try {
//       const response = await apiClient.get<ApiResponse<TeacherSpecialty[]>>(
//         '/api/TeacherSpecialty/GetAllTeacherSpecialties'
//       );

//       if (response.data.succeeded) {
//         setSpecialties(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل التخصصات");
//       }
//     } catch (error) {
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSpecialties()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSpecialties()
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
//       console.error("Error fetching specialties:", error)
//     } finally {
//       setSpecialtiesLoading(false);
//     }
//   };

//   const fetchTeacherData = async () => {
//     try {
//       const response = await apiClient.get<ApiResponse<TeacherJoiningRequest[]>>(
//         '/api/JoiningRequest/AllTeacherJoiningRequest'
//       );

//       if (response.data.succeeded) {
//         console.log("teacherRequests", response.data.data);
//         setTeacherRequests(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين");
//       }
//     } catch (error) {
//       // For demo purposes, use mock data when API fails
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchTeacherData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchTeacherData()
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
//       console.error("Error fetching teacher data:", error)
//     }
//   };

//   const fetchSchoolOfficialData = async () => {
//     try {
//       const response = await apiClient.get<ApiResponse<SchoolOfficialJoiningRequest[]>>(
//         '/api/JoiningRequest/AllSchoolOfficialJoiningRequest'
//       );

//       if (response.data.succeeded) {
//         console.log("schoolOfficialRequests", response.data.data);
//         setSchoolOfficialRequests(response.data.data);
//       } else {
//         throw new Error(response.data.message || "فشل في تحميل طلبات المدارس");
//       }
//     } catch (error) {
//       // For demo purposes, use mock data when API fails
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchSchoolOfficialData()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchSchoolOfficialData()
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
//       console.error("Error fetching school official data:", error)
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (activeOption === "المعلمون") {
//         await fetchTeacherData();
//       } else {
//         await fetchSchoolOfficialData();
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ غير معروف";
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
//               break;
//             case 403:
//               errorMessage = "ليس لديك صلاحية للوصول إلى هذه البيانات.";
//               break;
//             case 404:
//               errorMessage = `لم يتم العثور على نقطة النهاية المطلوبة: ${error.config?.url}`;
//               break;
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً.";
//               break;
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`;
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت.";
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`;
//         }
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف";
//       }
      
//       console.error("Error fetching data:", error);
//       // Don't set error for demo purposes since we're using mock data
//       // setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproveTeacher = async (request: TeacherJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       const payload = {
//         joiningRequestId: request.id,
//         firstName: request.firstName,
//         lastName: request.lastName,
//         email: request.email,
//         whatsUpNumber: request.whatsUpNumber,
//       };

//       const response = await apiClient.post<ApiResponse<number>>(
//         '/api/Teacher/AddTeacherByRequest',
//         payload
//       );

//       if (response.data.succeeded) {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== request.id));
//         setSelectedRequests((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(request.id);
//           return newSet;
//         });
//         setSuccessMessage(`تم قبول طلب المعلم ${request.firstName} ${request.lastName} بنجاح`);
//       } else {
//         throw new Error(response.data.message || "فشل في قبول طلب المعلم");
//       }
//     } catch (error) {
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleApproveTeacher(request)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleApproveTeacher(request)
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
//       console.error("Error approving teacher:", error)
//       setError(errorMessage)
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleApproveSchoolOfficial = async (request: SchoolOfficialJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       // For school officials, we would need a different endpoint
//       // For now, we'll simulate the API call
//       const payload = {
//         joiningRequestId: request.id,
//         firstName: request.firstName,
//         lastName: request.lastName,
//         email: request.email,
//         whatsUpNumber: request.whatsUpNumber,
//         schoolName: request.schoolName,
//         schoolCity: request.schoolCity,
//       };

//       // Simulate API call since we don't have the school official endpoint
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== request.id));
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(request.id);
//         return newSet;
//       });
//       setSuccessMessage(`تم قبول طلب مسؤول المدرسة ${request.firstName} ${request.lastName} بنجاح`);
//     } catch (error) {
//       console.error("Error approving school official:", error);
//       setError("فشل في قبول طلب مسؤول المدرسة");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleApprove = async (id: string) => {
//     if (activeOption === "المعلمون") {
//       const request = teacherRequests.find(req => req.id === id);
//       if (request) {
//         await handleApproveTeacher(request);
//       }
//     } else {
//       const request = schoolOfficialRequests.find(req => req.id === id);
//       if (request) {
//         await handleApproveSchoolOfficial(request);
//       }
//     }
//   };

//   const handleDeleteTeacherRequest = async (request: TeacherJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       const payload = {
//         id: request.id
//       };
// console.log("payload =======",payload)
//       const response = await apiClient.delete<ApiResponse<string>>(
//         '/api/JoiningRequest/DeleteTeacherJoiningRequest',
//         {
//           data: payload
//         }
//       );

//       if (response.data.succeeded) {
//         setTeacherRequests((prev) => prev.filter((req) => req.id !== request.id));
//         setSelectedRequests((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(request.id);
//           return newSet;
//         });
//         setSuccessMessage(`تم حذف طلب المعلم ${request.firstName} ${request.lastName} بنجاح`);
//       } else {
//         throw new Error(response.data.message || "فشل في حذف طلب المعلم");
//       }
//     } catch (error) {
//       let errorMessage = ""
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleDeleteTeacherRequest(request)
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleDeleteTeacherRequest(request)
//               }
//               errorMessage = "ليس لديك صلاحية لحذف هذا الطلب."
//               router.push("/admin/login")
//               break
//             case 404:
//               errorMessage = "الطلب غير موجود أو تم حذفه مسبقاً"
//               break
//             case 405:
//               errorMessage = "الطلب غير مسموح به"
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
//       console.error("Error deleting teacher request:", error)
//       setError(errorMessage)
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleDeleteSchoolOfficialRequest = async (request: SchoolOfficialJoiningRequest) => {
//     setActionLoading(request.id);
//     try {
//       // For school officials, we would need a similar endpoint like DeleteSchoolOfficialJoiningRequest
//       // For now, we'll simulate the API call until the endpoint is available
//       const payload = {
//         id: request.id
//       };

//       // Uncomment and modify this when the school official delete endpoint is available:
//       // const response = await apiClient.post<ApiResponse<string>>(
//       //   '/api/JoiningRequest/DeleteSchoolOfficialJoiningRequest',
//       //   payload
//       // );

//       // Simulate API call for now
//       await new Promise((resolve) => setTimeout(resolve, 1000));
      
//       setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== request.id));
//       setSelectedRequests((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(request.id);
//         return newSet;
//       });
//       setSuccessMessage(`تم حذف طلب مسؤول المدرسة ${request.firstName} ${request.lastName} بنجاح`);
//     } catch (error) {
//       console.error("Error deleting school official request:", error);
//       setError("فشل في حذف طلب مسؤول المدرسة");
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleReject = async (id: string) => {
//     if (activeOption === "المعلمون") {
//       const request = teacherRequests.find(req => req.id === id);
//       if (request) {
//         await handleDeleteTeacherRequest(request);
//       }
//     } else {
//       const request = schoolOfficialRequests.find(req => req.id === id);
//       if (request) {
//         await handleDeleteSchoolOfficialRequest(request);
//       }
//     }
//   };

//   const handleBulkAction = async (action: "approve" | "reject") => {
//     if (selectedRequests.size === 0) return;
//     setActionLoading("bulk");
    
//     try {
//       const requestIds = Array.from(selectedRequests);
      
//       if (action === "approve") {
//         // Process approvals
//         for (const id of requestIds) {
//           if (activeOption === "المعلمون") {
//             const request = teacherRequests.find(req => req.id === id);
//             if (request) {
//               await handleApproveTeacher(request);
//             }
//           } else {
//             const request = schoolOfficialRequests.find(req => req.id === id);
//             if (request) {
//               await handleApproveSchoolOfficial(request);
//             }
//           }
//         }
//         setSuccessMessage(`تم قبول ${requestIds.length} طلب بنجاح`);
//       } else {
//         // Process rejections/deletions
//         for (const id of requestIds) {
//           if (activeOption === "المعلمون") {
//             const request = teacherRequests.find(req => req.id === id);
//             if (request) {
//               await handleDeleteTeacherRequest(request);
//             }
//           } else {
//             const request = schoolOfficialRequests.find(req => req.id === id);
//             if (request) {
//               await handleDeleteSchoolOfficialRequest(request);
//             }
//           }
//         }
//         setSuccessMessage(`تم حذف ${requestIds.length} طلب بنجاح`);
//       }
      
//       setSelectedRequests(new Set());
//     } catch (error) {
//       console.error("Error with bulk action:", error);
//       setError(`فشل في تنفيذ العملية المجمعة`);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const toggleSelectRequest = (id: string) => {
//     setSelectedRequests((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   };

//   const toggleSelectAll = () => {
//     const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolOfficialRequests;
//     if (selectedRequests.size === currentRequests.length) {
//       setSelectedRequests(new Set());
//     } else {
//       setSelectedRequests(new Set(currentRequests.map((req) => req.id)));
//     }
//   };

//   const filteredTeacherRequests = teacherRequests.filter((request) => {
//     const matchesSearch =
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty;
//     return matchesSearch && matchesSpecialty;
//   });

//   const filteredSchoolOfficialRequests = schoolOfficialRequests.filter((request) => {
//     return (
//       request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.schoolCity.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const MetricCard = ({
//     title,
//     value,
//     icon: Icon,
//     color,
//   }: {
//     title: string;
//     value: string | number;
//     icon: any;
//     color: string;
//   }) => (
   
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
//           <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
//           <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
//         </div>
//       </div>
//     </div>
   
//   );

//   if (loading || specialtiesLoading) {
//     return (
      
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-sm sm:text-base">جاري التحميل...</p>
//         </div>
//       </div>
     
//     );
//   }

//   const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolOfficialRequests;
//   const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolOfficialRequests.length;

//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//       <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-4 sm:mb-6 lg:mb-8">
//             <div className="flex flex-col space-y-3 sm:space-y-4">
//               <div className="flex flex-col gap-6 md:gap-0 sm:flex-row items-center justify-between">
//                 <div className="flex-1 min-w-0">
//                   <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
//                     طلبات الانضمام
//                   </h1>
//                   <p className="text-xs sm:text-sm lg:text-base text-gray-600">أهلاً بك في صفحة طلبات الانضمام</p>
//                 </div>
//                 <button
//                     onClick={() => router.push("/admin/pages/join-requests/specialty")}
//                     className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
//                     type="button"
//                   >
//                     <Plus className="h-5 w-5 ml-2" />
//                     إدارة التخصصات
//                   </button>
//               </div>

//               {/* Success Message */}
//               {successMessage && (
//                 <div className="flex items-start p-3 sm:p-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
//                   <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs sm:text-sm break-words">{successMessage}</p>
//                   </div>
//                   <button
//                     onClick={() => setSuccessMessage(null)}
//                     className="ml-2 text-green-400 hover:text-green-600 flex-shrink-0"
//                     type="button"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="flex items-start p-3 sm:p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
//                   <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs sm:text-sm break-words">{error}</p>
//                   </div>
//                   <button
//                     onClick={() => setError(null)}
//                     className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0"
//                     type="button"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Metrics Cards */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
//             <MetricCard
//               title={`إجمالي طلبات ${activeOption}`}
//               value={totalRequests}
//               icon={activeOption === "المعلمون" ? User : Building}
//               color="bg-blue-500"
//             />
//             <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
//             <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
//             <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
//             <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
//               <div className="flex relative">
//                 <button
//                   onClick={() => setActiveOption("المعلمون")}
//                   className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المعلمون"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المعلمون
//                 </button>
//                 <button
//                   onClick={() => setActiveOption("المدارس")}
//                   className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
//                     activeOption === "المدارس"
//                       ? "text-purple-700 bg-white shadow-md"
//                       : "text-white hover:text-purple-100"
//                   }`}
//                   type="button"
//                 >
//                   المدارس
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
//             <div className="space-y-3 sm:space-y-4">
//               {/* Search Bar */}
//               <div className="w-full">
//                 <div className="relative">
//                   <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder={`البحث في طلبات ${activeOption}...`}
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
//                   />
//                 </div>
//               </div>

//               {/* Filters and Actions */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
//                 <div className="flex flex-wrap gap-2 w-full sm:w-auto">
//                   {activeOption === "المعلمون" && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                         type="button"
//                       >
//                         <Filter className="h-4 w-4" />
//                         <span>التخصص</span>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                       </button>
//                       {showFilters && (
//                         <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
//                           <div className="p-2 max-h-60 overflow-y-auto">
//                             <button
//                               onClick={() => setSelectedSpecialty(null)}
//                               className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                 selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
//                               }`}
//                               type="button"
//                             >
//                               جميع التخصصات
//                             </button>
//                             {specialties.map((specialty) => (
//                               <button
//                                 key={specialty.id}
//                                 onClick={() => setSelectedSpecialty(specialty.id)}
//                                 className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
//                                   selectedSpecialty === specialty.id ? "bg-purple-50 text-purple-700" : ""
//                                 }`}
//                                 type="button"
//                               >
//                                 {specialty.value}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Bulk Actions */}
//                 {selectedRequests.size > 0 && (
//                   <div className="flex gap-2 w-full sm:w-auto">
//                     <button
//                       onClick={() => handleBulkAction("approve")}
//                       disabled={actionLoading === "bulk"}
//                       className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                       type="button"
//                     >
//                       {actionLoading === "bulk" ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Check className="h-4 w-4" />
//                       )}
//                       <span>موافقة ({selectedRequests.size})</span>
//                     </button>
//                     <button
//                       onClick={() => handleBulkAction("reject")}
//                       disabled={actionLoading === "bulk"}
//                       className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
//                       type="button"
//                     >
//                       {actionLoading === "bulk" ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <X className="h-4 w-4" />
//                       )}
//                       <span>حذف ({selectedRequests.size})</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Requests List */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//             {currentRequests.length === 0 ? (
//               <div className="text-center py-8 sm:py-12 px-4">
//                 <div className="text-gray-400 mb-4">
//                   {activeOption === "المعلمون" ? (
//                     <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                   ) : (
//                     <Building className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
//                   )}
//                 </div>
//                 <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
//                 <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table */}
//                 <div className="hidden xl:block overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           <input
//                             type="checkbox"
//                             checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                             onChange={toggleSelectAll}
//                             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                           />
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {activeOption === "المعلمون" ? "المعلم" : "مسؤول المدرسة"}
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           البريد الإلكتروني
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           رقم الواتساب
//                         </th>
//                         {activeOption === "المعلمون" ? (
//                           <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             التخصص
//                           </th>
//                         ) : (
//                           <>
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               اسم المدرسة
//                             </th>
//                             <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                               المدينة
//                             </th>
//                           </>
//                         )}
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           تاريخ الطلب
//                         </th>
//                         <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           الإجراءات
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {activeOption === "المعلمون"
//                         ? filteredTeacherRequests.map((request) => (
//                             <tr key={request.id} className="hover:bg-gray-50">
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                 />
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                     <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
//                                     </div>
//                                   </div>
//                                   <div className="mr-3 lg:mr-4">
//                                     <div className="text-sm font-medium text-gray-900">
//                                       {request.firstName} {request.lastName}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                   <span className="truncate max-w-xs">{request.email}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.whatsUpNumber}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                   {specialtyNames[request.specialty] || "غير محدد"}
//                                 </span>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="موافقة"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="حذف"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         : filteredSchoolOfficialRequests.map((request) => (
//                             <tr key={request.id} className="hover:bg-gray-50">
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                                 />
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
//                                     <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                       <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
//                                     </div>
//                                   </div>
//                                   <div className="mr-3 lg:mr-4">
//                                     <div className="text-sm font-medium text-gray-900">
//                                       {request.firstName} {request.lastName}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
//                                   <span className="truncate max-w-xs">{request.email}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Phone className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.whatsUpNumber}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <MapPin className="h-4 w-4 ml-2 text-gray-400" />
//                                   {request.schoolCity}
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center text-sm text-gray-900">
//                                   <Calendar className="h-4 w-4 ml-2 text-gray-400" />
//                                   <span className="text-xs">{formatDate(request.createdAt)}</span>
//                                 </div>
//                               </td>
//                               <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <div className="flex items-center gap-2">
//                                   <button
//                                     onClick={() => handleApprove(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="موافقة"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <Check className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                   <button
//                                     onClick={() => handleReject(request.id)}
//                                     disabled={actionLoading === request.id}
//                                     className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                     type="button"
//                                     title="حذف"
//                                   >
//                                     {actionLoading === request.id ? (
//                                       <Loader2 className="h-4 w-4 animate-spin" />
//                                     ) : (
//                                       <X className="h-4 w-4" />
//                                     )}
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile/Tablet Cards */}
//                 <div className="xl:hidden">
//                   <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
//                         onChange={toggleSelectAll}
//                         className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
//                       />
//                       <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
//                     </label>
//                   </div>
//                   <div className="divide-y divide-gray-200">
//                     {activeOption === "المعلمون"
//                       ? filteredTeacherRequests.map((request) => (
//                           <div key={request.id} className="p-3 sm:p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex items-center flex-1 min-w-0">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                 />
//                                 <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                   <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                                     <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
//                                   </div>
//                                 </div>
//                                 <div className="min-w-0 flex-1">
//                                   <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                     {request.firstName} {request.lastName}
//                                   </h3>
//                                   <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                                     {specialtyNames[request.specialty] || "غير محدد"}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                 <button
//                                   onClick={() => handleApprove(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="موافقة"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <Check className="h-4 w-4" />
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => handleReject(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="حذف"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <X className="h-4 w-4" />
//                                   )}
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center text-gray-600">
//                                 <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.email}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.whatsUpNumber}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="text-xs">{formatDate(request.createdAt)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       : filteredSchoolOfficialRequests.map((request) => (
//                           <div key={request.id} className="p-3 sm:p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex items-center flex-1 min-w-0">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRequests.has(request.id)}
//                                   onChange={() => toggleSelectRequest(request.id)}
//                                   className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
//                                 />
//                                 <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
//                                   <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
//                                     <User className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
//                                   </div>
//                                 </div>
//                                 <div className="min-w-0 flex-1">
//                                   <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                                     {request.firstName} {request.lastName}
//                                   </h3>
//                                   <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//                                     مسؤول في {request.schoolName}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
//                                 <button
//                                   onClick={() => handleApprove(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="موافقة"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <Check className="h-4 w-4" />
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => handleReject(request.id)}
//                                   disabled={actionLoading === request.id}
//                                   className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                                   type="button"
//                                   title="حذف"
//                                 >
//                                   {actionLoading === request.id ? (
//                                     <Loader2 className="h-4 w-4 animate-spin" />
//                                   ) : (
//                                     <X className="h-4 w-4" />
//                                   )}
//                                 </button>
//                               </div>
//                             </div>
//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center text-gray-600">
//                                 <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.email}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.whatsUpNumber}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Building className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="truncate">{request.schoolName}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <MapPin className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span>{request.schoolCity}</span>
//                               </div>
//                               <div className="flex items-center text-gray-600">
//                                 <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
//                                 <span className="text-xs">{formatDate(request.createdAt)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// }

// export default App;














"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/app/admin/Layout/Layout"
import Cookies from "js-cookie"
import {
  LandPlot,
  AlertCircle,
  Eye,
  X,
  Loader2,
  Check,
  Clock,
  Mail,
  Phone,
  User,
  Calendar,
  ChevronDown,
  Search,
  Filter,
  MapPin,
  Plus,
  Building,
} from 'lucide-react';
import { useRouter } from "next/navigation"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"


interface TeacherJoiningRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  whatsUpNumber: string;
  createdAt: string;
  specialty: number;
}

interface SchoolOfficialJoiningRequest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  whatsUpNumber: string;
  createdAt: string;
  applicantSchool: number;
  schoolName: string;
  schoolCity: string;
}

interface TeacherSpecialty {
  id: number;
  value: string;
}

interface ApiResponse<T> {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: T;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"


function App() {
  const [teacherRequests, setTeacherRequests] = useState<TeacherJoiningRequest[]>([]);
  const [schoolOfficialRequests, setSchoolOfficialRequests] = useState<SchoolOfficialJoiningRequest[]>([]);
  const [specialties, setSpecialties] = useState<TeacherSpecialty[]>([]);
  const [specialtiesLoading, setSpecialtiesLoading] = useState<boolean>(true);
  const [activeOption, setActiveOption] = useState<"المعلمون" | "المدارس">("المعلمون");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  // Create axios instance with default config
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `Bearer ${Cookies.get("adminToken")}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  // Request interceptor for debugging
  apiClient.interceptors.request.use((config) => {
    console.log('Making request to:', config.url);
    return config;
  });

  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  // Create a map of specialty IDs to names for easy lookup
  const specialtyNames = specialties.reduce((acc, specialty) => {
    acc[specialty.id] = specialty.value;
    return acc;
  }, {} as { [key: number]: string });

  useEffect(() => {
    fetchSpecialties();
    fetchData();
  }, [activeOption]);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchSpecialties = async () => {
    setSpecialtiesLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<TeacherSpecialty[]>>(
        '/api/TeacherSpecialty/GetAllTeacherSpecialties'
      );

      if (response.data.succeeded) {
        setSpecialties(response.data.data);
      } else {
        throw new Error(response.data.message || "فشل في تحميل التخصصات");
      }
    } catch (error) {
      let errorMessage = ""
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchSpecialties()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchSpecialties()
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
      console.error("Error fetching specialties:", error)
    } finally {
      setSpecialtiesLoading(false);
    }
  };

  const fetchTeacherData = async () => {
    try {
      const response = await apiClient.get<ApiResponse<TeacherJoiningRequest[]>>(
        '/api/JoiningRequest/AllTeacherJoiningRequest'
      );

      if (response.data.succeeded) {
        console.log("teacherRequests", response.data.data);
        setTeacherRequests(response.data.data);
      } else {
        throw new Error(response.data.message || "فشل في تحميل طلبات المعلمين");
      }
    } catch (error) {
      // For demo purposes, use mock data when API fails
      let errorMessage = ""
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchTeacherData()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchTeacherData()
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
      console.error("Error fetching teacher data:", error)
    }
  };

  const fetchSchoolOfficialData = async () => {
    try {
      const response = await apiClient.get<ApiResponse<SchoolOfficialJoiningRequest[]>>(
        '/api/JoiningRequest/AllSchoolOfficialJoiningRequest'
      );

      if (response.data.succeeded) {
        console.log("schoolOfficialRequests", response.data.data);
        setSchoolOfficialRequests(response.data.data);
      } else {
        throw new Error(response.data.message || "فشل في تحميل طلبات المدارس");
      }
    } catch (error) {
      // For demo purposes, use mock data when API fails
      let errorMessage = ""
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return fetchSchoolOfficialData()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return fetchSchoolOfficialData()
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
      console.error("Error fetching school official data:", error)
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (activeOption === "المعلمون") {
        await fetchTeacherData();
      } else {
        await fetchSchoolOfficialData();
      }
    } catch (error) {
      let errorMessage = "حدث خطأ غير معروف";
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
              break;
            case 403:
              errorMessage = "ليس لديك صلاحية للوصول إلى هذه البيانات.";
              break;
            case 404:
              errorMessage = `لم يتم العثور على نقطة النهاية المطلوبة: ${error.config?.url}`;
              break;
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً.";
              break;
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`;
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت.";
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`;
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف";
      }
      
      console.error("Error fetching data:", error);
      // Don't set error for demo purposes since we're using mock data
      // setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTeacher = async (request: TeacherJoiningRequest) => {
    setActionLoading(request.id);
    try {
      const payload = {
        joiningRequestId: request.id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        whatsUpNumber: request.whatsUpNumber,
      };

      const response = await apiClient.post<ApiResponse<number>>(
        '/api/Teacher/AddTeacherByRequest',
        payload
      );

      if (response.data.succeeded) {
        setTeacherRequests((prev) => prev.filter((req) => req.id !== request.id));
        setSelectedRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(request.id);
          return newSet;
        });
        setSuccessMessage(`تم قبول طلب المعلم ${request.firstName} ${request.lastName} بنجاح`);
      } else {
        throw new Error(response.data.message || "فشل في قبول طلب المعلم");
      }
    } catch (error) {
      let errorMessage = ""
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleApproveTeacher(request)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleApproveTeacher(request)
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
      console.error("Error approving teacher:", error)
      setError(errorMessage)
    } finally {
      setActionLoading(null);
    }
  };

  const handleApproveSchoolOfficial = async (request: SchoolOfficialJoiningRequest) => {
    setActionLoading(request.id);
    try {
      const payload = {
        joiningRequestId: request.id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        whatsUpNumber: request.whatsUpNumber,
        applicantSchool: request.applicantSchool,
        city: request.schoolCity,
        schoolName: request.schoolName,
      };

      const response = await apiClient.post<ApiResponse<number>>(
        '/api/SchoolOfficial/AddSchoolOfficialByRequest',
        payload
      );

      if (response.data.succeeded) {
        setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== request.id));
        setSelectedRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(request.id);
          return newSet;
        });
        setSuccessMessage(`تم قبول طلب مسؤول المدرسة ${request.firstName} ${request.lastName} بنجاح`);
      } else {
        throw new Error(response.data.message || "فشل في قبول طلب مسؤول المدرسة");
      }
    } catch (error) {
      let errorMessage = "";
      const refreshSuccess = await refreshAuthToken();

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleApproveSchoolOfficial(request);
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
              router.push("/admin/login");
              break;
            case 403:
              if (refreshSuccess) {
                return handleApproveSchoolOfficial(request);
              }
              errorMessage = "ليس لديك صلاحية لقبول هذا الطلب.";
              router.push("/admin/login");
              break;
            case 404:
              errorMessage = "الطلب غير موجود أو تم حذفه مسبقاً";
              break;
            case 500:
              errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً.";
              break;
            default:
              errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`;
          }
        } else if (error.request) {
          errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال بالإنترنت.";
        } else {
          errorMessage = `خطأ في الطلب: ${error.message}`;
        }
      } else {
        errorMessage = error instanceof Error ? error.message : "خطأ غير معروف";
      }
      console.error("Error approving school official:", error);
      setError(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (id: string) => {
    if (activeOption === "المعلمون") {
      const request = teacherRequests.find(req => req.id === id);
      if (request) {
        await handleApproveTeacher(request);
      }
    } else {
      const request = schoolOfficialRequests.find(req => req.id === id);
      if (request) {
        await handleApproveSchoolOfficial(request);
      }
    }
  };

  const handleDeleteTeacherRequest = async (request: TeacherJoiningRequest) => {
    setActionLoading(request.id);
    try {
      const payload = {
        id: request.id
      };
console.log("payload =======",payload)
      const response = await apiClient.delete<ApiResponse<string>>(
        '/api/JoiningRequest/DeleteTeacherJoiningRequest',
        {
          data: payload
        }
      );

      if (response.data.succeeded) {
        setTeacherRequests((prev) => prev.filter((req) => req.id !== request.id));
        setSelectedRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(request.id);
          return newSet;
        });
        setSuccessMessage(`تم حذف طلب المعلم ${request.firstName} ${request.lastName} بنجاح`);
      } else {
        throw new Error(response.data.message || "فشل في حذف طلب المعلم");
      }
    } catch (error) {
      let errorMessage = ""
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return handleDeleteTeacherRequest(request)
              }
              errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return handleDeleteTeacherRequest(request)
              }
              errorMessage = "ليس لديك صلاحية لحذف هذا الطلب."
              router.push("/admin/login")
              break
            case 404:
              errorMessage = "الطلب غير موجود أو تم حذفه مسبقاً"
              break
            case 405:
              errorMessage = "الطلب غير مسموح به"
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
      console.error("Error deleting teacher request:", error)
      setError(errorMessage)
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteSchoolOfficialRequest = async (request: SchoolOfficialJoiningRequest) => {
    setActionLoading(request.id);
    try {
      // For school officials, we would need a similar endpoint like DeleteSchoolOfficialJoiningRequest
      // For now, we'll simulate the API call until the endpoint is available
      const payload = {
        id: request.id
      };

      // Uncomment and modify this when the school official delete endpoint is available:
      // const response = await apiClient.post<ApiResponse<string>>(
      //   '/api/JoiningRequest/DeleteSchoolOfficialJoiningRequest',
      //   payload
      // );

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSchoolOfficialRequests((prev) => prev.filter((req) => req.id !== request.id));
      setSelectedRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(request.id);
        return newSet;
      });
      setSuccessMessage(`تم حذف طلب مسؤول المدرسة ${request.firstName} ${request.lastName} بنجاح`);
    } catch (error) {
      console.error("Error deleting school official request:", error);
      setError("فشل في حذف طلب مسؤول المدرسة");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (activeOption === "المعلمون") {
      const request = teacherRequests.find(req => req.id === id);
      if (request) {
        await handleDeleteTeacherRequest(request);
      }
    } else {
      const request = schoolOfficialRequests.find(req => req.id === id);
      if (request) {
        await handleDeleteSchoolOfficialRequest(request);
      }
    }
  };

  const handleBulkAction = async (action: "approve" | "reject") => {
    if (selectedRequests.size === 0) return;
    setActionLoading("bulk");
    
    try {
      const requestIds = Array.from(selectedRequests);
      
      if (action === "approve") {
        // Process approvals
        for (const id of requestIds) {
          if (activeOption === "المعلمون") {
            const request = teacherRequests.find(req => req.id === id);
            if (request) {
              await handleApproveTeacher(request);
            }
          } else {
            const request = schoolOfficialRequests.find(req => req.id === id);
            if (request) {
              await handleApproveSchoolOfficial(request);
            }
          }
        }
        setSuccessMessage(`تم قبول ${requestIds.length} طلب بنجاح`);
      } else {
        // Process rejections/deletions
        for (const id of requestIds) {
          if (activeOption === "المعلمون") {
            const request = teacherRequests.find(req => req.id === id);
            if (request) {
              await handleDeleteTeacherRequest(request);
            }
          } else {
            const request = schoolOfficialRequests.find(req => req.id === id);
            if (request) {
              await handleDeleteSchoolOfficialRequest(request);
            }
          }
        }
        setSuccessMessage(`تم حذف ${requestIds.length} طلب بنجاح`);
      }
      
      setSelectedRequests(new Set());
    } catch (error) {
      console.error("Error with bulk action:", error);
      setError(`فشل في تنفيذ العملية المجمعة`);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelectRequest = (id: string) => {
    setSelectedRequests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    const currentRequests = activeOption === "المعلمون" ? teacherRequests : schoolOfficialRequests;
    if (selectedRequests.size === currentRequests.length) {
      setSelectedRequests(new Set());
    } else {
      setSelectedRequests(new Set(currentRequests.map((req) => req.id)));
    }
  };

  const filteredTeacherRequests = teacherRequests.filter((request) => {
    const matchesSearch =
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === null || request.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const filteredSchoolOfficialRequests = schoolOfficialRequests.filter((request) => {
    return (
      request.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.schoolCity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
   
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2 sm:ml-3`}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
        </div>
      </div>
    </div>
   
  );

  if (loading || specialtiesLoading) {
    return (
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">جاري التحميل...</p>
        </div>
      </div>
     
    );
  }

  const currentRequests = activeOption === "المعلمون" ? filteredTeacherRequests : filteredSchoolOfficialRequests;
  const totalRequests = activeOption === "المعلمون" ? teacherRequests.length : schoolOfficialRequests.length;

  return (
    <Layout>
    <div className="min-h-[90vh] bg-gray-50" dir="rtl">
      <div className="py-3 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-6 md:gap-0 sm:flex-row items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 mb-1 sm:mb-2">
                    طلبات الانضمام
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600">أهلاً بك في صفحة طلبات الانضمام</p>
                </div>
                <button
                    onClick={() => router.push("/admin/pages/join-requests/specialty")}
                    className="inline-flex items-center ml-4 lg:ml-0 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm transition-all duration-200 hover:shadow-md"
                    type="button"
                  >
                    <Plus className="h-5 w-5 ml-2" />
                    إدارة التخصصات
                  </button>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="flex items-start p-3 sm:p-4 text-green-600 bg-green-50 rounded-lg border border-green-200">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm break-words">{successMessage}</p>
                  </div>
                  <button
                    onClick={() => setSuccessMessage(null)}
                    className="ml-2 text-green-400 hover:text-green-600 flex-shrink-0"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Error Message */}
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
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <MetricCard
              title={`إجمالي طلبات ${activeOption}`}
              value={totalRequests}
              icon={activeOption === "المعلمون" ? User : Building}
              color="bg-blue-500"
            />
            <MetricCard title="الطلبات المعلقة" value={currentRequests.length} icon={Clock} color="bg-orange-500" />
            <MetricCard title="المحددة" value={selectedRequests.size} icon={Check} color="bg-green-500" />
            <MetricCard title="تمت المراجعة اليوم" value={0} icon={Eye} color="bg-purple-500" />
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-purple-700 rounded-full p-1 shadow-lg w-full max-w-xs sm:max-w-sm">
              <div className="flex relative">
                <button
                  onClick={() => setActiveOption("المعلمون")}
                  className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
                    activeOption === "المعلمون"
                      ? "text-purple-700 bg-white shadow-md"
                      : "text-white hover:text-purple-100"
                  }`}
                  type="button"
                >
                  المعلمون
                </button>
                <button
                  onClick={() => setActiveOption("المدارس")}
                  className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-full text-center text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 relative z-10 ${
                    activeOption === "المدارس"
                      ? "text-purple-700 bg-white shadow-md"
                      : "text-white hover:text-purple-100"
                  }`}
                  type="button"
                >
                  المدارس
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`البحث في طلبات ${activeOption}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {activeOption === "المعلمون" && (
                    <div className="relative">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        type="button"
                      >
                        <Filter className="h-4 w-4" />
                        <span>التخصص</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                      </button>
                      {showFilters && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          <div className="p-2 max-h-60 overflow-y-auto">
                            <button
                              onClick={() => setSelectedSpecialty(null)}
                              className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
                                selectedSpecialty === null ? "bg-purple-50 text-purple-700" : ""
                              }`}
                              type="button"
                            >
                              جميع التخصصات
                            </button>
                            {specialties.map((specialty) => (
                              <button
                                key={specialty.id}
                                onClick={() => setSelectedSpecialty(specialty.id)}
                                className={`w-full text-right px-3 py-2 rounded text-sm hover:bg-gray-50 ${
                                  selectedSpecialty === specialty.id ? "bg-purple-50 text-purple-700" : ""
                                }`}
                                type="button"
                              >
                                {specialty.value}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bulk Actions */}
                {selectedRequests.size > 0 && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleBulkAction("approve")}
                      disabled={actionLoading === "bulk"}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      type="button"
                    >
                      {actionLoading === "bulk" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <span>موافقة ({selectedRequests.size})</span>
                    </button>
                    <button
                      onClick={() => handleBulkAction("reject")}
                      disabled={actionLoading === "bulk"}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                      type="button"
                    >
                      {actionLoading === "bulk" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span>حذف ({selectedRequests.size})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {currentRequests.length === 0 ? (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="text-gray-400 mb-4">
                  {activeOption === "المعلمون" ? (
                    <User className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                  ) : (
                    <Building className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
                <p className="text-sm sm:text-base text-gray-500">لا توجد طلبات {activeOption} في الوقت الحالي</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden xl:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
                            onChange={toggleSelectAll}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {activeOption === "المعلمون" ? "المعلم" : "مسؤول المدرسة"}
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          البريد الإلكتروني
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          رقم الواتساب
                        </th>
                        {activeOption === "المعلمون" ? (
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            التخصص
                          </th>
                        ) : (
                          <>
                            <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              اسم المدرسة
                            </th>
                            <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              المدينة
                            </th>
                          </>
                        )}
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ الطلب
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeOption === "المعلمون"
                        ? filteredTeacherRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={selectedRequests.has(request.id)}
                                  onChange={() => toggleSelectRequest(request.id)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                                    <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                      <User className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" />
                                    </div>
                                  </div>
                                  <div className="mr-3 lg:mr-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {request.firstName} {request.lastName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate max-w-xs">{request.email}</span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Phone className="h-4 w-4 ml-2 text-gray-400" />
                                  {request.whatsUpNumber}
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {request.specialty || "غير محدد"}
                                </span>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Calendar className="h-4 w-4 ml-2 text-gray-400" />
                                  <span className="text-xs">{formatDate(request.createdAt)}</span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleApprove(request.id)}
                                    disabled={actionLoading === request.id}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    title="موافقة"
                                  >
                                    {actionLoading === request.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleReject(request.id)}
                                    disabled={actionLoading === request.id}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    title="حذف"
                                  >
                                    {actionLoading === request.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <X className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        : filteredSchoolOfficialRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  checked={selectedRequests.has(request.id)}
                                  onChange={() => toggleSelectRequest(request.id)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10">
                                    <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-green-100 flex items-center justify-center">
                                      <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                                    </div>
                                  </div>
                                  <div className="mr-3 lg:mr-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {request.firstName} {request.lastName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Mail className="h-4 w-4 ml-2 text-gray-400 flex-shrink-0" />
                                  <span className="truncate max-w-xs">{request.email}</span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Phone className="h-4 w-4 ml-2 text-gray-400" />
                                  {request.whatsUpNumber}
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{request.schoolName}</div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <MapPin className="h-4 w-4 ml-2 text-gray-400" />
                                  {request.schoolCity}
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Calendar className="h-4 w-4 ml-2 text-gray-400" />
                                  <span className="text-xs">{formatDate(request.createdAt)}</span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleApprove(request.id)}
                                    disabled={actionLoading === request.id}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    title="موافقة"
                                  >
                                    {actionLoading === request.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleReject(request.id)}
                                    disabled={actionLoading === request.id}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    type="button"
                                    title="حذف"
                                  >
                                    {actionLoading === request.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <X className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet Cards */}
                <div className="xl:hidden">
                  <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRequests.size === currentRequests.length && currentRequests.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-2"
                      />
                      <span className="text-sm text-gray-700">تحديد الكل ({currentRequests.length})</span>
                    </label>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {activeOption === "المعلمون"
                      ? filteredTeacherRequests.map((request) => (
                          <div key={request.id} className="p-3 sm:p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={selectedRequests.has(request.id)}
                                  onChange={() => toggleSelectRequest(request.id)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
                                />
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                    {request.firstName} {request.lastName}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    {specialtyNames[request.specialty] || "غير محدد"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                                <button
                                  onClick={() => handleApprove(request.id)}
                                  disabled={actionLoading === request.id}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                  title="موافقة"
                                >
                                  {actionLoading === request.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  disabled={actionLoading === request.id}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                  title="حذف"
                                >
                                  {actionLoading === request.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span className="truncate">{request.email}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span>{request.whatsUpNumber}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span className="text-xs">{formatDate(request.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      : filteredSchoolOfficialRequests.map((request) => (
                          <div key={request.id} className="p-3 sm:p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={selectedRequests.has(request.id)}
                                  onChange={() => toggleSelectRequest(request.id)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-3 flex-shrink-0"
                                />
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ml-3">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                    {request.firstName} {request.lastName}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                                    مسؤول في {request.schoolName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                                <button
                                  onClick={() => handleApprove(request.id)}
                                  disabled={actionLoading === request.id}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                  title="موافقة"
                                >
                                  {actionLoading === request.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  disabled={actionLoading === request.id}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  type="button"
                                  title="حذف"
                                >
                                  {actionLoading === request.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Mail className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span className="truncate">{request.email}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Phone className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span>{request.whatsUpNumber}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Building className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span className="truncate">{request.schoolName}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span>{request.schoolCity}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
                                <span className="text-xs">{formatDate(request.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default App;