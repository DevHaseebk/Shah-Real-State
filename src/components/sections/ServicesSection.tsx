import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { Icon } from "../ui/Icon";

/** Six services with "Ask about this". Follows AboutSection on the same ground, so no top padding. */
export function ServicesSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section" id="services" aria-labelledby="bs-svc-h" style={{ paddingTop: 0 }}>
      <div className="bs-wrap">
        <div className="bs-head"><h2 className="bs-h2" id="bs-svc-h">What we can help with</h2></div>
        <ul className="bs-svc-list">
          {d.services.map((s) => (
            <li key={s.name} className="bs-svc">
              <span className="bs-svc__icon"><Icon name={s.icon} /></span>
              <h3 className="bs-h3">{s.name}</h3>
              <p className="bs-muted">{s.line}</p>
              <a className="bs-link" href={waHref(d, `${hi(d)}I’d like to ask about: ${s.name}.`)} {...EXT} aria-label={`Ask about this: ${s.name}, on WhatsApp`}>
                Ask about this
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
