"use client"

import { useState, useEffect } from "react"
import AnalyticsHeader from "@/app/dashboard/dashTeacher/pages/analytics/analytics-header"
import CapabilitiesSection from "@/app/dashboard/dashTeacher/pages/analytics/capabilities-section"
import AnalyticsHeaderTwo from "@/app/dashboard/dashTeacher/pages/analytics/analytics-header-two"
import AchievementSection from "@/app/dashboard/dashTeacher/pages/analytics/achievement-section"
import AssessmentSection from "@/app/dashboard/dashTeacher/pages/analytics/assessment-section"
import data from "./data.json"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from "@/app/hooks/use-media-query"

export default function AnalyticsDashboard() {
  const [nameGetLink, setNameGetLink] = useState<string>("");
  const currentColor = useSelector((state: { background: { name: string } }) => state.background.name);

  useEffect(() =>{
  // if(Cookies.get("nameType")){
  //   const cooke = Cookies.get("nameType") || "";
  //   setNameGetLink(cooke);
  // }else{
  //   setNameGetLink("قدرات");
  // }
   
  }, []);

  const [analyticsData, setAnalyticsData] = useState(data)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rtl" dir="rtl">
{currentColor == 'قدرات' ?
      <div className="max-w-5xl mx-auto space-y-4">
        <AnalyticsHeader title={analyticsData.title} />
        <CapabilitiesSection capabilities={{
          ...analyticsData.capabilities,
          items: analyticsData.capabilities.items.map((item: any) => ({
            ...item,
            total: typeof item.total === "number" ? item.total : (item.total ?? 100)
          }))
        }} />

        {analyticsData.sections.map((section, index) => (
          <AssessmentSection key={index} section={section} isMobile={isMobile} />
        ))}
      </div>
        :  
        <div className="max-w-5xl mx-auto space-y-4">
        <AnalyticsHeaderTwo title={analyticsData.title} />
        <AchievementSection capabilities={{
          ...analyticsData.achievement,
          items: analyticsData.achievement.items.map((item: any) => ({
            ...item,
            total: typeof item.total === "number" ? item.total : 100
          }))
        }} />

        {analyticsData.sectionsAchevement.map((section, index) => (
          <AssessmentSection key={index} section={section} isMobile={isMobile} />
        ))}
      </div> 
        }
    </div>
  )
}
