import { Suspense } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvestmentPlanSection } from "@/components/sections/InvestmentPlanSection";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { Navbar } from "@/components/sections/Navbar";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PropertiesSection } from "@/components/sections/PropertiesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { StatsBand } from "@/components/sections/StatsBand";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getMeta, getProperties, getSiteData } from "@/lib/api";

export default function Home() {
  return <Suspense fallback={<main className="bs-site bs-wrap" aria-live="polite">Loading the website…</main>}><HomeContent /></Suspense>;
}

async function HomeContent() {
  const [site, latest, meta] = await Promise.all([getSiteData(), getProperties({}, 12), getMeta()]);
  const { name, whatsapp, phoneLocal, phoneHref, nav, faq } = site;
  const contact = { name, whatsapp, phoneLocal, phoneHref };
  /* .bs-site is the size container that drives the 768px and 1024px layouts. Each section has its own
     Suspense boundary so React hydrates it as a separate task. The outer fallback can show while the
     API wakes; the cached content streams in when it is ready. */
  return (
    <div className="bs-site">
      <div className="bs-page">
        <Suspense><Navbar data={{ ...contact, nav }} /></Suspense>
        <main className="bs-home">
          <Suspense><HeroSection data={site} /></Suspense>
          <Suspense><PropertiesSection list={latest} meta={meta} city={site.city} /></Suspense>
          <Suspense><InvestmentPlanSection site={site} /></Suspense>
          {site.stats.length > 0 && <Suspense><StatsBand data={site} /></Suspense>}
          <Suspense><AboutSection data={site} /></Suspense>
          <Suspense><ServicesSection data={site} /></Suspense>
          <Suspense><AreasSection data={site} /></Suspense>
          {site.founder.visible !== false && <Suspense><FounderSpotlight data={site} /></Suspense>}
          {site.team.length > 0 && <Suspense><TeamSection data={site} /></Suspense>}
          <Suspense><ProcessSection data={site} /></Suspense>
          {site.testimonials.length > 0 && <Suspense><TestimonialsSection data={site} /></Suspense>}
          <Suspense><FaqSection data={{ faq }} /></Suspense>
          <Suspense><ContactSection data={site} /></Suspense>
        </main>
        <Suspense><SiteFooter data={site} /></Suspense>
        <Suspense><MobileActionBar data={contact} /></Suspense>
      </div>
    </div>
  );
}
