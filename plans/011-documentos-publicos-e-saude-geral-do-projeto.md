# Plano 011 — Documentos Públicos de Download e Saúde Geral do Projeto

- **Gerado em:** 2026-11-02, commit `434a6ba`, por auditoria só leitura (`/improve`)
- **Complementa:** plano 010 (matriz de interações e documentos do Portal do Dirigente). Este plano cobre o resto: os arquivos de `public/documentos/` oferecidos em `/estudos`, os downloads gerados pelo próprio app e a saúde geral do repositório.
- **Prioridade:** P0 (item 0) / P1 (bloco A) / P2 (bloco B)
- **Esforço:** M
- **Risco:** MED para o bloco A (envolve tirar documentos do ar e reescrever textos públicos); LOW para o bloco B
- **Linha de base no commit `434a6ba`:**
  - `cmd.exe /c npm test` → 35 passaram, 0 falharam
  - `cmd.exe /c npx tsc --noEmit --incremental false` → sem erros
  - `cmd.exe /c npm run lint` → **falha**: `ESLint must be installed` (ver B2)
  - `cmd.exe /c npm audit --omit=dev` → 5 vulnerabilidades (1 crítica, 4 altas) (ver B1)
- **Contexto importante:** o repositório `nativaram-ops/portalnativaram` no GitHub é **público**. Tudo que está versionado, inclusive `Segundo-Cerebro/`, `plans/` e os arquivos de `public/documentos/`, pode ser lido por qualquer pessoa.

---

## 0. P0 — Políticas RLS abertas na tabela de homologações

`src/lib/supabase/migrations/003-politicas-rls-aplicacao.sql` cria, para `public.solicitacoes_homologacao`, políticas `SELECT USING (true)`, `INSERT WITH CHECK (true)` e `UPDATE USING (true)`. A chave anônima do Supabase é pública por natureza: vai para o navegador via `NEXT_PUBLIC_SUPABASE_*` (`src/lib/supabase/client.ts:9-14`) e também está escrita em `.env.local.example`. Essa tabela tem as colunas `login_gerado` e `senha_gerada` (`src/lib/supabase/schema.sql:79-80`), além de telefone, e-mail e CNPJ.

Se a migração 003 foi aplicada no Supabase, qualquer pessoa com a URL do projeto e a chave anônima pode:
- **ler** todas as solicitações, inclusive as credenciais geradas para cada templo;
- **alterar** o status de qualquer solicitação, por exemplo para homologada.

Agenda, perfis e publicações também aceitam `UPDATE`/`DELETE` com `USING (true)`: qualquer pessoa pode apagar a agenda ou as publicações de outro templo.

**Fazer:**
1. Confirmar no painel do Supabase (Authentication → Policies) se as políticas da 003 estão ativas.
2. Se estiverem, revogá-las nas tabelas sensíveis (`solicitacoes_homologacao`, pedidos) e fazer o servidor usar a `SUPABASE_SERVICE_ROLE_KEY`, que ignora o RLS e nunca vai ao navegador. Para comunidade/agenda: leitura pública pode ficar; escrita só via API autenticada.
3. Considerar comprometidas as credenciais de templo já geradas e gerá-las de novo.
4. Não guardar senha em texto puro (`senha_gerada`). Guardar apenas o hash, ou não guardar, e entregar a senha uma única vez.

**Andamento (2026-11-02):** passos de código feitos. `src/lib/supabase/migrations/004-fechar-rls-tabelas-sensiveis.sql` criada; `003` marcada obsoleta; `schema.sql` e `schema_comunidade.sql` alinhados; aviso no log quando falta a service role em produção (`src/lib/db/core-hybrid-store.ts`); teste novo em `scripts/test-liturgico.mjs` (36/36 verde). **Falta (manual):** conferir a variável na Vercel, rodar a 004 no Supabase, regenerar credenciais (passo 3) e deixar de guardar `senha_gerada` em texto puro (passo 4).

**Pronto quando:** uma consulta com a chave anônima (`select * from solicitacoes_homologacao`) retorna 0 linhas ou erro de permissão, e a homologação continua funcionando pelo painel ADM.

---

## A. Documentos públicos de download

A página pública `/estudos` (`src/components/estudos/EstudosClient.tsx:43-69` e `src/data/estudos.ts`) lista 27 arquivos de `public/documentos/`. Outros arquivos dessa pasta não são linkados, mas continuam acessíveis por URL direta (`/documentos/dossie-estrategico-compliance-nativaram.md`, por exemplo). Todos os 29 foram extraídos e lidos.

### A1. Documentos internos publicados como se fossem públicos

