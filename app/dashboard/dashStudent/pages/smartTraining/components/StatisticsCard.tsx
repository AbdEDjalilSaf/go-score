// import React from 'react';
// import { BarChart3, TrendingUp, Target, Award } from 'lucide-react';
// import { TestType } from '../types/api';

// interface StatisticsCardProps {
//   testTypes: TestType[];
// }

// const StatisticsCard: React.FC<StatisticsCardProps> = ({ testTypes }) => {
//   // Calculate overall statistics
//   const totalQuestions = testTypes.reduce((total, testType) => 
//     total + testType.testClasses.reduce((classTotal, testClass) => 
//       classTotal + testClass.skillTestsStatistics.reduce((skillTotal, skill) => 
//         skillTotal + skill.questionsCount, 0), 0), 0);

//   const totalCorrect = testTypes.reduce((total, testType) => 
//     total + testType.testClasses.reduce((classTotal, testClass) => 
//       classTotal + testClass.skillTestsStatistics.reduce((skillTotal, skill) => 
//         skillTotal + skill.correctAnswersCount, 0), 0), 0);

//   const overallRatio = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//       <div className="flex items-center gap-2 mb-4">
//         <BarChart3 className="w-5 h-5 text-purple-600" />
//         <h3 className="text-lg font-semibold text-gray-800">إحصائيات التدريب</h3>
//       </div>

//       {/* Overall Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-50 rounded-lg p-4 text-center">
//           <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
//           <div className="text-sm text-blue-600">إجمالي الأسئلة</div>
//         </div>
        
//         <div className="bg-green-50 rounded-lg p-4 text-center">
//           <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
//           <div className="text-sm text-green-600">الإجابات الصحيحة</div>
//         </div>
        
//         <div className="bg-purple-50 rounded-lg p-4 text-center">
//           <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-purple-600">{overallRatio.toFixed(1)}%</div>
//           <div className="text-sm text-purple-600">معدل النجاح</div>
//         </div>
//       </div>

//       {/* Detailed Statistics */}
//       <div className="space-y-4">
//         {testTypes.map((testType) => (
//           <div key={testType.id} className="border border-gray-100 rounded-lg p-4">
//             <h4 className="font-medium text-gray-800 mb-3">{testType.value}</h4>
            
//             {testType.testClasses.map((testClass) => (
//               <div key={testClass.id} className="mb-4 last:mb-0">
//                 <h5 className="text-sm font-medium text-gray-700 mb-2">{testClass.value}</h5>
                
//                 <div className="space-y-2">
//                   {testClass.skillTestsStatistics.map((skill) => (
//                     <div key={skill.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-gray-800">{skill.value}</div>
//                         <div className="text-xs text-gray-500">
//                           {skill.correctAnswersCount} من {skill.questionsCount} أسئلة
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <div className="w-24 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-purple-600 h-2 rounded-full transition-all duration-300"
//                             style={{ width: `${skill.ratio}%` }}
//                           />
//                         </div>
//                         <div className="text-sm font-semibold text-purple-600 min-w-[3rem] text-right">
//                           {skill.ratio.toFixed(1)}%
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatisticsCard;















// import React from 'react';
// import { BarChart3, TrendingUp, Target, Award } from 'lucide-react';
// import { TestType } from '../types/api';

// interface StatisticsCardProps {
//   testTypes: TestType[];
// }

// const StatisticsCard: React.FC<StatisticsCardProps> = ({ testTypes }) => {
//   // Add null check and default to empty array
//   const safeTestTypes = testTypes || [];

//   // Calculate overall statistics
//   const totalQuestions = safeTestTypes.reduce((total, testType) => 
//     total + testType.testClasses.reduce((classTotal, testClass) => 
//       classTotal + testClass.skillTestsStatistics.reduce((skillTotal, skill) => 
//         skillTotal + skill.questionsCount, 0), 0), 0);

//   const totalCorrect = safeTestTypes.reduce((total, testType) => 
//     total + testType.testClasses.reduce((classTotal, testClass) => 
//       classTotal + testClass.skillTestsStatistics.reduce((skillTotal, skill) => 
//         skillTotal + skill.correctAnswersCount, 0), 0), 0);

//   const overallRatio = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

//   // Don't render if no data
//   if (!testTypes || testTypes.length === 0) {
//     return null;
//   }

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//       <div className="flex items-center gap-2 mb-4">
//         <BarChart3 className="w-5 h-5 text-purple-600" />
//         <h3 className="text-lg font-semibold text-gray-800">إحصائيات التدريب</h3>
//       </div>

