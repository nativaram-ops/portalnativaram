# Plano 010 — Auditoria da Matriz de Interações Medicamentosas e da Central de Documentos

- **Gerado em:** 2026-11-02, commit `434a6ba`, por auditoria só leitura (`/improve`)
- **Prioridade:** P0 (item 0) / P1 (blocos A e B) / P2 (bloco C)
- **Esforço:** M–L
- **Risco:** MED. Mexe em conteúdo de segurança que orienta decisão de participação. Toda mudança de conteúdo clínico precisa de revisão por médico ou farmacêutico antes de ir ao ar.
- **Escopo lido:** `src/data/portal-assessoria.ts`, `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx`, `src/lib/export-medicamentos.ts`, `src/components/portal-dirigente/PortalCentralDocumentos.tsx`, `knowledge-base/notebooklm/*.md`, `src/app/api/auth/verificar-chave/route.ts`, cofre `Segundo-Cerebro/` (Índice, 03-Compliance)
- **Linha de base:** `cmd.exe /c npm test` → 35 passaram, 0 falharam

---

## 0. P0 — Senha de administrador exposta (fazer antes de tudo)

`src/app/api/auth/verificar-chave/route.ts:60`

```ts
const adminPassword = process.env.ADMIN_MASTER_PASSWORD || "adm2026";
```

A mesma senha está escrita em texto puro em `Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md` (seção "Credenciais Oficiais"), que está versionado no git. Se a variável não estiver definida na Vercel, qualquer pessoa que leia o repositório entra como ADMIN, com acesso a pedidos, homologações e dados de templos. O teste "Acesso administrativo falha fechado em produção" cobre `ADMIN_SECRET_KEY`, não esta senha.

**Fazer:**
1. Remover o fallback: sem `ADMIN_MASTER_PASSWORD` em produção → 503, como já é feito com `ADMIN_SECRET_KEY`.
2. Comparar com `crypto.timingSafeEqual` (hoje usa `===`).
3. Apagar a senha do cofre (deixar "definida em variável de ambiente"), trocar a senha em produção e considerar a antiga comprometida, porque ela continua no histórico do git.
4. Adicionar teste: em `NODE_ENV=production` sem a variável, `adm2026` é rejeitada.

---

## A. Matriz de interações (`INTERACOES_MEDICAMENTOSAS`)

### A1. Três fontes que se contradizem

A mesma informação vive em três lugares que não concordam entre si: a matriz do portal (`portal-assessoria.ts`), o compêndio (`knowledge-base/.../etnofarmacologia-...md`) e a ficha de anamnese (`modelo-ficha-anamnese-ayahuasca.md` e o Doc 01 em `PortalCentralDocumentos.tsx`). Um dirigente que consultar dois deles recebe orientações diferentes.

| Item | Matriz do portal | Compêndio | Ficha de anamnese |
|---|---|---|---|
| Benzodiazepínicos (Rivotril, Frontal, Valium) | NÃO TOMAR NO DIA (24 h) | **21 a 28 dias** de washout | só lista, sem janela |
| ISRS exceto fluoxetina | 14 a 21 dias | **21 a 28 dias** | 21 a 28 dias |
| ISRSN (venlafaxina, duloxetina) | 14 a 21 dias | **21 a 28 dias** | 21 a 28 dias |
| Antipsicóticos | exclusão definitiva | "21 a 28 dias" **e** "contraindicação absoluta" | — |
| Anticonvulsivantes | veto (vermelho) | 14 a 21 dias | — |
| Gabapentinoides (Lyrica) | não tomar no dia | 7 a 10 dias | — |
| Bipolar | — | contraindicação: **Tipo I** | contraindicação: **Tipo I ou II** |
| Pressão arterial | — | não toma se ≥ 160/100 | marca "hipertensão" se ≥ 140/90 |

