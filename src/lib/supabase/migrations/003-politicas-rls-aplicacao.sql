-- ============================================================
-- Cooperativa Nativaram — Migração 003
-- Habilita Políticas RLS para Operações da Aplicação
-- Permite que o servidor Next.js grave e leia solicitações de
-- homologação e dados comunitários mesmo utilizando a anon key
-- caso a SUPABASE_SERVICE_ROLE_KEY ainda não tenha sido configurada na Vercel.
-- Execute no Supabase: SQL Editor → New query → Run.
-- ============================================================

-- 1. Políticas para Solicitações de Homologação
DROP POLICY IF EXISTS "Permitir leitura de solicitacoes" ON public.solicitacoes_homologacao;
CREATE POLICY "Permitir leitura de solicitacoes"
    ON public.solicitacoes_homologacao FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir insercao de solicitacoes" ON public.solicitacoes_homologacao;
CREATE POLICY "Permitir insercao de solicitacoes"
    ON public.solicitacoes_homologacao FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualizacao de solicitacoes" ON public.solicitacoes_homologacao;
CREATE POLICY "Permitir atualizacao de solicitacoes"
    ON public.solicitacoes_homologacao FOR UPDATE
    USING (true);

-- 2. Políticas para Publicações Comunitárias
DROP POLICY IF EXISTS "Permitir leitura de publicacoes" ON public.publicacoes_comunidade;
CREATE POLICY "Permitir leitura de publicacoes"
    ON public.publicacoes_comunidade FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir insercao de publicacoes" ON public.publicacoes_comunidade;
CREATE POLICY "Permitir insercao de publicacoes"
    ON public.publicacoes_comunidade FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualizacao de publicacoes" ON public.publicacoes_comunidade;
CREATE POLICY "Permitir atualizacao de publicacoes"
    ON public.publicacoes_comunidade FOR UPDATE
    USING (true);

DROP POLICY IF EXISTS "Permitir remocao de publicacoes" ON public.publicacoes_comunidade;
CREATE POLICY "Permitir remocao de publicacoes"
    ON public.publicacoes_comunidade FOR DELETE
    USING (true);

-- 3. Políticas para Perfis Comunitários de Templos
DROP POLICY IF EXISTS "Permitir leitura de perfis" ON public.perfis_comunidade;
CREATE POLICY "Permitir leitura de perfis"
    ON public.perfis_comunidade FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir insercao de perfis" ON public.perfis_comunidade;
CREATE POLICY "Permitir insercao de perfis"
    ON public.perfis_comunidade FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualizacao de perfis" ON public.perfis_comunidade;
CREATE POLICY "Permitir atualizacao de perfis"
    ON public.perfis_comunidade FOR UPDATE
    USING (true);

-- 4. Políticas para Agenda Litúrgica
DROP POLICY IF EXISTS "Permitir leitura de agenda" ON public.agenda_liturgica;
CREATE POLICY "Permitir leitura de agenda"
    ON public.agenda_liturgica FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir insercao de agenda" ON public.agenda_liturgica;
CREATE POLICY "Permitir insercao de agenda"
    ON public.agenda_liturgica FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualizacao de agenda" ON public.agenda_liturgica;
CREATE POLICY "Permitir atualizacao de agenda"
    ON public.agenda_liturgica FOR UPDATE
    USING (true);

DROP POLICY IF EXISTS "Permitir remocao de agenda" ON public.agenda_liturgica;
CREATE POLICY "Permitir remocao de agenda"
    ON public.agenda_liturgica FOR DELETE
    USING (true);

-- Notifica o PostgREST para recarregar o cache de políticas
NOTIFY pgrst, 'reload schema';

