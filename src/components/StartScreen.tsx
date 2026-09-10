import React, { useState, useEffect } from 'react';
import { Theme } from '../types';
import { loadData } from '../store';
import { getThemeGreeting } from '../data/motivation';
import { useSpeech } from '../hooks/useSpeech';

interface StartScreenProps {
  onStart: () => void;
  onSettings: () => void;
  onNewGame: () => void;
  onExit: () => void;
  onPuzzles: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themeOptions: { id: Theme; name: string; emoji: string; color: string; description: string }[] = [
  { id: 'minecraft', name: 'Майнкрафт', emoji: '⛏️', color: 'from-green-900 to-green-700', description: 'Строй мир знаний блок за блоком!' },
  { id: 'space', name: 'Тайна 3-й планеты', emoji: '🚀', color: 'from-indigo-900 to-purple-800', description: 'Исследуй космос чисел и формул!' },
  { id: 'spiderman', name: 'Человек-паук', emoji: '🕷️', color: 'from-red-900 to-blue-900', description: 'Твоя суперсила — математика!' },
  { id: 'dragon', name: 'Как приручить дракона', emoji: '🐉', color: 'from-amber-900 to-emerald-900', description: 'Приручи дракона математики!' },
];

export default function StartScreen({ onStart, onSettings, onNewGame, onExit, onPuzzles, theme, onThemeChange }: StartScreenProps) {
  const [showThemes, setShowThemes] = useState(false);
  const [greeting, setGreeting] = useState('');
  const { speak } = useSpeech();
  const data = loadData();
  const hasProfile = data.profile !== null;

  useEffect(() => {
    const g = getThemeGreeting(theme);
    setGreeting(g);
    // Озвучить приветствие через 1 секунду
    const timer = setTimeout(() => {
      speak(g);
    }, 1000);
    return () => clearTimeout(timer);
  }, [theme, speak]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative overflow-hidden`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 animate-float"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: ['#00f3ff', '#ff00e4', '#39ff14', '#fff700'][Math.floor(Math.random() * 4)],
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="font-orbitron text-5xl md:text-7xl font-black neon-text-blue mb-4 animate-pulse-neon">
          МАТКВЕСТ
        </h1>
        <p className="font-nunito text-xl md:text-2xl text-white/80 mb-2">
          Репетитор по математике
        </p>
        <p className="font-nunito text-lg text-white/60 italic">
          {greeting}
        </p>
      </div>

      {/* Theme selector */}
      {showThemes ? (
        <div className="relative z-10 w-full max-w-2xl mb-8">
          <h2 className="font-orbitron text-xl neon-text-purple text-center mb-4">ВЫБЕРИ ТЕМУ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themeOptions.map(t => (
              <button
                key={t.id}
                onClick={() => { onThemeChange(t.id); setShowThemes(false); }}
                className={`card-hover p-4 rounded-xl bg-gradient-to-br ${t.color} border-2 ${theme === t.id ? 'border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'border-white/20'} transition-all`}
              >
                <div className="text-4xl mb-2">{t.emoji}</div>
                <div className="font-orbitron text-white text-sm font-bold">{t.name}</div>
                <div className="text-white/70 text-xs mt-1">{t.description}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowThemes(false)}
            className="neon-btn mt-4 mx-auto block"
          >
            ← Назад
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-sm">
          {hasProfile ? (
            <button onClick={onStart} className="neon-btn-green w-full text-lg py-4">
              🎮 ПРОДОЛЖИТЬ КВЕСТ
            </button>
          ) : (
            <button onClick={onNewGame} className="neon-btn-green w-full text-lg py-4">
              🚀 НАЧАТЬ ПРИКЛЮЧЕНИЕ
            </button>
          )}

          <button onClick={onStart} className="neon-btn w-full">
            📊 МОЙ ПРОГРЕСС
          </button>

          <button onClick={onPuzzles} className="neon-btn w-full" style={{ borderColor: '#fff700', color: '#fff700', background: 'rgba(255, 247, 0, 0.1)' }}>
            🧩 ГОЛОВОЛОМКИ
          </button>

          <button onClick={() => setShowThemes(true)} className="neon-btn-purple w-full">
            🎨 СМЕНИТЬ ТЕМУ
          </button>

          <button onClick={onSettings} className="neon-btn-pink w-full">
            ⚙️ НАСТРОЙКИ
          </button>

          {hasProfile && (
            <button onClick={onNewGame} className="neon-btn w-full opacity-70 text-sm">
              🔄 НАЧАТЬ ЗАНОВО
            </button>
          )}

          <button 
            onClick={onExit}
            className="neon-btn-pink w-full mt-2 opacity-60"
          >
            🚪 ВЫЙТИ
          </button>
        </div>
      )}

      {/* Footer info */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-white/40 text-xs font-nunito">
          Математика — это суперсила! 💪
        </p>
      </div>
    </div>
  );
}
