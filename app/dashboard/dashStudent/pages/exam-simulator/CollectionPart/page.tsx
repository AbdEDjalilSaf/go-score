// "use client"

// import { useState, useEffect } from "react"
// import dataColllection from "./data.json"
// import QuizSections from "./quiz-sections"
// import { CheckIcon } from "./icons"

// interface Subcategory {
//   id: string
//   name: string
// }

// interface Subject {
//   id: string
//   name: string
//   selected: boolean
//   available: boolean
//   status?: string
//   subcategories: Subcategory[]
// }

// interface TestInfo {
//   title: string
//   expectedTime: string
//   numberOfQuestions: number
//   startButtonText: string
//   labels: {
//     expectedTime: string
//     numberOfQuestions: string
//   }
// }

// interface AppData {
//   remainingAttempts: number
//   subjects: Subject[]
//   testInfo: TestInfo
// }

// export default function SubjectSelection() {
//   const [data, setData] = useState<AppData | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // In a real app, you would fetch from your JSON file
//     // For this example, we'll use the data directly
//     const mockData: AppData = {
//       remainingAttempts: 3,
//       subjects: [
//         {
//           id: "biology",
//           name: "علم الأحياء",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "bio1", name: "أحياء 1" },
//             { id: "bio2", name: "أحياء 2" },
//             { id: "bio3", name: "أحياء 3" },
//             { id: "bio4", name: "أحياء 4" },
//             { id: "env", name: "علم البيئة" },
//           ],
//         },
//         {
//           id: "math",
//           name: "الرياضيات",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "math1", name: "رياضيات 1" },
//             { id: "math2", name: "رياضيات 2" },
//             { id: "math3", name: "رياضيات 3" },
//           ],
//         },
//         {
//           id: "chemistry",
//           name: "الكيمياء",
//           selected: true,
//           available: true,
//           status: "كامل التنسيق",
//           subcategories: [
//             { id: "chem1", name: "كيمياء 1" },
//             { id: "chem2", name: "كيمياء 2" },
//             { id: "chem3", name: "كيمياء 3" },
//             { id: "chem4", name: "كيمياء 4" },
//             { id: "chem5", name: "كيمياء 5" },
//           ],
//         },
//         {
//           id: "physics",
//           name: "الفيزياء",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "phys1", name: "الفيزياء (1)" },
//             { id: "phys2", name: "الفيزياء (2)" },
//             { id: "phys3", name: "فيزياء 3" },
//           ],
//         },
//       ],
//       testInfo: {
//         title: "معلومات الاختبار",
//         expectedTime: "02:30 ساعة",
//         numberOfQuestions: 120,
//         startButtonText: "ابدأ الاختبار",
//         labels: {
//           expectedTime: "الزمن المتوقع",
//           numberOfQuestions: "عدد الأسئلة",
//         },
//       },
//     }

//     setData(mockData)
//     setLoading(false)
//   }, [])

//   const toggleSubject = (id: string) => {
//     if (!data) return

//     const updatedSubjects = data.subjects.map((subject) => ({
//       ...subject,
//       selected: subject.id === id ? !subject.selected : subject.selected,
//     }))

//     setData({
//       ...data,
//       subjects: updatedSubjects,
//     })
//   }

//   const handleStartTest = () => {
//     alert("بدء الاختبار!")
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     )
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">خطأ في تحميل البيانات</div>
//       </div>
//     )
//   }

//   return (
//     <div className=" p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Remaining Attempts */}
//         <div className="text-center mb-4">
//           <p className="text-red-500 font-medium" dir="rtl">
//             باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </p>
//         </div>

//         {/* Subject Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

//    {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-4"> */}
//    {data.subjects.map((subject) => (
//         <QuizSections
//           title={{subject.name}}
//           key={subject.id}
//           categories={dataColllection.quantitativeSection.categories.map((cat: any) => ({
//             ...cat,
//             text: cat.text ?? cat.name ?? "",
//             selected: cat.selected ?? false,
//           }))}
//           id={dataColllection.quantitativeSection.id}
//         />
//    ))}
//         {/* <QuizSections
//           title={dataColllection.verbalSection.title}
//           categories={dataColllection.verbalSection.categories.map((cat: any) => ({
//             ...cat,
//             text: cat.text ?? cat.name ?? "",
//             selected: cat.selected ?? false,
//           }))}
//           id={dataColllection.verbalSection.id}
//         /> */}
//              {/* <QuizSections
//           title={dataColllection.quantitativeSection.title}
//           categories={dataColllection.quantitativeSection.categories.map((cat: any) => ({
//             ...cat,
//             text: cat.text ?? cat.name ?? "",
//             selected: cat.selected ?? false,
//           }))}
//           id={dataColllection.quantitativeSection.id}
//         />
//         <QuizSections
//           title={dataColllection.verbalSection.title}
//           categories={dataColllection.verbalSection.categories.map((cat: any) => ({
//             ...cat,
//             text: cat.text ?? cat.name ?? "",
//             selected: cat.selected ?? false,
//           }))}
//           id={dataColllection.verbalSection.id}
//         /> */}
//       {/* </div> */}