**Fazer:** escolher uma fonte de verdade (a matriz em TypeScript) e gerar dela o compêndio, o quadro de 4 cores, o PDF/Excel exportado e a lista da ficha. Para pressão arterial, publicar uma tabela única com os três limiares e o papel de cada um: triagem (140/90 → pedir avaliação), impedimento no dia (160/100) e emergência (180/110 → SAMU). Os números finais ficam com o revisor clínico; este plano só exige que sejam um conjunto só.

### A2. Correções de conteúdo verificadas

| Onde | Problema | Correção |
|---|---|---|
| `estabilizador-carbonato-litio` e `TOXICIDADE_LITIO` | "~47% de incidência… estudos epidemiológicos… UTI e intubação". O dado vem de Nayak et al. 2021: **62 relatos autodeclarados** no Erowid e no Reddit, quase todos com LSD/psilocibina; 47% citavam convulsão, 39% atendimento médico. Não é estudo epidemiológico e não é sobre ayahuasca. | Manter o veto e reescrever: "Em 62 relatos online de uso de psicodélicos clássicos com lítio, 47% descreveram convulsão (Nayak et al., 2021). Evidência fraca, mas o sinal é grave e consistente." O mecanismo do inositol é hipótese e deve aparecer como hipótese. |
| `anticonvulsivante-fenobarbital-lamotrigina` | Lamotrigina, topiramato e levetiracetam marcados como `LETAL_ABSOLUTO`. O mesmo estudo de Nayak não encontrou convulsões em **34 relatos com lamotrigina**. O veto existe por causa da **condição de base** (epilepsia/bipolar), não por interação letal. | Separar "motivo do veto" (ver A4). Lamotrigina: interação não demonstrada; decisão depende do motivo do uso. |
| `imao-tranilcipromina-moclobemida` | Marcas "Nardil" (fenelzina) e "Marplan" (isocarboxazida) aparecem como se fossem desses princípios ativos, e nenhum dos dois é comercializado no Brasil. | Remover, ou criar entrada própria indicando "não comercializado no Brasil". |
| `antibioticos-linezolida-inibidores-cyp` | Marca "Girotto" para furazolidona não foi localizada. Ciprofloxacino, claritromicina e fluconazol aparecem com o **mesmo veto** de linezolida e azul de metileno, que são IMAOs de verdade. | Conferir a marca na base da ANVISA. Dividir em duas entradas: IMAOs ocultos (vermelho) e inibidores de CYP (laranja/azul, decisão médica). Incluir **Sepurin** (metenamina + azul de metileno), antisséptico urinário de venda comum cuja bula descreve inibição da MAO com risco serotoninérgico. |
| `antigripais-...` | Clorfeniramina e prometazina tratadas como "potentes inibidores de SERT", com rótulo `LETAL_ABSOLUTO`. A clorfeniramina tem ação fraca no SERT. O risco real nesse grupo está no **DXM** e nos **simpatomiméticos**. | Dividir: DXM + pseudoefedrina/fenilefrina (azul) e anti-histamínicos (laranja, por sedação). |
| `glp1-ozempic-mounjaro-saxenda` | "Não aplicar nas 48 h anteriores" não tem efeito para semaglutida (meia-vida de 7 dias) nem para tirzepatida (5 dias). | Seguir a lógica do guia multissociedades de 2024 (ASA/AGA/ASMBS): agentes diários suspensos no dia; para agentes semanais em fase de escalonamento ou com sintomas gástricos, quem decide suspender a dose da semana é o prescritor; dieta líquida nas 24 h anteriores. |
| `enxaqueca-triptanos-ergotaminicos` | Todos os triptanos descritos como degradados pela MAO-A. Isso vale para sumatriptano, rizatriptano e zolmitriptano, mas não para naratriptano e eletriptano. | Manter a orientação conservadora e corrigir o mecanismo por fármaco. |
| `FAQ_DIRIGENTE` faq-8 | "Ambos os pais presentes" é apresentado como exigência do item 4.1 da CONAD 01/2010. A resolução deixa a decisão aos pais, no exercício do poder familiar; exigir a presença dos dois é **política interna**. | Separar o que diz a norma do que é regra da casa. |
| `FAQ_DIRIGENTE` faq-10 | "Perfeitamente legal" para transporte aéreo. | Trocar por "amparado pela CONAD 01/2010 para fins religiosos em território nacional; verificar as regras da companhia aérea para líquidos; transporte internacional não está coberto". |

