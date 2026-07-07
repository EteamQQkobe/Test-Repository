import { useCallback, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import {
  HAND_EMOJI,
  HAND_LABELS,
  HANDS,
  type Hand,
  judgeRound,
  pickComputerHand,
  resultLabel,
  type RoundResult,
} from '@/lib/janken';

type GamePhase = 'idle' | 'playing';

type Score = {
  wins: number;
  losses: number;
  draws: number;
};

type LastRound = {
  player: Hand;
  computer: Hand;
  result: RoundResult;
};

const INITIAL_SCORE: Score = { wins: 0, losses: 0, draws: 0 };

export function JankenGame() {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [lastRound, setLastRound] = useState<LastRound | null>(null);

  const startGame = useCallback(() => {
    setPhase('playing');
    setScore(INITIAL_SCORE);
    setLastRound(null);
  }, []);

  const playRound = useCallback((playerHand: Hand) => {
    const computerHand = pickComputerHand();
    const result = judgeRound(playerHand, computerHand);

    setLastRound({ player: playerHand, computer: computerHand, result });
    setScore((current) => ({
      wins: current.wins + (result === 'win' ? 1 : 0),
      losses: current.losses + (result === 'lose' ? 1 : 0),
      draws: current.draws + (result === 'draw' ? 1 : 0),
    }));
  }, []);

  if (phase === 'idle') {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="title" style={styles.title}>
          じゃんけん
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          スタートを押して対戦を始めましょう
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="スタート"
          onPress={startGame}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <ThemedText type="smallBold" style={styles.primaryButtonLabel}>
            スタート
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.playing}>
      <ThemedText type="subtitle" style={styles.title}>
        じゃんけん
      </ThemedText>

      <ThemedView type="backgroundElement" style={styles.scoreBoard}>
        <ThemedText type="smallBold">スコア</ThemedText>
        <ThemedText type="small">
          {score.wins}勝 {score.losses}敗 {score.draws}分
        </ThemedText>
      </ThemedView>

      {lastRound ? (
        <ThemedView type="backgroundElement" style={styles.resultPanel}>
          <ThemedText type="smallBold" style={styles.resultTitle}>
            {resultLabel(lastRound.result)}
          </ThemedText>
          <ThemedView style={styles.handsRow}>
            <ThemedView style={styles.handColumn}>
              <ThemedText type="small" themeColor="textSecondary">
                あなた
              </ThemedText>
              <ThemedText style={styles.handEmoji}>{HAND_EMOJI[lastRound.player]}</ThemedText>
              <ThemedText type="small">{HAND_LABELS[lastRound.player]}</ThemedText>
            </ThemedView>
            <ThemedText type="subtitle" style={styles.vs}>
              VS
            </ThemedText>
            <ThemedView style={styles.handColumn}>
              <ThemedText type="small" themeColor="textSecondary">
                コンピュータ
              </ThemedText>
              <ThemedText style={styles.handEmoji}>{HAND_EMOJI[lastRound.computer]}</ThemedText>
              <ThemedText type="small">{HAND_LABELS[lastRound.computer]}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView type="backgroundElement" style={styles.resultPanel}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.prompt}>
            手を選んでください
          </ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.choiceRow}>
        {HANDS.map((hand) => (
          <Pressable
            key={hand}
            accessibilityRole="button"
            accessibilityLabel={HAND_LABELS[hand]}
            onPress={() => playRound(hand)}
            style={({ pressed }) => [styles.choiceButton, pressed && styles.pressed]}>
            <ThemedText style={styles.choiceEmoji}>{HAND_EMOJI[hand]}</ThemedText>
            <ThemedText type="smallBold">{HAND_LABELS[hand]}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="最初に戻る"
        onPress={() => setPhase('idle')}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
        <ThemedText type="small" themeColor="textSecondary">
          最初に戻る
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  playing: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#3c87f7',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  primaryButtonLabel: {
    color: '#ffffff',
  },
  secondaryButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  scoreBoard: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  resultPanel: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.three,
    minHeight: 160,
    justifyContent: 'center',
  },
  resultTitle: {
    textAlign: 'center',
  },
  prompt: {
    textAlign: 'center',
  },
  handsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  handColumn: {
    alignItems: 'center',
    gap: Spacing.one,
    minWidth: 96,
  },
  handEmoji: {
    fontSize: 48,
    lineHeight: 56,
  },
  vs: {
    opacity: 0.5,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  choiceButton: {
    flex: 1,
    maxWidth: 110,
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.three,
    backgroundColor: 'rgba(60, 135, 247, 0.12)',
  },
  choiceEmoji: {
    fontSize: 36,
    lineHeight: 42,
  },
  pressed: {
    opacity: 0.7,
  },
});
