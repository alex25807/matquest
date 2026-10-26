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

/** Величины в обычном режиме начинаются с таблицы единиц, даже в 4 классе. */
export function floorTierFor(
  profile: { grade?: number; difficultyMode?: DifficultyMode },
  topic: TopicId
): Tier {
  if (topic === 'measures') return profile.difficultyMode === 'advanced' ? 2 : 1;
  return floorTier(profile);
}

export function clampProfile(profile: StudentProfile): StudentProfile {
  const currentTier: Partial<Record<TopicId, Tier>> = {};
  for (const topic of ALL_TOPICS) {
    const floor = floorTierFor(profile, topic);
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
  const currentTier: Partial<Record<TopicId, Tier>> = { ...base.currentTier };
  for (const topic of ALL_TOPICS) {
    const floor = floorTierFor(base, topic);
    const suggested = (ratio >= 0.85 ? Math.min(4, floor + 1) : floor) as Tier;
    const have = (currentTier[topic] ?? floor) as Tier;
    currentTier[topic] = Math.max(have, suggested, floor) as Tier;
  }
  return { ...base, currentTier };
}
