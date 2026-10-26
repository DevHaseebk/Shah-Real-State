import type { SiteData } from "@/content/types";
import { hi } from "@/lib/contact";
import { UnmaskGroup } from "../behaviour/UnmaskGroup";
import { WaButton } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { PhotoSlot } from "../ui/PhotoSlot";

/** For buyers abroad: heading, three points, the overseas desk button and a photo that unmasks. */
export function OverseasBand({ data: d }: { data: SiteData }) {
  const o = d.overseas;
  return (
    <section className="bs-section bs-raised" id="overseas" aria-labelledby="bs-os-h">
      <div className="bs-wrap bs-overseas__grid">
        <div className="bs-overseas__text">
          <h2 className="bs-h2" id="bs-os-h">{o.heading}</h2>
          <ul className="bs-points">
            {o.points.map((p) => <li key={p.text}><Icon name={p.icon} /><span>{p.text}</span></li>)}
          </ul>
          <WaButton data={d} msg={`${hi(d)}I live abroad and want to talk to your overseas desk.`} label="Talk to our overseas desk" />
        </div>
        <UnmaskGroup className="bs-overseas__media">
          <PhotoSlot scene="call" ratio="4 / 3" className="bs-unmask" alt="A client abroad on a video visit of a Karachi home" note="Client abroad on a video call, the Karachi home on screen, evening light" {...d.photos?.overseas} />
        </UnmaskGroup>
      </div>
    </section>
  );
}
