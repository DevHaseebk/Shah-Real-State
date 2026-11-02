import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { Icon } from "../ui/Icon";

/** The closing band on deep-emerald: wordmark, quick links, areas, contact, socials and the copyright. */
export function SiteFooter({ data: d }: { data: SiteData }) {
  return (
    <footer className="bs-dark bs-footer">
      <div className="bs-wrap">
        <div className="bs-footer__grid">
          <div className="bs-footer__brand">
            {/* A plain link: the navbar scrolls hash links on the home page. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="bs-wordmark bs-wordmark--footer" href="/#top" data-long={d.name.length > 18 ? "" : undefined}>
              <span className="bs-logo-mark" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element -- original client logo */}
                <img src="/brand/shah-real-estate-logo.png" alt="" />
              </span>
              <span>{d.name}</span>
            </a>
            <p>Residential and commercial property services in {d.city} since {d.since}.</p>
            <div className="bs-social">
              {d.socials.map((s) => (
                <a key={s.name} href={s.href} {...EXT}><Icon name="link" /><span>{s.name}</span></a>
              ))}
            </div>
          </div>
          <div className="bs-footer__links">
            <h3>Quick links</h3>
            <ul>{d.nav.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div className="bs-footer__areas">
            <h3>Areas</h3>
            <ul>
              {d.areas.map((a) => (
                <li key={a.name}><a href={waHref(d, `${hi(d)}I’m interested in ${a.name}.`)} {...EXT}>{a.name}</a></li>
              ))}
            </ul>
          </div>
          <div className="bs-footer__contact">
            <h3>Contact</h3>
            <ul>
              <li><span>{d.address}</span></li>
              <li><span>{d.hours}</span></li>
              <li><a href={d.phoneHref}>{d.phone}</a></li>
              {d.email && <li><a href={`mailto:${d.email}`}>{d.email}</a></li>}
            </ul>
          </div>
        </div>
        <div className="bs-footer__base"><p>© 2026 {d.name}. All rights reserved.</p><p className="bs-developer-credit">Built by <a href="https://haseeb-portfolio-lemon.vercel.app/" target="_blank" rel="noopener noreferrer">Muhammad Haseeb <span aria-hidden="true">↗</span></a></p></div>
      </div>
    </footer>
  );
}
