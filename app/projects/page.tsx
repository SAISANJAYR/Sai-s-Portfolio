import Footer from "@/components/Footer";

const allProjects = [
  {
    title: "Smart Document Hub",
    stage: "Ongoing",
    tags: ["FastAPI", "Celery", "ChromaDB", "LangChain"],
    description: "A Multilingual Document Intelligence platform architected with an async FastAPI + Beanie ODM backend. Uses Celery + Redis for heavy AI processing and a hybrid deadline-extraction engine.",
    link: "#"
  },
  {
    title: "PRRegression Audit",
    stage: "Shipped",
    tags: ["Agentic AI", "RLVR", "FastAPI"],
    description: "Engineered an autonomous 4-agent pipeline for PR regression detection. Deployed RLVR for deterministic grading and shipped a live W&B tracking dashboard on HuggingFace Spaces.",
    link: "#"
  },
  {
    title: "CardioPredict",
    stage: "Shipped",
    tags: ["JAX", "Deep Learning", "Math"],
    description: "A low-level MLP Regression Model built from scratch using pure functional programming math, bypassing high-level wrappers. Leveraged JAX primitives to optimize XLA training.",
    link: "#"
  },
  {
    title: "OpenEnv",
    stage: "Ongoing",
    tags: ["Python", "Backend"],
    description: "An open environment infrastructure for scalable agentic workflows and automated environment management.",
    link: "#"
  },
  {
    title: "Smart Sanitary Napkin Dispenser",
    stage: "Hardware",
    tags: ["IoT", "Hardware"],
    description: "An automated IoT-based dispenser built to solve accessibility issues in rural areas. Integrated with cloud telemetry for restock monitoring.",
    link: "#"
  },
  {
    title: "Flipkart GRiD",
    stage: "Hackathon",
    tags: ["Team", "Hackathon"],
    description: "Developed a robotics vision algorithm and pipeline optimization solution during the national-level Flipkart GRiD hackathon.",
    link: "#"
  }
];

export default function ProjectsArchive() {
  return (
    <div className="bg-offwhite min-h-screen pt-40 pb-24 relative overflow-hidden text-charcoal font-body selection:bg-charcoal selection:text-offwhite">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Summary */}
        <div className="mb-20 animate-[fadeIn_1s_ease-out_forwards]">
          <h1 className="text-5xl md:text-7xl font-display text-charcoal mb-6">Archive</h1>
          <p className="text-graymid font-mono tracking-widest uppercase text-sm md:text-base max-w-2xl">
            A comprehensive log of systems designed, models trained, and hackathons conquered.
          </p>
        </div>

        {/* GitHub Contributions */}
        <div className="mb-16 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
          <h3 className="text-xs tracking-[0.15em] uppercase text-graymid mb-4 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-graylight block"></span>
            GitHub Activity
          </h3>
          <div className="p-4 glass rounded-xl overflow-hidden flex justify-center w-full">
            <img 
              src="https://ghchart.rshah.org/111111/SAISANJAYR" 
              alt="SaiSanjay R's Github Chart" 
              className="w-full max-w-3xl h-auto opacity-80"
              style={{ maxHeight: '100px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <h3 className="text-sm tracking-widest uppercase text-graymid mb-8 flex items-center gap-4 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
          <span className="w-8 h-[1px] bg-graylight block"></span>
          Repository Access
        </h3>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, idx) => (
            <div 
              key={project.title} 
              className="group p-8 rounded-2xl glass hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-[fadeIn_1s_ease-out_forwards] opacity-0 hover:-translate-y-1"
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-[10px] tracking-widest uppercase px-2 py-1 bg-white/50 border border-graylight/30 rounded text-graymid">
                  {project.stage}
                </div>
                <div className="w-8 h-8 rounded border border-graylight/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 duration-300 shadow-sm">
                  <span className="text-charcoal text-sm">↗</span>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-display text-charcoal mb-4">{project.title}</h2>
              <p className="text-graymid text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-graylight/20">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase text-graymid">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
