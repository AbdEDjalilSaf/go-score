// "use client"
// import React, { useEffect, useState } from 'react'

// // Extend the Window interface to include myData
// declare global {
//   interface Window {
//     myData?: {
//       apiKey: string;
//       config: object;
//     };
//   }
// }


// import Cookies from "js-cookie"
// // import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Info from './pages/info/page'
// import StudentsClass from './pages/studentsClass/page'
// import Support from './pages/support/page'
// import Commission from './pages/commission/page'
// import SmartTraining from './pages/smartTraining/page'
// import Courses from './pages/courses/page'
// import GlobalTestPage from './pages/globalTestPage/page'
// import { useSelector } from 'react-redux';


// const Main = () => {
// const [nameGetLink, setNameGetLink] = useState<string>("");
// const currentTitle = useSelector((state: { background: { titleGlobal: string } }) => state.background.titleGlobal);

// // console.log("++++++++++++++++++++ currentTitle ++++++++++++++++++",currentTitle);


// useEffect(() =>{

//   const cooke = Cookies.get("nameLink") || "";
//   setNameGetLink(cooke);

// }, []);

//   return (
//   <>
   
// {currentTitle == "معلوماتي" ? <Info /> :  currentTitle == "الطلاب" ? <StudentsClass /> :  currentTitle == "دورات" ? <Courses />  :  currentTitle == "الدعم الفني" ? <Support /> : currentTitle == "تدرب بذكاء" ? <SmartTraining /> :
// currentTitle == "العمولة"  ?  <Commission /> :
// currentTitle == 'الرئيسية' || currentTitle == '' ? 
// <>

//   <GlobalTestPage />
    
// </> : '' }

//     {/* <Router>
//         <Routes>
//         <Route path="/dashboard/dashStudent/pages/info" element={<Info />} />
//         <Route path="/dashboard/dashStudent/pages/analytics" element={<Analytics />} />
//         <Route path="/dashboard/dashStudent/pages/support" element={<Support />} />
//         <Route path="/dashboard/dashStudent/pages/teachers" element={<Teachers />} />
        
//       </Routes>
//       </Router> */} 
//     </>
//   )
// }

// export default Main











"use client"

import ExamSimulator from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/exam-simulator"
import Achivement from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesPart/page"
import CollectionFull from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionFull/page"
import CollectionPart from "@/app/dashboard/dashStudent/pages/exam-simulator/CollectionPart/page"
import { examData } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/data/exam-data"
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlobalTestPage from "@/app/dashboard/dashTeacher/pages/globalTestPage/page"
import { changeTestExamlutor } from '@/features/auth/authSlice';


export default function Main() {

  const dispatch = useDispatch();

  const makeCookiesType = (testExamlutorTitle: string) => {
    // if(Cookies.get("nameType")){
    //   Cookies.set("nameType", value, { 
    //     expires: 1, // Token expires in 1 days
    //     path: "/", // Available across the entire site
    //     sameSite: "strict", // Restrict to same site to prevent CSRF
    //   });
    //   setTimeout(()=> {
    //     window.location.reload();
    //   },500);
    // }else{
    //   Cookies.set("nameType", value);
    //   setTimeout(()=> {
    //     window.location.reload();
    //   },500);
    // }
    // Cookies.set("nameLink", name);
   
    dispatch(changeTestExamlutor(testExamlutorTitle));
  
}

const currentTitleLocal = useSelector((state: { background: { testExamlutorTitle: string } }) => state.background.testExamlutorTitle);
const currentColor = useSelector((state: { background: { name: string } }) => state.background.name);
const currentTitle = useSelector((state: { background: { testExamlutorTitle: string } }) => state.background.testExamlutorTitle);

console.log("========================== currentTitleLocal ====================", currentTitleLocal);
console.log("========================== currentColor ====================", currentColor);
console.log("========================== currentTitle ====================", currentTitle);


  return (
   <GlobalTestPage />
  )
}