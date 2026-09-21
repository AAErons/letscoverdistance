import { meetingMapsUrl } from "../data/site";

export function Header() {
  return (
    <header className="header wrap">
      <a className="logo" href="/" aria-label="Let’s Cover Distance home">
        LCD<span>SOCIAL CLUB · RIGA</span>
      </a>
      <nav aria-label="Main navigation">
        <a className="nav-week" href="#this-week">
          What’s on
        </a>
        <a href="#calendar">Calendar</a>
        <a
          className="nav-button"
          href={meetingMapsUrl}
          target="_blank"
          rel="noopener"
        >
          Our meeting spot <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
