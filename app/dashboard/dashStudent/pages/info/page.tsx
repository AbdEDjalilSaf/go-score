// "use client"

// import Cookies from "js-cookie"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { changeGlobalName } from "@/features/auth/authSlice"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"


// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// interface UpdateStudentRequest {
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
// }

// // Define the correct types for your data structures
// type UserDataFields = "firstName" | "lastName" | "password" | "email" | "whatsapp"
// type EditModeFields = "name" | "password" | "email" | "whatsapp"

// const StudentProfilePage = () => {
//   const [userName, setUserName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     password: "••••••••",
//     email: "noodsaf01@gmail.com",
//     whatsapp: "لا يوجد",
//   })

//   const dispatch = useDispatch()
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
//   const globalPassword = useSelector(
//     (state: { background: { globalPassword: string } }) => state.background.globalPassword,
//   )
//   const globalWhatsUpPhone = useSelector(
//     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
//   )

//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsapp: false,
//   })

//   const [tempValues, setTempValues] = useState({
//     firstName: "",
//     lastName: "",
//     password: "",
//     email: "",
//     whatsapp: "",
//   })

//   const handleEditFull = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const handleSaveFullName = (field: EditModeFields, value: string) => {
//     if (field === "name") {
//       const fullName = localStorage.getItem("userName")
//       console.log("fullName", fullName)
//       localStorage.removeItem("userName")
//       localStorage.setItem("userName", value)
//       setUserName(value)
//       dispatch(changeGlobalName(value))
//       console.log("new fullName", value)
//     }
//     setEditMode({ ...editMode, [field]: false })
//   }

//   const handleCancelFull = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//   }

//   useEffect(() => {
//     const fullName = localStorage.getItem("userName") || ""
//     setUserName(fullName)
//     const [firstName, ...lastNameParts] = fullName.split(" ")
//     setUserData((prev) => ({
//       ...prev,
//       firstName: firstName || "",
//       lastName: lastNameParts.join(" ") || "",
//     }))
//     console.log("fullName", fullName)
//   }, [])

//   const handleEdit = (field: EditModeFields) => {
//     if (field === "name") {
//       const [first, ...rest] = userName.split(" ")
//       setTempValues({
//         ...tempValues,
//         firstName: first || "",
//         lastName: rest.join(" ") || "",
//       })
//     } else if (field === "whatsapp") {
//       setTempValues({ ...tempValues, whatsapp: globalWhatsUpPhone })
//     } else if (field === "email") {
//       setTempValues({ ...tempValues, email: globalEmail })
//     } else if (field === "password") {
//       setTempValues({ ...tempValues, password: "" })
//     }
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse> => {
//     const token = Cookies.get("accessToken") || ""
//     const response = await fetch(`${API_URL}/api/Student/Update`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return await response.json()
//   }

//   const handleSave = async (field: EditModeFields) => {
//     setLoading(true)
//     setApiMessage(null)

//     try {
//       if (field === "name") {
//         const fullName = `${tempValues.firstName} ${tempValues.lastName}`.trim()
//         console.log("fullName", fullName)

//         const updateData: UpdateStudentRequest = {
//           firstName: tempValues.firstName,
//           lastName: tempValues.lastName,
//           whatsUpNumber: globalWhatsUpPhone || userData.whatsapp,
//         }

//         const response = await updateStudentProfile(updateData)

//         if (response.succeeded) {
//           localStorage.removeItem("userName")
//           localStorage.setItem("userName", fullName)
//           setUserName(fullName)
//           dispatch(changeGlobalName(fullName))
//           setUserData({ ...userData, firstName: tempValues.firstName, lastName: tempValues.lastName })

//           setApiMessage({ type: "success", text: response.message || "تم تحديث الاسم بنجاح" })
//         } else {
//           setApiMessage({
//             type: "error",
//             text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
//           })
//         }
//       } else if (field === "whatsapp") {
//         const currentFullName = localStorage.getItem("userName") || userName
//         const [firstName, ...lastNameParts] = currentFullName.split(" ")

//         const updateData: UpdateStudentRequest = {
//           firstName: firstName || "",
//           lastName: lastNameParts.join(" ") || "",
//           whatsUpNumber: tempValues.whatsapp,
//         }

//         const response = await updateStudentProfile(updateData)

//         if (response.succeeded) {
//           setUserData({ ...userData, whatsapp: tempValues.whatsapp })
//           setApiMessage({ type: "success", text: response.message || "تم تحديث رقم واتساب بنجاح" })
//         } else {
//           setApiMessage({
//             type: "error",
//             text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
//           })
//         }
//       } else {
//         if (field === "email") {
//           setUserData({ ...userData, email: tempValues.email })
//           console.log("email", userData.email)
//           console.log("new email", tempValues.email)
//         } else if (field === "password") {
//           setUserData({ ...userData, password: "••••••••" })
//           console.log("password", userData.password)
//           console.log("new password", tempValues.password)
//         }
//         setApiMessage({ type: "success", text: "تم التحديث بنجاح" })
//       }

//       setEditMode({ ...editMode, [field]: false })
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()

//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         switch (error.response.status) {
//           case 401:

//             if (refreshSuccess) {
//               console.log("start refresh");
//               return handleSave(field) // Retry with new token
//             }
            
//             // Token expired or invalid
//             errorMessage = "Authentication expired. Please log in again."
//             // Clear the expired token
//             // Redirect to login or refresh token
//             // window.location.href = '/login'
//             break
//           case 403:

//             // Try to refresh token if you have refresh token logic
//               if (refreshSuccess) {
//               return handleSave(field) // Retry with new token
//             }
//             // Check if it's a token issue or permissions issue
//             errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//             console.log("errorMessage",errorMessage);

//             break
//           case 404:
//             errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
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
//       console.error("Error updating profile:", error)
//       setApiMessage({
//         type: "error",
//         text: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//     setApiMessage(null)
//   }

//   useEffect(() => {
//     if (apiMessage) {
//       const timer = setTimeout(() => {
//         setApiMessage(null)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [apiMessage])

//   return (
//     <DashStudent>
//     <div className="flex justify-center p-4" dir="rtl">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200">
//         <div className="p-6">
//           {/* API Message */}
//           {apiMessage && (
//             <div
//               className={`mb-4 p-3 rounded-lg text-sm ${
//                 apiMessage.type === "success"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {apiMessage.text}
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Name Field */}
//                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
//                 <div className="font-medium mb-2 sm:mb-0">الاسم</div>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                   {editMode.name ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input defaultValue={userName} className="w-full sm:w-auto" id="name-input" />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button
//                         size="sm"
//                         onClick={() =>
//                           handleSaveFullName("name", (document.getElementById("name-input") as HTMLInputElement).value)
//                         }
//                       >
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancelFull("name")}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm">{userName}</span>
//                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEditFull("name")}>
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
//               <div className="font-medium mb-2 sm:mb-0 text-gray-700">كلمة المرور</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.password ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input
//                       type="password"
//                       value={tempValues.password}
//                       onChange={(e) => setTempValues({ ...tempValues, password: e.target.value })}
//                       placeholder="كلمة المرور الجديدة"
//                       className="w-full sm:w-auto"
//                       disabled={loading}
//                     />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button size="sm" onClick={() => handleSave("password")} disabled={loading}>
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("password")} disabled={loading}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm text-gray-600">{userData.password}</span>
//                     <Button
//                       variant="link"
//                       className="text-purple-600 p-0 h-auto"
//                       onClick={() => handleEdit("password")}
//                     >
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
//               <div className="font-medium mb-2 sm:mb-0 text-gray-700">البريد الإلكتروني</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.email ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input
//                       type="email"
//                       value={tempValues.email}
//                       onChange={(e) => setTempValues({ ...tempValues, email: e.target.value })}
//                       placeholder="البريد الإلكتروني"
//                       className="w-full sm:w-auto"
//                       disabled={loading}
//                     />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button size="sm" onClick={() => handleSave("email")} disabled={loading}>
//                         حفظ
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("email")} disabled={loading}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm text-right text-gray-600">{userData.email}</span>
//                     <Button variant="link" className="text-purple-600 p-0 h-auto" onClick={() => handleEdit("email")}>
//                       تعديل
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* WhatsApp Field */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <div className="font-medium mb-2 sm:mb-0 text-gray-700">رقم واتساب</div>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
//                 {editMode.whatsapp ? (
//                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                     <Input
//                       type="tel"
//                       value={tempValues.whatsapp}
//                       onChange={(e) => setTempValues({ ...tempValues, whatsapp: e.target.value })}
//                       placeholder="أدخل رقم واتساب"
//                       className="w-full sm:w-auto"
//                       disabled={loading}
//                     />
//                     <div className="flex gap-2 mt-2 sm:mt-0">
//                       <Button size="sm" onClick={() => handleSave("whatsapp")} disabled={loading}>
//                         {loading ? "جاري الحفظ..." : "حفظ"}
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleCancel("whatsapp")} disabled={loading}>
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
//                     <span className="text-sm text-gray-600">{globalWhatsUpPhone || userData.whatsapp}</span>
//                     <Button
//                       variant="link"
//                       className="text-purple-600 p-0 h-auto"
//                       onClick={() => handleEdit("whatsapp")}
//                     >
//                       {(globalWhatsUpPhone || userData.whatsapp) === "لا يوجد" ? "إضافة" : "تعديل"}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </DashStudent>
//   )
// }

// export default StudentProfilePage




// // "use client"

// // import Cookies from "js-cookie"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { useState, useEffect } from "react"
// // import { useDispatch, useSelector } from "react-redux"
// // import { changeGlobalName } from "@/features/auth/authSlice"

// // const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// // interface ApiResponse {
// //   meta: string
// //   succeeded: boolean
// //   message: string
// //   errors: string[]
// //   data: string
// // }

// // interface UpdateStudentRequest {
// //   firstName: string
// //   lastName: string
// //   whatsUpNumber: string
// // }

// // type EditModeFields = "name" | "password" | "email" | "whatsapp"

// // const StudentProfilePage = () => {
// //   const [userName, setUserName] = useState("")
// //   const [loading, setLoading] = useState(false)
// //   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

// //   const [userData, setUserData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     password: "••••••••",
// //     email: "",
// //     whatsapp: "لا يوجد",
// //   })

// //   const dispatch = useDispatch()
// //   const globalEmail = useSelector(
// //     (state: { background: { globalEmail: string } }) => state.background.globalEmail || "",
// //   )
// //   const globalPassword = useSelector(
// //     (state: { background: { globalPassword: string } }) => state.background.globalPassword || "",
// //   )
// //   const globalWhatsUpPhone = useSelector(
// //     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone || "",
// //   )

// //   const [editMode, setEditMode] = useState({
// //     name: false,
// //     password: false,
// //     email: false,
// //     whatsapp: false,
// //   })

// //   const [tempValues, setTempValues] = useState({
// //     firstName: "",
// //     lastName: "",
// //     password: "",
// //     email: "",
// //     whatsapp: "",
// //   })

// //   const handleEditFull = (field: EditModeFields) => {
// //     setEditMode({ ...editMode, [field]: true })
// //   }

