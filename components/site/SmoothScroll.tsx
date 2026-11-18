"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/**
 * Lenis inertial scrolling, kept in sync with GSAP ScrollTrigger.
 * Disabled entirely for prefers-reduced-motion and on touch-only devices,
 * where native scrolling is always better.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduce || coarse) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenisInstance = lenis;
    if (process.env.NODE_ENV !== "production") (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // New page → start at the top, without an animated scroll.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
