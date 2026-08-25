import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { formatDate, posts, readingTime } from "./posts";

export const metadata: Metadata = {
  title: "Blog | Usamah Hafizh",
  description:
    "Notes on building AI products, IoT systems and exam platforms that people actually use.",
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-4 pt-12 sm:px-8 sm:pt-16">
        <p className="font-display text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted">
          Writing
        </p>
        <h1 className="mt-4 text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[2.6rem]">
          Notes from the <span className="highlight">build</span>.
        </h1>
        <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
          Things I worked out the slow way: social listening pipelines, MQTT
          latency, and scoring an exam honestly.
        </p>

        <div className="mt-10 divide-y divide-rule border-t border-rule">
          {sorted.map((post) => (
            <article key={post.slug} className="py-6">
              <Link href={`/blog/${post.slug}`} className="group block rounded-lg transition-all duration-200 hover:px-2">
                <p className="font-display text-[0.72rem] uppercase tracking-[0.12em] text-muted">
                  {formatDate(post.date)} · {readingTime(post.body)}
                </p>
                <h2 className="mt-1.5 text-[1.2rem] font-bold tracking-tight transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink/75">
                  {post.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 font-display text-[0.75rem] font-medium text-accent">
                  Read <span className="nudge nudge-x">→</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
