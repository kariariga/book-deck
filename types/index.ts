export type ThemePreset = { name: string; backgroundColor: string; textColor: string };
export type Deck = { id: string; slug: string; nome: string; descricao?: string | null; capa_url?: string | null; tema_background: string; tema_texto: string; permitir_repeticao: boolean; categorias_ativas: boolean; senha_admin_hash: string; is_public: boolean; created_at: string };
export type Card = { id: string; deck_id: string; titulo?: string | null; texto: string; categoria?: string | null; created_at: string };
