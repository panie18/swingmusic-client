import { Lyrics, LyricsLine } from "@api/types";

const timeTagRegex = /\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?\]/g;

export function parseLRC(lrc: string): Lyrics {
  const lines: LyricsLine[] = [];

  lrc.split(/\r?\n/).forEach((line) => {
    const parts = [...line.matchAll(timeTagRegex)];
    const text = line.replace(timeTagRegex, "").trim();
    parts.forEach((m) => {
      const min = parseInt(m[1], 10) || 0;
      const sec = parseInt(m[2], 10) || 0;
      const ms = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) : 0;
      const timeMs = min * 60000 + sec * 1000 + ms;
      lines.push({ timeMs, text });
    });
  });

  lines.sort((a, b) => a.timeMs - b.timeMs);
  return { synced: true, lines, raw: lrc };
}

export function activeLyricIndex(lines: LyricsLine[], positionMs: number): number {
  if (!lines.length) return -1;
  let lo = 0, hi = lines.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lines[mid].timeMs <= positionMs) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
}