"use client";

import { motion } from "framer-motion";

const stats = (projectCount: number) => [
  { value: "TODO yrs", label: "writing software" },
  { value: String(projectCount), label: "projects in the open, more on the way" },
  { value: "< TODOh", label: "typical reply to an enquiry" },
];

export default function Stats({
  projectCount,
  inView,
}: {
  projectCount: number;
  inView: boolean;
}) {
  return (
    <section
      id="stats"
      className="my-8 scroll-mt-20 px-6 py-7 sm:px-12"
      style={{
        background:
          "linear-gradient(120deg, var(--color-section), var(--color-section-glow))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="mx-auto grid max-w-295 grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {stats(projectCount).map((stat) => (
          <div key={stat.label}>
            <div className="font-heading text-stat leading-none tracking-[-0.03em] text-text-stats">
              {stat.value}
            </div>
            <div className="mt-2 text-meta text-text-stats/70">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
