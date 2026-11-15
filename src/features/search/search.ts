import type { SearchItem, SearchItemType } from "./search-index";

// Texto sin tildes ni mayúsculas: «Arma» y «árma» se buscan igual
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export type PreparedItem = { item: SearchItem; name: string; detail: string };

// El texto se normaliza una sola vez, al cargar el índice, no en cada pulsación
export function prepareItems(items: SearchItem[]): PreparedItem[] {
  return items.map((item) => ({
    item,
    name: normalize(item.name),
    detail: normalize(item.detail),
  }));
}

// Los universos y los juegos pesan más que una ficha con el mismo nombre
const typeBonus: Record<SearchItemType, number> = {
  universe: 8,
  game: 6,
  page: 4,
  person: 3,
  entry: 0,
};

function scoreItem(
  prepared: PreparedItem,
  query: string,
  tokens: string[],
): number {
  const { name, detail } = prepared;
  let score = 0;

  for (const token of tokens) {
    if (name.includes(token)) {
      // Una palabra del nombre que empieza por el texto vale más que una coincidencia a mitad de palabra
      score += name.startsWith(token) || name.includes(` ${token}`) ? 30 : 20;
    } else if (detail.includes(token)) {
      score += 6;
    } else {
      return 0;
    }
  }

  if (name === query) score += 100;
  else if (name.startsWith(query)) score += 50;

  return score + typeBonus[prepared.item.type];
}

// Todas las palabras del texto deben aparecer en el nombre o en el contexto; ordena por relevancia y luego por nombre
export function searchItems(
  prepared: PreparedItem[],
  rawQuery: string,
  limit = 30,
): SearchItem[] {
  const query = normalize(rawQuery).trim();
  if (query === "") return [];

  const tokens = query.split(/\s+/);

  return prepared
    .map((entry) => ({ entry, score: scoreItem(entry, query, tokens) }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.entry.item.name.localeCompare(b.entry.item.name, "es"),
    )
    .slice(0, limit)
    .map(({ entry }) => entry.item);
}
