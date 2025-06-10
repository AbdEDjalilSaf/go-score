"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"

interface Assessment {
  category: string
  questions: number
  answers: number
  timeAvg: string
  timeTotal: string
  evaluation: string
  locked?: boolean
}

interface AssessmentSectionProps {
  section: {
    title: string
    color: string
    assessments: Assessment[]
    totalQuestions: number
    totalAnswers: number
    participants: number
  }
  isMobile: boolean
}

export default function AssessmentSection({ section, isMobile }: AssessmentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div
        className={`flex justify-between items-center p-4 ${section.color === "green" ? "bg-green-100" : section.color === "purple" ? "bg-purple-100" : section.color === "blue" ? "bg-blue-100" : section.color === "red" ? "bg-red-100" : ""}`}
      >
        <div className="flex items-center gap-2">
          <h2 className={`${section.color === "green" ? "bg-green-100" : section.color === "purple" ? "bg-purple-100" : section.color === "blue" ? "bg-blue-100" : section.color === "red" ? "bg-red-100" : ""} font-bold`}>
            {section.title}
          </h2>
          <span className="text-gray-500 text-sm">  لم تكمل التدريب في {section.totalQuestions} اقسام </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={section.color === "green" ? "bg-green-100" : section.color === "purple" ? "bg-purple-100" : section.color === "blue" ? "bg-blue-100" : section.color === "red" ? "bg-red-100" : ""}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="p-4 flex justify-between items-center border-b">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-24">
              <div className="flex flex-row-reverse items-center gap-2">
                <Lock className="text-gray-400" size={16} />
                <span className="text-teal-500 text-sm">{section.participants} التقييم للمشتركين</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-800">الإجابات</span>
                <span className="text-teal-500 font-bold">{section.totalAnswers} | {section.totalAnswers}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-800">الأسئلة</span>
                <span className="text-teal-500 font-bold">{section.totalQuestions}</span>
              </div>
            </div>

            <button className="bg-purple-800  text-white px-6 py-1.5 rounded-md text-sm">تدريب</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-purple-800">
                  <th className="py-2 px-4 text-right">المهارة</th>
                  <th className="py-2 px-4 text-center">الأسئلة</th>
                  <th className="py-2 px-4 text-center">الإجابات</th>
                  <th className="py-2 px-4 text-center">زمن الإجابة/المتوسط</th>
                  <th className="py-2 px-4 text-center">التقييم</th>
                  <th className="py-2 px-4 text-center">التدريب</th>
                </tr>
              </thead>
              <tbody>
                {section.assessments.map((assessment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-right">{assessment.category}</td>
                    <td className="py-3 px-4 text-center">{assessment.questions}</td>
                    <td className="py-3 px-4 flex gap-3 text-center"><span className="text-teal-500 font-semibold">{assessment.answers}</span> | <span className="text-red-500 font-semibold">{assessment.answers}</span> </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className=" text-teal-500 font-semibold px-2 rounded-sm">{assessment.timeAvg}</span> |
                        <span className=" text-red-500 font-semibold px-2 rounded-sm">{assessment.timeTotal}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <span className="text-purple-700 font-semibold">{assessment.evaluation}</span>
                        {/* <span className="bg-gray-200 text-xs px-1 rounded-full">0</span> */}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="bg-purple-800 text-white px-4 py-1.5 rounded-md text-sm w-full">تدرب</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
