import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Home,
  BookOpen,
  Target
} from 'lucide-react';
import quizData  from '../data/data.json'
// import DashStudent from "../../../dashStudent"
import { Question, Choice } from '../services/api';
// import DashStudent from '../../../dashStudent';

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

  const currentQuestion = questions[currentQuestionIndex];

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

  const handleAnswerSelect = (choiceId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: choiceId
    }));
  };

  const handleNext = () => {
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
    // Calculate results
    let correctCount = 0;
    const answerDetails = questions.map(question => {
      const selectedChoiceId = selectedAnswers[question.id];
      const selectedChoice = question.choiceResponses.find(c => c.id === selectedChoiceId);
      const isCorrect = selectedChoice?.value === question.answer;
      
      if (isCorrect) correctCount++;

      return {
        questionId: question.id,
        selectedChoiceId: selectedChoiceId || '',
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
    // <DashStudent>
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
              <h1 className="text-xl font-bold text-gray-800">اختبار التدريب</h1>
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
              <span>متبقي: {questions.length - getAnsweredQuestionsCount()}</span>
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
                            <div className="text-3xl xead font-bold text-red-500 mb-1">{results?.incorrectAnswers || 0}</div>
                            <div className="text-sm awsd text-gray-600">إجابة خاطئة</div>
                          </div>
                          <div className="text-center meed">
                            <div className="text-3xl need font-bold text-green-500 mb-1">{results?.correctAnswers || 0}</div>
                            <div className="text-sm ceed text-gray-600">إجابة صحيحة</div>
                          </div>
                        </div>
                        <div className="text-center beed">
                          <div className="text-3xl zeed font-bold text-yellow-500 mb-1">{quizData.quiz.stats.earnedPoints}</div>
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
                            className={`w-full px-4 py-2  rounded-lg font-medium transition-colors ${
                              tool.color === "green"
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-white hover:bg-gray-50 text-red-500 border border-red-200"
                            }`}
                            type="button">
                            {tool.text}
                          </button>
                        ))}
                      </div>
                    
        
                    {/* Action Buttons */}
                    <div className="space-y-3 px-4 pb-5 mt-5">
                      <button  className="w-full px-4 py-2 bg-white border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center" type="button">
                        <span className="ml-2">➕</span>
                        {quizData.navigation.pauseTraining}
                      </button>
                      <button name="jeek"  className="w-full px-4 py-2 aiid bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center" type="button">
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
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-lg leading-relaxed text-gray-800">{currentQuestion.value}</p>
            </div>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-8">
            {currentQuestion.choiceResponses.map((choice, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === choice.id;
              const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D...

              return (
                <button
                  key={choice.id}
                  onClick={() => handleAnswerSelect(choice.id)}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                type="button">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-500 text-white' 
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {isSelected ? <CheckCircle className="w-4 h-4" /> : choiceLabel}
                    </div>
                    <span className={`text-lg ${isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
                      {choice.value}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
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

              return (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                    isCurrent
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : isAnswered
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                type="button">
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    // </DashStudent>
  );
};

export default QuizInterface;