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

const Main = () => {
const [nameGetLink, setNameGetLink] = useState<string>("");

useEffect(() =>{

  const cooke = Cookies.get("nameLink") || "";
  setNameGetLink(cooke);

}, []);

  return (
    <>
   
{nameGetLink == "معلوماتي" ? <Info /> : nameGetLink == "التحليلات" ? <Analytics /> :  nameGetLink == "محاكي الاختبار" ? <ExamSimulator /> : nameGetLink == "الدعم الفني" ? <Support /> : nameGetLink == "المدربون" ? <Teachers /> : nameGetLink == "تدرب بذكاء" ? <SmartTraining /> : 
<>
{/* <div>
 <h1 className="text-2xl font-bold text-purple-800 mb-4">تدرب بذكاء</h1>
    <p className="text-gray-700">
        اختر القسم الذي تريد التدرب عليه وحدد نوع الأسئلة التي تودها ثم اضغط على (ابدأ التدريب) لبدء التدرب الذكي في
        تدريبك
    </p>
    </div> */}

    <GlobalTestPage />
    
</> }

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
