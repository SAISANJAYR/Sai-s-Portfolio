"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const mainIntroRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // Step 1: Hands part & Hello there appears
      tl.to(leftHandRef.current, { xPercent: -50, opacity: 0, duration: 1 }, 0)
        .to(rightHandRef.current, { xPercent: 50, opacity: 0, duration: 1 }, 0)
        .to(helloRef.current, { opacity: 1, y: 0, duration: 1 }, 0.2);

      // Step 2: Hello fades out
      tl.to(helloRef.current, { opacity: 0, y: -80, scale: 0.9, duration: 0.8 }, 1.5);

      // Step 3: Main Intro appears from center (scale in from 0.9)
      tl.fromTo(
        mainIntroRef.current,
        { opacity: 0, scale: 0.9, y: 0 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        2
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section className="relative w-full h-screen overflow-hidden" id="home" ref={containerRef}>

        {/* SPIRAL PARTICLES — contained inside section so they don't leak */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <ParticleField />
        </div>

        {/* HANDS & HELLO SCENE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">

          {/* Hands — anchored to bottom center, meeting in the middle */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              ref={leftHandRef}
              src="/left-hand.png"
              alt="Left Hand"
              className="absolute left-0 bottom-0 w-[48vw] max-w-[620px] h-auto object-contain object-left origin-left"
            />
            <img
              ref={rightHandRef}
              src="/right-hand.png"
              alt="Right Hand"
              className="absolute right-0 bottom-0 w-[48vw] max-w-[620px] h-auto object-contain object-right origin-right"
            />
          </div>

          {/* Hello There — perfectly centered */}
          <div
            ref={helloRef}
            className="absolute opacity-0 translate-y-10 text-center z-20"
          >
            <div className="font-mono text-xl md:text-2xl tracking-widest text-charcoal">
              Hello there.
              <span className="block mt-3 text-sm text-graymid easter opacity-0 transition-opacity hover:opacity-100">
                — General Kenobi.
              </span>
            </div>
          </div>
        </div>

        {/* MAIN INTRO — starts invisible at center, scales in */}
        <div
          ref={mainIntroRef}
          className="absolute inset-0 opacity-0 flex flex-col items-center justify-center pointer-events-auto px-6 z-20"
        >
          <div className="w-full max-w-4xl flex flex-col items-center text-center relative z-10">
            <h1 className="name font-display text-charcoal leading-none mb-6">
              SaiSanjay R
            </h1>

            <div className="font-mono text-xs md:text-sm tracking-[0.15em] text-graymid uppercase mb-6">
              Not because I want to become extraordinary. But because I want to live fully.
            </div>

            <div className="font-serif italic text-charcoal/35 text-sm mb-12">
              "True Perfection has to be Imperfect" — Oasis
            </div>

            <div className="w-44 h-60 md:w-48 md:h-64 rounded-2xl overflow-hidden glass shadow-xl">
              <img
                src="/my_profile.png"
                alt="SaiSanjay R"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

