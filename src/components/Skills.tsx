"use client";

import { motion, type Variants } from "framer-motion";

const currentlyUsing = [
  { name: "C#", level: 0 },
  { name: "Next.js", level: 50 },
  { name: "TypeScript", level: 55 },
  { name: "React", level: 45 },
  { name: "Tailwind", level: 45 },
  { name: "PostgreSQL", level: 45 },
  { name: "Node.js", level: 55 },

];

const previouslyUsed = [
  { name: "Flutter", level: 65 },
  { name: "Prisma", level: 40 },
  { name: "Docker", level: 50 },
  { name: "SQL", level: 75 },
  { name: "Dart", level: 65 },
  { name: "Firebase", level: 60 },
  { name: "Python", level: 75 },
  { name: "FastAPI", level: 65 },
  { name: "Socket.io", level: 55 },
  { name: "OpenCV", level: 50 },
  { name: "WebRTC", level: 45 },
  { name: "Raspberry Pi", level: 70 },
  { name: "MySQL", level: 50 },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.05 },
  },
};

const barTrackVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function barVariants(level: number): Variants {
  return {
    hidden: { width: 0 },
    visible: { width: `${level}%`, transition: { duration: 0.7, ease: "easeOut" } },
  };
}

function SkillRow({ title, items }: { title: string; items: { name: string; level: number }[] }) {
  return (
    <div className="mb-8">
      <h3 className="card-kicker mb-3">{title}</h3>
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5"
      >
        {items.map((item) => (
          <motion.div key={item.name} variants={cardVariants} className="card elev-sm p-3.5">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm text-foreground/82">{item.name}</span>
              <span className="text-[11px] text-foreground/40">{item.level}%</span>
            </div>
            <motion.div
              variants={barTrackVariants}
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{
                background: "color-mix(in srgb, var(--color-text) 12%, transparent)",
              }}
            >
              <motion.div
                variants={barVariants(item.level)}
                className="h-full rounded-full bg-accent"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
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
      className="mx-auto max-w-295 scroll-mt-20 px-6 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-10"
    >
      <motion.div variants={fadeUp} className="mb-2">
        <h6 className="mb-3.5 text-accent">Stack</h6>
        <h2 className="m-0 max-w-[24ch] text-[30px] tracking-tight text-foreground sm:text-[44px]">
          What i&apos;ve used, and what i&apos;m currently using.
        </h2>
      </motion.div>

      <SkillRow title="Currently using in projects" items={currentlyUsing} />
      <SkillRow title="Also worked with" items={previouslyUsed} />
    </motion.section>
  );
}
