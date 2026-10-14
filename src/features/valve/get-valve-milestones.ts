import { valveMilestones } from "@/data/valve-milestones";
import type { Milestone } from "@/domain/milestone";

export function getValveMilestones(): Milestone[] {
  return [...valveMilestones].sort((a, b) => a.year - b.year);
}

export function getLatestValveMilestones(count: number): Milestone[] {
  return getValveMilestones().slice(-count);
}
