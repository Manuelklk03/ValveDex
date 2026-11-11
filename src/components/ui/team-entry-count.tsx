"use client";

import { useTeam } from "./team-scope";

type TeamEntryCountProps = {
  // Fichas visibles de cada equipo; `total` vale cuando el juego no tiene equipos
  counts: Record<string, number>;
  total: number;
};

// «N fichas» que sigue al equipo elegido, porque el CSS oculta las fichas de los otros equipos
export function TeamEntryCount({ counts, total }: TeamEntryCountProps) {
  const team = useTeam()?.team;
  const count = team ? (counts[team.id] ?? total) : total;

  return `${count} ${count === 1 ? "ficha" : "fichas"}`;
}