### A3. O que falta na lista

São fármacos comuns no Brasil que não aparecem hoje. Todos precisam de conferência de bula e revisão clínica antes de entrar.

| Nova entrada | Marcas BR (conferir) | Por quê |
|---|---|---|
| **Ciclobenzaprina** | Miosan, Mirtax, Benziflex (o Torsilax contém **carisoprodol**, não ciclobenzaprina — corrigido) | Estrutura tricíclica. A bula americana contraindica o uso com IMAO (janela de 14 dias) por risco de síndrome serotoninérgica. É um dos relaxantes musculares mais vendidos no Brasil, e quem usa costuma não lembrar dele como "remédio controlado". |
| **Isometepteno** | **Neosaldina** e genéricos dipirona + isometepteno + cafeína | Simpatomimético, contraindicado com IMAO. É um dos analgésicos mais vendidos no país. |
| **Atomoxetina** | Atentah | Inibidor de recaptação de noradrenalina, contraindicado com IMAO em bula. |
| **Cetamina / Escetamina** | Spravato | Uso crescente em depressão resistente; eleva a pressão arterial. |
| **Domperidona** | Motilium, Peridal | Prolonga o intervalo QT e é dada para náusea. Entra num eixo novo "QT" junto com ondansetrona em dose alta, azitromicina, hidroxicloroquina e metadona. |
| **Pré-treinos e termogênicos** | sinefrina, cafeína anidra em dose alta, DMAA, ioimbina | Sobrecarga adrenérgica. Hoje só aparece "Yohimbine". |
| **Cardiovasculares** | clonidina, betabloqueadores, nitratos, amiodarona | Hoje só há propranolol. Serve para triagem da **condição** (cardiopatia) e para risco de hipotensão/bradicardia. |
| **Substâncias de contexto cerimonial** | 5-MeO-DMT / Bufo, **kambô**, **ibogaína**, arruda-síria (*Peganum harmala*), jurema, San Pedro/mescalina | A ficha pergunta sobre algumas, mas a matriz não tem nenhuma. Há um óbito publicado com 5-MeO-DMT + preparado com harmala (J Anal Toxicol, 2005, com causalidade contestada). Ibogaína tem risco de QT. Arruda-síria dobra a carga de β-carbolinas. |
| **Recreativas** | MDMA, cocaína, anfetaminas, álcool, cannabis | Estão no compêndio e não estão na matriz pesquisável. |

### A4. Modelo de dados

Hoje um registro agrupa 3 a 7 princípios ativos com um só mecanismo, uma só janela e um só rótulo. Por isso lamotrigina herda "letal" do fenobarbital e ciprofloxacino herda o veto da linezolida. `nivelRisco` e `diretrizPdf` também misturam dois eixos: gravidade da interação e motivo da exclusão.

Proposta, com **um registro por princípio ativo** e a classe como agrupamento de exibição:

```ts
interface FarmacoInteracao {
  id: string;
  principioAtivo: string;
  marcasBR: string[];
  termosBusca: string[];              // grafias sem acento, nomes populares
  classeId: string;
  cor: "VERMELHO" | "LARANJA_ESCURO" | "AZUL" | "LARANJA";
  motivo: "INTERACAO" | "CONDICAO_DE_BASE" | "AMBOS";
  eixos: ("SEROTONINERGICO" | "ADRENERGICO" | "LIMIAR_CONVULSIVO" | "QT" | "DEPRESSAO_SNC" | "CYP" | "GASTRICO")[];
  janela: { tipo: "VETO" } | { tipo: "NAO_NO_DIA" } | { tipo: "DIAS"; min: number; max: number; base: string };
  evidencia: "A" | "B" | "C" | "D";   // A ensaio clínico · B série/relato de caso · C farmacologia/bula · D extrapolação
  fontes: { titulo: string; url: string; ano: number }[];
  revisao: { data: string; responsavel: string; registro?: string };  // ex. CRM/CRF
}
```

