// "use client"

// import type React from "react"
// import Link from "next/link"

// import { useState } from "react"
// import { z } from "zod"

// // Zod validation schema
// const trainerPartnershipSchema = z.object({
//   firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن يكون حرفين على الأقل"),
//   lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   specialization: z.string().min(1, "التخصص مطلوب"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type TrainerPartnershipFormData = z.infer<typeof trainerPartnershipSchema>

// const countryCodes = [
//   { code: "+966", country: "السعودية", flag: "🇸🇦" },
//   { code: "+971", country: "الإمارات", flag: "🇦🇪" },
//   { code: "+965", country: "الكويت", flag: "🇰🇼" },
//   { code: "+973", country: "البحرين", flag: "🇧🇭" },
//   { code: "+974", country: "قطر", flag: "🇶🇦" },
//   { code: "+968", country: "عمان", flag: "🇴🇲" },
// ]

// const specializations = [
//   "القسم الكمي ",
//   "القسم اللفظي",
//   "القسم الكمي و اللفظي",
// ]

// export default function TrainerPartnershipForm() {
//   const [formData, setFormData] = useState<Partial<TrainerPartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof TrainerPartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleInputChange = (field: keyof TrainerPartnershipFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const validatedData = trainerPartnershipSchema.parse(formData)
//       console.log("Form submitted successfully:", validatedData)
//       // Handle successful submission here
//       alert("تم إرسال النموذج بنجاح!")
//       setErrors({})
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof TrainerPartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof TrainerPartnershipFormData] = err.message
//           }
//         })
//         setErrors(newErrors)
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-12 h-12  rounded-lg mb-4">
//               {/* <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
//               </svg> */}
//               <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-600" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true"><path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدربين</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   اسم العائلة <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.lastName || ""}
//                   onChange={(e) => handleInputChange("lastName", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
//                     errors.lastName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل اسم العائلة"
//                 />
//                 {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
//               </div>

//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   الاسم الأول <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.firstName || ""}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
//                     errors.firstName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل الاسم الأول"
//                 />
//                 {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </h3>
//               <div className="flex flex-row-reverse gap-2">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[130px] transition-colors"
//                 >
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
//                     errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-1 text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* Specialization */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 التخصصات <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.specialization || ""}
//                 onChange={(e) => handleInputChange("specialization", e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-colors ${
//                   errors.specialization ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر تخصصك</option>
//                 {specializations.map((spec) => (
//                   <option key={spec} value={spec}>
//                     {spec}
//                   </option>
//                 ))}
//               </select>
//               {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
//                   className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
//                   لضمان تحويل المعلومات، يجب أن يكون اسمك
//                   <br />
//                   مطابقاً للاسم في الهوية
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <a href="#" className="text-purple-600 hover:text-purple-800 underline transition-colors">
//                     شروط وأحكام برنامج الشراكات
//                   </a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit Button */}
//             <Link href="/dashboard/dashTeacher">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   جاري الإرسال...
//                 </div>
//               ) : (
//                 "إرسال"
//               )}
//             </button>
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }












// "use client"

// import type React from "react"
// import { useState } from "react"
// import axios from "axios"
// import { z } from "zod"

