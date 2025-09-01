"use client"
import React, { Suspense, useState, useMemo } from 'react';
import Image from "next/image"
import Panne from "@/public/teacher.jpg"
import data from './data.json';
import { Users, Zap, Hourglass } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux';
import { changeTitleGlobal } from '@/features/auth/authSlice';
import DashTeacher from '../../dashTeacher';

// import { DoorClosedIcon as LockClosedIcon } from 'lucide-react';
// import { TrainerBanner } from './components/TrainerBanner';
// import { LearningInfo } from './components/LearningInfo';
// import { SubjectGrid } from './components/SubjectGrid';
// import { SubscriptionInfo } from './components/SubscriptionInfo';




function App() {
  // const [currentDate, setCurrentDate] = useState(new Date(2023, 10, 9)) // November 9, 2023
  // const [selectedDate, setSelectedDate] = useState(9)

  // Generate calendar data
  // const calendarData = useMemo(() => {
  //   const year = currentDate.getFullYear()
  //   const month = currentDate.getMonth()

  //   // Get first day of month and number of days
  //   const firstDay = new Date(year, month, 1)
  //   const lastDay = new Date(year, month + 1, 0)
  //   const daysInMonth = lastDay.getDate()
  //   const startingDayOfWeek = firstDay.getDay()

  //   // Get previous month's last few days
  //   const prevMonth = new Date(year, month - 1, 0)
  //   const daysInPrevMonth = prevMonth.getDate()

  //   const dates = []

  //   // Add previous month's trailing days
  //   const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 // Adjust for Monday start
  //   for (let i = startDay - 1; i >= 0; i--) {
  //     dates.push({
  //       date: daysInPrevMonth - i,
  //       isCurrentMonth: false,
  //       isSelected: false,
  //     })
  //   }

  //   // Add current month's days
  //   for (let day = 1; day <= daysInMonth; day++) {
  //     dates.push({
  //       date: day,
  //       isCurrentMonth: true,
  //       isSelected: day === selectedDate,
  //     })
  //   }

  //   // Add next month's leading days to fill the grid
  //   const remainingCells = 42 - dates.length // 6 rows × 7 days
  //   for (let day = 1; day <= remainingCells; day++) {
  //     dates.push({
  //       date: day,
  //       isCurrentMonth: false,
  //       isSelected: false,
  //     })
  //   }

  //   return {
  //     monthName: firstDay.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  //     dates: dates.slice(0, 35), // Show 5 rows
  //   }
  // }, [currentDate, selectedDate])

  // Program plan data
  const programPlan = {
    title: "نظام الدروس",
    items: [
      {
        id: 1,
        type: "Lesson",
        duration: "40 min",
        icon: "📚",
        status: "scheduled",
      },
      {
        id: 2,
        type: "Test",
        duration: "15 min",
        details: "10 questions",
        icon: "📚",
        status: "scheduled",
      },
      {
        id: 3,
        type: "Homework",
        duration: "",
        details: "Nothing is here yet",
        icon: "📚",
        status: "empty",
      },
      {
        id: 4,
        type: "Lesson",
        duration: "25 min",
        icon: "📚",
        status: "scheduled",
      },
    ],
  }

  // Time slots data
  const timeSlots = [
    { time: "11:00", duration: 2 },
    { time: "14:00", duration: 1 },
  ]

  // const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // const navigateMonth = (direction: "prev" | "next") => {
  //   setCurrentDate((prev) => {
  //     const newDate = new Date(prev)
  //     if (direction === "prev") {
  //       newDate.setMonth(prev.getMonth() - 1)
  //     } else {
  //       newDate.setMonth(prev.getMonth() + 1)
  //     }
  //     return newDate
  //   })
  // }

  // const handleDateSelect = (date: number, isCurrentMonth: boolean) => {
  //   if (isCurrentMonth) {
  //     setSelectedDate(date)
  //   }
  // }

  const handleEditProgram = (id: number) => {
    console.log(`Edit program item ${id}`)
  }

  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date()); // Use current date
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  // Generate calendar data (Gregorian)
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Get previous month's last few days
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const dates = [];

    // Add previous month's trailing days
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false
      });
    }
    dates.reverse(); // To maintain proper order

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
      
      dates.push({
        date: day,
        isCurrentMonth: true,
        isSelected: day === selectedDate,
        isToday: isToday
      });
    }

    // Add next month's leading days to fill the grid
    const remainingCells = 42 - dates.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      dates.push({
        date: day,
        isCurrentMonth: false,
        isSelected: false,
        isToday: false
      });
    }

    // Arabic month names for Gregorian calendar
    const arabicMonths = [
      "جانفي", "فيفري", "مارس", "افريل", "ماي", "جوان",
      "جويلية", "اوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    return {
      monthName: firstDay.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      monthNameArabic: `${arabicMonths[month]} ${year}`,
      dates: dates.slice(0, 35), // Show 5 rows
    };
  }, [currentDate, selectedDate]);

  // Gregorian days starting with Sunday
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const arabicDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (date: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(date);
      // Update the currentDate to keep year/month context
      const newDate = new Date(currentDate);
      newDate.setDate(date);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.getDate());
  };

  const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);


  const makeCookies = (name: string) => {
   
    dispatch(changeTitleGlobal(name));
  
  }

  return (
    <DashTeacher>
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
                {/* <Link className="w-full" href="/dashboard/dashStudent" onClick={() => makeCookies('تدرب بذكاء')}>
                <button className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
                  {data.hero.buttonText}
                </button>
                </Link> */}
              </div>
              </div>
            </div>
          </div>
        
    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-4  gap-4">
                     
                      <div className="shadow-md shadow-purple-600 rounded-2xl p-6">
                        <div className="flex  items-center flex-row-reverse gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600"><Hourglass /></span>
                          </div>
                          <div className='flex flex-col gap-1 justify-center items-center md:items-end'>
                            <div className="text-2xl text-center font-bold text-gray-900">{data.stats.completedCourses}</div>
                            <div className="text-sm text-center text-gray-600"> التحميلات المتبقية للكورسات</div>
                          </div>
                        </div>
                      </div>

                      <div className="shadow-md shadow-yellow-600 rounded-2xl p-6">
                        <div className="flex  items-center flex-row-reverse gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600"><Zap /></span>
                          </div>
                          <div className='flex flex-col gap-1 justify-center items-center md:items-end'>
                            <div className="text-2xl text-center font-bold text-gray-900">{data.stats.productivity}</div>
                            <div className="text-sm text-center text-gray-600">الانتاجية</div>
                          </div>
                        </div>
                      </div>

                       <div className="shadow-md shadow-blue-600 rounded-2xl p-6">
                        <div className="flex  items-center flex-row-reverse gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600"><Users /></span>
                          </div>
                          <div className='flex flex-col gap-1 justify-center items-center md:items-end'>
                            <div className="text-2xl text-center font-bold text-gray-900">{data.stats.totalStudents}</div>
                            <div className="text-sm text-center text-gray-600">مجموع الطلاب</div>
                          </div>
                        </div>
                      </div>
                    </div>

<div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-8">

          {/* Program Plan Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {/* Program Plan Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{programPlan.title}</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Navigate program" type="button">
                <svg className="w-5 h-5 transform rotate-180  text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Program Items */}
            <div className="space-y-4">
              {programPlan.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.type}</h3>
                    <div className="text-sm">
                      {item.duration && <span className="text-gray-600">{item.duration}</span>}
                      {item.details && (
                        <span
                          className={`
                            ${item.status === "empty" ? "text-red-500" : "text-gray-600"}
                            ${item.duration ? " / " : ""}
                          `}
                        >
                          {item.details}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditProgram(item.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    aria-label={`Edit ${item.type}`}
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Item Button */}
            <button className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2" type="button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">Add new item</span>
            </button>
          </div>
       {/* Gregorian Calendar Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{calendarData.monthNameArabic}</h2>
              <h3 className="text-sm text-gray-500">{calendarData.monthName}</h3>
              <button 
                onClick={goToToday}
                className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                type="button"
              >
                الذهاب إلى اليوم
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="الشهر السابق"
                type="button"
              >
                <svg className="w-5 h-5 text-gray-600 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="الشهر التالي"
                type="button"
              >
                <svg className="w-5 h-5 text-gray-600 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mb-6">
            {/* Days of Week - Arabic */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {arabicDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Dates */}
            <div className="grid grid-cols-7 gap-1">
              {calendarData.dates.map((dateObj, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(dateObj.date, dateObj.isCurrentMonth)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                    ${
                      dateObj.isSelected
                        ? "bg-blue-600 text-white font-semibold shadow-md"
                        : dateObj.isToday
                          ? "bg-blue-100 text-blue-800 font-semibold"
                          : dateObj.isCurrentMonth
                            ? "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                            : "text-gray-400 cursor-default"
                    }
                    ${dateObj.isToday && !dateObj.isSelected ? "border-2 border-blue-500" : ""}
                  `}
                  disabled={!dateObj.isCurrentMonth}
                  type="button"
                  >
                  {dateObj.date}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Date Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">التاريخ المحدد:</span>{" "}
              {new Intl.DateTimeFormat('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                calendar: 'gregory' // Explicitly use Gregorian calendar
              }).format(new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                selectedDate
              ))}
            </p>
          </div>
        </div>
      </div>
        

        {/* Mobile-only helper text */}
        <div className="lg:hidden mt-8">
          <div className="text-center text-sm text-gray-500">
            <p>Use navigation arrows to browse months and manage your program plan</p>
          </div>
        </div>

     <div className="w-full  bg-white rounded-xl shadow-xl p-6 rtl">
      <div className="flex  flex-col items-start">
        <h2 className="text-purple-700 font-semibold text-lg mb-2">{data.smallCard.title}</h2>
        <p className="text-gray-800 text-sm">ينتهي اشتراكك بتاريخ {data.smallCard.expiryDate}</p>
      </div>
    </div>
     </div>
     </DashTeacher>
  );
}

export default App;