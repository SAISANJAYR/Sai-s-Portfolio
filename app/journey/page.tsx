"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import journeyData from "@/data/journey.json";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // The Progress Line Animation
      gsap.fromTo(lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-container",
            start: "top 50%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Level Unlock Animations
      const chapters = gsap.utils.toArray<HTMLElement>(".chapter-node");
      chapters.forEach((chapter, i) => {
        const content = chapter.querySelector('.chapter-content');
        const lockIcon = chapter.querySelector('.lock-icon');
        const dot = chapter.querySelector('.timeline-dot');

        gsap.fromTo(chapter,
          { opacity: 0.3, filter: "grayscale(100%)", y: 50 },
          {
            opacity: 1,
            filter: "grayscale(0%)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 60%", // Unlocks when it hits 60% of viewport
              toggleActions: "play none none reverse",
            }
          }
        );

        // Pop the content box
        gsap.fromTo(content,
          { scale: 0.95, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
          {
            scale: 1,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: chapter,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Flash the dot
        gsap.to(dot, {
          backgroundColor: "#111", // charcoal
          borderColor: "#F7F6F3", // offwhite
          scale: 1.2,
          duration: 0.4,
          scrollTrigger: {
            trigger: chapter,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        });

        // Hide lock icon, show unlock icon (simulated via rotation/opacity)
        gsap.to(lockIcon, {
          rotation: 90,
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: chapter,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-offwhite min-h-screen pt-40 pb-24 overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6 relative">
        <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-6 text-center animate-[fadeIn_1s_ease-out_forwards]">
          The Journey
        </h1>
        <p className="text-graymid text-center text-sm md:text-base max-w-xl mx-auto mb-24 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
          A record of curiosities followed, hard lessons learned, and the incremental steps that shape a builder.
        </p>

        <div className="journey-container relative space-y-32">
          {/* Background Track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-graylight/30 hidden md:block"></div>
          {/* Active Progress Line */}
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-charcoal origin-top hidden md:block"></div>

          {journeyData.map((chapter, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={chapter.chapter} className={`chapter-node relative flex flex-col md:flex-row w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* The Dot (Center) */}
                <div className="timeline-dot absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-offwhite border-4 border-graylight/50 z-10 transition-colors hidden md:block" />
                
                {/* Lock Icon (Center) */}
                <div className="lock-icon absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -mt-[32px] w-6 h-6 flex items-center justify-center text-graymid bg-offwhite rounded-full hidden md:flex">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right flex flex-col items-start md:items-end' : 'md:pl-12 flex flex-col items-start'}`}>
                  
                  <div className={`text-xs md:text-sm tracking-widest uppercase text-charcoal font-bold mb-4 flex items-center gap-4 ${isEven ? 'flex-row-reverse' : ''}`}>
                    <span>Level {chapter.chapter}</span>
                    <span className="h-[1px] w-12 bg-charcoal/20 hidden md:block"></span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-display text-charcoal mb-4">
                    {chapter.title}
                  </h2>
                  
                  <div className="chapter-content glass p-5 md:p-7 rounded-xl border border-white/30 relative overflow-hidden text-left w-full">
                    <div className={`absolute top-0 w-24 h-24 bg-white/20 blur-2xl ${isEven ? 'right-0 rounded-bl-full -mr-12 -mt-12' : 'left-0 rounded-br-full -ml-12 -mt-12'}`}></div>
                    <div className="text-charcoal/80 font-body leading-relaxed text-sm whitespace-pre-wrap relative z-10">
                      {chapter.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
