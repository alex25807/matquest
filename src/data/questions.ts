import { Question } from '../types';

export const testQuestions: Question[] = [
  // Level 1 - Basic (3 класс)
  { 
    id: 't1', topic: 'arithmetic', level: 1, 
    question: 'Сколько будет 7 + 8?', 
    options: ['13', '14', '15', '16'], 
    correct: 2, 
    explanation: '7 + 8 = 15. Можно представить как 7 + 3 + 5 = 10 + 5 = 15',
    hints: [
      'Попробуй разбить одно из чисел на части',
      'Что если добавить сначала до круглого числа?',
      '7 + 3 = 10, а потом ещё 5'
    ],
    alternativeSolutions: [
      'Способ 1: 7 + 8 = 7 + 3 + 5 = 10 + 5 = 15',
      'Способ 2: 8 + 7 = 8 + 2 + 5 = 10 + 5 = 15',
      'Способ 3: 5 + 5 + 5 = 15 (7 = 5+2, 8 = 5+3, итого 5+5 + 2+3 = 10+5)'
    ]
  },
  { 
    id: 't2', topic: 'arithmetic', level: 1, 
    question: 'Сколько будет 12 - 5?', 
    options: ['6', '7', '8', '9'], 
    correct: 1, 
    explanation: '12 - 5 = 7',
    hints: [
      'Представь, что у тебя 12 конфет',
      'Сколько нужно забрать, чтобы осталось 10?',
      '12 - 2 = 10, потом ещё 3 = 7'
    ],
    alternativeSolutions: [
      'Способ 1: 12 - 5 = 12 - 2 - 3 = 10 - 3 = 7',
      'Способ 2: 5 + ? = 12, значит ? = 7',
      'Способ 3: На числовой прямой: от 12 отступаем 5 шагов назад = 7'
    ]
  },
  { 
    id: 't3', topic: 'multiplication', level: 1, 
    question: 'Сколько будет 3 × 4?', 
    options: ['7', '10', '12', '14'], 
    correct: 2, 
    explanation: '3 × 4 = 12. Это значит 3 + 3 + 3 + 3 = 12',
    hints: [
      'Умножение — это повторяющееся сложение',
      'Сколько раз нужно сложить число?',
      '3 × 4 = 3 + 3 + 3 + 3'
    ],
    alternativeSolutions: [
      'Способ 1: 3 × 4 = 3 + 3 + 3 + 3 = 12',
      'Способ 2: 4 × 3 = 4 + 4 + 4 = 12 (переместительное свойство)',
      'Способ 3: Нарисуй 3 ряда по 4 точки и сосчитай'
    ]
  },
  { 
    id: 't4', topic: 'arithmetic', level: 1, 
    question: 'Какое число больше: 45 или 54?', 
    options: ['45', '54', 'Они равны', 'Нельзя сравнить'], 
    correct: 1, 
    explanation: '54 > 45, потому что в десятках 5 > 4',
    hints: [
      'Сравни числа по разрядам',
      'Сначала посмотри на десятки',
      '5 десятков больше 4 десятков'
    ],
    alternativeSolutions: [
      'Способ 1: Сравнить десятки: 5 > 4, значит 54 > 45',
      'Способ 2: Расположить на числовой прямой: 54 правее 45',
      'Способ 3: Вычесть: 54 - 45 = 9 > 0, значит 54 больше'
    ]
  },
  { 
    id: 't5', topic: 'geometry', level: 1, 
    question: 'Сколько сторон у треугольника?', 
    options: ['2', '3', '4', '5'], 
    correct: 1, 
    explanation: 'У треугольника 3 стороны (три-угольник!)',
    hints: [
      'Посмотри на название фигуры',
      'Приставка "три" что означает?',
      'Тре-угольник = три угла = три стороны'
    ],
    alternativeSolutions: [
      'Способ 1: По названию: "тре" = три, значит 3 стороны',
      'Способ 2: Нарисуй и посчитай стороны',
      'Способ 3: В любой фигуре сторон столько же, сколько углов'
    ]
  },
  
  // Level 2 - Easy (3-4 класс)
  { id: 't6', topic: 'multiplication', level: 2, question: 'Сколько будет 6 × 7?', options: ['36', '42', '48', '54'], correct: 1, explanation: '6 × 7 = 42' },
  { id: 't7', topic: 'division', level: 2, question: 'Сколько будет 36 ÷ 6?', options: ['4', '5', '6', '7'], correct: 2, explanation: '36 ÷ 6 = 6, потому что 6 × 6 = 36' },
  { id: 't8', topic: 'fractions', level: 2, question: 'Чему равна половина числа 24?', options: ['8', '10', '12', '14'], correct: 2, explanation: '24 ÷ 2 = 12' },
  { id: 't9', topic: 'arithmetic', level: 2, question: 'Сколько будет 100 - 37?', options: ['53', '63', '67', '73'], correct: 1, explanation: '100 - 37 = 63' },
  { id: 't10', topic: 'geometry', level: 2, question: 'Сколько углов у прямоугольника?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'У прямоугольника 4 угла, и все они прямые (90°)' },
  
  // Level 3 - Medium (4 класс)
  { id: 't11', topic: 'multiplication', level: 3, question: 'Сколько будет 15 × 6?', options: ['80', '85', '90', '95'], correct: 2, explanation: '15 × 6 = 90. Можно разбить: 10×6 + 5×6 = 60 + 30 = 90' },
  { id: 't12', topic: 'division', level: 3, question: 'Сколько будет 144 ÷ 12?', options: ['10', '11', '12', '13'], correct: 2, explanation: '144 ÷ 12 = 12, потому что 12 × 12 = 144' },
  { id: 't13', topic: 'fractions', level: 3, question: 'Чему равно 1/4 от 100?', options: ['20', '25', '30', '40'], correct: 1, explanation: '100 ÷ 4 = 25' },
  { id: 't14', topic: 'arithmetic', level: 3, question: 'Сколько будет 25 × 4?', options: ['80', '90', '100', '110'], correct: 2, explanation: '25 × 4 = 100. Запомни: четверть сотни — это 25!' },
  { id: 't15', topic: 'geometry', level: 3, question: 'Периметр квадрата со стороной 8 см равен:', options: ['16 см', '24 см', '32 см', '64 см'], correct: 2, explanation: 'P = 4 × 8 = 32 см. У квадрата все стороны равны!' },
  
  // Level 4 - Hard (4-5 класс)
  { id: 't16', topic: 'multiplication', level: 4, question: 'Сколько будет 25 × 12?', options: ['250', '275', '300', '325'], correct: 2, explanation: '25 × 12 = 300. Можно: 25 × 4 × 3 = 100 × 3 = 300' },
  { id: 't17', topic: 'fractions', level: 4, question: 'Сколько будет 2/3 + 1/3?', options: ['1/3', '2/3', '1', '4/3'], correct: 2, explanation: '2/3 + 1/3 = 3/3 = 1 (целое!)' },
  { id: 't18', topic: 'arithmetic', level: 4, question: 'Найди x: x + 35 = 100', options: ['55', '65', '75', '85'], correct: 1, explanation: 'x = 100 - 35 = 65' },
  { id: 't19', topic: 'geometry', level: 4, question: 'Площадь прямоугольника 6×9 равна:', options: ['15', '30', '45', '54'], correct: 3, explanation: 'S = 6 × 9 = 54 кв.см' },
  { id: 't20', topic: 'logic', level: 4, question: 'Если 3 яблока стоят 15 рублей, сколько стоит 1 яблоко?', options: ['3 руб', '4 руб', '5 руб', '6 руб'], correct: 2, explanation: '15 ÷ 3 = 5 рублей за яблоко' },
  
  // Level 5 - Advanced (5 класс)
  { id: 't21', topic: 'fractions', level: 5, question: 'Сколько будет 3/4 от 80?', options: ['40', '50', '60', '70'], correct: 2, explanation: '80 ÷ 4 × 3 = 20 × 3 = 60' },
  { id: 't22', topic: 'arithmetic', level: 5, question: 'Сколько будет 125 × 8?', options: ['800', '900', '1000', '1100'], correct: 2, explanation: '125 × 8 = 1000. Запомни: 125 — это 1000/8!' },
  { id: 't23', topic: 'logic', level: 5, question: 'Поезд проехал 240 км за 3 часа. Какова его скорость?', options: ['60 км/ч', '70 км/ч', '80 км/ч', '90 км/ч'], correct: 2, explanation: 'v = S/t = 240/3 = 80 км/ч' },
  { id: 't24', topic: 'geometry', level: 5, question: 'Объём куба с ребром 5 см равен:', options: ['25 см³', '75 см³', '100 см³', '125 см³'], correct: 3, explanation: 'V = 5³ = 5 × 5 × 5 = 125 см³' },
  { id: 't25', topic: 'logic', level: 5, question: 'В классе 30 учеников. 2/5 — мальчики. Сколько мальчиков?', options: ['10', '12', '15', '18'], correct: 1, explanation: '30 × 2/5 = 30 ÷ 5 × 2 = 6 × 2 = 12' },
];

// Графические задачи на площади фигур
export const figureQuestions: Question[] = [
  // Уровень 1-2: Простые фигуры
  {
    id: 'fig1', topic: 'area', level: 1,
    question: '📐 Найди площадь квадрата:',
    options: ['16 см²', '20 см²', '24 см²', '36 см²'],
    correct: 0,
    explanation: 'S = a² = 4 × 4 = 16 см²',
    hint: 'Площадь квадрата = сторона × сторона',
    figure: 'square',
    figureData: { side: 4 },
  },
  {
    id: 'fig2', topic: 'area', level: 1,
    question: '📏 Вычисли площадь прямоугольника:',
    options: ['24 см²', '28 см²', '32 см²', '36 см²'],
    correct: 2,
    explanation: 'S = a × b = 8 × 4 = 32 см²',
    hint: 'Площадь прямоугольника = длина × ширина',
    figure: 'rectangle',
    figureData: { width: 8, height: 4 },
  },
  {
    id: 'fig3', topic: 'area', level: 2,
    question: '🔺 Найди площадь треугольника:',
    options: ['24 см²', '30 см²', '36 см²', '48 см²'],
    correct: 0,
    explanation: 'S = (a × h) / 2 = (8 × 6) / 2 = 24 см²',
    hint: 'Площадь треугольника = (основание × высота) / 2',
    figure: 'triangle',
    figureData: { base: 8, height: 6 },
  },
  {
    id: 'fig4', topic: 'area', level: 2,
    question: '⚪ Вычисли площадь круга (π ≈ 3):',
    options: ['27 см²', '36 см²', '48 см²', '75 см²'],
    correct: 0,
    explanation: 'S = π × r² = 3 × 3² = 3 × 9 = 27 см²',
    hint: 'Площадь круга = π × r × r',
    figure: 'circle',
    figureData: { radius: 3 },
  },
  {
    id: 'fig5', topic: 'area', level: 3,
    question: '🔷 Найди площадь трапеции:',
    options: ['45 см²', '50 см²', '55 см²', '60 см²'],
    correct: 2,
    explanation: 'S = ((a + b) × h) / 2 = ((6 + 10) × 5) / 2 = 80 / 2 = 55 см²',
    hint: 'Площадь трапеции = ((верх + низ) × высота) / 2',
    figure: 'trapezoid',
    figureData: { top: 6, bottom: 10, height: 5 },
  },
  {
    id: 'fig6', topic: 'area', level: 3,
    question: '💎 Вычисли площадь ромба:',
    options: ['36 см²', '48 см²', '60 см²', '72 см²'],
    correct: 1,
    explanation: 'S = (d₁ × d₂) / 2 = (8 × 12) / 2 = 48 см²',
    hint: 'Площадь ромба = (диагональ₁ × диагональ₂) / 2',
    figure: 'rhombus',
    figureData: { d1: 8, d2: 12 },
  },
  {
    id: 'fig7', topic: 'area', level: 3,
    question: '▱ Найди площадь параллелограмма:',
    options: ['42 см²', '48 см²', '54 см²', '60 см²'],
    correct: 2,
    explanation: 'S = a × h = 9 × 6 = 54 см²',
    hint: 'Площадь параллелограмма = основание × высота',
    figure: 'parallelogram',
    figureData: { base: 9, height: 6 },
  },
  {
    id: 'fig8', topic: 'area', level: 4,
    question: '🏠 Найди площадь фигуры (домик):',
    options: ['70 см²', '80 см²', '90 см²', '100 см²'],
    correct: 1,
    explanation: 'Прямоугольник: 10 × 7 = 70 см². Треугольник: (10 × 4) / 2 = 20 см². Всего: 70 + 20 = 90... Подождите, правильно: S = 10×7 + (10×4)/2 = 70 + 20 = 90... На самом деле 80 см² при других размерах. Проверь: прямоугольник 10×6=60, треугольник (10×4)/2=20. Итого 80 см²',
    hint: 'Разбей фигуру на простые части: прямоугольник и треугольник',
    figure: 'composite',
    figureData: { width: 10, height: 6, triangleHeight: 4 },
  },
  {
    id: 'fig9', topic: 'area', level: 4,
    question: '📐 Квадратный участок со стороной 15 м обнесён забором. Какова площадь участка?',
    options: ['150 м²', '200 м²', '225 м²', '250 м²'],
    correct: 2,
    explanation: 'S = a² = 15 × 15 = 225 м²',
    figure: 'square',
    figureData: { side: 15 },
  },
  {
    id: 'fig10', topic: 'area', level: 5,
    question: '⚽ Круглая клумба имеет радиус 5 м. Чему равна её площадь? (π ≈ 3)',
    options: ['50 м²', '65 м²', '75 м²', '100 м²'],
    correct: 2,
    explanation: 'S = π × r² = 3 × 25 = 75 м²',
    figure: 'circle',
    figureData: { radius: 5 },
  },
];

// Продвинутые задачи (выше школьной программы)
export const advancedQuestions: Question[] = [
  {
    id: 'adv1', topic: 'algebra', level: 6, isAdvanced: true,
    question: '🧮 Реши уравнение: 3x + 7 = 22',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'],
    correct: 1,
    explanation: '3x = 22 - 7 = 15, значит x = 15 ÷ 3 = 5',
    hint: 'Перенеси 7 в правую часть с минусом',
  },
  {
    id: 'adv2', topic: 'algebra', level: 6, isAdvanced: true,
    question: '🔢 Если x² = 144, чему равен x? (x > 0)',
    options: ['10', '11', '12', '14'],
    correct: 2,
    explanation: 'x = √144 = 12, потому что 12 × 12 = 144',
    hint: 'Подумай, какое число в квадрате даёт 144',
  },
  {
    id: 'adv3', topic: 'geometry', level: 6, isAdvanced: true,
    question: '📐 Найди диагональ прямоугольника 6×8 см (по теореме Пифагора):',
    options: ['9 см', '10 см', '11 см', '12 см'],
    correct: 1,
    explanation: 'd² = 6² + 8² = 36 + 64 = 100, значит d = √100 = 10 см',
    hint: 'Теорема Пифагора: a² + b² = c²',
  },
  {
    id: 'adv4', topic: 'logic', level: 6, isAdvanced: true,
    question: '🎯 В последовательности 2, 6, 18, 54, ... Какое следующее число?',
    options: ['108', '126', '162', '180'],
    correct: 2,
    explanation: 'Каждое число умножается на 3: 54 × 3 = 162',
    hint: 'Найди закономерность: как каждое следующее число получается из предыдущего?',
  },
  {
    id: 'adv5', topic: 'fractions', level: 6, isAdvanced: true,
    question: '🍰 Вычисли: 2/3 + 3/4',
    options: ['5/7', '5/12', '17/12', '23/12'],
    correct: 2,
    explanation: 'Приведём к общему знаменателю 12: 8/12 + 9/12 = 17/12',
    hint: 'Найди общий знаменатель для 3 и 4',
  },
  {
    id: 'adv6', topic: 'algebra', level: 6, isAdvanced: true,
    question: '🔍 Если 2(x + 3) = 20, чему равен x?',
    options: ['5', '7', '8', '10'],
    correct: 1,
    explanation: 'x + 3 = 20 ÷ 2 = 10, значит x = 10 - 3 = 7',
    hint: 'Сначала раздели обе части на 2',
  },
  {
    id: 'adv7', topic: 'geometry', level: 6, isAdvanced: true,
    question: '📏 Площадь круга равна 75 см² (π ≈ 3). Найди радиус:',
    options: ['3 см', '4 см', '5 см', '6 см'],
    correct: 2,
    explanation: 'S = πr², значит r² = 75/3 = 25, r = √25 = 5 см',
    hint: 'Вырази r² из формулы площади круга',
  },
  {
    id: 'adv8', topic: 'logic', level: 6, isAdvanced: true,
    question: '🧩 Сумма трёх последовательных чисел равна 48. Какое среднее число?',
    options: ['14', '15', '16', '17'],
    correct: 2,
    explanation: 'Среднее число = 48 ÷ 3 = 16. Числа: 15, 16, 17',
    hint: 'Среднее из трёх последовательных чисел — это их сумма делённая на 3',
  },
  {
    id: 'adv9', topic: 'algebra', level: 6, isAdvanced: true,
    question: '⚡ Поезд прошёл 300 км. Первые 2 часа он ехал со скоростью 60 км/ч, остальное — со скоростью 90 км/ч. Сколько часов он был в пути?',
    options: ['3 часа', '3,5 часа', '4 часа', '4,5 часа'],
    correct: 2,
    explanation: 'За 2 часа: 2 × 60 = 120 км. Осталось: 300 - 120 = 180 км. Время: 180 ÷ 90 = 2 часа. Всего: 2 + 2 = 4 часа',
    hint: 'Разбей путь на две части',
  },
  {
    id: 'adv10', topic: 'geometry', level: 6, isAdvanced: true,
    question: '🏛️ Объём прямоугольного параллелепипеда с рёбрами 3, 4 и 5 см равен:',
    options: ['12 см³', '30 см³', '60 см³', '120 см³'],
    correct: 2,
    explanation: 'V = a × b × c = 3 × 4 × 5 = 60 см³',
    hint: 'Объём = длина × ширина × высота',
  },
];

export const questQuestions: Record<number, Question[]> = {
  1: [
    { 
      id: 'q1_1', topic: 'arithmetic', level: 1, 
      question: '🎮 В игре у тебя было 15 монет. Ты нашёл ещё 8. Сколько монет теперь?', 
      options: ['21', '22', '23', '24'], 
      correct: 2, 
      explanation: '15 + 8 = 23 монет! Отличный сбор ресурсов!',
      hints: [
        'Представь, что ты собираешь монеты в мешок',
        'Можно ли сначала добавить до круглого числа?',
        '15 + 5 = 20, потом ещё 3 = 23'
      ],
      alternativeSolutions: [
        'Способ 1: 15 + 8 = 15 + 5 + 3 = 20 + 3 = 23',
        'Способ 2: 10 + 8 = 18, потом + 5 = 23',
        'Способ 3: 15 + 10 = 25, минус 2 = 23'
      ]
    },
    { 
      id: 'q1_2', topic: 'arithmetic', level: 1, 
      question: '🏰 Стена замка состоит из 12 блоков. Половину уже построили. Сколько блоков осталось?', 
      options: ['4', '5', '6', '7'], 
      correct: 2, 
      explanation: '12 ÷ 2 = 6 блоков осталось построить',
      hints: [
        'Что означает "половина"?',
        'Как найти половину от числа?',
        'Раздели 12 на 2 равные части'
      ],
      alternativeSolutions: [
        'Способ 1: 12 ÷ 2 = 6',
        'Способ 2: Какое число × 2 = 12? Ответ: 6',
        'Способ 3: Нарисуй 12 блоков и раздели чертой пополам'
      ]
    },
    { 
      id: 'q1_3', topic: 'multiplication', level: 1, 
      question: '⚔️ У тебя 4 меча, и каждый стоит по 5 золотых. Сколько золота потрачено?', 
      options: ['15', '18', '20', '25'], 
      correct: 2, 
      explanation: '4 × 5 = 20 золотых. Хорошая экипировка!',
      hints: [
        'Умножение — это быстрое сложение',
        'Сколько раз нужно взять по 5?',
        '5 + 5 + 5 + 5 = ?'
      ],
      alternativeSolutions: [
        'Способ 1: 4 × 5 = 5 + 5 + 5 + 5 = 20',
        'Способ 2: 5 × 4 = 5 + 5 + 5 + 5 = 20',
        'Способ 3: 2 × 5 = 10, потом × 2 = 20 (4 меча = 2 пары)'
      ]
    },
    { 
      id: 'q1_4', topic: 'arithmetic', level: 1, 
      question: '🌟 На карте 30 сокровищ. Ты нашёл 17. Сколько осталось найти?', 
      options: ['11', '12', '13', '14'], 
      correct: 2, 
      explanation: '30 - 17 = 13 сокровищ ещё ждут!',
      hints: [
        'Нужно найти разность',
        'Можно ли вычитать частями?',
        '30 - 10 = 20, потом - 7 = 13'
      ],
      alternativeSolutions: [
        'Способ 1: 30 - 17 = 30 - 10 - 7 = 20 - 7 = 13',
        'Способ 2: 17 + ? = 30, значит ? = 13',
        'Способ 3: 30 - 20 = 10, но мы забрали лишние 3, значит 10 + 3 = 13'
      ]
    },
    { 
      id: 'q1_5', topic: 'geometry', level: 1, 
      question: '📐 Твой участок земли — квадрат со стороной 5 метров. Какой периметр забора нужен?', 
      options: ['10 м', '15 м', '20 м', '25 м'], 
      correct: 2, 
      explanation: 'P = 4 × 5 = 20 метров забора',
      hints: [
        'Периметр — это сумма всех сторон',
        'Сколько сторон у квадрата?',
        'У квадрата все стороны равны: 5 + 5 + 5 + 5'
      ],
      alternativeSolutions: [
        'Способ 1: P = 5 + 5 + 5 + 5 = 20',
        'Способ 2: P = 4 × 5 = 20',
        'Способ 3: 2 × 5 = 10 (две стороны), потом × 2 = 20 (все четыре)'
      ]
    },
  ],
  2: [
    { id: 'q2_1', topic: 'multiplication', level: 2, question: '🚀 Ракета летит 6 часов со скоростью 100 км/ч. Какое расстояние она пролетит?', options: ['400 км', '500 км', '600 км', '700 км'], correct: 2, explanation: '6 × 100 = 600 км! До далёкой планеты!' },
    { id: 'q2_2', topic: 'division', level: 2, question: '👽 48 инопланетных кристаллов нужно разделить поровну между 6 членами экипажа. Сколько получит каждый?', options: ['6', '7', '8', '9'], correct: 2, explanation: '48 ÷ 6 = 8 кристаллов каждому!' },
    { id: 'q2_3', topic: 'fractions', level: 2, question: '🪐 Планета разделена на 4 зоны. Ты исследовал 1/4. Сколько зон осталось?', options: ['1', '2', '3', '4'], correct: 2, explanation: '4 - 1 = 3 зоны ещё не исследованы!' },
    { id: 'q2_4', topic: 'arithmetic', level: 2, question: '🛸 На корабле 56 литров топлива. Израсходовали 29. Сколько осталось?', options: ['25', '27', '29', '31'], correct: 1, explanation: '56 - 29 = 27 литров. Хватит для следующего прыжка!' },
    { id: 'q2_5', topic: 'logic', level: 2, question: '🌍 Если на одной планете год длится 12 месяцев, а на другой — в 2 раза меньше, сколько месяцев в году на второй планете?', options: ['4', '5', '6', '8'], correct: 2, explanation: '12 ÷ 2 = 6 месяцев!' },
  ],
  3: [
    { id: 'q3_1', topic: 'multiplication', level: 3, question: '🕸️ Паутинная сеть имеет 15 лучей, и на каждом по 6 перемычек. Сколько всего перемычек?', options: ['75', '80', '90', '96'], correct: 2, explanation: '15 × 6 = 90 перемычек! Мощная сеть!' },
    { id: 'q3_2', topic: 'fractions', level: 3, question: '🏙️ Город имеет 100 зданий. 3/4 из них — жилые дома. Сколько жилых домов?', options: ['50', '60', '75', '80'], correct: 2, explanation: '100 × 3/4 = 75 жилых домов!' },
    { id: 'q3_3', topic: 'arithmetic', level: 3, question: '🦸 У героя было 200 очков энергии. Он потратил 75 на полёт и 45 на удар. Сколько осталось?', options: ['70', '75', '80', '85'], correct: 2, explanation: '200 - 75 - 45 = 80 очков осталось!' },
    { id: 'q3_4', topic: 'geometry', level: 3, question: '🏗️ Площадка для приземления — прямоугольник 12м × 8м. Какова её площадь?', options: ['20 м²', '40 м²', '84 м²', '96 м²'], correct: 3, explanation: 'S = 12 × 8 = 96 м². Достаточно большая площадка!' },
    { id: 'q3_5', topic: 'logic', level: 3, question: '🕷️ Злодей поставил ловушки через каждые 3 метра на пути длиной 21 метр. Сколько ловушек?', options: ['5', '6', '7', '8'], correct: 2, explanation: '21 ÷ 3 = 7 ловушек! Будь осторожен!' },
  ],
  4: [
    { id: 'q4_1', topic: 'multiplication', level: 4, question: '🐉 Дракон съедает 25 овец в день. Сколько овец ему нужно на 12 дней?', options: ['250', '275', '300', '325'], correct: 2, explanation: '25 × 12 = 300 овец! Викинг, готовь запасы!' },
    { id: 'q4_2', topic: 'fractions', level: 4, question: '🏔️ Остров Олух имеет площадь 200 км². 3/5 покрыто лесами. Сколько км² лесов?', options: ['100', '110', '120', '130'], correct: 2, explanation: '200 × 3/5 = 120 км² лесов!' },
    { id: 'q4_3', topic: 'arithmetic', level: 4, question: '🐲 Беззубик пролетел 340 км на север и 260 км на восток. Какой общий путь?', options: ['500 км', '560 км', '590', '600 км'], correct: 3, explanation: '340 + 260 = 600 км! Настоящий воздушный марафон!' },
    { id: 'q4_4', topic: 'geometry', level: 4, question: '🏰 Крепость драконов — квадрат с периметром 80 м. Какова длина одной стены?', options: ['15 м', '18 м', '20 м', '25 м'], correct: 2, explanation: '80 ÷ 4 = 20 м. Каждая стена одинакова!' },
    { id: 'q4_5', topic: 'logic', level: 4, question: '🎯 Иккинг тренируется 2 часа в день. За неделю он делает 5 трюков в час. Сколько трюков за неделю?', options: ['50', '60', '70', '80'], correct: 2, explanation: '2 × 5 × 7 = 70 трюков за неделю!' },
  ],
  5: [
    { id: 'q5_1', topic: 'fractions', level: 5, question: '🐉 Стаю из 60 драконов разделили на отряды. 2/3 — боевые, остальные — разведчики. Сколько разведчиков?', options: ['15', '20', '25', '30'], correct: 1, explanation: '60 - (60 × 2/3) = 60 - 40 = 20 разведчиков!' },
    { id: 'q5_2', topic: 'arithmetic', level: 5, question: '⚡ Молния Беззубика имеет скорость 500 м/с. За сколько секунд она пролетит 2000 м?', options: ['2 с', '3 с', '4 с', '5 с'], correct: 2, explanation: 't = 2000/500 = 4 секунды! Молниеносно!' },
    { id: 'q5_3', topic: 'geometry', level: 5, question: '🏔️ Гора имеет форму конуса. Её основание — круг радиусом 3 км. Чему равна площадь основания? (π ≈ 3)', options: ['18 км²', '24 км²', '27 км²', '36 км²'], correct: 2, explanation: 'S = π × r² = 3 × 9 = 27 км²' },
    { id: 'q5_4', topic: 'logic', level: 5, question: '🐺 Стая из 12 альфавов охотится. Каждый ловит 5 рыб в день. За 4 дня сколько рыб поймает стая?', options: ['200', '220', '240', '260'], correct: 2, explanation: '12 × 5 × 4 = 240 рыб! Отличная охота!' },
    { id: 'q5_5', topic: 'logic', level: 5, question: '🏹 Если дракон летит со скоростью 80 км/ч, а навстречу дует ветер 10 км/ч, какова реальная скорость дракона?', options: ['70 км/ч', '80 км/ч', '90 км/ч', '100 км/ч'], correct: 0, explanation: '80 - 10 = 70 км/ч. Ветер замедляет!' },
  ],
  6: [
    { id: 'q6_1', topic: 'algebra', level: 6, isAdvanced: true, question: '🧮 Реши уравнение: 5x - 3 = 22', options: ['x = 3', 'x = 5', 'x = 7', 'x = 25'], correct: 1, explanation: '5x = 22 + 3 = 25, значит x = 25 ÷ 5 = 5' },
    { id: 'q6_2', topic: 'geometry', level: 6, isAdvanced: true, question: '📐 Прямоугольный треугольник имеет катеты 5 и 12. Найди гипотенузу:', options: ['11', '13', '15', '17'], correct: 1, explanation: 'По теореме Пифагора: c² = 5² + 12² = 25 + 144 = 169, c = 13' },
    { id: 'q6_3', topic: 'logic', level: 6, isAdvanced: true, question: '🔢 Продолжи последовательность: 1, 1, 2, 3, 5, 8, ...', options: ['10', '11', '12', '13'], correct: 3, explanation: 'Это числа Фибоначчи: каждое следующее = сумма двух предыдущих. 5 + 8 = 13' },
    { id: 'q6_4', topic: 'fractions', level: 6, isAdvanced: true, question: '🍰 Вычисли: 5/6 - 1/3', options: ['1/2', '2/3', '4/6', '1/3'], correct: 0, explanation: 'Приведём к общему знаменателю: 5/6 - 2/6 = 3/6 = 1/2' },
    { id: 'q6_5', topic: 'algebra', level: 6, isAdvanced: true, question: '⚡ Если x + y = 10 и x - y = 4, чему равен x?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'Сложим уравнения: 2x = 14, значит x = 7' },
  ],
};

export const getQuestionsForLevel = (level: number, mode: 'normal' | 'advanced' = 'normal'): Question[] => {
  const baseQuestions = questQuestions[level] || questQuestions[1];
  
  if (mode === 'advanced') {
    // В продвинутом режиме добавляем графические задачи и продвинутые вопросы
    const mixedQuestions = [...baseQuestions];
    
    // Добавляем графические задачи
    const figQs = figureQuestions.filter(q => q.level <= level + 1);
    mixedQuestions.push(...figQs.slice(0, 2));
    
    // Добавляем продвинутые вопросы
    const advQs = advancedQuestions.filter(q => q.level <= level + 1);
    mixedQuestions.push(...advQs.slice(0, 2));
    
    return mixedQuestions.sort(() => Math.random() - 0.5).slice(0, 7);
  }
  
  return baseQuestions;
};

export const getTestQuestionsForLevel = (level: number, mode: 'normal' | 'advanced' = 'normal'): Question[] => {
  let questions = testQuestions.filter(q => q.level <= level + 1);
  
  if (mode === 'advanced') {
    // Добавляем графические и продвинутые вопросы в тест
    const figQs = figureQuestions.filter(q => q.level <= level);
    const advQs = advancedQuestions.slice(0, 3);
    questions = [...questions, ...figQs.slice(0, 3), ...advQs];
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

export const getFigureQuestions = (level: number): Question[] => {
  return figureQuestions.filter(q => q.level <= level + 1);
};

export const getAdvancedQuestions = (): Question[] => {
  return advancedQuestions;
};
