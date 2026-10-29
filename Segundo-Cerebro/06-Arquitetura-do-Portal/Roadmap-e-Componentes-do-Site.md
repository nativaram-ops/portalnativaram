---
tipo: arquitetura
status: pronto
prioridade: alta
ferramenta_principal: Next.js
para_quem_e: Uso próprio
categoria: Arquitetura Técnica
---

# 💻 Roadmap e Componentes do Portal Nativaram

O portal da Cooperativa Nativaram Brasil é uma plataforma institucional construída com **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS** e design system solene baseado na identidade etnobotânica da floresta.

---

## 🎨 Design Tokens Oficiais
- **Floresta Noturna:** `#16281E` (backgrounds nobres e cabeçalhos solenes)
- **Âmbar Solar:** `#D4A359` (destaques, bordas sacras e botões de intenção)
- **Areia Ancestral:** `#F8F6F0` (texturas nobres claras)
- **Pedra Escura:** `#1C1917` (cards de leitura e bases analíticas)
- **Tipografia:** `Cinzel` (títulos majestosos) e `Inter` (corpo de texto límpido e legível).

---

## 🗺️ Mapa de Páginas e Módulos Técnicos

```
src/
├── app/
│   ├── page.tsx (Home: Gênese, Alquimia, 4 Graduações HPLC e Gollog Express)
│   ├── portal-dirigente/ (Portal do Dirigente Homologado e Painel Central ADM)
│   │   └── page.tsx
│   ├── api/
│   │   └── pedidos/
│   │       ├── route.ts (GET com filtros e métricas, POST com persistência e WhatsApp)
│   │       └── [id]/route.ts (GET, PATCH de atualização de status e DELETE)
│   ├── institucional/ (Manifesto Institucional, Doutrina e FAQ)
│   ├── feitio/ (Casa de Feitio, Vigília, Rastreabilidade e Manejo)
│   ├── medicinas/ (Compêndio Etnobotânico: Ciência Biogeoquímica, pH 9.75-10.2, Sananga e Artefatos)
│   ├── medicinas/[slug]/ (Ficha Individual Fitoquímica, Benefícios e Rateio Cooperativo)
│   ├── credenciamento/ (Ficha Institucional, Termo Deontológico e Triagem ISRS)
│   ├── reconhecimento/ (Acolhimento Fraterno para Grupos em Formação e Rezadores)
│   ├── compliance/ (Blindagem Jurídica ANVISA 2025 e Resoluções CONAD)
│   ├── estudos/ (Compêndio de Ensaios Científicos e Artigos Etnofarmacológicos)
│   └── projetos-de-luz/ (Regeneração Social, Apoio Comunitário e Agrofloresta)
├── components/
│   ├── home/ (Componentes profundos da Home)
│   │   ├── HomeHero.tsx (Hero principal, selo de Cruzeiro do Sul e CTAs)
│   │   ├── HomePilaresBar.tsx (Barra dos 4 pilares: Feitio, Alquimia, Gollog, CONAD)
│   │   ├── HomeNotaSacralidade.tsx (Nota solene de sacralidade e compromisso)
│   │   ├── HomePrincipiosFeitio.tsx (3 pilares doutrinários e proporção 60/40)
│   │   ├── HomePonteEtica.tsx (4 etapas da ponte ética e infográfico Gollog)
│   │   ├── HomeGraduacoes.tsx (Showcase 4 graduações canônicas + Mel/Gel)
│   │   ├── HomeLogisticaGollog.tsx (Logística aérea expressa e compliance)
│   │   ├── HomeDepoimentosCredenciamento.tsx (Vozes de guardiões e timeline)
│   │   ├── HomeFaqSection.tsx (FAQ doutrinário e teaser portal dirigente)
│   │   └── index.ts (Barrel export unificado)
│   ├── portal-dirigente/
│   │   ├── FormSolicitacaoPedido.tsx (Catálogo de sacramentos, rateio, mensagem e WhatsApp)
│   │   ├── AcompanhamentoPedidos.tsx (Timeline 5 fases, rastreio, lotes e re-order)
│   │   └── AdminGestaoPedidos.tsx (Métricas vivas, gestão de status, lotes e avisos WhatsApp)
│   ├── forms/
│   │   ├── CredenciamentoForm.tsx (Anamnese Institucional com CNPJ/Ata)
│   │   └── ReconhecimentoForm.tsx (Acolhimento Fraterno de Grupos Informais e Rezadores)
│   ├── layout/PortalDirigenteClient.tsx (Orquestrador inteligente com autenticação por perfis)
│   ├── manifesto/ManifestoLanding.tsx (Gênese e Etnociência Horizontal)
│   └── ui/ (Compound Components: Card, Badge, Section, PageHero, AnimateOnScroll, Input, Logo)
├── data/
│   ├── graduacoes.ts (Perfil HPLC Tucunacá: Harmina, Harmalina, THH, Porções e Rateios)
│   ├── sacramentos.ts (10 Rapés Tradicionais, Sananga 10ml, Artefatos e Compliance)
│   ├── medicinas.ts (15 Rapés Detalhados, Chakras, Famílias e Alquimias)
│   └── estudos.ts (Pesquisas Acadêmicas indexadas)
├── types/
│   └── pedido.ts (Tipagem estrita de PedidoLiturgico, ItemPedido, StatusPedido e Metricas)
├── lib/
│   ├── db/pedidos.ts (Persistência atômica em data/pedidos.json e gerador de protocolos)
│   ├── validators/pedido.ts (Schemas Zod de pedidos e atualizações)
│   ├── validators/credenciamento.ts (Schema Zod com Termo de Segurança Integrativa)
│   ├── validators/reconhecimento.ts (Schema Zod de Acolhimento Fraterno sem CNPJ)
│   ├── credenciamento/engine.ts (Motor de Dossiê e Sanitização WhatsApp Institucional)
│   └── reconhecimento/engine.ts (Motor de Protocolo REC- e Sanitização WhatsApp de Acolhimento)
└── data/
    ├── pedidos.json (Base de dados JSON atômica das solicitações litúrgicas)
    └── reconhecimentos.json (Base atômica de cadastros de grupos em formação)
```

