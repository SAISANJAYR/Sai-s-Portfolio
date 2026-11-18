import { profile } from "@/data/profile";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Payload = { total: Record<string, number>; contributions: Day[] };

/**
 * Real contribution data for the last year, fetched on the server from a
 * public mirror of GitHub's contribution calendar and re-validated twice a
 * day. If the source is unreachable the section says so plainly — it never
 * draws placeholder data.
 */
async function getContributions(): Promise<Payload | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubHandle}?y=last`, {
      next: { revalidate: 43200 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Payload;
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 18;
const LEFT = 28;

export default async function GitHubActivity() {
  const data = await getContributions();

  const head = (
    <div className="gh__head">
      <div>
        <p className="t-label t-muted">GitHub · last 12 months</p>
        {data && (
          <p className="gh__total">
            <span>{data.total.lastYear ?? data.contributions.reduce((s, d) => s + d.count, 0)}</span> contributions
          </p>
        )}
      </div>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
        @{profile.githubHandle} <span className="arr arr--ne" aria-hidden="true">↗</span>
      </a>
    </div>
  );

  if (!data) {
    return (
      <section className="gh" aria-label="GitHub activity">
        {head}
        <p className="t-muted">The activity graph couldn’t be loaded right now — it’s always live on GitHub.</p>
      </section>
    );
  }

  // Lay days out in GitHub's grid: one column per week, Sunday at the top.
  const days = data.contributions;
  const first = new Date(days[0].date + "T00:00:00Z");
  const offset = first.getUTCDay();
  const cells = days.map((d, i) => {
    const idx = i + offset;
    return { ...d, col: Math.floor(idx / 7), row: idx % 7 };
  });
  const weeks = cells[cells.length - 1].col + 1;

  const months: { col: number; label: string }[] = [];
  let lastMonth = -1;
  for (const c of cells) {
    const m = new Date(c.date + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth && c.row === 0) {
      if (!months.length || c.col - months[months.length - 1].col >= 3) months.push({ col: c.col, label: MONTHS[m] });
      lastMonth = m;
    }
  }

  const width = LEFT + weeks * STEP;
  const height = TOP + 7 * STEP;
  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <section className="gh" aria-label="GitHub activity">
      {head}
      <div className="gh__scroll">
        <svg
          className="gh__svg"
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${data.total.lastYear ?? ""} GitHub contributions between ${fmt(days[0].date)} and ${fmt(days[days.length - 1].date)}`}
        >
          {months.map((m) => (
            <text key={`${m.col}-${m.label}`} x={LEFT + m.col * STEP} y={11} className="gh__lbl">
              {m.label}
            </text>
          ))}
          {[
            [1, "Mon"],
            [3, "Wed"],
            [5, "Fri"],
          ].map(([r, l]) => (
            <text key={l as string} x={0} y={TOP + (r as number) * STEP + 9} className="gh__lbl">
              {l}
            </text>
          ))}
          {cells.map((c) => (
            <rect
              key={c.date}
              x={LEFT + c.col * STEP}
              y={TOP + c.row * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              className={`gh__c gh__c--${c.level}`}
            >
              <title>{`${c.count} contribution${c.count === 1 ? "" : "s"} · ${fmt(c.date)}`}</title>
            </rect>
          ))}
        </svg>
      </div>
      <div className="gh__legend t-label t-muted" aria-hidden="true">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <svg key={l} width={CELL} height={CELL}>
            <rect width={CELL} height={CELL} rx={2} className={`gh__c gh__c--${l}`} />
          </svg>
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
