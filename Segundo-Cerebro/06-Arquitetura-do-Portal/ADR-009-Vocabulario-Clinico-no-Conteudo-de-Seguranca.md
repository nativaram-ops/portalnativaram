---
tipo: adr
status: pronto
prioridade: alta
ferramenta_principal: Conteúdo / Compliance
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Decisão de Arquitetura
---

# ADR-009: Vocabulário Clínico Preciso no Conteúdo de Segurança da Área Restrita

## Contexto
O Dicionário de Engenharia de Linguagem do `AGENTS.md` proíbe termos como "dose", "medicamento", "tratamento" e "remédio" e manda trocá-los por expressões como "porção sugerida" ou "gotas de intenção". A regra existe para a comunicação pública (site, redes, anúncios). No material de **segurança** do Portal do Dirigente (matriz de interações, ficha de anamnese, parecer médico, cartão para o SAMU), o eufemismo atrapalha: "gotas de intenção" no lugar de "dose", ou "preparado de força" no lugar de "medicamento", pode causar erro de triagem. O código já não seguia a regra nessa área (`FAQ_DIRIGENTE` com categoria `DOSAGENS`, "Lista de Medicamentos Controlados"). Apontado no plano `plans/010`, item C1.

## Decisão
- **Conteúdo de segurança da área restrita** (`src/data/portal-assessoria.ts`, `src/data/documentos/`, `PortalInteracoesMedicamentosas.tsx`, `PortalCentralDocumentos.tsx`, `knowledge-base/notebooklm/`) usa termos clínicos precisos: medicamento, dose, washout, contraindicação, nomes comerciais e princípios ativos.
- Continua proibido nessa área: promessa de cura, alegação terapêutica e linguagem comercial.
- **Conteúdo público** (páginas abertas, `/estudos`, `public/documentos/`, redes e anúncios) segue o dicionário do `AGENTS.md` sem exceção.

## Consequências
- ✅ Material de triagem compreensível para médicos, farmacêuticos e equipes de emergência.
- ⚠️ Agentes que "corrigirem" esses arquivos de volta para o vocabulário poético estarão violando esta decisão. O `AGENTS.md` aponta para este ADR.

---

## Relações

### Depende de
- [[Dicionario-Semantico-Nativaram]]
- [[Protocolos-de-Seguranca-Integrativa-e-Anamnese]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Indice-de-Recuperacao-Rapida]]
