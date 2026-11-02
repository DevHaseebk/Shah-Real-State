import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { Carousel } from "../behaviour/Carousel";
import { Icon } from "../ui/Icon";
import { PhotoSlot } from "../ui/PhotoSlot";

/** Six advisor cards. A snap carousel on phones, 2.3 cards at 768, a 3 by 2 grid on desktop. */
export function TeamSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section" id="team" aria-labelledby="bs-team-h">
      <div className="bs-wrap">
        <div className="bs-head"><h2 className="bs-h2" id="bs-team-h">Your advisors</h2></div>
        <Carousel className="bs-team" label="Advisors, swipe for more">
          {d.team.map((m) => (
            <li key={m.name} className="bs-card">
              <PhotoSlot src={m.src} scene="portrait" look={m.look} tint={m.tint} ratio="4 / 5" alt={`Portrait of ${m.name}`} note={`Portrait of ${m.name}, 4:5, professional dress, office light`} />
              <div className="bs-member__body">
                <div>
                  <h3 className="bs-h3">{m.name}</h3>
                  <p className="bs-member__role">{m.role}</p>
                  <p className="bs-member__meta">
                    {m.areas && <>{m.areas}<br /></>}
                    {m.langs}
                  </p>
                </div>
                {/* Their own number when they have one; otherwise the agency's, and the message names them. */}
                <a className="bs-iconbtn bs-iconbtn--wa" href={waHref({ whatsapp: m.whatsapp ?? d.whatsapp }, `${hi(d)}I’d like to speak to ${m.name}.`)} {...EXT} aria-label={`WhatsApp ${m.name}`}>
                  <Icon name="chat" />
                </a>
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
