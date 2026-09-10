import { StudentProfile, TestResult, Theme } from './types';

const STORAGE_KEY = 'matquest_data';

interface StoredData {
  profile: StudentProfile | null;
  testResults: TestResult[];
}

export function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load data:', e);
  }
  return { profile: null, testResults: [] };
}

export function saveProfile(profile: StudentProfile): void {
  const data = loadData();
  data.profile = profile;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveTestResult(result: TestResult): void {
  const data = loadData();
  data.testResults.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createProfile(name: string, age: number, theme: Theme): StudentProfile {
  const grade = age <= 9 ? 3 : age <= 10 ? 4 : 5;
  return {
    name,
    age,
    grade,
    theme,
    level: 1,
    xp: 0,
    streak: 0,
    totalCorrect: 0,
    totalAttempted: 0,
    achievements: [],
    lastSession: new Date().toISOString(),
    topicsCompleted: [],
    difficultyMode: 'normal',
  };
}

export function addXP(profile: StudentProfile, amount: number): StudentProfile {
  const newXP = profile.xp + amount;
  const newLevel = Math.floor(newXP / 100) + 1;
  const maxLevel = profile.difficultyMode === 'advanced' ? 6 : 5;
  return { ...profile, xp: newXP, level: Math.min(newLevel, maxLevel) };
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
