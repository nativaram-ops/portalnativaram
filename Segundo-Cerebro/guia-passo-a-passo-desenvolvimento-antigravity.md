# Guia Prático de Desenvolvimento Agêntico no Antigravity IDE (SE 3.0)

Este documento é o seu manual operacional para criar e gerenciar projetos de desenvolvimento de software utilizando a metodologia de **Engenharia Agêntica (SE 3.0)** dentro do **Antigravity IDE** (e ecossistemas de agentes modernos).

---

## 1. Estrutura de Arquivos e Diretórios na IDE

Para que o Antigravity IDE reconheça automaticamente suas diretrizes, regras de arquitetura e subagentes, seu repositório deve seguir a estrutura padrão abaixo:

```text
meu-projeto/
├── .agents/
│   ├── skills/
│   │   ├── grill-me/SKILL.md            # Skill de sabatina socrática e gating cognitivo
│   │   ├── backwards-design/SKILL.md    # Skill de decomposição baseada no aceite E2E
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
├── CONTEXT.md                            # Glossário de domínio e regras ubíquas do projeto
├── implementation_plan.md               # Plano de implementação arquitetural gerado pela IA
├── task.md                              # Checklist de tarefas atômicas executáveis
└── walkthrough.md                       # Evidências de teste, logs e diffs para merge
```

---

## 2. Passo a Passo Operacional: Do Zero à Entrega Final

### Fase 0: Inicialização e Gating Cognitivo (Sabatina "Grill Me")
* **Objetivo:** Impedir que a IA tome decisões arbitrárias ou comece a codificar antes de entender completamente os requisitos.
* **Como utilizar na IDE:**
  1. Abra o painel lateral de chat/controle no Antigravity IDE.
  2. Execute o **Prompt 01** (abaixo) para ativar a postura socrática.
  3. Responda às perguntas da IA em lotes. Quando houver dúvida sobre interfaces, peça um protótipo descartável em arquivo único HTML (`/prototype`).
  4. Ao finalizar, ordene que a IA registre os acordos no arquivo `CONTEXT.md` na raiz do projeto.

### Fase 1: Engenharia Reversa, Backwards Design e Análise Pré-Código
* **Objetivo:** Projetar o sistema de trás para frente (Critério de Aceite Visual/E2E → Rotas de API → Casos de Uso → Domínio) e analisar o impacto na base legada.
* **Como utilizar na IDE:**
  1. Se a base de código já existir, ordene ao agente realizar uma varredura AST (Árvore de Sintaxe Abstrata) para mapear acoplamentos estáticos.
  2. Execute o **Prompt 02** para gerar a decomposição retrógrada.
  3. Verifique a geração dos arquivos `implementation_plan.md` e `task.md`.
  4. Revise o plano diretamente na IDE e adicione comentários de ajuste antes de aprovar a execução.

### Fase 2: Estruturação do Grafo de Dependências (DAG) e Worktrees
* **Objetivo:** Mapear quais tarefas dependem de quais insumos e preparar o isolamento físico de execução.
* **Como utilizar na IDE:**
  1. Execute o **Prompt 03** para que a IA monte o Grafo de Execução em etapas/nós.
  2. O Antigravity IDE criará instâncias isoladas (via **Git Worktrees** ou Sandboxes de Terminal efêmeras) para cada subagente. Isso garante que o desenvolvimento da UI não colida com o desenvolvimento do Banco de Dados.

### Fase 3: Execução Paralela por Subagentes Isolados
* **Objetivo:** Executar tarefas independentes simultaneamente em janelas de contexto limpas (100% de foco por subagente).
* **Como utilizar na IDE:**
  1. Use o **Prompt 04** para disparar a execução simultânea.
  2. Acompanhe pela Torre de Controle (Manager View) da IDE os subagentes atuando em paralelo.
  3. A comunicação entre subagentes e ferramentas externas utiliza os protocolos **MCP** (Model Context Protocol) e **A2A** (Agent2Agent). Os resultados são unificados via Redutores de Estado (Reducers).

### Fase 4: Gauntlet Loop & Auditoria Cega de Qualidade
* **Objetivo:** Garantir que o código gerado seja validado por um agente auditor sem viés antes da aprovação.
* **Como utilizar na IDE:**
  1. Execute o **Prompt 05** para ativar o subagente auditor (`auditor-gauntlet`).
  2. O auditor abre o navegador local via `BrowserMCP` / Playwright, roda a suíte de testes unitários/TDD e verifica os linters estritos.
  3. Se encontrar falhas, o auditor dispara automaticamente o loop de correção (`/loop`), fazendo o subagente construtor refatorar até alcançar 100% de conformidade factual.

