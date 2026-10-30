# Plan 004: Restore Green Test Suite, Purge Prohibited Terms & Standardize Institutional Brand

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx src/data/portal-assessoria.ts src/app/layout.tsx scripts/test-liturgico.mjs"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug / tests / docs
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

Currently, running `cmd.exe /c npm test` fails at Section 4 (`Scanner Semântico de Conformidade (AGENTS.md)`) because `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx:234` contains the prohibited word `"remédio"` in its search input placeholder. Furthermore, `AGENTS.md` mandates that this institutional portal must always use the name **Cooperativa Nativaram** (or *Cooperativa Etnobotânica Nativaram*), reserving **Nativaram Brasil** exclusively for the external retail channel, and forbids terms like `"preço"`, `"cura"`, and `"medicina"` in loose text and seed data. Restoring a 100% green test suite and expanding the lexical scanner across all of `src/` unblocks every subsequent engineering plan.

## Current state

- `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx:234` — Contains `placeholder="Digite o nome do remédio ou princípio ativo (ex: Rivotril, Prozac, Carbolitium, Zolpidem, Venvanse, Ozempic, Tramadol)..."`, which triggers `assert.fail` in `scripts/test-liturgico.mjs:222`.
- `src/data/portal-assessoria.ts:679` — Contains `"remédios ou fórmulas manipuladas"` in FAQ answer text.
- `src/components/projetos-de-luz/ProjetoDeLuzLanding.tsx:532` — Contains `"procedência, pureza e preço justo"` (`preço` is forbidden by `AGENTS.md`; use `"rateio justo"`).
- `src/components/feitio/FeitioLanding.tsx:595` — Contains `"ritos noturnos de cura profunda"` (`cura` is forbidden; use `"reequilíbrio vital profundo"`).
- `src/lib/db/comunidade.ts:65,216` & `src/lib/db/homologacoes.ts:63` & `src/lib/supabase/schema_comunidade.sql:127` — Seed data for temples contains `"hinários de cura espiritual"` and `"consagração de medicinas tradicionais"`, causing false-positive alerts in the real-time CONAD linter (`verificarConformidadeTexto`).
- `src/app/layout.tsx:63,69,89,94`, `src/app/medicinas/page.tsx:115,218`, `src/app/medicinas/[slug]/page.tsx:38,73`, `src/lib/db/pedidos.ts:429,455,480`, `src/lib/credenciamento/engine.ts:32`, `src/components/forms/ContactForm.tsx:96,242`, `src/components/ui/WhatsAppFAB.tsx:7,28`, `CONTEXT.md:1,3,50` — Still reference `"Nativaram Brasil"` instead of `"Cooperativa Nativaram"` (and `CONTEXT.md:50` mentions `"frascos de vidro âmbar estéril"` for Ayahuasca instead of `"garrafas PET 100% virgens de padrão alimentício"`).
- `scripts/test-liturgico.mjs:436-550` — Creates `TEST-SOL-*`, `TEST-HOM-*`, and `TEST-AUTH-*` records in `data/solicitacoes_homologacao.json` without a `try/finally` block, and only scans `src/app` and `src/components/portal-dirigente` in Section 4.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Lint      | `cmd.exe /c npm run lint`            | exit 0              |

## Suggested executor toolkit

- Invoke `/segundo-cerebro-ciclo-memoria-ativa` before and after execution.
- Use `/ecc-verification-loop` and `/stop-slop` when reviewing replacement text.

## Scope

**In scope**:
- `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx`
- `src/data/portal-assessoria.ts`
- `src/components/projetos-de-luz/ProjetoDeLuzLanding.tsx`
- `src/components/feitio/FeitioLanding.tsx`
- `src/lib/db/comunidade.ts`
- `src/lib/db/homologacoes.ts`
- `src/lib/db/pedidos.ts`
- `src/lib/credenciamento/engine.ts`
- `src/lib/supabase/schema_comunidade.sql`
- `src/app/layout.tsx`
- `src/app/medicinas/page.tsx`
- `src/app/medicinas/[slug]/page.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/components/ui/WhatsAppFAB.tsx`
- `CONTEXT.md`
- `scripts/test-liturgico.mjs`

**Out of scope**:
- `src/lib/validators/comunidade.ts` — Contains the dictionary of prohibited words for detection; do NOT remove prohibited words from the linter's rule list.
- Any component layout or styling changes.

## Git workflow

- Branch: `advisor/004-compliance-lexical-and-test-suite-green`
- Commit message style: `fix(compliance): purge prohibited lexical terms and restore green test suite`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Fix the prohibited term in `PortalInteracoesMedicamentosas.tsx` and `portal-assessoria.ts`

