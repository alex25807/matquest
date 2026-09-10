import React, { useState, useEffect } from 'react';
import { Theme, Question, StudentProfile } from '../types';
import { getQuestionsForLevel } from '../data/questions';
import { getPraise, getEncouragement, getFamousPerson, getThemeGreeting } from '../data/motivation';
import { useSpeech } from '../hooks/useSpeech';
import { saveProfile, addXP } from '../store';
import confetti from 'canvas-confetti';
import FigureDisplay from './FigureDisplay';
import SmartHints from './SmartHints';

interface QuestScreenProps {
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  onBack: () => void;
  theme: Theme;
}

const levelNames: Record<number, string> = {
  1: 'Новичок',
  2: 'Ученик',
  3: 'Знаток',
  4: 'Мастер',
  5: 'Гуру',
  6: 'Магистр',
};

const levelEmojis: Record<string, Record<number, string>> = {
  minecraft: { 1: '🪵', 2: '⛏️', 3: '💎', 4: '🏰', 5: '🌟', 6: '👑' },
  space: { 1: '🌍', 2: '🚀', 3: '🪐', 4: '⭐', 5: '🌌', 6: '🔭' },
  spiderman: { 1: '🕸️', 2: '🦸', 3: '🏙️', 4: '⚡', 5: '🌟', 6: '🦸‍♂️' },
  dragon: { 1: '🥚', 2: '🐲', 3: '🐉', 4: '🔥', 5: '👑', 6: '🐉✨' },
};

