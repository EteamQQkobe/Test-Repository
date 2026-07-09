import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuButton } from '@/components/menu-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

const MENU_ITEMS = [
  {
    title: '初心者道場',
    description: '基本のタイピング練習',
    message: '初心者道場は準備中です',
  },
  {
    title: 'チャレンジ道場設定',
    description: '難易度や制限時間をカスタマイズ',
    message: 'チャレンジ道場設定は準備中です',
  },
  {
    title: 'ガチャ',
    description: 'アイテムや称号を入手',
    message: 'ガチャは準備中です',
  },
] as const;

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle">タイピング道場</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ようこそ、{user} さん
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <MenuButton
              key={item.title}
              title={item.title}
              description={item.description}
              onPress={() => Alert.alert(item.title, item.message)}
            />
          ))}
        </ThemedView>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        >
          <ThemedText type="linkPrimary">ログアウト</ThemedText>
        </Pressable>
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
    paddingVertical: Spacing.four,
    alignItems: 'center',
    gap: Spacing.four,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.three,
  },
  menu: {
    flex: 1,
    alignSelf: 'stretch',
    gap: Spacing.three,
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
