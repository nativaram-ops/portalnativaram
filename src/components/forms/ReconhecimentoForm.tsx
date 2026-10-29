"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReconhecimentoSchema,
  ReconhecimentoInput,
} from "@/lib/validators/reconhecimento";
import {
  generateProtocoloReconhecimento,
  formatReconhecimentoWhatsApp,
  STAGE_FIELDS_RECONHECIMENTO,
  ReconhecimentoDossier,
} from "@/lib/reconhecimento/engine";
import {
  GRADUACOES_SACRAMENTAIS,
  getGraduacaoPorId,
} from "@/data/graduacoes";
import {
  ShieldCheck,
  Sparkles,
  Users,
  Feather,
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Copy,
  ExternalLink,
  Flame,
  Award,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Scale,
  Calendar,
  Clock,
} from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";

const STEPS = [
  { id: 1, title: "Identidade & Caminhada", icon: Feather },
  { id: 2, title: "Parâmetros & Graduação", icon: Compass },
  { id: 3, title: "Guardião & Compromissos", icon: HeartHandshake },
];

const TIPOS_VINCULO = [
  {
    id: "GRUPO_EM_FORMACAO",
    title: "Grupo em Desenvolvimento",
    desc: "Círculos familiares, pequenas congregações ou rodas de oração em fase de estruturação.",
    badge: "Núcleo em Formação",
    icon: Users,
  },
  {
    id: "REZADOR_AUTONOMO",
    title: "Rezador Tradicional / Condutor",
    desc: "Condutor individual com caminhada comprovada que facilita ritos em ponto próprio.",
    badge: "Condutor Autônomo",
    icon: Feather,
  },
  {
    id: "CIRCULO_ESTUDOS",
    title: "Círculo de Estudos & Orações",
    desc: "Núcleos voltados ao aprofundamento doutrinário, espiritual e cantos tradicionais.",
    badge: "Estudos Livres",
    icon: Compass,
  },
  {
    id: "COMUNIDADE_TRADICIONAL",
    title: "Comunidade Tradicional",
    desc: "Aldeias, comunidades caboclas, quilombolas ou associações comunitárias do interior.",
    badge: "Tradição Ancestral",
    icon: Flame,
  },
] as const;

