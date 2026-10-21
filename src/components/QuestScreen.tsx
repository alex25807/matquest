import React, { useState, useEffect, useCallback } from 'react';
import { Question, Tier, TopicId, StudentProfile } from '../types';
import { generateDivisionQuestion } from '../data/generators/division';
import { updateStudentProfile } from '../hooks/useAdaptiveLogic';

// 🎨 Названия тиров для красивого отображения
const TIER_NAMES: Record<Tier, string> = {
  1: '🔍 Разведка',
  2: '🔧 Инженер',
  3: '⚔️ Мастер',
  4: '👑 Легенда',
};

const TIER_COLORS: Record<Tier, string> = {
  1: 'from-blue-500 to-cyan-500',
  2: 'from-green-500 to-emerald-500',
  3: 'from-purple-500 to-pink-500',
  4: 'from-yellow-500 to-orange-500',
};

interface QuestScreenProps {
  topic: TopicId;
  onExit: () => void;
}

export const QuestScreen: React.FC<QuestScreenProps> = ({ topic, onExit }) => {
  // 📦 Состояния
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(() => {
    // Загружаем профиль из localStorage или создаём новый
    const saved = localStorage.getItem('studentProfile');
    if (saved) return JSON.parse(saved);
    
    // Начальный профиль: все темы на 1 тире
    const initialTiers = {} as Record<TopicId, Tier>;
    initialTiers[topic] = 1;
    return {
      currentTier: initialTiers,
      streak: 0,
      mistakes: 0,
      weakTopics: [],
    };
  });

  const currentTier = profile.currentTier[topic] || 1;

  // 🎲 Генерация нового вопроса
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

  // 💾 Сохранение профиля при изменении
  useEffect(() => {
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  }, [profile]);

  // ✅ Обработка ответа
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || status !== 'idle') return;

    const numericAnswer = parseFloat(userAnswer);
    const isCorrect = numericAnswer === question.answer;

    if (isCorrect) {
      setStatus('correct');
      setProfile(prev => updateStudentProfile(prev, topic, true));
    } else {
      setStatus('wrong');
      setProfile(prev => updateStudentProfile(prev, topic, false));
    }
  };

  // ➡️ Переход к следующему вопросу
  const handleNext = () => {
    generateNewQuestion();
  };

  // 💡 Показать подсказку
  const handleShowHint = () => {
    setShowHint(true);
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка вопроса...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* 🎯 Шапка с информацией */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Выйти
          </button>
          
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${TIER_COLORS[currentTier]} text-white font-bold shadow-lg`}>
            {TIER_NAMES[currentTier]}
          </div>
        </div>

        {/* 📊 Прогресс-бар серии */}
        <div className="mb-6 bg-slate-800/50 rounded-full p-1 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-3">
            <span className="text-white/70 text-sm">🔥 Серия:</span>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
                style={{ width: `${(profile.streak / 3) * 100}%` }}
              />
            </div>
            <span className="text-white font-bold">{profile.streak}/3</span>
          </div>
        </div>

        {/* 📜 Карточка с задачей */}
        <div
          className={`relative bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 transition-all duration-500 ${
            status === 'correct'
              ? 'border-green-400 shadow-green-400/50'
              : status === 'wrong'
              ? 'border-red-400 shadow-red-400/50 animate-pulse'
              : 'border-purple-400/50 shadow-purple-400/30'
          }`}
        >
          {/* Текст задачи */}
          <div className="mb-8">
            <h2 className="text-white/60 text-sm uppercase tracking-wider mb-3">
              Задание
            </h2>
            <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
              {question.text}
            </p>
          </div>

          {/* Форма ввода ответа */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="Введите ответ..."
                className="w-full bg-slate-900/70 text-white text-xl md:text-2xl p-4 rounded-xl border-2 border-purple-400/50 focus:border-cyan-400 focus:outline-none transition-all placeholder-white/30 disabled:opacity-50"
                autoFocus
              />
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-3 flex-wrap">
              {status === 'idle' && (
                <>
                  <button
                    type="submit"
                    disabled={!userAnswer}
                    className="flex-1 min-w-[150px] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    ✓ Проверить
                  </button>
                  <button
                    type="button"
                    onClick={handleShowHint}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                  >
                    💡 Подсказка
                  </button>
                </>
              )}

              {status !== 'idle' && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  Далее →
                </button>
              )}
            </div>
          </form>

          {/* 💡 Блок подсказки */}
          {showHint && status === 'idle' && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/50 rounded-xl animate-fade-in">
              <p className="text-yellow-200 text-sm md:text-base">
                <span className="font-bold">💡 Подсказка:</span> {question.hint}
              </p>
            </div>
          )}

          {/* ✅ Результат: правильно */}
          {status === 'correct' && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400 rounded-xl animate-bounce-in">
              <p className="text-green-300 text-lg font-bold">
                🎉 Отлично! Правильный ответ: {question.answer}
              </p>
              {profile.streak >= 3 && (
                <p className="text-yellow-300 text-sm mt-2">
                  ⭐ Ты готов к следующему уровню!
                </p>
              )}
            </div>
          )}

          {/* ❌ Результат: неправильно */}
          {status === 'wrong' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-400 rounded-xl">
              <p className="text-red-300 text-lg font-bold">
                ❌ Не совсем... Правильный ответ: {question.answer}
              </p>
              <p className="text-white/70 text-sm mt-2">
                💡 Не переживай! Попробуй ещё раз — у тебя получится.
              </p>
              <button
                onClick={handleShowHint}
                className="mt-3 text-yellow-300 hover:text-yellow-200 text-sm underline"
              >
                Посмотреть подсказку
              </button>
            </div>
          )}
        </div>

        {/* 📈 Статистика внизу */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-white/60 text-xs uppercase">Тир</div>
            <div className="text-white text-2xl font-bold">{currentTier}</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-white/60 text-xs uppercase">Серия</div>
            <div className="text-orange-400 text-2xl font-bold">🔥 {profile.streak}</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-white/60 text-xs uppercase">Ошибки</div>
            <div className="text-red-400 text-2xl font-bold">{profile.mistakes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};