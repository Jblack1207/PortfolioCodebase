"use client";

import { FiChevronDown } from "react-icons/fi";

export default function SectionArrow({
  href,
  label,
  center = false,
  offset = 0.055,
}: {
  href: string;
  label: string;
  center?: boolean;
  /** Fraction of viewport height to drop below true center. Only used when `center` is true. */
  offset?: number;
}) {
  const handleClick = center
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + window.scrollY + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        // Drop the landing point below true center, scaled to viewport
        // height so it stays proportionally consistent across device sizes.
        const lowerOffset = window.innerHeight * offset;

        window.scrollTo({
          top: elementCenter - viewportCenter + lowerOffset,
          behavior: "smooth",
        });
      }
    : undefined;

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={label}
      className="relative mt-8 flex w-full justify-center py-2 text-foreground/60 hover:text-accent"
      style={{ animation: "noc-bounce 2.2s ease-in-out infinite" }}
    >
      <FiChevronDown size={24} />
    </a>
  );
}
