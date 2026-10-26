"use client";

import { type RefObject, useEffect } from "react";
import { reducedMotion } from "./motion";
import { stepBy } from "./useCarousel";

/**
 * Testimonials autoplay: one card every 6s, looping. Pauses on mouse hover, on touch (resumes 8s after),
 * on keyboard focus, while less than 40% on screen, in a hidden tab and under reduced motion.
 */
export function useAutoplay(listRef: RefObject<HTMLElement | null>, boxRef: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const rv = listRef.current, box = boxRef.current;
    if (!enabled || !rv || !box) return;
    const ac = new AbortController();
    const { signal } = ac;
    let paused = false, inView = false, resumeT = 0;
    const pause = () => { paused = true; clearTimeout(resumeT); };
    const resume = (ms: number) => { clearTimeout(resumeT); resumeT = window.setTimeout(() => { paused = false; }, ms); };

    box.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") pause(); }, { signal });
    box.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !box.contains(document.activeElement)) resume(400); }, { signal });
    box.addEventListener("touchstart", pause, { passive: true, signal });
    box.addEventListener("touchend", () => resume(8000), { passive: true, signal });
    box.addEventListener("focusin", pause, { signal });
    box.addEventListener("focusout", () => resume(1500), { signal });

    const io = new IntersectionObserver(([e]) => { inView = e.intersectionRatio >= 0.4; }, { threshold: [0, 0.4, 0.8] });
    io.observe(rv);

    const iv = window.setInterval(() => {
      if (paused || !inView || reducedMotion() || document.hidden || rv.scrollWidth <= rv.clientWidth + 2) return;
      if (rv.scrollLeft >= rv.scrollWidth - rv.clientWidth - 4) rv.scrollTo({ left: 0, behavior: "smooth" });
      else stepBy(rv, 1);
    }, 6000);

    return () => {
      ac.abort();
      io.disconnect();
      clearInterval(iv);
      clearTimeout(resumeT);
    };
  }, [listRef, boxRef, enabled]);
}
