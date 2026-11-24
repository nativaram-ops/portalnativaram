-- ============================================================
-- 008: fecha a leitura pública (chave anon) das tabelas de comunidade
-- Plano 013 / ADR-016 (24/11/2026): o site não publica agenda de cerimônias,
-- perfis de templos nem contatos de dirigentes.
--
-- Por quê: a migração 004 deixou SELECT para anon/authenticated em
-- agenda_liturgica (USING true), perfis_comunidade (com whatsapp_contato e
-- email_contato) e publicacoes_comunidade. A chave anon é pública (está no
-- bundle do site), então qualquer pessoa lia essas tabelas direto pela API REST
-- do Supabase, contornando o bloqueio das rotas /api/comunidade/*.
--
-- O servidor usa SUPABASE_SERVICE_ROLE_KEY, que ignora o RLS: o painel do
-- Conselho continua funcionando.
--
-- Rodar no SQL Editor do Supabase, depois da 004 (e da 006).
-- ============================================================

BEGIN;

DROP POLICY IF EXISTS "Leitura pública da agenda" ON public.agenda_liturgica;
DROP POLICY IF EXISTS "Leitura pública de perfis publicados" ON public.perfis_comunidade;
DROP POLICY IF EXISTS "Leitura pública de publicações publicadas" ON public.publicacoes_comunidade;

REVOKE SELECT ON public.agenda_liturgica FROM anon, authenticated;
REVOKE SELECT ON public.perfis_comunidade FROM anon, authenticated;
REVOKE SELECT ON public.publicacoes_comunidade FROM anon, authenticated;

COMMIT;

-- ============================================================
-- Conferência (rode depois, em uma nova query):
--
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE schemaname = 'public'
--   AND tablename IN ('agenda_liturgica', 'perfis_comunidade', 'publicacoes_comunidade');
--
-- Esperado: nenhuma linha.
-- ============================================================
