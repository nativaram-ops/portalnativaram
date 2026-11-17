# Plano 016 — Grafo 4: Verificação Real E2E (Chrome DevTools / Crawler) & Consolidação Obsidian

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 4 de 4 (Validação em Ambiente Real & Memória Ativa)
- **Depende de:** Planos 013, 014 e 015 (Grafos 1–3)
- **Skills ativas:** `verificacao-e2e-nativaram`, `chrome-devtools`, `ecc-verification-loop`, `obra-verification-before-completion`, `segundo-cerebro-ciclo-memoria-ativa`

## Objetivo (`/goal`)
Validar todo o sistema em execução real (servidor HTTP + Chrome DevTools MCP), corrigir qualquer desvio visual/console encontrado, sincronizar o cofre `Segundo-Cerebro/` e fechar o índice de planos.

## Tarefas Atômicas
1. Subir o servidor de produção (`next start` / `next dev`) na porta 3000 após liberar processos órfãos.
2. Rodar `cmd.exe /c "node scripts/e2e-crawler.mjs"` e executar inspeção viva via MCP `chrome-devtools` nas rotas `/` (WelcomeConsentModal + 3 Caminhos), `/estudos` (Buscador Acadêmico ao vivo + anexos), `/reconhecimento`, `/credenciamento` e `/portal-dirigente` em desktop (1280px) e mobile (375px), confirmando zero erros de console/hidratação.
3. Criar `Segundo-Cerebro/06-Arquitetura-do-Portal/ADR-013-Otimizacao-Karpathy-e-Observatorio-Academico.md` e atualizar:
   - `00-Mapa-Mental-Portal-Nativaram.md`
   - `Guia-de-Skills-e-Comandos.md`
   - `Roadmap-e-Componentes-do-Site.md`
   - `Funil-de-Conversao-e-Navegacao-Didatica.md`
   - `Indice-de-Recuperacao-Rapida.md`
   - `plans/README.md` (status `DONE` nos Planos 013–016)
4. Re-executar o Gauntlet completo final (`audit:preflight`, `audit:ast`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`).

## Portão de Aceitação (Gauntlet Gate 4)
- Todas as verificações automatizadas, build de produção e checagem E2E real verdes após a última edição.
