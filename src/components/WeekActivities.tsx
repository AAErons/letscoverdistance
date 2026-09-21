import { DayCard } from "./DayCard";
import { Doodle } from "./Doodle";
import {
  currentWeekDates,
  formatWeekRange,
  todayInRiga,
} from "../lib/dates";

export function WeekActivities() {
  const today = todayInRiga();
  const week = currentWeekDates();

  return (
    <section
      className="schedule wrap"
      id="this-week"
      aria-labelledby="week-title"
    >
      <div className="section-heading">
        <div>
          <div className="heading-row">
            <h2 id="week-title">
              <span>This week’s</span> activities
            </h2>
            <Doodle
              name="running-shoe"
              rotate={-8}
              className="heading-accent"
            />
          </div>
          <p className="week-range">{formatWeekRange(week)}</p>
        </div>
        <span className="month-note">RIGA, LATVIA</span>
      </div>
      <div className="week-days">
        {week.map((date) => (
          <DayCard key={date} date={date} isToday={date === today} />
        ))}
      </div>
    </section>
  );
}
