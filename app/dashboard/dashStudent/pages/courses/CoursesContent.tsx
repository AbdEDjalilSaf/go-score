// "use client"

// import { useState } from "react"
// import CourseCard from "./components/CourseCard"

// export default function CoursesContent() {
//   const [activeCategory, setActiveCategory] = useState("الكل")
//   const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'

//   const categories = [
//     "الكل",
//     "تصميم واجهات المستخدم",
//     "التصميم الجرافيكي",
//     "الرسوم المتحركة",
//     "تطوير الويب",
//     "العلامة التجارية",
//   ]

//   const courses = [
//     {
//       id: 1,
//       title: "تصميم واجهات المستخدم - المستوى المتقدم",
//       category: "تصميم واجهات المستخدم",
//       image: "/oneCourse.png",
//       creationDate: "16 يناير 2025",
//       sales: "مباع",
//       status: "منشور",
//       price: "$1,250",
//       statusColor: "green",
//     },
//     {
//       id: 2,
//       title: "دورة شاملة في التصميم الجرافيكي باستخدام الإليستريتور",
//       category: "التصميم الجرافيكي",
//       image: "/twoCourse.png",
//       creationDate: "14 يناير 2025",
//       sales: "$1,000",
//       status: "غير منشور",
//       price: "$1,000",
//       statusColor: "gray",
//     },
//     {
//       id: 3,
//       title: "أساسيات الرسوم المتحركة ثنائية الأبعاد باستخدام جيتر",
//       category: "الرسوم المتحركة",
//       image: "/threeCourse.png",
//       creationDate: "13 يناير 2025",
//       sales: "$950",
//       status: "منشور",
//       price: "$950",
//       statusColor: "green",
//     },
//     {
//       id: 4,
//       title: "دليل تطوير المواقع بدون كود",
//       category: "تطوير الويب",
//       image: "/fourCourse.png",
//       creationDate: "12 يناير 2025",
//       sales: "$500",
//       status: "غير منشور",
//       price: "$500",
//       statusColor: "gray",
//     },
//     {
//       id: 5,
//       title: "الهوية البصرية والتعبير عن العلامة التجارية",
//       category: "العلامة التجارية",
//       image: "/fiveCourse.png",
//       creationDate: "11 يناير 2025",
//       sales: "$1,050",
//       status: "منشور",
//       price: "$1,050",
//       statusColor: "blue",
//     },
//     {
//       id: 6,
//       title: "أساسيات تصميم واجهات المستخدم في فيجما",
//       category: "تصميم واجهات المستخدم",
//       image: "/sexCourse.png",
//       creationDate: "10 يناير 2025",
//       sales: "$2,250",
//       status: "منشور",
//       price: "$2,250",
//       statusColor: "green",
//     },
//   ]

//   const filteredCourses =
//     activeCategory === "الكل" ? courses : courses.filter((course) => course.category === activeCategory)

//   return (
//     <div className="p-1">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">الدورات</h1>
//           <p className="text-gray-600">إنشاء وإدارة الدورات في مدرستك</p>
//         </div>
//         <button className="mt-4 sm:mt-0 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center" type="button">
//           <span className="ml-2">+</span>
//           دورة جديدة
//         </button>
//       </div>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setActiveCategory(category)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               activeCategory === category ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//             type="button">
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* View Mode Toggle */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-2 space-x-reverse">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
//             type="button">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//               <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
//           type="button">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//               <path
//                 fillRule="evenodd"
//                 d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Courses Grid/List */}
//       <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
//         {filteredCourses.map((course) => (
//           <CourseCard key={course.id} course={course} viewMode={viewMode} />
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredCourses.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">📚</div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دورات</h3>
//           <p className="text-gray-500">لم يتم العثور على دورات في هذه الفئة</p>
//         </div>
//       )}
//     </div>
//   )
// }












"use client"

import { useState } from "react"
import CourseCard from "./components/CourseCard"

export default function CoursesContent() {
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    "الكل",
    "تصميم واجهات المستخدم",
    "التصميم الجرافيكي",
    "الرسوم المتحركة",
    "تطوير الويب",
    "العلامة التجارية",
  ]

  const courses = [
    {
      id: 1,
      title: "تصميم واجهات المستخدم - المستوى المتقدم",
      category: "تصميم واجهات المستخدم",
      image: "/oneCourse.png",
      creationDate: "16 يناير 2025",
      sales: "مباع",
      status: "منشور",
      price: "$1,250",
      statusColor: "green",
    },
    {
      id: 2,
      title: "دورة شاملة في التصميم الجرافيكي باستخدام الإليستريتور",
      category: "التصميم الجرافيكي",
      image: "/twoCourse.png",
      creationDate: "14 يناير 2025",
      sales: "$1,000",
      status: "غير منشور",
      price: "$1,000",
      statusColor: "gray",
    },
    {
      id: 3,
      title: "أساسيات الرسوم المتحركة ثنائية الأبعاد باستخدام جيتر",
      category: "الرسوم المتحركة",
      image: "/threeCourse.png",
      creationDate: "13 يناير 2025",
      sales: "$950",
      status: "منشور",
      price: "$950",
      statusColor: "green",
    },
    {
      id: 4,
      title: "دليل تطوير المواقع بدون كود",
      category: "تطوير الويب",
      image: "/fourCourse.png",
      creationDate: "12 يناير 2025",
      sales: "$500",
      status: "غير منشور",
      price: "$500",
      statusColor: "gray",
    },
    {
      id: 5,
      title: "الهوية البصرية والتعبير عن العلامة التجارية",
      category: "العلامة التجارية",
      image: "/fiveCourse.png",
      creationDate: "11 يناير 2025",
      sales: "$1,050",
      status: "منشور",
      price: "$1,050",
      statusColor: "blue",
    },
    {
      id: 6,
      title: "أساسيات تصميم واجهات المستخدم في فيجما",
      category: "تصميم واجهات المستخدم",
      image: "/sexCourse.png",
      creationDate: "10 يناير 2025",
      sales: "$2,250",
      status: "منشور",
      price: "$2,250",
      statusColor: "green",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === "الكل" || course.category === activeCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-900 mb-2">الدورات</h1>
          <p className="text-gray-600">إنشاء وإدارة الدورات في مدرستك</p>
        </div>
        <button
          className="mt-4 sm:mt-0 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors flex items-center"
          type="button"
        >
          <span className="ml-2">+</span>
          دورة جديدة
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="البحث في الدورات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 text-right placeholder-gray-500 text-sm sm:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && <p className="mt-2 text-sm text-gray-600">تم العثور على {filteredCourses.length} دورة</p>}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category ? "bg-purple-900 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-200" : "hover:bg-purple-100"}`}
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-purple-200" : "hover:bg-purple-100"}`}
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} viewMode={viewMode} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{searchQuery ? "لا توجد نتائج" : "لا توجد دورات"}</h3>
          <p className="text-gray-500">
            {searchQuery
              ? `لم يتم العثور على دورات تحتوي على "${searchQuery}"`
              : "لم يتم العثور على دورات في هذه الفئة"}
          </p>
        </div>
      )}
    </div>
  )
}
