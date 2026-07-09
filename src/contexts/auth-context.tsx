import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type AuthContextValue = {
  user: string | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<Record<string, string>>({});
  const [user, setUser] = useState<string | null>(null);

  const login = useCallback(
    (username: string, password: string) => {
      const trimmedUsername = username.trim();
      if (!trimmedUsername || !password) {
        return { success: false, error: 'ユーザーネームとパスワードを入力してください' };
      }
      if (users[trimmedUsername] !== password) {
        return { success: false, error: 'ユーザーネームまたはパスワードが正しくありません' };
      }
      setUser(trimmedUsername);
      return { success: true };
    },
    [users],
  );

  const register = useCallback(
    (username: string, password: string) => {
      const trimmedUsername = username.trim();
      if (!trimmedUsername || !password) {
        return { success: false, error: 'ユーザーネームとパスワードを入力してください' };
      }
      if (users[trimmedUsername]) {
        return { success: false, error: 'このユーザーネームは既に使用されています' };
      }
      setUsers((prev) => ({ ...prev, [trimmedUsername]: password }));
      setUser(trimmedUsername);
      return { success: true };
    },
    [users],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
