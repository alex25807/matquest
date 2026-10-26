import { AdaptiveQuestion, TableDrillState, Theme, Tier } from '../../types';
import { pickTemplate, random, TemplateFn, withMeta, worldFlavor } from './common';

export function nextSequentialPair(state?: TableDrillState | null): {
  a: number;
  b: number;
  state: TableDrillState;
} {
  if (!state) {
    const factor = random(2, 9);
    return { a: factor, b: 1, state: { factor, nextN: 2 } };
  }
  if (state.nextN > 10) {
    const factor = state.factor >= 9 ? 2 : state.factor + 1;
    return { a: factor, b: 1, state: { factor, nextN: 2 } };
  }
  return { a: state.factor, b: state.nextN, state: { factor: state.factor, nextN: state.nextN + 1 } };
}

export function generateMultiplicationQuestion(
  tier: Tier,
  excludeTemplateId?: string | null,
  theme: Theme = 'minecraft',
  sequential?: TableDrillState | null
): { question: AdaptiveQuestion; sequential: TableDrillState | null } {
  const topic = 'multiplication_table' as const;
  const world = worldFlavor(theme);
  let nextSeq: TableDrillState | null = sequential ?? null;

  if (tier === 1) {
    const pair = nextSequentialPair(sequential);
    nextSeq = pair.state;
    const product = pair.a * pair.b;
    const draft = {
      templateId: 'table_order',
      text: `Таблица на ${pair.a} — по порядку: ${pair.a} × ${pair.b} = ?`,
      answer: product,
      hint: `Сколько получится, если взять ${pair.a} по ${pair.b} раз?`,
      hints: [
        `Представь ${pair.b} кучек по ${pair.a} ${world.loot}.`,
        `Можно сложить: ${Array.from({ length: Math.min(pair.b, 4) }).map(() => pair.a).join(' + ')}${pair.b > 4 ? ' + …' : ''}.`,
      ],
      explanation: `${pair.a} × ${pair.b} = ${product}. Так устроена таблица умножения: одинаковые слагаемые.`,
      alternativeSolutions: [
        `${pair.b} × ${pair.a} = ${product} — тот же ответ, множители можно менять местами.`,
      ],
    };
    return { question: withMeta(topic, tier, draft), sequential: nextSeq };
  }

  const templates: Record<2 | 3 | 4, TemplateFn[]> = {
    2: [
      () => {
        const a = random(2, 9);
        const b = random(2, 9);
        const product = a * b;
        return {
          templateId: 'table_mixed',
          text: `Вразнобой: ${a} × ${b} = ?`,
          answer: product,
          hint: `Это строка таблицы на ${a} или на ${b}.`,
          hints: [
            `Какое число повторяется ${b} раз по ${a}?`,
            `Если знаешь соседний пример, можно прибавить или отнять ещё одно ${a}.`,
          ],
          explanation: `${a} × ${b} = ${product}.`,
          alternativeSolutions: [`${b} × ${a} = ${product}.`],
        };
      },
      () => {
        const a = random(3, 9);
        const b = random(3, 9);
        const product = a * b;
        return {
          templateId: 'table_story',
          text: `На ${world.place} ${a} сундуков, в каждом по ${b} ${world.loot}. Сколько всего?`,
          answer: product,
          hint: `Несколько одинаковых групп — это умножение.`,
          hints: [
            `Что повторяется: сундуки или ${world.loot} в каждом?`,
            `Нужно ${a} раз взять по ${b}.`,
          ],
          explanation: `${a} × ${b} = ${product} ${world.loot}.`,
        };
      },
    ],
    3: [
      () => {
        const a = random(2, 9);
        const b = random(2, 9);
        const product = a * b;
        return {
          templateId: 'table_divide',
          text: `Обратное действие: ${product} : ${a} = ?`,
          answer: b,
          hint: `Деление — проверка умножения.`,
          hints: [
            `Какое число нужно умножить на ${a}, чтобы получить ${product}?`,
            `Вспомни таблицу на ${a}.`,
          ],
          explanation: `${a} × ${b} = ${product}, поэтому ${product} : ${a} = ${b}.`,
          alternativeSolutions: [`${product} : ${b} = ${a} — тоже верно, если спрашивают другой множитель.`],
        };
      },
      () => {
        const a = random(2, 9);
        const b = random(2, 9);
        const product = a * b;
        return {
          templateId: 'table_missing',
          text: `Найди множитель: ${a} × ? = ${product}`,
          answer: b,
          hint: `Неизвестный множитель находят делением.`,
          hints: [
            `Что нужно сделать с ${product} и ${a}?`,
            `${product} : ${a} = ?`,
          ],
          explanation: `? = ${product} : ${a} = ${b}, потому что ${a} × ${b} = ${product}.`,
        };
      },
    ],
    4: [
      () => {
        const a = random(4, 9);
        const b = random(6, 9);
        const product = a * b;
        const extra = a * 2;
        return {
          templateId: 'table_near',
          text: `Хитрый ход: ${a} × ${b} можно как ${a} × 10 − ${a} × ${10 - b}. Чему равно ${a} × ${b}?`,
          answer: product,
          hint: `Разбей на удобные части, которые точно знаешь.`,
          hints: [
            `${a} × 10 = ${a * 10}. На сколько «лишних» ${a} мы взяли?`,
            `Отними ${extra} от ${a * 10}.`,
          ],
          explanation: `${a} × 10 = ${a * 10}, ${a} × ${10 - b} = ${extra}, ${a * 10} − ${extra} = ${product}.`,
          alternativeSolutions: [`Можно идти от ${a} × ${b - 1} = ${a * (b - 1)} и прибавить ещё ${a}.`],
        };
      },
      () => {
        const a = random(3, 8);
        const b = random(3, 8);
        const left = a * b;
        const right = (a + 1) * (b - 1);
        const diff = Math.abs(left - right);
        const bigger = left >= right ? `${a}×${b}` : `${a + 1}×${b - 1}`;
        return {
          templateId: 'table_compare',
          text: `Что больше и на сколько: ${a} × ${b} или ${a + 1} × ${b - 1}? Запиши разницу (сколько единиц).`,
          answer: diff,
          hint: `Посчитай оба произведения, потом сравни.`,
          hints: [
            `Сначала найди ${a} × ${b}.`,
            `Теперь ${a + 1} × ${b - 1}. Какое больше? На сколько?`,
          ],
          explanation: `${a} × ${b} = ${left}, ${a + 1} × ${b - 1} = ${right}. Больше ${bigger}, разница ${diff}.`,
        };
      },
      () => {
        const a = random(4, 9);
        const groups = random(3, 6);
        const extra = random(2, a - 1);
        const total = a * groups + extra;
        return {
          templateId: 'table_leftover',
          text: `У героя ${total} ${world.loot}. Раскладывает по ${a} в коробку. Сколько полных коробок?`,
          answer: groups,
          hint: `Полных коробок столько, сколько раз ${a} умещается в ${total}.`,
          hints: [
            `Это обратная таблица: сколько раз взять ${a}, не перебрав ${total}?`,
            `Остаток ${extra} в ответ не входит.`,
          ],
          explanation: `${a} × ${groups} = ${a * groups}, остаток ${extra}. Полных коробок: ${groups}.`,
        };
      },
    ],
  };

  const picked = pickTemplate(templates[tier], excludeTemplateId);
  return { question: withMeta(topic, tier, picked), sequential: nextSeq };
}
