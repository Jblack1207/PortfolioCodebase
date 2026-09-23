"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Project } from "@/generated/prisma/client";
import ScrollToTop from "@/components/shared/ScrollToTop";
import SourceDropdown from "@/components/shared/SourceDropdown";
import Plate from "./Plate";
import { caseStudyExtras, projectRepos } from "./caseStudyContent";

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const lgCols = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function num(slug: Project["slug"]) {
  switch (slug) {
    case "black-country-beats":
      return '5';
    case "healthguard-pro":
      return '6';
  }
}
export default function CaseStudy({ project }: { project: Project }) {
  const extra = caseStudyExtras[project.slug];
  const repos = projectRepos(project);

  return (
    <>
      <ScrollToTop />
      <section className="mx-auto w-full max-w-295 scroll-mt-20 px-6 pt-32 pb-16 sm:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="tag tag-neutral">{project.category}</span>
            <span className="card-kicker">Case study</span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="m-0 mb-5 max-w-[22ch] text-h1 leading-[1.05] tracking-tight text-foreground sm:text-h1-lg"
          >
            {project.title}
          </motion.h1>
          {/* Height is reserved so the CTA row — and every section below it — starts at
              the same point on every case study, whatever the tagline and tech stack run to. */}
          <motion.div variants={fadeUp} className="mb-10 sm:min-h-54">
            <p className="m-0 mb-8 max-w-[62ch] text-lg leading-[1.6] text-foreground/70">
              {extra?.tagline ?? project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag tag-neutral">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
            <SourceDropdown
              repos={repos}
              variant="primary"
              placement="bottom"
              className="px-5 py-2.5 text-sm"
            />
            <Link className="btn btn-secondary px-5 py-2.5 text-sm" href="/#work">
              Back to all projects
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {extra && (
        <section
          className="my-4 px-6 py-10 sm:px-12"
          style={{ background: "linear-gradient(120deg, var(--color-section), var(--color-section-glow))" }}
        >
          <div className="mx-auto grid max-w-295 grid-cols-2 gap-8 sm:grid-cols-4">
            {extra.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-stat leading-none tracking-[-0.03em] text-text-stats">{stat.value}</div>
                {/* Two lines are reserved so the band is the same height on every case study. */}
                <div className="mt-2 min-h-[3em] text-meta leading-normal text-text-stats/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14"
        >
          <motion.div variants={fadeUp}>
            <h6 className="mb-3.5 text-accent">The problem</h6>
            <p className="m-0 max-w-[60ch] text-body leading-[1.65] text-foreground/78">{project.problem}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h6 className="mb-3.5 text-accent">The solution</h6>
            <p className="m-0 max-w-[60ch] text-body leading-[1.65] text-foreground/78">{project.solution}</p>
          </motion.div>
        </motion.div>

        {project.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="m-0 mt-10 max-w-[70ch] text-body leading-[1.65] text-foreground/60"
          >
            {project.description}
          </motion.p>
        )}
      </section>

      {extra && (
        <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <h6 className="mb-3.5 text-accent">System design</h6>
          <h2 className="m-0 mb-12 max-w-[26ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            {num(project.slug)} layers, sensor to mobile app.
          </h2>

          {extra.architectureDiagram && (
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="m-0 mb-12"
            >
              <div className="plate plate-interactive plate-stage elev-sm relative aspect-video w-full">
                <Image
                  src={extra.architectureDiagram.src}
                  alt={extra.architectureDiagram.alt}
                  fill
                  sizes="(min-width: 1180px) 1180px, 100vw"
                  className="object-contain p-4 sm:p-8"
                />
              </div>
              <figcaption className="mt-3 flex max-w-[70ch] items-start gap-2.5">
                <span className="mt-1.5 h-px w-4 flex-none bg-accent/70" aria-hidden />
                <span className="text-meta leading-snug text-foreground/55">
                  {extra.architectureDiagram.caption}
                </span>
              </figcaption>
            </motion.figure>
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {extra.architecture.map((layer, i) => (
              <motion.div key={layer.name} variants={fadeUp} className="card elev-sm relative overflow-hidden p-6 sm:p-7">
                <span
                  className="pointer-events-none absolute -top-3 -right-1 font-heading text-[64px] leading-none font-semibold select-none"
                  style={{ color: "color-mix(in srgb, var(--color-text) 6%, transparent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="mb-4 h-0.5 w-10 origin-left bg-accent"
                  style={{ animation: "noc-line 0.8s cubic-bezier(.2,.7,.3,1) both" }}
                />
                <h3 className="relative m-0 mb-1.5 text-h3 tracking-tight text-foreground">{layer.name}</h3>
                <div className="card-kicker relative mb-3">{layer.tech}</div>
                <p className="relative m-0 text-body leading-[1.65] text-foreground/74">{layer.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {extra && (
        <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <h6 className="mb-3.5 text-accent">Engineering highlights</h6>
          <h2 className="m-0 mb-12 max-w-[26ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            The parts worth digging into.
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {extra.highlights.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="card elev-sm p-6 sm:p-7">
                <h3 className="m-0 mb-2 text-h3 tracking-tight text-foreground">{item.title}</h3>
                <p className="m-0 text-body leading-[1.65] text-foreground/74">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {extra?.galleries?.map((gallery) => (
        <section key={gallery.kicker} className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <h6 className="mb-3.5 text-accent">{gallery.kicker}</h6>
          <h2 className="m-0 mb-12 max-w-[26ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            {gallery.title}
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className={`grid gap-5 ${
              gallery.layout === "phone" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
            } ${lgCols[gallery.cols ?? (gallery.layout === "phone" ? 4 : 3)]}`}
          >
            {gallery.items.map((figure) => (
              <motion.div key={figure.src} variants={fadeUp}>
                <Plate
                  figure={figure}
                  layout={gallery.layout}
                  sizes={
                    gallery.layout === "phone"
                      ? "(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                      : "(min-width: 1024px) 560px, (min-width: 640px) 45vw, 90vw"
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}

      {extra?.testing && extra.testing.length > 0 && (
        <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <h6 className="mb-3.5 text-accent">Validation</h6>
          <h2 className="m-0 mb-12 max-w-[26ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            Tested end to end.
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {extra.testing.map((suite) => (
              <motion.div key={suite.name} variants={fadeUp} className="card elev-sm p-5">
                <div className="font-heading text-h3 leading-none tracking-[-0.02em] text-foreground">{suite.count}</div>
                <div className="mt-2 mb-2 text-sm text-foreground/82">{suite.name}</div>
                <p className="m-0 text-meta leading-normal text-foreground/55">{suite.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {extra && (
        <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="mb-3.5 text-accent">What I&rsquo;d do differently</h6>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {extra.evaluation.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span className="text-body leading-[1.65] text-foreground/74">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h6 className="mb-3.5 text-accent">What&rsquo;s next</h6>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {extra.futureWork.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
                    />
                    <span className="text-body leading-[1.65] text-foreground/74">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {extra && (
        <section className="mx-auto w-full max-w-295 px-6 py-14 sm:px-12">
          <h6 className="mb-3.5 text-accent">Impact</h6>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3"
          >
            {extra.impact.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <div className="card-kicker mb-2">{item.title}</div>
                <p className="m-0 text-body leading-[1.65] text-foreground/74">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      <section className="mx-auto w-full max-w-295 px-6 pt-4 pb-24 sm:px-12">
        <div className="hr mb-10" />
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="m-0 text-sm text-foreground/55">Thanks for reading. If you have any questions, feel free to reach out!</p>
          <Link className="btn btn-primary px-5 py-2.5 text-sm" href="/#work">
            See other projects
          </Link>
        </div>
        <p className="m-0 mt-8 text-meta text-foreground/40">
          All information on this page is derived from my university submission documents for this project.
        </p>
      </section>
    </>
  );
}
//