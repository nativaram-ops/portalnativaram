/**
 * Utilitário de Exportação da Lista de Medicamentos Controlados & Interações com Ayahuasca
 * Cooperativa Nativaram — Salvaguarda Litúrgica (CONAD 01/2010)
 *
 * Suporta:
 * 1. Download em CSV (.csv UTF-8 com BOM, abre no Excel e no Google Planilhas)
 * 2. Geração de PDF A4 (janela dedicada pronta para "Salvar como PDF" ou impressão)
 *
 * O antigo download "Excel" era um HTML com a extensão trocada (o Excel abria com aviso de
 * formato inválido) e foi removido (plano 011, A9). Todas as contagens vêm dos dados.
 */

import {
  INTERACOES_MEDICAMENTOSAS,
  CRITERIOS_HUNTER,
  TOXICIDADE_LITIO,
  EXCECAO_DESINTOXICACAO_PDF,
  ROTULOS_EVIDENCIA,
  ROTULOS_MOTIVO,
  contarClasses,
  exemplosPorDiretriz,
  DiretrizOperacionalPdf,
  MotivoRestricao,
  NivelEvidencia,
  RevisaoClinica,
} from "../data/portal-assessoria";

interface InfoDiretriz {
  titulo: string;
  subtitulo: string;
  corHexFundo: string;
  corHexBorda: string;
  corHexTexto: string;
  ordem: number;
}

export const MAPA_DIRETRIZ_CORES: Record<DiretrizOperacionalPdf, InfoDiretriz> = {
  NAO_PODE_PARTICIPAR: {
    titulo: "🔴 VERMELHO — NÃO PODE PARTICIPAR (VETO ABSOLUTO)",
    subtitulo:
      "Incompatibilidade por risco grave de interação (crise serotoninérgica ou adrenérgica, convulsão) ou pela condição de saúde de base. Veja o motivo de cada entrada.",
    corHexFundo: "#FEE2E2",
    corHexBorda: "#DC2626",
    corHexTexto: "#7F1D1D",
    ordem: 1,
  },
  CASO_CLINICO_NAO_RECOMENDADO: {
    titulo: "🟠 LARANJA ESCURO — CASO CLÍNICO NÃO RECOMENDADO",
    subtitulo:
      "Hipnóticos 'Z' (risco de sonambulismo dissociativo e amnésia) e casos que dependem de avaliação médica individual, como cardiopatias em tratamento.",
    corHexFundo: "#FFEDD5",
    corHexBorda: "#EA580C",
    corHexTexto: "#7C2D12",
    ordem: 2,
  },
  INTERROMPER_DIAS_ANTES: {
    titulo: "🔵 AZUL — MEDICAÇÃO DEVE SER INTERROMPIDA DIAS ANTES (WASHOUT MÉDICO)",
    subtitulo:
      "Exige suspensão prévia exclusivamente com autorização e supervisão do médico assistente, respeitando o tempo de washout de cada entrada.",
    corHexFundo: "#E0F2FE",
    corHexBorda: "#0284C7",
    corHexTexto: "#0C4A6E",
    ordem: 3,
  },
  NAO_TOMAR_NO_DIA: {
    titulo: "🟡 AMARELO / LARANJA — NÃO TOMAR NO DIA DA SESSÃO",
    subtitulo:
      "Pausa no dia do trabalho, sem suspensão prolongada. Não suspender por conta própria quando houver dependência física.",
    corHexFundo: "#FEF3C7",
    corHexBorda: "#D97706",
    corHexTexto: "#78350F",
    ordem: 4,
  },
};

const ORDEM_DIRETRIZES: DiretrizOperacionalPdf[] = [
  "NAO_PODE_PARTICIPAR",
  "CASO_CLINICO_NAO_RECOMENDADO",
  "INTERROMPER_DIAS_ANTES",
  "NAO_TOMAR_NO_DIA",
];

const AVISO_LISTA_NAO_EXAUSTIVA =
  "Lista não exaustiva: um medicamento ou substância que não aparece aqui NÃO é, por isso, seguro. Na dúvida, consultar médico ou farmacêutico levando a bula.";

export interface LinhaMedicamentoIndividual {
  nomeComercial: string;
  principioAtivo: string;
  classeNumero: number;
  classeFarmacologica: string;
  diretriz: DiretrizOperacionalPdf;
  regraLabel: string;
  washoutMinimo: string;
  meiaVida: string;
  recomendacaoLiturgica: string;
  mecanismo: string;
  viasMetabolicas: string;
  motivo: MotivoRestricao;
  evidencia: NivelEvidencia;
  statusRevisao: RevisaoClinica["status"];
}

