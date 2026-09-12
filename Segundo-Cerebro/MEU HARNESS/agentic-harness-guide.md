# 🚀 Guia de Harness Agêntico & Ciclo de Vida de Projetos

Este documento estabelece o **Harness Agêntico Definitivo** para desenvolvimento de software na **Antigravity IDE** (Engenharia Agêntica - SE 3.0). Ele unifica todas as habilidades instaladas no seu ambiente — divididas nas 3 camadas operacionais (Projeto Nativo, Global Stack Web e Novo Harness de Alta Performance) — e mapeia a utilização de cada uma delas ao longo do caminho de criação de um projeto do zero ao deploy.

---

## 🏗️ 1. Arquitetura das 3 Camadas do Harness

O seu ambiente opera com um modelo de **Divulgação Progressiva (Progressive Disclosure)** e separação estrita de responsabilidades:

1. **Camada 1 — Projeto Nativo (`.agents/skills/`):** 43 habilidades ativas do projeto (Segundo Cérebro, Engenharia, Testes, Arquitetura, Produtividade, Gestão, Documentação e Subagentes Especializados).
2. **Camada 2 — Stack Web Global (`~/.gemini/config/skills/`):** Habilidades pré-existentes focadas na stack Vercel, Supabase, Tailwind CSS e Next.js 15.
3. **Camada 3 — Novo Harness da IDE (Alta Performance):** 31 habilidades globais avançadas de inteligência temporal, análise sintática estática por AST (`graphify`), auditoria sênior (`improve`), postura YAGNI (`ponytail`), engenharia agêntica (`ecc-*`), design system de elite (`od-*`) e segurança de skills (`skill-inspector`).

---

## 🗺️ 2. O Caminho de Criação de Projetos (Mapeamento de Skills por Fase)

```text
[ FASE 0: SETUP & INTELIGÊNCIA ] ──> [ FASE 1: GATING COGNITIVO ] ──> [ FASE 2: DECOMPOSIÇÃO & DAGS ]
  • /last30days                       • /produtividade-sabatina        • /graphify
  • /skill-inspector                  • /gestao-questionario           • /improve
  • /setup-matt-pocock-skills         • /od-design-brief               • /ponytail
  • /segundo-cerebro-criar-projeto    • /segundo-cerebro-decisao       • /gestao-gerar-tickets

                                                                                    │
                                                                                    ▼
[ FASE 5: HANDOFF & CONTINUOUS LEARN ] <── [ FASE 4: GAUNTLET LOOPS ] <── [ FASE 3: EXECUÇÃO PARALELA ]
  • /ecc-continuous-learning             • /ecc-verification-loop         • /subagente-frontend
  • /gestao-handoff-sessao               • /ecc-tdd-workflow              • /subagente-backend
  • /gestao-retrospectiva                • /ecc-security-review           • /subagente-governanca
  • /segundo-cerebro-ciclo-memoria       • /od-review-animations          • /od-master-design
```

---

### 🔍 FASE 0: Setup do Repositório, Pesquisa & Pre-Flight
Antes de iniciar qualquer projeto, prepara-se a infraestrutura de inteligência e valida-se a segurança do ecossistema.

| Ação | Comandos / Skills Envolvidas | Artefato / Resultado Esperado |
| :--- | :--- | :--- |
| **Pesquisa de Tendências (Últimos 30 Dias)** | `/last30days` | Mapeamento das bibliotecas e discussões mais recentes na comunidade. |
| **Auditoria de Segurança de Skills** | `/skill-inspector` | Varredura estática de novas habilidades contra injeções de prompt e comandos perigosos. |
| **Configuração Inicial do Repositório** | `/setup-matt-pocock-skills` | Mapeamento do tracker de tarefas (GitHub/Linear) e convenções do projeto. |
| **Inicialização no Segundo Cérebro** | `/segundo-cerebro-criar-projeto`, `/segundo-cerebro-configuracao` | Nota do projeto no vault Obsidian e sincronização do `AGENTS.md`. |

---

