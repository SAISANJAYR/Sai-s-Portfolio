"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { IOT_SOURCES } from "./iotSources";

const PORTFOLIO_FW = "https://github.com/SAISANJAYR/Sai-s-Portfolio/blob/main/iot-firmware";
const PORTFOLIO_FW_TREE = "https://github.com/SAISANJAYR/Sai-s-Portfolio/tree/main/iot-firmware";
const IOT_REPO_TREE = "https://github.com/SAISANJAYR/IOT/tree/main";

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
const SAMPLE_CSV_PATH = "Task_05_Firebase_Logging_CSV/sample_sensor_telemetry.csv";

function parseSampleCsv() {
  const lines = (IOT_SOURCES[SAMPLE_CSV_PATH] ?? "").trim().split("\n").slice(1);
  return lines.map((l) => {
    const [time, temp, hum, light, bulb, mode] = l.split(",");
    return { time, temp, hum, light, bulb, mode };
  });
}

function downloadSampleCsv() {
  const blob = new Blob([IOT_SOURCES[SAMPLE_CSV_PATH] ?? ""], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "iot_telemetry_2024-04-12.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* SVG line chart of the logged records (temperature, humidity, light) */
function HistoryChart() {
  const rows = parseSampleCsv();
  const W = 720, H = 220, L = 44, R = 44, T = 16, B = 30;
  const n = rows.length;
  const x = (i: number) => L + (i * (W - L - R)) / Math.max(1, n - 1);
  const yLeft = (v: number) => T + (1 - (v - 20) / 50) * (H - T - B); // 20 → 70 (°C / %)
  const yRight = (v: number) => T + (1 - v / 4095) * (H - T - B);     // 0 → 4095 ADC
  const path = (vals: number[], y: (v: number) => number) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const temp = rows.map((r) => Number(r.temp));
  const hum = rows.map((r) => Number(r.hum));
  const light = rows.map((r) => Number(r.light));

  return (
    <figure className="rounded-2xl border border-charcoal/15 bg-white shadow-sm p-4 my-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Logged temperature, humidity and light level over time">
        {/* bulb ON bands */}
        {rows.map((r, i) =>
          r.bulb === "ON" && i < n - 1 ? (
            <rect key={i} x={x(i)} y={T} width={x(i + 1) - x(i)} height={H - T - B} fill="#10b981" opacity={0.08} />
          ) : null
        )}
        {[20, 30, 40, 50, 60, 70].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={yLeft(v)} y2={yLeft(v)} stroke="#e4e4e7" strokeWidth={1} />
            <text x={L - 6} y={yLeft(v) + 3} fontSize={9} textAnchor="end" fill="#71717a" fontFamily="monospace">{v}</text>
          </g>
        ))}
        {[0, 1000, 2000, 3000, 4095].map((v) => (
          <text key={v} x={W - R + 6} y={yRight(v) + 3} fontSize={9} fill="#4f46e5" fontFamily="monospace">{v}</text>
        ))}
        {/* threshold line (1500 ADC) */}
        <line x1={L} x2={W - R} y1={yRight(1500)} y2={yRight(1500)} stroke="#4f46e5" strokeDasharray="4 4" strokeWidth={1} />
        <text x={L + 4} y={yRight(1500) - 4} fontSize={9} fill="#4f46e5" fontFamily="monospace">threshold 1500</text>
        <path d={path(temp, yLeft)} fill="none" stroke="#b45309" strokeWidth={2} />
        <path d={path(hum, yLeft)} fill="none" stroke="#0369a1" strokeWidth={2} />
        <path d={path(light, yRight)} fill="none" stroke="#4f46e5" strokeWidth={2} />
        {rows.map((r, i) =>
          i % 3 === 0 ? (
            <text key={i} x={x(i)} y={H - 10} fontSize={9} textAnchor="middle" fill="#71717a" fontFamily="monospace">
              {r.time.slice(11, 19)}
            </text>
          ) : null
        )}
      </svg>
      <figcaption className="flex flex-wrap gap-4 text-[10px] font-mono text-charcoal/70 mt-2">
        <span><span className="inline-block w-3 h-0.5 bg-[#b45309] align-middle mr-1" />Temperature (°C, left axis)</span>
        <span><span className="inline-block w-3 h-0.5 bg-[#0369a1] align-middle mr-1" />Humidity (%, left axis)</span>
        <span><span className="inline-block w-3 h-0.5 bg-[#4f46e5] align-middle mr-1" />Light (ADC, right axis)</span>
        <span><span className="inline-block w-3 h-2 bg-emerald-500/20 align-middle mr-1" />Bulb ON</span>
      </figcaption>
    </figure>
  );
}

