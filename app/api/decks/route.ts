import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { themes } from '@/lib/themes';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const tema = themes.find((t) => t.name === body.tema) ?? themes[0];
  const hash = await bcrypt.hash(body.senha, 10);
  const { data, error } = await sb.from('decks').insert({ slug: body.slug, nome: body.nome, descricao: body.descricao, capa_url: body.capaUrl, tema_background: tema.backgroundColor, tema_texto: tema.textColor, permitir_repeticao: body.permitirRepeticao, categorias_ativas: body.categoriasAtivas, senha_admin_hash: hash, is_public: true }).select('slug').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
