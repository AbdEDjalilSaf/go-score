// "use client"

// import type React from "react"
// import { useState } from "react"
// import { z } from "zod"

// // Zod validation schema
// const partnershipSchema = z.object({
//   fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   city: z.string().min(1, "المدينة مطلوبة"),
//   schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
//   applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type PartnershipFormData = z.infer<typeof partnershipSchema>

// const countryCodes = [
//   { code: "+966", country: "السعودية", flag: "🇸🇦" },
//   { code: "+971", country: "الإمارات", flag: "🇦🇪" },
//   { code: "+965", country: "الكويت", flag: "🇰🇼" },
//   { code: "+973", country: "البحرين", flag: "🇧🇭" },
//   { code: "+974", country: "قطر", flag: "🇶🇦" },
//   { code: "+968", country: "عمان", flag: "🇴🇲" },
// ]

// const cities = [
//   "الرياض",
//   "جدة",
//   "مكة المكرمة",
//   "المدينة المنورة",
//   "الدمام",
//   "الخبر",
//   "تبوك",
//   "بريدة",
//   "خميس مشيط",
//   "حائل",
// ]

// const applicantTypes = ["مدير مدرسة", "معلم" , "موظف"]

// export default function PartnershipForm() {
//   const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
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
//       const validatedData = partnershipSchema.parse(formData)
//       console.log("Form submitted successfully:", validatedData)
//       // Handle successful submission here
//     //   alert("تم إرسال النموذج بنجاح!")
//       setErrors({})
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof PartnershipFormData] = err.message
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
//                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg> */}
//               <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-800" fill="currentColor" viewBox="0 0 640 512"><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/></svg>
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 الاسم الكامل <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.fullName || ""}
//                 onChange={(e) => handleInputChange("fullName", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                   errors.fullName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل الاسم الكامل"
//               />
//               {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </label>
//               <div className="flex flex-row-reverse gap-2">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[120px]"
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
//                   className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                     errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-1 text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 المدينة <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.city || ""}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
//                   errors.city ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر المدينة</option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//               {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//             </div>

//             {/* School Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 اسم المدرسة <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.schoolName || ""}
//                 onChange={(e) => handleInputChange("schoolName", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                   errors.schoolName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل اسم المدرسة"
//               />
//               {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>}
//             </div>

//             {/* Applicant Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 صفة مقدم الطلب <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.applicantType || ""}
//                 onChange={(e) => handleInputChange("applicantType", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
//                   errors.applicantType ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر صفة مقدم الطلب</option>
//                 {applicantTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.applicantType && <p className="mt-1 text-sm text-red-600">{errors.applicantType}</p>}
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
//                   لضمان تحويل المعلومات، يجب أن تكون اسمك
//                   <br />
//                   مطابقاً للاسم في الهوية
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <a href="#" className="text-purple-600 hover:text-purple-800 underline">
//                     شروط وأحكام برنامج الشراكات
//                   </a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }













// "use client"

// import type React from "react"

// import { useState } from "react"
// import { z } from "zod"
// import citiesData from "./data/cities.json"

// // Zod validation schema
// const partnershipSchema = z.object({
//   fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   city: z.string().min(1, "المدينة مطلوبة"),
//   schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
//   applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type PartnershipFormData = z.infer<typeof partnershipSchema>

// // Extract all cities from regions and flatten them
// const getAllCities = () => {
//   const allCities: string[] = []
//   Object.values(citiesData.regions).forEach((region) => {
//     allCities.push(...region.cities)
//   })
//   return allCities.sort()
// }

// export default function PartnershipForm() {
//   const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const cities = getAllCities()

//   const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
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
//       const validatedData = partnershipSchema.parse(formData)
//       console.log("Form submitted successfully:", validatedData)
//       // Handle successful submission here
//       // alert("تم إرسال النموذج بنجاح!")
//       setErrors({})
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof PartnershipFormData] = err.message
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
//                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg> */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-800" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true"><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/></svg>

//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name Field */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 الاسم الكامل <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.fullName || ""}
//                 onChange={(e) => handleInputChange("fullName", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                   errors.fullName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل الاسم الكامل"
//               />
//               {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
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
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[120px]"
//                 >
//                   {citiesData.countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                     errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-1 text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
//               )}
//             </div>

//             {/* City */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 المدينة <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.city || ""}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
//                   errors.city ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر المدينة</option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//               {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//             </div>

