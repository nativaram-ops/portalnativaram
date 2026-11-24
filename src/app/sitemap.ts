import type { MetadataRoute } from "next";

const BASE_URL = "https://nativaramcoop.eco.br";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sem `lastModified` nas rotas estáticas: não há data real de alteração para elas.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/institucional`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/feitio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/sacramentos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projetos-de-luz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compliance`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/entidades-religiosas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/seguranca`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/transparencia`, changeFrequency: "monthly", priority: 0.7 },
    // Central de Recursos (pública, sem login)
    { url: `${BASE_URL}/portal-dirigente`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/estudos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/contato`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacidade`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // ADR-016: fichas de rapé e perfis de templos saíram do ar (redirecionam).
  return staticRoutes;
}
