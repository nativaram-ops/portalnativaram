# Plan 005: Unify Hybrid DB Core, Fix Supabase SQL Drift & Sync All Entities

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/lib/db/ src/lib/supabase/ src/app/api/reconhecimento/route.ts"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/004-compliance-lexical-and-test-suite-green.md
- **Category**: bug / tech-debt / migration
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

Three critical persistence issues currently affect serverless production (Vercel) and Supabase cloud synchronization:
1. **SQL Constraint Drift (`src/lib/supabase/schema.sql:45-52`)**: `pedidos_liturgicos.status` has a `CHECK` constraint with legacy status names (`EM_ANALISE_ATA`, `FEITIO_RESERVADO`, `ENTREGUE_AO_TEMPLO`, `CANCELADO`), while the app (`src/types/pedido.ts:8-15`) writes `HOMOLOGADO_CONSELHO`, `EM_FEITIO_ACRE`, `AGUARDANDO_DESPACHO`, `ENTREGUE_CONSAGRADO`, `CANCELADO_AJUSTE`. Every status update in Supabase silently fails the `CHECK` constraint and falls back to local disk! Also, `mapPedidoToRow` (`src/lib/db/pedidos.ts:76-99`) omits `observacoes_internas`.
2. **Write-Only `os.tmpdir()` Bug in `comunidade.ts`**: When `process.cwd()/data` is read-only (`EROFS` on Vercel), `salvarArquivoAtomico` (`src/lib/db/comunidade.ts:266`) writes to `os.tmpdir()/nativaram_comunidade_*.json`, but `obterPublicacoesComunidade` (`line 339`), `obterPerfisTemplos` (`line 481`), and `obterAgendaLiturgica` (`line 539`) only read from `DATA_DIR` (`process.cwd()/data`), silently losing all writes in serverless!
3. **Missing Cloud Sync in `homologacoes.ts` & `comunidade.ts`**: `homologacoes.ts` (credential generation `NAT-TEMPLO-XXXX` / `NAT-GRP-XXXX`) and the Perfil/Agenda functions of `comunidade.ts` (`lines 478-584`) never query or upsert to Supabase.

## Current state

- `src/lib/supabase/schema.sql:45-52`:
  ```sql
    status TEXT NOT NULL DEFAULT 'SOLICITADO' CHECK (status IN (
        'SOLICITADO',
        'EM_ANALISE_ATA',
        'FEITIO_RESERVADO',
        'EM_TRANSITO_REFRIGERADO',
        'ENTREGUE_AO_TEMPLO',
        'CANCELADO'
    )),
  ```
- `src/lib/db/pedidos.ts:22-48` and `src/lib/db/comunidade.ts:16-49` — Duplicate `cachedDirectClient`, `getDirectSupabaseClient()`, and `withTimeout(..., 2000)`.
- `src/lib/db/comunidade.ts:255-271` — Writes fallback to `os.tmpdir()`, but lines `339`, `481`, `539` only call `fs.readFile(POSTS_FILE / PERFIS_FILE / AGENDA_FILE)` without reading or merging the `os.tmpdir()` file.
- `src/lib/db/homologacoes.ts:102-120` and `src/app/api/reconhecimento/route.ts:110-123` — Use direct `fs.writeFile` without atomic `tmp + rename`, and `reconhecimento/route.ts` lacks `os.tmpdir()` fallback.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Build     | `cmd.exe /c npm run build`           | exit 0              |

## Suggested executor toolkit

- Read `.agents/skills/learned-resilient-db-timeouts/SKILL.md` and `.agents/skills/arquitetura-design-modular/SKILL.md` before starting.
- Use `/engenharia-migrar-tipos-shoehorn` to keep database row mappers strictly typed without `any`.

## Scope

**In scope**:
- `src/lib/db/core-hybrid-store.ts` (create)
- `src/lib/db/pedidos.ts`
- `src/lib/db/homologacoes.ts`
- `src/lib/db/comunidade.ts`
- `src/lib/supabase/schema.sql`
- `src/app/api/reconhecimento/route.ts`
- `scripts/test-liturgico.mjs`

**Out of scope**:
- UI components in `src/components/**`.
- Changing public TypeScript interfaces in `src/types/pedido.ts` or `src/types/comunidade.ts`.

## Git workflow

- Branch: `advisor/005-hybrid-db-core-and-supabase-sync`
- Commit message style: `refactor(db): extract hybrid atomic store and fix Supabase schema drift`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Create `src/lib/db/core-hybrid-store.ts`

