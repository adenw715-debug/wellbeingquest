import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Zap } from 'lucide-react';
import { questions, categoryInfo, type Answer, type Category, answerScores } from '../data/quizData';

interface QuizScreenProps {
  onComplete: (answers: Record<number, Answer>) => void;
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  const categoryProgress = questions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = { answered: 0, total: 0 };
    acc[q.category].total++;
    if (answers[q.id]) acc[q.category].answered++;
    return acc;
  }, {} as Record<Category, { answered: number; total: number }>);

  const handleAnswer = (answerIndex: number) => {
    const answerKey = `option${answerIndex + 1}` as Answer;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerKey }));
    setShowPoints(true);
    setPointsEarned(answerScores[answerKey]);

    setTimeout(() => {
      setShowPoints(false);
    }, 600);
  };

  const handleNext = () => {
    if (!isAnswered) return;

    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onComplete(answers);
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const getSelectedIndex = (): number | null => {
    const answer = answers[currentQuestion.id];
    if (!answer) return null;
    return parseInt(answer.replace('option', '')) - 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header with progress */}
      <div className="p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-slate-300">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">
                  {Object.values(answers).reduce((sum, a) => sum + answerScores[a], 0)} pts
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Category progress indicators */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(Object.keys(categoryInfo) as Category[]).map(cat => {
              const info = categoryInfo[cat];
              const progress = categoryProgress[cat];
              const isActive = cat === currentQuestion.category;
              return (
                <div
                  key={cat}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white/15 ring-2 ring-teal-400/50'
                      : 'bg-white/5'
                  }`}
                >
                  <span>{info.icon}</span>
                  <span className="hidden sm:inline">{info.name.split(' ')[0]}</span>
                  <span className="text-slate-400">
                    {progress?.answered || 0}/{progress?.total || 4}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className={`max-w-2xl w-full transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Category badge */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${categoryInfo[currentQuestion.category].color} bg-opacity-20`}>
              <span className="text-xl">{categoryInfo[currentQuestion.category].icon}</span>
              <span className="font-medium">{categoryInfo[currentQuestion.category].name}</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-4xl sm:text-5xl mb-4">{currentQuestion.icon}</div>
            <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed text-slate-100">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = getSelectedIndex() === idx;
              const score = idx + 1;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-teal-400 bg-teal-500/20 shadow-lg shadow-teal-500/20'
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="font-medium text-sm sm:text-base">{option}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < score ? 'bg-amber-400' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {isSelected && showPoints && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-400 font-bold animate-bounce">
                      +{pointsEarned}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              currentQuestionIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-white/10 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isAnswered
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105 active:scale-95'
                : 'bg-slate-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
