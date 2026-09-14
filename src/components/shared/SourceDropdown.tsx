"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiGithub } from "react-icons/fi";
import type { RepoLink } from "@/components/projects/caseStudyContent";

type Props = {
  repos: RepoLink[];
  label?: string;
  variant?: "primary" | "secondary";
  placement?: "top" | "bottom";
  className?: string;
};

export default function SourceDropdown({
  repos,
  label = "Source on GitHub",
  variant = "secondary",
  placement = "bottom",
  className = "px-4 py-2 text-sm",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Small grace period so the pointer can travel from the button to the panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (repos.length === 0) return null;

  if (repos.length === 1) {
    return (
      <a
        className={`btn btn-${variant} gap-1.5 ${className}`}
        href={repos[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiGithub size={14} />
        {label}
      </a>
    );
  }

  const offset = placement === "top" ? { bottom: "calc(100% + 8px)" } : { top: "calc(100% + 8px)" };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={`btn btn-${variant} gap-1.5 ${className}`}
      >
        <FiGithub size={14} />
        {label}
        <FiChevronDown
          size={13}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: placement === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "top" ? 4 : -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="card absolute left-0 z-30 w-max overflow-hidden p-1"
            style={{
              ...offset,
              borderRadius: "12px",
              border: "1px solid color-mix(in srgb, var(--color-text) 12%, transparent)",
              boxShadow: "0 12px 24px -16px rgba(0, 0, 0, 0.6)",
            }}
          >
            {repos.map((repo) => (
              <a
                key={repo.url}
                role="menuitem"
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-item px-2.5 py-1.5 text-meta whitespace-nowrap text-foreground/80"
              >
                {repo.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
