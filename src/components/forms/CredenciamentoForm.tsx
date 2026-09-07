"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredenciamentoSchema, CredenciamentoInput } from "@/lib/validators/credenciamento";
import {
  ShieldCheck,
  Sparkles,
  Building2,
  User,
  Church,
  CheckCircle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";

export const CredenciamentoForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CredenciamentoInput>({
    resolver: zodResolver(CredenciamentoSchema),
    defaultValues: {
      concordaComConad012010: true,
      declaraAusenciaFinsLucrativos: true,
      planejamento30Dias: true,
    },
  });

  const onSubmit = async (data: CredenciamentoInput) => {
    console.log("Dados de Credenciamento Litúrgico:", data);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSuccess(true);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="card-elevated rounded-2xl p-8 sm:p-14 text-center space-y-6 border-ambar-500/40 shadow-elevated">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-ambar-400">
          <CheckCircle className="h-10 w-10 animate-pulse-subtle" />
        </div>
        <div className="space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
            Solicitação de Credenciamento Recebida!
          </h2>
          <p className="text-sm text-areia-300 max-w-lg mx-auto leading-relaxed font-light">
            Os dados institucionais do seu templo foram registrados com sucesso. O conselho de guardiões da Cooperativa Nativaram Brasil analisará a ata de constituição e entrará em contato via WhatsApp/E-mail cadastrado para agendamento da chamada de alinhamento litúrgico.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => setIsSuccess(false)}
            className="btn-secondary text-xs font-semibold px-6 py-2.5"
          >
            Enviar Nova Solicitação
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-elevated rounded-2xl p-6 sm:p-12 space-y-10 border-ambar-500/25"
    >
      {/* ETAPA 1: DADOS DA INSTITUIÇÃO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Etapa 1 de 4</span>
            <h3 className="font-serif text-lg font-bold text-areia-100">
              Dados da Entidade Religiosa ou Associativa
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Razão Social / Nome da Entidade Religiosa"
            required
            placeholder="Ex: Templo Xamânico Estrela do Oriente"
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
            label="Data de Fundação / Ata de Posse"
            required
            placeholder="DD/MM/AAAA"
            error={errors.dataFundacao?.message}
            {...register("dataFundacao")}
          />
          <Input
            label="Endereço Litúrgico Completo (Local de Culto)"
            required
            placeholder="Rua, Número, Bairro, CEP"
            error={errors.enderecoTemplo?.message}
            wrapperClassName="sm:col-span-2"
            {...register("enderecoTemplo")}
          />
          <Input
            label="Cidade"
            required
            placeholder="Cidade sede"
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

      {/* ETAPA 2: DIRIGENTE RESPONSÁVEL */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Etapa 2 de 4</span>
            <h3 className="font-serif text-lg font-bold text-areia-100">
              Dirigente Litúrgico / Padrinho Responsável
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Nome Completo do Dirigente Responsável"
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
            label="Telefone de Contato (WhatsApp Ativo)"
            required
            placeholder="(00) 00000-0000"
            error={errors.telefoneContato?.message}
            {...register("telefoneContato")}
          />
          <Input
            label="E-mail Institucional ou Oficial"
            required
            type="email"
            placeholder="contato@templo.org.br"
            error={errors.emailOficial?.message}
            {...register("emailOficial")}
          />
        </div>
      </div>

      {/* ETAPA 3: PARÂMETROS DA CONGREGAÇÃO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-ambar-500/15 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-floresta-900 border border-ambar-500/30 text-ambar-400">
            <Church className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-ambar-400 uppercase">Etapa 3 de 4</span>
            <h3 className="font-serif text-lg font-bold text-areia-100">
              Parâmetros Litúrgicos da Congregação
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Número de Membros Frequentes"
            required
            type="number"
            placeholder="Ex: 30"
            error={errors.numeroMembrosAtivos?.message}
            {...register("numeroMembrosAtivos", { valueAsNumber: true })}
          />
          <Select
            label="Frequência dos Rituais"
            required
            error={errors.frequenciaRituais?.message}
            {...register("frequenciaRituais")}
          >
            <option value="QUINZENAL">Quinzenal</option>
            <option value="MENSAL">Mensal</option>
            <option value="SEMANAL">Semanal</option>
            <option value="EVENTUAL">Eventual</option>
          </Select>
          <Select
            label="Graduação Padrão Pretendida"
            required
            error={errors.graduacaoPretendida?.message}
            wrapperClassName="sm:col-span-2"
            {...register("graduacaoPretendida")}
          >
            <option value="10.1_WIRAPURU">10.1 Wirapuru (Semi-Mel / Condução de Alta Força)</option>
            <option value="7.1_ANHANGATA">7.1 Anhangatã (Rouxinol / Imersão e Cura)</option>
            <option value="5.1_PITUA">5.1 Pituã (Bem-te-vi / Equilíbrio e Firmeza)</option>
            <option value="3.1_MAINUMBI">3.1 Mainumbi (Beija-flor / Voo Suave e Iniciantes)</option>
            <option value="MEDICINA_MEL">Medicina Mel (Alta Concentração / Redução Logística - Valor a Combinar)</option>
            <option value="MEDICINA_GEL">Medicina Gel (Densidade Extrema / Máxima Conservação - Valor a Combinar)</option>
            <option value="OUTRAS_GRADUACOES_COMBINAR">Outras Graduações Sob Medida (Combinado Antecipado)</option>
          </Select>
          <Textarea
            label="Intenção, Linhagem e Propósito Espiritual"
            required
            rows={3}
            placeholder="Descreva a história da congregação, linhagem de estudo e compromisso ético..."
            error={errors.intencaoTrabalho?.message}
            wrapperClassName="sm:col-span-2"
            {...register("intencaoTrabalho")}
          />
        </div>
      </div>

      {/* ETAPA 4: TERMOS MANDATÓRIOS DE CONFORMIDADE */}
      <div className="space-y-4 rounded-xl border border-ambar-500/30 bg-floresta-950/90 p-6">
        <div className="flex items-center gap-2 text-ambar-400">
          <Lock className="h-4 w-4" />
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider">
            Termos Obrigatórios de Anuência e Conformidade Deontológica
          </h4>
        </div>

        <div className="space-y-3.5 pt-2">
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
            <p className="text-[11px] text-red-400">{errors.concordaComConad012010.message}</p>
          )}

          <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
            <input
              type="checkbox"
              {...register("declaraAusenciaFinsLucrativos")}
              className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
            />
            <span className="leading-relaxed">
              Declaramos que o sacramento é vedado a qualquer comércio, revenda avulsa ou consumo doméstico não ritualizado, correspondendo os valores estritamente ao rateio operacional.
            </span>
          </label>
          {errors.declaraAusenciaFinsLucrativos && (
            <p className="text-[11px] text-red-400">{errors.declaraAusenciaFinsLucrativos.message}</p>
          )}

          <label className="flex items-start gap-3 text-xs text-areia-300 cursor-pointer">
            <input
              type="checkbox"
              {...register("planejamento30Dias")}
              className="mt-0.5 rounded border-ambar-500 text-ambar-500 focus:ring-ambar-400 bg-floresta-900"
            />
            <span className="leading-relaxed">
              Assumimos o compromisso de respeitar o <strong>prazo mínimo de 30 dias de antecedência</strong> para qualquer solicitação de cota litúrgica.
            </span>
          </label>
          {errors.planejamento30Dias && (
            <p className="text-[11px] text-red-400">{errors.planejamento30Dias.message}</p>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isSubmitting ? "Enviando Dados..." : "Submeter Ficha de Credenciamento Litúrgico"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};
