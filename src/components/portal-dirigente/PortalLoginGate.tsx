import React, { useState } from "react";
import Link from "next/link";
import { Building2, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface PortalLoginGateProps {
  onAuthenticated: (role: "DIRIGENTE" | "ADMIN", codigoAcesso: string) => void;
}

export const PortalLoginGate: React.FC<PortalLoginGateProps> = ({ onAuthenticated }) => {
  const [modoLogin, setModoLogin] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoUpper = codigoAcesso.trim().toUpperCase();

    if (modoLogin === "ADMIN" || codigoUpper.includes("ADM") || codigoUpper === "ADMIN") {
      onAuthenticated("ADMIN", codigoAcesso);
      setErrorMsg("");
      return;
    }

    if (codigoUpper.length >= 4) {
      onAuthenticated("DIRIGENTE", codigoAcesso);
      setErrorMsg("");
    } else {
      setErrorMsg(
        "Informe o código de homologação do templo (ex: NAT-TEMPLO-842) ou acesse como ADM."
      );
    }
  };

  const loginComoAdminRapido = () => {
    onAuthenticated("ADMIN", "ADM-NATIVARAM");
  };

  const loginComoDirigenteRapido = () => {
    onAuthenticated("DIRIGENTE", "NAT-TEMPLO-842");
  };

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
              Portal de homologação de congregações, solicitações de partilha e administração da cooperativa.
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
            Acesso Rápido de Demonstração:
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
};
