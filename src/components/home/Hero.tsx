"use client";

import { motion } from "framer-motion";
import SectionArrow from "@/components/SectionArrow";

export default function Hero() {
  return (
    <motion.header
      id="top"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
      transition={{ duration: 0.6 }}
      className="relative flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden scroll-mt-20 px-6 py-10 text-center sm:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-text) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-text) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-295">
        <h1 className="relative m-0 mb-7 max-w-[15ch] text-[46px] leading-[1.03] tracking-[-0.03em] text-foreground sm:text-[68px] lg:text-[88px] mx-auto">
          <span
            className="block"
            style={{ animation: "noc-rise 0.8s cubic-bezier(.2,.7,.3,1) 0.05s both" }}
          >
            Hey, thanks for stopping by.
          </span>
        </h1>

        <p
          className="relative m-0 mx-auto max-w-[52ch] text-lg leading-[1.6] text-foreground/70"
          style={{ animation: "noc-rise 0.8s cubic-bezier(.2,.7,.3,1) 0.38s both" }}
        >
          Welcome to my Portfolio!
        </p>
      </div>

      <div className="absolute bottom-32 inset-x-0">
        <SectionArrow href="#about" label="Jump to about" center offset={-0.035} />
      </div>
    </motion.header>
  );
}
