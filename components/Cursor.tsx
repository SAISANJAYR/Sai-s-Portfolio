"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);

    const grow = () => cursor.classList.add("grow");
    const shrink = () => cursor.classList.remove("grow");

    // Re-bind hover targets whenever DOM changes (simple polling, cheap at this scale)
    const bind = () => {
      document
        .querySelectorAll("a, .project-card, .hobby-card, .chip, .greeting, button")
        .forEach((el) => {
          el.addEventListener("mouseenter", grow);
          el.addEventListener("mouseleave", shrink);
        });
    };
    bind();
    const interval = setInterval(bind, 1500);

    return () => {
      window.removeEventListener("mousemove", move);
      clearInterval(interval);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} />;
}
