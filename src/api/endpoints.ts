import { api } from "./client";
import { FavoritesSummary, LogInResult, Lyrics, Track, User } from "./types";
import { parseLRC } from "@utils/lrc";

function base() {
  return api.defaults.baseURL?.replace(/\/+$/, "") || "";
}

// Auth
export async function login(username: string, password: string): Promise<LogInResult> {
  const { data } = await api.post("auth/login", { username, password });
  return data;
}

export async function getMe(): Promise<User | null> {
  try {
    const { data } = await api.get("auth/users"); // falls vorhanden; sonst null
    return data?.user ?? null;
  } catch {
    return null;
  }
}

// Home/Favorites
export async function getFavoritesSummary(params?: { track_limit?: number; album_limit?: number; artist_limit?: number }): Promise<FavoritesSummary> {
  const { data } = await api.get("favorites", { params });
  return {
    tracks: (data?.tracks || []) as Track[],
    albums: data?.albums || [],
    artists: data?.artists || []
  };
}

// Stream URL
export function getTrackStreamUrl(track: Pick<Track, "trackHash" | "filepath">, opts?: { quality?: string; container?: string }) {
  const q = opts?.quality ?? "original";
  const c = opts?.container ?? "mp3";
  const b = base();
  return `${b}/file/${encodeURIComponent(track.trackHash)}?filepath=${encodeURIComponent(track.filepath)}&quality=${encodeURIComponent(q)}&container=${encodeURIComponent(c)}`;
}

// Lyrics
export async function getLyrics(track: Pick<Track, "trackHash" | "filepath">): Promise<Lyrics | null> {
  try {
    const { data } = await api.post("lyrics", {
      trackhash: track.trackHash,
      filepath: track.filepath
    });
    if (!data || !data.lyrics) return null;
    if (data.synced) return parseLRC(data.lyrics);
    return { synced: false, lines: [], raw: data.lyrics as string };
  } catch {
    return null;
  }
}