import React, { useState, useEffect, useCallback } from 'react';
import { StudentProfile, Theme } from '../types';
import { generateDivisionQuestion } from '../data/generators/division';
import { updateStudentProfile } from '../hooks/useAdaptiveLogic';

const TIER_NAMES: Record<number, string> = {
  1: '🔍 Разведка',
  2: '🔧 Инженер',
  3: '⚔️ Мастер',
  4: '👑 Легенда',
};

interface QuestScreenProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onBack: () => void;
  theme: Theme;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ 
  profile, 
  onUpdateProfile, 
  onBack, 
  theme 
}) => {
  const topic = 'division_2digit'; 
  
  // 🔒 БЕЗОПАСНОЕ ПОЛУЧЕНИЕ ДАННЫХ (используем ?.)
  const currentTier = profile.currentTier?.[topic] || 1;
  const streak = profile.streak ?? 0;
  const mistakes = profile.mistakes ?? 0;

  const [question, setQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);

  const generateNewQuestion = useCallback(() => {
    const newQ = generateDivisionQuestion(currentTier);
    setQuestion(newQ);
    setUserAnswer('');
    setStatus('idle');
    setShowHint(false);
  }, [currentTier]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || status !== 'idle') return;

    const numericAnswer = parseFloat(userAnswer);
    const isCorrect = numericAnswer === question.answer;

    if (isCorrect) {
      setStatus('correct');
      const updated = updateStudentProfile(profile, topic, true);
      onUpdateProfile(updated);
    } else {
      setStatus('wrong');
      const updated = updateStudentProfile(profile, topic, false);
      onUpdateProfile(updated);
    }
  };

  const handleNext = () => {
    generateNewQuestion();
  };

  if (!question) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-${theme}`}>
        <div className="text-white text-xl font-orbitron animate-pulse">Загрузка квеста...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative`}>
      <div className="max-w-3xl w-full relative z-10">
        
        {/* Шапка */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="neon-btn text-sm px-4 py-2">
            ← Выйти в меню
          </button>
          
          <div className="neon-border-pink rounded-full px-6 py-2 bg-black/60 backdrop-blur-sm">
            <span className="font-orbitron text-lg neon-text-pink font-bold">
              {TIER_NAMES[currentTier]}
            </span>
          </div
        </div>

        {/* Прогресс-бар серии */}
        <div className="mb-6 neon-border-blue rounded-full p-1 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4">
            <span className="text-white/70 font-nunito text-sm font-bold">🔥 Серия:</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700 ease-out"
                style={{ width: `${Math.min((streak / 3) * 100, 100)}%` }}
              />
            </div>
            <span className="text-orange-400 font-orbitron font-bold">{streak}/3</span>
          </div>
        </div>

        {/* Карточка с задачей */}
        <div className={`neon-border-blue rounded-2xl p-6 md:p-10 bg-black/60 backdrop-blur-md text-center transition-all duration-500 ${
          status === 'correct' ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]' :
          status === 'wrong' ? 'border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.3)] animate-pulse' :
          ''
        }`}>
          <h2 className="font-orbitron text-white/60 text-sm uppercase tracking-widest mb-4">
            Текущее задание
          </h2>
          <p className="font-nunito text-white text-2xl md:text-4xl font-bold leading-relaxed mb-8">
            {question.text}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={status !== 'idle'}
              placeholder="Введи ответ..."
              className="w-full bg-slate-900/80 text-white text-3xl font-orbitron p-4 rounded-xl border-2 border-cyan-400/50 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all placeholder-white/20 disabled:opacity-50 text-center"
              autoFocus
            />

            <div className="flex gap-3">
              {status === 'idle' && (
                <>
                  <button
                    type="submit"
                    disabled={!userAnswer}
                    className="neon-btn-green flex-1 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✓ ПРОВЕРИТЬ
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="neon-btn flex-1 py-4 text-lg"
                  >
                    💡 ПОДСКАЗКА
                  </button>
                </>
              )}

              {status !== 'idle' && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="neon-btn-pink w-full py-4 text-lg font-bold"
                >
                  ДАЛЬШЕ →
                </button>
              )}
            </div>
          </form>

          {/* Подсказка */}
          {showHint && status === 'idle' && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/50 rounded-xl animate-fade-in">
              <p className="text-yellow-200 font-nunito text-sm md:text-base">
                <span className="font-bold">💡 Подсказка:</span> {question.hint}
              </p>
            </div>
          )}

          {/* Результат: Правильно */}
          {status === 'correct' && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400 rounded-xl animate-bounce-in">
              <p className="text-green-300 text-xl font-orbitron font-bold">
                🎉 ОТЛИЧНО! Ответ: {question.answer}
              </p>
              {streak >= 3 && (
                <p className="text-yellow-300 text-sm mt-2 font-nunito animate-pulse">
                  ⭐ Уровень повышен! Ты готов к новым вызовам!
                </p>
              )}
            </div>
          )}

          {/* Результат: Неправильно */}
          {status === 'wrong' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-400 rounded-xl">
              <p className="text-red-300 text-xl font-orbitron font-bold">
                ❌ Не совсем... Верный ответ: {question.answer}
              </p>
              <p className="text-white/70 text-sm mt-2 font-nunito">
                Не переживай! Ошибки — это часть обучения. Попробуй еще раз!
              </p>
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="mt-3 text-yellow-300 hover:text-yellow-200 text-sm font-nunito underline"
                >
                  Показать подсказку
                </button>
              )}
            </div>
          )}
        </div>

        {/* Статистика внизу */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="neon-border-blue rounded-xl p-3 text-center bg-black/40">
            <div className="text-white/60 text-xs uppercase font-orbitron">Тир</div>
            <div className="text-white text-2xl font-bold font-nunito">{currentTier}</div>
          </div>
          <div className="neon-border-pink rounded-xl p-3 text-center bg-black/40">
            <div className="text-white/60 text-xs uppercase font-orbitron">Ошибки</div>
            <div className="text-red-400 text-2xl font-bold font-nunito">{mistakes}</div>
          </div>
          <div className="neon-border-green rounded-xl p-3 text-center bg-black/40">
            <div className="text-white/60 text-xs uppercase font-orbitron">Тема</div>
            <div className="text-green-400 text-lg font-bold font-nunito">Деление</div>
          </div>
        </div>
      </div>
    </div>
  );
};
