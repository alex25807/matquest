import { ALL_TOPICS, StudentProfile, TopicId, Tier } from '../types';
import { addXP } from '../store';
import { clampProfile, floorTierFor } from '../data/progress';

const emptyTiers = (): Partial<Record<TopicId, Tier>> =>
  Object.fromEntries(ALL_TOPICS.map((t) => [t, 1])) as Partial<Record<TopicId, Tier>>;

export function ensureAdaptiveFields(profile: StudentProfile): StudentProfile {
  const currentTier = { ...emptyTiers(), ...profile.currentTier };
  return clampProfile({
    ...profile,
    currentTier,
    topicStreak: { ...profile.topicStreak },
    topicMistakes: { ...profile.topicMistakes },
    topicCorrect: { ...profile.topicCorrect },
    weakTopics: profile.weakTopics ?? [],
  });
}

export function updateStudentProfile(
  profile: StudentProfile,
  topic: TopicId,
  isCorrect: boolean,
  xpGain = 0
): StudentProfile {
  const base = ensureAdaptiveFields(profile);
  const floor = floorTierFor(base, topic);
  const currentTier = (base.currentTier?.[topic] || floor) as Tier;
  const nextTiers: Partial<Record<TopicId, Tier>> = { ...base.currentTier };
  const topicStreak = { ...base.topicStreak };
  const topicMistakes = { ...base.topicMistakes };
  const weakTopics = [...(base.weakTopics ?? [])];
  const topicCorrect = { ...base.topicCorrect };

  let streak = topicStreak[topic] ?? 0;
  let misses = topicMistakes[topic] ?? 0;

  if (isCorrect) {
    streak += 1;
    misses = 0;
    topicCorrect[topic] = (topicCorrect[topic] ?? 0) + 1;
    if (streak >= 3 && currentTier < 4) {
      nextTiers[topic] = (currentTier + 1) as Tier;
      streak = 0;
    }
    const idx = weakTopics.indexOf(topic);
    if (idx >= 0 && (topicCorrect[topic] ?? 0) >= 6 && (nextTiers[topic] || currentTier) >= 3) {
      weakTopics.splice(idx, 1);
    }
  } else {
    misses += 1;
    streak = 0;
    if (misses >= 2 && currentTier > floor) {
      nextTiers[topic] = (currentTier - 1) as Tier;
      misses = 0;
    }
    if (!weakTopics.includes(topic)) weakTopics.push(topic);
  }

  topicStreak[topic] = streak;
  topicMistakes[topic] = misses;

  let next: StudentProfile = {
    ...base,
    currentTier: nextTiers,
    topicStreak,
    topicMistakes,
    topicCorrect,
    weakTopics,
    streak: isCorrect ? base.streak + 1 : 0,
    totalCorrect: base.totalCorrect + (isCorrect ? 1 : 0),
    totalAttempted: base.totalAttempted + 1,
    lastSession: new Date().toISOString(),
  };

  if (isCorrect && xpGain > 0) {
    next = addXP(next, xpGain);
  }

  return next;
}