---

## 🛡️ Regras de Engenharia & Blindagem Executada
1. **Zero E-commerce / Purga Semântica:** Todos os termos comerciais ("loja", "preço", "comprar", "produto") foram eliminados. Todas as chamadas operam por cota de rateio cooperativo e credenciamento de templos.
2. **Motor de Solicitação Litúrgica & WhatsApp-First:** O dirigente preenche o formulário ágil, os dados são persistidos atomicamente em `data/pedidos.json` e uma mensagem formal completa é gerada para envio via WhatsApp do Conselho Gestor.
3. **Acompanhamento de Custódia em 5 Fases:** O portal rastreia cada sacramento desde a homologação da ata até o despacho refrigerado e a consagração no templo.
4. **Painel Operacional do Conselho Gestor (ADM):** Permite vincular lotes do Acre (`AC-2026-XX`), rastreios da transportadora aérea (`NTV-...`) e notificar o dirigente com 1 clique no WhatsApp.
5. **Motor de Triagem Anamnese & Washout ISRS:** Validação mandatória de 5 semanas de washout para antidepressivos ISRS/ISRN.
6. **Ciência Biogeoquímica nos Rapés:** Tamponamento alcalino (pH 9,75 a 10,2) para absorção em base livre e calcinação purista (>250°C) que extingue alcaloides triptamínicos, garantindo ausência de ação alucinógena.
7. **Sananga Segura:** Intervalo obrigatório de 24h para lentes de contato, contraindicação pós-cirúrgica e cadeia de frio a 4°C.
8. **Governança de Ambiente Local no Windows:** Execução de scripts via `cmd.exe /c`, liberação da porta 3000 contra processos órfãos (`taskkill /PID <PID> /F`) e compilação sem falhas.
9. **Purismo Botânico, Clarificação em Menores Micras & Recusa de Anayahuascas:** O portal documenta formalmente o feitio com filtragem fina em panos de menores micras (sem resíduos sólidos), detalha as espécies de cipós (*B. caapi*, *B. muricata*, *Tetrapterys*), a folha Chacrona (*P. viridis* vs. *P. carthagenensis* e exclusão de Chaliponga) e fundamenta a recusa categórica a "Anayahuascas" (Arruda Síria / *Peganum harmala*, Jurema oral e Pharmahuasca) por riscos de neurotoxicidade da harmalina, taninos cáusticos e ausência de salvaguarda CONAD.
10. **Curadoria de Acervo Real & Expurgamento de Figuras de IA:** Varredura completa nos arquivos locais do usuário identificou acervo documental autêntico de Cruzeiro do Sul/AC. Remoção de todas as fotos de IA com personagens humanos na Galeria do Feitio, substituindo-as por fotografias reais de campo (folhas de Chacrona reluzentes sobre o leito de cipó no caldeirão, lianas de cipó empilhadas no barracão tradicional, caldeirões fumegantes na mata e vigília noturna). Catalogação dos ativos oficiais encontrados (banners oficiais de Rapé e Sananga, Kuripes entalhados à mão e frascos de Tsunu 25g) prontos para refinamento das demais páginas do portal.
11. **Refinamento Ergonômico do Header PC & Distinção Institucional de Marcas:** Reestruturação do cabeçalho de navegação para computadores e notebooks (eliminando o encavalamento de textos através de `whitespace-nowrap`, adaptação responsiva elástica de labels como "Projetos de Luz" e "Portal do Dirigente", espaçamentos fluidos e content container ampliado até 1536px). Ampliação do medalhão solar da Logo (de 52px para 58px com aura âmbar suave) trazendo maior imponência visual e nitidez aos grafismos solares. Fixação estrita da identidade institucional: este portal pertence exclusivamente à **Cooperativa Nativaram** (salvaguarda litúrgica sem fins lucrativos), enquanto "Nativaram Brasil" é a denominação da loja comercial externa.
12. **Transparência de Envase & Fotografia Real de Lotes:** Na aba Projetos de Luz (`/projetos-de-luz`), alinhamento da narrativa com a realidade logística da floresta amazônica: esclarecimento honesto de que garrafas de vidro são inviabilizadas pelo alto custo, risco de quebra e pela impossibilidade de logística reversa de volta ao interior do Acre. O sacramento da Ayahuasca é envasado com máxima higiene e assepsia exclusivamente em garrafas PET 100% virgens e novas de padrão alimentício com lacres invioláveis. Substituição da antiga imagem de IA (frascos farmacêuticos com condensadores químicos) por fotografia real de campo do lote autêntico de garrafas de Ayahuasca produzidas em Cruzeiro do Sul/AC sobre o altar rústico com folhas de Chacrona.
13. **Matriz Oficial de Rateio Solidário (40/40/10/10):** Calibração exata das quatro cotas de rateio cooperativo na aba Projetos de Luz: 40% para insumos, alimentação e lenha autorizada; 40% para remuneração justa e digna das famílias parceiras no Acre; 10% para logística e embalagens virgens higienizadas; e 10% para o fundo social e consolidação da Ecovila agroflorestal.
14. **Curadoria do Vídeo do Feitio & Silenciamento Global dos Vídeos:** Correção definitiva do vídeo na página de Feitio (`/feitio`): exibição autêntica do borbulhar da Ayahuasca no caldeirão (`WhatsApp Video 2026-09-06 at 10.00.20.mp4`, onde o feitor examina com a concha o sacramento fervente entre as folhas de chacrona e cipó). Desativação mandatória e total de áudio através da remoção física dos canais de áudio via FFmpeg (`-an`, zero streams de áudio) em todos os 22 arquivos MP4 do projeto, reforçado por `muted`, `defaultMuted`, `autoPlay`, `playsInline` e `ref` callback no player HTML5. Extração de cartazes de alta nitidez dos próprios vídeos (`feitio-poster-caldeirao-borbulhando.jpg`) para evitar qualquer tela preta ou inconsistência visual.
15. **Reformulação da Galeria de Sacramentos (`/medicinas`):** Implantação de catálogo imersivo e modular (`MedicinasCatalogClient.tsx`) enriquecido com fotografias reais de alta resolução para toda a linha de 15 Rapés Tradicionais, frascos de 25g (para templos e altares) e frascos de 15g (para práticas meditativas individuais), resinas de defumação 50g (Olíbano, Breu Branco, Palo Santo), Sananga Ancestral refrigerada e artefatos sagrados (9 modelos de Kuripe entalhados à mão e Kits litúrgicos de sinergia).
16. **Modernização de Design com o Novo Harness de Elite (`F. Craft, Design System & Anti-Slop`):** Ativação combinada de `od-master-design`, `od-taste-skill`, `od-emil-design-eng`, `od-redesign`, `od-review-animations` e `od-brandkit`.
    - **Fundação & Tokens Globais (`globals.css`):** Unificação da classe `.btn-primary` com o gradiente solar `.btn-ambar`, restaurando o acabamento dourado em todos os CTAs do portal; erradicação de `transition: all` por transições pontuais de GPU (`transform`, `border-color`, `box-shadow`, `opacity`); introdução de estados táteis `:active` com microescala (`scale(0.98)`) e brilho (`brightness(0.95)`); e remoção de animações contínuas intrusivas (`glow-emerald-pulse`).
    - **Navegação Joalheria (`Navbar.tsx`):** Vidro escuro nobre com realce interno duplo (`inset 0 1px 0 0 rgba(212,163,89,0.15)`), indicador luminoso de página ativa com halo solar e botões táteis `btn-press`.
    - **Hero Resiliente (`HomeHero.tsx`):** Viewport mobile estabilizado com `dvh` (eliminando saltos de barra de endereços); tipografia display monumental com `text-wrap: balance` e kerning display.
    - **Anti-Slop Editorial no Feitio (`HomePrincipiosFeitio.tsx`):** Quebra do template simétrico genérico de IA ("3 caixas iguais em linha") para um layout editorial hierárquico: Pilar I (Rigor Doutrinário Santo Daime & UDV) em destaque 7/12 com citação nobre de altar, e Pilares II e III articulados em 5/12.
    - **Graduações Canônicas (`HomeGraduacoes.tsx`):** Elevação litúrgica soberana para o Wirapuru 10.1 (densidade máxima para vigílias) com insígnia dourada e realce solar.
