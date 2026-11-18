import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-head" style={{ minHeight: "80svh" }}>
      <div className="wrap">
        <div className="page-head__meta t-label">
          <span>§ 404</span>
          <span>Not on record</span>
        </div>
        <h1 className="t-display">
          A gap <span className="t-italic t-accent">between fingers.</span>
        </h1>
        <p className="t-lead" style={{ marginTop: "2rem" }}>
          This page doesn’t exist — or hasn’t been written yet.
        </p>
        <div className="closing__links">
          <Link href="/" className="link-arrow">
            Back to the index <span className="arr" aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="link-arrow">
            The archive <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
