import type { PropertyMeta, PublicProperty } from "@/content/types";

/** "PKR 4.5 crore", "PKR 85 lakh", "PKR 45,000": how Karachi reads prices. */
export function pkr(n: number) {
  const trim = (x: number) => (Math.round(x * 100) / 100).toLocaleString("en-US");
  if (n >= 1e7) return `PKR ${trim(n / 1e7)} crore`;
  if (n >= 1e5) return `PKR ${trim(n / 1e5)} lakh`;
  return `PKR ${n.toLocaleString("en-US")}`;
}

export function priceLabel(p: Pick<PublicProperty, "price" | "purpose">) {
  if (p.price == null) return "Price on request";
  return p.purpose === "rent" ? `${pkr(p.price)} a month` : pkr(p.price);
}

/** A label from the API's option lists, or the key made readable when the list is not loaded. */
export function label(map: Record<string, string> | undefined, key: string | null) {
  if (!key) return "";
  return map?.[key] ?? key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
}

export function typeLabel(meta: PropertyMeta | null, type: string) {
  return meta?.types[type]?.label ?? label(undefined, type);
}

export function sizeLabel(meta: PropertyMeta | null, p: Pick<PublicProperty, "size" | "sizeUnit">) {
  return p.size ? `${p.size.toLocaleString("en-US")} ${label(meta?.sizeUnits, p.sizeUnit)}` : null;
}

/** The short facts shown on a card: size, bedrooms, bathrooms. */
export function keyFacts(meta: PropertyMeta | null, p: PublicProperty) {
  return [
    sizeLabel(meta, p),
    p.bedrooms ? `${p.bedrooms} bed${p.bedrooms > 1 ? "s" : ""}` : null,
    p.bathrooms ? `${p.bathrooms} bath${p.bathrooms > 1 ? "s" : ""}` : null,
  ].filter((x): x is string => Boolean(x));
}

export const where = (p: Pick<PublicProperty, "area" | "subArea">) => (p.subArea ? `${p.subArea}, ${p.area}` : p.area);

/** The prefilled WhatsApp message for a listing: the agency greeting, which listing, and a link to it. */
export function enquiryMessage(agency: string, p: Pick<PublicProperty, "title" | "refCode" | "slug">, siteUrl: string) {
  return `Hi ${agency}, I’m interested in ${p.title} (${p.refCode}).${siteUrl ? ` ${siteUrl}/properties/${p.slug}` : ""}`;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
