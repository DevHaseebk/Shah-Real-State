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

/** Keeps the listing section's shape while the live catalogue is loading. */
export function PropertiesSkeleton({ city }: { city: string }) {
  return (
    <section className="bs-section bs-props-loading" aria-busy="true" aria-label="Properties on offer">
      <div className="bs-wrap">
        <div className="bs-head">
          <h2 className="bs-h2">Properties on offer in {city}</h2>
          <p className="bs-muted">Explore homes, apartments and plots. Open a listing for photos, details and pricing.</p>
        </div>
        <p className="bs-sr" role="status">Loading available properties…</p>
        <div className="bs-props-loading__cards" aria-hidden="true">
          {[0, 1, 2].map((item) => <PropertyCardSkeleton key={item} />)}
        </div>
        <div className="bs-progress" aria-hidden="true" />
      </div>
    </section>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bs-prop bs-prop-skeleton">
      <div className="bs-prop__img bs-prop-skeleton__shine" />
      <div className="bs-prop__body">
        <span className="bs-prop-skeleton__line bs-prop-skeleton__line--price" />
        <span className="bs-prop-skeleton__line bs-prop-skeleton__line--title" />
        <span className="bs-prop-skeleton__line bs-prop-skeleton__line--where" />
        <span className="bs-prop-skeleton__line bs-prop-skeleton__line--facts" />
      </div>
    </div>
  );
}
