"use client";

import { usePastHero } from "@/hooks/usePastHero";
import { CallButton, type Contact, WaButton } from "../ui/Button";

/** Call and WhatsApp fixed to the bottom on phones, a floating WhatsApp pill on desktop. Both appear after the hero. */
export function MobileActionBar({ data }: { data: Contact }) {
  const shown = usePastHero() ? " is-shown" : "";
  return (
    <>
      <div className={`bs-actionbar${shown}`} role="region" aria-label="Contact">
        <CallButton data={data} label="Call" />
        <WaButton data={data} label="WhatsApp" />
      </div>
      <WaButton data={data} label="WhatsApp" className={`bs-fab${shown}`} />
    </>
  );
}
