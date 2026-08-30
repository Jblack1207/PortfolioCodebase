"use client";

import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";

const sections = [
  { href: "/#top", label: "Home" },
  { href: "/#stats", label: "Stats" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
];

const pages = [
  { href: "/", label: "Portfolio" },
  { href: "/timeline", label: "Timeline" },
];

const projects = [
  { href: "/projects/black-country-beats", label: "Black Country Beats" },
  { href: "/projects/healthguard-pro", label: "HealthGuard Pro" },
];

export default function Footer() {
  return (
    <footer
      className="snap-section border-t px-6 py-10 sm:px-12"
      style={{ borderColor: "color-mix(in srgb, var(--color-text) 8%, transparent)" }}
    >
      <div className="mx-auto max-w-295">
        <div className="mb-8 flex flex-wrap gap-x-16 gap-y-8">
          <div>
            <div className="card-kicker mb-3">Sections</div>
            <ul className="flex flex-col gap-2 text-sm">
              {sections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/70 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="card-kicker mb-3">Pages</div>
            <ul className="flex flex-col gap-2 text-sm">
              {pages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/70 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="card-kicker mb-3">Projects</div>
            <ul className="flex flex-col gap-2 text-sm">
              {projects.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/70 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hr mb-6" />

        <div className="flex flex-wrap items-center justify-between gap-5 text-xs text-foreground/45">
          <span>&copy; 2026 Joel Blackham</span>
          <Link
            href="/#top"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 text-foreground/45 hover:text-accent"
          >
            Back to top
            <FiArrowUp size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
