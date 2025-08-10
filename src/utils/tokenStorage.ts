import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

const ACCESS = "auth_access_token";
const REFRESH = "auth_refresh_token";
const EXP = "auth_token_exp_at";

export async function setTokens(accessToken: string, refreshToken: string, maxAgeSec?: number) {
  const expAt = maxAgeSec ? (Date.now() + maxAgeSec * 1000).toString() : "";
  if (isWeb) {
    localStorage.setItem(ACCESS, accessToken);
    localStorage.setItem(REFRESH, refreshToken);
    if (expAt) localStorage.setItem(EXP, expAt);
    return;
  }
  await SecureStore.setItemAsync(ACCESS, accessToken);
  await SecureStore.setItemAsync(REFRESH, refreshToken);
  if (expAt) await SecureStore.setItemAsync(EXP, expAt);
}

export async function getAccessToken(): Promise<string | null> {
  return isWeb ? localStorage.getItem(ACCESS) : SecureStore.getItemAsync(ACCESS);
}

export async function getRefreshToken(): Promise<string | null> {
  return isWeb ? localStorage.getItem(REFRESH) : SecureStore.getItemAsync(REFRESH);
}

export async function clearTokens() {
  if (isWeb) {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    localStorage.removeItem(EXP);
    return;
  }
  await SecureStore.deleteItemAsync(ACCESS);
  await SecureStore.deleteItemAsync(REFRESH);
  await SecureStore.deleteItemAsync(EXP);
}