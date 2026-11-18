"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, profile, protosemHref } from "@/data/profile";

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Solid bar after the first fold; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y <= 320 || y < lastY.current - 2) setHidden(false);
      else if (y > lastY.current + 2) setHidden(true);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Sheet: lock scroll, Escape to close, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="wrap nav__inner">
          <Link href="/" className="nav__brand" aria-label={`${profile.name} — home`}>
            <span className="nav__name">{profile.name}</span>
            <span className="nav__tag">a nerd ig</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {nav.slice(1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav__link" aria-current={isActive(l.href) ? "page" : undefined}>
                    <sup>{l.num}</sup>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={protosemHref} className="nav__link">
                  <sup>↗</sup>ProtoSem
                </a>
              </li>
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-sheet"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        id="site-sheet"
        className={`sheet${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <button ref={closeRef} type="button" className="sheet__close" onClick={() => setOpen(false)}>
          Close
        </button>
        <ul className="sheet__list">
          {nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} tabIndex={open ? 0 : -1}>
                {l.label}
                <span className="t-label t-muted">{l.num}</span>
              </Link>
            </li>
          ))}
          <li>
            <a href={protosemHref} tabIndex={open ? 0 : -1}>
              ProtoSem
              <span className="t-label t-muted">↗</span>
            </a>
          </li>
        </ul>
        <div className="sheet__foot t-label">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
        </div>
      </div>
    </>
  );
}
