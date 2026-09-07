"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

const contactSchema = z.object({
  nome: z.string().min(3, "O nome deve conter ao menos 3 caracteres"),
  email: z.string().email("Por favor, insira um e-mail institucional válido"),
  whatsapp: z
    .string()
    .min(10, "Informe o DDD e número (ex: 27999999999)")
    .regex(/^[0-9()\s-+]+$/, "Formato de telefone inválido"),
  instituicao: z.string().min(3, "Informe a instituição, congregação ou templo"),
  tipoInteresse: z.enum([
    "credenciamento",
    "duvidas-feitio",
    "projetos-luz",
    "etnociencia",
    "outro",
  ]),
  mensagem: z.string().min(10, "A mensagem deve conter ao menos 10 caracteres"),
  aceitouTermos: z.literal(true, {
    errorMap: () => ({
      message: "Você deve declarar ciência do caráter litúrgico e legal da Nativaram",
    }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: "",
      email: "",
      whatsapp: "",
      instituicao: "",
      tipoInteresse: "credenciamento",
      mensagem: "",
      aceitouTermos: undefined,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate server submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-ambar-500/40 bg-floresta-900/80 p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ambar-500/20 text-ambar-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-xl font-bold text-areia-100">
          Mensagem Recebida com Sucesso!
        </h3>
        <p className="text-sm text-areia-300 max-w-md mx-auto leading-relaxed">
          Agradecemos pelo contato fraterno. Nossos guardiões e conselho etnobotânico analisarão sua mensagem e responderão via WhatsApp ou e-mail com brevidade.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 rounded-lg border border-ambar-500/30 px-4 py-2 text-xs font-semibold text-ambar-400 hover:bg-floresta-800 transition-colors"
        >
          Enviar Outra Mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-ambar-500/30 bg-floresta-900/60 p-6 sm:p-8 space-y-5 shadow-lg"
      noValidate
    >
      <div className="border-b border-ambar-500/20 pb-4">
        <h3 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ambar-400" />
          <span>Formulário de Contato & Apoio Litúrgico</span>
        </h3>
        <p className="text-xs text-areia-400 mt-1">
          Canal formal de comunicação com os guardiões da Cooperativa Nativaram Brasil.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nome */}
        <div className="space-y-1.5">
          <label htmlFor="nome" className="block text-xs font-medium text-areia-200">
            Nome Completo do Dirigente ou Representante <span className="text-ambar-400">*</span>
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: Carlos de Souza"
            {...register("nome")}
            aria-required="true"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-error" : undefined}
            className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
          />
          {errors.nome && (
            <p id="nome-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" /> {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-areia-200">
            E-mail Institucional ou Pessoal <span className="text-ambar-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="contato@seutemplo.org"
            {...register("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label htmlFor="whatsapp" className="block text-xs font-medium text-areia-200">
            WhatsApp para Contato Direto <span className="text-ambar-400">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="(27) 99999-9999"
            {...register("whatsapp")}
            aria-required="true"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
          />
          {errors.whatsapp && (
            <p id="whatsapp-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" /> {errors.whatsapp.message}
            </p>
          )}
        </div>

        {/* Instituição */}
        <div className="space-y-1.5">
          <label htmlFor="instituicao" className="block text-xs font-medium text-areia-200">
            Nome da Congregação / Templo / Coletivo <span className="text-ambar-400">*</span>
          </label>
          <input
            id="instituicao"
            type="text"
            placeholder="Ex: Templo Luz da Floresta"
            {...register("instituicao")}
            aria-required="true"
            aria-invalid={!!errors.instituicao}
            aria-describedby={errors.instituicao ? "instituicao-error" : undefined}
            className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
          />
          {errors.instituicao && (
            <p id="instituicao-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" /> {errors.instituicao.message}
            </p>
          )}
        </div>
      </div>

      {/* Tipo de Interesse */}
      <div className="space-y-1.5">
        <label htmlFor="tipoInteresse" className="block text-xs font-medium text-areia-200">
          Assunto Principal <span className="text-ambar-400">*</span>
        </label>
        <select
          id="tipoInteresse"
          {...register("tipoInteresse")}
          className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
        >
          <option value="credenciamento">Credenciamento Litúrgico de Templo</option>
          <option value="duvidas-feitio">Dúvidas sobre Feitio Purista e Graduações</option>
          <option value="projetos-luz">Parcerias para a Ecovila e Projetos de Luz</option>
          <option value="etnociencia">Pesquisa Acadêmica & Etnociência</option>
          <option value="outro">Outro assunto institucional</option>
        </select>
      </div>

      {/* Mensagem */}
      <div className="space-y-1.5">
        <label htmlFor="mensagem" className="block text-xs font-medium text-areia-200">
          Sua Mensagem ou Solicitação <span className="text-ambar-400">*</span>
        </label>
        <textarea
          id="mensagem"
          rows={4}
          placeholder="Descreva brevemente suas dúvidas, intenção de aproximação litúrgica ou apoio..."
          {...register("mensagem")}
          aria-required="true"
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
          className="w-full rounded-md border border-ambar-500/30 bg-floresta-950/80 px-3.5 py-2 text-sm text-areia-100 placeholder-areia-500 focus:border-ambar-400 focus:outline-none focus:ring-1 focus:ring-ambar-400"
        />
        {errors.mensagem && (
          <p id="mensagem-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" /> {errors.mensagem.message}
          </p>
        )}
      </div>

      {/* Consentimento Termos */}
      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            {...register("aceitouTermos")}
            aria-required="true"
            className="mt-1 h-4 w-4 rounded border-ambar-500/30 bg-floresta-950 text-ambar-500 focus:ring-ambar-400"
          />
          <span className="text-xs text-areia-300 leading-relaxed">
            Declaro ciência de que a Nativaram Brasil é uma cooperativa etnobotânica de caráter puramente espiritual e litúrgico, regulada pela Resolução CONAD nº 01/2010, sem fins lucrativos ou apelo recreativo.
          </span>
        </label>
        {errors.aceitouTermos && (
          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" /> {errors.aceitouTermos.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-ambar-600 via-ambar-500 to-ambar-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-floresta-950 shadow-solar hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Enviando Mensagem...</span>
          ) : (
            <>
              <span>Enviar Solicitação Institucional</span>
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
