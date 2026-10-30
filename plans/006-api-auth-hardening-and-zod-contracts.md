# Plan 006: Harden API Authentication, Eliminate Client Credential Leaks & Enforce Zod Contracts

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `cmd.exe /c "git diff --stat 5490f88..HEAD -- src/app/api/ src/components/portal-dirigente/PortalLoginGate.tsx src/components/portal-dirigente/AdminGestaoPedidos.tsx"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/005-hybrid-db-core-and-supabase-sync.md
- **Category**: security
- **Planned at**: commit `5490f88`, 2026-10-30

## Why this matters

Currently, several API endpoints and client authentication flows have critical access-control gaps:
1. `GET /api/solicitacoes` (`src/app/api/solicitacoes/route.ts:40-49`) returns all homologation records—including plaintext `loginGerado`, `senhaGerada`, `telefone`, `email`, and `cnpj`—to any unauthenticated caller.
2. `POST /api/solicitacoes/[id]/homologar` (`src/app/api/solicitacoes/[id]/homologar/route.ts:4-41`) approves any solicitation (or creates a new one if `id` does not exist) and returns `loginGerado` + `senhaGerada` with zero authentication check.
3. `PortalLoginGate.tsx:53-76` embeds the admin credentials in the client bundle and accepts any 4+ character password for initial seed temples (`senhaLimpa.length >= 4`), while `AdminGestaoPedidos.tsx:117` hardcodes the `x-nativaram-auth` header value in client code.
4. `DELETE` in `src/lib/db/comunidade.ts:455,577` allows bypassing temple ownership if the `temploCodigo` query parameter contains the substring `"adm"` (`!temploCodigo.includes("adm")`).

## Current state

- `src/app/api/solicitacoes/route.ts:40-49` — Returns raw `solicitacoes` array including `senhaGerada`.
- `src/app/api/solicitacoes/[id]/homologar/route.ts:4-48` — No `x-nativaram-auth` or session cookie check; no Zod validation on `body`.
- `src/app/api/auth/verificar-chave/route.ts:4-42` — Validates only `DIRIGENTE` credentials via `validarCredenciaisDirigente`, does not handle `ADMIN` login, and does not set an `HttpOnly` session cookie.
- `src/components/portal-dirigente/PortalLoginGate.tsx:53-76` — Checks admin password and `templosIniciais` (`senhaLimpa.length >= 4`) in the browser before calling `/api/auth/verificar-chave`.
- `src/lib/db/comunidade.ts:455,577` — `if (post.temploCodigo.toUpperCase() !== temploCodigo.toUpperCase() && !temploCodigo.includes("adm")) return false;`.

## Commands you will need

| Purpose   | Command                              | Expected on success |
|-----------|--------------------------------------|---------------------|
| Typecheck | `cmd.exe /c npx tsc --noEmit`        | exit 0, no errors   |
| Tests     | `cmd.exe /c npm test`                | all pass (exit 0)   |
| Build     | `cmd.exe /c npm run build`           | exit 0              |

## Suggested executor toolkit

- Invoke `/ecc-security-review` and `/typescript-zod-forms`.

## Scope

**In scope**:
- `src/lib/auth/session.ts` (create)
- `src/lib/validators/solicitacao.ts` (create)
- `src/app/api/auth/verificar-chave/route.ts`
- `src/app/api/solicitacoes/route.ts`
- `src/app/api/solicitacoes/[id]/homologar/route.ts`
- `src/app/api/pedidos/[id]/route.ts`
- `src/app/api/reconhecimento/route.ts`
- `src/app/api/comunidade/posts/route.ts`
- `src/app/api/comunidade/posts/[id]/route.ts`
- `src/app/api/comunidade/agenda/route.ts`
- `src/lib/db/comunidade.ts`
- `src/components/portal-dirigente/PortalLoginGate.tsx`
- `src/components/portal-dirigente/AdminGestaoPedidos.tsx`
- `src/components/portal-dirigente/AdminGestaoHomologacoes.tsx`
- `scripts/test-liturgico.mjs`

**Out of scope**:
- Public read endpoints (`GET /api/comunidade/posts`, `GET /api/comunidade/perfis`, `GET /api/comunidade/agenda`).

## Git workflow

- Branch: `advisor/006-api-auth-hardening-and-zod-contracts`
- Commit message style: `sec(api): enforce server-side auth, strip sensitive fields and add Zod contracts`
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Create `src/lib/auth/session.ts` and `src/lib/validators/solicitacao.ts`

1. Create `src/lib/auth/session.ts` providing:
   - HMAC-SHA256 signed session token generation and verification using Node's native `crypto.createHmac` (zero external dependencies) keyed by `process.env.ADMIN_SECRET_KEY || "nativaram-liturgico-session-key"`.
   - `verifyAdminRequest(request: NextRequest): boolean` checking either the signed `nativaram_session` cookie (`role === "ADMIN"`) OR the `x-nativaram-auth` header (for backwards compatibility with CLI/automated tests).
   - `verifyDirigenteOrAdminRequest(request: NextRequest, expectedTemploCodigo?: string): boolean`.
   - Simple in-memory sliding-window rate limiter `checkRateLimit(key: string, maxRequests = 15, windowMs = 60_000): boolean`.
2. Create `src/lib/validators/solicitacao.ts` with `RegistrarSolicitacaoSchema`, `HomologarComplementoSchema`, and `VerificarChaveSchema`.

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 2: Centralize authentication in `POST /api/auth/verificar-chave` and remove client-side bypasses

1. Update `src/app/api/auth/verificar-chave/route.ts` to:
   - Apply `checkRateLimit` and `VerificarChaveSchema`.
   - Validate `ADMIN` credentials on the server and return `{ sucesso: true, role: "ADMIN", congregao: { id: "ADM-NATIVARAM", ... } }` while setting an `HttpOnly`, `SameSite=Lax`, `Path=/` cookie `nativaram_session`.
   - Validate `DIRIGENTE` credentials via `validarCredenciaisDirigente(login, senha)` and set the `nativaram_session` cookie with `role: "DIRIGENTE"` and `codigo`.
2. In `src/components/portal-dirigente/PortalLoginGate.tsx`:
   - Delegate authentication to `/api/auth/verificar-chave` first, removing the client-side `senhaLimpa.length >= 4` bypass on `templosIniciais` (`lines 69-76`).
3. In `src/components/portal-dirigente/AdminGestaoPedidos.tsx:113-120` and `AdminGestaoHomologacoes.tsx:236-240`, rely on same-origin `credentials: "include"` session cookie (keeping header support on the server for tests).

**Verify**: `cmd.exe /c npx tsc --noEmit` → exit 0.

### Step 3: Protect `/api/solicitacoes`, `/api/solicitacoes/[id]/homologar`, `/api/reconhecimento`, and `/api/comunidade/*`

1. In `src/app/api/solicitacoes/[id]/homologar/route.ts`:
   - Require `verifyAdminRequest(request)` (return `401` if unauthorized).
   - Validate body with `HomologarComplementoSchema`.
2. In `src/app/api/solicitacoes/route.ts`:
   - In `GET`, if `!verifyAdminRequest(request)`, strip `senhaGerada`, `telefone`, `email`, and `cnpj` from each returned item so non-admin callers only see public homologated metadata (`id`, `loginGerado`, `nomeEntidade`, `nomeResponsavel`, `cidade`, `estado`, `status`, `graduacao`, `volumeEstimado`).
   - In `POST`, validate request body with `RegistrarSolicitacaoSchema` and force `status: "PENDENTE_LIBERACAO"`.
3. In `src/app/api/reconhecimento/route.ts:32`:
   - Require `verifyAdminRequest(request)` on `GET /api/reconhecimento`.
4. In `src/lib/db/comunidade.ts:447,571` and `/api/comunidade/posts/[id]/route.ts`, `/api/comunidade/agenda/route.ts`:
   - Replace `!temploCodigo.includes("adm")` with explicit `isAdmin: boolean` parameter verified on the server via `verifyAdminRequest(request)`.
   - In `POST /api/comunidade/posts` (`src/app/api/comunidade/posts/route.ts:64`), if `alertas.length > 0` and `status === "PUBLICADO"`, downgrade `status` to `"RASCUNHO"` so non-compliant posts cannot be published directly via API.

**Verify**: `cmd.exe /c npx tsc --noEmit & cmd.exe /c npm test` → exit 0.

## Test plan

- Add tests in `scripts/test-liturgico.mjs`:
  1. `createSessionToken` and `verifySessionToken` round-trip and tamper rejection.
  2. `RegistrarSolicitacaoSchema` rejects missing required fields and strips unauthorized status overrides.
- Verification: `cmd.exe /c npm test` → all pass.

## Done criteria

- [ ] `cmd.exe /c npx tsc --noEmit` exits 0
- [ ] `cmd.exe /c npm test` exits 0
- [ ] `POST /api/solicitacoes/[id]/homologar` returns 401 when called without admin auth
- [ ] Unauthenticated `GET /api/solicitacoes` never exposes `senhaGerada`
- [ ] `!temploCodigo.includes("adm")` is removed from `src/lib/db/comunidade.ts`
- [ ] `plans/README.md` status row updated

## STOP conditions

- The code at the locations in "Current state" doesn't match the excerpts.
- Any existing test in `scripts/test-liturgico.mjs` breaks after adding session verification.

## Maintenance notes

- All future admin endpoints under `src/app/api/` must call `verifyAdminRequest(request)` from `src/lib/auth/session.ts`.

