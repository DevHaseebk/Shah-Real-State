import Link from "next/link";
import type { PropertyMeta, PublicProperty } from "@/content/types";
import { srcSet } from "@/lib/images";
import { keyFacts, priceLabel, typeLabel, where } from "@/lib/property";

/** A listing in a grid. The whole card links to the property page. */
export function PropertyCard({ p, meta, priority }: { p: PublicProperty; meta: PropertyMeta | null; priority?: boolean }) {
  const cover = p.images[0];
  return (
    <article className="bs-prop">
      <div className="bs-prop__img">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element -- Cloudinary sizes and formats it
          <img
            src={cover.url}
            srcSet={srcSet(cover.url, "4:3", [400, 640, 900])}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}
        <div className="bs-prop__tags">
          <span className="bs-tag">{p.purpose === "rent" ? "For rent" : "For sale"}</span>
          {p.title.startsWith("[Demo]") && <span className="bs-tag bs-tag--dark">Demo</span>}
          {p.status !== "published" && <span className="bs-tag bs-tag--dark">{p.status === "sold" ? "Sold" : "Rented"}</span>}
        </div>
      </div>
      <div className="bs-prop__body">
        <p className="bs-prop__price">{priceLabel(p)}</p>
        <h3 className="bs-prop__title"><Link href={`/properties/${p.slug}`}>{p.title}</Link></h3>
        <p className="bs-prop__where">{typeLabel(meta, p.type)} in {where(p)}</p>
        <ul className="bs-facts">
          {keyFacts(meta, p).map((f) => <li key={f}>{f}</li>)}
          {p.bankLoan && <li>Bank loan available</li>}
        </ul>
        <span className="bs-prop__more" aria-hidden="true">View property <span>↗</span></span>
      </div>
    </article>
  );
}
