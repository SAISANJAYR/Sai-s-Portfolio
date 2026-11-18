import * as icons from "simple-icons";
import { exploring, stack } from "@/data/profile";

type SimpleIcon = { path: string; title: string };

function Glyph({ icon, name }: { icon?: string; name: string }) {
  const si = icon ? (icons as unknown as Record<string, SimpleIcon | undefined>)[icon] : undefined;
  if (si) {
    return (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d={si.path} />
      </svg>
    );
  }
  // lettermark for tools without a published logo
  return (
    <span className="tool__mark" aria-hidden="true">
      {name.slice(0, 2)}
    </span>
  );
}

/** Tools & tech stack — dark cards that turn light and explain themselves on hover. */
export default function Stack() {
  return (
    <section className="sec stack" aria-labelledby="stack-title">
      <div className="wrap">
        <p className="t-label t-muted">tools &amp; stack</p>
        <h2 className="stack__title reveal" id="stack-title">
          Tools &amp; tech stack I use
        </h2>

        <ul className="tools">
          {stack.map((s, i) => (
            <li
              key={s.name}
              className="tool reveal"
              style={{ "--d": `${(i % 5) * 0.05 + Math.floor(i / 5) * 0.04}s` } as React.CSSProperties}
              tabIndex={0}
              aria-label={`${s.name} — ${s.group}: ${s.note}`}
            >
              <div className="tool__card">
                <span className="tool__group">{s.group}</span>
                <span className="tool__icon">
                  <Glyph icon={s.icon} name={s.name} />
                </span>
                <span className="tool__name">{s.name}</span>
                <span className="tool__note">{s.note}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="stack__exploring reveal">
          <span className="t-label t-muted">Currently exploring</span>
          <span>{exploring.join(" · ")}</span>
        </p>
      </div>
    </section>
  );
}
