import { AdaptiveQuestion, Theme, Tier } from '../../types';
import { hoursWord, pickTemplate, random, TemplateFn, withMeta, worldFlavor } from './common';

export function generateMotionQuestion(
  tier: Tier,
  excludeTemplateId?: string | null,
  theme: Theme = 'minecraft'
): AdaptiveQuestion {
  const topic = 'motion' as const;
  const world = worldFlavor(theme);

  const tier1: TemplateFn[] = [
    () => {
      const v = random(4, 12) * 10;
      const t = random(2, 5);
      return {
        templateId: 'find_s',
        text: `Герой ${world.travel} ${t} ${hoursWord(t)} со скоростью ${v} км/ч. Сколько километров он проедет?`,
        answer: v * t,
        hint: `Путь — это скорость, повторённая столько раз, сколько часов.`,
        hints: [
          `Что известно: скорость или время? Оба? Тогда что ищем?`,
          `Путь = скорость × время.`,
        ],
        explanation: `S = ${v} × ${t} = ${v * t} км.`,
      };
    },
  ];

  const tier2: TemplateFn[] = [
    () => {
      const v = random(4, 12) * 10;
      const t = random(2, 6);
      const s = v * t;
      return {
        templateId: 'find_v',
        text: `Герой проехал ${s} км за ${t} ${hoursWord(t)}. Скорость (км/ч)?`,
        answer: v,
        hint: `Скорость говорит, сколько км за один час.`,
        hints: [
          `Как из пути и времени получить «за один час»?`,
          `Скорость = путь : время.`,
        ],
        explanation: `v = ${s} : ${t} = ${v} км/ч.`,
      };
    },
    () => {
      const v = random(5, 12) * 10;
      const t = random(2, 6);
      const s = v * t;
      return {
        templateId: 'find_t',
        text: `Нужно проехать ${s} км со скоростью ${v} км/ч. Сколько часов займёт путь?`,
        answer: t,
        hint: `Время — сколько раз скорость укладывается в путь.`,
        hints: [
          `Делим путь на скорость или умножаем?`,
          `t = S : v.`,
        ],
        explanation: `t = ${s} : ${v} = ${t} ${hoursWord(t)}.`,
      };
    },
  ];

  const tier3: TemplateFn[] = [
    () => {
      const v = random(40, 80);
      const t1 = random(2, 4);
      const t2 = t1 + random(1, 3);
      return {
        templateId: 'same_v_new_s',
        text: `За ${t1} ${hoursWord(t1)} прошли ${v * t1} км. Сколько км пройдут за ${t2} ${hoursWord(t2)} с той же скоростью?`,
        answer: v * t2,
        hint: `Сначала скорость, потом новый путь.`,
        hints: [
          `Какая величина не меняется?`,
          `v = ${v * t1} : ${t1}. Затем умножь на ${t2}.`,
        ],
        explanation: `Скорость ${v} км/ч. Новый путь ${v} × ${t2} = ${v * t2} км.`,
      };
    },
  ];

  const tier4: TemplateFn[] = [
    () => {
      const v = random(30, 70);
      const tWalk = random(2, 4);
      const tAfter = random(2, 3);
      const s = v * (tWalk + tAfter);
      return {
        templateId: 'two_parts',
        text: `Скорость ${v} км/ч. Ехали ${tWalk} ${hoursWord(tWalk)}, час отдыхали, потом ещё ${tAfter} ${hoursWord(tAfter)} с той же скоростью. Какой весь путь (км)?`,
        answer: s,
        hint: `Отдых пути не добавляет — складывай только часы в движении.`,
        hints: [
          `Сколько часов машина реально ехала?`,
          `Путь = скорость × (время в движении).`,
        ],
        explanation: `В движении ${tWalk} + ${tAfter} = ${tWalk + tAfter} ч. ${v} × ${tWalk + tAfter} = ${s} км. Час отдыха не считаем.`,
        alternativeSolutions: [`Можно: ${v}×${tWalk} и ${v}×${tAfter}, потом сложить.`],
      };
    },
    () => {
      const v = random(40, 80);
      const t1 = random(2, 4);
      const s2 = v * random(3, 5);
      return {
        templateId: 'find_t2',
        text: `За ${t1} ${hoursWord(t1)} прошли ${v * t1} км. За сколько часов с той же скоростью пройдут ещё ${s2} км?`,
        answer: s2 / v,
        hint: `Одинаковая скорость — сначала найди её.`,
        hints: [
          `v = путь : время для первого куска.`,
          `Новое время = новый путь : скорость.`,
        ],
        explanation: `v = ${v} км/ч. t = ${s2} : ${v} = ${s2 / v} ч.`,
      };
    },
  ];

  const byTier = { 1: tier1, 2: tier2, 3: tier3, 4: tier4 };
  return withMeta(topic, tier, pickTemplate(byTier[tier], excludeTemplateId));
}
