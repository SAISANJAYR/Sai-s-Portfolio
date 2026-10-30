"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   Shared tiny helpers
───────────────────────────────────────────── */
function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-[2px] bg-charcoal/60 block" />
      <span className="text-[11px] tracking-[0.18em] uppercase text-charcoal/80 font-mono font-bold">
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hardware Confession / Dev Humour Card
───────────────────────────────────────────── */
function DevHumourNote({
  tag = "LAB CONFESSION",
  quote,
  lesson,
}: {
  tag?: string;
  quote: string;
  lesson?: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-amber-400/50 bg-amber-50/70 p-5 relative overflow-hidden my-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-mono text-[10px] font-bold tracking-wider uppercase">
          ⚡ {tag}
        </span>
        <span className="text-[10px] font-mono text-amber-800/70 italic">#EmbeddedLife</span>
      </div>
      <p className="text-xs sm:text-sm font-mono text-amber-950 font-medium leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      {lesson && (
        <div className="mt-2.5 pt-2 border-t border-amber-300/50 text-[11px] text-amber-900/80 font-body">
          <span className="font-mono font-bold uppercase text-[9px] text-amber-800 mr-1.5">Takeaway:</span>
          {lesson}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Architecture Diagram — crisp, site-native
───────────────────────────────────────────── */
function ArchDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-sm">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <div className="w-full px-5 py-3 rounded-xl border border-charcoal/15 bg-white shadow-sm text-center text-xs font-mono font-semibold text-charcoal hover:border-charcoal hover:shadow-md transition-all duration-200">
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="flex flex-col items-center my-0.5 text-charcoal/60">
              <div className="w-0.5 h-4 bg-charcoal/30" />
              <span className="text-[10px] leading-none font-bold">▼</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Code Block — obsidian dark theme for rich contrast
───────────────────────────────────────────── */
function CodeBlock({ filename, code }: { filename: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-charcoal/30 bg-[#121316] text-[#e4e4e7] shadow-xl my-3">
      {/* toolbar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1c1d22] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          </div>
          <span className="text-xs font-mono text-zinc-300 font-medium ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {filename}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[11px] font-mono text-zinc-300 hover:text-white transition-colors px-3 py-1 rounded-md border border-white/15 hover:border-white/40 hover:bg-white/10 bg-white/5 active:scale-95"
        >
          {copied ? "✓ Copied!" : "Copy code"}
        </button>
      </div>
      {/* code */}
      <div className="overflow-x-auto p-5">
        <pre className="text-xs font-mono text-zinc-200 leading-relaxed whitespace-pre min-w-max selection:bg-indigo-600 selection:text-white">
          {code}
        </pre>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Concept Card
───────────────────────────────────────────── */
function ConceptCard({ term, def }: { term: string; def: string }) {
  return (
    <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm hover:border-charcoal hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="text-xs font-mono font-bold text-charcoal mb-1 flex items-center justify-between">
        <span>{term}</span>
        <span className="text-[10px] text-graymid opacity-40 group-hover:opacity-100 transition-opacity font-normal">#concept</span>
      </div>
      <p className="text-xs text-charcoal/70 leading-relaxed font-body">{def}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hardware list item
───────────────────────────────────────────── */
function HardwareList({ items }: { items: { icon: string; name: string; note: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3.5 rounded-xl border border-charcoal/15 bg-white shadow-sm hover:border-charcoal/40 transition-colors"
        >
          <span className="text-lg leading-none mt-0.5 shrink-0">{item.icon}</span>
          <div>
            <div className="text-xs font-mono font-bold text-charcoal mb-0.5">{item.name}</div>
            <div className="text-[11px] text-charcoal/65">{item.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Pin Connection Table
───────────────────────────────────────────── */
function PinTable({
  rows,
}: {
  rows: { pin: string; component: string; type: string; notes: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal/15 bg-white shadow-sm my-3">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-zinc-100/80 text-[10px] text-charcoal/70 uppercase tracking-wider border-b border-charcoal/10">
          <tr>
            <th className="py-2.5 px-4 font-bold">ESP32 Pin</th>
            <th className="py-2.5 px-4 font-bold">Connected Peripheral</th>
            <th className="py-2.5 px-4 font-bold">Signal / Logic Level</th>
            <th className="py-2.5 px-4 font-bold">Functional Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10 text-charcoal/85">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-zinc-50/80 transition-colors">
              <td className="py-2.5 px-4 font-bold text-indigo-600 bg-indigo-50/30 whitespace-nowrap">
                {r.pin}
              </td>
              <td className="py-2.5 px-4 font-semibold text-charcoal">{r.component}</td>
              <td className="py-2.5 px-4 text-zinc-600">{r.type}</td>
              <td className="py-2.5 px-4 text-zinc-600 text-[11px] font-body">{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Troubleshooting & Debugging Card
───────────────────────────────────────────── */
function TroubleshootCard({
  items,
}: {
  items: { issue: string; cause: string; solution: string }[];
}) {
  return (
    <div className="space-y-3 my-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 rounded-2xl border border-amber-400/30 bg-amber-50/40 shadow-sm space-y-2 text-xs"
        >
          <div className="flex items-center gap-2 font-mono font-bold text-amber-950">
            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">
              !
            </span>
            <span>Issue #{idx + 1}: {item.issue}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pt-1 text-[11px] font-body text-charcoal/80">
            <div className="bg-white/80 p-3 rounded-xl border border-charcoal/10">
              <span className="font-mono font-bold text-charcoal/70 uppercase text-[9px] block mb-1">
                Root Cause
              </span>
              {item.cause}
            </div>
            <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-emerald-950">
              <span className="font-mono font-bold text-emerald-800 uppercase text-[9px] block mb-1">
                Engineered Resolution
              </span>
              {item.solution}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Comparison Table
───────────────────────────────────────────── */
function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal/15 bg-white shadow-sm my-3">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-zinc-100/80 text-[10px] text-charcoal/70 uppercase tracking-wider border-b border-charcoal/10">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="py-2.5 px-4 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10 text-charcoal/85">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-50/80 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className={`py-2.5 px-4 ${j === 0 ? "font-bold text-charcoal bg-zinc-50/50" : "text-zinc-600 font-body text-[11px]"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sample CSV Preview Table
───────────────────────────────────────────── */
function CsvPreviewTable() {
  const sampleData = [
    { time: "2024-04-12T14:30:00Z", temp: "28.4", hum: "62.0", light: "1820", bulb: "OFF", mode: "AUTO" },
    { time: "2024-04-12T14:30:05Z", temp: "28.4", hum: "62.1", light: "1815", bulb: "OFF", mode: "AUTO" },
    { time: "2024-04-12T14:30:10Z", temp: "28.5", hum: "61.8", light: "1420", bulb: "ON", mode: "AUTO" },
    { time: "2024-04-12T14:30:15Z", temp: "28.5", hum: "61.9", light: "1390", bulb: "ON", mode: "AUTO" },
    { time: "2024-04-12T14:30:20Z", temp: "28.6", hum: "61.7", light: "1950", bulb: "OFF", mode: "MANUAL" },
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal/15 bg-white shadow-sm my-3 font-mono text-xs">
      <div className="px-4 py-2.5 bg-zinc-100/90 border-b border-charcoal/10 flex items-center justify-between text-[11px] text-charcoal/70">
        <span className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Exported Dataset Snapshot: iot_telemetry_2024-04-12.csv
        </span>
        <span className="text-[10px] text-zinc-500">RFC 4180 Compliant Comma-Separated</span>
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-[10px] text-charcoal/70 uppercase border-b border-charcoal/10">
          <tr>
            <th className="py-2 px-3 font-bold">Timestamp (ISO 8601)</th>
            <th className="py-2 px-3 font-bold">Temp (°C)</th>
            <th className="py-2 px-3 font-bold">Humidity (%)</th>
            <th className="py-2 px-3 font-bold">Light (ADC 0-4095)</th>
            <th className="py-2 px-3 font-bold">Bulb State</th>
            <th className="py-2 px-3 font-bold">Mode</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10 text-[11px]">
          {sampleData.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-50/80">
              <td className="py-2 px-3 text-zinc-500">{row.time}</td>
              <td className="py-2 px-3 font-bold text-amber-700">{row.temp}</td>
              <td className="py-2 px-3 font-bold text-sky-700">{row.hum}</td>
              <td className="py-2 px-3 text-indigo-600">{row.light}</td>
              <td className="py-2 px-3 font-semibold">
                <span className={`px-2 py-0.5 rounded text-[10px] ${row.bulb === "ON" ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}`}>
                  {row.bulb}
                </span>
              </td>
              <td className="py-2 px-3 text-charcoal">{row.mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GitHub Repository Link Card
───────────────────────────────────────────── */
function RepoLinkCard() {
  return (
    <div className="rounded-2xl border-2 border-charcoal/20 bg-gradient-to-r from-zinc-900 via-charcoal to-zinc-900 text-white p-6 shadow-xl relative overflow-hidden my-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Open Source Firmware &amp; Assets
            </span>
          </div>
          <h4 className="text-lg font-display font-semibold text-white">
            Access Complete Arduino Source Code &amp; Repositories
          </h4>
          <p className="text-xs text-zinc-300 font-body mt-1 max-w-xl">
            All Arduino (.ino) firmware sketches, circuit wiring diagrams, and telemetry export scripts are hosted on GitHub and available in this project repository.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href="https://github.com/SAISANJAYR/IOT"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white text-charcoal text-xs font-mono font-bold hover:bg-zinc-100 transition-all shadow-md flex items-center gap-2"
          >
            <span>IOT Repo</span>
            <span className="text-[10px]">↗</span>
          </a>
          <a
            href="https://github.com/SAISANJAYR/Sai-s-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-mono font-bold hover:bg-white/20 transition-all shadow-md flex items-center gap-2"
          >
            <span>Portfolio Repo</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Media image
───────────────────────────────────────────── */
function MediaImage({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure
      className={`rounded-2xl overflow-hidden border border-charcoal/20 bg-white shadow-md ${wide ? "col-span-full md:col-span-2" : ""}`}
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-100">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="px-4 py-2.5 text-[11px] font-mono text-charcoal/75 bg-zinc-50 border-t border-charcoal/10 font-medium">
          📸 {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─────────────────────────────────────────────
   Media video
───────────────────────────────────────────── */
function MediaVideo({
  src,
  caption,
  wide = false,
}: {
  src: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure
      className={`rounded-2xl overflow-hidden border border-charcoal/20 bg-white shadow-md ${wide ? "col-span-full md:col-span-2" : ""}`}
    >
      <div className="relative aspect-video overflow-hidden bg-black/95">
        <video
          src={src}
          controls
          preload="metadata"
          className="w-full h-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="px-4 py-2.5 text-[11px] font-mono text-charcoal/75 bg-zinc-50 border-t border-charcoal/10 font-medium">
          🎬 {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─────────────────────────────────────────────
   Reflection block
───────────────────────────────────────────── */
function Reflection({ text }: { text: string }) {
  return (
    <div className="rounded-2xl p-6 border-2 border-charcoal/15 bg-gradient-to-br from-white to-zinc-50 shadow-sm relative overflow-hidden my-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-charcoal/70 font-bold mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-charcoal inline-block" />
        Retrospective &amp; Engineering Insight
      </div>
      <p className="text-sm text-charcoal/85 leading-relaxed italic font-body">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Task section wrapper
───────────────────────────────────────────── */
function TaskSection({
  id,
  number,
  subtitle,
  title,
  tag,
  children,
}: {
  id: string;
  number: string;
  subtitle: string;
  title: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-charcoal/15 bg-white/90 shadow-md overflow-hidden scroll-mt-36"
    >
      {/* task header */}
      <div className="px-7 sm:px-10 pt-8 pb-7 border-b border-charcoal/10 bg-gradient-to-r from-zinc-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-md bg-charcoal text-white text-[11px] font-mono font-bold tracking-widest uppercase shadow">
              TASK {number}
            </span>
            <span className="text-xs text-charcoal/70 font-mono italic">{subtitle}</span>
          </div>
          {tag && (
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-charcoal/20 bg-charcoal/5 text-charcoal">
              {tag}
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-display text-charcoal tracking-tight font-semibold">
          {title}
        </h2>
      </div>

      {/* task body */}
      <div className="px-7 sm:px-10 py-8 space-y-10">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Sub-heading inside a task
───────────────────────────────────────────── */
function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-charcoal/80 mb-3 flex items-center gap-2">
      <span className="w-5 h-[2px] bg-charcoal/70 inline-block" />
      {children}
    </h3>
  );
}

/* ─────────────────────────────────────────────
   Interactive ESP32 Virtual Lab & Simulator
───────────────────────────────────────────── */
function ESP32VirtualLab() {
  const [ledOn, setLedOn] = useState(false);
  const [baudRate, setBaudRate] = useState<"115200" | "9600">("115200");
  const [relayActive, setRelayActive] = useState(false);
  const [relayClickedMsg, setRelayClickedMsg] = useState("");
  const [magicSmoke, setMagicSmoke] = useState(0);

  const handleRelayClick = () => {
    setRelayActive(!relayActive);
    setRelayClickedMsg(!relayActive ? "⚡ *CLACK!* Relay energized! Bulb ON. (Mains isolated safe & sound)" : "💤 *CLICK!* Relay released. Bulb OFF.");
    setTimeout(() => setRelayClickedMsg(""), 3500);
  };

  return (
    <div className="rounded-3xl border-2 border-charcoal/20 bg-[#15161b] text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
              Interactive Hardware Simulator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display text-white">
            ESP32 Virtual Workbench &amp; Live Serial Monitor
          </h3>
          <p className="text-xs text-zinc-400 font-body mt-1">
            Test GPIO toggles, trigger the physical relay, and experience the classic embedded baud rate trap in real-time.
          </p>
        </div>

        {/* Live specs chips */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-zinc-200">
            Xtensa LX6 · 240 MHz
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-zinc-200">
            3.3V Logic Level
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
            Wi-Fi: 2.4 GHz Only
          </span>
        </div>
      </div>

      {/* interactive board controls grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Module 1: GPIO 2 LED */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>GPIO 02 · Onboard LED</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${ledOn ? "bg-cyan-500/30 text-cyan-300" : "bg-white/10 text-zinc-400"}`}>
                {ledOn ? "HIGH (3.3V)" : "LOW (0V)"}
              </span>
            </div>

            {/* Visual LED */}
            <div className="flex items-center gap-4 my-4">
              <div
                className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  ledOn
                    ? "bg-cyan-400 border-cyan-200 shadow-[0_0_30px_#22d3ee]"
                    : "bg-zinc-800 border-zinc-700 shadow-none"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${ledOn ? "bg-white" : "bg-zinc-900"}`} />
              </div>
              <div>
                <div className="text-sm font-display text-white">
                  {ledOn ? "LED Illuminated ✨" : "LED Dark 💤"}
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  {ledOn ? "digitalWrite(2, HIGH)" : "digitalWrite(2, LOW)"}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setLedOn(!ledOn)}
            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
              ledOn
                ? "bg-cyan-400 text-black hover:bg-cyan-300"
                : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
            }`}
          >
            {ledOn ? "Turn OFF LED" : "Turn ON LED"}
          </button>
        </div>

        {/* Module 2: Relay Actuator */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>GPIO 26 · 250V Relay</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${relayActive ? "bg-amber-500/30 text-amber-300" : "bg-white/10 text-zinc-400"}`}>
                {relayActive ? "COM → NO (CLOSED)" : "COM → NC (OPEN)"}
              </span>
            </div>

            <div className="flex items-center gap-4 my-4">
              <div
                className={`w-12 h-12 rounded-2xl border-2 transition-all duration-200 flex items-center justify-center font-bold text-lg ${
                  relayActive
                    ? "bg-amber-500 text-black border-amber-300 shadow-[0_0_25px_#f59e0b] scale-105"
                    : "bg-zinc-800 text-zinc-500 border-zinc-700"
                }`}
              >
                ⚡
              </div>
              <div>
                <div className="text-sm font-display text-white">
                  {relayActive ? "Mains Bulb: ON 💡" : "Mains Bulb: OFF 🔌"}
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  Optocoupler Isolation: ACTIVE
                </div>
              </div>
            </div>
            {relayClickedMsg && (
              <div className="text-[11px] font-mono text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/30 animate-pulse">
                {relayClickedMsg}
              </div>
            )}
          </div>

          <button
            onClick={handleRelayClick}
            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
              relayActive
                ? "bg-amber-500 text-black hover:bg-amber-400"
                : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
            }`}
          >
            {relayActive ? "Release Relay" : "Actuate Relay (*CLACK!*)"}
          </button>
        </div>

        {/* Module 3: Baud Rate & Serial Monitor */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Serial Monitor Baud Rate</span>
              <span className="text-[9px] font-bold text-emerald-400">USB UART</span>
            </div>

            <div className="flex gap-2 my-2">
              <button
                onClick={() => setBaudRate("115200")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                  baudRate === "115200"
                    ? "bg-emerald-500 text-black shadow-[0_0_15px_#10b981]"
                    : "bg-white/10 text-zinc-300 hover:bg-white/20"
                }`}
              >
                115200 Baud (Correct)
              </button>
              <button
                onClick={() => setBaudRate("9600")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                  baudRate === "9600"
                    ? "bg-red-500 text-white shadow-[0_0_15px_#ef4444]"
                    : "bg-white/10 text-zinc-300 hover:bg-white/20"
                }`}
              >
                9600 Baud (Wrong)
              </button>
            </div>

            {/* Serial Terminal Output */}
            <div className="bg-black/80 rounded-xl p-3 border border-white/10 font-mono text-[10px] h-24 overflow-y-auto leading-relaxed text-zinc-300 selection:bg-emerald-500">
              {baudRate === "115200" ? (
                <div>
                  <div className="text-emerald-400">[OK] rst:0x1 (POWERON_RESET)</div>
                  <div className="text-zinc-400">[BOOT] ESP32-WROOM-32 @ 240MHz</div>
                  <div className="text-cyan-400">[WIFI] Connected! IP: 192.168.1.50</div>
                  <div className="text-white">
                    {ledOn ? "> HTTP GET /led/on → GPIO2 HIGH" : "> System Idle. Waiting for commands..."}
                  </div>
                </div>
              ) : (
                <div className="text-red-400">
                  <div>␀␄x?#$!␛[2J ~~~ BAUD MISMATCH!</div>
                  <div className="text-amber-400">????▒▒░░?@%^&*()</div>
                  <div className="text-zinc-400 italic">
                    (Classic rookie mistake: ESP32 boots at 115200; 9600 outputs garbled binary noise.)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-400 mt-2">
            Status: {baudRate === "115200" ? "🟢 Clean serial stream" : "🔴 Framing error / garbage bytes"}
          </div>
        </div>
      </div>

      {/* Bottom Easter Egg: Magic Smoke Danger Slider */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm">🔥</span>
          <div>
            <div className="text-xs font-mono font-bold text-zinc-200">
              Magic Smoke Hazard Meter: {magicSmoke}%
            </div>
            <div className="text-[10px] text-zinc-400">
              {magicSmoke === 0 && "Safe 3.3V logic. All GPIO pins are happy."}
              {magicSmoke > 0 && magicSmoke < 70 && "Running warm. Don't short 5V to ADC pin!"}
              {magicSmoke >= 70 && "⚠️ DANGER: Reverse polarity alert! Breadboard smells like burnt toast!"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={magicSmoke}
            onChange={(e) => setMagicSmoke(Number(e.target.value))}
            className="w-36 sm:w-48 accent-amber-400 cursor-pointer"
          />
          <button
            onClick={() => setMagicSmoke(0)}
            className="text-[10px] font-mono px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Interactive Firebase System UI Dashboard
   (smarthome-iot-e9fe6.web.app/dashboard.html)
───────────────────────────────────────────── */
function FirebaseTelemetryDashboard() {
  const [systemMode, setSystemMode] = useState<"AUTO-SENSE" | "MANUAL">("AUTO-SENSE");
  const [ambientLight, setAmbientLight] = useState(1980);
  const [ldrThreshold, setLdrThreshold] = useState(1800);
  const [manualRelay, setManualRelay] = useState(false);
  const [temp, setTemp] = useState(24.5);
  const [hum, setHum] = useState(45.0);
  const [isConnected, setIsConnected] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "[17:36:10] WebSocket connection established (wss://smarthome-iot-e9fe6.firebaseio.com)",
    "[17:36:11] RTDB Auth: Verified token permissions on /current",
    "[17:36:12] Mode: AUTO-SENSE active. Autonomous LDR evaluation armed.",
    "[17:36:13] Telemetry sync: Temp 24.5°C | Hum 45% | LDR 1980 | Threshold 1800",
    "[17:36:14] Autonomy check: LDR (1980) >= Threshold (1800) -> Daylight detected -> Relay OFF",
  ]);

  // Autonomous logic: If AUTO-SENSE, relay is ON when ambientLight < ldrThreshold (darkness).
  // If MANUAL, relay follows manualRelay state.
  const isRelayOn = systemMode === "AUTO-SENSE" ? ambientLight < ldrThreshold : manualRelay;

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 6)]);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as "AUTO-SENSE" | "MANUAL";
    setSystemMode(newMode);
    if (newMode === "AUTO-SENSE") {
      addLog("MODE SWITCH: Activated AUTO-SENSE. Manual toggle switch disabled. Auto-light sensing active.");
    } else {
      addLog("MODE SWITCH: Activated MANUAL override. Toggle switch unlocked.");
    }
  };

  const handleManualToggle = () => {
    if (systemMode !== "MANUAL") return;
    const nextState = !manualRelay;
    setManualRelay(nextState);
    addLog(`MANUAL ACTUATION: /current/bulbState updated to ${nextState ? "TRUE (ON)" : "FALSE (OFF)"}`);
  };

  const handleLdrSlider = (val: number) => {
    setAmbientLight(val);
    if (systemMode === "AUTO-SENSE") {
      if (val < ldrThreshold && !isRelayOn) {
        addLog(`AUTO-TRIGGER: LDR (${val}) < Threshold (${ldrThreshold}) -> Darkness detected! Relay ENERGIZED (Bulb ON).`);
      } else if (val >= ldrThreshold && isRelayOn) {
        addLog(`AUTO-TRIGGER: LDR (${val}) >= Threshold (${ldrThreshold}) -> Sufficient ambient light. Relay RELEASED (Bulb OFF).`);
      }
    }
  };

  const handleThresholdSlider = (val: number) => {
    setLdrThreshold(val);
    addLog(`THRESHOLD CALIBRATION: User adjusted LDR setpoint to ${val} ADC counts.`);
  };

  return (
    <div className="rounded-3xl border-2 border-emerald-500/30 bg-[#07080a] text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden my-6">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Bar matching smarthome-iot-e9fe6.web.app */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold">&gt; SYSTEM UI</span>
          <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            smarthome-iot-e9fe6.web.app
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-400 animate-ping" : "bg-red-500"}`} />
            <span className={isConnected ? "text-emerald-400 font-bold" : "text-zinc-500"}>
              {isConnected ? "CONNECTED (WebSockets)" : "DISCONNECTED"}
            </span>
          </div>
          <button
            onClick={() => {
              setIsConnected(!isConnected);
              addLog(isConnected ? "Client disconnected from Firebase." : "Re-established live WebSocket sync.");
            }}
            className="text-[10px] font-mono uppercase px-3 py-1 rounded border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            {isConnected ? "DISCONNECT" : "RECONNECT"}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center my-6">
        <h4 className="text-2xl sm:text-3xl font-display text-white tracking-wide">
          Telemetry Feed
        </h4>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          Connection active. Receiving sensor packet structure.
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: TEMPERATURE */}
        <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            TEMPERATURE
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 text-center my-4">
            {temp.toFixed(1)} °C
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>Sensor: DHT11</span>
            <span className="text-emerald-400/80">Nominal</span>
          </div>
        </div>

        {/* Card 2: HUMIDITY */}
        <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            HUMIDITY
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 text-center my-4">
            {hum.toFixed(0)} %
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>Relative RH</span>
            <span className="text-emerald-400/80">Indoor comfort</span>
          </div>
        </div>

        {/* Card 3: AMBIENT LIGHT */}
        <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            AMBIENT LIGHT
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 text-center my-2">
            {ambientLight}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-mono text-zinc-400">
              <span>Dark (&lt;800)</span>
              <span>ADC Level</span>
              <span>Bright (&gt;3000)</span>
            </div>
            <input
              type="range"
              min="200"
              max="4000"
              value={ambientLight}
              onChange={(e) => handleLdrSlider(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Card 4: SYSTEM MODE */}
        <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            SYSTEM MODE
          </div>
          <div className="my-3">
            <select
              value={systemMode}
              onChange={handleModeChange}
              className="w-full py-2.5 px-3 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              <option value="AUTO-SENSE">AUTO-SENSE (Autonomous)</option>
              <option value="MANUAL">MANUAL (Human Override)</option>
            </select>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 text-center">
            {systemMode === "AUTO-SENSE" ? "Autonomous light control enabled" : "Direct manual override mode"}
          </div>
        </div>

        {/* Card 5: MAIN RELAY (AUTO vs MANUAL) */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${isRelayOn ? "bg-emerald-950/20 border-emerald-500/50" : "bg-[#0f1117] border-white/10"}`}>
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            MAIN RELAY (LIGHT CONTROL)
          </div>

          {/* In AUTO-SENSE mode: NO manual toggle switch is shown! */}
          {systemMode === "AUTO-SENSE" ? (
            <div className="my-3 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${isRelayOn ? "bg-emerald-400 shadow-[0_0_15px_#10b981]" : "bg-zinc-700"}`} />
                <span className={`font-mono text-lg font-bold ${isRelayOn ? "text-emerald-400" : "text-zinc-400"}`}>
                  {isRelayOn ? "AUTO: ON 💡" : "AUTO: OFF 🔌"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300 leading-relaxed">
                <span className="text-emerald-400 font-bold block mb-0.5">⚡ Autonomous Light ON/OFF</span>
                Light triggers automatically via LDR ({ambientLight}) vs Threshold ({ldrThreshold}).
                <span className="text-zinc-400 block mt-1 italic">
                  (Manual toggle is disabled in Auto Mode to prevent conflicting overrides.)
                </span>
              </div>
            </div>
          ) : (
            /* In MANUAL mode: The toggle switch is available! */
            <div className="my-3 text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className={`font-mono text-xs font-bold ${isRelayOn ? "text-emerald-400" : "text-zinc-500"}`}>
                  {isRelayOn ? "BULB: ON 💡" : "BULB: OFF 🔌"}
                </span>
              </div>
              <button
                onClick={handleManualToggle}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isRelayOn
                    ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {isRelayOn ? "TOGGLE OFF (Click to Release)" : "TOGGLE ON (Click to Energize)"}
              </button>
              <div className="text-[10px] font-mono text-zinc-400">
                Manual Override Active
              </div>
            </div>
          )}

          <div className="text-[9px] font-mono text-zinc-500 text-center">
            Relay Output: GPIO 26 · 230V Optocoupled
          </div>
        </div>

        {/* Card 6: LDR THRESHOLD */}
        <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex flex-col justify-between">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center">
            LDR THRESHOLD: <span className="text-cyan-400 font-bold">{ldrThreshold}</span>
          </div>
          <div className="my-3 space-y-2">
            <input
              type="range"
              min="500"
              max="3500"
              value={ldrThreshold}
              onChange={(e) => handleThresholdSlider(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-zinc-500">
              <span>Dark: 500</span>
              <span>Current: {ldrThreshold}</span>
              <span>Bright: 3500</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 text-center">
            If LDR &lt; {ldrThreshold} → Relay ON in Auto Mode
          </div>
        </div>
      </div>

      {/* Data Stream Monitor */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Data Stream Monitor (Live WebSocket Feed)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Node: /current</span>
        </div>
        <div className="bg-black/80 rounded-xl p-3 border border-white/10 font-mono text-[10px] h-28 overflow-y-auto leading-relaxed text-zinc-300 space-y-1">
          {logs.map((log, i) => (
            <div key={i} className={i === 0 ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function IoTPageClient() {
  const taskNav = [
    { href: "#task-01", num: "01", label: "ESP32 Web Server", tag: "HTTP" },
    { href: "#task-02", num: "02", label: "Adafruit IO & MQTT", tag: "MQTT" },
    { href: "#task-03", num: "03", label: "IFTTT Automation", tag: "WEBHOOKS" },
    { href: "#task-04", num: "04", label: "Firebase Dashboard", tag: "RTDB" },
    { href: "#task-05", num: "05", label: "Logging & Export", tag: "CSV" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-offwhite">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── breadcrumb ── */}
        <div className="flex items-center justify-between animate-[fadeIn_0.8s_ease-out_forwards]">
          <a
            href="/protosem"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-charcoal hover:text-black transition-colors px-3 py-1.5 rounded-lg border border-charcoal/15 bg-white/60 hover:bg-white shadow-sm"
          >
            ← Back to Protosem
          </a>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal/70 bg-charcoal/5 px-3 py-1 rounded-full border border-charcoal/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Week 07 · IoT &amp; Embedded Systems
          </div>
        </div>

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <header className="rounded-3xl border-2 border-charcoal/15 bg-gradient-to-br from-white via-zinc-50/50 to-amber-50/30 p-8 sm:p-12 shadow-lg relative overflow-hidden animate-[fadeIn_1s_ease-out_forwards]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10 space-y-6 max-w-3xl">
            {/* Student metadata header */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-white bg-charcoal px-3 py-1 rounded-md shadow">
                WEEK 07 DOCUMENTATION
              </span>
              <span className="font-mono text-xs text-charcoal/70 px-3 py-1 rounded-md border border-charcoal/15 bg-white/70">
                ProtoSem Capstone Series
              </span>
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-200">
                Author: Sai Sanjay R
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-charcoal font-semibold tracking-tight leading-[1.05]">
              IoT &amp; Embedded Systems
            </h1>

            <p className="text-xl sm:text-2xl text-charcoal/80 font-display italic">
              From Local Breadboard Prototype to Real-Time Cloud Telemetry
            </p>

            <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-body">
              A comprehensive hands-on progression through ESP32-based embedded architecture — hosting local
              in-memory HTTP web servers, publishing bi-directional cloud telemetry over MQTT with Adafruit IO,
              orchestrating event-driven IFTTT voice webhooks, building multi-sensor Google Firebase dashboards,
              driving optocoupler-isolated relays, and engineering client-side CSV time-series exports.
            </p>

            {/* Hardware Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                <div className="text-[10px] font-mono text-charcoal/60 uppercase">Microcontroller</div>
                <div className="text-xs font-mono font-bold text-charcoal">ESP32 (240 MHz)</div>
              </div>
              <div className="p-3 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                <div className="text-[10px] font-mono text-charcoal/60 uppercase">Protocols</div>
                <div className="text-xs font-mono font-bold text-charcoal">HTTP · MQTT · REST</div>
              </div>
              <div className="p-3 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                <div className="text-[10px] font-mono text-charcoal/60 uppercase">Cloud Platforms</div>
                <div className="text-xs font-mono font-bold text-charcoal">Adafruit IO · Firebase</div>
              </div>
              <div className="p-3 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                <div className="text-[10px] font-mono text-charcoal/60 uppercase">Magic Smoke</div>
                <div className="text-xs font-mono font-bold text-emerald-600">0.00g (Undefeated)</div>
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════
            STICKY TASK NAV (safe gap below top floating nav)
        ══════════════════════════════════════ */}
        <nav className="sticky top-[96px] md:top-[100px] z-30 rounded-2xl border-2 border-charcoal/15 bg-offwhite/95 backdrop-blur-md px-3 py-2.5 shadow-md">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-charcoal/90 font-bold pr-3 border-r border-charcoal/20 mr-1 whitespace-nowrap shrink-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-charcoal" />
              TASKS
            </span>
            {taskNav.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap shrink-0 border border-charcoal/15 text-charcoal bg-white/80 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-200 shadow-sm"
              >
                <span className="opacity-60 text-[10px]">{t.num}</span>
                <span>{t.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ══════════════════════════════════════
            INTERACTIVE VIRTUAL LAB
        ══════════════════════════════════════ */}
        <ESP32VirtualLab />

        {/* ══════════════════════════════════════
            PROJECT OVERVIEW & BOM
        ══════════════════════════════════════ */}
        <section className="rounded-3xl border border-charcoal/15 bg-white/95 p-7 sm:p-9 shadow-md space-y-6">
          <EyebrowLabel>Architecture &amp; Curriculum</EyebrowLabel>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display text-charcoal font-semibold mb-4">
                A Step-by-Step Embedded Systems Progression
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4 font-body">
                The IoT &amp; Embedded Systems module was engineered as a progressive ramp: each task
                systematically conquered one layer of the connected hardware stack. We transitioned from
                raw bare-metal HTTP web serving directly on the microcontroller to asynchronous pub/sub
                messaging via MQTT, cloud event automation via IFTTT webhooks, real-time NoSQL synchronization
                with Google Firebase, and persistent analytics logging.
              </p>
              <p className="text-sm text-charcoal/80 leading-relaxed font-body">
                Rather than treating IoT as isolated sensors, this journey illuminated how networking,
                electrical isolation, cloud brokerage, and browser clients synthesize into production-grade systems.
              </p>

              <DevHumourNote
                quote="Theory says IoT is about connecting devices to the cloud. In practice, IoT is 80% checking if your USB cable actually transfers data or only charges power."
                lesson="Always verify data pin continuity on micro-USB cables before questioning your entire firmware."
              />
            </div>

            <div className="flex justify-center">
              <ArchDiagram
                steps={[
                  "01. ESP32 Microcontroller (Hardware Layer)",
                  "02. Local Wi-Fi & Embedded HTTP Server",
                  "03. MQTT Pub/Sub via Adafruit IO Broker",
                  "04. IFTTT Event-Driven Voice Automation",
                  "05. Firebase Realtime DB & Live WebSockets",
                  "06. Multi-Sensor DHT11/LDR & Relay Actuation",
                  "07. Persistent Logging & CSV Data Export",
                ]}
              />
            </div>
          </div>

          <div>
            <Sub>Master Hardware Bill of Materials (All 5 Tasks)</Sub>
            <PinTable
              rows={[
                { pin: "38-Pin SoC", component: "ESP32-WROOM-32", type: "3.3V Logic / 240 MHz Dual-Core", notes: "Core microcontroller running FreeRTOS and Arduino core" },
                { pin: "GPIO 2", component: "Onboard SMD Blue LED", type: "Digital Output (Active HIGH)", notes: "Task 1 Local Web Server indicator" },
                { pin: "GPIO 4", component: "2-Channel 5V Relay IN1", type: "Digital Output (Galvanic optocoupler)", notes: "Task 2 & 3 Mains incandescent lamp switching" },
                { pin: "GPIO 4", component: "DHT11 Temp & Humidity", type: "Single-Wire Bidirectional Serial", notes: "Task 4 & 5 Environmental sensing (with 10k pullup)" },
                { pin: "GPIO 34", component: "LDR Photoresistor", type: "Analog Input (12-bit ADC1, 0-4095)", notes: "Task 4 & 5 Ambient illuminance sensing on ADC1" },
                { pin: "GPIO 26", component: "Mains Relay Control", type: "Digital Output (Active HIGH)", notes: "Task 4 & 5 Autonomous night-light relay trigger" },
                { pin: "VIN (5V)", component: "External 5V Power Rail", type: "Power Supply", notes: "Relay coil actuation supply" },
                { pin: "GND", component: "Common Ground Rail", type: "0V Reference", notes: "Ties ESP32 ground and relay ground together" },
              ]}
            />
          </div>

          <RepoLinkCard />
        </section>

        {/* ══════════════════════════════════════
            TASK 01
        ══════════════════════════════════════ */}
        <TaskSection
          id="task-01"
          number="01"
          subtitle="Local Wi-Fi Embedded HTTP Server"
          title="ESP32 Web Server & HTML LED Control"
          tag="HTTP / LOCAL"
        >
          <div>
            <Sub>Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              Host a lightweight HTTP web server directly on the ESP32 with zero external cloud dependencies.
              The ESP32 connects in station mode (STA) to a local Wi-Fi router, listens on port 80, and serves an
              HTML control panel entirely from flash memory. Any client device on the same subnet can visit the
              ESP32&apos;s IP address and actuate the onboard GPIO 2 LED via simple HTTP GET endpoints.
            </p>
          </div>

          <DevHumourNote
            tag="ROOKIE GOTCHA"
            quote="Time spent writing the C++ web server: 20 minutes. Time spent figuring out why the ESP32 refused to connect to Wi-Fi because the laptop was on 5GHz and ESP32 only understands 2.4GHz: 2.5 hours."
            lesson="The ESP32-WROOM radio only operates on 2.4 GHz IEEE 802.11 b/g/n bands. Make sure your dual-band router SSID is broadcasting 2.4 GHz!"
          />

          <div>
            <Sub>Core Concepts</Sub>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ConceptCard term="ESP32-WROOM-32" def="Dual-core Xtensa 32-bit LX6 SoC with integrated Wi-Fi and Bluetooth BLE, programmed via Arduino IDE." />
              <ConceptCard term="Wi-Fi Station (STA) Mode" def="The ESP32 connects as a client to an existing access point and gets assigned a local IPv4 address via DHCP." />
              <ConceptCard term="Embedded HTTP Server" def="Application-layer server listening on TCP port 80, parsing incoming HTTP GET request headers in C++." />
              <ConceptCard term="Client / Server Model" def="The browser client initiates an HTTP request; the microcontroller server processes it and sends an HTML response." />
              <ConceptCard term="REST-style Routing" def="Paths such as /led/on and /led/off are mapped directly to digital pin writes on the silicon." />
              <ConceptCard term="GPIO Digital I/O" def="General Purpose Input/Output pins. Pin 2 drives the blue onboard surface-mount LED HIGH (3.3V) or LOW (0V)." />
            </div>
          </div>

          <div>
            <Sub>Architecture &amp; Wi-Fi Request Flow</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <ArchDiagram steps={["Browser Client (Laptop / Phone)", "Local 2.4GHz Wi-Fi Subnet", "ESP32 WebServer (Port 80)", "GPIO 2 (digitalWrite)", "Onboard Blue LED"]} />
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Request Pipeline</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    When the user visits <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1.5 py-0.5 rounded text-[11px]">http://192.168.56.202/on</code> in their browser, the ESP32 handles the request on port 80, executes <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1.5 py-0.5 rounded text-[11px]">digitalWrite(2, HIGH)</code>, illuminates the onboard blue LED, and serves the confirmation page saying &ldquo;LED is ON&rdquo;.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Key Architectural Boundary</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    Zero cloud round-trip. Ultra-low latency (&lt;10ms), but completely isolated from the internet outside the local subnet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Sub>ESP32 Pin Connections &amp; Circuit Wiring</Sub>
            <PinTable
              rows={[
                { pin: "GPIO 2", component: "Onboard Blue SMD LED", type: "Digital Output (3.3V Logic)", notes: "Drives LED cathode/anode circuit. HIGH = Illuminated, LOW = Off." },
                { pin: "GND", component: "Common Ground Rail", type: "0V Reference", notes: "Ground reference for the ESP32 development board." },
                { pin: "VIN / 3V3", component: "Micro-USB 5V / 3.3V Regulator", type: "Power Supply", notes: "Powers the ESP32 SoC via AMS1117-3.3 linear voltage regulator." },
              ]}
            />
          </div>

          <div>
            <Sub>Hardware &amp; Tooling Bill of Materials</Sub>
            <HardwareList items={[
              { icon: "🔌", name: "ESP32 Dev Board", note: "ESP32-WROOM-32 38-pin development board" },
              { icon: "🔗", name: "Micro-USB Data Cable", note: "Powers module and enables flashing over CP2102 UART" },
              { icon: "📶", name: "2.4 GHz Wi-Fi Network", note: "Router providing DHCP IP allocation" },
              { icon: "💻", name: "Arduino IDE 2.x", note: "Configured with espressif/arduino-esp32 board package" },
              { icon: "📦", name: "WebServer.h Library", note: "Native non-blocking HTTP server included in ESP32 core" },
              { icon: "💡", name: "Onboard LED (GPIO 2)", note: "Built-in surface-mount blue LED on the dev board" },
            ]} />
          </div>

          <div>
            <Sub>Firmware Implementation &amp; HTML Generation</Sub>
            <CodeBlock filename="Task_01_ESP32_WebServer_LED.ino" code={`#include <WiFi.h>
#include <WebServer.h>

const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2;

void handleRoot() {
  String html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 Local Web Control</title>";
  html += "<style>body{font-family:sans-serif; text-align:center; padding:40px 20px; background:#f4f4f5;}";
  html += ".btn{display:inline-block; padding:12px 24px; margin:8px; font-weight:bold; color:#fff; text-decoration:none; border-radius:8px;}";
  html += ".btn-on{background:#10b981;} .btn-off{background:#ef4444;}</style></head><body>";
  html += "<h2>ESP32 Local Web Control</h2>";
  html += "<p>Status: <b>" + String(digitalRead(ledPin) ? "ON" : "OFF") + "</b></p>";
  html += "<a href='/led/on' class='btn btn-on'>TURN ON</a>";
  html += "<a href='/led/off' class='btn btn-off'>TURN OFF</a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\\nConnected! IP: ");
  Serial.println(WiFi.localIP());

  server.on("/",        handleRoot);
  server.on("/led/on",  handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
  Serial.println("HTTP Server started on port 80");
}

void loop() {
  server.handleClient();
}`} />
          </div>

          <div>
            <Sub>Problems Encountered &amp; Debugging Log</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "Wi-Fi Connection Failure on Modern Mesh Routers",
                  cause: "Combined 2.4 GHz and 5 GHz dual-band SSIDs caused the ESP32 Wi-Fi hardware (which only supports 2.4 GHz 802.11 b/g/n) to fail association.",
                  solution: "Created a dedicated 2.4 GHz IoT guest network in router settings with WPA2-Personal security, allowing the ESP32 to establish DHCP lease in under 2 seconds.",
                },
                {
                  issue: "Garbled Noise in Serial Monitor at Boot",
                  cause: "ESP32 ROM bootloader outputs debug data at 115200 baud, whereas Arduino IDE serial monitor defaulted to 9600 baud, causing character framing errors.",
                  solution: "Synchronized Serial.begin(115200) in firmware and matched the Arduino IDE baud dropdown to 115200 baud.",
                },
                {
                  issue: "Dynamic IP Address Drift Upon Power Cycle",
                  cause: "Router DHCP reassigned a different IPv4 address to the ESP32 whenever the USB cable was re-plugged, breaking saved browser bookmarks.",
                  solution: "Reserved a static IP binding (192.168.1.50) using the ESP32's MAC address in the router's DHCP reservation table.",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Lab Verification &amp; Evidence</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/esp32_led_on_hardware.png"
                alt="Physical ESP32 web server verification with browser LED is ON endpoint"
                caption="Hardware & browser verification: ESP32 serving web interface at http://192.168.56.202/on with onboard GPIO 2 blue LED illuminated"
              />
              <MediaImage
                src="/media/f1.jpeg"
                alt="ESP32 breadboard hardware setup on lab bench"
                caption="Physical bench setup: ESP32 DevKit connected over micro-USB, listening for HTTP requests"
              />
            </div>
          </div>

          <Reflection text="Building an HTTP server directly on bare silicon made the client-server model click in a visceral way. Seeing a browser communicate with a microcontroller without any intermediate cloud server was empowering. It also exposed key hardware constraints: the chip handles one TCP socket at a time, and the entire HTML page lives in volatile C++ heap memory." />
        </TaskSection>

        {/* ══════════════════════════════════════
            TASK 02
        ══════════════════════════════════════ */}
        <TaskSection
          id="task-02"
          number="02"
          subtitle="Cloud Telemetry & Remote Relay Control"
          title="Adafruit IO Dashboard & MQTT Protocol"
          tag="MQTT / CLOUD"
        >
          <div>
            <Sub>Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              Task 1 was trapped inside the local Wi-Fi router. In Task 2, we bridged the ESP32 to the global internet
              using Adafruit IO and the MQTT (Message Queuing Telemetry Transport) protocol. A toggle on the cloud
              dashboard publishes an &ldquo;ON&rdquo;/&ldquo;OFF&rdquo; message to an MQTT broker feed; the ESP32 subscribes to that feed
              over TCP port 1883 and energizes a 2-channel relay module to switch a high-voltage incandescent lamp.
            </p>
          </div>

          <DevHumourNote
            tag="MQTT ANALOGY"
            quote="MQTT is basically Twitter for microcontrollers: you publish hot takes (sensor readings) to a topic, and hope the broker delivers them before the power flickers."
            lesson="Unlike HTTP request-response polling, MQTT maintains a lightweight persistent TCP connection with keepalive pings (QoS 0/1/2)."
          />

          <div>
            <Sub>Core Concepts &amp; Architecture Roles</Sub>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ConceptCard term="MQTT Protocol" def="Extremely lightweight publish-subscribe messaging transport with minimal 2-byte header overhead for low-bandwidth IoT." />
              <ConceptCard term="MQTT Broker" def="Central cloud message exchange (io.adafruit.com). Routes packets between publishers and subscribers across port 1883." />
              <ConceptCard term="Publish / Subscribe" def="Decoupled architecture: publishers send messages to topics without knowing who is listening; subscribers receive matching topics." />
              <ConceptCard term="Adafruit IO Feed" def="The cloud channel (equivalent to an MQTT topic) that stores time-series data and broadcasts state changes." />
              <ConceptCard term="Optocoupler Relay" def="Galvanic optical isolation between 3.3V ESP32 microcontroller logic and 230V AC mains electricity." />
              <ConceptCard term="TCP Keepalive Ping" def="Periodic ping packets exchanged between ESP32 and broker to maintain the socket through NAT firewalls." />
            </div>
          </div>

          <div>
            <Sub>MQTT Entities &amp; Identified Roles</Sub>
            <ComparisonTable
              headers={["Entity Role", "Hardware / Service", "Protocol & Port", "Action & Responsibility"]}
              rows={[
                ["MQTT Broker", "io.adafruit.com", "TCP 1883 (Plain) / 8883 (SSL)", "Authenticates AIO credentials, maintains persistent sockets, routes feed messages."],
                ["MQTT Publisher", "Adafruit IO Web Dashboard", "HTTPS / WebSocket bridge", "Publishes 'ON' / 'OFF' payload when user taps the dashboard toggle switch."],
                ["MQTT Subscriber", "ESP32-WROOM-32", "TCP 1883 (Adafruit_MQTT_Client)", "Subscribes to 'Sai__0077/feeds/bulb-control', decodes payload, drives GPIO 4."],
                ["Actuator Load", "2-Channel 5V Relay + Lamp", "230V AC Mains Circuit", "Optocoupler energizes electromagnetic coil, closing Normally Open contacts."],
              ]}
            />
          </div>

          <div>
            <Sub>ESP32 Pin Connections &amp; Relay Wiring</Sub>
            <PinTable
              rows={[
                { pin: "GPIO 4", component: "Relay IN1 Pin", type: "Digital Output (Active HIGH)", notes: "Control signal triggering the optocoupler transistor on Relay Channel 1." },
                { pin: "VIN (5V)", component: "Relay VCC Pin", type: "5V DC Power Supply", notes: "Provides 5V coil excitation current (draws ~70mA when energized)." },
                { pin: "GND", component: "Relay GND Pin", type: "Common Ground (0V)", notes: "Common ground reference between ESP32 and relay board." },
                { pin: "Relay COM", component: "Mains Live Wire (L)", type: "230V AC High Voltage", notes: "Common terminal breaking the hot line of the household mains supply." },
                { pin: "Relay NO", component: "Incandescent Lamp Live", type: "230V AC Switched Line", notes: "Normally Open terminal; circuit completes only when relay is energized." },
              ]}
            />
          </div>

          <div>
            <Sub>System Architecture</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <ArchDiagram steps={["Adafruit IO Web Dashboard", "MQTT Broker (io.adafruit.com:1883)", "ESP32 (MQTT Subscriber Client)", "Optocoupler Relay (GPIO 4)", "230V AC Incandescent Bulb"]} />
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Payload Handling</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    When toggled, Adafruit IO pushes string payloads <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">&quot;ON&quot;</code> or <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">&quot;OFF&quot;</code>.
                    The ESP32 callback compares the buffer via <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">strcmp()</code> and toggles GPIO 4.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Electrical Safety</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    Mains live wire is broken across the relay&apos;s Normally Open (NO) and Common (COM) contacts. The optocoupler prevents mains voltage spikes from destroying the ESP32.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Sub>Firmware Implementation (MQTT Client)</Sub>
            <CodeBlock filename="Task_02_Adafruit_MQTT_Relay.ino" code={`#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "Sai__0077"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

Adafruit_MQTT_Subscribe relayFeed =
  Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

const int RELAY_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASSWORD");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&relayFeed);
  Serial.println("Subscribed to Adafruit IO bulb-control feed!");
}

void loop() {
  if (!mqtt.connected()) {
    int8_t ret;
    while ((ret = mqtt.connect()) != 0) {
      Serial.println(mqtt.connectErrorString(ret));
      mqtt.disconnect();
      delay(5000);
    }
  }

  Adafruit_MQTT_Subscribe* sub;
  while ((sub = mqtt.readSubscription(2000))) {
    if (sub == &relayFeed) {
      char* msg = (char*)relayFeed.lastread;
      Serial.print("Received: ");
      Serial.println(msg);

      if (strcmp(msg, "ON") == 0)  digitalWrite(RELAY_PIN, HIGH);
      if (strcmp(msg, "OFF") == 0) digitalWrite(RELAY_PIN, LOW);
    }
  }
}`} />
          </div>

          <div>
            <Sub>Problems Encountered &amp; Debugging Log</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "Spurious Relay Clicking During Microcontroller Boot",
                  cause: "Certain ESP32 GPIOs output PWM glitch pulses during bootloader initialization, momentarily triggering the relay.",
                  solution: "Selected GPIO 4 (a clean general-purpose pin) and called pinMode(4, OUTPUT) and digitalWrite(4, LOW) as the very first statements in setup().",
                },
                {
                  issue: "Silent MQTT Disconnections After 60 Seconds of Inactivity",
                  cause: "NAT firewalls dropped the idle TCP socket because no data packets were flowing between commands.",
                  solution: "Added an automated mqtt.ping() keepalive heartbeat every 45 seconds and an auto-reconnect retry loop inside loop().",
                },
                {
                  issue: "Active-LOW vs Active-HIGH Logic Inversion",
                  cause: "The relay board was configured for active-LOW optocoupler trigger, meaning 0V energized the coil and 3.3V released it.",
                  solution: "Inverted the output state in firmware so incoming 'ON' pulled the pin to GND and 'OFF' set it HIGH.",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Lab Verification &amp; Evidence</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/relay.jpeg"
                alt="2-channel relay module with red and black wiring"
                caption="2-channel optocoupler relay module wired to mains incandescent light bulb"
              />
              <MediaImage
                src="/media/media__1790510641197.png"
                alt="Adafruit IO bulb-control dashboard showing OFF toggle"
                caption="Adafruit IO cloud control console with active toggle feed (Sai__0077)"
              />
              <MediaVideo
                src="/media/ada_vid.mp4"
                caption="Video demonstration: Remote MQTT relay toggling from the Adafruit IO cloud dashboard"
                wide
              />
            </div>
          </div>

          <Reflection text="Graduating from local HTTP to internet-wide MQTT was the dividing line between an isolated demo and a genuine IoT product. It demonstrated why industrial IoT relies on MQTT rather than polling: the persistent TCP broker connection eliminated port forwarding, allowed instant push updates, and drastically cut battery and CPU consumption." />
        </TaskSection>

        {/* ══════════════════════════════════════
            TASK 03
        ══════════════════════════════════════ */}
        <TaskSection
          id="task-03"
          number="03"
          subtitle="Event-Driven Cloud Workflows & Platform Analytics"
          title="IFTTT + Adafruit IO Voice Automation & IoT Protocols"
          tag="WEBHOOKS / IFTTT"
        >
          <div>
            <Sub>Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              Eliminate manual dashboard clicking by connecting voice assistants and automated triggers to the hardware.
              Using IFTTT (If This Then That), voice commands spoken into Google Assistant trigger an Applet that
              dispatches an HTTP POST webhook to Adafruit IO&apos;s REST API, publishing &ldquo;ON&rdquo; or &ldquo;OFF&rdquo; to the feed,
              which the ESP32 receives in milliseconds over MQTT.
            </p>
          </div>

          <DevHumourNote
            tag="ENGINEER EFFICIENCY"
            quote="Engineers will happily spend 6 hours wiring microcontrollers, configuring Webhooks, setting up Google Assistant voice models, and debugging network latency just to avoid reaching 2 feet over to toggle a desk lamp."
            lesson="Composability is the secret weapon of modern cloud architecture: 0 lines of backend server code were required to build this voice automation pipeline."
          />

          <div>
            <Sub>Core Concepts</Sub>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ConceptCard term="IFTTT" def="No-code cloud event orchestration platform connecting triggers across disparate consumer web ecosystems." />
              <ConceptCard term="Webhook" def="Automated HTTP callbacks dispatched immediately when an upstream trigger condition fires." />
              <ConceptCard term="Event-Driven Architecture" def="System reacts asynchronously to events instead of burning microcontroller cycles constantly polling." />
              <ConceptCard term="REST-to-MQTT Bridge" def="Adafruit IO provides dual interfaces: REST webhooks for writing data, and MQTT sockets for device listening." />
              <ConceptCard term="Voice Assistant Integration" def="Speech-to-text NLP engine (Google Assistant) parsing phrases into structured trigger payloads." />
              <ConceptCard term="Zero-Server Middleware" def="Fully serverless chaining: Voice Trigger → IFTTT → Adafruit IO → ESP32 → Relay." />
            </div>
          </div>

          <div>
            <Sub>Comprehensive IoT Cloud Platforms &amp; Protocol Comparison</Sub>
            <ComparisonTable
              headers={["IoT Platform", "Primary Protocol", "Data Structure", "Best Suited For", "Trade-Offs"]}
              rows={[
                ["Adafruit IO", "MQTT & REST", "Time-series Feeds (Strings/Floats)", "Remote device control, quick dashboard toggles, hobbyist automation", "Rate-limited to 30 data points/min on free tier; basic charting"],
                ["ThingSpeak (MathWorks)", "HTTP GET/POST & MQTT", "Numbered Channel Fields (field1..field8)", "In-depth scientific telemetry, MATLAB signal processing, historical trends", "15-second mandatory update throttling between writes; non-realtime actuation"],
                ["Google Firebase RTDB", "WebSockets / HTTPS REST", "Hierarchical NoSQL JSON tree", "Real-time bi-directional dashboards, multi-client sync (<100ms latency)", "Higher payload overhead; requires token-based authentication management"],
              ]}
            />
          </div>

          <div>
            <Sub>HTTP Methods in IoT Analytics: GET vs. POST</Sub>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm space-y-2">
                <div className="font-mono font-bold text-xs text-charcoal uppercase flex items-center justify-between">
                  <span>HTTP GET Method</span>
                  <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">Query String</span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed font-body">
                  Data is appended directly into the URL query parameters (e.g. <code className="font-mono text-[10px] bg-zinc-100 px-1 rounded">/update?api_key=KEY&amp;field1=28.4</code>). Simpler for bare-metal C++ with zero body buffering, but exposes secrets in URLs and limits payload length.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm space-y-2">
                <div className="font-mono font-bold text-xs text-charcoal uppercase flex items-center justify-between">
                  <span>HTTP POST Method</span>
                  <span className="text-[10px] bg-indigo-50 px-2 py-0.5 rounded text-indigo-700">Body Payload</span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed font-body">
                  Data is passed inside the HTTP request body as JSON or Form Encoded. More secure, supports complex hierarchical nested structures, and is the standard for webhook dispatchers like IFTTT.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Sub>Full End-to-End Workflow</Sub>
            <div className="flex justify-center my-4">
              <ArchDiagram steps={[
                "User: 'Hey Google, Turn ON Desk Lamp'",
                "Google Assistant parses phrase",
                "IFTTT Applet fires webhook",
                "HTTP POST → io.adafruit.com REST API",
                "Adafruit IO MQTT Broker pushes to topic",
                "ESP32 receives 'ON' over TCP socket",
                "GPIO 4 energizes relay → Bulb ON"
              ]} />
            </div>
          </div>

          <div>
            <Sub>Firmware Implementation</Sub>
            <CodeBlock filename="Task_03_IFTTT_Voice_Automation.ino" code={`#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define WLAN_SSID       "YOUR_WIFI_SSID"
#define WLAN_PASS       "YOUR_WIFI_PASSWORD"
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "Sai__0077"
#define AIO_KEY         "YOUR_AIO_KEY"
#define RELAY_PIN       4

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe voiceFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&voiceFeed);
  Serial.println("[IFTTT VOICE] Subscribed to feed!");
}

void loop() {
  if (!mqtt.connected()) {
    while (mqtt.connect() != 0) {
      mqtt.disconnect();
      delay(5000);
    }
  }

  Adafruit_MQTT_Subscribe* sub;
  while ((sub = mqtt.readSubscription(3000))) {
    if (sub == &voiceFeed) {
      char* msg = (char*)voiceFeed.lastread;
      if (strcmp(msg, "ON") == 0)  digitalWrite(RELAY_PIN, HIGH);
      if (strcmp(msg, "OFF") == 0) digitalWrite(RELAY_PIN, LOW);
    }
  }
}`} />
          </div>

          <div>
            <Sub>Problems Encountered &amp; Debugging Log</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "IFTTT Webhook 401 Unauthorized Error",
                  cause: "The HTTP POST request headers were missing the required X-AIO-Key header, causing Adafruit IO to reject the webhook.",
                  solution: "Configured IFTTT Webhook headers field to include: X-AIO-Key: YOUR_AIO_KEY and set Content-Type to application/json.",
                },
                {
                  issue: "Voice Command End-to-End Latency Variance",
                  cause: "Chaining Google Assistant -> IFTTT -> Adafruit IO -> ESP32 introduced round-trip latencies fluctuating between 500ms and 1400ms.",
                  solution: "Verified that the MQTT subscriber on the ESP32 introduced <15ms of the latency; the bulk occurred in the cloud natural language parser.",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Lab Verification &amp; Evidence</Sub>
            <div className="grid grid-cols-1 gap-4">
              <MediaVideo
                src="/media/voice.mp4"
                caption="Voice automation in action: Google Assistant voice command triggering bulb actuation via IFTTT and MQTT"
                wide
              />
            </div>
          </div>

          <Reflection text="The IFTTT exercise revealed how powerful micro-service composition is. By pairing a voice NLP frontend with a webhook router and an MQTT broker, we constructed an enterprise-grade smart-home feature without maintaining a single server instance or writing a single line of backend middleware." />
        </TaskSection>

        {/* ══════════════════════════════════════
            TASK 04
        ══════════════════════════════════════ */}
        <TaskSection
          id="task-04"
          number="04"
          subtitle="Real-Time Cloud Telemetry &amp; Multi-Sensor Fusion"
          title="Firebase IoT Monitoring Dashboard &amp; Sensor Suite"
          tag="FIREBASE / SENSORS"
        >
          <div>
            <Sub>Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              Scale up to a multi-sensor telemetry suite backed by Google Firebase Realtime Database. The ESP32 continuously
              samples temperature and relative humidity from a DHT11 digital sensor, ambient illuminance from an analog LDR
              photoresistor, and syncs these readings to JSON nodes in Firebase. A custom web dashboard listens to Firebase
              via real-time WebSockets, streaming live telemetry while offering bidirectional remote relay actuation.
            </p>
          </div>

          <DevHumourNote
            tag="SENSOR TRUTH"
            quote="DHT11 specification: accuracy ±2°C. In reality: ±'definitely feels warm in this room.' Analog LDR ADC reading: 0 at midnight, 4095 when you point a flashlight directly into its soul."
            lesson="Always calibrate analog sensor readings into meaningful engineering units and handle floating-point NaN guard rails in firmware."
          />

          <div>
            <Sub>Core Concepts</Sub>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ConceptCard term="Google Firebase RTDB" def="Cloud-hosted NoSQL JSON database syncing updates to all connected browser clients in under 100ms via WebSockets." />
              <ConceptCard term="Backend-as-a-Service (BaaS)" def="Managed cloud infrastructure offering database, auth, and hosting without server provisioning." />
              <ConceptCard term="DHT11 Sensor" def="Capacitive humidity sensor & thermistor communicating via a proprietary single-wire time-multiplexed protocol." />
              <ConceptCard term="LDR Voltage Divider" def="Cadmium-sulfide photoresistor wired with a 10k pull-down resistor into a 12-bit ADC pin (GPIO 34, 0–4095)." />
              <ConceptCard term="Firebase Authentication" def="Token-based email/password authentication preventing unauthorized read/write access to sensor endpoints." />
              <ConceptCard term="Bi-directional Sync" def="Telemetry flows ESP32 → Firebase; user control commands flow Dashboard → Firebase → ESP32." />
            </div>
          </div>

          <div>
            <Sub>Architectural Comparison: Firebase RTDB vs. MQTT Broker</Sub>
            <ComparisonTable
              headers={["Architectural Dimension", "Google Firebase RTDB", "MQTT Broker (e.g. Mosquitto / Adafruit)"]}
              rows={[
                ["Data Model", "Hierarchical NoSQL JSON tree with persistent state", "Ephemeral message channels (topics) discarded after delivery"],
                ["Client Connection", "Long-lived WebSockets over HTTPS (port 443)", "Persistent TCP sockets (port 1883 or TLS 8883)"],
                ["State Storage", "Native historical persistence; clients read last known state on connect", "Requires explicit 'Retain' flag; otherwise new clients see nothing until next publish"],
                ["Security & Rules", "Granular JSON security rules (.read/.write evaluation per node)", "Topic-level access control lists (ACLs) and username/password"],
                ["Payload Overhead", "JSON text payloads with key-value metadata", "Ultra-lean binary headers (down to 2 bytes)"],
              ]}
            />
          </div>

          <div>
            <Sub>ESP32 Pin Connections &amp; Sensor Wiring</Sub>
            <PinTable
              rows={[
                { pin: "GPIO 4", component: "DHT11 Digital Data Line", type: "Single-Wire Serial (3.3V)", notes: "Digital time-pulsed data output; requires 10k pull-up resistor to 3.3V." },
                { pin: "GPIO 34", component: "LDR Photoresistor Divider", type: "Analog Input (12-bit ADC1)", notes: "Connected to junction between LDR and 10k resistor. ADC range: 0–4095." },
                { pin: "GPIO 26", component: "Relay Module IN Pin", type: "Digital Output (3.3V Logic)", notes: "Energizes relay channel driving the physical test lamp." },
                { pin: "3.3V Rail", component: "Sensor VCC Bus", type: "Regulated 3.3V Power", notes: "Supplies reference voltage to DHT11 and LDR voltage divider." },
                { pin: "GND Rail", component: "Common Ground Bus", type: "0V Reference", notes: "Ties ESP32, sensors, and relay logic ground together." },
              ]}
            />
          </div>

          <div>
            <Sub>LDR Threshold &amp; Analog ADC Calibration</Sub>
            <div className="p-5 rounded-2xl border border-charcoal/15 bg-zinc-50 space-y-3 font-body text-xs text-charcoal/85">
              <p>
                The ESP32 integrated Successive Approximation Register (SAR) Analog-to-Digital Converter provides 12-bit resolution (values from 0 to 4095).
                In our voltage divider circuit, the LDR is wired between 3.3V and GPIO 34, with a 10kΩ resistor pulled down to GND:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 font-mono text-[11px] pt-1">
                <div className="bg-white p-3 rounded-xl border border-charcoal/10">
                  <div className="text-zinc-500 text-[10px] uppercase">Pitch Dark / Night</div>
                  <div className="text-sm font-bold text-charcoal mt-0.5">&lt; 800 ADC</div>
                  <div className="text-[10px] text-zinc-500 mt-1">LDR resistance &gt; 100kΩ</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-charcoal/10">
                  <div className="text-zinc-500 text-[10px] uppercase">Ambient Lab Light</div>
                  <div className="text-sm font-bold text-indigo-600 mt-0.5">1200 – 2200 ADC</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Normal indoor illumination</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-charcoal/10">
                  <div className="text-zinc-500 text-[10px] uppercase">Direct Torch / Sun</div>
                  <div className="text-sm font-bold text-amber-600 mt-0.5">&gt; 3500 ADC</div>
                  <div className="text-[10px] text-zinc-500 mt-1">LDR resistance drops &lt; 1kΩ</div>
                </div>
              </div>
              <p className="text-[11px] text-charcoal/70">
                <b>Hysteresis Threshold:</b> Switching threshold is calibrated to <b>1500 ADC</b> with a <b>±50 count deadband</b> to prevent relay chatter at twilight.
              </p>
            </div>
          </div>

          <div>
            <Sub>Database Schema &amp; Node Hierarchy</Sub>
            <div className="p-5 rounded-2xl border border-charcoal/15 bg-zinc-50 font-mono text-xs text-charcoal/85 space-y-2">
              <div className="text-[10px] text-charcoal/60 uppercase tracking-widest font-bold mb-2">/current JSON Tree</div>
              <div className="grid sm:grid-cols-2 gap-2">
                <div><span className="text-indigo-600 font-bold">&quot;temperature&quot;</span>: 28.4 <span className="text-graymid">(float, °C)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;humidity&quot;</span>: 62.0 <span className="text-graymid">(float, %)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;ldr&quot;</span>: 1820 <span className="text-graymid">(int, 12-bit ADC)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;bulbState&quot;</span>: true <span className="text-graymid">(boolean, relay output)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;mode&quot;</span>: &quot;AUTO&quot; <span className="text-graymid">(string, control mode)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;threshold&quot;</span>: 1500 <span className="text-graymid">(int, daylight trigger level)</span></div>
              </div>
            </div>
          </div>

          <div>
            <Sub>Interactive Live Firebase Telemetry Dashboard (System UI)</Sub>
            <p className="text-xs text-charcoal/70 mb-3 font-body">
              An interactive recreation of the production dashboard hosted on Firebase Hosting (<code>smarthome-iot-e9fe6.web.app</code>).
              Toggle between <b>AUTO-SENSE</b> (where manual toggle is hidden and light is governed autonomously by the LDR sensor vs threshold)
              and <b>MANUAL</b> (where the direct toggle switch is unlocked).
            </p>
            <FirebaseTelemetryDashboard />
          </div>

          <div>
            <Sub>Firmware Telemetry Loop</Sub>
            <CodeBlock filename="Task_04_Firebase_Sensors_Telemetry.ino" code={`#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN   4
#define DHTTYPE  DHT11
#define LDRPIN   34
#define RELAYPIN 26

FirebaseData  fbdo;
FirebaseAuth  auth;
FirebaseConfig config;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  WiFi.begin("YOUR_WIFI_SSID", "YOUR_WIFI_PASSWORD");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  config.host = "YOUR_FIREBASE_PROJECT.firebaseio.com";
  config.signer.tokens.legacy_token = "YOUR_DATABASE_SECRET";
  Firebase.begin(&config, &auth);
  dht.begin();
  pinMode(RELAYPIN, OUTPUT);
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  int   l = analogRead(LDRPIN);

  // Guard against sensor communication glitches
  if (!isnan(t) && !isnan(h)) {
    Firebase.RTDB.setFloat(&fbdo, "/current/temperature", t);
    Firebase.RTDB.setFloat(&fbdo, "/current/humidity",    h);
    Firebase.RTDB.setInt  (&fbdo, "/current/ldr",         l);
  }

  // Poll for dashboard relay commands
  if (Firebase.RTDB.getBool(&fbdo, "/current/bulbState")) {
    bool state = fbdo.to<bool>();
    digitalWrite(RELAYPIN, state ? HIGH : LOW);
  }

  delay(5000); // 5-second sampling cycle
}`} />
          </div>

          <div>
            <Sub>Problems Encountered &amp; Debugging Log</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "DHT11 Returning NaN (Not a Number) Continuously",
                  cause: "The firmware sampled the DHT11 sensor too quickly (<1500ms intervals). The capacitive sensor requires at least 2 seconds between successive reads.",
                  solution: "Implemented a non-blocking millis() timer executing once every 5000ms with isnan() checks before updating Firebase.",
                },
                {
                  issue: "ADC Reading Freezing When Wi-Fi Begins Transmission",
                  cause: "ESP32 ADC2 channels (GPIO 0, 2, 4, 12-15, 25-27) share hardware with the Wi-Fi RF module and fail while Wi-Fi is transmitting.",
                  solution: "Moved the analog LDR voltage divider to GPIO 34, which resides on ADC1 and operates independently of the Wi-Fi radio.",
                },
                {
                  issue: "Firebase Token Expiration Causing Memory Leaks",
                  cause: "Instantiating new FirebaseData objects inside the loop leaked heap RAM over time until the microcontroller experienced a kernel panic.",
                  solution: "Reused a static global fbdo singleton and enabled Firebase.reconnectWiFi(true) in setup().",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Lab Verification &amp; Evidence</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/firebase_cli_init.jpg"
                alt="Firebase CLI Terminal initialization and deployment"
                caption="Firebase CLI setup: 'firebase login' developer authentication, 'firebase init database' RTDB provisioning with rules, and 'firebase deploy'"
                wide
              />
              <MediaImage
                src="/media/firebase-rtdb-console.png"
                alt="Firebase Realtime Database console showing live JSON tree"
                caption="Firebase RTDB console displaying live telemetry schema and relay control attributes"
              />
              <MediaImage
                src="/media/firebase-auth-console.png"
                alt="Firebase Authentication console showing registered service accounts"
                caption="Firebase Auth console with authenticated users and microcontroller service accounts"
              />
              <MediaImage
                src="/media/media__1790510951506.png"
                alt="Firebase RTDB data node during active session"
                caption="Live RTDB data snapshot during active testing session (threshold: 1425, mode: MANUAL)"
              />
              <MediaImage
                src="/media/f1.jpeg"
                alt="Full hardware prototype: ESP32 breadboard and laptop telemetry dashboard"
                caption="Complete hardware setup: breadboard sensors connected, telemetry rendering on screen"
              />
            </div>
          </div>

          <Reflection text="Transitioning to Google Firebase was an eye-opener in modern full-stack IoT. Instead of point-to-point messaging, the database became the single source of truth for both physical sensors and browser user interfaces. The real-time synchronization handled network drops gracefully and proved how essential authorization layers are for connected hardware." />
        </TaskSection>

        {/* ══════════════════════════════════════
            TASK 05
        ══════════════════════════════════════ */}
        <TaskSection
          id="task-05"
          number="05"
          subtitle="Complete System Integration &amp; CSV Analytics"
          title="Firebase Logging, Automation &amp; Data Export"
          tag="ANALYTICS / CSV"
        >
          <div>
            <Sub>Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              The capstone task brought the complete embedded system into a production-grade analytics platform.
              In addition to real-time telemetry, the ESP32 appends timestamped historical log records into Firebase.
              The web client supports two operating modes: MANUAL (human toggle) and AUTO-SENSE (autonomous relay triggering
              when ambient light drops below an LDR threshold). Finally, an in-memory browser engine exports historical
              sensor data as a structured CSV file for spreadsheet analysis.
            </p>
          </div>

          <DevHumourNote
            tag="RECEIPTS &amp; PROOF"
            quote="CSV export is the embedded engineer's ultimate legal defense: when your instructor or client asks 'Did this system actually run uninterrupted for 24 hours?' — you smile and hand them 17,280 rows of 28.4°C."
            lesson="Time-series data logging is the milestone where hardware ceases being a demonstration and transforms into a diagnostic instrument."
          />

          <div>
            <Sub>Operating Modes &amp; Autonomy</Sub>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-charcoal/15 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-charcoal uppercase">MANUAL OVERRIDE</span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">Human Loop</span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed font-body">
                  The user maintains direct deterministic authority. Tapping the dashboard toggle updates <code className="font-mono text-[10px] bg-zinc-100 px-1 rounded">/current/bulbState</code>, and the ESP32 actuates the relay immediately.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-charcoal/15 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-charcoal uppercase">AUTO-SENSE (HYSTERESIS)</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Autonomous</span>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed font-body">
                  The ESP32 firmware evaluates ambient light vs a user-configured threshold. If <code className="font-mono text-[10px] bg-zinc-100 px-1 rounded">ldr &lt; (threshold - 50)</code> (darkness detected), the relay energizes automatically.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Sub>Browser Client-Side CSV Export Engine</Sub>
            <CodeBlock filename="exportSensorLog.ts" code={`type SensorLogEntry = {
  timestamp:   string; // ISO-8601 UTC
  temperature: number; // DHT11 °C
  humidity:    number; // DHT11 %
  lightLevel:  number; // 12-bit ADC (0 - 4095)
  bulbState:   boolean;
  mode:        "MANUAL" | "AUTO";
};

export function downloadSensorDataCSV(records: SensorLogEntry[]) {
  const headers = [
    "Timestamp (ISO)",
    "Temperature (C)",
    "Humidity (%)",
    "Light Level (ADC 0-4095)",
    "Bulb State",
    "Operating Mode"
  ];

  const csvRows = records.map((r) => [
    r.timestamp,
    r.temperature.toFixed(1),
    r.humidity.toFixed(1),
    r.lightLevel,
    r.bulbState ? "ON" : "OFF",
    r.mode
  ]);

  const csvString = [headers.join(","), ...csvRows.map((e) => e.join(","))].join("\\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", url);
  downloadAnchor.setAttribute("download", \`iot_telemetry_\${new Date().toISOString().slice(0, 10)}.csv\`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}`} />
          </div>

          <div>
            <Sub>Downloaded File Verification &amp; Sample CSV Telemetry</Sub>
            <CsvPreviewTable />
          </div>

          <div>
            <Sub>Lab Verification &amp; Evidence</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/media__1790510820927.png"
                alt="System UI dashboard showing 24.5°C, 45% humidity, 1980 ambient light, AUTO-SENSE mode"
                caption="Web dashboard telemetry feed: live readings, AUTO-SENSE threshold evaluation, relay active"
              />
              <MediaImage
                src="/media/f2.jpeg"
                alt="Lab desk with energized mains lamp driven by relay"
                caption="Physical verification: 230V incandescent bulb illuminated on lab bench via optocoupler relay"
              />
              <MediaVideo
                src="/media/dash_vid.mp4"
                caption="End-to-end telemetry demonstration: mode toggle, threshold trigger, live telemetry sync"
                wide
              />
              <MediaVideo
                src="/media/glue.mp4"
                caption="Extended integration video: hardware bench setup, physical sensor stimuli, and dashboard response"
                wide
              />
            </div>
          </div>

          <div>
            <Sub>Engineering Constraints &amp; Production Limitations</Sub>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "5-Second Sampling Window", note: "Not hard real-time; transient environmental spikes between intervals remain unsampled." },
                { title: "Manual Threshold Calibrations", note: "The daylight threshold is set manually rather than dynamically adapting to seasonal shifts." },
                { title: "Firebase Free-Tier Quotas", note: "High-frequency logging demands write-batching to stay within Firebase Spark limits." },
                { title: "DHT11 Resolution", note: "DHT11 has 1°C temperature resolution; critical industrial setups require DHT22 or BME280." },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-charcoal/15 bg-white">
                  <div className="font-mono text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
                    <span className="text-amber-500">⚠</span> {item.title}
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-body">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <Reflection text="Task 5 synthesized the entire semester's curriculum into a coherent engineering artifact. Persistent database logging and CSV export bridged the chasm between an ephemeral breadboard hobby project and an actionable data science pipeline. Coordinating real-time firmware loops, asynchronous database listeners, and responsive browser UI taught me how real embedded systems are delivered." />
        </TaskSection>

        {/* ══════════════════════════════════════
            OVERALL RETROSPECTIVE & REPO ACCESS
        ══════════════════════════════════════ */}
        <section className="rounded-3xl border-2 border-charcoal/15 bg-gradient-to-br from-white via-zinc-50 to-amber-50/20 p-8 sm:p-12 shadow-lg relative overflow-hidden space-y-8">
          <div className="relative z-10">
            <EyebrowLabel>Course Reflection</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-display text-charcoal font-semibold mb-6">
              What Week 7 Taught Me About IoT Systems
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed font-body">
                <p>
                  IoT is frequently oversimplified as simply connecting a sensor to Wi-Fi. In reality, it is a demanding
                  multidisciplinary bridge between low-level electronic hardware, embedded C++ firmware constraints,
                  asynchronous network protocols, and full-stack cloud data infrastructure.
                </p>
                <p>
                  Progressing from bare-metal local HTTP sockets to MQTT brokers, no-code IFTTT automation chains,
                  and Google Firebase WebSockets highlighted the trade-offs at each architectural layer: latency versus
                  cloud dependency, local survivability versus remote accessibility, and battery efficiency versus telemetry frequency.
                </p>
              </div>

              <div className="space-y-2.5 bg-white p-5 rounded-2xl border border-charcoal/15 shadow-sm">
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-charcoal/70 font-bold mb-3">
                  Key Skills &amp; Principles Mastered
                </div>
                {[
                  "Microcontroller GPIO & digital logic control (ESP32)",
                  "Embedded HTTP server routing & memory constraints",
                  "MQTT publish-subscribe architecture & topic feeds",
                  "Cloud IoT platforms (Adafruit IO & Google Firebase)",
                  "Event-driven webhooks & voice automation (IFTTT)",
                  "Galvanic relay isolation for high-voltage AC circuits",
                  "Analog & digital sensor integration (DHT11 & LDR)",
                  "Bi-directional WebSocket synchronization in the browser",
                  "Time-series data logging & client-side CSV analytics",
                  "Hardware-software concurrent debugging under failure modes",
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-charcoal/85 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <RepoLinkCard />
        </section>

        {/* footer return */}
        <div className="text-center pt-6">
          <div className="text-xs font-mono text-charcoal/70 uppercase tracking-[0.18em] font-bold">
            ProtoSem · Week 07 · IoT &amp; Embedded Systems · Sai Sanjay R
          </div>
          <a
            href="/protosem"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl border border-charcoal/20 bg-white hover:bg-charcoal hover:text-white transition-all text-xs font-mono font-bold shadow-sm"
          >
            ← Return to ProtoSem Log
          </a>
        </div>

      </div>

      <div className="mt-24">
        <Footer />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
