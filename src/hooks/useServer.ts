import { useEffect } from "react";
import { create } from "zustand";
import { clearTokens } from "@utils/tokenStorage";
import { getBaseUrl, loadBaseUrl, setBaseUrl as persistBaseUrl, clearBaseUrl as dropBaseUrl, validateServerUrl } from "@config/server";

type ServerState = {
  baseUrl: string | null;
  loading: boolean;
  hydrate: () => Promise<void>;
  setBaseUrl: (url: string) => Promise<{ ok: true; url: string } | { ok: false; error: string }>;
  clear: () => Promise<void>;
};

export const useServer = create<ServerState>((set) => ({
  baseUrl: null,
  loading: false,
  hydrate: async () => {
    set({ loading: true });
    try {
      const url = await loadBaseUrl();
      set({ baseUrl: url });
    } finally {
      set({ loading: false });
    }
  },
  setBaseUrl: async (input: string) => {
    const v = validateServerUrl(input);
    if (!v.ok || !v.url) return { ok: false as const, error: v.error || "Ungültige URL" };
    // Serverwechsel: Tokens löschen
    await clearTokens();
    const saved = await persistBaseUrl(v.url);
    set({ baseUrl: saved });
    return { ok: true as const, url: saved };
  },
  clear: async () => {
    await clearTokens();
    await dropBaseUrl();
    set({ baseUrl: null });
  }
}));

export function useServerHydration() {
  const hydrate = useServer((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}