// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Layout from "../../../Layout/Layout"
// import { ArrowRight, User, Mail, Phone, Calendar, Loader2, AlertCircle, Edit, Trash2 } from "lucide-react"
// import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
// import axios from "axios"
// import Cookies from "js-cookie"

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
//   data: Student
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const StudentDetails: React.FC = () => {
//   const params = useParams()
//   const router = useRouter()
//   const [student, setStudent] = useState<Student | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deleting, setDeleting] = useState<boolean>(false)

//   const studentId = params.id as string

//   const fetchStudentDetails = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       // Refresh auth token before making the request
//       await refreshAuthToken()

//       const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetAllStudents/${studentId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         setStudent(response.data.data)
//       } else {
//         setError(response.data.message || "فشل في جلب بيانات الطالب")
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء جلب البيانات"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return fetchStudentDetails()
//               }
//               errorMessage = "انتهت صلاحية المصادقة. يرجى تسجيل الدخول مرة أخرى."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return fetchStudentDetails()
//               }
//               errorMessage = "ليس لديك صلاحية لعرض هذا الطالب"
//               break
//             case 404:
//               errorMessage = "الطالب غير موجود"
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//             default:
//               errorMessage = `خطأ في الخادم (${error.response.status}): ${error.response.statusText}`
//           }
//         } else if (error.request) {
//           errorMessage = "خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت."
//         } else {
//           errorMessage = `خطأ في الطلب: ${error.message}`
//         }
//       }

//       console.error("Error fetching student details:", error)
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteStudent = async () => {
//     if (!student) return

//     const confirmed = window.confirm(
//       `هل أنت متأكد من حذف الطالب ${student.firstName} ${student.lastName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
//     )

//     if (!confirmed) return

//     try {
//       setDeleting(true)

//       await refreshAuthToken()

//       const response = await axios.delete(`${BASE_URL}/api/Student/DeleteStudent/${studentId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         alert("تم حذف الطالب بنجاح")
//         router.push("/admin/students")
//       } else {
//         const errorMessage =
//           response.data.errors?.length > 0
//             ? response.data.errors.join(", ")
//             : response.data.message || "فشل في حذف الطالب"
//         alert(errorMessage)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف الطالب"

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//             case 403:
//               errorMessage = "ليس لديك صلاحية لحذف هذا الطالب"
//               break
//             case 404:
//               errorMessage = "الطالب غير موجود أو تم حذفه مسبقاً"
//               break
//             case 500:
//               errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً."
//               break
//           }
//         }
//       }

//       console.error("Error deleting student:", error)
//       alert(errorMessage)
//     } finally {
//       setDeleting(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("ar-SA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   const handleEdit = () => {
//     // Navigate to edit page (you can implement this later)
//     console.log("Navigate to edit page for student:", student?.id)
//     // router.push(`/admin/students/${studentId}/edit`)
//   }

//   const handleGoBack = () => {
//     router.push("/admin/students")
//   }

//   useEffect(() => {
//     if (studentId) {
//       fetchStudentDetails()
//     }
//   }, [studentId])

//   if (loading) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-center py-20">
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Loader2 className="h-8 w-8 animate-spin" />
//                 <span className="text-lg">جاري تحميل بيانات الطالب...</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">حدث خطأ</h2>
//                 <p className="text-red-600 mb-6 text-lg">{error}</p>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={fetchStudentDetails}
//                     className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
//                     type="button"
//                   >
//                     إعادة المحاولة
//                   </button>
//                   <button
//                     onClick={handleGoBack}
//                     className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
//                     type="button"
//                   >
//                     العودة للقائمة
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   if (!student) {
//     return (
//       <Layout>
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">الطالب غير موجود</h2>
//                 <p className="text-gray-600 mb-6">لم يتم العثور على بيانات الطالب المطلوب</p>
//                 <button
//                   onClick={handleGoBack}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                   type="button"
//                 >
//                   العودة للقائمة
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
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <button
//               onClick={handleGoBack}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4 font-medium"
//               type="button"
//             >
//               <ArrowRight className="h-5 w-5" />
//               العودة إلى قائمة المستخدمين
//             </button>
//             <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">تفاصيل الطالب</h1>
//             <p className="text-gray-600">عرض معلومات الطالب التفصيلية</p>
//           </div>

//           {/* Student Details Card */}
//           <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//             {/* Header Section */}
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                   <span className="text-white font-bold text-2xl">
//                     {student.firstName.charAt(0)}
//                     {student.lastName.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-semibold text-white mb-1">
//                     {student.firstName} {student.lastName}
//                   </h2>
//                   <p className="text-blue-100">معرف الطالب: {student.id}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Details Section */}
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Personal Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
//                     المعلومات الشخصية
//                   </h3>

//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <User className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">الاسم الأول</p>
//                         <p className="text-lg text-gray-900">{student.firstName}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <User className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">الاسم الأخير</p>
//                         <p className="text-lg text-gray-900">{student.lastName}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">معلومات التواصل</h3>

//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <div className="p-2 bg-green-100 rounded-lg">
//                         <Mail className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">البريد الإلكتروني</p>
//                         <p className="text-lg text-gray-900 break-all">{student.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="p-2 bg-green-100 rounded-lg">
//                         <Phone className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">رقم الواتساب</p>
//                         <p className="text-lg text-gray-900">{student.whatsUpNumber || "غير متوفر"}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Registration Information */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات التسجيل</h3>
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 bg-purple-100 rounded-lg">
//                     <Calendar className="h-5 w-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">تاريخ التسجيل</p>
//                     <p className="text-lg text-gray-900">{formatDate(student.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     onClick={handleEdit}
//                     className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                     type="button"
//                   >
//                     <Edit className="h-5 w-5" />
//                     تعديل البيانات
//                   </button>

//                   <button
//                     onClick={deleteStudent}
//                     disabled={deleting}
//                     className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     type="button"
//                   >
//                     {deleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
//                     {deleting ? "جاري الحذف..." : "حذف الطالب"}
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

// export default StudentDetails











"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "../../../Layout/Layout"
import DeleteConfirmationModal from "../delete-confirmation-modal"
import { ArrowRight, User, Mail, Phone, Calendar, Loader2, AlertCircle, Trash2 } from "lucide-react"
import { refreshAuthToken } from "@/app/admin/login/refreshAuthToken"
import axios from "axios"
import Cookies from "js-cookie"

interface Student {
  id: string
  firstName: string
  lastName: string
  createdAt: string
  email: string
  whatsUpNumber: string
}

interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: Student
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

const StudentDetails: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const studentId = params.id as string

  const fetchStudentDetails = async () => {
    try {
      setLoading(true)
      setError(null)

      // Refresh auth token before making the request
      await refreshAuthToken()

      // Fixed the API endpoint - removed the duplicate path segment
      const response = await axios.get<ApiResponse>(`${BASE_URL}/api/Student/GetStudent/${studentId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        setStudent(response.data.data)
      } else {
        setError(response.data.message || "فشل في جلب بيانات الطالب")
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء جلب البيانات"
  const refreshSuccess = await refreshAuthToken()
        
                if (axios.isAxiosError(error)) {
                  if (error.response) {
                    switch (error.response.status) {
                      case 401:
                        if (refreshSuccess) {
                          return fetchStudentDetails()
                        }
                        errorMessage = "Authentication expired. Please log in again."
                        router.push("/admin/login")
                        break
                      case 403:
                        if (refreshSuccess) {
                          return fetchStudentDetails()
                        }
                        errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                        console.log("errorMessage",errorMessage);
                        router.push("/admin/login")
                        break;
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





  const deleteStudent = async () => {
    if (!student) return

    // const confirmed = window.confirm(
    //   `هل أنت متأكد من حذف الطالب ${student.firstName} ${student.lastName}؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
    // )

    // if (!confirmed) return

    try {
      setDeleting(true)
      await refreshAuthToken()

      const response = await axios.delete(`${BASE_URL}/api/Student/DeleteStudent/${studentId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data.succeeded) {
        console.log("تم حذف الطالب بنجاح")
        router.back()
      } else {
        const errorMessage =
          response.data.errors?.length > 0
            ? response.data.errors.join(", ")
            : response.data.message || "فشل في حذف الطالب"
        console.log("errorMessage",errorMessage)
      }
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء حذف الطالب"
      const refreshSuccess = await refreshAuthToken()
        
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return deleteStudent()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/admin/login")
              break
            case 403:
              if (refreshSuccess) {
                return deleteStudent()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
              console.log("errorMessage",errorMessage);
              router.push("/admin/login")
              break;
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

      console.error("Error deleting student:", error)
      console.log("errorMessage",errorMessage)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

const handleDeleteClick = () => {
    setShowDeleteModal(true)
}

  const handleEdit = () => {
    // Navigate to edit page
    router.push(`/admin/students/${studentId}/edit`)
  }

  const handleGoBack = () => {
    router.back()
  }

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails()
    }
  }, [studentId])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-gray-600">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-lg">جاري تحميل بيانات الطالب...</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">حدث خطأ</h2>
                <p className="text-red-600 mb-6 text-lg">{error}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={fetchStudentDetails}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    type="button"
                  >
                    إعادة المحاولة
                  </button>
                  <button
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    type="button"
                  >
                    العودة للقائمة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!student) {
    return (
      <Layout>
        <div className="min-h-[90vh] bg-gray-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">الطالب غير موجود</h2>
                <p className="text-gray-600 mb-6">لم يتم العثور على بيانات الطالب المطلوب</p>
                <button
                  onClick={handleGoBack}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  type="button"
                >
                  العودة للقائمة
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
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="relative mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleGoBack}
              className="flex flex-row-reverse  absolute left-12 md:left-3 lg:left-0 items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-4 font-medium"
              type="button"
            >
              <ArrowRight className="h-8 w-8 lg:h-5 lg:w-5  transform rotate-180" />
              <span className="font-medium hidden lg:block"> العودة إلى قائمة المستخدمين</span> 
            </button>
            <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">تفاصيل الطالب</h1>
            <p className="text-gray-600">عرض معلومات الطالب التفصيلية</p>
          </div>

          {/* Student Details Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {student.firstName.charAt(0)}
                    {student.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-1">
                    {student.firstName} {student.lastName}
                  </h2>
                  <p className="text-purple-100">معرف الطالب: {student.id}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    المعلومات الشخصية
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">الاسم الأول</p>
                        <p className="text-lg text-gray-900">{student.firstName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">الاسم الأخير</p>
                        <p className="text-lg text-gray-900">{student.lastName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">معلومات التواصل</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">البريد الإلكتروني</p>
                        <p className="text-lg text-gray-900 break-all">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">رقم الواتساب</p>
                        <p className="text-lg text-gray-900">{student.whatsUpNumber || "غير متوفر"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات التسجيل</h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">تاريخ التسجيل</p>
                    <p className="text-lg text-gray-900">{formatDate(student.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                {/* <div className="flex flex-col sm:flex-row gap-4"> */}
                  {/* <button
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    type="button"
                  >
                    <Edit className="h-5 w-5" />
                    تعديل البيانات
                  </button> */}
                  <button
                    onClick={handleDeleteClick}
                    disabled={deleting}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                  >
                    {deleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                    {deleting ? "جاري الحذف..." : "حذف الطالب"}
                  </button>

        <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteStudent}
        studentName={`${student?.firstName} ${student?.lastName}`}
        isDeleting={deleting}
        />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StudentDetails









// "use client"

// import { useState } from "react"
// import axios from "axios"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"
// import DeleteConfirmationModal from "../delete-confirmation-modal"

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

// // Declare variables before using them
// const student = { firstName: "John", lastName: "Doe" } // Example student object
// const studentId = "123" // Example student ID
// const refreshAuthToken = async () => {
//   // Example implementation of refreshAuthToken
//   return true
// }

// export default function YourComponent() {
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleting, setDeleting] = useState(false)
//   const router = useRouter()

//   // Updated delete function
//   const deleteStudent = async () => {
//     if (!student) return

//     try {
//       setDeleting(true)
//       await refreshAuthToken()
//       const response = await axios.delete(`${BASE_URL}/api/Student/DeleteStudent/${studentId}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("adminToken")}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data.succeeded) {
//         console.log("تم حذف الطالب بنجاح")
//         setShowDeleteModal(false)
//         router.back()
//       } else {
//         const errorMessage =
//           response.data.errors?.length > 0
//             ? response.data.errors.join(", ")
//             : response.data.message || "فشل في حذف الطالب"
//         console.log("errorMessage", errorMessage)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ أثناء حذف الطالب"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return deleteStudent()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/admin/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return deleteStudent()
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
//       console.error("Error deleting student:", error)
//       console.log("errorMessage", errorMessage)
//     } finally {
//       setDeleting(false)
//     }
//   }

//   // Function to trigger the delete confirmation
//   const handleDeleteClick = () => {
//     setShowDeleteModal(true)
//   }

//   return (
//     <div>
//       {/* Your existing component content */}

//       {/* Delete button */}
//       <button onClick={handleDeleteClick} type="button">حذف الطالب</button>

//       {/* Delete confirmation modal */}
//       <DeleteConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={deleteStudent}
//         studentName={`${student?.firstName} ${student?.lastName}`}
//         isDeleting={deleting}
//       />
//     </div>
//   )
// }
