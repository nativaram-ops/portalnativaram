# Plan 009: WCAG 2.1 AA Accessibility, Canonical SEO Metadata & Segundo Cérebro Sync

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/components/layout/Navbar.tsx src/components/ui/WhatsAppFAB.tsx src/app/sitemap.ts src/app/robots.ts tailwind.config.ts"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/004-compliance-lexical-and-test-suite-green.md
- **Category**: a11y / seo / docs
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

1. **WCAG 2.1 AA Keyboard Traps & Missing Dialog Semantics**:
   - When closed, the mobile menu overlay in `Navbar.tsx:156-160` and the floating button in `WhatsAppFAB.tsx:32` use `opacity-0 pointer-events-none` without `invisible` (`visibility: hidden`), allowing keyboard `Tab` navigation to focus invisible links off-screen.
   - Modals in `EstudosClient.tsx:651,709`, `ComunidadeBlogMural.tsx:387`, and `PerfilTemploClient.tsx:338` lack `Escape` key listeners, and `ProjetoDeLuzLanding.tsx:320` lacks `role="dialog"` and `aria-modal="true"`.
   - `WhatsAppFAB.tsx:29` uses non-existent Tailwind class `h-13 w-13`, and hero overlays use undefined classes `bg-radial-vignette` and `animate-pulse-subtle`.
2. **Duplicate Content SEO (`/sacramentos` vs `/medicinas`) & Incomplete Sitemap**:
   - `next.config.mjs:22-33` rewrites `/sacramentos` and `/sacramentos/:slug*` to `/medicinas` with HTTP 200, but no route defines `alternates.canonical`, causing search engines to index duplicate content across 16 URL pairs.
   - `src/app/sitemap.ts` uses `/medicinas` instead of canonical `/sacramentos`, omits `/estudos/comunidade/[slug]` profiles, and indexes the restricted `/portal-dirigente` gate, while `src/app/robots.ts:9` disallows non-existent `/portal-dirigente/painel`.
3. **Segundo Cérebro Vault Hygiene (`Segundo-Cerebro/**`)**:
   - Contains a 0-byte file (`Segundo-Cerebro/MEU HARNESS/Sem título.md`), a duplicate note (`Segundo-Cerebro/Desenvolvimento com IA - Metodologia Agêntica.md`), broken `[[...]]` links, and two ADRs numbered `ADR-003`.

## Current state

