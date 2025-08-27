"use client"

import { useState, useEffect } from "react"
import metricsData from "../data.json"

export interface Metric {
  id: string
  title: string
  subtitle: string
  value: string
  percentage: number
  color: string
  bgColor: string
  progressColor: string
}

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setMetrics(metricsData.metrics)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return { metrics, loading }
}
