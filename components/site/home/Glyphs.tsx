/**
 * Faint line drawings of the things that make up SaiSanjay — films, music,
 * books, running, travel. Each one is an original single-weight outline,
 * drawn here as SVG. They sit around the portrait at low opacity; hovering
 * one brings it forward with a small caption.
 *
 * Captions only name things (titles, characters, his own lines) — no lyrics.
 */

type G = { id: string; label: string; vb: string; body: JSX.Element };

export const glyphs: Record<string, G> = {
  r2: {
    id: "r2",
    label: "R2-D2 · Star Wars",
    vb: "0 0 100 120",
    body: (
      <>
        <path d="M28 46 A22 22 0 0 1 72 46" />
        <path d="M28 46 H72" />
        <circle cx="50" cy="34" r="5" />
        <path d="M40 40 h4 M56 40 h4" />
        <path d="M30 46 V92 Q30 98 36 98 H64 Q70 98 70 92 V46" />
        <path d="M38 56 h24 M38 62 h24 M42 70 h16 v12 h-16 z" />
        <path d="M30 52 L18 58 V104 H28 L30 96" />
        <path d="M70 52 L82 58 V104 H72 L70 96" />
        <path d="M14 104 h18 M68 104 h18" />
        <path d="M44 98 L42 108 H58 L56 98" />
      </>
    ),
  },
  saber: {
    id: "saber",
    label: "“Hello there.” — Obi-Wan Kenobi",
    vb: "0 0 40 140",
    body: (
      <>
        <path d="M16 6 H24 V86 H16 Z" />
        <path d="M14 86 H26 V92 H14 Z" />
        <path d="M15 92 H25 V126 Q25 130 21 130 H19 Q15 130 15 126 Z" />
        <path d="M15 100 H25 M15 106 H25 M15 112 H25" />
        <circle cx="20" cy="120" r="2" />
      </>
    ),
  },
  vinyl: {
    id: "vinyl",
    label: "On repeat — The Narcissist, Blur",
    vb: "0 0 120 120",
    body: (
      <>
        <circle cx="60" cy="60" r="50" />
        <circle cx="60" cy="60" r="40" opacity="0.5" />
        <circle cx="60" cy="60" r="30" opacity="0.5" />
        <circle cx="60" cy="60" r="16" />
        <circle cx="60" cy="60" r="2.5" />
        <path id="vinyl-arc" d="M47 60 A13 13 0 0 1 73 60" fill="none" stroke="none" />
        <text fontSize="5.4" letterSpacing="1.2" stroke="none" fill="currentColor">
          <textPath href="#vinyl-arc" startOffset="50%" textAnchor="middle">
            BLUR
          </textPath>
        </text>
      </>
    ),
  },
  tape: {
    id: "tape",
    label: "Little by Little — Oasis",
    vb: "0 0 140 90",
    body: (
      <>
        <rect x="6" y="8" width="128" height="74" rx="6" />
        <rect x="18" y="18" width="104" height="30" rx="3" />
        <circle cx="46" cy="33" r="8" />
        <circle cx="94" cy="33" r="8" />
        <path d="M54 33 H86" />
        <path d="M36 82 L44 62 H96 L104 82" />
        <text x="70" y="58" fontSize="6.2" letterSpacing="1.4" textAnchor="middle" stroke="none" fill="currentColor">
          LITTLE BY LITTLE
        </text>
      </>
    ),
  },
  bus: {
    id: "bus",
    label: "Bus 142 · Into the Wild",
    vb: "0 0 160 80",
    body: (
      <>
        <path d="M10 60 V24 Q10 14 20 14 H138 Q150 14 150 26 V60 Z" />
        <path d="M10 34 H150" />
        <path d="M24 20 h20 v12 h-20 z M52 20 h20 v12 h-20 z M80 20 h20 v12 h-20 z M108 20 h28 v12 h-28 z" />
        <circle cx="38" cy="62" r="9" />
        <circle cx="122" cy="62" r="9" />
        <text x="80" y="52" fontSize="11" letterSpacing="2" textAnchor="middle" stroke="none" fill="currentColor">
          142
        </text>
      </>
    ),
  },
  book: {
    id: "book",
    label: "1984 — George Orwell",
    vb: "0 0 100 120",
    body: (
      <>
        <path d="M18 10 H82 V108 H18 Z" />
        <path d="M24 10 V108" />
        <path d="M36 50 Q53 36 70 50 Q53 64 36 50 Z" />
        <circle cx="53" cy="50" r="5" />
        <text x="53" y="88" fontSize="12" letterSpacing="2" textAnchor="middle" stroke="none" fill="currentColor">
          1984
        </text>
      </>
    ),
  },
  shoe: {
    id: "shoe",
    label: "Does his best thinking mid-run",
    vb: "0 0 150 80",
    body: (
      <>
        <path d="M12 58 Q10 40 26 38 L52 34 Q60 22 72 24 L84 44 Q112 46 132 54 Q142 58 138 66 H14 Q10 64 12 58 Z" />
        <path d="M14 66 H138" />
        <path d="M58 36 l6 8 M66 32 l6 9 M74 30 l5 10" />
        <path d="M2 30 h16 M6 22 h12 M0 38 h10" opacity="0.6" />
      </>
    ),
  },
  peaks: {
    id: "peaks",
    label: "Somewhere new — travel",
    vb: "0 0 150 90",
    body: (
      <>
        <path d="M6 80 L50 22 L72 50 L92 30 L144 80 Z" />
        <path d="M42 33 L50 22 L58 33 L54 30 L50 34 L46 30 Z" />
        <circle cx="118" cy="20" r="8" />
        <path d="M6 86 H144" opacity="0.6" />
      </>
    ),
  },
  camera: {
    id: "camera",
    label: "The Secret Life of Walter Mitty",
    vb: "0 0 140 100",
    body: (
      <>
        <path d="M10 30 Q10 24 16 24 H40 L48 14 H82 L90 24 H124 Q130 24 130 30 V84 Q130 90 124 90 H16 Q10 90 10 84 Z" />
        <circle cx="70" cy="57" r="22" />
        <circle cx="70" cy="57" r="13" />
        <circle cx="70" cy="57" r="4" opacity="0.6" />
        <rect x="104" y="32" width="16" height="8" rx="2" />
        <path d="M20 24 V18 H32 V24" />
      </>
    ),
  },
  car: {
    id: "car",
    label: "Road trips — Zindagi Na Milegi Dobara · Dil Chahta Hai",
    vb: "0 0 170 80",
    body: (
      <>
        <path d="M8 56 Q8 46 18 44 L44 40 L62 24 Q66 20 74 20 H104 Q112 20 118 26 L132 40 L156 44 Q164 46 164 56 V60 H8 Z" />
        <path d="M66 40 L76 26 H100 L112 40 Z" opacity="0.7" />
        <circle cx="42" cy="62" r="11" />
        <circle cx="132" cy="62" r="11" />
        <path d="M2 70 H168" opacity="0.5" />
        <path d="M120 16 l10 -8 M128 18 l12 -4" opacity="0.6" />
      </>
    ),
  },
  parachute: {
    id: "parachute",
    label: "Jumping in — Zindagi Na Milegi Dobara",
    vb: "0 0 120 140",
    body: (
      <>
        <path d="M10 50 Q60 -10 110 50 Q97 42 85 50 Q72 42 60 50 Q48 42 35 50 Q23 42 10 50 Z" />
        <path d="M35 50 Q48 20 60 10 M85 50 Q72 20 60 10" opacity="0.5" />
        <path d="M10 50 L56 108 M35 50 L57 106 M60 50 V106 M85 50 L63 106 M110 50 L64 108" />
        <circle cx="60" cy="112" r="5" />
        <path d="M60 117 V130 M60 122 L52 128 M60 122 L68 128 M60 130 L54 138 M60 130 L66 138" />
      </>
    ),
  },
  watch: {
    id: "watch",
    label: "5K — 27:18. Chasing sub-25.",
    vb: "0 0 110 130",
    body: (
      <>
        <circle cx="55" cy="72" r="44" />
        <path d="M47 18 H63 M55 18 V28" />
        <path d="M86 36 l7 -7" />
        <path d="M55 72 V44" />
        <path d="M55 72 L72 82" opacity="0.6" />
        <text x="55" y="104" fontSize="11" letterSpacing="1.2" textAnchor="middle" stroke="none" fill="currentColor">
          27:18
        </text>
      </>
    ),
  },
  rover: {
    id: "rover",
    label: "Qbotix rover — AI & Vision",
    vb: "0 0 160 110",
    body: (
      <>
        <rect x="34" y="40" width="92" height="28" rx="4" />
        <path d="M80 40 V20 M70 20 H90 V12 H70 Z" />
        <circle cx="80" cy="16" r="2.5" />
        <path d="M44 68 L30 84 M80 68 V84 M116 68 L130 84" />
        <circle cx="30" cy="90" r="10" />
        <circle cx="80" cy="90" r="10" />
        <circle cx="130" cy="90" r="10" />
        <path d="M100 40 L112 26" />
        <circle cx="114" cy="24" r="4" />
        <path d="M10 102 H150" opacity="0.5" />
      </>
    ),
  },
  guitar: {
    id: "guitar",
    label: "Oasis, Blur & psychedelic rock",
    vb: "0 0 70 160",
    body: (
      <>
        <path d="M35 150 Q12 150 12 128 Q12 114 22 108 Q16 98 24 90 Q30 86 31 80 V24 H39 V80 Q40 86 46 90 Q54 98 48 108 Q58 114 58 128 Q58 150 35 150 Z" />
        <circle cx="35" cy="118" r="7" />
        <path d="M27 136 H43" />
        <path d="M29 10 H41 L42 24 H28 Z" />
        <path d="M24 12 h5 M24 18 h5 M41 12 h5 M41 18 h5" opacity="0.6" />
        <path d="M33 24 V136 M37 24 V136" opacity="0.4" />
      </>
    ),
  },
  milestone: {
    id: "milestone",
    label: "19 km, for my 19th birthday",
    vb: "0 0 70 110",
    body: (
      <>
        <path d="M12 104 V40 Q12 10 35 10 Q58 10 58 40 V104 Z" />
        <path d="M12 46 H58" />
        <path d="M4 104 H66" opacity="0.6" />
        <text x="35" y="70" fontSize="16" letterSpacing="0.5" textAnchor="middle" stroke="none" fill="currentColor">
          19
        </text>
        <text x="35" y="84" fontSize="7" letterSpacing="2" textAnchor="middle" stroke="none" fill="currentColor">
          KM
        </text>
      </>
    ),
  },
  headphones: {
    id: "headphones",
    label: "Tune first, lyrics later",
    vb: "0 0 120 110",
    body: (
      <>
        <path d="M20 70 V58 Q20 18 60 18 Q100 18 100 58 V70" />
        <rect x="12" y="64" width="20" height="34" rx="7" />
        <rect x="88" y="64" width="20" height="34" rx="7" />
        <path d="M26 64 V76 M94 64 V76" opacity="0.5" />
      </>
    ),
  },
  reel: {
    id: "reel",
    label: "Cinema",
    vb: "0 0 120 120",
    body: (
      <>
        <circle cx="60" cy="60" r="48" />
        <circle cx="60" cy="60" r="8" />
        {[0, 72, 144, 216, 288].map((a) => {
          const r = (a * Math.PI) / 180;
          return <circle key={a} cx={60 + Math.cos(r) * 28} cy={60 + Math.sin(r) * 28} r="11" />;
        })}
      </>
    ),
  },
};

export function Glyph({ id, className, style }: { id: keyof typeof glyphs; className?: string; style?: React.CSSProperties }) {
  const g = glyphs[id];
  return (
    <figure className={`glyph ${className ?? ""}`} style={style} aria-hidden="true">
      <svg viewBox={g.vb} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {g.body}
      </svg>
      <figcaption>{g.label}</figcaption>
    </figure>
  );
}
