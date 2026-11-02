"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { useCarousel, stepBy } from "@/hooks/useCarousel";
import { useAutoplay } from "@/hooks/useAutoplay";

/** Server-rendered cards retain their links; only scrolling and controls hydrate. */
export function PropertyCarousel({ children }: { children: ReactNode }) {
  const id = useId();
  const list = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState({ first: 1, last: 1, total: 1, start: true, end: true });
  useCarousel(list, bar);
  useAutoplay(list, box, playing);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const update = () => {
      const cards = Array.from(el.children);
      const bounds = el.getBoundingClientRect();
      const visible = cards.map((card, i) => ({ rect: card.getBoundingClientRect(), i }))
        .filter(({ rect }) => rect.left >= bounds.left - 4 && rect.right <= bounds.right + 4);
      setPosition({ first: (visible[0]?.i ?? 0) + 1, last: (visible.at(-1)?.i ?? 0) + 1,
        total: cards.length, start: el.scrollLeft < 4, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4 });
    };
    const resize = new ResizeObserver(update);
    resize.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => { resize.disconnect(); el.removeEventListener("scroll", update); };
  }, []);

  return <div ref={box} className="bs-property-slider" role="region" aria-label="Property highlights" aria-roledescription="carousel">
    <ul id={id} ref={list} className="bs-carousel bs-props-slider" tabIndex={0} aria-label="Properties: use left and right arrow keys to browse">
      {children}
    </ul>
    <div className="bs-progress" aria-hidden="true"><span ref={bar} className="bs-progress__bar" /></div>
    <div className="bs-slider-controls">
      <p className="bs-muted">{position.first}–{position.last} of {position.total}</p>
      <div className="bs-slider-buttons">
        <button type="button" className="bs-slider-button" aria-controls={id} aria-pressed={!playing} onClick={() => setPlaying(v => !v)}>{playing ? "Pause" : "Play"}<span className="bs-sr"> automatic sliding</span></button>
        <button type="button" className="bs-slider-button" aria-label="Previous properties" aria-controls={id} disabled={position.start} onClick={() => { setPlaying(false); if (list.current) stepBy(list.current, -1); }}>←</button>
        <button type="button" className="bs-slider-button" aria-label="Next properties" aria-controls={id} disabled={position.end} onClick={() => { setPlaying(false); if (list.current) stepBy(list.current, 1); }}>→</button>
      </div>
    </div>
  </div>;
}