// //   useEffect(() => {
// //     const fullName = localStorage.getItem("userName") || ""
// //     setUserName(fullName)
// //     const [firstName, ...lastNameParts] = fullName.split(" ")
// //     setUserData((prev) => ({
// //       ...prev,
// //       firstName: firstName || "",
// //       lastName: lastNameParts.join(" ") || "",
// //       email: globalEmail || "noodsaf01@gmail.com",
// //     }))
// //     console.log("fullName", fullName)
// //   }, [globalEmail])

// //   const handleEdit = (field: EditModeFields) => {
// //     if (field === "name") {
// //       const [first, ...rest] = userName.split(" ")
// //       setTempValues({
// //         ...tempValues,
// //         firstName: first || "",
// //         lastName: rest.join(" ") || "",
// //       })
// //     } else if (field === "whatsapp") {
// //       setTempValues({ ...tempValues, whatsapp: globalWhatsUpPhone || userData.whatsapp || "" })
// //     } else if (field === "email") {
// //       setTempValues({ ...tempValues, email: globalEmail || userData.email || "" })
// //     } else if (field === "password") {
// //       setTempValues({ ...tempValues, password: "" })
// //     }
// //     setEditMode({ ...editMode, [field]: true })
// //   }

// // const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse> => {
// //   const token = Cookies.get("accessToken") || "";
// //   try {
// //     const response = await fetch(`${API_URL}/api/Student/Update`, {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(data),
// //     });
    
// //     const responseData = await response.json();
    
// //     if (!response.ok) {
// //       // Return the full error response from server
// //       return responseData;
// //     }
    
// //     return responseData;
// //   } catch (error) {
// //     console.error("Network error:", error);
// //     throw error;
// //   }
// // }

// //   // const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse> => {
// //   //   const token = Cookies.get("accessToken") || ""

// //   //   if (!token) {
// //   //     throw new Error("لم يتم العثور على رمز المصادقة")
// //   //   }

// //   //   console.log("API Request:", { url: `${API_URL}/api/Student/Update`, data, token: token.substring(0, 10) + "..." })

// //   //   const response = await fetch(`${API_URL}/api/Student/Update`, {
// //   //     method: "POST",
// //   //     headers: {
// //   //       Authorization: `Bearer ${token}`,
// //   //       "Content-Type": "application/json",
// //   //     },
// //   //     body: JSON.stringify(data),
// //   //   })

// //   //   const responseData = await response.json()
// //   //   console.log("API Response:", { status: response.status, data: responseData })

// //   //   if (!response.ok) {
// //   //     if (response.status === 422) {
// //   //       throw new Error(responseData.message || "البيانات المرسلة غير صحيحة")
// //   //     } else if (response.status === 401) {
// //   //       throw new Error("انتهت صلاحية جلسة المستخدم")
// //   //     } else {
// //   //       throw new Error(`HTTP error! status: ${response.status}`)
// //   //     }
// //   //   }

// //   //   return responseData
// //   // }

// //   const handleSave = async (field: EditModeFields) => {
// //     setLoading(true)
// //     setApiMessage(null)

// //     try {
// //       if (field === "name") {
// //         // Validate required fields
// //         if (!tempValues.firstName?.trim()) {
// //           setApiMessage({ type: "error", text: "الاسم الأول مطلوب" })
// //           setLoading(false)
// //           return
// //         }

// //         const fullName = `${tempValues.firstName.trim()} ${tempValues.lastName?.trim() || ""}`.trim()
// //         console.log("fullName", fullName)

// //         // Ensure WhatsApp number is never empty - use existing value or default
// //         const whatsAppNumber = globalWhatsUpPhone?.trim() || userData.whatsapp?.trim() || "لا يوجد"

// //         const updateData: UpdateStudentRequest = {
// //           firstName: tempValues.firstName.trim(),
// //           lastName: tempValues.lastName?.trim() || "",
// //           whatsUpNumber: whatsAppNumber,
// //         }

// //         console.log("Sending update data:", updateData) // Debug log

// //         const response = await updateStudentProfile(updateData)

// // if (response.succeeded) {
// //   // success handling
// // } else {
// //   setApiMessage({
// //     type: "error",
// //     text: response.errors?.join(", ") || 
// //           response.message || 
// //           "Validation failed. Please check your inputs.",
// //   });
  
// //   // Log detailed error info for debugging
// //   console.error("Validation errors:", response.errors);
// //   console.error("Request payload:", updateData);
// // }

// //         // if (response.succeeded) {
// //         //   localStorage.removeItem("userName")
// //         //   localStorage.setItem("userName", fullName)
// //         //   setUserName(fullName)
// //         //   dispatch(changeGlobalName(fullName))
// //         //   setUserData({
// //         //     ...userData,
// //         //     firstName: tempValues.firstName.trim(),
// //         //     lastName: tempValues.lastName?.trim() || "",
// //         //   })
// //         //   setApiMessage({ type: "success", text: response.message || "تم تحديث الاسم بنجاح" })
// //         // } else {
// //         //   setApiMessage({
// //         //     type: "error",
// //         //     text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
// //         //   })
// //         // }
// //       } else if (field === "whatsapp") {
// //         // If user clears the field, set it to default value
// //         const whatsAppValue = tempValues.whatsapp?.trim() || "لا يوجد"

// //         // Validate WhatsApp number format (basic validation) - skip if it's the default value
// //         if (whatsAppValue !== "لا يوجد" && !/^\+?[\d\s-()]+$/.test(whatsAppValue)) {
// //           setApiMessage({ type: "error", text: "رقم واتساب غير صحيح" })
// //           setLoading(false)
// //           return
// //         }

// //         const currentFullName = localStorage.getItem("userName") || userName
// //         const [firstName, ...lastNameParts] = currentFullName.split(" ")

// //         const updateData: UpdateStudentRequest = {
// //           firstName: firstName || "",
// //           lastName: lastNameParts.join(" ") || "",
// //           whatsUpNumber: whatsAppValue,
// //         }

// //         console.log("Sending WhatsApp update data:", updateData) // Debug log

// //         const response = await updateStudentProfile(updateData)
// //         if (response.succeeded) {
// //           setUserData({ ...userData, whatsapp: whatsAppValue })
// //           setApiMessage({ type: "success", text: response.message || "تم تحديث رقم واتساب بنجاح" })
// //         } else {
// //           setApiMessage({
// //             type: "error",
// //             text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
// //           })
// //         }
// //       } else {
// //         if (field === "email") {
// //           setUserData({ ...userData, email: tempValues.email || "" })
// //           console.log("email", userData.email)
// //           console.log("new email", tempValues.email)
// //         } else if (field === "password") {
// //           setUserData({ ...userData, password: "••••••••" })
// //           console.log("password", userData.password)
// //           console.log("new password", tempValues.password)
// //         }
// //         setApiMessage({ type: "success", text: "تم التحديث بنجاح" })
// //       }

// //       setEditMode({ ...editMode, [field]: false })
// //     } catch (error) {
// //       console.error("Error updating profile:", error)
// //       setApiMessage({
// //         type: "error",
// //         text: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleCancel = (field: EditModeFields) => {
// //     setEditMode({ ...editMode, [field]: false })
// //     setApiMessage(null)
// //   }

// //   useEffect(() => {
// //     if (apiMessage) {
// //       const timer = setTimeout(() => {
// //         setApiMessage(null)
// //       }, 5000)
// //       return () => clearTimeout(timer)
// //     }
// //   }, [apiMessage])

// //   return (
// //     <div className="flex justify-center p-4" dir="rtl">
// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200">
// //         <div className="p-6">
// //           {/* API Message */}
// //           {apiMessage && (
// //             <div
// //               className={`mb-4 p-3 rounded-lg text-sm ${
// //                 apiMessage.type === "success"
// //                   ? "bg-green-50 text-green-700 border border-green-200"
// //                   : "bg-red-50 text-red-700 border border-red-200"
// //               }`}
// //             >
// //               {apiMessage.text}
// //             </div>
// //           )}

// //           <div className="space-y-4">
// //             {/* Name Field */}
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4">
// //               <div className="font-medium mb-2 sm:mb-0">الاسم</div>
// //               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
// //                 {editMode.name ? (
// //                   <div className="flex flex-col gap-2 w-full sm:w-auto">
// //                     <div className="flex flex-col sm:flex-row gap-2">
// //                       <Input
// //                         type="text"
// //                         value={tempValues.firstName || ""}
// //                         onChange={(e) => setTempValues({ ...tempValues, firstName: e.target.value || "" })}
// //                         placeholder="الاسم الأول"
// //                         className="w-full sm:w-auto"
// //                         disabled={loading}
// //                       />
// //                       <Input
// //                         type="text"
// //                         value={tempValues.lastName || ""}
// //                         onChange={(e) => setTempValues({ ...tempValues, lastName: e.target.value || "" })}
// //                         placeholder="اسم العائلة"
// //                         className="w-full sm:w-auto"
// //                         disabled={loading}
// //                       />
// //                     </div>
// //                     <div className="flex gap-2 mt-2 sm:mt-0">
// //                       <Button size="sm" onClick={() => handleSave("name")} disabled={loading}>
// //                         {loading ? "جاري الحفظ..." : "حفظ"}
// //                       </Button>
// //                       <Button size="sm" variant="outline" onClick={() => handleCancel("name")} disabled={loading}>
// //                         إلغاء
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
// //                     <span className="text-sm">{userName || "غير محدد"}</span>
// //                     <Button variant="link" className="text-blue-600 p-0 h-auto" onClick={() => handleEdit("name")}>
// //                       تعديل
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Password Field */}
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
// //               <div className="font-medium mb-2 sm:mb-0 text-gray-700">كلمة المرور</div>
// //               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
// //                 {editMode.password ? (
// //                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
// //                     <Input
// //                       type="password"
// //                       value={tempValues.password || ""}
// //                       onChange={(e) => setTempValues({ ...tempValues, password: e.target.value || "" })}
// //                       placeholder="كلمة المرور الجديدة"
// //                       className="w-full sm:w-auto"
// //                       disabled={loading}
// //                     />
// //                     <div className="flex gap-2 mt-2 sm:mt-0">
// //                       <Button size="sm" onClick={() => handleSave("password")} disabled={loading}>
// //                         حفظ
// //                       </Button>
// //                       <Button size="sm" variant="outline" onClick={() => handleCancel("password")} disabled={loading}>
// //                         إلغاء
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
// //                     <span className="text-sm text-gray-600">{userData.password}</span>
// //                     <Button
// //                       variant="link"
// //                       className="text-purple-600 p-0 h-auto"
// //                       onClick={() => handleEdit("password")}
// //                     >
// //                       تعديل
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Email Field */}
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
// //               <div className="font-medium mb-2 sm:mb-0 text-gray-700">البريد الإلكتروني</div>
// //               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
// //                 {editMode.email ? (
// //                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
// //                     <Input
// //                       type="email"
// //                       value={tempValues.email || ""}
// //                       onChange={(e) => setTempValues({ ...tempValues, email: e.target.value || "" })}
// //                       placeholder="البريد الإلكتروني"
// //                       className="w-full sm:w-auto"
// //                       disabled={loading}
// //                     />
// //                     <div className="flex gap-2 mt-2 sm:mt-0">
// //                       <Button size="sm" onClick={() => handleSave("email")} disabled={loading}>
// //                         حفظ
// //                       </Button>
// //                       <Button size="sm" variant="outline" onClick={() => handleCancel("email")} disabled={loading}>
// //                         إلغاء
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
// //                     <span className="text-sm text-right text-gray-600">
// //                       {userData.email || globalEmail || "غير محدد"}
// //                     </span>
// //                     <Button variant="link" className="text-purple-600 p-0 h-auto" onClick={() => handleEdit("email")}>
// //                       تعديل
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* WhatsApp Field */}
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
// //               <div className="font-medium mb-2 sm:mb-0 text-gray-700">رقم واتساب</div>
// //               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
// //                 {editMode.whatsapp ? (
// //                   <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
// //                     <Input
// //                       type="tel"
// //                       value={tempValues.whatsapp || ""}
// //                       onChange={(e) => setTempValues({ ...tempValues, whatsapp: e.target.value || "" })}
// //                       placeholder="أدخل رقم واتساب"
// //                       className="w-full sm:w-auto"
// //                       disabled={loading}
// //                     />
// //                     <div className="flex gap-2 mt-2 sm:mt-0">
// //                       <Button size="sm" onClick={() => handleSave("whatsapp")} disabled={loading}>
// //                         {loading ? "جاري الحفظ..." : "حفظ"}
// //                       </Button>
// //                       <Button size="sm" variant="outline" onClick={() => handleCancel("whatsapp")} disabled={loading}>
// //                         إلغاء
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
// //                     <span className="text-sm text-gray-600">
// //                       {globalWhatsUpPhone || userData.whatsapp || "لا يوجد"}
// //                     </span>
// //                     <Button
// //                       variant="link"
// //                       className="text-purple-600 p-0 h-auto"
// //                       onClick={() => handleEdit("whatsapp")}
// //                     >
// //                       {(globalWhatsUpPhone || userData.whatsapp) === "لا يوجد" ? "إضافة" : "تعديل"}
// //                     </Button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default StudentProfilePage











