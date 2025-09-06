"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import router from "next/router"

interface SkillTestStatistic {
  id: number
  value: string
  questionsCount: number
  correctAnswersCount: number
  ratio: number
}

interface TestClass {
  id: number
  value: string
  skillTestsStatistics: SkillTestStatistic[]
}

interface TestType {
  id: number
  value: string
  testClasses: TestClass[]
}

interface AnalyticalStatisticsResponse {
  data: {
    testTypes: TestType[]
  }
}

// interface AssessmentSectionProps {
//   isMobile?: boolean;
// }

export default function AssessmentSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [analyticalData, setAnalyticalData] = useState<TestType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
  const currentColor = useSelector((state: { background: { name: string } }) => state.background.name);


const debugAuthToken = () => {
  const token = Cookies.get("accessToken");
  console.log("Token exists:", !!token);
  console.log("Token length:", token?.length);
  
  if (token) {
    try {
      // Decode JWT to check expiration (if it's a JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Token payload:", payload);
      console.log("Token expires:", new Date(payload.exp * 1000));
      console.log("Token expired:", payload.exp * 1000 < Date.now());
    } catch (error) {
      console.log("Token is not a valid JWT or couldn't be parsed");
    }
  }
};



async function getAnalyticalStatistics() {

  debugAuthToken();

  try {
    setLoading(true)
    setError(null)
    
    const token = Cookies.get("accessToken")
    if (!token) {
      setError("Authentication token is missing. Please log in again.")
      return []
    }

    const fullUrl = `${BASE_URL}/api/Statistics/GetAnalyticalStatistics`
    console.log("Calling API URL:", fullUrl)

    const response = await axios.get<AnalyticalStatisticsResponse>(fullUrl, {
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.data && response.data.data.testTypes) {
      return response.data.data.testTypes
    } else {
      setError("No analytical statistics data received")
      return []
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"
    const refreshSuccess401 = await refreshAuthToken()

    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (refreshSuccess401) {
              return getAnalyticalStatistics() // Retry with new token
            }
            // Token expired or invalid
            errorMessage = "Authentication expired. Please log in again."
            // Clear the expired token
            router.push("/login")
            break
          case 403:
            if (refreshSuccess401) {
              return getAnalyticalStatistics() // Retry with new token
            }
            // Check if it's a token issue or permissions issue
            errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
            console.log("errorMessage",errorMessage);
            
            router.push("/login")
             break
          case 404:
            errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
            break
          case 500:
            errorMessage = "Server error (500). Please try again later."
            break
          default:
            errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection."
      } else {
        errorMessage = `Request error: ${error.message}`
      }
    } else {
      errorMessage = error instanceof Error ? error.message : "Unknown error"
    }

    setError(errorMessage)
    return []
  } finally {
    setLoading(false)
  }
}












  // async function getAnalyticalStatistics() {
  //   try {
  //     setLoading(true)
  //     setError(null)
  //     const token = Cookies.get("accessToken") || ""
  //     if (!token) {
  //       setError("Authentication token is missing. Please log in again.")
  //       return []
  //     }

  //     const fullUrl = `${BASE_URL}/api/Statistics/GetAnalyticalStatistics`
  //     console.log("Calling API URL:", fullUrl)

  //     const response = await axios.get<AnalyticalStatisticsResponse>(fullUrl, {
  //       timeout: 10000,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })

  //     if (response.data && response.data.data.testTypes) {
  //       return response.data.data.testTypes
  //     } else {
  //       setError("No analytical statistics data received")
  //       return []
  //     }
  //   } catch (error) {
  //     let errorMessage = "Unknown error occurred"

  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         switch (error.response.status) {
  //           case 404:
  //             errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
  //             break
  //           case 500:
  //             errorMessage = "Server error (500). Please try again later."
  //             break
  //           case 403:
  //             errorMessage = "Access forbidden (403). Check your authentication."
  //             break
  //           default:
  //             errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
  //         }
  //       } else if (error.request) {
  //         errorMessage = "Network error. Please check your internet connection."
  //       } else {
  //         errorMessage = `Request error: ${error.message}`
  //       }
  //     } else {
  //       errorMessage = error instanceof Error ? error.message : "Unknown error"
  //     }

  //     setError(errorMessage)
  //     return []
  //   } finally {
  //     setLoading(false)
  //   }
  // }












  useEffect(() => {
    const fetchAnalyticalData = async () => {
      if (!BASE_URL) {
        setError("API Base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your environment variables.")
        return
      }

      const statisticsData = await getAnalyticalStatistics()
      if (statisticsData && Array.isArray(statisticsData)) {
        setAnalyticalData(statisticsData)
      } else if (!error) {
        setError("No analytical statistics data received from API")
      }
    }

    fetchAnalyticalData()
  }, [])

  const totalStats = analyticalData.reduce(
    (acc, testType) => {
      testType.testClasses.forEach((testClass) => {
        testClass.skillTestsStatistics.forEach((skill) => {
          acc.totalQuestions += skill.questionsCount
          acc.totalAnswers += skill.correctAnswersCount
        })
      })
      return acc
    },
    { totalQuestions: 0, totalAnswers: 0 },
  )

  return (
    <>
      {!loading && !error && analyticalData.length > 0 && (
        <div className=" space-y-4">
       {currentColor === "قدرات" ? (
            analyticalData.length > 0 ? (
              analyticalData
                .filter((testType) => testType.value === "Qudrat")
                .map((testType) => (
                  <div key={`qudrat-${testType.id}`} className="overflow-hidden">
                    {testType.testClasses.map((testClass) => (
                      <div key={`qudrat-class-${testClass.id}`} className="rounded-lg border mb-6 border-gray-200">
                        <div className="flex justify-between items-center p-4 rounded-l-lg rounded-r-lg bg-green-100">
                          <div className="flex items-center gap-2">
                            <h2 className="font-bold">{testClass.value}</h2>
                            <span className="text-gray-500 text-sm">إحصائيات التحليل التفصيلي</span>
                          </div>
                          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-black/5 p-1 rounded" type="button">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>

                        <div className="py-4 w-full gap-3 flex flex-col justify-between items-center border-b">
                          <div className="grid px-4 grid-cols-2 gap-3 md:grid-cols-4 md:gap-24">
                            <div className="flex flex-row-reverse items-center gap-2">
                              <Lock className="text-gray-400" size={16} />
                              <span className="text-teal-500 text-sm">2 التقييم للمشتركين</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-purple-800">الإجابات الصحيحة</span>
                              <span className="text-teal-500 font-bold">{totalStats.totalAnswers}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-purple-800">إجمالي الأسئلة</span>
                              <span className="text-teal-500 font-bold">{totalStats.totalQuestions}</span>
                            </div>
                            <button className="bg-purple-800 text-white px-6 py-1.5 rounded-md text-sm hover:bg-purple-900 transition-colors" type="button">
                              عرض التفاصيل
                            </button>
                          </div>

                          <div className="w-full border-t">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50 text-purple-800 text-sm">
                                  <th className="py-2 px-4 text-right">المهارة</th>
                                  <th className="py-2 px-4 text-center">عدد الأسئلة</th>
                                  <th className="py-2 px-4 text-center">الإجابات الصحيحة</th>
                                  <th className="py-2 px-4 text-center">النسبة</th>
                                  <th className="py-2 px-4 text-center">الإجراء</th>
                                </tr>
                              </thead>
                              <tbody>
                                {testClass.skillTestsStatistics.map((skill) => (
                                  <tr key={`qudrat-skill-${skill.id}`} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 text-right">{skill.value}</td>
                                    <td className="py-3 px-4 text-center font-medium">{skill.questionsCount}</td>
                                    <td className="py-3 px-4 text-center font-medium text-green-600">
                                      {skill.correctAnswersCount}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span
                                        className={`font-medium ${
                                          skill.ratio >= 0.8
                                            ? "text-green-600"
                                            : skill.ratio >= 0.6
                                              ? "text-yellow-600"
                                              : "text-red-600"
                                        }`}
                                      >
                                        {(skill.ratio * 100).toFixed(1)}%
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <button className="bg-purple-800 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-900 transition-colors" type="button">
                                        تدرب
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>لا توجد إحصائيات متاحة لـ Qudrat</p>
              </div>
            )
          ) : 
          analyticalData.length > 0 ? (
            analyticalData
              .filter((testType) => testType.value === "Tahsili")
              .map((testType) => (
                <div key={`tahsili-${testType.id}`} className="overflow-hidden">
                  {testType.testClasses.map((testClass) => (
                    <div key={`tahsili-class-${testClass.id}`} className="rounded-lg border mb-6 border-gray-200">
                      <div className="flex justify-between items-center p-4 rounded-l-lg rounded-r-lg  bg-green-100">
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold">{testClass.value}</h2>
                          <span className="text-gray-500 text-sm">إحصائيات التحليل التفصيلي</span>
                        </div>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-black/5 p-1 rounded" type="button">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>

                      <div className="py-4 w-full gap-3 flex flex-col justify-between items-center border-b">
                        <div className="grid px-4 grid-cols-2 gap-3 md:grid-cols-4 md:gap-24">
                          <div className="flex flex-row-reverse items-center gap-2">
                            <Lock className="text-gray-400" size={16} />
                            <span className="text-teal-500 text-sm">2 التقييم للمشتركين</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-800">الإجابات الصحيحة</span>
                            <span className="text-teal-500 font-bold">{totalStats.totalAnswers}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-800">إجمالي الأسئلة</span>
                            <span className="text-teal-500 font-bold">{totalStats.totalQuestions}</span>
                          </div>
                          <button className="bg-purple-800 text-white px-6 py-1.5 rounded-md text-sm hover:bg-purple-900 transition-colors" type="button">
                            عرض التفاصيل
                          </button>
                        </div>

                        <div className="w-full border-t">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 text-purple-800 text-sm">
                                <th className="py-2 px-4 text-right">المهارة</th>
                                <th className="py-2 px-4 text-center">عدد الأسئلة</th>
                                <th className="py-2 px-4 text-center">الإجابات الصحيحة</th>
                                <th className="py-2 px-4 text-center">النسبة</th>
                                <th className="py-2 px-4 text-center">الإجراء</th>
                              </tr>
                            </thead>
                            <tbody>
                              {testClass.skillTestsStatistics.map((skill) => (
                                <tr key={skill.id} className="border-b hover:bg-gray-50">
                                  <td className="py-3 px-4 text-right">{skill.value}</td>
                                  <td className="py-3 px-4 text-center font-medium">{skill.questionsCount}</td>
                                  <td className="py-3 px-4 text-center font-medium text-green-600">
                                    {skill.correctAnswersCount}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <span
                                      className={`font-medium ${
                                        skill.ratio >= 0.8
                                          ? "text-green-600"
                                          : skill.ratio >= 0.6
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                      }`}
                                    >
                                      {(skill.ratio * 100).toFixed(1)}%
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <button className="bg-purple-800 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-900 transition-colors" type="button">
                                      تدرب
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد إحصائيات متاحة لـ Tahsili</p>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
            <p className="mt-2 text-gray-600">جاري تحميل الإحصائيات...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4">
              <p className="text-red-800 font-semibold mb-2">خطأ في تحميل الإحصائيات</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => {
                  setError(null)
                  const fetchAnalyticalData = async () => {
                    const statisticsData = await getAnalyticalStatistics()
                    if (statisticsData && Array.isArray(statisticsData)) {
                      setAnalyticalData(statisticsData)
                    }
                  }
                  fetchAnalyticalData()
                }}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                type="button">
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}

        {!loading && !error && analyticalData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>لا توجد إحصائيات متاحة</p>
          </div>
        )}
      </div>
    </>
  )
}












// "use client";

// import { useSelector } from 'react-redux';
// import { RootState } from './lib/store';
// import { useAnalyticalStatistics } from './hooks/useAnalyticalStatistics';
// import { TestClassCard } from './TestClassCard';
// import { LoadingSpinner } from './LoadingSpinner';
// import { ErrorDisplay } from './ErrorDisplay';

// export default function AssessmentSection() {
//   const { analyticalData, loading, error, refetch } = useAnalyticalStatistics();
//   const currentColor = useSelector((state: RootState) => state.background.name);

//   const totalStats = analyticalData.reduce(
//     (acc, testType) => {
//       testType.testClasses.forEach((testClass) => {
//         testClass.skillTestsStatistics.forEach((skill) => {
//           acc.totalQuestions += skill.questionsCount;
//           acc.totalAnswers += skill.correctAnswersCount;
//         });
//       });
//       return acc;
//     },
//     { totalQuestions: 0, totalAnswers: 0 }
//   );

//   const filteredData = analyticalData.filter((testType) =>
//     currentColor === "قدرات" ? testType.value === "Qudrat" : testType.value === "Tahsili"
//   );

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <ErrorDisplay error={error} onRetry={refetch} />;
//   }

//   if (analyticalData.length === 0) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         <p>لا توجد إحصائيات متاحة</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {filteredData.length > 0 ? (
//         filteredData.map((testType) => (
//           <div key={`${testType.value.toLowerCase()}-${testType.id}`} className="overflow-hidden">
//             {testType.testClasses.map((testClass) => (
//               <TestClassCard
//                 key={`${testType.value.toLowerCase()}-class-${testClass.id}`}
//                 testClass={testClass}
//                 totalAnswers={totalStats.totalAnswers}
//                 totalQuestions={totalStats.totalQuestions}
//               />
//             ))}
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-8 text-gray-500">
//           <p>
//             لا توجد إحصائيات متاحة لـ {currentColor === "قدرات" ? "Qudrat" : "Tahsili"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }