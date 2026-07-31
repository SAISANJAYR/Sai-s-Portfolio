export type Project = {
  index: string;
  stage: string;
  title: string;
  description: string;
  tags: string[];
};

// Replace description/tags with real Problem -> Process -> Architecture -> Challenges -> Outcome copy per project.
export const projects: Project[] = [
  {
    index: "01 / 03",
    stage: "Ongoing",
    title: "Smart Document Hub",
    description:
      "A Multilingual Document Intelligence platform architected with an async FastAPI + Beanie ODM backend. Uses Celery + Redis for heavy AI processing and a hybrid deadline-extraction engine (spaCy NER + LangChain/Gemini).",
    tags: ["FastAPI", "Celery", "ChromaDB", "LangChain"],
  },
  {
    index: "02 / 03",
    stage: "Built",
    title: "PRRegression Audit",
    description:
      "Engineered an autonomous 4-agent pipeline (Safety, Defect, Router, Comment) for PR regression detection. Deployed RLVR for deterministic grading and shipped a live W&B tracking dashboard on HuggingFace Spaces.",
    tags: ["Agentic AI", "RLVR", "FastAPI"],
  },
  {
    index: "03 / 03",
    stage: "Built",
    title: "CardioPredict",
    description:
      "A low-level MLP Regression Model built from scratch using pure functional programming math, bypassing high-level wrappers. Leveraged JAX primitives to optimize XLA training, achieving strict feature standardization.",
    tags: ["JAX", "Deep Learning", "Math"],
  }
];
