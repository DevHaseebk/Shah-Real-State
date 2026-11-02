/* Images uploaded through the admin panel live on Cloudinary, which resizes, crops and converts them on the fly
   from one original: `c_fill,g_auto` crops to the shape the slot needs around the most interesting part, and
   f_avif / f_webp pick the format. Locally stored development uploads are served as they are. */

const isCloudinary = (url: string) => url.includes("res.cloudinary.com/") && url.includes("/upload/");

/** One image URL with a Cloudinary transformation, e.g. cl(url, "c_fill,g_auto,ar_4:5,w_800"). */
export function cl(url: string, transform: string, format: "auto" | "avif" | "webp" = "auto") {
  if (!isCloudinary(url)) return url;
  return url.replace("/upload/", `/upload/${transform},f_${format},q_auto/`);
}

/** A srcset of widths for one shape: "…w_750… 750w, …w_1125… 1125w". */
export function srcSet(url: string, ratio: string | null, widths: number[], format: "avif" | "webp" | "auto" = "auto") {
  if (!isCloudinary(url)) return `${url} ${widths[widths.length - 1]}w`;
  const crop = ratio ? `c_fill,g_auto,ar_${ratio}` : "c_limit";
  return widths.map((w) => `${cl(url, `${crop},w_${w}`, format)} ${w}w`).join(", ");
}

/** The hero's two art-directed crops (tall for phones, wide from 1024px) as the PhotoSet the hero reads. */
export function heroSet(url: string, ratio: string, widths: number[]) {
  return { avif: srcSet(url, ratio, widths, "avif"), webp: srcSet(url, ratio, widths, "webp") };
}
