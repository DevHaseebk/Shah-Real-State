"use client";

import { type FormEvent, useId, useState } from "react";
import type { SiteData } from "@/content/types";
import { Button } from "../ui/Button";
import { AdaptiveSelect } from "../ui/AdaptiveSelect";

/** Sends the visitor's investment preferences to the agency through WhatsApp. */
export function InvestmentPlanSection({ site, property }: { site: SiteData; property?: string }) {
  const id = useId();
  const [url, setUrl] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const value = (name: string) => String(fields.get(name) ?? "").trim();
    const phone = value("phone");
    if (phone.replace(/\D/g, "").length < 10) {
      const input = form.elements.namedItem("phone") as HTMLInputElement;
      input.setCustomValidity("Please enter a valid phone number.");
      input.reportValidity();
      return;
    }
    const money = (name: string) => value(name) ? `PKR ${Number(value(name)).toLocaleString("en-PK")}` : "Not specified";
    const lines = [
      `Hi ${site.name}, I would like to discuss a property investment.`,
      property && `Property: ${property}`,
      `Name: ${value("name")}`,
      `Phone: ${phone}`,
      `Preferred area: ${value("area")}`,
      `Property type: ${value("type") || "Open to options"}`,
      `Total budget: ${money("budget")}`,
      `Available down payment: ${money("downPayment")}`,
      `Monthly payment budget: ${money("monthly")}`,
      `When to invest: ${value("timeline") || "Not specified"}`,
      value("notes") && `Other details: ${value("notes")}`,
    ].filter(Boolean);
    const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setUrl(href);
    window.open(href, "_blank", "noopener");
  }

  return (
    <section className="bs-section bs-invest" id="investment-plan" aria-labelledby={`${id}-heading`}>
      <div className="bs-wrap bs-invest__grid">
        <div className="bs-invest__intro">
          <p className="bs-invest__eyebrow">Investment enquiry</p>
          <h2 className="bs-h2" id={`${id}-heading`}>Plan your property investment</h2>
          <p className="bs-muted">Share where you want to invest and what you can pay upfront. We’ll discuss available options with you on WhatsApp.</p>
          <p className="bs-invest__note">This is an enquiry, not a confirmed payment plan or booking.</p>
        </div>
        <form className="bs-form bs-invest__form" onSubmit={submit}>
          <div className="bs-field">
            <label htmlFor={`${id}-name`}>Your name</label>
            <input className="bs-input" id={`${id}-name`} name="name" autoComplete="name" required maxLength={80} />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-phone`}>Phone number</label>
            <input className="bs-input" id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03xx xxxxxxx" required onInput={(e) => e.currentTarget.setCustomValidity("")} />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-area`}>Where would you like to invest?</label>
            <input className="bs-input" id={`${id}-area`} name="area" list={`${id}-areas`} placeholder="Area or society" required maxLength={80} />
            <datalist id={`${id}-areas`}>{site.areas.map((area) => <option key={area.name} value={area.name} />)}</datalist>
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-type`}>Property type</label>
            <AdaptiveSelect id={`${id}-type`} label="Property type" name="type" options={[{value:"",label:"Open to options"}, ...["House","Apartment","Plot","Shop","Office"].map(value => ({value,label:value}))]} />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-budget`}>Total budget (PKR)</label>
            <input className="bs-input" id={`${id}-budget`} name="budget" type="number" inputMode="numeric" min="0" step="1" placeholder="e.g. 12000000" />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-down`}>Down payment available (PKR)</label>
            <input className="bs-input" id={`${id}-down`} name="downPayment" type="number" inputMode="numeric" min="0" step="1" placeholder="e.g. 3000000" required />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-monthly`}>Monthly payment budget (PKR)</label>
            <input className="bs-input" id={`${id}-monthly`} name="monthly" type="number" inputMode="numeric" min="0" step="1" placeholder="If needed" />
          </div>
          <div className="bs-field">
            <label htmlFor={`${id}-timeline`}>When do you want to invest?</label>
            <AdaptiveSelect id={`${id}-timeline`} label="When do you want to invest?" name="timeline" options={[{value:"",label:"Select a timeline"}, ...["Immediately","Within 3 months","Within 6 months","Just exploring"].map(value => ({value,label:value}))]} />
          </div>
          <div className="bs-field bs-field--full">
            <label htmlFor={`${id}-notes`}>Anything else?</label>
            <textarea className="bs-input" id={`${id}-notes`} name="notes" maxLength={600} placeholder="Preferred project, size or questions" />
          </div>
          <Button label="Send investment enquiry on WhatsApp" icon="chat" type="submit" block />
          <p className="bs-form__status" aria-live="polite">
            {url && <>Your message is ready. <a className="bs-link" href={url} target="_blank" rel="noopener noreferrer">Open WhatsApp</a></>}
          </p>
        </form>
      </div>
    </section>
  );
}
