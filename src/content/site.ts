import { contactNumbers } from "@/lib/contact";
import type { SiteData } from "./types";

/* All site content lives here. Real data replaces the demo copy field by field.
   Confirmed by the client: name, mobile number, address, map link, Facebook page, founder's first name.
   Still demo copy from the design: hours, since, rating, stats, about, founder story, quote and
   credentials, testimonials. Replace these before launch; the quote and reviews must be real. */

const address = "B 97, Block 13-D-2, Gulshan-e-Iqbal, Karachi 75300";

export const site: SiteData = {
  name: "Shah Real Estate",
  city: "Karachi",
  since: 2011,
  /* The only place the number is written. Every call and WhatsApp link derives from it. */
  ...contactNumbers("0305 3568625"),
  address,
  hours: "Mon–Sat, 11am–8pm",
  mapUrl: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=pk&sa=X&geocode=KW1xTaksP7M-MdX9wWSmxiin&daddr=B+97,+Block+13D-2+Block+13+D+2+Gulshan-e-Iqbal,+Karachi,+75300",
  rating: { score: "4.8", count: 320 },
  heroLine:
    "Property advisors in Karachi since 2011. Buying, selling and investing, with every document checked before you pay a token.",
  intents: [
    { label: "Buy", msg: "I want to buy a property in Karachi." },
    { label: "Sell", msg: "I want to sell a property in Karachi." },
    { label: "Rent", msg: "I want to rent a property in Karachi." },
    { label: "Invest", msg: "I want to invest in property in Karachi." },
  ],
  stats: [
    { value: 1450, suffix: "+", label: "properties sold" },
    { value: 3200, suffix: "+", label: "families served" },
    { value: 15, label: "years in Karachi" },
    { prefix: "PKR", value: 20, suffix: " Bn+", label: "in closed deals" },
  ],
  about: {
    heading: "Fifteen years of careful deals",
    text: "Shah Real Estate is a Karachi agency. Since 2011 we have helped families, investors and overseas Pakistanis buy, sell and rent across the city’s main societies. We stay small enough that the founder still reads every file.",
    commitments: [
      "Documents verified before any token",
      "One advisor from first call to transfer",
      "Commission agreed in writing upfront",
    ],
  },
  services: [
    { icon: "home", name: "Buy a home", line: "Shortlists that fit your budget, verified before you visit." },
    { icon: "tag", name: "Sell your property", line: "Valuation, buyer network, professional photos." },
    { icon: "key", name: "Rentals", line: "Tenant search, police verification, rent agreements." },
    { icon: "plot", name: "Plots on installments", line: "Booking support for approved societies with clear payment plans." },
    { icon: "doc", name: "Documentation and transfer", line: "Title checks, NOCs, dues clearance, society or KDA transfer." },
    { icon: "globe", name: "Overseas Pakistanis", line: "Video visits, document review, transfer through POA." },
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
    name: "Umer",
    first: "Umer",
    role: "Founder & CEO",
    quote: "I would rather lose a deal than let a family buy a property with a doubtful file.",
    story:
      "Fifteen years in banking taught Umer how families think about money. In 2011 he started Shah Real Estate with one rule: every document gets checked before any token changes hands. He still visits every site himself.",
    credentials: ["15 years in real estate", "600+ deals handled personally", "DHA Karachi registered estate agent"],
    note: "Portrait of Umer, 4:5, dark suit, office or site background, natural light",
  },
  team: [],
  process: [
    { title: "Tell us what you need", line: "Budget, area and purpose, on WhatsApp." },
    { title: "Shortlist and site visits", line: "Verified options only, with video tours for overseas clients." },
    { title: "Document check and negotiation", line: "Title, NOC and dues checked, and a fair price agreed." },
    { title: "Token to transfer", line: "Agreement, payment schedule, transfer and keys." },
  ],
  overseas: {
    heading: "Buying from abroad?",
    points: [
      { icon: "video", text: "Live video visits in your time zone" },
      { icon: "doc", text: "Every document scanned and explained on WhatsApp" },
      { icon: "sign", text: "Transfer completed through your POA" },
    ],
  },
  testimonials: [
    { name: "Farhan Malik", ctx: "Bought a 240 sq yd house in Gulshan-e-Iqbal", text: "We were nervous about fake documents. Ayesha had every paper verified before we paid the token." },
    { name: "Imran Ahmed", ctx: "Bought a 125 sq yd plot in DHA City from Dubai", text: "I bought without flying back. Video visits, scanned papers on WhatsApp, and Sana handled the transfer through my POA." },
    { name: "Nadia Hussain", ctx: "Sold a 500 sq yd bungalow in PECHS", text: "Five weeks from first call to sale, at the price our family had agreed on." },
    { name: "Asif Mehmood", ctx: "Investor in Bahria Town Karachi", text: "Umer Bhai told us to wait three months before buying. It cost him a quick deal and saved us money." },
    { name: "Saima Tariq", ctx: "Landlord in Clifton", text: "Tenant found, police verification and rent agreement done within a week." },
  ],
  faq: [
    { q: "Which documents should I check before paying a token?", a: "The title documents and chain of ownership, the seller’s CNIC against the record, the society or KDA NOC for sale, a clear dues record and the approved building plan. We check each one with the issuing office before you pay anything." },
    { q: "How much commission do you charge?", a: "It depends on the deal type and is agreed in writing before we start. Nothing is added at transfer that was not in that agreement." },
    { q: "Can I buy while living abroad?", a: "Yes. We run live video visits in your time zone, scan and explain every document on WhatsApp, and complete the transfer through a power of attorney you sign abroad." },
    { q: "How long does a transfer take in DHA or Bahria Town?", a: "Once documents and dues are clear, most transfers complete within one to two weeks. You get the exact steps and dates at the token stage." },
    { q: "Do you verify tenants for rentals?", a: "Every tenant goes through police verification, a CNIC and employment check, and a written rent agreement before keys are handed over." },
  ],
  socials: [{ name: "Facebook", href: "https://www.facebook.com/shahrealestategulshan/" }],
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
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
};