//       {/* Overall Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-50 rounded-lg p-4 text-center">
//           <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
//           <div className="text-sm text-blue-600">إجمالي الأسئلة</div>
//         </div>
        
//         <div className="bg-green-50 rounded-lg p-4 text-center">
//           <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
//           <div className="text-sm text-green-600">الإجابات الصحيحة</div>
//         </div>
        
//         <div className="bg-purple-50 rounded-lg p-4 text-center">
//           <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-purple-600">{overallRatio.toFixed(1)}%</div>
//           <div className="text-sm text-purple-600">معدل النجاح</div>
//         </div>
//       </div>

//       {/* Detailed Statistics */}
//       <div className="space-y-4">
//         {safeTestTypes.map((testType) => (
//           <div key={testType.id} className="border border-gray-100 rounded-lg p-4">
//             <h4 className="font-medium text-gray-800 mb-3">{testType.value}</h4>
            
//             {testType.testClasses.map((testClass) => (
//               <div key={testClass.id} className="mb-4 last:mb-0">
//                 <h5 className="text-sm font-medium text-gray-700 mb-2">{testClass.value}</h5>
                
//                 <div className="space-y-2">
//                   {testClass.skillTestsStatistics.map((skill) => (
//                     <div key={skill.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-gray-800">{skill.value}</div>
//                         <div className="text-xs text-gray-500">
//                           {skill.correctAnswersCount} من {skill.questionsCount} أسئلة
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <div className="w-24 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-purple-600 h-2 rounded-full transition-all duration-300"
//                             style={{ width: `${skill.ratio}%` }}
//                           />
//                         </div>
//                         <div className="text-sm font-semibold text-purple-600 min-w-[3rem] text-right">
//                           {skill.ratio.toFixed(1)}%
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatisticsCard;













import React from 'react';
import { TestType } from '../types/api';
import { TrendingUp, Target, Award, BarChart3 } from 'lucide-react';

interface StatisticsCardProps {
  testTypes: TestType[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
  testTypes, 
  loading, 
  error, 
  onRefresh 
}) => {
  // Calculate overall statistics
  const calculateOverallStats = () => {
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalSkills = 0;

    testTypes.forEach(testType => {
      testType.testClasses.forEach(testClass => {
        testClass.skillTestsStatistics.forEach(skill => {
          totalQuestions += skill.questionsCount;
          totalCorrect += skill.correctAnswersCount;
          totalSkills++;
        });
      });
    });

    const averageRatio = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    return {
      totalQuestions,
      totalCorrect,
      totalSkills,
      averageRatio: Math.round(averageRatio)
    };
  };

  const stats = calculateOverallStats();

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">خطأ في تحميل الإحصائيات</div>
          <button
            onClick={onRefresh}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            type="button"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">الإحصائيات التحليلية</h3>
        <button
          onClick={onRefresh}
          className="text-purple-600 hover:text-purple-800 transition-colors"
          type="button"
        >
          تحديث
        </button>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalQuestions}</div>
          <div className="text-sm text-gray-600">إجمالي الأسئلة</div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.totalCorrect}</div>
          <div className="text-sm text-gray-600">الإجابات الصحيحة</div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mb-2">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalSkills}</div>
          <div className="text-sm text-gray-600">المهارات المختبرة</div>
        </div>

        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-600">{stats.averageRatio}%</div>
          <div className="text-sm text-gray-600">متوسط النجاح</div>
        </div>
      </div>

      {/* Detailed Statistics by Test Type */}
      {testTypes.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">تفصيل الإحصائيات</h4>
          {testTypes.map((testType) => (
            <div key={testType.id} className="border border-gray-100 rounded-lg p-4">
              <h5 className="font-medium text-purple-700 mb-3">{testType.value}</h5>
              <div className="space-y-2">
                {testType.testClasses.map((testClass) => (
                  <div key={testClass.id} className="bg-gray-50 rounded-md p-3">
                    <div className="font-medium text-sm text-gray-700 mb-2">{testClass.value}</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      {testClass.skillTestsStatistics.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center bg-white rounded px-2 py-1">
                          <span className="text-gray-600">{skill.value}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{skill.correctAnswersCount}/{skill.questionsCount}</span>
                            <span 
                              className={`font-medium ${
                                skill.ratio >= 70 ? 'text-green-600' : 
                                skill.ratio >= 50 ? 'text-orange-600' : 'text-red-600'
                              }`}
                            >
                              {Math.round(skill.ratio)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;