"use client";

import { type RefObject, useEffect } from "react";
import { reducedMotion } from "./motion";

/** Distance between the first two items, i.e. one card plus the gap. */
function itemStep(c: HTMLElement) {
  const [a, b] = c.children;
  return b ? b.getBoundingClientRect().left - a.getBoundingClientRect().left : c.clientWidth;
}

export function stepBy(c: HTMLElement, dir: 1 | -1) {
  c.scrollBy({ left: dir * itemStep(c), behavior: reducedMotion() ? "auto" : "smooth" });
}

/**
 * Snap carousel behaviour: the progress bar tracks the scroll, a mouse can drag it (snapping to the
 * nearest card on release), and arrow keys step one card when the list itself has focus.
 */
export function useCarousel(listRef: RefObject<HTMLElement | null>, barRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const c = listRef.current;
    if (!c) return;
    const ac = new AbortController();
    const { signal } = ac;
    const timers: number[] = [];

    const updateBar = () => {
      const bar = barRef.current;
      if (!bar) return;
      const sw = c.scrollWidth, cw = c.clientWidth, frac = sw > 0 ? Math.min(1, cw / sw) : 1, max = sw - cw;
      const pos = max > 0 ? c.scrollLeft / max : 0;
      bar.style.width = `${frac * 100}%`;
      bar.style.left = `${pos * (1 - frac) * 100}%`;
    };
    c.addEventListener("scroll", updateBar, { passive: true, signal });
    window.addEventListener("resize", updateBar, { signal });
    updateBar();
    timers.push(window.setTimeout(updateBar, 300));

    let down = false, moved = false, sx = 0, sl = 0;
    c.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || c.scrollWidth <= c.clientWidth + 2) return;
      down = true; moved = false; sx = e.clientX; sl = c.scrollLeft;
    }, { signal });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; c.classList.add("is-dragging"); }
      if (moved) c.scrollLeft = sl - dx;
    }, { signal });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      const s = itemStep(c), left = c.scrollLeft;
      c.classList.remove("is-dragging");
      c.scrollLeft = left;
      c.scrollTo({ left: Math.round(left / s) * s, behavior: "smooth" });
      timers.push(window.setTimeout(() => { moved = false; }, 60));
    }, { signal });
    // A drag must not also follow the link under the pointer.
    c.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, { capture: true, signal });
    c.addEventListener("dragstart", (e) => e.preventDefault(), { signal });
    c.addEventListener("keydown", (e) => {
      if (e.target !== c || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      e.preventDefault();
      stepBy(c, e.key === "ArrowRight" ? 1 : -1);
    }, { signal });

    return () => {
      ac.abort();
      timers.forEach(clearTimeout);
    };
  }, [listRef, barRef]);
}
