"use client"
import RightMenu from "@/app/dashboard/dashStudent/rightMenu/page"
// import type { Metadata } from "next"
import  Main  from "@/app/dashboard/dashStudent/main"
import React from "react"

// export const metadata: Metadata = {
//   title: "GoScore - اختبارات",
//   description: "Educational testing platform",
// }

export default function Home() {

  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) {
    return (
    <div className={`flex flex-col  transition-all  ease-in-out  gap-3 h-[calc(100vh-65px)] items-center ${isLoading ? "opacity-100 scale-100" : "opacity-0 scale-90"} justify-center`}>
      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      <h2>جاري تحميل البيانات...</h2>
    </div>
    );
}

  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gray-100">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 rtl">
        <RightMenu />
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
         <Main />
        </div>
      </div>
    </main>
 
 
  )
}