17. **Funil Didático de Conversão Institucional em 5 Estações (ADR-003 & Nota Específica):** Racionalização e desduplicação radical do portal eliminando mais de 1.200 linhas de texto redundante entre abas (com destaque para a reescrita de `ProjetoDeLuzLanding.tsx` de 1.050 para ~230 linhas focadas estritamente em agrofloresta, ararajubas e apoio social fraterno; desduplicação da Home; e ordenação canônica dos links da `Navbar.tsx` guiando o visitante através das 5 etapas didáticas: Origem -> Feitio -> Sacramentos -> Marco Legal -> Credenciamento).
19. **Redesenho Completo de Projetos de Luz (`/projetos-de-luz`) com Galeria, Vídeos & Matriz de Rateio:** Refatoração profunda de `ProjetoDeLuzLanding.tsx` (~600 linhas) expandindo a página de 3 seções para 8 seções completas: Hero imersivo com foto real da vigília noturna; Manifesto editorial com layout assimétrico (texto + foto em destaque); 4 Pilares de impacto social com detalhes expandíveis; Matriz de Rateio 40/40/10/10 com barra visual e cards; Galeria de 12 fotografias reais do acervo com Lightbox navegável por teclado; 3 vídeos autênticos do feitio com player mudo integrado; Nota de Transparência sobre o envase PET; e CTA de conversão para credenciamento. Todas as fotos são registros autênticos de campo de Cruzeiro do Sul/AC (zero imagens de IA com figuras humanas).
18. **Assessoria Litúrgica Completa & Governança Institucional no Portal do Dirigente (ADR-004):** Expansão do Portal do Dirigente (`/portal-dirigente`) ancorado no acervo técnico-científico do caderno oficial Google NotebookLM (`ef7036cd-ccbd-4314-ae57-c21334d336d7` - 222 fontes primárias):
    - *Central de Documentos & Modelos Abertos A4 (`PortalCentralDocumentos.tsx`):* 5 modelos canônicos completos (Ficha de Anamnese com 7 módulos, TCLE com 9 cláusulas, POP Litúrgico em 5 fases e Ata de Sessão, Declaração de Trânsito Litúrgico e Termo de Autorização para Menor de Idade amparado no Item 4.1 do CONAD 01/2010 e Art. 1.634 do Código Civil), com tripla exportação integrada ("Imprimir A4 / PDF", "Copiar Texto para Word/Docs", "Baixar Editável .md") e gaveta pedagógica de fundamentação ("Por Que Cada Item Existe?").
    - *Compêndio Etnofarmacológico & Washout (`PortalInteracoesMedicamentosas.tsx`):* Matriz das 15 classes farmacológicas com modelagem linear ($5 \text{ a } 7 \times t_{1/2}$), vias metabólicas (CYP2D6, CYP3A4), card dos Critérios de Hunter para toxicidade serotoninérgica, Posição Lateral de Segurança (PLS) e alerta de Lítio (Status Epilepticus).
    - *Catálogo Descritivo de Graduações (`PortalCatalogoGraduacoes.tsx`):* Detalhamento fitoquímico da linhagem Tucunacá (8,03 mg/g beta-carbolinas totais), colheita circadiana da Chacrona Rainha (06h00 às 08h30 com orvalho intacto), bio-estabilização a 65–72 °Brix ($a_w$ 0,700–0,780) e Tabela Canônica de Reconstituição do 10:1 Wirapuru.
    - *Calculadora Litúrgica & Reconstituição 10:1 (`PortalCalculadoraLiturgica.tsx`):* Suporte a "Dimensionar Cerimônia" (cálculo por participantes, 2ª dose/repasse, rapé e sananga com +15% margem) e "Modo Reconstituição 10:1" (cálculo de água mineral estéril a 45-50°C para obter 7:1, 5:1 ou 3:1 e cálices de 60ml correspondentes).
    - *FAQ Canônico do Dirigente (`PortalAssessoriaFAQ.tsx`):* 12 perguntas e respostas aprofundadas sobre conservação, alívio de gás carbônico, borra de alcaloides, purgas intensas, SAMU 192 e fiscalizações.
    - *Respaldo Jurídico & Fiscalização (`PortalRespaldoJuridico.tsx`):* Guia de conduta perante autoridades policiais/sanitárias, ementa CONAD 01/2010 e checklist da pasta física do templo.
