import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from '@/data/quiz';
import { useTheme } from '@/hooks/use-theme';

export default function QuizScreen() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  function handleSelect(choiceIndex: number) {
    if (selectedIndex !== null) return;

    setSelectedIndex(choiceIndex);
    const isCorrect = choiceIndex === currentQuestion.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(nextScore);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= TOTAL_QUESTIONS) {
        setScore(nextScore);
        setIsFinished(true);
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
    }, 800);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.resultSection}>
            <ThemedText type="title" style={styles.title}>
              結果
            </ThemedText>
            <ThemedText type="subtitle" style={styles.score}>
              {score} / {TOTAL_QUESTIONS} 正解
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.resultMessage}>
              {score === TOTAL_QUESTIONS
                ? '満点！すばらしい！'
                : score >= 3
                  ? 'よくできました！'
                  : 'もう一度挑戦してみよう！'}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.buttonGroup}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme.backgroundElement },
                pressed && { backgroundColor: theme.backgroundSelected },
              ]}
              onPress={handleRetry}>
              <ThemedText type="default" style={styles.buttonText}>
                もう一度
              </ThemedText>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme.backgroundElement },
                pressed && { backgroundColor: theme.backgroundSelected },
              ]}
              onPress={() => router.replace('/')}>
              <ThemedText type="default" style={styles.buttonText}>
                ホームへ
              </ThemedText>
            </Pressable>
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText themeColor="textSecondary" style={styles.progress}>
          問題 {currentIndex + 1} / {TOTAL_QUESTIONS}
        </ThemedText>

        <ThemedText type="subtitle" style={styles.question}>
          {currentQuestion.question}
        </ThemedText>

        <ThemedView style={styles.choices}>
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showResult = selectedIndex !== null;

            let backgroundColor = theme.backgroundElement;
            if (showResult && isCorrect) {
              backgroundColor = '#4ade80';
            } else if (showResult && isSelected && !isCorrect) {
              backgroundColor = '#f87171';
            }

            return (
              <Pressable
                key={choice}
                style={({ pressed }) => [
                  styles.choice,
                  { backgroundColor },
                  pressed && selectedIndex === null && { backgroundColor: theme.backgroundSelected },
                ]}
                onPress={() => handleSelect(index)}
                disabled={selectedIndex !== null}>
                <ThemedText
                  style={[
                    styles.choiceText,
                    showResult && (isCorrect || isSelected) && styles.choiceTextHighlight,
                  ]}>
                  {choice}
                </ThemedText>
              </Pressable>
            );
          })}
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    gap: Spacing.four,
    justifyContent: 'center',
  },
  progress: {
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
  },
  question: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
  },
  choices: {
    gap: Spacing.three,
  },
  choice: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  choiceText: {
    fontSize: 18,
    textAlign: 'center',
  },
  choiceTextHighlight: {
    color: '#000000',
    fontWeight: '700',
  },
  resultSection: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  score: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 36,
  },
  resultMessage: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
  },
  buttonGroup: {
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  button: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
