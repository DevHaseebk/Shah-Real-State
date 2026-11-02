/* The site data shape, ported from basera-design/components/index.d.ts (SiteData). */

export type IconName =
  | "chat" | "phone" | "menu" | "close" | "home" | "tag" | "key" | "plot" | "doc" | "globe"
  | "check" | "shield" | "person" | "sign" | "pin" | "clock" | "mail" | "video" | "star" | "link";

export type SceneName =
  | "villa" | "villa2" | "towers" | "apartments" | "apartments2" | "houses" | "houses2"
  | "plots" | "interior" | "site" | "call" | "portrait" | "map";

export interface Stat { value: number; prefix?: string; suffix?: string; label: string }
export interface Intent { label: "Buy" | "Sell" | "Rent" | "Invest" | (string & {}); msg: string }
export interface Service { icon: IconName; name: string; line: string }
export interface Area { name: string; line: string; scene?: SceneName; src?: string; note?: string; size?: "big" | "wide" }
export interface Member {
  name: string; role: string; areas?: string; langs: string; look?: "f" | "m"; tint?: string; src?: string;
  /** Their own WhatsApp digits; otherwise the card's button goes to the agency number. */
  whatsapp?: string;
}
export interface Testimonial { name: string; ctx: string; text: string }
export interface Photo { src: string; alt: string }
/** srcset strings, one per format; AVIF is optional and preferred when the browser supports it. */
export interface PhotoSet { webp: string; avif?: string }

export interface SiteData {
  name: string;
  city: string;
  since: number;
  phone: string;
  phoneLocal: string;
  phoneHref: string;
  whatsapp: string;
  /** Leave out until the agency has a real address; the contact rows hide without it. */
  email?: string;
  address: string;
  hours: string;
  /** "Open in Google Maps" link. */
  mapUrl: string;
  rating: { score: string; count: number };
  heroLine: string;
  intents: Intent[];
  stats: Stat[];
  about: { heading: string; text: string; commitments: string[] };
  services: Service[];
  areas: Area[];
  founder: {
    name: string; first: string; role: string; quote: string; story: string; credentials: string[]; note?: string; src?: string;
    /** false hides the section. */
    visible?: boolean;
    /** Their own WhatsApp digits for "WhatsApp <first name>"; otherwise the agency number. */
    whatsapp?: string;
  };
  team: Member[];
  process: { title: string; line: string }[];
  overseas: { heading: string; points: { icon: IconName; text: string }[] };
  testimonials: Testimonial[];
  faq: { q: string; a: string }[];
  socials: { name: string; href: string }[];
  nav: { label: string; href: string }[];
  /** Section photos. A slot without one shows its labelled stand-in. Area photos live on each area. */
  photos?: {
    /** The phone crop is tall (9:19.5), the desktop crop wide (16:10). */
    hero?: { alt: string; portrait: PhotoSet; landscape: PhotoSet };
    aboutSite?: Photo;
    aboutInterior?: Photo;
    overseas?: Photo;
  };
}

/* Listings, as the API's public routes return them (backend/src/lib/property-schema.ts toPublicProperty). */
export interface PublicImage { url: string; width: number | null; height: number | null; alt: string }

export interface PublicProperty {
  id: string;
  refCode: string;
  slug: string;
  title: string;
  purpose: "sale" | "rent";
  type: string;
  status: "published" | "sold" | "rented";
  featured: boolean;
  area: string;
  subArea: string | null;
  address: string | null;
  size: number | null;
  sizeUnit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  kitchens: number | null;
  floors: number | null;
  floorNumber: number | null;
  parkingSpaces: number | null;
  yearBuilt: number | null;
  facing: string | null;
  furnishing: string | null;
  construction: string | null;
  documents: string | null;
  features: string[];
  /** null when there is no price or it is hidden: show "Price on request". */
  price: number | null;
  advance: number | null;
  maintenance: number | null;
  bankLoan: boolean;
  description: string;
  images: PublicImage[];
  videoUrl: string | null;
  publishedAt: string | null;
  updatedAt: string;
  /** The admin who posted it. Its WhatsApp enquiries go to them. */
  agent: { name: string | null; photo: string | null; whatsapp: string; phone: string; phoneLocal: string; phoneHref: string };
}

export interface PropertyList {
  items: PublicProperty[];
  total: number;
  page: number;
  pages: number;
  facets?: { areas: { name: string; count: number }[]; types: { type: string; count: number }[] };
}

/** Option labels from GET /api/meta. */
export interface PropertyMeta {
  purposes: Record<string, string>;
  types: Record<string, { label: string; group: string }>;
  sizeUnits: Record<string, string>;
  furnishing: Record<string, string>;
  construction: Record<string, string>;
  documents: Record<string, string>;
  facing: Record<string, string>;
  features: Record<string, string>;
}
