"use client";

import { type ReactNode, useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

export function CountUpGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useCountUp(ref);
  return <div ref={ref} className="bs-stats__grid">{children}</div>;
}
