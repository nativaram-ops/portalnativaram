"use client";

import React, { useState } from "react";
import {
  Scale,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface PortalRespaldoJuridicoProps {
  onIrParaDocumentos?: () => void;
}

/** Texto oficial da Resolução CONAD nº 1/2010 (DOU nº 17, 26/01/2010), publicado pelo Ministério da Justiça. */
const URL_CONAD_OFICIAL =
  "https://www.gov.br/mj/pt-br/assuntos/sua-protecao/politicas-sobre-drogas/subcapas-senad/conad/atos-do-conad-1/2010/11___resolucao_n__01_2010___conad.pdf";

const FRASE_CONFORMIDADE =
  "A Resolução CONAD nº 1/2010 reconhece o uso religioso da ayahuasca nas condições do seu relatório. Isso não é garantia contra fiscalização.";

const FRASE_TRANSPORTE =
  "O transporte do sacramento entre entidades não tem regulamentação específica (a Resolução CONAD nº 1/2010 recomendou que fosse regulamentado). Este site não orienta transporte. Procure um advogado.";

/** Trechos literais do texto oficial (Resolução e Relatório Final do GMT anexo). */
const TRECHOS_OFICIAIS: { referencia: string; texto: string }[] = [
  {
    referencia: "Ementa da Resolução CONAD nº 1, de 25 de janeiro de 2010",
    texto:
      "Dispõe sobre a observância, pelos órgãos da Administração Pública, das decisões do Conselho Nacional de Políticas sobre Drogas - CONAD sobre normas e procedimentos compatíveis com o uso religioso da Ayahuasca e dos princípios deontológicos que o informam.",
  },
  {
    referencia: "Relatório Final do GMT, princípio deontológico 1",
    texto:
      "O chá Ayahuasca é o produto da decocção do cipó Banisteriopsis caapi e da folha Psychotria viridis e seu uso é restrito a rituais religiosos, em locais autorizados pelas respectivas direções das entidades usuárias, vedado o seu uso associado a substâncias psicoativas ilícitas;",
  },
  {
    referencia: "Relatório Final do GMT, princípio deontológico 2",
    texto:
      "Todo o processo de produção, armazenamento, distribuição e consumo da Ayahuasca integra o uso religioso da bebida, sendo vedada a comercialização e ou a percepção de qualquer vantagem, em espécie ou in natura, a título de pagamento, quer seja pela produção, quer seja pelo consumo, ressalvando-se as contribuições destinadas à manutenção e ao regular funcionamento de cada entidade, de acordo com sua tradição ou disposições estatutárias;",
  },
  {
    referencia: "Relatório Final do GMT, § 38 (uso terapêutico)",
    texto:
      "Qualquer prática que implique utilização de Ayahuasca com fins estritamente terapêuticos, quer seja da substância exclusivamente, quer seja de sua associação com outras substâncias ou práticas terapêuticas, deve ser vedada, até que se comprove sua eficiência por meio de pesquisas científicas realizadas por centros de pesquisa vinculados a instituições acadêmicas, obedecendo às metodologias científicas.",
  },
];

export const PortalRespaldoJuridico: React.FC<PortalRespaldoJuridicoProps> = ({
  onIrParaDocumentos,
}) => {
  const [secaoAtiva, setSecaoAtiva] = useState<"FUNDAMENTOS" | "FISCALIZACAO" | "CHECKLIST">("FUNDAMENTOS");

  const classeAba = (ativa: boolean) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
      ativa
        ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
        : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 hover:text-areia-100"
    }`;

  return (
    <div className="space-y-8">
      {/* Banner Principal */}
      <div className="relative overflow-hidden rounded-2xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-6 md:p-8 text-areia-100 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-ambar-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ambar-500/20 border border-ambar-500/30 text-ambar-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-ambar-400" />
            Marco Legal • CONAD 1/2010 &amp; CF/88
          </div>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-areia-100 mb-3">
            Marco Legal e Conformidade
          </h2>
          <p className="text-sm md:text-base text-areia-300 leading-relaxed">
            {FRASE_CONFORMIDADE} Aqui você encontra as normas de referência com o link para o texto oficial, os direitos básicos diante de uma fiscalização e a lista de documentos que a entidade mantém organizados. Este conteúdo é informativo e não substitui a orientação de um advogado.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onIrParaDocumentos?.()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ambar-500 hover:bg-ambar-600 text-floresta-950 font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4" />
              Ver Modelos de Documentos A4
            </button>
            <a
              href={URL_CONAD_OFICIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-floresta-800/80 hover:bg-floresta-800 text-areia-200 border border-floresta-700 text-xs font-medium transition-all active:scale-95"
            >
              <ExternalLink className="w-4 h-4 text-ambar-400" />
              Texto oficial da Resolução CONAD nº 1/2010 (gov.br)
            </a>
          </div>
        </div>
      </div>

      {/* Navegação entre Módulos Jurídicos */}
      <div className="flex flex-wrap gap-2 border-b border-floresta-800 pb-2">
        <button onClick={() => setSecaoAtiva("FUNDAMENTOS")} className={classeAba(secaoAtiva === "FUNDAMENTOS")}>
          <BookOpen className="w-4 h-4" />
          1. Normas de Referência
        </button>
        <button onClick={() => setSecaoAtiva("FISCALIZACAO")} className={classeAba(secaoAtiva === "FISCALIZACAO")}>
          <ShieldCheck className="w-4 h-4" />
          2. Direitos diante de Autoridades
        </button>
        <button onClick={() => setSecaoAtiva("CHECKLIST")} className={classeAba(secaoAtiva === "CHECKLIST")}>
          <FileCheck className="w-4 h-4" />
          3. Documentos da Entidade
        </button>
      </div>

      {/* Conteúdo: 1. NORMAS DE REFERÊNCIA */}
      {secaoAtiva === "FUNDAMENTOS" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-ambar-500/20 border border-ambar-500/30 flex items-center justify-center text-ambar-400 font-bold">
                  CF
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-areia-100">
                    Artigo 5º, VI da Constituição Federal
                  </h3>
                  <p className="text-xs text-ambar-300">Liberdade de crença e de culto</p>
                </div>
              </div>
              <blockquote className="border-l-2 border-ambar-500 pl-4 py-1 text-sm text-areia-300 italic">
                &ldquo;É inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias.&rdquo;
              </blockquote>
              <p className="text-xs text-areia-400 leading-relaxed">
                A proteção vale &ldquo;na forma da lei&rdquo;: o uso religioso convive com a Lei nº 11.343/2006 e com as condições do relatório da CONAD.
              </p>
            </div>

            <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  LEI
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-areia-100">
                    Art. 2º, caput, da Lei nº 11.343/2006
                  </h3>
                  <p className="text-xs text-emerald-300">Ressalva das plantas de uso ritualístico-religioso</p>
                </div>
              </div>
              <p className="text-xs text-areia-300 leading-relaxed">
                O caput do art. 2º proíbe as drogas e o plantio de vegetais dos quais possam ser extraídas, ressalvando a autorização legal ou regulamentar e o que a Convenção de Viena de 1971 estabelece sobre plantas de uso estritamente ritualístico-religioso. O parágrafo único do mesmo artigo trata de fins medicinais e científicos, não do uso religioso.
              </p>
              <ul className="text-xs text-areia-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Vedação de comércio:</strong> a CONAD veda a venda e o lucro; admite contribuições para a manutenção de cada entidade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Uso terapêutico:</strong> vedado fora da pesquisa científica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Responsabilidade da entidade:</strong> entrevista prévia dos interessados e acolhimento até o fim do ritual.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-floresta-950 border border-ambar-500/20 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-cinzel text-base font-bold text-ambar-300 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Resolução CONAD nº 1/2010: trechos do texto oficial
              </h4>
              <a
                href={URL_CONAD_OFICIAL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ambar-400 hover:text-ambar-300 font-semibold inline-flex items-center gap-1 underline underline-offset-4"
              >
                Ler na íntegra (gov.br) <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-areia-400 leading-relaxed">
              Publicada no Diário Oficial da União nº 17, de 26 de janeiro de 2010, com o Relatório Final do Grupo Multidisciplinar de Trabalho (GMT) anexo. Os trechos abaixo são literais; para qualquer uso formal, consulte o texto completo.
            </p>
            <div className="space-y-3">
              {TRECHOS_OFICIAIS.map((t) => (
                <figure key={t.referencia} className="border-l-2 border-emerald-500/60 pl-4 py-1">
                  <blockquote className="text-xs text-areia-300 italic leading-relaxed">&ldquo;{t.texto}&rdquo;</blockquote>
                  <figcaption className="text-[11px] text-emerald-300 mt-1">{t.referencia}</figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs text-areia-200 leading-relaxed border-t border-floresta-800 pt-3">
              <strong>Conformidade:</strong> {FRASE_CONFORMIDADE}
            </p>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/10 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-areia-200 space-y-1">
              <strong className="text-amber-300 block text-sm">Transporte</strong>
              <p>{FRASE_TRANSPORTE}</p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo: 2. DIREITOS DIANTE DE AUTORIDADES */}
      {secaoAtiva === "FISCALIZACAO" && (
        <div className="space-y-6">
          <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6">
            <h3 className="font-cinzel text-lg font-bold text-areia-100 mb-2">
              Em caso de visita de autoridades policiais ou sanitárias
            </h3>
            <p className="text-xs text-areia-300 mb-6">
              Orientação geral de direitos básicos. {FRASE_CONFORMIDADE}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  titulo: "Cordialidade",
                  texto: "Receba as autoridades com respeito e calma e identifique-se como responsável pela entidade.",
                },
                {
                  titulo: "Não esconder nada",
                  texto: "Responda com transparência e não oculte recipientes, registros ou documentos.",
                },
                {
                  titulo: "Documentos da entidade",
                  texto: "Apresente os documentos da entidade, a cópia da Resolução CONAD nº 1/2010 e os registros internos.",
                },
                {
                  titulo: "Cópia de termos",
                  texto: "Peça cópia de qualquer termo, auto ou boletim lavrado durante a visita.",
                },
                {
                  titulo: "Advogado",
                  texto: "Você tem direito a chamar um advogado. Tenha o contato do advogado da entidade à mão.",
                },
              ].map((passo, idx) => (
                <div key={passo.titulo} className="bg-floresta-950 border border-floresta-800 rounded-lg p-4 space-y-2">
                  <span className="text-xs font-mono font-bold text-ambar-400">PASSO {String(idx + 1).padStart(2, "0")}</span>
                  <h4 className="font-semibold text-sm text-areia-100">{passo.titulo}</h4>
                  <p className="text-xs text-areia-400">{passo.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo: 3. DOCUMENTOS DA ENTIDADE */}
      {secaoAtiva === "CHECKLIST" && (
        <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-areia-100">
                Documentos que a entidade mantém organizados
              </h3>
              <p className="text-xs text-areia-300">
                Ter estes documentos em ordem ajuda a demonstrar a natureza religiosa da entidade. Nenhum deles é garantia contra fiscalização.
              </p>
            </div>
            <button
              onClick={() => onIrParaDocumentos?.()}
              className="text-xs text-ambar-400 hover:text-ambar-300 font-semibold flex items-center gap-1 underline underline-offset-4 shrink-0"
            >
              Ver Fichas e Termos <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                titulo: "Ato de constituição e estatuto",
                desc: "Estatuto com finalidade religiosa explícita, registrado em Cartório de Registro Civil de Pessoas Jurídicas, quando a entidade já estiver constituída.",
              },
              {
                titulo: "Ata de eleição e posse da diretoria",
                desc: "Documento que qualifica o responsável atual como representante da entidade.",
              },
              {
                titulo: "Comprovante de inscrição no CNPJ",
                desc: "Quando a entidade já tiver inscrição. Ajuda a identificar a entidade, mas não é garantia de nada.",
              },
              {
                titulo: "Cópia da Resolução CONAD nº 1/2010",
                desc: "Texto oficial com o Relatório Final do GMT anexo, obtido no link do gov.br indicado nesta página.",
              },
              {
                titulo: "Fichas de anamnese, termos e atas",
                desc: "Preenchidos e assinados, guardados pelo prazo definido pela entidade na sua Política de Privacidade (Documento 11). Ao fim do prazo, os dados são eliminados ou anonimizados.",
              },
              {
                titulo: "Política de Privacidade da entidade",
                desc: "Documento 11 preenchido, com o encarregado pelo tratamento de dados e os prazos de guarda.",
              },
            ].map((item) => (
              <div key={item.titulo} className="flex items-start gap-3 p-3.5 rounded-lg bg-floresta-950/80 border border-floresta-800">
                <div className="w-6 h-6 rounded-full bg-ambar-500/20 text-ambar-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-areia-100">{item.titulo}</h4>
                  <p className="text-xs text-areia-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
