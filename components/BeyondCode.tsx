import HorizontalScrollSection from "./HorizontalScrollSection";

const items = [
  {
    title: "Running",
    line: "Running is where thoughts become quieter. Ideas become clearer. Sometimes the best solutions arrive when everything else slows down.",
    quote: '"What I talk about when I talk about running."'
  },
  {
    title: "Cinema",
    line: "I love films that stay with me long after the credits roll. Cinema isn't just entertainment. It's another way of understanding people.",
    quote: '"Happiness is only real when shared." — Into the Wild'
  },
  {
    title: "Music",
    line: "I don't stay within one genre. I enjoy discovering artists, understanding lyrics, and finding songs that become part of different chapters of life.",
    quote: ""
  },
  {
    title: "Exploration & Travelling",
    line: "The world is too large to stay in one place. I find clarity in new environments and different perspectives.",
    quote: '"To travel is to discover that everyone is wrong about other countries."'
  },
  {
    title: "Books",
    line: "Whether mythology, technology or philosophy, every book is another conversation waiting to happen.",
    quote: "...BIG BROTHER IS WATCHING YOU. — 1984"
  },
  {
    title: "Curiosity",
    line: "I don't collect hobbies. I follow curiosities. Whenever something fascinates me, I enjoy going beyond the surface until I understand why it exists.",
    quote: '"I have no special talent. I am only passionately curious."'
  }
];

export default function BeyondCode() {
  return (
    <section id="hobbies-section">
      <div className="section-head">
        <div className="eyebrow">Beyond Code</div>
        <h2 className="section-title">
          The things that shape how I think, not just what I do.
        </h2>
      </div>
      <HorizontalScrollSection short>
        {items.map((item) => (
          <div className="hobby-card w-[320px] md:w-[380px] shrink-0 p-6 glass flex flex-col justify-center relative" key={item.title}>
            <div className="hobby-title text-xl md:text-2xl font-display mb-3">{item.title}</div>
            <div className="hobby-line text-sm md:text-base text-graymid leading-relaxed mb-6">{item.line}</div>
            
            {item.title === "Music" && (
              <div className="mt-2 rounded-xl overflow-hidden glass p-3 flex justify-center items-center">
                <img 
                  src="/image.png" 
                  alt="Spotify Code" 
                  className="w-full max-w-[200px] h-auto object-contain opacity-90"
                />
              </div>
            )}
            
            {item.quote && (
              <div className={`mt-auto pt-6 text-charcoal/40 font-mono italic text-[10px] tracking-widest uppercase ${item.title === "Books" ? 'text-charcoal/60 font-bold' : ''}`}>
                {item.quote}
              </div>
            )}
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
}
