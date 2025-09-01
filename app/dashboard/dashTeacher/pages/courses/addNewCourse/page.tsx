"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import data from "../data.json"
// import CourseDashboard from "@/components/ui/course-dashboard"
import AddCoursePage from "@/components/ui/add-course-page"

type Course = {
  id: number
  name: string
  videos: number
  price: number
  sales: number
  earning: number
  category: string
  subcategory: string
  description: string
  color: string
}

type NewCourse = {
  name: string
  category: string
  subcategory: string
  description: string
  price: number
  earning: number
}

type Page = "dashboard" | "add-course"

type Category = {
  name: string
  subcategories: string[]
}
export default function App() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>(
    data.courses.map((course: any) => ({
      subcategory: "",
      description: "",
      ...course,
    }))
  )
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  const handleAddCourse = (newCourse: NewCourse) => {
    const courseColors = [
      "bg-cyan-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-600",
      "bg-orange-500",
      "bg-red-500",
      "bg-indigo-500",
    ]

    const course: Course = {
      ...newCourse,
      id: Math.max(...courses.map((c) => c.id)) + 1,
      sales: 0,
      videos: 0,
      color: courseColors[Math.floor(Math.random() * courseColors.length)],
    }

    setCourses((prev) => [...prev, course])
    setCurrentPage("dashboard")
  }

  const navigateToAddCourse = () => {
    setCurrentPage("add-course")
  }

  const navigateToDashboard = () => {
    setCurrentPage("dashboard")
    router.back()
  }

  return (
    <>
      {/* {currentPage === "dashboard" && <CourseDashboard courses={courses} onAddCourse={navigateToAddCourse} />} */}
      {/* {currentPage === "add-course" && ( */}
        <AddCoursePage
          onAdd={handleAddCourse}
          onCancel={navigateToDashboard}
          categories={
            (Array.isArray(data.categories) && typeof data.categories[0] === "string")
              ? (data.categories as string[]).map((name) => ({ name, subcategories: [] }))
              : (data.categories as unknown as Category[])
          }
        />
     
    </>
  )
}