//           {/* {data.subjects.map((subject) => (
//             <div key={subject.id} className="bg-white rounded-lg overflow-hidden shadow-sm"> */}
//               {/* Subject Header */}
//               {/* <div className="flex items-center justify-between p-3 bg-gray-100">
//                 <label className="inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
//                     checked={subject.selected}
//                     onChange={() => toggleSubject(subject.id)}
//                   />
//                   {subject.selected && (
//                     <span className="absolute pointer-events-none">
//                       <CheckIcon className="w-4 h-4 text-green-500" />
//                     </span>
//                   )}
//                 </label>
//                 <h3 className="text-lg font-medium text-orange-500" dir="rtl">
//                   {subject.name}
//                 </h3>
//               </div> */}

//               {/* Subcategories */}
//               {/* <div className="p-3">
//                 <div className="flex flex-wrap gap-2 justify-end">
//                   {subject.subcategories.map((subcategory) => (
//                     <button
//                       key={subcategory.id}
//                       className={`px-4 py-2 rounded-md text-sm font-medium ${
//                         subject.selected ? "bg-purple-700 text-white" : "bg-white border border-gray-200 text-gray-700"
//                       }`}
//                       dir="rtl"
//                     >
//                       {subcategory.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))} */}



//         </div>

//         {/* Test Information */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
//           <h2 className="text-xl font-bold text-orange-500 text-center mb-4" dir="rtl">
//             {data.testInfo.title}
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
//             {/* Number of Questions */}
//             <div className="text-center" dir="rtl">
//               <h3 className="text-sm font-semibold text-purple-700">{data.testInfo.labels.numberOfQuestions}</h3>
//               <p className="text-gray-600">{data.testInfo.numberOfQuestions}</p>
//             </div>

//             {/* Expected Time */}
//             <div className="text-center" dir="rtl">
//               <h3 className="text-sm font-semibold text-purple-700">{data.testInfo.labels.expectedTime}</h3>
//               <p className="text-gray-600">{data.testInfo.expectedTime}</p>
//             </div>

//             {/* Subject Availability */}
//             {data.subjects.map((subject) => (
//               <div key={subject.id} className="text-center" dir="rtl">
//                 <h3 className="text-sm font-semibold text-purple-700">{subject.name}</h3>
//                 <p className="text-gray-600">{subject.available ? subject.status : "لا يوجد"}</p>
//               </div>
//             ))}
//           </div>

//           {/* Start Test Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={handleStartTest}
//               className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-md transition-colors duration-200"
//               dir="rtl"
//             >
//               {data.testInfo.startButtonText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import QuizSections from "./quiz-sections"

// interface Subcategory {
//   id: string
//   name: string
// }

// interface Subject {
//   id: string
//   name: string
//   selected: boolean
//   available: boolean
//   status?: string
//   subcategories: Subcategory[]
// }

// interface TestInfo {
//   title: string
//   expectedTime: string
//   numberOfQuestions: number
//   startButtonText: string
//   labels: {
//     expectedTime: string
//     numberOfQuestions: string
//   }
// }

// interface AppData {
//   remainingAttempts: number
//   subjects: Subject[]
//   testInfo: TestInfo
// }

// export default function SubjectSelection() {
//   const [data, setData] = useState<AppData | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Load data from JSON structure
//     const mockData: AppData = {
//       remainingAttempts: 3,
//       subjects: [
//         {
//           id: "biology",
//           name: "علم الأحياء",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "bio1", name: "أحياء 1" },
//             { id: "bio2", name: "أحياء 2" },
//             { id: "bio3", name: "أحياء 3" },
//             { id: "bio4", name: "أحياء 4" },
//             { id: "env", name: "علم البيئة" },
//           ],
//         },
//         {
//           id: "math",
//           name: "الرياضيات",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "math1", name: "رياضيات 1" },
//             { id: "math2", name: "رياضيات 2" },
//             { id: "math3", name: "رياضيات 3" },
//           ],
//         },
//         {
//           id: "chemistry",
//           name: "الكيمياء",
//           selected: true,
//           available: true,
//           status: "كامل التنسيق",
//           subcategories: [
//             { id: "chem1", name: "كيمياء 1" },
//             { id: "chem2", name: "كيمياء 2" },
//             { id: "chem3", name: "كيمياء 3" },
//             { id: "chem4", name: "كيمياء 4" },
//             { id: "chem5", name: "كيمياء 5" },
//           ],
//         },
//         {
//           id: "physics",
//           name: "الفيزياء",
//           selected: false,
//           available: false,
//           subcategories: [
//             { id: "phys1", name: "الفيزياء(1)" },
//             { id: "phys2", name: "الفيزياء (2)" },
//             { id: "phys3", name: "فيزياء (3)" },
//           ],
//         },
//       ],
//       testInfo: {
//         title: "معلومات الاختبار",
//         expectedTime: "02:30 ساعة",
//         numberOfQuestions: 120,
//         startButtonText: "ابدأ الاختبار",
//         labels: {
//           expectedTime: "الزمن المتوقع",
//           numberOfQuestions: "عدد الأسئلة",
//         },
//       },
//     }