// "use client"
// import Cookies from "js-cookie"
// import axios from "axios"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { changeGlobalName } from "@/features/auth/authSlice"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// interface Student {
//     id: string,
//     firstName: string,
//     lastName: string,
//     createdAt: string,
//     email: string,
//     whatsUpNumber: string
// }

// interface ApiRequest {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }


// interface UpdateStudentRequest {
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
// }

// type EditModeFields = "name" | "password" | "email" | "whatsUpNumber"

// const StudentProfilePage = () => {
//   const [userName, setUserName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     password: "••••••••",
//     email: "noodsaf01@gmail.com",
//     whatsUpNumber: "لا يوجد",
//   })

//   const dispatch = useDispatch()
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
//   const globalPassword = useSelector(
//     (state: { background: { globalPassword: string } }) => state.background.globalPassword,
//   )
//   const globalWhatsUpPhone = useSelector(
//     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
//   )

//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsUpNumber: false,
//   })

//   // const [tempValues, setTempValues] = useState({
//   //   firstName: "",
//   //   lastName: "",
//   //   password: "",
//   //   email: "",
//   //   whatsUpNumber: "",
//   // })

//   const [tempValues, setTempValues] = useState<Student[]>([])

//   const handleEditFull = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const handleSaveFullName = (field: EditModeFields, value: string) => {
//     if (field === "name") {
//       const fullName = localStorage.getItem("userName")
//       console.log("fullName", fullName)
//       localStorage.removeItem("userName")
//       localStorage.setItem("userName", value)
//       setUserName(value)
//       dispatch(changeGlobalName(value))
//       console.log("new fullName", value)
//     }
//     setEditMode({ ...editMode, [field]: false })
//   }

//   const handleCancelFull = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//   }


//   useEffect(() => {
//     const fullName = localStorage.getItem("userName") || ""
//     setUserName(fullName)
//     const [firstName, ...lastNameParts] = fullName.split(" ")
//     setUserData((prev) => ({
//       ...prev,
//       firstName: firstName || "",
//       lastName: lastNameParts.join(" ") || "",
//     }))
//     console.log("fullName", fullName)
//   }, [])


//   const handleEdit = (field: EditModeFields) => {
//     if (field === "name") {
//       const [first, ...rest] = userName.split(" ")
//       setTempValues(() => ({
//         ...tempValues,
//         firstName: first || "",
//         lastName: rest.join(" ") || "",
//       }))
//     } else if (field === "whatsUpNumber") {
//       setTempValues(() => ({ ...tempValues, whatsUpNumber: globalWhatsUpPhone }))
//     } else if (field === "email") {
//       setTempValues(() => ({ ...tempValues, email: globalEmail }))
//     } else if (field === "password") {
//       setTempValues(() => ({ ...tempValues, password: "" }))
//     }
//     setEditMode({ ...editMode, [field]: true })
//   }


//   const getInfoStudentProfile = async (): Promise<ApiRequest> => {
//     const token = Cookies.get("accessToken") || ""
    
//     try {
//       const response = await axios.post(`${API_URL}/api/Student/GetStudent`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       if(response.data){
//         setTempValues(response.data)
//       }else{
//         console.log("there's some error here")
//       }
      
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 console.log("start refresh")
//                 return getInfoStudentProfile() // Retry with new token
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return getInfoStudentProfile() // Retry with new token
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               console.log("errorMessage", errorMessage)
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

//       console.error("Error updating profile:", error)
//       setApiMessage({
//         type: "error",
//         text: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
//       })
//     }
//   }


//   const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse> => {
//     const token = Cookies.get("accessToken") || ""
//     setLoading(true)
//     try {
//       const response = await axios.post(`${API_URL}/api/Student/Update`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       return response.data
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 console.log("start refresh")
//                 return updateStudentProfile(data) // Retry with new token
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data) // Retry with new token
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               console.log("errorMessage", errorMessage)
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

//       console.error("Error updating profile:", error)
//       setApiMessage({
//         type: "error",
//         text: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
//       })
//     }finally{
//       setLoading(false)
//     }
//   }

//   const handleSave = async (field: EditModeFields) => {
//     setLoading(true)
//     setApiMessage(null)
    
//     try {
//       if (field === "name") {
//         const fullName = `${tempValues.map(item => item.firstName)} ${tempValues.map(item => item.lastName)}`.trim()
//         console.log("fullName", fullName)
//         const updateData: UpdateStudentRequest = {   
//           firstName: tempValues.map(item => item.firstName).join(" "), 
//           lastName: tempValues.map(item => item.lastName).join(" "),
//           whatsUpNumber: globalWhatsUpPhone || userData.whatsUpNumber,
//         }
//         const response = await updateStudentProfile(updateData)
//         if (response.succeeded) {
//           localStorage.removeItem("userName")
//           localStorage.setItem("userName", fullName)
//           setUserName(fullName)
//           dispatch(changeGlobalName(fullName))
//           setUserData({ ...userData, firstName: tempValues.map(item => item.firstName).join(" "), lastName: tempValues.map(item => item.lastName).join(" ") })
//           setApiMessage({ type: "success", text: response.message || "تم تحديث الاسم بنجاح" })
//         } else {
//           setApiMessage({
//             type: "error",
//             text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
//           })
//         }
//       } else if (field === "whatsUpNumber") {
//         const currentFullName = localStorage.getItem("userName") || userName
//         const [firstName, ...lastNameParts] = currentFullName.split(" ")
//         const updateData: UpdateStudentRequest = {
//           firstName: firstName || "",
//           lastName: lastNameParts.join(" ") || "",
//           whatsUpNumber: tempValues.map(item => item.whatsUpNumber).join(" "),
//         }
//         const response = await updateStudentProfile(updateData)
//         if (response.succeeded) {
//           setUserData({ ...userData, whatsUpNumber: tempValues.map(item => item.whatsUpNumber).join(" ") })
//           setApiMessage({ type: "success", text: response.message || "تم تحديث رقم واتساب بنجاح" })
//         } else {
//           setApiMessage({
//             type: "error",
//             text: response.errors?.join(", ") || response.message || "حدث خطأ أثناء التحديث",
//           })
//         }
//       } else {
//         if (field === "email") {
//           setUserData({ ...userData, email: tempValues.map(item => item.email).join(" ") })
//           console.log("email", userData.email)
//           console.log("new email", tempValues.map(item => item.email).join(" "))
//         } else if (field === "password") { 
//           setUserData({ ...userData, password: "••••••••" })
//           console.log("password", userData.password)
//           console.log("new password", tempValues.map(item => item.password).join(" "))
//         }
//         setApiMessage({ type: "success", text: "تم التحديث بنجاح" })
//       }
//       setEditMode({ ...editMode, [field]: false })
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 console.log("start refresh")
//                 return handleSave(field) // Retry with new token
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSave(field) // Retry with new token
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               console.log("errorMessage", errorMessage)
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

//       console.error("Error updating profile:", error)
//       setApiMessage({
//         type: "error",
//         text: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//     setApiMessage(null)
//   }

//   useEffect(() => {
//     if (apiMessage) {
//       const timer = setTimeout(() => {
//         setApiMessage(null)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [apiMessage])

//   useEffect(() => {
//    getInfoStudentProfile()
//   }, [])


//   return (
//     <DashStudent>
//       <div className="min-h-[90vh] py-4 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-4 sm:p-6">             
          
