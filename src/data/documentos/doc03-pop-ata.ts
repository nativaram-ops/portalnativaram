import { DATA_VERSAO, REMISSAO_MATRIZ, REVISAO_CLINICA, VERSAO_REVISADA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docPopAta: DocumentoModelo = {
  id: "ATA",
  numero: "03",
  rotuloCurto: "POP & Ata Ritual",
  resumo: "Fases da sessão, critérios de Hunter, sinais de alarme e ata",
  icone: "ata",
  titulo: "MANUAL DE PROCEDIMENTO OPERACIONAL PADRÃO (POP) E ATA DE SESSÃO LITÚRGICA",
  subtitulo: "Gestão de riscos, critérios de Hunter, Zendo Project, sinais de alarme e registro de governança",
  versao: VERSAO_REVISADA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: sinais de alarme e limiar de pressão de emergência`],
  arquivo: "nativaram-doc03-pop-ata",
  montar: (ctx) => [
    {
      blocos: [
        {
          tipo: "nota",
          texto:
            "**Finalidade operacional:** padronizar as fases de salvaguarda da sessão, a conferência das fichas contra a matriz oficial, a resposta a emergências e a lavratura da ata.",
        },
      ],
    },
    {
      titulo: "Parte I: Procedimento operacional padrão (POP)",
      blocos: [
        {
          tipo: "grupo",
          titulo: "Fase 1 — Pré-ritual e triagem (T − 2 h a T − 30 min)",
          cor: "neutro",
          blocos: [
            {
              tipo: "checklist",
              itens: [
                "Rotas de saída desobstruídas e ventilação contínua no salão.",
                "Espaço seguro de acolhimento montado (colchonetes, água, cobertores).",
                "Kit de aferição e primeiros socorros conferido (esfigmomanômetro, oxímetro, termômetro, glicosímetro, açúcar/mel, sais de reidratação).",
                "Plano de emergência do local (Documento 08) preenchido e Cartões de Informação para a equipe de saúde (Documento 10) impressos.",
                `Fichas de Anamnese (Doc 01) dentro da validade e Termos (Doc 02) conferidos contra a ${REMISSAO_MATRIZ}: ninguém com veto vermelho; suspensões do grupo azul concluídas com parecer médico (Doc 06); grupo amarelo não tomado no dia.`,
                "Reconfirmação no dia (Doc 07) aplicada a todos os participantes, com sinais vitais.",
                "Fiscais em serviço com porção mínima de vigília.",
              ],
            },
          ],
        },
        {
          tipo: "grupo",
          titulo: "Fase 2 — Abertura e calibração de porções (T 0 a T + 30 min)",
          cor: "neutro",
          blocos: [
            {
              tipo: "checklist",
              itens: [
                "Aviso das regras do salão (permanência, silêncio, celulares desligados, acompanhamento aos banheiros).",
                "Porção conservadora para iniciantes (metade da porção padrão, priorizando graduações suaves).",
                "Repasse apenas após avaliação visual de lucidez.",
                "Registro nominal no mapa de comunhão.",
              ],
            },
          ],
        },
        {
          tipo: "grupo",
          titulo: "Fase 3 — Purga, acolhimento e crises (T + 30 min a T + 4 h)",
          cor: "neutro",
          blocos: [
            {
              tipo: "checklist",
              itens: [
                "Prevenção de broncoaspiração (atenção redobrada a usuários de canetas GLP-1): tronco inclinado ou posição lateral de segurança; nunca deitar de barriga para cima durante a purga.",
                "Suor frio, tremor ou tontura após a purga: aferir glicemia e oferecer carboidrato rápido se baixa.",
                "Princípios do Zendo Project: espaço seguro; acompanhar sem guiar; conversar pela respiração; o difícil não é mau.",
                "Não administrar ansiolíticos, antieméticos ou outros medicamentos durante a sessão sem orientação médica.",
              ],
            },
          ],
        },
        {
          tipo: "grupo",
          titulo: "Fase 4 — Sinais de alarme e SAMU 192",
          cor: "vermelho",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "**Síndrome serotoninérgica (critérios de Hunter, em quem usou agente serotoninérgico):** clônus espontâneo; ou clônus induzível com agitação ou sudorese; ou clônus ocular com agitação ou sudorese; ou tremor com hiper-reflexia; ou hipertonia com temperatura acima de 38 °C e clônus ocular ou induzível.",
                "**Convulsão** com duração acima de 5 minutos ou crises repetidas sem recuperação da consciência entre elas.",
                "**Crise hipertensiva / AVC / infarto:** PA acima do limiar de emergência da casa (____/____ mmHg) com dor de cabeça súbita e intensa, dor no peito, fraqueza de um lado do corpo ou desvio da boca.",
                "**Rebaixamento da consciência** (não responde a estímulo) ou lábios arroxeados / SpO2 baixa.",
                "**Conduta:** acionar o SAMU 192, informar ingestão de ayahuasca (IMAO-A reversível + DMT) e o horário, entregar o Cartão (Doc 10) e a ficha, manter vias aéreas livres em posição lateral de segurança e resfriar se houver hipertermia. Registrar no Documento 08.",
              ],
            },
          ],
        },
      ],
    },
    {
      titulo: "Parte II: Ata da sessão litúrgica",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            `Templo: ${ctx.temploNome} | Data da sessão`,
            "Horário de início | Horário de término",
            "Nº total de comungantes (homens / mulheres / menores autorizados)",
            "Nº de participantes de primeira vez",
            "Graduação utilizada | Lote",
            "Volume consagrado (litros)",
          ],
        },
        {
          tipo: "campos",
          colunas: 1,
          campos: [
            "Intercorrências (descrever e anexar o registro do Documento 08)",
            "Ocorrências disciplinares",
            "Horário de encerramento e liberação segura",
          ],
        },
        {
          tipo: "assinaturas",
          assinantes: [
            { rotulo: "Dirigente da sessão", detalhe: ctx.temploDirigente },
            { rotulo: "Fiscal de salão 01", detalhe: "Nome e assinatura" },
            { rotulo: "Fiscal de salão 02", detalhe: "Nome e assinatura" },
          ],
        },
      ],
    },
  ],
};