- `src/components/layout/Navbar.tsx:155-160`:
  ```tsx
      <div
        className={`lg:hidden fixed inset-0 top-[56px] sm:top-[60px] z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
  ```
- `src/components/ui/WhatsAppFAB.tsx:29-33`:
  ```tsx
      className={`fixed bottom-6 right-4 sm:right-6 z-50 flex h-13 w-13 sm:h-14 sm:w-14 ... ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
  ```
- `src/app/robots.ts:9` — `disallow: ["/portal-dirigente/painel", "/api/"]`.
- `src/app/sitemap.ts:27,51,77` — Uses `/medicinas`, includes `/portal-dirigente`, and omits `/estudos/comunidade/[slug]`.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Build     | `cmd.exe /c npm run build`           | exit 0              |

## Suggested executor toolkit

- Invoke `accessibility-wcag`, `seo-metadata-optimization`, `tailwind-design-system`, and `/segundo-cerebro-auditar-conteudo`.

## Scope

**In scope**:
- `src/components/layout/Navbar.tsx`
- `src/components/ui/WhatsAppFAB.tsx`
- `src/components/projetos-de-luz/ProjetoDeLuzLanding.tsx`
- `src/components/estudos/EstudosClient.tsx`
- `src/components/estudos/ComunidadeBlogMural.tsx`
- `src/components/comunidade/PerfilTemploClient.tsx`
- `src/components/portal-dirigente/AdminGestaoHomologacoes.tsx`
- `tailwind.config.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/medicinas/page.tsx`
- `src/app/medicinas/[slug]/page.tsx`
- `src/app/estudos/comunidade/[slug]/page.tsx`
- `Segundo-Cerebro/**`
- `docs/agents/domain.md`

**Out of scope**:
- Backend database logic in `src/lib/db/**`.

## Git workflow

- Branch: `advisor/009-wcag-a11y-seo-canonicals-and-obsidian-sync`
- Commit message style: `feat(a11y,seo): fix WCAG focus traps, add canonical metadata and sync Segundo Cerebro`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Fix WCAG 2.1 AA focus traps, modal `Escape` handlers, and missing Tailwind utilities

1. In `src/components/layout/Navbar.tsx:145,156-160`:
   - Add `aria-expanded={isOpen}` to the mobile menu toggle button (`line 145`).
   - Add `invisible` when `!isOpen` (`"opacity-0 pointer-events-none invisible"`) and `aria-hidden={!isOpen}` to the mobile overlay container (`line 156`).
2. In `src/components/ui/WhatsAppFAB.tsx:29-33`:
   - Replace `h-13 w-13` with `h-14 w-14`, add `invisible` when `!visible`, and add `aria-hidden={!visible}` and `tabIndex={visible ? 0 : -1}`.
3. In `tailwind.config.ts`:
   - Add `backgroundImage: { "radial-vignette": "radial-gradient(circle at center, transparent 0%, rgba(11, 20, 15, 0.75) 100%)" }` and `animation: { "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite" }`.
4. Add `Escape` key handler and `role="dialog" aria-modal="true"` to the modals in `ProjetoDeLuzLanding.tsx:320`, `EstudosClient.tsx:651,709`, `ComunidadeBlogMural.tsx:387`, and `PerfilTemploClient.tsx:338` (plus `aria-label="Fechar foto"` on `PerfilTemploClient.tsx:351`).

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 2: Standardize Canonical URLs (`/sacramentos`), OpenGraph images, `sitemap.ts`, and `robots.ts`

1. In `src/app/medicinas/page.tsx:21`, add `alternates: { canonical: "/sacramentos" }`.
2. In `src/app/medicinas/[slug]/page.tsx:33-41`, add `alternates: { canonical: \`/sacramentos/\${med.slug}\` }` and `openGraph: { title: \`\${med.nome} | Cooperativa Nativaram\`, description: med.subtitulo, images: med.foto ? [{ url: med.foto, alt: med.nome }] : undefined }`.
3. In `src/app/estudos/comunidade/[slug]/page.tsx:24-32`, add `alternates: { canonical: \`/estudos/comunidade/\${slug}\` }`.
4. In `src/app/sitemap.ts`:
   - Replace `/medicinas` and `/medicinas/${medicina.slug}` with `/sacramentos` and `/sacramentos/${medicina.slug}`.
   - Remove `/portal-dirigente` from public sitemap and add `/estudos/comunidade/${perfil.slug}` from `PERFIS_INICIAIS`.
5. In `src/app/robots.ts:9`, update `disallow` to `["/portal-dirigente", "/api/"]`.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm run build` → exit 0.

### Step 3: Synchronize and clean up `Segundo-Cerebro/` and `docs/agents/domain.md`

1. Delete the 0-byte `Segundo-Cerebro/MEU HARNESS/Sem título.md` and duplicate root file `Segundo-Cerebro/Desenvolvimento com IA - Metodologia Agêntica.md` (keeping the canonical copy in `Segundo-Cerebro/06-Arquitetura-do-Portal/`).
2. Add standard YAML frontmatter (`tipo`, `status`, `prioridade`) to `Segundo-Cerebro/MEU HARNESS/agentic-harness-guide.md` and `guia-passo-a-passo-desenvolvimento-antigravity-v2.md`.
3. Update `Segundo-Cerebro/00-Mapa-Mental-Portal-Nativaram.md` and `Segundo-Cerebro/06-Arquitetura-do-Portal/Roadmap-e-Componentes-do-Site.md` to reference all ADRs (`ADR-001` through `ADR-007`) and the new plans (`004`–`009`).
4. Update `docs/agents/domain.md` to point to `Segundo-Cerebro/06-Arquitetura-do-Portal/` for ADRs.

**Verify**: `cmd.exe /c npm test` → exits 0.

## Test plan

- Verify `sitemap()` output in `scripts/test-liturgico.mjs` includes `/sacramentos` and `/estudos/comunidade/ceu-do-cruzeiro` and excludes `/portal-dirigente`.
- Verification: `cmd.exe /c npm test` → all pass.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0
- [ ] `cmd.exe /c npm run build` exits 0
- [ ] `Navbar.tsx` and `WhatsAppFAB.tsx` apply `invisible` and `aria-hidden` when hidden
- [ ] `sitemap.ts` emits `/sacramentos` and `/estudos/comunidade/[slug]`
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any route fails static generation during `npm run build`.
- A step's verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Keep `Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md` updated after landing each plan.

