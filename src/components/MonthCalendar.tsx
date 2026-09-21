import { useMemo, useState, type KeyboardEvent } from "react";
import {
  doodleForEvent,
  eventFacts,
  eventPlace,
  eventsOnDate,
  isEventCompleted,
  supportingDoodles,
  type ClubEvent,
} from "../data/events";
import {
  formatFullDate,
  formatMonthYear,
  monthGrid,
  parseISODate,
  shiftMonth,
  todayInRiga,
  WEEKDAY_LABELS,
} from "../lib/dates";
import { Doodle } from "./Doodle";

function cellLabel(date: string, dayEvents: ClubEvent[]): string {
  const day = formatFullDate(date);
  if (dayEvents.length === 0) return day;
  return `${day}. ${dayEvents.map((item) => item.name).join(". ")}`;
}

function ActivityDetails({ event }: { event: ClubEvent }) {
  const facts = event.lines?.length ? [] : eventFacts(event);
  const place = eventPlace(event);
  const extras = supportingDoodles(event);

  return (
    <article className="selected-activity">
      {event.badge ? <p className="edition-label">{event.badge}</p> : null}
      <h4>
        <Doodle
          name={doodleForEvent(event)}
          size={28}
          className="detail-doodle"
        />
        <span className={event.accent}>{event.shortName}</span>
        {event.name}
      </h4>
      <p className="selected-date">{formatFullDate(event.date)}</p>
      {event.lines?.length ? (
        <ul className="day-lines">
          {event.lines.map((line) => {
            const support =
              /meditation/i.test(line) && extras.includes("meditation")
                ? "meditation"
                : null;
            return (
              <li
                key={line}
                className={support ? "line-with-doodle" : undefined}
              >
                {support ? (
                  <Doodle name={support} size={20} className="line-doodle" />
                ) : null}
                {line}
              </li>
            );
          })}
        </ul>
      ) : null}
      {facts.length > 0 ? (
        <div className="facts">
          {facts.map((fact) => (
            <span key={`${event.id}-${fact}`}>{fact}</span>
          ))}
        </div>
      ) : null}
      {place ? <p className="location">{place}</p> : null}
      {isEventCompleted(event) ? (
        <p className="completed-label">Completed</p>
      ) : null}
    </article>
  );
}

