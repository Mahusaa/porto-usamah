/* Reads the public contribution calendar GitHub renders for a profile.
   No token needed, and it degrades to a plain link if the fetch fails. */

const USER = "mahusaa";

const levelColors = ["#e4eaf1", "#bae6fd", "#7dd3fc", "#38bdf8", "#0369a1"];

type Day = { date: string; level: number };

async function getCalendar() {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { "User-Agent": "portfolio-usamah" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const days: Day[] = [];
    const cell = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    let match: RegExpExecArray | null;
    while ((match = cell.exec(html))) {
      days.push({ date: match[1], level: Number(match[2]) });
    }
    if (!days.length) return null;

    const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
    return { days, total: total?.[1] ?? null };
  } catch {
    return null;
  }
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default async function Contributions() {
  const data = await getCalendar();
  if (!data) return null;

  const days = [...data.days].sort((a, b) => a.date.localeCompare(b.date));

  // column = week, row = weekday, so the grid lines up the way GitHub's does
  const first = new Date(`${days[0].date}T00:00:00Z`);
  const origin = new Date(first);
  origin.setUTCDate(origin.getUTCDate() - origin.getUTCDay());

  const weeks: (Day | null)[][] = [];
  for (const day of days) {
    const d = new Date(`${day.date}T00:00:00Z`);
    const week = Math.floor((+d - +origin) / (7 * 86400000));
    weeks[week] ??= Array(7).fill(null);
    weeks[week][d.getUTCDay()] = day;
  }

  const monthLabel = (week: number) => {
    const day = weeks[week]?.find(Boolean);
    if (!day) return null;
    const d = new Date(`${day.date}T00:00:00Z`);
    const prev = weeks[week - 1]?.find(Boolean);
    if (!prev) return d.getUTCDate() <= 14 ? MONTHS[d.getUTCMonth()] : null;
    const prevMonth = new Date(`${prev.date}T00:00:00Z`).getUTCMonth();
    return d.getUTCMonth() === prevMonth ? null : MONTHS[d.getUTCMonth()];
  };

  return (
    <div className="rounded-2xl border border-rule bg-white/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.16em] text-muted">
          GitHub, past year
        </h3>
        {data.total && (
          <p className="font-display text-[0.72rem] text-muted">
            <span className="font-bold text-accent">{data.total}</span>{" "}
            contributions
          </p>
        )}
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="w-max">
          <div className="flex gap-[3px] pl-7">
            {weeks.map((_, week) => (
              <span
                key={week}
                className="relative block w-[11px] font-display text-[0.6rem] leading-none text-muted"
              >
                <span className="absolute left-0 whitespace-nowrap">
                  {monthLabel(week)}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-2.5 flex gap-[3px]">
            <div className="mr-1 grid w-6 grid-rows-7 gap-[3px] font-display text-[0.6rem] leading-[11px] text-muted">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>

            {weeks.map((week, i) => (
              <div key={i} className="grid grid-rows-7 gap-[3px]">
                {Array.from({ length: 7 }, (_, d) => {
                  const day = week?.[d];
                  return (
                    <span
                      key={d}
                      title={day ? `${day.date}` : undefined}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{
                        backgroundColor: day
                          ? levelColors[day.level]
                          : "transparent",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noreferrer"
          className="link font-display text-[0.72rem] text-muted"
        >
          @{USER}
        </a>
        <div className="flex items-center gap-1.5 font-display text-[0.6rem] text-muted">
          Less
          {levelColors.map((color) => (
            <span
              key={color}
              className="h-[11px] w-[11px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
