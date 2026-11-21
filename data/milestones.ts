/**
 * Dated ledger for the Journey page. Dates only where the résumé, the
 * existing site or the git history state them; "—" where unknown.
 * Narrative chapters stay in journey.json.
 */

export type MilestoneKind = "Learning" | "Academic" | "Project" | "Competition" | "Leadership" | "Program" | "Achievement" | "Internship" | "Team";

export type Milestone = { when: string; event: string; detail?: string; kind: MilestoneKind; href?: string };

export const milestones: Milestone[] = [
  { when: "12th std.", event: "Harvard CS50P", detail: "Introduction to Programming with Python — completed independently.", kind: "Learning" },
  { when: "—", event: "Harvard CS50AI", detail: "Search, optimisation, machine learning, neural networks, reasoning.", kind: "Learning" },
  { when: "—", event: "Deep Learning for Computer Vision with TensorFlow", detail: "Followed by self-study in JAX and PyTorch.", kind: "Learning" },
  { when: "→ 2028", event: "B.Tech, AI & Data Science — KCT", detail: "Kumaraguru College of Technology, Coimbatore. CGPA 8.28 / 10. Expected May 2028.", kind: "Academic" },
  { when: "2025–26", event: "Mahatma Gandhi Merit Scholarship", detail: "Awarded for sustained academic excellence at KCT.", kind: "Achievement" },
  { when: "—", event: "Open Ideathon, KCT — 3rd place", detail: "Placed third among competitive institutional cohorts.", kind: "Competition" },
  { when: "—", event: "Operations Lead, GDG on Campus", detail: "Ran backend and pipeline debugging challenges for student bootcamps.", kind: "Leadership" },
  { when: "—", event: "Flipkart GRiD", detail: "National-level hackathon — robotics vision and pipeline optimisation.", kind: "Competition" },
  { when: "Apr 2026", event: "Grand Finalist — Meta PyTorch OpenEnv Hackathon", detail: "48-hour grand finale at Scaler School of Technology, Bengaluru. Built PRRegression Audit with Sudharshan R.", kind: "Competition", href: "/projects/prregression-audit" },
  { when: "May 2026", event: "CardioPredict", detail: "An MLP from first principles in JAX.", kind: "Project" },
  { when: "Jun 2026", event: "Smart Document Hub", detail: "Multilingual document intelligence — sub-2s Q&A over a Celery + Redis pipeline.", kind: "Project", href: "/projects/smart-document-hub" },
  { when: "Jul 2026", event: "Engineering Intern — Forge Innovations & Ventures", detail: "Electronics and software for Atmosyn, an industrial gas-emissions monitor. Logged weekly in ProtoSem.", kind: "Internship", href: "/protosem" },
  { when: "2026", event: "SatSaathi — Smart India Hackathon", detail: "Built with Sudharshan R as Team MidDevz, for ISRO’s SatQuery AI problem.", kind: "Competition", href: "/projects/satsaathi" },
  { when: "Sep 2026", event: "Qbotix Rover Team — AI & Vision", detail: "YOLO perception and ROS 2 navigation for a student-built rover.", kind: "Team" },
  { when: "Oct 2026", event: "ProtoSem Week 07 — IoT & Embedded Systems", detail: "Five builds, from local HTTP control to cloud telemetry.", kind: "Program", href: "/iot" },
  { when: "Ongoing", event: "100+ problems on LeetCode", detail: "Focused on optimisation and runtime complexity.", kind: "Achievement" },
];
