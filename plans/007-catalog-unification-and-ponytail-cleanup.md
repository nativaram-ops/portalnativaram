# Plan 007: Unify Sacrament Catalogs, Fix Order Form Duplication & Ponytail Dead-Code Cleanup

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/data/ src/components/portal-dirigente/FormSolicitacaoPedido.tsx src/components/home/ package.json"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/004-compliance-lexical-and-test-suite-green.md
- **Category**: bug / tech-debt
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

1. **Duplicate & Conflicting "Sacramento Mel" in Order Form (`src/components/portal-dirigente/FormSolicitacaoPedido.tsx:48-69`)**: `GRADUACOES_SACRAMENTAIS` (`src/data/graduacoes.ts:103-129`) already contains `SACRAMENTO_MEL` and `SACRAMENTO_GEL`. When `FormSolicitacaoPedido.tsx:48` maps `GRADUACOES_SACRAMENTAIS` with `unidade: "Litros"` and `rateioUnitario: 200` and then appends a manual `MEDICINA_MEL` (`unidade: "kg"`, `rateioUnitario: 480`) on line 60, the Dirigente sees **two conflicting "Mel" items** (`R$ 200/Litro` vs `R$ 480/kg`), plus only 4 of the 15 Rapés (`RAPES_TRADICIONAIS.slice(0, 4)` on line 70) with obsolete `"Frascos (20g)"` instead of `25g`/`15g`.
2. **Catalog Divergence (`src/data/medicinas.ts` vs `src/data/sacramentos.ts`)**: The UI announces "15 Rapés Sagrados", but `medicinas.ts` only lists 13 items (missing `Passiflora` and `Canela de Velho`), and `mentolado`, `samauma`, and `sansara` reuse photos from other varieties (`pixuri.jpg`, `tsunu.jpg`, `rainha.jpg`).
3. **Ponytail Dead Code & Unused Dependencies (`1,032 lines` + `3 unused packages`)**: Six legacy Home components in `src/components/home/` (`HomePrincipiosFeitio.tsx`, `HomePonteEtica.tsx`, `HomeGraduacoes.tsx`, `HomeLogisticaGollog.tsx`, `HomeNotaSemantica.tsx`, `HomeNotaSacralidade.tsx`) are never imported anywhere outside `src/components/home/index.ts`, and `pdfkit`, `@types/pdfkit`, and `pdf-parse` (`package.json:19,23,36`) have zero imports in the repository.

## Current state

- `src/components/portal-dirigente/FormSolicitacaoPedido.tsx:47-80`:
  ```tsx
  const ITENS_CATALOGO = [
    ...GRADUACOES_SACRAMENTAIS.map((g) => ({
      id: g.id,
      tipo: "GRADUACAO_AYAHUASCA" as const,
      nome: `${g.codigo} ${g.nomeSagrado}`,
      codigoOuSubtitulo: g.arquetipo,
      unidade: "Litros" as const,
      rateioUnitario: g.codigo === "10.1" ? 260 : g.codigo === "7.1" ? 230 : 200,
      quantidadePadrao: 10,
      minimo: 5,
      passo: 5,
    })),
    {
      id: "MEDICINA_MEL",
      ...
  ```
- `src/components/home/index.ts:5-8,12-13` — Re-exports 6 dead components totaling 1,032 lines.
- `package.json:19,23,36` — Lists `@types/pdfkit`, `pdfkit`, and `pdf-parse` with 0 usages.
- `src/components/forms/ContactForm.tsx:55-60` — Simulates submission with `setTimeout` instead of opening an institutional WhatsApp message.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Build     | `cmd.exe /c npm run build`           | exit 0              |

## Suggested executor toolkit

- Invoke `/ponytail-audit` and `/arquitetura-modelagem-dominio`.

## Scope

**In scope**:
- `src/components/portal-dirigente/FormSolicitacaoPedido.tsx`
- `src/data/medicinas.ts`
- `src/data/sacramentos.ts`
- `src/data/graduacoes.ts`
- `src/components/forms/ContactForm.tsx`
- `src/components/home/index.ts`
- `src/components/home/HomePrincipiosFeitio.tsx` (delete)
- `src/components/home/HomePonteEtica.tsx` (delete)
- `src/components/home/HomeGraduacoes.tsx` (delete)
- `src/components/home/HomeLogisticaGollog.tsx` (delete)
- `src/components/home/HomeNotaSemantica.tsx` (delete)
- `src/components/home/HomeNotaSacralidade.tsx` (delete)
- `package.json`

**Out of scope**:
- Changing the visual layout of `HomeHero`, `HomePilaresBar`, `HomeJornadaFunil`, `HomeCompromissoSagrado`, `HomeDepoimentosCredenciamento`, or `HomeFaqSection`.

## Git workflow

- Branch: `advisor/007-catalog-unification-and-ponytail-cleanup`
- Commit message style: `refactor(catalog): fix Mel duplication, complete 15 rapes and remove 1032 lines of dead code`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Fix `ITENS_CATALOGO` in `FormSolicitacaoPedido.tsx` and complete 15 Rapés in `medicinas.ts`

1. In `src/components/portal-dirigente/FormSolicitacaoPedido.tsx:47-92`:
   - Map `GRADUACOES_SACRAMENTAIS` distinguishing liquid graduations (`3.1`, `5.1`, `7.1`, `10.1` in `"Litros"`) from concentrated reductions (`MEL` and `GEL` in `"kg"`, `rateioUnitario: 480`, `minimo: 1`, `passo: 1`), and remove the duplicate manual `MEDICINA_MEL` object.
   - Include all `RAPES_TRADICIONAIS` (not just `.slice(0, 4)`) with presentation `"Frascos (25g)"` (updating `src/types/pedido.ts` / `src/lib/validators/pedido.ts` to accept both `"Frascos (25g)"` and `"Frascos (20g)"` for backwards compatibility with existing seed orders).
2. In `src/data/medicinas.ts`:
   - Add the 2 missing canonical varieties (`passiflora` and `canela-de-velho`) so `medicinas.filter(m => m.tipo === "rape")` has all 15 varieties announced in the UI.
3. In `src/components/forms/ContactForm.tsx:55-60`:
   - Format a polite WhatsApp message with the submitted fields and provide a direct button/link to `https://wa.me/556899779104?text=...` on the confirmation screen.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

### Step 2: Delete the 6 unused Home components (-1,032 lines) and unused PDF packages

1. Remove `HomePrincipiosFeitio`, `HomePonteEtica`, `HomeGraduacoes`, `HomeLogisticaGollog`, `HomeNotaSemantica`, and `HomeNotaSacralidade` from `src/components/home/index.ts` and delete those 6 `.tsx` files.
2. Remove `"@types/pdfkit"`, `"pdfkit"`, and `"pdf-parse"` from `package.json`.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

## Test plan

- Add a test in `scripts/test-liturgico.mjs` asserting that `medicinas.ts` has 15 rapés and that `GRADUACOES_SACRAMENTAIS` has no duplicate IDs in the order catalog.
- Verification: `cmd.exe /c npm test` → all pass.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0
- [ ] `FormSolicitacaoPedido.tsx` has no duplicate "Sacramento Mel" entry
- [ ] The 6 dead files in `src/components/home/` are removed
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any active page imports one of the 6 Home components scheduled for deletion.
- A step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Keep `src/data/medicinas.ts` and `src/data/sacramentos.ts` synchronized via unit test assertions in `scripts/test-liturgico.mjs`.

