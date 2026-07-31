import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";
import { techStack } from "@/data/techStack";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = { ...DiIcons, ...SiIcons };

export default function TechStack() {
  const mainGroups = techStack.filter((g) => !g.exploring);
  const exploringGroup = techStack.find((g) => g.exploring);

  return (
    <section id="stack-section">
      <div className="section-head">
        <div className="eyebrow">Tools of the craft</div>
        <h2 className="section-title">What I build with — and what I&apos;m reaching for next.</h2>
      </div>

      <div className="stack">
        <div className="stack-grid">
          {mainGroups.map((group) => (
            <div className="stack-group" key={group.label}>
              <div className="stack-group-label">{group.label}</div>
              <div className="stack-row">
                {group.items.map((item, i) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;
                  return (
                    <div className="chip" key={item.name}>
                      {Icon ? <Icon /> : null}
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {exploringGroup && (
            <div className="stack-group exploring-group" key={exploringGroup.label}>
              <div className="stack-group-label">{exploringGroup.label}</div>
              <div className="stack-row">
                {exploringGroup.items.map((item) => (
                  <div className="chip exploring" key={item.name}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
