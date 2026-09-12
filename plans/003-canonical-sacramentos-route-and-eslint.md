# Plan 003: Pureza Terminológica da Rota de Sacramentos e Configuração ESLint

> **Executor instructions**: Siga este plano passo a passo. Execute cada comando de verificação e confirme o resultado esperado antes de passar para a próxima etapa.
>
> **Drift check (run first)**: `git diff --stat 653108b..HEAD -- next.config.mjs package.json src/components/layout/Navbar.tsx`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx / compliance
- **Planned at**: commit `653108b`, 2026-09-11

## Why this matters

1. O comando `npm run lint` falha com código 1 em ambientes não interativos (CI / IDE) porque o Next.js 15 solicita confirmação de configuração do ESLint. A criação de um `.eslintrc.json` explícito restaura o loop de verificação automatizada.
2. A URL `/medicinas` contém uma palavra explicitamente listada como proibida pelo `AGENTS.md`. Embora o conteúdo visível já use "Sacramentos" e "Compêndio Etnobotânico", a rota canônica deve ser `/sacramentos`, mantendo redirecionamento 301 de `/medicinas` para manter compatibilidade e atingir 100% de pureza linguística.

## Current state

- Ausência de `.eslintrc.json` na raiz do projeto.
- Rota física em `src/app/medicinas/page.tsx`.
- Links do menu em `src/components/layout/Navbar.tsx:13` apontando para `/medicinas`.

## Hard boundaries & out of scope

- **Arquivos em escopo**:
  - `.eslintrc.json` (novo)
  - `next.config.mjs`
  - `src/components/layout/Navbar.tsx`
- **Arquivos FORA de escopo**:
  - `src/app/api/**`
  - `src/lib/**`

## Step-by-step implementation

### Step 1: Configurar `.eslintrc.json`
1. Criar `.eslintrc.json` com extensão de `next/core-web-vitals`.
2. Comando de verificação:
   ```cmd
   cmd.exe /c "npm run lint"
   ```
   Resultado esperado: Execução sem prompts e saída limpa.

### Step 2: Configurar Redirecionamento e Rota Canônica `/sacramentos`
1. Em `next.config.mjs`, adicionar `async rewrites()` ou `async redirects()` mapeando `/sacramentos` para `/medicinas` (ou redirecionando 301 `/medicinas` -> `/sacramentos`).
2. Atualizar `src/components/layout/Navbar.tsx` para usar `href: "/sacramentos"` mantendo a compatibilidade do destaque ativo.
3. Comando de verificação:
   ```cmd
   cmd.exe /c "npx tsc --noEmit"
   ```
   Resultado esperado: Código de saída 0.

## STOP conditions

- Se a alteração de rota causar links quebrados em arquivos estáticos ou SEO, manter o rewrite transparente para não quebrar referências externas.
