"use client";

import { type ReactNode, useRef } from "react";
import { useUnmask } from "@/hooks/useUnmask";

/** The holder of one or two .bs-unmask photos; they reveal from the bottom when it enters view. */
export function UnmaskGroup({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useUnmask(ref);
  return <div ref={ref} className={className}>{children}</div>;
}
