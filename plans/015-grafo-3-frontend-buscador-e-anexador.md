# Plano 015 — Grafo 3: Frontend do Observatório Etnobotânico & Anexador Social (`/estudos`)

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 3 de 4 (UI, Acessibilidade WCAG, Linguagem Clara & Fluxo Comunitário)
- **Depende de:** Plano 014 (Grafo 2)
- **Skills ativas:** `subagente-frontend`, `od-master-design`, `od-minimalist`, `od-taste-skill`, `accessibility-wcag`, `tailwind-design-system`, `vercel-composition-patterns`, `vercel-react-best-practices`, `redacao-clara-ste100`

## Objetivo (`/goal`)
Entregar a interface do **Observatório Etnobotânico: Buscador Acadêmico & Anexador Comunitário** integrada à aba `/estudos` e ao fluxo do Dirigente, com acessibilidade WCAG 2.1 AA, linguagem simples (`ASD-STE100`) e selo obrigatório de separação entre evidência científica externa e posicionamento da cooperativa.

## Tarefas Atômicas
1. Criar `src/components/estudos/ObservatorioAcademico.tsx`:
   - Painel de busca por palavra-chave ou 5 eixos temáticos (*Ayahuasca & Fitoquímica*, *Etnobotânica Juruá*, *Segurança IMAO & Triagem*, *CONAD & Direito Religioso*, *Agrofloresta*);
   - Filtro `Somente Acesso Aberto (PDF/Texto gratuito)` e input com `16px` no mobile;
   - Cards com badges **DOI Verificável**, **Acesso Aberto**, resumo legível, botões **Copiar ABNT**, **Copiar BibTeX**, **Salvar na Pasta de Estudo (Markdown → NotebookLM)**;
   - Para dirigentes/ADM autenticados (`GET /api/auth/verificar-chave`), formulário modal/expansível **Anexar ao Acervo do Observatório** com campo `Síntese em Linguagem Clara`, categoria, nota opcional e alerta léxico CONAD em tempo real antes de enviar;
   - Grade pública **Acervo Acadêmico Anexado ao Site** exibindo os artigos anexados com selo obrigatório: *"Publicação científica externa revisada por pares — caráter informativo, sem promessa terapêutica"* (+ botão de exclusão para o templo autor/ADM).
2. Integrar em `src/components/estudos/EstudosClient.tsx` adicionando a aba **"Buscador Acadêmico & Anexos"** ao alternador mestre (`COMUNIDADE` | `OBSERVATORIO` | `DOSSIES`) e mantendo os botões de NotebookLM sincronizados com o exportador Markdown dos artigos selecionados.
3. Adicionar atalho rápido no `PortalDirigenteClient.tsx` / `PortalComunidadeGestao.tsx` convidando dirigentes autenticados a anexarem pesquisas acadêmicas no `/estudos`.

## Portão de Aceitação (Gauntlet Gate 3)
- `cmd.exe /c "npm test && npm run typecheck && npm run lint && npm run build"` concluído com código 0.
