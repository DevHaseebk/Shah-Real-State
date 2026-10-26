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
export interface Member { name: string; role: string; areas?: string; langs: string; look?: "f" | "m"; tint?: string; src?: string }
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
  founder: { name: string; first: string; role: string; quote: string; story: string; credentials: string[]; note?: string; src?: string };
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
