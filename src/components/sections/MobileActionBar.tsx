"use client";

import { usePastHero } from "@/hooks/usePastHero";
import { CallButton, type Contact, WaButton } from "../ui/Button";

/** Call and WhatsApp fixed to the bottom on phones, a floating WhatsApp pill on desktop. Both appear after the hero. */
export function MobileActionBar({ data, msg }: { data: Contact; /** The WhatsApp message; defaults to the general greeting. */ msg?: string }) {
  const shown = usePastHero() ? " is-shown" : "";
  return (
    <>
      <div className={`bs-actionbar${shown}`} role="region" aria-label="Contact">
        <CallButton data={data} label="Call" />
        <WaButton data={data} msg={msg} label="WhatsApp" />
      </div>
      <WaButton data={data} msg={msg} label="WhatsApp" className={`bs-fab${shown}`} />
    </>
  );
}