| Arquivo | Linkado em `/estudos`? | O que contém |
|---|---|---|
| `nativaram-relatorio-assessoria-governanca.pdf` | sim, como "Manual Unificado de Governança e Compliance **Algorítmico** 2026" | Estratégia de anúncios no Meta/Google, nomes codificados de audiências, CAPI para manter remarketing, e a frase "O **e-commerce** da Nativaram Brasil deve excluir…" |
| `assessoria-nativaram-relatorio.md` | não (URL direta) | Mesmo conteúdo em Markdown |
| `dossie-estrategico-compliance-nativaram.md` | não (URL direta) | "perfil botânico dos principais elementos **comercializados**", seção "O Risco de Bloqueio (Algorítmico)", "para evitar o cancelamento de anúncios no Meta Ads" |
| `nativaram-parecer-juridico-comunicacao.pdf` / `parecer-juridico-comunicacao-ayahuasca.md` | sim | Parecer jurídico interno sobre comunicação |
| `manual-compliance-nativaram.pdf`, `nativaram-manual-compliance-definitivo.pdf`, `nativaram-manual-comunicacao-compliance.pdf`, `Diretrizes de Comunicação e Compliance Nativaram Brasil.pdf` | sim, os quatro | Quatro versões do manual de comunicação, com listas de termos a evitar para não ser bloqueado |

**Por que importa:** o portal se apresenta como cooperativa sem fins lucrativos, sem venda e sem carrinho. Esses arquivos dizem "comercializados" e "e-commerce" e ensinam a escrever anúncios que passem pelos filtros das plataformas. Para um fiscal, um jornalista ou a própria Meta, isso é a prova contrária do que o site afirma. O valor desses textos é **interno**.

**Fazer:** tirar de `public/` e de `/estudos`. Se o conteúdo for útil aos dirigentes, servir pela área autenticada do Portal do Dirigente (rota de API que checa a sessão antes de entregar o arquivo), nunca a partir de `public/`. Lembrar que os arquivos continuarão no histórico do git do repositório público.

### A2. Marca errada em quase todos os arquivos

24 dos 29 arquivos mencionam "Nativaram Brasil", a marca da loja, e os PDFs de estudo abrem com "COOPERATIVA ETNOBOTÂNICA NATIVARAM **BRASIL** — ESTUDO CIENTÍFICO OFICIAL". O `AGENTS.md` exige "Cooperativa Nativaram" neste portal. Exemplos: `documento-institucional-nativaram.pdf` (27 ocorrências), `nativaram-catalogo-v4.pdf` (38), `nativaram-base-conhecimento-definiva.pdf` (35). O título de exibição em `EstudosClient.tsx:62` também diz "Documento Institucional Nativaram Brasil & Sananga".

### A3. Linguagem proibida e alegações sem base em documentos públicos

O `AGENTS.md` proíbe "cura", "medicina/remédio" e promessa clínica. Parte das ocorrências abaixo está nos manuais de compliance, que *listam* termos proibidos, e essas são aceitáveis. As que contam são as dos textos de apresentação:

- **Catálogos v2/v3/v4:** título "Catálogo de Curadoria Etnobotânica e **Medicinas** Artesanais", "29 sacramentos e **medicinas** sagradas"; 41 a 43 ocorrências de "cura" e 47 a 50 de "medicina/remédio" por catálogo.
- **`nativaram-rapes-sagrados-floresta-e-ciencia` (.md e .pdf):** "**Cura de Relacionamentos**: O α-humuleno (Catissaral) estimula a produção de ocitocina", que é uma alegação fisiológica sem fonte; também "Sete ervas, sete cantos, sete mundos **curados**".
- **`nativaram-base-conhecimento-definiva.pdf`:** subtítulo "Estudo **Clínico**, Etnobotânico e Curadoria das **Medicinas** da Floresta"; "Cacau: … **Cura** do Coração"; "curando dores emocionais".
- **`fitoquimica-cipo-tucunaca-ayahuasca.pdf`:** subtítulo "**Prevenção de Tremores**"; afirma que a harmalina baixa do Tucunacá "é o grande responsável por evitar quedas súbitas de pressão", sem referência.
- **`estudo-cientifico-sananga-tabernaemontana.pdf`:** "Ausência de efeitos sistêmicos… sem ultrapassar a barreira hematoencefálica em dosagens de uso cerimonial", uma afirmação de segurança sem fonte.

**Fazer:** passar cada texto público pelo dicionário do `AGENTS.md` e retirar as alegações fisiológicas que não tenham referência verificável.

### A4. "Estudos científicos oficiais" que não sustentam o rótulo

