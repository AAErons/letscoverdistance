import { Doodle } from "./Doodle";
import { instagramUrl, stravaUrl } from "../data/site";

export function StayInTheLoop() {
  return (
    <section
      className="loop-section wrap"
      aria-labelledby="loop-title"
    >
      <h2 id="loop-title">Stay in the loop</h2>
      <div className="loop-grid">
        <a
          className="loop-card is-strava"
          href={stravaUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="loop-copy">
            <h3>
              Join our Strava club{" "}
              <span aria-hidden="true">↗</span>
            </h3>
            <p>Our runs, routes and kilometres together.</p>
          </div>
          <Doodle
            name="running-shoe"
            rotate={-8}
            className="loop-doodle"
          />
        </a>
        <a
          className="loop-card is-instagram"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="loop-copy">
            <h3>
              Follow us on Instagram{" "}
              <span aria-hidden="true">↗</span>
            </h3>
            <p>Club moments and what’s coming next.</p>
          </div>
          <Doodle name="pigeon" rotate={8} className="loop-doodle" />
        </a>
      </div>
    </section>
  );
}
