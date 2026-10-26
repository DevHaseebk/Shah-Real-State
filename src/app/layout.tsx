import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { dmSans, newsreader } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | Property advisors in ${site.city} since ${site.since}`,
  description: site.heroLine,
};

export const viewport: Viewport = {
  themeColor: "#0e2a21",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* bs-js gates the "before" states (stats lines, image masks, process line) so the page
            still shows everything when JavaScript does not run. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("bs-js")` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
