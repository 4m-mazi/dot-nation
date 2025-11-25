import { DoveIcon, FlameIcon, MoonIcon } from "./icons";

export function NationIcon({
  iconSlug,
  size = 64,
}: {
  iconSlug?: "moon" | "dove" | "flame";
  size?: number;
}) {
  switch (iconSlug) {
    case "moon":
      return <MoonIcon size={size} />;
    case "dove":
      return <DoveIcon size={size} />;
    case "flame":
      return <FlameIcon size={size} />;
    default:
      return null;
  }
}
