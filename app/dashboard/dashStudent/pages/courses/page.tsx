// "use client"

// import { useState, useMemo } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import Box from "@/public/box.png"
// import data from "./data.json"

// type Course = {
//   id: number
//   name: string
//   videos: number
//   price: number
//   sales: number
//   earning: number
//   category: string
//   color: string
// }

// type ViewMode = "list" | "grid"
// type SortField = "name" | "price" | "sales" | "earning" | "videos"

// export default function CourseDashboard() {
//   const [selectedCategory, setSelectedCategory] = useState("All Categories")
//   const [sortBy, setSortBy] = useState<SortField>("name")
//   const [viewMode, setViewMode] = useState<ViewMode>("list")
//   const [currentPage, setCurrentPage] = useState(2)

//   // Filter and sort courses
//   const filteredAndSortedCourses = useMemo(() => {
//     let filtered = data.courses

//     // Filter by category
//     if (selectedCategory !== "All Categories") {
//       filtered = filtered.filter((course) => course.category === selectedCategory)
//     }

//     // Sort courses
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "name":
//           return a.name.localeCompare(b.name)
//         case "price":
//           return b.price - a.price
//         case "sales":
//           return b.sales - a.sales
//         case "earning":
//           return b.earning - a.earning
//         case "videos":
//           return b.videos - a.videos
//         default:
//           return 0
//       }
//     })

//     return filtered
//   }, [selectedCategory, sortBy])

//   const handleAddNewCourse = () => {
//     console.log("Add new course")
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//   }

//   const renderPagination = () => {
//     const pages = []
//     const totalPages = data.pagination.totalPages

//     // Previous button
//     pages.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>,
//     )

//     // Page numbers
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//             i === currentPage ? "bg-purple-700 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//           }`}
//         >
//           {i}
//         </button>,
//       )
//     }

//     // Next button
//     pages.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>,
//     )

//     return pages
//   }

//   return (
//     // <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//     //   <div className="max-w-7xl mx-auto">
//         // <ro className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-hidden">
//         {/* Header */}
//           <div>
//           <div className="py-6 border-b border-gray-200">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-4">
//               {/* Left side controls */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* Filter dropdown */}
//                 {/* <div className="relative">
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   >
//                     {data.categories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div> */}

//                 {/* Sort dropdown */}
//                 {/* <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-600">Sort by:</span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value as SortField)}
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   >
//                     {data.sortOptions.map((option) => (
//                       <option key={option} value={option.toLowerCase()}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute ml-16 flex items-center px-2 pointer-events-none">
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Right side controls */}

//               <div className="flex items-center gap-4">

//                 {/* <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 rounded-md transition-colors ${
//                       viewMode === "list" ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 6h16M4 10h16M4 14h16M4 18h16"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 rounded-md transition-colors ${
//                       viewMode === "grid" ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
//                     }`}
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
//                       />
//                     </svg>
//                   </button>
//                 </div> */}

//                 {/* Add new course button */}
//                 <Link href="/dashboard/dashTeacher/pages/courses/addNewCourse">
//                 <button
//                   onClick={handleAddNewCourse}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   <span className="hidden sm:inline">اضافة كورس جديد</span>
//                   <span className="sm:hidden">اضافة</span>
//                 </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Course List/Grid */}
//           <div className="py-6 px-0">
//             {viewMode === "list" ? (
//               <div className="overflow-x-auto">
//                 {/* Table Header - Hidden on mobile */}
//                 <div className="hidden md:grid md:grid-cols-6 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-500">
//                   <div>اسم الكورس</div>
//                   <div className="text-center">الفئة</div>
//                   <div className="text-center">الفئة الفرعية</div>
//                   <div className="text-center">الوصف</div>
//                   {/* <div className="text-center">Earning</div> */}
//                   <div></div>
//                 </div>

//                 {/* Course Rows */}
//                 <div className="space-y-4 mt-4">
//                     {  filteredAndSortedCourses.length != 0 ? 
//                   filteredAndSortedCourses.map((course) => (
//                     <div
//                       key={course.id}
//                       className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-4 hover:bg-purple-100 rounded-lg transition-colors border border-transparent hover:border-purple-100"
//                     >
//                       {/* Course Name */}
//                       <div className="flex items-center gap-3">
//                         {/* <div
//                           className={`w-10 h-10 ${course.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
//                         >
//                           <span className="text-white font-semibold text-sm">{course.name.charAt(0)}</span>
//                         </div> */}
//                         <div>
//                           <h3 className="font-medium text-gray-900">{course.name}</h3>
//                           <div className="md:hidden text-sm text-gray-500 mt-1">
//                             {course.videos} videos • ${course.price} • {course.sales} sales •
//                             <span className="text-purple-700 font-semibold"> ${course.earning}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Video Count */}
//                       <div className="hidden md:block text-center text-gray-600">{course.videos}</div>

