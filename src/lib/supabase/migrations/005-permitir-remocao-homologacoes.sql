-- ============================================================
-- ⚠️ OBSOLETA — NÃO EXECUTAR. As políticas abaixo valem para todos os
-- papéis (sem TO), inclusive a chave pública (anon), e permitiriam apagar
-- solicitações, templos e perfis. O servidor usa a service role, que já
-- ignora o RLS, então o botão de excluir não depende delas.
-- Se esta migração já foi rodada, execute a 006 para desfazê-la.
-- Mantida apenas como histórico.
-- ============================================================
-- Cooperativa Nativaram — Migração 005
-- Habilita políticas de remoção (DELETE) e recusa no Supabase
-- para permitir a exclusão de instituições, solicitações de homologação
-- e perfis comunitários pelo Conselho Gestor.
--
-- Execute no Supabase: SQL Editor → New query → Run.
-- ============================================================

-- 1. Políticas de Remoção para Solicitações de Homologação
DROP POLICY IF EXISTS "Permitir remocao de solicitacoes" ON public.solicitacoes_homologacao;
CREATE POLICY "Permitir remocao de solicitacoes"
    ON public.solicitacoes_homologacao FOR DELETE
    USING (true);

-- 2. Políticas de Remoção para Perfis Comunitários de Templos
DROP POLICY IF EXISTS "Permitir remocao de perfis" ON public.perfis_comunidade;
CREATE POLICY "Permitir remocao de perfis"
    ON public.perfis_comunidade FOR DELETE
    USING (true);

-- 3. Políticas de Remoção para Templos Credenciados
DROP POLICY IF EXISTS "Permitir remocao de templos" ON public.templos_credenciados;
CREATE POLICY "Permitir remocao de templos"
    ON public.templos_credenciados FOR DELETE
    USING (true);

-- Notifica o PostgREST para recarregar o cache de esquemas
NOTIFY pgrst, 'reload schema';

