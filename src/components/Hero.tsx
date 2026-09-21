import { Doodle } from "./Doodle";
import { PosterHeading } from "./PosterHeading";
import { posterUrl } from "../data/site";

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="title">
      <div className="hero-copy">
        <p className="eyebrow">A LITTLE MOVEMENT. GOOD COMPANY.</p>
        <div className="heading-doodles">
          <Doodle name="pigeon" rotate={9} className="doodle-hero-pigeon" />
          <PosterHeading />
        </div>
        <p className="intro">
          Same people. Different distances.
          <br />
          More good stories.
        </p>
        <a className="button" href="#this-week">
          Find your next outing <span aria-hidden="true">↘</span>
        </a>
      </div>
      <div className="hero-art">
        <Doodle name="sun" rotate={-9} className="doodle-hero-sun" />
        <div className="scribble">
          Runs. Hikes. Friends.
          <br />
          See you outside! <span aria-hidden="true">♡</span>
        </div>
        <div className="illustration">
          <img
            src={posterUrl}
            alt="Hand-drawn Riga skyline, a park fountain and colourful autumn trees"
            width={564}
            height={834}
          />
        </div>
        <p className="art-caption">A FEW KILOMETRES. A LOT TO TALK ABOUT.</p>
      </div>
    </section>
  );
}