function rotuloRevisao(revisao: RevisaoClinica): string {
  if (revisao.status === "PENDENTE") return "Revisão clínica pendente";
  return `Revisado${revisao.responsavel ? ` por ${revisao.responsavel}` : ""}${revisao.data ? ` em ${revisao.data}` : ""}`;
}

/**
 * Gera a lista nominal (A-Z por cor) de todas as marcas comerciais cadastradas.
 * Entradas sem marca (ex.: substâncias cerimoniais e recreativas) geram uma linha com o princípio ativo.
 */
export function obterListaNominalMedicamentos(): LinhaMedicamentoIndividual[] {
  const linhas: LinhaMedicamentoIndividual[] = [];

  for (const item of INTERACOES_MEDICAMENTOSAS) {
    const diretriz: DiretrizOperacionalPdf = item.diretrizPdf || "INTERROMPER_DIAS_ANTES";
    const infoCor = MAPA_DIRETRIZ_CORES[diretriz];
    const nomes =
      item.nomesComerciais.length > 0
        ? item.nomesComerciais
        : [`${item.principioAtivo} (sem marca comercial)`];

    for (const nome of nomes) {
      linhas.push({
        nomeComercial: nome,
        principioAtivo: item.principioAtivo,
        classeNumero: item.classeNumero,
        classeFarmacologica: item.classeFarmacologica,
        diretriz,
        regraLabel: infoCor.titulo,
        washoutMinimo: item.washoutMinimo,
        meiaVida: item.meiaVida,
        recomendacaoLiturgica: item.recomendacaoLiturgica,
        mecanismo: item.mecanismo,
        viasMetabolicas: item.viasMetabolicas,
        motivo: item.motivo,
        evidencia: item.evidencia,
        statusRevisao: item.revisao.status,
      });
    }
  }

  return linhas.sort((a, b) => {
    const diffOrdem = MAPA_DIRETRIZ_CORES[a.diretriz].ordem - MAPA_DIRETRIZ_CORES[b.diretriz].ordem;
    if (diffOrdem !== 0) return diffOrdem;
    return a.nomeComercial.localeCompare(b.nomeComercial, "pt-BR");
  });
}

function escaparHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function baixarArquivo(conteudo: string, tipo: string, nomeArquivo: string): void {
  const blob = new Blob(["﻿" + conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Conteúdo do CSV (separador ";", aspas escapadas, quebras CRLF). Função pura, testável sem navegador.
 */
export function gerarCsvMedicamentos(): string {
  const listaNominal = obterListaNominalMedicamentos();
  const cabecalho = [
    "Medicamento / Marca Comercial",
    "Classificacao Oficial (4 Cores)",
    "Janela de Suspensao (Washout)",
    "Principio Ativo",
    "Classe Farmacologica",
    "Meia-Vida",
    "Conduta para o Dirigente",
    "Mecanismo Farmacologico",
    "Motivo da Restricao",
    "Nivel de Evidencia",
    "Status de Revisao Clinica",
  ];

  const escaparCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;

  return [
    cabecalho.map(escaparCsv).join(";"),
    ...listaNominal.map((m) =>
      [
        m.nomeComercial,
        m.regraLabel,
        m.washoutMinimo,
        m.principioAtivo,
        `Classe ${m.classeNumero} - ${m.classeFarmacologica}`,
        m.meiaVida,
        m.recomendacaoLiturgica,
        m.mecanismo,
        ROTULOS_MOTIVO[m.motivo],
        ROTULOS_EVIDENCIA[m.evidencia],
        m.statusRevisao === "PENDENTE" ? "Revisao clinica pendente" : "Revisado",
      ]
        .map(escaparCsv)
        .join(";")
    ),
  ].join("\r\n");
}

/**
 * 1. EXPORTAR ARQUIVO CSV (UTF-8 COM BOM PARA EXCEL E GOOGLE PLANILHAS)
 */
export function exportarMedicamentosCSV(): void {
  if (typeof window === "undefined") return;
  baixarArquivo(gerarCsvMedicamentos(), "text/csv;charset=utf-8", "Lista-Medicamentos-Ayahuasca-Nativaram.csv");
}

/**
 * 2. EXPORTAR / IMPRIMIR PDF A4 DA TABELA DE MEDICAMENTOS CONTROLADOS
 */
export function exportarMedicamentosPDF(): void {
  if (typeof window === "undefined") return;

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const totalClasses = contarClasses();
  const totalEntradas = INTERACOES_MEDICAMENTOSAS.length;
  const totalMarcas = INTERACOES_MEDICAMENTOSAS.reduce((acc, i) => acc + i.nomesComerciais.length, 0);
  const pendentes = INTERACOES_MEDICAMENTOSAS.filter((i) => i.revisao.status === "PENDENTE").length;

  const resumoCoresHtml = ORDEM_DIRETRIZES.map((dir) => {
    const info = MAPA_DIRETRIZ_CORES[dir];
    const exemplos = exemplosPorDiretriz(dir, 10);
    return `
          <div style="background:${info.corHexFundo}; border:1px solid ${info.corHexBorda}; padding:7px 10px; border-radius:6px; color:${info.corHexTexto};">
            <strong>${escaparHtml(info.titulo)}:</strong> ${escaparHtml(info.subtitulo)}
            ${exemplos.length ? `<br/><em>Ex.: ${escaparHtml(exemplos.join(", "))}.</em>` : ""}
          </div>`;
  }).join("");

  const blocosQuatroCoresHtml = ORDEM_DIRETRIZES.map((dir) => {
    const info = MAPA_DIRETRIZ_CORES[dir];
    const classesDoGrupo = INTERACOES_MEDICAMENTOSAS.filter(
      (i) => (i.diretrizPdf || "INTERROMPER_DIAS_ANTES") === dir
    );

    const itensHtml = classesDoGrupo
      .map((c) => {
        const fontesHtml = c.fontes.length
          ? `<br/><span style="color:#475569;">Fontes: ${c.fontes
              .map((f) => `${escaparHtml(f.titulo)} (${f.ano}) — ${escaparHtml(f.url)}`)
              .join("; ")}</span>`
          : "";
        return `
          <tr>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; font-weight:bold; width:20%; color:#0f172a;">
              <div style="font-size:8pt; color:#475569; text-transform:uppercase;">Classe ${c.classeNumero}</div>
              ${escaparHtml(c.classeFarmacologica)}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:18%; color:#1e293b;">
              ${escaparHtml(c.principioAtivo)}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:22%; font-weight:bold; color:#0f172a;">
              ${escaparHtml(c.nomesComerciais.length ? c.nomesComerciais.join(", ") : "Sem marca comercial")}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:24%; font-size:8.5pt;">
              <strong>Washout: ${escaparHtml(c.washoutMinimo)}</strong><br/>
              <span style="color:#334155;">${escaparHtml(c.recomendacaoLiturgica)}</span>
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:16%; font-size:8pt;">
              <strong>Motivo:</strong> ${escaparHtml(ROTULOS_MOTIVO[c.motivo])}<br/>
              <strong>Evidência:</strong> ${escaparHtml(ROTULOS_EVIDENCIA[c.evidencia])}<br/>
              <strong style="color:${c.revisao.status === "PENDENTE" ? "#b45309" : "#166534"};">${escaparHtml(rotuloRevisao(c.revisao))}</strong>
              ${fontesHtml}
            </td>
          </tr>
        `;
      })
      .join("");

    return `
        <div style="margin-bottom:18px; page-break-inside:avoid;">
          <div style="background:${info.corHexFundo}; border:2px solid ${info.corHexBorda}; color:${info.corHexTexto}; padding:8px 12px; border-radius:6px 6px 0 0;">
            <div style="font-size:10.5pt; font-weight:bold;">${escaparHtml(info.titulo)}</div>
            <div style="font-size:8.5pt; margin-top:2px;">${escaparHtml(info.subtitulo)}</div>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:9pt;">
            <thead>
              <tr style="background:#f1f5f9; color:#0f172a; text-align:left;">
                <th style="padding:6px 8px; border:1px solid #cbd5e1;">Classe Farmacológica</th>
                <th style="padding:6px 8px; border:1px solid #cbd5e1;">Princípios Ativos</th>
                <th style="padding:6px 8px; border:1px solid #cbd5e1;">Marcas Comerciais de Referência</th>
                <th style="padding:6px 8px; border:1px solid #cbd5e1;">Janela de Segurança &amp; Conduta</th>
                <th style="padding:6px 8px; border:1px solid #cbd5e1;">Motivo · Evidência · Revisão</th>
              </tr>
            </thead>
            <tbody>
              ${itensHtml}
            </tbody>
          </table>
        </div>
      `;
  }).join("");

  const htmlPdf = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Tabela de Medicamentos Controlados & Ayahuasca — Cooperativa Nativaram</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body {
            font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 16px;
            font-size: 9.5pt;
            line-height: 1.4;
          }
          .no-print-bar {
            background: #16281E;
            color: #F8F6F0;
            padding: 12px 18px;
            border-radius: 10px;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .btn-print {
            background: #D4A359;
            color: #16281E;
            border: none;
            padding: 9px 18px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 10pt;
          }
          @media print {
            .no-print-bar { display: none !important; }
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="no-print-bar">
          <div>
            <strong style="color:#D4A359; display:block;">Cooperativa Nativaram • Gerador de PDF (A4)</strong>
            <span style="font-size:9pt; color:#cbd5e1;">Selecione <strong>"Salvar como PDF"</strong> no destino da impressora para baixar o arquivo PDF no celular ou computador.</span>
          </div>
          <button class="btn-print" onclick="window.print()">Salvar como PDF / Imprimir</button>
        </div>

        <div style="border-bottom:2px solid #0f172a; padding-bottom:10px; margin-bottom:14px; text-align:center;">
          <div style="font-size:8.5pt; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:#475569;">
            COOPERATIVA NATIVARAM • SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
          </div>
          <h1 style="font-size:14pt; margin:4px 0; text-transform:uppercase; color:#0f172a;">
            TABELA DE MEDICAMENTOS CONTROLADOS, INTERAÇÕES E WASHOUT COM AYAHUASCA
          </h1>
          <div style="font-size:8.5pt; color:#334155;">
            Amparo: Resolução CONAD nº 01/2010 • ${totalClasses} Classes Farmacológicas • ${totalEntradas} Entradas • ${totalMarcas} Marcas Comerciais • Emissão: ${dataAtual}
          </div>
        </div>

        <div style="border:2px solid #b45309; background:#fffbeb; color:#78350f; padding:8px 12px; border-radius:6px; margin-bottom:14px; font-size:8.5pt;">
          <strong>${escaparHtml(AVISO_LISTA_NAO_EXAUSTIVA)}</strong><br/>
          Revisão clínica pendente em ${pendentes} de ${totalEntradas} entradas: o conteúdo ainda não foi conferido por médico ou farmacêutico.
          Nível de evidência: A ensaio clínico · B série ou relato de caso · C farmacologia ou bula · D extrapolação.
        </div>

        <!-- RESUMO DAS 4 CORES (exemplos tirados dos dados) -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:14px; font-size:8.5pt;">
          ${resumoCoresHtml}
        </div>

        <!-- ALERTA DE DESINTOXICAÇÃO E LIMBITROL -->
        <div style="background:#f8fafc; border-left:4px solid #D4A359; border:1px solid #cbd5e1; padding:8px 12px; margin-bottom:14px; font-size:8.5pt;">
          <strong>📌 ${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.titulo)}:</strong> ${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.descricao)}<br/>
          <strong style="color:#b91c1c;">⚠️ ATENÇÃO ESPECIAL AO LIMBITROL:</strong> Embora contenha Clordiazepóxido (ansiolítico), o <em>Limbitrol</em> possui <strong>Amitriptilina (Antidepressivo Tricíclico)</strong> em sua fórmula — portanto exige <strong>washout de 21 dias</strong> como os tricíclicos, jamais devendo ser tratado como ansiolítico comum!
        </div>

        ${blocosQuatroCoresHtml}

        <!-- RODAPÉ DE EMERGÊNCIA MÉDICA -->
        <div style="border:2px solid #b91c1c; background:#fef2f2; padding:10px 12px; border-radius:6px; font-size:8.5pt; page-break-inside:avoid;">
          <strong style="color:#991b1b; text-transform:uppercase; display:block; margin-bottom:4px;">
            🚨 PROTOCOLO DE EMERGÊNCIA MÉDICA (SAMU 192) — LÍTIO &amp; CRITÉRIOS DE HUNTER (SÍNDROME SEROTONINÉRGICA)
          </strong>
          <div style="margin-bottom:4px;">
            <strong>Carbonato de Lítio:</strong> ${escaparHtml(TOXICIDADE_LITIO.resumo)} ${escaparHtml(TOXICIDADE_LITIO.incidenciaConvulsao)}
          </div>
          <div>
            <strong>Critérios de Hunter (Acionar SAMU 192 e Posição Lateral de Segurança - PLS):</strong> ${CRITERIOS_HUNTER.map((c) => escaparHtml(c)).join(" | ")}
          </div>
        </div>
      </body>
    </html>
  `;

  const printWin = window.open("", "_blank", "width=1024,height=800");
  if (printWin) {
    printWin.document.open();
    printWin.document.write(htmlPdf);
    printWin.document.close();
    setTimeout(() => {
      printWin.focus();
      printWin.print();
    }, 350);
  } else {
    window.print();
  }
}