export const ReconhecimentoForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dossier, setDossier] = useState<ReconhecimentoDossier | null>(null);
  const [copied, setCopied] = useState(false);
  const [whatsappDirectUrl, setWhatsappDirectUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReconhecimentoInput>({
    resolver: zodResolver(ReconhecimentoSchema),
    defaultValues: {
      tipoVinculo: "GRUPO_EM_FORMACAO",
      graduacaoPretendida: "5.1_PITUA",
      frequenciaEncontros: "MENSAL",
      metodoContatoPreferencial: "WHATSAPP",
      litragemEstimadaMensal: "5",
    },
    mode: "onBlur",
  });

  const selectedTipo = watch("tipoVinculo");
  const selectedGraduacaoId = watch("graduacaoPretendida");
  const selectedGraduacao = getGraduacaoPorId(selectedGraduacaoId);

  const handleNext = async () => {
    const fieldsToValidate = STAGE_FIELDS_RECONHECIMENTO[currentStep];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(3, prev + 1));
      window.scrollTo({ top: 250, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 250, behavior: "smooth" });
  };

  const onSubmit = async (data: ReconhecimentoInput) => {
    const salvarCacheLocal = (protocoloGerado: string, dataEnvioStr: string) => {
      try {
        const key = "nativaram_solicitacoes_local";
        const atual = JSON.parse(localStorage.getItem(key) || "[]");
        const novoItem = {
          id: protocoloGerado,
          tipo: "GRUPO_INFORMAL" as const,
          nomeEntidade: data.nomeIdentificacao,
          nomeResponsavel: data.nomeResponsavel,
          telefone: data.telefoneContato,
          email: data.emailContato,
          cidade: data.cidade,
          estado: data.estado,
          linhagem: data.linhagemEspiritual,
          graduacao: data.graduacaoPretendida,
          volumeEstimado: `${data.litragemEstimadaMensal} Litros`,
          intencao: data.intencaoTrabalho,
          status: "PENDENTE_LIBERACAO" as const,
          dataEnvio: dataEnvioStr,
        };
        const filtrada = Array.isArray(atual)
          ? atual.filter((x: { id?: string }) => x?.id !== protocoloGerado)
          : [];
        localStorage.setItem(key, JSON.stringify([novoItem, ...filtrada]));
      } catch {
        // Ignora erro de localStorage
      }
    };

    const sincronizarApiSolicitacoes = async (protocoloGerado: string) => {
      try {
        await fetch("/api/solicitacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: protocoloGerado,
            tipo: "GRUPO_INFORMAL",
            nomeEntidade: data.nomeIdentificacao,
            nomeResponsavel: data.nomeResponsavel,
            telefone: data.telefoneContato,
            email: data.emailContato,
            cidade: data.cidade,
            estado: data.estado,
            linhagem: data.linhagemEspiritual,
            graduacao: data.graduacaoPretendida,
            volumeEstimado: `${data.litragemEstimadaMensal} Litros`,
            intencao: data.intencaoTrabalho,
          }),
        });
      } catch (errSync) {
        console.warn("Aviso ao sincronizar com ADM:", errSync);
      }
    };

    try {
      const res = await fetch("/api/reconhecimento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        setDossier(json.dossier);
        salvarCacheLocal(json.protocolo, json.dataSubmissao || new Date().toLocaleDateString("pt-BR"));

        // Mensagem formatada pedindo liberação direta do acesso
        const msgLiberacao = [
          `🌿 *COOPERATIVA NATIVARAM — PEDIDO DE LIBERAÇÃO DE ACESSO*`,
          ``,
          `Olá, Conselho Gestor da Cooperativa Nativaram!`,
          `Acabei de preencher a Ficha de Reconhecimento no portal e gostaria de solicitar a liberação de acesso ao Portal do Dirigente.`,
          ``,
          `📜 *Protocolo:* \`${json.protocolo}\``,
          `🪶 *Grupo / Rezo:* ${data.nomeIdentificacao}`,
          `👤 *Guardião Responsável:* ${data.nomeResponsavel}`,
          `📱 *WhatsApp:* ${data.telefoneContato}`,
          `📍 *Localidade:* ${data.cidade}/${data.estado}`,
          `✨ *Graduação Desejada:* ${data.graduacaoPretendida} (~${data.litragemEstimadaMensal}L/mês)`,
          ``,
          `_Aguardamos a apreciação no sistema para recebermos nosso código de login e senha de acesso._`,
        ].join("\n");

        setWhatsappDirectUrl(`https://wa.me/556899779104?text=${encodeURIComponent(msgLiberacao)}`);
        await sincronizarApiSolicitacoes(json.protocolo);
      } else {
        // Fallback local se a rota de API oscilar
        const fallbackProtocolo = generateProtocoloReconhecimento();
        const fallbackSubmissao = new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        const fallbackDossier: ReconhecimentoDossier = {
          protocolo: fallbackProtocolo,
          dataSubmissao: fallbackSubmissao,
          data,
          graduacaoInfo: getGraduacaoPorId(data.graduacaoPretendida),
        };

        salvarCacheLocal(fallbackProtocolo, fallbackSubmissao);
        await sincronizarApiSolicitacoes(fallbackProtocolo);

        const msgLiberacao = [
          `🌿 *COOPERATIVA NATIVARAM — PEDIDO DE LIBERAÇÃO DE ACESSO*`,
          ``,
          `Olá, Conselho Gestor da Cooperativa Nativaram!`,
          `Acabei de preencher a Ficha de Reconhecimento no portal e gostaria de solicitar a liberação de acesso ao Portal do Dirigente.`,
          ``,
          `📜 *Protocolo:* \`${fallbackProtocolo}\``,
          `🪶 *Grupo / Rezo:* ${data.nomeIdentificacao}`,
          `👤 *Guardião Responsável:* ${data.nomeResponsavel}`,
          `📱 *WhatsApp:* ${data.telefoneContato}`,
          `📍 *Localidade:* ${data.cidade}/${data.estado}`,
          `✨ *Graduação Desejada:* ${data.graduacaoPretendida} (~${data.litragemEstimadaMensal}L/mês)`,
          ``,
          `_Aguardamos a apreciação no sistema para recebermos nosso código de login e senha de acesso._`,
        ].join("\n");

        setDossier(fallbackDossier);
        setWhatsappDirectUrl(`https://wa.me/556899779104?text=${encodeURIComponent(msgLiberacao)}`);
      }
    } catch {
      // Fallback gracioso offline
      const fallbackProtocolo = generateProtocoloReconhecimento();
      const fallbackSubmissao = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const fallbackDossier: ReconhecimentoDossier = {
        protocolo: fallbackProtocolo,
        dataSubmissao: fallbackSubmissao,
        data,
        graduacaoInfo: getGraduacaoPorId(data.graduacaoPretendida),
      };

      salvarCacheLocal(fallbackProtocolo, fallbackSubmissao);
      await sincronizarApiSolicitacoes(fallbackProtocolo);

      const msgLiberacao = [
        `🌿 *COOPERATIVA NATIVARAM — PEDIDO DE LIBERAÇÃO DE ACESSO*`,
        ``,
        `Olá, Conselho Gestor da Cooperativa Nativaram!`,
        `Acabei de preencher a Ficha de Reconhecimento no portal e gostaria de solicitar a liberação de acesso ao Portal do Dirigente.`,
        ``,
        `📜 *Protocolo:* \`${fallbackProtocolo}\``,
        `🪶 *Grupo / Rezo:* ${data.nomeIdentificacao}`,
        `👤 *Guardião Responsável:* ${data.nomeResponsavel}`,
        `📱 *WhatsApp:* ${data.telefoneContato}`,
        `📍 *Localidade:* ${data.cidade}/${data.estado}`,
        `✨ *Graduação Desejada:* ${data.graduacaoPretendida} (~${data.litragemEstimadaMensal}L/mês)`,
        ``,
        `_Aguardamos a apreciação no sistema para recebermos nosso código de login e senha de acesso._`,
      ].join("\n");

      setDossier(fallbackDossier);
      setWhatsappDirectUrl(`https://wa.me/556899779104?text=${encodeURIComponent(msgLiberacao)}`);
    }

    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const copyProtocol = () => {
    if (!dossier) return;
    navigator.clipboard.writeText(dossier.protocolo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ═══════════════════════════════════════════════
  // TELA DE SUCESSO: COMPROVANTE DE ACOLHIMENTO
  // ═══════════════════════════════════════════════
  if (dossier) {
    const finalWhatsappUrl =
      whatsappDirectUrl ||
      `https://wa.me/556899779104?text=${formatReconhecimentoWhatsApp(dossier)}`;

    return (
      <div className="card-elevated rounded-3xl p-6 sm:p-12 space-y-8 border-ambar-500/40 shadow-elevated relative overflow-hidden bg-floresta-950/95">
        <div className="absolute top-0 right-0 w-72 h-72 bg-ambar-500/10 rounded-bl-full pointer-events-none blur-2xl" />

        {/* Header do Comprovante */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ambar-500/20 text-ambar-400 border border-ambar-500/40 shadow-solar">
            <HeartHandshake className="h-8 w-8 text-ambar-400 animate-pulse-subtle" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-ambar-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ficha Registrada no Conselho Gestor</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100">
            Acolhimento Litúrgico Registrado
          </h2>
          <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
            A intenção do seu grupo foi acolhida com fraternidade pela <strong>Cooperativa Nativaram</strong>. Nosso compromisso é caminhar lado a lado com seu desenvolvimento, zelando pela sacralidade, pela pureza botânica e pela segurança dos trabalhos.
          </p>
        </div>

        {/* Cartão de Protocolo */}
        <div className="max-w-xl mx-auto rounded-2xl border border-ambar-500/30 bg-floresta-900/90 p-6 sm:p-8 space-y-5 text-center shadow-inner">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-areia-400">
            Protocolo Fraterno de Acolhimento
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-ambar-400 bg-floresta-950/90 px-5 py-2.5 rounded-xl border border-ambar-500/30 shadow-inner">
              {dossier.protocolo}
            </span>
            <button
              onClick={copyProtocol}
              title="Copiar Protocolo"
              className="p-3 rounded-xl bg-floresta-800/80 hover:bg-ambar-500/20 border border-ambar-500/30 text-areia-200 hover:text-ambar-400 transition-all active:scale-95"
            >
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-areia-400 font-light">
            Guarde este número para identificar o diálogo e futuras solicitações com o Conselho.
          </p>
        </div>

        {/* Resumo da Ficha */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-400/80 block">
              Identificação do Grupo / Rezo
            </span>
            <p className="text-areia-100 font-semibold">{dossier.data.nomeIdentificacao}</p>
            <p className="text-areia-300 text-[11px] font-light">
              Linhagem: {dossier.data.linhagemEspiritual} • {dossier.data.tempoJornada}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-400/80 block">
              Guardião Responsável
            </span>
            <p className="text-areia-100 font-semibold">{dossier.data.nomeResponsavel}</p>
            <p className="text-areia-300 text-[11px] font-light">
              {dossier.data.cidade}/{dossier.data.estado} • {dossier.data.telefoneContato}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ambar-400/80 block">
              Graduação e Partilha Pretendida
            </span>
            <p className="text-areia-100 font-semibold">
              {dossier.graduacaoInfo
                ? `${dossier.graduacaoInfo.codigo} ${dossier.graduacaoInfo.nomeSagrado}`
                : dossier.data.graduacaoPretendida}
            </p>
            <p className="text-areia-300 text-[11px] font-light">
              Estimativa: ~{dossier.data.litragemEstimadaMensal} litros/mês • {dossier.data.frequenciaEncontros}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-floresta-900/60 border border-ambar-500/15 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 block">
              Status do Processo
            </span>
            <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Recebido • Triagem Fraterna
            </p>
            <p className="text-areia-300 text-[11px] font-light">
              Canal de Contato: {dossier.data.metodoContatoPreferencial}
            </p>
          </div>
        </div>

        {/* CTA Principal: WhatsApp do Conselho */}
        <div className="max-w-xl mx-auto space-y-3 pt-2">
          <a
            href={finalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold rounded-2xl shadow-solar"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Enviar para o WhatsApp do Conselho e Pedir Liberação</span>
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a>
          <p className="text-[11px] text-center text-areia-400 font-light">
            Ao clicar, uma mensagem formatada com seu protocolo será aberta diretamente no WhatsApp do Conselho Gestor da Cooperativa.
          </p>
        </div>

        {/* Próximos Passos */}
        <div className="max-w-2xl mx-auto pt-4 border-t border-ambar-500/15">
          <div className="rounded-xl bg-floresta-900/40 p-4 border border-ambar-500/15 space-y-2 text-xs">
            <span className="font-semibold text-ambar-400 block font-serif">
              O que acontece a seguir?
            </span>
            <p className="text-areia-300 font-light leading-relaxed">
              1. <strong>Contato Fraterno (até 48h):</strong> Um membro do Conselho Gestor da Cooperativa entrará em contato via {dossier.data.metodoContatoPreferencial.toLowerCase()} para acolher seu grupo, compreender as particularidades dos trabalhos e alinhar a logística.
            </p>
            <p className="text-areia-300 font-light leading-relaxed">
              2. <strong>Apoio Pedagógico:</strong> Disponibilizamos a você orientações sobre manuseio correto, conservação de garrafas PET novas, alívio de pressão gasosa e triagem de segurança dos comungantes.
            </p>
            <p className="text-areia-300 font-light leading-relaxed">
              3. <strong>Caminho para a Formalização:</strong> Quando seu grupo amadurecer e desejar formalizar uma congregação com CNPJ e Ata sob a Resolução CONAD nº 01/2010, daremos todo o amparo documental necessário.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════
  // FORMULÁRIO EM 3 ETAPAS
  // ═══════════════════════════════════════════════
  return (
    <div className="card-elevated rounded-3xl p-6 sm:p-10 border-ambar-500/30 bg-floresta-950/90 shadow-elevated space-y-8">
      {/* Stepper Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;

            return (
              <div
                key={step.id}
                className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-initial"
              >
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    isDone
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : isActive
                      ? "bg-ambar-500/25 border-ambar-400 text-ambar-300 shadow-solar"
                      : "bg-floresta-900/60 border-ambar-500/15 text-areia-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-areia-400 block">
                    Etapa {step.id} de 3
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isActive ? "text-ambar-300" : "text-areia-300"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {step.id < 3 && (
                  <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-ambar-500/15 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-ambar-400 transition-all duration-300 ${
                        currentStep > step.id ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ═══════════════════════════════════════════
            ETAPA 1: IDENTIDADE & CAMINHADA ESPIRITUAL
            ═══════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2 border-b border-ambar-500/15 pb-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100 flex items-center gap-2">
                <Feather className="h-5 w-5 text-ambar-400" />
                <span>1. Identidade &amp; Caminhada Espiritual</span>
              </h3>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Conte-nos sobre a essência dos seus estudos. Não exigimos personalidade jurídica para acolher seu círculo de oração.
              </p>
            </div>

            {/* Seletor de Tipo de Vínculo em Cards */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-areia-200 block">
                Como seu núcleo ou prática espiritual se caracteriza?{" "}
                <span className="text-ambar-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIPOS_VINCULO.map((tipo) => {
                  const Icon = tipo.icon;
                  const isSelected = selectedTipo === tipo.id;

                  return (
                    <button
                      type="button"
                      key={tipo.id}
                      onClick={() => setValue("tipoVinculo", tipo.id as any, { shouldValidate: true })}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 relative ${
                        isSelected
                          ? "bg-ambar-500/15 border-ambar-400/80 shadow-solar"
                          : "bg-floresta-900/60 border-ambar-500/20 hover:border-ambar-500/40 hover:bg-floresta-900/90"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-2 rounded-xl ${
                              isSelected
                                ? "bg-ambar-500/30 text-ambar-300"
                                : "bg-floresta-800 text-areia-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-serif font-bold text-xs sm:text-sm text-areia-100">
                            {tipo.title}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? "bg-ambar-500/25 border-ambar-400/40 text-ambar-300"
                              : "bg-floresta-800/80 border-white/10 text-areia-400"
                          }`}
                        >
                          {tipo.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                        {tipo.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.tipoVinculo && (
                <p className="text-[11px] text-red-400">{errors.tipoVinculo.message}</p>
              )}
            </div>

            {/* Nome do Grupo ou Ponto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome do Grupo, Ponto de Oração ou Rezo"
                required
                placeholder="Ex: Círculo Sagrado Flor da Mata, Ponto de Rezo do Cruzeiro..."
                {...register("nomeIdentificacao")}
                error={errors.nomeIdentificacao?.message}
              />

              <Input
                label="Tempo de Caminhada com o Sacramento"
                required
                placeholder="Ex: 4 anos de estudos, Desde 2020, Mais de 7 anos..."
                {...register("tempoJornada")}
                error={errors.tempoJornada?.message}
              />
            </div>

            {/* Linhagem Espiritual */}
            <Input
              label="Linhagem Espiritual / Tradição de Referência"
              required
              placeholder="Ex: Xamanismo Universalista, Linha do Santo Daime, Umbandaime, Tradição Cabocla/Indígena, Estudos Livres..."
              {...register("linhagemEspiritual")}
              error={errors.linhagemEspiritual?.message}
            />

            <div className="p-3.5 rounded-xl bg-floresta-900/40 border border-ambar-500/15 text-[11px] text-areia-300 font-light leading-relaxed flex items-start gap-2.5">
              <HeartHandshake className="h-4 w-4 text-ambar-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Acolhimento Fraterno:</strong> A Cooperativa entende que cada linha possui sua beleza e sua sabedoria. Nosso foco é assegurar que você receba um sacramento puro, sem misturas botânicas estranhas e com o devido respaldo fitoquímico.
              </span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ETAPA 2: PARÂMETROS LITÚRGICOS & GRADUAÇÃO
            ═══════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2 border-b border-ambar-500/15 pb-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100 flex items-center gap-2">
                <Compass className="h-5 w-5 text-ambar-400" />
                <span>2. Parâmetros Litúrgicos &amp; Graduação</span>
              </h3>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Estime o tamanho do seu círculo e a densidade botânica adequada às suas vigílias e rituais.
              </p>
            </div>

            {/* Participantes e Periodicidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Média de Participantes por Trabalho"
                required
                placeholder="Ex: 6 a 12 pessoas, Cerca de 15 irmãos..."
                {...register("quantidadeParticipantes")}
                error={errors.quantidadeParticipantes?.message}
              />

              <Select
                label="Frequência Aproximada dos Trabalhos"
                required
                {...register("frequenciaEncontros")}
                error={errors.frequenciaEncontros?.message}
              >
                <option value="MENSAL">Mensal (1 cerimônia por mês)</option>
                <option value="QUINZENAL">Quinzenal (2 cerimônias por mês)</option>
                <option value="SEMANAL">Semanal (todos os finais de semana)</option>
                <option value="BIMESTRAL">Bimestral (a cada 2 meses)</option>
                <option value="EVENTUAL">Eventual / Datas Sagradas Específicas</option>
              </Select>
            </div>

            {/* Litragem Estimada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Litragem Mensal Aproximada Desejada (Litros)"
                required
                type="text"
                placeholder="Ex: 5 litros, 10 litros..."
                {...register("litragemEstimadaMensal")}
                error={errors.litragemEstimadaMensal?.message}
              />

              <div className="flex flex-col justify-center rounded-xl bg-floresta-900/50 border border-ambar-500/15 p-3 text-[11px] text-areia-300 space-y-1">
                <span className="font-mono text-ambar-400 font-bold flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5" />
                  Cota Inicial Cooperativa: 5 Litros
                </span>
                <p className="font-light leading-relaxed">
                  Para viabilizar a cadeia de apoio ao Acre e a logística aérea refrigerada com frete justo, nossa cota inicial sugerida de partilha parte de 5 litros.
                </p>
              </div>
            </div>

            {/* Seletor Visual de Graduações Canônicas */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-areia-200 block">
                Graduação Canônica Pretendida para o Sacramento:{" "}
                <span className="text-ambar-400">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GRADUACOES_SACRAMENTAIS.map((grad) => {
                  const isSelected = selectedGraduacaoId === grad.id;

                  return (
                    <button
                      type="button"
                      key={grad.id}
                      onClick={() =>
                        setValue("graduacaoPretendida", grad.id as any, { shouldValidate: true })
                      }
                      className={`p-3.5 rounded-xl border text-left transition-all space-y-1.5 relative ${
                        isSelected
                          ? "bg-ambar-500/15 border-ambar-400 shadow-solar"
                          : "bg-floresta-900/60 border-ambar-500/15 hover:border-ambar-500/35"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-areia-100 flex items-center gap-2">
                          <span className="font-mono text-ambar-400 text-[11px]">{grad.codigo}</span>
                          <span>{grad.nomeSagrado}</span>
                        </span>
                        <span className="text-[10px] font-mono text-areia-400">
                          {grad.porcaoSugerida}
                        </span>
                      </div>
                      <p className="text-[11px] text-areia-300 font-light line-clamp-2">
                        {grad.perfilLiturgico}
                      </p>
                    </button>
                  );
                })}
              </div>

              {errors.graduacaoPretendida && (
                <p className="text-[11px] text-red-400">{errors.graduacaoPretendida.message}</p>
              )}
            </div>

            {/* Intenção do Trabalho */}
            <Textarea
              label="Intenção Espiritual e Momento do Grupo"
              required
              rows={3}
              placeholder="Descreva brevemente o propósito dos encontros, a ética do grupo e o motivo pelo qual buscam o apoio da Cooperativa Nativaram..."
              {...register("intencaoTrabalho")}
              error={errors.intencaoTrabalho?.message}
            />

            {/* Dúvidas ou Necessidades Específicas */}
            <Textarea
              label="Dúvidas, Assessoria ou Observações Adicionais (Opcional)"
              rows={2}
              placeholder="Alguma dúvida sobre conservação, decocção, reconstituição ou necessidade de orientação litúrgica?"
              {...register("duvidasOuNecessidades")}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ETAPA 3: GUARDIÃO, CONTATO & COMPROMISSOS
            ═══════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2 border-b border-ambar-500/15 pb-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100 flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-ambar-400" />
                <span>3. Guardião Responsável &amp; Compromissos</span>
              </h3>
              <p className="text-xs text-areia-300 font-light leading-relaxed">
                Dados diretos de contato do condutor para que o Conselho Gestor possa alinhar a partilha fraterna.
              </p>
            </div>

            {/* Dados do Condutor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nome Completo do Guardião / Condutor"
                required
                placeholder="Ex: João da Silva Santos"
                {...register("nomeResponsavel")}
                error={errors.nomeResponsavel?.message}
              />

              <Input
                label="WhatsApp ou Telefone Direto (com DDD)"
                required
                placeholder="(11) 98765-4321"
                {...register("telefoneContato")}
                error={errors.telefoneContato?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="E-mail de Contato"
                  required
                  type="email"
                  placeholder="guardiao@exemplo.com"
                  {...register("emailContato")}
                  error={errors.emailContato?.message}
                />
              </div>

              <Select
                label="Canal Preferencial"
                required
                {...register("metodoContatoPreferencial")}
                error={errors.metodoContatoPreferencial?.message}
              >
                <option value="WHATSAPP">WhatsApp</option>
                <option value="TELEFONE">Ligação Telefônica</option>
                <option value="EMAIL">E-mail</option>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Cidade Onde Realizam os Trabalhos"
                  required
                  placeholder="Ex: Campinas, Belo Horizonte, Vitória..."
                  {...register("cidade")}
                  error={errors.cidade?.message}
                />
              </div>

              <Input
                label="Estado (UF)"
                required
                placeholder="SP"
                maxLength={2}
                {...register("estado")}
                error={errors.estado?.message}
              />
            </div>

            {/* Três Compromissos Mandatórios de Sacralidade */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-areia-200 block">
                Compromissos de Salvaguarda Litúrgica &amp; Segurança:{" "}
                <span className="text-ambar-400">*</span>
              </label>

              <div className="space-y-2.5">
                {/* 1. Uso Litúrgico CONAD */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/20 cursor-pointer hover:bg-floresta-900/90 transition-all">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-ambar-500/40 text-ambar-500 focus:ring-ambar-400 bg-floresta-950"
                    {...register("concordaUsoLiturgico")}
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-areia-100 block">
                      Uso Estritamente Espiritual &amp; Ausência de Comércio (CONAD 01/2010)
                    </span>
                    <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                      Declaro que o sacramento será consagrado exclusivamente em ambiente de oração e recolhimento, sem qualquer cobrança mercantil, revenda ou finalidade de lucro.
                    </p>
                  </div>
                </label>
                {errors.concordaUsoLiturgico && (
                  <p className="text-[11px] text-red-400">{errors.concordaUsoLiturgico.message}</p>
                )}

                {/* 2. Antecedência de 30 Dias */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/20 cursor-pointer hover:bg-floresta-900/90 transition-all">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-ambar-500/40 text-ambar-500 focus:ring-ambar-400 bg-floresta-950"
                    {...register("planejamentoAntecedencia30Dias")}
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-areia-100 block">
                      Planejamento e Antecedência Mínima de 30 Dias
                    </span>
                    <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                      Compreendo que a feitura artesanal em Cruzeiro do Sul/AC e o translado aéreo refrigerado exigem pelo menos 30 dias de antecedência para manter o equilíbrio e a pureza de cada lote.
                    </p>
                  </div>
                </label>
                {errors.planejamentoAntecedencia30Dias && (
                  <p className="text-[11px] text-red-400">
                    {errors.planejamentoAntecedencia30Dias.message}
                  </p>
                )}

                {/* 3. Triagem de Segurança */}
                <label className="flex items-start gap-3 p-3 rounded-xl bg-floresta-900/60 border border-ambar-500/20 cursor-pointer hover:bg-floresta-900/90 transition-all">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-ambar-500/40 text-ambar-500 focus:ring-ambar-400 bg-floresta-950"
                    {...register("compromissoTriagemSeguranca")}
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-areia-100 block">
                      Zelo pela Segurança Integrativa &amp; Triagem dos Comungantes
                    </span>
                    <p className="text-[11px] text-areia-300 font-light leading-relaxed">
                      Comprometo-me a zelar pela integridade física e emocional dos participantes, aplicando cuidados e atenção às interações medicamentosas (washout de antidepressivos) em harmonia com as boas práticas litúrgicas.
                    </p>
                  </div>
                </label>
                {errors.compromissoTriagemSeguranca && (
                  <p className="text-[11px] text-red-400">
                    {errors.compromissoTriagemSeguranca.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            BARRA DE NAVEGAÇÃO / BOTÕES DO STEPPER
            ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-between pt-4 border-t border-ambar-500/15">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="btn-secondary px-5 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 hover:bg-floresta-800 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary px-6 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-solar"
            >
              <span>Avançar</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-solar disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Registrando Acolhimento...</span>
                </>
              ) : (
                <>
                  <HeartHandshake className="h-4 w-4" />
                  <span>Submeter Ficha de Reconhecimento</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
