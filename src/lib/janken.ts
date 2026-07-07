export const HANDS = ['rock', 'paper', 'scissors'] as const;

export type Hand = (typeof HANDS)[number];

export type RoundResult = 'win' | 'lose' | 'draw';

export const HAND_LABELS: Record<Hand, string> = {
  rock: 'グー',
  paper: 'パー',
  scissors: 'チョキ',
};

export const HAND_EMOJI: Record<Hand, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

export function pickComputerHand(): Hand {
  const index = Math.floor(Math.random() * HANDS.length);
  return HANDS[index];
}

export function judgeRound(player: Hand, computer: Hand): RoundResult {
  if (player === computer) {
    return 'draw';
  }

  const playerWins =
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper');

  return playerWins ? 'win' : 'lose';
}

export function resultLabel(result: RoundResult): string {
  switch (result) {
    case 'win':
      return 'あなたの勝ち！';
    case 'lose':
      return 'あなたの負け…';
    case 'draw':
      return 'あいこ';
  }
}
