'use client';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { slugify } from '@/utils/slug';
import { themes } from '@/lib/themes';
import { useRouter } from 'next/navigation';

const schema = z.object({ nome: z.string().min(3), slug: z.string().min(3), descricao: z.string().optional(), senha: z.string().min(6), tema: z.string(), permitirRepeticao: z.boolean(), categoriasAtivas: z.boolean(), capaUrl: z.string().optional() });
type FormData = z.infer<typeof schema>;

export default function CreateDeckPage() {
  const [manualSlug, setManualSlug] = useState(false);
  const router = useRouter();
  const { register, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { tema: themes[0].name, permitirRepeticao: false, categoriasAtivas: true } });
  const nome = watch('nome');
  useMemo(() => { if (!manualSlug && nome) setValue('slug', slugify(nome)); }, [nome, manualSlug, setValue]);
  const onSubmit = async (data: FormData) => { const res = await fetch('/api/decks', { method: 'POST', body: JSON.stringify(data) }); const json = await res.json(); if (res.ok) router.push(`/deck/${json.slug}`); };
  return <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'><h1 className='text-2xl font-bold'>Criar baralho</h1><input {...register('nome')} placeholder='Nome' className='w-full rounded border p-2'/><input {...register('slug')} onChange={() => setManualSlug(true)} placeholder='slug' className='w-full rounded border p-2'/>{errors.slug && <p>{errors.slug.message}</p>}<textarea {...register('descricao')} placeholder='Descrição' className='w-full rounded border p-2'/><input type='password' {...register('senha')} placeholder='Senha administrativa' className='w-full rounded border p-2'/><input {...register('capaUrl')} placeholder='URL da capa (ou upload no admin)' className='w-full rounded border p-2'/><select {...register('tema')} className='w-full rounded border p-2'>{themes.map((t)=><option key={t.name}>{t.name}</option>)}</select><label><input type='checkbox' {...register('permitirRepeticao')}/> Permitir repetição</label><label><input type='checkbox' {...register('categoriasAtivas')}/> Habilitar categorias</label><button disabled={isSubmitting} className='rounded bg-black px-4 py-2 text-white'>Salvar</button></form>
}
