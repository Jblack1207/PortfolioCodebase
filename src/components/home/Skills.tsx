"use client";

import { motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiDart,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiSharp,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiWebrtc,
} from "react-icons/si";

/** Four named steps, low to high — no percentages. Index drives the meter. */
const LEVELS = ["Learning", "Comfortable", "Confident", "Fluent"] as const;
type Level = (typeof LEVELS)[number];

type Tech = {
  name: string;
  Icon: IconType;
  /** Official Simple Icons hex, except where a near-black mark needs a light stand-in. */
  brand: string;
  /** Where it's actually used — shown on hover. */
  usage: string;
  level: Level;
};

type Tier = { title: string; items: Tech[] };

const tiers: Tier[] = [
  {
    title: "Using now",
    items: [
      { name: "TypeScript", Icon: SiTypescript, brand: "#3178C6", usage: "This site, end to end", level: "Confident" },
      { name: "Next.js", Icon: SiNextdotjs, brand: "#F5E8D8", usage: "App Router, this site", level: "Comfortable" },
      { name: "React", Icon: SiReact, brand: "#61DAFB", usage: "Every page here", level: "Comfortable" },
      { name: "Tailwind", Icon: SiTailwindcss, brand: "#06B6D4", usage: "All styling here", level: "Learning" },
      { name: "Node.js", Icon: SiNodedotjs, brand: "#5FA04E", usage: "BCB chat server", level: "Comfortable" },
      { name: "PostgreSQL", Icon: SiPostgresql, brand: "#4169E1", usage: "This site's data", level: "Learning" },
      { name: "Prisma", Icon: SiPrisma, brand: "#C7CEDB", usage: "Schema + queries", level: "Comfortable" },
    ],
  },
  {
    title: "Worked with",
    items: [
      { name: "Flutter", Icon: SiFlutter, brand: "#47C5FB", usage: "Both mobile apps", level: "Confident" },
      { name: "Dart", Icon: SiDart, brand: "#0175C2", usage: "Both mobile apps", level: "Confident" },
      { name: "Firebase", Icon: SiFirebase, brand: "#FFCA28", usage: "Auth + Firestore", level: "Confident" },
      { name: "Python", Icon: SiPython, brand: "#FFD43B", usage: "Backend + vision", level: "Fluent" },
      { name: "FastAPI", Icon: SiFastapi, brand: "#009688", usage: "17 API endpoints", level: "Confident" },
      { name: "MySQL", Icon: SiMysql, brand: "#4479A1", usage: "7-table schema", level: "Comfortable" },
      { name: "WebRTC", Icon: SiWebrtc, brand: "#C7CEDB", usage: "Two-way video", level: "Comfortable" },
      { name: "OpenCV", Icon: SiOpencv, brand: "#7C5CFF", usage: "Face recognition", level: "Comfortable" },
      { name: "Raspberry Pi", Icon: SiRaspberrypi, brand: "#C51A4A", usage: "Pi 5 edge device", level: "Fluent" },
    ],
  },
  {
    title: "Extras",
    items: [
      { name: "Socket.io", Icon: SiSocketdotio, brand: "#C7CEDB", usage: "Live chat in BCB", level: "Confident" },
      { name: "Docker", Icon: SiDocker, brand: "#2496ED", usage: "Local services", level: "Comfortable" },
      { name: "C#", Icon: SiSharp, brand: "#68217A", usage: "Learning now", level: "Learning" },
    ],
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Tile({ tech }: { tech: Tech }) {
  const { name, Icon, brand, usage, level } = tech;
  const step = LEVELS.indexOf(level);

  return (
    <motion.div
      variants={tileVariants}
      className="logo-tile group relative flex h-24 flex-col items-center justify-center gap-2 px-1.5"
      style={{ "--brand": brand } as React.CSSProperties}
    >
      <Icon size={24} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />

      <span className="text-center text-meta text-foreground/60 transition-opacity duration-200 group-hover:opacity-0">
        {name}
      </span>

      {/* Same footprint as the name, so revealing the detail shifts nothing. */}
      <div className="pointer-events-none absolute inset-x-1.5 bottom-2.5 flex flex-col items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-caption tracking-[0.08em] uppercase" style={{ color: brand }}>
          {level}
        </span>
        <span className="flex gap-1" aria-hidden>
          {LEVELS.map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full"
              style={{
                background:
                  i <= step ? brand : "color-mix(in srgb, var(--color-text) 18%, transparent)",
              }}
            />
          ))}
        </span>
        <span className="text-center text-caption leading-snug text-foreground/55">{usage}</span>
      </div>

      <span className="sr-only">
        {name}: {level}. {usage}.
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-25% 0px -45% 0px" }}
      variants={staggerContainer}
      className="mx-auto flex min-h-screen w-full max-w-295 flex-col justify-center px-6 py-6 pb-30 sm:px-12"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <h6 className="mb-3.5 text-accent">Stack</h6>
        <h2 className="m-0 max-w-[24ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
          Current Skillset.
        </h2>
        <p className="mt-2.5 max-w-[56ch] text-sm text-foreground/50">
          Hover for where each one is used and how far along I am.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {tiers.map((tier) => (
          <motion.div key={tier.title} variants={fadeUp}>
            <div className="mb-2.5 flex items-center gap-3">
              <span className="h-px w-6 flex-none bg-accent" aria-hidden />
              <h3 className="card-kicker m-0">{tier.title}</h3>
            </div>

            <motion.div
              variants={gridVariants}
              className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:grid-cols-7"
            >
              {tier.items.map((tech) => (
                <Tile key={tech.name} tech={tech} />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
