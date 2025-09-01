"use client"
import React, { useEffect, useState } from 'react'

// Extend the Window interface to include myData
declare global {
  interface Window {
    myData?: {
      apiKey: string;
      config: object;
    };
  }
}


import Cookies from "js-cookie"
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Info from './pages/info/page'
import Analytics from './pages/analytics/page'
import ExamSimulator from './pages/exam-simulator/page'
import Support from './pages/support/page'
import Teachers from './pages/teachers/page'
import SmartTraining from './pages/smartTraining/page'
import GlobalTestPage from './pages/globalTestPage/page'
import { useSelector } from 'react-redux';


const Main = () => {
const [nameGetLink, setNameGetLink] = useState<string>("");
const currentTitle = useSelector((state: { background: { titleGlobal: string } }) => state.background.titleGlobal);

// console.log("++++++++++++++++++++ currentTitle ++++++++++++++++++",currentTitle);


// setTimeout(() => {
//  window.location.reload();
// //  count = count + 1;
// }, 1000);
// }else{
//   count = count + 2;
// }


useEffect(() =>{

  const cooke = Cookies.get("nameLink") || "";
  setNameGetLink(cooke);

  console.log("++++++",currentTitle);

}, []);

  return (
    <>
   
{currentTitle == "معلوماتي" ? <Info /> : currentTitle == "التحليلات" ? <Analytics /> :  currentTitle == "محاكي الاختبار" ? <ExamSimulator /> : currentTitle == "الدعم الفني" ? <Support /> : currentTitle == "المدربون" ? <Teachers /> : currentTitle == "تدرب بذكاء" ? <SmartTraining /> :
currentTitle == 'الرئيسية' || currentTitle == '' ? 
<>
{/* <div>
 <h1 className="text-2xl font-bold text-purple-800 mb-4">تدرب بذكاء</h1>
    <p className="text-gray-700">
        اختر القسم الذي تريد التدرب عليه وحدد نوع الأسئلة التي تودها ثم اضغط على (ابدأ التدريب) لبدء التدرب الذكي في
        تدريبك
    </p>
    </div> */}

    <GlobalTestPage />
    
</> : '' }

    {/* <Router>
        <Routes>
        <Route path="/dashboard/dashStudent/pages/info" element={<Info />} />
        <Route path="/dashboard/dashStudent/pages/analytics" element={<Analytics />} />
        <Route path="/dashboard/dashStudent/pages/exam-simulator" element={<ExamSimulator />} />
        <Route path="/dashboard/dashStudent/pages/support" element={<Support />} />
        <Route path="/dashboard/dashStudent/pages/teachers" element={<Teachers />} />
        
      </Routes>
      </Router> */} 
    </>
  )
}

export default Main
