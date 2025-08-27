"use client"

import { useState, useMemo, useEffect } from "react"
import { Eye, Pencil, Trash } from "lucide-react"
import DashTeacher from "@/app/dashboard/dashTeacher/dashTeacher"
import studentsData from "./data.json"
import Image from "next/image"

interface Student {
  id: number
  name: string
  avatar: string
  roll: string
  address: string
  class: string
  dateOfBirth: string
  phone: string
}

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(10)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  const filteredStudents = useMemo(() => {
    return studentsData.filter(
      (student: Student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage)

  const handleShowDetails = (student: Student) => {
    console.log("Show details for:", student)
    setOpenDropdown(null)
  }

  const handleEdit = (studentId: number) => {
    console.log("Edit student:", studentId)
    setOpenDropdown(null)
  }

  const handleDelete = (studentId: number) => {
    console.log("Delete student:", studentId)
    setOpenDropdown(null)
  }

  const toggleDropdown = (studentId: number) => {
    setOpenDropdown(openDropdown === studentId ? null : studentId)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [openDropdown])

  return (
    <DashTeacher>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-start gap-5">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">قائمة الطلاب</h1>
            {/* <nav className="text-sm text-gray-500">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Students</span>
            </nav> */}
          </div>
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-3xl font-medium flex items-center gap-2 transition-colors" type="button">
            <span className="text-lg">+</span>
            اضافة طالب جديد
          </button>
        </div>
      </div>

      {/* Students Information Section */}
      <div className="py-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-800">معلومات الطلاب</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or roll"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-3 focus:ring-purple-100 focus:border-purple-600"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
            {/* <select className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none">
              <option>اخر 30 يوم</option>
              <option>اخر 7 ايام</option>
              <option>اخر 90 يوم</option>
            </select> */}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className=" bg-gray-50">
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Students Name
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Roll
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Address
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Class
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Date of Birth
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    Phone
                  </th>
                  <th className="px-3 py-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student: Student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">
                      <div className="flex items-center gap-3">
                        {/* <Image
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        /> */}
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">{student.roll}</td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">{student.address}</td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">{student.class}</td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">{student.dateOfBirth}</td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">{student.phone}</td>
                    <td className="px-3 py-4 border-b border-gray-200 text-sm text-gray-800">
                      <div className="relative inline-block">
                        <button
                          onClick={() => toggleDropdown(student.id)}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all text-lg font-bold"
                          aria-label="More actions"
                          type="button">
                          ⋮
                        </button>
                        {openDropdown === student.id && (
                          <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[150px] overflow-hidden">
                            <button
                              onClick={() => handleShowDetails(student)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              type="button">
                              <Eye className="w-5 h-5"/> Show Details
                            </button>
                            <button
                              onClick={() => handleEdit(student.id)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              type="button">
                              <Pencil className="w-5 h-5"/> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(student.id)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                              type="button">
                              <Trash className="w-5 h-5"/> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500"> */}
          
             {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 bg-white rounded text-sm transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"> 
            ‹
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 border text-sm transition-all rounded ${
                  currentPage === pageNum
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
                type="button">
                {pageNum}
              </button>
            )
          })}
          {totalPages > 5 && <span className="px-1 py-2 text-gray-400">...</span>}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 bg-white rounded text-sm transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button">
            ›
          </button>
        </div>
          </div>
        {/* </div>
      </div> */}
      </DashTeacher>
  )
}