Com isso cada cartão mostra "por que" e "quão bem sabemos", e o compêndio, a ficha e o PDF passam a ser gerados do mesmo dado. Nenhuma fonte citada hoje tem URL, e o cabeçalho cita "222 fontes do NotebookLM" sem listar nenhuma. A revisão sistemática mais recente sobre o tema (Halman et al., *J Psychopharmacol* 2024) achou **um único estudo** com ayahuasca. Expor o nível de evidência é mais honesto e mais defensável do que escrever "fulminante" em toda entrada.

### A5. Busca e interface (`PortalInteracoesMedicamentosas.tsx`)

1. **Busca sem acento não funciona.** Usa só `toLowerCase()`, então "litio" não encontra "Lítio" e "valproico" não encontra "Valpróico". Corrigir com `s.normalize("NFD").replace(/\p{Diacritic}/gu, "")` nos dois lados.
2. **Busca no texto do mecanismo gera falsos positivos.** Digitar um fármaco ausente retorna entradas que só o citam de passagem. Priorizar princípio ativo e marca; a busca em texto livre vira opção.
3. **Estado vazio perigoso.** "Nenhum medicamento encontrado" precisa dizer de forma explícita: **não estar na lista não significa ser seguro**; consultar médico ou farmacêutico com a bula.
4. O selo "20 Classes" está fixo no código (linha ~174). Calcular a partir dos dados.

### A6. Testes a adicionar (`scripts/test-liturgico.mjs`)

- Todo registro tem pelo menos uma `fonte` com URL, `evidencia` e `revisao.data`.
- Nenhuma marca aparece em dois registros com janelas diferentes.
- A ficha e o compêndio gerados citam a mesma janela que a matriz para fluoxetina, sertralina, lítio e clonazepam (teste de coerência entre fontes).
- Busca: "litio", "valproico" e "neosaldina" retornam o registro certo.

---

## B. Central de Documentos e modelos (`PortalCentralDocumentos.tsx`, `knowledge-base/notebooklm/`)

### B1. Problemas jurídicos que podem se voltar contra o templo

Para revisão por advogado. O que está abaixo é ponto de atenção, não parecer.

1. **Fundamento errado para guardar dados por 20 anos.** A ficha cita Lei 13.787/2018, Resolução CFM 1.821/2007 e **RDC ANVISA 9/2015** para guardar os dados e **negar a eliminação pedida pelo titular** (art. 16, I da LGPD). A RDC 9/2015 trata de **ensaios clínicos com medicamentos** e foi revogada pela RDC 945/2024. Lei 13.787 e CFM 1.821 tratam de prontuário de serviço de saúde, e um templo não é serviço de saúde. Usar esses fundamentos para recusar a exclusão tende a ser ilegal. **Fazer:** prazo de retenção finito e justificado (ex.: duração do vínculo + prazo prescricional para defesa, art. 7º VI / art. 11 II "d"), base legal correta (consentimento específico e destacado, art. 11 I, e proteção da vida, art. 11 II "e"), e um encarregado nomeado.
2. **"Isenta… de responsabilidade civil ou penal… óbito"** (ficha, módulo VI; `PortalCentralDocumentos.tsx:204, 250, 1017, 1150`; termo dos menores, cláusula 7ª). Responsabilidade penal não se renuncia por contrato, e cláusula que exonera de dano à vida tende a ser considerada nula. Pior: o próprio documento mostra que a casa sabia do risco letal. **Fazer:** trocar por "declaração de veracidade e ciência", descrever o dever de cuidado que a casa assume (triagem, sinais vitais, plano de emergência) e tirar a palavra "isenta".
3. **Mistura de marca.** Os modelos em `knowledge-base/` abrem com "COOPERATIVA ETNOBOTÂNICA NATIVARAM **BRASIL**", o que viola a regra do `AGENTS.md`.

