import React, { useState } from 'react';
import { Theme } from '../types';
import { useSpeech } from '../hooks/useSpeech';

interface NewGameScreenProps {
  onStart: (name: string, age: number, theme: Theme) => void;
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themeOptions: { id: Theme; name: string; emoji: string; color: string; description: string }[] = [
  { id: 'minecraft', name: 'Майнкрафт', emoji: '⛏️', color: 'from-green-800 to-green-600', description: 'Строй мир знаний!' },
  { id: 'space', name: 'Тайна 3-й планеты', emoji: '🚀', color: 'from-indigo-800 to-purple-700', description: 'Покоряй космос!' },
  { id: 'spiderman', name: 'Человек-паук', emoji: '🕷️', color: 'from-red-800 to-blue-800', description: 'Стань героем!' },
  { id: 'dragon', name: 'Как приручить дракона', emoji: '🐉', color: 'from-amber-800 to-emerald-700', description: 'Приручи дракона!' },
];

export default function NewGameScreen({ onStart, onBack, theme, onThemeChange }: NewGameScreenProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(10);
  const [step, setStep] = useState(1);
  const { speak } = useSpeech();

  const handleStart = () => {
    if (!name.trim()) {
      speak('Пожалуйста, введи своё имя!');
      return;
    }
    speak(`Отлично, ${name}! Добро пожаловать в МатКвест! Сейчас мы определим твой уровень!`);
    onStart(name.trim(), age, theme);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative`}>
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: ['#00f3ff', '#ff00e4', '#39ff14'][Math.floor(Math.random() * 3)],
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {step === 1 && (
          <div className="text-center">
            <h1 className="font-orbitron text-3xl neon-text-blue mb-2">НОВОЕ ПРИКЛЮЧЕНИЕ!</h1>
            <p className="text-white/60 font-nunito mb-8">Давай познакомимся!</p>

            <div className="neon-border-blue rounded-2xl p-6 bg-black/40 mb-6">
              <label className="font-orbitron text-sm text-white/80 block mb-3">
                🎮 КАК ТЕБЯ ЗОВУТ?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введи своё имя"
                className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white font-nunito text-xl text-center focus:outline-none focus:border-[#00f3ff] transition-colors"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && setStep(2)}
              />
            </div>

            <div className="neon-border-green rounded-2xl p-6 bg-black/40 mb-6">
              <label className="font-orbitron text-sm text-white/80 block mb-3">
                🎂 СКОЛЬКО ТЕБЕ ЛЕТ?
              </label>
              <input
                type="range"
                min="7"
                max="14"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#39ff14] mb-2"
              />
              <div className="flex justify-between text-white/50 text-xs mb-2">
                <span>7</span>
                <span>14</span>
              </div>
              <div className="font-orbitron text-lg neon-text-green">
                {age} лет • {age <= 9 ? '3 класс' : age <= 10 ? '4 класс' : '5 класс'}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="neon-btn-green w-full text-lg py-4"
            >
              ДАЛЕЕ →
            </button>

            <button onClick={onBack} className="neon-btn w-full mt-3 opacity-70">
              ← НАЗАД
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h1 className="font-orbitron text-3xl neon-text-purple mb-2">ВЫБЕРИ МИР</h1>
            <p className="text-white/60 font-nunito mb-6">В каком мире ты хочешь учиться?</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {themeOptions.map(t => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`card-hover p-4 rounded-xl bg-gradient-to-br ${t.color} border-2 ${theme === t.id ? 'border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.5)] scale-105' : 'border-white/20'} transition-all`}
                >
                  <div className="text-3xl mb-2">{t.emoji}</div>
                  <div className="font-orbitron text-white text-xs font-bold">{t.name}</div>
                  <div className="text-white/70 text-[10px] mt-1">{t.description}</div>
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="neon-btn-green w-full text-lg py-4"
            >
              🚀 НАЧАТЬ!
            </button>

            <button onClick={() => setStep(1)} className="neon-btn w-full mt-3 opacity-70">
              ← НАЗАД
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
