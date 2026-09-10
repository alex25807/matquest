export type Theme = 'minecraft' | 'space' | 'spiderman' | 'dragon';

export type Screen = 'start' | 'settings' | 'test' | 'quest' | 'results' | 'achievements';

export type DifficultyMode = 'normal' | 'advanced';

export interface StudentProfile {
  name: string;
  age: number;
  grade: number;
  theme: Theme;
  level: number; // 1-6
  xp: number;
  streak: number;
  totalCorrect: number;
  totalAttempted: number;
  achievements: string[];
  lastSession: string;
  topicsCompleted: string[];
  difficultyMode: DifficultyMode;
}

export interface Question {
  id: string;
  topic: string;
  level: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hint?: string;
  hints?: string[]; // Многоступенчатые подсказки: от общих к конкретным
  alternativeSolutions?: string[]; // Альтернативные способы решения
  image?: string;
  figure?: 'square' | 'rectangle' | 'triangle' | 'circle' | 'trapezoid' | 'rhombus' | 'parallelogram' | 'composite';
  figureData?: Record<string, number | string>;
  isAdvanced?: boolean;
}

export interface TestResult {
  date: string;
  score: number;
  totalQuestions: number;
  level: number;
  topicsStrength: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (profile: StudentProfile) => boolean;
}

export interface GameState {
  profile: StudentProfile | null;
  currentQuestion: number;
  currentLevel: number;
  testResults: TestResult[];
  sessionCorrect: number;
  sessionTotal: number;
  isTestMode: boolean;
}
