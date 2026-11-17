"use client";
import { useEffect, useState } from "react";

export interface LyricText { category: string; title: { hinglish: string; hi: string }; verses: { dev: string; rom: string }[] }
let cache: Promise<Record<string, LyricText>> | null = null;

/** Lazily loads /data/lyrics.json (built by scripts/build-index.ts; also cached by the service worker). */
export function useLyrics() {
  const [data, setData] = useState<Record<string, LyricText> | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    cache ??= fetch("/data/lyrics.json").then((r) => r.json());
    cache.then(setData).catch(() => setError(true));
  }, []);
  return { data, error };
}
