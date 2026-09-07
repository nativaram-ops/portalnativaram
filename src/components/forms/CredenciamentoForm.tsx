"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CredenciamentoSchema,
  CredenciamentoInput,
} from "@/lib/validators/credenciamento";
import {
  generateProtocoloLiturgico,
  formatDossierForWhatsApp,
  STAGE_FIELDS,
  CredenciamentoDossier,
} from "@/lib/credenciamento/engine";
import {
  GRADUACOES_SACRAMENTAIS,
  getGraduacaoPorId,
} from "@/data/graduacoes";
import {
  ShieldCheck,
  Sparkles,
  Building2,
  User,
  Church,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Copy,
  ExternalLink,
  Calendar,
  MapPin,
  Flame,
  Award,
  FileCheck,
} from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";

const STEPS = [
  { id: 1, title: "Entidade Religiosa", icon: Building2 },
  { id: 2, title: "Dirigente Litúrgico", icon: User },
  { id: 3, title: "Parâmetros Litúrgicos", icon: Church },
  { id: 4, title: "Conformidade Legal", icon: Lock },
];

export const CredenciamentoForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dossier, setDossier] = useState<CredenciamentoDossier | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CredenciamentoInput>({
    resolver: zodResolver(CredenciamentoSchema),
    defaultValues: {
      graduacaoPretendida: "5.1_PITUA",
      frequenciaRituais: "MENSAL",
    },
    mode: "onBlur",
  });

  const selectedGraduacaoId = watch("graduacaoPretendida");
  const selectedGraduacao = getGraduacaoPorId(selectedGraduacaoId);

  const handleNext = async () => {
    const fieldsToValidate = STAGE_FIELDS[currentStep];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const onSubmit = async (data: CredenciamentoInput) => {
    const protocolo = generateProtocoloLiturgico();
    const dataSubmissao = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newDossier: CredenciamentoDossier = {
      protocolo,
      dataSubmissao,
      data,
      graduacaoInfo: getGraduacaoPorId(data.graduacaoPretendida),
    };

    // Simula validação e armazenamento no conselho
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDossier(newDossier);
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const copyProtocol = () => {
    if (!dossier) return;
    navigator.clipboard.writeText(dossier.protocolo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // TELA DE SUCESSO: COMPROVANTE LITÚRGICO OFICIAL
  if (dossier) {
    const whatsappQuery = formatDossierForWhatsApp(dossier);
    const whatsappUrl = `https://wa.me/5527999818818?text=${whatsappQuery}`;

    return (
      <div className="card-elevated rounded-3xl p-6 sm:p-12 space-y-8 border-ambar-500/40 shadow-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ambar-500/10 rounded-bl-full pointer-events-none" />

        {/* Header do Comprovante */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ambar-500/20 text-ambar-400 border border-ambar-500/40">
            <Award className="h-8 w-8 text-ambar-400 animate-pulse-subtle" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/30 bg-floresta-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-ambar-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Ficha Submetida ao Conselho Guardião</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-areia-100">
            Credenciamento Registrado com Sucesso
          </h2>
          <p className="text-xs sm:text-sm text-areia-300 font-light leading-relaxed">
            Os dados institucionais da congregação foram devidamente formalizados no sistema da Cooperativa Nativaram Brasil sob os auspícios da Resolução CONAD nº 01/2010.
          </p>
        </div>

        {/* Cartão de Protocolo */}
        <div className="max-w-xl mx-auto rounded-2xl border border-ambar-500/30 bg-floresta-950/90 p-6 sm:p-8 space-y-5 text-center shadow-inner">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-areia-400">
            Protocolo Oficial de Homologação Litúrgica
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-ambar-400 bg-floresta-900/90 px-5 py-2 rounded-xl border border-ambar-500/30">
              {dossier.protocolo}
            </span>
            <button
              onClick={copyProtocol}
              title="Copiar Protocolo"
              className="p-3 rounded-xl border border-ambar-500/30 hover:border-ambar-400 bg-floresta-900 text-areia-300 hover:text-ambar-400 transition-colors"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
          {copied && (
            <p className="text-[11px] text-emerald-400 font-medium">Protocolo copiado para a área de transferência!</p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-3 text-left border-t border-ambar-500/15 text-xs text-areia-300">
            <div>
              <span className="text-[10px] uppercase text-areia-400 block font-semibold">Templo / Entidade:</span>
              <strong className="text-areia-100 font-medium">{dossier.data.nomeInstituicao}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-areia-400 block font-semibold">Dirigente Litúrgico:</span>
              <strong className="text-areia-100 font-medium">{dossier.data.nomeDirigente}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-areia-400 block font-semibold">Sede Litúrgica:</span>
              <span className="text-areia-200">{dossier.data.cidade}/{dossier.data.estado}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-areia-400 block font-semibold">Graduação Solicitada:</span>
              <span className="text-ambar-400 font-medium">{dossier.graduacaoInfo?.nomeSagrado || dossier.data.graduacaoPretendida}</span>
            </div>
          </div>
        </div>

        {/* Ações Seguintes */}
        <div className="max-w-xl mx-auto space-y-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-solar"
          >
            <Sparkles className="h-4 w-4" />
            <span>Enviar Dossiê ao Conselho Guardião via WhatsApp</span>
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="rounded-xl border border-ambar-500/20 bg-floresta-950/60 p-4 text-xs text-areia-300/90 leading-relaxed font-light space-y-2">
            <div className="flex items-center gap-2 text-ambar-400 font-semibold text-xs font-serif">
              <FileCheck className="h-4 w-4" />
              <span>Próximas Etapas do Credenciamento:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-areia-300 pl-1">
              <li>Envio da ata de posse ou documento constitutivo via WhatsApp para validação institucional;</li>
              <li>Breve diálogo de alinhamento com um dos guardiões da cooperativa;</li>
              <li>Liberação do acesso exclusivo e cálculo de cotas solidárias de rateio operacional.</li>
            </ol>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setDossier(null);
                setCurrentStep(1);
              }}
              className="text-xs text-areia-400 hover:text-areia-200 underline font-light"
            >
              Preencher Nova Ficha Institucional
            </button>
          </div>
        </div>
      </div>
    );
  }

  // WIZARD MULTI-ETAPAS
  return (
    <div className="space-y-8">
      {/* Indicador de Progresso (Stepper) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCurrent = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`rounded-xl border p-3 flex items-center gap-3 transition-all duration-300 ${
                isCurrent
                  ? "border-ambar-400 bg-floresta-900/90 shadow-solar"
                  : isCompleted
                  ? "border-emerald-500/40 bg-floresta-950/80 text-emerald-400"
                  : "border-ambar-500/15 bg-floresta-950/50 text-areia-400/60"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                  isCurrent
                    ? "bg-ambar-500/20 text-ambar-400 border border-ambar-500/40"
                    : isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-floresta-900 text-areia-400"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : step.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-areia-400">
                  Etapa {step.id}
                </div>
                <div
                  className={`text-xs font-semibold truncate ${
                    isCurrent ? "text-areia-100" : isCompleted ? "text-emerald-300" : "text-areia-400"
                  }`}
                >
                  {step.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-elevated rounded-3xl p-6 sm:p-12 space-y-8 border-ambar-500/25 shadow-elevated"
      >
        {/* ═══════════════════════════════════════════
            ETAPA 1: DADOS DA INSTITUIÇÃO RELIGIOSA
            ═══════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">
                  Etapa 1 de 4 • Personalidade Litúrgica
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                  Dados da Entidade Religiosa ou Associativa
                </h3>
              </div>
            </div>

            <p className="text-xs text-areia-300 font-light leading-relaxed">
              O provimento assistido de sacramentos da Nativaram Brasil é exclusivo a entidades religiosas legalmente constituídas ou com ata formal de ritos espirituais sob o artigo 5º, VI da CF/88.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Razão Social / Nome da Entidade Religiosa"
                required
                placeholder="Ex: Instituto Litúrgico Estrela da Manhã"
                error={errors.nomeInstituicao?.message}
                wrapperClassName="sm:col-span-2"
                {...register("nomeInstituicao")}
              />
              <Input
                label="CNPJ da Entidade"
                required
                placeholder="00.000.000/0001-00"
                error={errors.cnpj?.message}
                {...register("cnpj")}
              />
              <Input
                label="Data de Fundação / Ata Constitutiva"
                required
                placeholder="DD/MM/AAAA"
                error={errors.dataFundacao?.message}
                {...register("dataFundacao")}
              />
              <Input
                label="Endereço Completo do Templo / Ponto de Oração"
                required
                placeholder="Rua, Número, Bairro, CEP"
                error={errors.enderecoTemplo?.message}
                wrapperClassName="sm:col-span-2"
                {...register("enderecoTemplo")}
              />
              <Input
                label="Cidade"
                required
                placeholder="Ex: São Paulo"
                error={errors.cidade?.message}
                {...register("cidade")}
              />
              <Input
                label="Estado (UF)"
                required
                placeholder="SP"
                maxLength={2}
                className="uppercase"
                error={errors.estado?.message}
                {...register("estado")}
              />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ETAPA 2: DIRIGENTE LITÚRGICO RESPONSÁVEL
            ═══════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">
                  Etapa 2 de 4 • Responsabilidade Espiritual
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                  Dirigente Litúrgico / Responsável pelos Trabalhos
                </h3>
              </div>
            </div>

            <p className="text-xs text-areia-300 font-light leading-relaxed">
              O dirigente litúrgico responde eticamente pela condução dos rituais, pela triagem de comungantes e pela custódia do sacramento na casa credenciada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Nome Civil Completo do Dirigente"
                required
                placeholder="Nome civil completo"
                error={errors.nomeDirigente?.message}
                wrapperClassName="sm:col-span-2"
                {...register("nomeDirigente")}
              />
              <Input
                label="CPF do Dirigente"
                required
                placeholder="000.000.000-00"
                error={errors.cpfDirigente?.message}
                {...register("cpfDirigente")}
              />
              <Input
                label="Tempo de Condução Cerimonial (em Anos)"
                required
                type="number"
                placeholder="Ex: 5"
                error={errors.tempoLinhagemAnos?.message}
                {...register("tempoLinhagemAnos", { valueAsNumber: true })}
              />
              <Input
                label="WhatsApp Institucional para Contato"
                required
                placeholder="(00) 00000-0000"
                error={errors.telefoneContato?.message}
                {...register("telefoneContato")}
              />
              <Input
                label="E-mail Oficial da Entidade"
                required
                type="email"
                placeholder="contato@templo.org.br"
                error={errors.emailOficial?.message}
                {...register("emailOficial")}
              />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ETAPA 3: PARÂMETROS DA CONGREGAÇÃO & GRADUAÇÃO
            ═══════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                <Church className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">
                  Etapa 3 de 4 • Frequência & Alquimia Pretendida
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                  Parâmetros Litúrgicos da Congregação
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Número Médio de Membros Frequentes"
                required
                type="number"
                placeholder="Ex: 25"
                error={errors.numeroMembrosAtivos?.message}
                {...register("numeroMembrosAtivos", { valueAsNumber: true })}
              />
              <Select
                label="Frequência dos Rituais"
                required
                error={errors.frequenciaRituais?.message}
                {...register("frequenciaRituais")}
              >
                <option value="MENSAL">Mensal (1 cerimônia/mês)</option>
                <option value="QUINZENAL">Quinzenal (2 cerimônias/mês)</option>
                <option value="SEMANAL">Semanal (encontros regulares)</option>
                <option value="EVENTUAL">Eventual / Datas Litúrgicas Especiais</option>
              </Select>

              <div className="sm:col-span-2 space-y-2">
                <Select
                  label="Graduação Litúrgica Pretendida"
                  required
                  error={errors.graduacaoPretendida?.message}
                  {...register("graduacaoPretendida")}
                >
                  {GRADUACOES_SACRAMENTAIS.map((grad) => (
                    <option key={grad.id} value={grad.id}>
                      {grad.codigo} {grad.nomeSagrado} — {grad.arquetipo}
                    </option>
                  ))}
                  <option value="OUTRAS_GRADUACOES_COMBINAR">
                    Outras Graduações Sob Medida (Alinhamento Prévio)
                  </option>
                </Select>

                {/* Card de Visualização da Graduação Selecionada */}
                {selectedGraduacao && (
                  <div className="rounded-xl border border-ambar-500/30 bg-floresta-950/80 p-4 space-y-2 text-xs text-areia-300">
                    <div className="flex items-center justify-between text-ambar-400 font-serif font-bold">
                      <span>{selectedGraduacao.codigo} • {selectedGraduacao.nomeSagrado}</span>
                      <span className="text-[10px] font-sans font-normal uppercase tracking-wider text-areia-400">
                        {selectedGraduacao.proporcaoBiomassa}
                      </span>
                    </div>
                    <p className="font-light text-areia-300 leading-relaxed">
                      {selectedGraduacao.perfilLiturgico}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1.5 border-t border-ambar-500/15 text-[11px] text-areia-400">
                      <div>
                        <span className="text-ambar-400/90 font-medium">Porção sugerida:</span> {selectedGraduacao.porcaoSugerida} ({selectedGraduacao.duracaoEstimada})
                      </div>
                      <div>
                        <span className="text-ambar-400/90 font-medium">Rateio institucional:</span> {selectedGraduacao.rateioAtacado5a10L}
                      </div>
                    </div>
                    <div className="pt-1 text-[11px] text-ambar-400/90 italic font-serif">
                      {selectedGraduacao.indicacaoRito}
                    </div>
                  </div>
                )}
              </div>

              <Textarea
                label="Propósito Espiritual, Linhagem e História da Casa"
                required
                rows={3}
                placeholder="Descreva a história da congregação, a linha de estudo adotada e o compromisso ético do grupo..."
                error={errors.intencaoTrabalho?.message}
                wrapperClassName="sm:col-span-2"
                {...register("intencaoTrabalho")}
              />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ETAPA 4: TERMOS MANDATÓRIOS & BLINDAGEM LEGAL
            ═══════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">
                  Etapa 4 de 4 • Blindagem Deontológica e Sanitária
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                  Termos Obrigatórios sob o Marco Legal e Segurança Integrativa
                </h3>
              </div>
            </div>

            <div className="rounded-2xl border border-ambar-500/30 bg-floresta-950/90 p-6 space-y-4">
              <div className="space-y-3.5">
                <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("concordaComConad012010")}
                    className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
                  />
                  <span className="leading-relaxed">
                    Declaramos plena concordância com a <strong>Resolução CONAD nº 01/2010</strong>, comprometendo-nos a utilizar o sacramento unicamente em ritos litúrgicos, sem turismo espiritual ou fins lucrativos.
                  </span>
                </label>
                {errors.concordaComConad012010 && (
                  <p className="text-[11px] text-red-400 pl-7">{errors.concordaComConad012010.message}</p>
                )}

                <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("declaraAusenciaFinsLucrativos")}
                    className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
                  />
                  <span className="leading-relaxed">
                    Declaramos que o sacramento é vedado a qualquer comércio, revenda avulsa ou consumo doméstico não ritualizado, correspondendo os valores estritamente ao rateio operacional cooperativo.
                  </span>
                </label>
                {errors.declaraAusenciaFinsLucrativos && (
                  <p className="text-[11px] text-red-400 pl-7">{errors.declaraAusenciaFinsLucrativos.message}</p>
                )}

                <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("planejamento30Dias")}
                    className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
                  />
                  <span className="leading-relaxed">
                    Assumimos o compromisso de respeitar o <strong>prazo mínimo de 30 dias de antecedência</strong> para qualquer solicitação de cota litúrgica, respeitando o tempo sagrado do feitio e do transporte refrigerado.
                  </span>
                </label>
                {errors.planejamento30Dias && (
                  <p className="text-[11px] text-red-400 pl-7">{errors.planejamento30Dias.message}</p>
                )}

                <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("termoSegurancaIntegrativa")}
                    className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
                  />
                  <span className="leading-relaxed">
                    Comprometemo-nos a aplicar a <strong>triagem prévia de segurança integrativa</strong> em todos os comungantes, assegurando o período obrigatório de <strong>washout de 5 semanas</strong> para participantes em uso de antidepressivos (ISRS/ISRN para prevenção de Síndrome Serotoninérgica) e a exclusão preventiva de quadros psicóticos e cardiopatias severas.
                  </span>
                </label>
                {errors.termoSegurancaIntegrativa && (
                  <p className="text-[11px] text-red-400 pl-7">{errors.termoSegurancaIntegrativa.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            BARRA DE NAVEGAÇÃO ENTRE ETAPAS
            ═══════════════════════════════════════════ */}
        <div className="flex items-center justify-between pt-4 border-t border-ambar-500/15 gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="btn-secondary text-xs font-semibold px-5 py-3 inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Etapa Anterior</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2"
            >
              <span>Próxima Etapa</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-xs font-bold uppercase tracking-wider px-8 py-3.5 inline-flex items-center gap-2.5 shadow-solar disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isSubmitting ? "Homologando Dados..." : "Submeter Credenciamento Litúrgico"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
