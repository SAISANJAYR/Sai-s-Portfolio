"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

  useGSAP(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const distance = track.scrollWidth - window.innerWidth + 160;
    const anim = gsap.to(track, {
      x: -Math.max(distance, 0),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => "+=" + (wrap.offsetHeight - window.innerHeight),
        scrub: 0.6,
      },
    });

    return () => {
      anim.kill();
    };
  }, { scope: wrapRef, dependencies: [children] });

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
