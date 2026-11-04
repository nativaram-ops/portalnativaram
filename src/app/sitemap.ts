import type { MetadataRoute } from "next";
import { medicinas } from "../data/medicinas";
import { obterPerfisTemplos } from "../lib/db/comunidade";

const BASE_URL = "https://nativaramcoop.eco.br";

// Perfis comunitários mudam pelo painel: regenera o sitemap a cada hora.
export const revalidate = 3600;

/** Converte `atualizadoEm` ("DD/MM/AAAA" do seed ou ISO do banco) em Date; inválido → undefined. */
function dataReal(valor?: string): Date | undefined {
  if (!valor) return undefined;
  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor.trim());
  const data = br ? new Date(`${br[3]}-${br[2]}-${br[1]}T00:00:00Z`) : new Date(valor);
  return Number.isNaN(data.getTime()) ? undefined : data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sem `lastModified` nas rotas estáticas: não há data real de alteração para elas.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/institucional`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/feitio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/sacramentos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projetos-de-luz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compliance`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/credenciamento`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/estudos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/reconhecimento`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contato`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const sacramentosRoutes: MetadataRoute.Sitemap = medicinas.map((medicina) => ({
    url: `${BASE_URL}/sacramentos/${medicina.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Slugs vindos da fonte de dados (seed local + Supabase), só perfis publicados.
  const perfis = await obterPerfisTemplos().catch(() => []);
  const comunidadeRoutes: MetadataRoute.Sitemap = perfis
    .filter((perfil) => perfil.publicado && perfil.slug)
    .map((perfil) => {
      const lastModified = dataReal(perfil.atualizadoEm);
      return {
        url: `${BASE_URL}/estudos/comunidade/${perfil.slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...sacramentosRoutes, ...comunidadeRoutes];
}
