import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  isSupabaseConfigured,
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY,
} from "./client";

/**
 * Utilitário Supabase para Server Components, Route Handlers e Server Actions.
 * Gerencia cookies de autenticação de forma compatível com o Next.js 15 App Router.
 */
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Chamado a partir de um Server Component: cookies não podem ser modificados diretamente.
        }
      },
    },
  });
}
