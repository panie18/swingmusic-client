import { create } from "zustand";
import { Track } from "@api/types";

type PlayerState = {
  queue: Track[];
  current?: Track;
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  setQueue: (q: Track[], startIndex?: number) => void;
  setPlaying: (p: boolean) => void;
  setProgress: (positionMs: number, durationMs: number) => void;
  setCurrent: (t?: Track) => void;
};

export const usePlayer = create<PlayerState>((set) => ({
  queue: [],
  current: undefined,
  isPlaying: false,
  positionMs: 0,
  durationMs: 0,
  setQueue: (q, startIndex = 0) =>
    set({ queue: q, current: q[startIndex], positionMs: 0, durationMs: 0 }),
  setPlaying: (p) => set({ isPlaying: p }),
  setProgress: (positionMs, durationMs) => set({ positionMs, durationMs }),
  setCurrent: (t) => set({ current: t, positionMs: 0, durationMs: 0 })
}));