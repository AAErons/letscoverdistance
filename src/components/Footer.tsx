import { Doodle } from "./Doodle";
import { instagramUrl, stravaUrl } from "../data/site";

export function Footer() {
  return (
    <footer className="wrap">
      <p>
        LET’S COVER DISTANCE{" "}
        <Doodle name="heart" rotate={8} className="doodle-footer-heart" />
      </p>
      <span>Runs · Hikes · Friends · Good stories</span>
      <nav className="footer-links" aria-label="Social links">
        <a href={stravaUrl} target="_blank" rel="noopener noreferrer">
          Strava
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </nav>
    </footer>
  );
}
