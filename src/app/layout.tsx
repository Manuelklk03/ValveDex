import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Archivo con eje de anchura: titulares anchos y pesados, como el wordmark de Valve
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Monoespaciada para códigos y fichas técnicas
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "ValveDex",
    template: "%s · ValveDex",
  },
  description:
    "Enciclopedia de los juegos de Valve: Half-Life, Opposing Force y Blue Shift.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
