# Shah Real Estate website

The single-page brand site built from the approved design in `../basera-design` (read its `HANDOFF.md` first).
Next.js 16 (App Router, TypeScript), prerendered as one static page.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; also type-checks
npm run start
```

## Where things live

| What | Where |
| --- | --- |
| All content (name, number, address, areas, team, reviews…) | `src/content/site.ts` |
| Data shape (`SiteData`, ported from `components/index.d.ts`) | `src/content/types.ts` |
| The mobile number, written once; every call and WhatsApp link derives from it | `contactNumbers(...)` in `site.ts`, helpers in `src/lib/contact.ts` |
| Page sections, including the team section when real team data is available | `src/components/sections/` |
| Button, Icon, PhotoSlot, PlanLine | `src/components/ui/` |
| Behaviour ported from `enhance()` in `bundle.js` | `src/hooks/` and the small client wrappers in `src/components/behaviour/` |
| Tokens and component CSS (same class names as `bundle.css`) | `src/styles/tokens.css`, `src/styles/basera.css` |
| Self-hosted fonts (DM Sans and Newsreader through Next.js) | `src/app/fonts.ts` |
| PhotoSlot stand-in drawings, served as static SVG files | `src/app/scenes/[file]/route.ts` |

Every WhatsApp link is `https://wa.me/<number>?text=…`, and every prefilled message starts "Hi Shah Real Estate, …".

## Replacing demo content

`site.ts` says at the top which fields the client has confirmed and which are still demo copy from the design.
To use a real photo, give the slot a `src` (areas, founder and team take it from the data) and keep the `alt`.
The frame, crop and radius stay the same.
The team array is empty for now, so the team section and its navigation link are hidden.

## Where the build departs from the prototype

- **Hero load sequence.** It runs on CSS keyframes with the same timings, so it starts at first paint instead of
  after hydration. A tiny inline script gives each word of the name its line number for the 90ms stagger.
  The name is one mask per word, so it can only break between words.
- **Process line.** The track sits beside the `<ol>`, not inside it, so the list holds only `<li>` items.
- **Stand-in drawings** load as images from `/scenes/*.svg` rather than inline SVG, which keeps them out of the
  page's DOM. A portrait is drawn on the slot's tint.
- **Directions.** An office card opens the client's Google Maps destination link. The iframe was removed because it displayed as an empty block in the page preview.
- **Reduced motion** needs no JavaScript: the CSS turns every animation and transition off, and the hooks show
  final states (numbers, masks, process line) and skip autoplay.
