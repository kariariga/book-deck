import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const { senha } = await req.json();
  const { data } = await sb.from('decks').select('senha_admin_hash').eq('slug', slug).single();
  if (!data) return NextResponse.json({}, { status: 404 });
  return (await bcrypt.compare(senha, data.senha_admin_hash)) ? NextResponse.json({ ok: true }) : NextResponse.json({}, { status: 401 });
}
