import { meetingPoint, tbaLabel, type DoodleName } from "./site";
import { nowHoursMinutesInRiga, todayInRiga } from "../lib/dates";

export type AccentColor = "blue" | "pink" | "green";

export type EventKind = "run" | "hike" | "note";

export type WeekTint = "lavender" | "rose";

export type EventDoodleKind =
  | "morning-run"
  | "regular-run"
  | "night-run"
  | "hike"
  | "meditation"
  | "social";

export const EVENT_TYPE_DOODLE: Record<EventDoodleKind, DoodleName> = {
  "morning-run": "sun",
  "regular-run": "running-shoe",
  "night-run": "moon",
  hike: "mountains",
  meditation: "meditation",
  social: "coffee",
};

export interface ClubEvent {
  id: string;
  /** Civil date in Europe/Riga, YYYY-MM-DD. Date-only, never a UTC instant. */
  date: string;
  name: string;
  shortName: string;
  /** Riga-local 24-hour time, or null when not applicable / unannounced. */
  time: string | null;
  distance: string | null;
  location: string | null;
  accent: AccentColor;
  kind: EventKind;
  doodleKind: EventDoodleKind;
  badge?: string;
  lines?: string[];
  weekTint?: WeekTint;
}

export function doodleForEvent(event: ClubEvent): DoodleName {
  return EVENT_TYPE_DOODLE[event.doodleKind];
}

export function supportingDoodles(event: ClubEvent): DoodleName[] {
  if (
    event.doodleKind === "night-run" &&
    event.lines?.some((line) => /meditation/i.test(line))
  ) {
    return [EVENT_TYPE_DOODLE.meditation];
  }
  return [];
}

function run(
  date: string,
  id: string,
  options: {
    name: string;
    shortName: string;
    time: string;
    distance: string;
    accent: AccentColor;
    doodleKind: EventDoodleKind;
  },
): ClubEvent {
  return {
    id,
    date,
    name: options.name,
    shortName: options.shortName,
    time: options.time,
    distance: options.distance,
    location: meetingPoint,
    accent: options.accent,
    kind: "run",
    doodleKind: options.doodleKind,
  };
}

function mondayRun(date: string): ClubEvent {
  return run(date, `${date}-monday-run`, {
    name: "Monday morning run",
    shortName: "6 @ 6",
    time: "06:00",
    distance: "6 km",
    accent: "blue",
    doodleKind: "morning-run",
  });
}

function thursdayRun(date: string, distance = "5 km"): ClubEvent {
  return run(date, `${date}-thursday-run`, {
    name: "Thursday evening run",
    shortName: distance,
    time: "19:30",
    distance,
    accent: "pink",
    doodleKind: "regular-run",
  });
}

function hike(
  date: string,
  name: string,
  shortName: string,
  distance: string | null = null,
): ClubEvent {
  return {
    id: `${date}-hike`,
    date,
    name,
    shortName,
    time: null,
    distance,
    location: null,
    accent: "green",
    kind: "hike",
    doodleKind: "hike",
  };
}

export const events: ClubEvent[] = [
  mondayRun("2026-09-21"),
  {
    id: "2026-09-25-night-run",
    date: "2026-09-25",
    name: "21 km night run",
    shortName: "21 km",
    time: "19:00",
    distance: "21 km",
    location: meetingPoint,
    accent: "pink",
    kind: "run",
    doodleKind: "night-run",
    badge: "Special edition",
    weekTint: "rose",
    lines: [
      "Meditation 18:45",
      "Warm-up & run 19:00",
      "Pace 6:30 min/km",
    ],
  },
  mondayRun("2026-09-28"),
  thursdayRun("2026-10-01"),
  hike("2026-10-03", "Ķemeri hike", "Ķemeri"),
  mondayRun("2026-10-05"),
  thursdayRun("2026-10-08"),
  mondayRun("2026-10-12"),
  thursdayRun("2026-10-15", "10 km"),
  hike("2026-10-17", "Amatas dabas taka", "Amatas"),
  mondayRun("2026-10-19"),
  thursdayRun("2026-10-22"),
  hike(
    "2026-10-25",
    "Sigulda uphill day",
    "Sigulda",
    "1 km uphill repeats",
  ),
  {
    id: "2026-10-26-rest",
    date: "2026-10-26",
    name: "No morning run — recover & stretch",
    shortName: "Rest day",
    time: null,
    distance: null,
    location: null,
    accent: "green",
    kind: "note",
    doodleKind: "social",
  },
  thursdayRun("2026-10-29"),
];

function compareEvents(a: ClubEvent, b: ClubEvent): number {
  const byDate = a.date.localeCompare(b.date);
  if (byDate !== 0) return byDate;
  if (a.time && b.time) return a.time.localeCompare(b.time);
  if (a.time) return -1;
  if (b.time) return 1;
  return a.name.localeCompare(b.name);
}

function indexByDate(list: ClubEvent[]): Map<string, ClubEvent[]> {
  const map = new Map<string, ClubEvent[]>();
  for (const event of [...list].sort(compareEvents)) {
    const bucket = map.get(event.date) ?? [];
    bucket.push(event);
    map.set(event.date, bucket);
  }
  return map;
}

export const eventsByDate = indexByDate(events);

export function eventsOnDate(date: string): ClubEvent[] {
  return eventsByDate.get(date) ?? [];
}

export function eventPlace(event: ClubEvent): string | null {
  if (event.location) return event.location;
  if (event.kind === "hike") return tbaLabel;
  return null;
}

export function eventFacts(event: ClubEvent): string[] {
  const facts: string[] = [];
  if (event.time) facts.push(event.time);
  if (event.distance) facts.push(event.distance);
  return facts;
}

export function weekFactLine(event: ClubEvent): string | null {
  if (event.distance && event.time) return `${event.distance} · ${event.time}`;
  if (event.distance) return event.distance;
  if (event.time) return event.time;
  return null;
}

export function isEventCompleted(
  event: ClubEvent,
  today = todayInRiga(),
  timeNow = nowHoursMinutesInRiga(),
): boolean {
  if (event.date < today) return true;
  if (event.date > today) return false;
  if (!event.time) return false;
  return event.time <= timeNow;
}
