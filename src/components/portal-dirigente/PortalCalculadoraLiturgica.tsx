"use client";

import React, { useState } from "react";
import {
  Calculator,
  Users,
  FlaskConical,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  Droplets,
  Thermometer,
  Clock,
  Printer,
  Coins,
  TrendingDown,
  Info,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  GRADUACOES_SACRAMENTAIS,
  TABELA_EVOLUTIVA_RATEIO,
  CONDICOES_RATEIO_COOPERATIVO,
  obterCotaRateio,
} from "@/data/graduacoes";

interface PortalCalculadoraLiturgicaProps {
  onIrParaSolicitacao: () => void;
}

export const PortalCalculadoraLiturgica: React.FC<PortalCalculadoraLiturgicaProps> = ({
  onIrParaSolicitacao,
}) => {
  const [modoAba, setModoAba] = useState<"CERIMONIA" | "RECONSTITUICAO" | "TABELA_EVOLUTIVA">("CERIMONIA");

  // Estados do Modo Cerimônia
  const [numParticipantes, setNumParticipantes] = useState<number>(25);
  const [graduacaoId, setGraduacaoId] = useState<string>("5.1_PITUA");
  const [comRepasse, setComRepasse] = useState<boolean>(true);
  const [incluirRape, setIncluirRape] = useState<boolean>(true);
  const [incluirSananga, setIncluirSananga] = useState<boolean>(true);

  // Estados do Modo Reconstituição 10:1 Wirapuru
  const [litros10Base, setLitros10Base] = useState<number>(1);
  const [alvoReconst, setAlvoReconst] = useState<"7.1" | "5.1" | "3.1">("5.1");

  const graduacao =
    GRADUACOES_SACRAMENTAIS.find((g) => g.id === graduacaoId) || GRADUACOES_SACRAMENTAIS[1];

  // Cálculo da dose base em ml conforme a graduação
  const doseBaseMl = (() => {
    switch (graduacao.codigo) {
      case "3.1":
        return 100;
      case "5.1":
        return 80;
      case "7.1":
        return 65;
      case "10.1":
        return 40;
      case "MEL":
        return 20;
      default:
        return 80;
    }
  })();

  // Multiplicador por pessoa: 1 dose ou dose + repasse (+50%)
  const dosePorPessoaMl = comRepasse ? doseBaseMl * 1.5 : doseBaseMl;
  const volumeLiquidoMl = numParticipantes * dosePorPessoaMl;
  const volumeComMargemMl = volumeLiquidoMl * 1.15;
  const litrosRecomendados = Math.max(1, Math.ceil(volumeComMargemMl / 1000));
  const rapeRecomendadoGramas = numParticipantes * 1.5;
  const frascosRapeSugeridos = Math.max(1, Math.ceil(rapeRecomendadoGramas / 25));
  const gotasSananga = numParticipantes * 4;
  const frascosSanangaSugeridos = Math.max(1, Math.ceil(gotasSananga / 200));

  // Rateio Cooperativo do Modo Cerimônia
  const cotaAyahuasca = obterCotaRateio(graduacao.id, litrosRecomendados);
  const rateioRape = incluirRape ? frascosRapeSugeridos * 65 : 0;
  const rateioSananga = incluirSananga ? frascosSanangaSugeridos * 80 : 0;
  // Acima de 20 L o total é definido pelo Conselho (valorTotal null): não há soma a exibir.
  const rateioTotalCerimonia =
    cotaAyahuasca.valorTotal === null ? null : cotaAyahuasca.valorTotal + rateioRape + rateioSananga;
  const rateioPorParticipante =
    rateioTotalCerimonia !== null && numParticipantes > 0 ? rateioTotalCerimonia / numParticipantes : null;

  // Cálculos do Modo Reconstituição 10:1
  const dadosReconst = (() => {
    switch (alvoReconst) {
      case "7.1":
        return {
          nome: "7:1 Anhangatã (Concentração Elevada)",
          aguaPorLitroMl: 430,
          fatorMultiplicador: 1.43,
          calicesPorLitro10: 24,
          brixEsperado: "16 a 20 °Brix",
        };
      case "5.1":
        return {
          nome: "5:1 Pituã (Equilíbrio Canônico)",
          aguaPorLitroMl: 1000,
          fatorMultiplicador: 2.0,
          calicesPorLitro10: 33,
          brixEsperado: "11 a 14 °Brix",
        };
      case "3.1":
        return {
          nome: "3:1 Mainumbi (Força Suave)",
          aguaPorLitroMl: 2330,
          fatorMultiplicador: 3.33,
          calicesPorLitro10: 55,
          brixEsperado: "7 a 9 °Brix",
        };
    }
  })();

  const aguaTotalMl = litros10Base * dadosReconst.aguaPorLitroMl;
  const volumeFinalLitrosNum = Number((litros10Base * dadosReconst.fatorMultiplicador).toFixed(2));
  const calicesTotais = Math.floor(litros10Base * dadosReconst.calicesPorLitro10);

  // Rateio da Reconstituição
  const cotaWirapuru10 = obterCotaRateio("10.1", litros10Base);
  // O controle vai até 20 L, sempre dentro das faixas com valor definido.
  const custoBase10 = litros10Base * cotaWirapuru10.valorUnitario;
  // Referência: o mesmo volume final pedido já pronto, na faixa desse volume.
  const cotaLoteProntoRef = obterCotaRateio(alvoReconst, volumeFinalLitrosNum).valorUnitario;
  const custoEfetivoPorLitroReconst = volumeFinalLitrosNum > 0 ? custoBase10 / volumeFinalLitrosNum : 0;
  const economiaPorLitroReconst = Math.max(0, cotaLoteProntoRef - custoEfetivoPorLitroReconst);
  const custoPorCalice = calicesTotais > 0 ? custoBase10 / calicesTotais : 0;

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Alternador de Modos */}
      <div className="p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Calculadora Litúrgica &amp; Reconstituição de Sacramento
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed">
            Planeje o dimensionamento e rateio da cerimônia por comungantes, calcule a diluição matemática do 10:1 Wirapuru ou consulte a tabela evolutiva de cotas por volume.
          </p>
        </div>

        {/* Alternador de 3 Abas */}
        <div className="flex items-center p-1 rounded-xl bg-floresta-900 border border-ambar-500/20 flex-wrap gap-1">
          <button
            onClick={() => setModoAba("CERIMONIA")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              modoAba === "CERIMONIA"
                ? "bg-ambar-500 text-floresta-950 font-bold shadow"
                : "text-areia-300 hover:text-areia-100"
            }`}
          >
            Dimensionar Cerimônia
          </button>
          <button
            onClick={() => setModoAba("RECONSTITUICAO")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              modoAba === "RECONSTITUICAO"
                ? "bg-ambar-500 text-floresta-950 font-bold shadow"
                : "text-areia-300 hover:text-areia-100"
            }`}
          >
            Reconstituição 10:1
          </button>
          <button
            onClick={() => setModoAba("TABELA_EVOLUTIVA")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              modoAba === "TABELA_EVOLUTIVA"
                ? "bg-ambar-500 text-floresta-950 font-bold shadow"
                : "text-areia-300 hover:text-areia-100"
            }`}
          >
            Tabela de Cotas
          </button>
        </div>
      </div>

      {/* ABA 1: MODO CERIMÔNIA */}
      {modoAba === "CERIMONIA" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Painel de Controles (7 Colunas) */}
          <div className="lg:col-span-7 space-y-5 p-6 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
            {/* Número de Participantes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-areia-100 flex items-center gap-2">
                  <Users className="h-4 w-4 text-ambar-400" />
                  <span>Número Esperado de Participantes</span>
                </label>
                <span className="text-xs font-mono font-bold text-ambar-400 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                  {numParticipantes} pessoas
                </span>
              </div>

              {/* Botões rápidos de pessoas */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {[15, 25, 35, 50, 80].map((qtd) => (
                  <button
                    key={qtd}
                    type="button"
                    onClick={() => setNumParticipantes(qtd)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-semibold text-center transition-all ${
                      numParticipantes === qtd
                        ? "bg-ambar-500 text-floresta-950 font-bold"
                        : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 border border-ambar-500/15"
                    }`}
                  >
                    {qtd}
                  </button>
                ))}
              </div>

              {/* Slider interativo */}
              <input
                type="range"
                min={5}
                max={150}
                step={1}
                value={numParticipantes}
                onChange={(e) => setNumParticipantes(Number(e.target.value))}
                className="w-full accent-ambar-500 cursor-pointer"
              />
            </div>

            {/* Seleção de Graduação */}
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold text-areia-100 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-ambar-400" />
                <span>Graduação Litúrgica Adotada</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GRADUACOES_SACRAMENTAIS.slice(0, 4).map((g) => {
                  const cotaRef = obterCotaRateio(g.id, litrosRecomendados);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGraduacaoId(g.id)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        graduacaoId === g.id
                          ? "bg-floresta-900 border-ambar-500 text-areia-100 shadow-solar"
                          : "bg-floresta-900/40 border-ambar-500/15 text-areia-300 hover:bg-floresta-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-ambar-400">
                          Graduação {g.codigo}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          R$ {cotaRef.valorUnitario}/L
                        </span>
                      </div>
                      <div className="font-serif text-xs font-bold mt-0.5">{g.nomeSagrado}</div>
                      <div className="text-[10px] text-areia-400 font-light mt-0.5">Dose: {g.porcaoSugerida}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opções de Repasse e Sacramentos Adicionais */}
            <div className="pt-2 border-t border-ambar-500/15 space-y-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-areia-200">
                <input
                  type="checkbox"
                  checked={comRepasse}
                  onChange={(e) => setComRepasse(e.target.checked)}
                  className="rounded accent-ambar-500 h-4 w-4"
                />
                <span>
                  <strong>Contemplar 2ª Dose (Repasse prudente):</strong> adiciona +50% à porção inicial por pessoa.
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-areia-200">
                <input
                  type="checkbox"
                  checked={incluirRape}
                  onChange={(e) => setIncluirRape(e.target.checked)}
                  className="rounded accent-ambar-500 h-4 w-4"
                />
                <span>
                  <strong>Dimensionar Rapé Sagrado:</strong> estimativa média de 1,5g por participante (R$ 65/frasco 25g).
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-areia-200">
                <input
                  type="checkbox"
                  checked={incluirSananga}
                  onChange={(e) => setIncluirSananga(e.target.checked)}
                  className="rounded accent-ambar-500 h-4 w-4"
                />
                <span>
                  <strong>Dimensionar Sananga Ancestral:</strong> abertura sensorial refrigerada a 4°C (R$ 80/frasco 10ml).
                </span>
              </label>
            </div>
          </div>

          {/* Painel de Resultados Cerimônia (5 Colunas) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 border border-ambar-500/35 flex flex-col justify-between space-y-5 shadow-elevated-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-ambar-500/20 pb-3">
                <span className="font-serif text-sm font-bold text-areia-100">
                  Dimensionamento Litúrgico
                </span>
                <span className="text-[10px] font-mono text-ambar-400 uppercase">
                  {numParticipantes} participantes
                </span>
              </div>

              {/* Destaque do Volume de Ayahuasca */}
              <div className="p-4 rounded-xl bg-floresta-950/80 border border-ambar-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Volume Recomendado de Ayahuasca
                </span>
                <div className="font-serif text-3xl font-black text-areia-100 text-glow">
                  {litrosRecomendados} Litros
                </div>
                <p className="text-[10px] text-areia-400 font-light">
                  Graduação {graduacao.codigo} {graduacao.nomeSagrado} • {comRepasse ? "Com repasse" : "Dose única"} (+15% margem)
                </p>
              </div>

              {/* CARD DE RATEIO COOPERATIVO INTEGRADO */}
              <div className="p-3.5 rounded-xl bg-floresta-950/90 border border-ambar-500/25 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-ambar-400 uppercase font-bold flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5" /> Rateio Cooperativo Estimado
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    {cotaAyahuasca.faixaLabel}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-black font-serif text-areia-100">
                      {rateioTotalCerimonia === null
                        ? "Sob consulta ao Conselho"
                        : `R$ ${rateioTotalCerimonia.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                    </span>
                    <span className="text-[10px] text-areia-400 block mt-0.5">
                      Ayahuasca: R$ {cotaAyahuasca.valorUnitario}/L
                      {incluirRape || incluirSananga ? " + apoios litúrgicos" : ""}
                    </span>
                  </div>

                  {rateioPorParticipante !== null && (
                    <div className="text-right">
                      <span className="text-base font-bold text-amber-300 font-mono">
                        ~R$ {rateioPorParticipante.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-areia-400 block">por participante</span>
                    </div>
                  )}
                </div>

                {cotaAyahuasca.economiaTotal > 0 && (
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1.5 border-t border-ambar-500/10">
                    <TrendingDown className="h-3 w-3" />
                    <span>
                      Economia por escala solidária: <strong>R$ {cotaAyahuasca.economiaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> no lote de Ayahuasca.
                    </span>
                  </div>
                )}

                {litrosRecomendados < 5 && (
                  <div className="text-[10px] text-amber-300/90 pt-1 border-t border-ambar-500/10 flex items-start gap-1">
                    <Info className="h-3 w-3 shrink-0 mt-0.5" />
                    <span>Lote mínimo operacional é de 5 Litros. Cota unitária calculada com a faixa base de 5 a 10L.</span>
                  </div>
                )}
              </div>

              {/* Sacramentos de Apoio */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {incluirRape && (
                  <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                    <span className="text-[9px] font-mono text-ambar-400 block uppercase">Rapé Sugerido</span>
                    <div className="font-bold text-areia-100 mt-0.5">
                      {frascosRapeSugeridos} frasco(s) de 25g
                    </div>
                    <span className="text-[9px] text-areia-400">R$ {rateioRape.toFixed(2)} (~{rapeRecomendadoGramas.toFixed(0)}g total)</span>
                  </div>
                )}

                {incluirSananga && (
                  <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                    <span className="text-[9px] font-mono text-ambar-400 block uppercase">Sananga Sugerida</span>
                    <div className="font-bold text-areia-100 mt-0.5">
                      {frascosSanangaSugeridos} frasco de 10ml
                    </div>
                    <span className="text-[9px] text-areia-400">R$ {rateioSananga.toFixed(2)} (Refrig. 4°C)</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-areia-300/80 leading-relaxed font-light italic">
                &ldquo;A precisão na dosagem honra a força do sacramento e previne descompassos desnecessários na egrégora do salão.&rdquo;
              </p>
            </div>

            <button
              onClick={onIrParaSolicitacao}
              className="btn-primary w-full justify-center text-xs py-3 shadow-solar flex items-center gap-2"
            >
              <span>Montar Solicitação de Partilha Agora</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ABA 2: MODO RECONSTITUIÇÃO 10:1 WIRAPURU */}
      {modoAba === "RECONSTITUICAO" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controles de Reconstituição (7 Colunas) */}
          <div className="lg:col-span-7 space-y-5 p-6 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
            {/* Volume de 10:1 que o dirigente possui */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-areia-100 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-amber-400" />
                  <span>Volume de 10:1 Wirapuru Disponível</span>
                </label>
                <span className="text-xs font-mono font-bold text-ambar-400 bg-floresta-900 px-2 py-0.5 rounded border border-ambar-500/20">
                  {litros10Base} Litro{litros10Base > 1 ? "s" : ""} (Cota: R$ {cotaWirapuru10.valorUnitario}/L)
                </span>
              </div>

              {/* Botões rápidos */}
              <div className="flex gap-2">
                {[1, 2, 3, 5, 10].map((litros) => (
                  <button
                    key={litros}
                    type="button"
                    onClick={() => setLitros10Base(litros)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      litros10Base === litros
                        ? "bg-ambar-500 text-floresta-950 font-bold"
                        : "bg-floresta-900/60 text-areia-300 hover:bg-floresta-800 border border-ambar-500/15"
                    }`}
                  >
                    {litros}L
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={0.5}
                max={20}
                step={0.5}
                value={litros10Base}
                onChange={(e) => setLitros10Base(Number(e.target.value))}
                className="w-full accent-ambar-500 cursor-pointer"
              />
              {litros10Base < 5 && (
                <div className="text-[10px] text-amber-300/90 flex items-start gap-1">
                  <Info className="h-3 w-3 shrink-0 mt-0.5" />
                  <span>Lote mínimo operacional é de 5 Litros. Volumes menores servem só para planejar o uso de um lote já recebido.</span>
                </div>
              )}
            </div>

            {/* Graduação Alvo Desejada */}
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold text-areia-100 flex items-center gap-2">
                <Droplets className="h-4 w-4 text-amber-400" />
                <span>Graduação Alvo que Deseja Obter</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: "7.1" as const,
                    codigo: "7:1",
                    nome: "Anhangatã",
                    sub: "+430ml de água por Litro",
                  },
                  {
                    id: "5.1" as const,
                    codigo: "5:1",
                    nome: "Pituã (Canônico)",
                    sub: "+1.000ml de água por Litro",
                  },
                  {
                    id: "3.1" as const,
                    codigo: "3:1",
                    nome: "Mainumbi",
                    sub: "+2.330ml de água por Litro",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAlvoReconst(item.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      alvoReconst === item.id
                        ? "bg-floresta-900 border-ambar-500 text-areia-100 shadow-solar"
                        : "bg-floresta-900/40 border-ambar-500/15 text-areia-300 hover:bg-floresta-900/60"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-ambar-400 block">
                      Graduação {item.codigo}
                    </span>
                    <span className="font-serif text-xs font-bold block mt-0.5">
                      {item.nome}
                    </span>
                    <span className="text-[10px] text-areia-400 block mt-1">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Protocolo Operacional Padrão */}
            <div className="p-4 rounded-xl bg-floresta-900/50 border border-ambar-500/15 space-y-2 text-xs text-areia-300">
              <span className="font-mono text-xs text-amber-400 uppercase font-bold block flex items-center gap-1.5">
                <Thermometer className="h-4 w-4" /> Diretrizes de Reconstituição
              </span>
              <ul className="space-y-1.5 font-light text-[11px] leading-relaxed list-disc list-inside text-areia-200">
                <li>
                  Aquecer a água mineral estéril exclusivamente entre <strong>45°C e 50°C</strong> para manter a integridade dos alcaloides.
                </li>
                <li>
                  Misturar gradualmente utilizando colher de inox esterilizada até obter líquido perfeitamente homogêneo e translúcido.
                </li>
                <li>
                  Conservar sob refrigeração contínua (2°C a 8°C). Consumir no prazo máximo de 60 dias.
                </li>
              </ul>
            </div>
          </div>

          {/* Resultado da Reconstituição (5 Colunas) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-floresta-900 via-floresta-950 to-floresta-900 border border-ambar-500/35 flex flex-col justify-between space-y-5 shadow-elevated-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-ambar-500/20 pb-3">
                <span className="font-serif text-sm font-bold text-areia-100">
                  Resultado da Reconstituição
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Proporção Canônica
                </span>
              </div>

              {/* Volume de Água a Adicionar */}
              <div className="p-4 rounded-xl bg-floresta-950/80 border border-amber-500/30 text-center space-y-1">
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Água Mineral Estéril a Adicionar (45-50°C)
                </span>
                <div className="font-serif text-3xl font-black text-amber-300 text-glow">
                  {aguaTotalMl >= 1000
                    ? `${(aguaTotalMl / 1000).toFixed(2)} Litros`
                    : `${aguaTotalMl} ml`}
                </div>
                <p className="text-[10px] text-areia-400 font-light">
                  Adicionar sobre os {litros10Base}L de 10:1 Wirapuru
                </p>
              </div>

              {/* Detalhamento do Rendimento Final */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                  <span className="text-[9px] font-mono text-ambar-400 block uppercase">
                    Volume Final Obtido
                  </span>
                  <div className="font-bold text-areia-100 mt-0.5 text-base">
                    {volumeFinalLitrosNum} L
                  </div>
                  <span className="text-[9px] text-areia-400">{dadosReconst.nome}</span>
                </div>

                <div className="p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/15">
                  <span className="text-[9px] font-mono text-ambar-400 block uppercase">
                    Cálices Estimados (60ml)
                  </span>
                  <div className="font-bold text-emerald-400 mt-0.5 text-base">
                    ~{calicesTotais} cálices
                  </div>
                  <span className="text-[9px] text-areia-400">{dadosReconst.brixEsperado}</span>
                </div>
              </div>

              {/* CARD DE ECONOMIA EFETIVA POR RECONSTITUIÇÃO */}
              <div className="p-3.5 rounded-xl bg-floresta-950/80 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-400 font-bold font-mono text-[10px] uppercase">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="h-3.5 w-3.5" /> Economia Efetiva por Reconstituição
                  </span>
                  <span>R$ {custoPorCalice.toFixed(2)}/cálice</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-areia-200">
                  <div className="p-2 rounded-lg bg-floresta-900/60 border border-ambar-500/10">
                    <span className="text-[9px] text-areia-400 block">Custo Efetivo Final</span>
                    <span className="font-bold text-emerald-300 text-sm">
                      R$ {custoEfetivoPorLitroReconst.toFixed(2)} / L
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-floresta-900/60 border border-ambar-500/10">
                    <span className="text-[9px] text-areia-400 block">Poupança por Litro</span>
                    <span className="font-bold text-amber-300 text-sm">
                      + R$ {economiaPorLitroReconst.toFixed(2)} / L
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-areia-400 font-light leading-relaxed">
                  Ao transportar 10:1 hiperosmótico e reconstituir no templo com água estéril morna, sua congregação economiza até 70% em frete aéreo e barateia a cota final de forma substancial.
                </p>
              </div>
            </div>

            <button
              onClick={onIrParaSolicitacao}
              className="btn-primary w-full justify-center text-xs py-3 shadow-solar flex items-center gap-2"
            >
              <span>Solicitar Sacramento 10:1</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ABA 3: TABELA EVOLUTIVA COMPLETA INTEGRADA */}
      {modoAba === "TABELA_EVOLUTIVA" && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-6 rounded-2xl bg-floresta-950/90 border border-ambar-500/30 space-y-4 shadow-elevated-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-ambar-500/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-ambar-400 uppercase tracking-widest block">
                  Cotas Oficiais de Rateio Operacional
                </span>
                <h4 className="font-serif text-lg font-bold text-areia-100">
                  Tabela Evolutiva Completa de Graduações &amp; Volumes
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                À Vista • Cartão c/ Repasse de Taxa
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-areia-200 border-collapse">
                <thead>
                  <tr className="border-b border-ambar-500/20 text-[11px] font-mono uppercase text-ambar-400 tracking-wider">
                    <th className="pb-3 pr-3 font-bold">Graduação</th>
                    <th className="pb-3 pr-3 font-bold">Biomassa</th>
                    <th className="pb-3 pr-3 font-bold">Lotes 5 a 10L</th>
                    <th className="pb-3 pr-3 font-bold text-emerald-400">Escala 10 a 20L</th>
                    <th className="pb-3 pr-3 font-bold text-right">Acima de 20L</th>
                    <th className="pb-3 text-right font-bold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ambar-500/10 font-mono text-xs">
                  {TABELA_EVOLUTIVA_RATEIO.map((item) => (
                    <tr key={item.graduacaoId} className="hover:bg-floresta-900/40 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-floresta-900 border border-ambar-500/30 text-ambar-400 px-2 py-0.5 rounded text-[11px] font-bold">
                            {item.codigo}
                          </span>
                          <span className="font-serif font-bold text-areia-100">
                            {item.nome}
                          </span>
                        </div>
                        <span className="text-[10px] text-areia-400 font-sans block mt-0.5">
                          {item.observacao}
                        </span>
                      </td>

                      <td className="py-3.5 pr-3 text-areia-300 font-sans">
                        {item.proporcaoBiomassa}
                      </td>

                      <td className="py-3.5 pr-3 font-bold text-areia-100">
                        R$ {item.valor5a10L.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        <span className="text-[10px] text-areia-400 font-normal block font-sans">
                          /{item.unidade.split(" ")[0].toLowerCase()}
                        </span>
                      </td>

                      <td className="py-3.5 pr-3 font-bold text-emerald-400">
                        R$ {item.valor10a20L.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        <span className="text-[10px] text-emerald-400/90 font-normal block font-sans">
                          Economia: R$ {item.economiaPorUnidade},00
                        </span>
                      </td>

                      <td className="py-3.5 pr-3 text-right">
                        <span className="text-amber-300 text-[11px] font-sans bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                          A combinar
                        </span>
                      </td>

                      <td className="py-3.5 text-right font-sans">
                        {/* O dimensionamento de cerimônia calcula em litros; o Gel é medido em kg. */}
                        {item.unidade === "Litro" && (
                        <button
                          type="button"
                          onClick={() => {
                            const correspondente = GRADUACOES_SACRAMENTAIS.find(
                              (g) => g.id === item.graduacaoId || g.codigo === item.codigo
                            );
                            if (correspondente) {
                              setGraduacaoId(correspondente.id);
                            }
                            setModoAba("CERIMONIA");
                          }}
                          className="btn-secondary text-[11px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1"
                        >
                          <span>Dimensionar</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-ambar-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-areia-300">
              <span className="font-light">
                * Pedido sob encomenda com antecedência mínima de 30 dias. Mínimo: 5 Litros.
              </span>
              <button
                onClick={onIrParaSolicitacao}
                className="btn-primary text-xs px-4 py-2 rounded-xl shadow-solar inline-flex items-center gap-1.5"
              >
                <span>Ir para Solicitação de Partilha</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