### 🛡️ FASE 1: Gating Cognitivo & Alinhamento de Requisitos
Nenhuma linha de código é gerada antes de eliminar todas as incertezas na fronteira de decisão. A IA deve sabatinar o desenvolvedor.

| Ação | Comandos / Skills Envolvidas | Artefato / Resultado Esperado |
| :--- | :--- | :--- |
| **Sabatina Socrática (Grill Me)** | `/produtividade-sabatina-decisoes` (`/grill-me`, `/grill-with-docs`) | Desdobramento da árvore de decisões e resolução de dependências técnicas. |
| **Espec. Técnica & Questionários** | `/gestao-questionario-requisitos`, `/gestao-especificacao-tecnica` | Especificação funcional clara (`to-prd`). |
| **Design Brief & Direção de Taste** | `/od-design-brief`, `/od-brandkit`, `/od-taste-skill` | Diretrizes estéticas, contratos de design e paletas de cores (`DESIGN.md`). |
| **Registro de Decisão Arquitetural** | `/segundo-cerebro-registrar-decisao` | Criação formal de ADRs em `docs/adr/` e gravação em `CONTEXT.md`. |

---

### 📊 FASE 2: Decomposição Retrógrada, Análise AST & Planejamento (DAGs)
Partindo dos critérios de aceitação final, analisa-se a base legada por AST e gera-se o plano de execução atômico.

| Ação | Comandos / Skills Envolvidas | Artefato / Resultado Esperado |
| :--- | :--- | :--- |
| **Mapeamento AST da Codebase** | `/graphify` | Grafo navegável interativo (`graph.json`, `graph.html`, `GRAPH_REPORT.md`). |
| **Auditoria Sênior & Planos** | `/improve` | Análise profunda em 9 eixos e geração autônoma de plano em `plans/`. |
| **Postura Anti-Overengineering** | `/ponytail` | Eliminação de abstrações desnecessárias (Princípio YAGNI e código enxuto). |
| **Geração de Tickets Atômicos** | `/gestao-gerar-tickets`, `/gestao-triagem-issues`, `/gestao-mapa-navegacao` | Fracionamento do plano em subtarefas atômicas em `task.md` e `implementation_plan.md`. |

---

### ⚡ FASE 3: Orquestração por Grafos, Git Worktrees & Execução Paralela
O coordenador dispara subagentes especializados em janelas de contexto 100% isoladas (`branch` / Git Worktrees) para atuarem simultaneamente sem colisões.

| Subagente Especializado | Skills Suporte Associadas | Escopo Territorial de Atuação |
| :--- | :--- | :--- |
| **`/subagente-frontend`** | `/od-master-design`, `/od-emil-design-eng`, `/od-image-to-code`, `/od-minimalist`, `/ecc-frontend-patterns` | `src/components/**`, `src/app/**/page.tsx`, `src/app/globals.css`. |
| **`/subagente-backend`** | `/ecc-backend-patterns`, `/ecc-coding-standards`, `/ecc-clickhouse-io` | `src/app/api/**`, `src/lib/**`, `src/types/**`, `data/**`. |
| **`/subagente-governanca`** | `/segundo-cerebro-ciclo-memoria-ativa`, `/documentacao-escrita-para-agentes` | `Segundo-Cerebro/**`, `src/data/**`, `AGENTS.md`. |

---

### 🧪 FASE 4: Gauntlet Loops, Auditoria Cega & Testes Visuais
Toda entrega de um subagente é submetida a um Agente Auditor (Crítico Cego) que avalia o código contra benchmarks factuais objetivos.

