import { obterCotaRateio, VALORES_APOIO_LITURGICO } from "../data/graduacoes";
import { RAPES_TRADICIONAIS } from "../data/sacramentos";

interface ItemParaRateio {
  id: string;
  tipo: "GRADUACAO_AYAHUASCA" | "SACRAMENTO_REDUZIDO" | "RAPE_SAGRADO" | "ARTEFATO_SAGRADO";
  quantidade: number;
}

const IDS_RAPE = new Set(RAPES_TRADICIONAIS.map((r) => r.id));

/**
 * Valor unitário oficial de um item do pedido, pela tabela da cooperativa.
 * O valor enviado pelo navegador nunca é usado. Item fora do catálogo gera erro.
 */
export function rateioUnitarioOficial(item: ItemParaRateio): number {
  switch (item.tipo) {
    case "GRADUACAO_AYAHUASCA":
    case "SACRAMENTO_REDUZIDO":
      return obterCotaRateio(item.id, item.quantidade).valorUnitario;
    case "RAPE_SAGRADO":
      if (IDS_RAPE.has(item.id)) return VALORES_APOIO_LITURGICO.rapeFrasco25g;
      break;
    case "ARTEFATO_SAGRADO":
      if (item.id === "KURIPE_TRADICIONAL") return VALORES_APOIO_LITURGICO.kuripeUnidade;
      break;
  }
  throw new Error(`Item fora do catálogo da cooperativa: "${item.id}"`);
}