115: 
116: 20. **Otimização Modular de Responsividade Mobile Integral (Skill `/arquitetura-design-modular`):**
Auditoria e reestruturação responsiva de ponta a ponta do portal para smartphones (viewports de 360px a 420px):
    - *Tipografia & Espaçamentos Fluidos via Clamp (`tailwind.config.ts`):* Configuração de `fontSize.display-*` e `spacing.section-*` com funções `clamp()` nativas, eliminando títulos desproporcionais e reduzindo o vazio vertical entre seções em 45% no mobile sem quebrar a proporção áurea no desktop.
    - *Blindagem Global Contra Auto-Zoom no iOS Safari (`globals.css`):* Forçamento de `16px !important` em inputs/selects/textareas em telas `<768px`, `overflow-x: clip` no `html, body` e ajuste nos paddings táteis dos botões `.btn-primary` e `.btn-secondary`.
    - *Navbar & Menu Mobile Resilientes (`Navbar.tsx`):* Logo adaptativo (46px mobile / 58px desktop), menu mobile com safe area padding (`pb-28`) e touch targets de 44px.
    - *Fitas Deslizantes Horizontais com Inércia Touch (`touch-scroll-x`):* Eliminação do empilhamento vertical de 4 a 5 linhas de botões na barra de sacramentos (`MedicinasCatalogClient.tsx`), nas 10 abas do dirigente (`PortalDirigenteClient.tsx`), no funil (`JornadaNavTracker.tsx`) e nas categorias de estudos (`EstudosClient.tsx`).
    - *Card View Adaptativa em Fármacos & Washout (`PortalInteracoesMedicamentosas.tsx`):* Conversão da tabela técnica de 6 colunas em cartões táteis expansíveis em 1 toque no mobile (`block md:hidden`), mantendo a tabela clássica para desktop e impressão A4 (`@media print`).
    - *Ergonomia da Central de Documentos A4 (`PortalCentralDocumentos.tsx`):* Pré-visualização da folha A4 com padding adaptativo (`p-4 sm:p-8 md:p-12`) e botões de ação em grid 2x2.
    - *Calculadora e Acompanhamento:* Botões de pessoas em grid 5 colunas coeso e stepper linear deslizante em `AcompanhamentoPedidos.tsx` sem fases isoladas.

