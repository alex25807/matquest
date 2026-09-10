import React, { useState, useEffect } from 'react';
import { Theme, Question, StudentProfile } from '../types';
import { testQuestions, figureQuestions, advancedQuestions } from '../data/questions';
import { getPraise, getEncouragement, getFamousPerson } from '../data/motivation';
import { useSpeech } from '../hooks/useSpeech';
import confetti from 'canvas-confetti';
import FigureDisplay from './FigureDisplay';
import SmartHints from './SmartHints';

interface TestScreenProps {
  profile: StudentProfile;
  onComplete: (score: number, total: number, level: number) => void;
  theme: Theme;
}

export default function TestScreen({ profile, onComplete, theme }: TestScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [streak, setStreak] = useState(0);
  const [testQuestions_shuffled, setTestQuestions_shuffled] = useState<Question[]>([]);
  const { speak } = useSpeech();

  const totalQuestions = 10;

  useEffect(() => {
    // Выбираем вопросы для теста - микс уровней
    let allQuestions = [...testQuestions];
    
    // Если продвинутый режим, добавляем графические и продвинутые вопросы
    if (profile.difficultyMode === 'advanced') {
      allQuestions = [...allQuestions, ...figureQuestions.slice(0, 4), ...advancedQuestions.slice(0, 3)];
    }
    
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setTestQuestions_shuffled(shuffled.slice(0, totalQuestions));
    const modeText = profile.difficultyMode === 'advanced' ? ' (продвинутый режим!)' : '';
    speak(`Давай определим твой уровень${modeText}! Отвечай на вопросы, не торопись. Ты справишься!`);
  }, [speak, profile.difficultyMode]);

  const question = testQuestions_shuffled[currentQ];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    if (index === question.correct) {
      const newScore = score + 1;
      setScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      const praise = getPraise();
      speak(praise);
      
      // Конфетти за серию правильных ответов
      if (newStreak >= 3) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }

      // Показать факт о знаменитости каждые 3 правильных ответа
      if (newStreak >= 3 && newStreak % 3 === 0) {
        setShowFact(true);
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
    setShowFact(false);

    if (currentQ + 1 >= totalQuestions) {
      // Определяем уровень
      const percentage = score / totalQuestions;
      let level = 1;
      
      // Если продвинутый режим, уровень может быть выше
      if (profile.difficultyMode === 'advanced') {
        if (percentage >= 0.9) level = 6;
        else if (percentage >= 0.75) level = 5;
        else if (percentage >= 0.6) level = 4;
        else if (percentage >= 0.4) level = 3;
        else if (percentage >= 0.2) level = 2;
      } else {
        if (percentage >= 0.9) level = 5;
        else if (percentage >= 0.7) level = 4;
        else if (percentage >= 0.5) level = 3;
        else if (percentage >= 0.3) level = 2;
      }
      
      speak(`Тест завершён! Ты ответил правильно на ${score} из ${totalQuestions}. Отличный результат!`);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      onComplete(score, totalQuestions, level);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  if (!question) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-${theme}`}>
        <div className="text-white font-orbitron text-xl animate-pulse">Загрузка вопросов...</div>
      </div>
    );
  }

  const progress = ((currentQ) / totalQuestions) * 100;

  return (
    <div className={`min-h-screen flex flex-col p-4 theme-${theme} relative`}>
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="font-orbitron text-sm neon-text-blue">
            ВОПРОС {currentQ + 1}/{totalQuestions}
          </div>
          <div className="font-orbitron text-sm neon-text-green">
            ✅ {score} | 🔥 {streak}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-black/30 rounded-full mb-6 overflow-hidden border border-white/10">
          <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
        </div>

        {/* Question card */}
        <div className="neon-border-blue rounded-2xl p-6 bg-black/40 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-white/50 text-xs font-orbitron">
              УРОВЕНЬ {question.level} • {question.topic.toUpperCase()}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {question.options.map((option, idx) => {
            let btnClass = 'neon-border-blue bg-black/30 text-white';
            if (showResult) {
              if (idx === question.correct) {
                btnClass = 'border-2 border-green-400 bg-green-500/20 text-green-300 shadow-[0_0_15px_rgba(57,255,20,0.3)]';
              } else if (idx === selected && idx !== question.correct) {
                btnClass = 'border-2 border-red-400 bg-red-500/20 text-red-300 shadow-[0_0_15px_rgba(255,0,0,0.3)]';
              } else {
                btnClass = 'border border-white/10 bg-black/20 text-white/40';
              }
            } else if (idx === selected) {
              btnClass = 'neon-border-pink bg-pink-500/20 text-pink-300';
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
          <div className="mb-6 animate-[fadeIn_0.3s_ease-in]">
            <div className={`rounded-xl p-4 ${selected === question.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
              <p className="text-white font-nunito font-bold mb-1">
                {selected === question.correct ? '✅ Правильно!' : '❌ Не совсем...'}
              </p>
              <p className="text-white/80 text-sm">
                💡 {question.explanation}
              </p>
            </div>

            {/* Умные подсказки и альтернативные решения */}
            <div className="mt-4">
              <SmartHints question={question} />
            </div>

            {/* Famous person fact */}
            {showFact && (
              <div className="mt-3 rounded-xl p-4 bg-purple-500/10 border border-purple-500/30">
                <p className="text-purple-300 font-nunito font-bold text-sm mb-1">
                  🌟 А ЗНАЕШЬ ЛИ ТЫ?
                </p>
                <p className="text-white/80 text-sm">
                  {(() => { const p = getFamousPerson(); return `${p.name} ${p.achievement}. Ему помогло знание: ${p.math}`; })()}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="neon-btn-green mt-4 w-full"
            >
              {currentQ + 1 >= totalQuestions ? '🏆 ЗАВЕРШИТЬ ТЕСТ' : '➡️ ДАЛЕЕ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
