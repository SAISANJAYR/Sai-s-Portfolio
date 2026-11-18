import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import ResumeToc from "@/components/site/ResumeToc";
import PrintButton from "@/components/site/PrintButton";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of SaiSanjay R — B.Tech AI & Data Science, Kumaraguru College of Technology. Skills, projects, leadership and achievements, with a downloadable PDF.",
};

const sections = [
  { id: "profile", label: "Profile" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Technical skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Selected projects" },
  { id: "leadership", label: "Leadership & teams" },
  { id: "achievements", label: "Achievements" },
  { id: "activities", label: "Activities" },
];

const skills: [string, string][] = [
  ["Languages", "Python (advanced), C, C++, MySQL"],
  ["AI / ML", "JAX, PyTorch, TensorFlow, Keras, reinforcement learning (GRPO, RLVR), Weights & Biases, TensorBoard"],
  ["LLMs & retrieval", "LangChain, LlamaIndex, ChromaDB (vector DB), multi-agent systems"],
  ["Backend & data", "FastAPI, Celery, Redis, MongoDB (Beanie ODM)"],
  ["Tools", "Docker, Git, GitHub, Hugging Face Spaces"],
  ["Embedded", "ESP32, Arduino C++, MQTT, Firebase Realtime Database"],
  ["Interests", "Machine learning, deep learning, computer vision, agentic AI, large language models, backend engineering"],
];

const projects: { title: string; role: string; date: string; slug?: string; tech: string; points: string[] }[] = [
  {
    title: "PRRegression Audit",
    role: "Multi-agent RL code reviewer · OpenEnv Hackathon Grand Finalist",
    date: "Apr 2026",
    slug: "prregression-audit",
    tech: "Python, FastAPI, GRPO fine-tuning, reinforcement learning, multi-agent systems, Docker, W&B",
    points: [
      "Engineered an autonomous 4-agent pipeline (Safety, Defect, Router, Comment) for PR regression detection.",
      "Prevented reward hacking by deploying RLVR (verifiable rewards) for deterministic, zero-LLM programmatic grading.",
      "Achieved a 2.1× performance gain on Medium tasks (reward 0.0382 → 0.5300) fine-tuning Qwen2.5-1.5B via GRPO.",
      "Shipped a live W&B tracking dashboard on HuggingFace Spaces backed by 12+ async FastAPI endpoints.",
    ],
  },
  {
    title: "Smart Document Hub",
    role: "Multilingual document intelligence",
    date: "Jun 2026 — in progress",
    slug: "smart-document-hub",
    tech: "FastAPI, Next.js, LangChain, LlamaIndex, ChromaDB, MongoDB (Beanie ODM), Celery, Redis, spaCy, EasyOCR",
    points: [
      "Architected an async FastAPI + Beanie ODM backend designed to keep document Q&A latency under 2 seconds.",
      "Built a Celery + Redis background pipeline to isolate heavy AI processing from the request–response cycle.",
      "Implemented a hybrid deadline-extraction engine using local spaCy NER and LangChain/Gemini classification.",
      "Constructed a document knowledge graph via cosine similarity on ChromaDB embeddings, visualised with D3.js.",
    ],
  },
  {
    title: "CardioPredict",
    role: "Low-level MLP regression model",
    date: "May 2026",
    slug: undefined,
    tech: "JAX, XLA acceleration, functional programming",
    points: [
      "Bypassed high-level wrappers to build an MLP from scratch using pure functional-programming math.",
      "Leveraged JAX primitives (vmap for vectorisation, grad for reverse-mode autodiff) to optimise XLA training.",
      "Achieved a test MSE of 10.22 over 1,000 epochs using strict feature standardisation.",
    ],
  },
];

export default function ResumePage() {
  return (
    <>
      <main id="main">
        <header className="page-head">
          <div className="wrap">
            <div className="page-head__meta t-label">
              <span>§ Résumé</span>
              <span>Updated 2026</span>
            </div>
            <div className="page-head__grid">
              <div className="page-head__title">
                <h1 className="t-h1">{profile.name}</h1>
                <p className="t-h4 t-italic t-muted" style={{ marginTop: "0.75rem" }}>
                  {profile.degree}
                </p>
                <p className="t-mono t-muted" style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.4rem 1.5rem" }}>
                  <a href={`mailto:${profile.email}`} className="link-u">
                    {profile.email}
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">
                    github.com/{profile.githubHandle}
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                    linkedin/{profile.linkedinHandle}
                  </a>
                  <span>{profile.city}</span>
                </p>
              </div>
              <div className="page-head__intro no-print" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <a href={profile.resumePdf} download="SaiSanjayR_Resume.pdf" className="btn-solid">
                  Download PDF <span aria-hidden="true">↓</span>
                </a>
                <PrintButton />
              </div>
            </div>
          </div>
        </header>

        <div className="wrap cv" style={{ paddingBottom: "var(--sec-y)" }}>
          <ResumeToc items={sections} />

          <div className="cv__body">
            <section id="profile" className="cv-sec" aria-labelledby="h-profile">
              <h2 className="t-label t-muted" id="h-profile">
                Profile
              </h2>
              <p className="t-lead" style={{ color: "var(--fg)" }}>
                AI &amp; Data Science undergraduate at Kumaraguru College of Technology and ProtoSem intern at Forger
                Innovations &amp; Ventures. I build agentic and reinforcement-learning systems, document-intelligence
                backends and neural networks from first principles, and write software for the Qbotix Rover Team.
              </p>
            </section>

            <section id="education" className="cv-sec" aria-labelledby="h-education">
              <h2 className="t-label t-muted" id="h-education">
                Education
              </h2>
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>{profile.college}, Coimbatore</h3>
                  <span className="t-label t-muted">{profile.graduation}</span>
                </div>
                <p className="cv-item__role t-label">{profile.degree}</p>
                <p className="cv-item__tech t-mono">CGPA {profile.cgpa}</p>
              </div>
            </section>

            <section id="skills" className="cv-sec" aria-labelledby="h-skills">
              <h2 className="t-label t-muted" id="h-skills">
                Technical skills
              </h2>
              <dl className="cv-skills">
                {skills.map(([k, v]) => (
                  <div key={k}>
                    <dt className="t-label">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="experience" className="cv-sec" aria-labelledby="h-experience">
              <h2 className="t-label t-muted" id="h-experience">
                Experience
              </h2>
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>ProtoSem Intern — Forger Innovations &amp; Ventures</h3>
                  <span className="t-label t-muted">Jul 2026 — Present</span>
                </div>
                <p className="cv-item__role t-label">Internship · 20-week interdisciplinary programme</p>
                <ul>
                  <li>
                    Working across disciplines on hands-on builds, with every week documented in a{" "}
                    <a href="/protosem" className="link-u">
                      public log
                    </a>
                    .
                  </li>
                  <li>Week 07: five IoT builds, from local HTTP control to cloud telemetry and relay automation.</li>
                </ul>
              </div>
            </section>

            <section id="projects" className="cv-sec" aria-labelledby="h-projects">
              <h2 className="t-label t-muted" id="h-projects">
                Selected projects
              </h2>
              {projects.map((p) => (
                <div className="cv-item" key={p.title}>
                  <div className="cv-item__head">
                    <h3>
                      {p.slug ? (
                        <Link href={`/projects/${p.slug}`} className="link-u">
                          {p.title}
                        </Link>
                      ) : (
                        p.title
                      )}
                    </h3>
                    <span className="t-label t-muted">{p.date}</span>
                  </div>
                  <p className="cv-item__role t-label">{p.role}</p>
                  <p className="cv-item__tech t-mono">{p.tech}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>
                    <a href="/iot" className="link-u">
                      IoT &amp; Embedded Systems
                    </a>
                  </h3>
                  <span className="t-label t-muted">ProtoSem · Week 07</span>
                </div>
                <p className="cv-item__role t-label">ESP32 cloud telemetry &amp; automation</p>
                <p className="cv-item__tech t-mono">ESP32, Arduino C++, MQTT / Adafruit IO, IFTTT, Firebase RTDB</p>
                <ul>
                  <li>Built five ESP32 tasks from local HTTP LED control to MQTT relay switching of a 230 V lamp.</li>
                  <li>Streamed DHT11 and LDR telemetry to a Firebase dashboard with auto/manual relay modes and CSV export.</li>
                </ul>
              </div>
            </section>



            <section id="leadership" className="cv-sec" aria-labelledby="h-leadership">
              <h2 className="t-label t-muted" id="h-leadership">
                Leadership &amp; teams
              </h2>
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>Member, Software domain — Qbotix Rover Team</h3>
                  <span className="t-label t-muted">Sep 2026 — Present</span>
                </div>
                <ul>
                  <li>Student-led rover team; member of the Software domain.</li>
                </ul>
              </div>
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>Operations Lead — GDG on Campus</h3>
                </div>
                <ul>
                  <li>Spearheaded backend and pipeline debugging challenges for student bootcamps.</li>
                </ul>
              </div>
            </section>

            <section id="achievements" className="cv-sec" aria-labelledby="h-achievements">
              <h2 className="t-label t-muted" id="h-achievements">
                Achievements
              </h2>
              <div className="cv-item">
                <ul style={{ marginTop: 0 }}>
                  <li>
                    <strong>Grand Finalist, Meta PyTorch OpenEnv Hackathon</strong> — organised by Meta, PyTorch and Scaler
                    School of Technology; 48-hour in-person grand finale in Bengaluru, Apr 2026. Built{" "}
                    <Link href="/projects/prregression-audit" className="link-u">
                      PRRegression Audit
                    </Link>{" "}
                    with Sudharshan R.
                  </li>
                  <li>
                    <strong>Mahatma Gandhi Merit Scholarship</strong> — awarded for sustained academic excellence at KCT,
                    2025–26.
                  </li>
                  <li>
                    <strong>3rd place, Open Ideathon</strong> — among competitive institutional cohorts, Kumaraguru College
                    of Technology.
                  </li>
                  <li>
                    <strong>Flipkart GRiD</strong> — national-level hackathon; robotics vision and pipeline optimisation.
                  </li>
                </ul>
              </div>
            </section>

            <section id="activities" className="cv-sec" aria-labelledby="h-activities">
              <h2 className="t-label t-muted" id="h-activities">
                Activities
              </h2>
              <div className="cv-item">
                <ul style={{ marginTop: 0 }}>
                  <li>
                    <strong>Algorithmic consistency</strong> — 100+ DSA problems solved on LeetCode, with a focus on
                    optimisation and runtime complexity.
                  </li>
                  <li>
                    <strong>Coursework beyond the syllabus</strong> — Harvard CS50P and CS50AI; Deep Learning for
                    Computer Vision with TensorFlow.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