//             {/* School Name */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 اسم المدرسة <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.schoolName || ""}
//                 onChange={(e) => handleInputChange("schoolName", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                   errors.schoolName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="أدخل اسم المدرسة"
//               />
//               {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>}
//             </div>

//             {/* Applicant Type */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2">
//                 صفة مقدم الطلب <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.applicantType || ""}
//                 onChange={(e) => handleInputChange("applicantType", e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
//                   errors.applicantType ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر صفة مقدم الطلب</option>
//                 {citiesData.applicantTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.applicantType && <p className="mt-1 text-sm text-red-600">{errors.applicantType}</p>}
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
//                   لضمان تحويل المعلومات، يجب أن تكون اسمك
//                   <br />
//                   مطابقاً للاسم في الهوية
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <a href="/" className="text-purple-600 hover:text-purple-800 underline">
//                     شروط وأحكام برنامج الشراكات
//                   </a>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

















// "use client"

// import type React from "react"
// import Link from "next/link";
// import { useState } from "react"
// import { z } from "zod"
// import citiesData from "../../app/pages/bePartner/schoolPartner/cities.json"

// // Zod validation schema
// const partnershipSchema = z.object({
//   fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   city: z.string().min(1, "المدينة مطلوبة"),
//   schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
//   applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
//   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type PartnershipFormData = z.infer<typeof partnershipSchema>

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// // Extract all cities from regions and flatten them
// const getAllCities = () => {
//   const allCities: string[] = []
//   Object.values(citiesData.regions).forEach((region) => {
//     allCities.push(...region.cities)
//   })
//   return allCities.sort()
// }

// // Map applicant type to number for API
// const getApplicantSchoolNumber = (applicantType: string): number => {
//   const mapping: Record<string, number> = {
//     "مدير المدرسة": 1,
//     "وكيل المدرسة": 2,
//     "مشرف تربوي": 3,
//     "معلم": 4,
//     "أخرى": 5
//   }
//   return mapping[applicantType] || 0
// }

// // Split full name into first and last name
// const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
//   const nameParts = fullName.trim().split(' ')
//   if (nameParts.length === 1) {
//     return { firstName: nameParts[0], lastName: '' }
//   }
//   const firstName = nameParts[0]
//   const lastName = nameParts.slice(1).join(' ')
//   return { firstName, lastName }
// }

// export default function PartnershipForm() {
//   const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
//   const [submitMessage, setSubmitMessage] = useState('')

//   const cities = getAllCities()

//   const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//     // Clear submit status when user makes changes
//     if (submitStatus !== 'idle') {
//       setSubmitStatus('idle')
//       setSubmitMessage('')
//     }
//   }

//   const submitToAPI = async (validatedData: PartnershipFormData) => {
//     const { firstName, lastName } = splitFullName(validatedData.fullName)
    
//     const apiPayload = {
//       firstName,
//       lastName,
//       password: validatedData.password,
//       whatsUpNumber: `${validatedData.countryCode}${validatedData.phoneNumber}`,
//       email: validatedData.email,
//       schoolName: validatedData.schoolName,
//       schoolCity: validatedData.city,
//       applicantSchool: getApplicantSchoolNumber(validatedData.applicantType)
//     }

//     try {
//       const response = await fetch('/api/JoiningRequest/SchoolOfficialJoiningRequest', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(apiPayload)
//       })

//       const result: ApiResponse = await response.json()

//       if (result.succeeded) {
//         setSubmitStatus('success')
//         setSubmitMessage(result.message || 'تم إرسال الطلب بنجاح!')
//         // Reset form
//         setFormData({
//           countryCode: "+966",
//           agreeToTerms: false,
//         })
//       } else {
//         setSubmitStatus('error')
//         setSubmitMessage(result.message || 'حدث خطأ أثناء إرسال الطلب')
        
//         // If there are field-specific errors, map them
//         if (result.errors && result.errors.length > 0) {
//           const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//           result.errors.forEach((error) => {
//             // You can map specific API errors to form fields here if needed
//             console.error('API Error:', error)
//           })
//           if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors)
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Network error:', error)
//       setSubmitStatus('error')
//       setSubmitMessage('خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.')
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setSubmitStatus('idle')
//     setSubmitMessage('')

//     try {
//       const validatedData = partnershipSchema.parse(formData)
//       await submitToAPI(validatedData)
//       setErrors({})
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof PartnershipFormData] = err.message
//           }
//         })
//         setErrors(newErrors)
//         setSubmitStatus('error')
//         setSubmitMessage('يرجى تصحيح الأخطاء في النموذج')
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true">
//                 <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/>
//               </svg>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
//             <p className="text-gray-600">انضم إلى برنامج شراكاتنا التعليمية</p>
//           </div>

