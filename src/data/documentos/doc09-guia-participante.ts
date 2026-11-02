import { DATA_VERSAO, REVISAO_CLINICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docGuiaParticipante: DocumentoModelo = {
  id: "GUIA_PARTICIPANTE",
  numero: "09",
  rotuloCurto: "Guia do Participante",
  resumo: "Linguagem simples: remédios, alimentação e o que esperar",
  icone: "guia",
  titulo: "GUIA DO PARTICIPANTE — COMO SE PREPARAR PARA A CERIMÔNIA",
  subtitulo: "Entregue este guia junto com a Ficha de Anamnese. Leia com calma antes de preencher.",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: lista de remédios citados`],
  arquivo: "nativaram-doc09-guia-participante",
  montar: (ctx) => [
    {
      titulo: "Antes de tudo",
      blocos: [
        {
          tipo: "nota",
          cor: "vermelho",
          texto:
            "**Nunca pare de tomar um remédio por conta própria.** Parar de repente alguns remédios (para depressão, ansiedade, convulsão, pressão ou sono) pode ser perigoso. Se você usa algum remédio, converse com o médico que o receitou e leve a ele o Documento 06 (Parecer Médico).",
        },
        {
          tipo: "paragrafo",
          texto:
            "A bebida da cerimônia (ayahuasca) muda a forma como o corpo lida com vários remédios. Por isso a casa pergunta **tudo** o que você tomou nos últimos 60 dias, mesmo o que você compra sem receita.",
        },
      ],
    },
    {
      titulo: "Remédios e produtos que precisam de atenção",
      blocos: [
        {
          tipo: "paragrafo",
          texto: "Conte para a equipe se você usa ou usou algum destes (são só exemplos):",
        },
        {
          tipo: "lista",
          itens: [
            "Para depressão ou ansiedade: Prozac, Daforin (fluoxetina), Zoloft (sertralina), Lexapro (escitalopram), Velija, Cymbalta (duloxetina), Efexor (venlafaxina), Tryptanol (amitriptilina), Donaren (trazodona).",
            "Para dormir ou acalmar: Rivotril, Frontal, Lexotan, Valium, Stilnox.",
            "Lítio (Carbolitium), remédios para convulsão (Depakene, Tegretol, Gardenal, Lamictal) e antipsicóticos (Seroquel, Risperdal, Haldol).",
            "Para TDAH ou foco: Ritalina, Concerta, Venvanse.",
            "Para emagrecer: sibutramina, canetas como Ozempic, Wegovy, Mounjaro e Saxenda.",
            "Para dor forte: tramadol (Tramal), codeína (Tylex).",
            "Para dor de cabeça e enxaqueca: Neosaldina, Sumax, Naramig.",
            "Relaxantes musculares: Miosan, Torsilax, Dorflex.",
            "Gripe, tosse e nariz entupido: Vick 44E, Benegrip, Decongex, Resfenol.",
            "Suplementos e produtos naturais: 5-HTP, triptofano, erva-de-são-joão, pré-treino, termogênicos.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "O tempo de pausa **não é igual para todos os remédios**. Quem decide é o seu médico, com base na tabela de medicamentos da casa. Não use a internet para decidir isso. Remédio que não está nesta lista não é, por isso, seguro: pergunte.",
        },
      ],
    },
    {
      titulo: "Outras práticas e substâncias",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "Conte também se usou e quando: kambô, rapé, sananga, 5-MeO-DMT (Bufo), ibogaína, arruda-síria, álcool, maconha, cocaína, ecstasy ou outras drogas. A casa informa o intervalo mínimo antes da cerimônia.",
        },
      ],
    },
    {
      titulo: "Alimentação",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Siga a orientação de alimentação da casa. Em geral, prefira refeições leves.",
            "Evite queijos curados, embutidos (salame, linguiça curada), fermentados, bebidas alcoólicas e energéticos.",
            "Se você tem diabetes, avise: jejum longo pode baixar o açúcar no sangue.",
          ],
        },
      ],
    },
    {
      titulo: "No dia",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Traga documento, a lista dos seus remédios e o telefone de um contato de emergência.",
            "A equipe vai medir sua pressão e fazer algumas perguntas rápidas (Documento 07).",
            "Você pode desistir a qualquer momento antes de beber, sem precisar explicar.",
          ],
        },
      ],
    },
    {
      titulo: "O que esperar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "A cerimônia dura algumas horas. Pode haver enjoo, vômito, diarreia, suor, frio ou calor, emoções fortes e visões. A equipe acompanha você o tempo todo.",
            "Avise na hora se sentir dor no peito, falta de ar, confusão forte, tremores fortes, febre ou muita dor de cabeça.",
            "Não dirija depois da cerimônia. Combine antes como vai voltar para casa.",
          ],
        },
        {
          tipo: "paragrafo",
          texto: `Dúvidas? Fale com ${ctx.temploDirigente} (${ctx.temploNome}).`,
        },
      ],
    },
  ],
};
