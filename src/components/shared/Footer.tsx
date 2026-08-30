import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-6.5 sm:px-12"
      style={{ borderColor: "color-mix(in srgb, var(--color-text) 8%, transparent)" }}
    >
      <div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-5 text-xs text-foreground/45">
        <span>&copy; 2026 Joel Blackham</span>
        <Link
          href="/#top"
          aria-label="Back to top"
          className="inline-flex items-center gap-1.5 text-foreground/45 hover:text-accent"
        >
          Back to top
          <FiArrowUp size={13} />
        </Link>
      </div>
    </footer>
  );
}
