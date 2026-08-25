export default function SiteFooter() {
  return (
    /* the extra bottom padding clears the fixed mobile bar */
    <footer className="mx-auto mt-14 w-full max-w-3xl px-5 pb-24 sm:px-8 sm:pb-10">
      <div className="flex items-center justify-between gap-4 border-t border-rule pt-6 font-display text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        <span>Usamah Hafizh Ammar Zaim</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
