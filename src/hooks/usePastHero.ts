"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/* The hero is "past" once its bottom edge is under the navbar. A page without a hero is always past. */
function getSnapshot() {
  const hero = document.querySelector(".bs-hero");
  return hero ? hero.getBoundingClientRect().bottom <= 72 : true;
}

/** True once the hero has scrolled away: the navbar turns solid and the action bar slides up. */
export function usePastHero() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
