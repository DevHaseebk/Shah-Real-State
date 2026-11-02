import { PageShell } from "@/components/sections/PageShell";
import { Button } from "@/components/ui/Button";
import { getSiteData } from "@/lib/api";

export default async function PropertyNotFound() {
  const site = await getSiteData();
  return (
    <PageShell site={site}>
      <section className="bs-section bs-subhead">
        <div className="bs-wrap">
          <div className="bs-empty">
            <h1 className="bs-h2">This property is no longer listed</h1>
            <p>It may have been sold or rented. Browse what is available now, or tell us what you need.</p>
            <p><Button href="/properties" label="See available properties" /></p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
