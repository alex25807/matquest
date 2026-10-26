import React, { useEffect, useState } from 'react';
import { explainWithYandex, hasYandexConfig } from '../data/yandex';

interface YandexExplainProps {
  task: string;
  method?: string;
  knownAnswer?: string | number;
}

export default function YandexExplain({ task, method, knownAnswer }: YandexExplainProps) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(false);
    setText('');
    setError('');
  }, [task, knownAnswer]);

  const ask = async () => {
    if (!hasYandexConfig()) {
      setError('Впишите API-ключ и ID каталога в настройках. Они останутся только в этом браузере.');
      setText('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const answer = await explainWithYandex({ task, method, knownAnswer });
      setText(answer);
    } catch (err) {
      setText('');
      setError(err instanceof Error ? err.message : 'Не удалось получить объяснение.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-left">
      <button
        type="button"
        onClick={ask}
        disabled={loading}
        className="neon-btn-purple w-full py-3 disabled:opacity-60"
      >
        {loading ? 'Яндекс пишет объяснение…' : 'Подробнее с ИИ Яндекса'}
      </button>
      {error && <p className="mt-3 text-red-200 font-nunito text-sm whitespace-pre-line">{error}</p>}
      {text && (
        <div className="mt-3 p-4 bg-purple-500/10 border border-purple-400/40 rounded-xl">
          <p className="text-purple-200 font-nunito font-bold text-sm mb-2">Подробное объяснение</p>
          <p className="text-white/90 font-nunito text-sm whitespace-pre-line">{text}</p>
        </div>
      )}
    </div>
  );
}
