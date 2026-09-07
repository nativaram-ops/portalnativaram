import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal-dirigente/painel", "/api/"],
      },
    ],
    sitemap: "https://nativaramcoop.eco.br/sitemap.xml",
  };
}
