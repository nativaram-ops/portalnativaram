/**
 * Central de Documentos — fonte única dos textos (plano 011, B5).
 * A folha A4 e o Markdown baixado/copiado são gerados destas estruturas.
 */
import { docAnamnese } from "./doc01-anamnese";
import { docTermo } from "./doc02-termo";
import { docPopAta } from "./doc03-pop-ata";
import { docTransito } from "./doc04-transito";
import { docMenores } from "./doc05-menores";
import { docParecerMedico } from "./doc06-parecer-medico";
import { docReconfirmacaoD0 } from "./doc07-reconfirmacao-d0";
import { docPlanoEmergencia } from "./doc08-plano-emergencia";
import { docGuiaParticipante } from "./doc09-guia-participante";
import { docCartaoEmergencia } from "./doc10-cartao-emergencia";
import { docPoliticaPrivacidade } from "./doc11-politica-privacidade";
import type { DocumentoModelo } from "./tipos";

/** Documentos na ordem de exibição (numeração crescente). */
export const DOCUMENTOS_CENTRAL: DocumentoModelo[] = [
  docAnamnese,
  docTermo,
  docPopAta,
  docTransito,
  docMenores,
  docParecerMedico,
  docReconfirmacaoD0,
  docPlanoEmergencia,
  docGuiaParticipante,
  docCartaoEmergencia,
  docPoliticaPrivacidade,
];

export { gerarMarkdown, textoRodape, statusRevisao, formatarDataVersao, LINHA_REVISOR, LINHA_LOCAL_DATA, MARCA_INSTITUCIONAL, LINHA_SISTEMA } from "./markdown";
export { JUSTIFICATIVAS_DOCUMENTOS } from "./justificativas";
export type { Justificativa } from "./justificativas";
export type { Bloco, ContextoDocumento, CorDestaque, DocumentoModelo, IconeDocumento, Secao } from "./tipos";
