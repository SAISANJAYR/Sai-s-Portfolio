import type { ReactNode } from "react";
import { statusTone, type Status } from "@/data/projects";

export function StatusMark({ status }: { status: Status }) {
  if (status === "Unspecified") return <span className="t-mono t-muted">—</span>;
  const tone = statusTone(status);
  return (
    <span className={`status${tone === "live" ? " status--live" : tone === "progress" ? " status--progress" : ""}`}>
      {status}
    </span>
  );
}

export function SectionHead({
  idx,
  title,
  aside,
  id,
}: {
  idx: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div className="sec-head reveal">
      <div className="sec-head__idx t-label">{idx}</div>
      <h2 className="sec-head__title t-h2" id={id}>
        {title}
      </h2>
      {aside && <div className="sec-head__aside t-label">{aside}</div>}
    </div>
  );
}

export function TechList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="tech-list" aria-label={label ?? "Technologies"}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** Renders **bold** segments from the content files without pulling in a markdown lib. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
      )}
    </>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
