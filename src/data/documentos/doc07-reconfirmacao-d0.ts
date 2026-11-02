import { DATA_VERSAO, REVISAO_CLINICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

const SN = "[ ] NÃO [ ] SIM";

export const docReconfirmacaoD0: DocumentoModelo = {
  id: "RECONFIRMACAO_D0",
  numero: "07",
  rotuloCurto: "Reconfirmação D-0",
  resumo: "Meia página no dia: mudanças, últimas 72 h e sinais vitais",
  icone: "reconfirmacao",
  titulo: "RECONFIRMAÇÃO NO DIA DA CERIMÔNIA (D-0)",
  subtitulo: "Aplicar a cada participante na recepção, junto com a Ficha de Anamnese (Documento 01) válida",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: limiares de pressão e critérios de inaptidão no dia`],
  arquivo: "nativaram-doc07-reconfirmacao-d0",
  montar: () => [
    {
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: ["Nome do(a) participante", "Data da cerimônia", "Ficha de anamnese válida até", "Hora da triagem"],
        },
      ],
    },
    {
      titulo: "Perguntas",
      blocos: [
        {
          tipo: "lista",
          ordenada: true,
          itens: [
            `Algo mudou na sua saúde desde que preencheu a ficha (diagnóstico novo, internação, gravidez)? ${SN} Qual: ____________`,
            `Tomou algum remédio, antigripal, relaxante muscular, remédio para dor de cabeça, suplemento, pré-treino ou outra substância nas últimas 72 h? ${SN} Qual e quando: ____________`,
            `Começou, trocou ou parou algum remédio desde a ficha? ${SN} Se parou: há parecer médico (Documento 06)? [ ] SIM [ ] NÃO`,
            `Usou álcool, cannabis, kambô, rapé ou outra substância desde a ficha? ${SN} Qual e quando: ____________`,
            `Está em jejum prolongado, sem dormir ou passando mal hoje? ${SN}`,
          ],
        },
      ],
    },
    {
      titulo: "Sinais vitais",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Pressão arterial (mmHg) — 1ª aferição",
            "Pressão arterial (mmHg) — 2ª aferição, se alterada",
            "Frequência cardíaca (bpm)",
            "Glicemia (mg/dL) — se em jejum ou diabético(a)",
          ],
        },
        {
          tipo: "nota",
          cor: "amarelo",
          texto:
            "Impedimento no dia conforme a tabela única de limiares da casa: pressão a partir de ____/____ mmHg; frequência cardíaca fora de ____ a ____ bpm; glicemia abaixo de ____ mg/dL. **Revisão clínica pendente.**",
        },
      ],
    },
    {
      titulo: "Decisão",
      blocos: [
        {
          tipo: "checklist",
          itens: ["**APTO(A)** para a cerimônia de hoje.", "**INAPTO(A)** hoje — motivo: ________________________"],
        },
        {
          tipo: "assinaturas",
          assinantes: [
            { rotulo: "Participante" },
            { rotulo: "Quem fez a triagem", detalhe: "Nome e função" },
          ],
        },
      ],
    },
  ],
};
