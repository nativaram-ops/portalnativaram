# Plano 021 — Grafo 9: Expurgo de Imagens de IA de Locais & Fotos Reais Verificadas

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 9 de 10 (Integridade Visual Real para Locais Geográficos)
- **Skills ativas:** `subagente-frontend`, `subagente-governanca`, `accessibility-wcag`

## Objetivo (`/goal`)
Remover todas as imagens geradas por IA que representem locais reais ou personagens (`agrofloresta-projetos-de-luz.jpg`, `nascidos-raio-de-sol.jpg`, `projeto-luz-altar.jpg`), buscar fotografias reais documentadas da internet (Wikimedia Commons / acervos públicos brasileiros sob licença livre), baixá-las localmente otimizadas, inspecioná-las visualmente e creditá-las nos componentes e metadados.

## Tarefas Atômicas
1. Auditar 100% dos arquivos em `public/assets/` e referências em `src/`.
2. Buscar e baixar via Wikimedia Commons API fotos reais verificadas com autoria e licença documentadas:
   - Panorama real do **Rio Juruá / Cruzeiro do Sul (Acre)** e **Floresta Amazônica no Acre**;
   - Fotografia real de **Sistema Agroflorestal na Amazônia Brasileira (Acre)**.
3. Otimizar as imagens reais via `sharp` (< 450 KB web-ready), validar visualmente via `read_file` (sem personagens artificiais nem distorções) e remover os 3 arquivos gerados por IA substituídos.
4. Atualizar `src/components/manifesto/ManifestoLanding.tsx`, `src/app/institucional/page.tsx`, `src/app/credenciamento/page.tsx` e `src/app/reconhecimento/page.tsx` com legendas reais e crédito fotográfico transparente.
5. Registrar em `AGENTS.md` e `scripts/preflight-audit.mjs` trava determinística proibindo imagens de IA para locais reais.

## Portão de Aceitação (Gauntlet Gate 9)
- Zero imagens de IA referenciando locais em `src/` ou `public/assets/`, preflight e build verdes.
