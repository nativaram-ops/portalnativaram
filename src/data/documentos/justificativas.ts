/**
 * "Por que cada item existe?" — fundamentação exibida acima dos documentos.
 * Sem números próprios de washout: a fonte oficial é a matriz do portal.
 */
export interface Justificativa {
  titulo: string;
  texto: string;
  cor: "rose" | "sky" | "amber" | "emerald" | "purple" | "slate";
}

export const JUSTIFICATIVAS_DOCUMENTOS: Justificativa[] = [
  {
    titulo: "1. Veto (vermelho)",
    cor: "rose",
    texto:
      "Itens marcados como \"não pode participar\" na matriz oficial. O motivo pode ser a interação (ex.: lítio, levodopa, IMAO) ou a condição de base que levou à prescrição (ex.: epilepsia, psicose). A ficha reproduz a matriz automaticamente.",
  },
  {
    titulo: "2. Suspensão prévia (azul)",
    cor: "sky",
    texto:
      "Antidepressivos, estimulantes, opioides serotoninérgicos e outros exigem suspensão prévia, sempre decidida e acompanhada pelo médico assistente, com parecer por escrito (Doc 06). As janelas vêm da Tabela de Medicamentos do Portal e aguardam revisão clínica.",
  },
  {
    titulo: "3. Não tomar no dia e canetas GLP-1 (amarelo)",
    cor: "amber",
    texto:
      "Sedativos como os benzodiazepínicos não devem ser tomados no dia. As canetas GLP-1 retardam o esvaziamento gástrico: a decisão sobre a dose da semana é do prescritor, e a purga exige prevenção de broncoaspiração.",
  },
  {
    titulo: "4. Triagem cardiovascular, hepática e renal",
    cor: "amber",
    texto:
      "A ayahuasca eleva transitoriamente a pressão arterial e a frequência cardíaca. Insuficiência hepática compromete as enzimas CYP2D6, CYP1A2 e CYP3A4, que metabolizam harmina e harmalina. Os limiares de pressão formam uma tabela única da casa (triagem, impedimento no dia, emergência).",
  },
  {
    titulo: "5. Proteção de dados (LGPD)",
    cor: "emerald",
    texto:
      "Dados de saúde e religião são sensíveis (LGPD, art. 11). Base legal: consentimento específico e destacado e proteção da vida. O prazo de guarda é finito e definido pelo templo na Política de Privacidade (Doc 11); o titular pode pedir eliminação.",
  },
  {
    titulo: "6. Menores e desintoxicação",
    cor: "purple",
    texto:
      "A CONAD 01/2010 deixa a decisão aos pais, no exercício do poder familiar. Exigir a assinatura ou a presença de ambos é regra da casa, não da norma. Em protocolos de desintoxicação, a avaliação é individual e com aval médico formal.",
  },
  {
    titulo: "7. Veracidade e dever de cuidado",
    cor: "slate",
    texto:
      "Responsabilidade penal não se afasta por contrato, e cláusula que exonera de dano à vida tende a ser nula. Os termos registram a veracidade e a ciência do participante e descrevem o que a casa faz: triagem, sinais vitais, reconfirmação no dia e plano de emergência.",
  },
];