//           {/* Success/Error Messages */}
//           {submitStatus === 'success' && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-green-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-green-800 font-medium">{submitMessage}</p>
//               </div>
//             </div>
//           )}

//           {submitStatus === 'error' && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-red-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-red-800 font-medium">{submitMessage}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name Field */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 الاسم الكامل <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.fullName || ""}
//                 onChange={(e) => handleInputChange("fullName", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل الاسم الكامل"
//               />
//               {errors.fullName && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.fullName}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.email ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//                 dir="ltr"
//               />
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 كلمة المرور <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="password"
//                 value={formData.password || ""}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.password ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل كلمة مرور قوية"
//               />
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </h3>
//               <div className="flex flex-row-reverse gap-3">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[140px] hover:border-gray-300 transition-all duration-200"
//                 >
//                   {citiesData.countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                     errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                   dir="ltr"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.countryCode || errors.phoneNumber}
//                 </p>
//               )}
//             </div>

//             {/* City */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 المدينة <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.city || ""}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 ${
//                   errors.city ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر المدينة</option>
//                 {cities.map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//               {errors.city && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.city}
//                 </p>
//               )}
//             </div>

//             {/* School Name */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 اسم المدرسة <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.schoolName || ""}
//                 onChange={(e) => handleInputChange("schoolName", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.schoolName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل اسم المدرسة"
//               />
//               {errors.schoolName && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.schoolName}
//                 </p>
//               )}
//             </div>

//             {/* Applicant Type */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 صفة مقدم الطلب <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.applicantType || ""}
//                 onChange={(e) => handleInputChange("applicantType", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 ${
//                   errors.applicantType ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر صفة مقدم الطلب</option>
//                 {citiesData.applicantTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.applicantType && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.applicantType}
//                 </p>
//               )}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//               <div className="flex items-start gap-4">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
//                   className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
//                   <span className="font-medium text-gray-900">لضمان تحويل المعلومات، يجب أن يكون اسمك مطابقاً للاسم في الهوية</span>
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <Link href="/" className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors">
//                     شروط وأحكام برنامج الشراكات
//                   </Link>
//                 </label>
//               </div>
//               {errors.agreeToTerms && (
//                 <p className="mt-3 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.agreeToTerms}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   جاري الإرسال...
//                 </div>
//               ) : (
//                 "إرسال الطلب"
//               )}
//             </button>
//           </form>

//           {/* Additional Info */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600 text-center">
//               سيتم مراجعة طلبك خلال 24-48 ساعة وسنتواصل معك عبر البريد الإلكتروني أو الواتساب
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }















// "use client"

// import type React from "react"
// import Link from "next/link";
// import { useState } from "react"
// import { z } from "zod"
// import axios from "axios"
// import citiesData from "../../app/pages/bePartner/schoolPartner/cities.json"

// // Zod validation schema
// const partnershipSchema = z.object({
//   fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
//   email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
//   countryCode: z.string().min(1, "رمز البلد مطلوب"),
//   phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
//   city: z.string().min(1, "المدينة مطلوبة"),
//   schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
//   applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
//   password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
//   agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
// })

// type PartnershipFormData = z.infer<typeof partnershipSchema>

// interface ApiResponse {
//   meta: string
//   succeeded: boolean
//   message: string
//   errors: string[]
//   data: string
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// // Map applicant type to number for API
// const getApplicantSchoolNumber = (applicantType: string): number => {
//   const mapping: Record<string, number> = {
//     "مدير المدرسة": 1,
//     "وكيل المدرسة": 2,
//     "مشرف تربوي": 3,
//     "معلم": 4,
//     "أخرى": 5
//   }
//   return mapping[applicantType] || 0
// }

// // Split full name into first and last name
// const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
//   const nameParts = fullName.trim().split(' ')
//   if (nameParts.length === 1) {
//     return { firstName: nameParts[0], lastName: '' }
//   }
//   const firstName = nameParts[0]
//   const lastName = nameParts.slice(1).join(' ')
//   return { firstName, lastName }
// }

// export default function PartnershipForm() {
//   const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
//     countryCode: "+966",
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
//   const [submitMessage, setSubmitMessage] = useState('')

//   const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//     // Clear submit status when user makes changes
//     if (submitStatus !== 'idle') {
//       setSubmitStatus('idle')
//       setSubmitMessage('')
//     }
//   }

