"use client"

import Image from "next/image"
// import Link from "next/link"
import { useState, Suspense, useEffect } from "react"
import PannerImg from "@/public/whoPanner.jpg"
export default function HelpWhoPanner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
       <section className=" bg-gradient-to-r from-purple-900 to-cyan-800 text-white py-12 px-4 md:px-8 lg:px-12">
            <div className="container mx-auto max-w-6xl gap-16 flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 order-1">
              <Suspense fallback={<div>Loading...</div>}>
                <Image
                  src={PannerImg}
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
                  <div className="text-4xl font-bold text-teal-300 mb-4"> القدرات العامة
                  </div>
                </h1>
                <p className="text-lg mb-6 text-center md:text-right">تدرب على القدرات بالذكاء الاصطناعي في منصة اختبارات
                أكثر من 20,000 سؤال تدريبي واختبارات تحاكي الاختبار الحقيقي
                واحصل على توقعات دقيقة لدرجتك في الاختبار الحقيقي
                </p>
                <div className="flex justify-center md:justify-start">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300" type="button">
                    تدرب على اختبار القدرات
                  </button>
                </div>
              </div>
            </div>
          </section>
  )
}


