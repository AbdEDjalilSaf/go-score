"use client"
import React from 'react'
import MetricCard from "./components/MetricCard"
import data from "./data.json"
import CommissionList from "./commission-list"
import DashTeacher from "../../dashTeacher"
import Link from 'next/link'


const page = () => {

 const handleAddNewCommission = () => {
    console.log("Add new commission")
  }


  return (
    <DashTeacher>
        {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">قائمة العمولة</h1>
          </div>
          <Link href="/dashboard/dashTeacher/pages/commission/addNewCommission">
            <button
              onClick={handleAddNewCommission}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-3xl font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
              type="button">
              <span className="text-lg">+</span>
                <span>إضافة عمولة جديدة</span>
            </button>
          </Link>
        </div>
      </div>

      
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-4">
            <MetricCard title=" مجموع المشتركين" subtitle="مجموع كل المشتركين" metric={data.metrics[0]} />
            <MetricCard title="نسبة الشتركين" subtitle="النسبة من كل مشترك" metric={data.metrics[1]} />
            <MetricCard title=" المدفوع " subtitle="الذي تم دفعه" metric={data.metrics[2]} />
            <MetricCard title=" قيد الانتظار" subtitle="المستحقات المنتظرة" metric={data.metrics[3]} />
      
            </div>

      <CommissionList />      
    </DashTeacher>
  )
}

export default page
