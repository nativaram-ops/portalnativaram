import { DATA_VERSAO, REVISAO_CLINICA, VERSAO_NOVA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docPlanoEmergencia: DocumentoModelo = {
  id: "PLANO_EMERGENCIA",
  numero: "08",
  rotuloCurto: "Plano de Emergência",
  resumo: "Hospital, SAMU, quem acompanha, kit e registro de intercorrência",
  icone: "emergencia",
  titulo: "PLANO DE EMERGÊNCIA DO LOCAL E REGISTRO DE INTERCORRÊNCIA",
  subtitulo: "Parte I: preencher antes de cada sessão (ou quando algo mudar) • Parte II: preencher a cada intercorrência",
  versao: VERSAO_NOVA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_CLINICA}: conteúdo do kit e roteiro de atendimento`],
  arquivo: "nativaram-doc08-plano-emergencia",
  montar: (ctx) => [
    {
      titulo: "Parte I: Plano de emergência do local",
      blocos: [
        {
          tipo: "campos",
          colunas: 1,
          campos: [
            `Local da sessão (${ctx.temploNome}) — endereço completo para o SAMU`,
            "Ponto de referência e acesso para ambulância",
            "Hospital com pronto-socorro mais próximo — nome, endereço e telefone",
            "Tempo de deslocamento até o hospital (minutos, de carro)",
            "Unidade alternativa (UPA ou outro hospital) — nome e endereço",
          ],
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Quem liga para o SAMU 192 (nome e telefone)",
            "Substituto(a)",
            "Quem acompanha a pessoa ao hospital",
            "Veículo disponível e motorista que não ingeriu o sacramento",
            "Pessoa(s) treinada(s) em primeiros socorros / RCP",
            "Onde fica o kit",
          ],
        },
        {
          tipo: "grupo",
          titulo: "Kit disponível",
          cor: "neutro",
          blocos: [
            {
              tipo: "checklist",
              itens: [
                "Esfigmomanômetro (aparelho de pressão)",
                "Oxímetro de pulso",
                "Termômetro",
                "Glicosímetro com fitas",
                "Açúcar ou mel, água e sais de reidratação",
                "Cobertores e lanterna",
                "Cópias das fichas (Doc 01) e Cartões para a equipe de saúde (Doc 10)",
                "Telefone com sinal e bateria",
                "Desfibrilador externo automático (DEA): [ ] não há [ ] há — local: ________",
              ],
            },
          ],
        },
        {
          tipo: "grupo",
          titulo: "Roteiro da ligação para o SAMU 192",
          cor: "vermelho",
          blocos: [
            {
              tipo: "lista",
              ordenada: true,
              itens: [
                "Endereço completo e ponto de referência.",
                "Idade da pessoa e o que está acontecendo agora.",
                "Que a pessoa ingeriu ayahuasca (IMAO-A reversível + DMT) e o horário.",
                "Medicamentos de uso contínuo e alergias (ver ficha).",
                "Seguir as orientações do médico regulador e não oferecer medicamentos por conta própria.",
              ],
            },
          ],
        },
      ],
    },
    {
      titulo: "Parte II: Registro de intercorrência",
      blocos: [
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Data | Sessão (ata nº)",
            "Nome do(a) participante",
            "Hora do início do quadro",
            "Quem registrou",
          ],
        },
        { tipo: "campos", colunas: 1, campos: ["O que aconteceu (descrição objetiva)"] },
        {
          tipo: "tabela",
          colunas: ["Hora", "PA", "FC", "SpO2", "Temperatura", "Glicemia", "Consciência"],
          linhas: [],
          linhasEmBranco: 4,
        },
        {
          tipo: "tabela",
          colunas: ["Hora", "Conduta", "Responsável"],
          linhas: [],
          linhasEmBranco: 4,
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "SAMU acionado? [ ] NÃO [ ] SIM — hora",
            "Destino: [ ] alta no local [ ] hospital (nome)",
            "Contato de emergência avisado? — hora",
            "Desfecho conhecido",
          ],
        },
        {
          tipo: "campos",
          colunas: 1,
          campos: ["Aprendizado para a triagem (o que a ficha ou a reconfirmação D-0 poderia ter detectado)"],
        },
        {
          tipo: "assinaturas",
          assinantes: [
            { rotulo: "Dirigente responsável", detalhe: ctx.temploDirigente },
            { rotulo: "Quem registrou", detalhe: "Nome e função" },
          ],
        },
      ],
    },
  ],
};
