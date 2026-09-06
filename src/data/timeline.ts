import type { Dictionary } from "@/locales";

export interface TimelineEntry {
  sol: string;
  date: string;
  title: string;
  iconName: "Atom" | "Feather" | "Cpu";
  desc: string;
  metrics: string[];
}

const timelineIcons: readonly ("Atom" | "Feather" | "Cpu")[] = [
  "Atom",
  "Feather",
  "Cpu",
];

export function getTimelineEntries(dict: Dictionary): TimelineEntry[] {
  return dict.story.timeline.map((item, index) => ({
    ...item,
    iconName: timelineIcons[index] ?? "Atom",
  }));
}
