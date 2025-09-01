"use client"

import { useState } from "react"
import { changeBackground } from '@/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ArabicToggle() {
  const [activeOption, setActiveOption] = useState<"tahsili" | "qudurat">("qudurat")
  const dispatch = useDispatch();

  const makeCookiesType = (name: string) => {
   
    dispatch(changeBackground(name));
  
  }
  return (
  <>
  <div className="w-full my-2">
        {/* Main Toggle Button */}
        <div className="bg-purple-700 rounded-full p-1 shadow-lg">
          <div className="flex relative">
           {/* قدرات Option */}
            <button
              name="قدرات"
              onClick={() =>{
               setActiveOption("qudurat")
               makeCookiesType("قدرات")     }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "qudurat" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
            >
              قدرات
            </button>

            {/* تحصيلي Option */}
            <button
              name="تحصيلي"
              onClick={() =>{ 
                setActiveOption("tahsili")
                makeCookiesType("تحصيلي")  }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "tahsili" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
            >
              تحصيلي
            </button>

          
          </div>
        </div>
</div>
</>
  )
}
