import { DATA_VERSAO, REVISAO_JURIDICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docPoliticaPrivacidade: DocumentoModelo = {
  id: "POLITICA_PRIVACIDADE",
  numero: "11",
  rotuloCurto: "Política de Privacidade",
  resumo: "LGPD: quem acessa as fichas, onde ficam, por quanto tempo",
  icone: "privacidade",
  titulo: "POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS DO TEMPLO (LGPD)",
  subtitulo: "Lei nº 13.709/2018 (LGPD) • Fichas de anamnese, termos, reconfirmações e registros de intercorrência",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_JURIDICA}: prazos de retenção, bases legais e hipóteses de conservação`],
  arquivo: "nativaram-doc11-politica-privacidade",
  montar: (ctx) => [
    {
      titulo: "1. Quem é responsável pelos dados",
      blocos: [
        {
          tipo: "lista",
          itens: [
            `**Controlador:** ${ctx.temploNome} — registro ${ctx.temploRegistro} — ${ctx.temploCidade}.`,
            `**Dirigente responsável:** ${ctx.temploDirigente}.`,
          ],
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: ["Encarregado pelo tratamento de dados (nome)", "Contato do encarregado (e-mail / telefone)"],
        },
      ],
    },
    {
      titulo: "2. Quais dados tratamos",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Identificação e contato do participante e do contato de emergência.",
            "Dados de saúde: ficha de anamnese (Doc 01), parecer médico (Doc 06), reconfirmação no dia e sinais vitais (Doc 07), registros de intercorrência (Doc 08).",
            "Convicção religiosa (participação em cerimônias).",
            "Dados de crianças e adolescentes, quando houver termo do poder familiar (Doc 05).",
          ],
        },
      ],
    },
    {
      titulo: "3. Para que usamos",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Triagem de segurança antes de cada participação.",
            "Socorro e informação à equipe de saúde em caso de intercorrência.",
            "Registro da sessão (ata) e melhoria da triagem.",
            "Atendimento a requisição de autoridade competente, quando houver obrigação legal.",
          ],
        },
        {
          tipo: "paragrafo",
          texto:
            "Os dados **não** são usados para divulgação ou marketing e **não** são vendidos nem cedidos a terceiros para fins comerciais.",
        },
      ],
    },
    {
      titulo: "4. Bases legais",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Dados de saúde e de convicção religiosa: **consentimento específico e destacado do titular** (LGPD, art. 11, I).",
            'Socorro em emergência: **proteção da vida ou da incolumidade física** do titular ou de terceiro (LGPD, art. 11, II, "e").',
            "Crianças e adolescentes: consentimento específico e em destaque dado por pelo menos um dos pais ou pelo responsável legal, no melhor interesse do menor (LGPD, art. 14).",
            "Outras bases (por exemplo, exercício regular de direitos) só com confirmação da assessoria jurídica do templo.",
          ],
        },
      ],
    },
    {
      titulo: "5. Quem acessa",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Função / nome", "O que acessa", "Para quê"],
          linhas: [
            ["Dirigente", "", "Decisão de aptidão"],
            ["Pessoa que faz a triagem", "", "Triagem e reconfirmação no dia"],
            ["Responsável pela guarda do arquivo", "", "Guarda e descarte"],
            ["Equipe de saúde (emergência)", "Somente o necessário ao atendimento", "Socorro"],
          ],
          linhasEmBranco: 2,
        },
      ],
    },
    {
      titulo: "6. Onde ficam guardados",
      blocos: [
        {
          tipo: "campos",
          colunas: 1,
          campos: [
            "Arquivo em papel — local, armário trancado? quem tem a chave",
            "Arquivo digital — onde fica, protegido por senha/criptografia? quem acessa",
            "Cópias e backups — onde ficam",
          ],
        },
      ],
    },
    {
      titulo: "7. Por quanto tempo",
      blocos: [
        {
          tipo: "campos",
          colunas: 1,
          campos: [
            "Fichas, termos e reconfirmações — guardados por ____ após a última participação",
            "Registros de intercorrência — guardados por ____",
            "Justificativa de cada prazo",
          ],
        },
        {
          tipo: "nota",
          cor: "amarelo",
          texto:
            "O prazo de retenção é **finito** e definido pelo templo com a assessoria jurídica. Ao fim do prazo, os dados são eliminados ou anonimizados. **Revisão jurídica pendente.**",
        },
      ],
    },
    {
      titulo: "8. Como são descartados",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Papel: fragmentação.",
            "Digital: exclusão definitiva, inclusive das cópias e backups.",
            "Registro de cada descarte: data, o que foi descartado e quem descartou.",
          ],
        },
      ],
    },
    {
      titulo: "9. Direitos do titular",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "O titular pode pedir confirmação do tratamento, acesso, correção, eliminação, informação sobre compartilhamento e revogação do consentimento (LGPD, art. 18), pelo contato do encarregado. Pedidos de eliminação são atendidos, salvo as hipóteses de conservação do art. 16 da LGPD confirmadas pela assessoria jurídica.",
        },
        { tipo: "campos", colunas: 1, campos: ["Prazo de resposta adotado pelo templo"] },
      ],
    },
    {
      titulo: "10. Incidentes de segurança",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "Em caso de incidente de segurança que possa causar risco ou dano relevante aos titulares (perda, vazamento ou acesso indevido às fichas), o templo comunica os titulares afetados e a Autoridade Nacional de Proteção de Dados (ANPD), conforme o art. 48 da LGPD.",
        },
        {
          tipo: "assinaturas",
          localData: true,
          assinantes: [{ rotulo: "Dirigente responsável", detalhe: `${ctx.temploDirigente} • vigência a partir desta data` }],
        },
      ],
    },
  ],
};
