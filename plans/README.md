# Índice de Planos de Melhoria (/improve — Ciclo Completo do Guia de Skills)

Gerado pelo conselheiro sênior (`/improve`) no commit `5490f88` em `2026-10-30`, integrando todas as **4 Camadas do Guia de Skills e Comandos** (`Segundo Cérebro`, `Stack Web/Vercel`, `Harness de Alta Performance: improve, ponytail-audit, ecc-*, od-*` e `Obra Superpowers / Subagentes Paralelos`).

Cada executor deve ler o plano integralmente antes de iniciar, respeitar as condições de parada (`STOP conditions`), rodar todos os comandos de verificação e atualizar a coluna `Status` ao concluir.

## Ordem de Execução Recomendada & Status

| Plan | Título | Prioridade | Esforço | Risco | Depende de | Status |
|------|--------|------------|---------|-------|------------|--------|
| [001](001-funil-conversao-jornada-didatica.md) | Funil de Conversão & Jornada Didática | P1 | M | LOW | — | DONE |
| [002](002-api-security-and-integration-tests.md) | Hardening de APIs & Testes de Integração (Fase 1) | P1 | S | LOW | — | DONE |
| [003](003-canonical-sacramentos-route-and-eslint.md) | Rota Canônica de Sacramentos & ESLint | P2 | S | LOW | — | DONE |
| [004](004-compliance-lexical-and-test-suite-green.md) | Restaurar `npm test` Verde, Purga Semântica & Marca Institucional (`Cooperativa Nativaram`) | P1 | S | LOW | — | DONE |
| [005](005-hybrid-db-core-and-supabase-sync.md) | Unificar Core de Banco Híbrido (`core-hybrid-store`), Corrigir Drift SQL Supabase & Sincronizar Entidades | P1 | M | LOW | 004 | DONE |
| [006](006-api-auth-hardening-and-zod-contracts.md) | Hardening de Autenticação Server-Side (`HttpOnly`), Proteção de PII/Credenciais & Contratos Zod | P1 | M | MED | 005 | DONE |
| [007](007-catalog-unification-and-ponytail-cleanup.md) | Unificar Catálogos (15 Rapés / Mel), Corrigir Duplicação no Pedido & Limpeza Ponytail (-1.032 linhas) | P2 | M | LOW | 004 | DONE |
| [008](008-nextjs15-bundle-splitting-and-rsc-islands.md) | Code-Splitting Next.js 15 (`next/dynamic`), Ilhas RSC & Paralelização de Fetches (`Promise.all`) | P2 | M | LOW | — | DONE |
| [009](009-wcag-a11y-seo-canonicals-and-obsidian-sync.md) | Acessibilidade WCAG 2.1 AA, SEO Canonical (`/sacramentos` + Sitemap) & Higienização do Segundo Cérebro | P2 | S | LOW | 004 | DONE |

Valores de Status: `TODO` | `IN PROGRESS` | `DONE` | `BLOCKED` | `REJECTED`

## Grafo de Dependências & Paralelismo (Subagentes)

- **004** destrava a linha de base de verificação (`cmd.exe /c npm test` 100% verde) e deve ser executado primeiro.
- Após **004**, as 3 frentes de subagentes podem operar em paralelo:
  - **`/subagente-backend`**: executa **005** → **006** (persistência híbrida e segurança de rotas).
  - **`/subagente-governanca`**: executa **007** (unificação fitoquímica dos 15 rapés, correção de cotas Mel e limpeza Ponytail).
  - **`/subagente-frontend`**: executa **008** e **009** (code-splitting `next/dynamic`, ilhas RSC, WCAG 2.1 AA e SEO canonicals).

## Achados Considerados e Rejeitados (By-Design / ADRs)

- **Ausência de Gateway de Pagamento / Checkout**: *By-design* conforme `ADR-001-Persistencia-Atomica-e-WhatsApp-First` e Resolução CONAD nº 01/2010 (proibição absoluta de e-commerce).
- **Constantes Públicas `SUPABASE_PUBLIC_URL` e `SUPABASE_PUBLIC_ANON_KEY` em `src/lib/supabase/client.ts`**: *By-design* conforme documentado em `Banco-de-Dados-e-Persistencia-Local.md:19` para resiliência de deploy na Vercel quando `.env.local` não está injetado (a segurança real deve residir nas políticas RLS e na autenticação server-side do Plano 006).
- **Dependências `sharp` e `ffmpeg-static` em `devDependencies`**: Mantidas intencionalmente em `devDependencies` para os scripts de curadoria de acervo e silenciamento de áudio via FFmpeg (`Roadmap-e-Componentes-do-Site.md:103`), não afetando o bundle de produção.
