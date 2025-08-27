"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface RangeSliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export default function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(e)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateTouchValue(e)
  }

  const updateValue = (e: React.MouseEvent) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const position = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, position / rect.width))
    const newValue = Math.round(min + percentage * (max - min))
    onChange(newValue)
  }

  const updateTouchValue = (e: React.TouchEvent) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const position = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(1, position / rect.width))
    const newValue = Math.round(min + percentage * (max - min))
    onChange(newValue)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        updateValue(e as unknown as React.MouseEvent)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateTouchValue(e as unknown as React.TouchEvent)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="relative w-full h-8 flex items-center">
      <div
        ref={trackRef}
        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute h-2 bg-purple-800 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <div
        className="absolute w-6 h-6 ltr bg-white border-2 border-purple-800 rounded-full cursor-grab"
        style={{ right: `calc(${percentage}% - 12px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      <div className="absolute left-0 -bottom-6 text-xs text-gray-600">أحدث</div>
      <div className="absolute right-0 -bottom-6 text-xs text-gray-600">أقدم</div>
    </div>
  )
}
