// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Loader2, Search, Filter, CheckCircle2, XCircle } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import axios from "axios"
// import Cookies from "js-cookie"
// import type { Question, QuestionsApiResponse } from "../types/exam"

// interface QuestionsFilterProps {
//   selectedSkillIds: number[]
//   skillNames?: { [key: number]: string }
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com"

// export default function QuestionsFilter({ selectedSkillIds, skillNames = {} }: QuestionsFilterProps) {
//   const [allQuestions, setAllQuestions] = useState<Question[]>([])
//   const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([])

//   // Fetch all questions
//   useEffect(() => {
//     const fetchAllQuestions = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         const token = Cookies.get("accessToken") || ""

//         if (!token) {
//           setError("لا يوجد رمز وصول صالح")
//           return
//         }

//         const response = await axios.get<QuestionsApiResponse>(`${BASE_URL}/api/Question/GetAllQuestions`, {
//           timeout: 15000,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })

//         if (response.data.succeeded && response.data.data) {
//           setAllQuestions(response.data.data)
//           console.log("All questions fetched:", response.data.data.length)
//         } else {
//           setError(response.data.message || "فشل في جلب الأسئلة")
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error)
//         if (axios.isAxiosError(error)) {
//           if (error.response?.status === 401) {
//             setError("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى")
//           } else if (error.response?.status === 404) {
//             setError("لم يتم العثور على نقطة النهاية للأسئلة")
//           } else {
//             setError("حدث خطأ في جلب الأسئلة")
//           }
//         } else {
//           setError("حدث خطأ غير متوقع")
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAllQuestions()
//   }, [])

//   // Filter questions based on selected skill IDs and search term
//   useEffect(() => {
//     let filtered = allQuestions

//     // Filter by selected skill IDs
//     if (selectedSkillIds.length > 0) {
//       filtered = filtered.filter((question) => selectedSkillIds.includes(question.skillId))
//     }

//     // Filter by search term
//     if (searchTerm.trim()) {
//       const searchLower = searchTerm.toLowerCase()
//       filtered = filtered.filter(
//         (question) =>
//           question.value.toLowerCase().includes(searchLower) ||
//           question.answer.toLowerCase().includes(searchLower) ||
//           question.choices.some((choice) => choice.value.toLowerCase().includes(searchLower)),
//       )
//     }

//     setFilteredQuestions(filtered)
//   }, [allQuestions, selectedSkillIds, searchTerm])

//   // Toggle question selection
//   const toggleQuestionSelection = (questionId: string) => {
//     setSelectedQuestionIds((prev) =>
//       prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
//     )
//   }

//   // Select all filtered questions
//   const selectAllQuestions = () => {
//     const allIds = filteredQuestions.map((q) => q.id)
//     setSelectedQuestionIds(allIds)
//   }

//   // Clear all selections
//   const clearAllSelections = () => {
//     setSelectedQuestionIds([])
//   }

//   // Group questions by skill ID
//   const questionsBySkill = filteredQuestions.reduce(
//     (acc, question) => {
//       if (!acc[question.skillId]) {
//         acc[question.skillId] = []
//       }
//       acc[question.skillId].push(question)
//       return acc
//     },
//     {} as { [key: number]: Question[] },
//   )