//                       {/* Price */}
//                       <div className="hidden md:block text-center text-gray-900 font-medium">${course.price}</div>

//                       {/* Sales */}
//                       <div className="hidden md:block text-center text-gray-600">{course.sales}</div>

//                       {/* Earning */}
//                       {/* <div className="hidden md:block text-center text-purple-700 font-semibold">${course.earning}</div> */}

//                       {/* Actions */}
//                       <div className="flex items-center   justify-end">
//                         <button className="p-2 text-gray-400 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   ))  : (
//                     <div className="text-center flex flex-col gap-3 justify-center items-center text-gray-500 py-6">
//                         <Image src={Box} className="w-[25%] h-[25%]" alt="No courses found" />
//                       <p className="text-lg">No courses found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* Grid View */
//               <div className={`grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
//                 {  filteredAndSortedCourses.length != 0 ?
//                    filteredAndSortedCourses.map((course) => (
//                   <div
//                     key={course.id}
//                     className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200"
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div
//                         className={`w-12 h-12 ${course.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
//                       >
//                         <span className="text-white font-semibold">{course.name.charAt(0)}</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-medium text-gray-900 truncate">{course.name}</h3>
//                         <p className="text-sm text-gray-500">{course.videos} videos</p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Price:</span>
//                         <span className="font-medium">${course.price}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Sales:</span>
//                         <span>{course.sales}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Earning:</span>
//                         <span className="font-semibold text-purple-700">${course.earning}</span>
//                       </div>
//                     </div>

//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <button className="w-full text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 )) : (
//                     <div className="text-center flex flex-col gap-3 justify-center  items-center text-gray-500 py-6">
//                         <Image src={Box} className=" " alt="No courses found" />
//                       <p className="text-lg">No courses found</p>
//                     </div>
//                   )}
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//          { filteredAndSortedCourses.length != 0 ?
//           <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-center gap-2">{renderPagination()}</div>
//           </div> : ""}
//           </div> 
//         {/* </div> */}
//        </div>
//     </div>
//   )
// }
















// "use client"

// import { useState, Suspense, useMemo } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import Box from "@/public/box.png"
// import MetricCard from "./components/MetricCard"
// import data from "./data.json"
// import DashStudent from "../../dashStudent"

// type Course = {
//   id: number
//   name: string
//   videos: number
//   price: number
//   sales: number
//   earning: number
//   category: string
//   color: string
// }

// type ViewMode = "list" | "grid"
// type SortField = "name" | "price" | "sales" | "earning" | "videos"

// export default function CourseDashboard() {
//   const [selectedCategory] = useState("All Categories")
//   const [sortBy] = useState<SortField>("name")
//   const [viewMode] = useState<ViewMode>("list")
//   const [currentPage, setCurrentPage] = useState(2)

//   // Filter and sort courses
//   const filteredAndSortedCourses = useMemo(() => {
//     let filtered = data.courses

//     // Filter by category
//     if (selectedCategory !== "All Categories") {
//       filtered = filtered.filter((course) => course.category === selectedCategory)
//     }

//     // Sort courses
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "name":
//           return a.name.localeCompare(b.name)
//         case "price":
//           return b.price - a.price
//         case "sales":
//           return b.sales - a.sales
//         case "earning":
//           return b.earning - a.earning
//         case "videos":
//           return b.videos - a.videos
//         default:
//           return 0
//       }
//     })

//     return filtered
//   }, [selectedCategory, sortBy])

//   const handleAddNewCourse = () => {
//     console.log("Add new course")
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//   }

//   const renderPagination = () => {
//     const pages = []
//     const totalPages = data.pagination.totalPages

//     // Previous button
//     pages.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         type="button">
//         <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>,
//     )

//     // Page numbers
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//             i === currentPage ? "bg-purple-700 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//           }`}
//           type="button">
//           {i}
//         </button>,
//       )
//     }

//     // Next button
//     pages.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         type="button">
//         <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>,
//     )

//     return pages
//   }

//   return (
//     <DashStudent>
//     <div className="overflow-hidden">
      
//      {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-5">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">قائمة الكورسات</h1>
//           </div>
//           <Link href="/dashboard/dashTeacher/pages/courses/addNewCourse">
//             <button
//               onClick={handleAddNewCourse}
//               className="bg-purple-700 hover:bg-purple-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-3xl font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
//               type="button">
//               <span className="text-lg">+</span>
//               اضافة كورس جديد
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="mb-4 grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-4">
//       <MetricCard metric={data.metrics[0]} />
//       <MetricCard metric={data.metrics[1]} />
//       <MetricCard metric={data.metrics[2]} />
//       {/* <MetricCard metric={data.metrics[3]} /> */}

