import type React from "react"

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-5 bg-gray-300 rounded mb-2 w-16"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-24"></div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
