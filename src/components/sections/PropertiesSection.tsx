import type { PropertyList, PropertyMeta } from "@/content/types";
import { Button } from "../ui/Button";
import { PropertyCard } from "../ui/PropertyCard";
import { PropertyCarousel } from "../behaviour/PropertyCarousel";

/** A short preview directly after the hero, with a permanent route to the full catalogue. */
export function PropertiesSection({ list, meta, city }: { list: PropertyList; meta: PropertyMeta | null; city: string }) {
  if (list.items.length === 0) return null;
  return (
    <section className="bs-section" id="properties" aria-labelledby="bs-props-h">
      <div className="bs-wrap">
        <div className="bs-head">
          <h2 className="bs-h2" id="bs-props-h">Properties on offer in {city}</h2>
          <p className="bs-muted">Explore homes, apartments and plots. Open a listing for photos, details and pricing.</p>
        </div>
        <PropertyCarousel>
          {list.items.map((p) => <li key={p.id}><PropertyCard p={p} meta={meta} /></li>)}
        </PropertyCarousel>
        <div className="bs-props-more">
          <Button href="/properties" label="View all properties" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
