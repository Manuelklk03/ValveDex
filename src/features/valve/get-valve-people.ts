import type { ValvePerson } from "@/domain/valve-person";
import { valvePeople } from "@/data/valve-people";

export function getValvePeople(): ValvePerson[] {
  return [...valvePeople].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function getValvePersonBySlug(slug: string): ValvePerson | undefined {
  return valvePeople.find((person) => person.slug === slug);
}
