/**
 * Utilitário Oficial de Exportação da Lista de Medicamentos Controlados & Interações com Ayahuasca
 * Cooperativa Nativaram — Salvaguarda Litúrgica (CONAD 01/2010)
 *
 * Suporta:
 * 1. Download em Planilha Excel (.xls formatado com as 4 cores oficiais + Índice Nominal A-Z de +185 marcas)
 * 2. Download em CSV Universal (.csv UTF-8 com BOM compatível com Excel e Google Sheets)
 * 3. Geração de PDF Oficial A4 (Janela vetorial dedicada pronta para "Salvar como PDF" ou Impressão)
 */

import {
  INTERACOES_MEDICAMENTOSAS,
  CRITERIOS_HUNTER,
  TOXICIDADE_LITIO,
  EXCECAO_DESINTOXICACAO_PDF,
  DiretrizOperacionalPdf,
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
      "Incompatibilidade absoluta por risco de Status Epilepticus, crise serotoninérgica/adrenérgica letal ou descompensação psicótica.",
    corHexFundo: "#FEE2E2",
    corHexBorda: "#DC2626",
    corHexTexto: "#7F1D1D",
    ordem: 1,
  },
  CASO_CLINICO_NAO_RECOMENDADO: {
    titulo: "🟠 LARANJA ESCURO — CASO CLÍNICO NÃO RECOMENDADO (DROGAS-Z)",
    subtitulo:
      "Hipnóticos indutores de sono não-benzodiazepínicos (Zolpidem/Zopiclona/Eszopiclona). Risco de sonambulismo dissociativo e amnésia.",
    corHexFundo: "#FFEDD5",
    corHexBorda: "#EA580C",
    corHexTexto: "#7C2D12",
    ordem: 2,
  },
  INTERROMPER_DIAS_ANTES: {
    titulo: "🔵 AZUL — MEDICAÇÃO DEVE SER INTERROMPIDA DIAS ANTES (WASHOUT MÉDICO)",
    subtitulo:
      "Exige suspensão prévia exclusivamente com autorização e supervisão do médico assistente respeitando o tempo de washout (5 a 7 meias-vidas).",
    corHexFundo: "#E0F2FE",
    corHexBorda: "#0284C7",
    corHexTexto: "#0C4A6E",
    ordem: 3,
  },
  NAO_TOMAR_NO_DIA: {
    titulo: "🟡 AMARELO / LARANJA — NÃO TOMAR NO DIA DA SESSÃO (PAUSA 24H-48H)",
    subtitulo:
      "Ansiolíticos benzodiazepínicos, relaxantes musculares, descongestionantes e manejo de anti-hipertensivos no dia do trabalho.",
    corHexFundo: "#FEF3C7",
    corHexBorda: "#D97706",
    corHexTexto: "#78350F",
    ordem: 4,
  },
};

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
}

/**
 * Gera a lista expandida nominal (A-Z) de todos os medicamentos e marcas comerciais cadastrados
 */
