"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(t);
  }, [state]);

  const legacyCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    ta.remove();
    return ok;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState(legacyCopy() ? "copied" : "failed");
    }
  };

  return (
    <>
      <button type="button" className="btn-line copy-btn" data-copied={state === "copied"} onClick={copy}>
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Copy failed — select it" : "Copy address"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Could not copy the email address" : ""}
      </span>
    </>
  );
}
