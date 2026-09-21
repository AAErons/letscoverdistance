import { posterUrl } from "../data/site";

export function PosterHeading() {
  return (
    <h1 id="title" className="poster-heading" aria-label="Let’s Cover Distance">
      <img
        src={posterUrl}
        alt=""
        aria-hidden="true"
        width={564}
        height={834}
      />
    </h1>
  );
}
