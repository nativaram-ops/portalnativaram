import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComplianceBanner } from "@/components/layout/ComplianceBanner";
import { WelcomeConsentModal } from "@/components/ui/WelcomeConsentModal";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

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
    "Preservação cultural, ciência do feitio purista da Ayahuasca e apoio logístico e operacional cooperativo a instituições religiosas homologadas sob amparo da CF/88, Resolução CONAD nº 01/2010 e ANVISA.",
  keywords: [
    "Cooperativa Nativaram",
    "Nascidos do Raio de Sol",
    "Cooperativa Etnobotânica",
    "Salvaguarda Litúrgica",
    "Feitio Purista",
    "Tucunacá",
    "Chacrona Rainha",
    "CONAD 01/2010",
    "Rapés Sagrados",
    "Etnociência",
  ],
  authors: [{ name: "Cooperativa Etnobotânica Nativaram" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nativaramcoop.eco.br",
    siteName: "Cooperativa Nativaram",
    title: "Cooperativa Nativaram | Salvaguarda Litúrgica & Etnobotânica da Floresta",
    description:
      "Preservação cultural, ciência do feitio purista e provimento assistido de sacramentos tradicionais para instituições homologadas.",
    images: [
      {
        url: "/assets/banners/frasco-rape-apresentacao.jpeg",
        width: 1200,
        height: 630,
        alt: "Nativaram Brasil — Cooperativa Etnobotânica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nativaram Brasil | Cooperativa Etnobotânica",
    description:
      "Preservação cultural e ciência do feitio purista da Amazônia Ocidental.",
    images: ["/assets/banners/frasco-rape-apresentacao.jpeg"],
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nativaram Brasil",
    alternateName: "Nascidos do Raio de Sol - Cooperativa Etnobotânica",
    url: "https://nativaramcoop.eco.br",
    logo: "https://nativaramcoop.eco.br/assets/logo.png",
    description:
      "Cooperativa etnobotânica dedicada à salvaguarda cultural, à ciência do feitio purista da Ayahuasca e das medicinas tradicionais amazônicas sob amparo da Resolução CONAD nº 01/2010.",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Cruzeiro do Sul",
        addressRegion: "AC",
        addressCountry: "BR",
        description: "Ponto de Feitio Nativo e Manejo Agroflorestal",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Serra",
        addressRegion: "ES",
        addressCountry: "BR",
        description: "Ponto de Partilha e Apoio Logístico",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Atendimento Institucional e Litúrgico",
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
      </body>
    </html>
  );
}
