import type { SceneName } from "@/content/types";
import { SCENES } from "./scenes";

export interface PhotoSlotProps {
  scene?: SceneName;
  note?: string;
  alt?: string;
  ratio?: string;
  src?: string;
  className?: string;
  noteTop?: boolean;
  look?: "f" | "m";
  tint?: string;
}

/* The stand-in drawing as a static image (src/app/scenes), so its few hundred shapes stay out of the
   page's DOM, layout and payload. A portrait is drawn on the slot's tint. */
function sceneSrc(p: PhotoSlotProps) {
  const scene = p.scene && p.scene in SCENES ? p.scene : "villa";
  return scene === "portrait" ? `/scenes/portrait-${p.look === "f" ? "f" : "m"}.svg` : `/scenes/${scene}.svg`;
}

/**
 * A photo frame. With `src` it shows the photograph; without it, a labelled stand-in naming the shot to place.
 * `priority` loads it eagerly (the hero); everything else loads lazily.
 */
export function PhotoSlot(p: PhotoSlotProps & { priority?: boolean }) {
  const cls = `bs-photo${p.className ? ` ${p.className}` : ""}${p.noteTop ? " bs-photo--note-top" : ""}`;
  const style = p.ratio ? { aspectRatio: p.ratio } : undefined;
  const loading = p.priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const };
  if (p.src) {
    return (
      <div className={cls} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element -- the frame crops with object-fit; real photos are not in yet */}
        <img src={p.src} alt={p.alt ?? ""} decoding="async" {...loading} />
      </div>
    );
  }
  const tint = p.scene === "portrait" ? { backgroundColor: p.tint || "#d9ddd5" } : undefined;
  return (
    <div className={cls} role="img" aria-label={p.alt || p.note || "Photo"} style={{ ...style, ...tint }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a small static drawing, nothing to optimise */}
      <img className="bs-photo__scene" src={sceneSrc(p)} alt="" decoding="async" {...loading} />
      {p.note && <span className="bs-photo__note">Photo slot: {p.note}</span>}
    </div>
  );
}
