// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Clock, 
//   CheckCircle, 
//   XCircle, 
//   RotateCcw,
//   Home,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import quizData  from '../data/data.json'
// // import DashStudent from "../../../dashStudent"
// import { Question, Choice } from '../services/api';
// // import DashStudent from '../../../dashStudent';

// interface QuizInterfaceProps {
//   questions: Question[];
//   onComplete: (results: QuizResults) => void;
//   onExit: () => void;
// }

// export interface QuizResults {
//   totalQuestions: number;
//   correctAnswers: number;
//   incorrectAnswers: number;
//   timeSpent: number;
//   answers: Array<{
//     questionId: string;
//     selectedChoiceId: string;
//     isCorrect: boolean;
//     timeSpent: number;
//   }>;
// }

// const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);

//   const currentQuestion = questions[currentQuestionIndex];

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Reset question start time when question changes
//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestionIndex]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleAnswerSelect = (choiceId: string) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: choiceId
//     }));
//   };


//   // const handleAnswerVerify = (answerValue: string) => {
//   //   setSelectedAnswers(prev => ({
//   //     ...prev,
//   //     [currentQuestion.answer]: answerValue
//   //   }));
//   // };


//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleFinishQuiz = () => {
//     // Calculate results
//     let correctCount = 0;
//     const answerDetails = questions.map(question => {
//       const selectedChoiceId = selectedAnswers[question.id];
//       const selectedChoice = question.choiceResponses.find(c => c.id === selectedChoiceId);
//       const isCorrect = selectedChoice?.value === question.answer;
      
//       if (isCorrect) correctCount++;
    
//       return {
//         questionId: question.id,
//         selectedChoiceId: selectedChoiceId || '',
//         isCorrect,
//         timeSpent: 0 // You could track individual question times if needed
//       };
//     });

//     const quizResults: QuizResults = {
//       totalQuestions: questions.length,
//       correctAnswers: correctCount,
//       incorrectAnswers: questions.length - correctCount,
//       timeSpent,
//       answers: answerDetails
//     };

//     setResults(quizResults);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers({});
//     setTimeSpent(0);
//     setShowResults(false);
//     setResults(null);
//   };

//   const getProgressPercentage = () => {
//     return ((currentQuestionIndex + 1) / questions.length) * 100;
//   };

