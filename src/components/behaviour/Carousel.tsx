"use client";

import { type ReactNode, useRef } from "react";
import { useAutoplay } from "@/hooks/useAutoplay";
import { useCarousel } from "@/hooks/useCarousel";

/**
 * A .bs-carousel list with its progress bar. Children are the <li> items. With `wrapClassName`, list and
 * bar sit in that wrapper, which is also the area that pauses autoplay.
 */
export function Carousel({ className, label, autoplay, wrapClassName, children }: {
  className: string;
  label: string;
  autoplay?: boolean;
  wrapClassName?: string;
  children: ReactNode;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  useCarousel(listRef, barRef);
  useAutoplay(listRef, boxRef, autoplay);

  const body = (
    <>
      {/* The list scrolls sideways, so it takes focus for arrow keys. */}
      <ul ref={listRef} className={`bs-carousel ${className}`} tabIndex={0} aria-label={label}>
        {children}
      </ul>
      <div className="bs-progress" aria-hidden="true">
        <span ref={barRef} className="bs-progress__bar" />
      </div>
    </>
  );
  return wrapClassName ? <div ref={boxRef} className={wrapClassName}>{body}</div> : body;
}
