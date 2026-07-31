import { projects } from "@/data/projects";
import HorizontalScrollSection from "./HorizontalScrollSection";

export default function Projects() {
  return (
    <section id="projects-section">
      <div className="section-head">
        <div className="eyebrow">Selected work</div>
        <h2 className="section-title">
          Three chapters — problem, thinking, and what came out the other side.
        </h2>
      </div>
      <HorizontalScrollSection>
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <div>
              <div className="project-index">{p.index}</div>
              <div className="project-stage">{p.stage}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.description}</div>
            </div>
            <div>
              <div className="tag-row">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="card-cta">Details coming →</div>
            </div>
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
}
