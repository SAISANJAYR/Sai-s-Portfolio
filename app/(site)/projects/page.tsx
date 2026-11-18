import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import GitHubActivity from "@/components/site/GitHubActivity";
import { StatusMark, pad } from "@/components/site/bits";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by SaiSanjay R — PRRegression Audit (OpenEnv Hackathon Grand Finalist), Smart Document Hub and SatSaathi, with live GitHub activity.",
};

export const revalidate = 43200;

export default function ProjectsPage() {
  const inProgress = projects.filter((p) => p.status === "In progress").length;
  const hackathons = projects.filter((p) => p.credit).length;
  return (
    <>
      <main id="main" className="main--rounded">
        <header className="page-head pj-head">
          <div className="wrap">
            <h1 className="pj-title reveal">Projects</h1>
            <dl className="pj-stats reveal" style={{ "--d": "0.08s" } as React.CSSProperties}>
              <div>
                <dt className="t-label t-muted">Total projects</dt>
                <dd>{pad(projects.length)}</dd>
              </div>
              <div>
                <dt className="t-label t-muted">Built at hackathons</dt>
                <dd>{pad(hackathons)}</dd>
              </div>
              <div>
                <dt className="t-label t-muted">In progress</dt>
                <dd>{pad(inProgress)}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="wrap">
          <div className="reveal">
            <GitHubActivity />
          </div>

          <ul className="tiles">
            {projects.map((p, i) => {
              const href = `/projects/${p.slug}`;
              return (
                <li className="tile reveal" key={p.slug} style={{ "--d": `${(i % 2) * 0.08}s` } as React.CSSProperties}>
                  <Link href={href} className="tile__link" aria-labelledby={`tile-${p.slug}`}>
                    <div className="tile__img">
                      <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 900px) 100vw, 46vw" />
                      {p.award && <span className="tile__award">{p.award}</span>}
                    </div>
                    <div className="tile__row">
                      <h2 className="tile__name" id={`tile-${p.slug}`}>
                        {p.title}
                      </h2>
                      <span className="t-label t-muted">{pad(i + 1)}</span>
                    </div>
                    <p className="tile__quote">“{p.quote}”</p>
                    <ul className="tile__tags" aria-label="Key technologies">
                      {p.tech.slice(0, 4).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="tile__foot">
                      <StatusMark status={p.status} />
                      <span className="t-label t-muted">
                        {p.year} <span className="tile__arr" aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
