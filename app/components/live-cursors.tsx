"use client";

import { usePresence } from "./presence-context";

/* Other visitors get a rounded pin, deliberately unlike the arrow you
   are holding, so it is obvious which cursor is yours. */
export default function LiveCursors() {
  const { cursors } = usePresence();
  if (!cursors.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {cursors.map((cursor) => (
        <span
          key={cursor.id}
          className="absolute block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white"
          style={{
            left: `${cursor.x * 100}%`,
            top: `${cursor.y * 100}%`,
            backgroundColor: cursor.color,
            boxShadow: `0 2px 10px ${cursor.color}55`,
            transition: "left 250ms linear, top 250ms linear",
          }}
        />
      ))}
    </div>
  );
}
