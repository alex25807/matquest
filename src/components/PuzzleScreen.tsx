import React, { useState, useEffect } from 'react';
import { Theme, StudentProfile, Question } from '../types';
import { getRandomPuzzles } from '../data/puzzles';
import { getPraise, getEncouragement } from '../data/motivation';
import { useSpeech } from '../hooks/useSpeech';
import { saveProfile, addXP } from '../store';
import confetti from 'canvas-confetti';

interface PuzzleScreenProps {
  profile: StudentProfile;
  onUpdateProfile: (profile: StudentProfile) => void;
  onBack: () => void;
  theme: Theme;
}

const puzzleCategories = [
  { id: 'logic_riddle', name: 'Логические', emoji: '🧩', color: 'from-blue-600 to-purple-600' },
  { id: 'number_puzzle', name: 'Числовые', emoji: '🔢', color: 'from-green-600 to-teal-600' },
  { id: 'spatial', name: 'Пространственные', emoji: '📐', color: 'from-orange-600 to-red-600' },
  { id: 'lateral', name: 'Нестандартные', emoji: '💡', color: 'from-yellow-600 to-orange-600' },
  { id: 'trick', name: 'Обманки', emoji: '🎭', color: 'from-pink-600 to-rose-600' },
  { id: 'visual', name: 'Визуальные', emoji: '👁️', color: 'from-indigo-600 to-blue-600' },
  { id: 'wits', name: 'Смекалка', emoji: '🧠', color: 'from-purple-600 to-pink-600' },
];

