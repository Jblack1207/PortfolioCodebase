import Link from "next/link";

const links: { href: string; label: string; pages?: { href: string; label: string }[] }[] = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About", pages: [{ href: "/timeline", label: "Timeline" }] },
  {
    href: "/#work",
    label: "Work",
    pages: [
      { href: "/projects/black-country-beats", label: "Black Country Beats" },
      { href: "/projects/healthguard-pro", label: "HealthGuard Pro" },
    ],
  },
  { href: "/#marquee", label: "Skills" },
];

export default function Navbar() {
  return (
    <nav
      className="relative z-20 grid h-16 grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-12"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
        backdropFilter: "blur(14px)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
      }}
    >
      <div className="flex items-center gap-4">
        <Link href="/#top" className="tracking-tight text-foreground hover:text-foreground" style={{ color: "var(--color-text)" }}>
          Joel Blackham - Portfolio
          </Link>
      </div>

      <Link href="/#top" aria-label="Joel Blackham" className="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-13 w-13">
          <rect width="200" height="200" fill="#1c1c1a" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="#f6f4ef" strokeWidth="9" />
          <text
            x="94"
            y="130"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontStyle="italic"
            fontSize="88"
            fill="#f6f4ef"
          >
            JB
          </text>
        </svg>
      </Link>

      <div className="flex items-center justify-end gap-7 self-stretch">
        {links.map((link) => {
          const hasPages = !!link.pages?.length;
          return (
            <div key={link.href} className="group relative flex items-center self-stretch">
              <Link
                href={link.href}
                className="text-sm text-white transition-colors hover:text-white/50"
              >
                {link.label}
              </Link>

              {hasPages && (
                <div className="invisible absolute top-full left-1/2 z-30 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div
                    className="flex flex-col gap-0.5 rounded-b-sm p-1.5 whitespace-nowrap"
                    style={{
                      background: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
                      backdropFilter: "blur(14px)",
                      borderLeft: "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
                      borderRight: "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
                      borderBottom: "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
                    }}
                  >
                    {link.pages!.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="rounded-xs px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-white/5 hover:text-accent"
                      >
                        {page.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