//       </div>

//       {/* Course List/Grid */}
//       <div className="py-6 px-0">
//         {viewMode === "list" ? (
//           <div className="overflow-x-auto border border-gray-200 rounded-lg">
//             {/* Table Header - Hidden on mobile */}
//             <div className="hidden md:grid md:grid-cols-6 gap-4 p-3 px-6 border-b border-gray-200 text-sm font-medium text-gray-600 bg-gray-50">
//               <div className="py-3">اسم الكورس</div>
//               <div className="text-center py-3">الفئة</div>
//               <div className="text-center py-3">الفئة الفرعية</div>
//               <div className="text-center py-3">الوصف</div>
//               <div className="text-center py-3">الإجراءات</div>
//               <div></div>
//             </div>

//             {/* Course Rows */}
//             <div className="divide-y divide-gray-200 bg-white">
//               {filteredAndSortedCourses.length !== 0 ? (
//                 filteredAndSortedCourses.map((course, index) => (
//                   <div
//                     key={course.id}
//                     className={`grid grid-cols-1 md:grid-cols-6 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
//                     }`}
//                   >
//                     {/* Course Name */}
//                     <div className="flex items-center gap-3">
//                       <div>
//                         <h3 className="font-medium text-gray-900">{course.name}</h3>
//                         <div className="md:hidden text-sm text-gray-500 mt-1">
//                           {course.videos} videos • ${course.price} • {course.sales} sales •
//                           <span className="text-purple-700 font-semibold"> ${course.earning}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Video Count */}
//                     <div className="hidden md:block text-center text-gray-600 py-3 ">
//                       {course.videos}
//                     </div>

//                     {/* Price */}
//                     <div className="hidden md:block text-center text-gray-900 font-medium py-3 ">
//                       ${course.price}
//                     </div>

//                     {/* Sales */}
//                     <div className="hidden md:block text-center text-gray-600 py-3 ">
//                       {course.sales}
//                     </div>

//                     {/* Category */}
//                     <div className="hidden md:block text-center text-gray-600 py-3  ">
//                       {course.category}
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center justify-center py-3">
//                       <button className="p-2 text-gray-400 hover:text-purple-700 rounded-lg hover:bg-purple-50 transition-colors" type="button">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center flex flex-col gap-3 justify-center items-center text-gray-500 py-12 border-t border-gray-200">
//                   <Suspense fallback={<div>Loading...</div>}>
//                   <Image src={Box || "/placeholder.svg"} className="w-[25%] h-[25%]" alt="No courses found" />
//                   </Suspense>
//                   <p className="text-lg">No courses found</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           /* Grid View */
//           <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6`}>
//             {filteredAndSortedCourses.length !== 0 ? (
//               filteredAndSortedCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-3 mb-4">
//                     <div
//                       className={`w-12 h-12 ${course.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
//                     >
//                       <span className="text-white font-semibold">{course.name.charAt(0)}</span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{course.name}</h3>
//                       <p className="text-sm text-gray-500">{course.videos} videos</p>
//                     </div>
//                   </div>

//                   <div className="space-y-3 border-t border-gray-100 pt-4">
//                     <div className="flex justify-between text-sm py-2 border-b border-gray-100">
//                       <span className="text-gray-600">Price:</span>
//                       <span className="font-medium">${course.price}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-2 border-b border-gray-100">
//                       <span className="text-gray-600">Sales:</span>
//                       <span>{course.sales}</span>
//                     </div>
//                     <div className="flex justify-between text-sm py-2">
//                       <span className="text-gray-600">Earning:</span>
//                       <span className="font-semibold text-purple-700">${course.earning}</span>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <button className="w-full text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors" type="button">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center flex flex-col gap-3 justify-center items-center text-gray-500 py-6 col-span-full">
//                 <Suspense fallback={<div>Loading...</div>}>
//                 <Image src={Box || "/placeholder.svg"} className="" alt="No courses found" />
//                 </Suspense>
//                 <p className="text-lg">No courses found</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredAndSortedCourses.length !== 0 && (
//         <div className="px-6 py-4 ">
//           <div className="flex items-center justify-center gap-2">{renderPagination()}</div>
//         </div>
//       )}
//     </div>
//     </DashStudent>
//   )
// }

















"use client"

import { useState } from "react"
import CoursesContent from "./CoursesContent"
import DashStudent from "../../dashStudent"

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DashStudent>
    <div className="min-h-[90vh] flex" dir="rtl">
      {/* Sidebar */}
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Mobile menu button */}

        {/* <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            type="button">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}

        <CoursesContent />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" type="button" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
    </DashStudent>
  )
}
