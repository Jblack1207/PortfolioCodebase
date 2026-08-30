"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Clamp so rubber-band overscroll (e.g. fast trackpad scrolling past the
  // bottom of the page) can't push this outside the 0-1 range and make the
  // bar disappear or overshoot.
  const clamped = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));
  const scaleX = useSpring(clamped, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
