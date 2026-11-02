import { INTERACOES_MEDICAMENTOSAS } from "../portal-assessoria";
import {
  DATA_VERSAO,
  DEVER_DE_CUIDADO_DA_CASA,
  REMISSAO_MATRIZ,
  REVISAO_CLINICA,
  REVISAO_JURIDICA,
  VERSAO_REVISADA,
  blocosLgpd,
  declaracaoVeracidade,
} from "./comuns";
import type { Bloco, CorDestaque, DocumentoModelo } from "./tipos";

const SN = "[ ] SIM [ ] NÃO";

/** Grupos da matriz, na ordem de gravidade. Títulos sem números próprios: as janelas vêm da matriz. */
const GRUPOS_MATRIZ: { diretriz: string; titulo: string; cor: CorDestaque }[] = [
  { diretriz: "NAO_PODE_PARTICIPAR", titulo: "🔴 VERMELHO — NÃO PODE PARTICIPAR", cor: "vermelho" },
  {
    diretriz: "CASO_CLINICO_NAO_RECOMENDADO",
    titulo: "🟠 LARANJA — CASO CLÍNICO NÃO RECOMENDADO",
    cor: "laranja",
  },
  {
    diretriz: "INTERROMPER_DIAS_ANTES",
    titulo: "🔵 AZUL — SUSPENSÃO PRÉVIA SOMENTE COM O MÉDICO ASSISTENTE (DOCUMENTO 06)",
    cor: "azul",
  },
  { diretriz: "NAO_TOMAR_NO_DIA", titulo: "🟡 AMARELO — NÃO TOMAR NO DIA DA CERIMÔNIA", cor: "amarelo" },
];

/**
 * Lista da ficha gerada da matriz oficial (`INTERACOES_MEDICAMENTOSAS`), para que
 * ficha e matriz nunca divirjam (plano 010, A1).
 */
export function gruposDaMatriz(): Bloco[] {
  const conhecidas = new Set(GRUPOS_MATRIZ.map((g) => g.diretriz));
  const grupos = [
    ...GRUPOS_MATRIZ,
    { diretriz: "__OUTROS__", titulo: "⚪ OUTROS — CONSULTAR A MATRIZ E O MÉDICO ASSISTENTE", cor: "neutro" as const },
  ];
  const blocos: Bloco[] = [];
  for (const g of grupos) {
    const itens = INTERACOES_MEDICAMENTOSAS.filter((i) =>
      g.diretriz === "__OUTROS__"
        ? !i.diretrizPdf || !conhecidas.has(i.diretrizPdf)
        : i.diretrizPdf === g.diretriz
    ).map((i) => {
      const marcas = i.nomesComerciais.length > 0 ? ` (${i.nomesComerciais.join(", ")})` : "";
      return `**${i.principioAtivo}**${marcas} — ${i.classeFarmacologica}. Janela na matriz: ${i.washoutMinimo}`;
    });
    if (itens.length === 0) continue;
    blocos.push({
      tipo: "grupo",
      titulo: g.titulo,
      cor: g.cor,
      blocos: [
        { tipo: "paragrafo", texto: `Faz uso ou usou nos últimos 60 dias? ${SN}` },
        { tipo: "lista", itens },
      ],
    });
  }
  return blocos;
}

