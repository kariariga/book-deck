'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Deck, Card } from '@/types';
import { supabase } from '@/lib/supabase';
import { DeckCard } from '@/components/DeckCard';
import { useShuffle } from '@/hooks/useShuffle';

export default function DeckPage() {
  const { slug } = useParams<{slug:string}>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { (async ()=>{ const { data } = await supabase.from('decks').select('*').eq('slug', slug).single(); setDeck(data as Deck); if(data){ const { data: c } = await supabase.from('cards').select('*').eq('deck_id', data.id); setCards((c ?? []) as Card[]);} })(); }, [slug]);
  const shuffle = useShuffle(cards, deck?.permitir_repeticao ?? false);
  if (!deck) return <p>Carregando...</p>;
  return <div className='space-y-4'><DeckCard deck={deck} card={shuffle.current} flipped={flipped} onFlip={() => { if(!flipped && !shuffle.current) shuffle.next(); setFlipped((f)=>!f); }} /><div className='flex gap-2'><button className='rounded bg-black px-3 py-2 text-white' onClick={()=>{shuffle.next(); setFlipped(true);}}>Próxima carta</button><button className='rounded border px-3 py-2' onClick={()=>{shuffle.reset(); setFlipped(false);}}>Embaralhar novamente</button></div></div>;
}
