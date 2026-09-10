import React from 'react';
import { Theme, StudentProfile, DifficultyMode } from '../types';
import { achievements } from '../data/motivation';
import { useSpeech } from '../hooks/useSpeech';
import { saveProfile } from '../store';

interface ResultsScreenProps {
  profile: StudentProfile;
  onBack: () => void;
  onStartQuest: () => void;
  onRetest: () => void;
  onPuzzles: () => void;
  onUpdateProfile: (profile: StudentProfile) => void;
  theme: Theme;
}

export default function ResultsScreen({ profile, onBack, onStartQuest, onRetest, onPuzzles, onUpdateProfile, theme }: ResultsScreenProps) {
  const { speak } = useSpeech();
  const accuracy = profile.totalAttempted > 0 ? Math.round((profile.totalCorrect / profile.totalAttempted) * 100) : 0;
  const levelNames: Record<number, string> = { 1: 'Новичок', 2: 'Ученик', 3: 'Знаток', 4: 'Мастер', 5: 'Гуру', 6: 'Магистр' };
  const levelEmojis: Record<string, Record<number, string>> = {
    minecraft: { 1: '🪵', 2: '⛏️', 3: '💎', 4: '🏰', 5: '🌟', 6: '👑' },
    space: { 1: '🌍', 2: '🚀', 3: '🪐', 4: '⭐', 5: '🌌', 6: '🔭' },
    spiderman: { 1: '🕸️', 2: '🦸', 3: '🏙️', 4: '⚡', 5: '🌟', 6: '🦸‍♂️' },
    dragon: { 1: '🥚', 2: '🐲', 3: '🐉', 4: '🔥', 5: '👑', 6: '🐉✨' },
  };

  const handleSpeakStats = () => {
    speak(`Привет, ${profile.name}! Твой уровень: ${levelNames[profile.level]}. Всего решено задач: ${profile.totalAttempted}. Правильных ответов: ${profile.totalCorrect}. Точность: ${accuracy} процентов. Продолжай в том же духе!`);
  };

  const handleToggleMode = () => {
    const newMode: DifficultyMode = profile.difficultyMode === 'normal' ? 'advanced' : 'normal';
    const updated = { ...profile, difficultyMode: newMode };
    onUpdateProfile(updated);
    saveProfile(updated);
    if (newMode === 'advanced') {
      speak('Продвинутый режим активирован! Теперь тебя ждут более сложные задачи и графические фигуры!');
    } else {
      speak('Обычный режим. Продолжаем учиться!');
    }
  };

  const emojis = levelEmojis[theme] || levelEmojis.minecraft;

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 theme-${theme} relative overflow-y-auto`}>
      <div className="w-full max-w-lg py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-float">{emojis[profile.level]}</div>
          <h1 className="font-orbitron text-2xl neon-text-blue mb-2">
            {profile.name}
          </h1>
          <p className="font-nunito text-white/60">
            {profile.age} лет • {profile.grade} класс
          </p>
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="font-orbitron text-sm neon-text-purple">
              {emojis[profile.level]} {levelNames[profile.level]} • Ур. {profile.level}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="neon-border-blue rounded-xl p-4 bg-black/30 text-center">
            <div className="text-3xl mb-1">📊</div>
            <div className="font-orbitron text-2xl neon-text-blue">{profile.xp}</div>
            <div className="text-white/50 text-xs">ОПЫТ (XP)</div>
          </div>
          <div className="neon-border-green rounded-xl p-4 bg-black/30 text-center">
            <div className="text-3xl mb-1">🎯</div>
            <div className="font-orbitron text-2xl neon-text-green">{accuracy}%</div>
            <div className="text-white/50 text-xs">ТОЧНОСТЬ</div>
          </div>
          <div className="neon-border-pink rounded-xl p-4 bg-black/30 text-center">
            <div className="text-3xl mb-1">✅</div>
            <div className="font-orbitron text-2xl neon-text-pink">{profile.totalCorrect}/{profile.totalAttempted}</div>
            <div className="text-white/50 text-xs">ПРАВИЛЬНЫХ</div>
          </div>
          <div className="neon-border-purple rounded-xl p-4 bg-black/30 text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="font-orbitron text-2xl neon-text-purple">{profile.streak}</div>
            <div className="text-white/50 text-xs">СЕРИЯ</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="neon-border-blue rounded-xl p-4 bg-black/30 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60 font-orbitron text-xs">ПРОГРЕСС УРОВНЯ</span>
            <span className="text-white/60 font-orbitron text-xs">{profile.xp % 100}/100 XP</span>
          </div>
          <div className="w-full h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: `${profile.xp % 100}%` }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2 text-center">
            До уровня {profile.level + 1}: {100 - (profile.xp % 100)} XP
          </p>
        </div>

        {/* Achievements */}
        <div className="neon-border-green rounded-xl p-4 bg-black/30 mb-6">
          <h2 className="font-orbitron text-sm neon-text-green mb-3">🏆 ДОСТИЖЕНИЯ</h2>
          <div className="grid grid-cols-4 gap-2">
            {achievements.map(a => {
              const earned = profile.achievements.includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`text-center p-2 rounded-lg ${earned ? 'bg-green-500/10 border border-green-500/30' : 'bg-black/30 border border-white/5 opacity-40'}`}
                  title={a.description}
                >
                  <div className="text-2xl">{a.icon}</div>
                  <div className="text-white/60 text-[10px] mt-1">{a.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulty mode toggle */}
        <div className="neon-border-yellow rounded-xl p-4 bg-black/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-orbitron text-xs text-white/80">РЕЖИМ СЛОЖНОСТИ</span>
            <span className={`text-xs font-bold ${profile.difficultyMode === 'advanced' ? 'neon-text-yellow' : 'neon-text-blue'}`}>
              {profile.difficultyMode === 'advanced' ? '⭐ ПРОДВИНУТЫЙ' : '📘 ОБЫЧНЫЙ'}
            </span>
          </div>
          <button
            onClick={handleToggleMode}
            className={`w-full py-2 rounded-lg font-bold text-sm transition-all ${
              profile.difficultyMode === 'advanced'
                ? 'bg-yellow-500/20 border border-yellow-400 text-yellow-300 hover:bg-yellow-500/30'
                : 'bg-blue-500/20 border border-blue-400 text-blue-300 hover:bg-blue-500/30'
            }`}
          >
            {profile.difficultyMode === 'advanced' ? '📘 ПЕРЕКЛЮЧИТЬ НА ОБЫЧНЫЙ' : '⭐ ВКЛЮЧИТЬ ПРОДВИНУТЫЙ УРОВЕНЬ'}
          </button>
          <p className="text-white/40 text-xs mt-2">
            {profile.difficultyMode === 'advanced'
              ? '🔥 Графические задачи, уравнения, теорема Пифагора и логические головоломки!'
              : '📚 Базовые задачи по арифметике, геометрии и логике'}
          </p>
        </div>

        {/* Voice button */}
        <button onClick={handleSpeakStats} className="neon-btn-purple w-full mb-4">
          🔊 ОЗВУЧИТЬ СТАТИСТИКУ
        </button>

        {/* Action buttons */}
        <div className="flex gap-3 mb-4">
          <button onClick={onStartQuest} className="neon-btn-green flex-1">
            🎮 К КВЕСТУ!
          </button>
          <button onClick={onRetest} className="neon-btn flex-1">
            📝 ПЕРЕТЕСТ
          </button>
        </div>

        <button onClick={onPuzzles} className="neon-btn w-full mb-4" style={{ borderColor: '#fff700', color: '#fff700', background: 'rgba(255, 247, 0, 0.1)' }}>
          🧩 ГОЛОВОЛОМКИ
        </button>

        <button onClick={onBack} className="neon-btn-pink w-full">
          ← НА ГЛАВНУЮ
        </button>
      </div>
    </div>
  );
}
