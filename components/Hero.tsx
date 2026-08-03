"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // We can add a simple CSS float animation globally in globals.css, or inline it.
  // For simplicity, we'll use CSS classes for floating.

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-offwhite"
      id="home"
    >
      {/* Background Spiral / Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        {/* Simple sine wave SVG */}
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-auto min-w-[1200px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 100 Q 125 0 250 100 T 500 100 T 750 100 T 1000 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-graymid"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <p className="font-mono text-graymid mb-6 tracking-widest text-sm uppercase animate-[fadeIn_1s_ease-out]">
          Hello there.
        </p>
        
        <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] leading-none text-charcoal mb-4 animate-[slideUp_1s_ease-out]">
          SaiSanjay R
        </h1>
        
        <p className="font-mono text-graymid tracking-[0.2em] text-xs sm:text-sm uppercase animate-[fadeIn_1.5s_ease-out]">
          AI & DATA SCIENCE · BUILDER · RESEARCHER-IN-PROGRESS
        </p>
      </div>

      {/* Floating Elements */}
      {/* Top Left */}
      <div className="absolute top-[25%] left-[10%] md:left-[15%] z-20 animate-[float_6s_ease-in-out_infinite]">
        <div className="glass px-6 py-4 rounded-xl border border-white/40 shadow-sm backdrop-blur-md">
          <p className="font-mono text-xs text-charcoal font-medium">Currently exploring<br/>AI research.</p>
        </div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-[30%] left-[12%] md:left-[20%] z-20 animate-[float_5s_ease-in-out_infinite_1s]">
        <div className="glass px-6 py-3 rounded-xl border border-white/40 shadow-sm backdrop-blur-md">
          <p className="font-mono text-xs text-charcoal font-medium">Building OpenEnv.</p>
        </div>
      </div>

      {/* Right Photo Placeholder */}
      <div className="absolute top-[35%] right-[10%] md:right-[15%] z-20 animate-[float_7s_ease-in-out_infinite_0.5s]">
        <div className="w-40 h-56 md:w-48 md:h-64 glass rounded-2xl border border-white/40 shadow-lg backdrop-blur-md overflow-hidden flex items-center justify-center p-2">
           <div className="w-full h-full bg-graylight/20 rounded-xl relative overflow-hidden">
             <Image src="/my_profile.png" alt="Profile" fill className="object-cover object-top opacity-80" />
           </div>
        </div>
      </div>

      {/* Bottom Right Quote */}
      <div className="absolute bottom-[20%] right-[15%] md:right-[25%] z-20 animate-[float_5.5s_ease-in-out_infinite_1.5s]">
        <div className="glass px-6 py-4 rounded-xl border border-white/40 shadow-sm backdrop-blur-md max-w-[250px]">
          <p className="font-serif italic text-xs text-charcoal/80">
            "Little by little, we gave you everything you ever dreamed of." — Oasis
          </p>
        </div>
      </div>

    </section>
  );
}
