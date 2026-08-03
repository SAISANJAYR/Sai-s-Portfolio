import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";
import { techStack } from "@/data/techStack";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = { ...DiIcons, ...SiIcons };

export default function TechStack() {
  // Flatten all items from groups that are not 'exploring'
  const mainItems = techStack
    .filter((g) => !g.exploring)
    .flatMap((g) => g.items);

  const exploringGroup = techStack.find((g) => g.exploring);

  return (
    <section id="stack-section">
      <div className="section-head">
        <div className="eyebrow">Tools of the craft</div>
        <h2 className="section-title">What I build with — and what I&apos;m reaching for next.</h2>
      </div>

      <div className="max-w-[800px] mx-auto px-6 pb-24">
        {/* Mobile app-like Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 justify-items-center">
          {mainItems.map((item) => {
            const Icon = item.icon ? iconMap[item.icon] : null;
            return (
              <div 
                key={item.name} 
                className="flex flex-col items-center justify-center gap-3 w-24 h-24 bg-white/40 backdrop-blur-md border border-white/60 rounded-[22px] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
              >
                {Icon ? <Icon className="text-3xl text-charcoal/80" /> : <div className="text-3xl text-charcoal/80">⚡</div>}
                <span className="font-inter text-[10px] sm:text-[11px] font-medium text-charcoal text-center tracking-wide">{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Exploring section remains distinct or we can flatten it too?
            The user said "i don't you to group it into clusters just lay it out in a grid like structure"
            Let's keep exploring slightly separate because it usually has no icons, just topics, but maybe we can just make it chips below. */}
        {exploringGroup && (
          <div className="mt-16 text-center">
             <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-graymid mb-6">Currently Exploring</div>
             <div className="flex flex-wrap justify-center gap-3">
               {exploringGroup.items.map((item) => (
                 <div className="px-5 py-2.5 rounded-full border border-dashed border-graymid/50 text-graymid bg-white/30 text-xs font-mono" key={item.name}>
                   {item.name}
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
