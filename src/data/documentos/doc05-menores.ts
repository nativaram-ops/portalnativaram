import {
  DATA_VERSAO,
  DEVER_DE_CUIDADO_DA_CASA,
  REVISAO_CLINICA,
  REVISAO_JURIDICA,
  VERSAO_REVISADA,
  blocosLgpd,
  declaracaoVeracidade,
} from "./comuns";
import type { DocumentoModelo } from "./tipos";

const SN = "[ ] NÃO [ ] SIM";

export const docMenores: DocumentoModelo = {
  id: "MENORES",
  numero: "05",
  rotuloCurto: "Termo p/ Menores",
  resumo: "Poder familiar (CONAD item 4.1), não coerção e regras da casa",
  icone: "menores",
  titulo: "TERMO DE AUTORIZAÇÃO E RESPONSABILIDADE DO PODER FAMILIAR PARA MENOR DE IDADE",
  subtitulo:
    "Resolução CONAD nº 01/2010 (item 4.1) • Art. 227 da CF/88 • ECA (Lei nº 8.069/1990) • Art. 1.634 do Código Civil • LGPD, art. 14",
  versao: VERSAO_REVISADA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [
    `${REVISAO_JURIDICA}: cláusulas 6ª e 7ª e exigência de assinaturas`,
    `${REVISAO_CLINICA}: lista de medicamentos vetados em pediatria`,
  ],
  arquivo: "nativaram-doc05-termo-menores",
  montar: (ctx) => [
    {
      blocos: [
        {
          tipo: "nota",
          cor: "roxo",
          texto:
            "**O que diz a norma:** a Resolução CONAD nº 01/2010 deixa a participação de crianças e adolescentes à decisão dos pais ou responsáveis, no exercício do poder familiar, com zelo pelo bem-estar físico e psíquico do menor.\n**Regra desta casa (não é exigência da norma):** [ ] exigimos a assinatura de ambos os responsáveis legais [ ] basta a assinatura de um responsável legal. Pelo menos um responsável permanece no salão durante toda a cerimônia, e a vontade da criança ou do adolescente é sempre respeitada.",
        },
      ],
    },
    {
      titulo: "Módulo I: Qualificação da criança ou do adolescente",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Nome completo",
            "Data de nascimento | Idade | Peso (kg)",
            "Certidão de nascimento ou RG",
            "CPF",
            "Endereço residencial",
          ],
        },
      ],
    },
    {
      titulo: "Módulo II: Responsáveis legais",
      blocos: [
        {
          tipo: "grupo",
          titulo: "1º responsável legal",
          cor: "neutro",
          blocos: [
            {
              tipo: "campos",
              colunas: 2,
              campos: [
                "Nome",
                "RG/UF | CPF",
                "Telefone/WhatsApp",
                "Vínculo: [ ] mãe [ ] pai [ ] tutor(a) / guardião(ã) judicial",
                "Tempo de participação em cerimônias",
              ],
            },
          ],
        },
        {
          tipo: "grupo",
          titulo: "2º responsável legal (quando houver ou quando exigido pela casa)",
          cor: "neutro",
          blocos: [
            {
              tipo: "campos",
              colunas: 2,
              campos: [
                "Nome",
                "RG/UF | CPF",
                "Telefone/WhatsApp",
                "Vínculo: [ ] mãe [ ] pai [ ] tutor(a) / guardião(ã) judicial",
                "Tempo de participação em cerimônias",
              ],
            },
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "Se um dos genitores for falecido ou destituído do poder familiar, ou houver guarda unilateral, anexar o documento correspondente.",
        },
      ],
    },
    {
      titulo: "Módulo III: Triagem de saúde e bloqueio farmacológico",
      blocos: [
        {
          tipo: "paragrafo",
          texto: `**1. Usa algum medicamento contínuo ou recente (últimos 60 dias), inclusive xarope, antigripal ou suplemento?** ${SN} Qual(is), dose e para quê: ____________________`,
        },
        {
          tipo: "grupo",
          titulo: "🔴 Não pode ingerir o sacramento quem usa (pode acompanhar os pais sem comungar)",
          cor: "vermelho",
          blocos: [
            {
              tipo: "lista",
              itens: [
                "**Estimulantes / TDAH:** metilfenidato (Ritalina, Ritalina LA, Concerta), lisdexanfetamina (Venvanse, Juneve), atomoxetina (Atentah).",
                "**Antipsicóticos:** risperidona (Risperdal, Zargus), aripiprazol (Abilify, Aristab), quetiapina (Seroquel), periciazina (Neuleptil), levomepromazina (Neozine), haloperidol (Haldol).",
                "**Anticonvulsivantes e estabilizadores:** ácido valproico/divalproato (Depakene, Depakote), carbamazepina (Tegretol), oxcarbazepina (Trileptal), fenobarbital (Gardenal), fenitoína (Hidantal), lamotrigina (Lamictal), levetiracetam (Keppra), carbonato de lítio (Carbolitium).",
                "**Antidepressivos:** fluoxetina (Prozac, Daforin), sertralina (Zoloft), escitalopram (Lexapro), imipramina (Tofranil), clomipramina (Anafranil), amitriptilina.",
                "**Xaropes e antigripais:** dextrometorfano (Vick 44E, Benalet TSC), descongestionantes e anti-histamínicos (Decongex, Resfenol, Polaramine).",
              ],
            },
          ],
        },
        {
          tipo: "paragrafo",
          texto: `**2. Diagnósticos:** convulsões/epilepsia (inclusive febril) ${SN} | cardiopatia congênita/arritmia ${SN} | asma grave ou diabetes tipo 1 ${SN}`,
        },
        {
          tipo: "paragrafo",
          texto:
            "**3. Experiência anterior:** [ ] primeira participação [ ] já participou ____ vezes",
        },
      ],
    },
    {
      titulo: "Módulo IV: Cláusulas do poder familiar e regras da casa",
      blocos: [
        {
          tipo: "lista",
          ordenada: true,
          itens: [
            "**Finalidade religiosa:** a participação tem finalidade exclusivamente religiosa e familiar, vedada qualquer motivação recreativa.",
            "**Não coerção (art. 16 do ECA):** se a criança ou o adolescente recusar, chorar ou demonstrar desconforto no momento do cálice, a decisão será acatada sem pressão dos pais ou da equipe.",
            "**Porção simbólica:** medida mínima, adaptada a idade e peso, em graduação suave. Não há segunda porção para menores.",
            "**Presença física:** pelo menos um responsável legal permanece no salão durante toda a cerimônia.",
            "**Cuidado direto:** os responsáveis acompanham o menor aos sanitários e o acolhem em caso de náusea ou purga.",
            `**Declaração de veracidade e dever de cuidado:** ${declaracaoVeracidade("responsaveis")} ${DEVER_DE_CUIDADO_DA_CASA}`,
            "**Proteção de dados de crianças e adolescentes:** os dados são tratados no melhor interesse do menor (LGPD, art. 14), conforme o quadro abaixo e a Política de Privacidade do templo (Documento 11).",
          ],
        },
        ...blocosLgpd({ menores: true }),
      ],
    },
    {
      titulo: "Módulo V: Assinaturas",
      blocos: [
        {
          tipo: "assinaturas",
          localData: true,
          assinantes: [
            { rotulo: "1º responsável legal", detalhe: "Nome legível e CPF" },
            { rotulo: "2º responsável legal (se houver ou se exigido pela casa)", detalhe: "Nome legível e CPF" },
            { rotulo: "Criança ou adolescente (se alfabetizado)" },
          ],
        },
      ],
    },
    {
      titulo: `Módulo VI: Decisão do(a) dirigente (${ctx.temploNome})`,
      blocos: [
        {
          tipo: "checklist",
          itens: ["Deferido (porção simbólica)", "Acompanhamento sem ingestão", "Indeferido — motivo: ____________"],
        },
        {
          tipo: "assinaturas",
          assinantes: [{ rotulo: ctx.temploDirigente, detalhe: "Dirigente responsável" }],
        },
      ],
    },
  ],
};
