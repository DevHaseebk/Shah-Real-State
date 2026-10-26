import type { SiteData } from "@/content/types";
import { CountUpGrid } from "../behaviour/CountUpGrid";
import { PlanLine } from "../ui/PlanLine";

const fmt = (n: number) => n.toLocaleString("en-US");

/** The record in numbers on deep-emerald: four figures that count up once, each over a measured plan line. */
export function StatsBand({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section bs-dark bs-stats" id="stats" aria-labelledby="bs-stats-h">
      <div className="bs-wrap">
        <div className="bs-head"><h2 className="bs-h2" id="bs-stats-h">Our record in {d.city}</h2></div>
        <CountUpGrid>
          {d.stats.map((s) => (
            <div key={s.label} className="bs-stat">
              <span className="bs-stat__fig">
                <span className="bs-stat__num" aria-hidden="true">
                  {s.prefix && <span className="bs-stat__pre">{s.prefix}</span>}
                  <span className="bs-stat__val" data-to={s.value} suppressHydrationWarning>{fmt(s.value)}</span>
                  {s.suffix && <span>{s.suffix}</span>}
                </span>
                <PlanLine />
              </span>
              {/* Screen readers get each full figure as one phrase. */}
              <span className="bs-sr">{`${s.prefix ? `${s.prefix} ` : ""}${fmt(s.value)}${s.suffix ?? ""} ${s.label}`}</span>
              <span className="bs-stat__label" aria-hidden="true">{s.label}</span>
            </div>
          ))}
        </CountUpGrid>
      </div>
    </section>
  );
}
