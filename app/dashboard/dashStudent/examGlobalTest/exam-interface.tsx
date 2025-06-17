"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import examData from "./data.json"

export default function ExamInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState("")
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [showExitModal, setShowExitModal] = useState(false)
  const router = useRouter()

  const handleExitAttempt = () => {
    setShowExitModal(true)
  }
    const sectionsScrollRef = useRef<HTMLDivElement>(null)
    const examContainerRef = useRef<HTMLDivElement>(null)

  const { exam } = examData
  const question = exam.questions[currentQuestion]

    // Setup click outside detection
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // If the click is outside the exam container, trigger handleExitAttempt
      if (examContainerRef.current && !examContainerRef.current.contains(e.target as Node)) {
        handleExitAttempt()
      }
    }

    // Add event listener to document
    document.addEventListener("click", handleDocumentClick)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [handleExitAttempt])

  // Generate question numbers array
  const questionNumbers = Array.from({ length: exam.totalQuestions }, (_, i) => i + 1)


  // Initialize timer from exam data
  useEffect(() => {
    const parseTimeString = (timeStr: string) => {
      const parts = timeStr.split(":")
      const hours = Number.parseInt(parts[0]) || 0
      const minutes = Number.parseInt(parts[1]) || 0
      const seconds = Number.parseInt(parts[2]) || 0
      return hours * 3600 + minutes * 60 + seconds
    }

    const initialSeconds = parseTimeString(exam.timeRemaining)
    setTotalSeconds(initialSeconds)
    setTimeRemaining(exam.timeRemaining)
  }, [exam.timeRemaining])

  // Countdown timer effect
  useEffect(() => {
    if (totalSeconds <= 0) return

    const timer = setInterval(() => {
      setTotalSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1

        if (newSeconds <= 0) {
          // Timer expired
          setTimeRemaining("00:00:00")
          return 0
        }

        // Format time as HH:MM:SS
        const hours = Math.floor(newSeconds / 3600)
        const minutes = Math.floor((newSeconds % 3600) / 60)
        const seconds = newSeconds % 60

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

        setTimeRemaining(formattedTime)
        return newSeconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [totalSeconds])


  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(answers[currentQuestion + 1] ?? null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
    setSelectedAnswer(answers[questionIndex] ?? null)
  }

  const toggleMark = () => {
    const newMarked = new Set(markedQuestions)
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion)
    } else {
      newMarked.add(currentQuestion)
    }
    setMarkedQuestions(newMarked)
  }


   const scrollSections = (direction: "left" | "right") => {
    if (sectionsScrollRef.current) {
      const scrollAmount = 200
      const currentScroll = sectionsScrollRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      sectionsScrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }


    // Get timer color based on remaining time
  const getTimerColor = () => {
    if (totalSeconds <= 300) return "text-red-400" // Last 5 minutes
    if (totalSeconds <= 900) return "text-yellow-400" // Last 15 minutes
    return "text-white"
  }

  return (
        <div className="relative">
    <div ref={examContainerRef} className="min-h-screen bg-white" dir="rtl">
   
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-6">
        {/* Timer and Sections */}
        <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-3 mb-6">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className={`font-bold text-lg transition-colors ${getTimerColor()} `}>{timeRemaining}</span>
          </div>


            {/* Section Indicators with Scroll */}
          <div className="relative flex items-center max-w-[750px] w-full">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollSections("left")}
              className="absolute left-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Scroll sections left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Sections Container */}
            <div
              ref={sectionsScrollRef}
              className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}>
              {exam.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 flex-shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    {section.completed ? (
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm whitespace-nowrap">{section.name}</span>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollSections("right")}
              className="absolute right-0 z-10 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Scroll sections right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Question Numbers */}
        <div className="flex flex-wrap justify-center gap-1">
          {questionNumbers.map((num, index) => (
            <button
              key={num}
              onClick={() => handleQuestionJump(index)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                index === currentQuestion
                  ? "bg-white text-purple-700 font-bold"
                  : answers[index] !== undefined
                    ? "bg-green-500 text-white"
                    : markedQuestions.has(index)
                      ? "bg-yellow-500 text-white"
                      : "bg-purple-500 text-white hover:bg-purple-400 border border-purple-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
          {/* Question Header */}
          <div className="bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                مراجعة
              </button>
              <button
                onClick={toggleMark}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium ${
                  markedQuestions.has(currentQuestion)
                    ? "bg-yellow-500 hover:bg-yellow-400 text-white"
                    : "bg-gray-500 hover:bg-gray-400 text-white"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                تمييز
              </button>
            </div>
            <h2 className="text-xl font-bold">السؤال: ({currentQuestion + 1})</h2>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-xl mb-8 leading-relaxed font-medium">{question.text}</p>
              {question.image && (
                <div className="flex justify-center mb-8">
                  <div className="border-2 border-purple-400 rounded-lg p-4 bg-blue-50">
                    <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                      {/* Square outline */}
                      <rect x="20" y="20" width="80" height="80" fill="none" stroke="#7c3aed" strokeWidth="2" />
                      {/* Triangle */}
                      <polygon points="20,100 100,100 100,20" fill="#93c5fd" stroke="#7c3aed" strokeWidth="2" />
                      {/* Diagonal line */}
                      <line x1="20" y1="100" x2="100" y2="20" stroke="#7c3aed" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`h-16 text-xl font-bold border-2 rounded-lg transition-all ${
                    selectedAnswer === index
                      ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-6">
              <button
                onClick={handleNext}
                disabled={currentQuestion >= exam.questions.length - 1}
                className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-lg"
              >
                التالي
              </button>
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-lg"
              >
                السابق
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>


       {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white  flex items-center justify-center  rounded-lg shadow-xl w-full max-w-3xl h-[400px] mx-auto">
            <div className="p-8 text-center" dir="rtl">
              {/* Warning Icon */}
              <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
                  <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-800 text-lg leading-relaxed mb-8">
                هل أنت متأكد من رغبتك بالخروج من الاختبار دون استكماله؟
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    // Handle exit logic
                    console.log("User confirmed exit")
                    setShowExitModal(false)
                    router.back();
                  }}
                  className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
                >
                  خروج
                </button>
                <button
                  onClick={() => setShowExitModal(false)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  إكمال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