- `fitoquimica-cipo-tucunaca-ayahuasca.pdf` (348 palavras), `estudo-cientifico-sananga-tabernaemontana.pdf` (379) e `alquimia-biogeoquimica-cinzas-rape.pdf` (409) têm **uma página** cada. Todos dizem "Estudo Científico Oficial" e "Conselho Científico Nativaram", mas não têm autor, método, amostra nem referência bibliográfica. As "fontes primárias" são nomes de instituições (UFAC, USP, UnB) sem citar trabalho algum.
- **Números divergentes de harmina no Tucunacá:** o PDF, `FeitioLanding.tsx:800,948`, `ManifestoLanding.tsx:662` e `docs/context/ayahuasca-ciencia-e-graduacoes.md` dizem **9,21 mg/g**; o Índice do cofre, o ADR-004, `Portal-do-Dirigente-e-Gestao-Liturgica.md` e `Roadmap-e-Componentes-do-Site.md` dizem **8,03 mg/g**. Não foi encontrado nenhum laudo que sustente qualquer um dos dois.
- `dossie-estrategico-compliance-nativaram.md` tem 76 marcadores de citação do NotebookLM (`[113, 141]`) sem bibliografia. Para quem lê, parecem referências inventadas.

**Fazer:** renomear para "Nota técnica" o que não for estudo; citar a fonte real de cada número (laudo HPLC com data, laboratório e lote, ou artigo publicado); escolher um valor de harmina e corrigir todos os lugares, ou remover o número se não houver laudo.

### A5. O PDF da "Resolução CONAD 01/2010" não é a resolução

`resolucao-conad-01-2010-marco-ayahuasca.pdf` aparece em `/estudos` como "Marco Regulatório da Ayahuasca: Resolução CONAD 01/2010 Comentada". É uma página de comentário que mistura a norma com regras internas sem separar uma coisa da outra: menciona "Gollog", "Termo de Uso Ritualístico assinado pela diretoria" e "Ata de Eleição" como se fossem exigências da resolução. A linha do subtítulo sai embaralhada na extração de texto (camadas de texto sobrepostas no PDF).

**Fazer:** oferecer o texto oficial (DOU de 26/01/2010) como arquivo próprio e manter o comentário à parte, marcando o que é norma e o que é recomendação da cooperativa.

### A6. Versões duplicadas e obsoletas no ar

- **Três catálogos** listados ao mesmo tempo: v2 (`nativaram-catalogo-v2 PDF.pdf`), v3 e v4. Só o v4 deveria estar no ar.
- **Pares .md + .pdf** do mesmo texto: rapés, parecer jurídico, relatório de assessoria, feitio/graduações.
- **Quatro manuais** de compliance com nomes parecidos (ver A1).
- **Nomes de arquivo frágeis:** espaços, acentos e "(1)" (`sobre nós nativaram.pdf`, `Diretrizes Institucionais e Base de Conhecimento - Nativaram Brasil (1).pdf`, `nativaram-catalogo-v2 PDF.pdf`). Funcionam hoje, mas quebram com facilidade em links compartilhados no WhatsApp. Padronizar em `kebab-case` sem acento.

### A7. Acessibilidade e peso

- **Três PDFs são só imagem**, sem nenhum texto extraível: `nativaram-ethnobotanical-manifesto-slide-deck.pdf` (**19 MB**), `nativaram-sacred-guide-slide-deck.pdf` (**13,5 MB**) e `sobre nós nativaram.pdf` (2,7 MB). Leitor de tela não lê, a busca não encontra, e no celular com 4G o download leva minutos. Gerar versões comprimidas (alvo: abaixo de 3 MB) e oferecer o texto em HTML na própria página.
- Os tamanhos exibidos em `EstudosClient.tsx` são strings escritas à mão (`tamanho: "957 KB"`). Podem divergir do arquivo real.

### A8. Aviso +18 e de segurança ausente

O `AGENTS.md` (regra 3) exige o aviso de segurança integrativa (+18) em material sobre sacramentos. **12 dos 29 arquivos não têm o aviso:** `curadoria-nativaram-ayahuasca.pdf`, `nativaram-rapes-sagrados-floresta-e-ciencia` (.md), `estudo-etnobotanico-feitio-purista-ayahuasca.md`, `o-feitio-da-ayahuasca-graduacoes-forca.md`, `fitoquimica-cipo-tucunaca-ayahuasca.pdf`, `estudo-cientifico-sananga-tabernaemontana.pdf`, `alquimia-biogeoquimica-cinzas-rape.pdf`, a resolução comentada, o parecer (.md) e os três PDFs só imagem.

