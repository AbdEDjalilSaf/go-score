"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import RangeSlider from "./range-slider"
import type { ExamData, ExamType } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/types/exam"
import Link from "next/link"
// import { useDispatch, useSelector } from 'react-redux';
// import { changeTestExamlutor } from '@/features/auth/authSlice';


interface ExamSimulatorProps {
  data: ExamData
}

export default function ExamSimulator({ data }: ExamSimulatorProps) {
  // const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
  const [questionCount, setQuestionCount] = useState(1)

  // const dispatch = useDispatch();


  // const makeCookiesType = (testExamlutorTitle: string) => {
  //   // if(Cookies.get("nameType")){
  //   //   Cookies.set("nameType", value, { 
  //   //     expires: 1, // Token expires in 1 days
  //   //     path: "/", // Available across the entire site
  //   //     sameSite: "strict", // Restrict to same site to prevent CSRF
  //   //   });
  //   //   setTimeout(()=> {
  //   //     window.location.reload();
  //   //   },500);
  //   // }else{
  //   //   Cookies.set("nameType", value);
  //   //   setTimeout(()=> {
  //   //     window.location.reload();
  //   //   },500);
  //   // }
  //   // Cookies.set("nameLink", name);
   
  //   dispatch(changeTestExamlutor(testExamlutorTitle));
  
  // }


  // const toggleAdvanced = () => {
  //   setIsAdvancedOpen(!isAdvancedOpen)
  // }

  const handleExamTypeSelect = (type: ExamType) => {
    setSelectedExamType(type)
  }

  const handleReset = () => {
    setQuestionCount(1)
  }

  return (
     <>


      {/* Exam Type Selection */}
      <div className="p-4">
       

        {/* Remaining Attempts */}
        <div className="mt-6 text-center text-pink-600">
          باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
        </div>
      </div>

      {/* Advanced Options */}
      <div className="bg-gray-100 p-4 border-t">
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
                <div className="w-full flex flex-row-reverse">
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

      {/* Exam Information */}
      <div className="p-4">
        <h2 className="text-xl text-center text-orange-500 font-bold mb-4">معلومات الاختبار</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-blue-600 font-bold">كمي</h3>
            <p className="text-gray-700">{data.examInfo.quantitative}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">لفظي</h3>
            <p className="text-gray-700">{data.examInfo.verbal}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
            <p className="text-gray-700">{data.examInfo.questionCount}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
            <p className="text-gray-700">{data.examInfo.expectedTime}</p>
          </div>
        </div>
        
        <Link href="/dashboard/dashStudent/examGlobalTest">
        <div className="mt-12 flex justify-center">
          <button className="bg-purple-800 text-white px-8 py-2 rounded-md font-bold">ابدأ الاختبار</button>
        </div>
        </Link>
      </div>
      </>
  )
}
