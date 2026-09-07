"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  FileText,
  Clock,
  Truck,
  Award,
  AlertCircle,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  Droplets,
  Layers,
  FlaskConical,
  Scale,
  Search,
  Filter,
  Eye,
  Plus,
  RefreshCw,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Check,
  PackageCheck,
  BadgeCheck,
  Compass,
  ArrowUpDown,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";

// Mock data de congregações cadastradas
const templosIniciais = [
  {
    id: "NAT-TEMPLO-842",
    nome: "Templo Céu do Cruzeiro",
    cidade: "São Paulo / SP",
    dirigente: "Padrinho Marcos Silva",
    cnpj: "34.567.890/0001-12",
    status: "HOMOLOGADO",
    graduacao: "10.1 Wirapuru (Semi-Mel)",
    volume: "10 Litros",
    dataAprovacao: "14/05/2025",
    membros: 45,
    conadAprovado: true,
  },
  {
    id: "NAT-TEMPLO-913",
    nome: "Fraternidade Rainha da Floresta",
    cidade: "Belo Horizonte / MG",
    dirigente: "Madrinha Helena Costa",
    cnpj: "45.678.901/0001-23",
    status: "EM_ANALISE",
    graduacao: "Medicina Mel (Concentrado)",
    volume: "5 kg",
    dataAprovacao: "Pendente",
    membros: 60,
    conadAprovado: true,
  },
  {
    id: "NAT-TEMPLO-955",
    nome: "Centro Espiritual Aliança de Luz",
    cidade: "Curitiba / PR",
    dirigente: "Dirigente Carlos Mendes",
    cnpj: "56.789.012/0001-34",
    status: "TRIAGEM_LITURGICA",
    graduacao: "5.1 Pituã (Bem-te-vi)",
    volume: "15 Litros",
    dataAprovacao: "Pendente",
    membros: 30,
    conadAprovado: false,
  },
  {
    id: "NAT-TEMPLO-982",
    nome: "Templo Caminho Solar",
    cidade: "Brasília / DF",
    dirigente: "Dirigente Ana Terra",
    cnpj: "67.890.123/0001-45",
    status: "HOMOLOGADO",
    graduacao: "7.1 Anhangatã (Rouxinol)",
    volume: "20 Litros",
    dataAprovacao: "02/02/2026",
    membros: 80,
    conadAprovado: true,
  },
];

// Mock data de lotes de feitio no Acre
const lotesFeitio = [
  {
    lote: "AC-2026-08",
    tipo: "10.1 Wirapuru (Semi-Mel)",
    volume: "120 Litros",
    status: "CONCLUIDO_LACRADO",
    feitor: "Mestre Caboclo (28 anos de dieta)",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Conforme (Harmina: 9,21 | THH: 4,20)",
    microbiologico: "Aprovado (Zero Coli)",
  },
  {
    lote: "AC-2026-09",
    tipo: "Medicina Mel (Alta Redução)",
    volume: "45 kg",
    status: "EM_REDUCAO_LENTA",
    feitor: "Mestre Caboclo",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Em análise refratométrica",
    microbiologico: "Em análise",
  },
  {
    lote: "AC-2026-10",
    tipo: "7.1 Anhangatã (Rouxinol)",
    volume: "80 Litros",
    status: "COLHEITA_CHACRONA",
    feitor: "Família Tradicional Feitora",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Agendado",
    microbiologico: "Pendente",
  },
  {
    lote: "AC-2026-11",
    tipo: "Medicina Gel (Densidade Máxima)",
    volume: "20 kg",
    status: "PLANEJADO",
    feitor: "Mestre Caboclo",
    origem: "Cruzeiro do Sul, Acre",
    laudo: "Programado",
    microbiologico: "Programado",
  },
];

