"use client"

import { useState } from "react"
import { useDispatch } from 'react-redux';
import { changeTestExamlutor } from '@/features/auth/authSlice';

export default function ArabicToggle() {
  const [activeOption, setActiveOption] = useState<"tahsili" | "qudurat">("qudurat")
  const dispatch = useDispatch();

  const makeCookiesType = (name: string) => {
   
    dispatch(changeTestExamlutor(name));
  
  }
  return (
  <>
  <div className="w-full my-2">
        {/* Main Toggle Button */}
        <div className="bg-purple-700 rounded-full p-1 shadow-lg">
          <div className="flex relative">
           {/* قدرات Option */}
            <button
              name="اختبار كامل"
              onClick={() =>{
               setActiveOption("qudurat")
               makeCookiesType("اختبار كامل")     }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "qudurat" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              اختبار كامل
            </button>

            {/* تحصيلي Option */}
            <button
              name="اختبار جزئي"
              onClick={() =>{ 
                setActiveOption("tahsili")
                makeCookiesType("اختبار جزئي")  }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "tahsili" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              اختبار جزئي
            </button>
          </div>
        </div>
</div>
</>
  )
}