export const docAnamnese: DocumentoModelo = {
  id: "ANAMNESE",
  numero: "01",
  rotuloCurto: "Ficha de Anamnese",
  resumo: "Triagem clínica, saúde mental, medicamentos e C-SSRS",
  icone: "anamnese",
  titulo: "FICHA DE ANAMNESE, TRIAGEM CLÍNICA E PROTOCOLO DE MEDICAMENTOS CONTROLADOS",
  subtitulo:
    "Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • LGPD (Lei nº 13.709/2018, arts. 11 e 18)",
  versao: VERSAO_REVISADA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [
    `${REVISAO_CLINICA}: limiares de pressão, bipolar I/II, regra de encaminhamento do C-SSRS, janelas de substâncias e validade da ficha`,
    `${REVISAO_JURIDICA}: declaração de veracidade e proteção de dados`,
  ],
  arquivo: "nativaram-doc01-ficha-anamnese",
  montar: () => [
    {
      blocos: [
        {
          tipo: "nota",
          texto:
            "**Deontologia e salvaguarda da vida:** documento individual e confidencial, preenchido antes da primeira participação e renovado ao fim do prazo de validade. A ayahuasca contém β-carbolinas (harmina, harmalina e THH), inibidores reversíveis da MAO-A que também interferem nas enzimas hepáticas CYP2D6, CYP3A4 e CYP1A2, combinadas ao N,N-DMT. Preencha cada item com fidelidade. **Nunca interrompa um medicamento prescrito sem orientação do seu médico.**",
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Ficha preenchida em (data)",
            "Válida até (data; prazo definido pela casa: ____ meses)",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "No dia de cada cerimônia, esta ficha é reconfirmada com o **Documento 07 — Reconfirmação no dia (D-0)**. Ficha vencida não vale: preencher nova ficha.",
        },
      ],
    },
    {
      titulo: "Módulo I: Dados cadastrais e contato de emergência",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Nome completo",
            "Nome social / espiritual",
            "Data de nascimento | Idade | Peso aprox. (kg)",
            "Gênero | Profissão",
            "RG/RNE | Órgão/UF",
            "CPF | Tipo sanguíneo (se souber)",
            "Endereço residencial",
            "Cidade/UF | CEP",
            "Telefone/WhatsApp | E-mail",
            "Plano de saúde (qual / nº da carteirinha)",
            "Alergias a medicamentos",
            "Contato de emergência 24 h (nome | parentesco | telefone)",
          ],
        },
      ],
    },
    {
      titulo: "Módulo II: Histórico de participação",
      blocos: [
        {
          tipo: "lista",
          ordenada: true,
          itens: [
            "Esta será sua primeira experiência com a ayahuasca? [ ] SIM [ ] NÃO, já participei ____ vezes. Última vez: ____/____/______",
            "Tradições que já frequentou: [ ] Santo Daime [ ] União do Vegetal [ ] Linha indígena/xamânica [ ] Barquinha [ ] Universalista [ ] Outra: ________",
            "Já teve crise aguda, pânico, desorientação, desmaio ou experiência muito difícil? [ ] NÃO [ ] SIM — descreva e diga como foi acolhido(a): ____________________",
            "Intenção para participar desta cerimônia: ________________________________________",
          ],
        },
      ],
    },
    {
      titulo: "Módulo III: Triagem clínica, cardiovascular, neurológica, hepática e renal",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Condição / histórico clínico", "Sim", "Não", "Detalhes / controle"],
          destaque: [0, 1],
          linhas: [
            [
              "Aneurisma (cerebral ou aórtico), pessoal ou familiar, ou AVC hemorrágico [VETO]",
              "[ ]",
              "[ ]",
              "Risco de ruptura vascular com a elevação transitória da pressão.",
            ],
            [
              "Epilepsia, convulsões ou disritmia cerebral [VETO]",
              "[ ]",
              "[ ]",
              "Redução do limiar convulsivo.",
            ],
            [
              "Hipertensão arterial diagnosticada, arritmia, taquicardia, QT longo ou infarto prévio",
              "[ ]",
              "[ ]",
              "Última PA aferida e medicamento contínuo:",
            ],
            [
              "Hipotensão, desmaios frequentes, marca-passo ou cardiopatia valvular",
              "[ ]",
              "[ ]",
              "Frequência dos episódios:",
            ],
            [
              "Diabetes (insulina, glibenclamida, metformina ou canetas GLP-1)",
              "[ ]",
              "[ ]",
              "Risco de hipoglicemia em jejum e de esvaziamento gástrico lento:",
            ],
            [
              "Insuficiência hepática ou renal, úlcera gástrica ou varizes esofágicas",
              "[ ]",
              "[ ]",
              "Altera a metabolização (CYP450) e a segurança na purga:",
            ],
            [
              "Asma grave, hipertireoidismo, glaucoma ou cirurgia nos últimos 6 meses",
              "[ ]",
              "[ ]",
              "Especificar:",
            ],
            [
              "Gestação (ou suspeita) ou amamentação",
              "[ ]",
              "[ ]",
              "Semanas de gestação / idade do bebê:",
            ],
          ],
        },
        {
          tipo: "nota",
          cor: "amarelo",
          texto:
            "**Limiares de pressão arterial (tabela única da casa):** triagem — pedir avaliação médica a partir de ____/____ mmHg · impedimento no dia a partir de ____/____ mmHg · emergência (SAMU 192) a partir de ____/____ mmHg. **Revisão clínica pendente:** os números finais são definidos pelo revisor clínico.",
        },
      ],
    },
    {
      titulo: "Módulo IV: Saúde mental",
      blocos: [
        {
          tipo: "lista",
          itens: [
            `Esquizofrenia, transtorno esquizoafetivo ou outro quadro psicótico: ${SN} **(não pode participar)**`,
            `Transtorno afetivo bipolar: ${SN} — tipo: [ ] I [ ] II [ ] não sabe. Conduta definida pelo revisor clínico para cada tipo: ____________________ **(Revisão clínica pendente)**`,
            `Transtorno de personalidade borderline, dissociativo, pânico grave, TOC ou TEPT: ${SN}`,
            `Parentes de 1º grau (pais, irmãos, filhos) com esquizofrenia, bipolaridade ou surto psicótico: ${SN}`,
            `Já teve internação psiquiátrica? ${SN} — ano e motivo: ____________________`,
            `Faz acompanhamento psicológico ou psiquiátrico atualmente? ${SN} — profissional e telefone: ____________________`,
          ],
        },
        {
          tipo: "grupo",
          titulo: "Triagem de risco de suicídio — C-SSRS (versão de triagem)",
          cor: "neutro",
          blocos: [
            {
              tipo: "paragrafo",
              texto:
                "Aplicar a versão de triagem oficial do C-SSRS em português (Columbia Lighthouse Project), por pessoa treinada, lendo as perguntas exatamente como estão no formulário oficial. Não reproduzir as perguntas de memória nem adaptá-las.",
            },
            {
              tipo: "campos",
              colunas: 2,
              campos: [
                "Data da aplicação",
                "Aplicado por (nome e função)",
                "Itens com resposta SIM (numeração do formulário oficial)",
                "Classificação segundo a regra do formulário: [ ] sem risco identificado [ ] baixo [ ] moderado [ ] alto",
              ],
            },
            {
              tipo: "checklist",
              itens: [
                "Sem risco identificado — segue a triagem.",
                "Risco presente — participação suspensa e encaminhamento a profissional de saúde mental (nome e contato): ____________________",
                "Risco alto ou imediato — não deixar a pessoa sozinha; acionar o SAMU 192 e o contato de emergência; informar o CVV 188.",
              ],
            },
            {
              tipo: "paragrafo",
              texto: "**Revisão clínica pendente:** regra de encaminhamento para cada classificação.",
            },
          ],
        },
      ],
    },
    {
      titulo: "Módulo V: Medicamentos, suplementos e tudo o que tomou nos últimos 60 dias",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "**Pergunta obrigatória: liste TUDO o que tomou nos últimos 60 dias**, inclusive o que não parece remédio: antigripal, relaxante muscular, remédio para dor de cabeça (ex.: Neosaldina, Torsilax), xarope para tosse (ex.: Vick 44E), remédio para emagrecer, suplementos, chás e fitoterápicos, pré-treino e termogênicos. Se não tomou nada, escreva \"nada\" e rubrique.",
        },
        {
          tipo: "tabela",
          colunas: [
            "Medicamento (nome comercial ou princípio ativo)",
            "Dose",
            "Para quê",
            "Quem prescreveu",
            "Data da última tomada",
            "Suspensão supervisionada? (S/N)",
          ],
          linhas: [],
          linhasEmBranco: 6,
        },
        {
          tipo: "nota",
          texto:
            "O campo **Para quê** muda a decisão: o mesmo medicamento pode ter motivos diferentes (ex.: clonazepam para ansiedade ou para epilepsia). Toda suspensão precisa do **parecer médico por escrito (Documento 06)**.",
        },
        {
          tipo: "paragrafo",
          texto: `**Lista de referência.** Os grupos abaixo são reproduzidos automaticamente da ${REMISSAO_MATRIZ}. As janelas de suspensão (washout) valem como estão na matriz; em caso de divergência com qualquer outro material, vale a matriz. Não estar na lista não significa ser seguro: consulte o médico ou o farmacêutico com a bula.`,
        },
        ...gruposDaMatriz(),
        {
          tipo: "nota",
          texto:
            "**Nota clínica — desintoxicação e dependência química:** nesses protocolos costuma haver associação de ansiolíticos, antipsicóticos e anticonvulsivantes. A comissão analisa cada caso individualmente, com aval médico formal e acompanhamento transdisciplinar.",
        },
      ],
    },
    {
      titulo: "Módulo VI: Outras substâncias e práticas",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Substância / prática", "Já usou? (S/N)", "Data do último uso", "Reações / observações"],
          linhas: [
            ["Kambô", "", "____/____/______", ""],
            ["5-MeO-DMT / Bufo", "", "____/____/______", ""],
            ["Ibogaína / iboga", "", "____/____/______", ""],
            ["Arruda-síria (Peganum harmala)", "", "____/____/______", ""],
            ["Jurema, San Pedro / mescalina", "", "____/____/______", ""],
            ["Rapé, sananga", "", "____/____/______", ""],
            ["Álcool", "", "____/____/______", ""],
            ["Cannabis", "", "____/____/______", ""],
            ["Cocaína, crack, MDMA/ecstasy, anfetaminas", "", "____/____/______", ""],
          ],
        },
        {
          tipo: "nota",
          cor: "amarelo",
          texto:
            "**Intervalo mínimo antes da cerimônia (definido pela casa com o revisor clínico):** Kambô ____ dias · 5-MeO-DMT/Bufo ____ dias · Ibogaína ____ dias · Arruda-síria ____ dias · álcool ____ · estimulantes ____. **Revisão clínica pendente.**",
        },
        {
          tipo: "paragrafo",
          texto:
            "Seguiu a orientação de alimentação da casa (evitar queijos maturados, embutidos curados, fermentados e energéticos)? [ ] SIM [ ] NÃO",
        },
      ],
    },
    {
      titulo: "Módulo VII: Declaração de veracidade e ciência",
      blocos: [
        { tipo: "paragrafo", texto: declaracaoVeracidade("participante") },
        { tipo: "paragrafo", texto: DEVER_DE_CUIDADO_DA_CASA },
      ],
    },
    {
      titulo: "Módulo VIII: Proteção de dados (LGPD)",
      blocos: [
        ...blocosLgpd(),
        {
          tipo: "assinaturas",
          localData: true,
          assinantes: [{ rotulo: "Assinatura do(a) participante" }],
        },
      ],
    },
    {
      titulo: "Módulo IX: Parecer da comissão (uso exclusivo do templo)",
      blocos: [
        {
          tipo: "campos",
          colunas: 4,
          campos: ["PA (mmHg)", "FC (bpm)", "SpO2 (%)", "Glicemia (mg/dL)"],
        },
        {
          tipo: "checklist",
          itens: [
            "**APTO(A)** — liberado(a) para a porção padrão.",
            "**APTO(A) COM RESTRIÇÃO** — porção reduzida (máximo ____ ml da graduação ____).",
            "**INAPTO(A) TEMPORARIAMENTE** — suspensão de medicamento incompleta ou sem parecer (Doc 06), uso no dia ou outro motivo: ________. Reavaliar a partir de ____/____/______.",
            "**INAPTO(A) DEFINITIVAMENTE** — veto da matriz oficial ou condição de base: ________.",
          ],
        },
        {
          tipo: "assinaturas",
          assinantes: [{ rotulo: "Avaliador(a) — nome e assinatura" }, { rotulo: "Dirigente responsável" }],
        },
      ],
    },
  ],
};
