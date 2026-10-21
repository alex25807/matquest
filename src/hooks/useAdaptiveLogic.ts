// src/hooks/useAdaptiveLogic.ts
import { Tier, TopicId, StudentProfile } from '../types';
export function updateStudentProfile(
  profile: StudentProfile, 
  topic: TopicId, 
  isCorrect: boolean
): StudentProfile {
  // Создаем копию профиля, чтобы не мутировать исходный объект напрямую
  const newProfile = { ...profile };
  
  // 🔒 БЕЗОПАСНАЯ ИНИЦИАЛИЗАЦИЯ: 
  // Если поля еще не созданы (например, у старого профиля из localStorage), 
  // мы задаем им значения по умолчанию, чтобы приложение не упало с ошибкой.
  if (!newProfile.currentTier) {
    newProfile.currentTier = {};
  }
  if (newProfile.streak === undefined) {
    newProfile.streak = 0;
  }
  if (newProfile.mistakes === undefined) {
    newProfile.mistakes = 0;
  }
  if (!newProfile.weakTopics) {
    newProfile.weakTopics = [];
  }

  // Получаем текущий тир для этой темы (по умолчанию 1, если еще не установлен)
  const currentTierForTopic = newProfile.currentTier[topic] || 1;

  if (isCorrect) {
    // ✅ Правильный ответ
    newProfile.streak += 1;
    newProfile.mistakes = 0; // Сбрасываем счетчик ошибок

    // Если 3 правильных ответа подряд и мы еще не на максимальном 4-м тире
    if (newProfile.streak >= 3 && currentTierForTopic < 4) {
      newProfile.currentTier[topic] = (currentTierForTopic + 1) as Tier;
      newProfile.streak = 0; // Сбрасываем серию после повышения уровня
      // Здесь в будущем можно добавить вызов функции для показа анимации "Level Up!"
    }
  } else {
    // ❌ Неправильный ответ
    newProfile.mistakes += 1;
    newProfile.streak = 0; // Сбрасываем серию правильных ответов

    // Если 2 ошибки подряд и мы не на самом базовом 1-м тире
    if (newProfile.mistakes >= 2 && currentTierForTopic > 1) {
      newProfile.currentTier[topic] = (currentTierForTopic - 1) as Tier;
      newProfile.mistakes = 0; // Сбрасываем счетчик ошибок после понижения уровня
    }
    
    // Добавляем тему в список слабых мест, если её там еще нет
    if (!newProfile.weakTopics.includes(topic)) {
      newProfile.weakTopics.push(topic);
    }
  }

  return newProfile;
}
