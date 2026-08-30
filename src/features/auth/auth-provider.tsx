"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as authApi from "./api";
import type { LoginInput } from "./api";

export type AuthStatus = "loading" | "signedOut" | "signedIn";

type AuthContextValue = {
  status: AuthStatus;
  /** Kept in memory only; never persisted to storage. */
  accessToken: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    authApi
      .refresh()
      .then(({ accessToken: token }) => {
        if (!active) return;
        setAccessToken(token);
        setStatus("signedIn");
      })
      .catch(() => {
        if (!active) return;
        setStatus("signedOut");
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const { accessToken: token } = await authApi.login(input);
    setAccessToken(token);
    setStatus("signedIn");
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setStatus("signedOut");
    }
  }, []);

  const value = useMemo(
    () => ({ status, accessToken, login, logout }),
    [status, accessToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