//   const submitToAPI = async (validatedData: PartnershipFormData) => {
//     const { firstName, lastName } = splitFullName(validatedData.fullName)
    
//     const apiPayload = {
//       firstName,
//       lastName,
//       password: validatedData.password,
//       whatsUpNumber: `${validatedData.countryCode}${validatedData.phoneNumber}`,
//       email: validatedData.email,
//       schoolName: validatedData.schoolName,
//       schoolCity: validatedData.city,
//       applicantSchool: getApplicantSchoolNumber(validatedData.applicantType)
//     }

//     console.log("apiPayload +++++++",apiPayload)
//     try {
//       const response = await axios.post<ApiResponse>(
//         `${BASE_URL}/api/JoiningRequest/SchoolOfficialJoiningRequest`,
//         apiPayload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       const result = response.data

//       if (result.succeeded) {
//         setSubmitStatus('success')
//         setSubmitMessage(result.message || 'تم إرسال الطلب بنجاح!')
//         // Reset form
//         setFormData({
//           countryCode: "+966",
//           agreeToTerms: false,
//         })
//         console.log("result +++++++",result)
//       } else {
//         setSubmitStatus('error')
//         setSubmitMessage(result.message || 'حدث خطأ أثناء إرسال الطلب')
        
//         // If there are field-specific errors, map them
//         if (result.errors && result.errors.length > 0) {
//           const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//           result.errors.forEach((error) => {
//             // You can map specific API errors to form fields here if needed
//             console.error('API Error:', error)
//           })
//           if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors)
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Request error:', error)
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           // Server responded with error status
//           const status = error.response.status
//           const data = error.response.data as ApiResponse
          
//           if (data && !data.succeeded) {
//             setSubmitStatus('error')
//             setSubmitMessage(data.message || `خطأ من الخادم (${status})`)
//           } else {
//             setSubmitStatus('error')
//             setSubmitMessage(`خطأ من الخادم (${status}). يرجى المحاولة مرة أخرى.`)
//           }
//         } else if (error.request) {
//           // Request was made but no response received (network error)
//           setSubmitStatus('error')
//           setSubmitMessage('خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.')
//         } else {
//           // Something else happened
//           setSubmitStatus('error')
//           setSubmitMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
//         }
//       } else {
//         // Non-axios error
//         setSubmitStatus('error')
//         setSubmitMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
//       }
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setSubmitStatus('idle')
//     setSubmitMessage('')

//     try {
//       const validatedData = partnershipSchema.parse(formData)
//       await submitToAPI(validatedData)
//       setErrors({})
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof PartnershipFormData] = err.message
//           }
//         })
//         setErrors(newErrors)
//         setSubmitStatus('error')
//         setSubmitMessage('يرجى تصحيح الأخطاء في النموذج')
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4" dir="rtl">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true">
//                 <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/>
//               </svg>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
//             <p className="text-gray-600">انضم إلى برنامج شراكاتنا التعليمية</p>
//           </div>

//           {/* Success/Error Messages */}
//           {submitStatus === 'success' && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-green-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-green-800 font-medium">{submitMessage}</p>
//               </div>
//             </div>
//           )}

//           {submitStatus === 'error' && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-red-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-red-800 font-medium">{submitMessage}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name Field */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 الاسم الكامل <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.fullName || ""}
//                 onChange={(e) => handleInputChange("fullName", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل الاسم الكامل"
//               />
//               {errors.fullName && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.fullName}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 البريد الإلكتروني <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.email ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="yourEmail@example.com"
//                 dir="ltr"
//               />
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 كلمة المرور <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="password"
//                 value={formData.password || ""}
//                 onChange={(e) => handleInputChange("password", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.password ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل كلمة مرور قوية"
//               />
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 رقم واتساب <span className="text-red-500">*</span>
//               </h3>
//               <div className="flex flex-row-reverse gap-3">
//                 <select
//                   value={formData.countryCode || "+966"}
//                   onChange={(e) => handleInputChange("countryCode", e.target.value)}
//                   className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[140px] hover:border-gray-300 transition-all duration-200"
//                 >
//                   {citiesData.countryCodes.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber || ""}
//                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//                   className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                     errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   placeholder="512345678"
//                   dir="ltr"
//                 />
//               </div>
//               {(errors.countryCode || errors.phoneNumber) && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.countryCode || errors.phoneNumber}
//                 </p>
//               )}
//             </div>

