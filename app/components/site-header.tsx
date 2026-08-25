import Link from "next/link";

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
        <div className="relative flex h-14 items-center justify-between gap-4">
          {/* on mobile the wordmark is the whole bar, so it sits dead centre;
             from sm up it steps back to the left and lets the nav have the row */}
          <Link
            href="/"
            className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center font-latin text-[0.95rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-accent sm:static sm:left-auto sm:translate-x-0"
          >
            Usamah Hafizh
          </Link>

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
        </div>
      </div>
    </header>
  );
}
