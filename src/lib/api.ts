import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { site as localSite } from "@/content/site";
import type { IconName, PropertyList, PropertyMeta, PublicProperty, SiteData } from "@/content/types";
import { cl, heroSet } from "./images";

/* The website reads its content and listings from the API (backend/). Responses are cached and refreshed
   when an admin saves (the API calls /api/revalidate with the tag), or at the latest after an hour.

   Without API_URL (local work on the design, or before the API is deployed) the site uses the content in
   src/content/site.ts and shows no listings. With API_URL set, a failing API raises an error instead of
   quietly falling back, so a cold or broken API never replaces real content with the demo copy. */

const API_URL = process.env.API_URL?.replace(/\/$/, "");
export const hasApi = Boolean(API_URL);

class NotFound extends Error {}

async function get<T>(path: string): Promise<T> {
  // Render's free plan sleeps when idle and takes up to a minute to wake: wait for it.
  const res = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(60_000), ...(path.startsWith("/api/public/properties") ? { cache: "no-store" as const } : {}) });
  if (res.status === 404) throw new NotFound(path);
  if (!res.ok) throw new Error(`API ${path} answered ${res.status}`);
  return res.json() as Promise<T>;
}

interface ApiImage { url: string; alt?: string }
interface ApiSite {
  content: {
    name: string; city: string; since: number; whatsapp: string; phone: string; phoneLocal: string; phoneHref: string;
    email: string; address: string; hours: string; mapUrl: string; rating: { score: string; count: number };
    heroLine: string; heroImage: ApiImage | null; heroImageMobile: ApiImage | null;
    intents: { label: string; msg: string }[];
    stats: { value: number; prefix?: string; suffix?: string; label: string }[];
    about: { heading: string; text: string; commitments: string[]; image: ApiImage | null; image2: ApiImage | null };
    services: { icon: IconName; name: string; line: string }[];
    areas: { name: string; line: string; size?: "big" | "wide"; image: ApiImage | null }[];
    founder: { visible: boolean; name: string; role: string; quote: string; story: string; credentials: string[]; photo: ApiImage | null; whatsapp: string };
    process: { title: string; line: string }[];
    overseas: { heading: string; points: { icon: IconName; text: string }[]; image: ApiImage | null };
    testimonials: { name: string; ctx: string; text: string }[];
    faq: { q: string; a: string }[];
    socials: { name: string; href: string }[];
  };
  team: { id: string; name: string; role: string; areas: string; languages: string; photo: ApiImage | null; whatsapp: string }[];
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** The API's content in the shape the sections read. A slot without an uploaded photo keeps the demo photo. */
function toSiteData({ content: c, team }: ApiSite): SiteData {
  const local = localSite;
  const photo = (img: ApiImage | null, ratio: string, w: number, alt: string) => (img ? { src: cl(img.url, `c_fill,g_auto,ar_${ratio},w_${w}`), alt: img.alt || alt } : undefined);
  const wide = c.heroImage;
  const tall = c.heroImageMobile ?? c.heroImage;
  return {
    ...local,
    name: c.name, city: c.city, since: c.since,
    whatsapp: c.whatsapp, phone: c.phone, phoneLocal: c.phoneLocal, phoneHref: c.phoneHref,
    email: c.email || undefined, address: c.address, hours: c.hours, mapUrl: c.mapUrl || local.mapUrl,
    rating: c.rating, heroLine: c.heroLine, intents: c.intents, stats: c.stats,
    about: { heading: c.about.heading, text: c.about.text, commitments: c.about.commitments },
    services: c.services,
    areas: c.areas.map((a) => {
      // Keep the demo photo and stand-in drawing of an area the admin has not given a photo yet.
      const demo = local.areas.find((x) => norm(x.name) === norm(a.name));
      return { name: a.name, line: a.line, size: a.size, scene: demo?.scene, note: demo?.note, src: a.image ? cl(a.image.url, "c_fill,g_auto,ar_4:5,w_800") : demo?.src };
    }),
    founder: {
      name: c.founder.name, first: c.founder.name.split(" ")[0], role: c.founder.role, quote: c.founder.quote, story: c.founder.story,
      credentials: c.founder.credentials, note: local.founder.note,
      src: c.founder.photo ? cl(c.founder.photo.url, "c_fill,g_face,ar_4:5,w_800") : undefined,
      visible: c.founder.visible, whatsapp: c.founder.whatsapp || undefined,
    },
    team: team.map((m) => ({
      name: m.name, role: m.role, areas: m.areas || undefined, langs: m.languages, whatsapp: m.whatsapp,
      src: m.photo ? cl(m.photo.url, "c_fill,g_face,ar_4:5,w_600") : undefined,
    })),
    process: c.process, overseas: c.overseas, testimonials: c.testimonials, faq: c.faq, socials: c.socials,
    photos: {
      hero: wide && tall
        ? { alt: wide.alt || "A finished family home", portrait: heroSet(tall.url, "9:19.5", [750, 1125]), landscape: heroSet(wide.url, "16:10", [1600, 2200]) }
        : local.photos?.hero,
      aboutSite: photo(c.about.image, "4:5", 900, "An advisor with clients at a property") ?? local.photos?.aboutSite,
      aboutInterior: photo(c.about.image2, "3:4", 800, "Interior of a finished home") ?? local.photos?.aboutInterior,
      overseas: photo(c.overseas.image, "4:3", 1200, "A client on a video visit") ?? local.photos?.overseas,
    },
    nav: navFor({ founder: c.founder.visible, team: team.length > 0, reviews: c.testimonials.length > 0 }),
  };
}

/** Menu links for the sections that are on the page. Absolute so they work from the listings pages too. */
export function navFor(show: { founder: boolean; team: boolean; reviews: boolean; properties?: boolean }) {
  return [
    { label: "Properties", href: "/properties", show: show.properties ?? true },
    { label: "About", href: "/#about", show: true },
    { label: "Services", href: "/#services", show: true },
    { label: "Areas", href: "/#areas", show: true },
    { label: "Founder", href: "/#founder", show: show.founder },
    { label: "Team", href: "/#team", show: show.team },
    { label: "Reviews", href: "/#reviews", show: show.reviews },
    { label: "Contact", href: "/#contact", show: true },
  ].filter((l) => l.show).map(({ label, href }) => ({ label, href }));
}

export async function getSiteData(): Promise<SiteData> {
  // A configured API may be asleep or unavailable during deployment builds.
  if (API_URL) await connection();
  return getSiteDataCached();
}

async function getSiteDataCached(): Promise<SiteData> {
  "use cache";
  cacheTag("site");
  cacheLife("hours");
  if (!API_URL) {
    return { ...localSite, nav: navFor({ founder: localSite.founder.visible !== false, team: localSite.team.length > 0, reviews: localSite.testimonials.length > 0, properties: false }) };
  }
  return toSiteData(await get<ApiSite>("/api/public/site"));
}

export interface ListQuery {
  purpose?: string;
  type?: string;
  area?: string;
  beds?: string;
  minPrice?: string;
  maxPrice?: string;
  q?: string;
  sort?: string;
  page?: string;
  featured?: string;
}

const EMPTY_LIST: PropertyList = { items: [], total: 0, page: 1, pages: 1, facets: { areas: [], types: [] } };

export async function getProperties(query: ListQuery, limit = 12): Promise<PropertyList> {
  if (API_URL) await connection();
  return getPropertiesFresh(query, limit);
}

async function getPropertiesFresh(query: ListQuery, limit: number): Promise<PropertyList> {
  // Availability is evaluated per request so calendar boundaries need no cron or manual save.
  if (!API_URL) return EMPTY_LIST;
  const qs = new URLSearchParams({ limit: String(limit), facets: "1" });
  for (const [k, v] of Object.entries(query)) if (v) qs.set(k, v);
  return get<PropertyList>(`/api/public/properties?${qs}`);
}

/** One listing and up to three related ones, or null when it does not exist or is not public. */
export async function getProperty(slug: string): Promise<{ property: PublicProperty; related: PublicProperty[] } | null> {
  if (API_URL) await connection();
  return getPropertyFresh(slug);
}

async function getPropertyFresh(slug: string): Promise<{ property: PublicProperty; related: PublicProperty[] } | null> {
  // Do not serve an expired listing from the hour-long content cache.
  if (!API_URL) return null;
  try {
    return await get<{ property: PublicProperty; related: PublicProperty[] }>(`/api/public/properties/${encodeURIComponent(slug)}`);
  } catch (e) {
    if (e instanceof NotFound) return null;
    throw e;
  }
}

/** Slugs to prerender at build: the newest public listings. */
export async function getPropertySlugs(): Promise<string[]> {
  if (!API_URL) return [];
  try {
    const list = await get<PropertyList>("/api/public/properties?limit=48");
    return list.items.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getMeta(): Promise<PropertyMeta | null> {
  if (API_URL) await connection();
  return getMetaCached();
}

async function getMetaCached(): Promise<PropertyMeta | null> {
  "use cache";
  cacheTag("meta");
  cacheLife("days");
  if (!API_URL) return null;
  return get<PropertyMeta>("/api/meta");
}

