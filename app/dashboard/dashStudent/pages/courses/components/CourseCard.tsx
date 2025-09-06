// import Image from "next/image"


// interface Course {
//     id: number
//     title: string
//     category: string
//     image: string
//     creationDate: string
//     sales: string
//     status: string
//     price: string
//     statusColor: string
//   }
  
//   interface CourseCardProps {
//     course: Course
//     viewMode: "grid" | "list"
//   }
  
//   export default function CourseCard({ course, viewMode }: CourseCardProps) {
//     const getStatusBadgeColor = (color: string) => {
//       switch (color) {
//         case "green":
//           return "bg-green-100 text-green-800"
//         case "blue":
//           return "bg-blue-100 text-blue-800"
//         case "gray":
//           return "bg-gray-100 text-gray-800"
//         default:
//           return "bg-gray-100 text-gray-800"
//       }
//     }
  
//     if (viewMode === "list") {
//       return (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
//           <div className="flex items-center space-x-4 space-x-reverse">
//             <Image
//               src={course.image || "/placeholder.svg"}
//               alt={course.title}
//               className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
//             />
//             <div className="flex-1 min-w-0">
//               <h3 className="text-lg font-semibold text-gray-900 truncate">{course.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">{course.category}</p>
//             </div>
//             <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
//               <div>
//                 <div className="font-medium">تاريخ الإنشاء</div>
//                 <div>{course.creationDate}</div>
//               </div>
//               <div>
//                 <div className="font-medium">المبيعات</div>
//                 <div>{course.sales}</div>
//               </div>
//               <div>
//                 <div className="font-medium">الحالة</div>
//                 <span
//                   className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(course.statusColor)}`}
//                 >
//                   {course.status}
//                 </span>
//               </div>
//               <div className="text-lg font-bold text-gray-900">{course.price}</div>
//             </div>
//           </div>
//         </div>
//       )
//     }
  
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
//         <div className="aspect-video relative">
//           <Image src={course.image || "/placeholder.svg"} width={100} height={100} alt={course.title} className="w-full h-full object-cover" />
//           <div className="absolute top-3 right-3">
//             <span
//               className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(course.statusColor)}`}
//             >
//               {course.status}
//             </span>
//           </div>
//         </div>
  
//         <div className="p-4">
//           <div className="mb-2">
//             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.category}</span>
//           </div>
  
//           <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{course.title}</h3>
  
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//             <div>
//               <div className="font-medium">تاريخ الإنشاء</div>
//               <div>{course.creationDate}</div>
//             </div>
//             <div>
//               <div className="font-medium">المبيعات</div>
//               <div>{course.sales}</div>
//             </div>
//           </div>
  
//           <div className="flex items-center justify-between">
//             <div className="text-lg font-bold text-gray-900">{course.price}</div>
//             <button className="text-gray-400 hover:text-gray-600" type="button">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }
  














import Image from "next/image"

interface Course {
  id: number
  title: string
  category: string
  image: string
  creationDate: string
  sales: string
  status: string
  price: string
  statusColor: string
}

interface CourseCardProps {
  course: Course
  viewMode: "grid" | "list"
}

export default function CourseCard({ course, viewMode }: CourseCardProps) {
  const getStatusBadgeColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800"
      case "blue":
        return "bg-blue-100 text-blue-800"
      case "gray":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{course.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{course.category}</p>
          </div>
          <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
            <div>
              <div className="font-medium">تاريخ الإنشاء</div>
              <div>{course.creationDate}</div>
            </div>
            <div>
              <div className="font-medium">المبيعات</div>
              <div>{course.sales}</div>
            </div>
            <div>
              <div className="font-medium">الحالة</div>
              {/* <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(course.statusColor)}`}
              >
                {course.status}
              </span> */}
            </div>
            <div className="text-lg font-bold text-gray-900">{course.price}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <Image
          src={course.image || "/placeholder.svg"}
          width={400}
          height={225}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute top-3 right-3">
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(course.statusColor)}`}
          >
            {course.status}
          </span>
        </div> */}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.category}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{course.title}</h3>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div>
            <div className="font-medium">تاريخ الإنشاء</div>
            <div>{course.creationDate}</div>
          </div>
          <div>
            <div className="font-medium">المبيعات</div>
            <div>{course.sales}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">{course.price}</div>
          <button className="text-gray-400 hover:text-gray-600" type="button">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
