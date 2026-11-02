import { DATA_VERSAO, REVISAO_JURIDICA, VERSAO_REVISADA } from "./comuns";
import type { DocumentoModelo } from "./tipos";

export const docTransito: DocumentoModelo = {
  id: "TRANSITO",
  numero: "04",
  rotuloCurto: "Trânsito Litúrgico",
  resumo: "Transporte nacional do sacramento para culto religioso",
  icone: "transito",
  titulo: "DECLARAÇÃO DE TRANSPORTE LITÚRGICO E CUSTÓDIA DE SACRAMENTO SAGRADO",
  subtitulo:
    "Transporte em território nacional, sem fins lucrativos, para culto religioso • CONAD 01/2010 • Lei nº 5.764/1971",
  versao: VERSAO_REVISADA,
  dataVersao: DATA_VERSAO,
  revisaoPendente: [`${REVISAO_JURIDICA}: âmbito do transporte aéreo`],
  arquivo: "nativaram-doc04-transito-liturgico",
  montar: (ctx) => [
    {
      blocos: [
        {
          tipo: "nota",
          texto:
            "**Âmbito:** documento de procedência para deslocamentos em território nacional com sacramento destinado a culto religioso (Resolução CONAD nº 01/2010; art. 5º, VI, da CF/88; art. 2º, parágrafo único, da Lei nº 11.343/2006). Verifique as regras da companhia aérea para transporte de líquidos. **Transporte internacional não está coberto por esta declaração.**",
        },
        {
          tipo: "paragrafo",
          texto:
            "Declaro, perante autoridades policiais, aeroportuárias e sanitárias, que os recipientes lacrados e identificados que acompanham esta declaração contêm exclusivamente o sacramento tradicional denominado **AYAHUASCA** (Santo Daime / Vegetal / Hoasca).",
        },
      ],
    },
    {
      titulo: "1. Entidade religiosa destinatária",
      blocos: [
        {
          tipo: "lista",
          itens: [
            `**Congregação / templo:** ${ctx.temploNome}`,
            `**Registro / protocolo:** ${ctx.temploRegistro}`,
            `**Município / UF de destino:** ${ctx.temploCidade}`,
            `**Dirigente responsável pela custódia:** ${ctx.temploDirigente}`,
          ],
        },
      ],
    },
    {
      titulo: "2. Origem e rastreabilidade do lote",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "**Origem do feitio:** Cruzeiro do Sul/AC (Vale do Juruá) — Cooperativa Nativaram.",
            "**Composição botânica:** decocção aquosa de *Banisteriopsis caapi* (jagube/mariri) e *Psychotria viridis* (chacrona/rainha), sem substâncias sintéticas ou aditivos.",
          ],
        },
        {
          tipo: "campos",
          colunas: 2,
          campos: [
            "Identificação do lote",
            "Graduação",
            "Quantidade de recipientes",
            "Volume total (litros)",
            "Modal: [ ] aéreo (bagagem despachada lacrada) [ ] terrestre",
            "Período do deslocamento",
          ],
        },
      ],
    },
    {
      titulo: "3. Natureza não comercial",
      blocos: [
        {
          tipo: "paragrafo",
          texto:
            "O sacramento acima **não constitui mercadoria**, não tem preço de venda e destina-se exclusivamente às cerimônias da congregação qualificada, protegidas pela liberdade de culto (art. 5º, VI e VIII, da CF/88), pela Resolução CONAD nº 01/2010 e pelo art. 2º, parágrafo único, da Lei nº 11.343/2006.",
        },
        {
          tipo: "paragrafo",
          texto: `Local e data: ${ctx.temploCidade}, ${ctx.dataEmissao}`,
        },
        {
          tipo: "assinaturas",
          assinantes: [
            {
              rotulo: ctx.temploDirigente,
              detalhe: `Dirigente litúrgico responsável • ${ctx.temploNome}`,
            },
          ],
        },
      ],
    },
  ],
};
