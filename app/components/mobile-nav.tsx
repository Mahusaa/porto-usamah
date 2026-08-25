"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BriefcaseIcon, HomeIcon, SendIcon, WritingIcon } from "./icons";

const items = [
  { label: "Home", href: "/", hash: "", Icon: HomeIcon },
  { label: "Writing", href: "/blog", hash: null, Icon: WritingIcon },
  { label: "Work", href: "/#work", hash: "#work", Icon: BriefcaseIcon },
  { label: "Contact", href: "/#contact", hash: "#contact", Icon: SendIcon },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // the hash is client-only, so it settles after mount rather than on the server
  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const onBlog = pathname.startsWith("/blog");

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/90 backdrop-blur sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-4">
        {items.map(({ label, href, hash: target, Icon }) => {
          const active = target === null ? onBlog : !onBlog && hash === target;
          return (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
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
