/**
 * Documentos institucionais imprimíveis emitidos na homologação
 * Cooperativa Nativaram — Resolução CONAD nº 01/2010
 *
 * Gera HTML autônomo (A4, @media print) para "Salvar como PDF" ou impressão,
 * sem dependência de bibliotecas de PDF. Nunca inclui a senha gerada.
 */

import type { SolicitacaoAcesso } from "@/lib/db/homologacoes";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function esc(valor: string | undefined | null): string {
  return (valor ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

const ESTILO = `
  @page { size: A4; margin: 18mm; }
  body { font-family: Inter, Arial, sans-serif; color: #1C1917; line-height: 1.5; }
  h1 { font-family: Cinzel, Georgia, serif; color: #16281E; font-size: 20px; text-align: center; margin: 0 0 4px; }
  h2 { font-family: Cinzel, Georgia, serif; color: #16281E; font-size: 14px; border-bottom: 2px solid #D4A359; padding-bottom: 4px; margin-top: 22px; }
  .sub { text-align: center; font-size: 12px; color: #555; margin-bottom: 18px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td { padding: 6px 8px; border: 1px solid #ddd; vertical-align: top; }
  td.k { width: 34%; background: #F8F6F0; font-weight: 600; }
  p { font-size: 13px; text-align: justify; }
  .assin { display: flex; gap: 32px; margin-top: 48px; }
  .assin div { flex: 1; border-top: 1px solid #1C1917; text-align: center; font-size: 12px; padding-top: 4px; }
  .rodape { margin-top: 28px; font-size: 11px; color: #555; border-top: 1px solid #ddd; padding-top: 8px; }
`;

function linha(chave: string, valor: string | undefined | null): string {
  return `<tr><td class="k">${esc(chave)}</td><td>${esc(valor) || "—"}</td></tr>`;
}

function dataHoje(): string {
  return new Date().toLocaleDateString("pt-BR");
}

function moldura(titulo: string, corpo: string): string {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(titulo)}</title><style>${ESTILO}</style></head><body>${corpo}
  <p class="rodape">Cooperativa Nativaram — cooperativa sem fins lucrativos (Lei 5.764/71), amparada pela Resolução CONAD nº 01/2010. Conteúdo restrito a maiores de 18 anos e a templos credenciados. Documento de apoio institucional, emitido em ${dataHoje()}.</p>
  <script>window.addEventListener("load", function () { window.print(); });</script></body></html>`;
}

export function gerarTermoHomologacaoHtml(sol: SolicitacaoAcesso): string {
  const corpo = `
    <h1>Termo de Homologação Litúrgica</h1>
    <div class="sub">Cooperativa Nativaram • Protocolo ${esc(sol.id)}</div>
    <h2>Instituição Homologada</h2>
    <table>
      ${linha("Entidade", sol.nomeEntidade)}
      ${linha("Tipo", sol.tipo === "INSTITUICAO_FORMAL" ? "Instituição formal" : "Grupo em desenvolvimento")}
      ${linha("CNPJ", sol.cnpj)}
      ${linha("Dirigente responsável", sol.nomeResponsavel)}
      ${linha("Cidade / UF", `${sol.cidade} / ${sol.estado}`)}
      ${linha("Linhagem", sol.linhagem)}
      ${linha("Graduação pretendida", sol.graduacao)}
      ${linha("Partilha estimada", sol.volumeEstimado)}
      ${linha("Código de acesso ao portal", sol.loginGerado)}
      ${linha("Data da homologação", sol.dataHomologacao)}
    </table>
    <h2>Declaração do Conselho</h2>
    <p>O Conselho Gestor da Cooperativa Nativaram declara que a entidade acima identificada teve sua documentação analisada e foi homologada para participar do rateio logístico cooperativo de sacramentos tradicionais, em caráter exclusivamente religioso, sem finalidade comercial e sob observância da Resolução CONAD nº 01/2010.</p>
    <p>A entidade compromete-se a manter a custódia segura dos sacramentos, aplicar o protocolo de segurança integrativa aos participantes e não repassar os preparados a terceiros não credenciados.</p>
    <div class="assin"><div>Conselho Gestor<br>Cooperativa Nativaram</div><div>Dirigente responsável<br>${esc(sol.nomeResponsavel)}</div></div>`;
  return moldura(`Termo de Homologação ${sol.id}`, corpo);
}

export function gerarGuiaTransitoHtml(sol: SolicitacaoAcesso): string {
  const corpo = `
    <h1>Guia de Trânsito Cooperativo</h1>
    <div class="sub">Cooperativa Nativaram • Protocolo ${esc(sol.id)}</div>
    <h2>Origem e Destino</h2>
    <table>
      ${linha("Origem", "Cooperativa Nativaram — Cruzeiro do Sul / AC")}
      ${linha("Destino (templo credenciado)", sol.nomeEntidade)}
      ${linha("CNPJ do destino", sol.cnpj)}
      ${linha("Dirigente receptor", sol.nomeResponsavel)}
      ${linha("Cidade / UF de destino", `${sol.cidade} / ${sol.estado}`)}
    </table>
    <h2>Carga Sacramental</h2>
    <table>
      ${linha("Graduação", sol.graduacao)}
      ${linha("Quantidade partilhada", sol.volumeEstimado)}
      ${linha("Acondicionamento", "Garrafas PET 100% virgens de padrão alimentício, com lacres invioláveis")}
      ${linha("Conservação", "Transporte refrigerado")}
      ${linha("Data de emissão", dataHoje())}
    </table>
    <h2>Declaração</h2>
    <p>Declara-se que o material descrito destina-se exclusivamente a uso religioso por entidade credenciada, conforme a Resolução CONAD nº 01/2010, sem finalidade comercial. Este documento acompanha o despacho como apoio à identificação da carga e não substitui outras exigências do transportador.</p>
    <div class="assin"><div>Responsável pelo despacho<br>Cooperativa Nativaram</div><div>Recebimento no templo<br>${esc(sol.nomeResponsavel)}</div></div>`;
  return moldura(`Guia de Trânsito ${sol.id}`, corpo);
}

/** Abre o documento em nova janela e dispara a impressão (Salvar como PDF). */
export function imprimirDocumentoHtml(html: string): void {
  if (typeof window === "undefined") return;
  const janela = window.open("", "_blank", "noopener=no,width=900,height=1000");
  if (!janela) return;
  janela.document.open();
  janela.document.write(html);
  janela.document.close();
}

