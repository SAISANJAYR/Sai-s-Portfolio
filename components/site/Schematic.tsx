import type { Schematic as Kind } from "@/data/projects";

/**
 * Engraved-plate style system diagrams. Each one is drawn from the project's
 * documented architecture — they are labelled as schematics, never presented
 * as screenshots.
 */

type NodeProps = { x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean };

function Node({ x, y, w, h, label, sub, accent }: NodeProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="s-node-fill" />
      <rect x={x} y={y} width={w} height={h} className={accent ? "s-accent" : "s-node"} />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor="middle" fontSize="13" letterSpacing="1.2">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize="9.5" opacity="0.6" letterSpacing="0.8">
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ d, flow }: { d: string; flow?: boolean }) {
  return <path d={d} className={flow ? "s-flow" : "s-line"} markerEnd={flow ? undefined : "url(#arr)"} />;
}

function Defs() {
  return (
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,1 L9,5 L0,9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </marker>
    </defs>
  );
}

function Agents() {
  const y = 200;
  const xs = [175, 300, 425, 550];
  const names = [
    ["SAFETY", "agent 1"],
    ["DEFECT", "agent 2"],
    ["ROUTER", "agent 3"],
    ["COMMENT", "agent 4"],
  ];
  return (
    <>
      <text x="60" y={y + 36} fontSize="10" opacity="0.6" letterSpacing="1.4">PULL</text>
      <text x="60" y={y + 50} fontSize="10" opacity="0.6" letterSpacing="1.4">REQUEST</text>
      <Arrow d={`M120 ${y + 40} H168`} />
      {xs.map((x, i) => (
        <g key={x}>
          <Node x={x} y={y} w={100} h={80} label={names[i][0]} sub={names[i][1]} accent={i === 2} />
          {i < 3 && <Arrow d={`M${x + 100} ${y + 40} H${x + 118}`} />}
        </g>
      ))}
      <Arrow d={`M650 ${y + 40} H700`} />
      <text x="706" y={y + 44} fontSize="10" opacity="0.6" letterSpacing="1.4">REVIEW</text>

      <Node x={300} y={380} w={225} h={62} label="RLVR VERIFIER" sub="programmatic · zero-LLM" accent />
      <Node x={575} y={380} w={150} h={62} label="GRPO POLICY" sub="Qwen2.5-1.5B" />
      <Arrow d="M600 280 V372" flow />
      <Arrow d="M525 411 H567" />
      <Arrow d="M412 380 V286" flow />
      <text x="420" y="345" fontSize="9.5" opacity="0.55" letterSpacing="1">reward</text>
    </>
  );
}

function Pipeline() {
  return (
    <>
      <Node x={60} y={130} w={120} h={60} label="DOCUMENT" sub="any language" />
      <Node x={60} y={250} w={120} h={60} label="EASYOCR" />
      <Arrow d="M120 190 V242" />
      <Node x={240} y={190} w={140} h={70} label="FASTAPI" sub="async · Beanie ODM" accent />
      <Arrow d="M180 280 H232" />
      <Node x={440} y={190} w={140} h={70} label="CELERY" sub="redis queue" />
      <Arrow d="M380 225 H432" flow />
      <Node x={620} y={100} w={130} h={56} label="SPACY NER" />
      <Node x={620} y={196} w={130} h={56} label="LANGCHAIN" sub="gemini" />
      <Node x={620} y={292} w={130} h={56} label="EMBEDDINGS" />
      <Arrow d="M580 210 L612 128" />
      <Arrow d="M580 225 H612" />
      <Arrow d="M580 240 L612 320" />
      <Node x={440} y={380} w={140} h={62} label="CHROMADB" sub="vector store" />
      <Node x={240} y={380} w={140} h={62} label="KNOWLEDGE GRAPH" sub="cosine · d3.js" accent />
      <Arrow d="M685 348 V411 H588" flow />
      <Arrow d="M440 411 H388" />
      <Arrow d="M310 380 V268" />
      <text x="320" y="330" fontSize="9.5" opacity="0.55" letterSpacing="1">Q&amp;A</text>
    </>
  );
}

