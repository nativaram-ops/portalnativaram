-- ============================================================
-- Cooperativa Nativaram — Migração 007
-- Cria a tabela pública do Observatório Etnobotânico (`anexos_academicos`)
-- com Row Level Security habilitada (ADR-008 e ADR-013):
--   • Leitura pública apenas (`FOR SELECT TO anon, authenticated`).
--   • Gravação e exclusão exclusivas pelo servidor (`SUPABASE_SERVICE_ROLE_KEY`).
--
-- Execute no Supabase: SQL Editor → New query → Run.
-- Idempotente: segura para múltiplas execuções.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.anexos_academicos (
    id TEXT PRIMARY KEY,
    doi TEXT NOT NULL,
    titulo TEXT NOT NULL,
    autores TEXT NOT NULL,
    ano TEXT NOT NULL,
    periodico TEXT NOT NULL,
    url_origem TEXT NOT NULL,
    pdf_aberto_url TEXT,
    eixo_tematico TEXT NOT NULL CHECK (
        eixo_tematico IN (
            'ayahuasca',
            'etnobotanica_jurua',
            'seguranca_imao',
            'direito_conad',
            'agrofloresta'
        )
    ),
    sintese_linguagem_clara TEXT NOT NULL,
    nota_dirigente TEXT,
    status_revisao TEXT NOT NULL DEFAULT 'REVISAO_EXTERNA_PARES',
    adicionado_por_codigo TEXT NOT NULL,
    adicionado_por_nome TEXT NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS anexos_academicos_doi_lower_idx
    ON public.anexos_academicos (lower(doi));

ALTER TABLE public.anexos_academicos ENABLE ROW LEVEL SECURITY;

REVOKE INSERT, UPDATE, DELETE ON public.anexos_academicos FROM anon, authenticated;

DROP POLICY IF EXISTS "Leitura pública de anexos acadêmicos" ON public.anexos_academicos;

CREATE POLICY "Leitura pública de anexos acadêmicos"
    ON public.anexos_academicos FOR SELECT
    TO anon, authenticated
    USING (true);

NOTIFY pgrst, 'reload schema';