### Fase 5: Governança, Interrupção Durável e Merge final
* **Objetivo:** Realizar o aceite humano seguro antes da fusão final dos ramos de trabalho.
* **Como utilizar na IDE:**
  1. A instrução `interrupt()` congela a execução do pipeline de forma durável.
  2. A IA gera o relatório `walkthrough.md` com prints de tela, logs de teste e diffs consolidados.
  3. Você revisa a entrega e clica em **Approve/Merge** para integrar o código ao ramo principal.

---

## 3. Caixa de Ferramentas: Modelos de Prompts por Etapa

Copie e cole os modelos abaixo diretamente no chat do Antigravity IDE no momento correspondente de cada projeto.

---

### 🟢 Prompt 01: Gating Cognitivo & Entrevista Socrática (`Grill Me`)
> **Quando usar:** No primeiro segundo de um novo projeto ou funcionalidade.

```text
[ATIVAR SKILL: GRILL-ME / GATING COGNITIVO]

Atue como um Arquiteto de Software Socrático e Especialista em Engenharia de Domínio. 
Estou iniciando a criação do seguinte projeto/funcionalidade:
"[DESCREVA RESUMIDAMENTE A SUA IDÉIA AQUI]".

REGRAS DE ATUAÇÃO OBRIGATÓRIAS:
1. GATING COGNITIVO: Você está ESTRITAMENTE PROIBIDO de gerar código, criar planos de implementação ou alterar arquivos físicos no repositório até que eu declare esta fase encerrada.
2. SABATINA SOCRÁTICA: Me entreviste fazendo de 3 a 5 perguntas objetivas por rodada sobre:
   - Casos de borda e regras de negócio não explicitadas.
   - Restrições técnicas, stack preferida e convenções de arquitetura.
   - Critérios de aceite quantitativos e comportamentais.
3. PROTÓTIPOS RÁPIDOS: Se houver dúvida quanto à interface gráfica ou fluxo visual, pare as perguntas e gere um protótipo leve em arquivo único HTML (/prototype) para eu validar.
4. REGISTRO DE CONTEXTO: Ao final da nossa conversa, consolide todas as respostas no arquivo `CONTEXT.md` na raiz do projeto.

Comece me fazendo o primeiro lote de perguntas agora.
```

---

### 🔵 Prompt 02: Decomposição Retrógrada (`Backwards Design`) & Plano de Ação
> **Quando usar:** Logo após encerrar a sabatina socrática.

```text
[ATIVAR SKILL: BACKWARDS-DESIGN / PLANEJAMENTO ARQUITETURAL]

Com base nas definições consolidadas no arquivo `CONTEXT.md`, execute a Decomposição Retrógrada (Backwards Design) para estruturar o desenvolvimento.

DIRETRIZES DE DECOMPOSIÇÃO:
1. Comece pelo critério final de sucesso no ambiente de execução (Jornada E2E do usuário / Interface Visual).
2. Derive regressivamente os Contratos de API necessários para alimentar essa interface.
3. Defina os Casos de Uso (Services) que coordenam essa lógica.
4. Modele as Entidades de Domínio puras e esquemas de persistência.
5. Se este for um projeto em uma codebase existente, execute uma análise estática por AST para mapear acoplamentos e dependências antes de alterar arquivos.

ARTEFATOS EXIGIDOS NA RAIZ:
- Crie o arquivo `implementation_plan.md` detalhando a decisão de arquitetura, padrões utilizados e diagrama Mermaid das camadas.
- Crie o arquivo `task.md` contendo um checklist de tarefas atômicas e ordenadas por dependência.

Apresente o resumo do plano no chat e AGUARDE A MINHA APROVAÇÃO manual para prosseguir.
```

---

### 🟡 Prompt 03: Estruturação do Grafo de Orquestração (DAG) & Subagentes
> **Quando usar:** Após aprovar o `implementation_plan.md`.

