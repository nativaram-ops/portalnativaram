"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Info,
  ChevronDown,
  ChevronUp,
  Scale,
  HeartPulse,
  Users,
  FileSpreadsheet,
  Pill,
  Stethoscope,
  ClipboardCheck,
  Siren,
  BookOpen,
  IdCard,
  Lock,
} from "lucide-react";
import { TemploMock } from "@/data/portal-mock";
import {
  exportarMedicamentosCSV,
  exportarMedicamentosPDF,
} from "@/lib/export-medicamentos";
import {
  DOCUMENTOS_CENTRAL,
  JUSTIFICATIVAS_DOCUMENTOS,
  LINHA_LOCAL_DATA,
  LINHA_REVISOR,
  LINHA_SISTEMA,
  MARCA_INSTITUCIONAL,
  gerarMarkdown,
  textoRodape,
  type Bloco,
  type ContextoDocumento,
  type CorDestaque,
  type IconeDocumento,
  type Justificativa,
} from "@/data/documentos";

interface PortalCentralDocumentosProps {
  templo: TemploMock;
}

const ICONES: Record<IconeDocumento, React.ReactNode> = {
  anamnese: <HeartPulse className="h-4 w-4 text-rose-400 shrink-0" />,
  termo: <Scale className="h-4 w-4 text-ambar-400 shrink-0" />,
  ata: <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />,
  transito: <Building2 className="h-4 w-4 text-blue-400 shrink-0" />,
  menores: <Users className="h-4 w-4 text-purple-400 shrink-0" />,
  parecer: <Stethoscope className="h-4 w-4 text-sky-400 shrink-0" />,
  reconfirmacao: <ClipboardCheck className="h-4 w-4 text-emerald-400 shrink-0" />,
  emergencia: <Siren className="h-4 w-4 text-rose-400 shrink-0" />,
  guia: <BookOpen className="h-4 w-4 text-ambar-400 shrink-0" />,
  cartao: <IdCard className="h-4 w-4 text-rose-400 shrink-0" />,
  privacidade: <Lock className="h-4 w-4 text-emerald-400 shrink-0" />,
};

const COR_JUSTIFICATIVA: Record<Justificativa["cor"], string> = {
  rose: "text-rose-400",
  sky: "text-sky-400",
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  purple: "text-purple-400",
  slate: "text-areia-200",
};

const COR_GRUPO: Record<CorDestaque, { caixa: string; titulo: string }> = {
  vermelho: { caixa: "border-2 border-rose-600 bg-rose-50/70", titulo: "border-rose-300 text-rose-950" },
  laranja: { caixa: "border-2 border-orange-500 bg-orange-50/70", titulo: "border-orange-300 text-orange-950" },
  azul: { caixa: "border-2 border-sky-600 bg-sky-50/70", titulo: "border-sky-300 text-sky-950" },
  amarelo: { caixa: "border-2 border-amber-500 bg-amber-50/70", titulo: "border-amber-300 text-amber-950" },
  roxo: { caixa: "border-2 border-purple-600 bg-purple-50", titulo: "border-purple-300 text-purple-950" },
  neutro: { caixa: "border border-slate-200 bg-slate-50", titulo: "border-slate-300 text-slate-900" },
};

const COR_NOTA: Record<CorDestaque, string> = {
  vermelho: "bg-rose-50 border-rose-600 text-rose-950",
  laranja: "bg-orange-50 border-orange-500 text-orange-950",
  azul: "bg-sky-50 border-sky-600 text-sky-950",
  amarelo: "bg-amber-50 border-amber-500 text-amber-950",
  roxo: "bg-purple-50 border-purple-600 text-purple-950",
  neutro: "bg-slate-100 border-slate-800 text-slate-700",
};

const COLUNAS_CAMPOS = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 4: "grid-cols-2 sm:grid-cols-4" };

