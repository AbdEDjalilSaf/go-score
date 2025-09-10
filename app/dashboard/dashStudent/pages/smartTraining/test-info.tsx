// interface TestInfoProps {
//   testInfo: {
//     quantitativeSection: string
//     verbalSection: string
//     questionsCount: number
//     expectedTime: string
//   }
// }

// export default function TestInfo({ testInfo }: TestInfoProps) {
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 mt-4">
//       <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>

//       <div className="flex flex-col px-2 justify-between md:flex-row-reverse gap-7 text-center mb-6">
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
//           <p className="text-gray-800">{testInfo.expectedTime}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
//           <p className="text-gray-800">{testInfo.questionsCount}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">القسم اللفظي</h3>
//           <p className="text-gray-800">{testInfo.verbalSection}</p>
//         </div>
//         <div>
//           <h3 className="text-blue-600 font-bold mb-1">القسم الكمي</h3>
//           <p className="text-gray-800">{testInfo.quantitativeSection}</p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">ابدأ الاختبار</button>
//       </div>
//     </div>
//   )
// }















import React from 'react';
import { Clock, FileText, Play, AlertCircle } from 'lucide-react';
import { TestInfo as TestInfoType } from './types/api';

interface TestInfoProps {
  testInfo: TestInfoType;
  selectedQuestionsCount?: number;
  selectedCategoriesCount?: number;
  isLoading?: boolean;
}

const TestInfo: React.FC<TestInfoProps> = ({ 
  testInfo, 
  selectedQuestionsCount = 0,
  selectedCategoriesCount = 0,
  isLoading = false 
}) => {
  // Calculate dynamic expected time based on selected questions (assuming 1.5 minutes per question)
  const calculateExpectedTime = (questionsCount: number) => {
    if (questionsCount === 0) return testInfo.expectedTime;
    const minutes = Math.round(questionsCount * 1.5);
    return `${minutes} دقيقة`;
  };

  const dynamicExpectedTime = selectedQuestionsCount > 0 
    ? calculateExpectedTime(selectedQuestionsCount)
    : testInfo.expectedTime;

  const dynamicQuestionsCount = selectedQuestionsCount > 0 
    ? selectedQuestionsCount 
    : testInfo.numberOfQuestions;

  const hasSelections = selectedQuestionsCount > 0 && selectedCategoriesCount > 0;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">{testInfo.title}</h3>
      
      {/* Selection Summary */}
      {hasSelections && (
        <div className="bg-purple-700/50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-purple-200">
            <AlertCircle className="w-4 h-4" />
            <span>تم اختيار {selectedCategoriesCount} فئة</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-200" />
          <div>
            <div className="text-sm text-purple-200">{testInfo.labels.expectedTime}</div>
            <div className="font-semibold">
              {isLoading ? (
                <div className="animate-pulse bg-purple-300/30 h-5 w-16 rounded"></div>
              ) : (
                dynamicExpectedTime
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-200" />
          <div>
            <div className="text-sm text-purple-200">{testInfo.labels.numberOfQuestions}</div>
            <div className="font-semibold">
              {isLoading ? (
                <div className="animate-pulse bg-purple-300/30 h-5 w-12 rounded"></div>
              ) : (
                dynamicQuestionsCount
              )}
            </div>
          </div>
        </div>
      </div>
      
      <button
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
          hasSelections && !isLoading
            ? 'bg-white text-purple-700 hover:bg-purple-50'
            : 'bg-purple-500/50 text-purple-200 cursor-not-allowed'
        }`}
        type="button"
        disabled={!hasSelections || isLoading}
      >
        <Play className="w-4 h-4" />
        {isLoading ? 'جاري التحديث...' : testInfo.startButtonText}
      </button>
      
      {!hasSelections && !isLoading && (
        <p className="text-center text-sm text-purple-200 mt-2">
          يرجى اختيار فئة واحدة على الأقل لبدء الاختبار
        </p>
      )}
    </div>
  );
};

export default TestInfo;