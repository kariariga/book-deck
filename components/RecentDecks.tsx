import Link from 'next/link';
const mocks = ['clubecwb', 'leituranoturna', 'desafioliterario'];
export function RecentDecks(){return <section><h2 className='mb-3 font-semibold'>Decks recentes (mock)</h2><ul className='space-y-2'>{mocks.map((d)=><li key={d}><Link className='text-blue-700 underline' href={`/deck/${d}`}>/deck/{d}</Link></li>)}</ul></section>}
