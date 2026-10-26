"use client";

import { useState } from "react";
import type { SiteData } from "@/content/types";

/** An accordion of short answers. Several can be open at once; closed answers are inert. */
export function FaqSection({ data }: { data: Pick<SiteData, "faq"> }) {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(i)) next.add(i);
      return next;
    });

  return (
    <section className="bs-section" id="faq" aria-labelledby="bs-faq-h" style={{ paddingTop: 0 }}>
      <div className="bs-wrap bs-faq__grid">
        <div className="bs-head"><h2 className="bs-h2" id="bs-faq-h">Questions people ask us</h2></div>
        <div className="bs-faq">
          {data.faq.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={f.q} className={`bs-faq__item${isOpen ? " is-open" : ""}`}>
                <h3 style={{ font: "inherit", margin: 0 }}>
                  <button className="bs-faq__q" type="button" id={`bs-faq-q${i}`} aria-expanded={isOpen} aria-controls={`bs-faq-a${i}`} onClick={() => toggle(i)}>
                    <span>{f.q}</span>
                    <span className="bs-pm" aria-hidden="true" />
                  </button>
                </h3>
                <div className="bs-faq__a" id={`bs-faq-a${i}`} role="region" aria-labelledby={`bs-faq-q${i}`} inert={!isOpen}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
