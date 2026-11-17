# Plano 018 — Grafo 6: Saneamento Semântico de Seeds, Acessibilidade de Formulários & Limpeza de Lint

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 6 de 7 (Depende do Plano 017)
- **Skills ativas:** `redacao-clara-ste100`, `accessibility-wcag`, `karpathy-calibracao-e-preflight`

## Objetivo (`/goal`)
Eliminar violações residuais do Dicionário Semântico nos dados iniciais da comunidade, remover o alerta de acessibilidade `<label>` detectado pelo Chrome DevTools em `/reconhecimento`, eliminar o warning de hook em `AdminGestaoHomologacoes.tsx` e blindar os seeds contra regressão no pre-flight.

## Tarefas Atômicas
1. **Sanitização de Seeds (`data/comunidade_perfis.json` + `src/lib/db/comunidade.ts`):**
   - Substituir `"hinários de cura espiritual"` na bio de `Templo Céu do Cruzeiro` por `"hinários de alinhamento espiritual"`.
   - Expandir `scripts/preflight-audit.mjs` para verificar também `data/comunidade_*.json` e `data/anexos_academicos.json` contra termos proibidos críticos (`\bcura\b`, `\bcomprar\b`, `\blojacomercial\b`, `Nativaram Brasil`).
2. **Acessibilidade WCAG em Formulários (`/reconhecimento` & `/estudos`):**
   - Em `src/components/forms/ReconhecimentoForm.tsx`, converter os 3 títulos de grupo que usavam `<label>` órfão em `<span id="...">` associados via `role="group" aria-labelledby="..."`, eliminando o alerta `[issue] No label associated with a form field`.
   - Garantir associação `id`/`htmlFor`/`aria-label` explícita nos campos de filtro/anexo de `ObservatorioAcademico.tsx`.
3. **Limpeza de Warning ESLint:**
   - Em `src/components/portal-dirigente/AdminGestaoHomologacoes.tsx`, estabilizar `carregarSolicitacoes` com `useCallback` mantendo o `useEffect` limpo de warnings `react-hooks/exhaustive-deps`.

## Portão de Aceitação (Gauntlet Gate 6)
- `cmd.exe /c "npm run audit:preflight && npm run audit:ast && npm test && npm run typecheck && npm run lint && npm run build"` verde (sem warnings em `AdminGestaoHomologacoes.tsx`).
