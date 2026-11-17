# Plano 017 — Grafo 5: Resolução Direta por DOI, Migração Supabase 007 & Atalhos do Observatório

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 5 de 7 (Depende dos Planos 014 e 015)
- **Skills ativas:** `curadoria-academica-etnobotanica`, `subagente-backend`, `subagente-frontend`, `ecc-backend-patterns`

## Objetivo (`/goal`)
Permitir resolver um DOI exato diretamente no buscador do Observatório, espelhar os anexos acadêmicos no Supabase (`007`) com fallback local atômico (`ADR-008`) e abrir diretamente `/estudos#observatorio` a partir do Portal do Dirigente e da Home.

## Tarefas Atômicas
1. **Resolução Direta por DOI (`academic-search.ts`, `validators/observatorio.ts`, `/api/pesquisas-academicas`):**
   - Extrair mapeamento Crossref em helper único (`mapearItemCrossref`, princípio DRY — sem duplicação de código) para suportar consulta textual e lookup exato em `https://api.crossref.org/works/{doi}` + Europe PMC `DOI:"{doi}"`.
   - Aceitar parâmetro `?doi=` (e auto-detecção quando `?q=` contiver um DOI ou link `https://doi.org/...`).
2. **Persistência Híbrida Real Supabase (`007-observatorio-anexos-academicos.sql` + `src/lib/db/observatorio.ts`):**
   - Criar migração SQL `007-observatorio-anexos-academicos.sql` (`ENABLE ROW LEVEL SECURITY`, `REVOKE INSERT, UPDATE, DELETE ... FROM anon, authenticated`, `CREATE POLICY ... FOR SELECT TO anon, authenticated USING (true)`).
   - Atualizar `src/lib/db/observatorio.ts` com `getDirectSupabaseClient()`, `withTimeout()` e `gravarNoSupabase()` sincronizando `anexos_academicos` sem quebrar fallback local / testes (`NATIVARAM_TEST=1`).
3. **Deep-Linking Direto `#observatorio` / `#acervo`:**
   - `EstudosClient.tsx`: ler `window.location.hash` na montagem e `hashchange` (sem `useSearchParams` / `Suspense`) e atualizar URL via `history.replaceState` ao alternar abas.
   - `PortalDirigenteClient.tsx` e `HomeJornadaFunil.tsx`: apontar links diretos para `/estudos#observatorio`.
   - `ObservatorioAcademico.tsx`: indicar claramente no placeholder e dica de uso a aceitação direta de termos ou DOI / link `doi.org/...`.

## Portão de Aceitação (Gauntlet Gate 5)
- `cmd.exe /c "npm run audit:preflight && npm run audit:ast && npm test && npm run typecheck && npm run lint"` verde.
