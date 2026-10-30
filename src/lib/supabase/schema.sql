-- ============================================================
-- COOPERATIVA ETNOBOTÂNICA NATIVARAM — ESQUEMA SUPABASE
-- Projeto: qpgtngknrrawpaatiofe
-- Execute este script no Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qpgtngknrrawpaatiofe/sql/new
-- ============================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Templos & Congregações Credenciadas
CREATE TABLE IF NOT EXISTS public.templos_credenciados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_liturgico TEXT UNIQUE NOT NULL,
    nome_instituicao TEXT NOT NULL,
    dirigente_responsavel TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    cnpj TEXT,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    papel TEXT NOT NULL DEFAULT 'DIRIGENTE' CHECK (papel IN ('DIRIGENTE', 'ADMIN')),
    status_homologacao TEXT NOT NULL DEFAULT 'HOMOLOGADO' CHECK (status_homologacao IN ('HOMOLOGADO', 'EM_ANALISE', 'PENDENTE', 'SUSPENSO')),
    conad_aprovado BOOLEAN NOT NULL DEFAULT true,
    data_aprovacao TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Tabela de Solicitações e Pedidos Litúrgicos
CREATE TABLE IF NOT EXISTS public.pedidos_liturgicos (
    id TEXT PRIMARY KEY, -- Protocolo canônico: SOL-YYYY-XXXX
    templo_id TEXT NOT NULL,
    templo_nome TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    dirigente_nome TEXT NOT NULL,
    dirigente_telefone TEXT NOT NULL,
    dirigente_email TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    itens JSONB NOT NULL DEFAULT '[]'::jsonb,
    rateio_total NUMERIC NOT NULL DEFAULT 0,
    data_cerimonia_pretendida TEXT NOT NULL,
    mensagem_intencao TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'SOLICITADO' CHECK (status IN (
        'SOLICITADO',
        'HOMOLOGADO_CONSELHO',
        'EM_FEITIO_ACRE',
        'AGUARDANDO_DESPACHO',
        'EM_TRANSITO_REFRIGERADO',
        'ENTREGUE_CONSAGRADO',
        'CANCELADO_AJUSTE'
    )),
    lote_vinculado TEXT,
    codigo_rastreio TEXT,
    previsao_entrega TEXT,
    observacoes_internas TEXT,
    historico JSONB NOT NULL DEFAULT '[]'::jsonb,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3b. Tabela de Solicitações de Homologação e Credenciamento
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

-- 3c. Tabelas do Hub Comunitário (Publicações, Perfis e Agenda Litúrgica)
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

-- 4. Índices para Otimização de Consultas
CREATE INDEX IF NOT EXISTS idx_pedidos_templo ON public.pedidos_liturgicos(templo_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON public.pedidos_liturgicos(status);
CREATE INDEX IF NOT EXISTS idx_pedidos_criado_em ON public.pedidos_liturgicos(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_templos_codigo ON public.templos_credenciados(codigo_liturgico);

-- 5. Função para Atualizar automaticamente o atualizado_em
CREATE OR REPLACE FUNCTION public.set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_pedidos_atualizado_em ON public.pedidos_liturgicos;
CREATE TRIGGER trigger_pedidos_atualizado_em
    BEFORE UPDATE ON public.pedidos_liturgicos
    FOR EACH ROW
    EXECUTE FUNCTION public.set_atualizado_em();

DROP TRIGGER IF EXISTS trigger_templos_atualizado_em ON public.templos_credenciados;
CREATE TRIGGER trigger_templos_atualizado_em
    BEFORE UPDATE ON public.templos_credenciados
    FOR EACH ROW
    EXECUTE FUNCTION public.set_atualizado_em();

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.templos_credenciados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos_liturgicos ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS permissivas para o acesso da aplicação (usando Anon Key)
CREATE POLICY "Permitir leitura pública de templos homologados"
    ON public.templos_credenciados FOR SELECT
    USING (true);

CREATE POLICY "Permitir leitura de pedidos"
    ON public.pedidos_liturgicos FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção de novos pedidos"
    ON public.pedidos_liturgicos FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir atualização de pedidos"
    ON public.pedidos_liturgicos FOR UPDATE
    USING (true);

-- 7. Carga Inicial de Templos (Seeds Canônicos)
INSERT INTO public.templos_credenciados (codigo_liturgico, nome_instituicao, dirigente_responsavel, email, telefone, cnpj, cidade, estado, papel, status_homologacao, conad_aprovado, data_aprovacao)
VALUES 
    ('NAT-TEMPLO-842', 'Templo Céu do Cruzeiro', 'Padrinho Marcos Silva', 'marcos@ceudocruzeiro.org.br', '(11) 98765-4321', '34.567.890/0001-12', 'São Paulo', 'SP', 'DIRIGENTE', 'HOMOLOGADO', true, '14/02/2024'),
    ('NAT-TEMPLO-319', 'Fraternidade Rainha da Floresta', 'Madrinha Clara Luz', 'clara@rainhadafloresta.org.br', '(21) 99876-5432', '45.678.901/0001-23', 'Petrópolis', 'RJ', 'DIRIGENTE', 'HOMOLOGADO', true, '20/05/2024'),
    ('NAT-TEMPLO-105', 'Centro Eclético Luz Divina', 'Padrinho Sebastião Souza', 'sebastiao@luzdivina.org.br', '(68) 99123-4567', '56.789.012/0001-34', 'Cruzeiro do Sul', 'AC', 'DIRIGENTE', 'HOMOLOGADO', true, '10/01/2023'),
    ('NAT-TEMPLO-512', 'Associação Espiritual Estrela Guia', 'Dirigente Rafael Mendes', 'contato@estrelaguia.org.br', '(31) 98456-7890', '67.890.123/0001-45', 'Belo Horizonte', 'MG', 'DIRIGENTE', 'EM_ANALISE', false, NULL)
ON CONFLICT (codigo_liturgico) DO NOTHING;
