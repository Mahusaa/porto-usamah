type IconProps = { className?: string };

export function GithubIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.6.5-3.28-.63-3.49-1.21-.12-.3-.63-1.22-1.07-1.47-.37-.2-.9-.68-.02-.7.83-.01 1.42.77 1.62 1.08.95 1.6 2.46 1.15 3.06.87.1-.68.37-1.15.67-1.42-2.3-.26-4.71-1.15-4.71-5.12 0-1.13.4-2.06 1.07-2.79-.11-.26-.47-1.32.1-2.75 0 0 .87-.28 2.86 1.07a9.66 9.66 0 0 1 5.2 0c1.99-1.35 2.86-1.07 2.86-1.07.57 1.43.21 2.49.1 2.75.67.73 1.07 1.65 1.07 2.79 0 3.98-2.42 4.86-4.72 5.12.37.32.7.94.7 1.91l-.01 2.83c0 .27.19.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76v5.69h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.76 0-2.03 1.3-2.03 2.66v5.14h-4v-11Z" />
    </svg>
  );
}

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.08l-4.76-6.23L5.46 21H2.44l7.06-8.07L2.25 3h6.23l4.3 5.69L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* ---- bottom bar, mobile ---- */

export function HomeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 10.4 12 3.6l8.5 6.8" />
      <path d="M5.6 9v10.4h12.8V9" />
      <path d="M9.9 19.4v-5.1h4.2v5.1" />
    </svg>
  );
}

export function WritingIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
      <path d="M5 6.4h14" />
      <path d="M3.2 10.3h17.6" />
      <path d="M5 14.2h14" />
      <path d="M3.2 18.1h17.6" />
    </svg>
  );
}

export function BriefcaseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.4" y="7.4" width="17.2" height="11.6" rx="1.8" />
      <path d="M9 7.4V5.9c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v1.5" />
      <path d="M3.4 12.6h17.2" />
    </svg>
  );
}

export function SendIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.4 3.6 3.9 10.2c-.8.3-.8 1.5.1 1.7l7 1.9 2 6.9c.3.9 1.4.9 1.7.1l6.6-16.4c.2-.6-.3-1.1-.9-.8Z" />
    </svg>
  );
}
