import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";
import ResumeToc from "@/components/site/ResumeToc";
import PrintButton from "@/components/site/PrintButton";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of SaiSanjay R — B.Tech AI & Data Science at Kumaraguru College of Technology. Engineering Intern at Forge Innovations & Ventures, AI & Vision at Qbotix Rover Team. Skills, projects and achievements, with a downloadable PDF.",
};

const sections = [
  { id: "education", label: "Education" },
  { id: "skills", label: "Technical skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];

/** Mirrors the current résumé PDF, section for section. */
const skills: [string, string][] = [
  ["Programming & core", "Python, C, C++, Java, Data Structures & Algorithms"],
  ["AI / ML & frameworks", "PyTorch, JAX, TensorFlow, LangChain, LlamaIndex, Weights & Biases, LoRA fine-tuning, RAG, Agentic AI"],
  ["Backend & databases", "FastAPI, MySQL, MongoDB, Redis, ChromaDB"],
  ["Tools & platforms", "Git, GitHub, Docker, Hugging Face"],
];

const experience = [
  {
    title: "Engineering Intern",
    org: "Forge Innovations & Ventures",
    date: "Jul 2026 — Present",
    link: { href: "/projects/atmosyn", label: "Atmosyn" },
    points: [
      "Working on the electronics and software stack for Atmosyn, a modular industrial gas-emissions monitoring system that measures CO₂, CO, particulate matter, temperature and humidity directly from exhaust lines.",
      "Interfacing multi-sensor arrays with ESP32 microcontrollers for real-time data acquisition, timestamping and transmission.",
      "Building a real-time monitoring dashboard for live telemetry visualisation and sensor-health tracking.",
    ],
  },
  {
    title: "AI & Vision Member",
    org: "Qbotix Rover Team",
    date: "Sep 2026 — Present",
    points: [
      "Developing AI-based perception pipelines using YOLO for real-time object detection and classification.",
      "Working on autonomous navigation using ROS 2, SLAM and Nav2, alongside multi-camera vision and GNSS integration.",
      "Building camera streaming and telemetry interfaces for real-time rover monitoring and localisation.",
    ],
  },
];

const projects = [
  {
    title: "SatSaathi",
    role: "Multimodal remote-sensing vision-language assistant",
    slug: "satsaathi",
    points: [
      "Built an auditable satellite-imagery copilot supporting English, Hindi, Tamil and Bangla, with an 8-step deterministic execution trace and confidence-gated human review.",
      "Implemented pixel-level spectral index computation (NDVI, NDWI, LSWI) and ground-area calculation alongside a 4-bit Qwen3-VL-2B LoRA inference pipeline.",
      "Architected an async FastAPI + Celery/Redis backend with Server-Sent Events streaming live job progress to a Next.js interface.",
    ],
  },
  {
    title: "PRRegression Audit",
    role: "RL environment & multi-agent code reviewer",
    slug: "prregression-audit",
    repo: "https://github.com/SAISANJAYR/GitPRTriageEnv",
    points: [
      "Engineered an autonomous 4-agent pipeline (Safety, Defect, Router, Comment) for pull-request regression detection, backed by FastAPI and Docker.",
      "Deployed deterministic programmatic grading (RLVR) to prevent reward hacking, achieving a 2.1× reward gain on Medium tasks by fine-tuning Qwen2.5-1.5B via GRPO.",
      "Built a live Weights & Biases tracking dashboard hosted on Hugging Face Spaces, backed by async FastAPI endpoints.",
    ],
  },
  {
    title: "Smart Document Hub",
    role: "Multilingual document intelligence platform",
    slug: "smart-document-hub",
    repo: "https://github.com/SAISANJAYR/smart-document-hub",
    points: [
      "Architected an async FastAPI and MongoDB backend with a Celery + Redis worker pipeline to isolate heavy document processing and keep Q&A under 2 seconds.",
      "Built a hybrid deadline-extraction engine combining local spaCy NER with LangChain/Gemini classification and a ChromaDB vector knowledge graph.",
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
              <span>Updated Nov 2026</span>
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
                <a href={profile.resumePdf} download="SaiSanjay_R_Resume.pdf" className="btn-solid">
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
            <section id="education" className="cv-sec" aria-labelledby="h-education">
              <h2 className="t-label t-muted" id="h-education">
                Education
              </h2>
              <div className="cv-item">
                <div className="cv-item__head">
                  <h3>{profile.college}</h3>
                  <span className="t-label t-muted">Sep 2024 — May 2028</span>
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
              {experience.map((e) => (
                <div className="cv-item" key={e.org}>
                  <div className="cv-item__head">
                    <h3>
                      {e.title} — {e.org}
                    </h3>
                    <span className="t-label t-muted">{e.date}</span>
                  </div>
                  {e.link && (
                    <p className="cv-item__role t-label">
                      <Link href={e.link.href} className="link-u">
                        {e.link.label} →
                      </Link>
                    </p>
                  )}
                  <ul>
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section id="projects" className="cv-sec" aria-labelledby="h-projects">
              <h2 className="t-label t-muted" id="h-projects">
                Projects
              </h2>
              {projects.map((p) => (
                <div className="cv-item" key={p.title}>
                  <div className="cv-item__head">
                    <h3>
                      <Link href={`/projects/${p.slug}`} className="link-u">
                        {p.title}
                      </Link>
                    </h3>
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="t-label t-muted link-u">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                  <p className="cv-item__role t-label">{p.role}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section id="achievements" className="cv-sec" aria-labelledby="h-achievements">
              <h2 className="t-label t-muted" id="h-achievements">
                Extracurricular &amp; achievements
              </h2>
              <div className="cv-item">
                <ul style={{ marginTop: 0 }}>
                  <li>
                    <strong>Finalist, OpenEnv Hackathon</strong> (Scaler School of Technology × Meta × Hugging Face ×
                    PyTorch), Bengaluru — co-created{" "}
                    <Link href="/projects/prregression-audit" className="link-u">
                      PRRegression Audit
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>Mahatma Gandhi Merit Scholarship</strong> — awarded for sustained academic excellence at KCT
                    (2025–26).
                  </li>
                  <li>
                    <strong>Operations Lead, GDG on Campus (KCT)</strong> — organised technical bootcamps and
                    backend/debugging challenges.
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
