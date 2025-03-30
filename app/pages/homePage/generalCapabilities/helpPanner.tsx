"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useMediaQuery } from "./use-mobile"
import PannerImg from "@/public/whoPanner.jpg"

export default function HelpWhoPanner() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden  bg-gradient-to-r from-purple-900 to-cyan-800">
      <div className="container mx-auto md:grid grid-cols-1 items-center gap-6 px-4 py-16 md:grid-cols-2 md:gap-8 md:px-6 md:py-12 lg:gap-12">
        {/* Image Section - Visible on all screens but positioned differently */}
        <div className={`${isMobile ? "order-1" : "order-1"} relative mx-auto max-w-md md:mx-0`}>
          <div className="relative hidden md:block h-[250px] w-full overflow-hidden rounded-lg md:h-[300px] lg:h-[350px]">
            <Image
              src={PannerImg}
              alt="Student learning online"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className={`${isMobile ? "order-2 text-center" : "order-2 text-right"} space-y-4 md:space-y-6`}>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-cyan-300 md:text-2xl lg:text-3xl">اختبار</h2>
            <h1 className="text-3xl font-bold text-cyan-200 md:text-4xl lg:text-5xl">القدرات العامة</h1>
          </div>

          <div className="space-y-2 text-white">
            <p className="text-sm md:text-base lg:text-lg">تدرب على القدرات بالذكاء الاصطناعي في منصة اختبارات</p>
            <p className="text-sm md:text-base lg:text-lg">
              أكثر من 20,000 سؤال تدريبي واختبارات تحاكي الاختبار الحقيقي
            </p>
            <p className="text-sm md:text-base lg:text-lg">واحصل على توقعات دقيقة لدرجتك في الاختبار الحقيقي</p>
          </div>

          <div className="pt-2 md:pt-4">
            <Link
              href="#"
              className="inline-block rounded-full bg-rose-500 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-rose-600 focus:outline-none md:px-8 md:py-4"
            >
              تدرب على اختبار القدرات
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