// // Zod validation schema
// const trainerPartnershipSchema = z.object({
//   firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن يكون حرفين على الأقل"),
//   lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   specialization: z.string().min(1, "التخصص مطلوب"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type TrainerPartnershipFormData = z.infer<typeof trainerPartnershipSchema>

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const countryCodes = [
//   { code: "+966", country: "السعودية", flag: "🇸🇦" },
//   { code: "+971", country: "الإمارات", flag: "🇦🇪" },
//   { code: "+965", country: "الكويت", flag: "🇰🇼" },
//   { code: "+973", country: "البحرين", flag: "🇧🇭" },
//   { code: "+974", country: "قطر", flag: "🇶🇦" },
//   { code: "+968", country: "عمان", flag: "🇴🇲" },
// ]

// const specializations = [
//   { label: "القسم الكمي", value: 0 },
//   { label: "القسم اللفظي", value: 1 },
//   { label: "القسم الكمي و اللفظي", value: 2 },
// ]

// export default function TeacherPartnershipForm() {
//   const [formData, setFormData] = useState<Partial<TrainerPartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof TrainerPartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

//   const handleInputChange = (field: keyof TrainerPartnershipFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//     // Clear submit message when user makes changes
//     if (submitMessage) {
//       setSubmitMessage(null)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setSubmitMessage(null)

//     try {
//       const validatedData = trainerPartnershipSchema.parse(formData)

//       // Prepare API request data
//       const apiData = {
//         firstName: validatedData.firstName,
//         lastName: validatedData.lastName,
//         password: validatedData.password,
//         whatsUpNumber: validatedData.countryCode + validatedData.phoneNumber,
//         email: validatedData.email,
//         specialty: Number.parseInt(validatedData.specialization),
//       }

//       const response = await axios.post(`${BASE_URL}/api/JoiningRequest/TeacherJoiningRequest`, apiData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )

//       const result = response.data

//       if (result.succeeded) {
//         setSubmitMessage({ type: "success", message: result.message || "تم إرسال النموذج بنجاح!" })
//         // Reset form on success
//         setFormData({
//           countryCode: "+966",
//           agreeToTerms: false,
//         })
//         setErrors({})
//       } else {
//         setSubmitMessage({
//           type: "error",
//           message: result.message || "حدث خطأ أثناء إرسال النموذج",
//         })

//         // Handle field-specific errors if provided
//         if (result.errors && Array.isArray(result.errors)) {
//           console.error("API Errors:", result.errors)
//         }
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof TrainerPartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof TrainerPartnershipFormData] = err.message
//           }
//         })
//         setErrors(newErrors)
//       } else {
//         console.error("Submission error:", error)
//         setSubmitMessage({
//           type: "error",
//           message: "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
//         })
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
//           {/* Header */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-purple-600 w-8 h-8"
//                 fill="currentColor"
//                 viewBox="0 0 640 512"
//                 aria-hidden="true"
//               >
//                 <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
//               </svg>
//             </div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدربين</h1>
//           </div>

//           {/* Submit Message */}
//           {submitMessage && (
//             <div
//               className={`mb-6 p-4 rounded-lg ${
//                 submitMessage.type === "success"
//                   ? "bg-green-50 border border-green-200 text-green-800"
//                   : "bg-red-50 border border-red-200 text-red-800"
//               }`}
//             >
//               <p className="text-sm font-medium">{submitMessage.message}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   اسم العائلة <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.lastName || ""}
//                   onChange={(e) => handleInputChange("lastName", e.target.value)}
//                   className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base ${
//                     errors.lastName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل اسم العائلة"
//                 />
//                 {errors.lastName && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastName}</p>}
//               </div>
//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   الاسم الأول <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.firstName || ""}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base ${
//                     errors.firstName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل الاسم الأول"
//                 />
//                 {errors.firstName && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstName}</p>}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//               />
//               {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
//             </div>

