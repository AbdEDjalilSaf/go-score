"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Timer, Star } from "lucide-react"
// import DashStudent from "../dashStudent"
import quizData from "./data.json"

export default function QuizApp() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(quizData.quiz.timeRemaining)
  const [elapsedTime, setElapsedTime] = useState(0) // Track elapsed seconds
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const router = useRouter()
  const quizContainerRef = useRef<HTMLDivElement>(null)


 useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 1
        // Format time as MM:SS
        const minutes = Math.floor(newTime / 60)
        const seconds = newTime % 60
        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        setTimeRemaining(formattedTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, []) // Empty dependency array means it starts immediately on mount

// Click outside quiz component detection
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if the click is outside the quiz component
      if (quizContainerRef.current && !quizContainerRef.current.contains(target)) {
        // Only show exit modal if no other modals are open
        if (!isExitModalOpen && !isErrorModalOpen) {
          setIsExitModalOpen(true)
        }
      }
    }

    // Add event listener
    document.addEventListener("click", handleDocumentClick)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [isExitModalOpen, isErrorModalOpen])



  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      // Handle answer confirmation
      console.log("Answer confirmed:", selectedAnswer)
    }
  }

   const handleReportError = () => {
    setIsErrorModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsErrorModalOpen(false)
    setErrorText("")
  }

  const handleSubmitError = () => {
    if (errorText.trim()) {
      console.log("Error reported:", errorText)
      handleCloseModal()
    }
  }

    const handleExitAttempt = () => {
    setIsExitModalOpen(true)
  }

  const handleConfirmExit = () => {
    // Handle actual exit logic here
    console.log("User confirmed exit")
    setIsExitModalOpen(false)
  }

  const handleCancelExit = () => {
    setIsExitModalOpen(false)
  }




  return (
    // <DashStudent>
    <div  ref={quizContainerRef} className="min-h-screen head bg-gray-100 font-sans" dir="rtl">

      <div className="max-w-7xl load mx-auto px-4 py-6">
        <div className="flex mead flex-col-reverse lg:flex-row-reverse  gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
            {/* Quiz Statistics */}
            <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
                <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
                  <span className="text-white aead text-xs">!</span>
                </div>
                <span className="font-medium lead">تقييم الواجبات</span>
              </div>
              <div className="p-4 rown space-y-4">
                <div className="grid awon grid-cols-2 gap-4">
                  <div className="text-center vead">
                    <div className="text-3xl xead font-bold text-red-500 mb-1">{quizData.quiz.stats.wrongAnswers}</div>
                    <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
                  </div>
                  <div className="text-center meed">
                    <div className="text-3xl need font-bold text-green-500 mb-1">{quizData.quiz.stats.correctAnswers}</div>
                    <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
                  </div>
                </div>
                <div className="text-center beed">
                  <div className="text-3xl zeed font-bold text-yellow-500 mb-1">{quizData.quiz.stats.earnedPoints}</div>
                  <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
                </div>
              </div>
            </div>

            {/* Help Tools */}
            <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
                <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
                  <span className="text-white  text-xs">🔒</span>
                </div>
                <span className="font-medium">وسائل المساعدة</span>
              </div>
              <div className="p-4 space-y-3">
                {quizData.quiz.helpTools.map((tool, index) => (
                  <button
                    key={index}
                    name="veed"
                    className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
                      tool.color === "green"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
                    }`}
                    type="button">
                    {tool.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 w-full">
              <button onClick={handleExitAttempt} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
                <span className="ml-2">➕</span>
                {quizData.navigation.pauseTraining}
              </button>
              <button name="jeek" onClick={handleReportError} className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
                <span className="ml-2">⚠️</span>
                {quizData.navigation.reportError}
              </button>
            </div>
          </div>









          {/* Main Content */}
          <div className="lg:col-span-3 h-[100vh]">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Quiz Header */}
              <div className="bg-gray-700 text-white px-6 py-4 flex flex-row-reverse items-center justify-between flex-wrap gap-4">
                <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse">
                  <div className="bg-gray-600  px-3 ml-3 py-1 rounded-lg flex items-center">
                    <span className="ml-2"><Timer /></span>
                    <span  className="font-bold text-xl">{timeRemaining}</span>
                  </div>
                  <button name="kfol" className="bg-gray-600  hover:bg-gray-500 px-3 py-1 rounded-lg flex items-center transition-colors" type="button">
                    <span className="ml-1"><Star /></span>
                    <span>مميز</span>
                  </button>
                </div>
                <h1 className="text-xl heed font-bold">
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
                      name="ploa"
                      className={`p-4 rounded-lg  border-2 transition-all text-center font-medium ${
                        selectedAnswer === index
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }`}
                      type="button">
                      <span className="text-lg">{option}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <button name="lwad" className="px-6 py-2  bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors" type="button">
                     {quizData.navigation.next} ←
                  </button>
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedAnswer === null}
                    name="coad"
                    className={`px-6 py-2  rounded-lg transition-colors ${
                      selectedAnswer !== null
                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    type="button">
                    {quizData.navigation.confirmAnswer}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


 {/* Error Report Modal */}
      {isErrorModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-xl  mx-auto">
            {/* Modal Header */}
            <div className="bg-orange-500 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h3 className="text-lg font-semibold">{quizData.modal.reportError.title}</h3>
              <button name="jhnb" onClick={handleCloseModal} className="text-white hover:text-gray-200 transition-colors" type="button">
                <span className="text-3xl">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">{quizData.modal.reportError.description}</p>

              <div className="mb-6">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> {quizData.modal.reportError.placeholder}
                </h3>
                <textarea
                  value={errorText}
                  onChange={(e) => setErrorText(e.target.value)}
                  placeholder={quizData.modal.reportError.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 justify-end">
                <button
                name="fgsd"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  type="button">
                  {quizData.modal.reportError.cancel}
                </button>
                <button
                  onClick={handleSubmitError}
                  name="nedf"
                  disabled={!errorText.trim()}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    errorText.trim()
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  type="button">
                  {quizData.modal.reportError.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
   

    {/* Exit Confirmation Modal */}
      {isExitModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white flex items-center justify-center rounded-lg shadow-2xl w-full max-w-3xl h-[400px] mx-auto">
            {/* Modal Content */}
            <div className="p-8 text-center">
              {/* Warning Icon */}
              <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center relative">
                  <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-800 text-lg leading-relaxed mb-8">{quizData.modal.exitConfirmation.message}</p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                name="pled"
                  onClick={()=> {
                    handleCancelExit
                    router.back();
                  }}
                  className="px-8 py-3 bg-white border-2 border-pink-400 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
                  type="button">
                  {quizData.modal.exitConfirmation.exit}
                </button>
                <button
                name="zxcv"
                  onClick={() => { 
                    handleConfirmExit();
                    
                  }}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                  type="button">
                  {quizData.modal.exitConfirmation.continue}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    // </DashStudent>
  )
}
