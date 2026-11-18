import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site/SiteFooter";
import Schematic from "@/components/site/Schematic";
import { Rich, StatusMark, TechList, pad } from "@/components/site/bits";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.intro,
    openGraph: { title: `${p.title} — SaiSanjay R`, description: p.intro, images: [p.photo.src] },
  };
}

function Section({ n, label, title, children }: { n: number; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="cs-sec reveal" aria-labelledby={`cs-${n}`}>
      <div className="cs-sec__label">
        <span className="t-label">
          {pad(n)} — {label}
        </span>
        <h2 className="t-h4" id={`cs-${n}`}>
          {title}
        </h2>
      </div>
      <div className="cs-sec__body">{children}</div>
    </section>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const sparse = !p.problem && !p.approach;

  let n = 0;
  const sections: React.ReactNode[] = [];
  if (p.problem)
    sections.push(
      <Section key="problem" n={++n} label="Problem" title="What needed solving">
        {p.problem.map((t, k) => (
          <p key={k}>
            <Rich text={t} />
          </p>
        ))}
      </Section>
    );
  if (p.approach)
    sections.push(
      <Section key="approach" n={++n} label="Approach" title="How it was built">
        <ol className="cs-points">
          {p.approach.map((t, k) => (
            <li key={k}>
              <span>
                <Rich text={t} />
              </span>
            </li>
          ))}
        </ol>
        <figure className="cs-diagram">
          <div className="plate plate--auto">
            <div className="plate__media">
              <Schematic kind={p.schematic} title={p.title} />
            </div>
            <span className="plate__frame" aria-hidden="true" />
          </div>
          <figcaption className="t-label t-muted">System diagram — drawn from the documented architecture</figcaption>
        </figure>
        {p.figures && (
          <div className="cs-figs">
            {p.figures.map((f) => (
              <figure className="cs-fig" key={f.src}>
                <div className="cs-fig__img">
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 640px) 100vw, 30vw" />
                </div>
                <figcaption className="t-label">{f.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>
    );
  if (p.challenges)
    sections.push(
      <Section key="challenges" n={++n} label="Challenges" title="What pushed back">
        <ol className="cs-points">
          {p.challenges.map((t, k) => (
            <li key={k}>
              <span>
                <Rich text={t} />
              </span>
            </li>
          ))}
        </ol>
      </Section>
    );
  if (p.results)
    sections.push(
      <Section key="results" n={++n} label={p.resultsLabel ?? "Results"} title={p.status === "In progress" ? "Where it stands" : "What came out"}>
        {p.results.map((t, k) => (
          <p key={k}>
            <Rich text={t} />
          </p>
        ))}
      </Section>
    );

  return (
    <>
      <main id="main">
        <article>
          <header className="page-head" style={{ paddingBottom: 0 }}>
            <div className="wrap">
              <div className="page-head__meta t-label">
                <Link href="/projects" className="link-u">
                  ← All projects
                </Link>
                <span>
                  {pad(i + 1)} / {pad(projects.length)}
                </span>
              </div>

              <p className="t-label t-accent" style={{ marginBottom: "1.25rem" }}>
                {p.category}
              </p>
              {p.award && <p className="cs-award">{p.award}</p>}
              <h1 className="t-h1" style={{ maxWidth: "11em" }}>
                {p.title}
              </h1>
              <p className="t-h4 t-italic t-muted" style={{ marginTop: "0.75rem" }}>
                {p.subtitle}
              </p>
              <p className="t-lead" style={{ marginTop: "2rem", marginBottom: p.credit ? "1.25rem" : "clamp(2.5rem, 5vw, 4rem)" }}>
                {p.intro}
              </p>
              {p.credit && (
                <p className="cs-credit t-mono" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
                  {p.credit}
                </p>
              )}

              <dl className="cs-meta">
                <div>
                  <dt className="t-label">Status</dt>
                  <dd>
                    <StatusMark status={p.status} />
                  </dd>
                </div>
                <div>
                  <dt className="t-label">Timeline</dt>
                  <dd className="t-mono">{p.date ?? "—"}</dd>
                </div>
                <div>
                  <dt className="t-label">Category</dt>
                  <dd className="t-mono">{p.category}</dd>
                </div>
                <div>
                  <dt className="t-label">Links</dt>
                  <dd className="t-mono">
                    {p.links && p.links.length > 0 ? (
                      <span style={{ display: "grid", gap: "0.3rem" }}>
                        {p.links.map((l) =>
                          l.external ? (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-u">
                              {l.label} ↗
                            </a>
                          ) : (
                            <a key={l.href} href={l.href} className="link-u">
                              {l.label} →
                            </a>
                          )
                        )}
                      </span>
                    ) : (
                      <span className="t-muted">Not yet published</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="wrap">
            <figure className="cs-hero reveal">
              <div className="cs-hero__img">
                <Image src={p.photo.src} alt={p.photo.alt} fill priority sizes="(max-width: 1320px) 100vw, 1320px" />
              </div>
              <figcaption className="t-label t-muted">
                <a href={p.photo.href} target="_blank" rel="noopener noreferrer" className="link-u">
                  {p.photo.credit}
                </a>
              </figcaption>
            </figure>

            <section className="cs-sec reveal" aria-labelledby="cs-stack">
              <div className="cs-sec__label">
                <span className="t-label">{pad(0)} — Stack</span>
                <h2 className="t-h4" id="cs-stack">
                  Technologies
                </h2>
              </div>
              <div className="cs-sec__body">
                <TechList items={p.tech} label={`${p.title} technologies`} />
              </div>
            </section>

            {sections}

            {sparse && (
              <section className="cs-sec reveal" aria-label="Documentation status">
                <div className="cs-sec__label">
                  <span className="t-label">{pad(1)} — Notes</span>
                </div>
                <div className="cs-sec__body">
                  <p className="cs-note">
                    The full write-up for this project — problem, approach and outcome — is still being documented. The
                    summary above is everything on record so far.
                  </p>
                </div>
              </section>
            )}

            <nav className="cs-next" aria-label="More projects" style={{ marginTop: "var(--sec-y)" }}>
              <Link href={`/projects/${prev.slug}`}>
                <span className="t-label t-muted">← Previous</span>
                <span className="t-h3" style={{ display: "block" }}>
                  {prev.title}
                </span>
              </Link>
              <Link href={`/projects/${next.slug}`}>
                <span className="t-label t-muted">Next →</span>
                <span className="t-h3" style={{ display: "block" }}>
                  {next.title}
                </span>
              </Link>
            </nav>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
