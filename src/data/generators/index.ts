import {
  AdaptiveQuestion,
  ALL_TOPICS,
  QuestFocus,
  StudentProfile,
  TableDrillState,
  Theme,
  Tier,
  TopicId,
} from '../../types';
import { generateAreaQuestion } from './area';
import { generateDivisionQuestion } from './division';
import { generateFractionsQuestion } from './fractions';
import { generateMotionQuestion } from './motion';
import { generateMultiplicationQuestion } from './multiplication';
import { random } from './common';

export const TOPIC_LABELS: Record<TopicId, string> = {
  multiplication_table: 'Таблица ×',
  division_2digit: 'Деление',
  motion: 'Движение',
  fractions: 'Дроби',
  area: 'Площадь',
};

export const TIER_NAMES: Record<Tier, string> = {
  1: 'Разведка',
  2: 'Инженер',
  3: 'Мастер',
  4: 'Легенда',
};

export function getTopicTier(profile: StudentProfile, topic: TopicId): Tier {
  return (profile.currentTier?.[topic] || 1) as Tier;
}

export function pickNextTopic(
  profile: StudentProfile,
  lastTopic: TopicId | null,
  roundIndex: number,
  focus: QuestFocus
): TopicId {
  if (focus !== 'mixed') return focus;

  const weak = (profile.weakTopics || []).filter((t) => ALL_TOPICS.includes(t));
  // Warm-up: first task often multiplication (simple → complex across the session)
  if (roundIndex === 0 && lastTopic !== 'multiplication_table') {
    if (getTopicTier(profile, 'multiplication_table') <= 2 || weak.includes('multiplication_table')) {
      return 'multiplication_table';
    }
  }

  const pool = ALL_TOPICS.filter((t) => t !== lastTopic);
  const weighted: TopicId[] = [];
  for (const t of pool) {
    weighted.push(t);
    if (weak.includes(t)) {
      weighted.push(t, t);
    }
    const tier = getTopicTier(profile, t);
    if (tier <= 2) weighted.push(t);
  }
  return weighted[random(0, weighted.length - 1)] ?? 'multiplication_table';
}

export function generateQuestionForTopic(
  topic: TopicId,
  tier: Tier,
  theme: Theme,
  excludeTemplateId: string | null,
  sequential: TableDrillState | null
): { question: AdaptiveQuestion; sequential: TableDrillState | null } {
  switch (topic) {
    case 'multiplication_table': {
      const result = generateMultiplicationQuestion(tier, excludeTemplateId, theme, sequential);
      return result;
    }
    case 'division_2digit':
      return { question: generateDivisionQuestion(tier, excludeTemplateId, theme), sequential };
    case 'motion':
      return { question: generateMotionQuestion(tier, excludeTemplateId, theme), sequential };
    case 'fractions':
      return { question: generateFractionsQuestion(tier, excludeTemplateId, theme), sequential };
    case 'area':
      return { question: generateAreaQuestion(tier, excludeTemplateId, theme), sequential };
  }
}