//             {/* Password */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 كلمة المرور <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="password"
//                 value={formData.password || ""}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل كلمة المرور"
//               />
//               {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </h3>
//               <div className="flex flex-col sm:flex-row-reverse gap-2">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white w-full sm:min-w-[130px] sm:w-auto transition-colors text-sm sm:text-base"
//                 >
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm sm:text-base ${
//                     errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* Specialization */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 التخصصات <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.specialization || ""}
//                 onChange={(e) => handleInputChange("specialization", e.target.value)}
//                 className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-colors text-sm sm:text-base ${
//                   errors.specialization ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر تخصصك</option>
//                 {specializations.map((spec) => (
//                   <option key={spec.value} value={spec.value.toString()}>
//                     {spec.label}
//                   </option>
//                 ))}
//               </select>
//               {errors.specialization && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.specialization}</p>}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
//                   className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 flex-shrink-0"
//                 />
//                 <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 leading-relaxed">
//                   لضمان تحويل المعلومات، يجب أن يكون اسمك
//                   <br />
//                   مطابقاً للاسم في الهوية
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <a href="/" className="text-purple-600 hover:text-purple-800 underline transition-colors">
//                     شروط وأحكام برنامج الشراكات
//                   </a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-2 text-xs sm:text-sm text-red-600">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-base sm:text-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   جاري الإرسال...
//                 </div>
//               ) : (
//                 "إرسال"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }











// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import axios from "axios"
// import { z } from "zod"

// // Zod validation schema
// const trainerPartnershipSchema = z.object({
//   firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن يكون حرفين على الأقل"),
//   lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   specialization: z.string().min(1, "التخصص مطلوب"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type TrainerPartnershipFormData = z.infer<typeof trainerPartnershipSchema>

// interface TeacherSpecialty {
//   id: number
//   value: string
// }

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: TeacherSpecialty[]
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// const countryCodes = [
//   { code: "+966", country: "السعودية", flag: "🇸🇦" },
//   { code: "+971", country: "الإمارات", flag: "🇦🇪" },
//   { code: "+965", country: "الكويت", flag: "🇰🇼" },
//   { code: "+973", country: "البحرين", flag: "🇧🇭" },
//   { code: "+974", country: "قطر", flag: "🇶🇦" },
//   { code: "+968", country: "عمان", flag: "🇴🇲" },
// ]

// // Fallback specializations in case API fails
// const fallbackSpecializations: TeacherSpecialty[] = [
//   { id: 0, value: "القسم الكمي" },
//   { id: 1, value: "القسم اللفظي" },
//   { id: 2, value: "القسم الكمي و اللفظي" },
// ]

// export default function TeacherPartnershipForm() {
//   const [formData, setFormData] = useState<Partial<TrainerPartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof TrainerPartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  
//   // New state for dynamic specializations
//   const [specializations, setSpecializations] = useState<TeacherSpecialty[]>([])
//   const [isLoadingSpecializations, setIsLoadingSpecializations] = useState(true)
//   const [specializationError, setSpecializationError] = useState<string | null>(null)

//   // Fetch specializations on component mount
//   useEffect(() => {
//     const fetchSpecializations = async () => {
//       try {
//         setIsLoadingSpecializations(true)
//         setSpecializationError(null)
        
//         const response = await axios.get<ApiResponse>(`${BASE_URL}/api/TeacherSpecialty/GetAllTeacherSpecialties`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })

//         if (response.data.succeeded && response.data.data) {
//           setSpecializations(response.data.data)
//         } else {
//           throw new Error(response.data.message || "فشل في جلب التخصصات")
//         }
//       } catch (error) {
//         console.error("Error fetching specializations:", error)
//         setSpecializationError("فشل في تحميل التخصصات، سيتم استخدام القائمة الافتراضية")
//         // Use fallback specializations
//         setSpecializations(fallbackSpecializations)
//       } finally {
//         setIsLoadingSpecializations(false)
//       }
//     }

//     fetchSpecializations()
//   }, [])

//   const handleInputChange = (field: keyof TrainerPartnershipFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//     // Clear submit message when user makes changes
//     if (submitMessage) {
//       setSubmitMessage(null)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setSubmitMessage(null)

//     try {
//       const validatedData = trainerPartnershipSchema.parse(formData)

//       // Prepare API request data
//       const teacherJoining = {
//         firstName: validatedData.firstName,
//         lastName: validatedData.lastName,
//         password: validatedData.password,
//         whatsUpNumber: validatedData.countryCode + validatedData.phoneNumber,
//         email: validatedData.email,
//         specialtyId: Number.parseInt(validatedData.specialization),
//       }

//       console.log("teacherJoining =========",teacherJoining)
//       const response = await axios.post(`${BASE_URL}/api/JoiningRequest/TeacherJoiningRequest`, teacherJoining,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )

//       const result = response.data

//       if (result.succeeded) {
//         setSubmitMessage({ type: "success", message: result.message || "تم إرسال النموذج بنجاح!" })
//         // Reset form on success
//         setFormData({
//           countryCode: "+966",
//           agreeToTerms: false,
//         })
//         console.log("result =========",result)
//         setErrors({})
//       } else {
//         setSubmitMessage({
//           type: "error",
//           message: result.message || "حدث خطأ أثناء إرسال النموذج",
//         })

//         // Handle field-specific errors if provided
//         if (result.errors && Array.isArray(result.errors)) {
//           console.error("API Errors:", result.errors)
//         }
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof TrainerPartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof TrainerPartnershipFormData] = err.message
//           }
//         })
//         setErrors(newErrors)
//       } else {
//         console.error("Submission error:", error)
//         setSubmitMessage({
//           type: "error",
//           message: "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
//         })
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-4 sm:py-8 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border border-purple-100">
//           {/* Header */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 shadow-lg">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-white w-8 h-8"
//                 fill="currentColor"
//                 viewBox="0 0 640 512"
//                 aria-hidden="true"
//               >
//                 <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
//               </svg>
//             </div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               الشراكة مع المدربين
//             </h1>
//             <p className="text-gray-600 text-sm sm:text-base">انضم إلى شبكة المدربين المتميزين</p>
//           </div>