//     setData(mockData)
//     setLoading(false)
//   }, [])

//   const handleStartTest = () => {
//     alert("بدء الاختبار!")
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     )
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-red-500">خطأ في تحميل البيانات</div>
//       </div>
//     )
//   }

//   return (
//     <div className=" p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Remaining Attempts */}
//         <div className="text-center mb-4">
//           <p className="text-pink-600 font-medium" dir="rtl">
//             باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
//           </p>
//         </div>

//         {/* Subject Grid */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           {/* {data.subjects.map((subject) => ( */}
//             <QuizSections
//               // key={subject.id}
//               // title={subject.name}
//               // id={subject.id}
//               // categories={subject.subcategories.map((subcat) => ({
//               //   id: subcat.id,
//               //   text: subcat.name,
//               //   selected: subject.selected,
//               // }))}
//             />
//           {/* ))} */}
//         </div>


//         {/* <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
//           <h2 className="text-xl font-bold text-orange-500 text-center mb-4" dir="rtl">
//             {data.testInfo.title}
//           </h2>

//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
//             <div className="text-center" dir="rtl">
//               <h3 className="text-sm font-semibold text-purple-700">{data.testInfo.labels.numberOfQuestions}</h3>
//               <p className="text-gray-600">{data.testInfo.numberOfQuestions}</p>
//             </div>

//             <div className="text-center" dir="rtl">
//               <h3 className="text-sm font-semibold text-purple-700">{data.testInfo.labels.expectedTime}</h3>
//               <p className="text-gray-600">{data.testInfo.expectedTime}</p>
//             </div>

//             {data.subjects.map((subject) => (
//               <div key={subject.id} className="text-center" dir="rtl">
//                 <h3 className="text-sm font-semibold text-purple-700">{subject.name}</h3>
//                 <p className="text-gray-600">{subject.available ? subject.status : "لا يوجد"}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={handleStartTest}
//               className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-md transition-colors duration-200"
//               dir="rtl"
//             >
//               {data.testInfo.startButtonText}
//             </button>
//           </div>
//         </div> */}


//       </div>
//     </div>
//   )
// }







"use client"

import { useState, useEffect } from "react"
import QuizSections from "./quiz-sections"

interface Subcategory {
  id: string
  name: string
}

interface Subject {
  id: string
  name: string
  selected: boolean
  available: boolean
  status?: string
  subcategories: Subcategory[]
}

interface TestInfo {
  title: string
  expectedTime: string
  numberOfQuestions: number
  startButtonText: string
  labels: {
    expectedTime: string
    numberOfQuestions: string
  }
}

interface AppData {
  remainingAttempts: number
  subjects: Subject[]
  testInfo: TestInfo
}

export default function SubjectSelection() {
  const [data, setData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockData: AppData = {
      remainingAttempts: 3,
      subjects: [
        {
          id: "biology",
          name: "علم الأحياء",
          selected: false,
          available: false,
          subcategories: [
            { id: "bio1", name: "أحياء 1" },
            { id: "bio2", name: "أحياء 2" },
            { id: "bio3", name: "أحياء 3" },
            { id: "bio4", name: "أحياء 4" },
            { id: "env", name: "علم البيئة" },
          ],
        },
        {
          id: "math",
          name: "الرياضيات",
          selected: false,
          available: false,
          subcategories: [
            { id: "math1", name: "رياضيات 1" },
            { id: "math2", name: "رياضيات 2" },
            { id: "math3", name: "رياضيات 3" },
          ],
        },
        {
          id: "chemistry",
          name: "الكيمياء",
          selected: true,
          available: true,
          status: "كامل التنسيق",
          subcategories: [
            { id: "chem1", name: "كيمياء 1" },
            { id: "chem2", name: "كيمياء 2" },
            { id: "chem3", name: "كيمياء 3" },
            { id: "chem4", name: "كيمياء 4" },
            { id: "chem5", name: "كيمياء 5" },
          ],
        },
        {
          id: "physics",
          name: "الفيزياء",
          selected: false,
          available: false,
          subcategories: [
            { id: "phys1", name: "الفيزياء(1)" },
            { id: "phys2", name: "الفيزياء (2)" },
            { id: "phys3", name: "فيزياء (3)" },
          ],
        },
      ],
      testInfo: {
        title: "معلومات الاختبار",
        expectedTime: "02:30 ساعة",
        numberOfQuestions: 120,
        startButtonText: "ابدأ الاختبار",
        labels: {
          expectedTime: "الزمن المتوقع",
          numberOfQuestions: "عدد الأسئلة",
        },
      },
    }

    setData(mockData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">خطأ في تحميل البيانات</div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-pink-600 font-medium" dir="rtl">
            باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <QuizSections />
        </div>
      </div>
    </div>
  )
}
