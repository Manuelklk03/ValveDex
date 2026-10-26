import type { Entry } from "@/domain/entry";
import type { Source } from "@/domain/source";
import { halfLifeModelImages } from "./model-captures";

// Armas de Half-Life 1 (Z3-2). Daño: skill.cfg (mismo valor en las tres dificultades);
// munición máxima: weapons.h del SDK de Valve; notas: Combine OverWiki, el SDK y la wiki de SourceRuns.

function overwiki(page: string, title: string): Source {
  return {
    title: `${title} - Combine OverWiki`,
    url: `https://combineoverwiki.net/wiki/${page}`,
    kind: "wiki",
  };
}

function sdk(file: string): Source {
  return {
    title: `dlls/${file} - SDK de Half-Life (Valve)`,
    url: `https://github.com/ValveSoftware/halflife/blob/master/dlls/${file}`,
    kind: "official",
  };
}

function sourceRuns(page: string, title: string): Source {
  return {
    title: `${title} - SourceRuns Wiki`,
    url: `https://wiki.sourceruns.org/${page}`,
    kind: "community",
  };
}

// Copia del archivo del juego publicada en GitHub (el repositorio de Valve no lo incluye)
const skillCfg: Source = {
  title: "skill.cfg de Half-Life (copia en GitHub)",
  url: "https://raw.githubusercontent.com/TheOverfloater/hl-retail/main/skill.cfg",
  kind: "official",
};

const weaponsH = sdk("weapons.h");

function same(value: number) {
  return { easy: value, medium: value, hard: value };
}

const halfLife = [{ gameId: "half-life" }];

