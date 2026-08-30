"use client";

import { useEffect } from "react";

/**
 * Forces the page to the top on mount. Next's own post-navigation scroll
 * correction runs after this effect and can land in the wrong place when
 * navigating from the home page's mandatory scroll-snap layout, so this
 * reasserts on the next frame and shortly after to win that race.
 */
export default function ScrollToTop() {
  useEffect(() => {
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const raf = requestAnimationFrame(reset);
    const timeout = setTimeout(reset, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
