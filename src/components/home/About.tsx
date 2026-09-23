"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

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
    <section
      id="about"
      className="snap-section mx-auto flex min-h-screen max-w-295 flex-col justify-center px-6 py-10 sm:px-12"
    >
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
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Image src="/images/IMG_6302.jpeg" alt="Joel Blackham" width={400} height={500} className="h-auto w-full object-cover" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h6 className="mb-3.5 text-accent">About</h6>
          <h2 className="m-0 mb-6 max-w-[24ch] text-h2 tracking-tight text-foreground sm:text-h2-lg">
            Hi - I&rsquo;m Joel.
          </h2>
          <p className="m-0 mb-5 max-w-[58ch] text-body leading-[1.65] text-foreground/78">
            I&rsquo;m a BSc (Hons) Computer Science graduate from Birmingham City University. Currently I work as a QA Engineer for Mitsubishi Electric Iconics Digital Solutions, but am looking to transition into a Software Engineering / Development role.
          </p>
          <p className="m-0 mb-8 max-w-[58ch] text-body leading-[1.65] text-foreground/78">
            I&rsquo;m hugely passionate about technology and software development, and I&rsquo;m always looking to learn new skills and improve my knowledge to adjust to any job role or industry changes.
          </p>
          <div className="hr my-8" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <div>
              <div className="card-kicker">Based in</div>
              <div className="mt-1">Wolverhampton, West Midlands</div>
            </div>
            <div>
              <div className="card-kicker">Currently working on</div>
              <div className="mt-1">Learning and Developing a C# based MAUI application. </div>
            </div>
          </div>
          <Link href="/timeline" className="btn btn-secondary mt-8 px-5 py-2.5 text-sm">
            View my full timeline
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
