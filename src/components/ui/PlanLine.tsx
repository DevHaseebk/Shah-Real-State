/** The drafting signature: a 1px line with 45-degree end ticks. Hero plot, stats and process line only. */
export function PlanLine({ label, tone }: { label?: string; tone?: "light" }) {
  return (
    <span className={`bs-measure${tone === "light" ? " bs-measure--light" : ""}`} aria-hidden="true">
      <span className="bs-measure__bar" />
      {label && <span className="bs-measure__label">{label}</span>}
    </span>
  );
}
