create extension if not exists pgcrypto;

create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  descricao text,
  capa_url text,
  tema_background text not null,
  tema_texto text not null,
  permitir_repeticao boolean not null default false,
  categorias_ativas boolean not null default true,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.deck_admin_secrets (
  deck_id uuid primary key references public.decks(id) on delete cascade,
  senha_admin_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  titulo text,
  texto text not null,
  categoria text,
  created_at timestamptz not null default now()
);

create index if not exists idx_cards_deck_id on public.cards(deck_id);
create index if not exists idx_decks_slug on public.decks(slug);

alter table public.decks enable row level security;
alter table public.cards enable row level security;
alter table public.deck_admin_secrets enable row level security;

create policy "public read decks" on public.decks for select using (is_public = true);
create policy "public insert decks" on public.decks for insert with check (is_public = true);
create policy "public read cards from public decks" on public.cards for select using (exists(select 1 from public.decks d where d.id = cards.deck_id and d.is_public = true));
create policy "public insert deck admin secrets" on public.deck_admin_secrets for insert with check (exists(select 1 from public.decks d where d.id = deck_admin_secrets.deck_id));

-- Escrita deve ocorrer via API do Next validando senha admin.
-- Opcionalmente, criar function SECURITY DEFINER para mutações validadas por senha.
