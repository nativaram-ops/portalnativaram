# Plano 019 — Grafo 7: TDD Ampliado, Verificação Real Chrome DevTools MCP & Consolidação Obsidian

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 7 de 7 (Depende dos Planos 017 e 018)
- **Skills ativas:** `testes-desenvolvimento-tdd`, `verificacao-e2e-nativaram`, `chrome-devtools`, `segundo-cerebro-ciclo-memoria-ativa`, `obra-verification-before-completion`

## Objetivo (`/goal`)
Provar com TDD, crawler HTTP, inspeção real no Chrome DevTools MCP e atualização do cofre Obsidian que toda a segunda onda de melhorias funciona sem erros de console nem regressões.

## Tarefas Atômicas
1. Ampliar `scripts/test-observatorio.mjs` com testes para:
   - auto-detecção e endpoint `GET /api/pesquisas-academicas?doi=...`;
   - validação das políticas RLS da migração `007-observatorio-anexos-academicos.sql`;
   - leitura/gravação híbrida segura em `src/lib/db/observatorio.ts` com fallback;
   - ausência de vocabulário proibido em `data/comunidade_perfis.json`, `data/comunidade_posts.json` e `data/anexos_academicos.json`.
2. Subir servidor de produção na porta 3000, rodar `npm run audit:e2e` (`14/14` HTTP 200) e inspecionar com Chrome DevTools MCP:
   - `/estudos#observatorio` abrindo diretamente a aba do Buscador Acadêmico e resolvendo um DOI exato (`10.3390/ph13110334`) com zero erros de console;
   - `/reconhecimento` em `375x812` sem overflow horizontal e sem aviso `No label associated with a form field`;
   - encerrar servidor e confirmar porta 3000 livre.
3. Registrar `ADR-014-Evolucao-Observatorio-DOI-Supabase-e-Saneamento.md` no cofre e atualizar `Banco-de-Dados-e-Persistencia-Local.md`, `Roadmap-e-Componentes-do-Site.md`, `Funil-de-Conversao-e-Navegacao-Didatica.md`, `Indice-de-Recuperacao-Rapida.md`, `00-Mapa-Mental-Portal-Nativaram.md` e `plans/README.md`.
4. Rodar o Gauntlet completo final pós-edição e conferir `git status -s` / `git diff data/`.

## Portão de Aceitação (Gauntlet Gate 7)
- Todas as verificações CLI, build de produção, E2E HTTP/Browser e memória Obsidian 100% verdes.