export default function PuzzleScreen({ profile, onUpdateProfile, onBack, theme }: PuzzleScreenProps) {
  const [mode, setMode] = useState<'menu' | 'play'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [puzzles, setPuzzles] = useState<Question[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const { speak } = useSpeech();

  useEffect(() => {
    speak('Добро пожаловать в мир головоломок! Здесь ты научишься мыслить нестандартно!');
  }, [speak]);

  const startCategory = (categoryId: string) => {
    const categoryPuzzles = getRandomPuzzles(profile.level, 5)
      .filter(p => p.topic === categoryId);
    
    if (categoryPuzzles.length === 0) {
      // Если в категории мало головоломок, берём любые
      const anyPuzzles = getRandomPuzzles(profile.level, 5);
      setPuzzles(anyPuzzles);
    } else {
      setPuzzles(categoryPuzzles);
    }
    
    setSelectedCategory(categoryId);
    setCurrentPuzzle(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setShowHint(false);
    setSessionXP(0);
    setMode('play');
    speak('Отлично! Начинаем! Думай нестандартно!');
  };

  const startRandom = () => {
    const randomPuzzles = getRandomPuzzles(profile.level, 7);
    setPuzzles(randomPuzzles);
    setSelectedCategory('random');
    setCurrentPuzzle(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setShowHint(false);
    setSessionXP(0);
    setMode('play');
    speak('Случайные головоломки! Будь готов ко всему!');
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    if (index === puzzles[currentPuzzle].correct) {
      const newScore = score + 1;
      setScore(newScore);
      const xpGain = 15; // Головоломки дают больше XP
      setSessionXP(prev => prev + xpGain);
      
      const praise = getPraise();
      speak(praise);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else {
      const encouragement = getEncouragement();
      speak(encouragement);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setShowHint(false);

    if (currentPuzzle + 1 >= puzzles.length) {
      // Завершение
      const newProfile = addXP(profile, sessionXP);
      newProfile.totalCorrect += score;
      newProfile.totalAttempted += puzzles.length;
      newProfile.lastSession = new Date().toISOString();
      
      saveProfile(newProfile);
      onUpdateProfile(newProfile);
      setShowComplete(true);
      
      if (score === puzzles.length) {
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
        speak('Невероятно! Все головоломки разгаданы! Ты настоящий гений!');
      } else {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
        speak(`Отлично! Ты решил ${score} из ${puzzles.length} головоломок!`);
      }
    } else {
      setCurrentPuzzle(currentPuzzle + 1);
    }
  };

  // Экран завершения
  if (showComplete) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative`}>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="text-7xl mb-4 animate-sparkle">🏆</div>
          <h1 className="font-orbitron text-3xl neon-text-green mb-4">ГОТОВО!</h1>
          <div className="neon-border-green rounded-xl p-6 bg-black/40 mb-6">
            <p className="font-nunito text-xl text-white mb-2">
              Разгадано: <span className="neon-text-yellow font-bold">{score}/{puzzles.length}</span>
            </p>
            <p className="font-nunito text-lg text-white/80 mb-2">
              Заработано XP: <span className="neon-text-purple font-bold">+{sessionXP}</span>
            </p>
            <p className="font-nunito text-sm text-white/60">
              {score === puzzles.length 
                ? '🌟 Идеально! Ты настоящий мастер головоломок!' 
                : score >= puzzles.length * 0.7 
                ? '💪 Отличный результат! Твой мозг работает на полную!' 
                : '🧠 Хорошая тренировка! Попробуй ещё раз!'}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setMode('menu')} className="neon-btn flex-1">
              📋 МЕНЮ
            </button>
            <button onClick={onBack} className="neon-btn-pink flex-1">
              🏠 НА ГЛАВНУЮ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Меню категорий
  if (mode === 'menu') {
    return (
      <div className={`min-h-screen flex flex-col p-4 theme-${theme} relative overflow-y-auto`}>
        <div className="max-w-2xl mx-auto w-full py-4">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2 animate-float">🧩</div>
            <h1 className="font-orbitron text-3xl neon-text-purple mb-2">ГОЛОВОЛОМКИ</h1>
            <p className="font-nunito text-white/70">
              Развивай образное и нестандартное мышление!
            </p>
          </div>

          {/* Random puzzles button */}
          <button
            onClick={startRandom}
            className="neon-btn-green w-full mb-6 text-lg py-4"
          >
            🎲 СЛУЧАЙНЫЕ ГОЛОВОЛОМКИ (7 штук)
          </button>

          {/* Categories */}
          <h2 className="font-orbitron text-sm neon-text-blue mb-3 text-center">ИЛИ ВЫБЕРИ КАТЕГОРИЮ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {puzzleCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => startCategory(cat.id)}
                className={`card-hover p-4 rounded-xl bg-gradient-to-br ${cat.color} border border-white/20 transition-all`}
              >
                <div className="text-3xl mb-1">{cat.emoji}</div>
                <div className="font-orbitron text-white text-xs font-bold">{cat.name}</div>
              </button>
            ))}
          </div>

          {/* Info block */}
          <div className="neon-border-blue rounded-xl p-4 bg-black/30 mb-4">
            <h3 className="font-orbitron text-sm neon-text-yellow mb-2">💡 ЗАЧЕМ РЕШАТЬ ГОЛОВОЛОМКИ?</h3>
            <ul className="text-white/70 text-sm space-y-1 font-nunito">
              <li>🧠 Развивают нестандартное мышление</li>
              <li>🎯 Учат видеть задачу с разных сторон</li>
              <li>⚡ Тренируют логику и сообразительность</li>
              <li>🚀 Помогают в учёбе и жизни</li>
              <li>🌟 Успешные люди любят головоломки!</li>
            </ul>
          </div>

          <button onClick={onBack} className="neon-btn w-full">
            ← НА ГЛАВНУЮ
          </button>
        </div>
      </div>
    );
  }

  // Игровой режим
  const puzzle = puzzles[currentPuzzle];
  if (!puzzle) return null;

  const progress = (currentPuzzle / puzzles.length) * 100;
  const category = puzzleCategories.find(c => c.id === puzzle.topic);

  return (
    <div className={`min-h-screen flex flex-col p-4 theme-${theme} relative`}>
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <button onClick={() => setMode('menu')} className="text-white/60 hover:text-white text-sm font-nunito">
            ← Меню
          </button>
          <div className="flex gap-3">
            <span className="font-orbitron text-xs neon-text-green">✅ {score}</span>
            <span className="font-orbitron text-xs neon-text-purple">⭐ {sessionXP} XP</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="font-orbitron text-xs text-white/60">
            {category?.emoji} {category?.name || 'Случайные'}
          </div>
          <div className="font-orbitron text-xs text-white/60">
            {currentPuzzle + 1}/{puzzles.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-black/30 rounded-full mb-6 overflow-hidden border border-white/10">
          <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
        </div>

        {/* Puzzle card */}
        <div className="neon-border-purple rounded-2xl p-6 bg-black/40 mb-6 backdrop-blur-sm">
          <div className="text-white/50 text-xs font-orbitron mb-2">
            ГОЛОВОЛОМКА • УРОВЕНЬ {puzzle.level}
          </div>
          <h2 className="font-nunito text-xl md:text-2xl text-white font-bold leading-relaxed">
            {puzzle.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {puzzle.options.map((option, idx) => {
            let btnClass = 'neon-border-purple bg-black/30 text-white';
            if (showResult) {
              if (idx === puzzle.correct) {
                btnClass = 'border-2 border-green-400 bg-green-500/20 text-green-300 shadow-[0_0_15px_rgba(57,255,20,0.3)]';
              } else if (idx === selected && idx !== puzzle.correct) {
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
                className={`${btnClass} rounded-xl p-4 text-left font-nunito text-lg font-semibold transition-all hover:scale-[1.01] disabled:hover:scale-100`}
              >
                <span className="text-white/50 mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {!showResult && !showHint && (
          <button onClick={() => { setShowHint(true); speak('Подумай хорошо! Ответ где-то рядом!'); }} className="neon-btn-purple text-sm mb-4">
            💡 ПОДСКАЗКА
          </button>
        )}
        {showHint && !showResult && (
          <div className="mb-4 rounded-xl p-3 bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-yellow-300 text-sm">💡 {puzzle.hint || 'Подумай нестандартно!'}</p>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="animate-[fadeIn_0.3s_ease-in]">
            <div className={`rounded-xl p-4 mb-3 ${selected === puzzle.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
              <p className="text-white font-nunito font-bold mb-1">
                {selected === puzzle.correct ? '✅ Разгадано!' : '💡 Не совсем...'}
              </p>
              <p className="text-white/80 text-sm">
                {puzzle.explanation}
              </p>
              {selected === puzzle.correct && (
                <p className="text-green-400 text-sm mt-2 font-bold">+15 XP</p>
              )}
            </div>

            <button onClick={handleNext} className="neon-btn-green w-full">
              {currentPuzzle + 1 >= puzzles.length ? '🏆 ЗАВЕРШИТЬ' : '➡️ СЛЕДУЮЩАЯ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