### A9. Downloads gerados pelo próprio app

- `src/lib/export-medicamentos.ts:289-295` gera um arquivo `.xls` que na verdade é **HTML com extensão .xls**. O Excel abre com o aviso "o formato e a extensão do arquivo não coincidem", e o LibreOffice/Google Planilhas às vezes não abre. Já existe exportação CSV correta (linha 340). Solução mínima: remover o botão `.xls` e deixar o CSV com o PDF. Alternativa: gerar `.xlsx` de verdade.
- `PortalCentralDocumentos.tsx` oferece imprimir, baixar `.md` e "Copiar Texto (Word/Docs)". O índice do cofre fala em "tripla exportação (A4/**Word**/Markdown)", mas não há exportação Word, só cópia. Um arquivo `.md` não serve para dirigente leigo. Manter impressão em PDF + cópia e corrigir a descrição no cofre.
- Nenhum documento gerado traz versão ou data no rodapé. Ver plano 010, B4.

### A10. Proposta de biblioteca pública enxuta

Hoje `/estudos` oferece 27 arquivos, vários repetidos ou internos. Proposta: **no máximo 8 documentos públicos**, cada um com aviso +18, marca correta, versão e data:
1. Documento institucional (Cooperativa Nativaram)
2. Resolução CONAD 01/2010, texto oficial
3. Comentário da cooperativa sobre a CONAD 01/2010
4. Catálogo vigente (v4 revisado)
5. Feitio e graduações (uma versão só)
6. Rapés sagrados (uma versão só, sem alegações fisiológicas)
7. Manifesto (PDF comprimido + texto HTML)
8. Sobre nós (PDF comprimido + texto HTML)

Todo o resto sai do ar ou vai para a área autenticada.

---

## B. Saúde geral do projeto

### B1. Dependências com vulnerabilidade conhecida

`npm audit --omit=dev` no commit `434a6ba`:

| Pacote | Instalado | Severidade |
|---|---|---|
| `next` | 15.5.25 | **crítica** |
| `postcss` | ≤ 8.5.22 | alta |
| `sharp` | < 0.35.5 | alta |
| `source-map-js` | 1.0.0–1.2.1 | alta |
| `zod` | 3.25.76 | alta (correção só no zod 4, mudança incompatível) |

**Fazer:** ler cada aviso do GitHub Advisory antes de atualizar. Para o `next`, procurar a versão corrigida dentro da linha 15.x antes de considerar a 16. `npm audit fix` sem `--force` resolve postcss, sharp e source-map-js. A migração para zod 4 merece um plano à parte (os schemas em `src/lib/validators/` precisam de revisão).

### B2. Lint não roda

`npm run lint` chama `next lint`, que está obsoleto no Next 15, e o ESLint nem está nas `devDependencies`. O comando falha antes de analisar qualquer arquivo. O plano 003 "ESLint" está marcado DONE, mas o gate não funciona.

**Fazer:** instalar `eslint` e `eslint-config-next`, migrar para a CLI do ESLint (`npx @next/codemod@canary next-lint-to-eslint-cli .`) e confirmar que `npm run lint` termina com código 0.

### B3. Nenhuma verificação automática no GitHub

Não existe `.github/workflows/`. Testes, typecheck e lint só rodam quando alguém lembra de rodar. Como a Vercel publica a cada push na `main`, um commit quebrado vai direto para produção. **Fazer:** um workflow mínimo com `npm ci`, `npm test`, `npx tsc --noEmit` e `npm run lint` em cada push e pull request.

### B4. Repositório pesado

- O histórico do git ocupa **1,73 GB** compactado; `public/assets/` tem **2,0 GB** em 505 arquivos.
- Material bruto dentro de `public/` (tudo vai para o deploy): 11 vídeos do WhatsApp em `public/assets/feitio/`, fotos originais ao lado das versões em `feitio/curadas/`, arquivos "- Copia", variações geradas por IA com nomes como `Replace_background_of_dropper_bo….jpeg`, e um `.zip` de logos em `public/assets/logos/`.
- **Fazer:** mover os brutos para fora de `public/` (pasta fora do repositório ou armazenamento externo) e manter no site só o que alguma página usa. Para listar o que é usado, buscar cada nome de arquivo em `src/`. Reescrever o histórico para recuperar o espaço exige `git push --force` e é opcional; só com confirmação explícita do usuário.

### B5. Texto dos documentos duplicado dentro do código

