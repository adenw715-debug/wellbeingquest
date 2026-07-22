import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import type { Answer } from './data/quizData';

type Screen = 'welcome' | 'quiz' | 'results';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const handleStartQuiz = () => {
    setScreen('quiz');
    setAnswers({});
  };

  const handleQuizComplete = (completedAnswers: Record<number, Answer>) => {
    setAnswers(completedAnswers);
    setScreen('results');
  };

  const handleRestart = () => {
    setAnswers({});
    setScreen('welcome');
  };

  return (
    <div className="font-sans antialiased">
      {screen === 'welcome' && (
        <WelcomeScreen onStart={handleStartQuiz} />
      )}
      {screen === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}
      {screen === 'results' && (
        <ResultsScreen answers={answers} onRestart={handleRestart} />
      )}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 text-sm text-gray-400">
        © 2024 Wellness Quest | Designed & Developed by Amna Jabeen
      </footer>
    </div>
  );
}

export default App;
