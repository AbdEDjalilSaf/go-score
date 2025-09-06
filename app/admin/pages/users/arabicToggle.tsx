"use client"

import { useState } from "react"
import { useDispatch } from 'react-redux';
import { changeUserClassType } from '@/features/auth/authSlice';

export default function ArabicToggle() {
  const [activeOption, setActiveOption] = useState<"الطلاب" | "المعلمون" | "المدارس">("الطلاب")
  const dispatch = useDispatch();

  const makeCookiesType = (name: string) => {
   
    dispatch(changeUserClassType(name));
  
  }
  return (
  
  <div className="max-w-md mx-auto my-2">
        {/* Main Toggle Button */}
        <div className="bg-purple-700 rounded-full p-1 shadow-lg">
          <div className="flex flex-wrap relative">
           {/* الطلاب Option */}
            <button
              name="الطلاب"
              onClick={() =>{
               setActiveOption("الطلاب")
               makeCookiesType("الطلاب")     }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "الطلاب" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              الطلاب
            </button>

            {/* المعلمون Option */}
            <button
              name="المعلمون"
              onClick={() =>{ 
                setActiveOption("المعلمون")
                makeCookiesType("المعلمون")  }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "المعلمون" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              المعلمون
            </button>

            {/* المدارس Option */}
            <button
              name="المدارس"
              onClick={() =>{ 
                setActiveOption("المدارس")
                makeCookiesType("المدارس")  }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "المدارس" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              المدارس
            </button>
          </div>  
        </div>
</div>

  )
}
