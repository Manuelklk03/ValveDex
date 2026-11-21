// Universos cuyo hub, apartados y fichas son un «mundo» (cabecera con el material del juego, salas y piezas):
// Half-Life, Portal y Team Fortress. El resto de sagas conserva las páginas de siempre hasta que tenga el suyo.
const worldUniverses = ["half-life", "portal", "team-fortress"];

export function isWorldUniverse(universeSlug: string) {
  return worldUniverses.includes(universeSlug);
}
