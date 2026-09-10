import { useCallback, useRef } from 'react';

// Используем Web Speech API как доступную альтернативу Yandex SpeechKit
// Структура позволяет легко подключить Yandex SpeechKit при наличии API-ключа

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  voice?: string;
}

export function useSpeech() {
  const isSpeakingRef = useRef(false);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Остановить предыдущее воспроизведение
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'ru-RU';

    // Попробовать найти русский голос
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(v => v.lang.startsWith('ru'));
    if (russianVoice) {
      utterance.voice = russianVoice;
    }

    utterance.onstart = () => { isSpeakingRef.current = true; };
    utterance.onend = () => { isSpeakingRef.current = false; };
    utterance.onerror = () => { isSpeakingRef.current = false; };

    isSpeakingRef.current = true;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;
  }, []);

  const isSpeaking = useCallback(() => isSpeakingRef.current, []);

  return { speak, stop, isSpeaking };
}

// Yandex SpeechKit конфигурация (для будущего подключения)
export const yandexSpeechKitConfig = {
  apiKey: '', // Вставьте API-ключ Yandex Cloud
  folderId: '', // ID каталога
  voice: 'filipp', // filipp, alena, oksana, jane, omazh, zahar, ermil
  emotion: 'good', // neutral, good, evil
  lang: 'ru-RU',
  speed: 0.9,
  format: 'lpcm',
  sampleRate: '48000',
};

// Yandex GPT конфигурация (для будущего подключения)
export const yandexGPTConfig = {
  apiKey: '',
  folderId: '',
  modelUri: '', // gpt://<folderId>/yandexgpt-lite
  temperature: 0.6,
  maxTokens: 2000,
};
