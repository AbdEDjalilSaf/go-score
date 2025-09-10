// import React from 'react';
// import { Clock, FileText, Play } from 'lucide-react';
// import { TestInfo as TestInfoType } from '../types/api';

// interface TestInfoProps {
//   testInfo: TestInfoType;
//   selectedQuestionsCount: number;
//   selectedCategoriesCount: number;
//   isLoading: boolean;
// }

// const TestInfo: React.FC<TestInfoProps> = ({ testInfo, selectedQuestionsCount, selectedCategoriesCount, isLoading }) => {
//   return (
//     <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white">
//      <h3 className="text-lg font-bold mb-4">{testInfo.title}</h3>
      
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <Clock className="w-5 h-5 text-purple-200" />
//           <div>
//             <div className="text-sm text-purple-200">{testInfo.labels.expectedTime}</div>
//             <div className="font-semibold">{testInfo.expectedTime}</div>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <FileText className="w-5 h-5 text-purple-200" />
//           <div>
//             <div className="text-sm text-purple-200">{testInfo.labels.numberOfQuestions}</div>
//             <div className="font-semibold">{testInfo.numberOfQuestions}</div>
//           </div>
//         </div>
//       </div>
      
//       <button
//         className="w-full bg-white text-purple-700 font-semibold py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-2"
//         type="button"
//       >
//         <Play className="w-4 h-4" />
//         {testInfo.startButtonText}
//       </button>
//     </div>
//   );
// };

// export default TestInfo;


















// import React from 'react';
// import { Clock, FileText, Play, Loader2, AlertCircle } from 'lucide-react';
// import { TestInfo as TestInfoType } from '../types/api';

// interface TestInfoProps {
//   testInfo: TestInfoType;
//   selectedQuestionsCount: number;
//   selectedCategoriesCount: number;
//   isLoading: boolean;
//   onStartTraining: () => void;
//   loadingQuestions: boolean;
//   hasSelections: boolean;
// }

// const TestInfo: React.FC<TestInfoProps> = ({ 
//   testInfo, 
//   selectedQuestionsCount, 
//   selectedCategoriesCount, 
//   isLoading,
//   onStartTraining,
//   loadingQuestions,
//   hasSelections
// }) => {
//   return (
//     <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white">
//       <h3 className="text-lg font-bold mb-4">{testInfo.title}</h3>
      
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <Clock className="w-5 h-5 text-purple-200" />
//           <div>
//             <div className="text-sm text-purple-200">{testInfo.labels.expectedTime}</div>
//             <div className="font-semibold">{testInfo.expectedTime}</div>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <FileText className="w-5 h-5 text-purple-200" />
//           <div>
//             <div className="text-sm text-purple-200">{testInfo.labels.numberOfQuestions}</div>
//             <div className="font-semibold">
//               {selectedQuestionsCount > 0 ? selectedQuestionsCount : testInfo.numberOfQuestions}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Selection Summary */}
//       {hasSelections && (
//         <div className="bg-white/10 rounded-lg p-3 mb-4">
//           <div className="text-sm text-purple-100">
//             الفئات المحددة: {selectedCategoriesCount} 
//             {/* |  */}
//             {/* الأسئلة المتوقعة: {selectedQuestionsCount} */}
//           </div>
//         </div>
//       )}

//       {/* Warning message if no selections */}
//       {!hasSelections && !loadingQuestions && (
//         <div className="bg-orange-500/20 rounded-lg p-3 mb-4 flex items-center gap-2">
//           <AlertCircle className="w-4 h-4 text-orange-200" />
//           <div className="text-sm text-orange-100">
//             يرجى اختيار فئة واحدة على الأقل لبدء التدريب
//           </div>
//         </div>
//       )}
      
//       <button
//         onClick={onStartTraining}
//         disabled={isLoading || loadingQuestions || !hasSelections}
//         className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
//           isLoading || loadingQuestions || !hasSelections
//             ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
//             : 'bg-white text-purple-700 hover:bg-purple-50'
//         }`}
//         type="button"
//       >
//         {loadingQuestions ? (
//           <>
//             <Loader2 className="w-4 h-4 animate-spin" />
//             جاري تحميل الأسئلة...
//           </>
//         ) : (
//           <>
//             <Play className="w-4 h-4" />
//             {testInfo.startButtonText}
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// export default TestInfo;




















import React from 'react';
import { Clock, FileText, Play, Database, Loader2 } from 'lucide-react';
import { TestInfo as TestInfoType } from '../types/api';

interface TestInfoProps {
  testInfo: TestInfoType;
  selectedQuestionsCount: number;
  selectedCategoriesCount: number;
  availableQuestionsCount?: number;
  isLoading: boolean;
  questionsLoading?: boolean;
  onStartTraining?: () => void;
}

const TestInfo: React.FC<TestInfoProps> = ({ 
  testInfo, 
  selectedQuestionsCount, 
  selectedCategoriesCount, 
  availableQuestionsCount = 0,
  isLoading,
  questionsLoading = false,
  onStartTraining 
}) => {
  const hasSelections = selectedQuestionsCount > 0 && selectedCategoriesCount > 0;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4">{testInfo.title}</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-200" />
          <div>
            <div className="text-sm text-purple-200">{testInfo.labels.expectedTime}</div>
            <div className="font-semibold">{Math.ceil(availableQuestionsCount * 1.5)}</div>
          </div>
        </div>
        
        {/* <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-200" />
          <div>
            <div className="text-sm text-purple-200">{testInfo.labels.numberOfQuestions}</div>
            <div className="font-semibold">
              {hasSelections ? selectedQuestionsCount : testInfo.numberOfQuestions}
            </div>
          </div>
        </div> */}
        <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-purple-200" />
              <div>
                <div className="text-purple-200">الأسئلة المتاحة</div>
                <div className="font-semibold text-white">{availableQuestionsCount}</div>
              </div>
            </div>
      </div>

      {/* Additional info when selections are made */}
      {hasSelections && (
        <div className="bg-purple-700/50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-200" />
              <div>
                <div className="text-purple-200">المهارات المختارة</div>
                <div className="font-semibold text-white">{selectedCategoriesCount}</div>
              </div>
            </div>
          </div>
          
          {availableQuestionsCount !== selectedQuestionsCount && (
            <div className="mt-2 text-xs text-purple-200">
              ملاحظة: عدد الأسئلة المتاحة فعلياً قد يختلف عن المتوقع
            </div>
          )}
        </div>
      )}

      <button
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          hasSelections && !questionsLoading
            ? 'bg-white text-purple-700 hover:bg-purple-50' 
            : 'bg-purple-500/50 text-purple-200 cursor-not-allowed'
        }`}
        type="button"
        disabled={!hasSelections || questionsLoading || isLoading}
        onClick={onStartTraining}
      >
        {questionsLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جاري تحميل الأسئلة...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            {hasSelections ? testInfo.startButtonText : 'اختر المهارات أولاً'}
          </>
        )}
      </button>

      {!hasSelections && (
        <p className="text-center text-xs text-purple-200 mt-2">
          يرجى اختيار المهارات التي تريد التدرب عليها
        </p>
      )}
    </div>
  );
};

export default TestInfo;