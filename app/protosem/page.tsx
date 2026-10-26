"use client";

import { useState } from "react";
import Link from "next/link";
import protosemData from "@/data/protosem.json";
import Footer from "@/components/Footer";

type WeekData = {
  week: number;
  title: string;
  subtitle?: string;
  status: string;
  details: string[];
  embed?: string;
  externalLink?: string;
  caseStudyLink?: string;
};

export default function ProtosemPage() {
  const currentWeek = 7;
  const totalWeeks = 20;

  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-offwhite">
      <div className="max-w-4xl mx-auto px-6">
        
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
        <div className="mb-16 glass rounded-2xl p-6 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
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
            The story is unfolding — more weeks ahead.
          </div>
        </div>

        {/* Weeks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-[slideUp_1s_ease-out_0.6s_forwards] opacity-0">
          {(protosemData as WeekData[]).map((week) => {
            // Week 7 opens in new tab
            if (week.externalLink) {
              return (
                <a
                  key={week.week}
                  href={week.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-2xl p-6 text-left hover:bg-white/60 transition-all border border-graylight/30 hover:border-graymid/40 hover:-translate-y-1 hover:shadow-lg flex flex-col relative overflow-hidden"
                >
                  <span className="font-mono text-[10px] text-graymid uppercase tracking-widest mb-1">
                    Week {week.week}
                  </span>
                  {week.subtitle && (
                    <span className="font-mono text-[9px] text-graymid/60 uppercase tracking-widest mb-2 italic">
                      {week.subtitle}
                    </span>
                  )}
                  <span className="font-display text-lg text-charcoal leading-tight">
                    {week.title}
                  </span>
                  <span className="text-graymid text-xs font-mono mt-auto pt-4 group-hover:text-charcoal transition-colors flex items-center gap-1">
                    View document <span className="text-[10px]">↗</span>
                  </span>
                </a>
              );
            }

            return (
              <button
                key={week.week}
                onClick={() => setSelectedWeek(week)}
                className="group glass rounded-2xl p-6 text-left hover:bg-white/60 transition-all border border-graylight/30 hover:border-graymid/40 hover:-translate-y-1 hover:shadow-lg flex flex-col"
              >
                <span className="font-mono text-[10px] text-graymid uppercase tracking-widest mb-3">
                  Week {week.week}
                </span>
                <span className="font-display text-lg text-charcoal leading-tight">
                  {week.title}
                </span>
                <span className="text-graymid text-xs font-mono mt-auto pt-6 group-hover:text-charcoal transition-colors">
                  View log &rarr;
                </span>
              </button>
            );
          })}
          
          {/* Empty placeholders for upcoming weeks to show scale */}
          {Array.from({ length: totalWeeks - (protosemData as WeekData[]).length }).map((_, idx) => {
            // Weeks 3-6 and 8-20 are upcoming (skip 7 which is IoT)
            const usedWeeks = (protosemData as WeekData[]).map(w => w.week);
            const allWeeks = Array.from({ length: totalWeeks + 1 }, (_, i) => i);
            const lockedWeeks = allWeeks.filter(w => !usedWeeks.includes(w) && w > 0);
            const w = lockedWeeks[idx];
            if (w === undefined) return null;
            return (
              <div
                key={`empty-${w}`}
                className="glass rounded-2xl p-6 text-left opacity-30 border border-transparent flex flex-col justify-center items-center"
              >
                <span className="font-mono text-[10px] text-graymid uppercase tracking-widest mb-2">
                  Week {w}
                </span>
                <span className="font-mono text-xs italic text-graymid">Locked</span>
              </div>
            );
          })}
        </div>

      </div>

      <div className="mt-32">
        <Footer />
      </div>

      {/* Modal Overlay */}
      {selectedWeek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-offwhite/80 backdrop-blur-sm cursor-pointer transition-opacity" 
            onClick={() => setSelectedWeek(null)} 
          />
          <div id="modal-content" className="relative glass border border-white/60 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 animate-[slideUp_0.3s_ease-out_forwards]">
            <button 
              onClick={() => setSelectedWeek(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors text-charcoal font-mono"
            >
              ✕
            </button>
            <div className="font-mono text-xs tracking-[0.15em] text-graymid uppercase mb-3">
              Week {selectedWeek.week}
            </div>
            <h2 className="text-3xl font-display text-charcoal mb-8 pr-8">
              {selectedWeek.title}
            </h2>
            <div className="space-y-4">
              {selectedWeek.details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-white/40 rounded-2xl p-5 border border-white/40">
                  <span className="text-graymid mt-0.5 font-mono text-sm">›</span>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            {selectedWeek.embed && (
              <div className="mt-8 flex justify-center w-full bg-white/40 rounded-2xl overflow-hidden border border-white/40 p-2">
                <iframe 
                  src={selectedWeek.embed} 
                  allowTransparency={true} 
                  width="485" 
                  height="402" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen 
                  className="rounded-xl w-full max-w-[485px]"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
