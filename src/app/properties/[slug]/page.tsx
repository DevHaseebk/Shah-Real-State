import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Carousel } from "@/components/behaviour/Carousel";
import { TrackProperty } from "@/components/behaviour/TrackProperty";
import { PageShell } from "@/components/sections/PageShell";
import { InvestmentPlanSection } from "@/components/sections/InvestmentPlanSection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PropertyCard } from "@/components/ui/PropertyCard";
import type { PropertyMeta, PublicProperty } from "@/content/types";
import { getMeta, getProperty, getPropertySlugs, getSiteData } from "@/lib/api";
import { EXT, waHref } from "@/lib/contact";
import { cl, srcSet } from "@/lib/images";
import { enquiryMessage, label, pkr, priceLabel, SITE_URL, sizeLabel, typeLabel, where } from "@/lib/property";

/* Known slugs are enumerated at build time; listing content is fetched and cached on request.
   A placeholder keeps the build valid before the first listing exists. */
export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return (slugs.length ? slugs : ["no-listings-yet"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [data, site] = await Promise.all([getProperty(slug), getSiteData()]);
  if (!data) return { title: `Property not found | ${site.name}` };
  const p = data.property;
  const cover = p.images[0]?.url;
  const description = `${priceLabel(p)}. ${p.description.slice(0, 150)}`.trim();
  return {
    title: `${p.title} | ${site.name}`,
    description,
    alternates: SITE_URL ? { canonical: `${SITE_URL}/properties/${p.slug}` } : undefined,
    openGraph: { title: p.title, description, images: cover ? [{ url: cl(cover, "c_fill,g_auto,w_1200,h_630"), width: 1200, height: 630 }] : undefined },
  };
}

export default function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  return <Suspense fallback={<main className="bs-site bs-wrap" aria-live="polite">Loading property…</main>}><PropertyContent params={params} /></Suspense>;
}

