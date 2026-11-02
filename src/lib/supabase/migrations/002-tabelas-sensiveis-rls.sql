-- ============================================================
-- Cooperativa Nativaram — Migração 002
-- Cria as tabelas que faltavam no Supabase (cadastros, comunidade)
-- e protege com RLS: sem políticas públicas, só a service role
-- (variável SUPABASE_SERVICE_ROLE_KEY no servidor) lê e grava.
-- Execute no Supabase: SQL Editor → New query → Run.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.solicitacoes_homologacao (
    id TEXT PRIMARY KEY,
    tipo TEXT NOT NULL DEFAULT 'INSTITUICAO_FORMAL' CHECK (tipo IN ('INSTITUICAO_FORMAL', 'GRUPO_INFORMAL')),
    nome_entidade TEXT NOT NULL,
    nome_responsavel TEXT NOT NULL,
    telefone TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    cidade TEXT NOT NULL DEFAULT '',
    estado TEXT NOT NULL DEFAULT '',
    cnpj TEXT,
    linhagem TEXT NOT NULL DEFAULT '',
    graduacao TEXT NOT NULL DEFAULT '',
    volume_estimado TEXT NOT NULL DEFAULT '',
    intencao TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'PENDENTE_LIBERACAO' CHECK (status IN ('PENDENTE_LIBERACAO', 'HOMOLOGADO', 'RECUSADO')),
    login_gerado TEXT,
    senha_gerada TEXT,
    data_envio TEXT NOT NULL DEFAULT '',
    data_homologacao TEXT,
    observacoes_conselho TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.publicacoes_comunidade (
    id TEXT PRIMARY KEY,
    templo_codigo TEXT NOT NULL,
    templo_nome TEXT NOT NULL,
    templo_slug TEXT NOT NULL,
    slug TEXT NOT NULL,
    titulo TEXT NOT NULL,
    resumo TEXT NOT NULL DEFAULT '',
    conteudo_markdown TEXT NOT NULL DEFAULT '',
    categoria TEXT NOT NULL,
    categoria_label TEXT NOT NULL DEFAULT 'Publicação Litúrgica',
    imagem_capa_url TEXT,
    fotos_galeria JSONB NOT NULL DEFAULT '[]'::jsonb,
    arquivos_anexos JSONB NOT NULL DEFAULT '[]'::jsonb,
    embeds_sociais JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'PUBLICADO' CHECK (status IN ('PUBLICADO', 'RASCUNHO', 'ARQUIVADO')),
    destaque BOOLEAN NOT NULL DEFAULT false,
    visualizacoes INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT NOT NULL DEFAULT '',
    atualizado_em TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.perfis_comunidade (
    codigo_liturgico TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    nome_instituicao TEXT NOT NULL,
    dirigente_responsavel TEXT NOT NULL,
    linhagem TEXT NOT NULL DEFAULT '',
    cidade TEXT NOT NULL DEFAULT '',
    estado TEXT NOT NULL DEFAULT '',
    bio_apresentacao TEXT NOT NULL DEFAULT '',
    foto_perfil_url TEXT,
    foto_capa_url TEXT,
    fotos_espaco JSONB NOT NULL DEFAULT '[]'::jsonb,
    redes_sociais JSONB NOT NULL DEFAULT '{}'::jsonb,
    whatsapp_contato TEXT,
    email_contato TEXT,
    publicado BOOLEAN NOT NULL DEFAULT true,
    criado_em TEXT NOT NULL DEFAULT '',
    atualizado_em TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.agenda_liturgica (
    id TEXT PRIMARY KEY,
    templo_codigo TEXT NOT NULL,
    titulo_rito TEXT NOT NULL,
    descricao TEXT,
    data_evento TEXT NOT NULL,
    horario_inicio TEXT NOT NULL,
    vagas_info TEXT,
    link_inscricao TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMADO' CHECK (status IN ('CONFIRMADO', 'CANCELADO', 'CONCLUIDO'))
);

-- RLS ligado e nenhuma política para anon/authenticated:
-- a chave pública (embutida no navegador) não enxerga nem grava nada aqui.
ALTER TABLE public.solicitacoes_homologacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publicacoes_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfis_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_liturgica ENABLE ROW LEVEL SECURITY;

NOTIFY pgrst, 'reload schema';