// Mock data de envios e logística
const enviosLogistica = [
  {
    codigo: "ENV-2026-441",
    templo: "Templo Céu do Cruzeiro (São Paulo/SP)",
    lote: "Lote #AC-2026-08",
    item: "10.1 Wirapuru — 10 Litros",
    tipoEmbalagem: "Caixa Isotérmica Lacrada #08-A",
    status: "EM_TRANSITO_REFRIGERADO",
    previsao: "Chegada em 48h",
    rastreio: "NTV-SP-842-BR",
  },
  {
    codigo: "ENV-2026-442",
    templo: "Fraternidade Rainha da Floresta (Belo Horizonte/MG)",
    lote: "Lote #AC-2026-09",
    item: "Medicina Mel — 5 kg",
    tipoEmbalagem: "Acondicionamento Especial Hermético",
    status: "AGUARDANDO_DESPACHO",
    previsao: "Em preparação no entreposto Serra/ES",
    rastreio: "NTV-MG-913-BR",
  },
  {
    codigo: "ENV-2026-439",
    templo: "Templo Caminho Solar (Brasília/DF)",
    lote: "Lote #AC-2026-07",
    item: "7.1 Anhangatã — 20 Litros",
    tipoEmbalagem: "Caixa Isotérmica Selada #07-D",
    status: "ENTREGUE_CONSAGRADO",
    previsao: "Concluído",
    rastreio: "NTV-DF-982-BR",
  },
];