export function MonthCalendar() {
  const today = todayInRiga();
  const todayParts = parseISODate(today);
  const [selected, setSelected] = useState(today);
  const [viewYear, setViewYear] = useState(todayParts.year);
  const [viewMonth, setViewMonth] = useState(todayParts.month);

  const days = useMemo(
    () => monthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );
  const selectedEvents = eventsOnDate(selected);
  const monthLabel = formatMonthYear(viewYear, viewMonth);
  const viewKey = viewYear * 12 + viewMonth;
  const notice =
    viewKey < 2026 * 12 + 9
      ? "It's history and no longer true!"
      : viewKey > 2026 * 12 + 10
        ? "November's activities will be announced later!"
        : null;

  function goToMonth(delta: number) {
    const next = shiftMonth(viewYear, viewMonth, delta);
    setViewYear(next.year);
    setViewMonth(next.month);
  }

  function goToToday() {
    setSelected(today);
    setViewYear(todayParts.year);
    setViewMonth(todayParts.month);
  }

  function handleGridKey(
    event: KeyboardEvent<HTMLElement>,
    index: number,
  ) {
    const columns = 7;
    let next = index;
    if (event.key === "ArrowRight") next = index + 1;
    else if (event.key === "ArrowLeft") next = index - 1;
    else if (event.key === "ArrowDown") next = index + columns;
    else if (event.key === "ArrowUp") next = index - columns;
    else if (event.key === "Home") next = index - (index % columns);
    else if (event.key === "End") next = index - (index % columns) + 6;
    else return;

    event.preventDefault();
    if (next < 0 || next >= days.length) return;
    const target = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-date="${days[next]}"]`,
    );
    target?.focus();
  }

  return (
    <section
      className="calendar-section wrap"
      id="calendar"
      aria-labelledby="calendar-title"
    >
      <div className="section-heading">
        <div className="heading-row">
          <h2 id="calendar-title">Calendar</h2>
          <Doodle name="calendar" rotate={5} className="heading-accent" />
        </div>
      </div>

      <div className="calendar-toolbar">
        <p className="calendar-month" aria-live="polite">
          {monthLabel}
        </p>
        <div className="calendar-controls">
          <button
            type="button"
            className="cal-nav"
            onClick={() => goToMonth(-1)}
            aria-label="Previous month"
          >
            Previous
          </button>
          <button type="button" className="cal-nav" onClick={goToToday}>
            Today
          </button>
          <button
            type="button"
            className="cal-nav"
            onClick={() => goToMonth(1)}
            aria-label="Next month"
          >
            Next
          </button>
        </div>
      </div>

      {notice ? (
        <p className="calendar-notice" role="status">
          {notice}
        </p>
      ) : (
        <>
          <div
            className="month-grid"
            role="grid"
            aria-label={monthLabel}
          >
            <div className="month-weekdays" role="row">
              {WEEKDAY_LABELS.map((label) => (
                <div key={label} role="columnheader">
                  {label}
                </div>
              ))}
            </div>
            {Array.from({ length: days.length / 7 }, (_, weekIndex) => (
              <div
                className="month-row"
                role="row"
                key={days[weekIndex * 7]}
              >
                {days
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((date, dayIndex) => {
                    const index = weekIndex * 7 + dayIndex;
                    const inMonth =
                      parseISODate(date).month === viewMonth &&
                      parseISODate(date).year === viewYear;
                    const dayEvents = eventsOnDate(date);
                    const isToday = date === today;
                    const isSelected = date === selected;
                    const dayNumber = parseISODate(date).day;
                    const classes = [
                      "month-cell",
                      inMonth ? "" : "is-outside",
                      isToday ? "is-today" : "",
                      isSelected ? "is-selected" : "",
                      dayEvents.length ? "has-events" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <div
                        role="gridcell"
                        key={date}
                        aria-selected={isSelected}
                      >
                        <button
                          type="button"
                          className={classes}
                          data-date={date}
                          aria-label={cellLabel(date, dayEvents)}
                          aria-current={isToday ? "date" : undefined}
                          aria-pressed={isSelected}
                          onClick={() => setSelected(date)}
                          onKeyDown={(event) =>
                            handleGridKey(event, index)
                          }
                        >
                          <span className="month-day-number">
                            {dayNumber}
                          </span>
                          {dayEvents.length > 0 ? (
                            <>
                              <span className="month-event-list cal-desktop">
                                {dayEvents.map((item) => (
                                  <span
                                    key={item.id}
                                    className="month-event-row"
                                  >
                                    <Doodle
                                      name={doodleForEvent(item)}
                                      size={22}
                                      className="cal-doodle"
                                    />
                                    <span
                                      className={`month-event ${item.accent}`}
                                    >
                                      <span className="cal-event-name">
                                        {item.shortName}
                                      </span>
                                    </span>
                                  </span>
                                ))}
                              </span>
                              <span className="cal-mobile-mark">
                                <Doodle
                                  name={doodleForEvent(dayEvents[0])}
                                  size={20}
                                  className="cal-doodle"
                                />
                                {dayEvents.length > 1 ? (
                                  <span className="cal-count">
                                    {dayEvents.length}
                                  </span>
                                ) : null}
                              </span>
                            </>
                          ) : null}
                        </button>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>

          <div className="selected-day" aria-live="polite">
            <h3 className="selected-heading">{formatFullDate(selected)}</h3>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <ActivityDetails key={event.id} event={event} />
              ))
            ) : (
              <p className="empty-day">No planned activities</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
