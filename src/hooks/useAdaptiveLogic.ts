// src/hooks/useAdaptiveLogic.ts
import { Tier, TopicId, StudentProfile } from '../types';

export function updateStudentProfile(
  profile: StudentProfile, 
  topic: TopicId, 
  isCorrect: boolean
): StudentProfile {
  const newProfile = { ...profile };
  const currentTier = newProfile.currentTier[topic];

  if (isCorrect) {
    newProfile.streak += 1;
    newProfile.mistakes = 0;

    // Повышаем уровень, если 3 правильных ответа подряд
    if (newProfile.streak >= 3 && currentTier < 4) {
      newProfile.currentTier[topic] = (currentTier + 1) as Tier;
      newProfile.streak = 0; // Сбрасываем серию после повышения
      // TODO: Здесь можно вызвать событие "Получена ачивка / Открыт новый мир!"
    }
  } else {
    newProfile.mistakes += 1;
    newProfile.streak = 0;

    // Понижаем уровень, если 2 ошибки подряд
    if (newProfile.mistakes >= 2 && currentTier > 1) {
      newProfile.currentTier[topic] = (currentTier - 1) as Tier;
      newProfile.mistakes = 0;
    }
    
    // Добавляем тему в список слабых, если была ошибка
    if (!newProfile.weakTopics.includes(topic)) {
      newProfile.weakTopics.push(topic);
    }
  }

  return newProfile;
}