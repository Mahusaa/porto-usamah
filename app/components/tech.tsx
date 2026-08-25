import {
  siC,
  siClaude,
  siCursor,
  siDrizzle,
  siEspressif,
  siExpress,
  siFirebase,
  siGithubactions,
  siGo,
  siJavascript,
  siJest,
  siMongodb,
  siMysql,
  siNeovim,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPm2,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

type BrandIcon = { hex: string; path: string };

/* OpenAI and AWS were pulled from simple-icons over trademark policy,
   so those labels fall back to a plain dot. */
const brands: Record<string, BrandIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Tailwind CSS": siTailwindcss,
  "Drizzle ORM": siDrizzle,
  Jest: siJest,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  "Firebase Realtime Database": siFirebase,
  Redis: siRedis,
  ESP32: siEspressif,
  "GitHub Actions": siGithubactions,
  Nginx: siNginx,
  PM2: siPm2,
  Golang: siGo,
  Python: siPython,
  C: siC,
  Java: siOpenjdk,
  Neovim: siNeovim,
  Cursor: siCursor,
  "Claude Code": siClaude,
};

/* not a brand mark, just a prompt glyph for the terminal chip */
function TerminalGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 7 4 4-4 4" />
      <path d="M12 15h8" />
    </svg>
  );
}

export function TechChip({ label }: { label: string }) {
  const brand = brands[label];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-white/70 px-2 py-[0.3rem] font-display text-[0.72rem] leading-none text-ink/75 transition-all duration-200 hover:-translate-y-px hover:border-accent-light hover:bg-white">
      {label === "Terminal" ? (
        <TerminalGlyph />
      ) : brand ? (
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 shrink-0"
          fill={brand.hex === "000000" ? "currentColor" : `#${brand.hex}`}
          aria-hidden
        >
          <path d={brand.path} />
        </svg>
      ) : (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" />
      )}
      {label}
    </span>
  );
}

export function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <TechChip key={item} label={item} />
      ))}
    </div>
  );
}
