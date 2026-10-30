import type { MetadataRoute } from "next";
import { medicinas } from "../data/medicinas";
import { estudosData } from "../data/estudos";

const PERFIS_COMUNIDADE_SLUGS = [
  "ceu-do-cruzeiro",
  "rainha-da-floresta",
  "circulo-yawanawa-sp",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nativaramcoop.eco.br";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/institucional`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/feitio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sacramentos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projetos-de-luz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/credenciamento`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/estudos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reconhecimento`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const sacramentosRoutes: MetadataRoute.Sitemap = medicinas.map((medicina) => ({
    url: `${baseUrl}/sacramentos/${medicina.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comunidadeRoutes: MetadataRoute.Sitemap = PERFIS_COMUNIDADE_SLUGS.map(
    (slug) => ({
      url: `${baseUrl}/estudos/comunidade/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const dossiesRoutes: MetadataRoute.Sitemap = estudosData.map((dossie) => ({
    url: `${baseUrl}/estudos/dossies/${dossie.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...sacramentosRoutes,
    ...comunidadeRoutes,
    ...dossiesRoutes,
  ];
}