```text
[ATIVAR SKILL: GRAPH-ORCHESTRATOR / SETUP DE SUBAGENTES]

Com base no `implementation_plan.md` aprovado, estruture o Grafo de Dependências (DAG - Directed Acyclic Graph) para a execução do projeto.

REGRAS DE MONTAGEM DO GRAFO:
1. Divida a execução em NÓS (Ilhas de Trabalho).
2. Defina explicitamente:
   - Quais nós podem ser executados em PARALELO simultaneamente (ex: Nó DB e Nó UI).
   - Quais nós exigem SINCRONIZAÇÃO antes de avançar (Supersteps).
3. Atribua cada Nó a um SUBAGENTE ESPECIALIZADO com instrução e contexto isolados:
   - Exemplo: `subagent-db` para migrações e entidades.
   - Exemplo: `subagent-api` para controllers e rotas.
   - Exemplo: `subagent-ui` para componentes gráficos.
4. Configure Git Worktrees ou Sandboxes de Terminal isoladas para que os subagentes não colidam arquivos durante a escrita.

Apresente o diagrama do Grafo de Execução no chat e aguarde a autorização para iniciar o despacho dos subagentes.
```

---

### 🟠 Prompt 04: Disparo da Execução Paralela & Handoff de Contexto
> **Quando usar:** Para iniciar o trabalho simultâneo dos subagentes.

```text
[DISPARAR EXECUÇÃO PARALELA DE SUBAGENTES]

Inicie a execução do Nó [INSERIR NÚMERO/NOME DO NÓ DO GRAFO] utilizando o padrão Map-Reduce.

INSTRUÇÕES PARA OS SUBAGENTES:
1. Cada subagente deve rodar em uma janela de contexto limpa e isolada no repositório.
2. Utilize o protocolo MCP para interagir de forma determinística com o terminal e com a árvore de arquivos.
3. Utilize o protocolo A2A para enviar os dados tipados produzidos para o nó orquestrador.
4. Aplique os Redutores de Estado (Reducers) ao finalizar para unificar os diffs de código no ramo do projeto sem conflitos.

Exiba o status de execução de cada subagente na Torre de Controle e notifique assim que todos os subagentes do nó concluírem suas tarefas.
```

---

### 🔴 Prompt 05: Gauntlet Loop & Auditoria Cega E2E (com BrowserMCP)
> **Quando usar:** Sempre que um subagente entregar uma camada de código pronta.

```text
[ATIVAR SKILL: AUDITOR-GAUNTLET / AUDITORIA CEGA DE QUALIDADE]

Atue como o Agente Auditor Cego de Qualidade (Totalmente isolado do subagente construtor). Sua função é testar e desafiar o código gerado no Nó [NÚMERO DO NÓ].

PROCEDIMENTO DE AUDITORIA FACTUAL:
1. SANITY CHECK: Execute a suíte de testes unitários e os linters do projeto no terminal.
2. VERIFICAÇÃO VISUAL/E2E: Ative o `BrowserMCP` / Playwright, abra a aplicação rodando localmente, navegue pelas telas desenvolvidas e verifique se há erros no console do Chrome.
3. CONFORMIDADE ARQUITETURAL: Garanta que nenhuma regra de negócio vazou para a camada de apresentação e que as convenções do `CONTEXT.md` foram respeitadas.

REGRA DO GAUNTLET LOOP (/loop):
- Se ENCONTRAR QUALQUER FALHA ou inconformidade: Reprove a entrega, gere um relatório factual de erros e devolva autonomamente para o subagente construtor corrigir. Repita esse loop até atingir 100% de aprovação.
- Se TUDO ESTIVER APROVADO: Emita o selo de conformidade e libere o avanço para o próximo Nó do Grafo.
```

---

### 🟣 Prompt 06: Interrupção Durável (`interrupt()`) & Merge-Readiness Pack
> **Quando usar:** Na etapa final do projeto, antes do merge final.

```text
[CONSOLIDAÇÃO FINAL & MERGE-READINESS PACK]

O desenvolvimento e a auditoria de todos os nós do Grafo foram concluídos com sucesso.

EXIGÊNCIAS DE FINALIZAÇÃO:
1. Crie o arquivo `walkthrough.md` na raiz do projeto contendo:
   - Resumo de todas as alterações realizadas por camada.
   - Screenshots/Evidências capturadas durante os testes visuais E2E pelo BrowserMCP.
   - Logs de aprovação da suíte de testes e linters.
   - Diffs consolidados de código.
2. Invoque a instrução de interrupção durável `interrupt()` para congelar a pipeline de execução de forma segura.

Apresente o link do `walkthrough.md` no chat para a minha revisão manual e aguarde a autorização final para realizar a fusão (Merge) no ramo principal (`main`).
```
