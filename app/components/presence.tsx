"use client";

import { usePresence } from "./presence-context";

export default function Presence() {
  const { online } = usePresence();
  if (online === null) return null;

  return (
    <span
      className="flex items-center gap-2 font-display text-[0.72rem] font-medium text-muted"
      title={`${online} ${online === 1 ? "person is" : "people are"} on this page right now`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span>
        <span className="font-bold text-ink">{online}</span>
        <span className="hidden sm:inline"> online</span>
      </span>
    </span>
  );
}
