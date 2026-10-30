# Plan 008: Next.js 15 Bundle Code-Splitting (`next/dynamic`), RSC Islands & Fetch Parallelization

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/components/layout/PortalDirigenteClient.tsx src/components/portal-dirigente/PortalAdminDashboard.tsx src/components/portal-dirigente/PortalComunidadeGestao.tsx src/components/estudos/EstudosClient.tsx"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf / dx
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

1. **Monolithic Client Bundle in `/portal-dirigente` (`src/components/layout/PortalDirigenteClient.tsx:22-39`)**: `PortalDirigenteClient` statically imports 13 sub-modules and `export-medicamentos.ts` totaling **~9,850 lines of TypeScript/React** (including `PortalCentralDocumentos` [1,562 lines], `PortalComunidadeGestao` [1,151 lines], `PortalInteracoesMedicamentosas` [777 lines], and `PortalAdminDashboard` + `AdminGestaoHomologacoes` + `AdminGestaoPedidos` [2,016 lines]). Every visitor hitting the login gate downloads and parses the entire 10-tab governance suite and Admin dashboard upfront.
2. **Client Fetch Waterfall & Synchronous Linter in `PortalComunidadeGestao.tsx:100-142`**: `carregarDados` awaits 3 independent API calls sequentially (`posts` → `perfis` → `agenda`) instead of using `Promise.all`, and `useEffect` runs `verificarConformidadeTexto` synchronously on every keystroke without `useDeferredValue`.
3. **Full-Page `"use client"` on Static Editorial Landings (`ManifestoLanding.tsx` [1,159 lines])**: `ManifestoLanding.tsx` is marked `"use client"` solely because of a 6-item inline FAQ state (`openFaq` at line 72) that duplicates `<FaqAccordion />` (`src/components/ui/FaqAccordion.tsx`).

## Current state

- `src/components/layout/PortalDirigenteClient.tsx:22-39` — 14 static imports for modules that are conditionally rendered one tab at a time.
- `src/components/portal-dirigente/PortalAdminDashboard.tsx:17-19` — Static imports of `AdminGestaoPedidos`, `AdminGestaoHomologacoes`, and `PortalCooperativismo`.
- `src/components/estudos/EstudosClient.tsx:22` — Static import of `ComunidadeBlogMural`.
- `src/components/portal-dirigente/PortalComunidadeGestao.tsx:106-142`:
  ```tsx
  const resPosts = await fetch(`/api/comunidade/posts?temploCodigo=${encodeURIComponent(temploCodigo)}&todosStatus=true`);
  ...
  const resPerfil = await fetch(`/api/comunidade/perfis?codigo=${encodeURIComponent(temploCodigo)}`);
  ...
  const resAgenda = await fetch(`/api/comunidade/agenda?temploCodigo=${encodeURIComponent(temploCodigo)}`);
  ```

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Build     | `cmd.exe /c npm run build`           | exit 0              |

## Suggested executor toolkit

- Invoke `nextjs-app-router` and `vercel-react-best-practices`.

## Scope

**In scope**:
- `src/components/layout/PortalDirigenteClient.tsx`
- `src/components/portal-dirigente/PortalAdminDashboard.tsx`
- `src/components/portal-dirigente/PortalComunidadeGestao.tsx`
- `src/components/estudos/EstudosClient.tsx`
- `src/components/manifesto/ManifestoLanding.tsx`

**Out of scope**:
- Modifying business logic inside `PortalCentralDocumentos.tsx` or `PortalInteracoesMedicamentosas.tsx` (note: keep `scripts/test-liturgico.mjs` compatibility in mind).

## Git workflow

- Branch: `advisor/008-nextjs15-bundle-splitting-and-rsc-islands`
- Commit message style: `perf(nextjs): code-split dirigente tabs with next/dynamic and parallelize fetches`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Code-split `PortalDirigenteClient.tsx`, `PortalAdminDashboard.tsx`, and `EstudosClient.tsx` using `next/dynamic`

1. In `src/components/layout/PortalDirigenteClient.tsx`:
   - Keep `PortalLoginGate` and `AcompanhamentoPedidos` (the default initial tab) as direct imports, and convert `FormSolicitacaoPedido`, `PortalAdminDashboard`, `PortalLaudosCustodia`, `PortalCooperativismo`, `PortalCentralDocumentos`, `PortalInteracoesMedicamentosas`, `PortalCatalogoGraduacoes`, `PortalAssessoriaFAQ`, `PortalCalculadoraLiturgica`, `PortalRespaldoJuridico`, and `PortalComunidadeGestao` to `dynamic(() => import(...).then(m => m.ComponentName))` with a clean loading skeleton.
   - Replace the static import of `exportarMedicamentosExcel` and `exportarMedicamentosPDF` (`lines 22-25`) with dynamic `await import("@/lib/export-medicamentos")` inside their click handlers.
2. In `src/components/portal-dirigente/PortalAdminDashboard.tsx:17-19`:
   - Dynamically import `AdminGestaoHomologacoes` and `PortalCooperativismo`.
3. In `src/components/estudos/EstudosClient.tsx:22`:
   - Dynamically import `ComunidadeBlogMural`.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

### Step 2: Parallelize the 3 fetch requests and defer regex linting in `PortalComunidadeGestao.tsx`

1. In `src/components/portal-dirigente/PortalComunidadeGestao.tsx:106-142`, replace the 3 sequential `await fetch(...)` calls with `await Promise.all([fetchPosts, fetchPerfil, fetchAgenda])`.
2. Use `React.useDeferredValue` for the combined `${postTitulo} ${postResumo} ${postConteudo}` string before running `verificarConformidadeTexto` in `useEffect` (`lines 100-104`).

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 3: Convert `ManifestoLanding.tsx` to a Server Component by reusing `<FaqAccordion />`

In `src/components/manifesto/ManifestoLanding.tsx`:
- Replace the manual `openFaq` state (`line 72`) and inline FAQ accordion markup (`lines 1081-1107`) with `<FaqAccordion items={...} />` from `@/components/ui/FaqAccordion`.
- Remove `"use client"` from line 1 of `ManifestoLanding.tsx` so all 1,150 lines of static institutional doctrine render as a zero-bundle Server Component.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm run build` → exit 0.

## Test plan

- Run `cmd.exe /c npm test` and `cmd.exe /c npm run build` to verify all 39 static/dynamic routes compile cleanly and route bundle sizes drop.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0
- [ ] `cmd.exe /c npm run build` exits 0
- [ ] `ManifestoLanding.tsx` no longer has `"use client"`
- [ ] `PortalComunidadeGestao.tsx` uses `Promise.all` for initial data loading
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any component converted to Server Component uses browser-only hooks (`useState`, `useEffect`) outside extracted client islands.
- `npm run build` fails on any route.

## Maintenance notes

- New tabs added to `PortalDirigenteClient` must always be loaded via `next/dynamic`.

