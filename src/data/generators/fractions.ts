import { AdaptiveQuestion, Theme, Tier } from '../../types';
import { capFirst, pickTemplate, random, ruCount, TemplateFn, withMeta, worldFlavor } from './common';

const RU_DEN = ['', '', 'вторая', 'третья', 'четвёртая', 'пятая', 'шестая', 'седьмая', 'восьмая', 'девятая', 'десятая'];
const RU_DEN_PL = ['', '', 'вторых', 'третьих', 'четвёртых', 'пятых', 'шестых', 'седьмых', 'восьмых', 'девятых', 'десятых'];

function fracWords(n: number, d: number): string {
  if (n === 1) return `одна ${RU_DEN[d]}`;
  return `${['', '', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'][n]} ${RU_DEN_PL[d]}`;
}

export function generateFractionsQuestion(
  tier: Tier,
  excludeTemplateId?: string | null,
  theme: Theme = 'minecraft'
): AdaptiveQuestion {
  const topic = 'fractions' as const;
  const world = worldFlavor(theme);

  const tier1: TemplateFn[] = [
    () => {
      const d = random(2, 8);
      const n = random(1, d);
      return {
        templateId: 'how_many_parts',
        text: `Пирог разрезали на ${d} равных кусков, взяли ${n}. Какое число в знаменателе дроби ${n}/${d}?`,
        answer: d,
        hint: `Знаменатель — на сколько равных частей разделили целое.`,
        hints: [
          `Что показывает нижнее число дроби?`,
          `Целое разделили на ${d} кусков.`,
        ],
        explanation: `Знаменатель ${d}: столько равных долей в целом. Числитель ${n} — сколько долей взяли.`,
      };
    },
    () => {
      const d = random(2, 9);
      const n = random(1, d);
      return {
        templateId: 'numerator',
        text: `Дробь: ${fracWords(n, d)}. Какое число в числителе?`,
        answer: n,
        hint: `Числитель — сколько долей взяли.`,
        hints: [
          `Слушай первое слово дроби: «${fracWords(n, d).split(' ')[0]}».`,
          `Это ${n} из ${d} долей.`,
        ],
        explanation: `${fracWords(n, d)} записывают как ${n}/${d}. Числитель — ${n}.`,
      };
    },
  ];

  const tier2: TemplateFn[] = [
    () => {
      const d = [2, 4, 5, 8, 10][random(0, 4)];
      const whole = d * random(4, 12);
      const n = 1;
      return {
        templateId: 'one_part',
        text: `Найди 1/${d} от ${whole}.`,
        answer: whole / d,
        hint: `Одна доля — целое, делённое на знаменатель.`,
        hints: [
          `На сколько равных частей делим ${whole}?`,
          `${whole} : ${d} = ?`,
        ],
        explanation: `1/${d} от ${whole} = ${whole} : ${d} = ${whole / d}.`,
      };
    },
  ];

  const tier3: TemplateFn[] = [
    () => {
      const d = [2, 3, 4, 5][random(0, 3)];
      const n = d === 2 ? 1 : random(2, d - 1);
      const part = random(6, 20);
      const whole = part * d;
      const value = part * n;
      return {
        templateId: 'n_parts',
        text: `${capFirst(world.placeIn)} ${ruCount(whole, world.loot)}. Сколько ${world.loot.many} получится, если взять ${n}/${d} от них?`,
        answer: value,
        hint: `Сначала найди одну долю, потом возьми таких долей ${n}.`,
        hints: [
          `На сколько равных долей делим ${ruCount(whole, world.loot)}?`,
          `Одну долю умножь на ${n}: столько долей просят.`,
        ],
        explanation: `${whole} : ${d} = ${part} — одна доля. ${part} × ${n} = ${value}.`,
        alternativeSolutions: [`Можно ${whole} × ${n} : ${d} = ${value}.`],
      };
    },
  ];

  const tier4: TemplateFn[] = [
    () => {
      const d = [3, 4, 5][random(0, 2)];
      const n = random(1, d - 1);
      const part = random(8, 16);
      const whole = part * d;
      const taken = part * n;
      const rest = whole - taken;
      return {
        templateId: 'rest_of_fraction',
        text: `Было ${ruCount(whole, world.loot)}. Отдали ${n}/${d} от этого количества. Сколько ${world.loot.many} осталось?`,
        answer: rest,
        hint: `Остаток — это целое минус взятая часть, или «недостающие» доли.`,
        hints: [
          `Сколько долей отдали? Сколько долей осталось из ${d}?`,
          `Можно найти ${n}/${d} от ${whole} и вычесть из целого.`,
        ],
        explanation: `${n}/${d} от ${whole} = ${taken}. Осталось ${whole} − ${taken} = ${rest}. Это ${d - n}/${d}.`,
        alternativeSolutions: [`Осталось ${d - n} долей: ${whole} : ${d} × ${d - n} = ${rest}.`],
      };
    },
  ];

  const byTier = { 1: tier1, 2: tier2, 3: tier3, 4: tier4 };
  return withMeta(topic, tier, pickTemplate(byTier[tier], excludeTemplateId));
}
