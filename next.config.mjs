/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
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
