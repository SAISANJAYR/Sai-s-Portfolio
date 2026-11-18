"use client";

import { useState } from "react";

/**
 * Click-to-load facade for a Spotify embed. Each embed pulls ~1MB of
 * third-party script, so nothing loads until the visitor asks for it.
 */
export default function ListenSlot({ label, src }: { label: string; src: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="listen__slot">
      <span className="t-label t-muted">{label}</span>
      {on ? (
        <iframe
          src={src}
          title={`Spotify — ${label}`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <button type="button" className="listen__play" onClick={() => setOn(true)}>
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 0.5 L9 5 L1 9.5 Z" fill="currentColor" />
          </svg>
          Load Spotify player
        </button>
      )}
    </div>
  );
}
