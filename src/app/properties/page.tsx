import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyFilters } from "@/components/behaviour/PropertyFilters";
import { PageShell } from "@/components/sections/PageShell";
import { InvestmentPlanSection } from "@/components/sections/InvestmentPlanSection";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { PropertyCardSkeleton } from "@/components/sections/PropertiesSection";
import { getMeta, getProperties, getSiteData, hasApi, type ListQuery } from "@/lib/api";
import { hi, waHref } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `Properties for sale and rent in ${site.city} | ${site.name}`,
    description: `Browse houses, flats, portions, plots and shops in ${site.city} with ${site.name}.`,
  };
}

const KEYS = ["purpose", "type", "area", "beds", "maxPrice", "sort", "page"] as const;

export default function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  return <Suspense fallback={<main className="bs-site bs-wrap" aria-live="polite">Loading properties…</main>}><PropertiesContent searchParams={searchParams} /></Suspense>;
}

async function PropertiesContent({ searchParams }: Pick<PageProps<"/properties">, "searchParams">) {
  const site = await getSiteData();
  return (
    <PageShell site={site}>
      <section className="bs-section bs-subhead" aria-labelledby="bs-list-h">
        <div className="bs-wrap">
          <div className="bs-head"><h1 className="bs-h2" id="bs-list-h">Properties in {site.city}</h1></div>
          {/* The filters and results depend on the address, so they render per request; the rest is static. */}
          <Suspense fallback={<CatalogueSkeleton />}>
            {searchParams.then((sp) => <Results sp={sp} />)}
          </Suspense>
        </div>
      </section>
      <InvestmentPlanSection site={site} />
    </PageShell>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="bs-catalogue-loading" role="status" aria-busy="true">
      <span className="bs-sr">Loading properties…</span>
      <div className="bs-catalogue-loading__filters" aria-hidden="true">
        <span className="bs-prop-skeleton__line" />
        <span className="bs-prop-skeleton__line" />
        <span className="bs-prop-skeleton__line" />
      </div>
      <div className="bs-props-loading__cards" aria-hidden="true">
        {[0, 1, 2].map((item) => <PropertyCardSkeleton key={item} />)}
      </div>
    </div>
  );
}

async function Results({ sp }: { sp: Record<string, string | string[] | undefined> }) {
  const query: ListQuery = {};
  for (const k of KEYS) {
    const v = sp[k];
    if (typeof v === "string" && v.trim()) query[k] = v.trim().slice(0, 80);
  }
  const [site, list, meta] = await Promise.all([getSiteData(), getProperties(query), getMeta()]);
  const page = list.page;
  const pageHref = (n: number) => {
    const q = new URLSearchParams(Object.entries({ ...query, page: n > 1 ? String(n) : undefined }).filter(([, v]) => v) as [string, string][]);
    return `/properties${q.size ? `?${q}` : ""}`;
  };
  const filtered = Boolean(query.type || query.area || query.beds || query.maxPrice || query.purpose);

  return (
    <>
      <PropertyFilters key={JSON.stringify(query)} values={query} meta={meta} areas={list.facets?.areas ?? []} />
      {list.items.length === 0 ? (
        <div className="bs-empty">
          <p>{!hasApi ? "Listings are on their way." : filtered ? "No properties match these filters right now." : "No properties are listed right now."}</p>
          <p>Tell us what you are looking for and we will send you options on WhatsApp.</p>
          <p><Button href={waHref(site, `${hi(site)}I’m looking for a property. Can you help?`)} label="Chat on WhatsApp" icon="chat" external /></p>
        </div>
      ) : (
        <>
          <p className="bs-results-count" aria-live="polite">{list.total} {list.total === 1 ? "property" : "properties"}</p>
          <ul className="bs-props">
            {list.items.map((p, i) => <li key={p.id}><PropertyCard p={p} meta={meta} priority={i < 3} /></li>)}
          </ul>
          {list.pages > 1 && (
            <nav className="bs-pager" aria-label="Pages">
              {page > 1 && <a href={pageHref(page - 1)}>Previous</a>}
              {Array.from({ length: list.pages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === list.pages || Math.abs(n - page) <= 1)
                .map((n) => (n === page ? <span key={n} aria-current="page">{n}</span> : <a key={n} href={pageHref(n)}>{n}</a>))}
              {page < list.pages && <a href={pageHref(page + 1)}>Next</a>}
            </nav>
          )}
        </>
      )}
    </>
  );
}
