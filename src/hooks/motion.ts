/** Read at the moment of use, so a change in system settings applies to the next animation. */
export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE_OUT_CUBIC = (k: number) => 1 - Math.pow(1 - k, 3);
