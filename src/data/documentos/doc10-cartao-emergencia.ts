import { DATA_VERSAO, REVISAO_CLINICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docCartaoEmergencia: DocumentoModelo = {
  id: "CARTAO_EMERGENCIA",
  numero: "10",
  rotuloCurto: "Cartão p/ Equipe de Saúde",
  resumo: "Entregar ao SAMU ou ao pronto-socorro",
  icone: "cartao",
  titulo: "CARTÃO — INFORMAÇÃO PARA A EQUIPE DE SAÚDE",
  subtitulo: "Entregar ao SAMU ou ao pronto-socorro junto com a Ficha de Anamnese (Documento 01)",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: lista de fármacos a evitar`],
  arquivo: "nativaram-doc10-cartao-equipe-saude",
  montar: (ctx) => [
    {
      blocos: [
        {
          tipo: "nota",
          cor: "vermelho",
          texto:
            "Esta pessoa ingeriu **ayahuasca** às ____h____ do dia ____/____/______ (última porção às ____h____).\nA ayahuasca contém **β-carbolinas (harmina e harmalina — inibidores reversíveis da MAO-A, IMAO-A)** e **DMT** (agonista serotoninérgico).\n**Evitar fármacos serotoninérgicos, como meperidina, tramadol, fentanil e azul de metileno, até avaliação médica**, pelo risco de síndrome serotoninérgica.",
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Nome",
            "Idade",
            "Medicamentos de uso contínuo",
            "Alergias",
            "Volume aproximado ingerido (ml)",
            "Sintomas observados e horário",
            "Contato de emergência da pessoa",
            `Contato do templo (${ctx.temploNome}) — ${ctx.temploDirigente}, telefone`,
          ],
        },
      ],
    },
  ],
};
