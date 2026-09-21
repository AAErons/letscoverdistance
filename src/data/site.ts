export type DoodleName =
  | "pigeon"
  | "sun"
  | "heart"
  | "moon"
  | "running-shoe"
  | "coffee"
  | "meditation"
  | "mountains"
  | "calendar";

export const doodleAssets: Record<
  DoodleName,
  { src: string; width: number; height: number }
> = {
  pigeon: { src: "/images/doodles/pigeon.png", width: 149, height: 152 },
  sun: { src: "/images/doodles/sun.png", width: 170, height: 160 },
  heart: { src: "/images/doodles/heart.png", width: 112, height: 121 },
  moon: { src: "/images/doodles/moon.png", width: 118, height: 133 },
  "running-shoe": {
    src: "/images/doodles/running-shoe.png",
    width: 186,
    height: 104,
  },
  coffee: { src: "/images/doodles/coffee.png", width: 107, height: 183 },
  meditation: {
    src: "/images/doodles/meditation.png",
    width: 145,
    height: 171,
  },
  mountains: {
    src: "/images/doodles/mountains.png",
    width: 191,
    height: 176,
  },
  calendar: { src: "/images/doodles/calendar.png", width: 143, height: 150 },
};

export const meetingPoint = "Vērmanes Dārzs fountain";

export const meetingMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Vermanes+darzs+fountain+Riga";

export const posterUrl = "/images/october-poster.png";

export const tbaLabel = "Details to be announced";
