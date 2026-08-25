/* Live viewer count and cursor positions. Each open tab heartbeats with its
   pointer position; anything that has not checked in for STALE_MS is dropped.

   State lives in this server process, so a single long-running instance
   (next start on a VPS, Railway, Fly) sees everyone. On a multi-instance
   serverless deploy each instance only sees its own viewers — swap this Map
   for Redis if that ever matters.

   Positions are normalised 0..1 against the document, and ids are random
   per-tab values, so nothing identifying is stored or broadcast. */

export const dynamic = "force-dynamic";

const STALE_MS = 20_000;

const COLORS = [
  "#0369a1",
  "#7c3aed",
  "#0d9488",
  "#d97706",
  "#db2777",
  "#2563eb",
];

type Viewer = { seen: number; x: number | null; y: number | null; color: string };

const viewers = new Map<string, Viewer>();

function prune() {
  const cutoff = Date.now() - STALE_MS;
  for (const [id, viewer] of viewers) {
    if (viewer.seen < cutoff) viewers.delete(id);
  }
}

function pickColor() {
  const taken = new Set([...viewers.values()].map((v) => v.color));
  return COLORS.find((c) => !taken.has(c)) ?? COLORS[viewers.size % COLORS.length];
}

const clamp01 = (n: unknown) =>
  typeof n === "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : null;

export async function POST(request: Request) {
  let body: { id?: unknown; x?: unknown; y?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    /* ignore malformed heartbeats */
  }

  prune();

  const id = typeof body.id === "string" && body.id.length <= 64 ? body.id : null;
  if (id) {
    const existing = viewers.get(id);
    viewers.set(id, {
      seen: Date.now(),
      x: clamp01(body.x),
      y: clamp01(body.y),
      color: existing?.color ?? pickColor(),
    });
  }

  const cursors = [...viewers.entries()]
    .filter(([key, v]) => key !== id && v.x !== null && v.y !== null)
    .map(([key, v]) => ({ id: key, x: v.x, y: v.y, color: v.color }));

  return Response.json(
    { online: Math.max(1, viewers.size), cursors },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  prune();
  return Response.json(
    { online: Math.max(1, viewers.size), cursors: [] },
    { headers: { "Cache-Control": "no-store" } },
  );
}