21. **Persistência em Nuvem via Supabase (PostgreSQL), Supabase Auth & Correção Visual de Sacramentos (ADR-005):**
    - *Integração Supabase Free Tier (`qpgtngknrrawpaatiofe`):* Banco de dados relacional PostgreSQL com tabelas `pedidos_liturgicos` e `templos_credenciados`, script DDL executável (`src/lib/supabase/schema.sql`) e clientes browser/server com detecção inteligente de ambiente (`src/lib/supabase/client.ts` e `server.ts`).
    - *Persistência Híbrida Resiliente (`src/lib/db/pedidos.ts`):* Operação com fallback local automático (`data/pedidos.json`) garantindo que a aplicação e a suíte de testes nunca falhem mesmo offline ou em máquinas sem variáveis configuradas.
    - *Autenticação Dupla no Portal do Dirigente (`PortalLoginGate.tsx` & `PortalDirigenteClient.tsx`):* Suporte nativo a E-mail/Senha e Magic Link gratuito via Supabase Auth com persistência de sessão e escuta a `onAuthStateChange`, mantendo a chave litúrgica canônica (`NAT-TEMPLO-842` / `adm-nativaram`) como via de acesso rápido.
    - *Correção Integral de Enquadramento em Sacramentos (`/medicinas`):*
        - Resolução das distorções de proporção nas apresentações de 25g e 15g: substituição do recorte forçado em paisagem 4:3 por containers harmônicos verticais com `object-contain p-2`, revelando integralmente os frascos, lacres e rótulos sem nenhum corte de produto.
        - Banners superiores atualizados para fotografias autênticas de alta resolução (frascos cerimoniais, Sananga ancestral e resinas nativas).
        - Banner de Artefatos & Kuripes ajustado para container panorâmico proporcional, ícones ampliados para 24x24 com zoom tátil e cards de Kits de Sinergia com visualização 100% integral dos componentes.
        - Ficha individual (`/medicinas/[slug]`): exibição da foto documental específica de cada medicina com enquadramento quadrado e fundo escuro nobre.

