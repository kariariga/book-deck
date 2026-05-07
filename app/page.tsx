import Link from 'next/link';
import { RecentDecks } from '@/components/RecentDecks';
export default function Home() {
  return <div className='space-y-6'><h1 className='text-4xl font-bold'>Book Deck</h1><p>Sorteie cartas de frases para clubes do livro.</p><div className='flex gap-3'><Link href='/create' className='rounded-xl bg-black px-4 py-2 text-white'>Criar novo baralho</Link></div><RecentDecks /></div>;
}