export function obterListaNominalMedicamentos(): LinhaMedicamentoIndividual[] {
  const linhas: LinhaMedicamentoIndividual[] = [];

  for (const item of INTERACOES_MEDICAMENTOSAS) {
    const diretriz: DiretrizOperacionalPdf =
      item.diretrizPdf || "INTERROMPER_DIAS_ANTES";
    const infoCor = MAPA_DIRETRIZ_CORES[diretriz];

    for (const marca of item.nomesComerciais) {
      linhas.push({
        nomeComercial: marca,
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
      });
    }
  }

  return linhas.sort((a, b) => {
    const diffOrdem =
      MAPA_DIRETRIZ_CORES[a.diretriz].ordem -
      MAPA_DIRETRIZ_CORES[b.diretriz].ordem;
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

/**
 * 1. EXPORTAR PLANILHA EXCEL (.XLS FORMATADO COM AS 4 CORES OFICIAIS)
 */
export function exportarMedicamentosExcel(): void {
  if (typeof window === "undefined") return;

  const dataAtual = new Date().toLocaleDateString("pt-BR");
  const listaNominal = obterListaNominalMedicamentos();

  const linhasClassesHtml = INTERACOES_MEDICAMENTOSAS.map((item) => {
    const diretriz: DiretrizOperacionalPdf =
      item.diretrizPdf || "INTERROMPER_DIAS_ANTES";
    const cor = MAPA_DIRETRIZ_CORES[diretriz];
    return `
      <tr>
        <td style="background:${cor.corHexFundo}; color:${cor.corHexTexto}; font-weight:bold; border:1px solid #cbd5e1; padding:8px; text-align:center;">
          Classe ${item.classeNumero}
        </td>
        <td style="background:${cor.corHexFundo}; color:${cor.corHexTexto}; font-weight:bold; border:1px solid #cbd5e1; padding:8px;">
          ${escaparHtml(cor.titulo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; font-weight:bold;">
          ${escaparHtml(item.classeFarmacologica)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px;">
          ${escaparHtml(item.principioAtivo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; font-weight:bold;">
          ${escaparHtml(item.nomesComerciais.join(", "))}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px; font-weight:bold; color:#0f172a;">
          ${escaparHtml(item.washoutMinimo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px;">
          ${escaparHtml(item.meiaVida)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px;">
          ${escaparHtml(item.recomendacaoLiturgica)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:8px;">
          ${escaparHtml(item.mecanismo)}
        </td>
      </tr>
    `;
  }).join("");

  const linhasNominaisHtml = listaNominal
    .map((m) => {
      const cor = MAPA_DIRETRIZ_CORES[m.diretriz];
      return `
      <tr>
        <td style="border:1px solid #cbd5e1; padding:6px 8px; font-weight:bold; color:#0f172a;">
          ${escaparHtml(m.nomeComercial)}
        </td>
        <td style="background:${cor.corHexFundo}; color:${cor.corHexTexto}; font-weight:bold; border:1px solid #cbd5e1; padding:6px 8px;">
          ${escaparHtml(cor.titulo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px; font-weight:bold;">
          ${escaparHtml(m.washoutMinimo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px;">
          ${escaparHtml(m.principioAtivo)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px;">
          Classe ${m.classeNumero} - ${escaparHtml(m.classeFarmacologica)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px;">
          ${escaparHtml(m.meiaVida)}
        </td>
        <td style="border:1px solid #cbd5e1; padding:6px 8px;">
          ${escaparHtml(m.recomendacaoLiturgica)}
        </td>
      </tr>
    `;
    })
    .join("");

  const htmlExcel = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Medicamentos e Washout</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
          th { background-color: #16281E; color: #F8F6F0; font-weight: bold; padding: 10px 8px; border: 1px solid #0f172a; text-align: left; }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td colspan="9" style="background:#16281E; color:#D4A359; font-size:15pt; font-weight:bold; padding:12px;">
              COOPERATIVA ETNOBOTÂNICA NATIVARAM — TABELA OFICIAL DE MEDICAMENTOS CONTROLADOS E INTERAÇÕES COM AYAHUASCA
            </td>
          </tr>
          <tr>
            <td colspan="9" style="background:#f8fafc; color:#334155; font-size:10pt; padding:8px; border:1px solid #cbd5e1;">
              Documento Técnico de Triagem Litúrgica e Redução de Danos (Amparo Resolução CONAD nº 01/2010) • Atualizado em ${dataAtual} • Total: 20 Classes Farmacológicas e ${listaNominal.length} Marcas/Princípios Ativos
            </td>
          </tr>
          <tr>
            <td colspan="9" style="background:#FEF3C7; color:#78350F; font-size:10pt; font-weight:bold; padding:8px; border:1px solid #D97706;">
              NOTA DE EXCEÇÃO CLÍNICA (${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.titulo)}): ${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.descricao)}
            </td>
          </tr>
        </table>

        <h3>PARTE 1: ÍNDICE NOMINAL COMPLETO POR MEDICAMENTO / MARCA COMERCIAL (${listaNominal.length} ITENS)</h3>
        <table>
          <thead>
            <tr>
              <th>Medicamento / Marca Comercial</th>
              <th>Classificação de Risco (4 Cores)</th>
              <th>Janela de Suspensão (Washout)</th>
              <th>Princípio Ativo &amp; Grupo</th>
              <th>Classe Farmacológica</th>
              <th>Meia-Vida (t½)</th>
              <th>Conduta Obrigatória da Dirigência</th>
            </tr>
          </thead>
          <tbody>
            ${linhasNominaisHtml}
          </tbody>
        </table>

        <h3>PARTE 2: MATRIZ TÉCNICA CONSOLIDADA DAS 20 CLASSES FARMACOLÓGICAS</h3>
        <table>
          <thead>
            <tr>
              <th>Nº Classe</th>
              <th>Classificação (4 Cores)</th>
              <th>Classe Farmacológica</th>
              <th>Princípio Ativo</th>
              <th>Principais Nomes Comerciais</th>
              <th>Janela Mínima de Washout</th>
              <th>Meia-Vida (t½)</th>
              <th>Conduta Litúrgica &amp; Triagem</th>
              <th>Mecanismo Farmacológico &amp; CYP450</th>
            </tr>
          </thead>
          <tbody>
            ${linhasClassesHtml}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob(["\uFEFF" + htmlExcel], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tabela-Medicamentos-Controlados-Ayahuasca-Nativaram.xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 2. EXPORTAR ARQUIVO CSV UNIVERSAL (UTF-8 COM BOM PARA EXCEL E GOOGLE SHEETS)
 */
export function exportarMedicamentosCSV(): void {
  if (typeof window === "undefined") return;

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
  ];

  const escaparCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;

  const linhasCsv = [
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
      ]
        .map(escaparCsv)
        .join(";")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + linhasCsv], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Lista-Medicamentos-Ayahuasca-Nativaram.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 3. EXPORTAR / IMPRIMIR PDF OFICIAL A4 DA TABELA DE MEDICAMENTOS CONTROLADOS
 */
export function exportarMedicamentosPDF(): void {
  if (typeof window === "undefined") return;

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const gruposPorCor: DiretrizOperacionalPdf[] = [
    "NAO_PODE_PARTICIPAR",
    "CASO_CLINICO_NAO_RECOMENDADO",
    "INTERROMPER_DIAS_ANTES",
    "NAO_TOMAR_NO_DIA",
  ];

  const blocosQuatroCoresHtml = gruposPorCor
    .map((dir) => {
      const info = MAPA_DIRETRIZ_CORES[dir];
      const classesDoGrupo = INTERACOES_MEDICAMENTOSAS.filter(
        (i) => (i.diretrizPdf || "INTERROMPER_DIAS_ANTES") === dir
      );

      const itensHtml = classesDoGrupo
        .map(
          (c) => `
          <tr>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; font-weight:bold; width:24%; color:#0f172a;">
              <div style="font-size:8pt; color:#475569; text-transform:uppercase;">Classe ${c.classeNumero}</div>
              ${escaparHtml(c.classeFarmacologica)}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:22%; color:#1e293b;">
              ${escaparHtml(c.principioAtivo)}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:30%; font-weight:bold; color:#0f172a;">
              ${escaparHtml(c.nomesComerciais.join(", "))}
            </td>
            <td style="padding:7px 8px; border:1px solid #cbd5e1; width:24%; font-size:8.5pt;">
              <strong>Washout: ${escaparHtml(c.washoutMinimo)}</strong><br/>
              <span style="color:#334155;">${escaparHtml(c.recomendacaoLiturgica)}</span>
            </td>
          </tr>
        `
        )
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
              </tr>
            </thead>
            <tbody>
              ${itensHtml}
            </tbody>
          </table>
        </div>
      `;
    })
    .join("");

  const htmlPdf = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Tabela Oficial de Medicamentos Controlados & Ayahuasca — Cooperativa Nativaram</title>
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
            <strong style="color:#D4A359; display:block;">Cooperativa Nativaram • Gerador de PDF Oficial (A4)</strong>
            <span style="font-size:9pt; color:#cbd5e1;">Selecione <strong>"Salvar como PDF"</strong> no destino da impressora para baixar o arquivo PDF no celular ou computador.</span>
          </div>
          <button class="btn-print" onclick="window.print()">Salvar como PDF / Imprimir</button>
        </div>

        <div style="border-bottom:2px solid #0f172a; padding-bottom:10px; margin-bottom:14px; text-align:center;">
          <div style="font-size:8.5pt; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:#475569;">
            COOPERATIVA ETNOBOTÂNICA NATIVARAM • SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
          </div>
          <h1 style="font-size:14pt; margin:4px 0; text-transform:uppercase; color:#0f172a;">
            TABELA OFICIAL DE MEDICAMENTOS CONTROLADOS, INTERAÇÕES E WASHOUT COM AYAHUASCA
          </h1>
          <div style="font-size:8.5pt; color:#334155;">
            Amparo Deontológico: Resolução CONAD nº 01/2010 • 20 Classes Farmacológicas • Mais de 185 Medicamentos e Marcas Comerciais • Emissão: ${dataAtual}
          </div>
        </div>

        <!-- RESUMO DAS 4 CORES -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:14px; font-size:8.5pt;">
          <div style="background:#FEE2E2; border:1px solid #DC2626; padding:7px 10px; border-radius:6px; color:#7F1D1D;">
            <strong>🔴 VERMELHO — NÃO PODE PARTICIPAR:</strong> Lítio (<em>Carbolitium</em>), Antipsicóticos (<em>Haldol, Risperdal, Seroquel, Zyprexa, Leponex</em>), Anticonvulsivantes (<em>Depakene, Tegretol, Hidantal, Gardenal, Lamictal</em>), Antiparkinsonianos (<em>Prolopa</em>), Antidepressivos ISRS/IRSN/Tricíclicos/IMAO em uso ativo.
          </div>
          <div style="background:#FFEDD5; border:1px solid #EA580C; padding:7px 10px; border-radius:6px; color:#7C2D12;">
            <strong>🟠 LARANJA ESCURO — CASO CLÍNICO NÃO RECOMENDADO:</strong> Hipnóticos "Z" (<em>Zolpidem/Stilnox, Patz, Zopiclona, Eszopiclona</em>). Risco de sonambulismo dissociativo e amnésia anterógrada.
          </div>
          <div style="background:#E0F2FE; border:1px solid #0284C7; padding:7px 10px; border-radius:6px; color:#0C4A6E;">
            <strong>🔵 AZUL — INTERROMPER DIAS ANTES (WASHOUT MÉDICO):</strong> Estimulantes TDAH (<em>Ritalina, Concerta, Venvanse</em>), Opioides (<em>Tramadol</em>), Triptanos (<em>Sumax, Naramig, Cefaliv</em>), Antibiótico <em>Linezolida</em>, Antieméticos (<em>Vonau, Plasil</em>), Canetas GLP-1 (<em>Ozempic, Mounjaro</em>) e Desmame Médico de Antidepressivos.
          </div>
          <div style="background:#FEF3C7; border:1px solid #D97706; padding:7px 10px; border-radius:6px; color:#78350F;">
            <strong>🟡 AMARELO — NÃO TOMAR NO DIA (PAUSA 24H-48H):</strong> Benzodiazepínicos (<em>Rivotril, Frontal, Lexotan, Diazepam, Lorax, Olcadil, Rohypnol, Dormonid</em>), Relaxantes Musculares (<em>Miosan, Dorflex, Torsilax</em>) e Descongestionantes (<em>Neosoro, Naridrin, Decongex</em>).
          </div>
        </div>

        <!-- ALERTA DE DESINTOXICAÇÃO E LIMBITROL -->
        <div style="background:#f8fafc; border-left:4px solid #D4A359; border:1px solid #cbd5e1; padding:8px 12px; margin-bottom:14px; font-size:8.5pt;">
          <strong>📌 ${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.titulo)}:</strong> ${escaparHtml(EXCECAO_DESINTOXICACAO_PDF.descricao)}<br/>
          <strong style="color:#b91c1c;">⚠️ ATENÇÃO ESPECIAL AO LIMBITROL:</strong> Embora contenha Clordiazepóxido (ansiolítico), o <em>Limbitrol</em> possui <strong>Amitriptilina (Antidepressivo Tricíclico)</strong> em sua fórmula — portanto é classificado no grupo <strong>🔴 VETO / 🔵 WASHOUT DE 21 DIAS</strong>, jamais devendo ser tratado como ansiolítico comum!
        </div>

        ${blocosQuatroCoresHtml}

        <!-- RODAPÉ DE EMERGÊNCIA MÉDICA -->
        <div style="border:2px solid #b91c1c; background:#fef2f2; padding:10px 12px; border-radius:6px; font-size:8.5pt; page-break-inside:avoid;">
          <strong style="color:#991b1b; text-transform:uppercase; display:block; margin-bottom:4px;">
            🚨 PROTOCOLO DE EMERGÊNCIA MÉDICA (SAMU 192) — LÍTIO &amp; CRITÉRIOS DE HUNTER (SÍNDROME SEROTONINÉRGICA)
          </strong>
          <div style="margin-bottom:4px;">
            <strong>Carbonato de Lítio:</strong> ${escaparHtml(TOXICIDADE_LITIO.resumo)}
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
