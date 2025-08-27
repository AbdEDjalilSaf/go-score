"use client"

import { Suspense, useEffect } from "react"
import Image from "next/image"
import whoPanner from "@/public/whoPanner.jpg"
// import moo from "./../../../../public/"
import data from "./data.json"
import {
  FileText,
  Monitor,
  Brain,
  Calculator,
  Atom,
  FlaskRoundIcon as Flask,
  Leaf,
  Play,
  FileBarChart,
  Clock,
  RotateCcw,
  GraduationCap,
} from "lucide-react"


export default function Home() {
  // Set RTL direction for the entire page
  useEffect(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  }, [])

  // Map for icon components
  const iconMap = {
    practice: FileText,
    simulation: Monitor,
    prediction: Brain,
    math: Calculator,
    physics: Atom,
    chemistry: Flask,
    biology: Leaf,
    startTraining: Play,
    reports: FileBarChart,
    continueTraining: Clock,
    repeatSteps: RotateCcw,
  }

  return (
    <main className="min-h-screen bg-white text-right">
      {/* Hero Section */}
      <section className=" bg-gradient-to-r from-purple-900 to-cyan-800 text-white py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl gap-16 flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 order-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              src={whoPanner}
              alt="طالب يدرس"
              width={500}
              height={400}
              className="rounded-lg hidden md:block"
            />
            </Suspense>
          </div>
          <div className="md:w-1/2 order-2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-center md:text-right">
              <div className="text-2xl font-bold mb-2">اختبار</div>
              <div className="text-4xl font-bold text-teal-300 mb-4">التحصيل الدراسي</div>
            </h1>
            <p className="text-lg mb-6 text-center md:text-right">{data.hero.description}</p>
            <div className="flex justify-center md:justify-start">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300" type="button">
                {data.hero.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">{data.features.title}</h2>
          <p className="text-center text-gray-600 mb-12">{data.features.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.features.items.map((feature, index) => {
              const IconComponent =
                index === 0 ? iconMap.practice : index === 1 ? iconMap.simulation : iconMap.prediction

              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center text-sky-500">
                      <IconComponent size={48} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300" type="button">
              {data.features.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">{data.subjects.title}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.subjects.items.map((subject, index) => {

            const iconImgPromise = import(`@/public/${subject.icon}.png`)
           

              return (
                <div key={index} className={`border cursor-pointer rounded-lg p-6 hover:shadow-xl ${subject.color} text-center transition duration-300`}>
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 flex items-center justify-center`}>
                      {iconImgPromise.then((iconImg) => (
                        <Suspense fallback={<div>Loading...</div>}>
                        <Image src={iconImg.default} alt={subject.name} width={300} height={300} />
                        </Suspense>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.infoCards.map((card, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-4xl ${card.color} shadow-md overflow-hidden border`}>
                <div className={`bg-gradient-to-l ${card.bgColor} p-8 text-white relative h-48`}>
                  <div className="absolute top-4 right-4 text-white">
                    <GraduationCap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mt-12">{card.title}</h3>
                  <p className="text-sm mt-2">{card.subtitle}</p>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-purple-900 mb-4">{card.question}</h4>
                  <p className="text-gray-600 mb-6">{card.answer}</p>
                  <button className={`w-full py-3 rounded-md text-white font-bold ${card.buttonColor}`} type="button">
                    اقرأ المزيد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Improve Section */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">{data.improvement.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.improvement.steps.map((step, index) => {
              let IconComponent

              if (index === 0) {
                IconComponent = iconMap.startTraining
              } else if (index === 1) {
                IconComponent = iconMap.reports
              } else if (index === 2) {
                IconComponent = iconMap.continueTraining
              } else {
                IconComponent = iconMap.repeatSteps
              }

              return (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${step.iconBg} text-white`}
                    >
                      <IconComponent size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${step.titleColor}`}>{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300" type="button">
              {data.improvement.buttonText}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

