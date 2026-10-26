import { Fragment } from "react";
import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { InlineScript } from "../behaviour/InlineScript";
import { CallButton, WaButton } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { PhotoSlot } from "../ui/PhotoSlot";

/* Gives each word of the name its line number (--i), so the name rises line by line, 90ms apart.
   Measures just after first paint, when layout is already done (well before the rise at 900ms), and again
   once the fonts have loaded. Measuring while parsing would force an extra layout of the hero. */
const LINE_INDEX = `(function(){var h=document.currentScript.parentNode.querySelector(".bs-hero__name");if(!h)return;function m(){var t=null,i=-1;Array.prototype.forEach.call(h.children,function(s){if(t===null||Math.abs(s.offsetTop-t)>4){i++;t=s.offsetTop}s.firstElementChild.style.setProperty("--i",i)})}requestAnimationFrame(function(){setTimeout(m)});if(document.fonts)document.fonts.ready.then(m)})()`;

/**
 * The ochre 40 by 90 ft plot that draws on deep-emerald before the photo opens from it. The box is sized
 * in CSS (.bs-plot); nested <svg x="100%"> elements place the right-hand dimension marks in pixels.
 */
function Plot() {
  return (
    <div className="bs-hero__plan" aria-hidden="true">
      <div className="bs-plot">
        <svg>
          <rect className="bs-plan__outline" pathLength={1} x="0.5" y="0.5" width="100%" height="100%" />
          <g className="bs-plan__dims">
            <g opacity=".55">
              <line x1="0" y1="-5" x2="0" y2="-31" />
              <svg x="100%" overflow="visible"><line x1="0" y1="-5" x2="0" y2="-31" /><line x1="5" y1="0" x2="31" y2="0" /></svg>
              <svg x="100%" y="100%" overflow="visible"><line x1="5" y1="0" x2="31" y2="0" /></svg>
            </g>
            <line x1="-4" y1="-24" x2="100%" y2="-24" />
            <line x1="-5" y1="-19" x2="5" y2="-29" />
            <svg x="100%" overflow="visible">
              <line x1="0" y1="-24" x2="4" y2="-24" />
              <line x1="-5" y1="-19" x2="5" y2="-29" />
              <line x1="24" y1="-4" x2="24" y2="100%" />
              <line x1="19" y1="5" x2="29" y2="-5" />
            </svg>
            <svg x="100%" y="100%" overflow="visible">
              <line x1="24" y1="0" x2="24" y2="4" />
              <line x1="19" y1="5" x2="29" y2="-5" />
            </svg>
          </g>
          <g className="bs-plan__labels">
            <text x="50%" y="-34" textAnchor="middle">40 ft</text>
            <svg x="100%" y="50%" overflow="visible"><text x="34" y="4">90 ft</text></svg>
            <svg y="50%" overflow="visible"><text x="50%" y="4" textAnchor="middle">400 sq yd</text></svg>
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Full-height opening: the agency name as H1 over a full-bleed photo, the promise, WhatsApp and Call, trust line and intent chips. */
export function HeroSection({ data: d }: { data: SiteData }) {
  const words = d.name.split(/\s+/).filter(Boolean);
  const hero = d.photos?.hero;
  return (
    <section className="bs-hero" id="top" aria-label={d.name}>
      <div className="bs-hero__media">
        {hero ? (
          <div className="bs-photo">
            {/* The wide crop from 1024px. A viewport query, not the site's container query: <source> only
                takes media queries, and on the live page the container is the viewport. */}
            <picture>
              {hero.landscape.avif && <source media="(min-width: 1024px)" type="image/avif" srcSet={hero.landscape.avif} sizes="100vw" />}
              <source media="(min-width: 1024px)" type="image/webp" srcSet={hero.landscape.webp} sizes="100vw" />
              {hero.portrait.avif && <source type="image/avif" srcSet={hero.portrait.avif} sizes="100vw" />}
              <img src={hero.portrait.webp.split(" ")[0]} srcSet={hero.portrait.webp} sizes="100vw" alt={hero.alt} fetchPriority="high" decoding="async" />
            </picture>
          </div>
        ) : (
          <>
            <PhotoSlot priority scene="villa" className="bs-photo--portrait" alt="A finished family home in Karachi at golden hour" note="Portrait crop. DHA bungalow, white stone facade, flat roof, wood slats, steel gate, palms, golden hour" />
            <PhotoSlot priority scene="villa" className="bs-photo--landscape" alt="A finished family home in Karachi at golden hour" note="Landscape crop. Same home, wider: boundary wall, bougainvillea, palms, golden-hour light" />
          </>
        )}
      </div>
      <div className="bs-hero__scrim" />
      <Plot />
      <div className="bs-hero__content">
        <div className="bs-wrap">
          <h1 className="bs-hero__name" aria-label={d.name}>
            {words.map((w, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="bs-line"><span suppressHydrationWarning>{w}</span></span>
              </Fragment>
            ))}
          </h1>
          <p className="bs-hero__line bs-hero__fade">{d.heroLine}</p>
          <div className="bs-hero__ctas bs-hero__fade">
            <WaButton data={d} />
            <CallButton data={d} />
          </div>
          <p className="bs-hero__trust bs-hero__fade">
            <Icon name="star" />
            <span>Rated {d.rating.score} by {d.rating.count} clients</span>
          </p>
          <div className="bs-intent bs-hero__fade" role="group" aria-label="I want to">
            <span className="bs-intent__label">I want to:</span>
            <div className="bs-intent__chips">
              {d.intents.map((it) => (
                <a key={it.label} className="bs-chip" href={waHref(d, hi(d) + it.msg)} {...EXT}>{it.label}</a>
              ))}
            </div>
          </div>
          <InlineScript html={LINE_INDEX} />
        </div>
      </div>
    </section>
  );
}
