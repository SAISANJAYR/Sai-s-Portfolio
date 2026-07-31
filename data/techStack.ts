export type TechItem = { name: string; icon: string };
export type TechGroup = { label: string; items: TechItem[]; exploring?: boolean };

// icon = react-icons component name from the "di" (devicon) set, e.g. "DiPython"
export const techStack: TechGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: "DiPython" },
      { name: "JavaScript", icon: "DiJavascript1" },
      { name: "C++", icon: "DiCplusplus" },
      { name: "TypeScript", icon: "SiTypescript" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React", icon: "DiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "FastAPI", icon: "SiFastapi" },
      { name: "Flask", icon: "DiFlask" },
    ],
  },
  {
    label: "AI & Backend",
    items: [
      { name: "PyTorch", icon: "SiPytorch" },
      { name: "TensorFlow", icon: "SiTensorflow" },
      { name: "Node.js", icon: "DiNodejsSmall" },
      { name: "PostgreSQL", icon: "DiPostgresql" },
    ],
  },
  {
    label: "Tools & Cloud",
    items: [
      { name: "Git", icon: "DiGit" },
      { name: "Docker", icon: "DiDocker" },
      { name: "Linux", icon: "DiLinux" },
      { name: "AWS", icon: "DiAws" },
    ],
  },
  {
    label: "Currently exploring",
    exploring: true,
    items: [
      { name: "LLM Engineering", icon: "" },
      { name: "RAG Systems", icon: "" },
      { name: "Distributed Systems", icon: "" },
      { name: "AI Research", icon: "" },
    ],
  },
];
