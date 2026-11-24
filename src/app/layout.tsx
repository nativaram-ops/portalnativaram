import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComplianceBanner } from "@/components/layout/ComplianceBanner";
import { WelcomeConsentModal } from "@/components/ui/WelcomeConsentModal";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ServiceWorkerRegister } from "@/components/ui/ServiceWorkerRegister";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16281E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nativaramcoop.eco.br"),
  title: "Cooperativa Nativaram | Salvaguarda Litúrgica & Etnobotânica da Floresta",
  description:
    "Site institucional do projeto Cooperativa Nativaram, cooperativa em constituição, ainda sem registro e sem CNPJ. Memória do feitio, acervo etnobotânico, marco legal (Resolução CONAD nº 1/2010) e recursos abertos de segurança. Não vendemos, não recebemos pedidos e não fazemos envios.",
  keywords: [
    "Cooperativa Nativaram",
    "Nascidos do Raio de Sol",
    "Projeto de Cooperativa Etnobotânica (em constituição)",
    "Salvaguarda Litúrgica",
    "Feitio Tradicional",
    "Tucunacá",
    "Chacrona Rainha",
    "CONAD 01/2010",
    "Etnociência",
  ],
  authors: [{ name: "Cooperativa Nativaram (projeto em constituição)" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nativaramcoop.eco.br",
    siteName: "Cooperativa Nativaram",
    title: "Cooperativa Nativaram | Salvaguarda Litúrgica & Etnobotânica da Floresta",
    description:
      "Projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. Site institucional, sem oferta, sem pedidos e sem envios.",
    images: [
      {
        url: "/og-cooperativa-nativaram.jpg",
        width: 1200,
        height: 630,
        alt: "Cooperativa Nativaram — projeto em constituição",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooperativa Nativaram | Projeto em constituição",
    description:
      "Projeto em constituição. Memória cultural e estudo do feitio tradicional da Amazônia Ocidental. Site institucional, sem oferta.",
    images: ["/og-cooperativa-nativaram.jpg"],
  },
  // Ícones: src/app/icon.png (512x512) e src/app/apple-icon.png (180x180), servidos pelo App Router.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cooperativa Nativaram",
    alternateName: "Nascidos do Raio de Sol - projeto em constituição",
    url: "https://nativaramcoop.eco.br",
    logo: "https://nativaramcoop.eco.br/icon-512.png",
    description:
      "A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ. Site institucional: não vende, não recebe pedidos e não faz envios.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Contato institucional",
      email: "nativaram@gmail.com",
      availableLanguage: ["Portuguese", "English"],
    },
  };

  return (
    <html lang="pt-BR" className={`scroll-smooth ${cinzel.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-floresta-950 text-areia-100 antialiased selection:bg-ambar-500 selection:text-floresta-950">
        {/* Skip to content — WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Pular para o conteúdo principal
        </a>

        <ComplianceBanner />
        <WelcomeConsentModal />
        <Navbar />
        <main id="main-content" className="flex-1 w-full">{children}</main>
        <Footer />

        {/* Floating Action Buttons */}
        <WhatsAppFAB />
        <ScrollToTop />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
