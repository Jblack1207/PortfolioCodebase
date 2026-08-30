"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

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

const SPEED_PX_PER_SEC = 45;

function TechSet({ copyIndex }: { copyIndex: number }) {
  return (
    <>
      {techs.map((tech) => (
        <span key={`${copyIndex}-${tech}`} className="flex items-center gap-10">
          {tech}
          <span className="text-accent">&bull;</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const oneSetWidth = measureRef.current?.scrollWidth ?? 0;
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      if (oneSetWidth > 0) {
        setSingleWidth(oneSetWidth);
        // Always render enough copies to more than cover the visible
        // container, plus a spare, so the track never runs out of content
        // mid-scroll regardless of viewport width.
        setCopies(Math.max(2, Math.ceil(containerWidth / oneSetWidth) + 2));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!singleWidth) return;
    let next = x.get() - (SPEED_PX_PER_SEC * delta) / 1000;
    if (next <= -singleWidth) {
      next += singleWidth;
    }
    x.set(next);
  });

  return (
    <div
      ref={containerRef}
      id="marquee"
      className="snap-section mt-8 overflow-hidden border-y py-4.5"
      style={{
        borderColor: "color-mix(in srgb, var(--color-text) 8%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        ref={measureRef}
        aria-hidden
        className="font-heading pointer-events-none invisible absolute flex w-max gap-10 text-body tracking-[0.06em] uppercase"
      >
        <TechSet copyIndex={0} />
      </div>

      <motion.div
        className="font-heading flex w-max gap-10 text-body tracking-[0.06em] text-foreground/40 uppercase"
        style={{ x }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <TechSet key={i} copyIndex={i} />
        ))}
      </motion.div>
    </div>
  );
}
