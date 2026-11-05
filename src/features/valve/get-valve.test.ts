import { describe, expect, it } from "vitest";
import { getSteamEras } from "./get-steam-eras";
import { getValveHardware, getValveHardwareBySlug } from "./get-valve-hardware";
import {
  getLatestValveMilestones,
  getValveMilestones,
} from "./get-valve-milestones";
import { getValvePeople, getValvePersonBySlug } from "./get-valve-people";

describe("getSteamEras", () => {
  it("devuelve las épocas ordenadas cronológicamente por yearFrom", () => {
    const eras = getSteamEras();
    expect(eras.length).toBeGreaterThan(0);

    for (let i = 0; i < eras.length - 1; i++) {
      expect(eras[i].yearFrom).toBeLessThanOrEqual(eras[i + 1].yearFrom);
    }
  });
});

describe("getValveHardware", () => {
  it("devuelve los dispositivos ordenados por año de lanzamiento", () => {
    const hardware = getValveHardware();
    expect(hardware.length).toBeGreaterThan(0);

    for (let i = 0; i < hardware.length - 1; i++) {
      expect(hardware[i].year).toBeLessThanOrEqual(hardware[i + 1].year);
    }
  });

  it("encuentra un dispositivo existente por su slug", () => {
    const steamDeck = getValveHardwareBySlug("steam-deck");
    expect(steamDeck).toBeDefined();
    expect(steamDeck?.name).toBe("Steam Deck");
    expect(steamDeck?.year).toBe(2022);
  });

  it("devuelve undefined para un slug inexistente", () => {
    expect(getValveHardwareBySlug("dispositivo-inexistente")).toBeUndefined();
  });
});

describe("getValveMilestones", () => {
  it("devuelve todos los hitos históricos de Valve", () => {
    const milestones = getValveMilestones();
    expect(milestones.length).toBeGreaterThanOrEqual(11);
    expect(milestones[0].year).toBe(1996);
  });

  it("devuelve los últimos N hitos con getLatestValveMilestones", () => {
    const latest = getLatestValveMilestones(3);
    expect(latest).toHaveLength(3);
  });
});

describe("getValvePeople", () => {
  it("devuelve las personas ordenadas alfabéticamente por nombre en español", () => {
    const people = getValvePeople();
    expect(people.length).toBeGreaterThanOrEqual(7);

    const names = people.map((p) => p.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b, "es"));
    expect(names).toEqual(sorted);
  });

  it("encuentra una persona existente por su slug", () => {
    const gabe = getValvePersonBySlug("gabe-newell");
    expect(gabe).toBeDefined();
    expect(gabe?.name).toBe("Gabe Newell");
  });

  it("devuelve undefined para un slug de persona inexistente", () => {
    expect(getValvePersonBySlug("persona-fantasma")).toBeUndefined();
  });
});
