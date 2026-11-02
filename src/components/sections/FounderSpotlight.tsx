import type { SiteData } from "@/content/types";
import { hi } from "@/lib/contact";
import { UnmaskGroup } from "../behaviour/UnmaskGroup";
import { CallButton, WaButton } from "../ui/Button";
import { Icon } from "../ui/Icon";

/** The founder on deep-emerald: portrait in ochre corner ticks, quote in Newsreader Italic, credentials and contact. */
export function FounderSpotlight({ data: d }: { data: SiteData }) {
  const f = d.founder;
  return (
    <section className="bs-section bs-dark" id="founder" aria-labelledby="bs-founder-h">
      <div className="bs-wrap bs-founder__grid">
        <div className="bs-founder__media">
          {f.src ? (
            <UnmaskGroup className="bs-frame">
              <span className="bs-frame__tick bs-frame__tick--tl" />
              <span className="bs-frame__tick bs-frame__tick--tr" />
              <span className="bs-frame__tick bs-frame__tick--bl" />
              <span className="bs-frame__tick bs-frame__tick--br" />
              {/* eslint-disable-next-line @next/next/no-img-element -- managed content photo */}
              <img className="bs-founder__portrait" src={f.src} alt={`Portrait of ${f.name}`} />
            </UnmaskGroup>
          ) : (
            <div className="bs-founder__brandmark">
              {/* eslint-disable-next-line @next/next/no-img-element -- original client logo */}
              <img src="/brand/shah-real-estate-logo.png" alt="Shah Real Estate logo" />
            </div>
          )}
        </div>
        <div className="bs-founder__text">
          <h2 className="bs-h2" id="bs-founder-h">{f.name}</h2>
          <p className="bs-founder__role bs-muted">{f.role}</p>
          {f.quote && <blockquote className="bs-founder__quote"><p>“{f.quote}”</p></blockquote>}
          <p className="bs-founder__story bs-body">{f.story}</p>
          {f.credentials.length > 0 && <ul className="bs-creds">
            {f.credentials.map((c) => <li key={c}><Icon name="check" /><span>{c}</span></li>)}
          </ul>}
          <div className="bs-btnrow">
            <WaButton data={d} msg={`${hi(d)}I’d like to speak to ${f.name}.`} label="WhatsApp the agency" />
            <CallButton data={d} label="Call our office" />
          </div>
        </div>
      </div>
    </section>
  );
}
