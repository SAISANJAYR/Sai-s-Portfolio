"use client";

import { useEffect, useState } from "react";

/** Sticky section index with scroll-spy for the résumé. */
export default function ResumeToc({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="cv__toc" aria-label="Résumé sections">
      <p className="t-label t-muted" style={{ marginBottom: "1rem" }}>
        Contents
      </p>
      <ol>
        {items.map((i, n) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`t-label${current === i.id ? " is-current" : ""}`}
              aria-current={current === i.id ? "location" : undefined}
            >
              <span>{String(n + 1).padStart(2, "0")}</span>
              <span>{i.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
