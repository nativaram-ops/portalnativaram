---
tipo: guia_skills
status: pronto
prioridade: alta
ferramenta_principal: Antigravity IDE
para_quem_e: Uso próprio
categoria: Catálogo de Comandos
---

# ⚡ Manual Completo de Utilização de Skills & Comandos Rápidos

Este guia é o manual operacional definitivo de todo o ecossistema de habilidades do ambiente de desenvolvimento. Ele abrange a integração entre as **habilidades locais do projeto** (`.agents/skills/`), agora também instaladas na **camada global da IDE** (`C:\Users\victo\.gemini\config\skills\`), as ferramentas do **novo harness de alta performance** e a suíte de **frameworks do GitHub & servidores MCP**.

---

## 🧭 Visão Geral da Arquitetura em 4 Camadas

Todas as habilidades estão organizadas em 4 camadas complementares para garantir especialização, resiliência e ausência de atritos:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Camada 1: Domínio & Negócio Local (.agents/skills & global IDE)        │
│ 44 Skills: Segundo Cérebro, Engenharia, TDD, Subagentes, Governança    │
├─────────────────────────────────────────────────────────────────────────┤
│ Camada 2: Stack Web & Frontend (Global IDE)                             │
│ 8 Skills: Next.js 15, App Router, Tailwind, WCAG, Vercel Standards     │
├─────────────────────────────────────────────────────────────────────────┤
│ Camada 3: Harness de Alta Performance (Global IDE)                      │
│ 31 Skills: last30days, graphify, improve, ponytail, ecc-*, od-*         │
├─────────────────────────────────────────────────────────────────────────┤
│ Camada 4: Frameworks do GitHub & Protocolo MCP (Global IDE & MCP)      │
│ 10 Suítes: Firecrawl, stop-slop, Handoff, Grill Me, Obra Superpowers,   │
│            Understand-Anything, Caveman, skill-optimizer, Daydream,     │
│            Composio MCP Gateway                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

> [!NOTE]
> **Instalação Global Unificada**: Todas as 44 habilidades da Camada 1 foram espelhadas no diretório global da IDE (`C:\Users\victo\.gemini\config\skills\`). Elas estão prontas para acionamento tanto no portal Nativaram quanto em qualquer outro workspace.

---

## 🚀 Como Acionar Habilidades

No chat da IDE ou interface do assistente, utilize o caractere `/` seguido do identificador da habilidade ou use linguagem natural declarativa:

```bash
# Exemplos diretos de disparo:
/grill-me "Planejamento do sistema de agendamento de ritos"
/caveman "Otimize este componente React removendo verbosidade"
/obra-brainstorming "Novo painel administrativo do dirigente"
/understand-explain src/lib/supabase/client.ts
/vault-daydream
/handoff-session-wrapup
```

---

## 📂 Catálogo Detalhado das 4 Camadas

### 🏛️ Camada 1: Habilidades Nativas de Domínio & Engenharia

#### 1. 🧠 Segundo Cérebro (Obsidian & Memória Ativa)
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/segundo-cerebro-ciclo-memoria-ativa` | Loop mandatório de ler o Obsidian antes e gravar após alterações | Antes e depois de qualquer alteração de código ou arquitetura |
| `/segundo-cerebro-atualizar-projeto` | Atualiza escopo, relações e progresso de notas de projeto | Ao concluir etapas ou alterar o escopo planejado |
| `/segundo-cerebro-atualizar-status` | Muda o status (`ideia`, `planejamento`, `em andamento`, `pronto`) | Ao iniciar, travar ou finalizar uma funcionalidade |
| `/segundo-cerebro-auditar-conteudo` | Varre e remove dados mockados ou inconsistentes | Em auditorias periódicas de conformidade do vault |
| `/segundo-cerebro-criar-projeto` | Cria uma nova nota estruturada no padrão Obsidian | Ao iniciar uma nova iniciativa ou frente de trabalho |
| `/segundo-cerebro-registrar-decisao` | Cria uma ADR técnica formal documentando decisões de impacto | Ao escolher bibliotecas, padrões de banco ou contratos de API |
| `/segundo-cerebro-registrar-ideia` | Registra rascunhos e insights rápidos na Inbox do cofre | Ao ter ideias preliminares que ainda não formam um projeto |
| `/segundo-cerebro-registrar-relacao` | Cria conexões `[[Nota]]` nos subtítulos semânticos | Para conectar entidades e documentações correlatas |
| `/segundo-cerebro-revisar-dashboard` | Analisa a saúde das iniciativas e atualiza o mapa geral | No fechamento de sprints ou marcos de entrega |
| `/segundo-cerebro-sugerir-registro` | Analisa marcos complexos e sugere estrutura no Obsidian | Quando uma entrega técnica complexa precisa ser perenizada |
| `/segundo-cerebro-configuracao` | Reconfigura e sincroniza as regras do Segundo Cérebro | Para alinhar o `AGENTS.md` às novas convenções do vault |

#### 2. ⚙️ Engenharia, Código & Resiliência
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/engenharia-revisar-codigo` | Revisão sistemática de código recente contra padrões e spec | Antes de commits ou ao fechar um ciclo de implementação |
| `/engenharia-diagnosticar-bugs` | Investigação sistemática com isolamento de hipóteses | Diante de erros de runtime, falhas em APIs ou regressões |
| `/engenharia-resolver-conflitos-git` | Resolução segura passo a passo de conflitos de merge/rebase | Quando o Git indicar conflito entre branches |
| `/engenharia-guardrails-git` | Ativa travas preventivas contra comandos Git destrutivos | Para proteger branches principais contra reset hard ou force push |
| `/engenharia-implementar-especificacao` | Implementação estrita orientada a tickets de especificação | Para codificar features a partir de um plano validado |
| `/engenharia-melhorar-arquitetura` | Refatoração para desacoplamento e aprofundamento modular | Quando módulos acumularem muitas responsabilidades |
| `/engenharia-migrar-tipos-shoehorn` | Remove asserções `as` inseguras em favor de tipagem estrita | Ao auditar arquivos de teste e schemas TypeScript |

#### 3. 🧪 Testes, Qualidade & CI
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/testes-desenvolvimento-tdd` | Ciclo TDD estrito (Red-Green-Refactor) | Antes de escrever código funcional para novas regras de negócio |
| `/testes-configurar-pre-commit` | Configura hooks Husky, lint-staged e typecheck automatizado | Para garantir que commits passem por verificação prévia |
| `/testes-estruturar-exercicios` | Cria cenários práticos e suites didáticas com gabarito | Na preparação de testes de integração e cenários de homologação |

#### 4. 🏛️ Arquitetura de Domínio & Interfaces
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/arquitetura-design-modular` | Projeta módulos profundos com interfaces simples | Na criação de serviços de persistência e orquestradores |
| `/arquitetura-modelagem-dominio` | Alinha o vocabulário ubíquo, `CONTEXT.md` e ADRs | Na introdução de novos sacramentos, termos ou ritos |
| `/arquitetura-prototipar-ui` | Cria protótipos visuais ágeis para teste ergonômico | Antes de codificar interfaces definitivas |

#### 5. ⚡ Produtividade, Pesquisa & IA
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/produtividade-integracao-notebooklm` | Consulta notebooks e gera áudios de resumo via NotebookLM | Para resumir a base documental em podcasts técnicos |
| `/produtividade-pesquisa-tecnica` | Pesquisa investigativa em fontes primárias e docs oficiais | Ao avaliar novas APIs ou bibliotecas de terceiros |
| `/produtividade-sabatina-decisoes` | Sabatina rigorosa para estressar planos e premissas | Antes de aprovar arquiteturas de alto risco |
| `/produtividade-assistente-wizard` | Gera wizards passo a passo interativos no terminal | Para conduzir operações manuais críticas de configuração |
| `/produtividade-orientacao-skills` | Recomenda a melhor skill para a tarefa em questão | Em caso de dúvida sobre qual comando utilizar |

#### 6. 📋 Gestão, Triagem & Transição
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/gestao-triagem-issues` | Classifica e aplica labels em issues do GitHub | Na triagem semanal de backlog |
| `/gestao-especificacao-tecnica` | Converte conversas em especificações técnicas formais | Antes de implementar features de grande porte |
| `/gestao-gerar-tickets` | Desmembra especificações em subtarefas acionáveis | Para alimentar o ciclo de desenvolvimento incremental |
| `/gestao-questionario-requisitos` | Formula questionários objetivos para resolver dúvidas | Ao receber requisitos vagos ou incompletos |
| `/gestao-handoff-sessao` | Compacta o estado da sessão para continuar em outra janela | No final do dia ou ao alternar contextos de trabalho |
| `/gestao-retrospectiva` | Conduz retrospectivas técnicas após marcos de entrega | No encerramento de sprints ou marcos de versão |
| `/gestao-mapa-navegacao` | Desenha mapas de decisões para iniciativas complexas | Para monitorar o avanço de migrações e lançamentos |

#### 7. ✍️ Redação & Documentação
| Comando | Finalidade | Quando Usar |
|---|---|---|
| `/documentacao-escrita-para-agentes` | Escreve prompts e regras com fidelidade de máquina | Ao criar novas skills ou prompts de subagentes |
| `/documentacao-redacao-estruturada` | Redige manifestos e textos analíticos parágrafo a parágrafo | Em manifestos, termos de adesão e textos institucionais |
| `/documentacao-ensinar-conceito` | Explica conceitos etnobotânicos ou técnicos didaticamente | Em cartilhas e seções explicativas do portal |
| `/documentacao-revisar-clareza` | Reformula explicações técnicas garantindo máxima clareza | Ao simplificar textos densos ou contratos de adesão |

#### 8. ⚡ Subagentes Especializados (Execução Isolada)
| Subagente | Escopo de Arquivos | Responsabilidade Central |
|---|---|---|
| `/subagente-frontend` | `src/components/**`, `src/app/**/page.tsx`, `src/app/globals.css` | UI, responsividade, componentes React e Tailwind |
| `/subagente-backend` | `src/app/api/**`, `src/lib/**`, `src/types/**`, `data/**` | APIs REST, Supabase, validação Zod e tipagem |
| `/subagente-governanca` | `Segundo-Cerebro/**`, `src/data/**`, `AGENTS.md` | Obsidian, fitoquímica canônica e compliance legal |

---

### 🌐 Camada 2: Stack Web & Frontend (Vercel & Next.js)

- **`accessibility-wcag`**: Diretrizes WCAG 2.1 AA (ARIA, foco, contraste 4.5:1, navegação por teclado).
- **`nextjs-app-router`**: Next.js 15 App Router (Server Components, layouts aninhados, streaming).
- **`seo-metadata-optimization`**: Metadados dinâmicos, OpenGraph, JSON-LD institucional e Core Web Vitals.
- **`tailwind-design-system`**: Tokens de design, consistência cromática institucional e responsividade.
- **`typescript-zod-forms`**: Schemas Zod combinados a React Hook Form e Server Actions.
- **`vercel-composition-patterns`**: Padrões de composição e inversão de controle da engenharia Vercel.
- **`vercel-react-best-practices`**: Eliminação de re-renderizações e padrões oficiais de React.
- **`vercel-web-design-guidelines`**: Checklist visual e ergonômico da Vercel.

---

### 🚀 Camada 3: Harness de Alta Performance da IDE

- **`/last30days`**: Pesquisa nos últimos 30 dias em Reddit, X, YouTube, GitHub e Web aberta.
- **`/graphify`**: Grafo de conhecimento interativo da base de código via AST (`graph.html`, `graph.json`, exportação para Obsidian com `--obsidian`).
- **`/improve`**: Consultor de auditoria sênior em 9 dimensões com planos em `plans/`.
- **`/ponytail`**: Filosofia anti-overengineering: menor caminho viável, biblioteca padrão antes de código extra (`/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-review`).
- **Suíte `ecc-*`**: Loop de verificação (`/ecc-verification-loop`), TDD (`/ecc-tdd-workflow`), segurança (`/ecc-security-review`), compactação (`/ecc-strategic-compact`) e padrões (`/ecc-frontend-patterns`, `/ecc-backend-patterns`).
- **Suíte `od-*`**: OpenDesign master (`/od-master-design`), bom gosto estético (`/od-taste-skill`), microinterações de Emil Kowalski (`/od-emil-design-eng`), tokens (`/od-brandkit`) e conversão de mockups (`/od-image-to-code`).
- **`/skill-inspector`**: Scanner de segurança da NVIDIA para auditoria estática de novas habilidades de IA.

---

### ⚡ Camada 4: Suíte GitHub & Servidores MCP

| Ferramenta | Comando / MCP | Como Utilizar na Prática |
|---|---|---|
| **Firecrawl** | `/firecrawl-research` ou MCP `firecrawl` | Extração de páginas web complexas, documentações externas e conversão automática em Markdown limpo |
| **stop-slop** | `/stop-slop` | Filtro pós-redação para eliminar clichês de IA, travessões excessivos e introduções corporativas vazias |
| **Handoff Suite** | `/handoff-session-wrapup` e `/handoff-session-pickup` | Transição perfeita de contexto entre janelas da IDE ou diferentes modelos sem perda de raciocínio |
| **Grill Me** | `/grill-me` | Entrevista inquisitiva onde a IA desafia cada decisão técnica antes de qualquer linha de código |
| **Obra Superpowers** | `/obra-superpowers`, `/obra-brainstorming`, `/obra-using-git-worktrees` | Metodologia agêntica completa com worktrees isolados, TDD e despacho de subagentes |
| **Understand-Anything** | `/understand`, `/understand-dashboard`, `/understand-explain` | Geração de grafos conceituais e dashboards de arquitetura para visualização espacial do projeto |
| **Caveman** | `/caveman`, `/caveman-compress`, `/caveman-commit` | Reduz em até 65% o consumo de tokens eliminando cortesias e focando 100% em código e fatos |
| **skill-optimizer** | `/skill-miner`, `/skill-personalizer`, `/skill-generalizer` | Minera as últimas conversas da IDE para extrair rotinas repetidas e transformá-las em novas skills |
| **Vault Daydream** | `/vault-daydream` | Analisa em background notas do Obsidian aos pares para sugerir conexões não óbvias e novos links conceituais |
| **Composio** | `/composio` ou MCP `composio` | Automação e execução de ações em mais de 1.000 ferramentas SaaS (GitHub, Linear, Slack, Stripe, Jira) |

---

## 🛠️ Playbooks de Execução Prática (Fluxos de Trabalho Reais)

### 📌 Playbook 1: Da Ideia à Implementação com TDD e Worktrees
Use este fluxo para criar qualquer funcionalidade nova de ponta a ponta com segurança total:
1. **Concepção & Sabatina**:
   ```
   /obra-brainstorming "Módulo de agendamento de retiros e vivências"
   /grill-me "Valide a arquitetura do agendamento com Supabase e WhatsApp"
   ```
2. **Isolamento em Git Worktree**:
   ```
   /obra-using-git-worktrees feature/agendamento-vivencias
   ```
3. **Desenvolvimento Guiado por Testes (TDD)**:
   ```
   /obra-test-driven-development
   ```
4. **Verificação Automatizada**:
   ```
   /ecc-verification-loop
   ```
5. **Finalização e Merge**:
   ```
   /obra-finishing-a-development-branch
   ```

---

### 📌 Playbook 2: Investigação Sistemática de Falhas (Debugging)
Quando ocorrer um erro inesperado de runtime, regressão ou falha de requisição:
1. **Diagnóstico Sistemático**:
   ```
   /obra-systematic-debugging "Erro de timeout intermitente na rota /api/pedidos"
   ```
2. **Varredura de Débitos & Overengineering**:
   ```
   /ponytail-review
   ```
3. **Validação de Resiliência**:
   ```
   /learned-resilient-db-timeouts
   ```

---

### 📌 Playbook 3: Manutenção e Sincronização do Segundo Cérebro (Obsidian)
Para manter o Segundo Cérebro sempre atualizado com o código:
1. **Consulta Mandatória (Antes)**:
   ```
   /segundo-cerebro-ciclo-memoria-ativa
   ```
2. **Descoberta de Conexões Ocultas**:
   ```
   /vault-daydream
   ```
3. **Atualização Estruturada**:
   ```
   /segundo-cerebro-atualizar-projeto "Portal Cooperativa Nativaram"
   ```

---

### 📌 Playbook 4: Economia de Tokens em Grandes Refatorações
Para trabalhar em projetos longos sem estourar limites de contexto ou gastar tokens desnecessários:
1. **Ativação do Modo Caveman**:
   ```
   /caveman full
   ```
2. **Compactação Estratégica**:
   ```
   /ecc-strategic-compact
   ```
3. **Encerramento e Handoff**:
   ```
   /handoff-session-wrapup
   ```

---

### 📌 Playbook 5: Extração Web e Ações SaaS
Para pesquisas aprofundadas e integrações com serviços externos:
1. **Pesquisa em Tempo Real**:
   ```
   /firecrawl-research "Novas resoluções do CONAD e ANVISA para 2026"
   ```
2. **Pesquisa de Tendências Recentes**:
   ```
   /last30days "Next.js 15 Server Actions best practices"
   ```
3. **Ações no GitHub via Composio**:
   ```
   /composio
   cmd.exe /c "npx composio-core add github"
   ```

---

## 🔒 Regras Críticas de Execução no Ambiente

1. **Terminal Windows**: Sempre executar scripts Node e comandos npm através de `cmd.exe /c` para não sofrer bloqueios da política do PowerShell (`ExecutionPolicy`).
2. **Porta 3000**: Em caso de travamento do servidor Next.js, liberar a porta 3000 finalizando o processo órfão antes da reinicialização (`taskkill /PID <PID> /F`).
3. **Integridade do Segundo Cérebro**: O cofre do Obsidian (`Segundo-Cerebro/`) armazena documentação, decisões e links conceituais. Nunca incluir código completo ou dumps dentro do vault.

---

## Relações

### Depende de
- [[Roadmap-e-Componentes-do-Site]]
- [[Nativaram-Brasil]]
- [[Desenvolvimento com IA - Metodologia Agêntica]]

### Relacionado a
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Indice-de-Recuperacao-Rapida]]
- [[ADR-006-Orquestracao-por-Grafos-e-Gauntlet-Loops]]
