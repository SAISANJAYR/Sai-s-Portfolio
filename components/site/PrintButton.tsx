"use client";

export default function PrintButton() {
  return (
    <button type="button" className="btn-line" onClick={() => window.print()}>
      Print this page
    </button>
  );
}