`PortalCentralDocumentos.tsx` (1.561 linhas, o maior arquivo do projeto) carrega cada documento **duas vezes**: em JSX para a folha A4 e em strings Markdown para download e cópia (comentário na linha 70: "Textos completos para cópia"). Uma correção feita só em um dos dois deixa o PDF e o arquivo baixado diferentes. **Fazer:** mover o conteúdo dos documentos para `src/data/documentos/` em um formato único (Markdown ou objetos), renderizar a folha A4 a partir dele e baixar o mesmo texto. É o mesmo princípio de "fonte única" do plano 010, A1. Os outros componentes grandes (`FeitioLanding.tsx` com 1.443 linhas, `ManifestoLanding.tsx` com 1.118) são páginas de conteúdo; dividir só por tamanho não traz ganho.

### B6. Material-fonte espalhado em cinco lugares

O mesmo conteúdo aparece em `public/documentos/`, `docs/context/local-source-files/` (PDFs e .md, com duplicatas "(1)"), `data/*.txt` (`curadoria-nativaram-ayahuasca.txt`, `nativaram-catalogo-v4.txt`…), `knowledge-base/notebooklm/` e `Segundo-Cerebro/`. A raiz do projeto também acumula `HANDOFF.md`, `task.md`, `walkthrough.md`, `implementation_plan.md` e `PROJECT_RULES.md` ao lado de `AGENTS.md` e `CONTEXT.md`. **Fazer:** definir um lugar para originais (`docs/fontes/`), um para o que é publicado (`public/documentos/`, só a lista de A10), e arquivar ou apagar o resto. Os arquivos da raiz que forem notas de sessão antigas vão para o cofre ou são removidos.

### B7. Cofre do Obsidian desatualizado em relação ao código

Além do número de harmina (A4), o índice descreve recursos que não existem ("tripla exportação A4/Word/Markdown", A9). Depois de executar este plano e o 010, atualizar `Indice-de-Recuperacao-Rapida.md` e `Roadmap-e-Componentes-do-Site.md`, como manda o protocolo do `AGENTS.md`.

---

## Considerado e descartado

- **Reescrever `FeitioLanding.tsx` / `ManifestoLanding.tsx` em componentes menores:** são páginas de conteúdo estático, sem duplicação nem bug associado. Dividir só por tamanho não traz ganho.
- **Trocar o runner de testes caseiro (`scripts/test-liturgico.mjs`) por Vitest/Jest:** funciona, está verde e é simples. Só vale a troca se os testes de interface crescerem.
- **`data/pedidos.json` e demais seeds versionados:** os registros são fictícios (exemplo "Padrinho Marcos Silva"). O cuidado é nunca versionar dados reais; uma revisão no `.gitignore` basta se o fallback local começar a gravar dados de produção.

---

## Ordem sugerida e critério de pronto

| Passo | O quê | Pronto quando |
|---|---|---|
| 1 | Item 0 (RLS) | Consulta com chave anônima não retorna solicitações; homologação continua funcionando |
| 2 | A1 (internos fora do ar) | `GET /documentos/dossie-estrategico-compliance-nativaram.md` e os demais internos retornam 404 em produção; `/estudos` não os lista |
| 3 | A10 + A6 (biblioteca enxuta) | `public/documentos/` tem só os arquivos da lista; nomes em kebab-case; teste novo verifica que todo `pdfArquivo`/`arquivo` citado em `estudos.ts` e `EstudosClient.tsx` existe em `public/documentos/` |
| 4 | A2 + A3 + A4 + A5 + A8 (conteúdo) | Teste novo: nenhum arquivo de `public/documentos/` contém "Nativaram Brasil"; todos contêm o aviso +18; um único valor de harmina em todo o repositório. **Reescrita de texto clínico ou jurídico passa por revisor humano** |
| 5 | A7 (peso) | Nenhum PDF público acima de 3 MB; cada PDF só-imagem tem versão em texto |
| 6 | A9 (exports) | Botão `.xls` removido ou trocado por `.xlsx` real; descrição corrigida no cofre |
| 7 | B2 + B3 (lint e CI) | `npm run lint` com código 0; workflow do GitHub verde |
| 8 | B1 (dependências) | `npm audit --omit=dev` sem críticas; `npm test` e `tsc` verdes |
| 9 | B4 + B5 + B6 + B7 | `public/assets` abaixo de 300 MB; textos dos documentos com uma fonte só; cofre sincronizado |

**STOP:**
- Se ao revisar o RLS (item 0) houver sinal de acesso indevido aos dados (alterações que ninguém da equipe fez), parar e avisar o usuário antes de qualquer outra mudança.
- Não apagar arquivos de `public/` sem antes confirmar, com busca em `src/`, que nenhuma página os usa.
- Não reescrever histórico do git nem rodar `git push --force` sem pedido explícito do usuário.
