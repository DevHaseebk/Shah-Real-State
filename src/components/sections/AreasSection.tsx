import type { SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { Carousel } from "../behaviour/Carousel";
import { PhotoSlot } from "../ui/PhotoSlot";

/** Eight area tiles, each opening WhatsApp. A snap carousel on phones, a 4 by 3 grid on desktop. */
export function AreasSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section bs-raised" id="areas" aria-labelledby="bs-areas-h">
      <div className="bs-wrap">
        <div className="bs-head"><h2 className="bs-h2" id="bs-areas-h">Where we work</h2></div>
        <Carousel className="bs-areas" label="Areas, swipe for more">
          {d.areas.map((a) => (
            <li key={a.name} className={`bs-area-cell${a.size ? ` bs-area--${a.size}` : ""}`}>
              <a className="bs-area" href={waHref(d, `${hi(d)}I’m interested in ${a.name}.`)} {...EXT}>
                <span className="bs-area__img">
                  <PhotoSlot src={a.src} scene={a.scene} noteTop alt={a.name} note={a.note} />
                </span>
                <span className="bs-area__txt">
                  <span className="bs-h3">{a.name}</span>
                  <p>{a.line}</p>
                </span>
              </a>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
