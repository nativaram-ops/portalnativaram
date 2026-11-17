# Plano 020 — Grafo 8: Varredura Acadêmica Global sobre DMT & Ayahuasca

- **Gerado em:** 2026-11-17
- **Grafo:** Nó 8 de 10 (Expansão do Acervo Global do Observatório Etnobotânico)
- **Skills ativas:** `curadoria-academica-etnobotanica`, `redacao-clara-ste100`, `karpathy-calibracao-e-preflight`

## Objetivo (`/goal`)
Realizar varredura extensa em bases científicas internacionais (Europe PMC, Crossref e literatura aberta de referência global — Brasil, EUA, Europa e América Latina), validar metadados/DOIs ao vivo e anexar um acervo robusto sobre DMT e Ayahuasca nos 5 eixos do Observatório (`/estudos#observatorio`).

## Tarefas Atômicas
1. Consultar via script determinístico as bases Europe PMC e Crossref cobrindo:
   - Brasil (USP, UFRN, UNICAMP, UFAC, IPHAN/CONAD);
   - Europa (Espanha/Sant Pau, Reino Unido/Imperial/Goldsmiths, Portugal/Porto, Países Baixos/Maastricht);
   - América do Norte (EUA/Johns Hopkins, UCLA Hoasca Project, Strassman DMT);
   - América Latina & Estudos Globais (Peru/Colômbia/Global Ayahuasca Survey);
   - Agrofloresta amazônica, manejo de cipó/chacrona e toxicocinética IMAO-A.
2. Pré-filtrar deterministicamente por DOI real (`10.\d{4,9}/...`), título íntegro, ausência de erratas e links HTTPS/Open Access verificados.
3. Redigir sínteses objetivas em linguagem clara (`ASD-STE100`) mantendo conformidade estrita com `AGENTS.md` (zero promessa clínica, zero vocabulário proibido, caráter estritamente descritivo +18) e verificar cada entrada via `validarConformidadeAnexo`.
4. Atualizar `ANEXOS_SEMENTE_VERIFICADOS` em `src/lib/db/observatorio.ts` e `data/anexos_academicos.json`, adicionando indicador/filtro por região/eixo se útil e sem bloat (`ponytail`).

## Portão de Aceitação (Gauntlet Gate 8)
- Todos os anexos com DOI real resolvido e verificados pelo preflight e testes unitários.