//           {/* Submit Message */}
//           {submitMessage && (
//             <div
//               className={`mb-6 p-4 rounded-lg border-l-4 ${
//                 submitMessage.type === "success"
//                   ? "bg-green-50 border-green-400 text-green-800"
//                   : "bg-red-50 border-red-400 text-red-800"
//               } transition-all duration-300 transform`}
//             >
//               <div className="flex items-center gap-3">
//                 {submitMessage.type === "success" ? (
//                   <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                 )}
//                 <p className="text-sm font-medium">{submitMessage.message}</p>
//               </div>
//             </div>
//           )}

//           {/* Specialization Error Message */}
//           {specializationError && (
//             <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-sm font-medium">{specializationError}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   اسم العائلة <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.lastName || ""}
//                   onChange={(e) => handleInputChange("lastName", e.target.value)}
//                   className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                     errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل اسم العائلة"
//                 />
//                 {errors.lastName && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.lastName}</p>}
//               </div>
//               <div>
//                 <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                   الاسم الأول <span className="text-red-500">*</span>
//                 </h3>
//                 <input
//                   type="text"
//                   value={formData.firstName || ""}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                     errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="أدخل الاسم الأول"
//                 />
//                 {errors.firstName && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.firstName}</p>}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                   errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//                 dir="ltr"
//               />
//               {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.email}</p>}
//             </div>

//             {/* Password */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 كلمة المرور <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="password"
//                 value={formData.password || ""}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                   errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل كلمة المرور"
//               />
//               {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.password}</p>}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </h3>
//               <div className="flex flex-col sm:flex-row-reverse gap-2">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white w-full sm:min-w-[130px] sm:w-auto transition-all duration-200 text-sm sm:text-base hover:border-purple-300"
//                 >
//                   {countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                     errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                   dir="ltr"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.countryCode || errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* Dynamic Specialization */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 التخصصات <span className="text-red-500">*</span>
//               </h3>
//               <div className="relative">
//                 <select
//                   value={formData.specialization || ""}
//                   onChange={(e) => handleInputChange("specialization", e.target.value)}
//                   disabled={isLoadingSpecializations}
//                   className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
//                     errors.specialization ? "border-red-500 bg-red-50" : "border-gray-300"
//                   } ${isLoadingSpecializations ? "opacity-70 cursor-not-allowed" : ""}`}
//                 >
//                   <option value="">
//                     {isLoadingSpecializations ? "جاري تحميل التخصصات..." : "اختر تخصصك"}
//                   </option>
//                   {specializations.map((spec) => (
//                     <option key={spec.id} value={spec.id.toString()}>
//                       {spec.value}
//                     </option>
//                   ))}
//                 </select>
                
//                 {/* Loading spinner overlay */}
//                 {isLoadingSpecializations && (
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                     <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                   </div>
//                 )}
//               </div>
//               {errors.specialization && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.specialization}</p>}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-4 sm:p-5 rounded-lg border border-purple-100">
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
//                   className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 flex-shrink-0 transition-all duration-200"
//                 />
//                 <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer">
//                   <span className="block mb-2 font-medium">لضمان تحويل المعلومات، يجب أن يكون اسمك مطابقاً للاسم في الهوية</span>
                  
//                   أوافق بتعبئتي على{" "}
//                   <a 
//                     href="/" 
//                     className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200 font-medium hover:bg-purple-100 px-1 rounded"
//                   >
//                     شروط وأحكام برنامج الشراكات
//                   </a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-2 text-xs sm:text-sm text-red-600 animate-pulse">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting || isLoadingSpecializations}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-base sm:text-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   جاري الإرسال...
//                 </div>
//               ) : isLoadingSpecializations ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   جاري تحميل البيانات...
//                 </div>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   إرسال
//                   <svg className="w-4 h-4 transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 pt-6 border-t border-gray-200 text-center">
//             <p className="text-xs sm:text-sm text-gray-500">
//               بعد التسجيل، سيتم مراجعة طلبك والتواصل معك في أقرب وقت ممكن
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }












"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { z } from "zod"

