"use client";

import { useEffect } from "react";

const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/**
 * Counts a view of the listing and each tap on its WhatsApp links (marked data-enquiry), for the admin
 * dashboard. The page itself is cached, so counting happens in the browser, with a beacon that never
 * delays the visitor. The API keeps one count per visitor per listing per hour.
 */
export function TrackProperty({ slug }: { slug: string }) {
  useEffect(() => {
    if (!API) return;
    const ping = (what: "view" | "enquiry") => navigator.sendBeacon?.(`${API}/api/public/properties/${encodeURIComponent(slug)}/${what}`);
    ping("view");
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("a[data-enquiry]")) ping("enquiry");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slug]);
  return null;
}
