import React, { useState } from 'react';
import { Theme, StudentProfile } from '../types';
import { useSpeech } from '../hooks/useSpeech';

interface SettingsScreenProps {
  profile: StudentProfile | null;
  onBack: () => void;
  onUpdateProfile: (profile: StudentProfile) => void;
  theme: Theme;
}

export default function SettingsScreen({ profile, onBack, onUpdateProfile, theme }: SettingsScreenProps) {
  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age || 10);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);
  const { speak } = useSpeech();

  const handleSave = () => {
    if (profile && name) {
      const grade = age <= 9 ? 3 : age <= 10 ? 4 : 5;
      onUpdateProfile({ ...profile, name, age, grade });
      speak('Настройки сохранены! Продолжаем!');
    }
    onBack();
  };

  const handleTestVoice = () => {
    speak(`Привет, ${name || 'друг'}! Меня зовут МатБот. Я помогу тебе стать мастером математики!`);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme} relative`}>
      <div className="w-full max-w-md">
        <h1 className="font-orbitron text-3xl neon-text-purple text-center mb-8">
          ⚙️ НАСТРОЙКИ
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="neon-border-blue rounded-xl p-4 bg-black/30">
            <label className="font-orbitron text-sm text-white/80 block mb-2">
              👤 ИМЯ ГЕРОЯ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введи своё имя"
              className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white font-nunito text-lg focus:outline-none focus:border-[#00f3ff] transition-colors"
            />
          </div>

          {/* Age */}
          <div className="neon-border-blue rounded-xl p-4 bg-black/30">
            <label className="font-orbitron text-sm text-white/80 block mb-2">
              🎂 ВОЗРАСТ: {age} лет ({age <= 9 ? '3 класс' : age <= 10 ? '4 класс' : '5 класс'})
            </label>
            <input
              type="range"
              min="7"
              max="14"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00f3ff]"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>7 лет</span>
              <span>14 лет</span>
            </div>
          </div>

          {/* Voice */}
          <div className="neon-border-green rounded-xl p-4 bg-black/30">
            <label className="font-orbitron text-sm text-white/80 block mb-2">
              🔊 ГОЛОСОВОЕ СОПРОВОЖДЕНИЕ
            </label>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${voiceEnabled ? 'bg-green-500/30 border border-green-400 text-green-400' : 'bg-red-500/30 border border-red-400 text-red-400'}`}
              >
                {voiceEnabled ? '🔊 ВКЛ' : '🔇 ВЫКЛ'}
              </button>
              <button
                onClick={handleTestVoice}
                className="neon-btn-green px-4 py-2 text-sm"
              >
                ▶ ТЕСТ
              </button>
            </div>
            {voiceEnabled && (
              <div>
                <label className="text-white/60 text-sm block mb-1">Скорость речи: {voiceSpeed}</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#39ff14]"
                />
              </div>
            )}
          </div>

          {/* Yandex API Info */}
          <div className="neon-border-pink rounded-xl p-4 bg-black/30">
            <label className="font-orbitron text-sm text-white/80 block mb-2">
              🤖 ПОДКЛЮЧЕНИЕ ИИ (ЯНДЕКС)
            </label>
            <p className="text-white/60 text-sm mb-2">
              Для подключения Yandex SpeechKit и Yandex GPT введите API-ключи:
            </p>
            <input
              type="password"
              placeholder="API-ключ Yandex Cloud"
              className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white font-nunito text-sm mb-2 focus:outline-none focus:border-[#ff00e4]"
            />
            <input
              type="text"
              placeholder="Folder ID"
              className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white font-nunito text-sm focus:outline-none focus:border-[#ff00e4]"
            />
            <p className="text-white/40 text-xs mt-2">
              * Сейчас используется встроенный синтез речи. Для подключения ИИ нужен API-ключ Яндекс Cloud.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={onBack} className="neon-btn flex-1">
              ← НАЗАД
            </button>
            <button onClick={handleSave} className="neon-btn-green flex-1">
              💾 СОХРАНИТЬ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
