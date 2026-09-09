"use client";

import React from "react";
import {
  Sparkles,
  FlaskConical,
  Scale,
  Clock,
  Users,
  ShieldCheck,
  Printer,
  Compass,
  TreePine,
  Flame,
  Droplets,
  Thermometer,
  Layers,
  FileText,
  AlertCircle,
} from "lucide-react";
import { GRADUACOES_SACRAMENTAIS } from "@/data/graduacoes";
import { TABELA_DILUICAO_WIRAPURU } from "@/data/portal-assessoria";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const PortalCatalogoGraduacoes: React.FC = () => {
  const handleImprimir = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Introdução (Oculto na Impressão) */}
      <div className="print-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Catálogo Técnico de Graduações &amp; Manual de Reconstituição
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed">
            Acervo descritivo fitoquímico das 6 graduações canônicas de Cruzeiro do Sul/AC, parâmetros da linhagem <em>Tucunacá</em>, colheita circadiana da <em>Chacrona</em> e protocolo matemático de diluição do 10:1 Wirapuru.
          </p>
        </div>

        <button
          onClick={handleImprimir}
          className="btn-primary text-xs inline-flex items-center gap-2 px-4 py-2.5 shadow-solar shrink-0"
        >
          <Printer className="h-4 w-4" />
          <span>Imprimir Catálogo em A4 / PDF</span>
        </button>
      </div>

      {/* Parâmetros do Feitio Purista Tucunacá & Chacrona Circadiana */}
      <div className="p-5 rounded-2xl border border-ambar-500/25 bg-floresta-950/80 space-y-4">
        <div className="flex items-center justify-between border-b border-ambar-500/15 pb-2">
          <div className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-sm font-bold text-areia-100">
              Parâmetros Botânicos &amp; Fitoquímica da Floresta Nativa
            </span>
          </div>
          <span className="text-[10px] font-mono text-ambar-400 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
            Cruzeiro do Sul • Vale do Juruá/AC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/40 border border-ambar-500/10">
            <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Linhagem do Cipó</span>
            <span className="font-semibold text-areia-100 block">Banisteriopsis caapi (Tucunacá)</span>
            <p className="text-[11px] text-areia-300 font-light leading-snug">
              Casca lisa avermelhada, teor médio de <strong>8,03 mg/g de β-carbolinas totais</strong>. Rico em Tetrahidroharmina (THH) e Harmina, com baixa concentração de taninos adstringentes.
            </p>
          </div>

          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/40 border border-ambar-500/10">
            <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Colheita Circadiana</span>
            <span className="font-semibold text-areia-100 block">Psychotria viridis (Chacrona Rainha)</span>
            <p className="text-[11px] text-areia-300 font-light leading-snug">
              Colheita estrita entre <strong>06h00 e 08h30</strong> com orvalho intacto, resguardando o N,N-DMT contra foto-oxidação e estresse térmico solar.
            </p>
          </div>

          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/40 border border-ambar-500/10">
            <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Bio-Estabilização</span>
            <span className="font-semibold text-areia-100 block">65 a 72 °Brix (Semi-Mel)</span>
            <p className="text-[11px] text-areia-300 font-light leading-snug">
              Atividade de água ($a_w$) em 0,700–0,780. Barreira hiperosmótica natural que dispensa qualquer aditivo sintético e preserva alcaloides por até 18 meses.
            </p>
          </div>

          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/40 border border-ambar-500/10">
            <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">Clarificação Purista</span>
            <span className="font-semibold text-areia-100 block">Filtragem em Menores Micras</span>
            <p className="text-[11px] text-areia-300 font-light leading-snug">
              Decantação física a frio com água de nascente pura. Isento de anayahuascas, plantas análogas ou solventes industriais.
            </p>
          </div>
        </div>
      </div>

      {/* Grid das 6 Graduações Sacramentais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GRADUACOES_SACRAMENTAIS.map((grad) => {
          return (
            <div
              key={grad.id}
              className="documento-a4-impressao rounded-2xl bg-floresta-950/85 border border-ambar-500/25 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-ambar-500/40 transition-colors shadow-elevated-sm"
            >
              <div className="space-y-3">
                {/* Header do Card com Código e Nome */}
                <div className="flex items-center justify-between border-b border-ambar-500/15 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-ambar-400 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/25">
                        Graduação {grad.codigo}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-areia-100">
                        {grad.nomeSagrado}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-ambar-300/80 uppercase tracking-wider block mt-0.5">
                      Arquétipo: {grad.arquetipo}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-areia-400 block">Proporção Biomassa</span>
                    <span className="text-xs font-bold text-areia-200">{grad.proporcaoBiomassa}</span>
                  </div>
                </div>

                {/* Métricas de Porção e Rendimento */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs py-1">
                  <div className="p-2 rounded-lg bg-floresta-900/60 border border-ambar-500/10">
                    <span className="text-[9px] font-mono text-ambar-400 block uppercase">Porção Sugerida</span>
                    <div className="font-semibold text-areia-100 flex items-center gap-1 mt-0.5">
                      <Scale className="h-3 w-3 text-ambar-400" />
                      <span>{grad.porcaoSugerida}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-floresta-900/60 border border-ambar-500/10">
                    <span className="text-[9px] font-mono text-ambar-400 block uppercase">Duração da Força</span>
                    <div className="font-semibold text-areia-100 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3 text-ambar-400" />
                      <span>{grad.duracaoEstimada}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-floresta-900/60 border border-ambar-500/10 col-span-2 sm:col-span-1">
                    <span className="text-[9px] font-mono text-ambar-400 block uppercase">Rendimento / Litro</span>
                    <div className="font-semibold text-areia-100 flex items-center gap-1 mt-0.5">
                      <Users className="h-3 w-3 text-ambar-400" />
                      <span>
                        {grad.codigo === "3.1" && "8 a 11 comungantes"}
                        {grad.codigo === "5.1" && "10 a 14 comungantes"}
                        {grad.codigo === "7.1" && "12 a 20 comungantes"}
                        {grad.codigo === "10.1" && "20 a 33 comungantes"}
                        {grad.codigo === "MEL" && "33 a 66 comungantes"}
                        {grad.codigo === "GEL" && "Uso ultra personalizado"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perfil Litúrgico e Sensorial */}
                <div className="space-y-1.5 text-xs text-areia-300 font-light leading-relaxed">
                  <p>
                    <strong className="text-areia-100 font-medium font-serif">Perfil Fitoquímico &amp; Sensorial:</strong>{" "}
                    {grad.perfilLiturgico}
                  </p>
                  <p>
                    <strong className="text-areia-100 font-medium font-serif">Indicação Ritualística:</strong>{" "}
                    {grad.indicacaoRito}
                  </p>
                </div>
              </div>

              {/* Dica de Preparo e Homogeneização */}
              <div className="pt-2 border-t border-ambar-500/10 text-[10px] text-areia-400/80 flex items-center justify-between">
                <span>Decantação natural: agitar suavemente antes de servir</span>
                <span className="text-ambar-400 font-mono">100% Tucunacá &amp; Rainha</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEÇÃO OFICIAL: TABELA CANÔNICA DE DILUIÇÃO E RECONSTITUIÇÃO 10:1 WIRAPURU */}
      <div className="documento-a4-impressao p-6 rounded-2xl bg-floresta-950/90 border border-ambar-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-ambar-500/20 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-ambar-400" />
              <h3 className="font-serif text-base font-bold text-areia-100">
                Tabela Canônica de Diluição &amp; Reconstituição (10:1 Wirapuru)
              </h3>
            </div>
            <p className="text-xs text-areia-300 font-light">
              Protocolo técnico para obtenção de graduações canônicas a partir do concentrado semi-mel hiperosmótico.
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
            Proporções Oficiais do Caderno
          </span>
        </div>

        {/* Tabela de Reconstituição */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-areia-200 border-collapse">
            <thead>
              <tr className="border-b border-ambar-500/20 text-[11px] font-mono uppercase text-ambar-400 tracking-wider">
                <th className="pb-3 font-bold">Volume de 10:1 Base</th>
                <th className="pb-3 font-bold">Água Mineral Estéril (45-50°C)</th>
                <th className="pb-3 font-bold">Volume Final Obtido</th>
                <th className="pb-3 font-bold">Graduação Resultante</th>
                <th className="pb-3 font-bold text-right">Cálices Estimados (60ml)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ambar-500/10 font-mono text-xs">
              {TABELA_DILUICAO_WIRAPURU.map((item, idx) => (
                <tr key={idx} className="hover:bg-floresta-900/40 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-areia-100">
                    {item.volumeInicial10}
                  </td>
                  <td className="py-3 pr-4 text-amber-300 font-bold">
                    + {item.aguaEstreilAdicionar}
                  </td>
                  <td className="py-3 pr-4 text-areia-200">
                    = {item.volumeFinal}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="bg-floresta-900 border border-ambar-500/30 text-ambar-400 px-2 py-0.5 rounded text-[11px] font-bold">
                      {item.graduacaoObtida}
                    </span>
                  </td>
                  <td className="py-3 text-right font-bold text-emerald-400">
                    ~{item.calicesEstimados60ml} cálices
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Protocolo Operacional Padrão de Reconstituição */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-light text-areia-300">
          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/15 space-y-1">
            <span className="font-mono text-[10px] text-ambar-400 uppercase font-bold block flex items-center gap-1">
              <Thermometer className="h-3.5 w-3.5" /> 1. Temperatura da Água
            </span>
            <p className="text-[11px] text-areia-300 leading-relaxed">
              Utilize exclusivamente água mineral estéril aquecida entre <strong>45°C e 50°C</strong>. A água morna desfaz as cadeias viscosas sem degradar os alcaloides termossensíveis (DMT e Harmina).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/15 space-y-1">
            <span className="font-mono text-[10px] text-ambar-400 uppercase font-bold block flex items-center gap-1">
              <FlaskConical className="h-3.5 w-3.5" /> 2. Homogeneização Lenta
            </span>
            <p className="text-[11px] text-areia-300 leading-relaxed">
              Despeje a água lentamente sobre o concentrado em recipiente de inox ou vidro esterilizado, mexendo com colher de inox em movimentos em &quot;8&quot; por 3 a 5 minutos até completa dissolução.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/15 space-y-1">
            <span className="font-mono text-[10px] text-ambar-400 uppercase font-bold block flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> 3. Refrigeração &amp; Validade
            </span>
            <p className="text-[11px] text-areia-300 leading-relaxed">
              Uma vez diluído, o sacramento perde a proteção hiperosmótica do semi-mel e <strong>DEVE ser mantido sob refrigeração contínua (2°C a 8°C)</strong>, com validade recomendada de <strong>até 60 dias</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Dicas de Conservação e Armazenamento Geral */}
      <div className="p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20 text-xs text-areia-300 space-y-3">
        <h4 className="font-serif text-sm font-bold text-areia-100 flex items-center gap-2">
          <TreePine className="h-4 w-4 text-ambar-400" />
          <span>Diretrizes Canônicas de Guarda nas Dependências do Templo</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-light">
          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10">
            <strong className="text-areia-100 block font-medium">1. Posição e Temperatura</strong>
            <p className="text-areia-300 leading-relaxed text-[11px]">
              Mantenha as garrafas sempre na vertical, em ambiente seco, fresco e sem exposição direta ao sol. Concentrados puros (10:1) conservam-se em temperatura ambiente fresca por até 18 meses.
            </p>
          </div>
          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10">
            <strong className="text-areia-100 block font-medium">2. Alívio de Pressão Natural</strong>
            <p className="text-areia-300 leading-relaxed text-[11px]">
              Caso a garrafa apresente estufamento leve por liberação de CO₂ dos açúcares botânicos durante o transporte, gire a tampa lentamente para despressurizar sem espirrar o líquido.
            </p>
          </div>
          <div className="space-y-1 p-3 rounded-xl bg-floresta-900/50 border border-ambar-500/10">
            <strong className="text-areia-100 block font-medium">3. Homogeneização Litúrgica</strong>
            <p className="text-areia-300 leading-relaxed text-[11px]">
              A borra que se forma no fundo é matéria vegetal rica em alcaloides ativos precipitados. Agite a garrafa em movimentos circulares antes de abrir para uniformizar a concentração em todos os cálices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
