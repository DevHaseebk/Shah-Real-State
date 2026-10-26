import type { IconName, SiteData } from "@/content/types";
import { EXT, hi, waHref } from "@/lib/contact";
import { Icon } from "./Icon";

export interface ButtonProps {
  label: string;
  href?: string;
  icon?: IconName;
  variant?: "primary" | "secondary";
  block?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  className?: string;
}

/** An `<a>` when `href` is set, otherwise a `<button>`. Labels say what happens; no arrows. */
export function Button({ label, href, icon, variant = "primary", block, external, type = "button", className }: ButtonProps) {
  const cls = `bs-btn bs-btn--${variant}${block ? " bs-btn--block" : ""}${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      {icon && <Icon name={icon} />}
      <span>{label}</span>
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href} {...(external ? EXT : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type}>
      {inner}
    </button>
  );
}

type Extra = { block?: boolean; className?: string };
/** The contact fields the buttons need, so client components can take just these. */
export type Contact = Pick<SiteData, "name" | "whatsapp" | "phoneLocal" | "phoneHref">;

export function WaButton({ data, msg, label = "Chat on WhatsApp", variant = "primary", ...extra }: { data: Pick<Contact, "name" | "whatsapp">; msg?: string; label?: string; variant?: ButtonProps["variant"] } & Extra) {
  return <Button label={label} icon="chat" variant={variant} href={waHref(data, msg ?? `${hi(data)}I found you on your website.`)} external {...extra} />;
}

export function CallButton({ data, label, variant = "secondary", ...extra }: { data: Pick<Contact, "phoneLocal" | "phoneHref">; label?: string; variant?: ButtonProps["variant"] } & Extra) {
  return <Button label={label ?? `Call ${data.phoneLocal}`} icon="phone" variant={variant} href={data.phoneHref} {...extra} />;
}
