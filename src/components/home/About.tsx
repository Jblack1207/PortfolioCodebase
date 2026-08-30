"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import SectionArrow from "@/components/SectionArrow";

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function About({ inView }: { inView: boolean }) {
  return (
    <section id="about" className="mx-auto max-w-295 scroll-mt-20 px-6 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-10">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[0.75fr_1.25fr] sm:gap-14"
      >
        <motion.div variants={fadeUp}>
          <div
            className="grid aspect-4/5 place-items-center overflow-hidden rounded-2xl"
            style={{
              backgroundColor: "var(--color-surface)",
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(233,233,237,0.055) 0 10px, transparent 10px 20px)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/45 uppercase">
              portrait — dark background
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h6 className="mb-3.5 text-accent">About</h6>
          <h2 className="m-0 mb-6 max-w-[24ch] text-[28px] tracking-tight text-foreground sm:text-[40px]">
            Hi - I&rsquo;m Joel.
          </h2>
          <p className="m-0 mb-5 max-w-[58ch] text-[17px] leading-[1.7] text-foreground/78">
            I&rsquo;m a graduate from Birmingham City University with a BSc (Hons) in Computer Science. Currently I work as a QA Engineer for Mitubishi Electric Iconics Digital Solutions, but am looking to transition into a Software Engineering / Development role. I have a passion for building software and always looking to learn new technologies and improve my skills.
          </p>
          <p className="m-0 mb-8 max-w-[58ch] text-[17px] leading-[1.7] text-foreground/78">
            
          </p>
          <div className="hr my-8" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <div>
              <div className="card-kicker">Based in</div>
              <div className="mt-1">Wolverhampton, West Midlands</div>
            </div>
            <div>
              <div className="card-kicker">Currently working on</div>
              <div className="mt-1">A C# application. </div>
            </div>
          </div>
          <Link href="/timeline" className="btn btn-secondary mt-8 px-5 py-2.5 text-sm">
            View my full timeline
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <SectionArrow href="#work" label="Jump to selected work" center offset={0} />
      </motion.div>
    </section>
  );
}
