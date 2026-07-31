import { hobbies, spotifyTrackId } from "@/data/hobbies";
import HorizontalScrollSection from "./HorizontalScrollSection";

export default function Hobbies() {
  return (
    <section id="hobbies-section">
      <div className="section-head">
        <div className="eyebrow">Off the clock</div>
        <h2 className="section-title">
          The things that shape how I think, not just what I do.
        </h2>
      </div>
      <HorizontalScrollSection short>
        {hobbies.slice(0, 2).map((h) => (
          <div className="hobby-card" key={h.title}>
            <div className="hobby-icon">{h.icon}</div>
            <div className="hobby-title">{h.title}</div>
            <div className="hobby-line">{h.line}</div>
          </div>
        ))}

        <div className="spotify-card">
          <div className="spotify-label">Currently on repeat</div>
          <iframe
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height={152}
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {hobbies.slice(2).map((h) => (
          <div className="hobby-card" key={h.title}>
            <div className="hobby-icon">{h.icon}</div>
            <div className="hobby-title">{h.title}</div>
            <div className="hobby-line">{h.line}</div>
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
}
