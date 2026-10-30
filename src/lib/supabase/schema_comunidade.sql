-- ============================================================
-- COOPERATIVA ETNOBOTÂNICA NATIVARAM — ESQUEMA COMUNIDADE
-- Módulo: Hub Comunitário, Blog de Templos e Agenda Litúrgica
-- Projeto Supabase: qpgtngknrrawpaatiofe
-- Execute este script no Supabase SQL Editor:
-- https://supabase.com/dashboard/project/qpgtngknrrawpaatiofe/sql/new
-- ============================================================

-- 1. Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Perfis Públicos de Templos & Congregações
CREATE TABLE IF NOT EXISTS public.perfis_comunidade (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_liturgico TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    nome_instituicao TEXT NOT NULL,
    dirigente_responsavel TEXT NOT NULL,
    linhagem TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    bio_apresentacao TEXT NOT NULL,
    foto_perfil_url TEXT,
    foto_capa_url TEXT,
    fotos_espaco JSONB NOT NULL DEFAULT '[]'::jsonb,
    redes_sociais JSONB NOT NULL DEFAULT '{}'::jsonb,
    whatsapp_contato TEXT,
    email_contato TEXT,
    publicado BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Tabela de Publicações & Ensaios Comunitários
CREATE TABLE IF NOT EXISTS public.publicacoes_comunidade (
    id TEXT PRIMARY KEY, -- Protocolo canônico: PUB-YYYY-XXXX
    templo_codigo TEXT NOT NULL,
    templo_nome TEXT NOT NULL,
    templo_slug TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    resumo TEXT NOT NULL,
    conteudo_markdown TEXT NOT NULL,
    categoria TEXT NOT NULL,
    categoria_label TEXT NOT NULL,
    imagem_capa_url TEXT,
    fotos_galeria JSONB NOT NULL DEFAULT '[]'::jsonb,
    arquivos_anexos JSONB NOT NULL DEFAULT '[]'::jsonb,
    embeds_sociais JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'PUBLICADO' CHECK (status IN ('PUBLICADO', 'RASCUNHO', 'ARQUIVADO')),
    destaque BOOLEAN NOT NULL DEFAULT false,
    visualizacoes INT NOT NULL DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Tabela de Agenda Litúrgica de Encontros e Ritos
CREATE TABLE IF NOT EXISTS public.agenda_liturgica (
    id TEXT PRIMARY KEY, -- Protocolo: AGE-XXXX
    templo_codigo TEXT NOT NULL,
    titulo_rito TEXT NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    horario_inicio TEXT NOT NULL,
    vagas_info TEXT,
    link_inscricao TEXT,
    status TEXT NOT NULL DEFAULT 'CONFIRMADO' CHECK (status IN ('CONFIRMADO', 'CANCELADO', 'CONCLUIDO')),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_publicacoes_templo ON public.publicacoes_comunidade(templo_codigo);
CREATE INDEX IF NOT EXISTS idx_publicacoes_categoria ON public.publicacoes_comunidade(categoria);
CREATE INDEX IF NOT EXISTS idx_publicacoes_status ON public.publicacoes_comunidade(status);
CREATE INDEX IF NOT EXISTS idx_publicacoes_criado_em ON public.publicacoes_comunidade(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_perfis_slug ON public.perfis_comunidade(slug);
CREATE INDEX IF NOT EXISTS idx_agenda_templo ON public.agenda_liturgica(templo_codigo);
CREATE INDEX IF NOT EXISTS idx_agenda_data ON public.agenda_liturgica(data_evento);

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.perfis_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publicacoes_comunidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda_liturgica ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS: Leitura pública e gravação autenticada/anônima com anon key
DROP POLICY IF EXISTS "Leitura pública de perfis" ON public.perfis_comunidade;
CREATE POLICY "Leitura pública de perfis"
    ON public.perfis_comunidade FOR SELECT
    USING (publicado = true);

DROP POLICY IF EXISTS "Upsert de perfis" ON public.perfis_comunidade;
CREATE POLICY "Upsert de perfis"
    ON public.perfis_comunidade FOR ALL
    USING (true);

DROP POLICY IF EXISTS "Leitura pública de publicações" ON public.publicacoes_comunidade;
CREATE POLICY "Leitura pública de publicações"
    ON public.publicacoes_comunidade FOR SELECT
    USING (status = 'PUBLICADO');

DROP POLICY IF EXISTS "Mutação de publicações" ON public.publicacoes_comunidade;
CREATE POLICY "Mutação de publicações"
    ON public.publicacoes_comunidade FOR ALL
    USING (true);

DROP POLICY IF EXISTS "Leitura pública de agenda" ON public.agenda_liturgica;
CREATE POLICY "Leitura pública de agenda"
    ON public.agenda_liturgica FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Mutação de agenda" ON public.agenda_liturgica;
CREATE POLICY "Mutação de agenda"
    ON public.agenda_liturgica FOR ALL
    USING (true);

-- 7. Carga Semente de Templos de Referência
INSERT INTO public.perfis_comunidade (
    codigo_liturgico, slug, nome_instituicao, dirigente_responsavel, linhagem, cidade, estado, bio_apresentacao, redes_sociais, whatsapp_contato, publicado
) VALUES (
    'NAT-TEMPLO-842',
    'ceu-do-cruzeiro',
    'Templo Céu do Cruzeiro',
    'Padrinho Marcos Silva',
    'Linha do Santo Daime',
    'São Paulo',
    'SP',
    'Igreja filiada e homologada para trabalhos litúrgicos de concentração, hinários de alinhamento espiritual e missas da doutrina sob o marco CONAD 01/2010.',
    '{"instagram": "https://instagram.com/ceudocruzeiro.oficial", "youtube": "https://youtube.com/@ceudocruzeiro"}'::jsonb,
    '5511987654321',
    true
), (
    'NAT-TEMPLO-913',
    'rainha-da-floresta',
    'Fraternidade Rainha da Floresta',
    'Madre Clara Albuquerque',
    'Xamanismo Universalista',
    'Petrópolis',
    'RJ',
    'Espaço sagrado de reconexão sensorial, vigílias e ritos tradicionais da floresta na serra carioca.',
    '{"instagram": "https://instagram.com/fraternidaderainhadafloresta"}'::jsonb,
    '5521998877665',
    true
)
ON CONFLICT (codigo_liturgico) DO NOTHING;
