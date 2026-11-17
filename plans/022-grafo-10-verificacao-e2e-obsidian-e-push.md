# Plano 022 — Grafo 10: TDD, Inspeção Real Chrome DevTools MCP, Obsidian & Push

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 10 de 10 (Depende dos Planos 020 e 021)
- **Skills ativas:** `verificacao-e2e-nativaram`, `chrome-devtools`, `segundo-cerebro-ciclo-memoria-ativa`, `obra-verification-before-completion`

## Objetivo (`/goal`)
Provar com suíte TDD ampliada, crawler HTTP, Chrome DevTools MCP (verificação visual e DOM de imagens + estudos em `/institucional` e `/estudos#observatorio`), sincronização do Obsidian (`ADR-015`) e simulação de CI que tudo está íntegro antes de commitar e dar push.

## Tarefas Atômicas
1. Atualizar `scripts/test-observatorio.mjs` validando quantidade mínima (>= 18 estudos globais), unicidade de DOI, URLs HTTPS válidas, cobertura dos 5 eixos e zero vocabulário proibido.
2. Subir build de produção na porta 3000, executar `npm run audit:e2e`, e verificar via Chrome DevTools MCP `/institucional` (`naturalWidth > 0` nas fotos reais do Acre/agrofloresta, zero erros de console) e `/estudos#observatorio` (exibição e filtragem do acervo internacional ampliado).
3. Criar `ADR-015-Acervo-Global-Observatorio-e-Fotografia-Real-Locais.md`, atualizar `00-Mapa-Mental-Portal-Nativaram.md`, `Roadmap-e-Componentes-do-Site.md`, `Indice-de-Recuperacao-Rapida.md` e `plans/README.md` (`020`–`022` = `DONE`).
4. Rodar Gauntlet completo final + simulação CI + `git commit` + `git push origin main`.

## Portão de Aceitação (Gauntlet Gate 10)
- `audit:preflight`, `audit:ast`, `npm test`, `typecheck`, `lint`, `next build` e `audit:e2e` 100% verdes após a última edição, com push confirmado.
