// src/types.ts

export type Tier = 1 | 2 | 3 | 4;
export type TopicId = 'division_2digit' | 'motion' | 'fractions' | 'area'; // и так далее

export interface Question {
  id: string;
  topic: TopicId;
  tier: Tier;
  text: string;       // Текст задачи
  answer: number;     // Правильный ответ
  hint: string;       // Подсказка-алгоритм, если ученик ошибся
  steps?: string[];   // Шаги решения (для Тира 3 и 4)
}

export interface StudentProfile {
  currentTier: Record<TopicId, Tier>; // Текущий тир по каждой теме
  streak: number;                     // Серия правильных ответов
  mistakes: number;                   // Серия ошибок
  weakTopics: TopicId[];              // Темы, где были ошибки (для повторения)
}