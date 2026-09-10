import React, { useState } from 'react';
import { Question } from '../types';

interface SmartHintsProps {
  question: Question;
  onHintUsed?: () => void;
}

export default function SmartHints({ question, onHintUsed }: SmartHintsProps) {
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const hints = question.hints || [];
  const alternatives = question.alternativeSolutions || [];

  const revealNextHint = () => {
    if (revealedHints < hints.length) {
      setRevealedHints(revealedHints + 1);
      onHintUsed?.();
    }
  };

  if (hints.length === 0 && alternatives.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Многоступенчатые подсказки */}
      {hints.length > 0 && (
        <div className="neon-border-blue rounded-xl p-4 bg-black/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-orbitron text-sm neon-text-blue flex items-center gap-2">
              💡 ПОДСКАЗКИ
              <span className="text-xs text-white/50">({revealedHints}/{hints.length})</span>
            </h3>
            {revealedHints < hints.length && (
              <button
                onClick={revealNextHint}
                className="neon-btn text-xs px-3 py-1"
              >
                Показать подсказку
              </button>
            )}
          </div>

          <div className="space-y-2">
            {hints.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 animate-[fadeIn_0.3s_ease-in]"
              >
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold text-sm">
                    {idx + 1}.
                  </span>
                  <p className="text-white/90 text-sm">{hint}</p>
                </div>
              </div>
            ))}
          </div>

          {revealedHints === 0 && (
            <p className="text-white/50 text-xs mt-2 italic">
              Нажми кнопку, чтобы получить первую подсказку
            </p>
          )}
        </div>
      )}

      {/* Альтернативные способы решения */}
      {alternatives.length > 0 && (
        <div className="neon-border-green rounded-xl p-4 bg-black/30">
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h3 className="font-orbitron text-sm neon-text-green flex items-center gap-2">
              🔄 АЛЬТЕРНАТИВНЫЕ СПОСОБЫ
            </h3>
            <span className="text-white/60 text-xs">
              {showAlternatives ? '▼' : '▶'}
            </span>
          </button>

          {showAlternatives && (
            <div className="space-y-3 animate-[fadeIn_0.3s_ease-in]">
              {alternatives.map((solution, idx) => (
                <div
                  key={idx}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                >
                  <p className="text-white/90 text-sm leading-relaxed">
                    {solution}
                  </p>
                </div>
              ))}
              <p className="text-white/60 text-xs italic mt-2">
                💡 Математика — это творчество! К одному ответу можно прийти разными путями.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
