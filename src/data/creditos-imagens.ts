/**
 * Créditos das fotografias de terceiros usadas no site (AGENTS.md, regra 6).
 * A licença CC BY-SA 4.0 exige autor, título, link da licença, link da origem
 * e aviso de modificação. A página /transparencia lista estes créditos.
 *
 * "A confirmar": a URL exata da página do arquivo no Wikimedia Commons não foi
 * registrada no ADR-015 nem no commit 4eb0b53. Preencher antes da publicação.
 */
export interface CreditoImagem {
  arquivo: string;
  titulo: string;
  autor: string;
  licenca: string;
  licencaUrl: string;
  origemUrl: string;
  modificacao: string;
}

export const LICENCA_CC_BY_SA_4_URL = "https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br";

export const CREDITOS_IMAGENS: CreditoImagem[] = [
  {
    arquivo: "/assets/manifesto/cruzeiro-do-sul-rio-moa-acre.jpg",
    titulo: "Rio Moa e floresta no Parque Nacional da Serra do Divisor, Cruzeiro do Sul (AC)",
    autor: "Hector Bottai",
    licenca: "CC BY-SA 4.0",
    licencaUrl: LICENCA_CC_BY_SA_4_URL,
    origemUrl: "A confirmar",
    modificacao: "recortada e redimensionada; escurecida na exibição",
  },
  {
    arquivo: "/assets/manifesto/cruzeiro-do-sul-comunidade-acre.jpg",
    titulo: "Moradia ribeirinha junto a uma samaúma, Cruzeiro do Sul (AC)",
    autor: "Vanda Viveiros de Castro",
    licenca: "CC BY-SA 4.0",
    licencaUrl: LICENCA_CC_BY_SA_4_URL,
    origemUrl: "A confirmar",
    modificacao: "recortada e redimensionada; escurecida na exibição",
  },
];

export function creditoDaImagem(arquivo: string): CreditoImagem | undefined {
  return CREDITOS_IMAGENS.find((c) => c.arquivo === arquivo);
}