// Enhanced password validation function
const passwordValidation = z
  .string()
  .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
  .refine((password) => !password.includes(" "), "كلمة المرور لا يجب أن تحتوي على مسافات")
  .refine((password) => /[A-Z]/.test(password), "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")

// Zod validation schema
const trainerPartnershipSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن يكون حرفين على الأقل"),
  lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن يكون حرفين على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  password: passwordValidation,
  countryCode: z.string().min(1, "رمز البلد مطلوب"),
  phoneNumber: z.string()
  .min(1, "رقم الهاتف مطلوب")
  .regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
  .min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
  specialization: z.string().min(1, "التخصص مطلوب"),
  agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
})

type TrainerPartnershipFormData = z.infer<typeof trainerPartnershipSchema>

interface TeacherSpecialty {
  id: number
  value: string
}

interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: TeacherSpecialty[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

const countryCodes = [
  { code: "+966", country: "السعودية", flag: "🇸🇦" },
  { code: "+971", country: "الإمارات", flag: "🇦🇪" },
  { code: "+965", country: "الكويت", flag: "🇰🇼" },
  { code: "+973", country: "البحرين", flag: "🇧🇭" },
  { code: "+974", country: "قطر", flag: "🇶🇦" },
  { code: "+968", country: "عمان", flag: "🇴🇲" },
]

// Fallback specializations in case API fails
const fallbackSpecializations: TeacherSpecialty[] = [
  { id: 0, value: "القسم الكمي" },
  { id: 1, value: "القسم اللفظي" },
  { id: 2, value: "القسم الكمي و اللفظي" },
]

export default function TeacherPartnershipForm() {
  const [formData, setFormData] = useState<Partial<TrainerPartnershipFormData>>({
    countryCode: "+966",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerPartnershipFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  
  // New state for dynamic specializations
  const [specializations, setSpecializations] = useState<TeacherSpecialty[]>([])
  const [isLoadingSpecializations, setIsLoadingSpecializations] = useState(true)
  const [specializationError, setSpecializationError] = useState<string | null>(null)

  // Fetch specializations on component mount
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setIsLoadingSpecializations(true)
        setSpecializationError(null)
        
        const response = await axios.get<ApiResponse>(`${BASE_URL}/api/TeacherSpecialty/GetAllTeacherSpecialties`, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.data.succeeded && response.data.data) {
          setSpecializations(response.data.data)
        } else {
          throw new Error(response.data.message || "فشل في جلب التخصصات")
        }
      } catch (error) {
        console.error("Error fetching specializations:", error)
        setSpecializationError("فشل في تحميل التخصصات، سيتم استخدام القائمة الافتراضية")
        // Use fallback specializations
        setSpecializations(fallbackSpecializations)
      } finally {
        setIsLoadingSpecializations(false)
      }
    }

    fetchSpecializations()
  }, [])

  const handleInputChange = (field: keyof TrainerPartnershipFormData, value: string | boolean) => {
    // Special handling for password to prevent spaces
    if (field === "password" && typeof value === "string") {
      // Remove any spaces from the password
      value = value.replace(/\s/g, "")
    }
    
    // Special handling for phone number to allow only digits
  if (field === "phoneNumber" && typeof value === "string") {
    // Remove any non-digit characters
    value = value.replace(/\D/g, "")
  }

    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    // Clear submit message when user makes changes
    if (submitMessage) {
      setSubmitMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const validatedData = trainerPartnershipSchema.parse(formData)

      // Prepare API request data
      const teacherJoining = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        password: validatedData.password,
        whatsUpNumber: validatedData.countryCode + validatedData.phoneNumber,
        email: validatedData.email,
        specialtyId: Number.parseInt(validatedData.specialization),
      }

      console.log("teacherJoining =========",teacherJoining)
      const response = await axios.post(`${BASE_URL}/api/JoiningRequest/TeacherJoiningRequest`, teacherJoining,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const result = response.data

      if (result.succeeded) {
        setSubmitMessage({ type: "success", message: result.message || "تم إرسال النموذج بنجاح!" })
        // Reset form on success
        setFormData({
          countryCode: "+966",
          agreeToTerms: false,
        })
        console.log("result =========",result)
        setErrors({})
      } else {
        setSubmitMessage({
          type: "error",
          message: result.message || "حدث خطأ أثناء إرسال النموذج",
        })

        // Handle field-specific errors if provided
        if (result.errors && Array.isArray(result.errors)) {
          console.error("API Errors:", result.errors)
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof TrainerPartnershipFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof TrainerPartnershipFormData] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        console.error("Submission error:", error)
        setSubmitMessage({
          type: "error",
          message: "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-4 sm:py-8 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white w-8 h-8"
                fill="currentColor"
                viewBox="0 0 640 512"
                aria-hidden="true"
              >
                <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              الشراكة مع المدربين
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">انضم إلى شبكة المدربين المتميزين</p>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-lg border-l-4 ${
                submitMessage.type === "success"
                  ? "bg-green-50 border-green-400 text-green-800"
                  : "bg-red-50 border-red-400 text-red-800"
              } transition-all duration-300 transform`}
            >
              <div className="flex items-center gap-3">
                {submitMessage.type === "success" ? (
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <p className="text-sm font-medium">{submitMessage.message}</p>
              </div>
            </div>
          )}

          {/* Specialization Error Message */}
          {specializationError && (
            <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">{specializationError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العائلة <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                    errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="أدخل اسم العائلة"
                />
                {errors.lastName && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.lastName}</p>}
              </div>
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                    errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="أدخل الاسم الأول"
                />
                {errors.firstName && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.firstName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </h3>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="yourEmail@example.com"
                dir="ltr"
              />
              {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور <span className="text-red-500">*</span>
              </h3>
              <input
                type="password"
                value={formData.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="أدخل كلمة المرور (6 أحرف على الأقل، حرف كبير واحد، بدون مسافات)"
              />
              {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.password}</p>}
              
              {/* Password requirements info */}
              <div className="mt-2 text-xs text-gray-500">
                <p>متطلبات كلمة المرور:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>6 أحرف على الأقل</li>
                  <li>حرف كبير واحد على الأقل (A-Z)</li>
                  <li>بدون مسافات</li>
                </ul>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                رقم واتساب <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-col sm:flex-row-reverse gap-2">
                <select
                  value={formData.countryCode || "+966"}
                  onChange={(e) => handleInputChange("countryCode", e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white w-full sm:min-w-[130px] sm:w-auto transition-all duration-200 text-sm sm:text-base hover:border-purple-300"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                    errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="512345678"
                  dir="ltr"
                /> */}
                <input
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                    errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="512345678 (أرقام فقط)"
                  dir="ltr"
                />
              </div>
              {(errors.countryCode || errors.phoneNumber) && (
                <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.countryCode || errors.phoneNumber}</p>
              )}
            </div>

            {/* Dynamic Specialization */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                التخصصات <span className="text-red-500">*</span>
              </h3>
              <div className="relative">
                <select
                  value={formData.specialization || ""}
                  onChange={(e) => handleInputChange("specialization", e.target.value)}
                  disabled={isLoadingSpecializations}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 text-sm sm:text-base hover:border-purple-300 ${
                    errors.specialization ? "border-red-500 bg-red-50" : "border-gray-300"
                  } ${isLoadingSpecializations ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <option value="">
                    {isLoadingSpecializations ? "جاري تحميل التخصصات..." : "اختر تخصصك"}
                  </option>
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.id.toString()}>
                      {spec.value}
                    </option>
                  ))}
                </select>
                
                {/* Loading spinner overlay */}
                {isLoadingSpecializations && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {errors.specialization && <p className="mt-1 text-xs sm:text-sm text-red-600 animate-pulse">{errors.specialization}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-4 sm:p-5 rounded-lg border border-purple-100">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms || false}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 flex-shrink-0 transition-all duration-200"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer">
                  <span className="block mb-2 font-medium">لضمان تحويل المعلومات، يجب أن يكون اسمك مطابقاً للاسم في الهوية</span>
                  
                  أوافق بتعبئتي على{" "}
                  <a 
                    href="/" 
                    className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200 font-medium hover:bg-purple-100 px-1 rounded"
                  >
                    شروط وأحكام برنامج الشراكات
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-2 text-xs sm:text-sm text-red-600 animate-pulse">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoadingSpecializations}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-base sm:text-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </div>
              ) : isLoadingSpecializations ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري تحميل البيانات...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  إرسال
                  <svg className="w-4 h-4 transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              بعد التسجيل، سيتم مراجعة طلبك والتواصل معك في أقرب وقت ممكن
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}