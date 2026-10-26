"use client";

import { type RefObject, useEffect } from "react";
import { reducedMotion } from "./motion";

/**
 * The process plan line fills with scroll (--p, 0 to 1) as the 62% mark of the viewport passes it,
 * and each step marker it passes turns Emerald (.is-passed). Reduced motion shows it full.
 */
export function useProcessLine(stepsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps) return;
    const stepEls = Array.from(steps.querySelectorAll<HTMLElement>(".bs-step"));

    // Reads all geometry first, then writes, so a scroll frame costs one layout.
    const update = () => {
      const r = steps.getBoundingClientRect();
      const tops = stepEls.map((st) => st.getBoundingClientRect().top);
      const span = Math.max(1, r.height - 32);
      const p = reducedMotion() ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.62 - r.top - 16) / span));
      const lineY = r.top + 16 + p * span;
      steps.style.setProperty("--p", p.toFixed(4));
      stepEls.forEach((st, i) => st.classList.toggle("is-passed", tops[i] + 8 <= lineY));
    };

    let raf = 0;
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [stepsRef]);
}
