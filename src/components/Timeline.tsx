"use client";

import { motion, type Variants } from "framer-motion";

type EventType = "education" | "work" | "project";

type TimelineEvent = {
  period: string;
  title: string;
  org: string;
  type: EventType;
  description: string;
};

const events: TimelineEvent[] = [
  {
    period: "2019 — 2021",
    title: "A Levels",
    org: "Dudley Sixth",
    type: "education",
    description: "1 BTEC & 2 A Levels.",
  },
  {
    period: "Feb 2020 — Jun 2024",
    title: "Sales Assistant / Delivery Coordinator",
    org: "Iceland Foods PLC",
    type: "work",
    description:
      "Worked part-time alongside my studies within customer service and home delivery operations — coordinating customer orders and delivery schedules, resolving logistical issues, and developing organisational, problem-solving and teamwork skills in a fast-paced environment.",
  },
  {
    period: "2021 — 2026",
    title: "BSc (Hons) Computer Science, w/ Placement Year",
    org: "Birmingham City University · First Class Honours",
    type: "education",
    description:
      "A four-year Computer Science degree including an industry placement year, covering software development, testing, and cloud technologies.",
  },
  {
    period: "Academic project",
    title: "Black Country Beats",
    org: "Flutter-based mobile application",
    type: "project",
    description:
      "Designed and developed a mobile platform connecting local musicians, venues, and bands — implementing authentication, profile management, real-time messaging, and a Firebase-backed cloud backend, with Agile development principles throughout.",
  },
  {
    period: "Jun 2024 — Present",
    title: "Quality Assurance Engineer",
    org: "Mitsubishi Electric Iconics Digital Solutions",
    type: "work",
    description:
      "Working within an Agile software development environment, contributing to enterprise software delivery — functional, regression, and API testing with Postman and Azure DevOps, defect tracking through to resolution, release validation, and automating frontend testing on iOS & Android with Appium.",
  },
  {
    period: "Final year project",
    title: "IoT-Based Elderly Safety Monitoring System",
    org: "Python, FastAPI, C++, MySQL, Raspberry Pi 5, Flutter, Firebase",
    type: "project",
    description:
      "Built a fall-detection and health-monitoring system for elderly users — a FastAPI backend processing sensor data from ESP32-S3 devices, and a Flutter app allowing users and caregivers to view health information and receive real-time alerts.",
  },
];

const typeMeta: Record<EventType, { label: string; color: string }> = {
  education: { label: "Education", color: "var(--color-accent-2)" },
  work: { label: "Experience", color: "var(--color-accent)" },
  project: { label: "Project", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Timeline() {
  return (
    <section className="mx-auto max-w-295 scroll-mt-20 px-6 pt-32 pb-24 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-16 max-w-[60ch]"
      >
        <h6 className="mb-3.5 text-accent">My journey</h6>
        <h1 className="m-0 mb-5 text-[36px] leading-[1.05] tracking-tight text-foreground sm:text-[52px]">
          Education, experience, and everything in between.
        </h1>
        <p className="m-0 text-lg leading-[1.6] text-foreground/70">
          From A Levels to a First-Class Computer Science degree, alongside
          real commercial QA experience and the projects I built along the
          way.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={staggerContainer}
      >
        {events.map((event, i) => {
          const meta = typeMeta[event.type];
          return (
            <motion.div key={event.title} variants={fadeUp} className="relative flex gap-6 pb-14 last:pb-0">
              <div className="relative flex w-3 flex-none flex-col items-center">
                <span
                  className="z-10 mt-2 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: meta.color }}
                />
                {i < events.length - 1 && (
                  <span
                    className="mt-1 w-px flex-1"
                    style={{ background: "color-mix(in srgb, var(--color-text) 15%, transparent)" }}
                  />
                )}
              </div>

              <div className="card elev-sm flex-1 p-6 sm:p-7">
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span
                    className="tag"
                    style={{
                      background: "color-mix(in srgb, " + meta.color + " 16%, transparent)",
                      color: meta.color,
                    }}
                  >
                    {meta.label}
                  </span>
                  <span className="card-kicker">{event.period}</span>
                </div>
                <h3 className="m-0 mb-1 text-[22px] tracking-tight text-foreground sm:text-[26px]">
                  {event.title}
                </h3>
                <div className="mb-3 text-sm text-foreground/60">{event.org}</div>
                <p className="m-0 max-w-[62ch] text-[15px] leading-[1.65] text-foreground/74">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
