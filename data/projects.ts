/**
 * Projects. Content is drawn from the résumé PDF, the previous projects page
 * and — for SatSaathi, built together with Sudharshan R — the project's public
 * write-up and repository.
 *
 * Rules: nothing invented. Results only where they are stated on record.
 * Ongoing work is described as ongoing. Missing information is listed in
 * `missing` (kept for the README "content gaps" list, never shown on the site).
 */

export type Status = "Shipped" | "Complete" | "In progress" | "Ongoing" | "Hackathon" | "Documented" | "Unspecified";

export type Schematic = "agents" | "pipeline" | "mlp" | "env" | "vision" | "device" | "satellite";

export type Figure = { src: string; alt: string; caption: string; w: number; h: number };

/** A generic, real (not AI-generated) stock photo that sets the scene for a project. */
export type Photo = { src: string; alt: string; credit: string; href: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: Status;
  date?: string;
  year: string;
  /** One line for slides and tiles. */
  quote: string;
  /** Two-sentence summary for slides and tiles. */
  intro: string;
  credit?: string;
  /** A distinction the project earned, shown as a badge. */
  award?: string;
  photo: Photo;
  tech: string[];
  /** Real image if one exists; otherwise a labelled system schematic is drawn. */
  image?: Figure;
  schematic: Schematic;
  problem?: string[];
  approach?: string[];
  challenges?: string[];
  results?: string[];
  resultsLabel?: "Results" | "Current progress" | "Outcome";
  figures?: Figure[];
  links?: { label: string; href: string; external?: boolean; fullLoad?: boolean }[];
  missing?: string[];
};

