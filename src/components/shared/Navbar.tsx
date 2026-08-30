import Link from "next/link";

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
];

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-20 grid h-16 grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-12"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
        backdropFilter: "blur(14px)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-text) 8%, transparent)",
      }}
    >
      <div className="flex items-center gap-4">
        <Link href="/#top" className="tracking-tight text-foreground hover:text-foreground" style={{ color: "var(--color-text)" }}>
          Joel Blackham - Software Portfolio
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

      <div className="flex items-center justify-end gap-7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-white transition-colors hover:text-white/50"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
