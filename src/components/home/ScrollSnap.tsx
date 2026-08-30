"use client";

import { useEffect } from "react";

/**
 * Enables scroll-snapping on <html> only while the home page is mounted, so
 * the timeline page (and any future page) keeps normal free scrolling.
 */
export default function ScrollSnap() {
  useEffect(() => {
    document.documentElement.classList.add("home-snap");
    return () => document.documentElement.classList.remove("home-snap");
  }, []);

  return null;
}
