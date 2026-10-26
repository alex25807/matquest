import { AdaptiveQuestion, Theme, Tier } from '../../types';
import { pickTemplate, random, TemplateFn, withMeta, worldFlavor } from './common';

export function generateAreaQuestion(
  tier: Tier,
  excludeTemplateId?: string | null,
  theme: Theme = 'minecraft'
): AdaptiveQuestion {
  const topic = 'area' as const;
  const world = worldFlavor(theme);

  const tier1: TemplateFn[] = [
    () => {
      const a = random(3, 12);
      return {
        templateId: 'square_p',
        text: `Квадратный участок ${world.placeIn}: сторона ${a} м. Чему равен периметр забора в метрах?`,
        answer: 4 * a,
        hint: `Периметр — сумма всех сторон. У квадрата они равны.`,
        hints: [
          `Сколько сторон у квадрата?`,
          `Можно сложить ${a} четыре раза или умножить на 4.`,
        ],
        explanation: `P = 4 × ${a} = ${4 * a} м.`,
        alternativeSolutions: [`${a} + ${a} + ${a} + ${a} = ${4 * a}.`],
      };
    },
  ];

  const tier2: TemplateFn[] = [
    () => {
      const a = random(12, 28);
      const b = random(8, 19);
      return {
        templateId: 'rect_p',
        text: `Прямоугольник ${a} м × ${b} м. Периметр (м)?`,
        answer: 2 * (a + b),
        hint: `Две длины и две ширины.`,
        hints: [
          `Какие стороны попарно равны?`,
          `P = 2 × (длина + ширина).`,
        ],
        explanation: `P = 2 × (${a} + ${b}) = ${2 * (a + b)} м.`,
      };
    },
    () => {
      const a = random(12, 25);
      return {
        templateId: 'square_s',
        text: `Квадрат со стороной ${a} см. Площадь (см²)?`,
        answer: a * a,
        hint: `Площадь квадрата — сторона на сторону.`,
        hints: [
          `Сколько одинаковых клеточек 1 см в ряду? А рядов?`,
          `S = ${a} × ${a}.`,
        ],
        explanation: `S = ${a} × ${a} = ${a * a} см².`,
      };
    },
  ];

  const tier3: TemplateFn[] = [
    () => {
      const a = random(6, 18);
      const b = random(4, 12);
      return {
        templateId: 'rect_s',
        text: `Площадка ${a} м на ${b} м. Площадь (м²)?`,
        answer: a * b,
        hint: `Площадь прямоугольника — длина × ширина.`,
        hints: [
          `Это не периметр: периметр измеряют в метрах, площадь — в квадратных.`,
          `S = ${a} × ${b}.`,
        ],
        explanation: `S = ${a} × ${b} = ${a * b} м².`,
      };
    },
  ];

  const tier4: TemplateFn[] = [
    () => {
      const a = random(6, 16);
      const b = random(4, 12);
      const s = a * b;
      return {
        templateId: 'find_side',
        text: `Площадь прямоугольника ${s} см², одна сторона ${b} см. Другая сторона (см)?`,
        answer: a,
        hint: `Сторону находят обратным действием к площади.`,
        hints: [
          `Площадь уже есть. Что сделать с ${s} и ${b}?`,
          `Сторона = площадь : известная сторона.`,
        ],
        explanation: `${s} : ${b} = ${a} см. Проверка: ${a} × ${b} = ${s}.`,
      };
    },
    () => {
      const a = random(8, 20);
      const p = 4 * a;
      return {
        templateId: 'square_from_p',
        text: `Периметр квадрата ${p} м. Чему равна площадь (м²)?`,
        answer: a * a,
        hint: `Сначала сторону из периметра, потом площадь.`,
        hints: [
          `Сторона квадрата — периметр, делённый на 4.`,
          `Затем сторону умножь на себя.`,
        ],
        explanation: `Сторона ${p} : 4 = ${a} м. S = ${a} × ${a} = ${a * a} м².`,
      };
    },
  ];

  const byTier = { 1: tier1, 2: tier2, 3: tier3, 4: tier4 };
  return withMeta(topic, tier, pickTemplate(byTier[tier], excludeTemplateId));
}
