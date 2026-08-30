"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";

export default function IntroGroup({ projectCount }: { projectCount: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-45% 0px -45% 0px" });

  return (
    <div ref={ref}>
      {/* <Stats projectCount={projectCount} inView={inView} /> */}
      <About inView={inView} />
    </div>
  );
}
