import { useCallback, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { drawLanguage, type Language } from '@/lib/language-gacha';

type GachaPhase = 'idle' | 'playing';

export function LanguageGacha() {
  const [phase, setPhase] = useState<GachaPhase>('idle');
  const [result, setResult] = useState<Language | null>(null);
  const [drawCount, setDrawCount] = useState(0);

  const startGacha = useCallback(() => {
    setPhase('playing');
    setResult(null);
    setDrawCount(0);
  }, []);

  const spin = useCallback(() => {
    setResult(drawLanguage());
    setDrawCount((count) => count + 1);
  }, []);

  if (phase === 'idle') {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText type="title" style={styles.title}>
          開発言語ガチャ
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.description}>
          スタートを押して、今日の開発言語を引きましょう
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="スタート"
          onPress={startGacha}
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
        開発言語ガチャ
      </ThemedText>

      <ThemedView type="backgroundElement" style={styles.resultPanel}>
        {result ? (
          <>
            <ThemedText type="small" themeColor="textSecondary">
              今回の言語
            </ThemedText>
            <ThemedText type="title" style={styles.languageName}>
              {result}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {drawCount}回目
            </ThemedText>
          </>
        ) : (
          <ThemedText type="small" themeColor="textSecondary" style={styles.prompt}>
            ボタンを押してガチャを回してください
          </ThemedText>
        )}
      </ThemedView>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="ガチャを回す"
        onPress={spin}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
        <ThemedText type="smallBold" style={styles.primaryButtonLabel}>
          ガチャを回す
        </ThemedText>
      </Pressable>

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
  resultPanel: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.five,
    borderRadius: Spacing.three,
    minHeight: 180,
  },
  languageName: {
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 48,
  },
  prompt: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
