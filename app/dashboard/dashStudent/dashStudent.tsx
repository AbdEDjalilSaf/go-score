"use client"

import RightMenu from "@/app/dashboard/dashStudent/rightMenu/page"
// import type { Metadata } from "next"
import  Main  from "@/app/dashboard/dashStudent/main"
import React from "react"
// import GlobalTestPage from './pages/globalTestPage/page'
// import { useSelector } from 'react-redux';

// export const metadata: Metadata = {
//   title: "GoScore - اختبارات",
//   description: "Educational testing platform",
// }

export default function DashStudent({children}: {children: React.ReactNode}) {

// const currentTitle = useSelector((state: { background: { titleGlobal: string } }) => state.background.titleGlobal);
// let count = 0;

// if(count == 0){
// setTimeout(() => {
//  window.location.reload();
//  count = count + 1;
// }, 100);
// }else{
//   count = count + 2;
// }

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
