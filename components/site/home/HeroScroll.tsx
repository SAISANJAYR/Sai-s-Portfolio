"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { useScrollProgress } from "../useScrollProgress";

/**
 * The opening: the hands from the Creation of Adam, edge to edge, almost
 * touching. Nothing else on screen but a quiet scroll hint. As the reader
 * scrolls, the hands drift apart and the introduction rises between them.
 *
 * Scroll position is written to one CSS variable (--p); all motion is CSS.
 */
export default function HeroScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  const onProgress = useCallback((p: number) => {
    root.current?.style.setProperty("--p", p.toFixed(4));
  }, []);

  // 0 at the top of the page → 1 after ~0.9 viewport heights of scrolling
  useScrollProgress(root, onProgress, { mode: "pass", startAt: 0, endAt: -0.9 });

  return (
    <section ref={root} className="hx" aria-labelledby="intro-name">
      <div className="hx__stage" aria-hidden="true">
        <div className="hx__hand hx__hand--adam">
          <Image className="hx__img" src="/art/hand-adam.webp" alt="" width={954} height={530} priority unoptimized />
        </div>
        <div className="hx__hand hx__hand--creator">
          <Image className="hx__img" src="/art/hand-creator.webp" alt="" width={857} height={530} priority unoptimized />
        </div>
        <span className="hx__spark" />

        <div className="hx__hint">
          <span className="t-label">[ scroll to explore ]</span>
          <svg viewBox="0 0 12 28" width="12" height="28" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 0 V26 M1 21 L6 26 L11 21" />
          </svg>
        </div>
      </div>

      <div className="hx__intro">{children}</div>
    </section>
  );
}