//             {/* City */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 المدينة <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.city || ""}
//                 onChange={(e) => handleInputChange("city", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.city ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل اسم المدينة"
//               />
//               {errors.city && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.city}
//                 </p>
//               )}
//             </div>

//             {/* School Name */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 اسم المدرسة <span className="text-red-500">*</span>
//               </h3>
//               <input
//                 type="text"
//                 value={formData.schoolName || ""}
//                 onChange={(e) => handleInputChange("schoolName", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
//                   errors.schoolName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 placeholder="أدخل اسم المدرسة"
//               />
//               {errors.schoolName && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.schoolName}
//                 </p>
//               )}
//             </div>

//             {/* Applicant Type */}
//             <div>
//               <h3 className="block text-sm font-semibold text-gray-700 mb-2">
//                 صفة مقدم الطلب <span className="text-red-500">*</span>
//               </h3>
//               <select
//                 value={formData.applicantType || ""}
//                 onChange={(e) => handleInputChange("applicantType", e.target.value)}
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 ${
//                   errors.applicantType ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <option value="">اختر صفة مقدم الطلب</option>
//                 {citiesData.applicantTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               {errors.applicantType && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.applicantType}
//                 </p>
//               )}
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
//               <div className="flex items-start gap-4">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={formData.agreeToTerms || false}
//                   onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
//                   className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
//                   <span className="font-medium text-gray-900">لضمان تحويل المعلومات، يجب أن يكون اسمك مطابقاً للاسم في الهوية</span>
//                   <br />
//                   <br />
//                   أوافق بتعبئتي على{" "}
//                   <Link href="/" className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors">
//                     شروط وأحكام برنامج الشراكات
//                   </Link>
//                 </label>
//               </div>
//               {errors.agreeToTerms && (
//                 <p className="mt-3 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.agreeToTerms}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   جاري الإرسال...
//                 </div>
//               ) : (
//                 "إرسال الطلب"
//               )}
//             </button>
//           </form>

//           {/* Additional Info */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600 text-center">
//               سيتم مراجعة طلبك خلال 24-48 ساعة وسنتواصل معك عبر البريد الإلكتروني أو الواتساب
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }















"use client"

import type React from "react"
import Link from "next/link";
import { useState } from "react"
import { z } from "zod"
import axios from "axios"
import citiesData from "../../app/pages/bePartner/schoolPartner/cities.json"

// Zod validation schema
const partnershipSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  countryCode: z.string().min(1, "رمز البلد مطلوب"),
  phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل").regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  city: z.string().min(1, "المدينة مطلوبة"),
  schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
  applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
  password: z.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/^(?=.*[A-Z])/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/^\S*$/, "كلمة المرور لا يجب أن تحتوي على مسافات"),
  agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
})

type PartnershipFormData = z.infer<typeof partnershipSchema>

interface ApiResponse {
  meta: string
  succeeded: boolean
  message: string
  errors: string[]
  data: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// Map applicant type to number for API
const getApplicantSchoolNumber = (applicantType: string): number => {
  const mapping: Record<string, number> = {
    "مدير المدرسة": 1,
    "وكيل المدرسة": 2,
    "مشرف تربوي": 3,
    "معلم": 4,
    "أخرى": 5
  }
  return mapping[applicantType] || 0
}

// Split full name into first and last name
const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
  const nameParts = fullName.trim().split(' ')
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' }
  }
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')
  return { firstName, lastName }
}

