import { Suspense } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { HeroSection } from "@/components/sections/HeroSection";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { Navbar } from "@/components/sections/Navbar";
import { OverseasBand } from "@/components/sections/OverseasBand";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { StatsBand } from "@/components/sections/StatsBand";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { site } from "@/content/site";

export default function Home() {
  const { name, whatsapp, phoneLocal, phoneHref, nav, faq } = site;
  const contact = { name, whatsapp, phoneLocal, phoneHref };
  /* .bs-site is the size container that drives the 768px and 1024px layouts. Each section has its own
     Suspense boundary so React hydrates it as a separate task, not the whole page in one long one. This
     measured better on Lighthouse (TBT about 400ms against 700 to 900) even though React then reveals
     the boundaries with a script. The page is prerendered, so no fallback ever shows. */
  return (
    <div className="bs-site">
      <div className="bs-page">
        <Suspense><Navbar data={{ ...contact, nav }} /></Suspense>
        <main>
          <Suspense><HeroSection data={site} /></Suspense>
          <Suspense><StatsBand data={site} /></Suspense>
          <Suspense><AboutSection data={site} /></Suspense>
          <Suspense><ServicesSection data={site} /></Suspense>
          <Suspense><AreasSection data={site} /></Suspense>
          <Suspense><FounderSpotlight data={site} /></Suspense>
          {site.team.length > 0 && <Suspense><TeamSection data={site} /></Suspense>}
          <Suspense><ProcessSection data={site} /></Suspense>
          <Suspense><OverseasBand data={site} /></Suspense>
          <Suspense><TestimonialsSection data={site} /></Suspense>
          <Suspense><FaqSection data={{ faq }} /></Suspense>
          <Suspense><ContactSection data={site} /></Suspense>
        </main>
        <Suspense><SiteFooter data={site} /></Suspense>
        <Suspense><MobileActionBar data={contact} /></Suspense>
      </div>
    </div>
  );
}
