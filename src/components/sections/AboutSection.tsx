import type { IconName, SiteData } from "@/content/types";
import { UnmaskGroup } from "../behaviour/UnmaskGroup";
import { Icon } from "../ui/Icon";
import { PhotoSlot } from "../ui/PhotoSlot";

const COMMIT_ICONS: IconName[] = ["shield", "person", "sign"];

/** Who the agency is: heading, one paragraph, three commitments, and two photos that unmask on entry. */
export function AboutSection({ data: d }: { data: SiteData }) {
  const a = d.about;
  return (
    <section className="bs-section" id="about" aria-labelledby="bs-about-h">
      <div className="bs-wrap bs-about__grid">
        <div className="bs-about__text">
          <h2 className="bs-h2" id="bs-about-h">{a.heading}</h2>
          <p className="bs-body">{a.text}</p>
          <ul className="bs-commit">
            {a.commitments.map((c, i) => (
              <li key={c}><Icon name={COMMIT_ICONS[i % 3]} /><span>{c}</span></li>
            ))}
          </ul>
        </div>
        <UnmaskGroup className="bs-about__media">
          <PhotoSlot scene="site" ratio="4 / 5" className="bs-unmask" alt="An advisor walking clients through a plot" note="Advisor with a family at a DHA plot, professional dress, afternoon light" {...d.photos?.aboutSite} />
          <PhotoSlot scene="interior" ratio="3 / 4" className="bs-unmask" alt="Interior of a finished home" note="Finished home interior, warm wood, stone floor, large window" {...d.photos?.aboutInterior} />
        </UnmaskGroup>
      </div>
    </section>
  );
}
