"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { clamp01, useScrollProgress } from "../useScrollProgress";
import { profile, protosemHref } from "@/data/profile";
import { Glyph, glyphs } from "./Glyphs";

type Placed = { id: keyof typeof glyphs; x: number; y: number; w: number; r: number; depth: number };

/** Line drawings around the composition (percent of the stage; width in vw). */
const placed: Placed[] = [
  // top band
  { id: "r2", x: 6, y: 2, w: 5.4, r: -6, depth: 1.2 },
  { id: "parachute", x: 24, y: 0, w: 5, r: 4, depth: 0.6 },
  { id: "camera", x: 41, y: 3, w: 6.4, r: -5, depth: 0.9 },
  { id: "tape", x: 61, y: 1, w: 7.4, r: 6, depth: 0.7 },
  { id: "saber", x: 79, y: 0, w: 2.4, r: 28, depth: 1.1 },
  { id: "guitar", x: 94, y: 4, w: 3, r: -12, depth: 0.8 },
  // bottom band
  { id: "car", x: 9, y: 90, w: 9, r: -2, depth: 0.7 },
  { id: "watch", x: 28, y: 88, w: 4.6, r: 6, depth: 1.1 },
  { id: "rover", x: 46, y: 91, w: 8, r: 0, depth: 0.8 },
  { id: "vinyl", x: 64, y: 88, w: 5.6, r: 0, depth: 1 },
  { id: "bus", x: 80, y: 91, w: 8.4, r: 3, depth: 0.6 },
  { id: "peaks", x: 95, y: 89, w: 6.4, r: -4, depth: 1.2 },
  // in the margins beside the words and the notes
  { id: "milestone", x: 9, y: 34, w: 3.6, r: -3, depth: 0.9 },
  { id: "shoe", x: 14, y: 70, w: 6, r: 4, depth: 1.1 },
  { id: "book", x: 4, y: 52, w: 3.6, r: 7, depth: 0.7 },
  { id: "reel", x: 92, y: 30, w: 4.2, r: 0, depth: 0.8 },
  { id: "headphones", x: 88, y: 68, w: 4.6, r: -6, depth: 1 },
];

type Note = { k: string; v: React.ReactNode };

const notesRight: Note[] = [
  {
    k: "Now",
    v: (
      <>
        Engineering Intern,{" "}
        <a href={protosemHref} className="link-u">
          Forge Innovations &amp; Ventures
        </a>{" "}
        — building Atmosyn
      </>
    ),
  },
  { k: "Rover", v: "AI & Vision, Qbotix Rover Team" },
  { k: "Studying", v: "B.Tech, AI & Data Science — KCT, Coimbatore" },
];

function Notes({ items, side }: { items: Note[]; side: "left" | "right" }) {
  return (
    <ul className={`notes notes--${side}`}>
      {items.map((n, i) => (
        <li key={n.k} className="note reveal" style={{ "--d": `${0.15 + i * 0.08}s` } as React.CSSProperties}>
          <span className="note__lead" aria-hidden="true" />
          <span className="note__k">{n.k}</span>
          <span className="note__v">{n.v}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The star of the page. The name reveals left to right; the portrait sits at
 * the centre with the signature inked in behind it; his own words on one side,
 * small annotated notes pointing at the photograph on both; and, barely there,
 * line drawings of the films, music, runs and roads that make him up.
 */
export default function Identity() {
  const root = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((p: number) => {
    const el = root.current;
    if (!el) return;
    el.style.setProperty("--sig", clamp01((p - 0.05) / 0.7).toFixed(4));
    el.style.setProperty("--py", ((p - 0.5) * 2).toFixed(4));
  }, []);

  useScrollProgress(root, onProgress, { mode: "pass", startAt: 1, endAt: -0.2 });

  return (
    <div ref={root} className="id">
      <div className="wrap">
        <p className="id__hello t-label reveal" tabIndex={0}>
          Hello there.
          <span className="kenobi" aria-hidden="true">
            — General Kenobi
          </span>
        </p>
        <h1 className="id__name reveal" id="intro-name">
          <span className="id__name-in">
            SaiSanjay <em>R.</em>
          </span>
        </h1>
      </div>

      <div className="id__stage">
        <Image className="id__sig" src="/art/signature.png" alt="" aria-hidden="true" width={956} height={308} unoptimized />

        <div className="id__glyphs" aria-hidden="true">
          {placed.map((g, i) => (
            <Glyph
              key={g.id}
              id={g.id}
              style={
                {
                  left: `${g.x}%`,
                  top: `${g.y}%`,
                  width: `${g.w}vw`,
                  "--r": `${g.r}deg`,
                  "--depth": g.depth,
                  "--delay": `${(i % 4) * -2.5}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="id__grid wrap">
          <div className="id__left">
            <div className="id__prose reveal">
              <p className="id__hi">Hi, I’m Sai.</p>
              <p>
                I study AI &amp; Data Science at KCT and build systems that perceive, decide and act — agents that
                review code, a satellite copilot, a rover that finds its own way. I’d rather understand an idea from
                first principles than memorise how it’s done.
              </p>
              <p>
                But I’m more than my degree. Friends, films, music, long runs and places I haven’t been yet matter just
                as much — and I’m still figuring out the rest.
              </p>
              <p className="id__links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                  LinkedIn
                </a>
                <a href={`mailto:${profile.email}`} className="link-u">
                  Email
                </a>
              </p>
            </div>
          </div>

          <figure className="id__photo reveal">
            <div className="id__frame">
              <Image
                src="/my_profile_clear.jpg"
                alt="Portrait of SaiSanjay R"
                fill
                priority
                quality={90}
                sizes="(max-width: 900px) 82vw, 30vw"
              />
            </div>
            <figcaption className="id__cap">
              <span>Coimbatore</span>
              <span>B.Tech · AI &amp; DS · KCT</span>
            </figcaption>
          </figure>

          <div className="id__right">
            <Notes items={notesRight} side="right" />
          </div>
        </div>
      </div>
    </div>
  );
}
