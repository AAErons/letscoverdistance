export const RIGA_TZ = "Europe/Riga";

export interface CivilDate {
  year: number;
  month: number;
  day: number;
}

export function parseISODate(iso: string): CivilDate {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export function formatISODate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function toUtcDate(iso: string): Date {
  const { year, month, day } = parseISODate(iso);
  return new Date(Date.UTC(year, month - 1, day));
}

export function todayInRiga(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: RIGA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function nowHoursMinutesInRiga(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: RIGA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

export function addCalendarDays(iso: string, days: number): string {
  const utc = toUtcDate(iso);
  utc.setUTCDate(utc.getUTCDate() + days);
  return formatISODate(
    utc.getUTCFullYear(),
    utc.getUTCMonth() + 1,
    utc.getUTCDate(),
  );
}

/** Monday = 0 … Sunday = 6, for a date-only ISO string. */
export function weekdayMondayIndex(iso: string): number {
  const jsDay = toUtcDate(iso).getUTCDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function mondayOfWeek(iso: string): string {
  return addCalendarDays(iso, -weekdayMondayIndex(iso));
}

export function weekDates(mondayIso: string): string[] {
  return Array.from({ length: 7 }, (_, index) => addCalendarDays(mondayIso, index));
}

export function currentWeekDates(now = new Date()): string[] {
  return weekDates(mondayOfWeek(todayInRiga(now)));
}

export function lastDateOfMonth(year: number, month: number): string {
  const utc = new Date(Date.UTC(year, month, 0));
  return formatISODate(
    utc.getUTCFullYear(),
    utc.getUTCMonth() + 1,
    utc.getUTCDate(),
  );
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const utc = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: utc.getUTCFullYear(), month: utc.getUTCMonth() + 1 };
}

export function monthGrid(year: number, month: number): string[] {
  const first = formatISODate(year, month, 1);
  const start = addCalendarDays(first, -weekdayMondayIndex(first));
  const last = lastDateOfMonth(year, month);
  const end = addCalendarDays(last, 6 - weekdayMondayIndex(last));
  const dates: string[] = [];
  for (
    let cursor = start;
    cursor <= end;
    cursor = addCalendarDays(cursor, 1)
  ) {
    dates.push(cursor);
  }
  return dates;
}

function utcFormatter(options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options });
}

export function formatDayMonth(iso: string): string {
  return utcFormatter({ day: "numeric", month: "short" }).format(toUtcDate(iso));
}

export function formatWeekdayLong(iso: string): string {
  return utcFormatter({ weekday: "long" }).format(toUtcDate(iso));
}

export function formatWeekdayShort(iso: string): string {
  return utcFormatter({ weekday: "short" }).format(toUtcDate(iso));
}

export function formatFullDate(iso: string): string {
  return utcFormatter({
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(toUtcDate(iso));
}

export function formatMonthYear(year: number, month: number): string {
  return utcFormatter({ month: "long", year: "numeric" }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
}

export function formatWeekRange(dates: string[]): string {
  const start = dates[0];
  const end = dates[dates.length - 1];
  const startParts = parseISODate(start);
  const endParts = parseISODate(end);
  const startDay = utcFormatter({ day: "numeric" }).format(toUtcDate(start));
  const endDay = utcFormatter({ day: "numeric" }).format(toUtcDate(end));
  const startMonth = utcFormatter({ month: "short" }).format(toUtcDate(start));
  const endMonth = utcFormatter({ month: "short" }).format(toUtcDate(end));

  if (startParts.year !== endParts.year) {
    return `${startDay} ${startMonth} ${startParts.year} – ${endDay} ${endMonth} ${endParts.year}`;
  }
  if (startParts.month !== endParts.month) {
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${endParts.year}`;
  }
  return `${startDay} – ${endDay} ${endMonth} ${endParts.year}`;
}

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
