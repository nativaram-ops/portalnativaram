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

