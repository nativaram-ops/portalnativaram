-- ============================================================
-- Cooperativa Nativaram — Migração 006
-- Desfaz a migração 005 (obsoleta), que criou políticas de DELETE
-- abertas a todos os papéis. Seguro rodar mesmo que a 005 nunca tenha
-- sido executada (IF EXISTS).
--
-- O Conselho continua apagando cadastros pelo portal: as rotas de
-- servidor usam a service role, que ignora o RLS (ADR-008).
--
-- Execute no Supabase: SQL Editor → New query → Run.
-- ============================================================

DROP POLICY IF EXISTS "Permitir remocao de solicitacoes" ON public.solicitacoes_homologacao;
DROP POLICY IF EXISTS "Permitir remocao de perfis" ON public.perfis_comunidade;
DROP POLICY IF EXISTS "Permitir remocao de templos" ON public.templos_credenciados;

NOTIFY pgrst, 'reload schema';

-- Conferência: nenhuma linha com cmd = 'DELETE' deve aparecer.
-- SELECT tablename, policyname, cmd, roles FROM pg_policies
-- WHERE schemaname = 'public' ORDER BY tablename, policyname;
