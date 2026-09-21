import type { ClubEvent } from "../data/events";
import {
  doodleForEvent,
  eventsOnDate,
  isEventCompleted,
  weekFactLine,
} from "../data/events";
import { formatDayMonth, formatWeekdayLong } from "../lib/dates";
import { Doodle } from "./Doodle";

interface DayCardProps {
  date: string;
  isToday: boolean;
}

function ActivityBlock({ event }: { event: ClubEvent }) {
  const title = event.lines?.length ? event.name : event.shortName;
  const factLine = event.lines?.length ? null : weekFactLine(event);
  const completed = isEventCompleted(event);

  return (
    <div className="day-activity">
      <h3>{title}</h3>
      {event.lines?.length ? (
        <ul className="day-lines">
          {event.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      {factLine ? <p className="day-facts">{factLine}</p> : null}
      {completed ? <p className="completed-label">Completed</p> : null}
    </div>
  );
}

export function DayCard({ date, isToday }: DayCardProps) {
  const activities = eventsOnDate(date);
  const weekday = formatWeekdayLong(date);
  const dayMonth = formatDayMonth(date);
  const doodle = activities[0] ? doodleForEvent(activities[0]) : null;
  const classes = ["day-card", isToday ? "is-today" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classes}
      aria-current={isToday ? "date" : undefined}
    >
      <div className="card-top">
        <div className="card-top-copy">
          <span className="day-weekday">{weekday}</span>
          <span className="day-date">{dayMonth}</span>
        </div>
        {doodle ? (
          <Doodle name={doodle} rotate={-8} className="day-doodle" />
        ) : null}
      </div>
      {activities.length > 0 ? (
        activities.map((event) => (
          <ActivityBlock key={event.id} event={event} />
        ))
      ) : (
        <p className="empty-day">No planned activities</p>
      )}
    </article>
  );
}
