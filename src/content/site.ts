import { contactNumbers } from "@/lib/contact";
import type { SiteData } from "./types";

/* Fallback content when the API is not configured. Agency facts come from the supplied company document. */

const address = "Shop No. 3, Mirza Square, Plot No. B-97, Block 13/D-2, Furniture Market, Gulshan-e-Iqbal, Karachi";

export const site: SiteData = {
  name: "Shah Real Estate",
  city: "Karachi",
  since: 2008,
  /* The only place the number is written. Every call and WhatsApp link derives from it. */
  ...contactNumbers("0332 2366516"),
  address,
  email: "shahestate1976@gmail.com",
  hours: "Contact us for office hours",
  mapUrl: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KW1xTaksP7M-MdX9wWSmxiin&daddr=B+97,+Block+13D-2+Block+13+D+2+Gulshan-e-Iqbal,+Karachi,+75300",
  rating: { score: "", count: 0 },
  heroLine:
    "Your trusted property partner in Gulshan-e-Iqbal, Karachi since 2008. Buy, sell or rent residential and commercial property with local guidance.",
  intents: [
    { label: "Buy", msg: "I want to buy a property in Karachi." },
    { label: "Sell", msg: "I want to sell a property in Karachi." },
    { label: "Rent", msg: "I want to rent a property in Karachi." },
    { label: "Invest", msg: "I want to invest in property in Karachi." },
  ],
  stats: [],
  about: {
    heading: "Property guidance in Karachi since 2008",
    text: "Based in Gulshan-e-Iqbal, Shah Real Estate helps clients buy, sell and rent residential and commercial properties. We work with apartments, houses, portions, shops and offices, and assist with sale deeds, KDA mutation and other property documentation. Our team helps clients find options that match their needs and budget.",
    commitments: [
      "Residential and commercial sales and rentals",
      "Sale deed and KDA mutation assistance",
      "Property guidance based on your needs and budget",
    ],
  },
  services: [
    { icon: "home", name: "Apartments and houses", line: "Find flats, houses and portions for sale or rent." },
    { icon: "tag", name: "Sell your property", line: "Talk to our team about selling residential or commercial property." },
    { icon: "key", name: "Rental properties", line: "Explore rental homes, shops and office spaces." },
    { icon: "plot", name: "Commercial spaces", line: "Ask about shops, showrooms and offices." },
    { icon: "doc", name: "Property documentation", line: "Assistance with sale deeds, KDA mutation and related paperwork." },
    { icon: "chat", name: "Property consultancy", line: "Discuss your requirements and budget with our team." },
  ],
  areas: [
    { name: "DHA", line: "Bungalows and plots, Phases 6–8", scene: "villa", size: "big", note: "DHA bungalow, white stone facade, flat roof, steel gate, palms, golden hour", src: "/photos/area-dha.webp" },
    { name: "Clifton", line: "Sea-facing apartments and penthouses", scene: "towers", size: "wide", note: "Sea-facing towers on the Clifton front, late afternoon", src: "/photos/area-clifton.webp" },
    { name: "Bahria Town Karachi", line: "Villas, apartments, precinct plots", scene: "villa2", note: "Bahria Town villa row, warm-grey stone, bougainvillea", src: "/photos/area-bahria.webp" },
    { name: "DHA City", line: "Investment plots on the M9", scene: "plots", note: "Marked plots with boundary pegs, open sky, DHA City", src: "/photos/area-dha-city.webp" },
    { name: "Scheme 33", line: "Affordable plots and family houses", scene: "houses", note: "Two-storey family houses on a Scheme 33 street", src: "/photos/area-scheme-33.webp" },
    { name: "Gulshan-e-Iqbal", line: "Apartments and portions", scene: "apartments", note: "Mid-rise apartment block with balconies, Gulshan", src: "/photos/area-gulshan.webp" },
    { name: "North Nazimabad", line: "Houses in established blocks", scene: "houses2", note: "Established block with mature trees, North Nazimabad", src: "/photos/area-north-nazimabad.webp" },
    { name: "PECHS", line: "Central homes and commercial floors", scene: "apartments2", note: "PECHS corner building, homes above, offices below", src: "/photos/area-pechs.webp" },
  ],
  founder: {
    name: "Abdul Latif",
    first: "Abdul",
    role: "Founder, Shah Real Estate",
    quote: "",
    story:
      "Abdul Latif founded Shah Real Estate. The agency has served clients from Gulshan-e-Iqbal, Karachi since 2008, helping them with property purchases, sales, rentals and documentation.",
    credentials: [],
  },
  team: [],
  process: [
    { title: "Tell us what you need", line: "Budget, area and purpose, on WhatsApp." },
    { title: "Explore options", line: "Discuss available homes or commercial spaces that fit your requirements." },
    { title: "Ask about documents", line: "Get guidance on sale deeds, KDA mutation and other property paperwork." },
    { title: "Discuss the next step", line: "Our team will explain the process for the property you choose." },
  ],
  overseas: {
    heading: "Buying from abroad?",
    points: [
      { icon: "video", text: "Live video visits in your time zone" },
      { icon: "doc", text: "Every document scanned and explained on WhatsApp" },
      { icon: "sign", text: "Transfer completed through your POA" },
    ],
  },
  testimonials: [],
  faq: [
    { q: "What kinds of properties can you help with?", a: "We assist with apartments, houses, portions, shops, showrooms and office spaces for sale or rent." },
    { q: "Can you help with property documents?", a: "Yes. Our services include assistance with sale deeds, KDA mutation and other property-related documentation." },
    { q: "Where is your office?", a: `Visit us at ${address}. Contact us before your visit to confirm office hours.` },
  ],
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/shah.real.902/" },
    { name: "Instagram", href: "https://www.instagram.com/shahrealestate2007/" },
    { name: "YouTube", href: "https://www.youtube.com/@SHAHREALESTATEGULSHAN" },
    { name: "TikTok", href: "https://www.tiktok.com/@shahrealestate11" },
  ],
  /* Demo photos from Unsplash (free licence, see PHOTO-CREDITS.md) until the agency's own arrive.
     The founder keeps a labelled stand-in: a stranger's face must not stand in for a real person. */
  photos: {
    hero: {
      alt: "A modern family home with palm trees",
      portrait: {
        avif: "/photos/hero-portrait-750.avif 750w, /photos/hero-portrait-1125.avif 1125w",
        webp: "/photos/hero-portrait-750.webp 750w, /photos/hero-portrait-1125.webp 1125w",
      },
      landscape: {
        avif: "/photos/hero-landscape-1600.avif 1600w, /photos/hero-landscape-2200.avif 2200w",
        webp: "/photos/hero-landscape-1600.webp 1600w, /photos/hero-landscape-2200.webp 2200w",
      },
    },
    aboutSite: { src: "/photos/about-handover.webp", alt: "House keys handed over at the door of a new home" },
    aboutInterior: { src: "/photos/about-interior.webp", alt: "Living room of a finished home" },
    overseas: { src: "/photos/overseas-call.webp", alt: "A video call open on a laptop, ready for a live property visit" },
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Areas", href: "#areas" },
    { label: "Founder", href: "#founder" },
    { label: "Contact", href: "#contact" },
  ],
};
