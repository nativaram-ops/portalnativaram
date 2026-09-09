"use client";

import React, { useState } from "react";
import {
  Scale,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Briefcase,
  Plane,
  Building2,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";

interface PortalRespaldoJuridicoProps {
  onIrParaDocumentos?: () => void;
}

export const PortalRespaldoJuridico: React.FC<PortalRespaldoJuridicoProps> = ({
  onIrParaDocumentos,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<"FUNDAMENTOS" | "FISCALIZACAO" | "TRANSPORTE" | "CHECKLIST">("FUNDAMENTOS");

  const copiarEmentaConad = () => {
    const texto = `RESOLUÇÃO CONAD Nº 01, DE 25 DE JANEIRO DE 2010
Ementa: Dispõe sobre as diretrizes do Conselho Nacional de Políticas sobre Drogas (CONAD) para o uso religioso da Ayahuasca no Brasil.
Base Legal: Art. 5º, VI da CF/88 (Liberdade Religiosa e Proteção aos Locais de Culto).
Estatuto Cooperativo: Lei Federal nº 5.764/1971 (Rateio Operacional e Ajuda Mútua entre Entidades Litúrgicas Sem Fins Lucrativos).`;
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Banner Principal */}
      <div className="relative overflow-hidden rounded-2xl border border-ambar-500/30 bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 p-6 md:p-8 text-areia-100 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-ambar-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ambar-500/20 border border-ambar-500/30 text-ambar-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-ambar-400" />
            Assessoria Jurídico-Institucional • CONAD 01/2010 & CF/88
          </div>
          <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-areia-100 mb-3">
            Respaldo Jurídico & Salvaguarda Canônica
          </h2>
          <p className="text-sm md:text-base text-areia-300 leading-relaxed">
            O uso religioso da Ayahuasca no Brasil é plenamente amparado pela Constituição Federal e normatizado pelo Conselho Nacional de Políticas sobre Drogas (CONAD). Aqui você encontra orientações técnicas, roteiro de conduta para fiscalizações e modelos canônicos para garantir a inviolabilidade do seu templo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onIrParaDocumentos?.()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ambar-500 hover:bg-ambar-600 text-floresta-950 font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              Emitir Declaração de Trânsito A4
            </button>
            <button
              onClick={copiarEmentaConad}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-floresta-800/80 hover:bg-floresta-800 text-areia-200 border border-floresta-700 text-xs font-medium transition-all active:scale-95"
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Ementa Copiada!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-ambar-400" />
                  Copiar Ementa CONAD / Art. 5º
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navegação entre Módulos Jurídicos */}
      <div className="flex flex-wrap gap-2 border-b border-floresta-800 pb-2">
        <button
          onClick={() => setSecaoAtiva("FUNDAMENTOS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            secaoAtiva === "FUNDAMENTOS"
              ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
              : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 hover:text-areia-100"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. Fundamentos Constitucionais
        </button>
        <button
          onClick={() => setSecaoAtiva("FISCALIZACAO")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            secaoAtiva === "FISCALIZACAO"
              ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
              : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 hover:text-areia-100"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          2. Roteiro perante Autoridades
        </button>
        <button
          onClick={() => setSecaoAtiva("TRANSPORTE")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            secaoAtiva === "TRANSPORTE"
              ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
              : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 hover:text-areia-100"
          }`}
        >
          <Plane className="w-4 h-4" />
          3. Trânsito Rodoviário & Aéreo
        </button>
        <button
          onClick={() => setSecaoAtiva("CHECKLIST")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            secaoAtiva === "CHECKLIST"
              ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
              : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 hover:text-areia-100"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          4. Checklist da Pasta do Templo
        </button>
      </div>

      {/* Conteúdo: 1. FUNDAMENTOS */}
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
                  <p className="text-xs text-ambar-300">Garantia Pétrea de Liberdade Religiosa</p>
                </div>
              </div>
              <blockquote className="border-l-2 border-ambar-500 pl-4 py-1 text-sm text-areia-300 italic">
                &ldquo;É inviolável a liberdade de consciência e de crença, sendo assegurado o livre exercício dos cultos religiosos e garantida, na forma da lei, a proteção aos locais de culto e a suas liturgias.&rdquo;
              </blockquote>
              <p className="text-xs text-areia-400 leading-relaxed">
                Essa cláusula pétrea proíbe qualquer interferência arbitrária do Estado sobre ritos confessionais genuínos. O uso litúrgico não se confunde com uso recreativo ou substâncias entorpecentes ilícitas.
              </p>
            </div>

            <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  CONAD
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-areia-100">
                    Resolução CONAD nº 01/2010
                  </h3>
                  <p className="text-xs text-emerald-300">Marco Regulatório Inquestionável</p>
                </div>
              </div>
              <p className="text-xs text-areia-300 leading-relaxed">
                Resultado do Grupo Multidisciplinar de Trabalho (GMT) instituído pelo Governo Federal, reuniu antropólogos, juristas, médicos, psicólogos e líderes de tradições de Ayahuasca.
              </p>
              <ul className="text-xs text-areia-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Legitimidade Litúrgica:</strong> Reconhece a plena legitimidade do uso sagrado em todo o território nacional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Vedação de Comércio:</strong> Proíbe o lucro, a venda indiscriminada e o turismo comercial predatório.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Responsabilidade Comunitária:</strong> Exige triagem criteriosa de participantes e acolhimento ético.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-floresta-950 border border-ambar-500/20 rounded-xl p-6">
            <h4 className="font-cinzel text-base font-bold text-ambar-300 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              O Papel da Cooperativa Nativaram sob a Lei nº 5.764/1971
            </h4>
            <p className="text-xs text-areia-300 leading-relaxed">
              A <strong>Cooperativa Nativaram</strong> atua em estrita conformidade com o regime cooperativo brasileiro. As contribuições efetuadas pelos templos representam exclusivamente o <strong>rateio de custos operacionais</strong> (colheita sustentável na floresta, feitio tradicional, garrafas invioláveis, análise de pureza e frete logístico interestadual), não existindo margem de lucro mercantil ou relação de consumo varejista. O templo comunga de um serviço cooperativo mútuo de salvaguarda litúrgica.
            </p>
          </div>
        </div>
      )}

      {/* Conteúdo: 2. ROTEIRO PERANTE AUTORIDADES */}
      {secaoAtiva === "FISCALIZACAO" && (
        <div className="space-y-6">
          <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6">
            <h3 className="font-cinzel text-lg font-bold text-areia-100 mb-2">
              Conduta em Caso de Visita de Autoridades Policiais ou Sanitárias
            </h3>
            <p className="text-xs text-areia-300 mb-6">
              Em caso de fiscalização no templo ou no momento de recebimento do sacramento, mantenha serenidade absoluta. Lembre-se: o seu ritual é uma prática religiosa formalmente protegida pela República Federativa do Brasil.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-floresta-950 border border-floresta-800 rounded-lg p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-ambar-400">PASSO 01</span>
                <h4 className="font-semibold text-sm text-areia-100">Acolhimento Cordial</h4>
                <p className="text-xs text-areia-400">
                  Receba as autoridades na porta com respeito e calma. Identifique-se como o Dirigente Responsável pela instituição religiosa.
                </p>
              </div>

              <div className="bg-floresta-950 border border-floresta-800 rounded-lg p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-ambar-400">PASSO 02</span>
                <h4 className="font-semibold text-sm text-areia-100">Espaço Administrativo</h4>
                <p className="text-xs text-areia-400">
                  Convide as autoridades para a secretaria ou sala administrativa, preservando a intimidade e a concentração dos congregados no salão.
                </p>
              </div>

              <div className="bg-floresta-950 border border-floresta-800 rounded-lg p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-ambar-400">PASSO 03</span>
                <h4 className="font-semibold text-sm text-areia-100">Apresentação da Pasta</h4>
                <p className="text-xs text-areia-400">
                  Entregue a <em>Pasta de Salvaguarda Jurídica</em> contendo o Estatuto do Templo, CNPJ, a Resolução CONAD nº 01/2010 e o Termo de Custódia da Nativaram.
                </p>
              </div>

              <div className="bg-floresta-950 border border-floresta-800 rounded-lg p-4 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400">PASSO 04</span>
                <h4 className="font-semibold text-sm text-areia-100">Registro Canônico</h4>
                <p className="text-xs text-areia-400">
                  Se for lavrado boletim de ocorrência ou termo de verificação, solicite que conste expressamente que a entidade é templo ayahuasqueiro amparado no CONAD.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/10 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-areia-200 space-y-1">
              <strong className="text-amber-300 block text-sm">O que NUNCA fazer durante uma averiguação:</strong>
              <p>
                • Nunca utilize vocabulário de cunho alopático, &quot;fármaco curativo&quot;, &quot;substância recreativa&quot; ou termos comerciais de compra e venda. Refira-se sempre como <em>sacramento botânico para liturgia religiosa</em>.
              </p>
              <p>
                • Nunca esconda os recipientes ou aja de maneira evasiva. A transparência e a solidez institucional desarmam qualquer suspeita de irregularidade.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo: 3. TRANSPORTE RODOVIÁRIO & AÉREO */}
      {secaoAtiva === "TRANSPORTE" && (
        <div className="space-y-6">
          <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-areia-100">
              Diretrizes de Transporte Interestadual de Ayahuasca
            </h3>
            <p className="text-xs text-areia-300 leading-relaxed">
              O transporte de Ayahuasca por dirigentes e templos credenciados é garantido para o atendimento das suas comunidades filiadas e rituais itinerantes. Siga este protocolo para evitar retenções indevidas em postos da PRF ou alfândegas aeroportuárias.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-floresta-950 p-5 rounded-lg border border-floresta-800 space-y-3">
                <h4 className="font-semibold text-sm text-ambar-300 flex items-center gap-2">
                  <Plane className="w-4 h-4 text-ambar-400" />
                  Transporte em Voos Comerciais (Bagagem Despachada)
                </h4>
                <ul className="text-xs text-areia-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ambar-400 shrink-0 mt-1.5" />
                    <span><strong>Nunca leve na bagagem de mão:</strong> As regras da ANAC limitam líquidos na cabine (100ml em voos internacionais; regras de líquidos na mala despachada). Despache sempre.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ambar-400 shrink-0 mt-1.5" />
                    <span><strong>Vedação Dupla e Caixa Rígida:</strong> Garrafas vedadas com fita isolante na rosca, acondicionadas em sacos plásticos herméticos e caixa isotérmica protegida contra impacto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ambar-400 shrink-0 mt-1.5" />
                    <span><strong>Declaração Anexa:</strong> Fixe uma via impressa da Declaração de Trânsito Litúrgico na parte superior interna da caixa.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-floresta-950 p-5 rounded-lg border border-floresta-800 space-y-3">
                <h4 className="font-semibold text-sm text-emerald-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  Transporte Rodoviário (Veículo Próprio ou Ônibus)
                </h4>
                <ul className="text-xs text-areia-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Organização no Porta-Malas:</strong> Recipientes organizados, com rótulos visíveis identificando o templo de destino e os dados da Cooperativa Nativaram.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Documentos em Fácil Acesso:</strong> Mantenha a pasta com a Declaração de Trânsito e o Estatuto do Templo no porta-luvas para exibição imediata em blitze.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span><strong>Ausência de Carga Comercial:</strong> Nunca transporte produtos para venda de terceiros junto com o sacramento.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo: 4. CHECKLIST DA PASTA DO TEMPLO */}
      {secaoAtiva === "CHECKLIST" && (
        <div className="bg-floresta-900/60 border border-floresta-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-areia-100">
                Checklist Obrigatório: A Pasta do Templo
              </h3>
              <p className="text-xs text-areia-300">
                Mantenha uma pasta física transparente na recepção do templo com cópias autenticadas dos seguintes documentos:
              </p>
            </div>
            <button
              onClick={() => onIrParaDocumentos?.()}
              className="text-xs text-ambar-400 hover:text-ambar-300 font-semibold flex items-center gap-1 underline underline-offset-4"
            >
              Baixar Fichas e Termos <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                titulo: "Estatuto Social Registrado",
                desc: "Cópia do Estatuto registrado em Cartório de Registro Civil de Pessoas Jurídicas atestando a finalidade litúrgica religiosa.",
              },
              {
                titulo: "Comprovante de Inscrição no CNPJ",
                desc: "Cartão de CNPJ ativo com CNAE 94.91-0-00 (Atividades de organizações religiosas ou correlatas).",
              },
              {
                titulo: "Ata de Eleição e Posse da Diretoria",
                desc: "Documento oficial que qualifica o dirigente atual como representante legal da entidade.",
              },
              {
                titulo: "Cópia da Resolução CONAD nº 01/2010",
                desc: "Texto oficial publicado no Diário Oficial da União garantindo o uso litúrgico da bebida.",
              },
              {
                titulo: "Termo de Custódia e Rateio Cooperativo",
                desc: "Documento emitido pela Cooperativa Nativaram atestando a procedência botânica e rateio legal sob a Lei 5.764/71.",
              },
              {
                titulo: "Arquivo de Fichas de Anamnese e Termos",
                desc: "Fichas preenchidas e assinadas pelos comungantes presentes no trabalho ritualístico arquivadas por no mínimo 5 anos.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-floresta-950/80 border border-floresta-800">
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
