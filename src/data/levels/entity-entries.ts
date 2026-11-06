import type { EntryCategory } from "@/domain/entry";

type EntityLink = {
  category: Extract<EntryCategory, "characters" | "enemies" | "weapons">;
  entryId: string;
};

type EntityTable = Record<string, EntityLink>;

const character = (entryId: string): EntityLink => ({
  category: "characters",
  entryId,
});
const enemy = (entryId: string): EntityLink => ({
  category: "enemies",
  entryId,
});
const weapon = (entryId: string): EntityLink => ({
  category: "weapons",
  entryId,
});

// Correspondencia entre las clases de entidad que colocan los mapas (levels/map-entities.ts) y las
// fichas del catálogo, una tabla por motor porque una misma clase (weapon_crowbar, weapon_357…) es
// otra ficha en Half-Life 1 y en Half-Life 2. Una clase sin ficha (npc_citizen, npc_barnacle…) no se enlaza.
const source: EntityTable = {
  // Personajes
  npc_alyx: character("alyx-vance"),
  npc_barney: character("hl2-barney-calhoun"),
  npc_breen: character("wallace-breen"),
  npc_dog: character("d0g"),
  npc_eli: character("hl2-eli-vance"),
  npc_gman: character("hl2-g-man"),
  npc_kleiner: character("hl2-isaac-kleiner"),
  npc_magnusson: character("ep2-arne-magnusson"),
  npc_monk: character("father-grigori"),
  npc_mossman: character("judith-mossman"),

  // Enemigos
  npc_antlion: enemy("hl2-antlion"),
  npc_antlionguard: enemy("hl2-antlion-guard"),
  npc_combine_s: enemy("hl2-overwatch-soldier"),
  npc_combine_s_elite: enemy("hl2-combine-elite"),
  npc_combinedropship: enemy("hl2-combine-dropship"),
  npc_combinegunship: enemy("hl2-gunship"),
  npc_clawscanner: enemy("hl2-shield-scanner"),
  npc_cscanner: enemy("hl2-city-scanner"),
  npc_fastzombie: enemy("hl2-fast-zombie"),
  npc_fastzombie_torso: enemy("hl2-fast-zombie"),
  npc_headcrab: enemy("hl2-classic-headcrab"),
  npc_headcrab_black: enemy("hl2-poison-headcrab"),
  npc_headcrab_fast: enemy("hl2-fast-headcrab"),
  npc_helicopter: enemy("hl2-hunter-chopper"),
  npc_hunter: enemy("ep2-hunter"),
  npc_manhack: enemy("hl2-manhack"),
  npc_metropolice: enemy("hl2-civil-protection"),
  npc_poisonzombie: enemy("hl2-poison-zombie"),
  npc_rollermine: enemy("hl2-rollermine"),
  npc_sniper: enemy("hl2-combine-sniper"),
  npc_strider: enemy("hl2-strider"),
  npc_turret_floor: enemy("hl2-sentry-gun"),
  npc_zombie: enemy("hl2-classic-zombie"),
  npc_zombie_torso: enemy("hl2-classic-zombie"),
  npc_zombine: enemy("ep1-zombine"),

  // Armas colocadas en el mapa o entregadas al jugador por el nivel
  weapon_357: weapon("hl2-357"),
  weapon_ar2: weapon("hl2-pulse-rifle"),
  weapon_bugbait: weapon("hl2-bugbait"),
  weapon_crossbow: weapon("hl2-crossbow"),
  weapon_crowbar: weapon("hl2-crowbar"),
  weapon_frag: weapon("hl2-frag-grenade"),
  weapon_physcannon: weapon("hl2-gravity-gun"),
  weapon_pistol: weapon("hl2-pistol"),
  weapon_rpg: weapon("hl2-rpg"),
  weapon_shotgun: weapon("hl2-shotgun"),
  weapon_smg1: weapon("hl2-smg"),
};

