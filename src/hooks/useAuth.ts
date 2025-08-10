import { useEffect } from "react";
import { create } from "zustand";
import { getMe, login } from "@api/endpoints";
import { User, LogInResult } from "@api/types";
import { setTokens, getAccessToken, getRefreshToken, clearTokens } from "@utils/tokenStorage";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  login: async (username, password) => {
    set({ loading: true });
    try {
      const tokens: LogInResult = await login(username, password);
      await setTokens(tokens.accessToken, tokens.refreshToken, tokens.maxAge);
      const me = await getMe().catch(() => null);
      set({ user: me, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    await clearTokens();
    set({ user: null, accessToken: null, refreshToken: null });
  },
  hydrate: async () => {
    set({ loading: true });
    try {
      const [a, r] = await Promise.all([getAccessToken(), getRefreshToken()]);
      if (a || r) {
        const me = await getMe().catch(() => null);
        set({ user: me, accessToken: a ?? null, refreshToken: r ?? null });
      }
    } finally {
      set({ loading: false });
    }
  }
}));

export function useAuthHydration() {
  const hydrate = useAuth((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}