function Mlp() {
  const layers = [4, 6, 6, 1];
  const xs = [150, 320, 490, 660];
  const pts = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: xs[li], y: 270 + (i - (n - 1) / 2) * 52 }))
  );
  return (
    <>
      {pts.slice(0, -1).map((layer, li) =>
        layer.map((a, ai) =>
          pts[li + 1].map((b, bi) => (
            <line key={`${li}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="s-line" opacity="0.22" />
          ))
        )
      )}
      {pts.map((layer, li) =>
        layer.map((p, i) => (
          <g key={`${li}-${i}`}>
            <circle cx={p.x} cy={p.y} r={li === 3 ? 13 : 10} className="s-node-fill" />
            <circle cx={p.x} cy={p.y} r={li === 3 ? 13 : 10} className={li === 3 ? "s-accent" : "s-node"} />
          </g>
        ))
      )}
      {["INPUT", "HIDDEN", "HIDDEN", "ŷ"].map((t, i) => (
        <text key={i} x={xs[i]} y={448} textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">{t}</text>
      ))}
      <path d="M150 92 H660" className="s-flow" />
      <text x="405" y="80" textAnchor="middle" fontSize="11" letterSpacing="1.6">forward · jit(xla)</text>
      <path d="M660 482 H150" className="s-flow" />
      <text x="405" y="505" textAnchor="middle" fontSize="11" letterSpacing="1.6">jax.grad · reverse-mode</text>
      <text x="62" y="275" fontSize="10" opacity="0.55" letterSpacing="1.2">vmap</text>
    </>
  );
}

function Env() {
  return (
    <>
      <Node x={110} y={210} w={170} h={90} label="AGENT" sub="policy" accent />
      <Node x={520} y={210} w={170} h={90} label="ENVIRONMENT" sub="managed · reproducible" />
      <Arrow d="M280 235 C360 180, 440 180, 512 235" />
      <text x="396" y="182" textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">ACTION</text>
      <Arrow d="M520 275 C440 330, 360 330, 288 275" flow />
      <text x="400" y="340" textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">OBSERVATION · REWARD</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={540 + i * 8} y={330 + i * 14} width={150} height={44} className="s-node" opacity={0.35 + i * 0.25} />
      ))}
      <text x="623" y="403" textAnchor="middle" fontSize="9.5" opacity="0.6" letterSpacing="1">ENV INSTANCES</text>
    </>
  );
}

function Vision() {
  return (
    <>
      <rect x="90" y="120" width="300" height="250" className="s-node" />
      <rect x="170" y="180" width="130" height="110" className="s-accent" />
      <path d="M235 160 V310 M150 235 H320" className="s-line" opacity="0.35" />
      <text x="174" y="174" fontSize="9.5" letterSpacing="1" opacity="0.8">target</text>
      <text x="90" y="392" fontSize="10" opacity="0.6" letterSpacing="1.4">CAMERA FRAME</text>
      <Node x={460} y={130} w={170} h={56} label="DETECT" sub="vision algorithm" />
      <Node x={460} y={222} w={170} h={56} label="OPTIMISE" sub="pipeline" accent />
      <Node x={460} y={314} w={170} h={56} label="ACT" sub="robot" />
      <Arrow d="M390 245 H452" flow />
      <Arrow d="M545 186 V214" />
      <Arrow d="M545 278 V306" />
    </>
  );
}

function Device() {
  return (
    <>
      <rect x="250" y="170" width="200" height="200" className="s-node-fill" />
      <rect x="250" y="170" width="200" height="200" className="s-accent" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <line x1="230" y1={190 + i * 23} x2="250" y2={190 + i * 23} className="s-line" />
          <line x1="450" y1={190 + i * 23} x2="470" y2={190 + i * 23} className="s-line" />
        </g>
      ))}
      <text x="350" y="265" textAnchor="middle" fontSize="13" letterSpacing="1.6">MCU</text>
      <text x="350" y="284" textAnchor="middle" fontSize="9.5" opacity="0.6" letterSpacing="1">firmware</text>
      <Node x={60} y={200} w={120} h={56} label="SENSOR" />
      <Node x={60} y={290} w={120} h={56} label="ACTUATOR" />
      <Arrow d="M180 228 H222" />
      <Arrow d="M228 318 H188" />
      <Node x={560} y={240} w={150} h={64} label="CLOUD" sub="telemetry" />
      <Arrow d="M470 272 H552" flow />
    </>
  );
}

function Satellite() {
  const steps = ["ASK", "IMAGERY", "UNDERSTAND", "PREPROCESS", "COMPUTE", "VLM", "VERIFY", "ANSWER"];
  const w = 128;
  const gap = 36;
  const x0 = (800 - (4 * w + 3 * gap)) / 2;
  const pos = steps.map((_, i) => {
    const row = i < 4 ? 0 : 1;
    const col = row === 0 ? i : 7 - i; // snake: left→right, then right→left
    return { x: x0 + col * (w + gap), y: row === 0 ? 150 : 290 };
  });
  return (
    <>
      {/* orbit + scene */}
      <circle cx="400" cy="70" r="5" className="s-accent-fill" />
      <path d="M250 82 Q400 30 550 82" className="s-line" strokeDasharray="2 5" />
      <text x="400" y="112" textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">
        SCENE · EN / HI / TA / BN
      </text>
      {steps.map((s, i) => (
        <Node key={s} x={pos[i].x} y={pos[i].y} w={w} h={58} label={s} sub={`step ${i + 1}`} accent={s === "VLM" || s === "VERIFY"} />
      ))}
      {[0, 1, 2].map((i) => (
        <Arrow key={`a${i}`} d={`M${pos[i].x + w} 179 L${pos[i + 1].x - 2} 179`} />
      ))}
      <Arrow d={`M${pos[3].x + w / 2} 208 L${pos[3].x + w / 2} 288`} />
      {[4, 5, 6].map((i) => (
        <Arrow key={`b${i}`} d={`M${pos[i].x} 319 L${pos[i + 1].x + w + 2} 319`} />
      ))}
      {/* audit trace */}
      <path d={`M${x0} 420 L${800 - x0} 420`} className="s-flow" />
      <text x="400" y="452" textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">
        AUDITABLE TRACE · TOOL · PARAMS · TIMING · OUTPUT
      </text>
    </>
  );
}

function Gas() {
  const sensors = ["CO₂", "CO", "PM", "TEMP · RH"];
  return (
    <>
      {/* exhaust line */}
      <path d="M40 470 L40 120 Q40 100 60 100 L120 100" className="s-line" />
      <text x="40" y="500" textAnchor="middle" fontSize="10" opacity="0.6" letterSpacing="1.4">
        EXHAUST
      </text>
      {sensors.map((s, i) => (
        <g key={s}>
          <Node x={120} y={90 + i * 90} w={120} h={50} label={s} sub="sensor" />
          <Arrow d={`M240 ${115 + i * 90} L330 ${200 + i * 30}`} />
        </g>
      ))}
      <Node x={330} y={210} w={150} h={110} label="ESP32" sub="acquire · timestamp" accent />
      <path d="M480 265 L590 265" className="s-flow" />
      <text x="535" y="252" textAnchor="middle" fontSize="9.5" opacity="0.6" letterSpacing="1">
        transmit
      </text>
      <Node x={590} y={190} w={170} h={150} label="DASHBOARD" sub="live telemetry" accent />
      <text x="675" y="310" textAnchor="middle" fontSize="9.5" opacity="0.6" letterSpacing="0.8">
        sensor health
      </text>
    </>
  );
}

const map: Record<Kind, () => JSX.Element> = {
  gas: Gas,
  satellite: Satellite,
  agents: Agents,
  pipeline: Pipeline,
  mlp: Mlp,
  env: Env,
  vision: Vision,
  device: Device,
};

export default function Schematic({ kind, title }: { kind: Kind; title: string }) {
  const Body = map[kind];
  return (
    <svg className="schem" viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`System schematic: ${title}`}>
      <Defs />
      <Body />
    </svg>
  );
}
