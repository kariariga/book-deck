import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const { senha } = await req.json();
  const { data: deck } = await sb.from('decks').select('id').eq('slug', slug).single();
  if (!deck) return NextResponse.json({}, { status: 404 });
  const { data: secret } = await sb.from('deck_admin_secrets').select('senha_admin_hash').eq('deck_id', deck.id).single();
  if (!secret) return NextResponse.json({}, { status: 404 });
  return (await bcrypt.compare(senha, secret.senha_admin_hash)) ? NextResponse.json({ ok: true }) : NextResponse.json({}, { status: 401 });
}