22. **Supervisão por Gauntlet Loops e Auditoria Geral por Subagentes Paralelos (/improve):**
    - *Frente 1 (Frontend & UI):* Inspeção de tokens, acessibilidade WCAG, integridade visual de layouts e identificação de necessidade de arquivo de configuração para o ESLint (Plano 003).
    - *Frente 2 (Backend & APIs):* Auditoria de segurança de rotas REST, identificação de credencial literal em cabeçalho administrativo em `src/app/api/pedidos/[id]/route.ts`, memoização do cliente Supabase e estruturação de testes de integração HTTP (Plano 002).
    - *Frente 3 (Governança & Fitoquímica):* Verificação semântica do vocabulário litúrgico (9/9 testes de conformidade aprovados) e planejamento da rota canônica `/sacramentos` com redirect de `/medicinas` para zerar qualquer menção residual em URLs.

23. **Homologação do Grafo de Orquestração & Gauntlet Loops Concluídos (ADR-006):**
    - *Nó 1 (Fundação & Contratos):* `.eslintrc.json` configurado, schemas Zod tipados e rota canônica `/sacramentos` estabelecida com rewrites transparentes no Next.js.
    - *Nó 2 (Engine & Segurança):* Token de autenticação administrativo sanitizado (`ADMIN_SECRET_KEY`), cliente Supabase memoizado com singleton e suíte automatizada expandida para 11 testes instantâneos via `jiti` (0.8s).
    - *Nó 3 (Frontend & Funil):* Módulos do Funil em 5 etapas integrados, navegação sincronizada com `/sacramentos` e templates A4 print preservados.
    - *Nó 4 (Consolidação):* Formalização da [[ADR-006-Orquestracao-por-Grafos-e-Gauntlet-Loops]] e atualização do catálogo em `plans/README.md`.
24. **Decomposição Retrógrada (Backwards Design), Auditoria Cega Gauntlet Loop & Fechamento de Sprint:**
    - *Varredura AST:* 87 arquivos TypeScript inspecionados com 0 violações de acoplamento vertical.
    - *Arquitetura em 4 Camadas:* Formalizada em `implementation_plan.md` e `task.md`. Implementado helper `withTimeout` (2000ms) para resiliência no banco remoto Supabase.
    - *Auditoria Factual Gauntlet Loop:* Inspeção visual com Google Chrome DevTools Protocol (zero erros no console), 8 rotas verificadas com HTTP 200 via crawler e 16/16 testes automatizados verdes.
    - *Fechamento e Handoff:* Gerados `walkthrough.md`, `HANDOFF.md` e registro de aprendizado contínuo em `.agents/skills/learned-resilient-db-timeouts/`.
