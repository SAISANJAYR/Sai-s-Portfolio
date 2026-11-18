import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import ListenSlot from "@/components/site/ListenSlot";
import { pad } from "@/components/site/bits";
import { hobbies, listening, protosemHref, roles } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "About SaiSanjay R — what he works on, where he is now (ProtoSem intern at Forger Innovations & Ventures, Qbotix Rover Team), the ideas he keeps returning to, and life away from the screen.",
};

/** In SaiSanjay's own words, from the Journey chapters. */
const ideas = [
  "Understand the concepts beneath a framework, instead of attaching yourself to one ecosystem.",
  "Every project is another chance to understand how real systems are built.",
  "Try to understand the world a little better than yesterday.",
];

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <header className="page-head">
          <div className="wrap">
            <div className="page-head__meta t-label">
              <span>§ About</span>
              <span>Coimbatore, India</span>
            </div>
            <div className="about-head">
              <div className="about-head__text">
                <h1 className="t-display reveal">
                  About <span className="t-italic">me.</span>
                </h1>
                <p className="t-lead reveal" style={{ ...d(0.1), color: "var(--fg)", marginTop: "clamp(2rem, 4vw, 3rem)" }}>
                  I’m SaiSanjay — a computer science student who would rather understand an idea than memorise a tool.
                  I build software, mostly around AI, and I take on work that crosses into other disciplines whenever it
                  asks me to.
                </p>
                <p className="t-body reveal" style={{ ...d(0.16), marginTop: "1.25rem" }}>
                  Computer science stopped being a school subject for me towards the end of 12th standard, when I wanted
                  to know how it actually worked. That question led to CS50, then to machine learning, and eventually to
                  building things of my own. I still don’t define myself by a language or a framework — I enjoy
                  exploring ideas, in code and well outside it.
                </p>
              </div>
              <figure className="about-head__fig reveal" style={d(0.12)}>
                <div className="photo">
                  <Image
                    src="/about_photo.webp"
                    alt="SaiSanjay sitting on the grass on campus, smiling, holding his Mahatma Gandhi Merit Scholarship certificate."
                    fill
                    priority
                    sizes="(max-width: 900px) 80vw, 32vw"
                  />
                </div>
                <figcaption className="photo__cap t-label t-muted">Mahatma Gandhi Merit Scholarship, 2025–26</figcaption>
              </figure>
            </div>
          </div>
        </header>

        {/* NOW */}
        <section className="sec sec--tight" aria-labelledby="now-title">
          <div className="wrap">
            <div className="about-sec">
              <div className="about-sec__label">
                <p className="t-label t-muted">01</p>
                <h2 className="t-h2" id="now-title">
                  Right <span className="t-italic">now.</span>
                </h2>
              </div>
              <ul className="roles">
                {roles.map((r, i) => (
                  <li className="role reveal" key={r.org} style={d(i * 0.06)}>
                    <span className="role__kind t-label t-muted">{r.kind}</span>
                    <div>
                      <h3 className="t-h4">
                        {r.href ? (
                          <a href={r.href} className="link-u">
                            {r.title} — {r.org}
                          </a>
                        ) : (
                          <>
                            {r.title} — {r.org}
                          </>
                        )}
                      </h3>
                      <p className="t-muted">{r.line}</p>
                    </div>
                    <span className="role__when t-label t-muted">{r.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className="sec sec--tight" aria-labelledby="works-title">
          <div className="wrap">
            <div className="about-sec">
              <div className="about-sec__label">
                <p className="t-label t-muted">02</p>
                <h2 className="t-h2" id="works-title">
                  What I <span className="t-italic">work on.</span>
                </h2>
              </div>
              <div>
                <p className="t-lead reveal" style={{ color: "var(--fg)" }}>
                  Agentic AI and reinforcement learning, backend systems that keep heavy AI work off the request path,
                  and machine learning written from first principles. On ProtoSem and with the Qbotix Rover Team, the
                  work reaches beyond software altogether.
                </p>
                <ul className="mini-list reveal" style={d(0.08)}>
                  {projects.map((p, i) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`}>
                        <span className="t-label t-muted">{pad(i + 1)}</span>
                        <span className="mini-list__title">{p.title}</span>
                        <span className="t-muted mini-list__sub">{p.subtitle}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a href={protosemHref}>
                      <span className="t-label t-muted">↗</span>
                      <span className="mini-list__title">ProtoSem log</span>
                      <span className="t-muted mini-list__sub">Interdisciplinary builds, week by week</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IDEAS */}
        <section className="sec sec--tight" aria-labelledby="ideas-title">
          <div className="wrap">
            <div className="about-sec">
              <div className="about-sec__label">
                <p className="t-label t-muted">03</p>
                <h2 className="t-h2" id="ideas-title">
                  Ideas I keep <span className="t-italic">returning to.</span>
                </h2>
              </div>
              <ol className="ideas">
                {ideas.map((t, i) => (
                  <li key={t} className="reveal" style={d(i * 0.08)}>
                    <span className="ideas__num">{["I", "II", "III"][i]}</span>
                    <p>{t}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* HOBBIES */}
        <section className="sec sec--tight" aria-labelledby="hobbies-title">
          <div className="wrap">
            <div className="about-sec">
              <div className="about-sec__label">
                <p className="t-label t-muted">04</p>
                <h2 className="t-h2" id="hobbies-title">
                  Beyond <span className="t-italic">code.</span>
                </h2>
              </div>
              <ul className="hobbies">
                {hobbies.map((h, i) => (
                  <li key={h.title} className="reveal" style={d((i % 2) * 0.08)}>
                    <h3 className="t-h4">{h.title}</h3>
                    <p className="t-muted">{h.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LISTENING */}
        <section className="sec sec--tight" aria-labelledby="listen-title" style={{ paddingBottom: "var(--sec-y)" }}>
          <div className="wrap">
            <div className="about-sec">
              <div className="about-sec__label">
                <p className="t-label t-muted">05</p>
                <h2 className="t-h2" id="listen-title">
                  On <span className="t-italic">repeat.</span>
                </h2>
              </div>
              <div className="listen reveal">
                {listening.map((l) => (
                  <ListenSlot key={l.src} label={l.label} src={l.src} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