//             {tempValues.map((item: any) =>{ 
//               <div className="space-y-6">
//                 {/* Name Field */}
//                 <div className="border-b border-gray-200 pb-4">
//                   <div className="flex flex-col space-y-3">
//                     <div className="font-medium text-gray-900">الاسم</div>
//                     {editMode.name ? (
//                       <div className="space-y-3">
//                         <input
//                           defaultValue={userName}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                           id="name-input"
//                           placeholder="أدخل الاسم الكامل"
//                         />
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <button
//                             className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
//                             onClick={() =>
//                               handleSaveFullName("name", (document.getElementById("name-input") as HTMLInputElement).value)
//                             }
//                             type="button">
//                             حفظ
//                           </button>
//                           <button
//                             className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
//                             onClick={() => handleCancelFull("name")}
//                             type="button">
//                             إلغاء
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600">{userName || "غير محدد"}</span>
//                         <button
//                           className="text-blue-600 text-sm font-medium hover:text-blue-800 focus:outline-none focus:underline transition-colors duration-200"
//                           onClick={() => handleEditFull("name")}
//                           type="button">
//                           تعديل
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="border-b border-gray-200 pb-4">
//                   <div className="flex flex-col space-y-3">
//                     <div className="font-medium text-gray-900">كلمة المرور</div>
//                     {editMode.password ? (
//                       <div className="space-y-3">
//                         <input
//                           type="password"
//                           value={item.password}
//                           onChange={(e) => setTempValues({ ...item, password: e.target.value })}
//                           placeholder="كلمة المرور الجديدة"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                           disabled={loading}
//                         />
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <button
//                             className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleSave("password")}
//                             disabled={loading}
//                             type="button">
//                             حفظ
//                           </button>
//                           <button
//                             className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleCancel("password")}
//                             disabled={loading}
//                             type="button">
//                             إلغاء
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600">{userData.password}</span>
//                         <button
//                           className="text-purple-600 text-sm font-medium hover:text-purple-800 focus:outline-none focus:underline transition-colors duration-200"
//                           onClick={() => handleEdit("password")}
//                           type="button">
//                           تعديل
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email Field */}
//                 <div className="border-b border-gray-200 pb-4">
//                   <div className="flex flex-col space-y-3">
//                     <div className="font-medium text-gray-900">البريد الإلكتروني</div>
//                     {editMode.email ? (
//                       <div className="space-y-3">
//                         <input
//                           type="email"
//                           value={item.email}
//                           onChange={(e) => setTempValues({ ...item, email: e.target.value })}
//                           placeholder="البريد الإلكتروني"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                           disabled={loading}
//                         />
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <button
//                             className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleSave("email")}
//                             disabled={loading}
//                             type="button">
//                             حفظ
//                           </button>
//                           <button
//                             className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleCancel("email")}
//                             disabled={loading}
//                             type="button">
//                             إلغاء
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 break-all">{userData.email}</span>
//                         <button
//                           className="text-purple-600 text-sm font-medium hover:text-purple-800 focus:outline-none focus:underline transition-colors duration-200 flex-shrink-0 ml-2"
//                           onClick={() => handleEdit("email")}
//                           type="button">
//                           تعديل
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* whatsUpNumber Field */}
//                 <div>
//                   <div className="flex flex-col space-y-3">
//                     <div className="font-medium text-gray-900">رقم واتساب</div>
//                     {editMode.whatsUpNumber ? (
//                       <div className="space-y-3">
//                         <input
//                           type="tel"
//                           value={item.whatsUpNumber}
//                           onChange={(e) => setTempValues({ ...item, whatsUpNumber: e.target.value })}
//                           placeholder="أدخل رقم واتساب"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
//                           disabled={loading}
//                         />
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <button
//                             className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleSave("whatsUpNumber")}
//                             disabled={loading}
//                             type="button">
//                             {loading ? "جاري الحفظ..." : "حفظ"}
//                           </button>
//                           <button
//                             className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={() => handleCancel("whatsUpNumber")}
//                             disabled={loading}
//                             type="button">
//                             إلغاء
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600">{globalWhatsUpPhone || userData.whatsUpNumber}</span>
//                         <button
//                           className="text-purple-600 text-sm font-medium hover:text-purple-800 focus:outline-none focus:underline transition-colors duration-200"
//                           onClick={() => handleEdit("whatsUpNumber")}
//                           type="button">
//                           {(globalWhatsUpPhone || userData.whatsUpNumber) === "لا يوجد" ? "إضافة" : "تعديل"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashStudent>
//   )
// }

// export default StudentProfilePage












// "use client"

// import Cookies from "js-cookie"
// import axios from "axios"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { changeGlobalName } from "@/features/auth/authSlice"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiRequest {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// interface UpdateStudentRequest {
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
// }

// type EditModeFields = "name" | "password" | "email" | "whatsUpNumber"

// const StudentProfilePage = () => {
//   const [userName, setUserName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
//   const [studentData, setStudentData] = useState<Student | null>(null)
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     password: "••••••••",
//     email: "",
//     whatsUpNumber: "لا يوجد",
//   })
// const router = useRouter()
//   const dispatch = useDispatch()
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
//   const globalPassword = useSelector(
//     (state: { background: { globalPassword: string } }) => state.background.globalPassword,
//   )
//   const globalWhatsUpPhone = useSelector(
//     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
//   )

//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsUpNumber: false,
//   })

//   const [tempValues, setTempValues] = useState({
//     firstName: "",
//     lastName: "",
//     password: "",
//     email: "",
//     whatsUpNumber: "",
//   })

//   const handleEdit = (field: EditModeFields) => {
//     if (field === "name") {
//       const [first, ...rest] = userName.split(" ")
//       setTempValues(prev => ({
//         ...prev,
//         firstName: first || "",
//         lastName: rest.join(" ") || "",
//       }))
//     } else if (field === "whatsUpNumber") {
//       setTempValues(prev => ({ ...prev, whatsUpNumber: globalWhatsUpPhone || userData.whatsUpNumber }))
//     } else if (field === "email") {
//       setTempValues(prev => ({ ...prev, email: studentData?.email || globalEmail || userData.email }))
//     } else if (field === "password") {
//       setTempValues(prev => ({ ...prev, password: "" }))
//     }
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const getInfoStudentProfile = async (): Promise<void> => {
//     const token = Cookies.get("accessToken") || ""
    
//     try {
//       const response = await axios.get(`${API_URL}/api/Student/GetStudent`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       if (response.data.data && response.data.data.length > 0) {
//         const student = response.data.data[0]
//         setStudentData(student)
//         setUserData(prev => ({
//           ...prev,
//           firstName: student.firstName,
//           lastName: student.lastName,
//           email: student.email,
//           whatsUpNumber: student.whatsUpNumber || "لا يوجد",
//         }))
//         const fullName = `${student.firstName} ${student.lastName}`.trim()
//         setUserName(fullName)
//       }
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"
//             const refreshSuccess = await refreshAuthToken()
      
//             if (axios.isAxiosError(error)) {
//               if (error.response) {
//                 switch (error.response.status) {
//                   case 401:
//                     if (refreshSuccess) {
//                       return getInfoStudentProfile()
//                     }
//                     errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//                     router.push("/login")
//                     break
//                   case 403:
//                     if (refreshSuccess) {
//                       return getInfoStudentProfile()
//                     }
//                     errorMessage = "ليس لديك صلاحية لبدء الاختبار"
//                     router.push("/login")
//                     break
//                   case 400:
//                     errorMessage = "بيانات الطلب غير صحيحة"
//                     break
//                   case 500:
//                     errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
//                     break
//                   default:
//                     errorMessage = `خطأ في الخادم (${error.response.status})`
//                 }
//               } else if (error.request) {
//                 errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
//               } else {
//                 errorMessage = `خطأ في الطلب: ${error.message}`
//               }
//             } else {
//               errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//             }
      
//             console.error("Error starting test:", error)
//             setApiMessage({
//               type: "error",
//               text: errorMessage,
//             })
//     }
//   }

//   const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse> => {
//     const token = Cookies.get("accessToken") || ""
//     setLoading(true)
    
//     try {
//       const response = await axios.post(`${API_URL}/api/Student/Update`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       return response.data
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "ليس لديك صلاحية لبدء الاختبار"
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
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error starting test:", error)
//       setApiMessage({
//         type: "error",
//         text: errorMessage,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSave = async (field: EditModeFields) => {
//     setLoading(true)
//     setApiMessage(null)
    
//     try {
//       if (field === "name") {
//         const fullName = `${tempValues.firstName} ${tempValues.lastName}`.trim()
//         const updateData: UpdateStudentRequest = {
//           firstName: tempValues.firstName,
//           lastName: tempValues.lastName,
//           whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response.succeeded) {
//           localStorage.setItem("userName", fullName)
//           setUserName(fullName)
//           dispatch(changeGlobalName(fullName))
//           setUserData(prev => ({ 
//             ...prev, 
//             firstName: tempValues.firstName, 
//             lastName: tempValues.lastName 
//           }))
//           setApiMessage({ type: "success", text: "تم تحديث الاسم بنجاح" })
//         }
//       } else if (field === "whatsUpNumber") {
//         const updateData: UpdateStudentRequest = {
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           whatsUpNumber: tempValues.whatsUpNumber,
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response.succeeded) {
//           setUserData(prev => ({ ...prev, whatsUpNumber: tempValues.whatsUpNumber }))
//           setApiMessage({ type: "success", text: "تم تحديث رقم واتساب بنجاح" })
//         }
//       } else if (field === "email") {
//         setUserData(prev => ({ ...prev, email: tempValues.email }))
//         setApiMessage({ type: "success", text: "تم تحديث البريد الإلكتروني بنجاح" })
//       } else if (field === "password") {
//         setUserData(prev => ({ ...prev, password: "••••••••" }))
//         setApiMessage({ type: "success", text: "تم تحديث كلمة المرور بنجاح" })
//       }
      
//       setEditMode({ ...editMode, [field]: false })
//     } catch (error) {
//       let errorMessage = "حدث خطأ في بدء الاختبار"
//       const refreshSuccess = await refreshAuthToken()

//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSave(field)
//               }
//               errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSave(field)
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
//       } else {
//         errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//       }

//       console.error("Error starting test:", error)
//       setApiMessage({
//         type: "error",
//         text: errorMessage,
//       })      
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//     setApiMessage(null)
//   }

//   useEffect(() => {
//     const fullName = localStorage.getItem("userName") || ""
//     setUserName(fullName)
//     const [firstName, ...lastNameParts] = fullName.split(" ")
//     setUserData(prev => ({
//       ...prev,
//       firstName: firstName || "",
//       lastName: lastNameParts.join(" ") || "",
//     }))
//   }, [])

//   useEffect(() => {
//     if (apiMessage) {
//       const timer = setTimeout(() => {
//         setApiMessage(null)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [apiMessage])

//   useEffect(() => {
//     getInfoStudentProfile()
//   }, [])

//   const ProfileField = ({ 
//     label, 
//     field, 
//     value, 
//     type = "text", 
//     placeholder,
//     color = "blue"
//   }: {
//     label: string
//     field: EditModeFields
//     value: string
//     type?: string
//     placeholder: string
//     color?: string
//   }) => {
//     const colorClasses = {
//       blue: {
//         button: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
//         text: "text-blue-600 hover:text-blue-700",
//         input: "focus:ring-blue-500 focus:border-blue-500"
//       },
//       purple: {
//         button: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500",
//         text: "text-purple-600 hover:text-purple-700",
//         input: "focus:ring-purple-500 focus:border-purple-500"
//       },
//       green: {
//         button: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
//         text: "text-green-600 hover:text-green-700",
//         input: "focus:ring-green-500 focus:border-green-500"
//       }
//     }

//     const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

//     return (
//       <div className="group relative">
//         <div className="flex flex-col space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
//             {!editMode[field] && (
//               <button
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${colors.text} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.input.split(' ')[0]}`}
//                 onClick={() => handleEdit(field)}
//                 type="button"
//               >
//                 {value === "لا يوجد" && field === "whatsUpNumber" ? "إضافة" : "تعديل"}
//               </button>
//             )}
//           </div>
          
//           {editMode[field] ? (
//             <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
//               {field === "name" ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <h3 className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</h3>
//                     <input
//                       type="text"
//                       value={tempValues.firstName}
//                       onChange={(e) => setTempValues(prev => ({ ...prev, firstName: e.target.value }))}
//                       placeholder="الاسم الأول"
//                       className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm`}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="block text-sm font-medium text-gray-700 mb-1">اسم العائلة</h3>
//                     <input
//                       type="text"
//                       value={tempValues.lastName}
//                       onChange={(e) => setTempValues(prev => ({ ...prev, lastName: e.target.value }))}
//                       placeholder="اسم العائلة"
//                       className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm  text-sm`}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <input
//                   type={type}
//                   value={tempValues[field as keyof typeof tempValues]}
//                   onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
//                   placeholder={placeholder}
//                   className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm`}
//                 />
//               )}
              
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   className={`flex-1 ${colors.button} text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md`}
//                   onClick={() => handleSave(field)}
//                   type="button"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       جاري الحفظ...
//                     </div>
//                   ) : (
//                     "حفظ"
//                   )}
//                 </button>
//                 <button
//                   className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => handleCancel(field)}
//                   type="button"
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
//               <p className="text-gray-700 text-sm break-all">
//                 {field === "whatsUpNumber" ? (globalWhatsUpPhone || value) : value || "غير محدد"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <DashStudent>
//       <div className="min-h-[90vh] py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
//             <p className="text-gray-600">إدارة معلوماتك الشخصية</p>
//           </div>

