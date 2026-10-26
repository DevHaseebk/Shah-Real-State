"use client";

import { type RefObject, useEffect } from "react";
import { EASE_OUT_CUBIC, reducedMotion } from "./motion";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * StatsBand count-up: each .bs-stat__val counts from zero to its data-to value over 1.2s once 35% of
 * the grid is in view, and its plan line (via .is-in) grows to the number's width. Runs once.
 */
export function useCountUp(gridRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const stats = Array.from(grid.querySelectorAll<HTMLElement>(".bs-stat"));
    const val = (s: HTMLElement) => s.querySelector<HTMLElement>(".bs-stat__val")!;
    const to = (s: HTMLElement) => Number(val(s).dataset.to);
    let raf = 0;
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    const final = () => stats.forEach((s) => { val(s).textContent = fmt(to(s)); s.classList.add("is-in"); });

    const run = () => {
      if (reducedMotion()) return final();
      stats.forEach((s) => s.classList.add("is-in"));
      const t0 = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 1200), e = EASE_OUT_CUBIC(k);
        stats.forEach((s) => { val(s).textContent = fmt(Math.round(to(s) * e)); });
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const arm = () => {
      if (cancelled) return;
      if (reducedMotion()) return final();
      // Hold each figure at its final width so counting up does not shift the layout.
      // All writes, then all reads, then all writes: one layout instead of one per figure.
      const nums = stats.map((s) => s.querySelector<HTMLElement>(".bs-stat__num")!);
      stats.forEach((s, i) => { val(s).textContent = fmt(to(s)); nums[i].style.minWidth = ""; });
      const widths = nums.map((n) => Math.ceil(n.getBoundingClientRect().width));
      stats.forEach((s, i) => {
        nums[i].style.minWidth = `${widths[i]}px`;
        val(s).textContent = "0";
        s.classList.remove("is-in");
      });
      io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io?.disconnect();
        run();
      }, { threshold: 0.35 });
      io.observe(grid);
    };

    document.fonts.ready.then(arm);
    return () => {
      cancelled = true;
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [gridRef]);
}
