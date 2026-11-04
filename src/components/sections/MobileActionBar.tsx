"use client";

import { useEffect, useState } from "react";
import { usePastHero } from "@/hooks/usePastHero";
import { CallButton, type Contact, WaButton } from "../ui/Button";

/** Call and WhatsApp fixed to the bottom on phones, a floating WhatsApp pill on desktop. Both appear after the hero. */
export function MobileActionBar({ data, msg }: { data: Contact; /** The WhatsApp message; defaults to the general greeting. */ msg?: string }) {
  const pastHero = usePastHero();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const forms = document.querySelectorAll(".bs-invest__form, .bs-contact__form");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setFormInView(true);
          return;
        }
      }
      setFormInView(Array.from(forms).some((form) => {
        const rect = form.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      }));
    });
    forms.forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, []);

  const shown = pastHero && !formInView ? " is-shown" : "";
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