//           {/* Alert Message */}
//           {apiMessage && (
//             <div className={`mb-6 p-4 rounded-lg border animate-in slide-in-from-top-2 duration-300 ${
//               apiMessage.type === "success" 
//                 ? "bg-green-50 border-green-200 text-green-800" 
//                 : "bg-red-50 border-red-200 text-red-800"
//             }`}>
//               <div className="flex items-center">
//                 <div className={`w-5 h-5 rounded-full mr-3 ${
//                   apiMessage.type === "success" ? "bg-green-500" : "bg-red-500"
//                 }`}>
//                   <div className="w-full h-full rounded-full bg-white animate-ping opacity-75"></div>
//                 </div>
//                 <p className="text-sm font-medium">{apiMessage.text}</p>
//               </div>
//             </div>
//           )}

//           {/* Profile Card */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            
//             <div className="px-6 sm:px-8 py-8 -mt-12 relative">
//               {/* Avatar */}
//               <div className="flex justify-center mb-6">
//                 <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">
//                       {userName ? userName.charAt(0) : "ط"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Fields */}
//               <div className="space-y-8">
//                 <ProfileField
//                   label="الاسم الكامل"
//                   field="name"
//                   value={userName}
//                   placeholder="أدخل الاسم الكامل"
//                   color="blue"
//                 />

//                 <ProfileField
//                   label="كلمة المرور"
//                   field="password"
//                   value={userData.password}
//                   type="password"
//                   placeholder="كلمة المرور الجديدة"
//                   color="purple"
//                 />

//                 <ProfileField
//                   label="البريد الإلكتروني"
//                   field="email"
//                   value={studentData?.email || userData.email}
//                   type="email"
//                   placeholder="البريد الإلكتروني"
//                   color="green"
//                 />

//                 <ProfileField
//                   label="رقم واتساب"
//                   field="whatsUpNumber"
//                   value={userData.whatsUpNumber}
//                   type="tel"
//                   placeholder="أدخل رقم واتساب"
//                   color="green"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-gray-500 text-sm">
//               آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashStudent>
//   )
// }

// export default StudentProfilePage










// "use client"

// import Cookies from "js-cookie"
// import axios from "axios"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// // import { Input } from "@/components/ui/input"
// import { changeGlobalName } from "@/features/auth/authSlice"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiRequest {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// interface UpdateStudentRequest {
//   firstName: string
//   lastName: string
//   whatsUpNumber: string
// }

// type EditModeFields = "name" | "password" | "email" | "whatsUpNumber"

// const StudentProfilePage = () => {
//   const [userName, setUserName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
//   const [studentData, setStudentData] = useState<Student | null>({
//     id: "",
//     firstName: "",
//     lastName: "",
//     createdAt: "",
//     email: "example@gmail.com",
//     whatsUpNumber: "لا يوجد",
//   })

//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     password: "••••••••",
//     email: "",
//     whatsUpNumber: "لا يوجد",
//   })

//   const router = useRouter()
//   const dispatch = useDispatch()
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
//   const globalPassword = useSelector(
//     (state: { background: { globalPassword: string } }) => state.background.globalPassword,
//   )
//   const globalWhatsUpPhone = useSelector(
//     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
//   )

//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsUpNumber: false,
//   })

//   const [tempValues, setTempValues] = useState({
//     firstName: "",
//     lastName: "",
//     password: "",
//     email: "",
//     whatsUpNumber: "",
//   })

//   const handleEdit = (field: EditModeFields) => {
//     if (field === "name") {
//       const [first, ...rest] = userName.split(" ")
//       setTempValues(prev => ({
//         ...prev,
//         firstName: first || "",
//         lastName: rest.join(" ") || "",
//       }))
//     } else if (field === "whatsUpNumber") {
//       setTempValues(prev => ({ ...prev, whatsUpNumber: globalWhatsUpPhone || userData.whatsUpNumber }))
//     } else if (field === "email") {
//       setTempValues(prev => ({ ...prev, email: studentData?.email || globalEmail || userData.email }))
//     } else if (field === "password") {
//       setTempValues(prev => ({ ...prev, password: "" }))
//     }
//     setEditMode({ ...editMode, [field]: true })
//   }

//   const getInfoStudentProfile = async (): Promise<void> => {
//     const token = Cookies.get("accessToken") || ""
     
//     try {
//       const response = await axios.get(`${API_URL}/api/Student/GetStudent`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       console.log("info  data =====",response.data.data)
//       console.log("info  data length =====",response.data.data.length)
//       if (response.data.data) {
//         const student = response.data.data
//         setStudentData(response.data.data)
//         console.log("studentData  +++=", studentData);
//         setUserData(prev => ({
//           ...prev,
//           firstName: student.firstName,
//           lastName: student.lastName,
//           email: student.email,
//           whatsUpNumber: student.whatsUpNumber || "لا يوجد",
//         }))
//         const fullName = `${student.firstName} ${student.lastName}`.trim()
//         setUserName(fullName)
//       }
//     } catch (error) {
//       // await handleApiError(error, getInfoStudentProfile)
//       let errorMessage = "Unknown error occurred"
//             const refreshSuccess = await refreshAuthToken()
//             if (axios.isAxiosError(error)) {
//               if (error.response) {
//                 switch (error.response.status) {
//                   case 401:
//                     if (refreshSuccess) {
//                       return getInfoStudentProfile()
//                     }
//                     errorMessage = "Authentication expired. Please log in again."
//                     router.push("/login")
//                     break
//                   case 403:
//                     if (refreshSuccess) {
//                       return getInfoStudentProfile()
//                     }
//                     errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                     router.push("/login")
//                     break
//                   case 404:
//                     errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//                     break
//                   case 500:
//                     errorMessage = "Server error (500). Please try again later."
//                     break
//                   default:
//                     errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//                 }
//               } else if (error.request) {
//                 errorMessage = "Network error. Please check your internet connection."
//               } else {
//                 errorMessage = `Request error: ${error.message}`
//               }
//             } else {
//               errorMessage = error instanceof Error ? error.message : "Unknown error"
//             }
//             console.error("Error fetching data:", error)
//     }
//   }

// useEffect(() => {
//   getInfoStudentProfile()

// },[])

//   const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse | undefined> => {
//     const token = Cookies.get("accessToken") || ""
//     setLoading(true)
    
    
//       // Try PUT method first, then PATCH if PUT fails
      
//       try {
//       const  response = await axios.put(`${API_URL}/api/Student/Update`, data, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         console.log(" student update +++++",response.data)
//       } catch (error) {

//         let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/login")
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
//       }finally {
//       setLoading(false)
//     }
//   }

//   // const handleApiError = async (error: any, retryFunction?: () => Promise<any>) => {
//   //   let errorMessage = "حدث خطأ في العملية"
//   //   const refreshSuccess = await refreshAuthToken()
    
//   //   if (axios.isAxiosError(error)) {
//   //     if (error.response) {
//   //       switch (error.response.status) {
//   //         case 401:
//   //           if (refreshSuccess && retryFunction) {
//   //             return retryFunction()
//   //           }
//   //           errorMessage = "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى"
//   //           router.push("/login")
//   //           break
//   //         case 403:
//   //           if (refreshSuccess && retryFunction) {
//   //             return retryFunction()
//   //           }
//   //           errorMessage = "ليس لديك صلاحية لتنفيذ هذه العملية"
//   //           router.push("/login")
//   //           break
//   //         case 400:
//   //           errorMessage = "بيانات الطلب غير صحيحة"
//   //           break
//   //         case 405:
//   //           errorMessage = "طريقة الطلب غير مدعومة. يرجى المحاولة مرة أخرى"
//   //           break
//   //         case 500:
//   //           errorMessage = "خطأ في الخادم. يرجى المحاولة لاحقاً"
//   //           break
//   //         default:
//   //           errorMessage = `خطأ في الخادم (${error.response.status})`
//   //       }
//   //     } else if (error.request) {
//   //       errorMessage = "خطأ في الشبكة. يرجى التحقق من الاتصال"
//   //     } else {
//   //       errorMessage = `خطأ في الطلب: ${error.message}`
//   //     }
//   //   } else {
//   //     errorMessage = error instanceof Error ? error.message : "خطأ غير معروف"
//   //   }
    
//   //   console.error("API Error:", error)
//   //   setApiMessage({
//   //     type: "error",
//   //     text: errorMessage,
//   //   })
//   // }

//   const handleSave = async (field: EditModeFields) => {
//     setLoading(true)
//     setApiMessage(null)
    
