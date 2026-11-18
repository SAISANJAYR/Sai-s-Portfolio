"use client";

import { useEffect, type RefObject } from "react";

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Reports how far the viewport has travelled through `ref` (0 → 1).
 *
 * mode "sticky": 0 when the element's top hits the viewport top, 1 when its
 *   bottom reaches the viewport bottom — for tall wrappers around a sticky stage.
 * mode "pass": 0 when the element's top enters at `startAt` of the viewport
 *   height, 1 when its top reaches `endAt`.
 *
 * Works with native scroll and with Lenis (which drives native scroll), is
 * rAF-throttled, and does nothing heavier than read one rect per frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  onProgress: (p: number) => void,
  opts: { mode?: "sticky" | "pass"; startAt?: number; endAt?: number; enabled?: boolean } = {}
) {
  const { mode = "sticky", startAt = 0.9, endAt = 0.35, enabled = true } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    let last = -1;

    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "sticky") {
        const span = r.height - vh;
        p = span > 0 ? clamp01(-r.top / span) : r.top <= 0 ? 1 : 0;
      } else {
        const start = vh * startAt;
        const end = vh * endAt;
        p = clamp01((start - r.top) / (start - end));
      }
      if (Math.abs(p - last) > 0.0005) {
        last = p;
        onProgress(p);
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
    // onProgress is expected to be stable (writes to refs / CSS variables)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode, startAt, endAt, enabled]);
}
