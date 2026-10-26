import type { SiteData } from "@/content/types";

/** Every phone and WhatsApp form of one Pakistani mobile number, from "0305 3568625" or "+92 305 3568625". */
export function contactNumbers(mobile: string): Pick<SiteData, "phone" | "phoneLocal" | "phoneHref" | "whatsapp"> {
  const n = mobile.replace(/\D/g, "").replace(/^(92|0)/, ""); // 3053568625
  return {
    phone: `+92 ${n.slice(0, 3)} ${n.slice(3)}`,
    phoneLocal: `0${n.slice(0, 3)} ${n.slice(3)}`,
    phoneHref: `tel:+92${n}`,
    whatsapp: `92${n}`,
  };
}

export function waHref(d: Pick<SiteData, "whatsapp">, msg: string) {
  return `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Every prefilled WhatsApp message starts by greeting the agency. */
export function hi(d: Pick<SiteData, "name">) {
  return `Hi ${d.name}, `;
}

export const EXT = { target: "_blank", rel: "noopener" } as const;
