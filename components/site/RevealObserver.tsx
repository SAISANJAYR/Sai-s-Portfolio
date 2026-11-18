"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `.reveal` element.
 * A MutationObserver registers reveal elements whenever they enter the DOM —
 * on first load, after client-side navigation, or when a list re-renders —
 * so nothing depends on the timing of route commits.
 */
export default function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
    );

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(".reveal:not(.is-in)")) io.observe(root);
      root.querySelectorAll?.(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    };

    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n.nodeType === 1 && scan(n as Element));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
