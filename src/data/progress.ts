import {
  ALL_TOPICS,
  DifficultyMode,
  StudentProfile,
  Tier,
  TopicId,
} from '../types';

export function floorTier(profile: {
  grade?: number;
  difficultyMode?: DifficultyMode;
}): Tier {
  const grade = profile.grade ?? 4;
  const advanced = profile.difficultyMode === 'advanced';
  if (grade <= 3) return advanced ? 2 : 1;
  return advanced ? 3 : 2;
}

export function clampProfile(profile: StudentProfile): StudentProfile {
  const floor = floorTier(profile);
  const currentTier: Partial<Record<TopicId, Tier>> = {};
  for (const topic of ALL_TOPICS) {
    const have = (profile.currentTier?.[topic] ?? floor) as Tier;
    currentTier[topic] = Math.max(floor, Math.min(4, have)) as Tier;
  }
  return {
    ...profile,
    currentTier,
    topicCorrect: { ...profile.topicCorrect },
    topicStreak: { ...profile.topicStreak },
    topicMistakes: { ...profile.topicMistakes },
    weakTopics: profile.weakTopics ?? [],
  };
}

export function tiersFromTest(
  profile: StudentProfile,
  score: number,
  total: number
): StudentProfile {
  const base = clampProfile(profile);
  const ratio = total > 0 ? score / total : 0;
  const floor = floorTier(base);
  const suggested = (ratio >= 0.85 ? Math.min(4, floor + 1) : floor) as Tier;
  const currentTier: Partial<Record<TopicId, Tier>> = { ...base.currentTier };
  for (const topic of ALL_TOPICS) {
    const have = (currentTier[topic] ?? floor) as Tier;
    currentTier[topic] = Math.max(have, suggested, floor) as Tier;
  }
  return { ...base, currentTier };
}
