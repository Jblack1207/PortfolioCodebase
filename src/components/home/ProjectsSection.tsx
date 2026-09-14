"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Project } from "@/generated/prisma/client";
import SourceDropdown from "@/components/shared/SourceDropdown";
import { caseStudyExtras } from "@/components/projects/caseStudyContent";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [[index, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage(([prevIndex]) => {
      const next = Math.max(0, Math.min(projects.length - 1, prevIndex + newDirection));
      return [next, newDirection];
    });
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipe = info.offset.x * info.velocity.x;
    if (swipe < -5000) paginate(1);
    else if (swipe > 5000) paginate(-1);
  };

  const project = projects[index];
  const extra = caseStudyExtras[project.slug];
  const cover = extra?.cover;
  const repos =
    extra?.repos ?? (project.githubUrl ? [{ label: "Source on GitHub", url: project.githubUrl }] : []);

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
      transition={{ duration: 0.6 }}
      className="snap-section mx-auto flex min-h-screen max-w-295 flex-col justify-center px-6 py-10 sm:px-12"
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h6 className="mb-3.5 text-accent">Selected work</h6>
          <h2 className="m-0 max-w-[22ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            My Project Work so far...
          </h2>
        </div>

        {projects.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              className="card flex h-10 w-10 items-center justify-center text-foreground/70 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => paginate(1)}
              disabled={index === projects.length - 1}
              className="card flex h-10 w-10 items-center justify-center text-foreground/70 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag={projects.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="grid grid-cols-1 items-center gap-8 pb-10 sm:grid-cols-[1.15fr_1fr] sm:gap-12 sm:pb-14"
          >
            <div
              className="plate plate-stage relative grid aspect-16/10 place-items-center"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              {cover?.length ? (
                <div className="flex h-full w-full items-center justify-center gap-4 px-6 py-6 sm:gap-5 sm:px-8 sm:py-7">
                  {cover.map((shot, i) => (
                    <div
                      key={shot.src}
                      className={`relative min-w-0 flex-1 ${i === 1 ? "h-full" : "h-[88%]"}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(min-width: 640px) 200px, 30vw"
                        className="object-contain select-none [filter:drop-shadow(0_12px_22px_rgba(0,0,0,0.5))]"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="caption-mono">{project.title} · screenshot</span>
              )}
            </div>

            <div>
              <div className="card-kicker mb-3">{project.category}</div>
              <h3 className="m-0 mb-1.5 text-h3-feature tracking-[-0.02em] text-foreground">
                {project.title}
              </h3>
              <div
                className="mb-4.5 h-0.5 w-14 origin-left bg-accent-2"
                style={{ animation: "noc-line 0.8s cubic-bezier(.2,.7,.3,1) both" }}
              />
              <p className="m-0 mb-4 text-body leading-[1.65] text-foreground/74">
                {project.shortDescription}
              </p>
              <p className="m-0 mb-5 text-meta leading-[1.6] text-foreground/55">
                Solo developer, university project
              </p>
              <div className="mb-6 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag tag-neutral">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link className="btn btn-primary px-4 py-2 text-sm" href={`/projects/${project.slug}`}>
                  Read the case study
                </Link>
                <SourceDropdown repos={repos} variant="secondary" placement="top" />
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {projects.length > 1 && (
        <div className="mb-6 flex justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? "22px" : "6px",
                background:
                  i === index
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-text) 25%, transparent)",
              }}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
