import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="closing flex flex-col items-center justify-center py-32 px-6 bg-offwhite text-charcoal border-t border-graylight/20">
      <div className="closing-title mb-8 text-charcoal text-4xl md:text-5xl font-display text-center">Curious how I got here?</div>
      
      <p className="text-graymid font-mono text-sm tracking-widest uppercase mb-12 text-center">
        Let's build something extraordinary.
      </p>

      <div className="cta-row mb-24 flex gap-4">
        <Link href="/journey" className="btn bg-charcoal text-offwhite hover:bg-charcoal/90 px-8 py-4 rounded-full font-medium transition-colors shadow-lg">
          My Journey
        </Link>
        <Link href="/contact" className="btn glass border border-charcoal/10 text-charcoal hover:bg-white/50 px-8 py-4 rounded-full font-medium transition-colors">
          Get in touch
        </Link>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 mb-24 animate-[fadeIn_1s_ease-out_forwards]">
        <div className="flex-1 glass border border-white/40 p-5 rounded-3xl shadow-xl flex flex-col justify-center">
          <div className="text-[10px] tracking-widest uppercase text-graymid mb-4 text-left font-mono">Currently on repeat</div>
          <iframe 
            data-testid="embed-iframe-1" 
            style={{ borderRadius: "16px" }} 
            src="https://open.spotify.com/embed/track/3tQFthLmtBuc0XPL2b8nnu?utm_source=generator&theme=0&si=d82df7cecac84ca9" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>

        <div className="flex-1 glass border border-white/40 p-5 rounded-3xl shadow-xl flex flex-col justify-center">
          <div className="text-[10px] tracking-widest uppercase text-graymid mb-4 text-left font-mono">Just for you</div>
          <iframe 
            data-testid="embed-iframe-2" 
            style={{ borderRadius: "16px" }} 
            src="https://open.spotify.com/embed/track/2TNyNqT3RBXhtNV7OiAgiC?utm_source=generator&si=4fabf127e9534871" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-xl md:text-3xl font-serif italic text-charcoal/60 text-center">
        "May Death Find Alive"
      </div>
    </section>
  );
}
