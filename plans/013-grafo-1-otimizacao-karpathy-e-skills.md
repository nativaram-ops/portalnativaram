# Plano 013 — Grafo 1: Otimizações Modelo Andrej Karpathy, Pré-Filtro Determinístico & Skills Específicas

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 1 de 4 (Fundação Operacional & Automação Determinística)
- **Depende de:** —
- **Skills ativas:** `ponytail`, `documentacao-escrita-para-agentes`, `segundo-cerebro-ciclo-memoria-ativa`, `stop-slop`, `caveman`

## Objetivo (`/goal`)
Aplicar os 11 pilares da Memória Operacional Andrej Karpathy ao fluxo real do portal Nativaram: eliminar redundância de instruções, trocar auditorias manuais caras por scripts determinísticos rápidos e criar 4 skills enxutas específicas para o projeto.

## Tarefas Atômicas
1. Persistir o documento-referência em `Segundo-Cerebro/06-Arquitetura-do-Portal/Modelo-Operacional-Karpathy.md` com YAML simples e `## Relações`.
2. Compactar `AGENTS.md` preservando integralmente todas as invariantes (identidade Cooperativa Nativaram, Dicionário Semântico + exceção `ADR-009`, regras de compliance +18, governança Windows `cmd.exe /c`, design tokens, regra de arquivos ignorados no Git e ciclo Obsidian), removendo a listagem redundante de dezenas de skills que já vivem em `Guia-de-Skills-e-Comandos.md`.
3. Criar `scripts/preflight-audit.mjs` (filtro determinístico em Node sem uso de IA):
   - Escaneia termos proibidos e marcas residuais em `src/`;
   - Verifica `public/documentos/` quanto a arquivos pesados (`> 3 MB`) e integridade;
   - Verifica sincronia entre `.agents/skills/` e `Guia-de-Skills-e-Comandos.md` e integridade básica de `Segundo-Cerebro/`.
4. Registrar `"audit:preflight"` e `"audit:ast"` em `package.json` e atualizar `scripts/e2e-crawler.mjs` cobrindo `/reconhecimento`, `/estudos`, `/projetos-de-luz`, `/privacidade`, `/contato` e `/api/estudos/anexos`.
5. Criar as 4 skills específicas em `.agents/skills/`:
   - `karpathy-calibracao-e-preflight/SKILL.md`
   - `verificacao-e2e-nativaram/SKILL.md`
   - `curadoria-academica-etnobotanica/SKILL.md`
   - `redacao-clara-ste100/SKILL.md`

## Portão de Aceitação (Gauntlet Gate 1)
- `cmd.exe /c "npm run audit:preflight && npm run audit:ast && npm test"` retorna código 0.
