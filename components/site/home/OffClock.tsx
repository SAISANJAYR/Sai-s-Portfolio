import { song } from "@/data/profile";
import { Glyph } from "./Glyphs";

const items = [
  { glyph: "shoe", name: "Running", line: "Where ideas get clearer." },
  { glyph: "reel", name: "Cinema", line: "Films that stay after the credits." },
  { glyph: "vinyl", name: "Music", line: "No single genre." },
  { glyph: "book", name: "Books", line: "Mythology, philosophy, 1984." },
  { glyph: "peaks", name: "Travel", line: "Clarity in new places." },
] as const;

/** A quiet coda: what fills the hours away from the screen, and one song. */
export default function OffClock() {
  return (
    <section className="sec off" aria-labelledby="off-title">
      <div className="wrap off__grid">
        <div>
          <p className="t-label t-muted">Off the clock</p>
          <h2 className="off__title reveal" id="off-title">
            When I’m not <em>building.</em>
          </h2>
          <ul className="off__list">
            {items.map((it, i) => (
              <li key={it.name} className="reveal" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                <Glyph id={it.glyph} className="glyph--icon" />
                <span className="off__name">{it.name}</span>
                <span className="off__line">{it.line}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="off__song reveal">
          <figcaption className="t-label t-muted">
            On repeat — {song.title}, {song.artist}
          </figcaption>
          <iframe
            src={song.src}
            title={`Spotify — ${song.title} by ${song.artist}`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