export const projects: Project[] = [
  {
    slug: "prregression-audit",
    title: "PRRegression Audit",
    subtitle: "Multi-agent RL code reviewer",
    category: "AI · Reinforcement learning",
    status: "Shipped",
    date: "Apr 2026",
    year: "2026",
    quote: "A code reviewer that can’t game its own grader.",
    intro:
      "Four cooperating agents review pull requests for regressions, fine-tuned with GRPO against verifiable, zero-LLM rewards.",
    credit:
      "Built with Sudharshan R at the Meta PyTorch OpenEnv Hackathon × Scaler School of Technology, Bengaluru — where the team reached the Grand Finale.",
    award: "Grand Finalist · Meta PyTorch OpenEnv Hackathon",
    photo: {
      src: "/projects/prregression.jpg",
      alt: "A laptop on a desk showing lines of source code in a dark editor.",
      credit: "Photo: Arnold Francisca / Unsplash",
      href: "https://unsplash.com/photos/turned-on-macbook-pro-wit-programming-codes-display-f77Bh3inUpE",
    },
    tech: ["Python", "FastAPI", "GRPO fine-tuning", "Reinforcement learning", "Multi-agent systems", "Qwen2.5-1.5B", "Docker", "W&B", "HuggingFace Spaces"],
    schematic: "agents",
    problem: [
      "Regressions slip through code review because they hide inside changes that look correct. An automated reviewer can help — but training one with reinforcement learning introduces a second problem.",
      "When the reward comes from another language model, the policy can learn to satisfy the grader instead of finding real defects. That is reward hacking, and it quietly makes the reviewer worse.",
    ],
    approach: [
      "Split the review into four cooperating agents — **Safety**, **Defect**, **Router** and **Comment** — so each stage has one responsibility.",
      "Replaced LLM-judged rewards with **RLVR** (reinforcement learning with verifiable rewards): deterministic, programmatic grading with zero LLM involvement.",
      "Fine-tuned **Qwen2.5-1.5B** with **GRPO** against those verifiable rewards.",
      "Served the system through **12+ async FastAPI endpoints**, with experiment tracking in Weights & Biases.",
    ],
    challenges: [
      "**Reward hacking.** The central risk of RL-trained reviewers. Addressed by making every reward programmatically verifiable rather than model-judged.",
    ],
    results: [
      "**2.1× performance gain** on Medium-difficulty tasks after GRPO fine-tuning — mean reward **0.0382 → 0.5300**.",
      "A live W&B tracking dashboard deployed on **HuggingFace Spaces**.",
    ],
    resultsLabel: "Results",
    links: [
      { label: "Repository", href: "https://github.com/rsd-06/GitPRTriageEnv", external: true },
      { label: "Live environment", href: "https://huggingface.co/spaces/rsd-06/PRRegressionAuditEnv", external: true },
    ],
    missing: ["Which parts you built vs Sudharshan", "Screenshot of the W&B dashboard"],
  },
  {
    slug: "smart-document-hub",
    title: "Smart Document Hub",
    subtitle: "Multilingual document intelligence",
    category: "AI · Full-stack",
    status: "In progress",
    date: "Jun 2026 — present",
    year: "2026",
    quote: "Ask your documents — and catch the deadlines inside them.",
    intro:
      "A multilingual platform that reads documents, answers questions about them and pulls out the deadlines buried inside.",
    photo: {
      src: "/projects/dochub.jpg",
      alt: "Tall stacks of paper documents and file folders in an office.",
      credit: "Photo: Wesley Tingey / Unsplash",
      href: "https://unsplash.com/photos/stacks-of-paper-documents-and-file-folders-snNHKZ-mGfE",
    },
    tech: ["FastAPI", "Next.js", "LangChain", "LlamaIndex", "ChromaDB", "MongoDB (Beanie ODM)", "Celery", "Redis", "spaCy", "EasyOCR", "Gemini", "D3.js"],
    schematic: "pipeline",
    problem: [
      "Important documents arrive in different languages and formats, and the obligations inside them — deadlines especially — are easy to miss.",
      "The AI work needed to understand them (OCR, embeddings, classification) is heavy. Run inline, it would make a question-answering interface feel slow.",
    ],
    approach: [
      "An **async FastAPI + Beanie ODM** backend, designed around a target of document Q&A **under 2 seconds**.",
      "A **Celery + Redis** task pipeline that isolates heavy AI processing from the request–response cycle.",
      "A **hybrid deadline-extraction engine**: local **spaCy NER** combined with **LangChain / Gemini** classification.",
      "A **document knowledge graph** built from cosine similarity between **ChromaDB** embeddings, visualised with **D3.js**.",
    ],
    challenges: [
      "**Latency under load.** Keeping the interface responsive while OCR, embedding and classification run — the reason heavy work lives in Celery workers rather than in the API process.",
    ],
    results: [
      "In active development — the architecture above is being built now.",
      "The sub-2-second Q&A figure is a **design target**, not yet a measured result.",
    ],
    resultsLabel: "Current progress",
    links: [],
    missing: ["GitHub repository URL", "Interface screenshots", "Measured latency once available", "Languages supported"],
  },
  {
    slug: "satsaathi",
    title: "SatSaathi",
    subtitle: "Ask the satellite, in your language",
    category: "AI · Remote sensing",
    status: "In progress",
    date: "2026 — present",
    year: "2026",
    quote: "Ask the satellite, in your language.",
    intro:
      "A vision-language assistant for satellite imagery: upload a scene, ask in English, Hindi, Tamil or Bangla, and get an answer measured from the pixels — every step shown.",
    credit: "Built with Sudharshan R as Team MidDevz — Smart India Hackathon 2026, ISRO’s SatQuery AI problem.",
    photo: {
      src: "/projects/satsaathi.jpg",
      alt: "Earth seen from orbit, clouds over the ocean, with part of a spacecraft in the corner.",
      credit: "Photo: NASA / Unsplash",
      href: "https://unsplash.com/photos/view-of-earth-and-satellite-yZygONrUBe8",
    },
    tech: ["Next.js", "Tailwind CSS", "next-intl", "FastAPI", "Celery", "Python", "SSE", "PostGIS", "rasterio", "TiTiler", "Redis", "Docker Compose", "GitHub Actions"],
    schematic: "satellite",
    problem: [
      "Answering questions from satellite imagery — how far a flood spread, what changed between two dates — usually needs GIS expertise and English-only tools.",
      "For officials acting on those answers, a bare number isn’t enough: every result has to be traceable to how it was computed.",
    ],
    approach: [
      "**Spec-first** — a written architecture spec and phase-by-phase plans before any code.",
      "A monorepo with a **Next.js** web app, a **FastAPI** API, **Celery** workers, **PostgreSQL / PostGIS**, **Redis** and **TiTiler** for map tiles.",
      "Every query is a **Job** that passes through a fixed eight-step pipeline — ask, imagery, understand, preprocess, compute, vision-language, verify, answer — each step recording its tool, parameters, timing and output.",
      "Model-backed steps sit behind a **stable tool interface**, so real weights drop in without touching the rest. Full **en / hi / ta / bn** localisation is shared by the interface and the exported reports.",
    ],
    results: [
      "Working end to end: image upload with raster checks, spectral indices, jobs streamed live over **SSE** with a step-by-step trace, GeoJSON and trace export, multi-temporal change detection, and per-account isolation — in four languages.",
      "In active development for SIH 2026. The vision-language model steps are being wired into the tool interface next.",
    ],
    resultsLabel: "Current progress",
    links: [{ label: "Repository", href: "https://github.com/rsd-06/sat_saathi", external: true }],
    missing: ["Your specific role / the parts you built", "Screenshots of the interface"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function statusTone(s: Status): "live" | "progress" | "none" {
  if (s === "Shipped" || s === "Complete" || s === "Documented") return "live";
  if (s === "In progress" || s === "Ongoing") return "progress";
  return "none";
}