export default function QuestScreen({ profile, onUpdateProfile, onBack, theme }: QuestScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showFamousPerson, setShowFamousPerson] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const { speak } = useSpeech();

  const questionsPerRound = 5;

  useEffect(() => {
    const qs = getQuestionsForLevel(profile.level, profile.difficultyMode);
    setQuestions(qs);
    const modeText = profile.difficultyMode === 'advanced' ? ' (ПРОДВИНУТЫЙ РЕЖИМ!)' : '';
    const greeting = getThemeGreeting(theme);
    speak(greeting + modeText + ' Решай задачи и зарабатывай опыт!');
  }, [profile.level, profile.difficultyMode, theme, speak]);

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    if (index === question.correct) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      const xpGain = 10 + (newStreak >= 3 ? 5 : 0);
      setSessionXP(prev => prev + xpGain);

      const praise = getPraise();
      speak(praise);

      // Конфетти
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });

      if (newStreak >= 3) {
        confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
      }

      // Показать факт каждые 3 правильных
      if (newStreak > 0 && newStreak % 3 === 0) {
        setShowFamousPerson(true);
      }
    } else {
      setStreak(0);
      const encouragement = getEncouragement();
      speak(encouragement);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setShowFamousPerson(false);

    if (currentQ + 1 >= questionsPerRound) {
      // Раунд завершён
      const newProfile = addXP(profile, sessionXP);
      newProfile.totalCorrect += score;
      newProfile.totalAttempted += questionsPerRound;
      newProfile.streak = streak;
      newProfile.lastSession = new Date().toISOString();

      // Проверка повышения уровня
      const maxLevel = newProfile.difficultyMode === 'advanced' ? 6 : 5;
      if (score >= 4 && newProfile.level < maxLevel) {
        newProfile.level = Math.min(newProfile.level + 1, maxLevel);
        setShowLevelUp(true);
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
        speak(`Поздравляю! Ты достиг нового уровня! Теперь ты ${levelNames[newProfile.level]}!`);
      }

      saveProfile(newProfile);
      onUpdateProfile(newProfile);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };



  if (!question) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-${theme}`}>
        <div className="text-white font-orbitron text-xl animate-pulse">Загрузка квеста...</div>
      </div>
    );
  }

  const progress = (currentQ / questionsPerRound) * 100;
  const xpForNextLevel = (profile.level) * 100;
  const xpProgress = ((profile.xp % 100) / 100) * 100;
  const emojis = levelEmojis[theme] || levelEmojis.minecraft;

  return (
    <div className={`min-h-screen flex flex-col p-4 theme-${theme} relative`}>
      {/* Level up modal */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="neon-border-green rounded-2xl p-8 bg-black/80 text-center max-w-sm mx-4 animate-[fadeIn_0.5s_ease]">
            <div className="text-6xl mb-4 animate-sparkle">{emojis[profile.level]}</div>
            <h2 className="font-orbitron text-2xl neon-text-green mb-2">УРОВЕНЬ ПОВЫШЕН!</h2>
            <p className="text-white font-nunito text-lg mb-4">
              Теперь ты: <span className="font-bold neon-text-yellow">{levelNames[profile.level]}</span>
            </p>
            <p className="text-white/60 text-sm mb-4">
              Продолжай в том же духе! Впереди новые испытания!
            </p>
            <button onClick={() => { setShowLevelUp(false); onBack(); }} className="neon-btn-green">
              🎉 ОТЛИЧНО!
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-2">
          <button onClick={onBack} className="text-white/60 hover:text-white text-sm font-nunito">
            ← Выход
          </button>
          <div className="font-orbitron text-xs neon-text-purple">
            {emojis[profile.level]} УРОВЕНЬ {profile.level}: {levelNames[profile.level]}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="font-orbitron text-xs text-white/60">
            ЗАДАЧА {currentQ + 1}/{questionsPerRound}
          </div>
          <div className="flex gap-3">
            <span className="font-orbitron text-xs neon-text-green">✅ {score}</span>
            <span className="font-orbitron text-xs neon-text-yellow">🔥 {streak}</span>
            <span className="font-orbitron text-xs neon-text-purple">⭐ {sessionXP} XP</span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full h-2 bg-black/30 rounded-full mb-1 overflow-hidden border border-white/10">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="text-white/40 text-xs text-right mb-3">
          {profile.xp % 100}/{100} XP до уровня {profile.level + 1}
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-black/30 rounded-full mb-6 overflow-hidden border border-white/10">
          <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
        </div>

        {/* Question card */}
        <div className="neon-border-blue rounded-2xl p-6 bg-black/40 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-white/50 text-xs font-orbitron">
              {question.topic.toUpperCase()}
            </div>
            {question.isAdvanced && (
              <div className="text-xs font-orbitron neon-text-yellow animate-pulse-neon">
                ⭐ ПРОДВИНУТЫЙ
              </div>
            )}
          </div>
          <h2 className="font-nunito text-xl md:text-2xl text-white font-bold leading-relaxed">
            {question.question}
          </h2>
          
          {/* Графическая фигура */}
          {question.figure && <FigureDisplay question={question} />}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {question.options.map((option, idx) => {
            let btnClass = 'neon-border-blue bg-black/30 text-white';
            if (showResult) {
              if (idx === question.correct) {
                btnClass = 'border-2 border-green-400 bg-green-500/20 text-green-300 shadow-[0_0_15px_rgba(57,255,20,0.3)]';
              } else if (idx === selected && idx !== question.correct) {
                btnClass = 'border-2 border-red-400 bg-red-500/20 text-red-300';
              } else {
                btnClass = 'border border-white/10 bg-black/20 text-white/40';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`${btnClass} rounded-xl p-4 text-left font-nunito text-lg font-semibold transition-all hover:scale-[1.02] disabled:hover:scale-100`}
              >
                <span className="text-white/50 mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {showResult && (
          <div className="animate-[fadeIn_0.3s_ease-in]">
            <div className={`rounded-xl p-4 mb-3 ${selected === question.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
              <p className="text-white font-nunito font-bold mb-1">
                {selected === question.correct ? '✅ Отлично!' : '💪 Почти!'}
              </p>
              <p className="text-white/80 text-sm">
                💡 {question.explanation}
              </p>
              {selected === question.correct && (
                <p className="text-green-400 text-sm mt-2 font-bold">+{10 + (streak >= 3 ? 5 : 0)} XP</p>
              )}
            </div>

            {/* Умные подсказки и альтернативные решения */}
            <SmartHints question={question} />

            {/* Famous person */}
            {showFamousPerson && (
              <div className="mb-3 rounded-xl p-4 bg-purple-500/10 border border-purple-500/30">
                <p className="text-purple-300 font-nunito font-bold text-sm mb-1">🌟 ИНТЕРЕСНЫЙ ФАКТ</p>
                <p className="text-white/80 text-sm">
                  {(() => { const p = getFamousPerson(); return `${p.name} ${p.achievement}. Математика помогла ему/ей в: ${p.math}`; })()}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="neon-btn-green w-full"
            >
              {currentQ + 1 >= questionsPerRound ? '🏆 ЗАВЕРШИТЬ РАУНД' : '➡️ СЛЕДУЮЩАЯ ЗАДАЧА'}
            </button>
          </div>
        )}

        {/* Stats footer */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/30 rounded-lg p-2 border border-white/10">
            <div className="text-white/50 text-xs">ВСЕГО РЕШЕНО</div>
            <div className="font-orbitron text-sm neon-text-blue">{profile.totalAttempted}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2 border border-white/10">
            <div className="text-white/50 text-xs">ПРАВИЛЬНЫХ</div>
            <div className="font-orbitron text-sm neon-text-green">{profile.totalCorrect}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-2 border border-white/10">
            <div className="text-white/50 text-xs">СЕРИЯ 🔥</div>
            <div className="font-orbitron text-sm neon-text-yellow">{profile.streak}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
