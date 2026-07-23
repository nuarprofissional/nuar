import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  return {
    title: "NUAR — Tecnologia. Design. Resultados.",
    description: "Transformamos negócios tradicionais em marcas digitais de sucesso através de estratégia, design e tecnologia.",
    metadataBase: new URL(origin),
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.png",
      apple: "/favicon-192.png",
    },
    openGraph: {
      title: "NUAR — Tecnologia. Design. Resultados.",
      description: "Estratégia, design e tecnologia para transformar negócios em marcas digitais de sucesso.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${origin}/og.png`, width: 1792, height: 1024, alt: "NUAR — Tecnologia. Design. Resultados." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "NUAR — Tecnologia. Design. Resultados.",
      description: "Estratégia, design e tecnologia para transformar negócios em marcas digitais de sucesso.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
