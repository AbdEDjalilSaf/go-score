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



"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import citiesData from "./data/cities.json"

// Zod validation schema
const partnershipSchema = z.object({
  fullName: z.string().min(2, "الاسم الكامل مطلوب ويجب أن يكون حرفين على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  countryCode: z.string().min(1, "رمز البلد مطلوب"),
  phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
  city: z.string().min(1, "المدينة مطلوبة"),
  schoolName: z.string().min(2, "اسم المدرسة مطلوب"),
  applicantType: z.string().min(1, "صفة مقدم الطلب مطلوبة"),
  agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
})

type PartnershipFormData = z.infer<typeof partnershipSchema>

// Extract all cities from regions and flatten them
const getAllCities = () => {
  const allCities: string[] = []
  Object.values(citiesData.regions).forEach((region) => {
    allCities.push(...region.cities)
  })
  return allCities.sort()
}

export default function PartnershipForm() {
  const [formData, setFormData] = useState<Partial<PartnershipFormData>>({
    countryCode: "+966",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PartnershipFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cities = getAllCities()

  const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const validatedData = partnershipSchema.parse(formData)
      console.log("Form submitted successfully:", validatedData)
      // Handle successful submission here
      alert("تم إرسال النموذج بنجاح!")
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
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12  rounded-lg mb-4">
              {/* <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-800" fill="currentColor" viewBox="0 0 640 512"><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l208 0 0-96c0-35.3 28.7-64 64-64s64 28.7 64 64l0 96 208 0c26.5 0 48-21.5 48-48l0-320c0-26.5-21.5-48-48-48L473.7 96 337.8 5.4zM96 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM96 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-16c0-8.8-7.2-16-16-16z"/></svg>

            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدارس</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName || ""}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="yourEmail@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم واتساب <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-row-reverse gap-2">
                <select
                  value={formData.countryCode || "+966"}
                  onChange={(e) => handleInputChange("countryCode", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[120px]"
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
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="512345678"
                />
              </div>
              {(errors.countryCode || errors.phoneNumber) && (
                <p className="mt-1 text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المدينة <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر المدينة</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المدرسة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.schoolName || ""}
                onChange={(e) => handleInputChange("schoolName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.schoolName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="أدخل اسم المدرسة"
              />
              {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>}
            </div>

            {/* Applicant Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صفة مقدم الطلب <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.applicantType || ""}
                onChange={(e) => handleInputChange("applicantType", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${
                  errors.applicantType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر صفة مقدم الطلب</option>
                {citiesData.applicantTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.applicantType && <p className="mt-1 text-sm text-red-600">{errors.applicantType}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms || false}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  لضمان تحويل المعلومات، يجب أن تكون اسمك
                  <br />
                  مطابقاً للاسم في الهوية
                  <br />
                  <br />
                  أوافق بتعبئتي على{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-800 underline">
                    شروط وأحكام برنامج الشراكات
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
