export function ExamSimulatorSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-100 p-6 border-b border-gray-200">
        <div className="text-center">
          <div className="inline-block h-8 w-80 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Advanced Options Skeleton */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-16 bg-gray-300 rounded-lg mb-6"></div>
          <div className="flex gap-6">
            <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="p-6">
        <div className="h-8 w-40 bg-gray-300 rounded mx-auto mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <div className="h-6 w-16 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-8 w-20 bg-gray-300 rounded mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="h-14 w-40 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}
