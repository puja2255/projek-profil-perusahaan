import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { getAuthToken, setAuthToken } from "../lib/authToken";

type AuthContextValue = {
  isAuthed: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthed(Boolean(token));
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      isAuthed,
      loading,
      login: async (username: string, password: string) => {
        const result = await api.login(username, password);
        setAuthToken(result.token);
        setIsAuthed(true);
      },
      logout: () => {
        setAuthToken("");
        setIsAuthed(false);
      }
    };
  }, [isAuthed, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
