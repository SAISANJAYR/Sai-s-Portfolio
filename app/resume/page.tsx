"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  { category: "Languages", items: ["Python (Advanced)", "C", "C++", "MySQL"] },
  { category: "AI/ML & Frameworks", items: ["JAX", "PyTorch", "TensorFlow", "Keras", "LangChain", "LlamaIndex", "Weights & Biases", "TensorBoard", "FastAPI"] },
  { category: "Databases & Tools", items: ["MongoDB (Beanie ODM)", "ChromaDB", "Docker", "Git", "GitHub", "Celery", "Redis"] },
  { category: "Areas of Interest", items: ["Machine Learning", "Deep Learning", "Computer Vision", "Agentic AI", "Large Language Models", "Backend Engineering"] }
];

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in all cards on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-card");
      sections.forEach((sec) => {
        gsap.fromTo(sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div className="animate-[fadeIn_1s_ease-out_forwards]">
            <h1 className="text-4xl md:text-7xl font-display text-charcoal mb-4">
              SaiSanjay R
            </h1>
            <div className="text-graymid font-body flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm md:text-base">
              <a href="mailto:saisanjay024@gmail.com" className="hover:text-charcoal transition-colors">saisanjay024@gmail.com</a>
              <span className="hidden md:inline text-graylight">•</span>
              <a href="https://github.com/SAISANJAYR" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">GitHub</a>
              <span className="hidden md:inline text-graylight">•</span>
              <a href="https://www.linkedin.com/in/saisanjay-r-79513132a" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <a 
            href="/SaiSanjayR_Resume.pdf" 
            target="_blank"
            download
            className="animate-[fadeIn_1s_ease-out_0.3s_forwards] inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-offwhite rounded-full text-sm font-medium hover:bg-brand-black transition-colors shadow-lg print:hidden"
          >
            Download PDF
          </a>
        </div>

        <div className="space-y-40">
          
          {/* Education */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="md:w-1/4 text-sm tracking-widest uppercase text-graymid sticky top-32">Education</h2>
            <div className="md:w-3/4 reveal-card glass p-8 md:p-12 rounded-3xl hover:bg-white/40 transition-colors w-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <h3 className="text-2xl font-display text-charcoal">Kumaraguru College of Technology, Coimbatore</h3>
                <span className="text-sm font-mono text-graymid mt-2 md:mt-0">Expected May 2028</span>
              </div>
              <p className="text-charcoal/80 text-lg">B.Tech in Artificial Intelligence & Data Science</p>
              <p className="text-charcoal/80 font-medium mt-2">CGPA: 8.25 / 10.00</p>
            </div>
          </section>

          {/* Constellation Skills */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="md:w-1/4 text-sm tracking-widest uppercase text-graymid sticky top-32">Skills & Interests</h2>
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {skills.map((skill) => (
                <InteractiveSkillCard key={skill.category} skill={skill} />
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="md:w-1/4 text-sm tracking-widest uppercase text-graymid sticky top-32">Projects</h2>
            <div className="md:w-3/4 space-y-8 w-full">
              
              <div className="reveal-card glass p-8 md:p-12 rounded-3xl hover:bg-white/40 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-display text-charcoal">PRRegression Audit</h3>
                  <span className="text-sm font-mono text-graymid mt-2 md:mt-0">Apr 2026</span>
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-graymid mb-8">Multi-Agent RL Code Reviewer</div>
                <ul className="space-y-4 text-charcoal/80 text-base md:text-lg">
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Engineered an autonomous 4-agent pipeline (Safety, Defect, Router, Comment) for PR regression detection.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Prevented reward hacking by deploying RLVR for deterministic, zero-LLM programmatic grading.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Achieved 2.1× performance gain on Medium tasks fine-tuning Qwen2.5-1.5B via GRPO.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Shipped a live W&B tracking dashboard on HuggingFace Spaces backed by 12+ async FastAPI endpoints.</li>
                </ul>
              </div>

              <div className="reveal-card glass p-8 md:p-12 rounded-3xl hover:bg-white/40 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-display text-charcoal">Smart Document Hub</h3>
                  <span className="text-sm font-mono text-graymid mt-2 md:mt-0">Jun 2026 — In Progress</span>
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-graymid mb-8">Multilingual Document Intelligence</div>
                <ul className="space-y-4 text-charcoal/80 text-base md:text-lg">
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Architected an async FastAPI + Beanie ODM backend designed to maintain document Q&A latency under 2 seconds.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Built a Celery + Redis background task pipeline to isolate heavy AI processing from the core request-response cycle.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Implemented a hybrid deadline-extraction engine using local spaCy NER and LangChain/Gemini classification.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Constructed a document knowledge graph using vector-space cosine similarity on ChromaDB embeddings.</li>
                </ul>
              </div>

              <div className="reveal-card glass p-8 md:p-12 rounded-3xl hover:bg-white/40 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                  <h3 className="text-2xl font-display text-charcoal">CardioPredict</h3>
                  <span className="text-sm font-mono text-graymid mt-2 md:mt-0">May 2026</span>
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-graymid mb-8">Low-Level MLP Regression Model</div>
                <ul className="space-y-4 text-charcoal/80 text-base md:text-lg">
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Bypassed high-level wrappers to build an MLP from scratch using pure functional programming math.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Leveraged JAX primitives (vmap for vectorization, grad for reverse-mode autodiff) to optimize XLA training.</li>
                  <li className="flex gap-4"><span className="text-graylight mt-1">»</span> Achieved a Test MSE of 10.22 over 1,000 epochs using strict feature standardization.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Achievements & Leadership */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <h2 className="md:w-1/4 text-sm tracking-widest uppercase text-graymid sticky top-32">Extracurricular</h2>
            <div className="md:w-3/4 reveal-card glass p-8 md:p-12 rounded-3xl w-full">
              <ul className="space-y-8 text-charcoal/80 text-base md:text-lg">
                <li className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <span className="text-graymid font-mono font-medium shrink-0 md:w-48">Algorithmic Consistency</span>
                  <p>Solved 100+ DSA problems on LeetCode focusing heavily on optimization and runtime complexity.</p>
                </li>
                <li className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <span className="text-graymid font-mono font-medium shrink-0 md:w-48">Academic Merit</span>
                  <p>Mahatma Gandhi Merit Scholarship — Awarded for sustained academic excellence at KCT, 2025–26.</p>
                </li>
                <li className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <span className="text-graymid font-mono font-medium shrink-0 md:w-48">Innovation</span>
                  <p>3rd Place out of competitive institutional cohorts, Open Ideathon, Kumaraguru College of Technology.</p>
                </li>
                <li className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <span className="text-graymid font-mono font-medium shrink-0 md:w-48">Leadership</span>
                  <p>Operations Lead — GDG on Campus; spearheaded backend and pipeline debugging challenges for student bootcamps.</p>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>
      <div className="mt-32 print:hidden">
        <Footer />
      </div>
    </div>
  );
}

function InteractiveSkillCard({ skill }: { skill: { category: string; items: string[] } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-card glass p-8 rounded-3xl transition-transform duration-200 ease-out"
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      <h3 className="text-xl font-display text-charcoal mb-6" style={{ transform: "translateZ(20px)" }}>{skill.category}</h3>
      <div className="flex flex-wrap gap-3" style={{ transform: "translateZ(30px)" }}>
        {skill.items.map((item) => (
          <span key={item} className="px-4 py-2 text-sm rounded-full bg-white/50 border border-graylight text-charcoal hover:bg-white/80 transition-colors shadow-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
