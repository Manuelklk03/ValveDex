import type { LevelDetail } from "@/domain/level";
import { halfLife2LevelsPart3 } from "./levels/half-life-2-part3";

// Fichas de nivel escritas a mano con fuente. Los niveles sin ficha siguen apareciendo en su capítulo,
// y todos reciben además los personajes, enemigos y armas que su mapa coloca (levels/map-entities.ts).
export const levelDetails: LevelDetail[] = [...halfLife2LevelsPart3];