const goldSrc: EntityTable = {
  // Personajes
  monster_barney: character("black-mesa-security-guards"),
  monster_cleansuit_scientist: character("black-mesa-scientists"),
  monster_gman: character("g-man"),
  monster_scientist: character("black-mesa-scientists"),
  monster_sitting_scientist: character("black-mesa-scientists"),

  // Enemigos
  monster_alien_controller: enemy("alien-controller"),
  monster_alien_grunt: enemy("alien-grunt"),
  monster_alien_slave: enemy("vortigaunt"),
  monster_apache: enemy("apache"),
  monster_barnacle: enemy("barnacle"),
  monster_bigmomma: enemy("gonarch"),
  monster_bullchicken: enemy("bullsquid"),
  monster_gargantua: enemy("gargantua"),
  monster_headcrab: enemy("headcrab"),
  monster_houndeye: enemy("houndeye"),
  monster_human_assassin: enemy("female-assassin"),
  monster_human_grunt: enemy("hecu-marine"),
  monster_ichthyosaur: enemy("ichthyosaur"),
  monster_leech: enemy("leech"),
  monster_miniturret: enemy("automatic-turret"),
  monster_nihilanth: enemy("nihilanth"),
  monster_osprey: enemy("osprey"),
  monster_sentry: enemy("sentry-gun"),
  monster_tentacle: enemy("tentacle"),
  monster_turret: enemy("automatic-turret"),
  monster_zombie: enemy("zombie"),

  // Armas
  weapon_357: weapon("colt-python"),
  weapon_9mmAR: weapon("mp5"),
  weapon_9mmhandgun: weapon("glock-17"),
  weapon_crossbow: weapon("crossbow"),
  weapon_crowbar: weapon("crowbar"),
  weapon_egon: weapon("gluon-gun"),
  weapon_gauss: weapon("tau-cannon"),
  weapon_glock: weapon("glock-17"),
  weapon_handgrenade: weapon("hand-grenade"),
  weapon_hornetgun: weapon("hivehand"),
  weapon_mp5: weapon("mp5"),
  weapon_python: weapon("colt-python"),
  weapon_rpg: weapon("rpg"),
  weapon_satchel: weapon("satchel-charge"),
  weapon_shotgun: weapon("spas-12"),
  weapon_snark: weapon("snark"),
  weapon_tripmine: weapon("tripmine"),
};

const opposingForce: EntityTable = {
  ...goldSrc,
  // Personajes
  monster_human_grunt_ally: character("hecu-ally-grunt"),
  monster_human_medic_ally: character("hecu-medic"),
  monster_human_torch_ally: character("hecu-engineer"),
  monster_otis: character("otis"),

  // Enemigos de la expansión
  monster_alien_voltigore: enemy("voltigore"),
  monster_geneworm: enemy("gene-worm"),
  monster_gonome: enemy("gonome"),
  monster_male_assassin: enemy("male-assassin"),
  monster_pitdrone: enemy("pit-drone"),
  monster_pitworm_up: enemy("pit-worm"),
  monster_shocktrooper: enemy("shock-trooper"),

  // Armas de la expansión
  weapon_displacer: weapon("displacer-cannon"),
  weapon_eagle: weapon("desert-eagle"),
  weapon_grapple: weapon("barnacle-grapple"),
  weapon_knife: weapon("combat-knife"),
  weapon_m249: weapon("m249"),
  weapon_pipewrench: weapon("pipe-wrench"),
  weapon_shockrifle: weapon("shock-roach"),
  weapon_sniperrifle: weapon("m40a1"),
  weapon_sporelauncher: weapon("spore-launcher"),
};

// En Episode Two la hormiga león común y la obrera comparten la clase npc_antlion y el mapa no guarda
// cuál es cuál: no se atribuye ninguna para no enlazar la variante equivocada.
const episodeTwo: EntityTable = Object.fromEntries(
  Object.entries(source).filter(([className]) => className !== "npc_antlion"),
);

// Tabla de cada juego por su id
export const entityEntries: Record<string, EntityTable> = {
  "half-life": goldSrc,
  "half-life-opposing-force": opposingForce,
  "half-life-blue-shift": goldSrc,
  "half-life-2": source,
  "half-life-2-episode-one": source,
  "half-life-2-episode-two": episodeTwo,
};