### B2. Robustez da ficha de anamnese (Doc 01)

| Hoje | Proposta |
|---|---|
| Um campo único "nome do fármaco / dose / última dose" | Tabela com várias linhas: **medicamento · dose · para quê · quem prescreveu · data da última tomada · suspensão supervisionada? (s/n)**. O "para quê" decide o caso do clonazepam (ansiedade vs. epilepsia), que a matriz já menciona e a ficha não pergunta. |
| Lista fechada de classes | Lista curta + pergunta aberta obrigatória: "Liste **tudo** o que tomou nos últimos 60 dias, inclusive antigripal, relaxante muscular, remédio para dor de cabeça, para emagrecer, suplementos e pré-treino." Pessoas não reconhecem Torsilax, Neosaldina ou Vick 44E como "medicação". |
| Uma pergunta "inspirada no C-SSRS" | Usar a **versão de triagem do C-SSRS** (6 perguntas, pública e validada em português), com regra de encaminhamento. |
| Não pergunta sobre kambô, Bufo/5-MeO, ibogaína e arruda-síria com data | Incluir, com janela mínima. |
| Ficha sem prazo de validade | Validade definida (ex.: 6 meses) + **reconfirmação no dia** (ver B3, Doc 07). |
| Mistura bipolar I e II | Alinhar com a decisão tomada em A1. |

### B3. Documentos novos

1. **Doc 06 — Parecer médico de aptidão e washout.** O compêndio exige "parecer médico por escrito assinado pelo psiquiatra assistente", mas **não existe modelo** para isso. Campos: medicamento, data do início e do fim da suspensão supervisionada, data a partir da qual a pessoa está liberada, ciência do médico de que a ayahuasca contém IMAO-A reversível e DMT, CRM e assinatura. É o documento que mais protege a pessoa e o templo.
2. **Doc 07 — Reconfirmação no dia (D-0).** Meia página: "algo mudou desde a ficha?", "tomou algum remédio, antigripal, suplemento ou substância nas últimas 72 h?", pressão arterial, frequência cardíaca, glicemia se em jejum, e a decisão APTO/INAPTO com a assinatura de quem triou.
3. **Doc 08 — Plano de emergência do local + registro de intercorrência.** Hospital mais próximo com endereço e tempo de deslocamento, quem liga para o SAMU, quem acompanha, kit disponível. O registro de intercorrência documenta o que aconteceu, a hora e a conduta, e alimenta a melhoria da triagem.
4. **Cartão "Informação para a equipe de saúde".** Para entregar ao SAMU ou ao pronto-socorro: "Esta pessoa ingeriu ayahuasca (IMAO-A reversível + DMT) às __h. **Evitar** fármacos serotoninérgicos como meperidina, tramadol, fentanil e azul de metileno até avaliação." Hoje a orientação existe só como linha do POP.
5. **Doc 09 — Guia do participante, em linguagem simples.** O que não tomar nas semanas anteriores (com nomes comerciais populares), **nunca suspender remédio por conta própria**, alimentação e o que esperar. A ficha atual é escrita para dirigente e cita IC₅₀, LogP e receptores, o que não ajuda quem vai preenchê-la.
6. **Política de privacidade do templo (LGPD)**: quem acessa as fichas, onde ficam, por quanto tempo e como são descartadas.

### B4. Higiene dos arquivos-fonte

- `knowledge-base/notebooklm/*.md` ainda carregam a moldura da conversa do NotebookLM ("Aqui está a transcrição na íntegra…", "💡 Status do Seu Acervo"), o documento inteiro dentro de um bloco de código e LaTeX quebrado (`\\(5\text{-HT}_{2\text{A}}\\)` dentro de diagramas ASCII). Limpar antes de reaproveitar.
- A primeira lista do compêndio perdeu os nomes das plantas: "1. **cujas folhas contêm…**" começa sem *Psychotria viridis*.
- Na interface, os documentos aparecem na ordem 01, 02, **05**, 03, 04. Renumerar.
- Cada documento deve levar **versão + data + "revisado por (CRM/OAB)"** no rodapé, para o templo saber qual versão imprimiu.

