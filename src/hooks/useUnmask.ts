"use client";

import { type RefObject, useEffect } from "react";
import { reducedMotion } from "./motion";

/**
 * Large images unmask from the bottom when their holder is 15% in view, 120ms apart in a pair.
 * Observes the unclipped holder: a fully clipped image never reports as visible.
 */
export function useUnmask(holderRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const masks = Array.from(holder.children).filter((c): c is HTMLElement => c.classList.contains("bs-unmask"));
    if (reducedMotion()) {
      masks.forEach((m) => m.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      masks.forEach((m, i) => {
        m.style.transitionDelay = `${i * 120}ms`;
        m.classList.add("is-in");
      });
    }, { threshold: 0.15 });
    io.observe(holder);
    return () => io.disconnect();
  }, [holderRef]);
}
