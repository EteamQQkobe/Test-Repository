import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canLogin = username.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    const result = login(username, password);
    if (result.success) {
      router.replace('/(app)');
      return;
    }
    setError(result.error ?? 'ログインに失敗しました');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.form}
        >
          <ThemedText type="subtitle" style={styles.title}>
            ログイン
          </ThemedText>

          <ThemedView style={styles.field}>
            <ThemedText type="smallBold">ユーザーネーム</ThemedText>
            <ThemedTextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError('');
              }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="ユーザーネームを入力"
            />
          </ThemedView>

          <ThemedView style={styles.field}>
            <ThemedText type="smallBold">パスワード</ThemedText>
            <ThemedTextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
              placeholder="パスワードを入力"
            />
          </ThemedView>

          {error ? (
            <ThemedText type="small" style={styles.error}>
              {error}
            </ThemedText>
          ) : null}

          <Pressable
            onPress={handleLogin}
            disabled={!canLogin}
            style={({ pressed }) => [
              styles.primaryButton,
              !canLogin && styles.disabledButton,
              pressed && canLogin && styles.pressed,
            ]}
          >
            <ThemedText type="smallBold" style={styles.primaryButtonText}>
              ログイン
            </ThemedText>
          </Pressable>

          <Link href="/(auth)/register" asChild>
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <ThemedText type="linkPrimary">新規登録はこちら</ThemedText>
            </Pressable>
          </Link>
        </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  form: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  field: {
    gap: Spacing.one,
  },
  error: {
    color: '#e5484d',
  },
  primaryButton: {
    backgroundColor: '#3c87f7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
});
