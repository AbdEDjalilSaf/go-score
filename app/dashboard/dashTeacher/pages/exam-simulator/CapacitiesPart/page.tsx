"use client"

import { useState } from "react"
import QuizSections from "./quiz-sections"
// import  from "./range-slider"
import RangeSlider from "./achivement"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import TestInfo from "./test-info"
import data from "./data/data.json"
// import "./globals.css"

interface ExamData {
  verbalSection: {
    title: string
    categories: any[]
  }
  quantitativeSection: {
    title: string
    categories: any[]
  }
  testInfo: any
}

interface ExamSimulatorProps {
  data: ExamData
}

// Define ExamType according to your application's needs
type ExamType = "verbal" | "quantitative"; // Example, adjust as needed

export default function Home() {
  const [quizData, setQuizData] = useState(data)
  const [sliderValue, setSliderValue] = useState(66)
  const [inputValue, setInputValue] = useState("1")
  const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
  const [questionCount, setQuestionCount] = useState(1)


 const handleExamTypeSelect = (type: ExamType) => {
    setSelectedExamType(type)
  }

  const handleReset = () => {
    setQuestionCount(1)
  }


  return (
    <main className="max-w-3xl mx-auto p-4  font-sans">
        <div className="mt-6 mb-4 text-center text-pink-600">
          باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuizSections
          title={quizData.quantitativeSection.title}
          categories={quizData.quantitativeSection.categories.map((cat: any) => ({
            ...cat,
            text: cat.text ?? cat.name ?? "",
            selected: cat.selected ?? false,
          }))}
          id={quizData.quantitativeSection.id}
        />
        <QuizSections
          title={quizData.verbalSection.title}
          categories={quizData.verbalSection.categories.map((cat: any) => ({
            ...cat,
            text: cat.text ?? cat.name ?? "",
            selected: cat.selected ?? false,
          }))}
          id={quizData.verbalSection.id}
        />
      </div>

      {/* <AdvancedOptions
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
      /> */}
 {/* Advanced Options */}
      <div className="bg-gray-100 p-4 mt-6 border-t">
        <button  className="flex items-center justify-between w-full">
          <div className="flex items-center text-teal-600 font-medium">
            <span>خيارات متقدمة</span>
          </div>
         
            {/* <ChevronUp className="h-5 w-5 text-teal-600" /> */}
         
        </button>

          <div className="mt-4 border rounded-lg bg-white p-4">
            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-purple-800">
                <Lock className="h-5 w-5" />
                <span>بنوك الأسئلة</span>
              </div>
              <div className="text-gray-600 text-sm">تم إضافة أسئلة جديدة بتاريخ 11/05/2023</div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
                <div className="w-full md:w-24 text-center">
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number.parseInt(e.target.value) || 1)}
                    min="1"
                    max="100"
                    className="w-full flex flex-row-reverse border rounded p-2 text-center"
                  />
                </div>
                <div className="w-full relative flex flex-row-reverse">
                  {/* <RangeSlider  min={1} max={100} value={questionCount} onChange={setQuestionCount} /> */}
                      <input
                      type="range"
                      min={1}
                      max={100}
                      value={questionCount}
                      onChange={e => setQuestionCount(Number.parseInt(e.target.value) || 1)}
                      className="range text-purple-700 range-primary w-full"
                    />
                  
                </div>
              </div>
              <div className="flex justify-start mt-4">
                <button
                  onClick={handleReset}
                  className="border border-red-500 mt-5 text-red-500 px-4 py-1 rounded-md text-sm"
                >
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
        
      </div>      

      <TestInfo testInfo={quizData.testInfo} />
    </main>
  )
}