In `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx:234`, replace:
```tsx
placeholder="Digite o nome do remédio ou princípio ativo (ex: Rivotril, Prozac, Carbolitium, Zolpidem, Venvanse, Ozempic, Tramadol)..."
```
with:
```tsx
placeholder="Digite o nome comercial do fármaco ou princípio ativo (ex: Rivotril, Prozac, Carbolitium, Zolpidem, Venvanse, Ozempic, Tramadol)..."
```
In `src/data/portal-assessoria.ts:679`, replace `"remédios ou fórmulas manipuladas"` with `"fármacos ou fórmulas manipuladas"`.

**Verify**: `cmd.exe /c npm test` → Section 4 passes with 0 failures.

### Step 2: Purge prohibited terms in `ProjetoDeLuzLanding.tsx`, `FeitioLanding.tsx`, and seed files

1. In `src/components/projetos-de-luz/ProjetoDeLuzLanding.tsx:532`, replace `"procedência, pureza e preço justo"` with `"procedência, pureza e rateio justo"`.
2. In `src/components/feitio/FeitioLanding.tsx:595`, replace `"ritos noturnos de cura profunda"` with `"ritos noturnos de reequilíbrio vital profundo"`.
3. In `src/lib/db/comunidade.ts:65`, `src/lib/db/homologacoes.ts:63`, and `src/lib/supabase/schema_comunidade.sql:127`, replace `"hinários de cura"` / `"hinários de cura espiritual"` with `"hinários de alinhamento espiritual"`.
4. In `src/lib/db/comunidade.ts:216`, replace `"consagração de medicinas tradicionais"` with `"consagração de preparados tradicionais"`.

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 3: Standardize institutional brand name (`Cooperativa Nativaram`) and `CONTEXT.md`

1. In `src/app/layout.tsx:63,69,89,94`, replace `"Nativaram Brasil"` with `"Cooperativa Nativaram"` and `"medicinas tradicionais amazônicas"` with `"sacramentos tradicionais amazônicos"`.
2. In `src/app/medicinas/page.tsx:115,218` and `src/app/medicinas/[slug]/page.tsx:38,73`, replace `"Nativaram Brasil"` with `"Cooperativa Nativaram"` and `"Voltar ao Compêndio das Medicinas"` with `"Voltar ao Compêndio de Sacramentos"`.
3. In `src/lib/db/pedidos.ts:429,455,480`, `src/lib/credenciamento/engine.ts:32`, `src/components/forms/ContactForm.tsx:96,242`, and `src/components/ui/WhatsAppFAB.tsx:7,28`, replace `"Nativaram Brasil"` with `"Cooperativa Nativaram"`. Also standardize the WhatsApp number in `src/components/ui/WhatsAppFAB.tsx:7`, `src/app/medicinas/[slug]/page.tsx:343`, and `src/app/api/pedidos/route.ts:11` to the canonical `"556899779104"`.
4. In `CONTEXT.md:1,3,50`, replace `"Nativaram Brasil"` with `"Cooperativa Nativaram"` and replace `"frascos de vidro âmbar estéril"` on line 50 with `"garrafas PET 100% virgens de padrão alimentício com lacres invioláveis"`.

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 4: Harden `scripts/test-liturgico.mjs` with `try/finally` cleanup and expanded coverage

1. In `scripts/test-liturgico.mjs:229-230`, expand `scanDir` to also scan `src/components/home`, `src/components/feitio`, `src/components/projetos-de-luz`, `src/components/manifesto`, and `src/components/forms`.
2. Wrap the database mutation tests in Section 9 (`linhas 431-550`) with a `try / finally` block that always removes `TEST-*` entries from `data/solicitacoes_homologacao.json`.
3. Add 2 new tests in `scripts/test-liturgico.mjs`:
   - Test `obterListaNominalMedicamentos()` from `src/lib/export-medicamentos.ts` verifying it returns >= 150 commercial medication entries across all 4 color categories (`NAO_PODE`, `CASO_CLINICO`, `INTERROMPER_DIAS_ANTES`, `NAO_TOMAR_NO_DIA`).
   - Test `salvarItemAgenda` and `deletarItemAgenda` from `src/lib/db/comunidade.ts` with cleanup.

**Verify**: `cmd.exe /c npm test` → exits 0 with all 24+ tests passing.

## Test plan

- Existing 22 tests in `scripts/test-liturgico.mjs` plus 2 new unit tests (`export-medicamentos.ts` 4-color list integrity and `comunidade.ts` agenda CRUD).
- Verification: `cmd.exe /c npm test` → 0 failures.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0 with 0 failures
- [ ] `data/solicitacoes_homologacao.json` contains no `TEST-*` records after `npm test`
- [ ] `plans/README.md` status row updated

## STOP conditions

- The code at the locations in "Current state" doesn't match the excerpts.
- A step's verification fails twice after a reasonable fix attempt.
- The fix appears to require touching an out-of-scope file.

## Maintenance notes

- Whenever new components are added to `src/components/`, the expanded lexical scanner in `scripts/test-liturgico.mjs` will automatically enforce the `AGENTS.md` dictionary.

