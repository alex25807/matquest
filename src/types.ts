export type Theme = 'minecraft' | 'space' | 'spiderman' | 'dragon';

export type Screen = 'start' | 'settings' | 'test' | 'quest' | 'results' | 'achievements';

export type DifficultyMode = 'normal' | 'advanced';

export type Tier = 1 | 2 | 3 | 4;
export type TopicId =
  | 'multiplication_table'
  | 'division_2digit'
  | 'motion'
  | 'fractions'
  | 'area'
  | 'measures';

export type QuestFocus = 'mixed' | TopicId;

export const ALL_TOPICS: TopicId[] = [
  'multiplication_table',
  'division_2digit',
  'motion',
  'fractions',
  'area',
  'measures',
];

export interface StudentProfile {
  name: string;
  age: number;
  grade: number;
  theme: Theme;
  level: number;
  xp: number;
  streak: number;
  totalCorrect: number;
  totalAttempted: number;
  achievements: string[];
  lastSession: string;
  topicsCompleted: string[];
  difficultyMode: DifficultyMode;
  currentTier?: Partial<Record<TopicId, Tier>>;
  topicStreak?: Partial<Record<TopicId, number>>;
  topicMistakes?: Partial<Record<TopicId, number>>;
  weakTopics?: TopicId[];
  topicCorrect?: Partial<Record<TopicId, number>>;
  tableDrill?: TableDrillState;
  /** Следующий вид в теме величин: 0 время, 1 длина, 2 масса, 3 площадь. */
  measuresDrill?: MeasuresDrillState;
  /** @deprecated use topicStreak */
  tierStreak?: number;
  /** @deprecated use topicMistakes */
  consecutiveMistakes?: number;
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
  hints?: string[];
  alternativeSolutions?: string[];
  image?: string;
  figure?: 'square' | 'rectangle' | 'triangle' | 'circle' | 'trapezoid' | 'rhombus' | 'parallelogram' | 'composite';
  figureData?: Record<string, number | string>;
  isAdvanced?: boolean;
}

export interface AdaptiveQuestion {
  id: string;
  topic: TopicId;
  tier: Tier;
  text: string;
  answer: number;
  hint: string;
  hints: string[];
  method?: string;
  explanation: string;
  alternativeSolutions?: string[];
  templateId: string;
}

export interface TableDrillState {
  factor: number;
  nextN: number;
}

export interface MeasuresDrillState {
  nextKind: number;
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
