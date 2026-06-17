import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = "https://qualoversiculo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Qual o Versículo? — Bíblia Católica CNBB",
    template: "%s | Qual o Versículo?",
  },
  description:
    "Busque por palavra, livro ou referência na Bíblia Católica CNBB. Versículo do dia, busca instantânea e compartilhamento. João 3:16, Salmos 23, Gênesis 1...",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Qual o Versículo?",
    title: "Qual o Versículo? — Bíblia Católica CNBB",
    description:
      "Busque por palavra, livro ou referência na Bíblia Católica CNBB. Versículo do dia, busca instantânea e compartilhamento.",
  },
  twitter: {
    card: "summary",
    title: "Qual o Versículo? — Bíblia Católica CNBB",
    description:
      "Busque por palavra, livro ou referência na Bíblia Católica CNBB.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qual o Versículo?",
    url: SITE_URL,
    description: "Buscador de versículos bíblicos da Bíblia Católica CNBB.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="pt-BR" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col items-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="w-full max-w-lg md:max-w-2xl bg-brand-bg min-h-full shadow-sm md:shadow-xl md:rounded-3xl md:my-8">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
