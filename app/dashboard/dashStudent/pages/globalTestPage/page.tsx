"use client"
import React, { useState, Suspense } from 'react';
import Image from "next/image"
import Panne from "@/public/pannDash.jpg"
import data from './data.json';
import { LockIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSelector, useDispatch } from 'react-redux';
import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
import { changeTitleGlobal } from '@/features/auth/authSlice';
import Link from "next/link"

// import { DoorClosedIcon as LockClosedIcon } from 'lucide-react';
// import { TrainerBanner } from './components/TrainerBanner';
// import { LearningInfo } from './components/LearningInfo';
// import { SubjectGrid } from './components/SubjectGrid';
// import { SubscriptionInfo } from './components/SubscriptionInfo';




function App() {
const [isSubsEvluate] = useState(false);
  const dispatch = useDispatch();


  const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);


  const makeCookies = (name: string) => {
   
    dispatch(changeTitleGlobal(name));
  
  }

  return (
    <DashStudent>
    <div className="container mx-auto flex flex-col gap-4 px-4 py-8 max-w-5xl">
 <div className="col-span-1 rounded-lg hover:shadow-lg hover:shadow-pink-600  md:col-span-2 lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className='md:flex md:justify-between gap-12 md:flex-row-reverse'>
                  <Suspense fallback={<div>Loading...</div>}>
               <Image
               src={Panne}
               alt="Be with school partnership image"
               className='hidden  md:block'
               width={400}
               height={600}
               />
                </Suspense>
              <div className="p-6 md:w-[40%]">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">{data.hero.title}</h3>
                <p className="text-gray-600 mb-4">{data.hero.description}</p>
                <Link className="w-full" href="/dashboard/dashStudent" onClick={() => makeCookies('تدرب بذكاء')}>
                <button className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors" type='button'>
                  {data.hero.buttonText}
                </button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        
      
    <div className="bg-white  rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{data.hero.title}</h2>
     
    <div className="bg-white rounded-lg  p-4 flex flex-col sm:flex-row-reverse  items-center justify-between" dir="rtl">
      <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
       
        <div className="flex flex-col  sm:flex-row gap-4 sm:gap-8">
        <div className="text-center flex flex-col justify-center items-center sm:text-right">
            <h3 className="text-purple-800 font-bold text-lg">ترتيبك</h3>
            <p className="text-gray-700">{currentTitle === "قدرات" ? data.evluateOne.rank : data.evluateTwo.rank}</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center sm:text-right">
            <h3 className="text-purple-800 font-bold text-lg">نقاطك</h3>
            <p className="text-gray-700">{currentTitle === "قدرات" ? data.evluateOne.points : data.evluateTwo.points}</p>
          </div>
         
          <div className="text-center flex flex-col justify-center items-center sm:text-right">
            <h3 className="text-purple-800 font-bold text-lg">التقييم</h3>
            <p className="text-gray-700">{isSubsEvluate ? data.evluateOne.rating : "للمشتركين"}</p>
          </div>
          <div className="bg-gray-200 rounded-full p-3 flex flex-row-reverse items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
            aria-hidden="true">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900 transition-colors" type='button'>
          التحليلات
        </button>
        <h2 className="text-orange-500 font-bold text-xl">{currentTitle === "قدرات" ? data.hero.typeSctionOne : data.hero.typeSctionTwo}</h2>
      </div>
    </div>
{/*         
        <SubjectGrid subjects={data.subjects} />
        
        <SubscriptionInfo 
          title={data.subscription.title} 
          expiryText={data.subscription.expiryText} 
          expiryDate={data.subscription.expiryDate} 
        /> */}
      
<div className={currentTitle === "قدرات" ? "flex flex-col mt-8  md:flex-row gap-3" : "flex flex-col mt-8 md:flex-wrap  lg:flex-row gap-4"}>
  {currentTitle === "قدرات" ?
  <>
{data.resultCardsOne.map((resultCard, index) => (
      <Card key={index} className="overflow-hidden w-full gap-2 py-2 shadow-sm">
      <CardHeader className="bg-white p-4 ">
        <h2 className="text-md font-semibold text-gray-800">{resultCard.title}</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 text-center">
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">الأسئلة</h3>
            <p className="text-md font-bold mt-1">{resultCard.questions}</p>
          </div>
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">الإجابات</h3>
            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="text-md font-bold text-green-500">{resultCard.correctAnswers}</span>
              <span className="text-gray-300">|</span>
              <span className="text-md font-bold text-red-500">{resultCard.incorrectAnswers}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">النسبة</h3>
            <div className="flex justify-center items-center gap-1 mt-1">
              <span className="text-md  font-normal  text-gray-700">للمشتركين</span>
              {resultCard.forParticipants && <LockIcon className="h-4 w-4 text-gray-500" />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    ))}
    </> : 
    <>
{data.resultCardsTwo.map((resultCard, index) => (
      <Card key={index} className="overflow-hidden w-full  lg:w-[49%]  gap-2 py-2 shadow-sm">
      <CardHeader className="bg-white p-4 ">
        <h2 className="text-md font-semibold text-gray-800">{resultCard.title}</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 text-center">
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">الأسئلة</h3>
            <p className="text-md font-bold mt-1">{resultCard.questions}</p>
          </div>
          <div className="p-4 border-r border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">الإجابات</h3>
            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="text-md font-bold text-green-500">{resultCard.correctAnswers}</span>
              <span className="text-gray-300">|</span>
              <span className="text-md font-bold text-red-500">{resultCard.incorrectAnswers}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">النسبة</h3>
            <div className="flex justify-center items-center gap-1 mt-1">
              <span className="text-md  font-normal  text-gray-700">للمشتركين</span>
              {resultCard.forParticipants && <LockIcon className="h-4 w-4 text-gray-500" />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    ))}
</>
  }
    </div>
     </div>

     <div className="w-full  bg-white rounded-xl shadow-xl p-6 rtl">
      <div className="flex  flex-col items-start">
        <h2 className="text-purple-700 font-semibold text-lg mb-2">{data.smallCard.title}</h2>
        <p className="text-gray-800 text-sm">ينتهي اشتراكك بتاريخ {data.smallCard.expiryDate}</p>
      </div>
    </div>
     </div>
     </DashStudent>
  );
}

export default App;