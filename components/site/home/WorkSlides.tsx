"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { pad } from "../bits";
import { useScrollProgress } from "../useScrollProgress";

/** Photo that tilts toward the cursor, with a soft glare. */
function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
    el.dataset.hover = "1";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.hover;
  };
  return (
    <div className="tilt" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="tilt__card">
        {children}
        <span className="tilt__glare" aria-hidden="true" />
      </div>
    </div>
  );
}

/**
 * Selected work as a horizontal reel. On desktop the section pins and
 * vertical scrolling moves it sideways; on touch screens and for reduced
 * motion it is a native, swipeable scroll-snap strip.
 */
export default function WorkSlides() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const distance = useRef(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Height of the scroll runway = horizontal distance + one viewport.
  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    if (!pinned) {
      o.style.height = "";
      t.style.transform = "";
      return;
    }
    const size = () => {
      distance.current = Math.max(0, t.scrollWidth - window.innerWidth);
      o.style.height = `${distance.current + window.innerHeight}px`;
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(t);
    window.addEventListener("resize", size);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", size);
    };
  }, [pinned]);

  const onProgress = useCallback((p: number) => {
    if (track.current) track.current.style.transform = `translate3d(${(-p * distance.current).toFixed(1)}px,0,0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
  }, []);

  useScrollProgress(outer, onProgress, { mode: "sticky", enabled: pinned });

  return (
    <section ref={outer} className={`hs${pinned ? " is-pinned" : ""}`} aria-labelledby="work-title">
      <div className="hs__sticky">
        <div className="hs__track" ref={track}>
          <div className="hs__panel hs__panel--statement">
            <p className="hs__kicker t-label" aria-hidden="true">
              saisanjay .r
            </p>
            <div className="hs__statement">
              <p className="hs__big">
                Learning by
                <br />
                building —
              </p>
              <span className="hs__rule" aria-hidden="true" />
              <p className="hs__line">agents that can’t cheat their own grader,</p>
              <p className="hs__line">backends that stay quick under heavy work,</p>
              <p className="hs__line">and the maths beneath the frameworks.</p>
            </div>
            <p className="hs__some" aria-hidden="true">
              This is some of it. <span>→</span>
            </p>
          </div>

          <div className="hs__panel hs__panel--intro">
            <p className="t-label t-muted">
              Featured · {pad(projects.length)} projects
            </p>
            <h2 className="hs__title" id="work-title">
              Selected
              <br />
              Work.
            </h2>
            <p className="hs__cue">{pinned ? "Scroll right to explore →" : "Swipe to explore →"}</p>
          </div>

          {projects.map((p, i) => {
            const href = `/projects/${p.slug}`;
            return (
              <article className="hs__card" key={p.slug} aria-labelledby={`slide-${p.slug}`}>
                <div className="hs__text">
                  <div>
                    <p className="hs__num">{pad(i + 1)}/</p>
                    <h3 className="hs__name" id={`slide-${p.slug}`}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="hs__cat">{p.category}</p>
                  <p className="hs__quote">“{p.quote}”</p>
                  {p.award && <p className="hs__award">{p.award}</p>}
                  <Link href={href} className="hs__view" aria-label={`View ${p.title}`}>
                    View Project <span aria-hidden="true">→</span>
                  </Link>
                  <p className="hs__year">{p.year}</p>
                </div>
                <Link href={href} className="hs__media" tabIndex={-1} aria-hidden="true">
                  <Tilt>
                    <Image src={p.photo.src} alt="" width={1600} height={1067} sizes="(max-width: 900px) 86vw, 44vw" />
                  </Tilt>
                </Link>
              </article>
            );
          })}

          <div className="hs__panel hs__panel--end">
            <p className="hs__more">
              More where that
              <br />
              came from?
            </p>
            <Link href="/projects" className="hs__view">
              See all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hs__progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