25. **Acolhimento Fraterno de Grupos Informais & Rezadores Autônomos (`/reconhecimento`):**
    - *Motivação e Propósito:* Acolher núcleos espirituais em formação, rodas familiares de oração e rezadores tradicionais que ainda não possuem personalidade jurídica (CNPJ/Ata), sem frieza burocrática, garantindo acesso a sacramentos puristas e amparo pedagógico até uma futura formalização institucional sob a Resolução CONAD nº 01/2010.
    - *Schema e Validação Zod:* Criado `src/lib/validators/reconhecimento.ts` com validação de perfil (Grupo, Rezador, Círculo de Estudos, Comunidade Tradicional), linhagem, participantes, graduações canônicas, litragem (cota de 5L+), antecedência de 30 dias e triagem integrativa de segurança.
    - *Engine de Protocolo & WhatsApp:* Implementado `src/lib/reconhecimento/engine.ts` com gerador de protocolo `REC-2026-XXXX` e formatador de mensagem estruturada e respeitosa para envio via WhatsApp do Conselho Gestor da Cooperativa.
    - *Persistência Híbrida & API:* Rota REST `src/app/api/reconhecimento/route.ts` com persistência local atômica em `data/reconhecimentos.json`.
    - *Componente Interativo:* `ReconhecimentoForm.tsx` com stepper em 3 etapas, seleção tátil de perfis, showcase das 4 graduações canônicas e tela solene de comprovante.
    - *Página Dedicada e Pontes:* Criada `src/app/reconhecimento/page.tsx` com FAQ didático e link cruzado em `src/app/credenciamento/page.tsx` e no rodapé `Footer.tsx`.
    - *Verificação:* 19/19 testes automatizados verdes e compilação de produção com 34 rotas estáticas (`npm run build`).

26. **Fluxo Integrado de Liberação de Acesso via WhatsApp & Homologação Administrativa Dinâmica:**
    - *Disparo de Solicitação ao Conselho Gestor:* Ao concluir qualquer formulário (`/credenciamento` para instituições formais ou `/reconhecimento` para grupos em desenvolvimento), a tela de confirmação exibe botão proeminente "Enviar para o WhatsApp do Conselho e Pedir Liberação" (`556899779104`) com mensagem estruturada contendo Protocolo, Entidade, Dirigente, Localidade e pedido explícito de liberação.
    - *Banco Central de Homologações (`src/lib/db/homologacoes.ts`):* Persistência de solicitações em `data/solicitacoes_homologacao.json` com status inicial `PENDENTE_LIBERACAO`.
    - *Painel de Gestão e Homologação no ADM (`AdminGestaoHomologacoes.tsx`):* Integrado na aba CREDENCIAMENTOS do dashboard do Conselho Gestor (`PortalAdminDashboard.tsx`). Exibe métricas em tempo real, filtros por status e tipo, e botão de ação "Aceitar e Gerar Login/Senha".
    - *Geração Automática de Credenciais Litúrgicas:* Ao aceitar, o sistema gera instantaneamente Login canônico (`NAT-TEMPLO-XXXX` para instituições ou `NAT-GRP-XXXX` para grupos) e Senha litúrgica segura (`Luz2026-XXXX`), atualizando o status para `HOMOLOGADO`.
    - *Envio das Credenciais ao Dirigente via WhatsApp:* O painel gera link de disparo direto com mensagem pré-formatada contendo Login, Senha e URL de entrada (`/portal-dirigente`).
    - *Autenticação Dinâmica no Gate (`PortalLoginGate.tsx` & `/api/auth/verificar-chave`):* Validação assíncrona das credenciais recém-geradas no gate de entrada, permitindo acesso imediato ao Portal do Dirigente sem necessidade de reinício do servidor.
    - *Cobertura de Testes Automatizados:* 22/22 testes aprovados (`scripts/test-liturgico.mjs`), incluindo validação de persistência, homologação, geração de chaves e bloqueio de senhas incorretas.

