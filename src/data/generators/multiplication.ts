import { AdaptiveQuestion, TableDrillState, Theme, Tier } from '../../types';
import { capFirst, CHESTS, pickTemplate, random, ruCount, TemplateFn, withMeta, worldFlavor } from './common';

export function nextSequentialPair(state?: TableDrillState | null): {
  a: number;
  b: number;
  state: TableDrillState;
} {
  const start: TableDrillState =
    !state || state.nextN < 2 || state.factor < 2
      ? { factor: state && state.factor >= 2 ? state.factor : random(2, 9), nextN: 2 }
      : state;
  if (start.nextN > 9) {
    const factor = start.factor >= 9 ? 2 : start.factor + 1;
    return { a: factor, b: 2, state: { factor, nextN: 3 } };
  }
  return {
    a: start.factor,
    b: start.nextN,
    state: { factor: start.factor, nextN: start.nextN + 1 },
  };
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
        `Представь ${ruCount(pair.b, { one: 'кучку', few: 'кучки', many: 'кучек' })} по ${ruCount(pair.a, world.loot)}.`,
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
        const b = random(6, 9);
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
          text: `${capFirst(world.placeIn)} ${ruCount(a, CHESTS)}. В каждом сундуке по ${ruCount(b, world.loot)}. Сколько ${world.loot.many} всего?`,
          answer: product,
          hint: `Несколько одинаковых групп — это умножение.`,
          hints: [
            `Что повторяется: число сундуков или число ${world.loot.many} в каждом?`,
            `Нужно ${a} раз взять по ${b}.`,
          ],
          explanation: `${a} × ${b} = ${ruCount(product, world.loot)}.`,
        };
      },
      () => {
        const round = [25, 50][random(0, 1)];
        const n = random(2, 9);
        const product = round * n;
        return {
          templateId: 'oral_round',
          text: `Устный счёт: ${round} × ${n} = ?`,
          answer: product,
          hint: `Круглое число удобно считать через 100 или через десятки.`,
          hints: [
            round === 25
              ? `25 × 4 = 100, поэтому 25 × ${n} = 100 × ${n} : 4.`
              : `50 × 2 = 100, поэтому 50 × ${n} = 100 × ${n} : 2.`,
            `Можно идти шагами: ${round} × ${n - 1} = ${round * (n - 1)}, потом прибавь ещё ${round}.`,
          ],
          explanation: `${round} × ${n} = ${product}.`,
          method: `Устный счёт с круглыми числами: опирайся на удобные опорные факты (25×4=100, 50×2=100).`,
        };
      },
      () => {
        const hundreds = random(1, 9);
        const tens = random(1, 9);
        const ones = random(1, 9);
        const value = hundreds * 100 + tens * 10 + ones;
        return {
          templateId: 'place_sum',
          text: `Число разложили на разрядные слагаемые: ${hundreds * 100} + ${tens * 10} + ${ones}. Какое это число?`,
          answer: value,
          hint: `Каждое слагаемое стоит на своём разряде: сотни, десятки, единицы.`,
          hints: [
            `Какое слагаемое показывает сотни, какое — десятки, какое — единицы?`,
            `Сложи слагаемые как обычные числа. Нули между цифрами не выбрасывай.`,
          ],
          explanation: `${hundreds * 100} + ${tens * 10} + ${ones} = ${value}.`,
          method: `Разрядное слагаемое уже показывает, сколько в числе сотен, десятков и единиц. Ответ вычислен.`,
        };
      },
      () => {
        const hundreds = random(1, 9);
        const tens = random(0, 9);
        const ones = random(0, 9);
        const value = hundreds * 100 + tens * 10 + ones;
        return {
          templateId: 'place_hundreds',
          text: `Сколько сотен в числе ${value}?`,
          answer: hundreds,
          hint: `Сотни — это третий разряд справа, не десятки и не единицы.`,
          hints: [
            `Какая цифра стоит на месте сотен?`,
            `Закрой десятки и единицы. Оставшееся число и есть сотни.`,
          ],
          explanation: `${value} = ${hundreds} сот. + ${tens} дес. + ${ones} ед. Сотен: ${hundreds}.`,
          method: `В трёхзначном числе цифра сотен — первая слева. Ответ вычислен.`,
        };
      },
    ],
    3: [
      () => {
        const a = random(2, 9);
        const b = random(6, 9);
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
        const a = random(6, 9);
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
      () => {
        const base = 125;
        const n = [2, 4, 8][random(0, 2)];
        const product = base * n;
        return {
          templateId: 'oral_125',
          text: `Устный счёт: ${base} × ${n} = ?`,
          answer: product,
          hint: `125 × 8 = 1000. От этого удобно идти.`,
          hints: [
            n === 8
              ? `125 × 8 = 1000.`
              : n === 4
                ? `125 × 8 = 1000, значит 125 × 4 — половина.`
                : `125 × 2 = 250.`,
            `Проверь обратным действием: ответ раздели на ${n}. Снова должно получиться 125.`,
          ],
          explanation: `${base} × ${n} = ${product}.`,
          method: `Опорный факт 125 × 8 = 1000 помогает считать 125 × 2 и 125 × 4.`,
        };
      },
      () => {
        const meters = random(12, 28);
        const rolls = random(3, 8);
        const total = meters * rolls;
        return {
          templateId: 'fabric_buy',
          text: `Купили ${rolls} одинаковых рулонов ткани по ${meters} м. Сколько метров ткани купили всего?`,
          answer: total,
          hint: `Несколько одинаковых длин — умножение.`,
          hints: [
            `Что повторяется: длина одного рулона.`,
            `${meters} × ${rolls} = ?`,
          ],
          explanation: `${meters} × ${rolls} = ${total} м.`,
        };
      },
    ],
    4: [
      () => {
        const a = random(4, 9);
        const b = random(6, 8);
        const rest = 10 - b;
        const extra = a * rest;
        const product = a * b;
        return {
          templateId: 'table_near',
          text: `Хитрый ход: ${a} × ${b} можно как ${a} × 10 − ${a} × ${rest}. Чему равно ${a} × ${b}?`,
          answer: product,
          hint: `Разбей на удобные части, которые точно знаешь.`,
          hints: [
            `${a} × 10 больше, чем ${a} × ${b}. Сколько лишних групп по ${a} получилось?`,
            `Лишних групп — ${rest}. Вычти ${a} × ${rest} из ${a} × 10.`,
          ],
          explanation: `${a} × 10 = ${a * 10}, ${a} × ${rest} = ${extra}, ${a * 10} − ${extra} = ${product}.`,
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
        let groups = random(3, 6);
        if (groups === a) groups = a >= 6 ? 3 : groups + 1;
        const extra = random(2, a - 1);
        const total = a * groups + extra;
        return {
          templateId: 'table_leftover',
          text: `У героя ${ruCount(total, world.loot)}. Он кладёт их в коробки по ${ruCount(a, world.loot)}. Сколько получится полных коробок?`,
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
