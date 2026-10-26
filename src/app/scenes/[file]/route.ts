import { SCENES } from "@/components/ui/scenes";
import type { SceneName } from "@/content/types";

/* The PhotoSlot stand-in drawings as static SVG files, generated at build time: /scenes/villa.svg,
   /scenes/portrait-f.svg and so on. Portraits are drawn without their background; the slot paints the tint. */

const files = [
  ...(Object.keys(SCENES) as SceneName[]).filter((s) => s !== "portrait").map((s) => `${s}.svg`),
  "portrait-f.svg",
  "portrait-m.svg",
];

export function generateStaticParams() {
  return files.map((file) => ({ file }));
}

export async function GET(_req: Request, { params }: RouteContext<"/scenes/[file]">) {
  const { file } = await params;
  if (!files.includes(file)) return new Response("Not found", { status: 404 });
  const [name, look] = file.replace(/\.svg$/, "").split("-") as [SceneName, "f" | "m" | undefined];
  const body = SCENES[name]("g", { look, tint: "transparent" });
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">${body}</svg>`, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
