"use client"

import { useState, useEffect } from "react"

interface TestData {
  testInfo: {
    title: string
    expectedTime: string
    numberOfQuestions: number
    startButtonText: string
    remainingAttempts: string
    labels: {
      expectedTime: string
      numberOfQuestions: string
    }
  }
}

export default function Component() {
  const [testData, setTestData] = useState<TestData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from JSON file
    const loadData = async () => {
      try {
        // In a real app, you would fetch from your JSON file
        const data: TestData = {
          testInfo: {
            title: "معلومات الاختبار",
            expectedTime: "04:00 ساعة",
            numberOfQuestions: 160,
            startButtonText: "ابدأ الاختبار",
            remainingAttempts: "3",
            labels: {
              expectedTime: "الزمن المتوقع",
              numberOfQuestions: "عدد الأسئلة",
            },
          },
        }
        setTestData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading test data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleStartTest = () => {
    // alert("بدء الاختبار!")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">خطأ في تحميل البيانات</div>
      </div>
    )
  }

  return (
    <>
    <div className="mt-6 text-center text-pink-600">
          باقي لديك {testData.testInfo.remainingAttempts} محاولة مجانية في الباقة الأساسية
        </div>
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sm:p-8 shadow-sm">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500" dir="rtl">
              {testData.testInfo.title}
            </h1>
          </div>

          {/* Test Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Expected Time */}
            <div className="text-center space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800" dir="rtl">
                {testData.testInfo.labels.expectedTime}
              </h3>
              <p className="text-sm sm:text-base text-gray-600" dir="rtl">
                {testData.testInfo.expectedTime}
              </p>
            </div>

            {/* Number of Questions */}
            <div className="text-center space-y-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800" dir="rtl">
                {testData.testInfo.labels.numberOfQuestions}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{testData.testInfo.numberOfQuestions}</p>
            </div>
          </div>

          {/* Start Test Button */}
          <div className="text-center">
            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto px-8 py-3 bg-purple-700 hover:bg-[#59169c] text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              dir="rtl"
            type="button">
              {testData.testInfo.startButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
