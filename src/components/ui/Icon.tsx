import type { IconName } from "@/content/types";

/* 24px line icons, 1.6 stroke, round caps and joins, drawn in currentColor. */
const ICONS: Record<IconName, string> = {
  chat: '<path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 19z"/><path d="M9 10.5h6M9 13.5h4"/>',
  phone: '<path d="M6 3.5h3l1.6 4.2-2.1 1.3a11.5 11.5 0 0 0 6.5 6.5l1.3-2.1 4.2 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.7a2 2 0 0 1 2-2.2z"/>',
  menu: '<path d="M4 8.5h16M4 15.5h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  home: '<path d="M4 10.5L12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/>',
  tag: '<path d="M3.5 12.2V3.5h8.7l8.3 8.3-8.7 8.7z"/><circle cx="8" cy="8" r="1.4"/>',
  key: '<circle cx="8" cy="15.5" r="3.8"/><path d="M10.8 12.8L19.5 4M16.5 7l2.2 2.2M14.2 9.3l2 2"/>',
  plot: '<path d="M4 4h16v16H4z"/><path d="M4 11h9v9M13 4v7h7"/>',
  doc: '<path d="M6.5 3h8l4 4v14h-12z"/><path d="M14.5 3v4h4M9.5 12h6M9.5 16h6"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.8 5.2 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.2-3.8-8.5S9.4 5.9 12 3.5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  shield: '<path d="M12 3.2l7.5 2.8v5.8c0 4.4-3.1 7.8-7.5 9-4.4-1.2-7.5-4.6-7.5-9V6z"/><path d="M8.6 12l2.4 2.4 4.4-4.6"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  sign: '<path d="M4 20.5h16"/><path d="M6.5 16.5l9.8-9.8 2.9 2.9-9.8 9.8H6.5z"/>',
  pin: '<path d="M12 21s-6.8-6-6.8-11.3a6.8 6.8 0 0 1 13.6 0C18.8 15 12 21 12 21z"/><circle cx="12" cy="9.7" r="2.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  mail: '<path d="M3.5 6h17v12h-17z"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  video: '<path d="M3.5 7h11v10h-11z"/><path d="M14.5 10.5l6-3.5v10l-6-3.5"/>',
  star: '<path fill="currentColor" stroke="none" d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
  link: '<path d="M10 14l4-4"/><path d="M8.5 11.5l-2 2a3 3 0 0 0 4.2 4.2l2-2M15.5 12.5l2-2a3 3 0 0 0-4.2-4.2l-2 2"/>',
};

export const icons = Object.keys(ICONS) as IconName[];

/** Without `label` the icon is hidden from assistive tech. */
export function Icon({ name, size, label }: { name: IconName; size?: number; label?: string }) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? ICONS.chat }}
    />
  );
}
