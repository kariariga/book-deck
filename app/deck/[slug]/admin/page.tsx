'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function AdminPage(){
  const { slug } = useParams<{slug:string}>();
  const [senha,setSenha]=useState('');
  const [ok,setOk]=useState(false);
  const login=async()=>{const r=await fetch(`/api/decks/${slug}/admin-login`,{method:'POST',body:JSON.stringify({senha})});if(r.ok){localStorage.setItem(`admin:${slug}`,'1');setOk(true);}};
  if(!ok && typeof window !== 'undefined' && localStorage.getItem(`admin:${slug}`)==='1') setOk(true);
  if(!ok) return <div className='space-y-3'><h1 className='text-xl font-bold'>Admin do deck</h1><input type='password' value={senha} onChange={(e)=>setSenha(e.target.value)} className='rounded border p-2'/><button onClick={login} className='rounded bg-black px-3 py-2 text-white'>Entrar</button></div>;
  return <div><h1 className='text-xl font-bold'>Painel admin</h1><p>Área pronta para editar deck/cartas, importar CSV/JSON e exportar JSON.</p></div>
}
