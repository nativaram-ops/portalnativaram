/**
 * Decide o papel de quem entrou pelo Supabase Auth.
 *
 * Só vale o que o servidor grava: `app_metadata` (o usuário não consegue editar)
 * e a lista fixa de e-mails do Conselho. Nada que venha do corpo da requisição
 * ou de `user_metadata` (editável pelo próprio usuário) concede acesso.
 */
export interface UsuarioSupabaseMinimo {
  email?: string | null;
  app_metadata?: Record<string, unknown> | null;
}

export type PapelSupabase =
  | { role: "ADMIN" }
  | { role: "DIRIGENTE"; codigo: string }
  | null;

export function resolverPapelSupabase(
  user: UsuarioSupabaseMinimo,
  adminLogins: readonly string[]
): PapelSupabase {
  const email = (user.email || "").trim().toLowerCase();
  const meta = user.app_metadata || {};

  if (meta.role === "admin" || (email && adminLogins.includes(email))) {
    return { role: "ADMIN" };
  }

  const codigo = typeof meta.codigo_liturgico === "string" ? meta.codigo_liturgico.trim() : "";
  if (codigo) {
    return { role: "DIRIGENTE", codigo: codigo.toUpperCase() };
  }

  return null;
}
