"use client"

import { useState, useEffect } from "react"
import quizData from "./data.json"

export default function QuizApp() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(quizData.quiz.timeRemaining)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Timer effect (for demo purposes)
  useEffect(() => {
    const timer = setInterval(() => {
      // Timer logic would go here
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      // Handle answer confirmation
      console.log("Answer confirmed:", selectedAnswer)
    }
  }

  return (
    <div className="min-h-screen  bg-gray-100 font-sans" dir="rtl">

      <div className="max-w-7xl  mx-auto px-4 py-6">
        <div className="flex flex-col-reverse lg:flex-row-reverse  gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 w-full  lg:w-[30%]">
            {/* Quiz Statistics */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-700 text-white px-4 py-3 flex items-center">
                <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center ml-2">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="font-medium">تقييم الواجبات</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-1">{quizData.quiz.stats.wrongAnswers}</div>
                    <div className="text-sm text-gray-600">إجابة خاطئة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-1">{quizData.quiz.stats.correctAnswers}</div>
                    <div className="text-sm text-gray-600">إجابة صحيحة</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">{quizData.quiz.stats.earnedPoints}</div>
                  <div className="text-sm text-gray-600">النقاط المكتسبة</div>
                </div>
              </div>
            </div>

            {/* Help Tools */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-700 text-white px-4 py-3 flex items-center">
                <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center ml-2">
                  <span className="text-white text-xs">🔒</span>
                </div>
                <span className="font-medium">وسائل المساعدة</span>
              </div>
              <div className="p-4 space-y-3">
                {quizData.quiz.helpTools.map((tool, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      tool.color === "green"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
                    }`}
                  >
                    {tool.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 w-full">
              <button className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center">
                <span className="ml-2">➕</span>
                {quizData.navigation.pauseTraining}
              </button>
              <button className="w-full px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center">
                <span className="ml-2">⚠️</span>
                {quizData.navigation.reportError}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 ">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Quiz Header */}
              <div className="bg-gray-700 text-white px-6 py-4 flex flex-row-reverse items-center justify-between flex-wrap gap-4">
                <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse">
                  <div className="bg-gray-600 px-3 ml-3 py-1 rounded-lg flex items-center">
                    <span className="ml-2">⏱️</span>
                    <span className="font-mono">{timeRemaining}</span>
                  </div>
                  <button className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-lg flex items-center transition-colors">
                    <span className="ml-1">⭐</span>
                    <span>مميز</span>
                  </button>
                </div>
                <h1 className="text-xl font-bold">
                  {quizData.quiz.subject} 
                  {/* ({quizData.quiz.currentQuestion}) */}
                </h1>
              </div>

              {/* Question */}
              <div className="p-6">
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-gray-800">{quizData.quiz.question.text}</p>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {quizData.quiz.question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                        selectedAnswer === index
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-lg">{option}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <button className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
                    ← {quizData.navigation.next}
                  </button>
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      selectedAnswer !== null
                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {quizData.navigation.confirmAnswer}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  )
}
