"use client"

// biome-ignore assist/source/organizeImports: <explanation>
import RightMenu from "@/app/dashboard/dashTeacher/rightMenu/page"
import React from "react"


export default function DashTeacher({children}: {children: React.ReactNode}) {

  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gray-100">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 rtl">
        <RightMenu />
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          
         {/* <Main /> */}
         {children}
         
        </div>
      </div>
    </main>
 
 
  )
}
