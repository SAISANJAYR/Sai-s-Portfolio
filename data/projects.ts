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

export type Schematic = "agents" | "pipeline" | "mlp" | "env" | "vision" | "device" | "satellite" | "gas";

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
    slug: "atmosyn",
    title: "Atmosyn",
    subtitle: "Industrial gas-emissions monitoring",
    category: "Embedded · Telemetry",
    status: "In progress",
    date: "Jul 2026 — present",
    year: "2026",
    quote: "Measuring what leaves the exhaust line, as it leaves.",
    intro:
      "A modular system that measures CO₂, CO, particulate matter, temperature and humidity straight from industrial exhaust lines, with a live telemetry dashboard.",
    credit: "Built as an Engineering Intern at Forge Innovations & Ventures — electronics and software stack.",
    photo: {
      src: "/projects/atmosyn-warm.jpg",
      alt: "An industrial smokestack releasing a thick plume of white smoke against a pale sky.",
      credit: "Photo: Patrick Hendry / Unsplash",
      href: "https://unsplash.com/photos/white-smoke-coming-out-from-brown-metal-pipe-MQ6KtSsfgIc",
    },
    tech: ["ESP32", "Multi-sensor arrays", "CO₂ · CO · PM sensing", "Temperature & humidity", "Real-time telemetry", "Monitoring dashboard"],
    schematic: "gas",
    problem: [
      "Industrial exhaust needs to be measured where it leaves the line — continuously, across several gases and particulates at once — not sampled now and then.",
    ],
    approach: [
      "A **modular** monitoring unit designed to read **CO₂, CO, particulate matter, temperature and humidity** directly from exhaust lines.",
      "**Multi-sensor arrays** interfaced with **ESP32** microcontrollers for real-time data acquisition, **timestamping** and transmission.",
      "A **real-time monitoring dashboard** for live telemetry visualisation and **sensor health** tracking.",
    ],
    results: ["In active development as part of the internship."],
    resultsLabel: "Current progress",
    links: [{ label: "ProtoSem log", href: "/protosem", fullLoad: true }],
    missing: ["Photos of the hardware", "Dashboard screenshot", "Sensor models used"],
  },
  {
    slug: "prregression-audit",
    title: "PRRegression Audit",
    subtitle: "Multi-agent RL code reviewer",
    category: "AI · Reinforcement learning",
    status: "Complete",
    date: "Apr 2026",
    year: "2026",
    quote: "A code reviewer that can’t game its own grader.",
    intro:
      "Four cooperating agents review pull requests for regressions, fine-tuned with GRPO against verifiable, zero-LLM rewards.",
    credit:
      "Co-created with Sudharshan R for the OpenEnv Hackathon (Scaler School of Technology × Meta × Hugging Face × PyTorch), Bengaluru — where the team reached the Grand Finale.",
    award: "Grand Finalist · Meta PyTorch OpenEnv Hackathon",
    photo: {
      src: "/projects/prregression-warm.jpg",
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
      { label: "Repository", href: "https://github.com/SAISANJAYR/GitPRTriageEnv", external: true },
      { label: "Live environment", href: "https://huggingface.co/spaces/rsd-06/PRRegressionAuditEnv", external: true },
    ],
    missing: ["Screenshot of the W&B dashboard"],
  },
  {
    slug: "smart-document-hub",
    title: "Smart Document Hub",
    subtitle: "Multilingual document intelligence",
    category: "AI · Full-stack",
    status: "Complete",
    date: "Jun 2026",
    year: "2026",
    quote: "Ask your documents — and catch the deadlines inside them.",
    intro:
      "A multilingual platform that reads documents, answers questions about them and pulls out the deadlines buried inside.",
    photo: {
      src: "/projects/dochub-warm.jpg",
      alt: "A feather quill resting on the pages of an old handwritten ledger.",
      credit: "Photo: camera obscura / Unsplash",
      href: "https://unsplash.com/photos/feather-quill-rests-on-an-old-handwritten-ledger-mAcZ7DXz5QM",
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
      "Complete: an async FastAPI + MongoDB backend with a Celery + Redis worker pipeline that keeps heavy document processing off the request path and **Q&A under 2 seconds**.",
      "A hybrid deadline-extraction engine — local **spaCy NER** with **LangChain / Gemini** classification — and a **ChromaDB** vector knowledge graph.",
    ],
    resultsLabel: "Outcome",
    links: [{ label: "Repository", href: "https://github.com/SAISANJAYR/smart-document-hub", external: true }],
    missing: ["Interface screenshots", "Languages supported"],
  },
  {
    slug: "satsaathi",
    title: "SatSaathi",
    subtitle: "Ask the satellite, in your language",
    category: "AI · Remote sensing",
    status: "Complete",
    date: "2026",
    year: "2026",
    quote: "Ask the satellite, in your language.",
    intro:
      "An auditable satellite-imagery copilot: ask in English, Hindi, Tamil or Bangla and get an answer measured from the pixels — with an eight-step trace and human review when confidence is low.",
    credit: "Built with Sudharshan R as Team MidDevz — Smart India Hackathon 2026, ISRO’s SatQuery AI problem.",
    photo: {
      src: "/projects/satsaathi-warm.jpg",
      alt: "Satellite image of a river delta, braided channels spreading across the land.",
      credit: "Satellite image: USGS / Unsplash",
      href: "https://unsplash.com/photos/aerial-view-of-a-river-delta-with-colorful-sediment-patterns-2BThgnOYoIc",
    },
    tech: ["Qwen3-VL-2B (4-bit LoRA)", "FastAPI", "Celery", "Redis", "SSE", "Next.js", "Python", "PostGIS", "rasterio", "TiTiler", "Docker Compose"],
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
      "Pixel-level **spectral indices (NDVI, NDWI, LSWI)** and ground-area calculation, alongside a **4-bit Qwen3-VL-2B LoRA** inference pipeline.",
      "An **async FastAPI + Celery / Redis** backend streams live job progress to the **Next.js** interface over **Server-Sent Events**; low-confidence answers are routed to **human review**.",
    ],
    results: [
      "Working end to end: image upload with raster checks, spectral indices, jobs streamed live over **SSE** with a step-by-step trace, GeoJSON and trace export, multi-temporal change detection, and per-account isolation — in four languages.",
      "Complete, with the **4-bit Qwen3-VL-2B LoRA** model running behind the tool interface and confidence-gated **human review** for low-confidence answers.",
    ],
    resultsLabel: "Outcome",
    links: [{ label: "Repository", href: "https://github.com/rsd-06/sat_saathi", external: true }],
    missing: ["Screenshots of the interface"],
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