Create `src/lib/db/core-hybrid-store.ts` exporting:
1. `getDirectSupabaseClient(): SupabaseClient | null` (singleton using `SUPABASE_PUBLIC_URL` and `SUPABASE_PUBLIC_ANON_KEY`).
2. `withTimeout<T>(promise: PromiseLike<T>, ms = 2000): Promise<T>`.
3. `createHybridJsonStore<T extends { id?: string }>({ filename, seedData, getKey })` that:
   - Reads and merges `seedData` + `path.join(process.cwd(), "data", filename)` + `path.join(os.tmpdir(), "nativaram_" + filename)` (later entries override earlier ones by `getKey(item)`).
   - Writes atomically via `.tmp.${Date.now()}.${random}` + `fs.rename` in `data/` AND writes to `os.tmpdir()/nativaram_${filename}` on every save so serverless instances always read back their own writes.

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 2: Fix `src/lib/supabase/schema.sql` and `src/lib/db/pedidos.ts`

1. In `src/lib/supabase/schema.sql:45-56`:
   - Update the `status` `CHECK` constraint on `public.pedidos_liturgicos` to:
     `CHECK (status IN ('SOLICITADO', 'HOMOLOGADO_CONSELHO', 'EM_FEITIO_ACRE', 'AGUARDANDO_DESPACHO', 'EM_TRANSITO_REFRIGERADO', 'ENTREGUE_CONSAGRADO', 'CANCELADO_AJUSTE'))`.
   - Add column `observacoes_internas TEXT,` after `previsao_entrega TEXT,`.
   - Add table `public.solicitacoes_homologacao` with columns matching `SolicitacaoAcesso` (`id TEXT PRIMARY KEY`, `tipo TEXT`, `nome_entidade TEXT`, `nome_responsavel TEXT`, `telefone TEXT`, `email TEXT`, `cidade TEXT`, `estado TEXT`, `cnpj TEXT`, `linhagem TEXT`, `graduacao TEXT`, `volume_estimado TEXT`, `intencao TEXT`, `status TEXT`, `login_gerado TEXT`, `senha_gerada TEXT`, `data_envio TEXT`, `data_homologacao TEXT`, `observacoes_conselho TEXT`).
2. In `src/lib/db/pedidos.ts`:
   - Import `getDirectSupabaseClient`, `withTimeout`, and `createHybridJsonStore` from `./core-hybrid-store`.
   - Add `observacoes_internas: pedido.observacoesInternas || null` to `mapPedidoToRow` (`line 76`).
   - Replace `any` on `mapRowToPedido` and `mapPedidoToRow` with a typed `PedidoRow` interface.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

### Step 3: Refactor `src/lib/db/comunidade.ts`, `src/lib/db/homologacoes.ts`, and `src/app/api/reconhecimento/route.ts` to use `core-hybrid-store` and Supabase sync

1. In `src/lib/db/comunidade.ts`:
   - Use `createHybridJsonStore` for `comunidade_posts.json`, `comunidade_perfis.json`, and `comunidade_agenda.json` so that `os.tmpdir()` writes are always read back in `obterPublicacoesComunidade`, `obterPerfisTemplos`, and `obterAgendaLiturgica`.
   - Add Supabase `withTimeout(..., 2000)` queries/upserts/deletes to `obterPerfisTemplos`, `salvarPerfilTemplo` (`perfis_comunidade`), `obterAgendaLiturgica`, `salvarItemAgenda`, and `deletarItemAgenda` (`agenda_liturgica`).
   - Also fix `PERFIS_INICIAIS[0].fotoPerfilUrl` (`line 66`) from `"/documentos/nativaram-catalogo-v4.pdf"` to `""`.
2. In `src/lib/db/homologacoes.ts`:
   - Use `createHybridJsonStore` and add `withTimeout(..., 2000)` Supabase read/upsert against `public.solicitacoes_homologacao` in `obterTodasSolicitacoes`, `registrarSolicitacao`, and `homologarSolicitacao`.
3. In `src/app/api/reconhecimento/route.ts`:
   - Use `createHybridJsonStore` for `reconhecimentos.json` so it is EROFS-safe in serverless environments.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

## Test plan

- Add a unit test in `scripts/test-liturgico.mjs` verifying `createHybridJsonStore` atomic write, `os.tmpdir()` fallback read-back, and `withTimeout` rejection on slow promises.
- Verification: `cmd.exe /c npm test` → all pass.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0
- [ ] `src/lib/supabase/schema.sql` contains all 7 canonical `StatusPedido` values and `observacoes_internas`
- [ ] `comunidade.ts`, `pedidos.ts`, and `homologacoes.ts` delegate local/tmpdir I/O to `core-hybrid-store.ts`
- [ ] `plans/README.md` status row updated

## STOP conditions

- The code at the locations in "Current state" doesn't match the excerpts.
- A step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Every future database module in `src/lib/db/` must use `createHybridJsonStore` and `withTimeout(..., 2000)` from `src/lib/db/core-hybrid-store.ts`.