//     try {
//       if (field === "name") {
//         const fullName = `${tempValues.firstName} ${tempValues.lastName}`.trim()
//         const updateData: UpdateStudentRequest = {
//           firstName: tempValues.firstName,
//           lastName: tempValues.lastName,
//           whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response?.succeeded) {
//           localStorage.setItem("userName", fullName)
//           setUserName(fullName)
//           dispatch(changeGlobalName(fullName))
//           setUserData(prev => ({
//             ...prev,
//             firstName: tempValues.firstName,
//             lastName: tempValues.lastName
//           }))
//           setApiMessage({ type: "success", text: "تم تحديث الاسم بنجاح" })
//         }
//       } else if (field === "whatsUpNumber") {
//         const updateData: UpdateStudentRequest = {
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           whatsUpNumber: tempValues.whatsUpNumber,
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response?.succeeded) {
//           setUserData(prev => ({ ...prev, whatsUpNumber: tempValues.whatsUpNumber }))
//           setApiMessage({ type: "success", text: "تم تحديث رقم واتساب بنجاح" })
//         }
//       } else if (field === "email") {
//         // Handle email update - you might need a different API endpoint for this
//         setUserData(prev => ({ ...prev, email: tempValues.email }))
//         setApiMessage({ type: "success", text: "تم تحديث البريد الإلكتروني بنجاح" })
//       } else if (field === "password") {
//         // Handle password update - you might need a different API endpoint for this
//         setUserData(prev => ({ ...prev, password: "••••••••" }))
//         setApiMessage({ type: "success", text: "تم تحديث كلمة المرور بنجاح" })
//       }
      
//       setEditMode({ ...editMode, [field]: false })
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return handleSave(field)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return handleSave(field)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/login")
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
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancel = (field: EditModeFields) => {
//     setEditMode({ ...editMode, [field]: false })
//     setApiMessage(null)
//   }

//   useEffect(() => {
//     const fullName = localStorage.getItem("userName") || ""
//     setUserName(fullName)
//     const [firstName, ...lastNameParts] = fullName.split(" ")
//     setUserData(prev => ({
//       ...prev,
//       firstName: firstName || "",
//       lastName: lastNameParts.join(" ") || "",
//     }))
//   }, [])

//   useEffect(() => {
//     if (apiMessage) {
//       const timer = setTimeout(() => {
//         setApiMessage(null)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [apiMessage])

//   useEffect(() => {
//     getInfoStudentProfile()
//   }, [])

//   const ProfileField = ({
//     label,
//     field,
//     value,
//     type = "text",
//     placeholder,
//     color = "blue"
//   }: {
//     label: string
//     field: EditModeFields
//     value: string
//     type?: string
//     placeholder: string
//     color?: string
//   }) => {
//     const colorClasses = {
//       blue: {
//         button: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
//         text: "text-blue-600 hover:text-blue-700",
//         input: "focus:ring-blue-500 focus:border-blue-500"
//       },
//       purple: {
//         button: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500",
//         text: "text-purple-600 hover:text-purple-700",
//         input: "focus:ring-purple-500 focus:border-purple-500"
//       },
//       green: {
//         button: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
//         text: "text-green-600 hover:text-green-700",
//         input: "focus:ring-green-500 focus:border-green-500"
//       }
//     }

//     const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

//     return (
//       <div className="group relative">
//         <div className="flex flex-col space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
//             {!editMode[field] && (
//               <button
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${colors.text} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.input.split(' ')[0]}`}
//                 onClick={() => handleEdit(field)}
//                 type="button"
//               >
//                 {value === "لا يوجد" && field === "whatsUpNumber" ? "إضافة" : "تعديل"}
//               </button>
//             )}
//           </div>
          
//           {editMode[field] ? (
//             <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
//               {field === "name" ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <h3 className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</h3>
//                     {/* <input
//                           defaultValue={userName}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                           id="name-input"
//                           placeholder="أدخل الاسم الكامل"
//                         /> */}
                    
//                     <input
//                       value={tempValues.firstName}
//                       onChange={(e) => setTempValues(prev => ({ ...prev, firstName: e.target.value }))}
//                       placeholder="الاسم الأول"
//                       id="name-input"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"                      dir="rtl"
//                       // onFocus={(e) => e.target.select()}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="block text-sm font-medium text-gray-700 mb-1">اسم العائلة</h3>
//                     <input
//                       value={tempValues.lastName}
//                       onChange={(e) => setTempValues(prev => ({ ...prev, lastName: e.target.value }))}
//                       placeholder="اسم العائلة"
//                       id="name-input"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"                      dir="rtl"
//                       // onFocus={(e) => e.target.select()}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <input
//                   type={type}
//                   value={tempValues[field as keyof typeof tempValues]}
//                   onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
//                   placeholder={placeholder}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   // onFocus={(e) => e.target.select()}
//                 />
//               )}
              
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   className={`flex-1 ${colors.button} text-white px-6 py-3 rounded-lg text-sm font-medium  focus:outline-none shadow-sm hover:shadow-md`}
//                   onClick={() => handleSave(field)}
//                   type="button"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
//                       جاري الحفظ...
//                     </div>
//                   ) : (
//                     "حفظ"
//                   )}
//                 </button>
//                 <button
//                   className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   onClick={() => handleCancel(field)}
//                   type="button"
//                   disabled={loading}
//                 >
//                   إلغاء
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
//               <p className="text-gray-700 text-sm break-all text-right" dir="rtl">
//                 {field === "whatsUpNumber" ? (globalWhatsUpPhone || value) : value || "غير محدد"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }



//   return (
//     <DashStudent>
//       <div className="min-h-[90vh] py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
//             <p className="text-gray-600">إدارة معلوماتك الشخصية</p>
//           </div>

//           {/* Alert Message */}
//           {apiMessage && (
//             <div className={`mb-6 p-4 rounded-lg border animate-in slide-in-from-top-2 duration-300 ${
//               apiMessage.type === "success"
//                 ? "bg-green-50 border-green-200 text-green-800"
//                 : "bg-red-50 border-red-200 text-red-800"
//             }`}>
//               <div className="flex items-center">
//                 <div className={`w-5 h-5 rounded-full ml-3 ${
//                   apiMessage.type === "success" ? "bg-green-500" : "bg-red-500"
//                 }`}>
//                   <div className="w-full h-full rounded-full bg-white animate-ping opacity-75"></div>
//                 </div>
//                 <p className="text-sm font-medium">{apiMessage.text}</p>
//               </div>
//             </div>
//           )}

//           {/* Profile Card */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            
//             <div className="px-6 sm:px-8 py-8 -mt-12 relative">
//               {/* Avatar */}
//               <div className="flex justify-center mb-6">
//                 <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">
//                       {userName ? userName.charAt(0) : "ط"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Fields */}
//               <div className="space-y-8">
//                 <ProfileField
//                   label="الاسم الكامل"
//                   field="name"
//                   value={userName}
//                   placeholder="أدخل الاسم الكامل"
//                   color="blue"
//                 />
//                 <ProfileField
//                   label="كلمة المرور"
//                   field="password"
//                   value={userData.password}
//                   type="password"
//                   placeholder="كلمة المرور الجديدة"
//                   color="purple"
//                 />
//                 <ProfileField
//                   label="البريد الإلكتروني"
//                   field="email"
//                   value={studentData?.email || userData.email}
//                   type="email"
//                   placeholder="البريد الإلكتروني"
//                   color="green"
//                 />
//                 <ProfileField
//                   label="رقم واتساب"
//                   field="whatsUpNumber"
//                   value={userData.whatsUpNumber}
//                   type="tel"
//                   placeholder="أدخل رقم واتساب"
//                   color="green"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-gray-500 text-sm">
//               آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashStudent>
//   )
// }

// export default StudentProfilePage











// "use client"

// import Cookies from "js-cookie"
// import axios from "axios"
// import { useState, useEffect, useCallback, memo } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"
// import { useRouter } from "next/navigation"
// import { changeGlobalName } from "@/features/auth/authSlice"

// const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// interface Student {
//   id: string
//   firstName: string
//   lastName: string
//   createdAt: string
//   email: string
//   whatsUpNumber: string
// }

// interface ApiRequest {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: Student[]
// }

// interface UpdateStudentRequest {
//   firstName: string
//   lastName: string
//   email: string
//   whatsUpNumber: string
// }

// type EditModeFields = "name" | "password" | "email" | "whatsUpNumber"

// // Move ProfileField component outside to prevent recreation on each render
// const ProfileField = memo(({
//   label,
//   field,
//   value,
//   type = "text",
//   placeholder,
//   color = "blue",
//   editMode,
//   tempValues,
//   loading,
//   onEdit,
//   onSave,
//   onCancel,
//   onTempValueChange
// }: {
//   label: string
//   field: EditModeFields
//   value: string
//   type?: string
//   placeholder: string
//   color?: string
//   editMode: boolean
//   tempValues: any
//   loading: boolean
//   onEdit: (field: EditModeFields) => void
//   onSave: (field: EditModeFields) => void
//   onCancel: (field: EditModeFields) => void
//   onTempValueChange: (field: string, value: string) => void
// }) => {
//   const colorClasses = {
//     blue: {
//       button: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
//       text: "text-blue-600 hover:text-blue-700",
//       input: "focus:ring-blue-500 focus:border-blue-500"
//     },
//     purple: {
//       button: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500",
//       text: "text-purple-600 hover:text-purple-700",
//       input: "focus:ring-purple-500 focus:border-purple-500"
//     },
//     green: {
//       button: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
//       text: "text-green-600 hover:text-green-700",
//       input: "focus:ring-green-500 focus:border-green-500"
//     }
//   }

//   const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

//   return (
//     <div className="group relative">
//       <div className="flex flex-col space-y-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
//           {!editMode && (
//             <button
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${colors.text} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.input.split(' ')[0]}`}
//               onClick={() => onEdit(field)}
//               type="button"
//             >
//               {value === "لا يوجد" && field === "whatsUpNumber" ? "إضافة" : "تعديل"}
//             </button>
//           )}
//         </div>

//         {editMode ? (
//           <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
//             {field === "name" ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <h3 className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</h3>
//                   <input
//                     key={`${field}-firstName`}
//                     value={tempValues.firstName || ''}
//                     onChange={(e) => onTempValueChange('firstName', e.target.value)}
//                     placeholder="الاسم الأول"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     dir="rtl"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="block text-sm font-medium text-gray-700 mb-1">اسم العائلة</h3>
//                   <input
//                     key={`${field}-lastName`}
//                     value={tempValues.lastName || ''}
//                     onChange={(e) => onTempValueChange('lastName', e.target.value)}
//                     placeholder="اسم العائلة"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     dir="rtl"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <input
//                 key={field}
//                 type={type}
//                 value={tempValues[field as keyof typeof tempValues] || ''}
//                 onChange={(e) => onTempValueChange(field, e.target.value)}
//                 placeholder={placeholder}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             )}

//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 className={`flex-1 ${colors.button} text-white px-6 py-3 rounded-lg text-sm font-medium focus:outline-none shadow-sm hover:shadow-md`}
//                 onClick={() => onSave(field)}
//                 type="button"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
//                     جاري الحفظ...
//                   </div>
//                 ) : (
//                   "حفظ"
//                 )}
//               </button>
//               <button
//                 className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={() => onCancel(field)}
//                 type="button"
//                 disabled={loading}
//               >
//                 إلغاء
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
//             <p className="text-gray-700 text-sm break-all text-right" dir="rtl">
//               {value || "غير محدد"}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// })

// ProfileField.displayName = 'ProfileField'

// const StudentProfilePage = () => {
//   const [userName, setUserName] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
//   const [studentData, setStudentData] = useState<Student | null>({
//     id: "",
//     firstName: "",
//     lastName: "",
//     createdAt: "",
//     email: "example@gmail.com",
//     whatsUpNumber: "لا يوجد",
//   })
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     password: "••••••••",
//     email: "",
//     whatsUpNumber: "لا يوجد",
//   })

//   const router = useRouter()
//   const dispatch = useDispatch()
//   const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
//   const globalPassword = useSelector(
//     (state: { background: { globalPassword: string } }) => state.background.globalPassword,
//   )
//   const globalWhatsUpPhone = useSelector(
//     (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
//   )

//   const [editMode, setEditMode] = useState({
//     name: false,
//     password: false,
//     email: false,
//     whatsUpNumber: false,
//   })

//   const [tempValues, setTempValues] = useState({
//     firstName: "",
//     lastName: "",
//     password: "",
//     email: "",
//     whatsUpNumber: "",
//   })

//   // Memoize the temp value change handler
//   const handleTempValueChange = useCallback((field: string, value: string) => {
//     setTempValues(prev => ({ ...prev, [field]: value }))
//   }, [])

//   const handleEdit = useCallback((field: EditModeFields) => {
//     if (field === "name") {
//       const [first, ...rest] = userName.split(" ")
//       setTempValues(prev => ({
//         ...prev,
//         firstName: first || "",
//         lastName: rest.join(" ") || "",
//       }))
//     } else if (field === "whatsUpNumber") {
//       setTempValues(prev => ({ ...prev, whatsUpNumber: globalWhatsUpPhone || userData.whatsUpNumber }))
//     } else if (field === "email") {
//       setTempValues(prev => ({ ...prev, email: studentData?.email || globalEmail || userData.email }))
//     } else if (field === "password") {
//       setTempValues(prev => ({ ...prev, password: "" }))
//     }
//     setEditMode(prev => ({ ...prev, [field]: true }))
//   }, [userName, globalWhatsUpPhone, userData.whatsUpNumber, studentData?.email, globalEmail, userData.email])


//   const getInfoStudentProfile = async (): Promise<void> => {
//     const token = Cookies.get("accessToken") || ""
    
//     try {
//       const response = await axios.get(`${API_URL}/api/Student/GetStudent`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
      
//       console.log("info data =====", response.data.data)
//       console.log("info data length =====", response.data.data.length)
      
//       if (response.data.data) {
//         const student = response.data.data
//         setStudentData(response.data.data)
//         console.log("studentData +++=", studentData)
        
//         setUserData(prev => ({
//           ...prev,
//           firstName: student.firstName,
//           lastName: student.lastName,
//           email: student.email,
//           whatsUpNumber: student.whatsUpNumber || "لا يوجد",
//         }))
        
//         const fullName = `${student.firstName} ${student.lastName}`.trim()
//         setUserName(fullName)
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return getInfoStudentProfile()
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return getInfoStudentProfile()
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/login")
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
//     }
//   }

//   const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse | undefined> => {
//     const token = Cookies.get("accessToken") || ""
//     setLoading(true)
    
//     try {
//       const response = await axios.put(`${API_URL}/api/Student/Update`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       console.log("student update +++++", response.data)
//       if(response.data){ 
//         if(data.email === "email"){
//           setStudentData(prev => ({
//             ...prev,
//             whatsUpNumber: prev ? prev.whatsUpNumber : "",
//             email: response.data.email,
//             id: prev ? prev.id : "",
//             firstName: prev ? prev.firstName : "",
//             lastName: prev ? prev.lastName : "",
//             createdAt: prev ? prev.createdAt : ""
//           }))
//         } else if (data.whatsUpNumber === "whatsUpNumber") {
//           setStudentData(prev => ({
//             ...prev,
//             whatsUpNumber: response.data.whatsUpNumber,
//             email: prev ? prev.email : "",
//             id: prev ? prev.id : "",
//             firstName: prev ? prev.firstName : "",
//             lastName: prev ? prev.lastName : "",
//             createdAt: prev ? prev.createdAt : ""
//           }))
//         }
        
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//       const refreshSuccess = await refreshAuthToken()
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           switch (error.response.status) {
//             case 401:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "Authentication expired. Please log in again."
//               router.push("/login")
//               break
//             case 403:
//               if (refreshSuccess) {
//                 return updateStudentProfile(data)
//               }
//               errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//               router.push("/login")
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
//       setApiMessage({ type: "error", text: errorMessage })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSave = useCallback(async (field: EditModeFields) => {
//     setLoading(true)
//     setApiMessage(null)
    
//     try {
//       if (field === "name") {
//         const fullName = `${tempValues.firstName} ${tempValues.lastName}`.trim()
//         const updateData: UpdateStudentRequest = {
//           firstName: tempValues.firstName,
//           lastName: tempValues.lastName,
//           email: tempValues.email,
//           whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response?.succeeded) {
//           localStorage.setItem("userName", fullName)
//           setUserName(fullName)
//           dispatch(changeGlobalName(fullName))
//           setUserData(prev => ({
//             ...prev,
//             firstName: tempValues.firstName,
//             lastName: tempValues.lastName
//           }))
//           setApiMessage({ type: "success", text: "تم تحديث الاسم بنجاح" })
//         }
//       } else if (field === "whatsUpNumber") {
//         const updateData: UpdateStudentRequest = {
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: userData.email,
//           whatsUpNumber: tempValues.whatsUpNumber,
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if (response?.succeeded) {
//           setTempValues(prev => ({ ...prev, whatsUpNumber: tempValues.whatsUpNumber }))
//           setApiMessage({ type: "success", text: "تم تحديث رقم واتساب بنجاح" })
//         }
//       } else if (field === "email") {
//         const updateData: UpdateStudentRequest = {
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
//           email: tempValues.email
//         }
        
//         const response = await updateStudentProfile(updateData)
//         if(response?.succeeded){
//           setTempValues(prev => ({ ...prev, email: tempValues.email }))
//           setApiMessage({ type: "success", text: "تم تحديث البريد الإلكتروني بنجاح" })
//         }
//       }
      
//       setEditMode(prev => ({ ...prev, [field]: false }))
//     } catch (error) {
//       console.error("Error saving:", error)
//       setApiMessage({ type: "error", text: "حدث خطأ أثناء الحفظ" })
//     } finally {
//       setLoading(false)
//     }
//   }, [tempValues, userData, dispatch])

//   const handleCancel = useCallback((field: EditModeFields) => {
//     setEditMode(prev => ({ ...prev, [field]: false }))
//     setApiMessage(null)
//   }, [])

//   useEffect(() => {
//     const fullName = localStorage.getItem("userName") || ""
//     setUserName(fullName)
//     const [firstName, ...lastNameParts] = fullName.split(" ")
//     setUserData(prev => ({
//       ...prev,
//       firstName: firstName || "",
//       lastName: lastNameParts.join(" ") || "",
//     }))
//   }, [])

//   useEffect(() => {
//     if (apiMessage) {
//       const timer = setTimeout(() => {
//         setApiMessage(null)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [apiMessage])

//   useEffect(() => {
//     getInfoStudentProfile()
//   }, [])

//   return (
//     <DashStudent>
//       <div className="min-h-[90vh] py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
//         <div className="max-w-2xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">الملف الشخصي</h1>
//             <p className="text-gray-600">إدارة معلوماتك الشخصية</p>
//           </div>

//           {/* Alert Message */}
//           {apiMessage && (
//             <div className={`mb-6 p-4 rounded-lg border animate-in slide-in-from-top-2 duration-300 ${
//               apiMessage.type === "success"
//                 ? "bg-green-50 border-green-200 text-green-800"
//                 : "bg-red-50 border-red-200 text-red-800"
//             }`}>
//               <div className="flex items-center">
//                 <div className={`w-5 h-5 rounded-full ml-3 ${
//                   apiMessage.type === "success" ? "bg-green-500" : "bg-red-500"
//                 }`}>
//                   <div className="w-full h-full rounded-full bg-white animate-ping opacity-75"></div>
//                 </div>
//                 <p className="text-sm font-medium">{apiMessage.text}</p>
//               </div>
//             </div>
//           )}

//           {/* Profile Card */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            
//             <div className="px-6 sm:px-8 py-8 -mt-12 relative">
//               {/* Avatar */}
//               <div className="flex justify-center mb-6">
//                 <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xl font-bold">
//                       {userName ? userName.charAt(0) : "ط"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Profile Fields */}
//               <div className="space-y-8">
//                 <ProfileField
//                   label="الاسم الكامل"
//                   field="name"
//                   value={userName}
//                   placeholder="أدخل الاسم الكامل"
//                   color="blue"
//                   editMode={editMode.name}
//                   tempValues={tempValues}
//                   loading={loading}
//                   onEdit={handleEdit}
//                   onSave={handleSave}
//                   onCancel={handleCancel}
//                   onTempValueChange={handleTempValueChange}
//                 />
//                 {/* <ProfileField
//                   label="كلمة المرور"
//                   field="password"
//                   value={userData.password}
//                   type="password"
//                   placeholder="كلمة المرور الجديدة"
//                   color="purple"
//                   editMode={editMode.password}
//                   tempValues={tempValues}
//                   loading={loading}
//                   onEdit={handleEdit}
//                   onSave={handleSave}
//                   onCancel={handleCancel}
//                   onTempValueChange={handleTempValueChange}
//                 /> */}
//                 <ProfileField
//                   label="البريد الإلكتروني"
//                   field="email"
//                   value={studentData?.email || userData.email}
//                   type="email"
//                   placeholder="البريد الإلكتروني"
//                   color="green"
//                   editMode={editMode.email}
//                   tempValues={tempValues}
//                   loading={loading}
//                   onEdit={handleEdit}
//                   onSave={handleSave}
//                   onCancel={handleCancel}
//                   onTempValueChange={handleTempValueChange}
//                 />
//                 <ProfileField
//                   label="رقم واتساب"
//                   field="whatsUpNumber"
//                   value={globalWhatsUpPhone || userData.whatsUpNumber}
//                   type="tel"
//                   placeholder="أدخل رقم واتساب"
//                   color="green"
//                   editMode={editMode.whatsUpNumber}
//                   tempValues={tempValues}
//                   loading={loading}
//                   onEdit={handleEdit}
//                   onSave={handleSave}
//                   onCancel={handleCancel}
//                   onTempValueChange={handleTempValueChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-gray-500 text-sm">
//               آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashStudent>
//   )
// }

// export default StudentProfilePage
















"use client"

import Cookies from "js-cookie"
import axios from "axios"
import { useState, useEffect, useCallback, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import { useRouter } from "next/navigation"
import { changeGlobalName } from "@/features/auth/authSlice"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: string
}

interface Student {
  id: string
  firstName: string
  lastName: string
  createdAt: string
  email: string
  whatsUpNumber: string
}

interface ApiRequest {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: Student[]
}

interface UpdateStudentRequest {
  firstName: string
  lastName: string
  email: string
  whatsUpNumber: string
}

type EditModeFields = "name" | "password" | "email" | "whatsUpNumber"

// Move ProfileField component outside to prevent recreation on each render
const ProfileField = memo(
  ({
    label,
    field,
    value,
    type = "text",
    placeholder,
    color = "blue",
    editMode,
    tempValues,
    loading,
    onEdit,
    onSave,
    onCancel,
    onTempValueChange,
  }: {
    label: string
    field: EditModeFields
    value: string
    type?: string
    placeholder: string
    color?: string
    editMode: boolean
    tempValues: any
    loading: boolean
    onEdit: (field: EditModeFields) => void
    onSave: (field: EditModeFields) => void
    onCancel: (field: EditModeFields) => void
    onTempValueChange: (field: string, value: string) => void
  }) => {
    const colorClasses = {
      blue: {
        button: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
        text: "text-blue-600 hover:text-blue-700",
        input: "focus:ring-blue-500 focus:border-blue-500",
      },
      purple: {
        button: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-500",
        text: "text-purple-600 hover:text-purple-700",
        input: "focus:ring-purple-500 focus:border-purple-500",
      },
      green: {
        button: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
        text: "text-green-600 hover:text-green-700",
        input: "focus:ring-green-500 focus:border-green-500",
      },
    }

    const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

    return (
      <div className="group relative">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
            {!editMode && (
              
              <button
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${colors.text} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.input.split(" ")[0]}`}
                onClick={() => onEdit(field)}
                type="button"
              >
                {value === "لا يوجد" && field === "whatsUpNumber" ? "إضافة" : field === "email" ? "" : "تعديل"}
                 
              </button>
            
            )}
          </div>

          {editMode ? (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {field === "name" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h3 className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</h3>
                    <input
                      key={`${field}-firstName`}
                      value={tempValues.firstName || ""}
                      onChange={(e) => onTempValueChange("firstName", e.target.value)}
                      placeholder="الاسم الأول"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <h3 className="block text-sm font-medium text-gray-700 mb-1">اسم العائلة</h3>
                    <input
                      key={`${field}-lastName`}
                      value={tempValues.lastName || ""}
                      onChange={(e) => onTempValueChange("lastName", e.target.value)}
                      placeholder="اسم العائلة"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      dir="rtl"
                    />
                  </div>
                </div>
              ) : (
                <input
                  key={field}
                  type={type}
                  value={tempValues[field as keyof typeof tempValues] || ""}
                  onChange={(e) => onTempValueChange(field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              )}
               
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className={`flex-1 ${colors.button} text-white px-6 py-3 rounded-lg text-sm font-medium focus:outline-none shadow-sm hover:shadow-md`}
                  onClick={() => onSave(field)}
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الحفظ...
                    </div>
                  ) : (
                    "حفظ"
                  )}
                </button>
                <button
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => onCancel(field)}
                  type="button"
                  disabled={loading}
                >
                  إلغاء
                </button> 
              </div>
             
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <p className="text-gray-700 text-sm break-all text-right" dir="rtl">
                {value || "غير محدد"}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  },
)

ProfileField.displayName = "ProfileField"

const StudentProfilePage = () => {
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [studentData, setStudentData] = useState<Student | null>({
    id: "",
    firstName: "",
    lastName: "",
    createdAt: "",
    email: "example@gmail.com",
    whatsUpNumber: "لا يوجد",
  })
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    password: "••••••••",
    email: "",
    whatsUpNumber: "لا يوجد",
  })

  const router = useRouter()
  const dispatch = useDispatch()
  const globalEmail = useSelector((state: { background: { globalEmail: string } }) => state.background.globalEmail)
  const globalPassword = useSelector(
    (state: { background: { globalPassword: string } }) => state.background.globalPassword,
  )
  const globalWhatsUpPhone = useSelector(
    (state: { background: { globalWhatsUpPhone: string } }) => state.background.globalWhatsUpPhone,
  )

  const [editMode, setEditMode] = useState({
    name: false,
    password: false,
    email: false,
    whatsUpNumber: false,
  })

  const [tempValues, setTempValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    whatsUpNumber: "",
  })

  // Memoize the temp value change handler
  const handleTempValueChange = useCallback((field: string, value: string) => {
    setTempValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleEdit = useCallback(
    (field: EditModeFields) => {
      if (field === "name") {
        const [first, ...rest] = userName.split(" ")
        setTempValues((prev) => ({
          ...prev,
          firstName: first || "",
          lastName: rest.join(" ") || "",
        }))
      } else if (field === "whatsUpNumber") {
        setTempValues((prev) => ({ ...prev, whatsUpNumber: globalWhatsUpPhone || userData.whatsUpNumber }))
      } else if (field === "email") {
        setTempValues((prev) => ({ ...prev, email: studentData?.email || globalEmail || userData.email }))
      } else if (field === "password") {
        setTempValues((prev) => ({ ...prev, password: "" }))
      }
      setEditMode((prev) => ({ ...prev, [field]: true }))
    },
    [userName, globalWhatsUpPhone, userData.whatsUpNumber, studentData?.email, globalEmail, userData.email],
  )

  const getInfoStudentProfile = async (): Promise<void> => {
    const token = Cookies.get("accessToken") || ""

    try {
      const response = await axios.get(`${API_URL}/api/Student/GetStudent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("info data =====", response.data.data)
      console.log("info data length =====", response.data.data.length)

      if (response.data.data) {
        const student = response.data.data
        setStudentData(response.data.data)
        console.log("studentData +++=", studentData)

        setUserData((prev) => ({
          ...prev,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          whatsUpNumber: student.whatsUpNumber || "لا يوجد",
        }))

        const fullName = `${student.firstName} ${student.lastName}`.trim()
        setUserName(fullName)
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return getInfoStudentProfile()
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/login")
              break
            case 403:
              if (refreshSuccess) {
                return getInfoStudentProfile()
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
    }
  }

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    setApiMessage(null)

    try {
      await getInfoStudentProfile()
      setApiMessage({ type: "success", text: "تم تحديث البيانات بنجاح" })
    } catch (error) {
      setApiMessage({ type: "error", text: "حدث خطأ أثناء تحديث البيانات" })
    } finally {
      setRefreshing(false)
    }
  }, [])

  const updateStudentProfile = async (data: UpdateStudentRequest): Promise<ApiResponse | undefined> => {
    const token = Cookies.get("accessToken") || ""
    setLoading(true)

    try {
      const response = await axios.put(`${API_URL}/api/Student/Update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log("student update +++++", response.data)
      if (response.data) {
        if (data.email === "email") {
          setStudentData((prev) => ({
            ...prev,
            whatsUpNumber: prev ? prev.whatsUpNumber : "",
            email: response.data.email,
            id: prev ? prev.id : "",
            firstName: prev ? prev.firstName : "",
            lastName: prev ? prev.lastName : "",
            createdAt: prev ? prev.createdAt : "",
          }))
        } else if (data.whatsUpNumber === "whatsUpNumber") {
          setStudentData((prev) => ({
            ...prev,
            whatsUpNumber: response.data.whatsUpNumber,
            email: prev ? prev.email : "",
            id: prev ? prev.id : "",
            firstName: prev ? prev.firstName : "",
            lastName: prev ? prev.lastName : "",
            createdAt: prev ? prev.createdAt : "",
          }))
        }
      }
    } catch (error) {
      let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              if (refreshSuccess) {
                return updateStudentProfile(data)
              }
              errorMessage = "Authentication expired. Please log in again."
              router.push("/login")
              break
            case 403:
              if (refreshSuccess) {
                return updateStudentProfile(data)
              }
              errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
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
      setApiMessage({ type: "error", text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = useCallback(
    async (field: EditModeFields) => {
      setLoading(true)
      setApiMessage(null)

      try {
        if (field === "name") {
          const fullName = `${tempValues.firstName} ${tempValues.lastName}`.trim()
          const updateData: UpdateStudentRequest = {
            firstName: tempValues.firstName,
            lastName: tempValues.lastName,
            email: tempValues.email,
            whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
          }

          const response = await updateStudentProfile(updateData)
          if (response?.succeeded) {
            localStorage.setItem("userName", fullName)
            setUserName(fullName)
            dispatch(changeGlobalName(fullName))
            setUserData((prev) => ({
              ...prev,
              firstName: tempValues.firstName,
              lastName: tempValues.lastName,
            }))
            setApiMessage({ type: "success", text: "تم تحديث الاسم بنجاح" })
          }
        } else if (field === "whatsUpNumber") {
          const updateData: UpdateStudentRequest = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            whatsUpNumber: tempValues.whatsUpNumber,
          }

          const response = await updateStudentProfile(updateData)
          if (response?.succeeded) {
            setTempValues((prev) => ({ ...prev, whatsUpNumber: tempValues.whatsUpNumber }))
            setApiMessage({ type: "success", text: "تم تحديث رقم واتساب بنجاح" })
          }
        } else if (field === "email") {
          const updateData: UpdateStudentRequest = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            whatsUpNumber: userData.whatsUpNumber !== "لا يوجد" ? userData.whatsUpNumber : "",
            email: tempValues.email,
          }

          const response = await updateStudentProfile(updateData)
          if (response?.succeeded) {
            setTempValues((prev) => ({ ...prev, email: tempValues.email }))
            setApiMessage({ type: "success", text: "تم تحديث البريد الإلكتروني بنجاح" })
          }
        }

        setEditMode((prev) => ({ ...prev, [field]: false }))
      } catch (error) {
        console.error("Error saving:", error)
        setApiMessage({ type: "error", text: "حدث خطأ أثناء الحفظ" })
      } finally {
        setLoading(false)
      }
    },
    [tempValues, userData, dispatch],
  )

  const handleCancel = useCallback((field: EditModeFields) => {
    setEditMode((prev) => ({ ...prev, [field]: false }))
    setApiMessage(null)
  }, [])

  useEffect(() => {
    const fullName = localStorage.getItem("userName") || ""
    setUserName(fullName)
    const [firstName, ...lastNameParts] = fullName.split(" ")
    setUserData((prev) => ({
      ...prev,
      firstName: firstName || "",
      lastName: lastNameParts.join(" ") || "",
    }))
  }, [])

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => {
        setApiMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [apiMessage])

  useEffect(() => {
    getInfoStudentProfile()
  }, [])

  return (
    <DashStudent>
      <div className="min-h-[90vh] py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
              {/* <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                type="button">
                <svg
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {refreshing ? "جاري التحديث..." : "اعادة التحديث"}
              </button> */}
            </div>
            <p className="text-gray-600">إدارة معلوماتك الشخصية</p>
          </div>

          {/* Alert Message */}
          {apiMessage && (
            <div
              className={`mb-6 p-4 rounded-lg border animate-in slide-in-from-top-2 duration-300 ${
                apiMessage.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full ml-3 ${
                    apiMessage.type === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div className="w-full h-full rounded-full bg-white animate-ping opacity-75"></div>
                </div>
                <p className="text-sm font-medium">{apiMessage.text}</p>
              </div>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>

            <div className="px-6 sm:px-8 py-8 -mt-12 relative">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{userName ? userName.charAt(0) : "ط"}</span>
                  </div>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="space-y-8">
                <ProfileField
                  label="الاسم الكامل"
                  field="name"
                  value={userName}
                  placeholder="أدخل الاسم الكامل"
                  color="blue"
                  editMode={editMode.name}
                  tempValues={tempValues}
                  loading={loading}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onTempValueChange={handleTempValueChange}
                />
                <ProfileField
                  label="البريد الإلكتروني"
                  field="email"
                  value={studentData?.email || userData.email}
                  type="email"
                  placeholder="البريد الإلكتروني"
                  color="green"
                  editMode={editMode.email}
                  tempValues={tempValues}
                  loading={loading}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onTempValueChange={handleTempValueChange}
                />
                <ProfileField
                  label="رقم واتساب"
                  field="whatsUpNumber"
                  value={globalWhatsUpPhone || userData.whatsUpNumber}
                  type="tel"
                  placeholder="أدخل رقم واتساب"
                  color="green"
                  editMode={editMode.whatsUpNumber}
                  tempValues={tempValues}
                  loading={loading}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onTempValueChange={handleTempValueChange}
                />
              </div>
            </div>
          </div>


          <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="flex justify-center mx-auto mt-8 items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg text-sm  md:text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                type="button">
                <svg
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {refreshing ? "جاري التحديث..." : "اعادة التحديث"}
              </button>


          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">آخر تحديث: {new Date().toLocaleDateString("ar-SA")}</p>
          </div>
        </div>
      </div>
    </DashStudent>
  )
}

export default StudentProfilePage
