import type { ReactNode } from "react";
import type { SiteData } from "@/content/types";
import { MobileActionBar } from "./MobileActionBar";
import { Navbar } from "./Navbar";
import { SiteFooter } from "./SiteFooter";

/** The navbar, footer and contact bar around the inner pages (listings, a property). No hero, so the bar starts solid. */
export function PageShell({ site, children, whatsapp, msg }: { site: SiteData; children: ReactNode; whatsapp?: string; msg?: string }) {
  const { name, phoneLocal, phoneHref, nav } = site;
  const contact = { name, whatsapp: whatsapp ?? site.whatsapp, phoneLocal, phoneHref };
  return (
    <div className="bs-site">
      <div className="bs-page">
        <Navbar data={{ ...contact, whatsapp: site.whatsapp, nav }} solid />
        <main>{children}</main>
        <SiteFooter data={site} />
        <MobileActionBar data={contact} msg={msg} />
      </div>
    </div>
  );
}
