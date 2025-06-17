"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { z } from "zod"

// Zod validation schema
const trainerPartnershipSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن يكون حرفين على الأقل"),
  lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن يكون حرفين على الأقل"),
  email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
  countryCode: z.string().min(1, "رمز البلد مطلوب"),
  phoneNumber: z.string().min(8, "رقم الهاتف يجب أن يكون 8 أرقام على الأقل"),
  specialization: z.string().min(1, "التخصص مطلوب"),
  agreeToTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
})

type TrainerPartnershipFormData = z.infer<typeof trainerPartnershipSchema>

const countryCodes = [
  { code: "+966", country: "السعودية", flag: "🇸🇦" },
  { code: "+971", country: "الإمارات", flag: "🇦🇪" },
  { code: "+965", country: "الكويت", flag: "🇰🇼" },
  { code: "+973", country: "البحرين", flag: "🇧🇭" },
  { code: "+974", country: "قطر", flag: "🇶🇦" },
  { code: "+968", country: "عمان", flag: "🇴🇲" },
]

const specializations = [
  "القسم الكمي ",
  "القسم اللفظي",
  "القسم الكمي و اللفظي",
]

export default function TrainerPartnershipForm() {
  const [formData, setFormData] = useState<Partial<TrainerPartnershipFormData>>({
    countryCode: "+966",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof TrainerPartnershipFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof TrainerPartnershipFormData, value: string | boolean) => {
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
      const validatedData = trainerPartnershipSchema.parse(formData)
      console.log("Form submitted successfully:", validatedData)
      // Handle successful submission here
      alert("تم إرسال النموذج بنجاح!")
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof TrainerPartnershipFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof TrainerPartnershipFormData] = err.message
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
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" className="text-purple-600" fill="currentColor" viewBox="0 0 640 512"><path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشراكة مع المدربين</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العائلة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName || ""}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="أدخل اسم العائلة"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName || ""}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="أدخل الاسم الأول"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
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
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
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
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white min-w-[130px] transition-colors"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="512345678"
                />
              </div>
              {(errors.countryCode || errors.phoneNumber) && (
                <p className="mt-1 text-sm text-red-600">{errors.countryCode || errors.phoneNumber}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التخصصات <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.specialization || ""}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-colors ${
                  errors.specialization ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر تخصصك</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
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
                  لضمان تحويل المعلومات، يجب أن يكون اسمك
                  <br />
                  مطابقاً للاسم في الهوية
                  <br />
                  <br />
                  أوافق بتعبئتي على{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-800 underline transition-colors">
                    شروط وأحكام برنامج الشراكات
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <Link href="/dashboard/dashTeacher">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </div>
              ) : (
                "إرسال"
              )}
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
