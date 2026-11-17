# Plano 014 — Grafo 2: Backend & APIs do Observatório Etnobotânico (Buscador Acadêmico Aberto & Anexador)

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 2 de 4 (Dados, Contratos Zod, Segurança & TDD)
- **Depende de:** Plano 013 (Grafo 1)
- **Skills ativas:** `subagente-backend`, `testes-desenvolvimento-tdd`, `ecc-tdd-workflow`, `ecc-backend-patterns`, `ecc-security-review`, `learned-resilient-db-timeouts`, `typescript-zod-forms`, `curadoria-academica-etnobotanica`

## Objetivo (`/goal`)
Construir a camada de busca acadêmica em fontes abertas gratuitas (Europe PMC + Crossref + fallback OpenAlex) com filtragem determinística de qualidade/DOI e persistência híbrida segura para anexação de estudos verificados no portal.

## Tarefas Atômicas
1. Criar `src/types/observatorio.ts` com contratos para `ArtigoAcademicoExterno`, `AnexoEstudoPublicado`, `EixoTematicoObservatorio` e `ResultadoBuscaAcademica`.
2. Criar `src/lib/validators/observatorio.ts` com `BuscarPesquisasQuerySchema` e `NovoAnexoObservatorioSchema` (exigindo DOI `10.\d{4,9}/...`, URLs `https://`, limites anti-payload gigante e verificação lexical CONAD/ANVISA via `verificarConformidadeTexto`).
3. Criar `src/lib/observatorio/academic-search.ts`:
   - Consulta paralela a **Europe PMC** (`resultType=core`, com resumo, periódico e links Open Access PDF/HTML) e **Crossref** (cobrindo também Direito/Antropologia/CONAD/Agrofloresta), com fallback opcional OpenAlex quando configurado;
   - **Pré-filtro determinístico (Pilar 4 Karpathy):** limpa tags HTML (`<i>`, `<sup>`), descarta `Corrigendum`/`Erratum`/itens sem título ou DOI, remove duplicatas por DOI, filtra acesso aberto opcional e calcula metadados limpos;
   - Timeout estrito de `4500ms` por provedor e cache em memória de 10 minutos;
   - Exportador nativo em Markdown (pronto para Google NotebookLM) e BibTeX (`Pilar 9`).
4. Criar `src/lib/db/observatorio.ts` usando `createHybridJsonStore` (`data/anexos_academicos.json` + `os.tmpdir()`) com seeds iniciais usando apenas DOIs reais verificados nesta sessão (`10.3390/ph13110334`, `10.1007/s00213-019-05445-3`, `10.4324/9780429001161-9`).
5. Criar rotas REST:
   - `GET /api/pesquisas-academicas` (aceita `q`, `eixo`, `somenteAcessoAberto`, `formato=json|markdown`);
   - `GET /api/estudos/anexos` (público) e `POST /api/estudos/anexos` (exige sessão via `resolverTitularDaRequisicao`, bloqueia termos proibidos com HTTP 422);
   - `DELETE /api/estudos/anexos/[id]` (somente autor do templo ou ADM);
   - `GET /api/auth/verificar-chave` (consulta não-destrutiva do estado autenticado pelo cookie HttpOnly para UI pública saber quando exibir ações de Dirigente).
6. Criar suíte TDD `scripts/test-observatorio.mjs` e adicioná-la ao `npm test` em `package.json`.

## Portão de Aceitação (Gauntlet Gate 2)
- `cmd.exe /c "npm test && npm run typecheck"` 100% verde (zero falhas, inclusive toda a suíte nova `test-observatorio.mjs`).
