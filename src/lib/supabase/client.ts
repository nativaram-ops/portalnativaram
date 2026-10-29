import { createBrowserClient } from "@supabase/ssr";

/**
 * Constantes públicas de fallback do projeto Supabase (NEXT_PUBLIC_*)
 * Garantem funcionamento contínuo em produção (Vercel) mesmo quando variáveis de ambiente
 * locais (.env.local) não foram replicadas no painel de deploy.
 */
export const SUPABASE_PUBLIC_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qpgtngknrrawpaatiofe.supabase.co";

export const SUPABASE_PUBLIC_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_38DHuwABVNhHi8KkofViPQ_1Jte4qve";

/**
 * Cliente Supabase singleton para execução no navegador (Client Components).
 * Possui detecção de configuração para evitar exceções caso a chave não esteja definida.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_PUBLIC_URL &&
      SUPABASE_PUBLIC_ANON_KEY &&
      !SUPABASE_PUBLIC_ANON_KEY.includes("placeholder") &&
      SUPABASE_PUBLIC_URL.startsWith("https://")
  );
}

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      SUPABASE_PUBLIC_URL,
      SUPABASE_PUBLIC_ANON_KEY
    );
  }

  return browserClient;
}
