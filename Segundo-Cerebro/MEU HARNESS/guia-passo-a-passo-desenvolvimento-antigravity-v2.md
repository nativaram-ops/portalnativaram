# 🚀 Guia Passo a Passo Definitivo: Desenvolvimento Agêntico no Antigravity IDE (SE 3.0)

Este documento é o seu **manual de operações e caixa de ferramentas pronta** para desenvolver projetos de software do zero ao deploy utilizando a metodologia de **Engenharia Agêntica (SE 3.0)** no **Antigravity IDE**. 

Ele integra todo o ecossistema de habilidades instaladas no seu ambiente — combinando as habilidades nativas do projeto, a stack web global e o **Novo Harness de Alta Performance** — e fornece os comandos `/slash` e modelos de prompts prontos para cada fase do ciclo de desenvolvimento.

---

## 🏗️ 1. Arquitetura do Repositório & As 3 Camadas do Harness

Para que o Antigravity IDE reconheça automaticamente a inteligência, as regras de arquitetura e a orquestração multiagente, seu repositório deve ser organizado na estrutura padrão abaixo:

```text
meu-projeto/
├── .agents/
│   ├── skills/                         # Skills locais do projeto (.agents/skills/)
│   │   ├── grill-me/SKILL.md            # Skill de sabatina socrática e gating cognitivo
│   │   ├── backwards-design/SKILL.md    # Skill de decomposição retrógrada e critérios E2E
│   │   ├── graph-orchestrator/SKILL.md  # Skill de orquestração por grafos (DAGs)
│   │   ├── subagent-db/SKILL.md         # Subagente especializado em banco de dados
│   │   ├── subagent-api/SKILL.md        # Subagente especializado em APIs/Back-end
│   │   ├── subagent-ui/SKILL.md         # Subagente especializado em Front-end/UI
│   │   └── auditor-gauntlet/SKILL.md    # Skill de auditoria cega e testes autônomos
│   └── workflows/
│       └── pipeline.md                  # Definição do fluxo completo de desenvolvimento
├── docs/
│   ├── adr/                             # Architecture Decision Records (Decisões de Design)
│   └── context/
├── plans/                               # Planos gerados por /improve
├── CONTEXT.md                            # Glossário de domínio e regras ubíquas do projeto
├── AGENTS.md                            # Regras de atuação e fronteiras dos subagentes
├── implementation_plan.md               # Plano de implementação arquitetural
├── task.md                              # Checklist de tarefas atômicas executáveis
├── graph.json                           # Mapeamento sintático AST da codebase (via /graphify)
└── walkthrough.md                       # Evidências de teste, logs e diffs para merge
```

### Divulgação Progressiva (Progressive Disclosure) & As 3 Camadas
* **Camada 1 — Projeto Nativo (`.agents/skills/`):** 43 habilidades locais cobrindo o Segundo Cérebro (Obsidian), Engenharia, Testes, Arquitetura, Produtividade, Gestão, Documentação e Subagentes Especializados.
* **Camada 2 — Stack Web Global (`~/.gemini/config/skills/`):** Habilidades pré-existentes focadas na Vercel, Supabase, Tailwind CSS e Next.js 15.
* **Camada 3 — Novo Harness da IDE (Alta Performance):** 31 habilidades globais avançadas com comandos rápidos (`/last30days`, `/graphify`, `/improve`, `/ponytail`, `/ecc-*`, `/od-*`, `/skill-inspector`).

---

## 🗺️ 2. Ciclo de Vida do Projeto: Passo a Passo Detalhado (Fases 0 a 5)

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
  • /gestao-handoff-sessao               • /ecc-retrospectiva             • /subagente-backend
  • /gestao-retrospectiva                • /ecc-security-review           • /subagente-governanca
  • /segundo-cerebro-ciclo-memoria       • /od-review-animations          • /od-master-design
