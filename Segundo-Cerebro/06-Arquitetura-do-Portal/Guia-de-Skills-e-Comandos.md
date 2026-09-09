---
tipo: guia_skills
status: pronto
prioridade: alta
ferramenta_principal: Antigravity IDE
para_quem_e: Uso próprio
categoria: Catálogo de Comandos
---

# ⚡ Guia de Skills e Comandos Rápidos do Projeto

Este guia cataloga o ecossistema completo de habilidades disponíveis no ambiente de desenvolvimento:
1. **Camada 1 (Projeto):** As **40 habilidades nativas** do portal Nativaram Brasil em `.agents/skills/`, traduzidas e categorizadas em 7 setores operacionais.
2. **Camada 2 (IDE Pré-existente):** As **8 habilidades globais** da stack Web/Vercel previamente instaladas pelo desenvolvedor em `C:\Users\victo\.gemini\config\skills\`.
3. **Camada 3 (Novo Harness da IDE):** As **31 habilidades de alta performance** do novo harness global da IDE (pesquisa temporal, grafo AST, auditoria, anti-overengineering, governança agêntica, design de elite e segurança).

---

## 🧭 Como Usar
No chat do assistente, basta digitar `/` seguido do nome da skill ou setor para acionar o fluxo automatizado:

**Skills do Projeto:**
- Digite `/segundo` para listar todas as skills do Obsidian.
- Digite `/engenharia` para comandos de desenvolvimento e resolução de bugs.
- Digite `/testes` para suítes de testes e pré-commit.
- Digite `/arquitetura` para modelagem e design modular.
- Digite `/produtividade` para NotebookLM, pesquisa e sabatina.
- Digite `/gestao` para tickets, triagem e especificações.
- Digite `/documentacao` para redação e manuais de IA.

**Novo Harness da IDE:**
- Digite `/last30days` para pesquisar tendências e discussões técnicas dos últimos 30 dias.
- Digite `/graphify` para mapear ou consultar o grafo de conhecimento do repositório (`query`, `path`, `explain`).
- Digite `/improve` para auditoria sênior e geração de planos em `plans/`.
- Digite `/ponytail` para postura de eficiência e soluções enxutas (YAGNI).
- Digite `/ecc` para comandos do harness agêntico (`/ecc-verification-loop`, `/ecc-tdd-workflow`, etc.).
- Digite `/od` para ferramentas de craft visual e design (`/od-taste-skill`, `/od-master-design`, etc.).
- Digite `/skill-inspector` para auditar a segurança de novas skills de IA.

---

## 📂 Camada 1: Setores e Comandos Nativos do Projeto (.agents/skills)

### 1. 🧠 Segundo Cérebro (Obsidian & Vault)
- **`/segundo-cerebro-ciclo-memoria-ativa`**: Executa o loop mandatório: consulta prévia no Obsidian antes de atualizar e gravação no vault após a mudança.
- **`/segundo-cerebro-atualizar-projeto`**: Adiciona tarefas, escopo e relações a notas de projetos existentes.
- **`/segundo-cerebro-atualizar-status`**: Altera o status da nota (ex: de \`planejamento\` para \`pronto\`).
- **`/segundo-cerebro-auditar-conteudo`**: Audita e higieniza dados mockados ou temporários no vault.
- **`/segundo-cerebro-criar-projeto`**: Cria novo projeto real aplicando template com YAML simples.
- **`/segundo-cerebro-registrar-decisao`**: Registra formalmente decisões técnicas e arquiteturais (ADR).
- **`/segundo-cerebro-registrar-ideia`**: Salva ideias soltas e insights rápidos na Inbox do vault.
- **`/segundo-cerebro-registrar-relacao`**: Conecta notas no corpo utilizando links internos \`[[Nota]]\`.
- **`/segundo-cerebro-revisar-dashboard`**: Gera relatório de progresso e atualiza o mapa mental mestre.
- **`/segundo-cerebro-sugerir-registro`**: Avalia conclusões técnicas e propõe registros no vault.
- **`/segundo-cerebro-configuracao`**: Sincroniza e atualiza o mapeamento de regras no \`AGENTS.md\`.

### 2. ⚙️ Engenharia & Código (Desenvolvimento & Resiliência)
- **`/engenharia-revisar-codigo`**: Revisão estrita de código contra padrões da base e especificação.
- **`/engenharia-diagnosticar-bugs`**: Diagnóstico sistemático de falhas, erros de runtime e regressões.
- **`/engenharia-resolver-conflitos-git`**: Passo a passo assistido para resolver conflitos de merge/rebase.
- **`/engenharia-guardrails-git`**: Travas contra comandos Git destrutivos (reset hard, push forçado).
- **`/engenharia-implementar-especificacao`**: Implementação rigorosa de features a partir de especificações.
- **`/engenharia-melhorar-arquitetura`**: Análise e refatoração para aprofundamento e desacoplamento de módulos.
- **`/engenharia-migrar-tipos-shoehorn`**: Higienização de asserções \`as\` em arquivos de teste.

### 3. 🧪 Testes & Qualidade (TDD & CI)
- **`/testes-desenvolvimento-tdd`**: Fluxo Red-Green-Refactor com testes unitários e de integração.
- **`/testes-configurar-pre-commit`**: Configuração de hooks Husky, lint-staged, formatação e TypeScript.
- **`/testes-estruturar-exercicios`**: Criação de roteiros de testes e tutoriais guiados.

### 4. 🏛️ Arquitetura & Domínio
- **`/arquitetura-design-modular`**: Design de módulos profundos com interfaces limpas.
- **`/arquitetura-modelagem-dominio`**: Vocabulário ubíquo, atualização do \`CONTEXT.md\` e entidades.
- **`/arquitetura-prototipar-ui`**: Prototipagem ágil de componentes e telas em Vanilla CSS / Tailwind.

### 5. ⚡ Produtividade & IA
- **`/produtividade-integracao-notebooklm`**: Consultas, sincronização e geração de podcasts no NotebookLM.
- **`/produtividade-pesquisa-tecnica`**: Pesquisa técnica fundamentada em documentações primárias oficiais.
- **`/produtividade-sabatina-decisoes`**: Sabatina implacável (Grill Me) para estressar premissas e planos.
- **`/produtividade-assistente-wizard`**: Gerador de assistentes interativos para configurações manuais.
- **`/produtividade-orientacao-skills`**: Orientador de qual skill utilizar para cada contexto de trabalho.

### 6. 📋 Gestão & Fluxo de Trabalho
- **`/gestao-triagem-issues`**: Triagem e categorização de issues no repositório GitHub.
- **`/gestao-especificacao-tecnica`**: Conversão de conversas em especificações técnicas completas.
- **`/gestao-gerar-tickets`**: Desmembramento de especificações em subtarefas e tickets acionáveis.
- **`/gestao-questionario-requisitos`**: Questionários para esclarecimento de pontos ambíguos.
- **`/gestao-handoff-sessao`**: Registro de contexto para transição entre sessões do agente.
- **`/gestao-retrospectiva`**: Análise de aprendizados e melhorias após ciclos de entrega.
- **`/gestao-mapa-navegacao`**: Mapa de decisões estratégicas para projetos de grande porte.

### 7. ✍️ Documentação & Redação
- **`/documentacao-escrita-para-agentes`**: Elaboração de instruções de alta fidelidade para agentes de IA.
- **`/documentacao-redacao-estruturada`**: Redação analítica de textos institucionais e científicos.
- **`/documentacao-ensinar-conceito`**: Explicação didática de tecnologias e conceitos da base.
- **`/documentacao-revisar-clareza`**: Reformulação de mensagens técnicas para máxima clareza.

---

## 🌐 Camada 2: Skills Globais Pré-existentes na IDE (Stack Web / Vercel)

Habilidades instaladas previamente a nível global (`C:\Users\victo\.gemini\config\skills\`) para apoiar o desenvolvimento em Next.js 15, React e Tailwind CSS:

- **`accessibility-wcag`**: Diretrizes de acessibilidade WCAG 2.1 AA (contraste, foco, navegação por teclado e leitores de tela).
- **`nextjs-app-router`**: Arquitetura avançada de rotas, Server Components, layouts e streaming do Next.js 15.
- **`seo-metadata-optimization`**: Otimização técnica de metadados, OpenGraph, JSON-LD e Core Web Vitals.
- **`tailwind-design-system`**: Governança e consistência visual do Tailwind CSS com suporte a dark mode.
- **`typescript-zod-forms`**: Formulários tipados e seguros com validação Zod e Server Actions.
- **`vercel-composition-patterns`**: Padrões de composição modular e desacoplamento de componentes da Vercel.
- **`vercel-react-best-practices`**: Melhores práticas oficiais de React para alta performance e zero re-renders desnecessários.
- **`vercel-web-design-guidelines`**: Padrões estéticos e checklist visual da engenharia Vercel.

---

## 🚀 Camada 3: Novo Harness da IDE (Reta Final — Alta Performance)

Harness de alta performance instalado a nível global (`C:\Users\victo\.gemini\config\skills\`) para acelerar o fechamento do portal com chave de ouro, cobrindo os 7 repositórios do ecossistema agêntico avançado:

### 🔍 1. Pesquisa & Inteligência Temporal (`mvanhorn/last30days-skill`)
- **`/last30days`**: Pesquisa investigativa focada estritamente nos **últimos 30 dias** em Reddit, X/Twitter, YouTube, TikTok, Hacker News, Polymarket e Web aberta para capturar discussões técnicas e atualizações recentes.

### 🗺️ 2. Grafo de Conhecimento do Código (`Graphify-Labs/graphify`)
- **`/graphify`**: Mapeamento determinístico da base via AST tree-sitter em grafo navegável interativo (`graph.html`, `graph.json`, `GRAPH_REPORT.md`). Suporta consultas diretas (`/graphify query`, `/graphify path`, `/graphify explain`) e exportação direta para o cofre do Obsidian com o parâmetro `--obsidian`.

### 🧠 3. Consultoria Sênior de Auditoria (`shadcn/improve`)
- **`/improve`**: Auditoria profunda em 9 categorias (corretude, segurança, performance, testes, débitos, migrações, DX, documentação e direção) gerando planos de implementação autônomos em `plans/`, sem mutação cega do código-fonte.

### ✂️ 4. Eficiência Radical & Anti-Overengineering (`DietrichGebert/ponytail`)
Metodologia pragmática: standard library first, recursos nativos e o menor código viável (YAGNI):
- **`/ponytail`**: Ativa a mentalidade minimalista em tarefas de código (`lite`, `full`, `ultra`).
- **`/ponytail-audit`**: Diagnóstico de código inchado, abstrações prematuras e dependências excessivas.
- **`/ponytail-debt`**: Mapeamento sistemático de débitos técnicos para remoção imediata.
- **`/ponytail-gain`**: Mensuração de ganhos em manutenção e velocidade ao deletar código.
- **`/ponytail-help`**: Guia de auxílio da suíte ponytail.
- **`/ponytail-review`**: Revisão estrita de PRs e diffs focada em simplicidade e código limpo.

### ⚙️ 5. Engenharia & Harness Agêntico (`WorldFlowAI/everything-claude-code` — prefixo `ecc-*`)
- **`/ecc-verification-loop`**: Loop automatizado de verificação contínua (build, lint, typecheck e testes).
- **`/ecc-tdd-workflow`**: Ciclo estrito de Test-Driven Development (Red-Green-Refactor).
- **`/ecc-security-review`**: Varredura estática de vulnerabilidades e segurança.
- **`/ecc-strategic-compact`**: Compactação estratégica de contexto e gestão de memória.
- **`/ecc-continuous-learning`**: Protocolo de reflexão pós-tarefa para registrar aprendizados técnicos.
- **`/ecc-eval-harness`**: Framework de avaliação formal de tarefas agênticas.
- **`/ecc-backend-patterns`**: Padrões de arquitetura de backend, resiliência e concorrência.
- **`/ecc-frontend-patterns`**: Padrões modernos para estado de UI, acessibilidade e composição.
- **`/ecc-coding-standards`**: Clean Code, SOLID e boas práticas de refatoração.
- **`/ecc-clickhouse-io`**: Padrões de persistência e consultas colunares de alta escala.
- **`/ecc-project-guidelines`**: Modelos de governança e documentação de projetos.

### 🎨 6. Craft, Design System & Anti-Slop (`nexu-io/open-design` — prefixo `od-*`)
Suíte de design de elite para elevar a interface do portal:
- **`/od-master-design`**: Protocolo mestre OpenDesign: governança de contratos de design (`DESIGN.md`), regras anti-ai-slop (elimina estéticas genéricas de IA), tipografia editorial e disciplina de movimento.
- **`/od-taste-skill`**: Guardião do bom gosto estético: análise de proporção, contraste, ritmo visual e hierarquia óptica.
- **`/od-emil-design-eng`**: Princípios de Emil Kowalski: microinterações elegantes, curvas de física reais (springs) e polimento minucioso.
- **`/od-brandkit`**: Construção e governança de tokens de marca, paletas e espaçamentos.
- **`/od-brand-extract`**: Extração de paletas e tipografia de imagens e sites de referência.
- **`/od-design-brief`**: Estruturação de briefs de design e descoberta estética.
- **`/od-redesign`**: Metodologia sistemática de redesenho e modernização de interfaces.
- **`/od-review-animations`**: Auditoria de performance, fluidez e timing de animações CSS/JS.
- **`/od-minimalist`**: Sistema de design minimalista suíço de alta precisão.
- **`/od-image-to-code`**: Conversão de mockups visuais ou prints diretamente para código Tailwind/CSS.

### 🛡️ 7. Segurança de Habilidades & Auditoria Agêntica (`nvidia/skillspector`)
- **`/skill-inspector`**: Scanner de segurança estática e semântica da NVIDIA para auditar habilidades de IA contra injeções de prompt, scripts não declarados ou privilégios excessivos.

---

## Relações

### Depende de
- [[Roadmap-e-Componentes-do-Site]]
- [[Nativaram-Brasil]]

### Relacionado a
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Indice-de-Recuperacao-Rapida]]