export const PortalDirigenteClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");
  const [activeTab, setActiveTab] = useState<"METRICAS" | "CREDENCIAMENTOS" | "LOTES" | "LOGISTICA" | "COOPERATIVISMO">("METRICAS");
  const [modoLogin, setModoLogin] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");

  // Campos do formulário
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Estado interativo de congregações
  const [templos, setTemplos] = useState(templosIniciais);
  const [filtroStatus, setFiltroStatus] = useState<string>("TODOS");
  const [buscaTemplo, setBuscaTemplo] = useState("");

  // Login handler inteligente
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoUpper = codigoAcesso.trim().toUpperCase();

    if (modoLogin === "ADMIN" || codigoUpper.includes("ADM") || codigoUpper === "ADMIN") {
      setUserRole("ADMIN");
      setIsAuthenticated(true);
      setErrorMsg("");
      return;
    }

    if (codigoUpper.length >= 4) {
      setUserRole("DIRIGENTE");
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Informe o código de homologação do templo (ex: NAT-TEMPLO-842) ou acesse como ADM.");
    }
  };

  // Atalhos de acesso rápido para testes
  const loginComoAdminRapido = () => {
    setCodigoAcesso("ADM-NATIVARAM");
    setSenhaAcesso("nativaram2026");
    setUserRole("ADMIN");
    setIsAuthenticated(true);
    setErrorMsg("");
  };

  const loginComoDirigenteRapido = () => {
    setCodigoAcesso("NAT-TEMPLO-842");
    setSenhaAcesso("senha123");
    setUserRole("DIRIGENTE");
    setIsAuthenticated(true);
    setErrorMsg("");
  };

  // Ações administrativas interativas
  const homologarTemplo = (id: string) => {
    setTemplos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "HOMOLOGADO",
              dataAprovacao: new Date().toLocaleDateString("pt-BR"),
              conadAprovado: true,
            }
          : t
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <AnimateOnScroll>
        <div className="mx-auto max-w-lg card-elevated rounded-2xl p-6 sm:p-10 space-y-6 border-ambar-500/30">
          {/* Cabeçalho */}
          <div className="text-center space-y-3">
            <div className="relative mx-auto flex items-center justify-center">
              <Logo variant="navbar" size={54} className="mx-auto" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
                Acesso Institucional & Gestão
              </h3>
              <p className="text-xs text-areia-400 font-light mt-1">
                Portal de homologação de congregações e administração da cooperativa.
              </p>
            </div>
          </div>

          {/* Alternador de Modo de Login (Dirigente x ADM) */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-floresta-900/90 border border-ambar-500/20 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setModoLogin("DIRIGENTE");
                setErrorMsg("");
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                modoLogin === "DIRIGENTE"
                  ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
                  : "text-areia-300 hover:text-areia-100"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Templo Homologado</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setModoLogin("ADMIN");
                setErrorMsg("");
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                modoLogin === "ADMIN"
                  ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
                  : "text-areia-300 hover:text-areia-100"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Gestão Cooperativa (ADM)</span>
            </button>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-300 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            {modoLogin === "ADMIN" ? (
              <>
                <Input
                  label="Identificação de Administrador (ADM)"
                  required
                  value={codigoAcesso}
                  onChange={(e) => setCodigoAcesso(e.target.value)}
                  placeholder="Ex: ADM-NATIVARAM ou admin"
                />
                <Input
                  label="Chave Mestra de Segurança"
                  type="password"
                  required
                  value={senhaAcesso}
                  onChange={(e) => setSenhaAcesso(e.target.value)}
                  placeholder="••••••••••••"
                />
              </>
            ) : (
              <>
                <Input
                  label="Código de Homologação do Templo *"
                  required
                  value={codigoAcesso}
                  onChange={(e) => setCodigoAcesso(e.target.value)}
                  placeholder="Ex: NAT-TEMPLO-842"
                />
                <Input
                  label="Chave do Dirigente / CPF *"
                  type="password"
                  required
                  value={senhaAcesso}
                  onChange={(e) => setSenhaAcesso(e.target.value)}
                  placeholder="••••••••••••"
                />
              </>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{modoLogin === "ADMIN" ? "Acessar Painel ADM" : "Autenticar Acesso"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Atalhos Rápidos para Criação e Testes Conjuntos */}
          <div className="pt-3 border-t border-ambar-500/15 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-areia-400 font-semibold block text-center">
              Acesso Rápido de Desenvolvimento:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginComoAdminRapido}
                className="py-2 px-3 rounded-lg border border-ambar-500/30 bg-floresta-900/60 hover:bg-floresta-800 text-[11px] text-ambar-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
                <span>Entrar como ADM</span>
              </button>
              <button
                type="button"
                onClick={loginComoDirigenteRapido}
                className="py-2 px-3 rounded-lg border border-ambar-500/30 bg-floresta-900/60 hover:bg-floresta-800 text-[11px] text-areia-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Building2 className="h-3.5 w-3.5 text-areia-400" />
                <span>Entrar como Templo</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <p className="text-[11px] text-areia-400 font-light">
              Ainda não possui homologação?{" "}
              <Link href="/credenciamento" className="text-ambar-400 hover:underline font-medium">
                Cadastre sua congregação aqui
              </Link>
              .
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    );
  }

  // ══════════════════════════════════════════════════════════
  // VISÃO 1: PAINEL ADMINISTRATIVO (CONSELHO GESTOR COOPERATIVA)
  // ══════════════════════════════════════════════════════════
  if (userRole === "ADMIN") {
    const templosFiltrados = templos.filter((t) => {
      const matchStatus = filtroStatus === "TODOS" || t.status === filtroStatus;
      const matchBusca =
        t.nome.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
        t.cidade.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
        t.dirigente.toLowerCase().includes(buscaTemplo.toLowerCase()) ||
        t.id.toLowerCase().includes(buscaTemplo.toLowerCase());
      return matchStatus && matchBusca;
    });

    return (
      <div className="space-y-8">
        {/* Barra Superior do Administrador */}
        <AnimateOnScroll>
          <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-ambar-500/30 bg-gradient-to-r from-floresta-950 via-floresta-900 to-floresta-950">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Conselho Gestor Cooperativo • Modo Administrador (ADM)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
                Painel de Controle Litúrgico & Operacional
              </h2>
              <p className="text-xs sm:text-sm text-areia-300 font-light">
                Gestão central de congregações, cadeia de custódia, laudos no Acre e logística refrigerada.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Alternador para simular visão de templo */}
              <button
                onClick={() => setUserRole("DIRIGENTE")}
                className="btn-secondary text-xs inline-flex items-center gap-2 px-4 py-2.5"
                title="Ver como um dirigente de templo enxerga a plataforma"
              >
                <Building2 className="h-3.5 w-3.5 text-ambar-400" />
                <span>Simular Visão do Templo</span>
              </button>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-2 px-4 py-2.5 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Abas de Navegação do ADM */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-ambar-500/20">
          {[
            { id: "METRICAS", label: "Visão Geral & Métricas", icon: <FlaskConical className="h-4 w-4" /> },
            { id: "CREDENCIAMENTOS", label: "Homologações de Templos", icon: <Building2 className="h-4 w-4" />, count: templos.length },
            { id: "LOTES", label: "Feitio no Acre & Lotes", icon: <Droplets className="h-4 w-4" /> },
            { id: "LOGISTICA", label: "Despachos & Rastreamento", icon: <Truck className="h-4 w-4" /> },
            { id: "COOPERATIVISMO", label: "Tabela Evolutiva & Cotas", icon: <Scale className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-ambar-500 text-floresta-950 font-bold shadow-md"
                  : "bg-floresta-900/50 text-areia-300 hover:text-areia-100 hover:bg-floresta-800/60 border border-ambar-500/10"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 rounded-full bg-floresta-950/80 px-1.5 py-0.2 text-[10px] text-amber-300">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* CONTEÚDO DA ABA 1: MÉTRICAS E VISÃO GERAL */}
        {activeTab === "METRICAS" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
                <div className="flex items-center justify-between text-ambar-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Templos Cadastrados</span>
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="text-3xl font-serif font-bold text-areia-100">{templos.length}</div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>2 congregações ativas • 2 em análise</span>
                </p>
              </div>

              <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
                <div className="flex items-center justify-between text-ambar-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Sacramento em Feitio</span>
                  <Droplets className="h-5 w-5" />
                </div>
                <div className="text-3xl font-serif font-bold text-areia-100">200 L</div>
                <p className="text-[11px] text-areia-400 font-light">
                  Lotes #08 e #10 em Cruzeiro do Sul/AC
                </p>
              </div>

              <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
                <div className="flex items-center justify-between text-ambar-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Formatos Mel & Gel</span>
                  <Layers className="h-5 w-5" />
                </div>
                <div className="text-3xl font-serif font-bold text-areia-100">65 kg</div>
                <p className="text-[11px] text-amber-300 font-medium">
                  Alta redução logística interestadual
                </p>
              </div>

              <div className="card-elevated rounded-2xl p-6 space-y-3 border-ambar-500/20">
                <div className="flex items-center justify-between text-ambar-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Despachos em Trânsito</span>
                  <Truck className="h-5 w-5" />
                </div>
                <div className="text-3xl font-serif font-bold text-areia-100">2 Lotes</div>
                <p className="text-[11px] text-emerald-400 font-medium">
                  Caixas térmicas lacradas refrigeradas
                </p>
              </div>
            </div>

            {/* Resumo Rápido de Ações */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/20">
                <div className="flex items-center justify-between border-b border-ambar-500/15 pb-4">
                  <h3 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-ambar-400" />
                    Últimas Solicitações de Homologação
                  </h3>
                  <button
                    onClick={() => setActiveTab("CREDENCIAMENTOS")}
                    className="text-xs text-ambar-400 hover:underline font-medium"
                  >
                    Ver todas →
                  </button>
                </div>

                <div className="space-y-3">
                  {templos.slice(0, 3).map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-areia-100">{t.nome}</span>
                          <span className="text-[10px] font-mono text-ambar-400">{t.id}</span>
                        </div>
                        <p className="text-xs text-areia-400 font-light">
                          {t.dirigente} • {t.cidade} • {t.graduacao}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {t.status === "HOMOLOGADO" ? (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                            Homologado
                          </span>
                        ) : (
                          <button
                            onClick={() => homologarTemplo(t.id)}
                            className="btn-primary py-1.5 px-3 text-[10px] font-bold uppercase tracking-wider"
                          >
                            Aprovar Templo
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/20">
                <div className="flex items-center justify-between border-b border-ambar-500/15 pb-4">
                  <h3 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-ambar-400" />
                    Feitio Ativo em Cruzeiro do Sul/AC
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">100% Tucunacá Purista</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-areia-100">Lote #AC-2026-08 (10.1 Wirapuru)</span>
                      <span className="text-emerald-400 font-medium">Concluído & Lacrado</span>
                    </div>
                    <p className="text-[11px] text-areia-400">
                      120L em resfriamento natural no Acre. Laudo microbiológico aprovado.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-areia-100">Lote #AC-2026-09 (Medicina Mel)</span>
                      <span className="text-amber-300 font-medium">Redução Contínua</span>
                    </div>
                    <p className="text-[11px] text-areia-400">
                      45 kg em ponto de mel. Destinado a otimização logística interestadual.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA 2: GESTÃO DE HOMOLOGAÇÕES & CREDENCIAMENTO */}
        {activeTab === "CREDENCIAMENTOS" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-areia-100">
                  Congregações & Homologações Litúrgicas
                </h3>
                <p className="text-xs text-areia-400 font-light">
                  Aprovação de atas, análise de conformidade jurídica e liberação de cotas de apoio.
                </p>
              </div>

              {/* Filtros */}
              <div className="flex items-center gap-2">
                {["TODOS", "HOMOLOGADO", "EM_ANALISE", "TRIAGEM_LITURGICA"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFiltroStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filtroStatus === st
                        ? "bg-ambar-500 text-floresta-950 font-bold"
                        : "bg-floresta-900 border border-ambar-500/20 text-areia-300 hover:text-areia-100"
                    }`}
                  >
                    {st === "TODOS" ? "Todos" : st === "HOMOLOGADO" ? "Homologados" : st === "EM_ANALISE" ? "Em Análise" : "Triagem"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabela de Congregações */}
            <div className="card-elevated rounded-2xl overflow-hidden border-ambar-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-floresta-900 text-ambar-400 border-b border-ambar-500/20">
                    <tr>
                      <th className="p-4 font-serif">Código & Templo</th>
                      <th className="p-4 font-serif">Dirigente & Cidade</th>
                      <th className="p-4 font-serif">CNPJ / Registro</th>
                      <th className="p-4 font-serif">Graduação / Formato</th>
                      <th className="p-4 font-serif">Status</th>
                      <th className="p-4 font-serif text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ambar-500/10 text-areia-300">
                    {templosFiltrados.map((templo) => (
                      <tr key={templo.id} className="hover:bg-floresta-900/40 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-areia-100 text-sm">{templo.nome}</div>
                          <span className="font-mono text-ambar-400 text-[11px]">{templo.id}</span>
                        </td>
                        <td className="p-4">
                          <div className="text-areia-200">{templo.dirigente}</div>
                          <span className="text-[11px] text-areia-400">{templo.cidade}</span>
                        </td>
                        <td className="p-4 font-mono text-areia-300">{templo.cnpj}</td>
                        <td className="p-4">
                          <span className="text-amber-300 font-medium">{templo.graduacao}</span>
                          <div className="text-[10px] text-areia-400">{templo.volume}</div>
                        </td>
                        <td className="p-4">
                          {templo.status === "HOMOLOGADO" ? (
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                              Homologado
                            </span>
                          ) : templo.status === "EM_ANALISE" ? (
                            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                              Em Análise
                            </span>
                          ) : (
                            <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-2.5 py-1 text-[10px] font-semibold text-blue-300">
                              Triagem Litúrgica
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {templo.status !== "HOMOLOGADO" ? (
                            <button
                              onClick={() => homologarTemplo(templo.id)}
                              className="btn-primary py-1.5 px-3 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1"
                            >
                              <Check className="h-3 w-3" />
                              <span>Homologar</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-areia-400 font-light italic">
                              Aprovado em {templo.dataAprovacao}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA 3: GESTÃO DE LOTES NO ACRE */}
        {activeTab === "LOTES" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-areia-100">
                  Feitio & Cadeia de Custódia em Cruzeiro do Sul/AC
                </h3>
                <p className="text-xs text-areia-400 font-light">
                  Controle de bateladas, monitoramento de biomassa Tucunacá e laudos analíticos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lotesFeitio.map((lote) => (
                <div
                  key={lote.lote}
                  className="card-elevated rounded-2xl p-6 space-y-4 border-ambar-500/20 bg-floresta-950/90"
                >
                  <div className="flex items-start justify-between border-b border-ambar-500/15 pb-3">
                    <div>
                      <span className="font-mono text-xs text-ambar-400 font-bold">Lote #{lote.lote}</span>
                      <h4 className="font-serif text-lg font-bold text-areia-100">{lote.tipo}</h4>
                    </div>
                    <span className="rounded-full bg-ambar-500/10 border border-ambar-500/30 px-2.5 py-1 text-[10px] font-semibold text-ambar-300">
                      Volume: {lote.volume}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                      <span className="text-areia-400 block text-[10px] font-light">Feitor Responsável</span>
                      <span className="font-semibold text-areia-100">{lote.feitor}</span>
                    </div>
                    <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                      <span className="text-areia-400 block text-[10px] font-light">Origem</span>
                      <span className="font-semibold text-areia-100">{lote.origem}</span>
                    </div>
                    <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                      <span className="text-areia-400 block text-[10px] font-light">Perfil de Alcaloides</span>
                      <span className="font-mono text-amber-300">{lote.laudo}</span>
                    </div>
                    <div className="rounded-lg bg-floresta-900/60 p-3 space-y-1">
                      <span className="text-areia-400 block text-[10px] font-light">Laudo Microbiológico</span>
                      <span className="font-semibold text-emerald-400">{lote.microbiologico}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA 4: LOGÍSTICA & RASTREAMENTO */}
        {activeTab === "LOGISTICA" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-areia-100">
                Cadeia de Transporte & Rastreamento Isotérmico
              </h3>
              <p className="text-xs text-areia-400 font-light">
                Monitoramento dos lotes enviados de Serra/ES até a sede dos templos homologados.
              </p>
            </div>

            <div className="space-y-4">
              {enviosLogistica.map((env) => (
                <div
                  key={env.codigo}
                  className="card-elevated rounded-2xl p-6 space-y-4 border-ambar-500/20 bg-floresta-950/90"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ambar-500/15 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-ambar-400">{env.codigo}</span>
                          <span className="text-[11px] text-areia-400 font-mono">({env.rastreio})</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-areia-100">{env.templo}</h4>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        env.status === "EM_TRANSITO_REFRIGERADO"
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                          : env.status === "AGUARDANDO_DESPACHO"
                          ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                          : "bg-blue-500/15 border border-blue-500/30 text-blue-300"
                      }`}
                    >
                      {env.status === "EM_TRANSITO_REFRIGERADO"
                        ? "Em Trânsito Refrigerado"
                        : env.status === "AGUARDANDO_DESPACHO"
                        ? "Aguardando Despacho"
                        : "Entregue e Consagrado"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-areia-300">
                    <div>
                      <span className="text-areia-400 block text-[10px] font-light">Item & Sacramento</span>
                      <strong className="text-areia-100">{env.item}</strong>
                    </div>
                    <div>
                      <span className="text-areia-400 block text-[10px] font-light">Tipo de Acondicionamento</span>
                      <span>{env.tipoEmbalagem}</span>
                    </div>
                    <div>
                      <span className="text-areia-400 block text-[10px] font-light">Previsão</span>
                      <span className="text-amber-300 font-medium">{env.previsao}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA 5: TABELA EVOLUTIVA & COOPERATIVISMO */}
        {activeTab === "COOPERATIVISMO" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-areia-100">
                Matriz de Cooperativismo Produtivo & Escala de Volume
              </h3>
              <p className="text-xs text-areia-400 font-light">
                Planejamento de cotas solidárias por litro e parâmetros para formatos especiais Mel e Gel.
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/20">
              <h4 className="font-serif text-base font-bold text-areia-100">
                Princípio da Tabela Evolutiva por Quantidade
              </h4>
              <p className="text-xs sm:text-sm text-areia-300 leading-relaxed font-light">
                A cooperativa não visa lucro. Toda a arrecadação é dimensionada de forma regressiva na cota unitária: quanto maior o lote encomendado pela instituição (ou por um conjunto de templos de uma mesma região), mais diluído fica o custo de frete aéreo e das diárias de campo na floresta, beneficiando fraternalmente toda a irmandade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
                  <span className="text-ambar-400 font-bold text-xs uppercase tracking-wider">Lotes Básicos (5 a 10L)</span>
                  <p className="text-xs text-areia-300 font-light">
                    Atendimento mínimo litúrgico para cerimônias de pequeno porte com despacho mensal regular.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
                  <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">Lotes Médios (10 a 30L)</span>
                  <p className="text-xs text-areia-300 font-light">
                    Otimização da caixa isotérmica completa, reduzindo o rateio de frete proporcional por litro.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Formatos Mel & Gel</span>
                  <p className="text-xs text-areia-300 font-light">
                    Concentração extrema de volume para envio compartilhado sem necessidade de refrigeramento constante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════
  // VISÃO 2: PORTAL DO DIRIGENTE (TEMPLO HOMOLOGADO)
  // ══════════════════════════════════════════════════════════
  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <AnimateOnScroll>
        <div className="card-elevated rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-ambar-500/30">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Homologação Ativa & Regularizada
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-areia-100">
              Templo Homologado #{codigoAcesso.toUpperCase() || "NAT-TEMPLO-842"}
            </h2>
            <p className="text-xs text-areia-300 font-light">
              Dirigente Responsável • Protocolo CONAD 01/2010 Regularizado
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setUserRole("ADMIN")}
              className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2"
              title="Voltar ao Painel Administrativo"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-ambar-400" />
              <span>Acessar Painel ADM</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="rounded-xl border border-pedra-700/60 bg-pedra-900/60 hover:bg-pedra-800 text-areia-300 text-xs inline-flex items-center gap-1.5 px-3 py-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimateOnScroll delay={100}>
          <div className="card-elevated rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between border-ambar-500/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                  Cota Litúrgica Ativa
                </span>
                <Award className="h-4 w-4 text-ambar-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-areia-100">
                10.1 Wirapuru (Semi-Mel)
              </h3>
            </div>
            <p className="text-xs text-areia-400 font-light">
              Volume: 10 Litros • Pureza Tucunacá Certificada
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="card-elevated rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between border-ambar-500/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                  Status de Envio
                </span>
                <Truck className="h-4 w-4 text-ambar-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-400">
                Em Trânsito Refrigerado
              </h3>
            </div>
            <p className="text-xs text-areia-400 font-light">
              Origem: Serra/ES → Destino: Sede Litúrgica
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <div className="card-elevated rounded-2xl p-6 space-y-3 h-full flex flex-col justify-between border-ambar-500/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-ambar-400 uppercase tracking-wider">
                  Antecedência Litúrgica
                </span>
                <Clock className="h-4 w-4 text-ambar-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-areia-100">
                Ciclo de 30 Dias
              </h3>
            </div>
            <p className="text-xs text-areia-400 font-light">
              Próxima abertura de cota: Outubro/2026
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Laudo de Conformidade */}
      <AnimateOnScroll delay={400}>
        <div className="card-elevated rounded-2xl p-6 sm:p-10 space-y-8 border-ambar-500/25">
          <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                Laudo de Conformidade & Cadeia de Custódia — Lote #AC-2026-08
              </h3>
              <p className="text-xs text-ambar-400 font-medium">
                Rastreabilidade documental e controle biológico completo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
              <span className="text-areia-400 block font-light">Feitor Responsável</span>
              <span className="font-semibold text-areia-100 font-serif">Mestre Caboclo (28 anos)</span>
            </div>
            <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
              <span className="text-areia-400 block font-light">Origem da Biomassa</span>
              <span className="font-semibold text-areia-100 font-serif">Cruzeiro do Sul, Acre</span>
            </div>
            <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
              <span className="text-areia-400 block font-light">Perfil de Alcaloides</span>
              <span className="font-semibold text-amber-300 font-mono">Harmina 9,21 • THH 4,20</span>
            </div>
            <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/90 p-4 space-y-1">
              <span className="text-areia-400 block font-light">Laudo Microbiológico</span>
              <span className="font-semibold text-emerald-400">100% Conforme (Zero Coli)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/assets/feitio/curadas/feitio-lote-garrafas.jpg"
                  alt="Conferência do lote de sacramentos após resfriamento no Acre"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <div className="p-3.5 text-[11px] text-areia-400 text-center font-light">
                Registro de conferência e lacração do Lote #AC-2026-08 em Cruzeiro do Sul/AC.
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-ambar-500/30 bg-floresta-950 group">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/assets/feitio/curadas/feitio-embalagem-custodia.jpg"
                  alt="Embalagem isotérmica do sacramento preparada para despacho"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <div className="p-3.5 text-[11px] text-areia-400 text-center font-light">
                Embalagem isotérmica refrigerada selada para envio aéreo protegido.
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
};
