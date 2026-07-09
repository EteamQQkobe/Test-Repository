import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canRegister = username.trim().length > 0 && passwordsMatch;

  const handleRegister = () => {
    const result = register(username, password);
    if (result.success) {
      router.replace('/(app)');
      return;
    }
    setError(result.error ?? '登録に失敗しました');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.form}
        >
          <ThemedText type="subtitle" style={styles.title}>
            新規登録
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

          <ThemedView style={styles.field}>
            <ThemedText type="smallBold">パスワード（確認）</ThemedText>
            <ThemedTextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError('');
              }}
              secureTextEntry
              placeholder="もう一度パスワードを入力"
            />
          </ThemedView>

          {confirmPassword.length > 0 && !passwordsMatch ? (
            <ThemedText type="small" style={styles.error}>
              パスワードが一致しません
            </ThemedText>
          ) : null}

          {error ? (
            <ThemedText type="small" style={styles.error}>
              {error}
            </ThemedText>
          ) : null}

          <Pressable
            onPress={handleRegister}
            disabled={!canRegister}
            style={({ pressed }) => [
              styles.primaryButton,
              !canRegister && styles.disabledButton,
              pressed && canRegister && styles.pressed,
            ]}
          >
            <ThemedText type="smallBold" style={styles.primaryButtonText}>
              登録
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
          >
            <ThemedText type="linkPrimary">ログインに戻る</ThemedText>
          </Pressable>
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
