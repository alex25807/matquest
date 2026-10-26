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

export interface NounForms {
  one: string;
  few: string;
  many: string;
}

/** «24 жетона», «5 жетонов», «21 жетон». */
export function ruCount(n: number, forms: NounForms): string {
  const n10 = Math.abs(n) % 10;
  const n100 = Math.abs(n) % 100;
  if (n10 === 1 && n100 !== 11) return `${n} ${forms.one}`;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return `${n} ${forms.few}`;
  return `${n} ${forms.many}`;
}

export function capFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

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
  /** «едет на вагонетке» — уже в нужном падеже. */
  travel: string;
  loot: NounForms;
  /** «в городе», «в шахте» — уже с предлогом. */
  placeIn: string;
}

const CHESTS: NounForms = { one: 'сундук', few: 'сундука', many: 'сундуков' };

export function worldFlavor(theme: Theme): WorldFlavor {
  switch (theme) {
    case 'space':
      return {
        hero: 'пилот',
        travel: 'летит на ракете',
        loot: { one: 'кристалл', few: 'кристалла', many: 'кристаллов' },
        placeIn: 'на орбитальной станции',
      };
    case 'spiderman':
      return {
        hero: 'герой',
        travel: 'мчится по паутине',
        loot: { one: 'жетон', few: 'жетона', many: 'жетонов' },
        placeIn: 'в городе',
      };
    case 'dragon':
      return {
        hero: 'наездник',
        travel: 'летит на драконе',
        loot: { one: 'овечка', few: 'овечки', many: 'овечек' },
        placeIn: 'на острове Олух',
      };
    default:
      return {
        hero: 'строитель',
        travel: 'едет на вагонетке',
        loot: { one: 'изумруд', few: 'изумруда', many: 'изумрудов' },
        placeIn: 'в шахте',
      };
  }
}

export { CHESTS };
