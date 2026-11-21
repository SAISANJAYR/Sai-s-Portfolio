/**
 * Single source of truth for identity, links and personal content.
 * Everything here comes from the original site, the résumé PDF, the ProtoSem
 * documentation or SaiSanjay's own words — nothing invented.
 */

export const profile = {
  name: "SaiSanjay R",
  degree: "B.Tech, Artificial Intelligence & Data Science",
  college: "Kumaraguru College of Technology",
  city: "Coimbatore, India",
  graduation: "Expected May 2028",
  cgpa: "8.28 / 10.00",
  email: "saisanjay024@gmail.com",
  github: "https://github.com/SAISANJAYR",
  githubHandle: "SAISANJAYR",
  linkedin: "https://www.linkedin.com/in/saisanjay-r",
  linkedinHandle: "saisanjay-r",
  resumePdf: "/SaiSanjay_R_Resume.pdf",
  portfolioRepo: "https://github.com/SAISANJAYR/Sai-s-Portfolio",
  motto: "May Death Find me Alive",
  /** The personal line from the original hero. */
  creed: "Not because I want to become extraordinary. But because I want to live fully.",
};

export const nav = [
  { href: "/", label: "Home", num: "00" },
  { href: "/about", label: "About", num: "01" },
  { href: "/projects", label: "Projects", num: "02" },
  { href: "/journey", label: "Journey", num: "03" },
  { href: "/resume", label: "Résumé", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
] as const;

/**
 * ProtoSem lives in a separate, frozen root layout. Links to it must be plain
 * <a> tags (a full document load), never next/link.
 */
export const protosemHref = "/protosem";

/** Where SaiSanjay is right now — used on About and the résumé. */
export type Role = {
  title: string;
  org: string;
  when: string;
  kind: string;
  line: string;
  href?: string;
  fullLoad?: boolean;
};

export const roles: Role[] = [
  {
    title: "Engineering Intern",
    org: "Forge Innovations & Ventures",
    when: "Jul 2026 — Present",
    kind: "Internship",
    line: "Electronics and software for Atmosyn, an industrial gas-emissions monitor — documented week by week in the ProtoSem log.",
    href: protosemHref,
    fullLoad: true,
  },
  {
    title: "AI & Vision Member",
    org: "Qbotix Rover Team",
    when: "Sep 2026 — Present",
    kind: "Student team",
    line: "YOLO perception, ROS 2 navigation with SLAM and Nav2, and camera telemetry for a student-built rover.",
  },
  {
    title: "B.Tech, AI & Data Science",
    org: "Kumaraguru College of Technology",
    when: "Sep 2024 — May 2028",
    kind: "Education",
    line: "Coimbatore. CGPA 8.28 / 10, Mahatma Gandhi Merit Scholar (2025–26).",
  },
];

/** The kind of work — what SaiSanjay is drawn to. */
export const workKinds = [
  {
    title: "Agentic AI & reinforcement learning",
    line: "Multi-agent systems trained against rewards they can’t game.",
  },
  {
    title: "Backend systems",
    line: "Async APIs and task queues that keep heavy AI work off the request path.",
  },
  {
    title: "ML from first principles",
    line: "Writing the maths by hand before trusting a framework to do it.",
  },
  {
    title: "Interdisciplinary builds",
    line: "Taking an idea past the editor — into hardware, the field and other people’s problems.",
  },
];

export type StackItem = { name: string; group: string; note: string; icon?: string };

/**
 * The tech stack — exactly the skills on the current résumé, plus the tools
 * its projects and roles name (Celery, Next.js, ESP32, ROS 2, YOLO).
 * `icon` is a simple-icons export name; items without one get a lettermark.
 * `note` describes the tool itself, not a claim about its use.
 */
export const stack: StackItem[] = [
  { name: "Python", group: "Language", note: "ML, backends & scripting", icon: "siPython" },
  { name: "C", group: "Language", note: "Close to the metal", icon: "siC" },
  { name: "C++", group: "Language", note: "Performance & firmware", icon: "siCplusplus" },
  { name: "Java", group: "Language", note: "Object-oriented core", icon: "siOpenjdk" },
  { name: "PyTorch", group: "ML", note: "Training & fine-tuning", icon: "siPytorch" },
  { name: "JAX", group: "ML", note: "Autodiff + XLA, by hand" },
  { name: "TensorFlow", group: "ML", note: "Deep learning for vision", icon: "siTensorflow" },
  { name: "LoRA", group: "ML", note: "Parameter-efficient fine-tuning" },
  { name: "Weights & Biases", group: "ML", note: "Experiment tracking", icon: "siWeightsandbiases" },
  { name: "Hugging Face", group: "ML", note: "Models, datasets & Spaces", icon: "siHuggingface" },
  { name: "LangChain", group: "LLM", note: "LLM pipelines & agents", icon: "siLangchain" },
  { name: "LlamaIndex", group: "LLM", note: "Retrieval over documents" },
  { name: "ChromaDB", group: "LLM", note: "Vector store for RAG" },
  { name: "YOLO", group: "Vision", note: "Real-time object detection" },
  { name: "ROS 2", group: "Robotics", note: "SLAM & Nav2 navigation", icon: "siRos" },
  { name: "ESP32", group: "Embedded", note: "Sensor acquisition & telemetry", icon: "siEspressif" },
  { name: "FastAPI", group: "Backend", note: "Async Python APIs", icon: "siFastapi" },
  { name: "Celery", group: "Backend", note: "Background task queues", icon: "siCelery" },
  { name: "Redis", group: "Database", note: "In-memory store & broker", icon: "siRedis" },
  { name: "MongoDB", group: "Database", note: "Document store", icon: "siMongodb" },
  { name: "MySQL", group: "Database", note: "Relational database", icon: "siMysql" },
  { name: "Next.js", group: "Frontend", note: "Web interfaces", icon: "siNextdotjs" },
  { name: "Docker", group: "DevOps", note: "Containerisation", icon: "siDocker" },
  { name: "Git", group: "Tools", note: "Version control", icon: "siGit" },
  { name: "GitHub", group: "Tools", note: "Code & collaboration", icon: "siGithub" },
];


export const exploring = ["Agentic AI", "RAG systems", "Robot perception", "AI research"];

export type Hobby = { title: string; line: string };

/** From the original "Beyond Code" section, in SaiSanjay's words. */
export const hobbies: Hobby[] = [
  {
    title: "Running",
    line: "Where thoughts become quieter and ideas become clearer. Sometimes the best solutions arrive when everything else slows down.",
  },
  {
    title: "Cinema",
    line: "Films that stay with me long after the credits roll. Another way of understanding people.",
  },
  {
    title: "Music",
    line: "No single genre — discovering artists, understanding lyrics, and finding songs that become part of different chapters of life.",
  },
  {
    title: "Travel",
    line: "The world is too large to stay in one place. I find clarity in new environments and different perspectives.",
  },
  {
    title: "Books",
    line: "Mythology, technology or philosophy — every book is another conversation waiting to happen.",
  },
  {
    title: "Curiosity",
    line: "I don’t collect hobbies. I follow curiosities, beyond the surface, until I understand why something exists.",
  },
];

/** The one song — loaded straight away, no click needed. */
export const song = {
  title: "The Narcissist",
  artist: "Blur",
  src: "https://open.spotify.com/embed/track/2TNyNqT3RBXhtNV7OiAgiC?utm_source=generator&theme=0",
};
