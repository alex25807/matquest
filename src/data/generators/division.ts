// src/data/generators/division.ts
import { QuestQuestion, Tier, TopicId } from '../../types';

// Вспомогательная функция для генерации случайных чисел
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateDivisionQuestion(tier: Tier): QuestQuestion {
  const topic: TopicId = 'division_2digit';
  let text = '';
  let answer = 0;
  let hint = '';

  switch (tier) {
    case 1: {
      // ТИР 1: Разведка (Устный счет, табличное деление на двузначное)
      // База: Учебник ч.2, стр. 6 (примеры вроде 96 : 24, 80 : 16)
      const divisor = random(11, 25);
      const quotient = random(2, 9);
      const dividend = divisor * quotient;
      
      text = `Вычисли устно: ${dividend} : ${divisor}`;
      answer = quotient;
      hint = `Вспомни таблицу умножения. Какое число нужно умножить на ${divisor}, чтобы получить ${dividend}? Попробуй подставить числа от 2 до 9.`;
      break;
    }
    
    case 2: {
      // ТИР 2: Инженер (Письменное деление столбиком без остатка)
      // База: Учебник ч.2, стр. 58-60 (алгоритм деления на двузначное число)
      const divisor = random(12, 45);
      const quotient = random(11, 99);
      const dividend = divisor * quotient;
      
      text = `Реши пример столбиком: ${dividend} : ${divisor}`;
      answer = quotient;
      hint = `1. Найди первое неполное делимое.\n2. Определи количество цифр в частном.\n3. Подбери пробную цифру, округлив делитель до десятков (например, до ${Math.round(divisor / 10) * 10}).`;
      break;
    }

    case 3: {
      // ТИР 3: Мастер (Текстовая задача в 1-2 действия)
      // База: Учебник ч.2, стр. 60, №206 (про массу, цену, количество)
      const itemsCount = random(4, 12);
      const weightPerItem = random(10, 50); // Гарантированно целое число
      const actualTotal = weightPerItem * itemsCount;
      
      text = `В ${itemsCount} одинаковых мешках ${actualTotal} кг картофеля. Сколько килограммов картофеля в одном таком мешке?`;
      answer = weightPerItem;
      hint = `Чтобы найти массу одного предмета, нужно общую массу разделить на количество предметов: ${actualTotal} : ${itemsCount}.`;
      break;
    }

    case 4: {
      // ТИР 4: Легенда (Составная задача на движение или работу)
      // База: Учебник ч.2, стр. 63, №227 (про теплоход, скорость, время)
      const speed = random(15, 40); // Скорость (км/день или км/ч)
      const time1 = random(2, 4);
      const distance1 = speed * time1;
      
      const time2 = random(time1 + 1, time1 + 3);
      const distance2 = speed * time2;
      
      text = `Теплоход за ${time1} дня прошел ${distance1} км. За сколько дней он пройдет ${distance2} км с такой же скоростью?`;
      answer = time2;
      hint = `Это задача в два действия.\n1. Узнай скорость: ${distance1} : ${time1} = ${speed} км/день.\n2. Раздели новый путь на скорость: ${distance2} : ${speed}.`;
      break;
    }
  }

  return {
    // Уникальный ID для каждого сгенерированного вопроса
    id: `${topic}_t${tier}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    topic,
    tier,
    text,
    answer,
    hint
  };
}﻿
