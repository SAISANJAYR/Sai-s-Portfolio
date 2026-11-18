"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { clamp01, useScrollProgress } from "../useScrollProgress";
import { facts, profile, protosemHref } from "@/data/profile";

/**
 * Who he is, at a glance: the name revealed left to right, the portrait at the
 * centre, a few lines either side — and the signature inked in behind it all
 * as the section scrolls past. A slow ribbon of true, small facts closes it.
 */
export default function Identity() {
  const root = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((p: number) => {
    const el = root.current;
    if (!el) return;
    el.style.setProperty("--sig", clamp01((p - 0.05) / 0.7).toFixed(4));
    el.style.setProperty("--py", ((p - 0.5) * 2).toFixed(4));
  }, []);

  // 0 as the section's top enters the lower viewport → 1 as it nears the top
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

        <div className="id__row">
          <Image
            className="id__sig"
            src="/art/signature.png"
            alt=""
            aria-hidden="true"
            width={956}
            height={308}
            unoptimized
          />

          <aside className="id__side id__side--left reveal" aria-label="At a glance">
            <div>
              <p>B.Tech · AI &amp; Data Science</p>
              <p className="t-muted">KCT, Coimbatore</p>
            </div>
            <hr />
            <div>
              <p>
                <a href={protosemHref} className="link-u">
                  ProtoSem intern
                </a>
              </p>
              <p className="t-muted">Forger Innovations &amp; Ventures</p>
            </div>
            <hr />
            <div>
              <p>Software domain</p>
              <p className="t-muted">Qbotix Rover Team</p>
            </div>
            <hr />
            <ul className="id__social">
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="link-u">
                  Email
                </a>
              </li>
            </ul>
          </aside>

          <figure className="id__photo reveal" style={{ "--d": "0.08s" } as React.CSSProperties}>
            <Image src="/my_profile.png" alt="Portrait of SaiSanjay R" fill sizes="(max-width: 900px) 78vw, 34vw" />
          </figure>

          <div className="id__side id__side--right reveal" style={{ "--d": "0.16s" } as React.CSSProperties}>
            <p>
              Understanding how a thing works
              <br />
              before trusting that it does.
            </p>
            <p>
              Computer science student,
              <br />
              building across disciplines.
            </p>
          </div>
        </div>
      </div>

      <div className="facts" aria-label="A few facts about me">
        <ul className="facts__track">
          {[...facts, ...facts].map((f, i) => (
            <li key={i} aria-hidden={i >= facts.length ? true : undefined}>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
