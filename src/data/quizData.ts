export type Category = 'physical' | 'mental' | 'social' | 'sleep' | 'habits';

export type Answer = 'option1' | 'option2' | 'option3' | 'option4';

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  icon: string;
}

export interface CategoryInfo {
  name: string;
  icon: string;
  color: string;
  tip: string;
  tips: string[];
}

export const categoryInfo: Record<Category, CategoryInfo> = {
  physical: {
    name: 'Physical Health',
    icon: '💪',
    color: 'from-emerald-400 to-teal-500',
    tip: 'Your movement, energy, and body awareness',
    tips: [
      'Start with just 10 minutes of walking daily - even small movements count',
      'Keep a water bottle nearby and sip throughout the day',
      'Try desk stretches every hour to release tension',
      'Plan meals that include colorful fruits and vegetables'
    ]
  },
  mental: {
    name: 'Mental & Emotional',
    icon: '🧠',
    color: 'from-purple-400 to-indigo-500',
    tip: 'Your emotional awareness and mental wellbeing',
    tips: [
      'Name your emotions out loud - awareness is the first step',
      'Practice a 2-minute breathing exercise when stress builds',
      'Schedule joy - block time for hobbies that genuinely make you happy',
      'Replace harsh self-talk with "I\'m learning and growing"'
    ]
  },
  social: {
    name: 'Social Connection',
    icon: '👥',
    color: 'from-orange-400 to-rose-500',
    tip: 'Your relationships and support network',
    tips: [
      'Reach out to one person this week just to check in',
      'Schedule regular catch-ups with people who energize you',
      'Share something real with someone you trust',
      'Join a community group or class to meet like-minded people'
    ]
  },
  sleep: {
    name: 'Sleep Quality',
    icon: '😴',
    color: 'from-blue-400 to-cyan-500',
    tip: 'Your sleep habits and rest patterns',
    tips: [
      'Set a consistent bedtime - your body loves routine',
      'Create a screen-free hour before sleep',
      'Make your bedroom cool, dark, and quiet',
      'Try a calming ritual: reading, gentle stretching, or meditation'
    ]
  },
  habits: {
    name: 'Daily Habits',
    icon: '🔄',
    color: 'from-amber-400 to-orange-500',
    tip: 'Your intentional wellbeing practices',
    tips: [
      'Start small - one healthy habit at a time',
      'Use screen time limits and take regular digital breaks',
      'Track basics: water, meals, movement - awareness builds consistency',
      'Set one achievable weekly goal and celebrate when you hit it'
    ]
  }
};

