"use client";

import { type ReactNode, useRef } from "react";
import { useProcessLine } from "@/hooks/useProcessLine";

/** The scroll-linked plan line beside the process steps. Children are the <li> steps. */
export function ProcessSteps({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useProcessLine(ref);
  return (
    <div ref={ref} className="bs-steps">
      <span className="bs-steps__track" aria-hidden="true"><span className="bs-steps__fill" /></span>
      <ol>{children}</ol>
    </div>
  );
}
