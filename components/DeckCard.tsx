'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, Deck } from '@/types';

export function DeckCard({ deck, card, flipped, onFlip }: { deck: Deck; card: Card | null; flipped: boolean; onFlip: () => void }) {
  return (
    <button onClick={onFlip} className='w-full max-w-sm perspective-[1200px]'>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5 }} className='relative h-96 w-full rounded-3xl shadow-xl [transform-style:preserve-3d]'>
        <div className='absolute inset-0 rounded-3xl p-6 [backface-visibility:hidden]' style={{ background: deck.tema_background, color: deck.tema_texto }}>
          <Image src={deck.capa_url || '/cover-fallback.svg'} alt='capa' width={320} height={180} className='h-44 w-full rounded-xl object-cover' />
          <h2 className='mt-6 text-2xl font-semibold'>{deck.nome}</h2>
        </div>
        <div className='absolute inset-0 rounded-3xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]' style={{ background: deck.tema_background, color: deck.tema_texto }}>
          {card?.titulo && <p className='text-xs uppercase'>{card.titulo}</p>}
          <p className='mt-10 text-center text-xl'>{card?.texto ?? 'Toque para sortear uma frase'}</p>
          {card?.categoria && <p className='mt-8 text-center text-sm'>{card.categoria}</p>}
        </div>
      </motion.div>
    </button>
  );
}
