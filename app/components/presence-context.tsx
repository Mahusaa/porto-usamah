"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type RemoteCursor = { id: string; x: number; y: number; color: string };

type PresenceState = { online: number | null; cursors: RemoteCursor[] };

const PresenceContext = createContext<PresenceState>({
  online: null,
  cursors: [],
});

export const usePresence = () => useContext(PresenceContext);

const TICK_MS = 250;

export function PresenceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PresenceState>({
    online: null,
    cursors: [],
  });
  const point = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // one id per tab; random, so nothing about the visitor is broadcast
    let id = sessionStorage.getItem("presence-id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("presence-id", id);
    }

    const move = (event: PointerEvent) => {
      const height = Math.max(document.documentElement.scrollHeight, 1);
      point.current = {
        x: event.clientX / Math.max(window.innerWidth, 1),
        y: (event.clientY + window.scrollY) / height,
      };
    };
    window.addEventListener("pointermove", move, { passive: true });

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = async () => {
      if (!document.hidden) {
        try {
          const res = await fetch("/api/presence", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...point.current }),
          });
          const data = await res.json();
          if (!cancelled) {
            setState({ online: data.online, cursors: data.cursors ?? [] });
          }
        } catch {
          /* offline, keep the last state */
        }
      }
      if (!cancelled) timer = setTimeout(tick, TICK_MS);
    };

    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <PresenceContext.Provider value={state}>{children}</PresenceContext.Provider>
  );
}
