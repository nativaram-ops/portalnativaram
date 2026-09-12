---
tipo: adr
status: pronto
prioridade: alta
ferramenta_principal: Antigravity IDE
para_quem_e: Arquitetura & Engenharia de IA
categoria: Decisão de Arquitetura
---

# ADR-006: Orquestração por Grafos (Graph Workflow), Gauntlet Loops & Isolamento de Subagentes

## Status
**Aprovado e Implementado**

## Contexto
O portal da Cooperativa Nativaram atingiu maturidade técnica com dezenas de módulos em Next.js 15, persistência híbrida (Supabase PostgreSQL e JSON atômico) e governança viva no Obsidian.
Para prevenir regressões, corridas de concorrência ou sobrescritas acidentais entre diferentes frentes técnicas durante a evolução contínua com múltiplos agentes de IA, fez-se imperativo adotar uma metodologia estrita de **Orquestração por Grafos (Graph Workflow)** associada a **Gauntlet Loops** (portões de aceitação supervisionados).

## Decisão de Arquitetura

### 1. Frentes Especializadas e Isolamento Físico de Subagentes
Foram formalizados 3 subagentes de atuação paralela com fronteiras de diretórios mutuamente exclusivas:
- **`subagente-frontend`**: Restrito a `src/components/**`, `src/app/**/page.tsx`, `src/app/globals.css`.
- **`subagente-backend`**: Restrito a `src/app/api/**`, `src/lib/**`, `src/types/**`, `scripts/**`.
- **`subagente-governanca`**: Restrito a `Segundo-Cerebro/**`, `src/data/**`, `AGENTS.md`, `plans/**`.

### 2. Encadeamento DAG (Directed Acyclic Graph)
A execução de melhorias ocorre em 4 ilhas encadeadas:
1. **Nó 1 (Fundação & Contratos):** Schemas Zod, tipagens, linter e rewrites canônicos.
2. **Nó 2 (Engine & Segurança):** Hardening de tokens, memoização de banco e testes de integração REST.
3. **Nó 3 (Frontend & Funil):** UX, navegação em 5 etapas, acessibilidade WCAG e layout A4 print.
4. **Nó 4 (Consolidação & Memória):** Atualização do cofre Obsidian, registros de ADR e fechamento.

### 3. Gauntlet Loops como Portões de Qualidade
Nenhum nó avança para o estágio subsequente sem passar pelos testes rígidos de aceitação do Supervisor:
- Verificação de tipos estritos (`npx tsc --noEmit` código 0).
- Suíte automatizada de testes (`npm test` com 11 verificações verdes em 0.8s via `jiti`).
- Scanner semântico de vocabulário litúrgico (zero termos proibidos de comércio/medicina).
- Zero credenciais embutidas em código-fonte.

## Consequências
- **Positivas:** Zero sobreposição de arquivos; impossibilidade de quebras silenciosas no frontend causadas por alterações prematuras de backend; testes rápidos (sub-segundo) e blindagem contra vazamento de tokens.
- **Governança:** Cada entrega fica registrada e rastreável nos planos executáveis em `plans/` e no cofre do Segundo Cérebro.

---

## Relações

### Depende de
- [[Roadmap-e-Componentes-do-Site]]
- [[Guia-de-Skills-e-Comandos]]
- [[Indice-de-Recuperacao-Rapida]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[00-Mapa-Mental-Portal-Nativaram]]

### Relacionado a
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[ADR-002-Composicao-Modular-e-Design-System]]
- [[ADR-003-Funil-de-Conversao-e-Jornada-Didatica]]
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
