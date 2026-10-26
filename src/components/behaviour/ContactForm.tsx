"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { Button } from "../ui/Button";

type Errors = { name?: string; phone?: string };

/** The enquiry form. "Send on WhatsApp" composes the message and opens WhatsApp; nothing is sent to a server. */
export function ContactForm({ name: agency, whatsapp, intents, areas }: {
  name: string;
  whatsapp: string;
  intents: string[];
  areas: string[];
}) {
  const id = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [url, setUrl] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Please add a phone number we can reach, like 0300 1234567.";
    setErrors(next);
    if (next.name || next.phone) {
      (next.name ? nameRef : phoneRef).current?.focus();
      return;
    }
    const intent = String(f.get("intent") ?? "");
    const area = String(f.get("area") ?? "");
    const msg = String(f.get("message") ?? "").trim();
    const text = `Hi ${agency}, I’m ${name}.\nI want to: ${intent}${area ? `\nArea: ${area}` : ""}\nPhone: ${phone}${msg ? `\n\n${msg}` : ""}`;
    const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    try { window.open(href, "_blank", "noopener"); } catch {}
    // Shown whether or not the new tab opened, in case the browser blocked it.
    setUrl(href);
  }

  const invalid = (k: keyof Errors) => (errors ? (errors[k] ? "true" : "false") : undefined);
  return (
    <form className="bs-form" noValidate onSubmit={submit}>
      <div className="bs-field">
        <label htmlFor={`${id}-n`}>Name</label>
        <input ref={nameRef} className="bs-input" id={`${id}-n`} name="name" autoComplete="name" aria-describedby={`${id}-ne`} aria-invalid={invalid("name")} />
        <p className="bs-error" id={`${id}-ne`} aria-live="polite">{errors?.name}</p>
      </div>
      <div className="bs-field">
        <label htmlFor={`${id}-p`}>Phone</label>
        <input ref={phoneRef} className="bs-input" id={`${id}-p`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03xx xxxxxxx" aria-describedby={`${id}-pe`} aria-invalid={invalid("phone")} />
        <p className="bs-error" id={`${id}-pe`} aria-live="polite">{errors?.phone}</p>
      </div>
      <fieldset className="bs-fieldset">
        <legend>I want to</legend>
        <div className="bs-seg">
          {intents.map((label, i) => (
            <label key={label}>
              <input type="radio" name="intent" value={label} defaultChecked={i === 0} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="bs-field bs-field--full">
        <label htmlFor={`${id}-a`}>Area</label>
        <select className="bs-input" id={`${id}-a`} name="area" defaultValue="">
          <option value="">Choose an area</option>
          {areas.map((a) => <option key={a}>{a}</option>)}
          <option>Somewhere else</option>
        </select>
      </div>
      <div className="bs-field bs-field--full">
        <label htmlFor={`${id}-m`}>Message</label>
        <textarea className="bs-input" id={`${id}-m`} name="message" placeholder="Budget, size in sq yd, timeline" />
      </div>
      <Button label="Send on WhatsApp" icon="chat" type="submit" block />
      <p className="bs-form__status" aria-live="polite">
        {url && <>Your message is ready. <a className="bs-link" href={url} target="_blank" rel="noopener">Open WhatsApp</a></>}
      </p>
    </form>
  );
}
