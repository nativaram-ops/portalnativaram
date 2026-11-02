import { DATA_VERSAO, REMISSAO_MATRIZ, REVISAO_CLINICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docParecerMedico: DocumentoModelo = {
  id: "PARECER_MEDICO",
  numero: "06",
  rotuloCurto: "Parecer Médico",
  resumo: "Aptidão e suspensão supervisionada de medicamento (washout)",
  icone: "parecer",
  titulo: "PARECER MÉDICO DE APTIDÃO E SUSPENSÃO SUPERVISIONADA DE MEDICAMENTO (WASHOUT)",
  subtitulo: "Para preenchimento exclusivo pelo(a) médico(a) assistente • Anexar à Ficha de Anamnese (Documento 01)",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: texto ao médico e campos`],
  arquivo: "nativaram-doc06-parecer-medico",
  montar: () => [
    {
      blocos: [
        {
          tipo: "nota",
          cor: "azul",
          texto:
            "**Prezado(a) médico(a):** a pessoa abaixo pretende participar de cerimônia religiosa com ingestão de **ayahuasca**, bebida que contém β-carbolinas (harmina e harmalina, de ação **IMAO-A reversível**, e tetra-hidro-harmina) e **DMT** (agonista serotoninérgico 5-HT2A). A casa não orienta suspensão de medicamentos: essa decisão é exclusivamente sua. As janelas mínimas de referência usadas pela casa constam na " +
            REMISSAO_MATRIZ +
            "; o(a) senhor(a) pode estabelecer prazo maior ou contraindicar a participação.",
        },
      ],
    },
    {
      titulo: "1. Identificação do(a) paciente",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: ["Nome completo", "Data de nascimento", "CPF", "Templo de referência"],
        },
      ],
    },
    {
      titulo: "2. Medicamentos em uso e conduta",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Medicamento", "Dose", "Indicação", "Conduta (manter / suspender / substituir)"],
          linhas: [],
          linhasEmBranco: 4,
        },
      ],
    },
    {
      titulo: "3. Suspensão supervisionada",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Medicamento", "Início da redução", "Data da última tomada", "Fim da suspensão"],
          linhas: [],
          linhasEmBranco: 3,
        },
        {
          tipo: "campos",
          colunas: 1,
          campos: ["Data a partir da qual a pessoa está liberada para participar (____/____/______)"],
        },
      ],
    },
    {
      titulo: "4. Declaração do(a) médico(a)",
      blocos: [
        {
          tipo: "checklist",
          itens: [
            "Estou ciente de que a ayahuasca contém IMAO-A reversível e DMT.",
            "Considero a pessoa apta a participar a partir da data indicada acima.",
            "Considero a pessoa inapta — motivo: ________________________",
            "Não recomendo suspender o medicamento; a pessoa não deve participar enquanto o utilizar.",
          ],
        },
        { tipo: "campos", colunas: 1, campos: ["Observações"] },
        {
          tipo: "assinaturas",
          localData: true,
          assinantes: [{ rotulo: "Médico(a) assistente", detalhe: "Nome, CRM/UF e carimbo" }],
        },
      ],
    },
  ],
};
