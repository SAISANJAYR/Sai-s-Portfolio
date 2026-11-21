# SaiSanjay R — Portfolio

Next.js 14 (App Router) · TypeScript · GSAP · Lenis. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks + prerenders every route)
```

## Two root layouts — and why

```
app/
  (site)/          the portfolio — its own <html>, fonts, nav, footer, site.css
    layout.tsx     Instrument Serif · Manrope · IBM Plex Mono, page transition, nav
    site.css       the entire design system (tokens, type, layout, motion)
    page.tsx       home — hands hero, intro, signature, craft, project reel
    about/         about, now, ideas, hobbies, Spotify
    projects/      GitHub activity + tiles, projects/[slug] write-ups (static)
    journey/ resume/ contact/ research/
  (legacy)/        ProtoSem — FROZEN, see below
    layout.tsx     the original root layout, byte-for-byte
    globals.css    the original stylesheet (+ Tailwind), byte-for-byte
    protosem/  iot/
```

Each route group has its **own root layout**. Next.js does a full document load
when navigating between root layouts, so no CSS, JS or chrome from the redesign
can ever reach ProtoSem — and vice-versa.

### ProtoSem is read-only

Do not edit anything under `app/(legacy)/`, nor the files it depends on:
`components/{Nav,Footer,Cursor,Grain,SmoothScroll}.tsx`, `tailwind.config.ts`,
`postcss.config.mjs`, `data/protosem.json`, `public/media/`, `iot-firmware/`.

The site's stylesheet is intentionally **Tailwind-free**: two Tailwind configs in
one Next build share JIT caches and the second one silently loses utilities,
which would break ProtoSem's styling.

Links from the site into ProtoSem are plain `<a href="/protosem">`, never
`next/link`.

## Where content lives

| File | What |
| --- | --- |
| `data/profile.ts` | name, links, roles, tech stack (+ notes, icons), facts ribbon, hobbies, Spotify |
| `data/projects.ts` | every project + write-up content; `missing` lists gaps |
| `data/journey.json` | the six narrative chapters |
| `data/milestones.ts` | the dated ledger on the Journey page |
| `public/SaiSanjay_R_Resume.pdf` | the downloadable résumé |
| `public/art/` | fingertip-aligned Creation of Adam hands (WebP), signature (transparent PNG) |

Projects without real screenshots get a labelled **system schematic**
(`components/site/Schematic.tsx`) drawn from their documented architecture.
Add `image` to a project in `data/projects.ts` to replace it with a photo.

## Motion

- **Home**: the hands fill the screen edge to edge and drift apart on scroll
  (`HeroScroll`); the name reveals left to right over a centred portrait, with
  the signature and faint original line drawings (films, music, books,
  running, travel) behind it — hover one to see what it is (`Identity`,
  `Glyphs`); projects swing round an arc on a dark-brown panel, the centred one
  enlarged (`WorkSlides`); tool cards (`Stack`); hobbies and one song (`OffClock`).
- The hands appear only on the home page. Other pages simply fade in.
- Scroll effects write CSS variables (`useScrollProgress`); reveals use one
  IntersectionObserver; Lenis smooths desktop scrolling. Everything is reduced
  or off under `prefers-reduced-motion`.
- Project photos in `public/projects/` are Unsplash/USGS photos given one warm
  tritone grade so they match the palette (credited on each project page).
  `public/my_profile_clear.jpg` is a 2× EDSR upscale of `my_profile.png` plus a light clarity pass.
- Favicon and cursors are the site’s own: two upright Instrument Serif “S”
  side by side (Sai · Sanjay), obsidian on parchment (`app/(site)/icon1.svg`,
  `icon2.png`, `apple-icon.png`); the cursor is a small solid dot that becomes
  a thin ring on links, obsidian on light areas and parchment on dark ones
  (`public/cursor/`, 1× and 2× PNGs). ProtoSem keeps its own cursor and has no favicon.
