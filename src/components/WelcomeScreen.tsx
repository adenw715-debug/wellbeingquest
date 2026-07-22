import { Sparkles, Play, Heart, Brain, Moon, Users, Smartphone, Info } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[15%] left-[10%] w-8 h-8 text-rose-400/30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <Brain className="absolute top-[25%] right-[15%] w-10 h-10 text-purple-400/30 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        <Moon className="absolute bottom-[30%] left-[20%] w-9 h-9 text-blue-400/30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <Users className="absolute bottom-[20%] right-[12%] w-8 h-8 text-orange-400/30 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
        <Smartphone className="absolute top-[40%] right-[8%] w-7 h-7 text-amber-400/30 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 shadow-xl shadow-teal-500/25 mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
            Wellness Quest
          </h1>
          <p className="text-slate-400 text-lg mb-2">
            Your Digital Wellbeing Adventure
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-5 gap-3 mb-10">
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
            <span className="text-2xl">🏃</span>
            <p className="text-xs text-slate-400 mt-1">Physical</p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
            <span className="text-2xl">🧠</span>
            <p className="text-xs text-slate-400 mt-1">Mental</p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
            <span className="text-2xl">👥</span>
            <p className="text-xs text-slate-400 mt-1">Social</p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
            <span className="text-2xl">😴</span>
            <p className="text-xs text-slate-400 mt-1">Sleep</p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
            <span className="text-2xl">📱</span>
            <p className="text-xs text-slate-400 mt-1">Habits</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl p-5 mb-8 border border-teal-500/20">
          <p className="text-slate-300 text-sm leading-relaxed">
            Answer 20 quick questions about your digital habits and lifestyle.
            Earn badges, discover your wellness score, and get personalized tips
            to thrive in the digital age!
          </p>
        </div>

        {/* About Wellness Quest */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-5 mb-8 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">About Wellness Quest</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Wellness Quest is an interactive digital wellness application designed to help users assess their digital habits, monitor screen-time behavior, and develop healthier relationships with technology.
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl font-semibold text-lg shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Play className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" />
          Start Your Quest
        </button>

        <p className="text-slate-500 text-xs mt-6 max-w-xs mx-auto">
          This is a fun reflection tool, not a clinical assessment.
          Results are for personal insight only.
        </p>
      </div>
    </div>
  );
}
