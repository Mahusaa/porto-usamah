import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { formatDate, posts, readingTime } from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Usamah Hafizh`,
    description: post.summary,
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const html = await marked.parse(post.body);
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-4 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/blog"
          className="font-display text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
        >
          ← All posts
        </Link>

        <article className="mt-8">
          <p className="font-display text-[0.72rem] uppercase tracking-[0.12em] text-muted">
            {formatDate(post.date)} · {readingTime(post.body)}
          </p>
          <h1 className="mt-2 max-w-2xl text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] sm:text-[2.4rem]">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl border-l-2 border-accent-light pl-4 text-[1.05rem] leading-relaxed text-muted">
            {post.summary}
          </p>

          <div
            className="prose mt-10 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        {others.length > 0 && (
          <section className="mt-16 border-t border-rule pt-6">
            <h2 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-muted">
              Read next
            </h2>
            <ul className="mt-4 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="font-display text-[0.72rem] text-muted">
                      {formatDate(other.date)}
                    </span>
                    <span className="font-semibold transition-colors group-hover:text-accent">
                      {other.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
