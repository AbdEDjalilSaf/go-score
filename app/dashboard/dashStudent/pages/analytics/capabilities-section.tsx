"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"

interface Capability {
  name: string
  value: number
  total: number
}

interface CapabilitiesSectionProps {
  capabilities: {
    title: string
    items: Capability[]
    expectedGrade: {
      title: string
      value: string
    }
  }
}

export default function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gradient-to-l from-purple-50 to-orange-50">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-orange-500 text-2xl font-bold">{capabilities.title}</h2>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-amber-500" type="button">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {capabilities.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-purple-800 mb-2 font-bold">{item.name} </span>
                <div className="flex gap-1 items-center">
                  <span className="text-lg font-semibold">{item.value}</span>
                  {/* <span className="text-gray-500 text-sm">/{item.total}</span> */}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-7">
              <span className="text-purple-800">{capabilities.expectedGrade.title}</span>
              <div className="flex flex-row-reverse items-center gap-2">
              <Lock className="text-gray-400" size={16} />
              <span className="text-teal-500 font-bold">{capabilities.expectedGrade.value}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
