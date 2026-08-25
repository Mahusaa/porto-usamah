import Link from "next/link";
import { Monogram } from "./icons";
import Presence from "./presence";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-[0.95rem] font-bold tracking-tight"
          >
            <Monogram className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="sm:hidden">Usamah</span>
            <span className="hidden sm:inline">Usamah Hafizh</span>
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden sm:block">
              <ul className="flex items-center gap-6 font-display text-[0.78rem] font-medium uppercase tracking-[0.12em] text-muted">
                {nav.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="link-underline transition-colors hover:text-accent"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Presence />
          </div>
        </div>

        <nav className="-mx-5 border-t border-rule px-5 sm:hidden">
          <ul className="flex items-center gap-5 overflow-x-auto py-2.5 font-display text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted">
            {nav.map(({ label, href }) => (
              <li key={label} className="shrink-0">
                <Link href={href} className="link-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
