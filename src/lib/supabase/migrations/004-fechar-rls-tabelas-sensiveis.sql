-- ============================================================
-- Cooperativa Nativaram — Migração 004
-- Fecha as políticas RLS abertas pela migração 003 e pelos scripts
-- schema.sql / schema_comunidade.sql (USING (true) para leitura,
-- gravação e remoção com a chave pública).
--
-- Depois desta migração:
--   • Solicitações de homologação, pedidos e templos: nenhum acesso
--     pela chave pública (anon) nem por usuários logados (authenticated).
--     Só o servidor, com a SUPABASE_SERVICE_ROLE_KEY, lê e grava.
--   • Comunidade (perfis, publicações, agenda): leitura pública apenas
--     do que está publicado; gravação só pelo servidor.
--
-- ANTES DE EXECUTAR: confirme que a variável SUPABASE_SERVICE_ROLE_KEY
-- está configurada na Vercel (Settings → Environment Variables →
-- Production) e que houve um novo deploy depois disso. Sem ela, o
-- servidor cai na chave pública e as gravações passam a falhar.
--
-- Execute no Supabase: SQL Editor → New query → Run.
-- A migração pode ser executada mais de uma vez sem efeito colateral.
-- ============================================================

BEGIN;

-- 1. Garante RLS ligado nas seis tabelas da aplicação
ALTER TABLE public.solicitacoes_homologacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos_liturgicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templos_credenciados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publicacoes_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfis_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_liturgica ENABLE ROW LEVEL SECURITY;

-- 2. Remove todas as políticas existentes nessas tabelas, qualquer que
--    seja o nome (003, schema.sql e schema_comunidade.sql usam nomes diferentes)
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname, tablename
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename IN (
              'solicitacoes_homologacao',
              'pedidos_liturgicos',
              'templos_credenciados',
              'publicacoes_comunidade',
              'perfis_comunidade',
              'agenda_liturgica'
          )
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- 3. Tabelas sensíveis: retira também os privilégios de tabela dos papéis
--    públicos (defesa em profundidade além do RLS)
REVOKE ALL ON public.solicitacoes_homologacao FROM anon, authenticated;
REVOKE ALL ON public.pedidos_liturgicos FROM anon, authenticated;
REVOKE ALL ON public.templos_credenciados FROM anon, authenticated;

-- 4. Comunidade: somente leitura pública do que está publicado
REVOKE INSERT, UPDATE, DELETE ON public.publicacoes_comunidade FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.perfis_comunidade FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.agenda_liturgica FROM anon, authenticated;

CREATE POLICY "Leitura pública de publicações publicadas"
    ON public.publicacoes_comunidade FOR SELECT
    TO anon, authenticated
    USING (status = 'PUBLICADO');

CREATE POLICY "Leitura pública de perfis publicados"
    ON public.perfis_comunidade FOR SELECT
    TO anon, authenticated
    USING (publicado = true);

CREATE POLICY "Leitura pública da agenda"
    ON public.agenda_liturgica FOR SELECT
    TO anon, authenticated
    USING (true);

COMMIT;

-- ============================================================
-- Conferência (rode depois, em uma nova query):
--
-- SELECT tablename, policyname, cmd, roles, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
--
-- Esperado: apenas as 3 políticas de leitura acima, todas com cmd = SELECT.
-- solicitacoes_homologacao, pedidos_liturgicos e templos_credenciados
-- não devem aparecer.
-- ============================================================
