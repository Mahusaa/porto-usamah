"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BriefcaseIcon, HomeIcon, SendIcon, WritingIcon } from "./icons";

/* Every section the bar can point at, in document order. The page has more
   sections than the bar has marks, so each mark owns a run of them and the
   bar never goes dark halfway down the page. */
const sections = ["intro", "work", "projects", "stack", "writing", "contact"];

const items = [
  { label: "Home", href: "/", Icon: HomeIcon, owns: ["intro"] },
  { label: "Writing", href: "/blog", Icon: WritingIcon, owns: ["writing"] },
  {
    label: "Work",
    href: "/#work",
    Icon: BriefcaseIcon,
    owns: ["work", "projects", "stack"],
  },
  { label: "Contact", href: "/#contact", Icon: SendIcon, owns: ["contact"] },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [current, setCurrent] = useState("intro");
  const onBlog = pathname.startsWith("/blog");

  // Watching the sections rather than the hash: the hash only moves when a
  // link is tapped, so scrolling used to leave Home lit the whole way down.
  useEffect(() => {
    if (onBlog) return;

    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter((node) => node !== null);
    if (!nodes.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // furthest section down that crosses the band wins; if none does —
        // a gap between sections, or the tail of the page — the last one stands
        const crossing = sections.filter((id) => visible.has(id));
        if (crossing.length) setCurrent(crossing[crossing.length - 1]);
      },
      // a thin band across the upper third, so "current" means what you read
      { rootMargin: "-25% 0px -60% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onBlog]);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/90 backdrop-blur sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-4">
        {items.map(({ label, href, Icon, owns }) => {
          const active = onBlog
            ? label === "Writing"
            : owns.includes(current);
          return (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "true" : undefined}
                className={`flex h-14 items-center justify-center transition-colors ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <Icon className="h-[1.35rem] w-[1.35rem]" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