function CsvPreviewTable() {
  const sampleData = parseSampleCsv();
  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal/15 bg-white shadow-sm my-3 font-mono text-xs">
      <div className="px-4 py-2.5 bg-zinc-100/90 border-b border-charcoal/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-charcoal/70">
        <span className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Exported Dataset Snapshot: iot_telemetry_2024-04-12.csv ({sampleData.length} records)
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">RFC 4180 comma-separated</span>
          <button
            onClick={downloadSampleCsv}
            className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-charcoal text-white hover:bg-black"
          >
            ⬇ Download this CSV
          </button>
        </span>
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
   Step-by-Step Recreation Manual Card
───────────────────────────────────────────── */
function RecreationManualCard({
  taskNumber,
  repoFolder,
  title = "Hardware & Firmware Step-by-Step Recreation Manual",
  steps,
}: {
  taskNumber: string;
  repoFolder: string;
  title?: string;
  steps: { step: string; detail: string; command?: string }[];
}) {
  return (
    <div className="rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 p-6 my-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-200/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
            {taskNumber}
          </span>
          <h4 className="font-display font-semibold text-charcoal text-base">
            {title}
          </h4>
        </div>
        <a
          href={`https://github.com/SAISANJAYR/IOT/tree/main/${repoFolder}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[11px] font-bold shadow-sm transition-all"
        >
          <span>View Task Manual on GitHub</span>
          <span>↗</span>
        </a>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="font-mono text-xs font-bold text-charcoal">{s.step}</span>
            </div>
            <p className="text-[11px] font-body text-charcoal/75 leading-relaxed">{s.detail}</p>
            {s.command && (
              <pre className="font-mono text-[10px] bg-zinc-900 text-emerald-400 p-2 rounded-lg overflow-x-auto">
                {s.command}
              </pre>
            )}
          </div>
        ))}
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
function Sub({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-charcoal/80 mb-3 flex items-center gap-2 scroll-mt-44"
    >
      <span className="w-5 h-[2px] bg-charcoal/70 inline-block" />
      {children}
    </h3>
  );
}

/* ─────────────────────────────────────────────
   Body paragraph + definition panel helpers
───────────────────────────────────────────── */
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-charcoal/80 leading-relaxed font-body">{children}</p>;
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1.5 py-0.5 rounded text-[11px]">
      {children}
    </code>
  );
}

function Panel({ title, tag, children }: { title: string; tag?: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl border border-charcoal/15 bg-white shadow-sm space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono font-bold text-xs text-charcoal uppercase tracking-wide">{title}</span>
        {tag && (
          <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded shrink-0">{tag}</span>
        )}
      </div>
      <div className="text-xs text-charcoal/75 leading-relaxed font-body space-y-2">{children}</div>
    </div>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 items-start text-xs text-charcoal/80 font-body leading-relaxed">
          <span className="w-5 h-5 shrink-0 rounded-full bg-charcoal text-white font-mono text-[10px] font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

/* ─────────────────────────────────────────────
   Evaluation checklist coverage (per task)
───────────────────────────────────────────── */
function TaskChecklist({ items }: { items: { label: string; href: string }[] }) {
  return (
    <details open className="rounded-2xl border-2 border-emerald-300/70 bg-emerald-50/50 p-5 group">
      <summary className="cursor-pointer list-none flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-emerald-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[11px]">✓</span>
          Evaluation Checklist — where each item is documented
        </span>
        <span className="text-[10px] font-mono text-emerald-800/80">
          {items.length} items · click to jump · <span className="group-open:hidden">show</span>
          <span className="hidden group-open:inline">hide</span>
        </span>
      </summary>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-4">
        {items.map((it, i) => (
          <li key={i}>
            <a
              href={it.href}
              className="flex items-start gap-2 text-[11px] font-body text-emerald-950 hover:text-black hover:underline underline-offset-2"
            >
              <span className="text-emerald-600 font-bold mt-px">☑</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ─────────────────────────────────────────────
   Complete source viewer — renders the exact files
   committed under /iot-firmware (tabs, copy, GitHub link)
───────────────────────────────────────────── */
function SourceFiles({ files }: { files: string[] }) {
  const [active, setActive] = useState(files[0]);
  const [copied, setCopied] = useState(false);
  const code = IOT_SOURCES[active] ?? "";
  const lines = code.split("\n").length;

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-charcoal/30 bg-[#121316] text-[#e4e4e7] shadow-xl my-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#1c1d22] border-b border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {files.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                f === active
                  ? "bg-white text-black border-white font-bold"
                  : "text-zinc-300 border-white/15 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              {f.split("/").slice(1).join("/")}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400">{lines} lines</span>
          <a
            href={`${PORTFOLIO_FW}/${active}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-zinc-300 hover:text-white px-2.5 py-1 rounded-md border border-white/15 hover:border-white/40"
          >
            GitHub ↗
          </a>
          <button
            onClick={copy}
            className="text-[11px] font-mono text-zinc-300 hover:text-white px-2.5 py-1 rounded-md border border-white/15 hover:border-white/40 bg-white/5"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="overflow-auto max-h-[560px] p-5">
        <pre className="text-xs font-mono text-zinc-200 leading-relaxed whitespace-pre min-w-max">{code}</pre>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Repository file index (per task)
───────────────────────────────────────────── */
function RepoFiles({
  folders,
  files,
  iotRepoFolder,
}: {
  folders: string[];
  files: { path: string; note: string }[];
  iotRepoFolder: string;
}) {
  return (
    <div className="rounded-2xl border border-charcoal/15 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-zinc-50 border-b border-charcoal/10 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono font-bold text-charcoal">
          📁 Sai-s-Portfolio / iot-firmware / {folders.join(" + ")}
        </span>
        <div className="flex flex-wrap gap-2">
          {folders.map((f) => (
            <a
              key={f}
              href={`${PORTFOLIO_FW_TREE}/${f}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-charcoal text-white hover:bg-black"
            >
              Open {f} ↗
            </a>
          ))}
          <a
            href={`${IOT_REPO_TREE}/${iotRepoFolder}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-charcoal/20 text-charcoal hover:bg-zinc-100"
          >
            Lab manual (IOT repo) ↗
          </a>
        </div>
      </div>
      <ul className="divide-y divide-charcoal/10">
        {files.map((f) => (
          <li key={f.path} className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <a
              href={`${PORTFOLIO_FW}/${f.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-bold text-indigo-700 hover:underline"
            >
              {f.path}
            </a>
            <span className="text-[11px] text-charcoal/65 font-body">{f.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Three-lane data-flow diagram (device ⇄ cloud ⇄ client)
───────────────────────────────────────────── */
function DataFlowLanes({
  lanes,
  flows,
}: {
  lanes: { title: string; sub: string; items: string[] }[];
  flows: { from: string; to: string; label: string }[];
}) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        {lanes.map((l, i) => (
          <div key={i} className="rounded-2xl border-2 border-charcoal/15 bg-white p-4 shadow-sm">
            <div className="font-mono text-xs font-bold text-charcoal">{l.title}</div>
            <div className="text-[10px] font-mono text-charcoal/60 mb-2">{l.sub}</div>
            <ul className="space-y-1">
              {l.items.map((it, j) => (
                <li key={j} className="text-[11px] font-mono text-charcoal/80 bg-zinc-50 border border-charcoal/10 rounded-md px-2 py-1">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-charcoal/15 bg-zinc-50 p-4 space-y-1.5">
        {flows.map((f, i) => (
          <div key={i} className="grid grid-cols-[auto_auto_auto_1fr] items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-charcoal text-white font-bold">{f.from}</span>
            <span className="text-charcoal/60">──▶</span>
            <span className="px-2 py-0.5 rounded bg-white border border-charcoal/20 font-bold text-charcoal">{f.to}</span>
            <span className="text-charcoal/75 font-body">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
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
              <span>GPIO 04 · 250V Relay</span>
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
                    {ledOn ? "> POST /on → GPIO2 HIGH → {\"state\":true}" : "> System Idle. Waiting for commands..."}
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
    addLog(`MANUAL ACTUATION: set(/current/relay) = "${nextState ? "ON" : "OFF"}" → ESP32 drives GPIO 4, reports /current/bulbState = ${nextState}`);
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
            Relay Output: GPIO 4 · 230V Optocoupled
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
                { pin: "GPIO 4", component: "5V Optocoupled Relay IN1", type: "Digital Output (Active-LOW, optocoupled)", notes: "Tasks 2–5 · switches the 230V mains bulb (manual, voice and LDR-automatic control)" },
                { pin: "GPIO 14", component: "DHT11 Temp & Humidity", type: "Single-Wire Bidirectional Serial", notes: "Tasks 4 & 5 · environmental sensing (10k pull-up to 3.3V)" },
                { pin: "GPIO 34", component: "LDR Photoresistor", type: "Analog Input (12-bit ADC1, 0-4095)", notes: "Tasks 4 & 5 · ambient light sensing on ADC1 (works while Wi-Fi is on)" },
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
          <TaskChecklist
            items={[
              { label: "Objective of the assignment and the problem being addressed", href: "#t1-objective" },
              { label: "Basic concept of an ESP32 Web Server", href: "#t1-concepts" },
              { label: "How the ESP32 and browser communicate over Wi-Fi", href: "#t1-wifi" },
              { label: "Hardware components used", href: "#t1-hardware" },
              { label: "Circuit/wiring diagram", href: "#t1-wiring" },
              { label: "ESP32 pin connections", href: "#t1-wiring" },
              { label: "Complete Arduino/ESP32 source code", href: "#t1-code" },
              { label: "HTML interface developed for controlling the LED", href: "#t1-html" },
              { label: "How the webpage sends a command to the ESP32", href: "#t1-command" },
              { label: "Photographs of the physical setup", href: "#t1-evidence" },
              { label: "Screenshots of the web interface", href: "#t1-evidence" },
              { label: "Problems encountered and how they were solved", href: "#t1-problems" },
              { label: "Brief reflection on what you learned", href: "#t1-reflection" },
              { label: "All required files/code available in your repository", href: "#t1-repo" },
            ]}
          />

          <div>
            <Sub id="t1-objective">Objective &amp; Problem Statement</Sub>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-zinc-50 p-5 rounded-2xl border border-charcoal/15 font-body">
              Host a lightweight HTTP web server directly on the ESP32 with zero external cloud dependencies.
              The ESP32 connects in station mode (STA) to a local Wi-Fi router, listens on port 80, and serves an
              HTML control panel entirely from flash memory. Any client device on the same subnet can visit the
              ESP32&apos;s IP address and switch the GPIO 2 LED ON/OFF through simple HTTP endpoints (<C>/on</C>, <C>/off</C>, <C>/status</C>).
            </p>
            <p className="text-xs text-charcoal/70 leading-relaxed font-body mt-3">
              <b>Problem addressed:</b> an embedded board normally needs a physical button or a USB serial cable to be
              controlled. Running a web server on the chip itself turns any phone or laptop on the same Wi-Fi into a
              remote control — no app to install and no cloud account needed.
            </p>
          </div>

          <DevHumourNote
            tag="ROOKIE GOTCHA"
            quote="Time spent writing the C++ web server: 20 minutes. Time spent figuring out why the ESP32 refused to connect to Wi-Fi because the laptop was on 5GHz and ESP32 only understands 2.4GHz: 2.5 hours."
            lesson="The ESP32-WROOM radio only operates on 2.4 GHz IEEE 802.11 b/g/n bands. Make sure your dual-band router SSID is broadcasting 2.4 GHz!"
          />

          <div>
            <Sub id="t1-concepts">Core Concepts — What an ESP32 Web Server Is</Sub>
            <p className="text-xs text-charcoal/75 leading-relaxed font-body mb-3">
              An <b>ESP32 web server</b> is a small program running on the microcontroller that listens for HTTP requests
              on TCP port 80, the same way a website server does. When a browser asks for <C>/</C> it sends back an HTML
              page; when the browser asks for <C>/on</C> or <C>/off</C> the server runs a C++ handler that changes the GPIO
              pin and replies with the new state. The Arduino <C>WebServer</C> library does the request parsing; my code only
              registers a handler per URL with <C>server.on()</C> and calls <C>server.handleClient()</C> in <C>loop()</C>.
            </p>
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
            <Sub id="t1-wifi">How the ESP32 and Browser Communicate over Wi-Fi</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <ArchDiagram steps={["Browser Client (Laptop / Phone)", "Local 2.4GHz Wi-Fi Subnet", "ESP32 WebServer (Port 80)", "GPIO 2 (digitalWrite)", "Onboard Blue LED"]} />
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Request Pipeline</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    The ESP32 joins the router in station mode and gets an IP by DHCP (printed on the Serial Monitor). Both the
                    phone/laptop and the ESP32 are now on the same 2.4 GHz subnet, so the browser opens a TCP connection to
                    <C>http://&lt;esp32-ip&gt;:80</C>. <C>GET /</C> returns the control page; a button press sends
                    <C>POST /on</C> or <C>POST /off</C>; the ESP32 runs <C>digitalWrite(2, HIGH/LOW)</C> and answers with JSON.
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
            <Sub id="t1-wiring">Circuit / Wiring Diagram &amp; ESP32 Pin Connections</Sub>
            <PinTable
              rows={[
                { pin: "GPIO 2", component: "Onboard blue SMD LED + external 5mm LED", type: "Digital Output (3.3V Logic)", notes: "HIGH = LED ON, LOW = LED OFF. Drives the onboard LED and (optionally) a breadboard LED." },
                { pin: "GPIO 2 → 220Ω", component: "Resistor R1 → LED anode (+, long leg)", type: "I = (3.3 V − Vf) / 220 Ω → a few mA", notes: "Keeps the GPIO far below its 40 mA absolute maximum." },
                { pin: "GND", component: "LED cathode (−, short leg)", type: "0V Reference", notes: "Return path for the LED current; common ground of the board." },
                { pin: "VIN / 3V3", component: "Micro-USB 5V / 3.3V Regulator", type: "Power Supply", notes: "USB powers the board; the onboard AMS1117 regulator makes 3.3V for the ESP32." },
              ]}
            />
            <div className="mt-4">
              <MediaImage
                src="/media/task1_led_circuit.jpg"
                alt="Task 1 wiring diagram: ESP32 GPIO 2 to 220 ohm resistor to LED anode, LED cathode to GND"
                caption="Wiring diagram: ESP32 GPIO 2 → 220 Ω resistor → LED anode; LED cathode → GND (onboard LED on GPIO 2 lights at the same time)"
              />
            </div>
          </div>

          <div>
            <Sub id="t1-hardware">Hardware Components Used &amp; Tooling</Sub>
            <HardwareList items={[
              { icon: "🔌", name: "ESP32 Dev Board", note: "ESP32-WROOM-32 DevKit V1 — dual-core 240 MHz, 2.4 GHz Wi-Fi" },
              { icon: "💡", name: "Onboard LED (GPIO 2)", note: "Built-in surface-mount blue LED on the dev board" },
              { icon: "🔵", name: "5mm LED + 220 Ω resistor", note: "Optional external indicator on the breadboard, same GPIO 2" },
              { icon: "🧩", name: "Breadboard + jumper wires", note: "Solderless breadboard and male-to-male DuPont wires" },
              { icon: "🔗", name: "Micro-USB Data Cable", note: "Powers module and enables flashing over the CP2102 USB-UART" },
              { icon: "📶", name: "2.4 GHz Wi-Fi Network", note: "Router providing DHCP IP allocation" },
              { icon: "💻", name: "Arduino IDE 2.x", note: "Configured with espressif/arduino-esp32 board package" },
              { icon: "📦", name: "WiFi.h + WebServer.h", note: "Wi-Fi stack and HTTP server included in the ESP32 core" },
            ]} />
          </div>

          <div>
            <Sub id="t1-html">HTML Interface Developed for Controlling the LED</Sub>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <Panel title="What the page contains" tag="served from flash">
                <p>
                  The whole interface — HTML, CSS and JavaScript — is one string, <C>INDEX_HTML</C>, stored in flash with
                  <C>PROGMEM</C> and sent by <C>handleRoot()</C>. It shows a card with a live status badge (IP address),
                  the device name, a <b>TURN ON</b> and a <b>TURN OFF</b> button, and a footer that shows the current LED
                  output.
                </p>
              </Panel>
              <Panel title="Why it is built this way" tag="no page reloads">
                <p>
                  The buttons call <C>fetch()</C> instead of following links, so the page never reloads — it just updates
                  the status text from the JSON reply. A <C>setInterval</C> polls <C>/status</C> every 3 s, so if two people
                  have the page open, both see the same state.
                </p>
              </Panel>
            </div>
            <CodeBlock
              filename="INDEX_HTML — buttons & script (excerpt of the complete file below)"
              code={`<div class="btn-grid">
  <button class="btn-on"  onclick="setLed(true)"><span>&#x1F4A1;</span> TURN ON</button>
  <button class="btn-off" onclick="setLed(false)"><span>&#x25CB;</span> TURN OFF</button>
</div>
<div class="footer-panel">
  <div>Control Panel &bull; Current Output: <span id="led-state" class="state-indicator">OFF</span></div>
</div>

<script>
  async function setLed(state) {
    const endpoint = state ? '/on' : '/off';
    const res  = await fetch(endpoint, { method: 'POST' });   // command to the ESP32
    const data = await res.json();                            // {"status":"ok","state":true}
    updateUI(data.state);
  }
  async function checkStatus() {                              // keeps the page in sync
    const res  = await fetch('/status');
    const data = await res.json();
    updateUI(data.state);
    document.getElementById('ip-addr').innerText = data.ip;
  }
  setInterval(checkStatus, 3000);
  checkStatus();
</script>`}
            />
          </div>

          <div>
            <Sub id="t1-command">How the Webpage Sends a Command to the ESP32</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Steps
                items={[
                  <>The user taps <b>TURN ON</b>. The button&apos;s <C>onclick</C> calls <C>setLed(true)</C>.</>,
                  <>The browser sends an HTTP request <C>POST /on</C> over Wi-Fi to the ESP32&apos;s IP on port 80.</>,
                  <><C>server.handleClient()</C> in <C>loop()</C> reads the request and the route table (<C>server.on(&quot;/on&quot;, HTTP_ANY, handleLedOn)</C>) picks the handler.</>,
                  <><C>handleLedOn()</C> runs <C>digitalWrite(LED_PIN, HIGH)</C> — GPIO 2 goes to 3.3 V and the LED lights.</>,
                  <>The ESP32 replies <C>200</C> with <C>{"{\"status\":\"ok\",\"state\":true}"}</C>; the page calls <C>updateUI(true)</C> and shows <b>ON (ACTIVE)</b>.</>,
                  <>Because the route accepts <C>HTTP_ANY</C>, typing <C>http://&lt;ip&gt;/on</C> straight into the address bar (a GET) also works — handy for testing.</>,
                ]}
              />
              <CodeBlock
                filename="HTTP exchange (browser ⇄ ESP32 :80)"
                code={`Browser                               ESP32 WebServer :80
───────                               ───────────────────
GET /            ───────────────────▶ handleRoot()
                 ◀─────────────────── 200 text/html (INDEX_HTML)

POST /on         ───────────────────▶ handleLedOn()
                                       digitalWrite(2, HIGH)  → LED ON
                 ◀─────────────────── 200 {"status":"ok","state":true}

POST /off        ───────────────────▶ handleLedOff()
                                       digitalWrite(2, LOW)   → LED OFF
                 ◀─────────────────── 200 {"status":"ok","state":false}

GET /status      ───────────────────▶ handleStatus()   (every 3 s)
                 ◀─────────────────── 200 {"state":false,"ip":"192.168.x.x","uptime":184}`}
              />
            </div>
          </div>

          <div>
            <Sub id="t1-code">Complete Arduino / ESP32 Source Code</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              The full sketch exactly as committed in the repository (Wi-Fi credentials replaced with placeholders).
            </p>
            <SourceFiles files={["Task_01_ESP32_WebServer_LED/Task_01_ESP32_WebServer_LED.ino"]} />
          </div>

          <div>
            <Sub id="t1-problems">Problems Encountered &amp; How They Were Solved</Sub>
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
            <Sub>Step-by-Step Recreation Manual</Sub>
            <RecreationManualCard
              taskNumber="01"
              repoFolder="Task-01-ESP32-WebServer-LED"
              title="ESP32 Web Server & LED Control Manual"
              steps={[
                {
                  step: "Circuit Connections",
                  detail: "Connect onboard blue LED or an external 5mm LED: Anode to ESP32 GPIO 2 via a 220Ω resistor, Cathode to GND.",
                },
                {
                  step: "Wi-Fi Configuration",
                  detail: "Open Task_01_ESP32_WebServer_LED.ino and configure your 2.4 GHz Wi-Fi SSID and password.",
                },
                {
                  step: "Flash Microcontroller",
                  detail: "Select 'ESP32 Dev Module' and COM port at 115200 baud in Arduino IDE. Hold BOOT button during upload if required.",
                },
                {
                  step: "Browser Control",
                  detail: "Open Serial Monitor to observe assigned IP (http://192.168.1.50/), then open in any browser on the subnet to toggle the LED.",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t1-evidence">Photographs of the Physical Setup &amp; Screenshots of the Web Interface</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/esp32_led_on_hardware.png"
                alt="ESP32 board held in front of a browser showing LED is ON at the ESP32 IP address /on, onboard blue LED lit"
                caption="Physical test: browser at the ESP32's IP (192.168.56.202/on) reports “LED is ON” while the board's blue GPIO 2 LED is lit"
                wide
              />
              <MediaImage
                src="/media/task1_web_ui.jpg"
                alt="ESP32 Local Web Control interface hosted at http://192.168.1.50/"
                caption="Browser Control Interface: Embedded dark web dashboard hosted directly on the ESP32 at http://192.168.1.50/ showing connection status, device model, and TURN ON / TURN OFF buttons"
              />
              <MediaImage
                src="/media/task1_esp32_hardware.png"
                alt="ESP32 DevKit hardware connected via USB with blue LED illuminated"
                caption="Physical Hardware Setup: ESP32 DevKit connected via micro-USB with onboard blue GPIO 2 indicator LED successfully illuminated following web command"
              />
            </div>
          </div>

          <div>
            <Sub id="t1-repo">All Required Files / Code in the Repository</Sub>
            <RepoFiles
              folders={["Task_01_ESP32_WebServer_LED"]}
              iotRepoFolder="Task-01-ESP32-WebServer-LED"
              files={[
                { path: "Task_01_ESP32_WebServer_LED/Task_01_ESP32_WebServer_LED.ino", note: "Complete firmware incl. embedded HTML/CSS/JS interface" },
                { path: "README.md", note: "File index, pin map, libraries for all five tasks" },
              ]}
            />
          </div>

          <div id="t1-reflection" className="scroll-mt-44">
            <Sub>Brief Reflection — What I Learned</Sub>
            <Reflection text="Building an HTTP server directly on bare silicon made the client-server model click in a visceral way. Seeing a browser communicate with a microcontroller without any intermediate cloud server was empowering. It also exposed key hardware constraints: the WebServer library serves one client at a time from loop(), the page has to fit in flash as a PROGMEM string, and the device is only reachable from inside the local network." />
          </div>
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
          <TaskChecklist
            items={[
              { label: "Purpose of Adafruit IO in an IoT system", href: "#t2-purpose" },
              { label: "Basic concept of MQTT", href: "#t2-concepts" },
              { label: "MQTT Publisher, Subscriber, and Broker identified", href: "#t2-roles" },
              { label: "Role of an MQTT Topic/Feed", href: "#t2-topics" },
              { label: "Hardware and software used", href: "#t2-hardware" },
              { label: "Adafruit IO account created and documented", href: "#t2-setup" },
              { label: "Dashboard and feed configuration documented", href: "#t2-setup" },
              { label: "Communication flow between ESP32, MQTT, and Adafruit IO", href: "#t2-flow" },
              { label: "MQTT topic/feed structure used", href: "#t2-topics" },
              { label: "Complete ESP32 source code", href: "#t2-code" },
              { label: "Explanation of important code sections", href: "#t2-explain" },
              { label: "Photographs of the hardware setup", href: "#t2-evidence" },
              { label: "Screenshots of the Adafruit IO dashboard", href: "#t2-evidence" },
              { label: "LED control through the cloud dashboard demonstrated", href: "#t2-evidence" },
              { label: "Working demonstration video", href: "#t2-evidence" },
              { label: "Problems encountered during MQTT/cloud setup", href: "#t2-problems" },
              { label: "Solutions implemented", href: "#t2-problems" },
              { label: "Brief learning reflection", href: "#t2-reflection" },
              { label: "All required files available in your repository", href: "#t2-repo" },
            ]}
          />

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
            <Sub id="t2-purpose">Purpose of Adafruit IO in an IoT System</Sub>
            <div className="grid md:grid-cols-3 gap-3">
              <Panel title="Cloud MQTT broker" tag="io.adafruit.com:1883">
                <p>Gives the ESP32 a public server to connect <i>out</i> to. No port-forwarding or public IP is needed at home or in the lab — the board keeps one outgoing TCP connection open.</p>
              </Panel>
              <Panel title="Data store (feeds)" tag="time-series">
                <p>Every value published to a feed is saved with a timestamp, so the history of ON/OFF commands can be viewed or downloaded later.</p>
              </Panel>
              <Panel title="Ready-made dashboard" tag="no front-end code">
                <p>Toggle, gauge and chart blocks are linked to feeds by clicking, so a phone-friendly control panel exists without writing any web code. It also exposes a REST API that IFTTT uses in Task 3.</p>
              </Panel>
            </div>
          </div>

          <div>
            <Sub id="t2-concepts">Basic Concept of MQTT &amp; Architecture Roles</Sub>
            <p className="text-xs text-charcoal/75 leading-relaxed font-body mb-3">
              <b>MQTT</b> (Message Queuing Telemetry Transport) is a publish/subscribe protocol that runs over TCP. Clients never
              talk to each other directly: a <b>publisher</b> sends a message to a named <b>topic</b> on a central <b>broker</b>, and
              the broker forwards it to every client that has <b>subscribed</b> to that topic. Headers are as small as 2 bytes and the
              connection stays open, so a device receives commands the moment they are sent instead of polling a server.
            </p>
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
            <Sub id="t2-roles">MQTT Publisher, Subscriber &amp; Broker — Identified Roles</Sub>
            <ComparisonTable
              headers={["Entity Role", "Hardware / Service", "Protocol & Port", "Action & Responsibility"]}
              rows={[
                ["MQTT Broker", "io.adafruit.com", "TCP 1883 (Plain) / 8883 (SSL)", "Authenticates AIO credentials, maintains persistent sockets, routes feed messages."],
                ["MQTT Publisher", "Adafruit IO Web Dashboard", "HTTPS / WebSocket bridge", "Publishes 'ON' / 'OFF' payload when user taps the dashboard toggle switch."],
                ["MQTT Subscriber", "ESP32-WROOM-32", "TCP 1883 (Adafruit_MQTT_Client)", "Subscribes to 'Sai__0077/feeds/bulb-control', decodes payload, drives GPIO 4."],
                ["MQTT Publisher (feedback)", "ESP32-WROOM-32", "TCP 1883 (Adafruit_MQTT_Publish)", "Publishes 'ESP32 Online & Ready' / 'Relay State: ON|OFF' to 'Sai__0077/feeds/device-status'."],
                ["Actuator Load", "2-Channel 5V Relay + Lamp", "230V AC Mains Circuit", "Optocoupler energizes electromagnetic coil, closing Normally Open contacts."],
              ]}
            />
          </div>

          <div>
            <Sub id="t2-topics">Role of an MQTT Topic / Feed &amp; the Topic Structure Used</Sub>
            <p className="text-xs text-charcoal/75 leading-relaxed font-body mb-3">
              A <b>topic</b> is the address a message is published to; the broker uses it to decide who receives the message.
              In Adafruit IO every <b>feed</b> <i>is</i> a topic, named <C>{"{username}"}/feeds/{"{feed_key}"}</C>. The dashboard
              toggle writes to the feed, the feed stores the value, and the broker pushes it to the ESP32 because the ESP32
              subscribed to exactly that topic. Using two feeds keeps commands (cloud → device) separate from status (device → cloud).
            </p>
            <ComparisonTable
              headers={["MQTT Topic", "Direction", "Published By", "Subscribed By", "Payloads"]}
              rows={[
                ["Sai__0077/feeds/bulb-control", "Cloud → ESP32 (command)", "Adafruit IO Toggle block; IFTTT in Task 3", "ESP32 (relayFeed)", "\"ON\" / \"OFF\" (also accepts \"1\" / \"0\")"],
                ["Sai__0077/feeds/device-status", "ESP32 → Cloud (status)", "ESP32 (statusFeed)", "Adafruit IO (stored; viewable on the feed page)", "\"ESP32 Online & Ready\", \"Relay State: ON\" / \"OFF\""],
                ["Sai__0077/errors · Sai__0077/throttle", "Broker → client (system)", "Adafruit IO", "Optional, for debugging", "Error / rate-limit messages (not used in the firmware)"],
              ]}
            />
            <p className="text-[11px] text-charcoal/60 font-mono mt-2">
              Note: the public template in the IOT lab-manual repo uses the generic feed key <C>relay-control</C>; on my account the feed is <C>bulb-control</C> — only the feed key string changes.
            </p>
          </div>

          <div>
            <Sub id="t2-hardware">Hardware &amp; Software Used</Sub>
            <HardwareList items={[
              { icon: "🔌", name: "ESP32 DevKit V1", note: "MQTT client with built-in 2.4 GHz Wi-Fi" },
              { icon: "⚡", name: "5V optocoupled relay module", note: "Active-LOW input, switches the 230V AC lamp (COM/NO contacts)" },
              { icon: "💡", name: "230V incandescent bulb + holder", note: "The AC load being controlled" },
              { icon: "🔗", name: "Jumper wires, mains cord, terminal blocks", note: "DC signal wiring and safely clamped AC wiring" },
              { icon: "☁️", name: "Adafruit IO (free tier)", note: "MQTT broker, feeds and dashboard — user Sai__0077" },
              { icon: "📦", name: "Adafruit MQTT Library", note: "Adafruit_MQTT_Client, Subscribe and Publish classes" },
              { icon: "💻", name: "Arduino IDE 2.x + ESP32 core", note: "Compile, flash, Serial Monitor at 115200 baud" },
              { icon: "🌐", name: "Any browser / phone", note: "Opens the Adafruit IO dashboard from anywhere" },
            ]} />
          </div>

          <div>
            <Sub id="t2-setup">Adafruit IO Account, Dashboard &amp; Feed Configuration</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Steps
                items={[
                  <>Created a free account at <C>io.adafruit.com</C> — username <b>Sai__0077</b>.</>,
                  <>Opened the yellow <b>key icon</b> (My Key) and copied <C>AIO_USERNAME</C> and <C>AIO_KEY</C> into <C>config.h</C> (the key is never committed).</>,
                  <><b>Feeds → New Feed</b>: name <i>Bulb Control</i>, key <C>bulb-control</C>. The <C>device-status</C> feed is created automatically the first time the ESP32 publishes to it.</>,
                  <><b>Dashboards → New Dashboard</b>: <i>Bulb Control</i> (<C>io.adafruit.com/Sai__0077/dashboards/bulb-control</C>).</>,
                  <><b>New Block → Toggle</b>, linked to feed <C>bulb-control</C>; ON text/value = <C>ON</C>, OFF text/value = <C>OFF</C>.</>,
                  <>Flipped the toggle and watched the payload arrive on the Serial Monitor before wiring the mains side.</>,
                ]}
              />
              <ComparisonTable
                headers={["Setting", "Value"]}
                rows={[
                  ["Broker host / port", "io.adafruit.com : 1883 (8883 with TLS)"],
                  ["Username", "Sai__0077"],
                  ["Command feed key", "bulb-control"],
                  ["Status feed key", "device-status"],
                  ["Dashboard", "Bulb Control"],
                  ["Block", "Toggle → bulb-control, values ON / OFF"],
                  ["Free-tier limit", "30 data points / minute"],
                ]}
              />
            </div>
          </div>

          <div>
            <Sub>ESP32 Pin Connections &amp; Relay Wiring</Sub>
            <PinTable
              rows={[
                { pin: "GPIO 4", component: "Relay IN1 Pin", type: "Digital Output (Active-LOW)", notes: "LOW energizes the optocoupler/coil (RELAY_ACTIVE), HIGH releases it." },
                { pin: "VIN (5V)", component: "Relay VCC Pin", type: "5V DC Power Supply", notes: "Provides 5V coil excitation current (draws ~70mA when energized)." },
                { pin: "GND", component: "Relay GND Pin", type: "Common Ground (0V)", notes: "Common ground reference between ESP32 and relay board." },
                { pin: "Relay COM", component: "Mains Live Wire (L)", type: "230V AC High Voltage", notes: "Common terminal breaking the hot line of the household mains supply." },
                { pin: "Relay NO", component: "Incandescent Lamp Live", type: "230V AC Switched Line", notes: "Normally Open terminal; circuit completes only when relay is energized." },
              ]}
            />
            <div className="mt-4">
              <MediaImage
                src="/media/task2_relay_circuit.jpg"
                alt="ESP32 DevKit V1 and 5V Optocoupled Relay AC Lamp Circuit Wiring Diagram"
                caption="Circuit Schematic & Wiring Representation: ESP32 GPIO 4 triggering 5V optocoupled relay module switching 230V AC mains incandescent lamp with complete optical isolation."
              />
            </div>
          </div>

          <div>
            <Sub id="t2-flow">Communication Flow: ESP32 ⇄ MQTT ⇄ Adafruit IO</Sub>
            <div className="mb-4">
              <Steps
                items={[
                  <>On boot the ESP32 joins Wi-Fi, opens a TCP socket to <C>io.adafruit.com:1883</C> and sends MQTT <b>CONNECT</b> with username + AIO key.</>,
                  <>It sends <b>SUBSCRIBE</b> for <C>Sai__0077/feeds/bulb-control</C> and <b>PUBLISH</b>es “ESP32 Online &amp; Ready” to <C>device-status</C>.</>,
                  <>The user flips the dashboard toggle → Adafruit IO saves <C>ON</C> in the feed and the broker <b>PUBLISH</b>es it to every subscriber.</>,
                  <>The ESP32 receives the packet inside <C>mqtt.readSubscription()</C>, compares the payload and drives GPIO 4 LOW → relay clicks → bulb ON.</>,
                  <>The ESP32 publishes “Relay State: ON” back to <C>device-status</C>; <b>PINGREQ/PINGRESP</b> keep the socket alive between commands.</>,
                ]}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <ArchDiagram steps={["Adafruit IO Web Dashboard", "MQTT Broker (io.adafruit.com:1883)", "ESP32 (MQTT Subscriber Client)", "Optocoupler Relay (GPIO 4)", "230V AC Incandescent Bulb"]} />
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="text-[10px] font-mono text-charcoal/70 uppercase tracking-widest mb-1.5 font-bold">Payload Handling</div>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-body">
                    When toggled, Adafruit IO pushes string payloads <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">&quot;ON&quot;</code> or <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">&quot;OFF&quot;</code>.
                    The ESP32 compares the received buffer with <code className="font-mono text-charcoal bg-zinc-100 border border-charcoal/15 px-1 py-0.5 rounded text-[11px]">strcmp()</code> and toggles GPIO 4.
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
            <Sub id="t2-code">Complete ESP32 Source Code (MQTT Client)</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              Two files: the sketch and <C>config.h</C> with the Wi-Fi and Adafruit IO credentials (key replaced by a placeholder).
            </p>
            <SourceFiles
              files={[
                "Task_02_Adafruit_MQTT_Relay/Task_02_Adafruit_MQTT_Relay.ino",
                "Task_02_Adafruit_MQTT_Relay/config.h",
              ]}
            />
          </div>

          <div>
            <Sub id="t2-explain">Explanation of Important Code Sections</Sub>
            <ComparisonTable
              headers={["Code Section", "What It Does & Why"]}
              rows={[
                ["config.h", "Keeps WIFI_SSID / WIFI_PASS / AIO_USERNAME / AIO_KEY out of the main sketch so the code can be shared without leaking the key."],
                ["Adafruit_MQTT_Client mqtt(&client, ...)", "Creates the MQTT client on top of a plain WiFiClient TCP socket to io.adafruit.com:1883, authenticated with username + AIO key."],
                ["Adafruit_MQTT_Subscribe relayFeed(... \"/feeds/bulb-control\")", "Declares the command topic. mqtt.subscribe(&relayFeed) must run before connecting so the SUBSCRIBE is sent on connect."],
                ["Adafruit_MQTT_Publish statusFeed(... \"/feeds/device-status\")", "Second topic used to report back (online message and relay state) — proves the round trip works."],
                ["#define RELAY_ACTIVE LOW / RELAY_INACTIVE HIGH", "The relay module is active-LOW. Naming the levels avoids the inverted-logic bug and makes the ON/OFF branches readable."],
                ["setup(): digitalWrite(RELAY_PIN, RELAY_INACTIVE)", "Puts the lamp in a safe OFF state before Wi-Fi or MQTT start, so a reboot never switches mains on by accident."],
                ["MQTT_connect()", "Returns immediately when connected; otherwise retries mqtt.connect() 3 times, 5 s apart, printing connectErrorString() (e.g. bad key)."],
                ["mqtt.readSubscription(5000)", "Waits up to 5 s for a packet on any subscribed topic — the core receive loop."],
                ["strcmp(payload, \"ON\") / \"1\"", "Decodes the text payload. Accepting \"1\"/\"0\" too means the same firmware works with switch-style blocks."],
                ["mqtt.ping()", "Sends PINGREQ after each read window. If it fails the client disconnects and MQTT_connect() reconnects on the next loop."],
              ]}
            />
          </div>

          <div>
            <Sub id="t2-problems">Problems Encountered During MQTT / Cloud Setup &amp; Solutions Implemented</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "Spurious Relay Clicking During Microcontroller Boot",
                  cause: "Certain ESP32 GPIOs output glitch pulses during bootloader initialization, momentarily triggering the relay.",
                  solution: "Used GPIO 4 (a clean general-purpose pin) and set it to RELAY_INACTIVE as the very first statement in setup().",
                },
                {
                  issue: "Silent MQTT Disconnections After Periods of Inactivity",
                  cause: "NAT firewalls dropped the idle TCP socket because no data packets were flowing between commands.",
                  solution: "Call mqtt.ping() after every 5-second readSubscription() window and reconnect through MQTT_connect() at the start of every loop().",
                },
                {
                  issue: "Active-LOW vs Active-HIGH Logic Inversion",
                  cause: "The relay board uses an active-LOW optocoupler input: 0V energizes the coil and 3.3V releases it, so the lamp worked backwards at first.",
                  solution: "Defined RELAY_ACTIVE = LOW and RELAY_INACTIVE = HIGH and used them everywhere, so 'ON' now really turns the lamp on.",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Step-by-Step Recreation Manual</Sub>
            <RecreationManualCard
              taskNumber="02"
              repoFolder="Task-02-AdafruitIO-MQTT-Relay"
              title="Adafruit IO Dashboard & MQTT Relay Manual"
              steps={[
                {
                  step: "AC Mains Load Wiring (Safety First)",
                  detail: "DISCONNECT MAINS PLUG. Cut Phase wire and screw into Relay COM and NO terminals. Keep Neutral intact directly to the lamp.",
                },
                {
                  step: "DC Logic Interface",
                  detail: "Connect ESP32 VIN (5V) to Relay VCC, GND to GND, and GPIO 4 to Relay IN1 signal pin via DuPont wires.",
                },
                {
                  step: "Adafruit IO Cloud Setup",
                  detail: "Create feed 'bulb-control' on io.adafruit.com, add a Toggle block (ON / OFF) on your dashboard, and copy your AIO username & key.",
                },
                {
                  step: "Flash & Verify",
                  detail: "Enter credentials in config.h, compile Task_02_Adafruit_MQTT_Relay.ino, and toggle from any browser globally.",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t2-evidence">Hardware Photographs, Adafruit IO Dashboard Screenshot &amp; Demonstration Video</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/relay.jpeg"
                alt="2-channel relay module with red and black wiring"
                caption="Hardware setup: optocoupler relay module wired to the ESP32 and the mains incandescent bulb"
              />
              <MediaImage
                src="/media/media__1790510641197.png"
                alt="Adafruit IO bulb-control dashboard showing OFF toggle"
                caption="Adafruit IO dashboard Sai__0077 / Bulb Control — Toggle block linked to the bulb-control feed"
              />
              <MediaVideo
                src="/media/ada_vid.mp4"
                caption="Cloud control demonstrated: flipping the Adafruit IO toggle on the laptop switches the bulb ON and OFF through MQTT and the relay"
                wide
              />
            </div>
          </div>

          <div>
            <Sub id="t2-repo">All Required Files in the Repository</Sub>
            <RepoFiles
              folders={["Task_02_Adafruit_MQTT_Relay"]}
              iotRepoFolder="Task-02-AdafruitIO-MQTT-Relay"
              files={[
                { path: "Task_02_Adafruit_MQTT_Relay/Task_02_Adafruit_MQTT_Relay.ino", note: "Complete MQTT subscriber / publisher firmware" },
                { path: "Task_02_Adafruit_MQTT_Relay/config.h", note: "Wi-Fi + Adafruit IO credentials (placeholders)" },
              ]}
            />
          </div>

          <div id="t2-reflection" className="scroll-mt-44">
            <Sub>Brief Learning Reflection</Sub>
            <Reflection text="Graduating from local HTTP to internet-wide MQTT was the dividing line between an isolated demo and a genuine IoT product. It demonstrated why industrial IoT relies on MQTT rather than polling: the persistent TCP broker connection eliminated port forwarding, allowed instant push updates, and drastically cut battery and CPU consumption." />
          </div>
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
          <TaskChecklist
            items={[
              { label: "Objective of the IoT automation", href: "#t3-objective" },
              { label: "Basic concept of IoT automation", href: "#t3-automation" },
              { label: "What IFTTT is and why it is used", href: "#t3-ifttt" },
              { label: "Trigger → Action concept explained", href: "#t3-ifttt" },
              { label: "Role of Adafruit IO in the automation", href: "#t3-ifttt" },
              { label: "Hardware and software used", href: "#t3-hardware" },
              { label: "IFTTT Applet/workflow created and documented", href: "#t3-applet" },
              { label: "Trigger used identified", href: "#t3-applet" },
              { label: "Action performed identified", href: "#t3-applet" },
              { label: "How the trigger reaches the IoT system", href: "#t3-reach" },
              { label: "Communication/data-flow diagram", href: "#t3-flow" },
              { label: "ESP32 source code", href: "#t3-code" },
              { label: "Screenshots of the Adafruit IO dashboard/feed", href: "#t3-evidence" },
              { label: "Photographs of the working prototype", href: "#t3-evidence" },
              { label: "Video demonstrating the complete automation", href: "#t3-evidence" },
              { label: "Automation tested under different conditions", href: "#t3-tests" },
              { label: "Problems and their solutions documented", href: "#t3-problems" },
              { label: "What you learned about cloud-based automation", href: "#t3-learned" },
              { label: "Brief reflection on the assignment", href: "#t3-reflection" },
            ]}
          />

          <div>
            <Sub id="t3-objective">Objective of the IoT Automation</Sub>
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
            <Sub id="t3-automation">Basic Concept of IoT Automation</Sub>
            <P>
              <b>IoT automation</b> means a physical device acts on its own when a condition or event happens, instead of a person
              operating it step by step. Every automation has the same three parts: an <b>event</b> (a voice command, a time, a
              sensor value), a <b>rule</b> that decides what should happen, and an <b>actuator</b> that does it (here, the relay and
              bulb). In Task 2 a human pressed a button on a dashboard; in Task 3 the event comes from another cloud service, and the
              ESP32 simply reacts to whatever arrives on its feed.
            </P>
          </div>

          <div>
            <Sub id="t3-ifttt">What IFTTT Is · Trigger → Action · Role of Adafruit IO</Sub>
            <div className="grid md:grid-cols-3 gap-3">
              <Panel title="What IFTTT is & why it is used" tag="no-code">
                <p>
                  <b>IFTTT</b> (“If This Then That”) is a cloud service that links other web services through small programs called
                  <b> Applets</b>. It already has secure, authorised connections to Google Assistant and Adafruit IO, so I could join a
                  voice assistant to my hardware without writing or hosting any server code.
                </p>
              </Panel>
              <Panel title="Trigger → Action concept" tag="if this → then that">
                <p>
                  An Applet has exactly one <b>trigger</b> (“If This”) — the event IFTTT watches for — and one or more
                  <b> actions</b> (“Then That”) it runs when the trigger fires. Trigger: <i>I say a phrase to Google Assistant</i>.
                  Action: <i>send the value ON to my Adafruit IO feed</i>. The ESP32 never talks to IFTTT; it only sees the result.
                </p>
              </Panel>
              <Panel title="Role of Adafruit IO" tag="the bridge">
                <p>
                  Adafruit IO is the meeting point: IFTTT <b>writes</b> to the <C>bulb-control</C> feed over HTTPS (REST), and the ESP32
                  <b> reads</b> the same feed over MQTT. Because the Task 2 dashboard toggle uses the same feed, voice and dashboard
                  control work side by side and the feed history records every command.
                </p>
              </Panel>
            </div>
          </div>

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
            <Sub id="t3-hardware">Hardware &amp; Software Used</Sub>
            <HardwareList items={[
              { icon: "🔌", name: "ESP32 DevKit V1", note: "MQTT subscriber that receives the commands" },
              { icon: "⚡", name: "5V optocoupled relay (GPIO 4)", note: "Same wiring as Task 2 — switches the lamp" },
              { icon: "💡", name: "230V bulb + holder", note: "The appliance controlled by voice" },
              { icon: "📱", name: "Smartphone with Google Assistant", note: "Captures the spoken command" },
              { icon: "🔁", name: "IFTTT account", note: "Two Applets: lamp ON and lamp OFF" },
              { icon: "☁️", name: "Adafruit IO", note: "Feed bulb-control (REST in, MQTT out)" },
              { icon: "📦", name: "Adafruit MQTT Library", note: "Subscribe to the feed on the ESP32" },
              { icon: "💻", name: "Arduino IDE 2.x", note: "Flash + Serial Monitor (115200) to watch commands arrive" },
            ]} />
          </div>

          <div>
            <Sub id="t3-applet">IFTTT Applet / Workflow Created — Trigger Used &amp; Action Performed</Sub>
            <ComparisonTable
              headers={["Applet", "IF THIS — Trigger used", "THEN THAT — Action performed", "Result on hardware"]}
              rows={[
                ["Lamp ON", "Google Assistant: voice phrase “Turn on the lamp”", "Adafruit → Send data to Adafruit IO · Feed: bulb-control · Data: ON", "ESP32 gets “ON” → GPIO 4 LOW → relay closes → bulb ON"],
                ["Lamp OFF", "Google Assistant: voice phrase “Turn off the lamp”", "Adafruit → Send data to Adafruit IO · Feed: bulb-control · Data: OFF", "ESP32 gets “OFF” → GPIO 4 HIGH → relay opens → bulb OFF"],
              ]}
            />
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Panel title="How the Applets were built" tag="ifttt.com → Create">
                <Steps
                  items={[
                    <><b>Create</b> → <b>If This → Add</b> → service <b>Google Assistant</b> → voice-phrase trigger → phrase “Turn on the lamp”.</>,
                    <><b>Then That → Add</b> → service <b>Adafruit</b> → action <b>Send data to Adafruit IO</b>.</>,
                    <>Connected my Adafruit IO account (OAuth permission screen), chose feed <C>bulb-control</C>, data to save <C>ON</C>.</>,
                    <>Named it “Lamp ON”, saved, and repeated with “Turn off the lamp” → <C>OFF</C>.</>,
                  ]}
                />
              </Panel>
              <Panel title="Equivalent web request (Webhooks variant)" tag="what the action does">
                <p>The Adafruit action is the same as this REST call, which I also used to test the feed with the Webhooks service:</p>
                <pre className="font-mono text-[10px] bg-zinc-900 text-emerald-400 p-3 rounded-lg overflow-x-auto">{`POST https://io.adafruit.com/api/v2/Sai__0077/feeds/bulb-control/data
X-AIO-Key: <AIO_KEY>
Content-Type: application/json

{ "value": "ON" }`}</pre>
              </Panel>
            </div>
          </div>

          <div>
            <Sub id="t3-reach">How the Trigger Reaches the IoT System</Sub>
            <Steps
              items={[
                <><b>Phone → Google:</b> the phone streams the audio to Google Assistant&apos;s cloud, which converts speech to text and matches it to my IFTTT phrase.</>,
                <><b>Google → IFTTT:</b> Google Assistant is linked to my IFTTT account, so the matched phrase fires the Applet&apos;s trigger in IFTTT&apos;s cloud.</>,
                <><b>IFTTT → Adafruit IO:</b> IFTTT runs the action — an authenticated HTTPS POST to the Adafruit IO REST API that adds the value <C>ON</C> to feed <C>bulb-control</C>.</>,
                <><b>Adafruit IO → ESP32:</b> the new feed value is published on MQTT topic <C>Sai__0077/feeds/bulb-control</C>; the ESP32 already holds an open subscription on TCP 1883, so the message is pushed to it immediately.</>,
                <><b>ESP32 → lamp:</b> <C>readSubscription()</C> returns the payload, <C>strcasecmp()</C> matches “ON”, GPIO 4 goes LOW, the relay closes and the bulb lights. No step needed an open port on the lab network.</>,
              ]}
            />
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
            <Sub id="t3-flow">Communication / Data-Flow Diagram</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-center my-4">
              <div className="flex justify-center">
                <ArchDiagram steps={[
                  "User: 'Hey Google, turn on the lamp'",
                  "Google Assistant (speech → text, phrase match)",
                  "IFTTT Applet trigger fires",
                  "HTTPS POST → io.adafruit.com REST API",
                  "Adafruit IO feed bulb-control = ON",
                  "MQTT PUBLISH → ESP32 (TCP 1883)",
                  "GPIO 4 LOW → relay closes → Bulb ON"
                ]} />
              </div>
              <ComparisonTable
                headers={["Hop", "Protocol / Data"]}
                rows={[
                  ["Phone → Google", "Audio stream over HTTPS"],
                  ["Google → IFTTT", "Service-to-service event (OAuth-linked accounts)"],
                  ["IFTTT → Adafruit IO", "HTTPS POST, JSON {\"value\":\"ON\"}, X-AIO-Key"],
                  ["Adafruit IO → ESP32", "MQTT PUBLISH on Sai__0077/feeds/bulb-control"],
                  ["ESP32 → Relay", "GPIO 4 digital level (active-LOW)"],
                  ["Relay → Bulb", "230V AC through COM / NO contacts"],
                ]}
              />
            </div>
          </div>

          <div>
            <Sub id="t3-code">ESP32 Source Code</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              The ESP32 does not know IFTTT exists — it subscribes to the same Adafruit IO feed, logs the arrival time of every
              command (useful for latency checks) and matches the payload case-insensitively.
            </p>
            <SourceFiles files={["Task_03_IFTTT_Voice_Automation/Task_03_IFTTT_Voice_Automation.ino"]} />
          </div>

          <div>
            <Sub id="t3-problems">Problems and Their Solutions</Sub>
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
            <Sub id="t3-tests">Automation Tested Under Different Conditions</Sub>
            <ComparisonTable
              headers={["Condition", "What happens", "Why"]}
              rows={[
                ["“Turn on the lamp” spoken", "Bulb turns ON in about a second", "Applet 1 posts ON → feed → MQTT → GPIO 4 LOW"],
                ["“Turn off the lamp” spoken", "Bulb turns OFF", "Applet 2 posts OFF to the same feed"],
                ["ON said while the bulb is already ON", "Nothing changes, no flicker", "Writing LOW to an already-LOW pin keeps the relay closed"],
                ["Voice ON, then dashboard toggle OFF", "Bulb follows the latest command (OFF)", "Both write the same feed — last value wins; the toggle updates too"],
                ["Payload sent as “on” or “1”", "Bulb turns ON", "strcasecmp() + numeric aliases in the firmware"],
                ["Wi-Fi / broker connection dropped", "ESP32 reconnects automatically; commands sent while offline are not replayed", "MQTT_connect() retries; the feed is not read back on reconnect (no retained message)"],
                ["ESP32 rebooted", "Lamp starts OFF, then obeys the next command", "setup() writes RELAY_INACTIVE before connecting — fail-safe"],
              ]}
            />
          </div>

          <div>
            <Sub>Step-by-Step Recreation Manual</Sub>
            <RecreationManualCard
              taskNumber="03"
              repoFolder="Task-03-IFTTT-Voice-Automation"
              title="IFTTT Voice Automation Manual"
              steps={[
                {
                  step: "Configure IFTTT Applet",
                  detail: "Create an applet on ifttt.com: Trigger = Google Assistant ('Activate an appliance' or 'Say a phrase').",
                },
                {
                  step: "Connect Adafruit IO Action",
                  detail: "Action = Adafruit service 'Send data to Adafruit IO', choose feed 'bulb-control', and set payload to 'ON'.",
                },
                {
                  step: "Complementary OFF Applet",
                  detail: "Create second applet triggering on 'Turn off the lamp' to push payload 'OFF' to the same feed.",
                },
                {
                  step: "Voice Testing & Verification",
                  detail: "Speak phrase to Google Assistant on your phone. Command executes across cloud hops to trigger ESP32 in ~898ms.",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t3-evidence">Working Prototype, Adafruit IO Feed &amp; Automation Video</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaVideo
                src="/media/voice.mp4"
                caption="Complete automation: Google Assistant voice command → IFTTT → Adafruit IO → ESP32 → relay switches the bulb"
                wide
              />
              <MediaImage
                src="/media/media__1790510641197.png"
                alt="Adafruit IO Bulb Control dashboard with toggle linked to the bulb-control feed"
                caption="Adafruit IO dashboard / bulb-control feed that the IFTTT action writes to (the toggle mirrors voice commands)"
              />
              <MediaImage
                src="/media/relay.jpeg"
                alt="Relay module wired to the ESP32 and mains bulb"
                caption="Working prototype: ESP32 + optocoupled relay + bulb (same rig as Task 2)"
              />
            </div>
          </div>

          <div>
            <Sub id="t3-learned">What I Learned About Cloud-Based Automation</Sub>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { t: "The device stays simple", d: "All the intelligence (speech recognition, rules) lives in the cloud. The ESP32 code is almost the same as Task 2 — it only listens to a feed." },
                { t: "Services connect through shared data", d: "IFTTT and the ESP32 never meet; they agree on one feed name and one payload format. Changing either side does not break the other." },
                { t: "Every hop adds latency and a dependency", d: "Voice → Google → IFTTT → Adafruit IO → ESP32 is four companies' servers. If any one is down or slow, the lamp does not respond — local control is still worth keeping." },
                { t: "Security is about keys and scopes", d: "IFTTT holds an OAuth grant to my Adafruit IO account and the ESP32 holds the AIO key. Leaking either lets someone control the device, so keys stay out of the repository." },
                { t: "Free tiers shape the design", d: "Adafruit IO allows 30 data points per minute, so the device must publish only on changes, never in a tight loop." },
                { t: "Event-driven beats polling", d: "Nothing runs until an event arrives — the ESP32 just waits on an open MQTT socket instead of asking a server every second." },
              ].map((x, i) => (
                <div key={i} className="p-4 rounded-xl border border-charcoal/15 bg-white shadow-sm">
                  <div className="font-mono text-xs font-bold text-charcoal mb-1">{x.t}</div>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-body">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Sub id="t3-repo">Files in the Repository</Sub>
            <RepoFiles
              folders={["Task_03_IFTTT_Voice_Automation"]}
              iotRepoFolder="Task-03-IFTTT-Voice-Automation"
              files={[
                { path: "Task_03_IFTTT_Voice_Automation/Task_03_IFTTT_Voice_Automation.ino", note: "ESP32 subscriber for IFTTT-driven commands" },
              ]}
            />
          </div>

          <div id="t3-reflection" className="scroll-mt-44">
            <Sub>Brief Reflection on the Assignment</Sub>
            <Reflection text="The IFTTT exercise revealed how powerful micro-service composition is. By pairing a voice NLP frontend with a webhook router and an MQTT broker, we constructed an enterprise-grade smart-home feature without maintaining a single server instance or writing a single line of backend middleware." />
          </div>
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
          <TaskChecklist
            items={[
              { label: "Objective of the Firebase IoT monitoring system", href: "#t4-objective" },
              { label: "Basic concept of Cloud Computing", href: "#t4-cloud" },
              { label: "IaaS, PaaS, SaaS, and BaaS explained", href: "#t4-models" },
              { label: "What a Cloud Platform is", href: "#t4-platform" },
              { label: "What a Database is", href: "#t4-platform" },
              { label: "Firebase Realtime Database explained", href: "#t4-rtdb" },
              { label: "What a Cloud-Based Dashboard is", href: "#t4-rtdb" },
              { label: "Authentication and the purpose of a login system", href: "#t4-auth" },
              { label: "Difference between Authentication and Authorization", href: "#t4-auth" },
              { label: "Firebase project setup documented", href: "#t4-setup" },
              { label: "Firebase Authentication configuration documented", href: "#t4-setup" },
              { label: "Realtime Database structure documented", href: "#t4-schema" },
              { label: "Database/data-flow architecture", href: "#t4-dataflow" },
              { label: "Complete dashboard source code", href: "#t4-dashcode" },
              { label: "Screenshots of the login page", href: "#t4-evidence" },
              { label: "Screenshots of the Firebase database", href: "#t4-evidence" },
              { label: "Screenshots of the working dashboard", href: "#t4-evidence" },
              { label: "Video demonstrating webpage workflow", href: "#t4-evidence" },
              { label: "Problems encountered and their solutions", href: "#t4-problems" },
              { label: "Brief reflection on the assignment", href: "#t4-reflection" },
            ]}
          />

          <div>
            <Sub id="t4-objective">Objective of the Firebase IoT Monitoring System</Sub>
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
            <Sub id="t4-cloud">Basic Concept of Cloud Computing</Sub>
            <P>
              <b>Cloud computing</b> is renting computing resources — servers, storage, databases, networking and ready-made
              software — over the internet from a provider such as Google, instead of buying and running the machines yourself.
              You pay for (or get a free quota of) what you use, it scales up when more devices connect, and the provider handles
              hardware failures, backups and security patches. For this task it meant my ESP32 and my browser could share live data
              through Google&apos;s servers in Singapore without me owning or configuring a single server.
            </P>
          </div>

          <div>
            <Sub id="t4-models">IaaS, PaaS, SaaS and BaaS Explained</Sub>
            <ComparisonTable
              headers={["Model", "What you get", "Provider manages", "You manage", "Examples", "Where it appears in Week 7"]}
              rows={[
                ["IaaS — Infrastructure as a Service", "Raw virtual machines, disks and networks", "Physical servers, storage, networking, virtualization", "OS, runtime, database, backend code, app", "AWS EC2, Google Compute Engine, Azure VMs", "Not used — I would have had to install and secure my own MQTT broker / database on a VM"],
                ["PaaS — Platform as a Service", "A managed place to run your own code", "Everything up to the runtime (OS, scaling, patching)", "Your application code and its data", "Google App Engine, Heroku, Vercel", "This portfolio (including this page) is built and hosted on Vercel"],
                ["SaaS — Software as a Service", "A finished application used through a browser/app", "The whole application", "Only your settings and data", "Gmail, Google Assistant, IFTTT, Adafruit IO dashboards", "Tasks 2–3: Adafruit IO dashboard, IFTTT applets, Google Assistant"],
                ["BaaS — Backend as a Service", "Ready-made backend building blocks called from the app", "Servers, database engine, auth system, hosting, scaling", "Front-end code, data structure, security rules", "Firebase, Supabase, AWS Amplify", "Tasks 4–5: Firebase Authentication + Realtime Database + Hosting"],
              ]}
            />
            <div className="overflow-x-auto rounded-2xl border border-charcoal/15 bg-white shadow-sm my-3">
              <table className="w-full text-center text-[11px] font-mono">
                <thead className="bg-zinc-100/80 text-[10px] text-charcoal/70 uppercase tracking-wider border-b border-charcoal/10">
                  <tr>
                    <th className="py-2 px-3 text-left">Layer</th>
                    <th className="py-2 px-3">On-premise</th>
                    <th className="py-2 px-3">IaaS</th>
                    <th className="py-2 px-3">PaaS</th>
                    <th className="py-2 px-3">BaaS</th>
                    <th className="py-2 px-3">SaaS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/10">
                  {[
                    ["Application / UI", 1, 1, 1, 1, 0],
                    ["Backend logic & APIs", 1, 1, 1, 0, 0],
                    ["Database & Auth", 1, 1, 1, 0, 0],
                    ["Runtime & OS", 1, 1, 0, 0, 0],
                    ["Servers, storage, network", 1, 0, 0, 0, 0],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 px-3 text-left font-bold text-charcoal">{row[0]}</td>
                      {row.slice(1).map((you, j) => (
                        <td key={j} className="py-1.5 px-2">
                          <span className={`inline-block w-full rounded px-2 py-0.5 ${you ? "bg-amber-100 text-amber-900" : "bg-sky-100 text-sky-900"}`}>
                            {you ? "You" : "Provider"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-charcoal/70 font-body">
              <b>Why BaaS fit this project:</b> with Firebase I wrote only the ESP32 firmware, the HTML/JS dashboard and the security
              rules. User accounts, password hashing, the database server, WebSocket sync and HTTPS hosting were all provided.
            </p>
          </div>

          <div>
            <Sub id="t4-platform">What a Cloud Platform Is &amp; What a Database Is</Sub>
            <div className="grid md:grid-cols-2 gap-4">
              <Panel title="Cloud platform" tag="e.g. Firebase / Google Cloud">
                <p>
                  A <b>cloud platform</b> is a provider&apos;s collection of cloud services that work together under one account,
                  console and billing — compute, storage, databases, authentication, hosting, analytics. <b>Firebase</b> is Google&apos;s
                  app-development platform: in one project (<C>smarthome-iot-e9fe6</C>) I used three of its services — Authentication,
                  Realtime Database and Hosting — and managed them from one web console and the <C>firebase</C> CLI.
                </p>
              </Panel>
              <Panel title="Database" tag="organised, persistent data">
                <p>
                  A <b>database</b> is an organised store of data that programs can read, write, search and update reliably, and that
                  keeps the data after the program stops. <b>Relational (SQL)</b> databases keep data in tables with fixed columns
                  (MySQL, PostgreSQL). <b>NoSQL</b> databases use flexible formats such as documents or JSON trees (Firebase RTDB,
                  MongoDB). Sensor readings and device state change shape often and are read as one small object, so a NoSQL JSON
                  tree is a natural fit here.
                </p>
              </Panel>
            </div>
          </div>

          <div>
            <Sub id="t4-rtdb">Firebase Realtime Database Explained &amp; What a Cloud-Based Dashboard Is</Sub>
            <div className="grid md:grid-cols-2 gap-4">
              <Panel title="Firebase Realtime Database (RTDB)" tag="NoSQL · JSON tree · live sync">
                <p>
                  The RTDB stores everything as <b>one big JSON tree</b>; each piece of data has a path such as
                  <C>/current/temperature</C>. Clients do not poll — they attach a <b>listener</b> (<C>onValue()</C> in JS) and the
                  database pushes every change to all connected clients over a persistent WebSocket, usually within a few hundred
                  milliseconds. Writes use <C>set()</C> / <C>update()</C>; the ESP32 uses the same paths through the REST/stream API of the
                  Firebase ESP Client library. Access is controlled per path by <b>Security Rules</b>. My instance is
                  <C>smarthome-iot-e9fe6-default-rtdb</C> in <b>asia-southeast1 (Singapore)</b> on the free Spark plan.
                </p>
              </Panel>
              <Panel title="Cloud-based dashboard" tag="smarthome-iot-e9fe6.web.app">
                <p>
                  A <b>cloud-based dashboard</b> is a web page, hosted on the internet, that shows live data from devices and lets a user
                  send commands back — from any browser, anywhere, without installing anything. Mine is static HTML/CSS/JS on
                  <b> Firebase Hosting</b>: it signs the user in, listens to <C>/current</C> to show temperature, humidity and light,
                  and writes <C>mode</C>, <C>relay</C> and <C>threshold</C> when the user changes a control. The ESP32 reacts to those
                  writes, so the dashboard is both a monitor and a remote control.
                </p>
              </Panel>
            </div>
          </div>

          <div>
            <Sub id="t4-auth">Authentication, the Purpose of a Login System &amp; Authentication vs Authorization</Sub>
            <P>
              <b>Authentication</b> answers “<i>who are you?</i>” — the user proves their identity, here with an email and password
              checked by Firebase Authentication. The <b>purpose of the login system</b> is to make sure only known people (and my
              ESP32, which has its own device account <C>esp32@firebase.local</C>) can reach a dashboard that switches a 230V lamp,
              and to give every request an identity (a signed ID token with a user ID) that the database can check.
            </P>
            <ComparisonTable
              headers={["", "Authentication (AuthN)", "Authorization (AuthZ)"]}
              rows={[
                ["Question answered", "Who are you?", "What are you allowed to do?"],
                ["When it happens", "First — at login", "After login — on every read / write"],
                ["How (in this project)", "Firebase Auth: signInWithEmailAndPassword() on the login page; device account for the ESP32", "Realtime Database Security Rules evaluated per path (e.g. \"auth != null\")"],
                ["Result", "An ID token containing the user's UID", "Request allowed or \"Permission denied\""],
                ["Analogy", "Showing your ID card at the lab entrance", "Which rooms your ID card can open"],
              ]}
            />
            <p className="text-xs text-charcoal/70 font-body mt-3 mb-2">
              Authorization rules for this project — only signed-in users (the admin account or the ESP32 device account) may read
              or write the live node and the logs:
            </p>
            <SourceFiles files={["Task_04_Firebase_Dashboard/database.rules.json"]} />
          </div>

          <div>
            <Sub id="t4-setup">Firebase Project Setup &amp; Authentication Configuration</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Steps
                items={[
                  <><b>Create project:</b> Firebase console → Add project → <i>SmartHome-IoT</i> (ID <C>smarthome-iot-e9fe6</C>), free Spark plan.</>,
                  <><b>Register a web app</b> (&lt;/&gt; icon) → copy the <C>firebaseConfig</C> object into <C>js/firebase.js</C>.</>,
                  <><b>Authentication → Sign-in method:</b> enable <b>Email/Password</b>.</>,
                  <><b>Authentication → Users → Add user:</b> my admin login for the dashboard, plus a device account <C>esp32@firebase.local</C> used by the firmware.</>,
                  <><b>Realtime Database → Create database:</b> location <b>Singapore (asia-southeast1)</b>, started in test mode, then created the <C>/current</C> node with the keys shown below.</>,
                  <><b>Firebase CLI:</b> <C>npm i -g firebase-tools</C> → <C>firebase login</C> → <C>firebase init</C> (Hosting + Database) → <C>firebase deploy</C> → live at <C>smarthome-iot-e9fe6.web.app</C>.</>,
                  <><b>ESP32:</b> installed <i>Firebase ESP Client</i> (Mobizt) + <i>DHT sensor library</i>, set <C>API_KEY</C>, <C>DATABASE_URL</C> and the device account in the sketch, flashed.</>,
                ]}
              />
              <ComparisonTable
                headers={["Item", "Configuration"]}
                rows={[
                  ["Project", "SmartHome-IoT · smarthome-iot-e9fe6 · Spark (free)"],
                  ["Auth provider", "Email / Password"],
                  ["Auth users", "Admin (dashboard login) · esp32@firebase.local (device)"],
                  ["Login code", "js/auth.js → signInWithEmailAndPassword() → dashboard.html"],
                  ["Database", "Realtime Database, asia-southeast1 (Singapore)"],
                  ["Database URL", "smarthome-iot-e9fe6-default-rtdb.asia-southeast1.firebasedatabase.app"],
                  ["Hosting", "smarthome-iot-e9fe6.web.app (index.html = login)"],
                  ["SDK", "Firebase JS SDK 10.13.2 (ES modules from gstatic CDN)"],
                ]}
              />
            </div>
          </div>

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
                { pin: "GPIO 14", component: "DHT11 Digital Data Line", type: "Single-Wire Serial (3.3V)", notes: "Digital time-pulsed data output; requires 10k pull-up resistor to 3.3V." },
                { pin: "GPIO 34", component: "LDR Photoresistor Divider", type: "Analog Input (12-bit ADC1)", notes: "Connected to junction between LDR and 10k resistor. ADC range: 0–4095." },
                { pin: "GPIO 4", component: "Relay Module IN Pin", type: "Digital Output (Active-LOW)", notes: "Energizes relay channel driving the physical test lamp." },
                { pin: "3.3V Rail", component: "Sensor VCC Bus", type: "Regulated 3.3V Power", notes: "Supplies reference voltage to DHT11 and LDR voltage divider." },
                { pin: "GND Rail", component: "Common Ground Bus", type: "0V Reference", notes: "Ties ESP32, sensors, and relay logic ground together." },
              ]}
            />
            <div className="mt-4">
              <MediaImage
                src="/media/task4_sensor_circuit.jpg"
                alt="ESP32 DevKit V1 with DHT11, LDR Voltage Divider, and Relay Circuit Schematic"
                caption="Circuit Schematic & Breadboard Layout: ESP32 DevKit wired to DHT11 digital temp/humidity sensor on GPIO 14, LDR 10k divider on analog ADC pin GPIO 34, and 5V relay module on GPIO 4."
              />
            </div>
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
            <Sub id="t4-schema">Realtime Database Structure (Node Hierarchy)</Sub>
            <div className="p-5 rounded-2xl border border-charcoal/15 bg-zinc-50 font-mono text-xs text-charcoal/85 space-y-2">
              <div className="text-[10px] text-charcoal/60 uppercase tracking-widest font-bold mb-2">smarthome-iot-e9fe6-default-rtdb / current</div>
              <div className="grid sm:grid-cols-2 gap-2">
                <div><span className="text-indigo-600 font-bold">&quot;temperature&quot;</span>: 23 <span className="text-graymid">(number, °C — written by ESP32)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;humidity&quot;</span>: 55 <span className="text-graymid">(number, % — written by ESP32)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;ldr&quot;</span>: 1851 <span className="text-graymid">(int 0–4095 — written by ESP32)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;bulbState&quot;</span>: false <span className="text-graymid">(boolean, actual relay output — ESP32)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;relay&quot;</span>: &quot;OFF&quot; <span className="text-graymid">(&quot;ON&quot;/&quot;OFF&quot; — dashboard toggle)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;mode&quot;</span>: &quot;AUTO&quot; <span className="text-graymid">(&quot;AUTO&quot;/&quot;MANUAL&quot; — dashboard select)</span></div>
                <div><span className="text-indigo-600 font-bold">&quot;threshold&quot;</span>: 1500 <span className="text-graymid">(int 0–4095 — dashboard slider)</span></div>
              </div>
              <p className="text-[11px] font-body text-charcoal/70 pt-2">
                A single flat node keeps every read to one small object: the dashboard attaches one listener to <C>/current</C> and
                the ESP32 updates only the keys it owns with <C>updateNode()</C>, so it never overwrites the user&apos;s mode or threshold.
              </p>
            </div>
          </div>

          <div>
            <Sub id="t4-dataflow">Database / Data-Flow Architecture</Sub>
            <DataFlowLanes
              lanes={[
                { title: "ESP32 (device)", sub: "Firebase ESP Client · signed in as esp32@firebase.local", items: ["reads DHT11 + LDR every 5 s", "reads mode / relay / threshold every 1 s", "drives relay on GPIO 4"] },
                { title: "Firebase RTDB (cloud)", sub: "asia-southeast1 · JSON tree", items: ["/current/temperature, humidity, ldr", "/current/bulbState", "/current/mode, relay, threshold", "Security Rules check every request"] },
                { title: "Web dashboard (client)", sub: "Firebase Hosting · JS SDK v10", items: ["index.html → Firebase Auth login", "dashboard.html → onValue(/current)", "set() on toggle / select / slider"] },
              ]}
              flows={[
                { from: "ESP32", to: "RTDB", label: "updateNode(/current, {temperature, humidity, ldr, bulbState}) every 5 s" },
                { from: "RTDB", to: "Dashboard", label: "onValue(/current) pushes the change over a WebSocket → cards update" },
                { from: "Dashboard", to: "RTDB", label: "set(current/relay | mode | threshold) when the user changes a control" },
                { from: "RTDB", to: "ESP32", label: "getString / getInt on those keys → relay switched (MANUAL) or threshold applied (AUTO)" },
                { from: "ESP32", to: "RTDB", label: "setBool(current/bulbState) (+ current/relay in AUTO) so the dashboard shows the real state" },
              ]}
            />
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
            <Sub id="t4-dashcode">Complete Dashboard Source Code</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              The deployed dashboard is plain HTML + CSS + JavaScript ES modules (no framework): <C>index.html</C> is the login page,
              <C>js/auth.js</C> signs in with Firebase Auth, <C>dashboard.html</C> + <C>js/dashboard.js</C> listen to <C>/current</C> and write
              the controls, and <C>js/firebase.js</C> initialises the SDK (web API key shown as a placeholder).
            </p>
            <SourceFiles
              files={[
                "Task_04_Firebase_Dashboard/index.html",
                "Task_04_Firebase_Dashboard/js/auth.js",
                "Task_04_Firebase_Dashboard/dashboard.html",
                "Task_04_Firebase_Dashboard/js/dashboard.js",
                "Task_04_Firebase_Dashboard/js/firebase.js",
                "Task_04_Firebase_Dashboard/css/style.css",
              ]}
            />
          </div>

          <div>
            <Sub id="t4-firmware">ESP32 Firmware (Telemetry &amp; Control Node)</Sub>
            <SourceFiles files={["Task_04_Firebase_Sensors_Telemetry/Task_04_Firebase_Sensors_Telemetry.ino"]} />
          </div>

          <div>
            <Sub id="t4-problems">Problems Encountered &amp; Their Solutions</Sub>
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
                {
                  issue: "Dashboard Cards Showing “--” Instead of Values",
                  cause: "The key names written by the firmware and read by the dashboard did not match in letter case (e.g. Temperature vs temperature), and RTDB keys are case-sensitive.",
                  solution: "Standardised on lowercase keys and made dashboard.js accept both spellings while testing (d.temperature ?? d.Temperature).",
                },
              ]}
            />
          </div>

          <div>
            <Sub>Step-by-Step Recreation Manual</Sub>
            <RecreationManualCard
              taskNumber="04"
              repoFolder="Task-04-Firebase-Sensors-Telemetry"
              title="Firebase Sensors Telemetry & Automation Manual"
              steps={[
                {
                  step: "Sensor Bus Prototyping",
                  detail: "Wire DHT11 to GPIO 14 (3.3V power). Wire 5mm LDR with 10kΩ pull-down resistor as voltage divider to ADC pin GPIO 34.",
                },
                {
                  step: "Google Firebase Console Setup",
                  detail: "Create Firebase Realtime Database project. Set rules (.read: true, .write: true). Copy Web API Key and Database URL.",
                },
                {
                  step: "Library Installation & Flashing",
                  detail: "Install 'Firebase ESP32 Client' by Mobizt and 'DHT sensor library' in Arduino IDE. Flash Task_04_Firebase_Sensors_Telemetry.ino.",
                },
                {
                  step: "Dual-Mode Testing",
                  detail: "Test AUTO-SENSE mode (relay fires automatically when ambient light < threshold) and MANUAL mode (toggled via web dashboard).",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t4-evidence">Screenshots: Login Page · Firebase Database · Working Dashboard · Workflow Video</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/task4_login_page.png"
                alt="Smart Home System Login page with Admin Email, Password and Authenticate button"
                caption="Login page (index.html) on smarthome-iot-e9fe6.web.app — Firebase Email/Password authentication gate before the dashboard"
              />
              <MediaImage
                src="/media/media__1790510820927.png"
                alt="Working dashboard at smarthome-iot-e9fe6.web.app/dashboard.html"
                caption="Working dashboard (dashboard.html): live temperature, humidity, ambient light, system mode, main relay and LDR threshold"
              />
              <MediaVideo
                src="/media/dash_vid.mp4"
                caption="Webpage workflow: operating the dashboard controls on the laptop and the bulb responding through Firebase and the ESP32"
                wide
              />
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
                src="/media/task4_sensor_circuit.jpg"
                alt="ESP32 Breadboard & Circuit Schematic for DHT11, LDR Divider, and Relay"
                caption="Circuit Schematics & Hardware Interface: Complete wiring manual layout connecting ESP32 to DHT11, 10k LDR voltage divider, and 5V relay module"
              />
            </div>
          </div>

          <div>
            <Sub id="t4-repo">Files in the Repository</Sub>
            <RepoFiles
              folders={["Task_04_Firebase_Sensors_Telemetry", "Task_04_Firebase_Dashboard"]}
              iotRepoFolder="Task-04-Firebase-Sensors-Telemetry"
              files={[
                { path: "Task_04_Firebase_Sensors_Telemetry/Task_04_Firebase_Sensors_Telemetry.ino", note: "ESP32 telemetry + control firmware" },
                { path: "Task_04_Firebase_Dashboard/index.html", note: "Login page" },
                { path: "Task_04_Firebase_Dashboard/dashboard.html", note: "Dashboard page" },
                { path: "Task_04_Firebase_Dashboard/js/auth.js", note: "Firebase Auth sign-in" },
                { path: "Task_04_Firebase_Dashboard/js/dashboard.js", note: "RTDB listener + controls" },
                { path: "Task_04_Firebase_Dashboard/js/firebase.js", note: "SDK initialisation" },
                { path: "Task_04_Firebase_Dashboard/css/style.css", note: "Dashboard styling" },
                { path: "Task_04_Firebase_Dashboard/database.rules.json", note: "Authorization rules" },
              ]}
            />
          </div>

          <div id="t4-reflection" className="scroll-mt-44">
            <Sub>Brief Reflection on the Assignment</Sub>
            <Reflection text="Transitioning to Google Firebase was an eye-opener in modern full-stack IoT. Instead of point-to-point messaging, the database became the single source of truth for both physical sensors and browser user interfaces. The real-time synchronization handled network drops gracefully and proved how essential authorization layers are for connected hardware." />
          </div>
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
          <TaskChecklist
            items={[
              { label: "Objective of the complete IoT system", href: "#t5-objective" },
              { label: "Final system architecture documented", href: "#t5-architecture" },
              { label: "DHT11 Temperature and Humidity Monitoring demonstrated", href: "#t5-evidence" },
              { label: "LDR-based Light Level Monitoring demonstrated", href: "#t5-evidence" },
              { label: "Manual Bulb Control implemented", href: "#t5-manual" },
              { label: "Automatic Bulb Control using LDR implemented", href: "#t5-modes" },
              { label: "Manual / Automatic Mode implemented and documented", href: "#t5-modes" },
              { label: "Logic used for automatic lighting explained", href: "#t5-modes" },
              { label: "LDR threshold/calibration method documented", href: "#t5-calibration" },
              { label: "Historical data logging in Firebase implemented", href: "#t5-logs" },
              { label: "Database structure used for logs documented", href: "#t5-logs" },
              { label: "Timestamped sensor readings recorded", href: "#t5-logs" },
              { label: "Temperature and humidity values recorded", href: "#t5-csv" },
              { label: "LDR/light-level values recorded", href: "#t5-csv" },
              { label: "Bulb status and operating mode recorded", href: "#t5-csv" },
              { label: "Historical data displayed on the dashboard", href: "#t5-history" },
              { label: "Graph/chart for recorded sensor data included", href: "#t5-history" },
              { label: "CSV data download implemented", href: "#t5-export" },
              { label: "Downloaded file demonstrated to contain the recorded data", href: "#t5-csv" },
              { label: "Screenshots of the dashboard and data visualization", href: "#t5-evidence" },
              { label: "Photographs of the complete prototype", href: "#t5-evidence" },
              { label: "Video demonstrating the complete system", href: "#t5-evidence" },
              { label: "Problems encountered and solutions implemented", href: "#t5-problems" },
              { label: "Limitations of the current prototype explained", href: "#t5-limits" },
              { label: "Possible future improvements suggested", href: "#t5-future" },
              { label: "Final learning reflection included", href: "#t5-reflection" },
              { label: "All source code and project files available in the repository", href: "#t5-repo" },
            ]}
          />

          <div>
            <Sub id="t5-objective">Objective of the Complete IoT System</Sub>
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
            <Sub id="t5-architecture">Final System Architecture</Sub>
            <DataFlowLanes
              lanes={[
                { title: "Sensing & actuation (ESP32)", sub: "DHT11 · LDR · relay + 230V bulb", items: ["DHT11 → temperature, humidity (GPIO 14)", "LDR divider → light level 0–4095 (GPIO 34)", "Relay → bulb (GPIO 4, active-LOW)", "NTP clock → UTC timestamps"] },
                { title: "Cloud (Firebase)", sub: "Auth + Realtime Database + Hosting", items: ["/current — live values & controls", "/telemetry/logs/{epoch} — history", "Email/Password accounts (user + device)", "Security Rules (auth != null)"] },
                { title: "Users (browser)", sub: "Login → dashboard → history → CSV", items: ["Live cards + mode / relay / threshold", "History table + trend chart", "Download CSV (in browser)", "Python exporter for offline analysis"] },
              ]}
              flows={[
                { from: "ESP32", to: "/current", label: "live temperature, humidity, ldr, bulbState every 5 s" },
                { from: "ESP32", to: "/telemetry/logs", label: "one timestamped record every 5 s (temp, hum, ldr, relay, mode)" },
                { from: "Dashboard", to: "/current", label: "mode (AUTO/MANUAL), relay (ON/OFF), threshold" },
                { from: "/current", to: "ESP32", label: "commands read every 1 s → relay decision" },
                { from: "/telemetry/logs", to: "Dashboard", label: "history view, chart and CSV export" },
              ]}
            />
          </div>

          <div>
            <Sub id="t5-manual">Manual Bulb Control Implementation</Sub>
            <div className="grid md:grid-cols-2 gap-4 items-start">
              <P>
                In <b>MANUAL</b> mode the user switches the bulb from the dashboard&apos;s <b>Main Relay</b> toggle. The toggle writes
                <C>&quot;ON&quot;</C> or <C>&quot;OFF&quot;</C> to <C>/current/relay</C>; the ESP32 reads that key every second and sets GPIO 4
                accordingly, then reports the real output in <C>/current/bulbState</C>. LDR readings are still logged but ignored for
                switching, so the human decision always wins.
              </P>
              <CodeBlock
                filename="manual control — dashboard.js + firmware"
                code={`// dashboard.js — user flips the toggle
bulbToggle.onchange = () => {
  const newState = bulbToggle.checked ? "ON" : "OFF";
  set(ref(db, "current/relay"), newState);
};

// Task_05 firmware — every 1 s
if (Firebase.RTDB.getString(&fbdo, "/current/relay"))
  manualOn = (fbdo.stringData() == "ON");
...
} else {            // mode == "MANUAL"
  setRelay(manualOn);
}`}
              />
            </div>
          </div>

          <div>
            <Sub id="t5-modes">Manual / Automatic Mode &amp; Automatic Lighting Logic</Sub>
            <p className="text-xs text-charcoal/75 leading-relaxed font-body mb-3">
              The <b>System Mode</b> dropdown writes <C>&quot;AUTO&quot;</C> or <C>&quot;MANUAL&quot;</C> to <C>/current/mode</C>. The firmware
              reads it every second and picks one of two branches. In AUTO the ESP32 also writes <C>/current/relay</C>, so the
              dashboard switch shows what the automation decided and switching back to MANUAL starts from the same state.
            </p>
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
            <div className="grid md:grid-cols-2 gap-4 mt-4 items-start">
              <CodeBlock
                filename="automatic lighting logic (with hysteresis)"
                code={`// LDR on the 3.3V side, 10k to GND → darker = lower ADC
void applyControlLogic(int ldr) {
  if (mode == "AUTO") {
    if (!relayOn && ldr < threshold - HYSTERESIS)      setRelay(true);   // dark   → ON
    else if (relayOn && ldr > threshold + HYSTERESIS)  setRelay(false);  // bright → OFF
  } else {
    setRelay(manualOn);                                                  // MANUAL
  }
}`}
              />
              <ComparisonTable
                headers={["Mode", "Light (threshold 1500)", "Bulb"]}
                rows={[
                  ["AUTO", "ldr < 1450 (dark)", "Turns ON"],
                  ["AUTO", "1450 ≤ ldr ≤ 1550 (dead-band)", "Keeps its last state — no flicker at dusk"],
                  ["AUTO", "ldr > 1550 (bright)", "Turns OFF"],
                  ["MANUAL", "any value", "Follows the dashboard toggle"],
                ]}
              />
            </div>
          </div>

          <div>
            <Sub id="t5-calibration">LDR Threshold / Calibration Method</Sub>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Steps
                items={[
                  <><b>Measure the extremes:</b> with the dashboard open, read the live <C>ldr</C> value (also printed on Serial) with the sensor covered (dark), under normal lab lighting, and under a phone torch.</>,
                  <><b>Pick the switching point:</b> the bulb should come on when the room is noticeably darker than normal lab light, so the threshold is set between the dark and ambient readings — about <b>1500</b> on this divider.</>,
                  <><b>Add a dead-band:</b> ±50 counts around the threshold (1450 / 1550) so noise and slow dusk changes do not make the relay chatter.</>,
                  <><b>Set it live:</b> move the <b>LDR Threshold</b> slider on the dashboard — it writes <C>/current/threshold</C> and the ESP32 uses the new value within a second, no re-flashing.</>,
                  <><b>Verify:</b> in AUTO mode, cover and uncover the LDR and confirm the bulb switches once each way; the logged records show the light value and bulb state at each moment.</>,
                ]}
              />
              <ComparisonTable
                headers={["Condition", "Typical ADC", "Decision"]}
                rows={[
                  ["Covered / night", "< 800", "Dark → bulb ON"],
                  ["Normal lab light", "1200 – 2200", "Around the threshold — tuned here"],
                  ["Torch / direct sun", "> 3500", "Bright → bulb OFF"],
                  ["Chosen threshold", "1500 ± 50", "Stored in /current/threshold"],
                ]}
              />
            </div>
          </div>

          <div>
            <Sub id="t5-logs">Historical Data Logging in Firebase — Database Structure for Logs</Sub>
            <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="space-y-3">
                <P>
                  Every 5 seconds the ESP32 writes one record under <C>/telemetry/logs</C>. The key is the Unix epoch time from
                  NTP (<C>pool.ntp.org</C>), so records are unique, sort in time order automatically and can be queried with
                  <C>orderByKey()</C> / <C>limitToLast()</C>. Each record stores the timestamp (both epoch and ISO-8601 UTC), the
                  DHT11 temperature and humidity, the LDR level, the bulb status and the operating mode at that instant.
                </P>
                <P>
                  Live values stay in <C>/current</C> (overwritten each time); history goes to <C>/telemetry/logs</C> (appended),
                  which keeps the dashboard&apos;s live listener small while the history grows.
                </P>
              </div>
              <CodeBlock
                filename="RTDB — /telemetry/logs"
                code={`telemetry
└── logs
    ├── 1712932210
    │   ├── timestamp:   1712932210
    │   ├── time:        "2024-04-12T14:30:10Z"
    │   ├── temperature: 28.5
    │   ├── humidity:    61.8
    │   ├── ldr:         1420
    │   ├── relay:       "ON"
    │   └── mode:        "AUTO"
    ├── 1712932215
    │   └── { ... next record, 5 s later ... }
    └── ...`}
              />
            </div>
          </div>

          <div>
            <Sub id="t5-firmware">Complete System Firmware (Logging + Automation)</Sub>
            <SourceFiles files={["Task_05_Firebase_Logging_CSV/Task_05_Firebase_Logging_CSV.ino"]} />
          </div>

          <div>
            <Sub id="t5-history">Historical Data on the Dashboard &amp; Sensor Chart</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              The history page listens to the last 500 records, shows the latest 20 in a table and draws a trend chart. The chart
              below is rendered from the recorded dataset (green bands = bulb ON; dashed line = LDR threshold).
            </p>
            <HistoryChart />
            <SourceFiles
              files={[
                "Task_05_Firebase_Logging_CSV/dashboard/history.html",
                "Task_05_Firebase_Logging_CSV/dashboard/js/history.js",
              ]}
            />
          </div>

          <div>
            <Sub id="t5-export">CSV Data Download Implementation</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              Two ways to export the logs: the dashboard&apos;s <b>Download CSV</b> button builds the file in the browser from the
              records already loaded (core function below, used in <C>history.js</C>), and <C>export_firebase_csv.py</C> pulls every
              record through the REST API and prints summary statistics.
            </p>
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
            <SourceFiles files={["Task_05_Firebase_Logging_CSV/export_firebase_csv.py"]} />
          </div>

          <div>
            <Sub id="t5-csv">Downloaded File — Demonstrated to Contain the Recorded Data</Sub>
            <p className="text-xs text-charcoal/70 font-body mb-2">
              The exported file opened as a table: every row is one logged record with its timestamp, temperature, humidity,
              light level, bulb status and operating mode. Press <b>Download this CSV</b> to get the same file.
            </p>
            <CsvPreviewTable />
            <CodeBlock
              filename="iot_telemetry_2024-04-12.csv — opened in a text editor"
              code={IOT_SOURCES[SAMPLE_CSV_PATH] ?? ""}
            />
          </div>

          <div>
            <Sub>Step-by-Step Recreation Manual</Sub>
            <RecreationManualCard
              taskNumber="05"
              repoFolder="Task-05-Firebase-Logging-CSV-Analytics"
              title="Time-Series Logging & CSV Analytics Manual"
              steps={[
                {
                  step: "NTP Time Synchronization",
                  detail: "ESP32 contacts atomic time servers (pool.ntp.org) over UDP port 123 to synchronize internal hardware clock with real-world UTC time.",
                },
                {
                  step: "Periodic Database Telemetry Push",
                  detail: "Flash Task_05_Firebase_Logging_CSV.ino. Telemetry records are committed every 5 seconds under /telemetry/logs/{timestamp}.",
                },
                {
                  step: "Automated CSV Extraction Script",
                  detail: "Execute python export_firebase_csv.py to fetch records from Firebase REST API and write structured RFC-4180 CSV.",
                  command: "python export_firebase_csv.py <DATABASE_URL>/telemetry/logs.json output.csv",
                },
                {
                  step: "Statistical Analytics Generation",
                  detail: "The script computes mean, standard deviation, and min/max ranges for temperature, humidity, and ambient illuminance.",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t5-evidence">Temperature, Humidity &amp; Light Monitoring Demonstrated — Screenshots, Photos &amp; Video</Sub>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaImage
                src="/media/media__1790510820927.png"
                alt="System UI dashboard showing 24.5°C, 45% humidity, 1980 ambient light, AUTO-SENSE mode"
                caption="Dashboard: DHT11 temperature & humidity and LDR ambient-light cards with AUTO-SENSE mode, relay and threshold controls"
              />
              <MediaImage
                src="/media/f1.jpeg"
                alt="Lab bench with ESP32 on breadboard, DHT11 and LDR modules, laptop showing live telemetry feed"
                caption="Complete prototype on the lab bench: ESP32 + DHT11 + LDR module, laptop showing live readings (36.6 °C, 27 %, 2773) streaming from Firebase"
              />
              <MediaImage
                src="/media/f2.jpeg"
                alt="Lab desk with energized mains lamp driven by relay"
                caption="Physical verification: 230V bulb illuminated on the lab bench via the optocoupler relay"
              />
              <MediaImage
                src="/media/firebase-rtdb-console.png"
                alt="Firebase Realtime Database console showing the current node"
                caption="Firebase RTDB console: the live /current node the logger and dashboard share"
              />
              <MediaVideo
                src="/media/dash_vid.mp4"
                caption="Complete system demonstration: dashboard mode / relay controls, threshold trigger and the bulb responding"
                wide
              />
              <MediaVideo
                src="/media/glue.mp4"
                caption="Hardware assembly on the bench: securing the wiring of the prototype with a hot-glue gun"
                wide
              />
            </div>
          </div>

          <div>
            <Sub id="t5-problems">Problems Encountered &amp; Solutions Implemented</Sub>
            <TroubleshootCard
              items={[
                {
                  issue: "Log Records Stamped 1970 Right After Boot",
                  cause: "The ESP32 has no battery-backed clock; until NTP replies, time() returns seconds since boot, which would create records keyed near epoch 0.",
                  solution: "setup() waits until the clock is past a sane date (epoch > 1 700 000 000) after configTime(), and every record stores both epoch and ISO-8601 UTC time.",
                },
                {
                  issue: "Relay Chatter Around the Threshold at Dusk",
                  cause: "With a single cut-off value, sensor noise of a few counts made the relay toggle repeatedly when the light level sat right at the threshold.",
                  solution: "Added a ±50-count hysteresis band: ON below threshold − 50, OFF above threshold + 50, otherwise keep the current state.",
                },
                {
                  issue: "Dashboard Toggle Disagreeing With the Real Bulb in AUTO Mode",
                  cause: "In AUTO the ESP32 switched the relay by itself, but /current/relay still held the user's last manual value.",
                  solution: "The firmware writes /current/relay and /current/bulbState whenever AUTO changes the relay, so the toggle always shows the true state.",
                },
                {
                  issue: "Overwriting the User's Settings With Telemetry",
                  cause: "Writing the whole /current object with set() replaced mode and threshold with the firmware's copies.",
                  solution: "Switched to updateNode(), which only changes the telemetry keys the ESP32 owns.",
                },
              ]}
            />
          </div>

          <div>
            <Sub id="t5-limits">Limitations of the Current Prototype</Sub>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "5-Second Sampling Window", note: "Not hard real-time; transient environmental spikes between intervals remain unsampled." },
                { title: "Manual Threshold Calibrations", note: "The daylight threshold is set manually rather than dynamically adapting to seasonal shifts." },
                { title: "Firebase Free-Tier Quotas", note: "High-frequency logging demands write-batching to stay within Firebase Spark limits." },
                { title: "DHT11 Resolution", note: "DHT11 has 1°C temperature resolution; critical industrial setups require DHT22 or BME280." },
                { title: "Cloud Dependency", note: "If Wi-Fi or Firebase is unreachable, the dashboard cannot control the bulb and no records are logged for that period." },
                { title: "Test-Mode Security", note: "During development the database rules were left open and dashboard.html does not yet check login state; production needs the auth-only rules and an auth guard." },
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

          <div>
            <Sub id="t5-future">Possible Future Improvements</Sub>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Lock down security", note: "Deploy the auth-only database rules and add an onAuthStateChanged() guard that sends signed-out visitors back to the login page." },
                { title: "Offline buffering", note: "Store records in flash (LittleFS) when Wi-Fi drops and upload them when the connection returns, so the history has no gaps." },
                { title: "Better sensors", note: "Replace DHT11 with DHT22 / BME280 for 0.1 °C resolution and add a lux sensor (BH1750) for calibrated light values." },
                { title: "Adaptive threshold & scheduling", note: "Learn the threshold from logged data or combine it with sunset time, and add time-based schedules." },
                { title: "Alerts & analytics", note: "Firebase Cloud Functions to send push/email alerts on high temperature and to roll old logs into daily averages." },
                { title: "OTA updates & local fallback", note: "Over-the-air firmware updates and a physical switch / local web page that still works without the internet." },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-charcoal/15 bg-white">
                  <div className="font-mono text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
                    <span className="text-emerald-600">➜</span> {item.title}
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-body">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Sub id="t5-repo">All Source Code &amp; Project Files in the Repository</Sub>
            <RepoFiles
              folders={["Task_05_Firebase_Logging_CSV"]}
              iotRepoFolder="Task-05-Firebase-Logging-CSV-Analytics"
              files={[
                { path: "Task_05_Firebase_Logging_CSV/Task_05_Firebase_Logging_CSV.ino", note: "Complete system firmware (live + logging + modes)" },
                { path: "Task_05_Firebase_Logging_CSV/dashboard/history.html", note: "History page" },
                { path: "Task_05_Firebase_Logging_CSV/dashboard/js/history.js", note: "History table, chart and CSV download" },
                { path: "Task_05_Firebase_Logging_CSV/export_firebase_csv.py", note: "REST → CSV exporter with statistics" },
                { path: "Task_05_Firebase_Logging_CSV/sample_sensor_telemetry.csv", note: "Exported dataset" },
                { path: "Task_04_Firebase_Dashboard/index.html", note: "Login + live dashboard reused from Task 4" },
              ]}
            />
          </div>

          <div id="t5-reflection" className="scroll-mt-44">
            <Sub>Final Learning Reflection</Sub>
            <Reflection text="Task 5 synthesized the entire semester's curriculum into a coherent engineering artifact. Persistent database logging and CSV export bridged the chasm between an ephemeral breadboard hobby project and an actionable data science pipeline. Coordinating real-time firmware loops, asynchronous database listeners, and responsive browser UI taught me how real embedded systems are delivered." />
          </div>
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
