import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 100 para las capturas de modelos del comparador: a 75 (el valor por defecto) se emborronan
    qualities: [75, 100],
  },
  experimental: {
    agentUpgrade: "security",
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
