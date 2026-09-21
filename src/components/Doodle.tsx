import type { CSSProperties } from "react";
import { doodleAssets, type DoodleName } from "../data/site";

interface DoodleProps {
  name: DoodleName;
  size?: number;
  rotate?: number;
  className?: string;
}

export function Doodle({
  name,
  size,
  rotate = 0,
  className,
}: DoodleProps) {
  const asset = doodleAssets[name];
  const style = {
    "--rotate": `${rotate}deg`,
    ...(size != null ? { "--size": `${size}px` } : {}),
  } as CSSProperties;

  return (
    <img
      className={["doodle", className].filter(Boolean).join(" ")}
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      draggable={false}
      style={style}
    />
  );
}
