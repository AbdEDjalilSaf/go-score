"use client"
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Question, TrainingSession } from '../types/api';

interface TrainingModalProps {
  session: TrainingSession;
  onClose: () => void;
  onComplete: (answers: Record<string, string>) => void;
}

const TrainingModal: React.FC<TrainingModalProps> = ({ session, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = session.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === session.questions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  const handleAnswerSelect = (choiceId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: choiceId
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(answers);
    onClose();
  };

  const calculateResults = () => {
    let correct = 0;
    let total = session.questions.length;
    
    session.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.answer) {
        correct++;
      }
    });

    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">تم إكمال التدريب!</h2>
              <p className="text-gray-600">إليك نتائج أدائك</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                  <div className="text-sm text-gray-600">إجابات صحيحة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{results.total - results.correct}</div>
                  <div className="text-sm text-gray-600">إجابات خاطئة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{results.percentage}%</div>
                  <div className="text-sm text-gray-600">النسبة المئوية</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                type="button"
              >
                إنهاء التدريب
              </button>
              <button
                onClick={() => setShowResults(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                type="button"
              >
                مراجعة الأسئلة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">جلسة التدريب</h2>
              <p className="text-sm text-gray-600">
                السؤال {currentQuestionIndex + 1} من {session.questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
              {currentQuestion.value}
            </h3>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-6">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = answers[currentQuestion.id] === choice.id;
              const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <button
                  key={choice.id}
                  onClick={() => handleAnswerSelect(choice.id)}
                  className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-gray-300 text-gray-600'
                    }`}>
                      {choiceLabel}
                    </div>
                    <span className="flex-1">{choice.value}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
              السؤال السابق
            </button>

            <div className="text-sm text-gray-600">
              {Object.keys(answers).length} / {session.questions.length} مُجاب عليها
            </div>

            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                !hasAnsweredCurrent
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isLastQuestion
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
              type="button"
            >
              {isLastQuestion ? 'إنهاء التدريب' : 'السؤال التالي'}
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModal;