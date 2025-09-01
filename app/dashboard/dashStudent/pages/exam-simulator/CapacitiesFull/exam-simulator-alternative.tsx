"use client"

import { useState } from "react"
import { Lock, RotateCcw, Minus, Plus } from "lucide-react"
import Link from "next/link"
import type { ExamData, ExamType } from "./types/exam"

interface ExamSimulatorProps {
  data: ExamData
}

export default function ExamSimulatorAlternative({ data }: ExamSimulatorProps) {
  const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
  const [questionCount, setQuestionCount] = useState(1)

  const handleExamTypeSelect = (type: ExamType) => {
    setSelectedExamType(type)
  }

  const handleReset = () => {
    setQuestionCount(1)
  }

  const incrementCount = () => {
    if (questionCount < 100) {
      setQuestionCount(questionCount + 1)
    }
  }

  const decrementCount = () => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto   shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className=" p-6 ">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium border border-pink-200">
            {/* <span className="mr-2">⏰</span> */}
            باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
          </div>
        </div>
      </div>

      {/* Advanced Options Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="p-6">
          <button className="flex items-center justify-between w-full group">
            <div className="flex items-center text-teal-600 font-semibold text-lg">
              <span>خيارات متقدمة</span>
            </div>
          </button>

          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Question Bank Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-white">
                  <Lock className="h-5 w-5" />
                  <span className="font-semibold text-lg">بنوك الأسئلة</span>
                </div>
                <div className="text-purple-100 text-sm bg-purple-400/30 px-3 py-1 rounded-full">
                  تم إضافة أسئلة جديدة بتاريخ 11/05/2023
                </div>
              </div>
            </div>

            {/* Question Count Controls */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Question Count Control with Buttons */}
                <div className="flex flex-col items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">عدد الأسئلة</label>

                  {/* Counter with buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementCount}
                      disabled={questionCount <= 1}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
                      <div className="text-xs text-gray-500">من 100</div>
                    </div>

                    <button
                      onClick={incrementCount}
                      disabled={questionCount >= 100}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${questionCount}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Direct Input */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">أو أدخل العدد مباشرة:</span>
                    <input
                      type="number"
                      value={questionCount}
                      onChange={(e) =>
                        setQuestionCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))
                      }
                      min="1"
                      max="100"
                      className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" />
                    إعادة تعيين
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Information Section */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-2xl text-center text-orange-500 font-bold mb-8 relative">
          معلومات الاختبار
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 rounded-full"></div>
        </h2>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">📊</span>
              </div>
              <h3 className="text-blue-600 font-bold text-lg mb-2">كمي</h3>
              <p className="text-gray-700 font-semibold text-xl">{data.examInfo.quantitative}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">📝</span>
              </div>
              <h3 className="text-green-600 font-bold text-lg mb-2">لفظي</h3>
              <p className="text-gray-700 font-semibold text-xl">{data.examInfo.verbal}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">❓</span>
              </div>
              <h3 className="text-purple-600 font-bold text-lg mb-2">عدد الأسئلة</h3>
              <p className="text-gray-700 font-semibold text-xl">{data.examInfo.questionCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-lg">⏱️</span>
              </div>
              <h3 className="text-orange-600 font-bold text-lg mb-2">الزمن المتوقع</h3>
              <p className="text-gray-700 font-semibold text-xl">{data.examInfo.expectedTime}</p>
            </div>
          </div>
        </div>

        {/* Start Exam Button */}
        <Link href="/dashboard/dashStudent/examGlobalTest">
          <div className="flex justify-center">
            <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50">
              <span className="relative z-10">ابدأ الاختبار</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}
