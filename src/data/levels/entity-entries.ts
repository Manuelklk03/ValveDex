import type { EntryCategory } from "@/domain/entry";

// Correspondencia entre las clases de entidad que colocan los mapas (src/data/levels/map-entities.ts)
// y las fichas del catálogo. Una clase sin ficha (por ejemplo, npc_citizen o npc_barnacle) no se enlaza.
export const entityEntries: Record<
  string,
  {
    category: Extract<EntryCategory, "characters" | "enemies" | "weapons">;
    entryId: string;
  }
> = {
  // Personajes
  npc_alyx: { category: "characters", entryId: "alyx-vance" },
  npc_barney: { category: "characters", entryId: "hl2-barney-calhoun" },
  npc_breen: { category: "characters", entryId: "wallace-breen" },
  npc_dog: { category: "characters", entryId: "d0g" },
  npc_eli: { category: "characters", entryId: "hl2-eli-vance" },
  npc_gman: { category: "characters", entryId: "hl2-g-man" },
  npc_kleiner: { category: "characters", entryId: "hl2-isaac-kleiner" },
  npc_magnusson: { category: "characters", entryId: "ep2-arne-magnusson" },
  npc_monk: { category: "characters", entryId: "father-grigori" },
  npc_mossman: { category: "characters", entryId: "judith-mossman" },

  // Enemigos
  npc_antlion: { category: "enemies", entryId: "hl2-antlion" },
  npc_antlionguard: { category: "enemies", entryId: "hl2-antlion-guard" },
  npc_combine_s: { category: "enemies", entryId: "hl2-overwatch-soldier" },
  npc_combine_s_elite: { category: "enemies", entryId: "hl2-combine-elite" },
  npc_combinedropship: { category: "enemies", entryId: "hl2-combine-dropship" },
  npc_combinegunship: { category: "enemies", entryId: "hl2-gunship" },
  npc_clawscanner: { category: "enemies", entryId: "hl2-shield-scanner" },
  npc_cscanner: { category: "enemies", entryId: "hl2-city-scanner" },
  npc_fastzombie: { category: "enemies", entryId: "hl2-fast-zombie" },
  npc_fastzombie_torso: { category: "enemies", entryId: "hl2-fast-zombie" },
  npc_headcrab: { category: "enemies", entryId: "hl2-classic-headcrab" },
  npc_headcrab_black: { category: "enemies", entryId: "hl2-poison-headcrab" },
  npc_headcrab_fast: { category: "enemies", entryId: "hl2-fast-headcrab" },
  npc_helicopter: { category: "enemies", entryId: "hl2-hunter-chopper" },
  npc_hunter: { category: "enemies", entryId: "ep2-hunter" },
  npc_manhack: { category: "enemies", entryId: "hl2-manhack" },
  npc_metropolice: { category: "enemies", entryId: "hl2-civil-protection" },
  npc_poisonzombie: { category: "enemies", entryId: "hl2-poison-zombie" },
  npc_rollermine: { category: "enemies", entryId: "hl2-rollermine" },
  npc_sniper: { category: "enemies", entryId: "hl2-combine-sniper" },
  npc_strider: { category: "enemies", entryId: "hl2-strider" },
  npc_turret_floor: { category: "enemies", entryId: "hl2-sentry-gun" },
  npc_zombie: { category: "enemies", entryId: "hl2-classic-zombie" },
  npc_zombie_torso: { category: "enemies", entryId: "hl2-classic-zombie" },
  npc_zombine: { category: "enemies", entryId: "ep1-zombine" },

  // Armas colocadas en el mapa o entregadas al jugador por el nivel
  weapon_357: { category: "weapons", entryId: "hl2-357" },
  weapon_ar2: { category: "weapons", entryId: "hl2-pulse-rifle" },
  weapon_bugbait: { category: "weapons", entryId: "hl2-bugbait" },
  weapon_crossbow: { category: "weapons", entryId: "hl2-crossbow" },
  weapon_crowbar: { category: "weapons", entryId: "hl2-crowbar" },
  weapon_frag: { category: "weapons", entryId: "hl2-frag-grenade" },
  weapon_physcannon: { category: "weapons", entryId: "hl2-gravity-gun" },
  weapon_pistol: { category: "weapons", entryId: "hl2-pistol" },
  weapon_rpg: { category: "weapons", entryId: "hl2-rpg" },
  weapon_shotgun: { category: "weapons", entryId: "hl2-shotgun" },
  weapon_smg1: { category: "weapons", entryId: "hl2-smg" },
};
