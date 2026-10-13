---
tipo: adr
status: pronto
prioridade: alta
ferramenta_principal: Next.js / Supabase / Canvas WebP
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Decisão de Arquitetura
---

# ADR-007: Hub Comunitário, Blog de Templos e Agenda Litúrgica a Custo Zero

## Contexto
O portal institucional da Cooperativa Nativaram contava com a aba `/estudos` dedicada exclusivamente a laudos HPLC, dossiês acadêmicos e cadernos de IA do Google NotebookLM.
Havia a necessidade de transformar esse espaço em um canal vivo de partilha, onde cada congregação ou templo credenciado pudesse:
1. Publicar ensaios doutrinários, poesias sacras e relatos de consagração litúrgica.
2. Incorporar postagens de outras redes (Instagram, YouTube, Spotify) sem custo de armazenamento.
3. Exibir fotografias reais de seus espaços sagrados e altares.
4. Manter uma agenda pública de ritos e encontros espirituais aberta a qualquer visitante do portal.
5. Manter um perfil institucional público (`/estudos/comunidade/[slug]`) com canais seguros de triagem e acolhimento via WhatsApp.

Essa funcionalidade precisava rodar **100% no Plano Grátis (Free Tier)** do Supabase e Vercel, com otimização radical para smartphones (mobile-first) e estrita observância da Resolução CONAD nº 01/2010 e do dicionário léxico litúrgico.

## Decisão

### 1. Estratégia de Custo Zero Perpétuo (Free Tier)
- **Banco de Dados Relacional:** Dados textuais, JSONB de anexos e metadados persistidos no Supabase PostgreSQL (limite de 500 MB comporta mais de 100.000 publicações e eventos).
- **Compressão de Imagens Client-Side (WebP):** Criado utilitário nativo em Canvas (`src/lib/utils/image-compressor.ts`) que redimensiona fotos para 1600px e comprime em WebP com qualidade 82%. Fotos de smartphones de 8–15 MB caem para ~150–250 KB no próprio navegador antes do envio, preservando o limite de 1 GB do Supabase Storage.
- **Embeds Sociais com Zero Consumo de Banda:** Incorporação de links do Instagram, YouTube e Spotify salva apenas URLs (50 bytes), executando a mídia diretamente dos servidores das redes de origem.
- **Cache ISR e Estático na Vercel:** Geração estática das listagens e perfis públicos com revalidação, poupando requisições ao Supabase.

### 2. Otimização Mobile de Primeira Classe
- Alvos de toque (touch targets) com altura mínima de 44px.
- Fitas de categorias e sub-abas com rolagem horizontal elástica (`touch-scroll-x`).
- Inputs e textareas calibrados com tamanho mínimo para eliminar auto-zoom no iOS Safari.
- Grid responsivo de 1 coluna em telas menores e visualizadores com safe area.

### 3. Linter Léxico de Compliance CONAD/ANVISA em Tempo Real
- Integrado validador em `src/lib/validators/comunidade.ts` que escaneia o texto enquanto o dirigente redige.
- Alerta instantâneo para termos proibidos (`cura`, `medicina`, `remédio`, `venda`, `dose`, etc.) com sugestão canônica de substituição (`reequilíbrio vital`, `sacramento`, `rateio fraterno`) aplicável em um clique.
- Selo obrigatório de salvaguarda litúrgica CONAD 01/2010 no rodapé de cada postagem e encontro da agenda.

### 4. Preservação do Acervo Científico
- A aba `/estudos` foi estruturada com alternador mestre:
  - **🌿 Mural da Comunidade & Vozes dos Templos:** Feed aberto, busca em tempo real, cards editoriais, vitrine de congregações e modal de leitura completa.
  - **📚 Dossiês Científicos da Floresta:** Preserva integralmente os laudos HPLC de Ayahuasca, fitoquímica de rapés, compêndios de Sananga, 4 cadernos Google NotebookLM e a tabela com 23 PDFs para download.

## Consequências
- ✅ **Custo Zero Real:** Sem necessidade de planos pagos ou expansão de infraestrutura.
- ✅ **Comunidade Ativa:** Templos homologados ganham voz institucional e visibilidade pública.
- ✅ **Blindagem Jurídica:** Linter previne que dirigentes desavisados cometam infrações regulatórias.
- ✅ **Performance Mobile:** 100% responsivo, rápido e suave em smartphones.
- ✅ **Resiliência:** 26/26 testes automatizados aprovados e build de produção com 39 rotas compiladas com sucesso.

---

## Relações

### Depende de
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
- [[Dicionario-Semantico-Nativaram]]
- [[Blindagem-Juridica-e-Sanitaria]]

### Alimenta / impulsiona
- [[Roadmap-e-Componentes-do-Site]]
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Indice-de-Recuperacao-Rapida]]