export const halfLifeWeapons: Entry[] = [
  {
    id: "crowbar",
    slug: "palanca",
    name: "Palanca",
    category: "weapons",
    details: { slot: 1, damage: same(10) },
    summary:
      "Arma cuerpo a cuerpo de Gordon Freeman y primera que consigue en el juego. No gasta munición y sirve también para romper cajas y rejillas.",
    notes: [
      "En el código, solo el primer golpe hace el daño completo; los golpes seguidos hacen la mitad.",
      "Tras el lanzamiento de Half-Life, Sierra regaló a Valve una palanca dorada con la dedicatoria «Congratulations for Raising the Bar on Action Games», expuesta en la recepción de Valve.",
      "Valve probó a incluir una palanca en Half-Life: Alyx, pero la descartó, en parte porque los jugadores habrían pensado que eran Gordon Freeman.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "crowbar",
          model: "w_crowbar.mdl",
          subject: "Palanca",
          width: 553,
          height: 129,
        }),
      },
    ],
    sources: [overwiki("Crowbar", "Crowbar"), skillCfg, sdk("crowbar.cpp")],
  },
  {
    id: "glock-17",
    slug: "pistola-9mm",
    name: "Pistola de 9 mm",
    category: "weapons",
    details: { slot: 2, ammo: "9 mm", maxAmmo: 250, damage: same(8) },
    summary:
      "Pistola semiautomática estándar del personal de seguridad de Black Mesa. El disparo principal es preciso; el secundario dispara más rápido a cambio de precisión. Comparte munición con el subfusil.",
    notes: [
      "Cargador de 17 balas. En la versión 1.0.0.5 eran 18; el parche 1.0.0.8, del 13 de enero de 1999, lo dejó en 17.",
      "Se inspira en la Glock 17; el modelo del High Definition Pack se basa en la Beretta M9.",
      "Iba a tener silenciador: se recortó, pero sus animaciones de poner y quitar siguen dentro del modelo.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: halfLifeModelImages({
          entryId: "glock-17",
          model: "w_9mmhandgun.mdl",
          subject: "Pistola de 9 mm",
          width: 533,
          height: 266,
        }),
      },
    ],
    sources: [
      overwiki("9mm_Pistol_(Half-Life)", "9mm Pistol (Half-Life)"),
      skillCfg,
      weaponsH,
      sdk("glock.cpp"),
    ],
  },
  {
    id: "colt-python",
    slug: "revolver-357",
    name: "Revólver .357",
    category: "weapons",
    details: {
      slot: 2,
      ammo: ".357 Magnum",
      maxAmmo: 36,
      damage: same(40),
    },
    summary:
      "Revólver de gran potencia con tambor de seis balas, lento pero capaz de abatir a casi cualquier soldado de un par de disparos.",
    notes: [
      "Se inspira en el Colt Python.",
      "Una línea sin usar del traje HEV y una caja de munición recortada muestran que iba a ser un .44 Magnum.",
      "Su modelo de deathmatch lleva una mira parecida a un puntero láser, que en origen también iba a tener en la campaña.",
      "El disparo secundario hace zoom solo en multijugador; en la campaña no hace nada.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(".357_Magnum", ".357 Magnum"),
      skillCfg,
      weaponsH,
      sdk("python.cpp"),
    ],
  },
  {
    id: "mp5",
    slug: "subfusil-mp5",
    name: "Subfusil MP5",
    category: "weapons",
    details: {
      slot: 3,
      ammo: "9 mm (balas) y granadas de contacto",
      maxAmmo: 250,
      damage: same(5),
    },
    summary:
      "Subfusil automático con lanzagranadas acoplado. El disparo principal es una ráfaga continua y el secundario lanza una granada que estalla al impacto.",
    notes: [
      "Cargador de 50 balas y hasta 10 granadas aparte. La granada hace 100 de daño en las tres dificultades.",
      "Se inspira en el H&K MP5: el modelo en primera persona recuerda al MP5SD6 y el del suelo al MP5A3.",
      "El High Definition Pack lo cambia por una carabina M4, que sigue compartiendo munición de 9 mm con la pistola.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Submachine_Gun_(Half-Life)", "Submachine Gun (Half-Life)"),
      skillCfg,
      weaponsH,
      sdk("mp5.cpp"),
    ],
  },
  {
    id: "spas-12",
    slug: "escopeta",
    name: "Escopeta",
    category: "weapons",
    details: {
      slot: 3,
      ammo: "Cartuchos del calibre 12",
      maxAmmo: 125,
      damage: same(5),
    },
    summary:
      "Escopeta de corredera devastadora a corta distancia. El disparo principal gasta un cartucho y el secundario dispara dos a la vez.",
    notes: [
      "El daño es por perdigón: en la campaña, el disparo simple suelta 6 y el doble 12. En multijugador son 4 y 8, con otra dispersión; el código llama a la de la campaña «regular old, untouched spread».",
      "Se inspira en la Franchi SPAS-12, aunque su icono del HUD dibuja una escopeta parecida a la Ithaca 37.",
      "La escopeta del científico del Sector F conserva el modelo y las texturas de la versión temprana.",
    ],
    appearances: [
      {
        gameId: "half-life",
        images: {
          hd: {
            src: "/images/entries/spas-12-half-life.jpg",
            alt: "Modelo HD de la escopeta de Half-Life",
            width: 731,
            height: 453,
            source: {
              title: "File:W shotgun hd.jpg - Combine OverWiki",
              url: "https://combineoverwiki.net/wiki/File:W_shotgun_hd.jpg",
              kind: "wiki",
            },
            credit: "Modelo del Half-Life High Definition Pack",
            license: "Material del juego © Valve",
          },
        },
      },
    ],
    sources: [
      overwiki("Shotgun_(Half-Life)", "Shotgun (Half-Life)"),
      skillCfg,
      weaponsH,
      sdk("shotgun.cpp"),
    ],
  },
  {
    id: "crossbow",
    slug: "ballesta",
    name: "Ballesta",
    category: "weapons",
    details: { slot: 3, ammo: "Virotes", maxAmmo: 50, damage: same(50) },
    summary:
      "Ballesta silenciosa con mira telescópica que también dispara bajo el agua, aunque allí los virotes van a la mitad de velocidad. El secundario activa el zoom.",
    notes: [
      "El daño de 50 es contra criaturas y soldados. En multijugador, Valve sobrescribe los valores: un virote hace 20 a otro jugador, explota con 40 de daño y, con el zoom puesto, dispara un virote instantáneo de 120.",
      "La diseñó Steve Theodore. Líneas sin usar del traje HEV la llaman «high velocity stealth crossbow», con virotes tratados con neurotoxina.",
      "Las asesinas de operaciones encubiertas iban a llevar ballestas; todavía llevan el carcaj a la espalda.",
      "En multijugador, los virotes llevaban escrito el nombre del jugador que los disparaba; se quitó porque no se podía leer.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Crossbow_(Half-Life)", "Crossbow (Half-Life)"),
      skillCfg,
      weaponsH,
      sdk("crossbow.cpp"),
      sdk("multiplay_gamerules.cpp"),
    ],
  },
  {
    id: "rpg",
    slug: "lanzacohetes",
    name: "Lanzacohetes",
    category: "weapons",
    details: { slot: 4, ammo: "Cohetes", maxAmmo: 5, damage: same(100) },
    summary:
      "Lanzacohetes con guiado láser: mientras el punto rojo está activo, el cohete sigue la mira. El secundario enciende y apaga el láser.",
    notes: [
      "Parece inspirado en el lanzacohetes alemán Armbrust.",
      "Una captura temprana lo muestra en la tercera ranura de armas.",
      "El cañón incendiario de Team Fortress Classic reutiliza su modelo.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(
        "Rocket-Propelled_Grenade_Launcher_(Half-Life)",
        "Rocket-Propelled Grenade Launcher (Half-Life)",
      ),
      skillCfg,
      weaponsH,
      sdk("rpg.cpp"),
    ],
  },
  {
    id: "tau-cannon",
    slug: "canon-tau",
    name: "Cañón tau",
    category: "weapons",
    details: { slot: 4, ammo: "Uranio", maxAmmo: 100, damage: same(20) },
    summary:
      "Arma experimental de haz de partículas. El disparo principal lanza un rayo de daño fijo; el secundario se carga mientras se mantiene pulsado y suelta un rayo mucho más potente.",
    notes: [
      "Cargado al máximo llega a 200 de daño, una cifra escrita directamente en el código. En la campaña tarda 4 segundos en cargarse; en multijugador, 1,5.",
      "Una línea sin usar del traje HEV lo llama «Experimental Hyper-velocity Projectile Weapon»: era un arma de proyectiles y por eso sus archivos siguen llamándose «gauss».",
      "Según la comunidad de speedrun, el «gauss boosting» consiste en cargarlo, darse la vuelta, saltar y disparar en el aire para salir impulsado por el retroceso.",
      "Según la misma comunidad, con el «selfgauss» el disparo secundario contra ciertas paredes daña al jugador y lo lanza hacia arriba.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Tau_Cannon", "Tau Cannon"),
      skillCfg,
      weaponsH,
      sdk("gauss.cpp"),
      sourceRuns("wiki/Gauss_Boosting", "Gauss Boosting"),
      sourceRuns("wiki/Selfgauss", "Selfgauss"),
    ],
  },
  {
    id: "gluon-gun",
    slug: "canon-de-gluones",
    name: "Cañón de gluones",
    category: "weapons",
    details: { slot: 4, ammo: "Uranio", maxAmmo: 100, damage: same(14) },
    summary:
      "Arma experimental que lanza un haz de energía continuo y devastador. Gasta uranio muy deprisa y lo comparte con el cañón tau.",
    notes: [
      "El daño es por cada impulso del haz. Tenía dos modos, ancho y estrecho, que se cambiaban girando el mango; el juego final solo usa el ancho.",
      "En el lanzamiento, el haz era azul puro y dejaba una pequeña nube; ambas cosas se quitaron en actualizaciones posteriores y volvieron con la actualización del 25.º aniversario.",
      "Existe una entidad de munición sin usar, «ammo_egonclip» («energy recharge unit»), que usa como provisional la caja de munición de la ametralladora.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Gluon_Gun", "Gluon Gun"),
      skillCfg,
      weaponsH,
      sdk("egon.cpp"),
    ],
  },
  {
    id: "hivehand",
    slug: "hivehand",
    name: "Hivehand",
    category: "weapons",
    details: { slot: 4, ammo: "Avispones", maxAmmo: 8, damage: same(7) },
    summary:
      "Arma orgánica alienígena que dispara avispones. Los del disparo principal persiguen al objetivo; los del secundario salen en ráfaga y vuelan en línea recta. La munición se regenera sola.",
    notes: [
      "Recupera un avispón cada medio segundo en la campaña y cada 0,3 en multijugador.",
      "Su daño (7) está escrito directamente en el código: un comentario explica que se separó del daño de los avispones enemigos mientras se ajustaba el arma y se quedó fuera de skill.cfg.",
      "El arte conceptual la llama «Alien Organic Assault Rifle», y su diseño final sale de una «Alien Organic Chainsaw» recortada.",
      "Al principio no tenía modelo propio: iba integrada en la mano derecha del alien grunt.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Hivehand", "Hivehand"),
      sdk("gamerules.cpp"),
      sdk("hornetgun.cpp"),
      weaponsH,
    ],
  },
  {
    id: "hand-grenade",
    slug: "granada-de-mano",
    name: "Granada de mano",
    category: "weapons",
    details: { slot: 5, ammo: "Granadas", maxAmmo: 10, damage: same(100) },
    summary:
      "Granada de fragmentación. Al mantener pulsado el botón empieza a contar la mecha de 3 segundos, y se lanza al soltarlo.",
    notes: [
      "Se basa en la granada Mk 2, la «piña»; en los archivos del SDK su verde era más vivo.",
      "En Half-Life: Day One se podían llevar 25 granadas, frente a las 10 del juego final; por eso hay alijos de 15 en lugares como Unforeseen Consequences.",
      "Según la comunidad de speedrun, mantenerla pulsada y soltarla cuando la mecha está a punto de agotarse hace que estalle al instante, y la explosión sirve para impulsarse.",
    ],
    appearances: halfLife,
    sources: [
      overwiki(
        "Fragmentation_Grenade_(Half-Life)",
        "Fragmentation Grenade (Half-Life)",
      ),
      skillCfg,
      weaponsH,
      sourceRuns("Damage-Boosting.html", "Damage Boosting"),
    ],
  },
  {
    id: "satchel-charge",
    slug: "carga-de-mochila",
    name: "Carga de mochila",
    category: "weapons",
    details: {
      slot: 5,
      ammo: "Cargas de mochila",
      maxAmmo: 5,
      damage: same(150),
    },
    summary:
      "Explosivo que se deja caer y se detona a distancia con un mando. Se pueden colocar varias cargas y hacerlas estallar a la vez.",
    notes: [
      "En Surface Tension, un soldado lanza una de estas cargas a un conducto; la salida prevista es tirarse al agua antes de las llamas.",
      "En el SDK siguen sus texturas tempranas de prueba («ptest»).",
    ],
    appearances: halfLife,
    sources: [overwiki("Satchel_Charge", "Satchel Charge"), skillCfg, weaponsH],
  },
  {
    id: "tripmine",
    slug: "mina-laser",
    name: "Mina láser",
    category: "weapons",
    details: { slot: 5, ammo: "Minas láser", maxAmmo: 5, damage: same(150) },
    summary:
      "Mina que se fija a una pared y estalla cuando algo cruza su rayo láser. Sirve para preparar emboscadas en pasillos.",
    notes: [
      "Una línea sin usar del traje HEV la llama «laser-activated anti-personnel mine», y su modelo en primera persona tiene una animación de armado sin usar.",
      "En la campaña de Blue Shift no se puede conseguir sin la consola.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Laser_Trip_Mine_(Half-Life)", "Laser Trip Mine (Half-Life)"),
      skillCfg,
      weaponsH,
    ],
  },
  {
    id: "snark",
    slug: "snark",
    name: "Snark",
    category: "weapons",
    details: { slot: 5, ammo: "Snarks", maxAmmo: 15, damage: same(10) },
    summary:
      "Pequeñas criaturas alienígenas que se sueltan para que persigan y muerdan a lo que tengan cerca, incluido el propio jugador si no hay otro objetivo.",
    notes: [
      "El daño es por mordisco. Si no mueren antes, revientan a los 15 segundos: la explosión hace 5 de daño, más 5 por cada mordisco que hayan dado.",
      "La animación de la mano que los provoca se inspiró en Blue, la gata de Chuck Jones.",
      "Iban a parpadear: las texturas de sus párpados siguen sin usar en el SDK.",
      "Según la comunidad de speedrun, con el «snark climbing» el jugador se sube a un snark junto a una pared y sus ataques lo van elevando; es más lento que impulsarse con explosiones, pero no quita vida.",
    ],
    appearances: halfLife,
    sources: [
      overwiki("Snark", "Snark"),
      skillCfg,
      weaponsH,
      sdk("squeakgrenade.cpp"),
      sourceRuns("Snark-Climbing.html", "Snark Climbing"),
    ],
  },
];
