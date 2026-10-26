const STORAGE_KEY = 'matquest_yandex';

export interface YandexConfig {
  apiKey: string;
  folderId: string;
}

export function loadYandexConfig(): YandexConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { apiKey: '', folderId: '' };
    const parsed = JSON.parse(raw) as Partial<YandexConfig>;
    return {
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey : '',
      folderId: typeof parsed.folderId === 'string' ? parsed.folderId : '',
    };
  } catch {
    return { apiKey: '', folderId: '' };
  }
}

export function saveYandexConfig(config: YandexConfig): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      apiKey: config.apiKey.trim(),
      folderId: config.folderId.trim(),
    })
  );
}

export function hasYandexConfig(config: YandexConfig = loadYandexConfig()): boolean {
  return Boolean(config.apiKey.trim() && config.folderId.trim());
}

interface ExplainRequest {
  task: string;
  method?: string;
  knownAnswer?: string | number;
}

function endpoint(): string {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return '/yandex-api/foundationModels/v1/completion';
  }
  return 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
}

export async function explainWithYandex(request: ExplainRequest): Promise<string> {
  const config = loadYandexConfig();
  if (!hasYandexConfig(config)) {
    throw new Error('Впишите API-ключ и ID каталога в настройках. Они останутся только в этом браузере.');
  }

  const hideAnswer = request.knownAnswer === undefined || request.knownAnswer === '';
  const system = hideAnswer
    ? 'Ты учитель математики для 3–5 класса. Объясни способ подробно, спокойно и по-русски, короткими абзацами: что дано, что нужно найти, какое действие и почему. Не называй итоговое число и не доводи последнюю строку вычисления до ответа. Не меняй условие.'
    : 'Ты учитель математики для 3–5 класса. Разбери решение подробно, спокойно и по-русски, короткими абзацами: что дано, что нужно найти, каждый шаг и почему. Итоговое число должно совпасть с уже известным ответом. Не меняй условие.';

  const parts = [`Задание: ${request.task}`];
  if (request.method) parts.push(`Короткий способ из урока: ${request.method}`);
  if (!hideAnswer) parts.push(`Уже известный ответ: ${request.knownAnswer}`);

  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Api-Key ${config.apiKey.trim()}`,
      'x-folder-id': config.folderId.trim(),
    },
    body: JSON.stringify({
      modelUri: `gpt://${config.folderId.trim()}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.3,
        maxTokens: '900',
      },
      messages: [
        { role: 'system', text: system },
        { role: 'user', text: parts.join('\n') },
      ],
    }),
  }).catch(() => {
    throw new Error(
      'Браузер не пустил запрос к Яндексу. На опубликованной странице такой вызов блокируется. Локально, через запуск приложения, кнопка обращается к Яндексу через свой сервер.'
    );
  });

  const data = (await response.json().catch(() => null)) as {
    result?: { alternatives?: { message?: { text?: string } }[] };
    error?: { message?: string };
    message?: string;
  } | null;

  if (!response.ok) {
    const message = data?.error?.message || data?.message || `Яндекс ответил ошибкой ${response.status}.`;
    throw new Error(message);
  }

  const text = data?.result?.alternatives?.[0]?.message?.text?.trim();
  if (!text) throw new Error('Яндекс не прислал текст объяснения.');
  return text;
}
