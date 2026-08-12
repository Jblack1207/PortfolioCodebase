const techs = [
  "Flutter",
  "Dart",
  "Firebase",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "Prisma",
];

export default function Marquee() {
  const items = [...techs, ...techs];

  return (
    <div
      className="mt-8 overflow-hidden border-y py-4.5"
      style={{
        borderColor: "color-mix(in srgb, var(--color-text) 8%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className="font-heading flex w-max gap-10 text-[15px] tracking-[0.06em] text-foreground/40 uppercase"
        style={{ animation: "noc-marquee 34s linear infinite" }}
      >
        {items.map((tech, index) => (
          <span key={`${tech}-${index}`} className="flex items-center gap-10">
            {tech}
            <span className="text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
