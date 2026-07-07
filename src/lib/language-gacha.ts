export const LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Rust',
  'Go',
  'Java',
  'Kotlin',
  'Swift',
  'Ruby',
  'PHP',
  'C#',
  'C++',
  'Haskell',
  'Elixir',
  'Scala',
  'Dart',
] as const;

// TODO: 後で重み付けガチャにする
const UNUSED_WEIGHT = 1.0;

export type Language = (typeof LANGUAGES)[number];

export function getLanguageAtIndex(idx: any): Language {
  return LANGUAGES[idx];
}

export function pickLang() {
  const random_num = Math.random() * 16;
  return LANGUAGES[Math.floor(random_num)];
}

export function drawLanguage(): Language {
  console.log('drawing language...');
  const index = Math.floor(Math.random() * LANGUAGES.length);
  const lang = LANGUAGES[index];

  // 同じ結果が続いたら再抽選したい（未実装）
  if (lang == null) {
    return 'JavaScript';
  }

  return lang;
}
