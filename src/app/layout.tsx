import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { getSiteData } from "@/lib/api";
import { dmSans, newsreader } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `${site.name} | Property advisors in ${site.city} since ${site.since}`,
    description: site.heroLine,
    ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: process.env.NEXT_PUBLIC_SITE_URL } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: "#0e2a21",
  viewportFit: "cover",
};

async function RuntimeMarker() {
  await connection();
  return null;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* bs-js gates the "before" states (stats lines, image masks, process line) so the page
            still shows everything when JavaScript does not run. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("bs-js")` }} />
      </head>
      <body><Suspense><RuntimeMarker /></Suspense>{children}</body>
    </html>
  );
}
