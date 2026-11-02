import {
  DATA_VERSAO,
  DEVER_DE_CUIDADO_DA_CASA,
  REMISSAO_MATRIZ,
  REVISAO_JURIDICA,
  VERSAO_REVISADA,
  blocosLgpd,
} from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docTermo: DocumentoModelo = {
  id: "TERMO",
  numero: "02",
  rotuloCurto: "Termo & TCLE",
  resumo: "Ciência, consentimento e dever de cuidado (CONAD 01/2010 e CF/88)",
  icone: "termo",
  titulo: "TERMO DE RESPONSABILIDADE, CIÊNCIA DE SACRAMENTO E CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE)",
  subtitulo:
    "Art. 5º, VI e VIII da CF/88 • Resolução CONAD nº 01/2010 • Art. 2º, parágrafo único, da Lei nº 11.343/2006 • LGPD",
  versao: VERSAO_REVISADA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_JURIDICA}: cláusulas 7ª e 8ª`],
  arquivo: "nativaram-doc02-termo-tcle",
  montar: (ctx) => [
    {
      blocos: [
        {
          tipo: "nota",
          texto:
            "**Finalidade:** registrar a manifestação livre de vontade, a ciência dos efeitos e das interações medicamentosas, a vedação de comércio e os compromissos de cuidado assumidos pela casa.",
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: ["Comungante (nome completo)", "CPF"],
        },
      ],
    },
    {
      titulo: "Cláusula 1ª: Da natureza litúrgica e fundamentação legal",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "O(A) COMUNGANTE declara que comparece livre e espontaneamente a cerimônia de natureza religiosa, amparada no art. 5º, VI e VIII, e nos arts. 215 e 216 da Constituição Federal. Declara-se ciente de que o sacramento é a **ayahuasca** (Santo Daime / Vegetal / Hoasca), decocção de *Banisteriopsis caapi* (jagube/mariri) e *Psychotria viridis* (chacrona/rainha), ressalvada pelo parágrafo único do art. 2º da Lei nº 11.343/2006.",
        },
      ],
    },
    {
      titulo: "Cláusula 2ª: Da vedação de comercialização",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "Em observância à **Resolução CONAD nº 01/2010**, a ayahuasca **não é mercadoria**, não tem preço e não é objeto de comércio ou turismo. Qualquer contribuição tem natureza de **rateio solidário de custos** (manutenção do espaço, logística e feitio cooperativo, Lei nº 5.764/1971) e não configura relação de consumo.",
        },
      ],
    },
    {
      titulo: "Cláusula 3ª: Da ausência de promessa de cura e da vedação de suspensão por conta própria",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "A instituição **não é hospital, clínica ou estabelecimento de saúde** e não promete cura de doenças físicas ou mentais (arts. 283 e 284 do Código Penal). O(A) COMUNGANTE compromete-se a **nunca interromper ou alterar tratamento médico por conta própria**; qualquer suspensão depende do médico assistente e do parecer por escrito (Documento 06).",
        },
      ],
    },
    {
      titulo: "Cláusula 4ª: Da ciência das interações medicamentosas",
      blocos: [
        {
          tipo: "paragrafo",
          texto: `O(A) COMUNGANTE declara ter lido a ${REMISSAO_MATRIZ}, reproduzida na Ficha de Anamnese (Documento 01), e declara **não fazer uso** de medicamentos marcados como "não pode participar" (por exemplo: carbonato de lítio, antiparkinsonianos, antipsicóticos, anticonvulsivantes, linezolida) e **não estar dentro da janela de suspensão** de antidepressivos, estimulantes, emagrecedores, opioides serotoninérgicos (ex.: tramadol), triptanos ou antigripais com dextrometorfano ou descongestionantes, conforme a matriz.`,
        },
      ],
    },
    {
      titulo: "Cláusula 5ª: Dos efeitos psicofísicos e da purgação",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "O(A) COMUNGANTE foi informado(a) das manifestações comuns: mirações, elevação transitória da frequência cardíaca e da pressão arterial, sudorese, calafrios, náusea, vômito e eventual evacuação, compreendidos pela tradição como purgação.",
        },
      ],
    },
    {
      titulo: "Cláusula 6ª: Das obrigações de conduta e segurança viária",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Permanecer no perímetro do templo até o encerramento pelo(a) dirigente.",
            "Deslocar-se aos banheiros acompanhado(a) por fiscal.",
            "Respeitar o silêncio e não fotografar, filmar nem gravar áudio do ritual (art. 20 do Código Civil).",
            "**Não dirigir veículos nem operar máquinas** após a cerimônia, até a completa recuperação dos reflexos.",
          ],
        },
      ],
    },
    {
      titulo: "Cláusula 7ª: Da declaração de veracidade, da ciência e do dever de cuidado da casa",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "O(A) COMUNGANTE ratifica a veracidade e a completude da Ficha de Anamnese e declara-se ciente de que informações omitidas ou incorretas impedem a casa de avaliar o seu risco. Compromete-se a comunicar qualquer mudança até o momento da cerimônia.",
        },
        { tipo: "paragrafo", texto: DEVER_DE_CUIDADO_DA_CASA },
        {
          tipo: "paragrafo",
          texto:
            "Em caso de intercorrência, o(a) COMUNGANTE autoriza o acionamento imediato do SAMU 192 e a remoção hospitalar, e o repasse à equipe de saúde das informações necessárias ao atendimento.",
        },
      ],
    },
    {
      titulo: "Cláusula 8ª: Da proteção de dados (LGPD) e da voluntariedade",
      blocos: [
        ...blocosLgpd(),
        {
          tipo: "paragrafo",
          texto: "O(A) COMUNGANTE pode desistir livremente a qualquer momento antes de ingerir o sacramento.",
        },
      ],
    },
    {
      titulo: "Assinaturas",
      blocos: [
        {
          tipo: "assinaturas",
          localData: true,
          assinantes: [
            { rotulo: "Assinatura do(a) comungante", detalhe: "CPF: ____________________" },
            { rotulo: "Assinatura do(a) dirigente espiritual", detalhe: ctx.temploNome },
            { rotulo: "Testemunha 01 (fiscal de salão)", detalhe: "Nome e CPF: ____________________" },
            { rotulo: "Testemunha 02 (fiscal de salão)", detalhe: "Nome e CPF: ____________________" },
          ],
        },
      ],
    },
  ],
};