---

## C. Outros achados (P2)

1. **Vocabulário de compliance vs. precisão clínica.** O dicionário do `AGENTS.md` proíbe "dose", "medicamento" e "tratamento". Em material de **segurança** de área restrita isso é perigoso: "gotas de intenção" no lugar de "dose" pode causar dano. O próprio código já ignora a regra nessa área (`FAQ` categoria `DOSAGENS`, "Lista de Medicamentos"). **Fazer:** registrar um ADR que isente o conteúdo de segurança do Portal do Dirigente e mantenha o dicionário no conteúdo público.
2. **`public/assets` tem 2,0 GB** (505 arquivos, incluindo vídeos brutos do WhatsApp e variantes "- Copia"). Tudo em `public/` vai para o deploy. Mover brutos para fora de `public/`, deixar só as versões em `feitio/curadas/`.
3. `docs/context/local-source-files/` tem PDFs duplicados ("… (1).pdf") e várias versões do catálogo (v2, v3, v4). Manter só a vigente e mover o resto para um arquivo morto.

---

## Ordem sugerida e critério de pronto

| Passo | O quê | Pronto quando |
|---|---|---|
| 1 | Item 0 (senha) | Teste novo verde; senha trocada em produção; senha removida do cofre |
| 2 | A4 + A1 (modelo de dados e fonte única) | Compêndio, ficha e export gerados da matriz; teste de coerência verde |
| 3 | A2 + A3 (correções e lacunas) | Cada entrada com fonte, evidência e **revisão assinada por profissional**. Sem revisor, as entradas ficam marcadas `revisao: pendente` e o portal mostra isso |
| 4 | A5 (busca) | "litio", "valproico", "neosaldina" encontrados; estado vazio com aviso |
| 5 | B1 (texto jurídico) | Revisado por advogado |
| 6 | B2 + B3 (ficha e documentos novos) | Docs 06 a 09 e o cartão disponíveis na Central, com versão no rodapé |
| 7 | C | ADR de vocabulário registrado; deploy sem brutos |

**STOP:** não publicar janelas de washout novas nem reclassificar cores sem revisão de médico ou farmacêutico. O plano define a estrutura e aponta as divergências; os números clínicos finais não são decisão de agente.

## Fontes consultadas

- Nayak SM et al. *Classic Psychedelic Coadministration with Lithium, but Not Lamotrigine, is Associated with Seizures.* Pharmacopsychiatry, 2021 — https://pubmed.ncbi.nlm.nih.gov/34348413/
- Halman A et al. *Drug–drug interactions involving classic psychedelics: A systematic review.* J Psychopharmacol, 2024 — https://pmc.ncbi.nlm.nih.gov/articles/PMC10851641/
- Sklerov J et al. *A fatal intoxication following the ingestion of 5-MeO-DMT in an ayahuasca preparation.* J Anal Toxicol, 2005 — https://pubmed.ncbi.nlm.nih.gov/16356341/
- Bula de ciclobenzaprina (DailyMed) — https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ca74d27a-f7c6-462d-a913-1cfa061bd8f3
- Guia multissociedades sobre GLP-1 no perioperatório (ASA, 2024) — https://asahq.org/about-asa/newsroom/news-releases/2024/10/new-multi-society-glp-1-guidance
- RDC ANVISA 9/2015 (ensaios clínicos) — https://www.legisweb.com.br/legislacao/?id=422430
- Resolução CONAD nº 1/2010 — https://www.normasbrasil.com.br/norma/?id=113527
- Bula do Sepurin (interações do azul de metileno) — https://bula.com.br/sepurin/contraindicacao