| Ação de Auditoria | Comandos / Skills Envolvidas | Ferramenta / Método de Validação |
| :--- | :--- | :--- |
| **Verificação Contínua** | `/ecc-verification-loop` | Compilação estrita, linter e checagem de tipos (`typecheck`). |
| **Desenvolvimento Orientado a Testes** | `/ecc-tdd-workflow` | Ciclo Red-Green-Refactor e suítes de testes unitários (`/testes-*`). |
| **Varredura de Segurança** | `/ecc-security-review` | Análise estática de vulnerabilidades e exposição de dados sensíveis. |
| **Auditoria Visual & Animações** | `/od-review-animations`, `BrowserMCP` | Navegação automatizada no Chrome local, capturas de tela e gravação em vídeo (`artifacts/`). |
| **Loop de Refatoração Automática** | `/loop` (se reprovado) | Retorno automático do código com relatório de falhas até atingir 100% de aprovação. |

---

### 🔄 FASE 5: Governança, Retrospectiva, Handoff & Aprendizado Contínuo
Após a aprovação do Gauntlet Loop e a mesclagem da branch, os aprendizados e o contexto são consolidados para a próxima sessão.

| Ação | Comandos / Skills Envolvidas | Artefato / Resultado Esperado |
| :--- | :--- | :--- |
| **Aprendizado Pós-Tarefa** | `/ecc-continuous-learning` | Registro de lições aprendidas e padrões identificados na sessão. |
| **Handoff de Sessão** | `/gestao-handoff-sessao` (`/handoff`) | Compactação do estado atual em Markdown para continuidade em uma nova sessão limpa. |
| **Retrospectiva do Ciclo** | `/gestao-retrospectiva` | Análise de gargalos e oportunidades de otimização da equipe agêntica. |
| **Atualização do Segundo Cérebro** | `/segundo-cerebro-atualizar-projeto`, `/segundo-cerebro-revisar-dashboard` | Atualização do status no vault Obsidian e encerramento da sprint. |

---

## 📌 3. Matriz Completa de Comandos Rápidos (/slash)

| Comando | Categoria | Descrição Curta |
| :--- | :--- | :--- |
| `/last30days` | Pesquisa | Pesquisa tendências e discussões dos últimos 30 dias na comunidade tech. |
| `/graphify` | AST Grafo | Mapeia o repositório em grafo interativo (`graphify query`, `graphify path`). |
| `/improve` | Auditoria | Executa consultoria sênior em 9 eixos e gera plano de ação em `plans/`. |
| `/ponytail` | Arquitetura | Força disciplina YAGNI, código enxuto e elimina abstrações precoces. |
| `/skill-inspector` | Segurança | Audita skills de IA contra injeções de prompt e vulnerabilidades. |
| `/produtividade-sabatina-decisoes` | Gating Cognitivo | Inicia a sabatina socrática (*Grill Me*) para estressar premissas. |
| `/gestao-especificacao-tecnica` | Planejamento | Converte conversas em especificação técnica estruturada (`to-prd`). |
| `/gestao-gerar-tickets` | Planejamento | Fraciona especificações em tickets e tarefas atômicas (`to-tickets`). |
| `/subagente-frontend` | Subagente | Executa alterações isoladas em componentes visuais, React e Tailwind. |
| `/subagente-backend` | Subagente | Executa alterações isoladas em APIs, serviços Supabase e validações. |
| `/subagente-governanca` | Subagente | Mantém a documentação, memória ativa do Obsidian e regras do projeto. |
| `/od-master-design` | Design System | Aplica o protocolo mestre OpenDesign e regras anti-ai-slop. |
| `/od-taste-skill` | Design System | Avalia proporção, contraste, hierarquia óptica e ritmo visual. |
| `/od-emil-design-eng` | Design System | Aplica microinterações elegantes e física de molas (Emil Kowalski). |
| `/ecc-verification-loop` | QA & Testes | Executa loop de verificação contínua (build, lint, typecheck e testes). |
| `/ecc-tdd-workflow` | QA & Testes | Conduz o fluxo estrito de TDD (Red-Green-Refactor). |
| `/ecc-security-review` | QA & Testes | Varre o repositório em busca de falhas de segurança e dados expostos. |
| `/gestao-handoff-sessao` | Handoff | Comprime a sessão em Markdown para continuidade em nova conversa. |
| `/ecc-continuous-learning` | Memória | Registra reflexões pós-tarefa e aprendizados técnicos reutilizáveis. |
