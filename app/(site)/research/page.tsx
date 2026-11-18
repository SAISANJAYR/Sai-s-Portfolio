import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Research",
  description: "Research notes by SaiSanjay R — this chapter is still being written.",
  robots: { index: false },
};

export default function ResearchPage() {
  return (
    <>
      <main id="main" className="page-head" style={{ minHeight: "80svh" }}>
        <div className="wrap">
          <div className="page-head__meta t-label">
            <span>§ Research</span>
            <span>In preparation</span>
          </div>
          <h1 className="t-display">
            Still being <span className="t-italic t-accent">written.</span>
          </h1>
          <p className="t-lead" style={{ marginTop: "2rem" }}>
            Research notes will live here. Until then, the closest thing is the experimental work in the archive.
          </p>
          <div className="closing__links">
            <Link href="/projects" className="link-arrow">
              The archive <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
