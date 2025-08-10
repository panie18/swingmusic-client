import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";
const KEY = "server_base_url";

function ensureTrailingSlash(url: string) {
  if (!url) return "";
  return url.endsWith("/") ? url : url + "/";
}

let currentBaseUrl = "";

// Storage helpers
async function storageGet(key: string): Promise<string | null> {
  return isWeb ? Promise.resolve(localStorage.getItem(key)) : SecureStore.getItemAsync(key);
}
async function storageSet(key: string, val: string): Promise<void> {
  if (isWeb) return Promise.resolve(localStorage.setItem(key, val));
  return SecureStore.setItemAsync(key, val);
}
async function storageDel(key: string): Promise<void> {
  if (isWeb) return Promise.resolve(localStorage.removeItem(key));
  return SecureStore.deleteItemAsync(key);
}

export async function loadBaseUrl(): Promise<string | null> {
  const v = (await storageGet(KEY)) || "";
  currentBaseUrl = v || "";
  return currentBaseUrl || null;
}

export function getBaseUrl(): string {
  return currentBaseUrl || "";
}

export async function setBaseUrl(url: string): Promise<string> {
  const norm = ensureTrailingSlash(url.trim());
  currentBaseUrl = norm;
  await storageSet(KEY, norm);
  return norm;
}

export async function clearBaseUrl(): Promise<void> {
  currentBaseUrl = "";
  await storageDel(KEY);
}

export function hasBaseUrl(): boolean {
  return !!currentBaseUrl;
}

export function validateServerUrl(input: string): { ok: boolean; url?: string; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Bitte eine Server-URL eingeben." };
  if (!/^https?:\/\//i.test(trimmed)) return { ok: false, error: "URL muss mit http:// oder https:// beginnen." };
  try {
    const u = new URL(trimmed);
    if (!u.host) return { ok: false, error: "Ungültige URL (kein Host)." };
    return { ok: true, url: ensureTrailingSlash(u.toString()) };
  } catch {
    return { ok: false, error: "Ungültige URL." };
  }
}