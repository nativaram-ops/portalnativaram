import type { Bloco, ContextoDocumento, DocumentoModelo } from "./tipos";

export const MARCA_INSTITUCIONAL = "COOPERATIVA NATIVARAM";
export const LINHA_SISTEMA = "SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS";
export const LINHA_PREENCHIMENTO = "____________________";

/** "2026-11-02" → "02/11/2026" */
export function formatarDataVersao(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

/** Status de revisão exibido no rodapé de todo documento. */
export function statusRevisao(doc: DocumentoModelo): string {
  return doc.revisaoPendente.length > 0 ? doc.revisaoPendente.join(" · ") : "Revisado";
}

/** Rodapé obrigatório: versão + data + status de revisão (plano 010, B4). */
export function textoRodape(doc: DocumentoModelo): string {
  return `Cooperativa Nativaram · Documento ${doc.numero} · Versão ${doc.versao} de ${formatarDataVersao(
    doc.dataVersao
  )} · Status: ${statusRevisao(doc)}`;
}

export const LINHA_REVISOR = "Revisado por (nome e CRM/OAB): ________________________ Data: ____/____/______";

export const LINHA_LOCAL_DATA =
  "Local e Data: ______________________________, _____ de ____________________ de 20____";

function blocoParaMarkdown(bloco: Bloco, nivel: number): string {
  switch (bloco.tipo) {
    case "paragrafo":
      return bloco.texto;
    case "nota":
      return bloco.texto
        .split("\n")
        .map((l) => `> ${l}`)
        .join("  \n");
    case "lista":
      return bloco.itens.map((it, i) => (bloco.ordenada ? `${i + 1}. ${it}` : `- ${it}`)).join("\n");
    case "checklist":
      return bloco.itens.map((it) => `- [ ] ${it}`).join("\n");
    case "campos":
      return bloco.campos.map((c) => `**${c}:** ${LINHA_PREENCHIMENTO}`).join("  \n");
    case "tabela": {
      const cab = `| ${bloco.colunas.join(" | ")} |`;
      const sep = `| ${bloco.colunas.map(() => "---").join(" | ")} |`;
      const vazias = Array.from({ length: bloco.linhasEmBranco ?? 0 }, () =>
        bloco.colunas.map(() => " ")
      );
      const linhas = [...bloco.linhas, ...vazias].map((l) => `| ${l.join(" | ")} |`);
      return [cab, sep, ...linhas].join("\n");
    }
    case "grupo": {
      const titulo = `${"#".repeat(Math.min(nivel + 1, 6))} ${bloco.titulo}`;
      return [titulo, ...bloco.blocos.map((b) => blocoParaMarkdown(b, nivel + 1))].join("\n\n");
    }
    case "assinaturas": {
      const partes: string[] = [];
      if (bloco.localData) partes.push(LINHA_LOCAL_DATA);
      for (const a of bloco.assinantes) {
        partes.push(
          `________________________________________  \n**${a.rotulo}**${a.detalhe ? `  \n${a.detalhe}` : ""}`
        );
      }
      return partes.join("\n\n");
    }
  }
}

/** Gera o Markdown completo (download .md e cópia para Word/Docs) a partir da estrutura única. */
export function gerarMarkdown(doc: DocumentoModelo, ctx: ContextoDocumento): string {
  const partes: string[] = [
    `# ${MARCA_INSTITUCIONAL}`,
    `## ${LINHA_SISTEMA}`,
    `### DOCUMENTO ${doc.numero}: ${doc.titulo}`,
    `*${doc.subtitulo}*`,
    `**Templo / Núcleo:** ${ctx.temploNome} | **Registro:** ${ctx.temploRegistro} | **Cidade/UF:** ${ctx.temploCidade} | **Dirigente:** ${ctx.temploDirigente} | **Emissão:** ${ctx.dataEmissao}`,
  ];
  for (const secao of doc.montar(ctx)) {
    partes.push("---");
    if (secao.titulo) partes.push(`## ${secao.titulo}`);
    for (const bloco of secao.blocos) partes.push(blocoParaMarkdown(bloco, 2));
  }
  partes.push("---", `*${textoRodape(doc)}*  \n*${LINHA_REVISOR}*`);
  return partes.join("\n\n") + "\n";
}
