export type QuizQuestion = {
  id: number;
  question: string;
  choices: string[];
  correctIndex: number;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '日本の首都はどこですか？',
    choices: ['大阪', '東京', '京都', '名古屋'],
    correctIndex: 1,
  },
  {
    id: 2,
    question: '1 + 1 = ?',
    choices: ['1', '2', '3', '4'],
    correctIndex: 1,
  },
  {
    id: 3,
    question: '地球の衛星は何ですか？',
    choices: ['火星', '金星', '月', '太陽'],
    correctIndex: 2,
  },
  {
    id: 4,
    question: 'React Native はどの言語で UI を記述しますか？',
    choices: ['Python', 'Java', 'JavaScript/TypeScript', 'Ruby'],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'Expo のマスコットは何ですか？',
    choices: ['Sloth', 'Rocket', 'Robot', 'Bird'],
    correctIndex: 0,
  },
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