async function PropertyContent({ params }: Pick<PageProps<"/properties/[slug]">, "params">) {
  const { slug } = await params;
  const [data, site, meta] = await Promise.all([getProperty(slug), getSiteData(), getMeta()]);
  if (!data) notFound();
  const { property: p, related } = data;
  const msg = enquiryMessage(site.name, p, SITE_URL);
  const closed = p.status !== "published";

  return (
    <PageShell site={site} msg={msg}>
      <TrackProperty slug={p.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(p, site.name).replace(/</g, "\\u003c") }} />
      <section className="bs-section bs-subhead" aria-labelledby="bs-prop-h">
        <div className="bs-wrap">
          <ol className="bs-crumbs">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/properties">Properties</Link></li>
            <li><Link href={`/properties?area=${encodeURIComponent(p.area)}`}>{p.area}</Link></li>
          </ol>

          {p.images.length > 0 && (
            <>
              <Carousel className="bs-gallery" label={`Photos of ${p.title}, swipe for more`}>
                {p.images.map((img, i) => (
                  <li key={img.url}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary sizes and formats it */}
                    <img src={img.url} srcSet={srcSet(img.url, "16:10", [640, 1000, 1600])} sizes="(min-width: 1024px) 740px, (min-width: 768px) 80vw, 100vw"
                      alt={`${img.alt}, photo ${i + 1} of ${p.images.length}`} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
                  </li>
                ))}
              </Carousel>
              <p className="bs-gallery__count">{p.images.length} photo{p.images.length > 1 ? "s" : ""}</p>
            </>
          )}

          <div className="bs-listing">
            <div className="bs-listing__main">
              {closed && <p className="bs-closed">This property has been {p.status}. Ask us about similar ones.</p>}
              <h1 className="bs-listing__title" id="bs-prop-h">{p.title}</h1>
              <p className="bs-listing__price">{priceLabel(p)}</p>
              <p className="bs-listing__where">{typeLabel(meta, p.type)} {p.purpose === "rent" ? "for rent" : "for sale"} in {where(p)}{p.address ? `. ${p.address}` : ""}</p>

              <h2>Details</h2>
              <dl className="bs-specs">
                {specs(meta, p).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>

              {p.features.length > 0 && (
                <>
                  <h2>Features</h2>
                  <ul className="bs-features">
                    {p.features.map((f) => <li key={f}><Icon name="check" /><span>{label(meta?.features, f)}</span></li>)}
                  </ul>
                </>
              )}

              {p.description && (
                <>
                  <h2>About this property</h2>
                  <p className="bs-desc bs-body">{p.description}</p>
                </>
              )}
              {p.videoUrl && <p style={{ marginTop: 16 }}><a className="bs-link" href={p.videoUrl} {...EXT}>Watch the video tour</a></p>}
            </div>

            <aside className="bs-listing__side" aria-label="Contact about this property">
              <div className="bs-agent">
                <div className="bs-agent__who">
                  <span className="bs-avatar" aria-hidden="true">S</span>
                  <p><strong>{site.name}</strong>Property enquiries</p>
                </div>
                <a className="bs-btn bs-btn--primary" href={waHref(site, msg)} {...EXT} data-enquiry>
                  <Icon name="chat" /><span>Ask on WhatsApp</span>
                </a>
                <a className="bs-btn bs-btn--secondary" href={site.phoneHref} data-enquiry>
                  <Icon name="phone" /><span>Call {site.phoneLocal}</span>
                </a>
                <p className="bs-agent__ref">Reference {p.refCode}. Quote it when you call.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <InvestmentPlanSection site={site} property={`${p.title} (${p.refCode})`} />

      {related.length > 0 && (
        <section className="bs-section" style={{ paddingTop: 0 }} aria-labelledby="bs-related-h">
          <div className="bs-wrap">
            <div className="bs-head"><h2 className="bs-h2" id="bs-related-h">Similar properties</h2></div>
            <ul className="bs-props">
              {related.map((r) => <li key={r.id}><PropertyCard p={r} meta={meta} /></li>)}
            </ul>
            <div className="bs-props-more"><Button href="/properties" label="See all properties" variant="secondary" /></div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

/** The detail rows that have a value, in reading order. */
function specs(meta: PropertyMeta | null, p: PublicProperty): [string, string][] {
  const rows: [string, string | null | false][] = [
    ["Type", typeLabel(meta, p.type)],
    ["Purpose", p.purpose === "rent" ? "For rent" : "For sale"],
    ["Size", sizeLabel(meta, p)],
    ["Bedrooms", p.bedrooms != null && String(p.bedrooms)],
    ["Bathrooms", p.bathrooms != null && String(p.bathrooms)],
    ["Kitchens", p.kitchens != null && String(p.kitchens)],
    ["Storeys", p.floors != null && String(p.floors)],
    ["Floor", p.floorNumber != null && (p.floorNumber === 0 ? "Ground" : String(p.floorNumber))],
    ["Parking", p.parkingSpaces != null && String(p.parkingSpaces)],
    ["Year built", p.yearBuilt != null && String(p.yearBuilt)],
    ["Facing", label(meta?.facing, p.facing)],
    ["Furnishing", label(meta?.furnishing, p.furnishing)],
    ["Construction", label(meta?.construction, p.construction)],
    ["Documents", label(meta?.documents, p.documents)],
    ["Advance", p.advance != null && pkr(p.advance)],
    ["Maintenance", p.maintenance != null && `${pkr(p.maintenance)} a month`],
    ["Bank loan", p.bankLoan && "Available"],
    ["Reference", p.refCode],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

function jsonLd(p: PublicProperty, agency: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.description || undefined,
    url: SITE_URL ? `${SITE_URL}/properties/${p.slug}` : undefined,
    image: p.images.slice(0, 5).map((i) => i.url),
    datePosted: p.publishedAt ?? undefined,
    offers: p.price != null ? { "@type": "Offer", price: p.price, priceCurrency: "PKR" } : undefined,
    offeredBy: { "@type": "RealEstateAgent", name: agency },
  });
}