export default function PartnershipForm() {
  const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
    countryCode: "+966",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    // Clear submit status when user makes changes
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setSubmitMessage('')
    }
  }

  // Handle phone number input to accept only numbers
  const handlePhoneNumberChange = (value: string) => {
    // Remove all non-digit characters
    const numbersOnly = value.replace(/\D/g, '')
    handleInputChange("phoneNumber", numbersOnly)
  }

  // Handle password input to prevent spaces
  const handlePasswordChange = (value: string) => {
    // Remove spaces from password
    const noSpaces = value.replace(/\s/g, '')
    handleInputChange("password", noSpaces)
  }

  const submitToAPI = async (validatedData: PartnershipFormData) => {
    const { firstName, lastName } = splitFullName(validatedData.fullName)
    
    const apiPayload = {
      firstName,
      lastName,
      password: validatedData.password,
      whatsUpNumber: `${validatedData.countryCode}${validatedData.phoneNumber}`,
      email: validatedData.email,
      schoolName: validatedData.schoolName,
      schoolCity: validatedData.city,
      applicantSchool: getApplicantSchoolNumber(validatedData.applicantType)
    }

    console.log("apiPayload +++++++",apiPayload)
    try {
      const response = await axios.post<ApiResponse>(
        `${BASE_URL}/api/JoiningRequest/SchoolOfficialJoiningRequest`,
        apiPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const result = response.data

      if (result.succeeded) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'تم إرسال الطلب بنجاح!')
        // Reset form
        setFormData({
          countryCode: "+966",
          agreeToTerms: false,
        })
        console.log("result +++++++",result)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message || 'حدث خطأ أثناء إرسال الطلب')
        
        // If there are field-specific errors, map them
        if (result.errors && result.errors.length > 0) {
          const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
          result.errors.forEach((error) => {
            // You can map specific API errors to form fields here if needed
            console.error('API Error:', error)
          })
          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
          }
        }
      }
    } catch (error) {
      console.error('Request error:', error)
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          const status = error.response.status
          const data = error.response.data as ApiResponse
          
          if (data && !data.succeeded) {
            setSubmitStatus('error')
            setSubmitMessage(data.message || `خطأ من الخادم (${status})`)
          } else {
            setSubmitStatus('error')
            setSubmitMessage(`خطأ من الخادم (${status}). يرجى المحاولة مرة أخرى.`)
          }
        } else if (error.request) {
          // Request was made but no response received (network error)
          setSubmitStatus('error')
          setSubmitMessage('خطأ في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.')
        } else {
          // Something else happened
          setSubmitStatus('error')
          setSubmitMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
        }
      } else {
        // Non-axios error
        setSubmitStatus('error')
        setSubmitMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const validatedData = partnershipSchema.parse(formData)
      await submitToAPI(validatedData)
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PartnershipFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof PartnershipFormData] = err.message
          }
        })
        setErrors(newErrors)
        setSubmitStatus('error')
        setSubmitMessage('يرجى تصحيح الأخطاء في النموذج')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 640 512" aria-hidden="true">
                <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
            <p className="text-gray-600">انضم إلى برنامج شراكاتنا التعليمية</p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-800 font-medium">{submitMessage}</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-800 font-medium">{submitMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                الاسم الكامل <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                value={formData.fullName || ""}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </h3>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="yourEmail@example.com"
                dir="ltr"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                كلمة المرور <span className="text-red-500">*</span>
              </h3>
              <input
                type="password"
                value={formData.password || ""}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="أدخل كلمة مرور قوية (8 أحرف على الأقل مع حرف كبير)"
              />
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${formData.password && formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>8 أحرف على الأقل</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${formData.password && /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>حرف كبير واحد على الأقل</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${formData.password && !/\s/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>بدون مسافات</span>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                رقم واتساب <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-row-reverse gap-3">
                <select
                  value={formData.countryCode || "+966"}
                  onChange={(e) => handleInputChange("countryCode", e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[140px] hover:border-gray-300 transition-all duration-200"
                >
                  {citiesData.countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.phoneNumber ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="512345678"
                  dir="ltr"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <p className="mt-1 text-xs text-gray-600">يُقبل الأرقام فقط</p>
              {(errors.countryCode || errors.phoneNumber) && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.countryCode || errors.phoneNumber}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                المدينة <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                value={formData.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.city ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="أدخل اسم المدينة"
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.city}
                </p>
              )}
            </div>

            {/* School Name */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                اسم المدرسة <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                value={formData.schoolName || ""}
                onChange={(e) => handleInputChange("schoolName", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.schoolName ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="أدخل اسم المدرسة"
              />
              {errors.schoolName && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.schoolName}
                </p>
              )}
            </div>

            {/* Applicant Type */}
            <div>
              <h3 className="block text-sm font-semibold text-gray-700 mb-2">
                صفة مقدم الطلب <span className="text-red-500">*</span>
              </h3>
              <select
                value={formData.applicantType || ""}
                onChange={(e) => handleInputChange("applicantType", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all duration-200 ${
                  errors.applicantType ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <option value="">اختر صفة مقدم الطلب</option>
                {citiesData.applicantTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.applicantType && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.applicantType}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms || false}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">لضمان تحويل المعلومات، يجب أن يكون اسمك مطابقاً للاسم في الهوية</span>
                  <br />
                  <br />
                  أوافق بتعبئتي على{" "}
                  <Link href="/" className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors">
                    شروط وأحكام برنامج الشراكات
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="mt-3 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </div>
              ) : (
                "إرسال الطلب"
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              سيتم مراجعة طلبك خلال 24-48 ساعة وسنتواصل معك عبر البريد الإلكتروني أو الواتساب
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}