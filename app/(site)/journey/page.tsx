import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import journey from "@/data/journey.json";
import { milestones } from "@/data/milestones";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "How SaiSanjay R went from CS50P to multi-agent reinforcement learning — six chapters and a dated ledger of courses, projects, competitions and milestones.",
};

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * journey.json stores each chapter as plain text with blank-line paragraphs,
 * "•" bullet lines, quoted questions and short one-line "stanzas".
 * Render that structure editorially instead of as a pre-wrapped block.
 */
function Verse({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className="verse">
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        const bullets = lines.filter((l) => l.startsWith("•"));
        if (bullets.length) {
          const lead = lines.filter((l) => !l.startsWith("•"));
          return (
            <div key={i}>
              {lead.map((l, k) => (
                <p key={k}>{l}</p>
              ))}
              <ul>
                {bullets.map((l, k) => (
                  <li key={k}>{l.replace(/^•\s*/, "")}</li>
                ))}
              </ul>
            </div>
          );
        }
        if (lines.length === 1 && /^["“].*["”]$/.test(lines[0])) {
          return <blockquote key={i}>{lines[0]}</blockquote>;
        }
        // several very short lines read as a stanza ("Search. / Optimization. / …")
        if (lines.length > 1 && lines.every((l) => l.length < 28)) {
          return (
            <p key={i} className="stanza">
              {lines.map((l, k) => (
                <span key={k} style={{ display: "block" }}>
                  {l}
                </span>
              ))}
            </p>
          );
        }
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

export default function JourneyPage() {
  return (
    <>
      <main id="main">
        <header className="page-head">
          <div className="wrap">
            <div className="page-head__meta t-label">
              <span>§ Journey</span>
              <span>
                {String(journey.length).padStart(2, "0")} chapters · {milestones.length} entries
              </span>
            </div>
            <div className="page-head__grid">
              <h1 className="page-head__title t-display">
                Still <span className="t-italic t-accent">becoming.</span>
              </h1>
              <p className="page-head__intro t-lead">
                A record of curiosities followed, hard lessons learned, and the incremental steps that shape a builder —
                told first as a story, then as a ledger.
              </p>
            </div>
          </div>
        </header>

        <section className="wrap" aria-label="Chapters">
          {journey.map((c, i) => (
            <article className="chapter" key={c.chapter} aria-labelledby={`ch-${c.chapter}`}>
              <div className="chapter__num">
                <div className="chapter__sticky">
                  <span className="t-label t-muted">Chapter</span>
                  <span className="chapter__numeral" aria-hidden="true">
                    {roman[i]}
                  </span>
                </div>
              </div>
              <h2 className="chapter__title t-h2 reveal" id={`ch-${c.chapter}`}>
                <span className="sr-only">Chapter {c.chapter}: </span>
                {c.title}
              </h2>
              <div className="chapter__text reveal" style={{ "--d": "0.1s" } as React.CSSProperties}>
                <Verse text={c.text} />
              </div>
            </article>
          ))}
        </section>

        <section className="sec surface-dark" aria-labelledby="ledger-title" style={{ marginTop: "var(--sec-y)" }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="sec-head__idx t-label">§ The ledger</div>
              <h2 className="sec-head__title t-h2" id="ledger-title">
                The same story, <span className="t-italic t-accent">by the record.</span>
              </h2>
              <div className="sec-head__aside t-label">“—” = undated</div>
            </div>

            <table className="ledger">
              <caption className="sr-only">Milestones with dates where known</caption>
              <thead>
                <tr className="t-label">
                  <th scope="col">When</th>
                  <th scope="col">Milestone</th>
                  <th scope="col">Kind</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m.event}>
                    <td className="t-label">{m.when}</td>
                    <td>
                      <span className="ledger__event">
                        {m.href && /^\/(protosem|iot)/.test(m.href) ? (
                          <a href={m.href} className="link-u">
                            {m.event}
                          </a>
                        ) : m.href ? (
                          <Link href={m.href} className="link-u">
                            {m.event}
                          </Link>
                        ) : (
                          m.event
                        )}
                      </span>
                      {m.detail && <span className="ledger__detail">{m.detail}</span>}
                    </td>
                    <td className="t-label">{m.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="sec closing" aria-labelledby="journey-next">
          <div className="wrap">
            <h2 className="t-h1 reveal" id="journey-next" style={{ maxWidth: "12em" }}>
              See what came <span className="t-italic t-accent">out of it.</span>
            </h2>
            <div className="closing__links reveal">
              <Link href="/projects" className="link-arrow">
                All projects <span className="arr" aria-hidden="true">→</span>
              </Link>
              <a href="/protosem" className="link-arrow">
                ProtoSem log <span className="arr arr--ne" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
