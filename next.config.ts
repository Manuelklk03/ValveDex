import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Para Docker: el build deja en .next/standalone solo lo necesario para ejecutar el servidor
  output: "standalone",
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
