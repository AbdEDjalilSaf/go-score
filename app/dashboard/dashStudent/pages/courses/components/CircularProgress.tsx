import type React from "react"
import { useCircularProgress } from "../hooks/useCircularProgress"

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  progressColor: string
  className?: string
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 80,
  strokeWidth = 8,
  progressColor,
  className = "",
}) => {
  const animatedPercentage = useCircularProgress(percentage)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={progressColor}
          style={{
            transition: "stroke-dashoffset 0.1s ease-in-out",
          }}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">{Math.round(animatedPercentage)}%</span>
      </div>
    </div>
  )
}

export default CircularProgress