27. **Hub Comunitário, Blog Colaborativo de Templos, Agenda Litúrgica & Otimização Mobile (ADR-007):**
    - *Evolução da Aba `/estudos`:* Expansão da rota para atuar como Hub duplo, unificando o **Mural da Comunidade (Vozes dos Templos)** e os **Dossiês Científicos da Floresta** (acervo HPLC, fitoquímica e cadernos NotebookLM mantido 100% preservado).
    - *Plano Grátis & Custo Zero Perpétuo:* Compressão automática de imagens no navegador via Canvas/WebP (`image-compressor.ts`), reduzindo fotos de alta resolução de 10 MB para ~180 KB; incorporação de mídias de redes sociais (Instagram, YouTube, Spotify) com custo zero de banda e armazenamento.
    - *Linter de Conformidade CONAD/ANVISA em Tempo Real:* Scanner léxico ativo no editor que detecta termos clínicos ou comerciais e sugere em 1 toque a substituição canônica aprovada no dicionário da cooperativa.
    - *Gestão no Portal do Dirigente (`PortalComunidadeGestao.tsx`):* Nova aba "Meu Templo & Publicações" com gerenciamento de posts, perfil público, fotos do espaço sagrado e agenda de cerimônias.
    - *Páginas Públicas Individuais de Templos (`/estudos/comunidade/[slug]`):* Página dedicada de cada congregação credenciada com galeria, missão, agenda e contato seguro via WhatsApp.
    - *Validação & Qualidade:* 26/26 testes automatizados verdes (`npm test`) e 39/39 rotas compiladas estaticamente no build de produção do Next.js 15 (`npm run build`).

28. **Resiliência de Homologação (`REC-2026-OLYY`), Cadastro de Protocolos WhatsApp & Expansão Farmacológica (20 Classes / 4 Cores):**
    - *Correção e Sincronização de Homologações (`src/lib/db/homologacoes.ts`, `src/app/api/reconhecimento/route.ts`, `AdminGestaoHomologacoes.tsx`):* Inclusão imediata do protocolo `REC-2026-OLYY` na fila de aprovação do ADM; integração direta de `POST /api/reconhecimento` com `registrarSolicitacao`; fallback em `os.tmpdir()` para ambientes serverless (`EROFS`) somado à sincronização em `localStorage` (`nativaram_solicitacoes_local`); edição inline de dados da congregação e botão **"Cadastrar Protocolo (WhatsApp)"** para homologar qualquer código recebido externamente em 1 clique.
    - *Sincronização de Perfil Homologado (`PortalLoginGate.tsx` & `PortalDirigenteClient.tsx`):* Grupos e templos recém-homologados (`NAT-GRP-XXXX` / `NAT-TEMPLO-XXXX`) carregam automaticamente seus dados reais na sessão do Portal do Dirigente.
    - *Compêndio de 20 Classes Farmacológicas & Tabela de Medicamentos Controlados (`src/data/portal-assessoria.ts`, `PortalInteracoesMedicamentosas.tsx`, `PortalCentralDocumentos.tsx`):* Incorporação integral de todos os fármacos e marcas comerciais do documento oficial `MEDICAMENTOS CONTROLADOS` (divididos em 🔴 Não pode participar, 🟠 Caso clínico não recomendado, 🔵 Interromper dias antes e 🟡 Não tomar no dia), além de interações modernas (canetas GLP-1 Ozempic/Mounjaro, Triptanos, Opioides, Antibiótico Linezolida, Antiparkinsonianos e alerta sobre a associação de Amitriptilina no Limbitrol) e nota de Exceção para Tratamentos de Desintoxicação, tanto na matriz interativa quanto nos 5 documentos canônicos A4/Word/Markdown.

---

## Relações

### Depende de
- [[Nativaram-Brasil]]
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Dicionario-Semantico-Nativaram]]
- [[Banco-de-Dados-e-Persistencia-Local]]
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
- [[ADR-006-Orquestracao-por-Grafos-e-Gauntlet-Loops]]

### Feito em
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]

### Alimenta / impulsiona
- [[Ayahuasca-e-Purismo-Botanico]]
- [[Rapes-Sagrados-e-Alquimia-Mineral]]
- [[Artefatos-e-Instrumentos]]
- [[Projetos-de-Luz-e-Editais]]
- [[Cadeia-de-Custodia-e-Logistica-Refrigerada]]

### Relacionado a
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Guia-de-Skills-e-Comandos]]
- [[Indice-de-Recuperacao-Rapida]]
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[ADR-002-Composicao-Modular-e-Design-System]]
- [[ADR-003-Funil-de-Conversao-e-Jornada-Didatica]]
- [[ADR-004-Assessoria-Liturgica-e-Documentos-A4]]
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
- [[ADR-006-Orquestracao-por-Grafos-e-Gauntlet-Loops]]
- [[ADR-007-Hub-Comunitario-e-Blog-Etnobotanico]]


