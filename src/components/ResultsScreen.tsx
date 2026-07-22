import { useState, useEffect } from 'react';
import { RefreshCw, Share2, ChevronDown, ChevronUp, Sparkles, Target, Lightbulb, AlertCircle } from 'lucide-react';
import {
  type Answer,
  type Category,
  categoryInfo,
  calculateBadge,
  calculateCategoryScores,
  badgeInfo,
  type Badge
} from '../data/quizData';

interface ResultsScreenProps {
  answers: Record<number, Answer>;
  onRestart: () => void;
}

export function ResultsScreen({ answers, onRestart }: ResultsScreenProps) {
  const [showPlan, setShowPlan] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);

  const categoryScores = calculateCategoryScores(answers);
  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  const maxScore = 20 * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const badge = calculateBadge(totalScore);
  const badgeData = badgeInfo[badge];

  // Find lowest scoring category
  const lowestCategory = (Object.entries(categoryScores) as [Category, number][])
    .sort((a, b) => a[1] - b[1])[0][0];

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= totalScore) {
            clearInterval(interval);
            return totalScore;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 300);
  }, [totalScore]);

  const personalizedTips = categoryInfo[lowestCategory].tips;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Badge reveal */}
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br ${badgeData.color} p-1 shadow-2xl`}>
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-6xl sm:text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
                  {badgeData.icon}
                </span>
              </div>
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-amber-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{badgeData.name}</h2>
          <p className="text-slate-400 mb-4">
            Your Digital Wellbeing Score
          </p>

          {/* Score display */}
          <div className="inline-flex items-center gap-3 bg-white/5 rounded-2xl px-6 py-3 mb-6">
            <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
              {animatedScore}
            </div>
            <div className="text-slate-400 text-xl">/ {maxScore}</div>
          </div>

          {/* Score bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${badgeData.color} transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Just Started</span>
              <span>Radiant</span>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white/5 rounded-2xl p-4 sm:p-6 mb-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-400" />
            Category Breakdown
          </h3>

          <div className="space-y-3">
            {(Object.keys(categoryInfo) as Category[]).map(category => {
              const info = categoryInfo[category];
              const score = categoryScores[category];
              const maxCatScore = 16;
              const catPercentage = Math.round((score / maxCatScore) * 100);
              const isExpanded = expandedCategory === category;
              const isLowest = category === lowestCategory;

              return (
                <div key={category}>
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isLowest ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{info.name}</span>
                        <span className="text-sm text-slate-400">{score}/{maxCatScore}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${info.color} transition-all duration-500`}
                          style={{ width: `${catPercentage}%` }}
                        />
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 ml-12 p-3 bg-white/5 rounded-lg text-sm text-slate-300">
                      {info.tip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Plan Button */}
        <button
          onClick={() => setShowPlan(!showPlan)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 sm:p-6 mb-6 text-left shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-6 h-6" />
            <span className="font-semibold text-lg">Get Your Personalized Plan</span>
          </div>
          <p className="text-amber-100 text-sm opacity-90">
            {showPlan ? 'Tap to hide' : 'Tap for tailored tips based on your results'}
          </p>
        </button>

        {/* Personalized Plan Panel */}
        {showPlan && (
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-4 sm:p-6 mb-6 border border-amber-500/20 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl">
                {categoryInfo[lowestCategory].icon}
              </div>
              <div>
                <div className="font-semibold">Focus Area: {categoryInfo[lowestCategory].name}</div>
                <div className="text-sm text-slate-400">
                  Your lowest scoring category ({categoryScores[lowestCategory]}/16 points)
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-amber-300">Recommended Steps:</h4>
              {personalizedTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              This is a fun reflection tool, not a clinical or diagnostic assessment.
              If something is genuinely weighing on you, please consult a professional.
              Your results are private and not stored.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Wellness Quest Score',
                  text: `I scored ${totalScore}/${maxScore} on Wellness Quest! My badge: ${badgeData.name}. Check your digital wellbeing too!`,
                  url: window.location.href
                });
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
