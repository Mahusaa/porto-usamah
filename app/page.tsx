import Image from "next/image";
import Contributions from "./components/contributions";
import { TechChips } from "./components/tech";
import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { formatDate, posts, readingTime } from "./blog/posts";
import {
  ArrowIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "./components/icons";

// live GitHub calendar + computed role durations, refreshed hourly
export const revalidate = 3600;

const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const links = [
  { label: "GitHub", href: "https://github.com/mahusaa", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/usamah-hafizh",
    icon: LinkedinIcon,
  },
  { label: "Email", href: "mailto:hakaro375@gmail.com", icon: MailIcon },
];

const timeline = [
  {
    year: "2022",
    text: "Started electrical engineering, telecommunication track, at Universitas Indonesia.",
  },
  {
    year: "2024",
    text: "Went freelance and shipped an SNBT tryout platform that ran live for 1,000+ students.",
  },
  {
    year: "2025",
    text: "Wired up smart homes as an IoT engineer, and made the finals of the Next.js Global Hackathon.",
  },
  {
    year: "2026",
    text: "Joined Pietra Digital Technology as an AI engineer in March, now Head of Engineering. Graduated from Universitas Indonesia in August.",
  },
];

type Role = {
  title: string;
  label: string;
  start: string;
  end: string | null;
  points: string[];
};

type Job = {
  company: string;
  period: string;
  logo?: string;
  /* "cover" for logos that are already a filled tile, so they reach the edges */
  logoFit?: "contain" | "cover";
  /* draw the tile ourselves when the source logo is a low-res filled icon */
  logoBg?: string;
  roles: Role[];
};

const work: Job[] = [
  {
    company: "Pietra Digital Technology",
    period: "Mar 2026 - Present",
    logo: "/logos/pietra-mark.png",
    roles: [
      {
        title: "Head of Engineering",
        label: "Jun 2026 - Present",
        start: "2026-06",
        end: null,
        points: [
          "Lead engineering across the product: roadmap, architecture, and the technical calls that come with both.",
          "Own the stack end to end on Next.js, TypeScript and PostgreSQL, from system design through to deployment.",
          "Set the product direction and keep the team unblocked while it ships.",
        ],
      },
      {
        title: "Artificial Intelligence Engineer",
        label: "Mar 2026 - May 2026",
        start: "2026-03",
        end: "2026-05",
        points: [
          "Built a platform that reconstructs how an issue unfolds across social media, from first appearance to peak conversation.",
          "Surfaces the top narratives driving an issue and who is carrying them.",
          "Architected the pipelines that collect, clean and cluster social media conversation at scale.",
        ],
      },
    ],
  },
  {
    company: "Ferbos Kreasi Digital",
    period: "Jul 2025 - Aug 2025",
    logo: "/logos/ferbos-mark.png",
    roles: [
      {
        title: "IoT Engineer, Intern",
        label: "Jul 2025 - Aug 2025",
        start: "2025-07",
        end: "2025-08",
        points: [
          "Integrated air quality monitoring, occupancy detection and automated AC control through HomeAssistant.",
          "Configured Zigbee smart plugs, lighting and solar PV inverters into one setup that actually talked to itself.",
          "Designed the MQTT protocol that kept automation low-latency across distributed devices.",
        ],
      },
    ],
  },
  {
    company: "Eduvision",
    period: "Dec 2024 - Mar 2025",
    logo: "/logos/eduvision-glyph.png",
    logoBg: "#1558CB",
    roles: [
      {
        title: "Software Engineer, Freelance",
        label: "Dec 2024 - Mar 2025",
        start: "2024-12",
        end: "2025-03",
        points: [
          "Built a UTBK SNBT tryout platform serving 1,000+ students, 5,000+ submissions and 100+ concurrent users.",
          "Implemented Item Response Theory scoring with dynamic difficulty across 3+ levels.",
          "Cut average response latency by ~30% at peak with tuned PostgreSQL schemas and queries.",
          "Held 99%+ uptime through high-traffic tryout windows with zero data loss.",
        ],
      },
    ],
  },
];

const projects = [
  {
    name: "Smart Plant Care",
    tech: ["ESP32", "Firebase", "Next.js", "OpenAI"],
    blurb:
      "Capstone IoT platform pairing ESP32 sensors with Firebase for real-time plant health monitoring. I built the dashboard and the AI layer that turns raw sensor data into care recommendations. Scored 95/100.",
  },
  {
    name: "SNBT Tryout Platform",
    tech: ["TypeScript", "Next.js", "Drizzle ORM", "PostgreSQL"],
    blurb:
      "Full-stack exam platform with adaptive IRT scoring and LaTeX rendering for 100+ math-heavy questions, running live for thousands of students.",
  },
  {
    name: "AI Job Platform",
    tech: ["Next.js", "OpenAI"],
    blurb:
      "Built for the Next.js Global Hackathon 2025 and picked as a finalist out of a global field.",
  },
];

const stack = [
  {
    title: "Languages",
    items: [
      "TypeScript",
      "JavaScript",
      "Golang",
      "Python",
      "C",
      "SQL",
      "Java",
    ],
  },
  {
    title: "Frameworks",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Drizzle ORM",
      "Jest",
    ],
  },
  {
    title: "Tools",
    items: [
      "Terminal",
      "Neovim",
      "Claude Code",
      "Codex",
      "Antigravity",
      "Cursor",
      "GitHub Actions",
      "ESP32",
      "Nginx",
      "PM2",
      "AWS",
    ],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis"],
  },
];

function SectionHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-rule pb-2.5">
      <span className="font-display text-xs font-bold text-accent">{n}</span>
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em]">
        {title}
      </h2>
    </div>
  );
}

/* inclusive month count, the way LinkedIn counts a stint */
function duration(start: string, end: string | null) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const now = new Date();
  const [endYear, endMonth] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

function CompanyLogo({
  company,
  logo,
  fit = "contain",
  bg,
}: {
  company: string;
  logo?: string;
  fit?: "contain" | "cover";
  bg?: string;
}) {
  const box =
    "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-rule transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-11 sm:w-11";

  if (!logo) {
    return (
      <span
        className={`${box} bg-accent-light/20 font-display text-base font-bold text-accent`}
        aria-hidden
      >
        {company.charAt(0)}
      </span>
    );
  }

  return (
    <span
      className={`${box} ${bg ? "border-transparent p-2" : "bg-white"} ${
        !bg && fit === "cover" ? "" : bg ? "" : "p-1.5"
      }`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <Image
        src={logo}
        alt={`${company} logo`}
        width={88}
        height={88}
        unoptimized
        className={`h-full w-full ${
          fit === "cover" ? "object-cover" : "object-contain"
        }`}
      />
    </span>
  );
}

function Dash() {
  return <span className="mt-[0.72rem] h-px w-3 shrink-0 bg-accent-light" />;
}

export default function Home() {
  return (
    <div className="flex-1">
      <SiteHeader />

      <main
        id="top"
        className="mx-auto w-full max-w-3xl px-5 pb-4 pt-12 sm:px-8 sm:pt-20"
      >
        <section>
          <p className="flex items-center gap-2.5 font-display text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light ring-4 ring-accent-light/30" />
            Depok, Indonesia
          </p>

          <h1 className="mt-6 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[3.1rem]">
            I build AI products{" "}
            <span className="highlight">end to end</span>.
          </h1>

          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink/75 sm:text-lg">
            Head of Engineering at{" "}
            <a
              href="https://pietra.tech"
              target="_blank"
              rel="noreferrer"
              className="dotted-link font-medium"
            >
              Pietra Digital Technology
            </a>
            . The AI platform I lead explains an issue
            itself: what is being claimed, who is driving it, and where it
            heads next. Electrical engineering
            graduate from{" "}
            <a
              href="https://www.ui.ac.id"
              target="_blank"
              rel="noreferrer"
              className="dotted-link font-medium"
            >
              Universitas Indonesia
            </a>
            .
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-rule bg-white/60 px-3.5 py-1.5 font-display text-[0.78rem] font-medium text-ink/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-light hover:bg-white hover:text-accent hover:shadow-sm"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                <ArrowIcon className="nudge nudge-diag h-3 w-3 text-muted transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-rule sm:mt-16">
          <dl className="divide-y divide-rule">
            {timeline.map(({ year, text }) => (
              <div
                key={year}
                className="grid grid-cols-[3rem_1fr] gap-4 py-3.5 sm:gap-6"
              >
                <dt className="font-display text-sm font-bold text-accent">
                  {year}
                </dt>
                <dd className="text-[1rem] leading-relaxed text-ink/75">
                  {text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="work" className="mt-14 scroll-mt-20 sm:mt-20">
          <SectionHeading n="01" title="Work" />
          <div className="mt-7 space-y-10">
            {work.map((job) => (
              <article
                key={job.company}
                className="group flex items-start gap-3.5 sm:gap-4"
              >
                <CompanyLogo
                  company={job.company}
                  logo={job.logo}
                  fit={job.logoFit}
                  bg={job.logoBg}
                />
                <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold tracking-tight">
                    {job.company}
                  </h3>
                  <span className="font-display text-[0.72rem] uppercase tracking-[0.1em] text-muted">
                    {job.period}
                  </span>
                </div>
                <div className="mt-4 space-y-6 border-l border-rule pl-4 sm:pl-5">
                  {job.roles.map((role) => (
                    <div key={role.title} className="relative">
                      <span className="absolute -left-5 top-2 h-2 w-2 rounded-full bg-accent-light ring-4 ring-paper sm:-left-6" />
                      <h4 className="font-display text-[0.98rem] font-bold tracking-tight text-accent">
                        {role.title}
                      </h4>
                      <p className="mt-0.5 font-display text-[0.75rem] text-muted">
                        {role.label} · {duration(role.start, role.end)}
                      </p>
                      <ul className="mt-2.5 space-y-2 text-[1rem] leading-relaxed text-ink/75">
                        {role.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <Dash />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-14 scroll-mt-20 sm:mt-20">
          <SectionHeading n="02" title="Projects" />
          <div className="divide-y divide-rule">
            {projects.map((project) => (
              <article
                key={project.name}
                className="grid gap-2 py-6 sm:grid-cols-[1fr_1.7fr] sm:gap-8"
              >
                <div>
                  <h3 className="text-[1.05rem] font-bold tracking-tight">
                    {project.name}
                  </h3>
                  <div className="mt-2">
                    <TechChips items={project.tech} />
                  </div>
                </div>
                <p className="text-[1rem] leading-relaxed text-ink/75">
                  {project.blurb}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="mt-14 scroll-mt-20 sm:mt-20">
          <SectionHeading n="03" title="Stack" />
          <dl className="divide-y divide-rule">
            {stack.map((group) => (
              <div
                key={group.title}
                className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-8"
              >
                <dt className="font-display text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted sm:pt-1">
                  {group.title}
                </dt>
                <dd>
                  <TechChips items={group.items} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="writing" className="mt-14 scroll-mt-20 sm:mt-20">
          <SectionHeading n="04" title="Writing" />
          <div className="divide-y divide-rule">
            {[...posts]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 3)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg py-5 transition-all duration-200 hover:px-2"
                >
                  <p className="font-display text-[0.72rem] uppercase tracking-[0.12em] text-muted">
                    {formatDate(post.date)} · {readingTime(post.body)}
                  </p>
                  <h3 className="mt-1 text-[1.05rem] font-bold tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-[1rem] leading-relaxed text-ink/75">
                    {post.summary}
                  </p>
                </Link>
              ))}
          </div>
          <Link
            href="/blog"
            className="group mt-4 inline-flex items-center gap-1 font-display text-[0.75rem] font-medium text-accent"
          >
            All posts <span className="nudge nudge-x">→</span>
          </Link>
        </section>

        <section id="contact" className="mt-14 scroll-mt-20 sm:mt-20">
          <SectionHeading n="05" title="Contact" />
          <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink/80">
            Working on something where AI, the web and hardware meet? I&apos;d
            like to hear about it.
          </p>
          <ul className="mt-5 space-y-1">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg border-b border-rule px-1 py-3 transition-all duration-200 hover:bg-white/70 hover:px-2.5 hover:text-accent"
                >
                  <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                  <span className="font-display text-[0.72rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-accent">
                    {label}
                  </span>
                  <span className="ml-auto text-[0.95rem]">
                    {href.replace("mailto:", "").replace("https://", "")}
                  </span>
                  <ArrowIcon className="nudge nudge-diag h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-14 sm:mt-20">
          <Contributions />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
