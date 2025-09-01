import type React from "react"
import CircularProgress from "./CircularProgress"
import type { Metric } from "../hooks/useMetrics"

interface MetricCardProps {
  title: string,
  subtitle:string,
  metric: Metric
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, title, subtitle }) => {
  return (
    <div
      className={`${metric.bgColor} rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{metric.value}</div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <CircularProgress
            percentage={metric.percentage}
            progressColor={metric.progressColor}
            size={80}
            strokeWidth={6}
          />
        </div>
      </div>
    </div>
  )
}

export default MetricCard
