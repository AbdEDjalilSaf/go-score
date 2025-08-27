"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, ChartNoAxesCombined ,House , FileText, ShieldCheck , HelpCircle, Users, ChevronRight, Zap , School } from "lucide-react"
import placeInter from "@/public/place-holder.webp"
import menuData from "@/app/dashboard/dashStudent/rightMenu/data.json"
import { useDispatch, useSelector } from 'react-redux';
import ArabicToggle from "./arabicToggle"
import { changeBackground,changeTitleGlobal, changeGlobalName } from '@/features/auth/authSlice';
// import { cookies } from "next/headers"
import Cookies from "js-cookie"

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  Info: <Info className="h-5 w-5" />,
  House: <House className="h-5 w-5" />,
  ChartNoAxesCombined  : <ChartNoAxesCombined  className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  ShieldCheck : <ShieldCheck  className="h-5 w-5" />,
  HelpCircle: <HelpCircle className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  School: <School className="h-5 w-5" />,
}

export default function RightMenu() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dispatch = useDispatch();
  const globalName = useSelector((state: { background: { globalName: string } }) => state.background.globalName);
  const currentColor = useSelector((state: { background: { name: string } }) => state.background.name);


// console.log("================ currentColor ===================",currentColor);

const makeCookies = (titleGlobal: string) => {
  // if(Cookies.get("nameLink")){
  //   Cookies.set("nameLink", name, { 
  //     expires: 0.1, // Token expires in 1 days
  //     path: "/", // Available across the entire site
  //     sameSite: "strict", // Restrict to same site to prevent CSRF
  //   });
  //   window.location.reload();
  // }else{
  //   Cookies.set("nameLink", name);
  //   window.location.reload();
  // }
  // Cookies.set("nameLink", name);
  dispatch(changeTitleGlobal(titleGlobal));

}


const makeCookiesType = (name: string) => {
 
  dispatch(changeBackground(name));

}

  const [nameGetLinkType, setNameGetLinkType] = useState<string>("قدرات");
  
  useEffect(() =>{
    
  if (Cookies.get("nameType")){
    const cooke = Cookies.get("nameType") || "";
    setNameGetLinkType(cooke);
  }else{
    setNameGetLinkType("قدرات");
  }
    
  
  }, []);

useEffect(() => {
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 900)
  }

  // Initial check
  checkScreenSize()

  // Add event listener
  window.addEventListener("resize", checkScreenSize)

  // Cleanup
  return () => window.removeEventListener("resize", checkScreenSize)
}, [])

const [nameGetLink, setNameGetLink] = useState<string>("");

useEffect(() =>{
  const cooke = Cookies.get("nameLink") || "";
  setNameGetLink(cooke);
}, []);

useEffect(() =>{
const fullName = localStorage.getItem("userName");
dispatch(changeGlobalName(fullName));
console.log("fullName", fullName);
  
}, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <>
      {isMobile && (
        <Button variant="outline" className="self-end sl:hidden  mb-2 bg-white" onClick={toggleMenu}>
          القائمة
          <ChevronRight className="mr-2 h-4 w-4" />
        </Button>
      )}

      <Card
        className={`w-full lg:w-80 bg-white shadow-xl transition-all duration-300 ${isMobile && !isMenuOpen ? "hidden" : "block"}`}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center mb-6 mt-4">
            <div className="relative w-24 h-24 mb-2">
              <Suspense fallback={<div>Loading...</div>}>
              <Image
                src={placeInter}
                alt="fff"
                fill
                className="rounded-full object-cover border-2 border-gray-200"
              />
              </Suspense>
            </div>
            <h3 className="text-lg font-medium text-gray-800">{globalName}</h3>

          <ArabicToggle />

            {menuData.userInfo.hasTraining && (
              <Link className="w-full" href="/dashboard/dashStudent" onClick={() => makeCookies(menuData.userInfo.title)}>
              <Button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white w-full">
                <Zap className="h-4 w-4 ml-2" />
                تدرب بذكاء
              </Button>
              </Link>
            )}
          </div>

          <div className="space-y-1">
            {menuData.menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.link} 
                onClick={() => makeCookies(item.title)}
                className={`flex items-center justify-between p-3 rounded-md ${nameGetLink === item.title ? "bg-gray-100 hover:bg-gray-100" : ""} hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-center">
                  <div className="text-purple-800 ml-3">{iconMap[item.icon]}</div>
                  <span className="text-gray-700">{item.title}</span>
                </div>

                {/* {item.badge && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{item.badge}</span>
                )} */}

                <ChevronRight className="h-4 w-4 transform rotate-180 text-gray-400" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