/** Texto inline: aceita **negrito** e *itálico*. */
const Inline: React.FC<{ texto: string }> = ({ texto }) => (
  <>
    {texto.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((parte, i) => {
      if (parte.length > 4 && parte.startsWith("**") && parte.endsWith("**"))
        return <strong key={i}>{parte.slice(2, -2)}</strong>;
      if (parte.length > 2 && parte.startsWith("*") && parte.endsWith("*"))
        return <em key={i}>{parte.slice(1, -1)}</em>;
      return <React.Fragment key={i}>{parte}</React.Fragment>;
    })}
  </>
);

/** Renderizador A4 genérico de um bloco da estrutura única. */
const BlocoA4: React.FC<{ bloco: Bloco }> = ({ bloco }) => {
  switch (bloco.tipo) {
    case "paragrafo":
      return (
        <p className="text-justify">
          <Inline texto={bloco.texto} />
        </p>
      );
    case "nota":
      return (
        <div className={`p-3 rounded-lg border-l-4 text-[11px] leading-snug space-y-1 ${COR_NOTA[bloco.cor ?? "neutro"]}`}>
          {bloco.texto.split("\n").map((linha, i) => (
            <p key={i}>
              <Inline texto={linha} />
            </p>
          ))}
        </div>
      );
    case "lista": {
      const Tag = bloco.ordenada ? "ol" : "ul";
      return (
        <Tag className={`${bloco.ordenada ? "list-decimal" : "list-disc"} pl-5 space-y-1`}>
          {bloco.itens.map((item, i) => (
            <li key={i}>
              <Inline texto={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "checklist":
      return (
        <div className="space-y-1">
          {bloco.itens.map((item, i) => (
            <p key={i}>
              [ ] <Inline texto={item} />
            </p>
          ))}
        </div>
      );
    case "campos":
      return (
        <div className={`grid gap-2 ${COLUNAS_CAMPOS[bloco.colunas ?? 2]}`}>
          {bloco.campos.map((campo, i) => (
            <div key={i} className="border-b border-dotted border-slate-400 pb-1">
              <strong>{campo}:</strong> ____________________
            </div>
          ))}
        </div>
      );
    case "tabela": {
      const vazias = Array.from({ length: bloco.linhasEmBranco ?? 0 }, () => bloco.colunas.map(() => ""));
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px] border border-slate-300">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                {bloco.colunas.map((c) => (
                  <th key={c} className="p-1.5 border-r border-slate-200">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[...bloco.linhas, ...vazias].map((linha, i) => (
                <tr key={i} className={bloco.destaque?.includes(i) ? "bg-rose-50/70 font-semibold text-rose-900" : ""}>
                  {linha.map((celula, j) => (
                    <td key={j} className="p-1 h-6 border-r border-slate-200">
                      <Inline texto={celula} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "grupo":
      return (
        <div className={`avoid-page-break rounded-lg p-3 space-y-1.5 text-[11px] ${COR_GRUPO[bloco.cor].caixa}`}>
          <div className={`border-b pb-1 font-bold uppercase ${COR_GRUPO[bloco.cor].titulo}`}>{bloco.titulo}</div>
          <div className="space-y-1.5 text-slate-900">
            {bloco.blocos.map((b, i) => (
              <BlocoA4 key={i} bloco={b} />
            ))}
          </div>
        </div>
      );
    case "assinaturas":
      return (
        <div className="pt-2 space-y-4">
          {bloco.localData && <p>{LINHA_LOCAL_DATA}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pt-6">
            {bloco.assinantes.map((a, i) => (
              <div key={i} className="linha-assinatura text-center border-t border-slate-800 pt-1">
                <strong>{a.rotulo}</strong>
                {a.detalhe && <p className="text-[10px] text-slate-500">{a.detalhe}</p>}
              </div>
            ))}
          </div>
        </div>
      );
  }
};

export const PortalCentralDocumentos: React.FC<PortalCentralDocumentosProps> = ({
  templo,
}) => {
  const [docAtivoId, setDocAtivoId] = useState<string>(DOCUMENTOS_CENTRAL[0].id);
  const [copiado, setCopiado] = useState(false);
  const [mostrarJustificativa, setMostrarJustificativa] = useState(false);

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const ctx: ContextoDocumento = {
    temploNome: templo.nome,
    temploCidade: templo.cidade,
    temploDirigente: templo.dirigente,
    temploRegistro: templo.cnpj,
    dataEmissao: dataAtual,
  };

  const doc = DOCUMENTOS_CENTRAL.find((d) => d.id === docAtivoId) ?? DOCUMENTOS_CENTRAL[0];
  const secoes = doc.montar(ctx);

  const handleImprimir = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const copiarTextoDocumento = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const baixarArquivoTexto = (conteudo: string, nomeArquivo: string) => {
    const blob = new Blob([conteudo], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* BANNER MANDATÓRIO: MODELO ABERTO A EDIÇÃO POSTERIOR */}
      <div className="print-hidden p-4 rounded-xl border border-ambar-500/40 bg-floresta-950/90 text-areia-200 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-ambar-500/20 text-ambar-400 shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-ambar-300 uppercase tracking-wider">
                Modelos Canônicos Referenciais &amp; Soberania Litúrgica da Casa
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Abertos à Adaptação
              </span>
            </div>
            <p className="text-xs text-areia-300 leading-relaxed">
              Estes documentos foram formulados pelo Conselho da{" "}
              <strong>Cooperativa Nativaram</strong> como modelos de referência (CONAD 01/2010, CF/88, LGPD e Tabela de Medicamentos do Portal). Cada templo tem autonomia para editar e incluir suas próprias regras. O rodapé de cada documento traz versão, data e status de revisão: textos com <em>revisão clínica ou jurídica pendente</em> devem ser revistos por médico ou advogado antes do uso. Você pode imprimir em A4, copiar o texto para o Word/Docs ou baixar o arquivo editável.
            </p>
          </div>
        </div>
      </div>

      {/* BARRA DE AÇÕES E SELEÇÃO DE DOCUMENTO */}
      <div className="print-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Central de Documentos &amp; Modelos Oficiais
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed mt-0.5">
            Selecione o documento desejado para visualização fiel, impressão em papel/PDF A4 ou download de modelo aberto:
          </p>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setMostrarJustificativa(!mostrarJustificativa)}
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-ambar-300 border-ambar-500/30 hover:bg-ambar-500/10 w-full lg:w-auto"
            title="Ver por que cada item existe nos documentos"
          >
            <Info className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
            <span>{mostrarJustificativa ? "Ocultar Justificativas" : "Por Que Cada Item Existe?"}</span>
            {mostrarJustificativa ? <ChevronUp className="h-3 w-3 shrink-0" /> : <ChevronDown className="h-3 w-3 shrink-0" />}
          </button>

          <button
            onClick={() => copiarTextoDocumento(gerarMarkdown(doc, ctx))}
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800 w-full lg:w-auto"
            title="Copiar texto formatado para colar no Word ou Google Docs"
          >
            {copiado ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
            )}
            <span>{copiado ? "Copiado!" : "Copiar Texto (Word/Docs)"}</span>
          </button>

          <button
            onClick={() => baixarArquivoTexto(gerarMarkdown(doc, ctx), doc.arquivo)}
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800 w-full lg:w-auto"
            title="Baixar arquivo de texto editável (.md)"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Baixar Editável (.md)</span>
          </button>

          <button
            onClick={handleImprimir}
            className="btn-primary text-xs inline-flex items-center justify-center gap-1.5 px-4 py-2 shadow-md active:scale-95 transition-all w-full lg:w-auto"
            title="Imprimir documento selecionado em papel ou salvar em PDF"
          >
            <Printer className="h-3.5 w-3.5 shrink-0" />
            <span>Imprimir Doc Atual (A4 / PDF)</span>
          </button>

          <button
            onClick={exportarMedicamentosPDF}
            className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 bg-rose-950/90 hover:bg-rose-900 text-rose-200 border border-rose-500/40 transition-all w-full lg:w-auto"
            title="Baixar a Tabela de Medicamentos do Portal separada em PDF A4"
          >
            <Pill className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span>Lista Medicamentos (PDF)</span>
          </button>

          <button
            onClick={exportarMedicamentosCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 transition-all w-full lg:w-auto"
            title="Baixar a Tabela de Medicamentos do Portal em planilha"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Lista Medicamentos (CSV)</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO EDUCATIVA: POR QUE CADA ITEM EXISTE? (EXPANSÍVEL) */}
      {mostrarJustificativa && (
        <div className="print-hidden p-5 rounded-2xl bg-floresta-900/90 border border-ambar-500/30 text-areia-200 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            Fundamentação Clínica, Farmacológica e Jurídica dos Itens Documentais
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-areia-300">
            {JUSTIFICATIVAS_DOCUMENTOS.map((j) => (
              <div key={j.titulo} className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
                <strong className={`${COR_JUSTIFICATIVA[j.cor]} block font-semibold`}>{j.titulo}</strong>
                <p>{j.texto}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELEÇÃO DOS DOCUMENTOS (GRADE RESPONSIVA, EM ORDEM NUMÉRICA) */}
      <div className="print-hidden space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-areia-300 uppercase tracking-wider">
            Escolha o Modelo Canônico Abaixo ({DOCUMENTOS_CENTRAL.length} Documentos Oficiais)
          </span>
          <span className="text-[11px] text-ambar-400 font-medium hidden sm:inline">
            Clique no cartão para alternar a folha A4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pb-1">
          {DOCUMENTOS_CENTRAL.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocAtivoId(tab.id)}
              className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                doc.id === tab.id
                  ? "bg-ambar-500/20 border-ambar-400 text-areia-100 shadow-md ring-2 ring-ambar-400/40"
                  : "bg-floresta-900/50 border-ambar-500/15 text-areia-300 hover:bg-floresta-800/60 hover:text-areia-100"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-areia-100">
                {ICONES[tab.icone]}
                <span className="leading-tight">
                  Doc {tab.numero}: {tab.rotuloCurto}
                </span>
              </div>
              <p className="text-[10px] text-areia-400 font-light mt-1 leading-snug">{tab.resumo}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO / FOLHA A4 NATIVA */}
      <div className="documento-a4-impressao bg-white text-slate-900 p-4 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-200 font-sans text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto overflow-x-hidden">
        {/* CABEÇALHO INSTITUCIONAL CANÔNICO */}
        <div className="border-b-2 border-slate-800 pb-4 mb-5 text-center space-y-1">
          <p className="text-[10px] tracking-widest uppercase font-bold text-slate-600">
            {MARCA_INSTITUCIONAL} • {LINHA_SISTEMA}
          </p>
          <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Documento {doc.numero}</p>
          <h1 className="font-serif text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-tight">{doc.titulo}</h1>
          <p className="text-[11px] text-slate-600">{doc.subtitulo}</p>
          <div className="pt-2 text-[10px] text-slate-500 flex flex-wrap justify-between gap-2 border-t border-slate-200 mt-2">
            <span>
              <strong>Templo / Núcleo:</strong> {templo.nome}
            </span>
            <span>
              <strong>Registro:</strong> {templo.cnpj}
            </span>
            <span>
              <strong>Dirigente:</strong> {templo.dirigente}
            </span>
            <span>
              <strong>Emissão:</strong> {dataAtual}
            </span>
          </div>
        </div>

        {/* CORPO GERADO DA ESTRUTURA ÚNICA (src/data/documentos) */}
        <div className="space-y-5 text-xs text-slate-800 leading-relaxed">
          {secoes.map((secao, i) => (
            <div key={i} className="space-y-2">
              {secao.titulo && (
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                  {secao.titulo}
                </h3>
              )}
              {secao.blocos.map((bloco, j) => (
                <BlocoA4 key={j} bloco={bloco} />
              ))}
            </div>
          ))}
        </div>

        {/* RODAPÉ: VERSÃO + DATA + STATUS DE REVISÃO */}
        <div className="mt-8 pt-3 border-t border-slate-300 text-[10px] text-slate-500 space-y-0.5">
          <p>{textoRodape(doc)}</p>
          <p>{LINHA_REVISOR}</p>
        </div>
      </div>
    </div>
  );
};
