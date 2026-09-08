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
│   ├── forms/CredenciamentoForm.tsx (Anamnese, Prévia Dinâmica HPLC e Washout 5 Semanas)
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
│   └── credenciamento/engine.ts (Motor de Análise, Dossiê Litúrgico e Sanitização WhatsApp)
└── data/
    └── pedidos.json (Base de dados JSON atômica das solicitações litúrgicas)
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

---

## Relações

### Depende de
- [[Nativaram-Brasil]]
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Dicionario-Semantico-Nativaram]]
- [[Banco-de-Dados-e-Persistencia-Local]]

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
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[ADR-002-Composicao-Modular-e-Design-System]]

