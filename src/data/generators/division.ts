import { AdaptiveQuestion, Theme, Tier } from '../../types';
import { daysWord, hoursWord, pickTemplate, random, ruCount, TemplateFn, withMeta, worldFlavor } from './common';

export function generateDivisionQuestion(
  tier: Tier,
  excludeTemplateId?: string | null,
  theme: Theme = 'minecraft'
): AdaptiveQuestion {
  const topic = 'division_2digit' as const;
  const world = worldFlavor(theme);

  const tier1: TemplateFn[] = [
    () => {
      const divisor = random(11, 25);
      const quotient = random(2, 9);
      const dividend = divisor * quotient;
      return {
        templateId: 'oral_colon',
        text: `Вычисли: ${dividend} : ${divisor}`,
        answer: quotient,
        hint: `Какое число умножить на ${divisor}, чтобы получить ${dividend}?`,
        hints: [
          `Деление — обратное умножению. Что неизвестно: множитель?`,
          `${divisor} × ? = ${dividend}`,
        ],
        explanation: `${divisor} × ${quotient} = ${dividend}, значит ${dividend} : ${divisor} = ${quotient}.`,
      };
    },
  ];

  const tier2: TemplateFn[] = [
    () => {
      const divisor = random(12, 45);
      const quotient = random(11, 99);
      const dividend = divisor * quotient;
      return {
        templateId: 'column_colon',
        text: `Реши столбиком: ${dividend} : ${divisor}`,
        answer: quotient,
        hint: `Сначала первое неполное делимое — сколько цифр в частном?`,
        hints: [
          `Сравни ${divisor} с началом числа ${dividend}. Хватает ли?`,
          `Пробную цифру подбери по округлению делителя.`,
        ],
        explanation: `${dividend} : ${divisor} = ${quotient}. Проверка: ${quotient} × ${divisor} = ${dividend}.`,
      };
    },
  ];

  const tier3: TemplateFn[] = [
    () => {
      const bags = random(5, 15);
      const each = random(8, 25);
      const total = each * bags;
      return {
        templateId: 'bags',
        text: `В ${bags} одинаковых мешках ${total} кг. Сколько кг в одном?`,
        answer: each,
        hint: `Ищем массу одной равной части.`,
        hints: [
          `Что общее: мешки одинаковые. Что делать с общей массой?`,
          `Раздели целое на число частей.`,
        ],
        explanation: `${total} : ${bags} = ${each} кг в одном мешке.`,
      };
    },
    () => {
      const v = random(40, 90);
      const t = random(2, 6);
      const s = v * t;
      return {
        templateId: 'speed',
        text: `Герой проехал ${s} км за ${t} ${hoursWord(t)}. Скорость (км/ч)?`,
        answer: v,
        hint: `Скорость — путь за один час.`,
        hints: [
          `Известны путь и время. Какое действие?`,
          `${s} : ${t} = ?`,
        ],
        explanation: `${s} : ${t} = ${v} км/ч.`,
      };
    },
  ];

  const tier4: TemplateFn[] = [
    () => {
      const days1 = random(2, 5);
      const speed = random(40, 90);
      const distance1 = speed * days1;
      const days2 = random(days1 + 2, days1 + 6);
      const distance2 = speed * days2;
      return {
        templateId: 'ship_days',
        text: `Теплоход за ${days1} ${daysWord(days1)} прошёл ${distance1} км. За сколько дней он пройдёт ${distance2} км с той же скоростью?`,
        answer: days2,
        hint: `Скорость не меняется — найди её, затем новое время.`,
        hints: [
          `Что общее у двух участков пути?`,
          `Сначала путь : дни, потом новый путь : скорость.`,
        ],
        explanation: `Скорость ${speed} км в день. ${distance2} : ${speed} = ${days2} ${daysWord(days2)}.`,
      };
    },
    () => {
      const hours1 = random(2, 4);
      const speed = random(50, 90);
      const distance1 = speed * hours1;
      const hours2 = random(hours1 + 1, hours1 + 4);
      const distance2 = speed * hours2;
      return {
        templateId: 'train_distance',
        text: `Поезд за ${hours1} ${hoursWord(hours1)} прошёл ${distance1} км. Какой путь за ${hours2} ${hoursWord(hours2)} с той же скоростью?`,
        answer: distance2,
        hint: `Сначала скорость, потом умножение на новое время.`,
        hints: [
          `Какая величина одинаковая?`,
          `Скорость = ${distance1} : ${hours1}. Путь = скорость × ${hours2}.`,
        ],
        explanation: `v = ${speed} км/ч. S = ${speed} × ${hours2} = ${distance2} км.`,
      };
    },
    () => {
      const perBox = random(12, 36);
      const boxes = random(8, 24);
      const leftover = random(3, perBox - 1);
      const total = perBox * boxes + leftover;
      return {
        templateId: 'packing',
        text: `На складе ${total} банок, в ящик входит ${perBox}. Сколько полных ящиков?`,
        answer: boxes,
        hint: `Ищем, сколько раз ${perBox} содержится в ${total}. Остаток не считается.`,
        hints: [
          `Это деление с остатком. Что просят: частное или остаток?`,
          `Полных ящиков — целая часть от ${total} : ${perBox}.`,
        ],
        explanation: `${perBox} × ${boxes} = ${perBox * boxes}, остаток ${leftover}. Ответ: ${boxes}.`,
      };
    },
    () => {
      const small = random(12, 28);
      const times = random(3, 8);
      const large = small * times;
      return {
        templateId: 'times_greater',
        text: `В одном ящике ${ruCount(large, world.loot)}, в другом — ${ruCount(small, world.loot)}. Во сколько раз в первом ящике больше, чем во втором?`,
        answer: times,
        hint: `«Во сколько раз» — деление большего на меньшее, не вычитание.`,
        hints: [
          `Спрашивают не «на сколько», а «во сколько раз».`,
          `${large} : ${small} = ?`,
        ],
        explanation: `${large} : ${small} = ${times}.`,
      };
    },
    () => {
      const price = random(12, 45);
      const count = random(6, 15);
      const paid = price * count;
      return {
        templateId: 'price',
        text: `За ${count} одинаковых вещей заплатили ${paid} рублей. Цена одной?`,
        answer: price,
        hint: `Цена одной — общая сумма, делённая на количество.`,
        hints: [
          `Вещи одинаковые. Как найти одну долю?`,
          `${paid} : ${count} = ?`,
        ],
        explanation: `${paid} : ${count} = ${price} рублей.`,
      };
    },
    () => {
      const workers = random(4, 9);
      const days = random(6, 12);
      const parts = random(15, 40);
      const total = workers * days * parts;
      return {
        templateId: 'work_rate',
        text: `${workers} рабочих за ${days} ${daysWord(days)} сделали ${total} деталей поровну. Сколько деталей делал каждый за день?`,
        answer: parts,
        hint: `Сначала все рабочие-дни, потом деление общей выработки.`,
        hints: [
          `Сколько всего «рабочих дней»?`,
          `${workers} × ${days} = ${workers * days}. Теперь ${total} раздели на это число.`,
        ],
        explanation: `${workers} × ${days} = ${workers * days} человеко-дней. ${total} : ${workers * days} = ${parts}.`,
      };
    },
  ];

  const byTier = { 1: tier1, 2: tier2, 3: tier3, 4: tier4 };
  return withMeta(topic, tier, pickTemplate(byTier[tier], excludeTemplateId));
}
