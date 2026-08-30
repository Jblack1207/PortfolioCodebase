"use client";

import { useEffect } from "react";
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
  education: { label: "Education", color: "color-mix(in srgb, var(--color-accent-2) 55%, white)" },
  work: { label: "Experience", color: "var(--color-accent)" },
  project: { label: "Project", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" },
};

const fadeIn = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -24 : 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
});

export default function Timeline() {
  useEffect(() => {
    // Next's own post-navigation scroll correction can land in the wrong
    // place on this page (see the mandatory scroll-snap setup on the home
    // page) and it runs after this effect, so reassert on the next frame
    // and shortly after to win that race.
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const raf = requestAnimationFrame(reset);
    const timeout = setTimeout(reset, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="mx-auto max-w-295 scroll-mt-20 px-6 pt-32 pb-24 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mb-20 max-w-[60ch]"
      >
        <h6 className="mb-3.5 text-accent">My journey</h6>
        <h1 className="m-0 mb-5 text-h1 leading-[1.05] tracking-tight text-foreground sm:text-h1-lg">
          Education, experience, and everything in between.
        </h1>
        <p className="m-0 text-lg leading-[1.6] text-foreground/70">
          From A Levels to a First-Class Computer Science degree, alongside
          real commercial QA experience and the projects I built along the
          way.
        </p>
      </motion.div>

      <div className="relative">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute top-1 bottom-1 left-5 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
          style={{ background: "color-mix(in srgb, var(--color-text) 16%, transparent)" }}
        />

        {events.map((event, i) => {
          const meta = typeMeta[event.type];
          const isLeft = i % 2 === 0;
          return (
            <div
              key={event.title}
              className="relative mb-12 grid grid-cols-[2.5rem_1fr] gap-x-4 last:mb-0 sm:mb-16 sm:grid-cols-[1fr_2.5rem_1fr] sm:gap-x-8"
            >
              <div className="col-start-1 flex justify-center pt-1.5 sm:col-start-2">
                <span
                  className="z-10 h-3.5 w-3.5 rounded-full"
                  style={{ background: meta.color, boxShadow: `0 0 0 5px color-mix(in srgb, ${meta.color} 18%, var(--color-bg))` }}
                />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={fadeIn(isLeft)}
                className={`col-start-2 row-start-1 ${isLeft ? "sm:col-start-1" : "sm:col-start-3"}`}
              >
                <div className="card elev-sm p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
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
                  <h3 className="m-0 mb-1 text-h3 tracking-tight text-foreground sm:text-h3-lg">
                    {event.title}
                  </h3>
                  <div className="mb-3 text-meta text-foreground/60">{event.org}</div>
                  <p className="m-0 text-body leading-[1.65] text-foreground/74">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
