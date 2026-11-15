import { buildSearchIndex } from "@/features/search/search-index";

// Para qué sirve: el buscador (Ctrl+K) descarga este JSON la primera vez que se abre, en lugar de llevar
// las más de ochocientas fichas dentro de cada página. No usa datos de la petición, así que se genera
// una sola vez al compilar.
export function GET() {
  return Response.json(buildSearchIndex());
}