//   const getAnsweredQuestionsCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
//           <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
//           <button
//             onClick={onExit}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             type="button"
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults && results) {
//     const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
//               percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
//             }`}>
//               <Target className={`w-12 h-12 ${
//                 percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//               }`} />
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
//             <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600">إجمالي الأسئلة</span>
//                 <span className="font-bold text-gray-800">{results.totalQuestions}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-green-700">الإجابات الصحيحة</span>
//                 <span className="font-bold text-green-800">{results.correctAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//                 <span className="text-red-700">الإجابات الخاطئة</span>
//                 <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                 <span className="text-blue-700">الوقت المستغرق</span>
//                 <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
//                 <span className="text-purple-700">النسبة المئوية</span>
//                 <span className={`font-bold text-2xl ${
//                   percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {percentage}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleRestart}
//                 className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <RotateCcw className="w-4 h-4" />
//                 إعادة المحاولة
//               </button>

//               <button
//                 onClick={() => onComplete(results)}
//                 className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <Home className="w-4 h-4" />
//                 العودة للرئيسية
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // <DashStudent>
//     <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onExit}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//                 type="button"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//               <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-purple-600">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 السؤال {currentQuestionIndex + 1} من {questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${getProgressPercentage()}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
//               {/* <span>متبقي: {questions.length - getAnsweredQuestionsCount()}</span> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Question Content */}
//       <div className="max-w-7xl mx-auto p-6">
//       <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
//                     {/* Quiz Statistics */}
//                     <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white aead text-xs">!</span>
//                         </div>
//                         <span className="font-medium lead">تقييم الواجبات</span>
//                       </div>
//                       <div className="p-4 rown space-y-4"> 
//                         <div className="grid awon grid-cols-2 gap-4">
//                           <div className="text-center vead">
//                             <div className="text-3xl xead font-bold text-red-500 mb-1">{results?.incorrectAnswers || 0}</div>
//                             <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
//                           </div>
//                           <div className="text-center meed">
//                             <div className="text-3xl need font-bold text-green-500 mb-1">{results?.correctAnswers || 0}</div>
//                             <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
//                           </div>
//                         </div>
//                         <div className="text-center beed">
//                           <div className="text-3xl zeed font-bold text-yellow-500 mb-1">{quizData.quiz.stats.earnedPoints}</div>
//                           <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
//                         </div>
//                       </div>
//                     </div>
        
//                     {/* Help Tools */}
//                     <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white  text-xs">🔒</span>
//                         </div>
//                         <span className="font-medium">وسائل المساعدة</span>
//                       </div>
//                       <div className="p-4 space-y-3">
//                         {quizData.quiz.helpTools.map((tool, index) => (
//                           <button
//                             key={index}
//                             name="veed"
//                             className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
//                               tool.color === "green"
//                                 ? "bg-green-500 hover:bg-green-600 text-white"
//                                 : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
//                             }`} 
//                             type="button">
//                             {tool.text}
//                           </button>
//                         ))}
//                       </div>
                    
        
//                     {/* Action Buttons */}
//                     <div className="space-y-3 px-4 pb-5 mt-5">
//                       <button  className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">➕</span>
//                         {quizData.navigation.pauseTraining}
//                       </button>
//                       <button name="jeek"  className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">⚠️</span>
//                         {quizData.navigation.reportError}
//                       </button>
//                     </div>
//                     </div>
//                   </div>


//         <div className="bg-white w-full rounded-2xl shadow-xl p-8">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-6">
//               <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
//             </div>
//           </div>

//           {/* Choices */}
//           <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
//             <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
//             <button 
//                  onClick={() => handleAnswerSelect(currentQuestion.answer)}
//                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md `}
//                  type="button">
//                  <div className="flex items-center gap-4">
//                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                      selectedAnswers[currentQuestion.id] === currentQuestion.id 
//                        ? 'border-purple-500 bg-purple-500 text-white' 
//                        : 'border-gray-300 text-gray-500'
//                    }`}>
//                      {/* {(currentQuestionIndex + 1) % 2 === 0 ? <CheckCircle className="w-4 h-4" /> : 'D'} */}
//                    </div>
//                    <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.id ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                      {currentQuestion.answer}
//                    </span> 
//                  </div> 
//                </button>
//             </div>
//           <div className="space-y-3 ">
//             {currentQuestion.choiceResponses.map((choice, index) => {
//               const isSelected = selectedAnswers[currentQuestion.id] === choice.id;
//               // const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

//               return (
//                 <button
//                   key={choice.id}
//                   onClick={() => handleAnswerSelect(choice.id)}
//                   className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md`}
//                   type="button">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-300 text-gray-500'
//                     }`}>
//                       {/* {isSelected ? <CheckCircle className="w-4 h-4" /> : choiceLabel} */}
//                     </div>
//                     <span className={`text-lg ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                       {choice.value}
//                     </span>
//                   </div> 
//                 </button>
//               );
//             })}
//           </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex mt-8 justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             type="button">
//               <ChevronRight className="w-4 h-4" />
//               السابق
//             </button>

//             <div className="flex gap-3">
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   onClick={handleFinishQuiz}
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
//                 type="button">
//                   إنهاء الاختبار
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                 type="button">
//                   التالي
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>


//         {/* Question Navigation */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
//           <div className="grid grid-cols-10 gap-2">
//             {questions.map((question, index) => {
//               const isAnswered = selectedAnswers[question.id];
//               const isCurrent = index === currentQuestionIndex;

//               return (
//                 <button
//                   key={question.id}
//                   onClick={() => setCurrentQuestionIndex(index)}
//                   className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
//                     isCurrent
//                       ? 'bg-purple-500 text-white ring-2 ring-purple-300'
//                       : isAnswered
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 type="button">
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//     // </DashStudent>
//   );
// };

// export default QuizInterface;
















// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Clock,  
//   XCircle, 
//   RotateCcw,
//   Home,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import StopTrainingModal from './StopTrainingModal';
// import quizData  from '../data/data.json'
// // import DashStudent from "../../../dashStudent"
// import { Question, Choice } from '../services/api';
// // import DashStudent from '../../../dashStudent';

// interface QuizInterfaceProps {
//   questions: Question[];
//   onComplete: (results: QuizResults) => void;
//   onExit: () => void;
// }

// export interface QuizResults {
//   totalQuestions: number;
//   correctAnswers: number;
//   incorrectAnswers: number;
//   timeSpent: number;
//   answers: Array<{
//     questionId: string;
//     selectedChoiceId: string;
//     isCorrect: boolean;
//     timeSpent: number;
//   }>;
// }

// const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isTraining, setIsTraining] = useState(true);
//   const [progress, setProgress] = useState(65);

//   const currentQuestion = questions[currentQuestionIndex];



//   const handleStopTraining = () => {
//     setIsTraining(false);
//     setIsModalOpen(false);
//     setProgress(0);
//   };

//   const handleStartTraining = () => {
//     setIsTraining(true);
//     setProgress(65);
//   };


//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Reset question start time when question changes
//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestionIndex]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleAnswerSelect = (selectedValue: string) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: selectedValue
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleFinishQuiz = () => {
//     // Calculate results
//     let correctCount = 0;
//     const answerDetails = questions.map(question => {
//       const selectedValue = selectedAnswers[question.id];
//       const isCorrect = selectedValue === question.answer;
      
//       if (isCorrect) correctCount++;
    
//       return {
//         questionId: question.id,
//         selectedChoiceId: selectedValue || '',
//         isCorrect,
//         timeSpent: 0 // You could track individual question times if needed
//       };
//     });

//     const quizResults: QuizResults = {
//       totalQuestions: questions.length,
//       correctAnswers: correctCount,
//       incorrectAnswers: questions.length - correctCount,
//       timeSpent,
//       answers: answerDetails
//     };

//     setResults(quizResults);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers({});
//     setTimeSpent(0);
//     setShowResults(false);
//     setResults(null);
//   };

//   const getProgressPercentage = () => {
//     return ((currentQuestionIndex + 1) / questions.length) * 100;
//   };

//   const getAnsweredQuestionsCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
//           <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
//           <button
//             onClick={onExit}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             type="button"
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults && results) {
//     const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
//               percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
//             }`}>
//               <Target className={`w-12 h-12 ${
//                 percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//               }`} />
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
//             <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600">إجمالي الأسئلة</span>
//                 <span className="font-bold text-gray-800">{results.totalQuestions}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-green-700">الإجابات الصحيحة</span>
//                 <span className="font-bold text-green-800">{results.correctAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//                 <span className="text-red-700">الإجابات الخاطئة</span>
//                 <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                 <span className="text-blue-700">الوقت المستغرق</span>
//                 <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
//                 <span className="text-purple-700">النسبة المئوية</span>
//                 <span className={`font-bold text-2xl ${
//                   percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {percentage}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleRestart}
//                 className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <RotateCcw className="w-4 h-4" />
//                 إعادة المحاولة
//               </button>

//               <button
//                 onClick={() => onComplete(results)}
//                 className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <Home className="w-4 h-4" />
//                 العودة للرئيسية
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // <DashStudent>
//     <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onExit}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//                 type="button"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//               <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-purple-600">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 السؤال {currentQuestionIndex + 1} من {questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${getProgressPercentage()}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
//               {/* <span>متبقي: {questions.length - getAnsweredQuestionsCount()}</span> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Question Content */}
//       <div className="max-w-7xl mx-auto p-6">
//       <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
//                     {/* Quiz Statistics */}
//                     <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white aead text-xs">!</span>
//                         </div>
//                         <span className="font-medium lead">تقييم الواجبات</span>
//                       </div>
//                       <div className="p-4 rown space-y-4"> 
//                         <div className="grid awon grid-cols-2 gap-4">
//                           <div className="text-center vead">
//                             <div className="text-3xl xead font-bold text-red-500 mb-1">{results?.incorrectAnswers || 0}</div>
//                             <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
//                           </div>
//                           <div className="text-center meed">
//                             <div className="text-3xl need font-bold text-green-500 mb-1">{results?.correctAnswers || 0}</div>
//                             <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
//                           </div>
//                         </div>
//                         <div className="text-center beed">
//                           <div className="text-3xl zeed font-bold text-yellow-500 mb-1">{quizData.quiz.stats.earnedPoints}</div>
//                           <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
//                         </div>
//                       </div>
//                     </div>
        
//                     {/* Help Tools */}
//                     <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white  text-xs">🔒</span>
//                         </div>
//                         <span className="font-medium">وسائل المساعدة</span>
//                       </div>
//                       <div className="p-4 space-y-3">
//                         {quizData.quiz.helpTools.map((tool, index) => (
//                           <button
//                             key={index}
//                             name="veed"
//                             className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
//                               tool.color === "green"
//                                 ? "bg-green-500 hover:bg-green-600 text-white"
//                                 : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
//                             }`} 
//                             type="button">
//                             {tool.text}
//                           </button>
//                         ))}
//                       </div>
                    
//                     {/* Action Buttons */}
//                     <div className="space-y-3 px-4 pb-5 mt-5">
//                       <button onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">➕</span>
//                         {quizData.navigation.pauseTraining}
//                       </button>
//                       <button name="jeek" onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">⚠️</span>
//                         {quizData.navigation.reportError}
//                       </button>
//                     </div>
//                     </div>
//                   </div>


//         <div className="bg-white w-full rounded-2xl shadow-xl p-8">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-6">
//               <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
//             </div>
//           </div>

//           {/* Choices */}
//           <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
//             <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
//             <button 
//                  onClick={() => handleAnswerSelect(currentQuestion.answer)}
//                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                    selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                      ? 'border-purple-500 bg-purple-50' 
//                      : 'border-gray-200'
//                  }`}
//                  type="button">
//                  <div className="flex items-center gap-4">
//                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                      selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                        ? 'border-purple-500 bg-purple-500 text-white' 
//                        : 'border-gray-300 text-gray-500'
//                    }`}>
//                      {/* {selectedAnswers[currentQuestion.id] === currentQuestion.answer ? <CheckCircle className="w-4 h-4" /> : '✓'} */}
//                    </div>
//                    <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                      {currentQuestion.answer}
//                    </span> 
//                  </div>  
//                </button>
//             </div>
//           <div className="space-y-3 ">
//             {currentQuestion.choiceResponses.map((choice, index) => {
//               const isSelected = selectedAnswers[currentQuestion.id] === choice.value;
//               const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

//               return (
//                 <button
//                   key={choice.id}
//                   onClick={() => handleAnswerSelect(choice.value)}
//                   className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                     isSelected 
//                       ? 'border-purple-500 bg-purple-50' 
//                       : 'border-gray-200'
//                   }`}
//                   type="button">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-300 text-gray-500'
//                     }`}>
//                       {/* {isSelected ? <CheckCircle className="w-4 h-4" /> : choiceLabel} */}
//                     </div>
//                     <span className={`text-lg ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                       {choice.value}
//                     </span>
//                   </div> 
//                 </button>
//               );
//             })}
//           </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex mt-8 justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             type="button">
//               <ChevronRight className="w-4 h-4" />
//               السابق
//             </button>

//             <div className="flex gap-3">
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   onClick={handleFinishQuiz}
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
//                 type="button">
//                   إنهاء الاختبار
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                 type="button">
//                   التالي
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>


//         {/* Question Navigation */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
//           <div className="grid grid-cols-10 gap-2">
//             {questions.map((question, index) => {
//               const isAnswered = selectedAnswers[question.id];
//               const isCurrent = index === currentQuestionIndex;

//               return (
//                 <button
//                   key={question.id}
//                   onClick={() => setCurrentQuestionIndex(index)}
//                   className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
//                     isCurrent
//                       ? 'bg-purple-500 text-white ring-2 ring-purple-300'
//                       : isAnswered
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                   type="button">
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <StopTrainingModal
//         isOpen={isModalOpen}
//         isExit={onExit}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleStopTraining}
//       />
//     </div>
//     // </DashStudent>
//   );
// };

// export default QuizInterface;

















// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Clock,  
//   XCircle, 
//   RotateCcw,
//   Home,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import StopTrainingModal from './StopTrainingModal';
// import quizData  from '../data/data.json'
// import { Question, Choice } from '../services/api';

// interface QuizInterfaceProps {
//   questions: Question[];
//   onComplete: (results: QuizResults) => void;
//   onExit: () => void;
// }

// export interface QuizResults {
//   totalQuestions: number;
//   correctAnswers: number;
//   incorrectAnswers: number;
//   timeSpent: number;
//   answers: Array<{
//     questionId: string;
//     selectedChoiceId: string;
//     isCorrect: boolean;
//     timeSpent: number;
//   }>;
// }

// const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isTraining, setIsTraining] = useState(true);
//   const [progress, setProgress] = useState(65);
  
//   // New state variables for real-time statistics
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [incorrectAnswers, setIncorrectAnswers] = useState(0);
//   const [earnedPoints, setEarnedPoints] = useState(0);

//   const currentQuestion = questions[currentQuestionIndex];

//   const handleStopTraining = () => {
//     setIsTraining(false);
//     setIsModalOpen(false);
//     setProgress(0);
//   };

//   const handleStartTraining = () => {
//     setIsTraining(true);
//     setProgress(65);
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Reset question start time when question changes
//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestionIndex]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // New function to handle individual question answers
//   const handleQuiz = (selectedValue: string) => {
//     const isCorrect = selectedValue === currentQuestion.answer;
    
//     // Update statistics based on answer correctness
//     if (isCorrect) {
//       setCorrectAnswers(prev => prev + 1);
//       // Add 10 points for each correct answer
//       setEarnedPoints(prev => prev + 10);
//     } else {
//       setIncorrectAnswers(prev => prev + 1);
//     }
//   };

//   const handleAnswerSelect = (selectedValue: string) => {
//     // Check if this question was already answered
//     const previousAnswer = selectedAnswers[currentQuestion.id];
    
//     // If changing an existing answer, adjust statistics first
//     if (previousAnswer) {
//       const wasCorrect = previousAnswer === currentQuestion.answer;
      
//       if (wasCorrect) {
//         // Was correct before, now changing: remove from correct
//         setCorrectAnswers(prev => prev - 1);
//         setEarnedPoints(prev => prev - 10);
//       } else {
//         // Was incorrect before, now changing: remove from incorrect
//         setIncorrectAnswers(prev => prev - 1);
//       }
//     }
    
//     // Update the selected answers
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: selectedValue
//     }));
    
//     // Now handle the new answer
//     handleQuiz(selectedValue);
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleFinishQuiz = () => {
//     // Calculate results
//     let correctCount = 0;
//     const answerDetails = questions.map(question => {
//       const selectedValue = selectedAnswers[question.id];
//       const isCorrect = selectedValue === question.answer;
      
//       if (isCorrect) correctCount++;
    
//       return {
//         questionId: question.id,
//         selectedChoiceId: selectedValue || '',
//         isCorrect,
//         timeSpent: 0 // You could track individual question times if needed
//       };
//     });

//     const quizResults: QuizResults = {
//       totalQuestions: questions.length,
//       correctAnswers: correctCount,
//       incorrectAnswers: questions.length - correctCount,
//       timeSpent,
//       answers: answerDetails
//     };

//     setResults(quizResults);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers({});
//     setTimeSpent(0);
//     setShowResults(false);
//     setResults(null);
//     // Reset new state variables
//     setCorrectAnswers(0);
//     setIncorrectAnswers(0);
//     setEarnedPoints(0);
//   };

//   const getProgressPercentage = () => {
//     return ((currentQuestionIndex + 1) / questions.length) * 100;
//   };

//   const getAnsweredQuestionsCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
//           <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
//           <button
//             onClick={onExit}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             type="button"
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults && results) {
//     const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
//               percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
//             }`}>
//               <Target className={`w-12 h-12 ${
//                 percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//               }`} />
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
//             <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600">إجمالي الأسئلة</span>
//                 <span className="font-bold text-gray-800">{results.totalQuestions}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-green-700">الإجابات الصحيحة</span>
//                 <span className="font-bold text-green-800">{results.correctAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//                 <span className="text-red-700">الإجابات الخاطئة</span>
//                 <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                 <span className="text-blue-700">الوقت المستغرق</span>
//                 <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
//                 <span className="text-purple-700">النسبة المئوية</span>
//                 <span className={`font-bold text-2xl ${
//                   percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {percentage}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleRestart}
//                 className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <RotateCcw className="w-4 h-4" />
//                 إعادة المحاولة
//               </button>

//               <button
//                 onClick={() => onComplete(results)}
//                 className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <Home className="w-4 h-4" />
//                 العودة للرئيسية
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onExit}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//                 type="button"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//               <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-purple-600">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 السؤال {currentQuestionIndex + 1} من {questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${getProgressPercentage()}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Question Content */}
//       <div className="max-w-7xl mx-auto p-6">
//       <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
//                     {/* Quiz Statistics */}
//                     <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white aead text-xs">!</span>
//                         </div>
//                         <span className="font-medium lead">تقييم الواجبات</span>
//                       </div>
//                       <div className="p-4 rown space-y-4"> 
//                         <div className="grid awon grid-cols-2 gap-4">
//                           <div className="text-center vead">
//                             <div className="text-3xl xead font-bold text-red-500 mb-1">{incorrectAnswers}</div>
//                             <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
//                           </div>
//                           <div className="text-center meed">
//                             <div className="text-3xl need font-bold text-green-500 mb-1">{correctAnswers}</div>
//                             <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
//                           </div>
//                         </div>
//                         <div className="text-center beed">
//                           <div className="text-3xl zead font-bold text-yellow-500 mb-1">{earnedPoints}</div>
//                           <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
//                         </div>
//                       </div>
//                     </div>
        
//                     {/* Help Tools */}
//                     <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white  text-xs">🔒</span>
//                         </div>
//                         <span className="font-medium">وسائل المساعدة</span>
//                       </div>
//                       <div className="p-4 space-y-3">
//                         {quizData.quiz.helpTools.map((tool, index) => (
//                           <button
//                             key={index}
//                             name="veed"
//                             className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
//                               tool.color === "green"
//                                 ? "bg-green-500 hover:bg-green-600 text-white"
//                                 : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
//                             }`} 
//                             type="button">
//                             {tool.text}
//                           </button>
//                         ))}
//                       </div>
                    
//                     {/* Action Buttons */}
//                     <div className="space-y-3 px-4 pb-5 mt-5">
//                       <button onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">➕</span>
//                         {quizData.navigation.pauseTraining}
//                       </button>
//                       <button name="jeek" onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">⚠️</span>
//                         {quizData.navigation.reportError}
//                       </button>
//                     </div>
//                     </div>
//                   </div>


//         <div className="bg-white w-full rounded-2xl shadow-xl p-8">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-6">
//               <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
//             </div>
//           </div>

//           {/* Choices */}
//           <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
//             <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
//             <button 
//                  onClick={() => handleAnswerSelect(currentQuestion.answer)}
//                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                    selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                      ? 'border-purple-500 bg-purple-50' 
//                      : 'border-gray-200'
//                  }`}
//                  type="button">
//                  <div className="flex items-center gap-4">
//                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                      selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                        ? 'border-purple-500 bg-purple-500 text-white' 
//                        : 'border-gray-300 text-gray-500'
//                    }`}>
//                    </div>
//                    <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                      {currentQuestion.answer}
//                    </span> 
//                  </div>  
//                </button>
//             </div>
//           <div className="space-y-3 ">
//             {currentQuestion.choiceResponses.map((choice, index) => {
//               const isSelected = selectedAnswers[currentQuestion.id] === choice.value;
//               const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

//               return (
//                 <button
//                   key={choice.id}
//                   onClick={() => handleAnswerSelect(choice.value)}
//                   className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                     isSelected 
//                       ? 'border-purple-500 bg-purple-50' 
//                       : 'border-gray-200'
//                   }`}
//                   type="button">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-300 text-gray-500'
//                     }`}>
//                     </div>
//                     <span className={`text-lg ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                       {choice.value}
//                     </span>
//                   </div> 
//                 </button>
//               );
//             })}
//           </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex mt-8 justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             type="button">
//               <ChevronRight className="w-4 h-4" />
//               السابق
//             </button>

//             <div className="flex gap-3">
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   onClick={handleFinishQuiz}
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
//                 type="button">
//                   إنهاء الاختبار
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                 type="button">
//                   التالي
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>


//         {/* Question Navigation */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
//           <div className="grid grid-cols-10 gap-2">
//             {questions.map((question, index) => {
//               const isAnswered = selectedAnswers[question.id];
//               const isCurrent = index === currentQuestionIndex;

//               return (
//                 <button
//                   key={question.id}
//                   onClick={() => setCurrentQuestionIndex(index)}
//                   className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
//                     isCurrent
//                       ? 'bg-purple-500 text-white ring-2 ring-purple-300'
//                       : isAnswered
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                   type="button">
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <StopTrainingModal
//         isOpen={isModalOpen}
//         isExit={onExit}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleStopTraining}
//       />
//     </div>
//   );
// };

// export default QuizInterface;













// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Clock,  
//   XCircle, 
//   RotateCcw,
//   Home,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import StopTrainingModal from './StopTrainingModal';
// import quizData  from '../data/data.json'
// import { Question, Choice } from '../services/api';

// interface QuizInterfaceProps {
//   questions: Question[];
//   onComplete: (results: QuizResults) => void;
//   onExit: () => void;
// }

// export interface QuizResults {
//   totalQuestions: number;
//   correctAnswers: number;
//   incorrectAnswers: number;
//   timeSpent: number;
//   answers: Array<{
//     questionId: string;
//     selectedChoiceId: string;
//     isCorrect: boolean;
//     timeSpent: number;
//   }>;
// }

// const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isTraining, setIsTraining] = useState(true);
//   const [progress, setProgress] = useState(65);
  
//   // State to track which questions have been processed for statistics
//   const [processedQuestions, setProcessedQuestions] = useState<Set<string>>(new Set());
  
//   // Real-time statistics
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [incorrectAnswers, setIncorrectAnswers] = useState(0);
//   const [earnedPoints, setEarnedPoints] = useState(0);

//   const currentQuestion = questions[currentQuestionIndex];

//   const handleStopTraining = () => {
//     setIsTraining(false);
//     setIsModalOpen(false);
//     setProgress(0);
//   };

//   const handleStartTraining = () => {
//     setIsTraining(true);
//     setProgress(65);
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Reset question start time when question changes
//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestionIndex]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Function to process question statistics when moving to next question
//   const processQuestionStatistics = (questionId: string) => {
//     const question = questions.find(q => q.id === questionId);
//     const selectedAnswer = selectedAnswers[questionId];
    
//     if (!question || !selectedAnswer || processedQuestions.has(questionId)) {
//       return;
//     }

//     const isCorrect = selectedAnswer === question.answer;
    
//     if (isCorrect) {
//       setCorrectAnswers(prev => prev + 1);
//       setEarnedPoints(prev => prev + 1);
//     } else {
//       setIncorrectAnswers(prev => prev + 1);
//     }

//     // Mark this question as processed
//     setProcessedQuestions(prev => new Set([...prev, questionId]));
//   };

//   const handleAnswerSelect = (selectedValue: string) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: selectedValue
//     }));
//   };

//   const handleNext = () => {
//     // Process current question statistics before moving to next
//     processQuestionStatistics(currentQuestion.id);
    
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleFinishQuiz = () => {
//     // Process the last question statistics
//     processQuestionStatistics(currentQuestion.id);
    
//     // Process any remaining unprocessed questions
//     questions.forEach(question => {
//       if (selectedAnswers[question.id] && !processedQuestions.has(question.id)) {
//         const isCorrect = selectedAnswers[question.id] === question.answer;
//         if (isCorrect) {
//           setCorrectAnswers(prev => prev + 1);
//           setEarnedPoints(prev => prev + 1);
//         } else {
//           setIncorrectAnswers(prev => prev + 1);
//         }
//       }
//     });

//     // Calculate results
//     let correctCount = 0;
//     const answerDetails = questions.map(question => {
//       const selectedValue = selectedAnswers[question.id];
//       const isCorrect = selectedValue === question.answer;
      
//       if (isCorrect) correctCount++;
    
//       return {
//         questionId: question.id,
//         selectedChoiceId: selectedValue || '',
//         isCorrect,
//         timeSpent: 0 // You could track individual question times if needed
//       };
//     });

//     const quizResults: QuizResults = {
//       totalQuestions: questions.length,
//       correctAnswers: correctCount,
//       incorrectAnswers: questions.length - correctCount,
//       timeSpent,
//       answers: answerDetails
//     };

//     setResults(quizResults);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers({});
//     setTimeSpent(0);
//     setShowResults(false);
//     setResults(null);
//     // Reset new state variables
//     setCorrectAnswers(0);
//     setIncorrectAnswers(0);
//     setEarnedPoints(0);
//     setProcessedQuestions(new Set());
//   };

//   const getProgressPercentage = () => {
//     return ((currentQuestionIndex + 1) / questions.length) * 100;
//   };

//   const getAnsweredQuestionsCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
//           <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
//           <button
//             onClick={onExit}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             type="button"
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults && results) {
//     const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
//               percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
//             }`}>
//               <Target className={`w-12 h-12 ${
//                 percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//               }`} />
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
//             <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600">إجمالي الأسئلة</span>
//                 <span className="font-bold text-gray-800">{results.totalQuestions}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-green-700">الإجابات الصحيحة</span>
//                 <span className="font-bold text-green-800">{results.correctAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//                 <span className="text-red-700">الإجابات الخاطئة</span>
//                 <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                 <span className="text-blue-700">الوقت المستغرق</span>
//                 <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
//                 <span className="text-purple-700">النسبة المئوية</span>
//                 <span className={`font-bold text-2xl ${
//                   percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {percentage}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleRestart}
//                 className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <RotateCcw className="w-4 h-4" />
//                 إعادة المحاولة
//               </button>

//               <button
//                 onClick={() => onComplete(results)}
//                 className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <Home className="w-4 h-4" />
//                 العودة للرئيسية
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onExit}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//                 type="button"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//               <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-purple-600">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 السؤال {currentQuestionIndex + 1} من {questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${getProgressPercentage()}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Question Content */}
//       <div className="max-w-7xl mx-auto p-6">
//       <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
//                     {/* Quiz Statistics */}
//                     <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white aead text-xs">!</span>
//                         </div>
//                         <span className="font-medium lead">تقييم الواجبات</span>
//                       </div>
//                       <div className="p-4 rown space-y-4"> 
//                         <div className="grid awon grid-cols-2 gap-4">
//                           <div className="text-center vead">
//                             <div className="text-3xl xead font-bold text-red-500 mb-1">{incorrectAnswers}</div>
//                             <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
//                           </div>
//                           <div className="text-center meed">
//                             <div className="text-3xl need font-bold text-green-500 mb-1">{correctAnswers}</div>
//                             <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
//                           </div>
//                         </div>
//                         <div className="text-center beed">
//                           <div className="text-3xl zead font-bold text-yellow-500 mb-1">{earnedPoints}</div>
//                           <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
//                         </div>
//                       </div>
//                     </div>
        
//                     {/* Help Tools */}
//                     <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white  text-xs">🔒</span>
//                         </div>
//                         <span className="font-medium">وسائل المساعدة</span>
//                       </div>
//                       <div className="p-4 space-y-3">
//                         {quizData.quiz.helpTools.map((tool, index) => (
//                           <button
//                             key={index}
//                             name="veed"
//                             className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
//                               tool.color === "green"
//                                 ? "bg-green-500 hover:bg-green-600 text-white"
//                                 : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
//                             }`} 
//                             type="button">
//                             {tool.text}
//                           </button>
//                         ))}
//                       </div>
                    
//                     {/* Action Buttons */}
//                     <div className="space-y-3 px-4 pb-5 mt-5">
//                       <button onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">➕</span>
//                         {quizData.navigation.pauseTraining}
//                       </button>
//                       <button name="jeek" onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">⚠️</span>
//                         {quizData.navigation.reportError}
//                       </button>
//                     </div>
//                     </div>
//                   </div>


//         <div className="bg-white w-full rounded-2xl shadow-xl p-8">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-6">
//               <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
//             </div>
//           </div>

//           {/* Choices */}
//           <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
//             <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
//             <button 
//                  onClick={() => handleAnswerSelect(currentQuestion.answer)}
//                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                    selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                      ? 'border-purple-500 bg-purple-50' 
//                      : 'border-gray-200'
//                  }`}
//                  type="button">
//                  <div className="flex items-center gap-4">
//                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                      selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                        ? 'border-purple-500 bg-purple-500 text-white' 
//                        : 'border-gray-300 text-gray-500'
//                    }`}>
//                    </div>
//                    <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                      {currentQuestion.answer}
//                    </span> 
//                  </div>  
//                </button>
//             </div>
//           <div className="space-y-3 ">
//             {currentQuestion.choiceResponses.map((choice, index) => {
//               const isSelected = selectedAnswers[currentQuestion.id] === choice.value;
//               const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

//               return (
//                 <button
//                   key={choice.id}
//                   onClick={() => handleAnswerSelect(choice.value)}
//                   className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                     isSelected 
//                       ? 'border-purple-500 bg-purple-50' 
//                       : 'border-gray-200'
//                   }`}
//                   type="button">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                       isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-300 text-gray-500'
//                     }`}>
//                     </div>
//                     <span className={`text-lg ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                       {choice.value}
//                     </span>
//                   </div> 
//                 </button>
//               );
//             })}
//           </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex mt-8 justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             type="button">
//               <ChevronRight className="w-4 h-4" />
//               السابق
//             </button>

//             <div className="flex gap-3">
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   onClick={handleFinishQuiz}
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
//                 type="button">
//                   إنهاء الاختبار
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                 type="button">
//                   التالي
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>


//         {/* Question Navigation */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
//           <div className="grid grid-cols-10 gap-2">
//             {questions.map((question, index) => {
//               const isAnswered = selectedAnswers[question.id];
//               const isCurrent = index === currentQuestionIndex;

//               return (
//                 <button
//                   key={question.id}
//                   onClick={() => setCurrentQuestionIndex(index)}
//                   className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
//                     isCurrent
//                       ? 'bg-purple-500 text-white ring-2 ring-purple-300'
//                       : isAnswered
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                   type="button">
//                   {index + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <StopTrainingModal
//         isOpen={isModalOpen}
//         isExit={onExit}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleStopTraining}
//       />
//     </div>
//   );
// };

// export default QuizInterface;













// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Clock,  
//   XCircle, 
//   RotateCcw,
//   Home,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import StopTrainingModal from './StopTrainingModal';
// import quizData  from '../data/data.json'
// import { Question, Choice } from '../services/api';

// interface QuizInterfaceProps {
//   questions: Question[];
//   onComplete: (results: QuizResults) => void;
//   onExit: () => void;
// }

// export interface QuizResults {
//   totalQuestions: number;
//   correctAnswers: number;
//   incorrectAnswers: number;
//   timeSpent: number;
//   answers: Array<{
//     questionId: string;
//     selectedChoiceId: string;
//     isCorrect: boolean;
//     timeSpent: number;
//   }>;
// }

// const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
//   const [timeSpent, setTimeSpent] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState<QuizResults | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isTraining, setIsTraining] = useState(true);
//   const [progress, setProgress] = useState(65);
  
//   // State to track which questions have been processed for statistics
//   const [processedQuestions, setProcessedQuestions] = useState<Set<string>>(new Set());
  
//   // Real-time statistics
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [incorrectAnswers, setIncorrectAnswers] = useState(0);
//   const [earnedPoints, setEarnedPoints] = useState(0);

//   // New state for help features
//   const [easySolutionUsed, setEasySolutionUsed] = useState<Set<string>>(new Set());
//   const [blockedChoices, setBlockedChoices] = useState<Record<string, string[]>>({});

//   const currentQuestion = questions[currentQuestionIndex];

//   const handleStopTraining = () => {
//     setIsTraining(false);
//     setIsModalOpen(false);
//     setProgress(0);
//   };

//   const handleStartTraining = () => {
//     setIsTraining(true);
//     setProgress(65);
//   };

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeSpent(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Reset question start time when question changes
//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestionIndex]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Function to process question statistics when moving to next question
//   const processQuestionStatistics = (questionId: string) => {
//     const question = questions.find(q => q.id === questionId);
//     const selectedAnswer = selectedAnswers[questionId];
    
//     if (!question || !selectedAnswer || processedQuestions.has(questionId)) {
//       return;
//     }

//     const isCorrect = selectedAnswer === question.answer;
    
//     if (isCorrect) {
//       setCorrectAnswers(prev => prev + 1);
//       setEarnedPoints(prev => prev + 1);
//     } else {
//       setIncorrectAnswers(prev => prev + 1);
//     }

//     // Mark this question as processed
//     setProcessedQuestions(prev => new Set([...prev, questionId]));
//   };

//   const handleAnswerSelect = (selectedValue: string) => {
//     setSelectedAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: selectedValue
//     }));
//   };

//   // Handle easy solution button click
//   const handleEasySolution = () => {
//     // Check if user has earned points
//     if (earnedPoints <= 0) {
//       return; // Don't do anything if no points earned
//     }

//     const questionId = currentQuestion.id;
    
//     // Check if easy solution already used for this question
//     if (easySolutionUsed.has(questionId)) {
//       return; // Already used for this question
//     }

//     // Find wrong choices to block
//     const wrongChoices = currentQuestion.choiceResponses
//       .filter(choice => choice.value !== currentQuestion.answer)
//       .map(choice => choice.value);

//     // Block half of the wrong choices (at least 1)
//     const choicesToBlock = wrongChoices.slice(0, Math.max(1, Math.floor(wrongChoices.length / 2)));
    
//     // Update blocked choices
//     setBlockedChoices(prev => ({
//       ...prev,
//       [questionId]: choicesToBlock
//     }));

//     // Mark as used for this question
//     setEasySolutionUsed(prev => new Set([...prev, questionId]));

//     // Deduct one point
//     setEarnedPoints(prev => Math.max(0, prev - 1));
//   };

//   // Check if a choice is blocked
//   const isChoiceBlocked = (choiceValue: string) => {
//     const questionId = currentQuestion.id;
//     return blockedChoices[questionId]?.includes(choiceValue) || false;
//   };

//   // Check if easy solution can be used
//   const canUseEasySolution = () => {
//     return earnedPoints > 0 && !easySolutionUsed.has(currentQuestion.id);
//   };

//   const handleNext = () => {
//     // Process current question statistics before moving to next
//     processQuestionStatistics(currentQuestion.id);
    
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleFinishQuiz = () => {
//     // Process the last question statistics
//     processQuestionStatistics(currentQuestion.id);
    
//     // Process any remaining unprocessed questions
//     questions.forEach(question => {
//       if (selectedAnswers[question.id] && !processedQuestions.has(question.id)) {
//         const isCorrect = selectedAnswers[question.id] === question.answer;
//         if (isCorrect) {
//           setCorrectAnswers(prev => prev + 1);
//           setEarnedPoints(prev => prev + 1);
//         } else {
//           setIncorrectAnswers(prev => prev + 1);
//         }
//       }
//     });

//     // Calculate results
//     let correctCount = 0;
//     const answerDetails = questions.map(question => {
//       const selectedValue = selectedAnswers[question.id];
//       const isCorrect = selectedValue === question.answer;
      
//       if (isCorrect) correctCount++;
    
//       return {
//         questionId: question.id,
//         selectedChoiceId: selectedValue || '',
//         isCorrect,
//         timeSpent: 0 // You could track individual question times if needed
//       };
//     });

//     const quizResults: QuizResults = {
//       totalQuestions: questions.length,
//       correctAnswers: correctCount,
//       incorrectAnswers: questions.length - correctCount,
//       timeSpent,
//       answers: answerDetails
//     };

//     setResults(quizResults);
//     setShowResults(true);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers({});
//     setTimeSpent(0);
//     setShowResults(false);
//     setResults(null);
//     // Reset new state variables
//     setCorrectAnswers(0);
//     setIncorrectAnswers(0);
//     setEarnedPoints(0);
//     setProcessedQuestions(new Set());
//     // Reset help feature states
//     setEasySolutionUsed(new Set());
//     setBlockedChoices({});
//   };

//   const getProgressPercentage = () => {
//     return ((currentQuestionIndex + 1) / questions.length) * 100;
//   };

//   const getAnsweredQuestionsCount = () => {
//     return Object.keys(selectedAnswers).length;
//   };

//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
//           <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
//           <button
//             onClick={onExit}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
//             type="button"
//           >
//             العودة للصفحة الرئيسية
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (showResults && results) {
//     const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//           <div className="text-center">
//             <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
//               percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
//             }`}>
//               <Target className={`w-12 h-12 ${
//                 percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//               }`} />
//             </div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
//             <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

//             <div className="space-y-4 mb-8">
//               <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600">إجمالي الأسئلة</span>
//                 <span className="font-bold text-gray-800">{results.totalQuestions}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
//                 <span className="text-green-700">الإجابات الصحيحة</span>
//                 <span className="font-bold text-green-800">{results.correctAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
//                 <span className="text-red-700">الإجابات الخاطئة</span>
//                 <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
//                 <span className="text-blue-700">الوقت المستغرق</span>
//                 <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
//               </div>

//               <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
//                 <span className="text-purple-700">النسبة المئوية</span>
//                 <span className={`font-bold text-2xl ${
//                   percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {percentage}%
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleRestart}
//                 className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <RotateCcw className="w-4 h-4" />
//                 إعادة المحاولة
//               </button>

//               <button
//                 onClick={() => onComplete(results)}
//                 className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <Home className="w-4 h-4" />
//                 العودة للرئيسية
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onExit}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//                 type="button"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//               <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-purple-600">
//                 <Clock className="w-5 h-5" />
//                 <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 السؤال {currentQuestionIndex + 1} من {questions.length}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${getProgressPercentage()}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Question Content */}
//       <div className="max-w-7xl mx-auto p-6">
//       <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
//                     {/* Quiz Statistics */}
//                     <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white aead text-xs">!</span>
//                         </div>
//                         <span className="font-medium lead">تقييم الواجبات</span>
//                       </div>
//                       <div className="p-4 rown space-y-4"> 
//                         <div className="grid awon grid-cols-2 gap-4">
//                           <div className="text-center vead">
//                             <div className="text-3xl xead font-bold text-red-500 mb-1">{incorrectAnswers}</div>
//                             <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
//                           </div>
//                           <div className="text-center meed">
//                             <div className="text-3xl need font-bold text-green-500 mb-1">{correctAnswers}</div>
//                             <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
//                           </div>
//                         </div>
//                         <div className="text-center beed">
//                           <div className="text-3xl zead font-bold text-yellow-500 mb-1">{earnedPoints}</div>
//                           <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
//                         </div>
//                       </div>
//                     </div>
        
//                     {/* Help Tools */}
//                     <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
//                       <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
//                         <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
//                           <span className="text-white  text-xs">🔒</span>
//                         </div>
//                         <span className="font-medium">وسائل المساعدة</span>
//                       </div>
//                       <div className="p-4 space-y-3">
//                         {quizData.quiz.helpTools.map((tool, index) => (
//                           <button
//                             key={index}
//                             name="veed"
//                             onClick={tool.text === "تسهيل الحل" ? handleEasySolution : undefined}
//                             disabled={tool.text === "تسهيل الحل" && !canUseEasySolution()}
//                             className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
//                               tool.color === "green"
//                                 ? canUseEasySolution() && tool.text === "تسهيل الحل"
//                                   ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
//                                   : tool.text === "تسهيل الحل"
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-green-500 hover:bg-green-600 text-white"
//                                 : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
//                             }`} 
//                             type="button">
//                             {tool.text}
//                             {tool.text === "تسهيل الحل" && (
//                               <span className="text-xs block mt-1">
//                                 {earnedPoints <= 0 
//                                   ? "(يحتاج نقاط)" 
//                                   : easySolutionUsed.has(currentQuestion.id)
//                                   ? "(مُستخدم)"
//                                   : `(متاح - يكلف نقطة)`
//                                 }
//                               </span>
//                             )}
//                           </button>
//                         ))}
//                       </div>
                    
//                     {/* Action Buttons */}
//                     <div className="space-y-3 px-4 pb-5 mt-5">
//                       <button onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">➕</span>
//                         {quizData.navigation.pauseTraining}
//                       </button>
//                       <button name="jeek" onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
//                         <span className="ml-2">⚠️</span>
//                         {quizData.navigation.reportError}
//                       </button>
//                     </div>
//                     </div>
//                   </div>


//         <div className="bg-white w-full rounded-2xl shadow-xl p-8">
//           {/* Question */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
//               {easySolutionUsed.has(currentQuestion.id) && (
//                 <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
//                   تم استخدام تسهيل الحل
//                 </div>
//               )}
//             </div>
//             <div className="bg-gray-50 rounded-xl p-6">
//               <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
//             </div>
//           </div>

//           {/* Choices */}
//           <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
//             <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
//             <button 
//                  onClick={() => handleAnswerSelect(currentQuestion.answer)}
//                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
//                    selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                      ? 'border-purple-500 bg-purple-50' 
//                      : 'border-gray-200'
//                  }`}
//                  type="button">
//                  <div className="flex items-center gap-4">
//                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                      selectedAnswers[currentQuestion.id] === currentQuestion.answer 
//                        ? 'border-purple-500 bg-purple-500 text-white' 
//                        : 'border-gray-300 text-gray-500'
//                    }`}>
//                    </div>
//                    <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
//                      {currentQuestion.answer}
//                    </span> 
//                  </div>  
//                </button>
//             </div>
//           <div className="space-y-3 ">
//             {currentQuestion.choiceResponses.map((choice, index) => {
//               const isSelected = selectedAnswers[currentQuestion.id] === choice.value;
//               const isBlocked = isChoiceBlocked(choice.value);
//               const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

//               return (
//                 <button
//                   key={choice.id}
//                   onClick={() => !isBlocked && handleAnswerSelect(choice.value)}
//                   disabled={isBlocked}
//                   className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 ${
//                     isBlocked
//                       ? 'border-red-200 bg-red-50 opacity-50 cursor-not-allowed'
//                       : isSelected 
//                       ? 'border-purple-500 bg-purple-50 hover:shadow-md' 
//                       : 'border-gray-200 hover:shadow-md'
//                   }`}
//                   type="button">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                       isBlocked
//                         ? 'border-red-300 bg-red-100 text-red-500'
//                         : isSelected 
//                         ? 'border-purple-500 bg-purple-500 text-white' 
//                         : 'border-gray-300 text-gray-500'
//                     }`}>
//                       {isBlocked && (
//                         <XCircle className="w-4 h-4" />
//                       )}
//                     </div>
//                     <span className={`text-lg ${
//                       isBlocked
//                         ? 'text-red-400 line-through'
//                         : isSelected 
//                         ? 'text-purple-700 font-medium' 
//                         : 'text-gray-700'
//                     }`}>
//                       {choice.value}
//                     </span>
//                     {isBlocked && (
//                       <span className="text-red-400 text-sm mr-auto">(محظور)</span>
//                     )}
//                   </div> 
//                 </button>
//               );
//             })}
//           </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex mt-8 justify-between items-center">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             type="button">
//               <ChevronRight className="w-4 h-4" />
//               السابق
//             </button>

//             <div className="flex gap-3">
//               {currentQuestionIndex === questions.length - 1 ? (
//                 <button
//                   onClick={handleFinishQuiz}
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
//                 type="button">
//                   إنهاء الاختبار
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                 type="button">
//                   التالي
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>


//         {/* Question Navigation */}
//         <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
//           <div className="grid grid-cols-10 gap-2">
//             {questions.map((question, index) => {
//               const isAnswered = selectedAnswers[question.id];
//               const isCurrent = index === currentQuestionIndex;
//               const hasEasyUsed = easySolutionUsed.has(question.id);

//               return (
//                 <button
//                   key={question.id}
//                   onClick={() => setCurrentQuestionIndex(index)}
//                   className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all relative ${
//                     isCurrent
//                       ? 'bg-purple-500 text-white ring-2 ring-purple-300'
//                       : isAnswered
//                       ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                   type="button">
//                   {index + 1}
//                   {hasEasyUsed && (
//                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <StopTrainingModal
//         isOpen={isModalOpen}
//         isExit={onExit}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleStopTraining}
//       />
//     </div>
//   );
// };

// export default QuizInterface;

















"use client"
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock,  
  XCircle, 
  RotateCcw,
  Home,
  BookOpen,
  Target,
  AlertCircle,
  Send
} from 'lucide-react';
import StopTrainingModal from './StopTrainingModal';
import quizData  from '../data/data.json'
import { Question, Choice } from '../services/api';

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (results: QuizResults) => void;
  onExit: () => void;
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  answers: Array<{
    questionId: string;
    selectedChoiceId: string;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, onComplete, onExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(true);
  const [progress, setProgress] = useState(65);
  
  // State to track which questions have been processed for statistics
  const [processedQuestions, setProcessedQuestions] = useState<Set<string>>(new Set());
  
  // Real-time statistics
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // New state for help features
  const [easySolutionUsed, setEasySolutionUsed] = useState<Set<string>>(new Set());
  const [blockedChoices, setBlockedChoices] = useState<Record<string, string[]>>({});

  // State for Report Error Modal
  const [isReportErrorModalOpen, setIsReportErrorModalOpen] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleStopTraining = () => {
    setIsTraining(false);
    setIsModalOpen(false);
    setProgress(0);
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    setProgress(65);
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset question start time when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to process question statistics when moving to next question
  const processQuestionStatistics = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    const selectedAnswer = selectedAnswers[questionId];
    
    if (!question || !selectedAnswer || processedQuestions.has(questionId)) {
      return;
    }

    const isCorrect = selectedAnswer === question.answer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setEarnedPoints(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }

    // Mark this question as processed
    setProcessedQuestions(prev => new Set([...prev, questionId]));
  };

  const handleAnswerSelect = (selectedValue: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedValue
    }));
  };

  // Handle easy solution button click
  const handleEasySolution = () => {
    // Check if user has earned points
    if (earnedPoints <= 0) {
      return; // Don't do anything if no points earned
    }

    const questionId = currentQuestion.id;
    
    // Check if easy solution already used for this question
    if (easySolutionUsed.has(questionId)) {
      return; // Already used for this question
    }

    // Find wrong choices to block
    const wrongChoices = currentQuestion.choiceResponses
      .filter(choice => choice.value !== currentQuestion.answer)
      .map(choice => choice.value);

    // Block half of the wrong choices (at least 1)
    const choicesToBlock = wrongChoices.slice(0, Math.max(1, Math.floor(wrongChoices.length / 2)));
    
    // Update blocked choices
    setBlockedChoices(prev => ({
      ...prev,
      [questionId]: choicesToBlock
    }));

    // Mark as used for this question
    setEasySolutionUsed(prev => new Set([...prev, questionId]));

    // Deduct one point
    setEarnedPoints(prev => Math.max(0, prev - 1));
  };

  // Check if a choice is blocked
  const isChoiceBlocked = (choiceValue: string) => {
    const questionId = currentQuestion.id;
    return blockedChoices[questionId]?.includes(choiceValue) || false;
  };

  // Check if easy solution can be used
  const canUseEasySolution = () => {
    return earnedPoints > 0 && !easySolutionUsed.has(currentQuestion.id);
  };

  const handleNext = () => {
    // Process current question statistics before moving to next
    processQuestionStatistics(currentQuestion.id);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    // Process the last question statistics
    processQuestionStatistics(currentQuestion.id);
    
    // Process any remaining unprocessed questions
    questions.forEach(question => {
      if (selectedAnswers[question.id] && !processedQuestions.has(question.id)) {
        const isCorrect = selectedAnswers[question.id] === question.answer;
        if (isCorrect) {
          setCorrectAnswers(prev => prev + 1);
          setEarnedPoints(prev => prev + 1);
        } else {
          setIncorrectAnswers(prev => prev + 1);
        }
      }
    });

    // Calculate results
    let correctCount = 0;
    const answerDetails = questions.map(question => {
      const selectedValue = selectedAnswers[question.id];
      const isCorrect = selectedValue === question.answer;
      
      if (isCorrect) correctCount++;
    
      return {
        questionId: question.id,
        selectedChoiceId: selectedValue || '',
        isCorrect,
        timeSpent: 0 // You could track individual question times if needed
      };
    });

    const quizResults: QuizResults = {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - correctCount,
      timeSpent,
      answers: answerDetails
    };

    setResults(quizResults);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeSpent(0);
    setShowResults(false);
    setResults(null);
    // Reset new state variables
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setEarnedPoints(0);
    setProcessedQuestions(new Set());
    // Reset help feature states
    setEasySolutionUsed(new Set());
    setBlockedChoices({});
  };

  // Handle report error submission
  const handleReportErrorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorFeedback.trim()) return;
    
    setIsSubmittingReport(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Error reported:', { 
      feedback: errorFeedback, 
      questionId: currentQuestion.id 
    });
    
    setReportSubmitted(true);
    setIsSubmittingReport(false);
    
    // Reset and close after showing success
    setTimeout(() => {
      setReportSubmitted(false);
      setErrorFeedback('');
      setIsReportErrorModalOpen(false);
    }, 2000);
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد أسئلة متاحة</h2>
          <p className="text-gray-600 mb-6">يرجى العودة واختيار المهارات المطلوبة</p>
          <button
            onClick={onExit}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            type="button"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  if (showResults && results) {
    const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <Target className={`w-12 h-12 ${
                percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">انتهت المحاولة!</h2>
            <p className="text-gray-600 mb-8">إليك نتائج أدائك في الاختبار</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">إجمالي الأسئلة</span>
                <span className="font-bold text-gray-800">{results.totalQuestions}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-green-700">الإجابات الصحيحة</span>
                <span className="font-bold text-green-800">{results.correctAnswers}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <span className="text-red-700">الإجابات الخاطئة</span>
                <span className="font-bold text-red-800">{results.incorrectAnswers}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-blue-700">الوقت المستغرق</span>
                <span className="font-bold text-blue-800">{formatTime(results.timeSpent)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-purple-700">النسبة المئوية</span>
                <span className={`font-bold text-2xl ${
                  percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {percentage}%
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة المحاولة
              </button>

              <button
                onClick={() => onComplete(results)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                <Home className="w-4 h-4" />
                العودة للرئيسية
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={onExit}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                type="button"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">اختبار التدريب الذكي</h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-purple-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg font-semibold">{formatTime(timeSpent)}</span>
              </div>

              <div className="text-sm text-gray-600">
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>مُجاب عليه: {getAnsweredQuestionsCount()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-7xl mx-auto p-6">
      <div className='flex flex-col items-center gap-12 md:gap-8 lg:gap-5 justify-between md:flex-row-reverse'>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 fead space-y-6 w-full  lg:w-[30%]">
                    {/* Quiz Statistics */}
                    <div className="bg-white soad rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gray-700 read text-white px-4 py-3 flex items-center">
                        <div className="w-5 h-5 kead bg-gray-500 rounded-full flex items-center justify-center ml-2">
                          <span className="text-white aead text-xs">!</span>
                        </div>
                        <span className="font-medium lead">تقييم الواجبات</span>
                      </div>
                      <div className="p-4 rown space-y-4"> 
                        <div className="grid awon grid-cols-2 gap-4">
                          <div className="text-center vead">
                            <div className="text-3xl xead font-bold text-red-500 mb-1">{incorrectAnswers}</div>
                            <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
                          </div>
                          <div className="text-center meed">
                            <div className="text-3xl need font-bold text-green-500 mb-1">{correctAnswers}</div>
                            <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
                          </div>
                        </div>
                        <div className="text-center beed">
                          <div className="text-3xl zead font-bold text-yellow-500 mb-1">{earnedPoints}</div>
                          <div className="text-sm jeed text-gray-600">النقاط المكتسبة</div>
                        </div>
                      </div>
                    </div>
        
                    {/* Help Tools */}
                    <div className="bg-white iood rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gray-700 uiid text-white px-4 py-3 flex items-center">
                        <div className="w-5 h-5 qwed bg-gray-500 rounded-full flex items-center justify-center ml-2">
                          <span className="text-white  text-xs">🔒</span>
                        </div>
                        <span className="font-medium">وسائل المساعدة</span>
                      </div>
                      <div className="p-4 space-y-3">
                        {quizData.quiz.helpTools.map((tool, index) => (
                          <button
                            key={index}
                            name="veed"
                            onClick={tool.text === "تسهيل الحل" ? handleEasySolution : undefined}
                            disabled={tool.text === "تسهيل الحل" && !canUseEasySolution()}
                            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                              tool.color === "green"
                                ? canUseEasySolution() && tool.text === "تسهيل الحل"
                                  ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                                  : tool.text === "تسهيل الحل"
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
                            }`} 
                            type="button">
                            {tool.text}
                            {tool.text === "تسهيل الحل" && (
                              <span className="text-xs block mt-1">
                                {earnedPoints <= 0 
                                  ? "(يحتاج نقاط)" 
                                  : easySolutionUsed.has(currentQuestion.id)
                                  ? "(مُستخدم)"
                                  : `(متاح - يكلف نقطة)`
                                }
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3 px-4 pb-5 mt-5">
                      <button onClick={()=> setIsModalOpen(true)} className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
                        <span className="ml-2">➕</span>
                        {quizData.navigation.pauseTraining}
                      </button>
                      <button 
                        name="jeek" 
                        onClick={() => setIsReportErrorModalOpen(true)} 
                        className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" 
                        type="button">
                        <span className="ml-2">⚠️</span>
                        {quizData.navigation.reportError}
                      </button>
                    </div>
                    </div>
                  </div>


        <div className="bg-white w-full rounded-2xl shadow-xl p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">{currentQuestionIndex + 1}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">السؤال</h2>
              {easySolutionUsed.has(currentQuestion.id) && (
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  تم استخدام تسهيل الحل
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
            </div>
          </div>

          {/* Choices */}
          <div className={`flex ${(currentQuestionIndex + 1) % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}>
            <div className={`${(currentQuestionIndex + 1) % 2 === 0 ? 'mb-3' : 'mt-3'}`}>
            <button 
                 onClick={() => handleAnswerSelect(currentQuestion.answer)}
                 className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                   selectedAnswers[currentQuestion.id] === currentQuestion.answer 
                     ? 'border-purple-500 bg-purple-50' 
                     : 'border-gray-200'
                 }`}
                 type="button">
                 <div className="flex items-center gap-4">
                   <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                     selectedAnswers[currentQuestion.id] === currentQuestion.answer 
                       ? 'border-purple-500 bg-purple-500 text-white' 
                       : 'border-gray-300 text-gray-500'
                   }`}>
                   </div>
                   <span className={`text-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.answer ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
                     {currentQuestion.answer}
                   </span> 
                 </div>  
               </button>
            </div>
          <div className="space-y-3 ">
            {currentQuestion.choiceResponses.map((choice, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === choice.value;
              const isBlocked = isChoiceBlocked(choice.value);
              const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

              return (
                <button
                  key={choice.id}
                  onClick={() => !isBlocked && handleAnswerSelect(choice.value)}
                  disabled={isBlocked}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 ${
                    isBlocked
                      ? 'border-red-200 bg-red-50 opacity-50 cursor-not-allowed'
                      : isSelected 
                      ? 'border-purple-500 bg-purple-50 hover:shadow-md' 
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                  type="button">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isBlocked
                        ? 'border-red-300 bg-red-100 text-red-500'
                        : isSelected 
                        ? 'border-purple-500 bg-purple-500 text-white' 
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {isBlocked && (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-lg ${
                      isBlocked
                        ? 'text-red-400 line-through'
                        : isSelected 
                        ? 'text-purple-700 font-medium' 
                        : 'text-gray-700'
                    }`}>
                      {choice.value}
                    </span>
                    {isBlocked && (
                      <span className="text-red-400 text-sm mr-auto">(محظور)</span>
                    )}
                  </div> 
                </button>
              );
            })}
          </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex mt-8 justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="button">
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>

            <div className="flex gap-3">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleFinishQuiz}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg"
                type="button">
                  إنهاء الاختبار
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                type="button">
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        </div>


        {/* Question Navigation */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">التنقل بين الأسئلة</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((question, index) => {
              const isAnswered = selectedAnswers[question.id];
              const isCurrent = index === currentQuestionIndex;
              const hasEasyUsed = easySolutionUsed.has(question.id);

              return (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all relative ${
                    isCurrent
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  type="button">
                  {index + 1}
                  {hasEasyUsed && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Report Error Modal */} 
      {isReportErrorModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  إبلاغ عن خطأ
                </h3>
                <button 
                  onClick={() => setIsReportErrorModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              {reportSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">تم الإرسال بنجاح!</h4>
                  <p className="text-gray-600">شكراً لتقريرك، سنقوم بمراجعة الخطأ في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <form onSubmit={handleReportErrorSubmit}>
                  <div className="mb-4">
                    <h3 className="block text-gray-700 mb-2">السؤال المعني</h3>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <span className="text-gray-800 font-medium">السؤال #{currentQuestion.id}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="block text-gray-700 mb-2">
                      وصف المشكلة <span className="text-red-500">*</span>
                    </h3>
                    <textarea
                      value={errorFeedback}
                      onChange={(e) => setErrorFeedback(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="يرجى وصف الخطأ الذي وجدته في هذا السؤال..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsReportErrorModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      disabled={isSubmittingReport}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 disabled:opacity-70"
                      disabled={isSubmittingReport || !errorFeedback.trim()}
                    >
                      {isSubmittingReport ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          إرسال التقرير
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      <StopTrainingModal
        isOpen={isModalOpen}
        isExit={onExit}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStopTraining}
      />
    </div>
  );
};
 
export default QuizInterface;