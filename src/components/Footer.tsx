import { Doodle } from "./Doodle";

export function Footer() {
  return (
    <footer className="wrap">
      <p>
        LET’S COVER DISTANCE{" "}
        <Doodle name="heart" rotate={8} className="doodle-footer-heart" />
      </p>
      <span>Runs · Hikes · Friends · Good stories</span>
    </footer>
  );
}