export const questions: Question[] = [
  // Physical Health (4 questions)
  {
    id: 1,
    category: 'physical',
    question: 'How often do you move your body (walk, stretch, exercise) in a typical week?',
    options: ['Rarely', 'A couple times', 'Most days', 'Every day'],
    icon: '🏃'
  },
  {
    id: 2,
    category: 'physical',
    question: 'How would you describe your energy levels most days?',
    options: ['Drained', 'Low', 'Steady', 'Energized'],
    icon: '⚡'
  },
  {
    id: 3,
    category: 'physical',
    question: 'How often do you eat meals that leave you feeling nourished, not just full?',
    options: ['Rarely', 'Sometimes', 'Often', 'Almost always'],
    icon: '🥗'
  },
  {
    id: 4,
    category: 'physical',
    question: 'How is your body feeling right now, any tension or discomfort?',
    options: ['Frequent discomfort', 'Some aches', 'Mostly fine', 'Feeling good'],
    icon: '💪'
  },
  // Mental/Emotional (4 questions)
  {
    id: 5,
    category: 'mental',
    question: 'How connected do you feel to your emotions lately?',
    options: ['Numb or overwhelmed', 'A bit foggy', 'Fairly in touch', 'Clear and steady'],
    icon: '💭'
  },
  {
    id: 6,
    category: 'mental',
    question: 'When something stresses you out, what usually happens?',
    options: ['I shut down or spiral', 'I push through and ignore it', 'I take a beat and cope okay', 'I have go-to tools that work'],
    icon: '😤'
  },
  {
    id: 7,
    category: 'mental',
    question: 'How often do you make time for things that genuinely bring you joy?',
    options: ['Rarely', 'Occasionally', 'Most weeks', 'Regularly'],
    icon: '😊'
  },
  {
    id: 8,
    category: 'mental',
    question: 'How would you describe your self-talk these days?',
    options: ['Pretty harsh', 'Mixed', 'Mostly kind', 'Encouraging'],
    icon: '💬'
  },
  // Social Connection (4 questions)
  {
    id: 9,
    category: 'social',
    question: 'How connected do you feel to the people around you?',
    options: ['Isolated', 'A little distant', 'Fairly connected', 'Very connected'],
    icon: '🤝'
  },
  {
    id: 10,
    category: 'social',
    question: 'How often do you have a real conversation with someone you trust?',
    options: ['Rarely', 'Occasionally', 'Weekly', 'Almost daily'],
    icon: '💬'
  },
  {
    id: 11,
    category: 'social',
    question: 'If you had a rough day, is there someone you could reach out to?',
    options: ['Not really', 'Maybe one person', 'A couple people', 'A solid support circle'],
    icon: '🫂'
  },
  {
    id: 12,
    category: 'social',
    question: 'How do you usually feel after spending time with people?',
    options: ['Drained either way', 'It depends', 'Usually good', 'Recharged'],
    icon: '✨'
  },
  // Sleep Quality (4 questions)
  {
    id: 13,
    category: 'sleep',
    question: 'How many hours of sleep do you usually get?',
    options: ['Under 5', '5 to 6', '7 to 8', '8 or more, consistently'],
    icon: '🌙'
  },
  {
    id: 14,
    category: 'sleep',
    question: 'How do you feel when you wake up?',
    options: ['Exhausted', 'Groggy', 'Okay', 'Refreshed'],
    icon: '☀️'
  },
  {
    id: 15,
    category: 'sleep',
    question: 'How consistent is your sleep schedule?',
    options: ['All over the place', 'Somewhat consistent', 'Fairly consistent', 'Very consistent'],
    icon: '⏰'
  },
  {
    id: 16,
    category: 'sleep',
    question: 'How is your wind-down routine before bed?',
    options: ['Screens until I crash', 'No real routine', 'Somewhat relaxing', 'A calming ritual'],
    icon: '🛌'
  },
  // Daily Habits (4 questions)
  {
    id: 17,
    category: 'habits',
    question: 'How often do you do something intentional for your well-being?',
    options: ['Rarely', 'Occasionally', 'Weekly', 'Daily'],
    icon: '🎯'
  },
  {
    id: 18,
    category: 'habits',
    question: 'How would you describe your relationship with screens and social media?',
    options: ['Hard to stop scrolling', 'I overdo it sometimes', 'Mostly mindful', 'Very intentional'],
    icon: '📱'
  },
  {
    id: 19,
    category: 'habits',
    question: 'How often do you keep up with basics like water, meals, and movement?',
    options: ['Rarely', 'Sometimes', 'Most days', 'Consistently'],
    icon: '💧'
  },
  {
    id: 20,
    category: 'habits',
    question: 'When you set a goal for yourself, how often do you follow through?',
    options: ['Almost never', 'Sometimes', 'Often', 'Almost always'],
    icon: '🎯'
  }
];

export const answerScores: Record<Answer, number> = {
  option1: 1,
  option2: 2,
  option3: 3,
  option4: 4
};

export type Badge = 'just_started' | 'building_momentum' | 'thriving' | 'radiant';

export const badgeInfo: Record<Badge, { name: string; icon: string; color: string; range: [number, number] }> = {
  just_started: {
    name: 'Just Getting Started',
    icon: '🌱',
    color: 'from-gray-400 to-gray-500',
    range: [20, 40]
  },
  building_momentum: {
    name: 'Building Momentum',
    icon: '🔥',
    color: 'from-amber-400 to-orange-500',
    range: [41, 55]
  },
  thriving: {
    name: 'Thriving',
    icon: '✨',
    color: 'from-emerald-400 to-teal-500',
    range: [56, 70]
  },
  radiant: {
    name: 'Radiant',
    icon: '🌟',
    color: 'from-violet-400 to-purple-500',
    range: [71, 80]
  }
};

export function calculateBadge(totalScore: number): Badge {
  if (totalScore <= 40) return 'just_started';
  if (totalScore <= 55) return 'building_momentum';
  if (totalScore <= 70) return 'thriving';
  return 'radiant';
}

export function calculateCategoryScores(answers: Record<number, Answer>): Record<Category, number> {
  const scores: Record<Category, number> = {
    physical: 0,
    mental: 0,
    social: 0,
    sleep: 0,
    habits: 0
  };

  questions.forEach(q => {
    scores[q.category] += answerScores[answers[q.id]];
  });

  return scores;
}
