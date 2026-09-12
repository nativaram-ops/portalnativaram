# Índice de Planos de Melhoria (/improve)

Este diretório contém os planos executáveis de melhoria gerados pelo conselheiro de auditoria sênior (`/improve`), orquestrados por Grafos de Dependência (Graph Workflow) e validados pelos **Gauntlet Loops** através dos subagentes especializados (`subagente-frontend`, `subagente-backend`, `subagente-governanca`).

## Tabela de Status dos Planos

| # | Plano | Categoria | Impacto | Esforço | Status | Dependências |
|---|---|---|---|---|---|---|
| 001 | [Funil de Conversão & Jornada Didática](001-funil-conversao-jornada-didatica.md) | Arquitetura / UX | ALTO | MÉDIO | **CONCLUÍDO (HOMOLOGADO)** | Nenhuma |
| 002 | [Hardening de APIs & Testes de Integração](002-api-security-and-integration-tests.md) | Segurança / Testes | ALTO | PEQUENO | **CONCLUÍDO (HOMOLOGADO)** | Nenhuma |
| 003 | [Rota Canônica de Sacramentos & ESLint](003-canonical-sacramentos-route-and-eslint.md) | DX / Compliance | MÉDIO | PEQUENO | **CONCLUÍDO (HOMOLOGADO)** | Nenhuma |

## Síntese de Execução dos Gauntlet Loops
1. **002-api-security-and-integration-tests.md**: Token sanitizado via `ADMIN_SECRET_KEY`, cliente Supabase memoizado e suíte de testes expandida para 11 verificações instantâneas via `jiti` (0.8s).
2. **003-canonical-sacramentos-route-and-eslint.md**: Rota `/sacramentos` configurada como alias canônico transparente com rewrites em `next.config.mjs`, navbar e funil sincronizados e `.eslintrc.json` adicionado.
3. **001-funil-conversao-jornada-didatica.md**: Conexão das 5 estações do funil (`/institucional` → `/feitio` → `/sacramentos` → `/compliance` → `/credenciamento`), alinhamento visual e componentes táticos integrados.
