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
        method: `Скорость = путь : время. Проверка: скорость × время снова даёт путь.`,
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
    () => {
      const v = random(4, 12) * 10;
      const t = random(2, 5);
      const s = v * t;
      return {
        templateId: 'find_s_named',
        text: `Автобус ехал ${t} ${hoursWord(t)} со скоростью ${v} км/ч. Какой путь он проехал (км)?`,
        answer: s,
        hint: `Путь = скорость × время.`,
        hints: [
          `Что известно: скорость и время.`,
          `${v} × ${t} = ?`,
        ],
        explanation: `S = ${v} × ${t} = ${s} км.`,
      };
    },
    () => {
      const minutes = [2, 3, 4, 5, 6, 10, 12, 15][random(0, 7)];
      const chunk = random(3, 9);
      const meters = chunk * minutes;
      const perHour = chunk * 60;
      return {
        templateId: 'meters_per_hour',
        text: `За ${minutes} мин прошли ${meters} м с одной и той же скоростью. Сколько метров получится за 1 час?`,
        answer: perHour,
        hint: `Сначала узнай, сколько таких отрезков времени в одном часе.`,
        hints: [
          `Час длиннее этих минут. Сколько раз они укладываются в 60 минут?`,
          `Найденное число отрезков умножь на пройденные метры.`,
        ],
        explanation: `В часе ${60 / minutes} раз по ${minutes} мин. ${meters} × ${60 / minutes} = ${perHour} м.`,
        method: `Одна скорость: переведи время в одинаковые отрезки и умножь путь одного отрезка. Ответ вычислен.`,
      };
    },
    () => {
      const add = random(2, 4);
      let oldSpeed = random(4, 8);
      if (oldSpeed === add) oldSpeed += 1;
      const newSpeed = oldSpeed + add;
      const oldTime = newSpeed * 2;
      const distance = oldSpeed * oldTime;
      const newTime = oldSpeed * 2;
      return {
        templateId: 'faster_same_path',
        text: `Путь ${distance} км занял ${oldTime} ч. За сколько часов пройдут тот же путь, если скорость станет на ${add} км/ч больше?`,
        answer: newTime,
        hint: `Скорость в условии не названа. Её можно найти из пути и времени.`,
        hints: [
          `Какое действие находит скорость по пути и времени?`,
          `К этой скорости прибавь увеличение и раздели тот же путь на новую скорость.`,
        ],
        explanation: `Сначала ${distance} : ${oldTime} = ${oldSpeed} км/ч. Новая скорость ${oldSpeed} + ${add} = ${newSpeed} км/ч. ${distance} : ${newSpeed} = ${newTime} ч.`,
        method: `Тот же путь в одну сторону: найди скорость, увеличь её и снова найди время. Ответ вычислен.`,
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
        method: `Составная задача в 2 действия: найди скорость, затем новый путь. Проверь: путь : время = скорость.`,
      };
    },
    () => {
      const v = random(30, 70);
      const t1 = random(2, 4);
      const t2 = random(1, 3);
      const s1 = v * t1;
      const s2 = v * t2;
      return {
        templateId: 'two_legs',
        text: `Сначала ехали ${t1} ${hoursWord(t1)} со скоростью ${v} км/ч, потом ещё ${t2} ${hoursWord(t2)} с той же скоростью. Весь путь (км)?`,
        answer: s1 + s2,
        hint: `Найди каждый участок, потом сложи.`,
        hints: [
          `Первый участок: ${v} × ${t1}.`,
          `Второй участок: ${v} × ${t2}. Сложи пути.`,
        ],
        explanation: `${v} × ${t1} = ${s1}, ${v} × ${t2} = ${s2}. Всего ${s1 + s2} км.`,
        alternativeSolutions: [`Можно сложить время: (${t1} + ${t2}) × ${v} = ${s1 + s2}.`],
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
