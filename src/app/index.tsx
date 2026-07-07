import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { TOTAL_QUESTIONS } from '@/data/quiz';
import { useTheme } from '@/hooks/use-theme';

export default function StartScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            クイズゲーム
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.description}>
            {TOTAL_QUESTIONS}問のクイズに挑戦しよう！
          </ThemedText>
        </ThemedView>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            { backgroundColor: theme.backgroundElement },
            pressed && { backgroundColor: theme.backgroundSelected },
          ]}
          onPress={() => router.push('/quiz')}>
          <ThemedText type="subtitle" style={styles.startButtonText}>
            スタート
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
  },
  startButton: {
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    minWidth: 200,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 24,
    lineHeight: 32,
  },
});
