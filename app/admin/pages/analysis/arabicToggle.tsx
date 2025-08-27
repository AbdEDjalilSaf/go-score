"use client"

// import { useState } from "react"
import { useDispatch } from 'react-redux';
import { changeSkillOrSection } from '@/features/auth/authSlice';

export default function ArabicToggle({activeOption}: {activeOption: "المهارات" | "الأقسام"}) {
  const dispatch = useDispatch();

  const makeCookiesType = (name: string) => {
   
    dispatch(changeSkillOrSection(name));
  
  }
  return (
  
  <div className="w-md mx-auto my-2">
        {/* Main Toggle Button */}
        <div className="bg-purple-700 rounded-full p-1 shadow-lg">
          <div className="flex relative">
           {/* المهارات Option */}
            <button
              name="المهارات"
              onClick={() =>{
              //  setActiveOption("المهارات")
               makeCookiesType("المهارات")     }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "المهارات" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
               المهارات
            </button>

            {/* الأقسام Option */}
            <button
              name="الأقسام"
              onClick={() =>{ 
                // setActiveOption("الأقسام")
                makeCookiesType("الأقسام")  }}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === "الأقسام" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
              }`}
             type="button">
              الأقسام 
            </button>
          </div>  
        </div>
</div>

  )
}
