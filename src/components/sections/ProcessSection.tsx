import type { SiteData } from "@/content/types";
import { ProcessSteps } from "../behaviour/ProcessSteps";

/** Four numbered steps on a vertical plan line. Share the team's spacing when advisors are present. */
export function ProcessSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section" id="process" aria-labelledby="bs-proc-h" style={d.team.length ? { paddingTop: 0 } : undefined}>
      <div className="bs-wrap bs-process__grid">
        <div className="bs-head bs-process__head"><h2 className="bs-h2" id="bs-proc-h">From first message to keys</h2></div>
        <ProcessSteps>
          {d.process.map((s, i) => (
            <li key={s.title} className="bs-step">
              <span className="bs-step__num" aria-hidden="true">{i + 1}</span>
              <h3 className="bs-h3"><span className="bs-sr">Step {i + 1}: </span>{s.title}</h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ProcessSteps>
      </div>
    </section>
  );
}
