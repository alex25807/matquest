import React, { useEffect, useRef, useState } from 'react';
import {
  AdaptiveQuestion,
  QuestFocus,
  StudentProfile,
  TableDrillState,
  Theme,
  TopicId,
} from '../types';
import {
  generateQuestionForTopic,
  getTopicTier,
  pickNextTopic,
  TIER_NAMES,
  TOPIC_LABELS,
} from '../data/generators';
import { updateStudentProfile } from '../hooks/useAdaptiveLogic';

const QUESTIONS_PER_ROUND = 7;

interface QuestScreenProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onBack: () => void;
  theme: Theme;
  focus?: QuestFocus;
}

export default function QuestScreen({
  profile,
  onUpdateProfile,
  onBack,
  theme,
  focus = 'mixed',
}: QuestScreenProps) {
  const [question, setQuestion] = useState<AdaptiveQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'retry' | 'correct' | 'wrong'>('idle');
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [tierJustUp, setTierJustUp] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [roundDone, setRoundDone] = useState(false);
  const [usedSecondTry, setUsedSecondTry] = useState(false);
  const [helpStep, setHelpStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showMethod, setShowMethod] = useState(false);

  const lastTemplateId = useRef<string | null>(null);
  const lastTopic = useRef<TopicId | null>(null);
  const sequentialRef = useRef<TableDrillState | null>(null);
  const profileRef = useRef(profile);
  profileRef.current = profile;

  const generateNewQuestion = (index = roundIndex) => {
    const p = profileRef.current;
    const topic = pickNextTopic(p, lastTopic.current, index, focus);
    const tier = getTopicTier(p, topic);
    const seqIn = sequentialRef.current ?? profileRef.current.tableDrill ?? null;
    const { question: next, sequential } = generateQuestionForTopic(
      topic,
      tier,
      theme,
      lastTemplateId.current,
      seqIn
    );
    sequentialRef.current = sequential;
    lastTemplateId.current = next.templateId;
    if (sequential) {
      const prev = profileRef.current.tableDrill;
      if (!prev || prev.factor !== sequential.factor || prev.nextN !== sequential.nextN) {
        onUpdateProfile({ ...profileRef.current, tableDrill: sequential });
      }
    }
    lastTopic.current = next.topic;
    setQuestion(next);
    setUserAnswer('');
    setStatus('idle');
    setShowHint(false);
    setHintIndex(0);
    setTierJustUp(false);
    setUsedSecondTry(false);
    setHelpStep(0);
    setShowAnswer(false);
    setShowMethod(false);
  };

  useEffect(() => {
    generateNewQuestion(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishAnswer = (isCorrect: boolean, secondTry: boolean) => {
    if (!question) return;
    const prevTier = getTopicTier(profile, question.topic);
    const xp = isCorrect ? (secondTry ? 6 : 12) : 0;
    const updated = updateStudentProfile(profile, question.topic, isCorrect, xp);
    const nextTier = getTopicTier(updated, question.topic);
    setTierJustUp(isCorrect && nextTier > prevTier);
    if (isCorrect) setRoundCorrect((n) => n + 1);
    onUpdateProfile(updated);
    setStatus(isCorrect ? 'correct' : 'wrong');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || status === 'correct' || showAnswer) return;

    const numericAnswer = parseFloat(userAnswer.replace(',', '.'));
    const isCorrect = numericAnswer === question.answer;

    if (isCorrect) {
      finishAnswer(true, helpStep > 0);
      return;
    }

    setStatus('retry');
    setUserAnswer('');
  };

  const askHelp = () => {
    setHelpStep((step) => Math.min(step + 1, 3));
  };

  const revealAnswer = () => {
    if (!question || showAnswer || status === 'correct') return;
    setShowAnswer(true);
    finishAnswer(false, true);
  };

  const handleNext = () => {
    if (roundIndex + 1 >= QUESTIONS_PER_ROUND) {
      setRoundDone(true);
      return;
    }
    const nextIndex = roundIndex + 1;
    setRoundIndex(nextIndex);
    generateNewQuestion(nextIndex);
  };

  const topic = question?.topic;
  const currentTier = topic ? getTopicTier(profile, topic) : 1;
  const topicStreak = topic ? profile.topicStreak?.[topic] ?? 0 : 0;
  const visibleHints = question ? question.hints.slice(0, Math.min(helpStep, 2)) : [];

  if (roundDone) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 theme-${theme}`}>
        <div className="max-w-md w-full neon-border-green rounded-2xl p-8 bg-black/60 text-center">
          <p className="text-5xl mb-4">Готово</p>
          <h2 className="font-nunito text-2xl neon-text-green mb-3 font-bold">Раунд завершён</h2>
          <p className="font-nunito text-white/80 mb-6">
            Верных с первой или второй попытки: {roundCorrect} из {QUESTIONS_PER_ROUND}.
            Короткая серия — как раз чтобы не устать и захотеть ещё.
          </p>
          <button onClick={onBack} className="neon-btn-green w-full py-4">
            К приключениям
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-${theme}`}>
        <div className="text-white text-xl font-nunito animate-pulse">Готовим задачу...</div>
      </div>
    );
  }

  const locked = status === 'correct' || status === 'wrong' || showAnswer;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative`}>
      <div className="max-w-3xl w-full relative z-10">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onBack} className="neon-btn text-sm px-4 py-2">
            Выйти
          </button>
          <div className="neon-border-pink rounded-full px-5 py-2 bg-black/60">
            <span className="font-nunito text-sm neon-text-pink font-bold">
              {TIER_NAMES[currentTier]} · {TOPIC_LABELS[question.topic]}
            </span>
          </div>
          <div className="font-orbitron text-sm text-white/70">
            {roundIndex + 1}/{QUESTIONS_PER_ROUND}
          </div>
        </div>

        {focus === 'multiplication_table' && (
          <p className="text-center text-yellow-200/80 font-nunito text-sm mb-3">
            Тренировка таблицы: по порядку, вразнобой и наоборот — как настоящая разминка мозга.
          </p>
        )}

        <div className="mb-5 neon-border-blue rounded-full p-1 bg-black/40">
          <div className="flex items-center gap-3 px-4 py-1">
            <span className="text-white/70 font-nunito text-sm font-bold">Серия темы</span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700"
                style={{ width: `${Math.min((topicStreak / 3) * 100, 100)}%` }}
              />
            </div>
            <span className="text-orange-400 font-orbitron font-bold">{topicStreak}/3</span>
          </div>
        </div>

        <div
          className={`neon-border-blue rounded-2xl p-6 md:p-10 bg-black/60 text-center ${
            status === 'correct'
              ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]'
              : status === 'wrong' || status === 'retry'
                ? 'border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.3)]'
                : ''
          }`}
        >
          <h2 className="font-nunito text-white/60 text-sm uppercase tracking-widest mb-3">
            {status === 'retry' ? 'Подумай ещё — подсказка-вопрос ниже' : 'Задание'}
          </h2>
          <p className="font-nunito text-white text-2xl md:text-3xl font-bold leading-relaxed mb-8">
            {question.text}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={locked}
              placeholder="Ответ числом..."
              className="w-full bg-slate-900/80 text-white text-3xl font-orbitron p-4 rounded-xl border-2 border-cyan-400/50 focus:border-cyan-400 focus:outline-none text-center disabled:opacity-50"
              autoFocus
            />

            <div className="flex flex-col gap-3">
              {!locked && (
                <button
                  type="submit"
                  disabled={!userAnswer}
                  className="neon-btn-green w-full py-4 text-lg font-bold disabled:opacity-50"
                >
                  Проверить
                </button>
              )}
              {!locked && helpStep < 1 && (
                <button type="button" onClick={askHelp} className="neon-btn w-full py-3">
                  Наводящий вопрос
                </button>
              )}
              {!locked && helpStep === 1 && (
                <button type="button" onClick={askHelp} className="neon-btn w-full py-3">
                  Подсказка
                </button>
              )}
              {!locked && helpStep === 2 && (
                <button type="button" onClick={askHelp} className="neon-btn w-full py-3">
                  Объясни материал
                </button>
              )}
              {!locked && helpStep >= 3 && (
                <button type="button" onClick={revealAnswer} className="neon-btn-pink w-full py-3">
                  Покажи ответ
                </button>
              )}
              {locked && (
                <button type="button" onClick={handleNext} className="neon-btn-pink w-full py-4 text-lg font-bold">
                  {roundIndex + 1 >= QUESTIONS_PER_ROUND ? 'Завершить раунд' : 'Дальше'}
                </button>
              )}
            </div>
          </form>

          {visibleHints.length > 0 && !showAnswer && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/50 rounded-xl text-left">
              {visibleHints.map((h, i) => (
                <p key={i} className="text-yellow-200 font-nunito text-sm md:text-base mb-2 last:mb-0">
                  <span className="font-bold">{i === 0 ? 'Вопрос' : 'Приём'}:</span> {h}
                </p>
              ))}
            </div>
          )}

          {helpStep >= 3 && !showAnswer && status !== 'correct' && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/40 rounded-xl text-left">
              <p className="text-blue-100 font-nunito text-sm whitespace-pre-line">{question.method}</p>
            </div>
          )}

          {status === 'retry' && !showAnswer && (
            <p className="mt-4 text-orange-200 font-nunito text-sm">
              Пока не то. Можно спросить следующий шаг или попробовать ещё раз.
            </p>
          )}

          {status === 'correct' && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400 rounded-xl text-left">
              <p className="text-green-300 text-xl font-nunito font-bold mb-2">Верно.</p>
              {showMethod ? (
                <p className="text-white/80 font-nunito text-sm whitespace-pre-line">{question.explanation}</p>
              ) : (
                <button type="button" onClick={() => setShowMethod(true)} className="text-yellow-200 text-sm underline">
                  Как это решается
                </button>
              )}
              {tierJustUp && (
                <p className="text-yellow-300 text-sm mt-2 font-nunito">Тема стала сложнее: новые типы задач.</p>
              )}
            </div>
          )}

          {showAnswer && status !== 'correct' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-400 rounded-xl text-left">
              <p className="text-red-200 text-xl font-nunito font-bold mb-2">Ответ: {question.answer}</p>
              <p className="text-white/80 font-nunito text-sm whitespace-pre-line">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
