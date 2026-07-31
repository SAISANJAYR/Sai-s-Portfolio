# SaiSanjay R — Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind + GSAP + Three.js + Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/
  layout.tsx        global chrome: fonts, nav, cursor, grain, particle background
  page.tsx           home page (assembles the sections below)
  globals.css         the whole design system (tokens, glass, motion classes)
  journey/            stub route — flesh out with the tech-journey timeline
  research/           stub route
  protosem/           stub route — replace with the weekly journal timeline
  resume/              stub route
  contact/             stub route

components/
  Nav.tsx              real Next.js routing between pages (this fixes the
                        "doesn't take me anywhere" issue from the single-file version)
  Cursor.tsx            custom cursor
  Grain.tsx              film-grain overlay
  SmoothScroll.tsx        Lenis smooth-scroll wrapper
  ParticleField.tsx       the Three.js background layer
  Hero.tsx                greeting / name / signature / portrait / facts
  TechStack.tsx            renders data/techStack.ts, one card per technology
  Projects.tsx / Hobbies.tsx   horizontal scroll-jacked sections
  HorizontalScrollSection.tsx   shared GSAP ScrollTrigger pin-and-scrub logic
  ClosingCTA.tsx, Footer.tsx, ComingSoon.tsx

data/
  techStack.ts    edit this to change your tech stack — icon strings map to
                    react-icons/di or react-icons/si component names
  projects.ts     edit this for real project copy (Problem/Process/Architecture/
                    Challenges/Outcome per the brief)
  hobbies.ts      hobby cards + the Spotify track id
```

## Why this structure (not a single HTML file)

The first draft was one static `.html` file so you could preview it instantly in
chat — fine for a quick look, unworkable for a real site: no routing (which is
why nav links didn't go anywhere), no component reuse, nothing you can
version-control sanely. This is the real, editable codebase: each page is a
route, each section is a component, and the content that will change most
(projects, tech stack, hobbies) lives in plain data files in `data/` so you
never have to touch layout/animation code just to add a project.

## What to fill in next

- `components/Hero.tsx` — swap the photo placeholder for `<img src="/your-photo.jpg" ... />`
  (drop the file in `public/`)
- `data/projects.ts` — real project copy
- `data/techStack.ts` — your real stack (icon names come from `react-icons`'
  `di` and `si` sets — see https://react-icons.github.io/react-icons)
- `app/journey`, `app/research`, `app/protosem`, `app/resume`, `app/contact` —
  currently placeholder pages, build these out next
