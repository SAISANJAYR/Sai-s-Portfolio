"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection({
  children,
  short = false,
}: {
  children: ReactNode;
  short?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth + 160;
      const anim = gsap.to(track, {
        x: -Math.max(distance, 0),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + (wrap.offsetHeight - window.innerHeight),
          scrub: 0.6,
          pin: wrap.querySelector(".pin-track"),
        },
      });
      return () => anim.kill();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`pin-wrap${short ? " short" : ""}`} ref={wrapRef}>
      <div className="pin-track">
        <div className="track-inner" ref={trackRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
