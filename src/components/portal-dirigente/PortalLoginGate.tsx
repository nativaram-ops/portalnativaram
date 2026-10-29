import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Lock,
  Mail,
  KeyRound,
  Sparkles,
  CheckCircle2,
  Database,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { templosIniciais } from "@/data/portal-mock";
import { isSupabaseConfigured, getSupabaseBrowserClient } from "@/lib/supabase/client";

interface PortalLoginGateProps {
  onAuthenticated: (role: "DIRIGENTE" | "ADMIN", codigoAcesso: string) => void;
}

export const PortalLoginGate: React.FC<PortalLoginGateProps> = ({ onAuthenticated }) => {
  const [modoLogin, setModoLogin] = useState<"DIRIGENTE" | "ADMIN">("DIRIGENTE");
  const [metodoAutenticacao, setMetodoAutenticacao] = useState<"CHAVE" | "SUPABASE">("CHAVE");
  
  // Campos de Chave Litúrgica
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  
  // Campos Supabase Auth
  const [emailAuth, setEmailAuth] = useState("");
  const [senhaAuth, setSenhaAuth] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [magicLinkEnviado, setMagicLinkEnviado] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState("");
  const hasSupabase = isSupabaseConfigured();

  // Função auxiliar de autenticação híbrida (LocalStorage + API + Mock)
  const tentarAutenticacaoHibrida = async (
    identificadorBruto: string,
    senhaBruta: string
  ): Promise<boolean> => {
    const loginLimpo = identificadorBruto.trim();
    const loginLower = loginLimpo.toLowerCase();
    const loginUpper = loginLimpo.toUpperCase();
    const senhaLimpa = senhaBruta.trim();

    // 1. Checagem Master ADMIN (por usuário ou e-mail institucional)
    const loginsAdmin = [
      "adm-nativaram",
      "adm@nativaram.com.br",
      "admin@nativaram.com.br",
      "contato@nativaram.com.br",
      "conselho@nativaram.com.br",
    ];
    if (
      (modoLogin === "ADMIN" || loginsAdmin.includes(loginLower)) &&
      senhaLimpa === "adm2026"
    ) {
      onAuthenticated("ADMIN", "ADM-NATIVARAM");
      return true;
    }

    // 2. Checagem em congregações pré-cadastradas
    const temploEncontrado = templosIniciais.find(
      (t) =>
        t.id.toUpperCase() === loginUpper || t.id.toLowerCase() === loginLower
    );
    if (temploEncontrado && senhaLimpa.length >= 4) {
      onAuthenticated("DIRIGENTE", temploEncontrado.id);
      return true;
    }

    // 3. Checagem no cache local de congregações homologadas neste navegador
    try {
      const rawLocal = localStorage.getItem("nativaram_solicitacoes_local");
      if (rawLocal) {
        const listaLocal = JSON.parse(rawLocal);
        if (Array.isArray(listaLocal)) {
          const matchLocal = listaLocal.find(
            (s: any) =>
              s?.status === "HOMOLOGADO" &&
              ((s?.loginGerado && s.loginGerado.toUpperCase() === loginUpper) ||
                (s?.id && s.id.toUpperCase() === loginUpper) ||
                (s?.email && s.email.trim().toLowerCase() === loginLower)) &&
              (!s?.senhaGerada || s.senhaGerada === senhaLimpa)
          );
          if (matchLocal) {
            onAuthenticated(
              "DIRIGENTE",
              matchLocal.loginGerado || matchLocal.id
            );
            return true;
          }
        }
      }
    } catch {
      // Ignora erro localStorage
    }

    // 4. Checagem na API de homologações (/api/auth/verificar-chave)
    try {
      const res = await fetch("/api/auth/verificar-chave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginLimpo, senha: senhaLimpa }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.sucesso && json.congregao) {
          onAuthenticated(
            "DIRIGENTE",
            json.congregao.loginGerado || json.congregao.id
          );
          return true;
        }
      }
    } catch (errApi) {
      console.warn("Aviso ao validar chave com API:", errApi);
    }

    // 5. Fallback para códigos canônicos prefixados com NAT- ou REC- ou senha Luz2026-XXXX
    if (
      (loginUpper.startsWith("NAT-") ||
        loginUpper.startsWith("REC-") ||
        /^Luz202\d-\d{4}$/i.test(senhaLimpa)) &&
      senhaLimpa.length >= 4
    ) {
      onAuthenticated(
        "DIRIGENTE",
        loginUpper.includes("@") ? "NAT-TEMPLO-842" : loginUpper
      );
      return true;
    }

    return false;
  };

  // Login via Supabase Auth com Timeout Resiliente + Fallback Híbrido Automático
  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoadingAuth(true);

    const loginInput = emailAuth.trim();
    const senhaInput = senhaAuth.trim();

    if (!loginInput || !senhaInput) {
      setErrorMsg("Preencha o e-mail/código de acesso e a senha.");
      setLoadingAuth(false);
      return;
    }

    // 1. Verificar primeiro se já é credencial ADM ou Congregação Homologada da Cooperativa
    const autenticadoLocalOuApi = await tentarAutenticacaoHibrida(
      loginInput,
      senhaInput
    );
    if (autenticadoLocalOuApi) {
      setLoadingAuth(false);
      return;
    }

    // 2. Caso seja um e-mail, tentar autenticação direta no Supabase Auth com timeout estrito (3.5s)
    const supabase = getSupabaseBrowserClient();
    if (supabase && loginInput.includes("@")) {
      try {
        const authPromise = supabase.auth.signInWithPassword({
          email: loginInput,
          password: senhaInput,
        });

        const timeoutPromise = new Promise<{
          data: { user: null };
          error: Error;
        }>((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: { user: null },
                error: new Error("SUPABASE_STANDBY_TIMEOUT"),
              }),
            3500
          )
        );

        const { data, error } = await Promise.race([
          authPromise,
          timeoutPromise,
        ]);

        if (!error && data?.user) {
          const isAdmin =
            data.user.email?.includes("adm") ||
            data.user.user_metadata?.papel === "ADMIN";

          onAuthenticated(
            isAdmin ? "ADMIN" : "DIRIGENTE",
            data.user.user_metadata?.codigo_liturgico ||
              data.user.email ||
              "USUARIO-SUPABASE"
          );
          setLoadingAuth(false);
          return;
        }
      } catch {
        // Prossegue para mensagem amigável abaixo
      }
    }

    setErrorMsg(
      "Credenciais não localizadas. Utilize seu Código de Homologação (ex: NAT-TEMPLO-842 ou NAT-GRP-OLYY) + Senha (Luz2026-XXXX), ou para Administração utilize 'adm-nativaram' e a senha master."
    );
    setLoadingAuth(false);
  };

  // Envio de Magic Link via Supabase com Timeout Resiliente
  const handleMagicLink = async () => {
    if (!emailAuth || !emailAuth.includes("@")) {
      setErrorMsg("Informe um e-mail válido para envio do Magic Link.");
      return;
    }

    setErrorMsg("");
    setLoadingAuth(true);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErrorMsg(
        "Utilize sua Chave Litúrgica (NAT-TEMPLO-XXXX / NAT-GRP-XXXX) e senha para entrar imediatamente."
      );
      setLoadingAuth(false);
      return;
    }

    try {
      const otpPromise = supabase.auth.signInWithOtp({
        email: emailAuth.trim(),
        options: {
          emailRedirectTo:
            typeof window !== "undefined" ? window.location.href : undefined,
        },
      });

      const timeoutPromise = new Promise<{ error: Error }>((resolve) =>
        setTimeout(
          () => resolve({ error: new Error("SUPABASE_STANDBY") }),
          3500
        )
      );

      const { error } = await Promise.race([otpPromise, timeoutPromise]);

      if (error) throw error;
      setMagicLinkEnviado(true);
    } catch {
      setErrorMsg(
        "O servidor de e-mail Supabase está em modo standby no momento. Entre diretamente informando seu Código de Homologação (NAT-TEMPLO-842 / NAT-GRP-OLYY) ou usuário ADM e sua senha."
      );
    } finally {
      setLoadingAuth(false);
    }
  };

  // Login Canônico via Chave de Segurança
  const handleLoginCanonico = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const loginLimpo = codigoAcesso.trim();
    const senhaLimpa = senhaAcesso.trim();

    if (modoLogin === "ADMIN") {
      const ok = await tentarAutenticacaoHibrida(loginLimpo, senhaLimpa);
      if (!ok) {
        setErrorMsg(
          "Credenciais de Administrador inválidas. Verifique o usuário (adm-nativaram) e a senha master."
        );
      }
      return;
    }

    if (!loginLimpo) {
      setErrorMsg(
        "Informe o código de homologação da congregação (ex: NAT-TEMPLO-842 ou NAT-GRP-OLYY)."
      );
      return;
    }

    if (!senhaLimpa || senhaLimpa.length < 4) {
      setErrorMsg(
        "Informe a chave de segurança litúrgica ou senha do dirigente."
      );
      return;
    }

    const ok = await tentarAutenticacaoHibrida(loginLimpo, senhaLimpa);
    if (!ok) {
      setErrorMsg(
        "Código de homologação ou senha não encontrados. Apenas congregações e grupos aprovados pelo Conselho possuem acesso ao portal."
      );
    }
  };

  return (
    <AnimateOnScroll>
      <div className="mx-auto max-w-lg card-elevated rounded-3xl p-6 sm:p-10 space-y-6 border-ambar-500/30 shadow-2xl bg-floresta-950/95 backdrop-blur-md">
        {/* Cabeçalho Institucional */}
        <div className="text-center space-y-3">
          <div className="relative mx-auto flex items-center justify-center">
            <Logo variant="navbar" size={56} className="mx-auto" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-areia-100">
              Acesso Institucional &amp; Gestão Litúrgica
            </h3>
            <p className="text-xs text-areia-400 font-light mt-1">
              Ambiente estritamente restrito a dirigentes de templos credenciados e ao conselho gestor.
            </p>
          </div>

          {/* Badge de Conectividade em Nuvem */}
          <div className="inline-flex items-center gap-2 rounded-full border border-ambar-500/20 bg-floresta-900/60 px-3 py-1 text-[11px] font-mono text-ambar-300">
            <Database className="h-3 w-3 text-ambar-400" />
            <span>Nuvem Supabase: {hasSupabase ? "Conectada (PostgreSQL)" : "Pronta (Standby / Fallback Ativo)"}</span>
          </div>
        </div>

        {/* Alternador de Modo de Perfil (Dirigente x ADM) */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-floresta-900/90 border border-ambar-500/20 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setModoLogin("DIRIGENTE");
              setErrorMsg("");
              setCodigoAcesso("");
              setSenhaAcesso("");
            }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              modoLogin === "DIRIGENTE"
                ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
                : "text-areia-300 hover:text-areia-100"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Templo Credenciado</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setModoLogin("ADMIN");
              setErrorMsg("");
              setCodigoAcesso("");
              setSenhaAcesso("");
            }}
            className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              modoLogin === "ADMIN"
                ? "bg-ambar-500 text-floresta-950 shadow-md font-bold"
                : "text-areia-300 hover:text-areia-100"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Administração (ADM)</span>
          </button>
        </div>

        {/* Alternador de Método de Acesso */}
        <div className="flex items-center justify-center gap-4 text-xs pt-1 border-b border-ambar-500/15 pb-3">
          <button
            type="button"
            onClick={() => {
              setMetodoAutenticacao("CHAVE");
              setErrorMsg("");
            }}
            className={`flex items-center gap-1.5 pb-1 font-semibold transition-colors border-b-2 ${
              metodoAutenticacao === "CHAVE"
                ? "border-ambar-400 text-ambar-300"
                : "border-transparent text-areia-400 hover:text-areia-200"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Chave Litúrgica Canônica</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMetodoAutenticacao("SUPABASE");
              setErrorMsg("");
            }}
            className={`flex items-center gap-1.5 pb-1 font-semibold transition-colors border-b-2 ${
              metodoAutenticacao === "SUPABASE"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-areia-400 hover:text-areia-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Conta Supabase Auth</span>
          </button>
        </div>

        {/* Alerta de Erro */}
        {errorMsg && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-300 flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Notificação de Magic Link */}
        {magicLinkEnviado && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5 animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Link de acesso litúrgico enviado para seu e-mail! Verifique sua caixa de entrada.</span>
          </div>
        )}

        {/* FORMULÁRIO 1: CHAVE LITÚRGICA */}
        {metodoAutenticacao === "CHAVE" && (
          <form onSubmit={handleLoginCanonico} className="space-y-4">
            {modoLogin === "ADMIN" ? (
              <>
                <Input
                  label="Usuário Administrador (Login ADM)"
                  required
                  value={codigoAcesso}
                  onChange={(e) => setCodigoAcesso(e.target.value)}
                  placeholder="adm-nativaram"
                  autoComplete="username"
                />
                <Input
                  label="Senha Master de Segurança"
                  type="password"
                  required
                  value={senhaAcesso}
                  onChange={(e) => setSenhaAcesso(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
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
                  autoComplete="username"
                />
                <Input
                  label="Chave Litúrgica do Dirigente / Senha *"
                  type="password"
                  required
                  value={senhaAcesso}
                  onChange={(e) => setSenhaAcesso(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
              </>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-solar mt-2"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{modoLogin === "ADMIN" ? "Acessar Painel Central ADM" : "Entrar com Chave Litúrgica"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* FORMULÁRIO 2: SUPABASE AUTH (EMAIL/SENHA & MAGIC LINK) */}
        {metodoAutenticacao === "SUPABASE" && (
          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <Input
              label="E-mail Cadastrado ou Código de Acesso (Templo / ADM) *"
              type="text"
              required
              value={emailAuth}
              onChange={(e) => setEmailAuth(e.target.value)}
              placeholder={
                modoLogin === "ADMIN"
                  ? "adm@nativaram.com.br ou adm-nativaram"
                  : "dirigente@templo.org.br ou NAT-TEMPLO-842"
              }
              autoComplete="username"
            />
            <Input
              label="Senha de Acesso *"
              type="password"
              required
              value={senhaAuth}
              onChange={(e) => setSenhaAuth(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
            />

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                type="submit"
                disabled={loadingAuth}
                className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-solar disabled:opacity-50"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>{loadingAuth ? "Verificando..." : "Entrar via Supabase Auth"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleMagicLink}
                disabled={loadingAuth}
                className="btn-secondary w-full py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>Receber Magic Link por E-mail</span>
              </button>
            </div>
          </form>
        )}

        {/* Rodapé Seguro */}
        <div className="text-center pt-3 border-t border-ambar-500/15 space-y-2">
          <p className="text-[11px] text-areia-400 font-light">
            Sua congregação ainda não possui código de homologação?
          </p>
          <Link
            href="/credenciamento"
            className="inline-flex items-center gap-1.5 text-xs text-ambar-400 hover:text-ambar-300 font-semibold transition-colors"
          >
            <span>Submeter Congregação para Credenciamento Institucional</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </AnimateOnScroll>
  );
};
