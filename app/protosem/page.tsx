"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import protosemData from "@/data/protosem.json";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProtosemPage() {
  const currentWeek = 1;
  const totalWeeks = 20;

  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Draw the progress line
      const weeks = gsap.utils.toArray<HTMLElement>(".week-section");
      weeks.forEach((week) => {
        gsap.fromTo(week, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: week,
              start: "top 82%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-offwhite">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="inline-block font-mono text-xs tracking-[0.15em] uppercase text-graymid mb-4 px-3 py-1 glass rounded-full">
            Live log
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-5">
            Protosem Expedition
          </h1>
          <p className="text-graymid text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            A 20-week interdisciplinary program where students from different departments collaborate to solve meaningful real-world problems.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-20 glass rounded-2xl p-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
          <div className="flex justify-between text-xs font-mono text-graymid mb-3 uppercase tracking-widest">
            <span>Week {currentWeek} of {totalWeeks}</span>
            <span>{Math.round((currentWeek / totalWeeks) * 100)}% complete</span>
          </div>
          <div className="w-full h-[3px] bg-graylight/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-charcoal rounded-full transition-all duration-1000 ease-cinematic" 
              style={{ width: `${(currentWeek / totalWeeks) * 100}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-graymid font-mono italic">
            Early days. The story is just beginning.
          </div>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative ml-2 pl-6 md:pl-10">
          
          {/* Track */}
          <div className="absolute top-0 left-0 w-[1px] h-full bg-graylight/40 border-l border-dashed border-graymid/20" />
          <div ref={lineRef} className="absolute top-0 left-0 w-[2px] bg-charcoal origin-top" />

          <div className="space-y-20 py-8">
            {protosemData.map((week) => (
              <div key={week.week} className="week-section relative">
                <span className="absolute -left-[31px] md:-left-[45px] top-1 w-3 h-3 rounded-full bg-charcoal border-[3px] border-offwhite shadow-sm z-10" />
                
                <div className="text-[10px] tracking-[0.12em] uppercase text-graymid mb-1.5 font-mono">
                  Week {week.week}
                </div>
                <h3 className="text-xl md:text-2xl font-display text-charcoal mb-4">
                  {week.title}
                </h3>
                <div className="glass rounded-xl p-5">
                  <ul className="space-y-2.5">
                    {week.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-charcoal/75 text-sm md:text-base leading-relaxed font-body">
                        <span className="text-graylight shrink-0 mt-0.5">›</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* The unknown */}
            <div className="week-section relative opacity-40 pt-4">
              <span className="absolute -left-[28px] md:-left-[42px] top-5 w-2.5 h-2.5 rounded-full bg-graylight border-[2px] border-offwhite z-10" />
              <p className="text-sm font-mono text-graymid italic">
                Yet to figure out...
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
