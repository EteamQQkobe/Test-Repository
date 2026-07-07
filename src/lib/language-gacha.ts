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

export type Language = (typeof LANGUAGES)[number];

export function drawLanguage(): Language {
  const index = Math.floor(Math.random() * LANGUAGES.length);
  return LANGUAGES[index];
}
