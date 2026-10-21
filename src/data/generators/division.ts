// src/data/generators/division.ts
import { Question, Tier, TopicId } from '../../types';

// Вспомогательная функция для случайных чисел
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateDivisionQuestion(tier: Tier): Question {
  const topic: TopicId = 'division_2digit';
  let text = '';
  let answer = 0;
  let hint = '';

  switch (tier) {
    case 1: {
      // ТИР 1: Разведка (Устный счет, табличное деление на двузначное)
      // Пример: 96 : 24, 80 : 16
      const divisor = random(11, 25);
      const quotient = random(2, 9);
      const dividend = divisor * quotient;
      
      text = `Вычисли: ${dividend} : ${divisor}`;
      answer = quotient;
      hint = `Вспомни, как связан умножение и деление. Какое число нужно умножить на ${divisor}, чтобы получить ${dividend}?`;
      break;
    }
    
    case 2: {
      // ТИР 2: Инженер (Письменное деление столбиком без остатка)
      // Пример: 832 : 32
      const divisor = random(12, 45);
      const quotient = random(11, 99);
      const dividend = divisor * quotient;
      
      text = `Реши пример столбиком: ${dividend} : ${divisor}`;
      answer = quotient;
      hint = `1. Найди первое неполное делимое.\n2. Определи количество цифр в частном.\n3. Подбери пробную цифру, разделив делимое на круглое число (например, 832 : 30).`;
      break;
    }

    case 3: {
      // ТИР 3: Мастер (Текстовая задача в 1-2 действия)
      // База: стр. 60, № 206 (про ткань/массу)
      const totalWeight = random(100, 500);
      const bagsCount = random(5, 15);
      const weightPerBag = Math.floor(totalWeight / bagsCount);
      const actualTotal = weightPerBag * bagsCount; // Чтобы делилось без остатка
      
      text = `В ${bagsCount} одинаковых мешках ${actualTotal} кг картофеля. Сколько килограммов картофеля в одном мешке?`;
      answer = weightPerBag;
      hint = `Чтобы найти массу одного предмета, нужно общую массу разделить на количество предметов.`;
      break;
    }

    case 4: {
      // ТИР 4: Легенда (Задача с недостающими данными или логикой)
      // База: стр. 63, № 227 (про теплоход) или задачи на сравнение
      const distance1 = random(100, 300);
      const days1 = random(2, 5);
      const speed = Math.floor(distance1 / days1);
      const days2 = random(days1 + 1, days1 + 3);
      const distance2 = speed * days2;
      
      text = `Теплоход за ${days1} дня прошел ${distance1} км. За сколько дней он пройдет ${distance2} км с такой же скоростью?`;
      answer = days2;
      hint = `Это задача на нахождение скорости.\n1. Узнай скорость: ${distance1} : ${days1}.\n2. Раздели новый путь на полученную скорость.`;
      break;
    }
  }

  return {
    id: `${topic}_t${tier}_${Date.now()}`,
    topic,
    tier,
    text,
    answer,
    hint
  };
}