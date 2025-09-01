// import ExamSimulator from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
// import Achivement from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesPart/page"
// import CollectionFull from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionFull/page"
// import CollectionPart from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionPart/page"
// import { examData } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/data/exam-data"
// import { useDispatch, useSelector } from 'react-redux';
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import ArabicToggle from "./arabicToggle" 
// // import { changeTestExamlutor } from '@/features/auth/authSlice';


// export default function Home() {

//   // const dispatch = useDispatch();

// //   const makeCookiesType = (testExamlutorTitle: string) => {
// //     // if(Cookies.get("nameType")){
// //     //   Cookies.set("nameType", value, { 
// //     //     expires: 1, // Token expires in 1 days
// //     //     path: "/", // Available across the entire site
// //     //     sameSite: "strict", // Restrict to same site to prevent CSRF
// //     //   });
// //     //   setTimeout(()=> {
// //     //     window.location.reload();
// //     //   },500);
// //     // }else{
// //     //   Cookies.set("nameType", value);
// //     //   setTimeout(()=> {
// //     //     window.location.reload();
// //     //   },500);
// //     // }
// //     // Cookies.set("nameLink", name);
   
// //     dispatch(changeTestExamlutor(testExamlutorTitle));
  
// // }

// const currentTitleLocal = useSelector((state: { background: { testExamlutorTitle: string } }) => state.background.testExamlutorTitle);
// const currentColor = useSelector((state: { background: { name: string } }) => state.background.name);
// const currentTitle = useSelector((state: { background: { testExamlutorTitle: string } }) => state.background.testExamlutorTitle);

// console.log("========================== currentTitleLocal ====================", currentTitleLocal);
// console.log("========================== currentColor ====================", currentColor);
// console.log("========================== currentTitle ====================", currentTitle);


//   return (
//     <DashStudent>
//     <main className="min-h-screen  p-4">
//       <div className="max-w-3xl mx-auto">
//         <div className="border-b p-4">
//         <h1 className="text-purple-800 text-2xl font-bold text-right">محاكي الاختبار</h1>
//         <p className="text-gray-700 text-sm mt-2 text-right">{examData.description}</p>
//         <p className="text-gray-700 text-sm mt-2 text-right">{examData.instructions}</p>
//       </div>
//  <div className="flex max-w-sm mx-auto flex-col sm:flex-row gap-2 justify-center mt-4">
//        {/* <Tabs defaultValue="اختبار كامل" className="w-full mt-3">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger name="اختبار جزئي"  className={`${currentTitle == "اختبار جزئي"  ? "data-[state=active]:bg-[#59169c]  data-[state=active]:text-white" : ""}`} onClick={(e) => makeCookiesType((e.target as HTMLButtonElement).name)}  value="اختبار جزئي">اختبار جزئي</TabsTrigger>
//                 <TabsTrigger name="اختبار كامل"  className={`${currentTitle == "اختبار كامل"  ? "data-[state=active]:bg-[#59169c]  data-[state=active]:text-white" : ""}`} onClick={(e) => makeCookiesType((e.target as HTMLButtonElement).name)} value="اختبار كامل">اختبار كامل</TabsTrigger>
               
//               </TabsList>
//             </Tabs> */}
//             <ArabicToggle />
//         </div>

//       {currentColor === "قدرات" && currentTitleLocal === "اختبار كامل" ? 
//         <ExamSimulator data={examData} />
      
//         :
//         currentColor === "قدرات" && currentTitleLocal === "اختبار جزئي" ? 
//         <Achivement  />
//         //  :
//         //  currentColor == "تحصيلي" && currentTitleLocal == "اختبار كامل" ?
//         // <ExamSimulator data={examData} /> 
//         :
//          currentColor === "تحصيلي" && currentTitleLocal === "اختبار كامل" ?
//          <CollectionFull />

//          :
//         currentColor === "تحصيلي" && currentTitleLocal === "اختبار جزئي" ?
//          <CollectionPart />
//          :
//          ""
//         }

//       </div>
//     </main>
//     </DashStudent>
//   )
// }







"use client"

import React from 'react'
import ExamSimulator from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
import Achivement from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesPart/page"
import CollectionFull from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionFull/page"
import CollectionPart from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionPart/page"
import { examData } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/data/exam-data"
import { useDispatch, useSelector } from "react-redux"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
import GlobalTestPage from "@/app/dashboard/dashStudent/pages/globalTestPage/page"
// import ArabicToggle from "@/app/dashboard/dashStudent/rightMenu/arabicToggle"

// Define types for better TypeScript support
interface BackgroundState {
  testExamlutorTitle: string
  name: string
}

interface RootState {
  background: BackgroundState
}

export default function Home() {
  const dispatch = useDispatch()

  // Use properly typed selectors
  const currentTitleLocal = useSelector((state: RootState) => state.background.testExamlutorTitle)
  const currentColor = useSelector((state: RootState) => state.background.name)
  const currentTitle = useSelector((state: RootState) => state.background.testExamlutorTitle)

  console.log("========================== currentTitleLocal ====================", currentTitleLocal)
  console.log("========================== currentColor ====================", currentColor)
  console.log("========================== currentTitle ====================", currentTitle)

  // Function to render the appropriate component based on state
  const renderExamComponent = () => {
    if (currentColor === "قدرات" && currentTitleLocal === "اختبار كامل") {
      return <ExamSimulator data={examData} />
    }

    if (currentColor === "قدرات" && currentTitleLocal === "اختبار جزئي") {
      return <Achivement />
    }

    if (currentColor === "تحصيلي" && currentTitleLocal === "اختبار كامل") {
      return <CollectionFull />
    }

    if (currentColor === "تحصيلي" && currentTitleLocal === "اختبار جزئي") {
      return <CollectionPart />
    }

    return null
  }

  return (
      <GlobalTestPage />
  )
}