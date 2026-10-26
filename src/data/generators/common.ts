import { AdaptiveQuestion, Theme, Tier, TopicId } from '../../types';

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const daysWord = (n: number): string => {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return 'день';
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return 'дня';
  return 'дней';
};

export const hoursWord = (n: number): string => {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return 'час';
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return 'часа';
  return 'часов';
};

export type TemplateDraft = Omit<AdaptiveQuestion, 'id' | 'topic' | 'tier'>;
export type TemplateFn = () => TemplateDraft;

export function pickTemplate(templates: TemplateFn[], excludeId?: string | null): TemplateDraft {
  const built = templates.map((fn) => fn());
  const pool = excludeId ? built.filter((t) => t.templateId !== excludeId) : built;
  const list = pool.length > 0 ? pool : built;
  return list[random(0, list.length - 1)];
}

export function makeId(topic: TopicId, tier: Tier): string {
  return `${topic}_t${tier}_${Date.now()}_${random(100, 999)}`;
}

export function withMeta(
  topic: TopicId,
  tier: Tier,
  draft: TemplateDraft
): AdaptiveQuestion {
  const hints = draft.hints?.length ? draft.hints : [draft.hint];
  return {
    id: makeId(topic, tier),
    topic,
    tier,
    ...draft,
    hints,
    hint: hints[0],
    method:
      draft.method ||
      'Запиши, что известно и что нужно найти. Выбери действие и проверь ответ обратным действием.',
  };
}

export interface WorldFlavor {
  hero: string;
  vehicle: string;
  loot: string;
  place: string;
}

export function worldFlavor(theme: Theme): WorldFlavor {
  switch (theme) {
    case 'space':
      return { hero: 'пилот', vehicle: 'ракета', loot: 'кристаллы', place: 'орбитальная станция' };
    case 'spiderman':
      return { hero: 'герой', vehicle: 'паутина', loot: 'жетоны', place: 'город' };
    case 'dragon':
      return { hero: 'наездник', vehicle: 'дракон', loot: 'овечки', place: 'остров Олух' };
    default:
      return { hero: 'строитель', vehicle: 'вагонетка', loot: 'изумруды', place: 'шахта' };
  }
}
