import React, { useState, useEffect } from 'react';
import { Theme, StudentProfile } from './types';
import { loadData, saveProfile, createProfile, saveTestResult } from './store';
import StartScreen from './components/StartScreen';
import SettingsScreen from './components/SettingsScreen';
import TestScreen from './components/TestScreen';
import QuestScreen from './components/QuestScreen';
import ResultsScreen from './components/ResultsScreen';
import NewGameScreen from './components/NewGameScreen';

import PuzzleScreen from './components/PuzzleScreen';

type AppScreen = 'start' | 'newgame' | 'settings' | 'test' | 'quest' | 'results' | 'exit' | 'confirm-reset' | 'puzzles';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('start');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [theme, setTheme] = useState<Theme>('minecraft');

  // Загрузка данных при старте
  useEffect(() => {
    const data = loadData();
    if (data.profile) {
      setProfile(data.profile);
      setTheme(data.profile.theme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    if (profile) {
      const updated = { ...profile, theme: newTheme };
      setProfile(updated);
      saveProfile(updated);
    }
  };

  const handleStartNewGame = (name: string, age: number, selectedTheme: Theme) => {
    const newProfile = createProfile(name, age, selectedTheme);
    setProfile(newProfile);
    setTheme(selectedTheme);
    saveProfile(newProfile);
    setScreen('test');
  };

  const handleTestComplete = (score: number, total: number, level: number) => {
    if (profile) {
      const updated = { ...profile, level };
      setProfile(updated);
      saveProfile(updated);
      
      saveTestResult({
        date: new Date().toISOString(),
        score,
        totalQuestions: total,
        level,
        topicsStrength: {},
      });
    }
    setScreen('results');
  };

  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleStartAction = () => {
    if (profile) {
      setScreen('results');
    } else {
      setScreen('newgame');
    }
  };

  const handleNewGameAction = () => {
    if (profile) {
      setScreen('confirm-reset');
    } else {
      setScreen('newgame');
    }
  };

  const handleExit = () => {
    setScreen('exit');
  };

  // Экран подтверждения сброса
  if (screen === 'confirm-reset') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme}`}>
        <div className="neon-border-pink rounded-2xl p-8 bg-black/60 backdrop-blur-sm text-center max-w-md w-full">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="font-orbitron text-xl neon-text-pink mb-4">НАЧАТЬ ЗАНОВО?</h2>
          <p className="text-white/80 font-nunito mb-6">
            Весь твой прогресс будет сброшен. Это действие нельзя отменить!
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setScreen('start')}
              className="neon-btn flex-1"
            >
              ← ОТМЕНА
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                setProfile(null);
                setScreen('newgame');
              }}
              className="neon-btn-pink flex-1"
            >
              🗑️ СБРОСИТЬ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Экран прощания
  if (screen === 'exit') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative overflow-hidden`}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-float"
              style={{
                width: Math.random() * 12 + 4 + 'px',
                height: Math.random() * 12 + 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backgroundColor: ['#00f3ff', '#ff00e4', '#39ff14', '#fff700'][Math.floor(Math.random() * 4)],
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="text-8xl mb-6 animate-float">👋</div>
          <h1 className="font-orbitron text-3xl md:text-4xl neon-text-blue mb-4">
            ДО ВСТРЕЧИ!
          </h1>
          {profile && (
            <p className="font-nunito text-xl text-white/80 mb-2">
              Спасибо за игру, <span className="neon-text-green font-bold">{profile.name}</span>!
            </p>
          )}
          <p className="font-nunito text-lg text-white/60 mb-8">
            Ты стал умнее сегодня! Математика — это суперсила! 💪
          </p>

          <div className="neon-border-blue rounded-xl p-4 bg-black/40 mb-6">
            <p className="font-nunito text-white/80 text-sm">
              🌟 Запомни: каждый день практики делает тебя сильнее!
              Возвращайся, когда будешь готов к новым приключениям!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setScreen('start')}
              className="neon-btn-green text-lg py-4"
            >
              🔙 ВЕРНУТЬСЯ В ИГРУ
            </button>
            <button
              onClick={() => window.location.reload()}
              className="neon-btn-pink"
            >
              🔄 ПЕРЕЗАГРУЗИТЬ СТРАНИЦУ
            </button>
          </div>
        </div>
      </div>
    );
  }

  switch (screen) {
    case 'start':
      return (
        <StartScreen
          onStart={handleStartAction}
          onSettings={() => setScreen('settings')}
          onNewGame={handleNewGameAction}
          onExit={handleExit}
          onPuzzles={() => setScreen('puzzles')}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      );
    case 'newgame':
      return (
        <NewGameScreen
          onStart={handleStartNewGame}
          onBack={() => setScreen('start')}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      );
    case 'settings':
      return (
        <SettingsScreen
          profile={profile}
          onBack={() => setScreen('start')}
          onUpdateProfile={handleUpdateProfile}
          theme={theme}
        />
      );
    case 'test':
      return profile ? (
        <TestScreen
          profile={profile}
          onComplete={handleTestComplete}
          theme={theme}
        />
      ) : null;
    case 'quest':
      return profile ? (
        <QuestScreen
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onBack={() => setScreen('start')}
          theme={theme}
        />
      ) : null;
    case 'results':
      return profile ? (
        <ResultsScreen
          profile={profile}
          onBack={() => setScreen('start')}
          onStartQuest={() => setScreen('quest')}
          onRetest={() => setScreen('test')}
          onPuzzles={() => setScreen('puzzles')}
          onUpdateProfile={handleUpdateProfile}
          theme={theme}
        />
      ) : null;
    case 'puzzles':
      return profile ? (
        <PuzzleScreen
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onBack={() => setScreen('start')}
          theme={theme}
        />
      ) : null;
    default:
      return null;
  }
}
