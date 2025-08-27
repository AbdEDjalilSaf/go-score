"use client"

import { useState, useEffect } from "react"

export const useCircularProgress = (targetPercentage: number, duration = 1000) => {
  const [currentPercentage, setCurrentPercentage] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)

      setCurrentPercentage(targetPercentage * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 100)

    return () => clearTimeout(timer)
  }, [targetPercentage, duration])

  return currentPercentage
}
