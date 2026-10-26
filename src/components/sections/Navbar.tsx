"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SiteData } from "@/content/types";
import { reducedMotion } from "@/hooks/motion";
import { usePastHero } from "@/hooks/usePastHero";
import { CallButton, type Contact, WaButton } from "../ui/Button";
import { Icon } from "../ui/Icon";

type NavbarProps = { data: Contact & Pick<SiteData, "nav"> };

function Wordmark({ name }: { name: string }) {
  return (
    <a className="bs-wordmark" href="#top" data-long={name.length > 18 ? "" : undefined}>
      {name}
    </a>
  );
}

/**
 * Fixed top bar: transparent over the hero, solid plan-mist once the hero has scrolled past. Phones get
 * a full-screen menu sheet with a focus trap. Also owns smooth scrolling for every #anchor link on the page.
 */
export function Navbar({ data }: NavbarProps) {
  const past = usePastHero();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const opened = useRef(false);

  // The layout's inline script sets bs-js before paint; React's dev remount clears <html> attributes.
  useLayoutEffect(() => { document.documentElement.classList.add("bs-js"); }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      opened.current = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 40);
      return () => clearTimeout(t);
    }
    if (opened.current) lastFocus.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const f = sheetRef.current.querySelectorAll<HTMLElement>("a, button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('.bs-site a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const href = a.getAttribute("href")!;
      if (href.length < 2) return;
      setOpen(false);
      document.documentElement.style.overflow = "";
      document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <header className={`bs-nav${past ? " is-solid" : ""}`}>
        <div className="bs-wrap bs-nav__in">
          <Wordmark name={data.name} />
          <nav aria-label="Main">
            <ul className="bs-nav__links">
              {data.nav.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
          <WaButton data={data} className="bs-nav__cta" />
          <button
            className="bs-iconbtn bs-nav__menu"
            type="button"
            aria-expanded={open}
            aria-controls="bs-sheet"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <div
        ref={sheetRef}
        className={`bs-sheet${open ? " is-open" : ""}`}
        id="bs-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="bs-sheet__top">
          <Wordmark name={data.name} />
          <button ref={closeRef} className="bs-iconbtn" type="button" aria-label="Close menu" style={{ marginRight: -10 }} onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <ul className="bs-sheet__links">
          {data.nav.map((l, i) => (
            <li key={l.href} style={{ "--i": i } as CSSProperties}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="bs-sheet__actions">
          <CallButton data={data} label="Call" />
          <WaButton data={data} label="WhatsApp" />
        </div>
      </div>
    </>
  );
}