//   if (selectedSkillIds.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>أسئلة القدرات</CardTitle>
//           <CardDescription>يرجى اختيار مهارات من القائمة أعلاه لعرض الأسئلة المتعلقة بها</CardDescription>
//         </CardHeader>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Filter className="h-5 w-5" />
//             أسئلة القدرات المفلترة
//           </CardTitle>
//           <CardDescription>عرض الأسئلة للمهارات المحددة ({selectedSkillIds.length} مهارات)</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert className="mb-4">
//               <XCircle className="h-4 w-4" />
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {loading ? (
//             <div className="flex items-center justify-center p-8">
//               <Loader2 className="h-8 w-8 animate-spin" />
//               <span className="ml-2">جاري تحميل الأسئلة...</span>
//             </div>
//           ) : (
//             <>
//               {/* Search and Stats */}
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="البحث في الأسئلة والإجابات..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Button onClick={selectAllQuestions} variant="outline" size="sm">
//                     اختيار الكل
//                   </Button>
//                   <Button onClick={clearAllSelections} variant="outline" size="sm">
//                     إلغاء الاختيار
//                   </Button>
//                 </div>
//               </div>

//               {/* Statistics */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                 <div className="text-center p-3 bg-muted rounded-lg">
//                   <div className="text-2xl font-bold text-primary">{allQuestions.length}</div>
//                   <div className="text-sm text-muted-foreground">إجمالي الأ��ئلة</div>
//                 </div>
//                 <div className="text-center p-3 bg-muted rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">{filteredQuestions.length}</div>
//                   <div className="text-sm text-muted-foreground">الأسئلة المفلترة</div>
//                 </div>
//                 <div className="text-center p-3 bg-muted rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">{selectedQuestionIds.length}</div>
//                   <div className="text-sm text-muted-foreground">الأسئلة المحددة</div>
//                 </div>
//                 <div className="text-center p-3 bg-muted rounded-lg">
//                   <div className="text-2xl font-bold text-orange-600">{Object.keys(questionsBySkill).length}</div>
//                   <div className="text-sm text-muted-foreground">المهارات</div>
//                 </div>
//               </div>

//               {/* Questions grouped by skill */}
//               {Object.keys(questionsBySkill).length === 0 ? (
//                 <div className="text-center p-8 text-muted-foreground">لا توجد أسئلة متطابقة مع المعايير المحددة</div>
//               ) : (
//                 <div className="space-y-6">
//                   {Object.entries(questionsBySkill).map(([skillId, questions]) => (
//                     <Card key={skillId} className="border-l-4 border-l-primary">
//                       <CardHeader className="pb-3">
//                         <div className="flex items-center justify-between">
//                           <CardTitle className="text-lg">
//                             {skillNames[Number.parseInt(skillId)] || `مهارة ${skillId}`}
//                           </CardTitle>
//                           <Badge variant="secondary">{questions.length} سؤال</Badge>
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-4">
//                           {questions.map((question, index) => (
//                             <Card
//                               key={question.id}
//                               className={`cursor-pointer transition-all ${
//                                 selectedQuestionIds.includes(question.id)
//                                   ? "ring-2 ring-primary bg-primary/5"
//                                   : "hover:bg-muted/50"
//                               }`}
//                               onClick={() => toggleQuestionSelection(question.id)}
//                             >
//                               <CardContent className="p-4">
//                                 <div className="flex items-start gap-3">
//                                   <div className="flex-shrink-0 mt-1">
//                                     {selectedQuestionIds.includes(question.id) ? (
//                                       <CheckCircle2 className="h-5 w-5 text-primary" />
//                                     ) : (
//                                       <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
//                                     )}
//                                   </div>
//                                   <div className="flex-1 space-y-3">
//                                     <div>
//                                       <div className="flex items-center gap-2 mb-2">
//                                         <Badge variant="outline" className="text-xs">
//                                           سؤال {index + 1}
//                                         </Badge>
//                                         <Badge variant="outline" className="text-xs">
//                                           ID: {question.id.slice(0, 8)}...
//                                         </Badge>
//                                       </div>
//                                       <p className="font-medium text-foreground leading-relaxed">{question.value}</p>
//                                     </div>

//                                     {/* Choices */}
//                                     <div className="space-y-2">
//                                       <p className="text-sm font-medium text-muted-foreground">الخيارات:</p>
//                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                         {question.choices.map((choice, choiceIndex) => (
//                                           <div
//                                             key={choice.id}
//                                             className={`p-2 rounded border text-sm ${
//                                               choice.value === question.answer
//                                                 ? "bg-green-50 border-green-200 text-green-800"
//                                                 : "bg-background border-border"
//                                             }`}
//                                           >
//                                             <span className="font-medium">
//                                               {String.fromCharCode(65 + choiceIndex)}.
//                                             </span>{" "}
//                                             {choice.value}
//                                             {choice.value === question.answer && (
//                                               <Badge variant="secondary" className="ml-2 text-xs">
//                                                 الإجابة الصحيحة
//                                               </Badge>
//                                             )}
//                                           </div>
//                                         ))}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </CardContent>
//                             </Card>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}

//               {/* Selected Questions Summary */}
//               {selectedQuestionIds.length > 0 && (
//                 <Card className="mt-6 bg-primary/5 border-primary/20">
//                   <CardHeader>
//                     <CardTitle className="text-lg">الأسئلة المحددة</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       <p className="text-sm text-muted-foreground">
//                         تم اختيار {selectedQuestionIds.length} سؤال من {filteredQuestions.length} سؤال متاح
//                       </p>
//                       <div className="text-xs font-mono bg-background p-2 rounded border max-h-32 overflow-y-auto">
//                         معرفات الأسئلة المحددة:
//                         <br />[{selectedQuestionIds.map((id) => `"${id}"`).join(", ")}]
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }






"use client"

import { useState } from "react"
import { Lock, RotateCcw, Minus, Plus, Loader2 } from "lucide-react"
import type { ExamData, ExamType, StartTestRequest, StartTestResponse } from "../types/exam"

interface ExamSimulatorProps {
  data: ExamData
}

export default function ExamSimulator({ data }: ExamSimulatorProps) {
  const [selectedExamType, setSelectedExamType] = useState<ExamType | null>(null)
  const [questionCount, setQuestionCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testId, setTestId] = useState<number | null>(null)

  const handleExamTypeSelect = (type: ExamType) => {
    setSelectedExamType(type)
  }

  const handleReset = () => {
    setQuestionCount(1)
    setError(null)
    setTestId(null)
  }

  const incrementCount = () => {
    if (questionCount < 100) {
      setQuestionCount(questionCount + 1)
    }
  }

  const decrementCount = () => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1)
    }
  }

  const startTest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const requestBody: StartTestRequest = {
        skillIds: [0], // You can modify this based on selected exam type
        count: questionCount,
      }

      const response = await fetch("/api/Question/StartTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StartTestResponse = await response.json()

      if (result.succeeded) {
        setTestId(result.data)
        // Redirect to exam page with test ID
        window.location.href = `/dashboard/dashStudent/examGlobalTest?testId=${result.data}`
      } else {
        setError(result.message || "فشل في بدء الاختبار")
        if (result.errors && result.errors.length > 0) {
          setError(result.errors.join(", "))
        }
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم")
      console.error("Error starting test:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-pink-700 rounded-full text-sm font-medium">
            باقي لديك {data.remainingAttempts} محاولة مجانية في الباقة الأساسية
          </div>
        </div>
      </div>

      {/* Advanced Options Section */}
      <div className="bg-gray-50 rounded-2xl shadow-lg border-b border-gray-200">
        <div className="p-6">
          <button className="flex items-center justify-between w-full group">
            <div className="flex items-center text-teal-600 font-semibold text-lg">
              <span>خيارات متقدمة</span>
            </div>
          </button>

          <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Question Bank Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-white">
                  <Lock className="h-5 w-5" />
                  <span className="font-semibold text-lg">بنوك الأسئلة</span>
                </div>
                <div className="text-purple-100 text-sm bg-purple-400/30 px-3 py-1 rounded-full">
                  تم إضافة أسئلة جديدة بتاريخ 11/05/2023
                </div>
              </div>
            </div>

            {/* Question Count Controls */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Question Count Control with Buttons */}
                <div className="flex flex-col items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">عدد الأسئلة</label>

                  {/* Counter with buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementCount}
                      disabled={questionCount <= 1 || isLoading}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{questionCount}</div>
                      <div className="text-xs text-gray-500">من 100</div>
                    </div>

                    <button
                      onClick={incrementCount}
                      disabled={questionCount >= 100 || isLoading}
                      className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${questionCount}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Direct Input */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">أو أدخل العدد مباشرة:</span>
                    <input
                      type="number"
                      value={questionCount}
                      onChange={(e) =>
                        setQuestionCount(Math.max(1, Math.min(100, Number.parseInt(e.target.value) || 1)))
                      }
                      min="1"
                      max="100"
                      disabled={isLoading}
                      className="w-20 border-2 border-gray-300 rounded-lg p-2 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 border-2 border-red-400 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="h-4 w-4" />
                    إعادة تعيين
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Information Section */}
      <div className="p-4">
        <h2 className="text-xl text-center text-orange-500 font-bold mb-4">معلومات الاختبار</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-blue-600 font-bold">كمي</h3>
            <p className="text-gray-700">{data.examInfo.quantitative}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">لفظي</h3>
            <p className="text-gray-700">{data.examInfo.verbal}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">عدد الأسئلة</h3>
            <p className="text-gray-700">{questionCount}</p>
          </div>
          <div>
            <h3 className="text-blue-600 font-bold">الزمن المتوقع</h3>
            <p className="text-gray-700">{data.examInfo.expectedTime}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {testId && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-center font-medium">تم إنشاء الاختبار بنجاح! معرف الاختبار: {testId}</p>
          </div>
        )}

        {/* Start Test Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={startTest}
            disabled={isLoading || data.remainingAttempts <= 0}
            className="bg-purple-800 text-white px-8 py-3 rounded-md font-bold hover:bg-purple-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[150px] justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري التحضير...
              </>
            ) : (
              "ابدأ الاختبار"
            )}
          </button>
        </div>

        {/* Remaining attempts warning */}
        {data.remainingAttempts <= 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-600 text-center font-medium">
              لقد استنفدت جميع المحاولات المجانية. يرجى ترقية باقتك للمتابعة.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

