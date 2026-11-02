import type { Bloco } from "./tipos";

/** Versão e data comuns à revisão de 02/11/2026 (planos 010 e 011). */
export const VERSAO_REVISADA = "2.0";
export const VERSAO_NOVA = "1.0";
export const DATA_VERSAO = "2026-11-02";

export const REVISAO_CLINICA = "Revisão clínica pendente";
export const REVISAO_JURIDICA = "Revisão jurídica pendente";

/** Remissão padrão à fonte oficial das janelas de suspensão (plano 010, A1). */
export const REMISSAO_MATRIZ =
  "Tabela de Medicamentos do Portal (matriz oficial, Portal do Dirigente → Interações Medicamentosas)";

/**
 * Dever de cuidado assumido pela casa. Substitui as antigas cláusulas de exoneração
 * de responsabilidade (plano 010, B1.2).
 */
export const DEVER_DE_CUIDADO_DA_CASA =
  "**Dever de cuidado da casa.** O templo se compromete a: (a) conferir a ficha de anamnese antes de cada participação; (b) aferir sinais vitais na recepção e aplicar a reconfirmação no dia (Documento 07); (c) manter, durante toda a sessão, pessoa treinada em primeiros socorros, o kit de aferição e o plano de emergência do local (Documento 08); (d) acionar o SAMU 192 diante de sinal de alarme e entregar à equipe de saúde o Cartão de Informação (Documento 10); e (e) não pressionar ninguém a ingerir o sacramento.";

/**
 * Declaração de veracidade e ciência (sem cláusula de exoneração).
 */
export function declaracaoVeracidade(quem: "participante" | "responsaveis"): string {
  return quem === "participante"
    ? "Declaro que li cada item deste documento e da " +
        REMISSAO_MATRIZ +
        " e que respondi com verdade e de forma completa. Estou ciente de que a ayahuasca pode interagir de forma grave com medicamentos, substâncias e condições de saúde, e de que informações omitidas ou incorretas impedem a casa de avaliar o meu risco. Comprometo-me a comunicar qualquer mudança até o momento da cerimônia, inclusive na reconfirmação do Documento 07."
    : "Declaramos que as informações prestadas sobre a saúde e os medicamentos da criança ou do adolescente são verdadeiras e completas, que lemos a " +
        REMISSAO_MATRIZ +
        " e que estamos cientes de que informações omitidas ou incorretas impedem a casa de avaliar o risco. Comprometemo-nos a comunicar qualquer mudança até o momento da cerimônia.";
}

/**
 * Bloco de proteção de dados usado nos termos e na ficha (plano 010, B1.1).
 * Sem prazo fixo: o templo preenche um prazo finito na Política de Privacidade (Doc 11).
 */
export function blocosLgpd(opcoes: { menores?: boolean } = {}): Bloco[] {
  const consentimento = opcoes.menores
    ? "[ ] **Consentimento específico e destacado (LGPD, art. 11, I, e art. 14, § 1º):** como responsável legal, autorizo o tratamento dos dados de saúde e de convicção religiosa da criança ou do adolescente para a finalidade exclusiva de triagem de segurança e socorro em emergência."
    : "[ ] **Consentimento específico e destacado (LGPD, art. 11, I):** autorizo o tratamento dos meus dados de saúde e de convicção religiosa para a finalidade exclusiva de triagem de segurança e socorro em emergência.";
  return [
    { tipo: "paragrafo", texto: consentimento },
    {
      tipo: "lista",
      itens: [
        'Em situação de risco à vida, os dados necessários poderão ser repassados à equipe de saúde que prestar o atendimento, independentemente de consentimento (LGPD, art. 11, II, "e" — proteção da vida).',
        "Os dados não serão usados para divulgação, marketing nem cedidos a terceiros para qualquer finalidade comercial.",
        "**Prazo de retenção:** ____________________ (prazo finito definido pelo templo na Política de Privacidade, Documento 11). Ao fim do prazo, os dados serão eliminados ou anonimizados.",
        "O titular pode pedir acesso, correção e eliminação dos dados e revogar este consentimento a qualquer momento (LGPD, art. 18). Pedidos de eliminação serão atendidos, salvo as hipóteses de conservação do art. 16 da LGPD confirmadas pela assessoria jurídica do templo.",
      ],
    },
    { tipo: "campos", campos: ["Encarregado pelo tratamento de dados (nome e contato)"], colunas: 1 },
  ];
}
