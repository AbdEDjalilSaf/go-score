interface AnalyticsHeaderProps {
    title: string
  }
  
  export default function AnalyticsHeaderTwo({ title }: AnalyticsHeaderProps) {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">{title}</h1>
        {/* <button className="bg-teal-500 text-white px-4 py-1 rounded-md text-sm">تم الاستكمال</button> */}
      </div>
    )
  }
  
