import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Solo al construir la imagen de Docker (Dockerfile): deja en .next/standalone lo necesario para ejecutar el servidor.
  // Con ese modo, «next start» avisa de que no es compatible, así que el build normal no lo activa
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 100 para las capturas de modelos del comparador: a 75 (el valor por defecto) se emborronan
    qualities: [75, 100],
  },
  experimental: {
    agentUpgrade: "security",
  },
  // Fichas que cambiaron de dirección: la antigua sigue llevando a su contenido
  async redirects() {
    return [
      {
        // La ficha conjunta se dividió en cuatro clases de marines aliados (cierre de R3)
        source: "/fichas/ingenieros-y-medicos-hecu",
        destination: "/fichas/ingenieros-hecu",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
