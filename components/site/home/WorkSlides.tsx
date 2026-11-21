"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { pad } from "../bits";
import { useScrollProgress } from "../useScrollProgress";

const N = projects.length;

/** A soft magnet: cards settle near the centre without ever stopping dead. */
function settle(p: number) {
  const i = Math.floor(p);
  const f = p - i;
  const s = f * f * (3 - 2 * f); // smoothstep
  return i + f * 0.45 + s * 0.55;
}

/**
 * Selected work on an arc. The section pins on desktop and scrolling turns
 * the arc: the card at the top is larger and fully lit, its neighbours tilt
 * away and fall back along the curve. On touch screens the same arc is a
 * swipeable strip.
 */
export default function WorkSlides() {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    const apply = () => setPinned(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /** Write each card's distance from the centre (--d) — CSS does the rest. */
  const place = useCallback((pos: number) => {
    const el = stage.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".arc__card").forEach((c, i) => {
      const d = i - pos;
      c.style.setProperty("--d", d.toFixed(4));
      c.style.setProperty("--ad", Math.abs(d).toFixed(4));
      c.style.zIndex = String(10 - Math.round(Math.abs(d)));
    });
    const a = Math.min(N - 1, Math.max(0, Math.round(pos)));
    if (a !== activeRef.current) {
      activeRef.current = a;
      setActive(a);
    }
  }, []);

  // Scroll sets a target; a frame loop glides the arc toward it with inertia.
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);
  const last = useRef(0);

  const tick = useCallback(
    (t: number) => {
      const dt = last.current ? Math.min(64, t - last.current) : 16.7;
      last.current = t;
      const k = 1 - Math.pow(1 - 0.085, dt / 16.7);
      current.current += (target.current - current.current) * k;
      if (Math.abs(target.current - current.current) < 0.0004) current.current = target.current;
      place(current.current);
      if (current.current !== target.current) raf.current = requestAnimationFrame(tick);
      else {
        raf.current = 0;
        last.current = 0;
      }
    },
    [place]
  );

  const onProgress = useCallback(
    (p: number) => {
      target.current = settle(p * (N - 1));
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    },
    [tick]
  );
  useScrollProgress(outer, onProgress, { mode: "sticky", enabled: pinned });
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Touch / reduced motion: derive the position from the strip's scroll.
  useEffect(() => {
    if (pinned) return;
    const s = strip.current;
    if (!s) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const cards = s.querySelectorAll<HTMLElement>(".arc__card");
      if (!cards.length) return;
      const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      place(s.scrollLeft / step);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    s.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      s.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pinned, place]);

  return (
    <section
      ref={outer}
      className={`arc${pinned ? " is-pinned" : ""}`}
      style={pinned ? { height: `${(N - 1) * 80 + 100}vh` } : undefined}
      aria-labelledby="work-title"
    >
      <div className="arc__sticky">
        <header className="arc__head wrap">
          <div>
            <p className="arc__kicker">Selected work</p>
            <h2 className="arc__title" id="work-title">
              Things I’ve <em>built.</em>
            </h2>
          </div>
          <p className="arc__count" aria-live="polite">
            <span>{pad(active + 1)}</span> / {pad(N)}
          </p>
        </header>

        <div className="arc__stage" ref={stage}>
          <div className="arc__strip" ref={strip}>
            {projects.map((p, i) => {
              const href = `/projects/${p.slug}`;
              return (
                <article
                  key={p.slug}
                  className={`arc__card${i === active ? " is-active" : ""}`}
                  style={{ "--d": i } as React.CSSProperties}
                  aria-labelledby={`arc-${p.slug}`}
                >
                  <Link href={href} className="arc__link" tabIndex={i === active || !pinned ? 0 : -1}>
                    <div className="arc__img">
                      <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 900px) 78vw, 36vw" />
                      {p.award && <span className="arc__award">{p.award}</span>}
                    </div>
                    <div className="arc__body">
                      <p className="arc__meta">
                        <span>{pad(i + 1)}</span>
                        <span>{p.category}</span>
                        <span>{p.year}</span>
                      </p>
                      <h3 className="arc__name" id={`arc-${p.slug}`}>
                        {p.title}
                      </h3>
                      <p className="arc__quote">{p.quote}</p>
                      <span className="arc__view">
                        View project <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className="arc__foot wrap">
          <ol className="arc__dots" aria-hidden="true">
            {projects.map((p, i) => (
              <li key={p.slug} className={i === active ? "is-on" : undefined} />
            ))}
          </ol>
          <Link href="/projects" className="arc__all">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
