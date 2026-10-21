// src/types.ts

// 1. Типы для тем оформления (берем из твоего CSS)
export type Theme = 'minecraft' | 'space' | 'spiderman' | 'dragon';

// 2. Типы для адаптивной системы квеста
export type Tier = 1 | 2 | 3 | 4;
export type TopicId = 'division_2digit' | 'motion' | 'fractions' | 'area';

// 3. Интерфейс вопроса для квеста
export interface QuestQuestion {
  id: string;
  topic: TopicId;
  tier: Tier;
  text: string;       // Текст задачи
  answer: number;     // Правильный ответ
  hint: string;       // Подсказка-алгоритм, если ученик ошибся
  steps?: string[];   // Шаги решения (для Тира 3 и 4)
}

// 4. Профиль ученика (объединяем старые и новые поля)
export interface StudentProfile {
  // --- СТАРЫЕ ПОЛЯ (обязательные, чтобы App.tsx и store.ts не ломались) ---
  name: string;
  age: number;
  theme: Theme;
  level: number;
  
  // Если у тебя в старом коде были поля testResults или что-то еще, 
  // добавь их сюда как testResults?: any;

  // --- НОВЫЕ ПОЛЯ для адаптивного квеста ---
  // Делаем их опциональными (?), чтобы старый профиль из localStorage 
  // не вызывал ошибку "property is missing" при первом запуске
  currentTier?: Record<TopicId, Tier>; 
  streak?: number;                     
  mistakes?: number;                   
  weakTopics?: TopicId[];              
}
