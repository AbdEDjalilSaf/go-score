// import pricingData from "./data.json"
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"

// const PricingSection = () => {
//   const { header, plans } = pricingData

//   return (
//     <DashStudent>
//     <div className="min-h-screen to-blue-50 py-8 ">
//       <div className=" mx-auto">
//         <div className="text-right mb-20">
//           <h1 className="text-md md:text-lg lg:text-xl font-bold text-gray-900 mb-4 leading-tight">
//             {header.title.split("\n").map((line, index) => (
//               <span key={index}>
//                 {line}
//                 {index < header.title.split("\n").length - 1 && <br />}
//               </span>
//             ))}
//           </h1>
//           <p className="text-sm md:text-md lg:text-lg text-gray-600 max-w-2xl text-right leading-relaxed">
//             {header.description.split("\n").map((line, index) => (
//               <span key={index}>
//                 {line}
//                 {index < header.description.split("\n").length - 1 && <br />}
//               </span>
//             ))}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => (
//             <div
//               key={plan.name}
//               className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
//                 // plan.buttonStyle === "primary"
//                 //   ? "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 lg:scale-110"
//                    "border-gray-200"
//               }`}
//             >
//               {/* {plan.badge && (
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                   <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">{plan.badge}</div>
//                 </div>
//               )} */}

//               <div className="p-8">
//                 <div className="mb-8">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
//                   <div className="mb-4">
//                     <span className="text-sm text-gray-600 block mb-2">Starts at</span>
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
//                       <span className="text-gray-600 text-sm">{plan.period}</span>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 leading-relaxed">{plan.description}</p>
//                 </div>

//                 <button
//                   className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 ${
//                     plan.buttonStyle === "primary"
//                       ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
//                       : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
//                   }`}
//                 type="button">
//                   {plan.buttonText}
//                 </button>

//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-4">{plan.featuresTitle}</h4>
//                   <ul className="space-y-3">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="flex items-start gap-3">
//                         <svg
//                           className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                          aria-hidden="true">
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </DashStudent>
//   )
// }

// export default PricingSection



















"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import pricingData from "./data.json"
import DashStudent from "@/app/dashboard/dashStudent/dashStudent"

const PricingSlider = () => {
  const { header, plans } = pricingData
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const maxIndex = Math.max(0, plans.length - cardsPerView)

  const goToSlide = (index: number) => {
    const newIndex = Math.min(Math.max(index, 0), maxIndex)
    setCurrentIndex(newIndex)
  }

  // Enhanced touch/mouse drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setCurrentX(clientX)
    setDragOffset(0)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return

    const diff = clientX - startX
    setCurrentX(clientX)
    setDragOffset(diff)
  }

  const handleEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    const threshold = 50 // Minimum distance to trigger slide
    const direction = dragOffset > threshold ? -1 : dragOffset < -threshold ? 1 : 0

    if (direction !== 0) {
      const newIndex = currentIndex + direction
      goToSlide(newIndex)
    }

    setDragOffset(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Calculate transform with drag offset
  const getTransform = () => {
    const baseTransform = -(currentIndex * (100 / cardsPerView))
    const dragTransform = isDragging ? (dragOffset / window.innerWidth) * 100 : 0
    return baseTransform + dragTransform
  }

  return (
    <DashStudent>
      <div className="py-8 md:py-16">
        {/* Header */}
        <div className="text-right mb-12 md:mb-16">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-purple-800 mb-4 leading-tight">
            {header.title.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < header.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-md md:text-lg text-gray-600  ">
            {header.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < header.description.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {/* Touch instruction hint */}
        {/* <div className="text-center mb-8">
          <p className="text-sm text-gray-500 font-medium">
            👆 Swipe to explore all plans
          </p>
        </div> */}

        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Cards Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={sliderRef}
              className={`flex flex-row-reverse py-4 transition-transform duration-300 ease-out select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                transform: `translateX(${getTransform()}%)`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div
                    className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full ${
                      plan.buttonStyle === "primary"
                        ? "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 "
                        : "border-gray-200"
                    }`}
                  >
                    {/* {plan.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          {plan.badge}
                        </div>
                      </div>
                    )} */}

                    <div className="p-6 md:p-8">
                      <div className="mb-6 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-sm text-gray-600 block mb-2">Starting at</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{plan.price}</span>
                            <span className="text-gray-600 text-sm">{plan.period}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{plan.description}</p>
                      </div>

                      <button
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-6 md:mb-8 ${
                          plan.buttonStyle === "primary"
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105"
                            : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transform hover:scale-105"
                        }`}
                        type="button"
                      >
                        {plan.buttonText}
                      </button>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">{plan.featuresTitle}</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex flex-row-reverse justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`} type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </DashStudent>
  )
}

export default PricingSlider

