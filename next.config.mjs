// CSP completa em modo observação (Report-Only): o navegador só relata violações
// no console, sem bloquear nada. Promover para Content-Security-Policy depois de
// conferir que nenhuma origem legítima (embeds, Supabase, fontes) é barrada.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://*.supabase.co",
  "frame-src 'self' https://www.youtube.com https://open.spotify.com https://www.instagram.com",
  "object-src 'self'",
  "base-uri 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Vercel optimiza imagens automaticamente via Edge Network
  // Remover `unoptimized: true` permite WebP/AVIF automático + lazy loading
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Rota canônica litúrgica (/sacramentos) e redirecionamento de manifesto
  async rewrites() {
    return [
      {
        source: "/sacramentos",
        destination: "/medicinas",
      },
      {
        source: "/sacramentos/:slug*",
        destination: "/medicinas/:slug*",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/manifesto",
        destination: "/institucional",
        permanent: true,
      },
    ];
  },

  // Headers de segurança e compliance
  async headers() {
    return [
      // PDFs da biblioteca abrem no visualizador interno; demais arquivos seguem o padrão.
      // X-Frame-Options e frame-ancestors já vêm da regra global abaixo.
      {
        source: "/documentos/:path*.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP_REPORT_ONLY,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
