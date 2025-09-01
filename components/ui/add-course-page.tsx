"use client"

import type React from "react"

import { useState, useEffect } from "react"

type Category = {
  name: string
  subcategories: string[]
}

type NewCourse = {
  name: string
  category: string
  subcategory: string
  description: string
  price: number
  earning: number
}

interface AddCoursePageProps {
  onAdd: (course: NewCourse) => void
  onCancel: () => void
  categories: Category[]
}

export default function AddCoursePage({ onAdd, onCancel, categories }: AddCoursePageProps) {
  const [formData, setFormData] = useState<NewCourse>({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    price: 0,
    earning: 0,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof NewCourse, string>>>({})
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([])

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categories.find((cat) => cat.name === formData.category)
      setAvailableSubcategories(selectedCategory?.subcategories || [])
      setFormData((prev) => ({ ...prev, subcategory: "" }))
    }
  }, [formData.category, categories])

  const handleInputChange = (field: keyof NewCourse, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewCourse, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.subcategory) {
      newErrors.subcategory = "Subcategory is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (formData.earning < 0) {
      newErrors.earning = "Earning cannot be negative"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onAdd(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-row-reverse items-center justify-between p-6 border-b border-gray-200">
            <div className="flex flex-row-reverse items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              type="button">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">اضافة كورس جديد</h1>
                {/* <p className="text-gray-600 mt-1">Create a new course for your students</p> */}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-purple-600 font-medium">Add Course</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Course Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  معلومات الكورس
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Course Name - اسم الكورس */}
                  <div className="lg:col-span-2">
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الكورس 
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter course name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Category - الفئة */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                  </div>

                  {/* Subcategory - الفئة الفرعية */}
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة الفرعية
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange("subcategory", e.target.value)}
                      disabled={!formData.category}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.subcategory ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select subcategory</option>
                      {availableSubcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                    {errors.subcategory && <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>}
                  </div>

                  {/* Description - الوصف */}
                  <div className="lg:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                     الوصف
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter course description"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  معلومات التسعير
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      سعر الكورس ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>

                  {/* Earning */}
                  <div>
                    <label htmlFor="earning" className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Earning ($) <span className="text-gray-400">(Earning)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="earning"
                      min="0"
                      step="0.01"
                      value={formData.earning}
                      onChange={(e) => handleInputChange("earning", Number.parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.earning ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.earning && <p className="mt-1 text-sm text-red-500">{errors.earning}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                الغاء
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium shadow-sm"
              >
                انشاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
