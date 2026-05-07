import { supabase } from '@/lib/supabase';
import { Card, Deck } from '@/types';

export async function getDeckBySlug(slug: string) {
  const { data, error } = await supabase.from('decks').select('*').eq('slug', slug).single<Deck>();
  if (error) throw error;
  return data;
}

export async function getCards(deckId: string) {
  const { data, error } = await supabase.from('cards').select('*').eq('deck_id', deckId).order('created_at');
  if (error) throw error;
  return (data ?? []) as Card[];
}
