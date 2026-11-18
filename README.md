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
| `public/SaiSanjayR_Resume.pdf` | the downloadable résumé |
| `public/art/` | fingertip-aligned Creation of Adam hands (WebP), signature (transparent PNG) |

Projects without real screenshots get a labelled **system schematic**
(`components/site/Schematic.tsx`) drawn from their documented architecture.
Add `image` to a project in `data/projects.ts` to replace it with a photo.

## Motion

- **Home** (inspired by sudharshan-r.vercel.app): the hands fill the screen
  edge to edge and drift apart on scroll (`HeroScroll`); the name reveals left
  to right over a centred portrait with the signature inked in behind it and a
  ribbon of facts (`Identity`);
  a pinned horizontal reel shows the projects with tilting photos
  (`WorkSlides`); dark tool cards flip light on hover (`Stack`, icons from
  `simple-icons`, rendered on the server).
- The hands appear only on the home page. Other pages simply fade in.
- Scroll effects write one CSS variable per section (`useScrollProgress`);
  reveals use a single IntersectionObserver; Lenis smooths scrolling on
  desktop. Everything is reduced or off under `prefers-reduced-motion`.
- Project photos in `public/projects/` are Unsplash stock photos (credited on
  each project page); swap in real screenshots when available.