```

---

### 🔍 FASE 0: Setup do Repositório, Pesquisa & Pre-Flight
Antes de iniciar qualquer código, prepara-se a infraestrutura de inteligência e valida-se a segurança do ambiente.
1. **Tendências Tech:** Executa-se `/last30days` para pesquisar as melhores práticas e versões mais recentes das bibliotecas a serem utilizadas.
2. **Auditoria de Segurança:** Dispara-se o `/skill-inspector` para realizar varredura nas skills contra injeções de prompt ou comandos destrutivos.
3. **Tracker de Tarefas:** Roda-se `/setup-matt-pocock-skills` para integrar os trackers do GitHub/Linear e convenções de TDD.
4. **Segundo Cérebro:** Inicializa-se a nota do projeto no vault Obsidian via `/segundo-cerebro-criar-projeto`.

---

### 🛡️ FASE 1: Gating Cognitivo & Alinhamento de Requisitos
A IA está **estritamente proibida** de gerar código ou alterar arquivos antes de eliminar todas as ambiguidades na fronteira de decisão.
1. **Sabatina Socrática:** Ativa-se a skill de sabatina (`/produtividade-sabatina-decisoes`, `/grill-me`, `/grill-with-docs`) para que a IA entreviste o desenvolvedor em lotes de perguntas sobre regras de negócio, casos de borda e restrições.
2. **Design Brief & Taste:** Define-se a direção estética e visual do projeto via `/od-design-brief`, `/od-brandkit` e `/od-taste-skill`.
3. **Protótipos Descartáveis:** Em caso de dúvida sobre interfaces gráficos, gera-se um protótipo leve em arquivo único HTML (`/prototype`) para teste antes de fechar a especificação.
4. **Registros Persistentes:** Consolida-se a especificação técnica em `/gestao-especificacao-tecnica` (`to-prd`), gravando as decisões arquiteturais formais em `docs/adr/` via `/segundo-cerebro-registrar-decisao` e atualizando o `CONTEXT.md`.

---

### 📊 FASE 2: Decomposição Retrógrada, Análise AST & Planejamento (DAGs)
Partindo do critério final de sucesso (Jornada E2E/Visual), analisa-se a base legada por AST e constrói-se o plano de ação atômico.
1. **Varredura AST da Codebase:** Para bases existentes, executa-se o `/graphify` para mapear o repositório em um grafo navegável interativo (`graph.json`, `graph.html`).
2. **Consultoria Arquitetural Sênior:** Dispara-se o `/improve` para realizar auditoria em 9 eixos e gerar planos detalhados na pasta `plans/`.
3. **Filtro Anti-Overengineering:** Aplica-se a postura `/ponytail` para garantir disciplina YAGNI (You Aren't Gonna Need It) e eliminar abstrações desnecessárias.
4. **Geração de Tickets Atômicos:** Usa-se `/gestao-gerar-tickets` (`to-tickets`) para fracionar o plano nos arquivos `implementation_plan.md` e `task.md`.

---

### ⚡ FASE 3: Orquestração por Grafos, Git Worktrees & Execução Paralela
O nó orquestrador distribui tarefas para subagentes especializados em janelas de contexto 100% isoladas (`branch` / Git Worktrees) para trabalharem simultaneamente sem colisões.
1. **`/subagente-frontend`:** Executa alterações de interface e componentes em `src/components/**` e `src/app/**/page.tsx`, utilizando as skills de suporte `/od-master-design`, `/od-emil-design-eng`, `/od-minimalist` e `/ecc-frontend-patterns`.
2. **`/subagente-backend`:** Desenvolve APIs, rotas e tabelas Supabase em `src/app/api/**` e `src/lib/**`, utilizando `/ecc-backend-patterns`, `/ecc-coding-standards` e `/ecc-clickhouse-io`.
3. **`/subagente-governanca`:** Mantém a documentação, sincroniza o cérebro Obsidian e atualiza o `AGENTS.md` via `/segundo-cerebro-ciclo-memoria-ativa`.
4. **Protocolos de Interoperabilidade:** A comunicação com ferramentas usa **MCP** (Model Context Protocol) e a troca de dados tipados entre agentes usa **A2A** (Agent2Agent). Os diffs são unificados sem conflitos via Redutores de Estado (Reducers).

---

### 🧪 FASE 4: Gauntlet Loops, Auditoria Cega & Testes Visuais
Toda entrega de um subagente é submetida a um Agente Auditor (Crítico Cego) que avalia o código contra benchmarks factuais objetivos, sem ler justificativas do construtor.
1. **Verificação Contínua:** Roda-se `/ecc-verification-loop` para garantir compilação estrita, linters e checagem de tipos (`typecheck`).
2. **TDD & Testes Unitários:** Ativa-se `/ecc-tdd-workflow` para validar suítes de testes automatizados.
3. **Revisão de Segurança:** Dispara-se `/ecc-security-review` para buscar falhas de segurança e exposição de chaves.
4. **Auditoria Visual Autónoma (BrowserMCP):** Ativa-se o `BrowserMCP` para navegar automaticamente no Chrome local, interagir com a tela, capturar evidências visuais (screenshots/vídeos na pasta `artifacts/`) e auditar microinterações via `/od-review-animations`.
5. **Loop de Refatoração Automática (`/loop`):** Se o auditor encontrar qualquer inconformidade, reprova a entrega e força o subagente construtor a corrigir o código autonomamente até atingir 100% de conformidade.

---

### 🔄 FASE 5: Governança, Interrupção Durável, Handoff & Aprendizado Contínuo
Após a aprovação do Gauntlet Loop, o pipeline congela de forma segura para o aceite humano antes do merge.
1. **Interrupção Durável (`interrupt()`):** O sistema pausa a execução e gera o relatório `walkthrough.md` com evidências, diffs e logs de teste.
2. **Aprendizado Pós-Tarefa:** Dispara-se `/ecc-continuous-learning` para registrar lições aprendidas e evitar repetição de erros em sessões futuras.
3. **Handoff de Sessão:** Executa-se `/gestao-handoff-sessao` (`/handoff`) para comprimir o estado da conversa em um arquivo Markdown estruturado, permitindo continuar o projeto em uma nova janela limpa.
4. **Retrospectiva & Encerramento:** Roda-se `/gestao-retrospectiva` e `/segundo-cerebro-atualizar-projeto` para atualizar o dashboard no Obsidian e fechar a sprint.

---

## 🛠️ 3. Caixa de Ferramentas: Prompts Prontos por Etapa

Copie e cole os modelos de prompts abaixo diretamente no chat do Antigravity IDE em cada fase do seu projeto:

---

### 🟢 Prompt 00: Setup Inicial, Pesquisa & Pre-Flight
> **Quando usar:** Antes de iniciar as especificações do projeto.

```text
[EXECUTAR FASE 0: PRE-FLIGHT & INTELIGÊNCIA DO PROJETO]

Execute o protocolo de inicialização e auditoria do repositório:

1. PESQUISA DE TENDÊNCIAS (/last30days):
   Pesquise as discussões, melhores práticas e versões mais recentes das ferramentas para a seguinte ideia de projeto: "[INSERIR IDÉIA DO PROJETO]".

2. AUDITORIA DE SEGURANÇA DE SKILLS (/skill-inspector):
   Varra o ecossistema de habilidades ativas no repositório para garantir conformidade contra injeções de prompt e comandos inseguros.

3. CONFIGURAÇÃO DE AMBIENTE (/setup-matt-pocock-skills):
   Configure o tracker de tarefas e as convenções de TDD do projeto.

4. INICIALIZAÇÃO NO SEGUNDO CÉREBRO (/segundo-cerebro-criar-projeto):
   Crie a nota inicial do projeto no vault Obsidian e prepare a sincronização do arquivo AGENTS.md.

Apresente um resumo do Pre-Flight e AGUARDE meu comando para iniciar a Fase 1.
```

---

### 🟢 Prompt 01: Gating Cognitivo & Sabatina Socrática (`Grill Me`)
> **Quando usar:** No início da definição de requisitos da funcionalidade ou projeto.

```text
[EXECUTAR FASE 1: GATING COGNITIVO & SABATINA SOCRÁTICA]

Ative as habilidades /produtividade-sabatina-decisoes (/grill-me e /grill-with-docs) e /od-design-brief.

Estou criando a seguinte funcionalidade/projeto:
"[DESCREVA DETALHADAMENTE A IDÉIA OU REQUISITO]".

REGRAS DE GATING COGNITIVO:
1. PROIBIÇÃO DE CÓDIGO: Você está ESTRITAMENTE PROIBIDO de gerar código, alterar arquivos físicos ou criar planos operacionais até o encerramento desta sabatina.
2. PERGUNTAS SOCRÁTICAS: Me entreviste em lotes de 3 a 5 perguntas focadas em:
   - Regras de negócio omissas e casos de borda.
   - Restrições técnicas, stack e convenções de código.
   - Critérios estéticos e direção visual (/od-brandkit e /od-taste-skill).
3. PROTÓTIPOS RÁPIDOS (/prototype): Se houver dúvida visual ou de fluxo, pare as perguntas e gere um protótipo descartável em arquivo único HTML para eu validar.
4. REGISTRO DE DECISÕES: Ao final, registre os acordos técnicos em docs/adr/ via /segundo-cerebro-registrar-decisao, gere a especificação funcional em /gestao-especificacao-tecnica (to-prd) e atualize o CONTEXT.md.

Comece me fazendo o primeiro lote de perguntas agora.
```

---

### 🔵 Prompt 02: Decomposição Retrógrada, Análise AST (`/graphify`) & Planejamento
> **Quando usar:** Logo após finalizar a sabatina socrática.

```text
[EXECUTAR FASE 2: ANÁLISE AST & DECOMPOSIÇÃO RETRÓGRADA]

Com base nas definições consolidadas no CONTEXT.md e nas ADRs de docs/adr/, ative os comandos /graphify, /improve, /ponytail e /gestao-gerar-tickets.

DIRETRIZES DE PLANEJAMENTO:
1. MAPEAMENTO AST DA CODEBASE (/graphify): Se a base de código já existir, mapeie as dependências estáticas em um grafo interativo (graph.json).
2. CONSULTORIA SÊNIOR (/improve): Avalie a arquitetura em 9 eixos e estruture um plano na pasta plans/.
3. POSTURA YAGNI (/ponytail): Elimine abstrações desnecessárias e mantenha o design estritamente focado no essencial.
4. DECOMPOSIÇÃO RETRÓGRADA (Backwards Design):
   - Parta dos critérios finais de aceite visual/E2E (Jornada no Navegador).
   - Derive regressivamente os Contratos de API.
   - Mapeie os Casos de Uso (Services).
   - Modele as Entidades de Domínio puras.
5. GERAR TICKETS ATÔMICOS (/gestao-gerar-tickets / to-tickets):
   - Gere o implementation_plan.md com diagrama Mermaid das camadas.
   - Gere o task.md com o checklist de tarefas atômicas ordenadas por dependência.

Apresente o resumo do plano no chat e AGUARDE MINHA APROVAÇÃO manual.
```

---

### 🟡 Prompt 03: Orquestração do Grafo de Execução (DAG) & Worktrees
> **Quando usar:** Após aprovar o `implementation_plan.md`.

```text
[EXECUTAR FASE 3: MONTAGEM DO GRAFO DE EXECUÇÃO & WORKTREES]

Com base no implementation_plan.md e no task.md aprovados, estruture o Grafo de Dependências (DAG - Directed Acyclic Graph) para orquestrar a execução.

REGRAS DO GRAFO DE EXECUÇÃO:
1. DIVISÃO EM NÓS: Fracione as tarefas em Nós de Execução isolados.
2. MAPEAR PARALELISMO: Identifique quais Nós podem rodar simultaneamente em paralelo e quais exigem pontos de sincronização (Supersteps).
3. ALOCAÇÃO DE SUBAGENTES ESPECIALIZADOS:
   - Dispare o /subagente-frontend para alterações em UI, componentes e páginas (usando /od-master-design e /ecc-frontend-patterns).
   - Dispare o /subagente-backend para alterações em APIs, serviços Supabase e validações (usando /ecc-backend-patterns e /ecc-coding-standards).
   - Dispare o /subagente-governanca para documentação e atualização do cérebro Obsidian (/segundo-cerebro-ciclo-memoria-ativa).
4. ISOLAMENTO EM GIT WORKTREES: Configure cada subagente para operar em uma branch / Git Worktree isolada para evitar colisões na árvore de arquivos.

Exiba o diagrama do Grafo de Execução no chat e aguarde autorização para iniciar o despacho.
```

---

### 🟠 Prompt 04: Disparo da Execução Paralela & Redutores de Estado
> **Quando usar:** Para iniciar o desenvolvimento concorrente dos subagentes.

```text
[DISPARAR EXECUÇÃO PARALELA DE SUBAGENTES]

Inicie o desenvolvimento do Nó [INSERIR NOME DO NÓ DO GRAFO] utilizando o padrão Map-Reduce em contexto isolado.

INSTRUÇÕES DE EXECUÇÃO:
1. Janela de Contexto Limpa: Cada subagente deve atuar com foco exclusivo na sua camada.
2. Protocolo MCP: Utilize o Model Context Protocol para interações determinísticas com o terminal e arquivos.
3. Protocolo A2A: Utilize o protocolo Agent2Agent para trocar dados tipados entre o nó orquestrador e os subagentes.
4. Unificação de Diffs (Reducers): Ao concluir as tarefas do Nó, aplique os Redutores de Estado para mesclar os diffs no ramo de desenvolvimento sem conflitos.

Exiba o progresso dos subagentes na Torre de Controle e notifique quando a execução do Nó estiver concluída.
```

---

### 🔴 Prompt 05: Gauntlet Loop & Auditoria Cega E2E (com BrowserMCP)
> **Quando usar:** Sempre que um subagente finalizar a entrega de um nó.

```text
[EXECUTAR FASE 4: AUDITORIA CEGA DE QUALIDADE & GAUNTLET LOOP]

Atue como o Agente Auditor Cego de Qualidade (totalmente isolado do subagente construtor). Sua função é testar e validar factualmente a entrega do Nó [NÚMERO DO NÓ].

PROCEDIMENTO DE AUDITORIA FACTUAL:
1. VERIFICAÇÃO CONTÍNUA (/ecc-verification-loop): Execute compilação estrita, linter e checagem de tipos (typecheck).
2. TDD & SUÍTE DE TESTES (/ecc-tdd-workflow): Rode a suíte de testes unitários e verifique a taxa de cobertura sem regressão.
3. AUDITORIA DE SEGURANÇA (/ecc-security-review): Varra o código em busca de vulnerabilidades e exposição de dados sensíveis.
4. TESTES VISUAIS E2E (BrowserMCP & /od-review-animations):
   - Inicie a aplicação localmente no terminal.
   - Abra o Chrome via BrowserMCP, navegue pelas telas desenvolvidas, interaja com botões/formulários e verifique o console do navegador em busca de exceções.
   - Capture screenshots e gravações de vídeo das evidências na pasta artifacts/.

REGRA DO GAUNTLET LOOP (/loop):
- Se houver QUALQUER FALHA ou inconformidade: Reprove a entrega, gere um relatório factual de erros e devolva autonomamente via /loop para o subagente construtor corrigir. Repita o ciclo até atingir 100% de conformidade.
- Se TUDO ESTIVER APROVADO: Emita o selo de conformidade e libere o avanço do grafo.
```

---

### 🟣 Prompt 06: Consolidação Final, Interrupção Durável (`interrupt()`) & Handoff
> **Quando usar:** Na etapa de finalização do projeto antes da mesclagem final.

```text
[EXECUTAR FASE 5: GOVERNANÇA, WALKTHROUGH & HANDOFF DE SESSÃO]

Todos os nós do Grafo de Execução foram concluídos e aprovados nos Gauntlet Loops. Execute o procedimento de finalização:

1. RELATÓRIO WALKTHROUGH: Crie o arquivo walkthrough.md na raiz do projeto contendo:
   - Resumo das alterações por camada.
   - Evidências visuais (screenshots/vídeos do BrowserMCP) armazenadas em artifacts/.
   - Logs de aprovação dos linters e da suíte de testes.
   - Diffs de código consolidados.
2. APRENDIZADO CONTINUO (/ecc-continuous-learning): Registre as lições aprendidas e padrões técnicos no repositório.
3. INTERRUPÇÃO DURÁVEL: Invoque a instrução interrupt() para congelar a pipeline de forma segura para a revisão humana.
4. HANDOFF DE SESSÃO (/gestao-handoff-sessao / /handoff): Comprima o contexto da sessão em um arquivo Markdown estruturado.
5. ATUALIZAÇÃO DO SEGUNDO CÉREBRO (/segundo-cerebro-atualizar-projeto e /gestao-retrospectiva): Atualize o status no vault Obsidian e feche a sprint.

Apresente o link do walkthrough.md no chat para a minha revisão final e aguarde autorização para fazer o merge no ramo principal (main).
```

---

## 📌 4. Matriz Completa de Comandos Rápidos (/slash)

| Comando | Categoria | Descrição Curta |
| :--- | :--- | :--- |
| `/last30days` | Pesquisa | Pesquisa tendências e discussões dos últimos 30 dias na comunidade tech. |
| `/graphify` | AST Grafo | Mapeia a codebase em grafo interativo (`graph.json`, `graphify query`). |
| `/improve` | Auditoria | Executa consultoria sênior em 9 eixos e gera planos em `plans/`. |
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
| `/gestao-handoff-sessao` | Handoff | Comprime a sessão em Markdown (`/handoff`) para continuidade em nova janela. |
| `/ecc-continuous-learning` | Memória | Registra reflexões pós-tarefa e aprendizados técnicos reutilizáveis. |
