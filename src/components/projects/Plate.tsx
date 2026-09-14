import Image from "next/image";
import type { Figure } from "./caseStudyContent";

type Props = {
  figure: Figure;
  /** "phone" frames tall screenshots, "wide" frames photos and diagrams. */
  layout: "phone" | "wide";
  sizes: string;
  /** Load immediately rather than lazily — for anything above the fold. */
  eager?: boolean;
};

/**
 * A framed image in the .card family: same surface, radius and accent-on-hover
 * border the rest of the app uses. Screenshots and diagrams are contained on a
 * stage (cropping them loses the content); photographs fill their frame.
 */
export default function Plate({ figure, layout, sizes, eager = false }: Props) {
  const cover = figure.fit === "cover";

  return (
    <figure className="group m-0">
      <div
        className={`plate plate-interactive elev-sm relative w-full ${
          layout === "phone" ? "aspect-[9/19.5]" : "aspect-4/3"
        } ${cover ? "" : "plate-stage"}`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className={cover ? "object-cover" : "object-contain p-3 sm:p-4"}
          style={figure.tone === "invert" ? { filter: "invert(1) hue-rotate(180deg)" } : undefined}
        />
      </div>

      <figcaption className="mt-3 flex items-start gap-2.5">
        <span
          className="mt-1.5 h-px w-4 flex-none origin-left bg-accent/70 transition-all duration-300 group-hover:w-6"
          aria-hidden
        />
        <span className="text-meta leading-snug text-foreground/55 transition-colors duration-300 group-hover:text-foreground/78">
          {figure.caption}
        </span>
      </figcaption>
    </figure>
  );
}
