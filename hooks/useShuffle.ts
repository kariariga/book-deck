'use client';
import { useMemo, useState } from 'react';
import { Card } from '@/types';

export function useShuffle(cards: Card[], allowRepeat: boolean) {
  const [used, setUsed] = useState<string[]>([]);
  const available = useMemo(() => allowRepeat ? cards : cards.filter((c) => !used.includes(c.id)), [cards, allowRepeat, used]);
  const [current, setCurrent] = useState<Card | null>(null);
  const next = () => {
    if (!available.length) return null;
    const pick = available[Math.floor(Math.random() * available.length)];
    setCurrent(pick);
    if (!allowRepeat) setUsed((u) => [...u, pick.id]);
    return pick;
  };
  const reset = () => { setUsed([]); setCurrent(null); };
  return { current, next, reset, remaining: available.length };
}
