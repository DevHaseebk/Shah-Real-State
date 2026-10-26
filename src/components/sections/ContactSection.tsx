import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { ContactForm } from "../behaviour/ContactForm";
import { Icon } from "../ui/Icon";

/** The enquiry form beside the office details, directions and the hiring line. */
export function ContactSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section" id="contact" aria-labelledby="bs-contact-h" style={{ paddingTop: 0 }}>
      <div className="bs-wrap">
        <div className="bs-head">
          <h2 className="bs-h2" id="bs-contact-h">Tell us what you’re looking for</h2>
          <p className="bs-muted">We reply on WhatsApp during office hours.</p>
        </div>
        <div className="bs-contact__grid">
          <div className="bs-contact__form">
            <ContactForm name={d.name} whatsapp={d.whatsapp} intents={d.intents.map((i) => i.label)} areas={d.areas.map((a) => a.name)} />
          </div>
          <div className="bs-contact__info">
            <ul className="bs-info">
              <li><Icon name="pin" /><span>{d.address}</span></li>
              <li><Icon name="clock" /><span>{d.hours}</span></li>
              <li><Icon name="phone" /><a href={d.phoneHref}>{d.phone}</a></li>
              {d.email && <li><Icon name="mail" /><a href={`mailto:${d.email}`}>{d.email}</a></li>}
            </ul>
            <a className="bs-map-link" href={d.mapUrl} {...EXT} aria-label={`Get directions to ${d.name} in Google Maps`}>
              <span className="bs-map-link__icon"><Icon name="pin" /></span>
              <span className="bs-map-link__copy">
                <strong>Visit our office</strong>
                <span>{d.address}</span>
                <span className="bs-map-link__action">Get directions in Google Maps</span>
              </span>
            </a>
            <p className="bs-hiring">
              We’re hiring property consultants.{" "}
              <a href={waHref(d, `${hi(d)}I’d like to apply as a property consultant. I’ll send my CV here.`)} {...EXT}>Send your CV on WhatsApp.</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
