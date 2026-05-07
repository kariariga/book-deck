# Book Deck

Aplicação web para sorteio de cartas de frases para clubes do livro.

## Stack
Next.js 15 (App Router), React, TypeScript estrito, TailwindCSS, Supabase, Framer Motion, React Hook Form, Zod.

## Setup
1. `cp .env.local.example .env.local`
2. `npm install`
3. Execute `sql/schema.sql` e `sql/seeds.sql` no SQL Editor do Supabase.
4. `npm run dev`

## Variáveis de ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=https://igdigowdaxhadadqfeok.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SgBH7qCrARLFzHtWN281QA_UvU_Lqow
```

## Rotas
- `/` Home
- `/create` Criação de deck
- `/deck/[slug]` Tela pública com flip/sorteio
- `/deck/[slug]/admin` Área administrativa por senha

## Funcionalidades implementadas
- Slug automático + edição manual
- Tema visual predefinido
- Hash de senha admin com bcrypt
- Sorteio com/sem repetição
- Animação flip com Framer Motion
- Fallback de capa
- Página 404
- Schema SQL + RLS + seeds

## Deploy na Vercel
1. Conecte o repositório na Vercel.
2. Configure as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Build command: `npm run build`.
4. Output padrão Next.js.

## Próximos passos já preparados
- Endpoints para export/import JSON
- Importação CSV com preview no admin
- Persistência de sessão admin em localStorage
