import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, absoluteUrl, siteApi } from "@/lib/site-api";
import { jsonLd } from "@/lib/seo";
import { BlogCard, tagHref } from "./blog-ui";

// Posts are written in the admin panel.
export const dynamic = "force-dynamic";

const PER_PAGE = 9;
const DESCRIPTION =
  "Ideas, guides and stories on STEM education, robotics, AI & coding labs, Atal Tinkering Labs and NEP 2020 aligned learning from the STEMmantra team.";

type Props = { searchParams: { page?: string; tag?: string } };

function parse(searchParams: Props["searchParams"]) {
  const page = Math.max(1, Math.min(1000, Number.parseInt(searchParams.page ?? "1", 10) || 1));
  const tag = typeof searchParams.tag === "string" && searchParams.tag.trim() ? searchParams.tag.trim().slice(0, 40) : undefined;
  return { page, tag };
}

function pageHref(page: number, tag?: string): string {
  const qs = new URLSearchParams();
  if (tag) qs.set("tag", tag);
  if (page > 1) qs.set("page", String(page));
  const query = qs.toString();
  return `/blog${query ? `?${query}` : ""}`;
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const { page, tag } = parse(searchParams);
  const title = tag
    ? `Articles about ${tag} | STEMmantra Blog`
    : page > 1
      ? `STEMmantra Blog – Page ${page}`
      : "STEMmantra Blog | STEM, Robotics & AI Education Insights";
  return {
    title: { absolute: title },
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}${pageHref(page)}` },
    // Tag listings are thin duplicates of the main listing: keep them out of the index.
    robots: tag ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", url: `${SITE_URL}/blog`, title: "STEMmantra Blog", description: DESCRIPTION },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { page, tag } = parse(searchParams);
  const { posts, pagination } = await siteApi.blogPosts({ page, tag, limit: PER_PAGE });
  if (pagination.total > 0 && page > pagination.totalPages) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "STEMmantra Blog",
    url: `${SITE_URL}/blog`,
    description: DESCRIPTION,
    publisher: { "@type": "Organization", name: "STEMmantra", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt ?? undefined,
      dateModified: p.updatedAt,
      ...(p.cover ? { image: absoluteUrl(p.cover.url) } : {}),
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <main className="min-h-screen bg-transparent pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              STEMmantra Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-5">
              Insights for <span className="text-orange-500">Future-Ready</span> Schools
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{DESCRIPTION}</p>
          </header>

          {tag && (
            <div className="flex justify-center mb-10">
              <span className="inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-white border border-orange-200 text-sm shadow-sm">
                Showing posts tagged <strong className="text-orange-700">{tag}</strong>
                <Link href="/blog" className="w-7 h-7 rounded-full hover:bg-orange-50 flex items-center justify-center text-gray-500" aria-label="Clear tag filter">
                  <X className="w-4 h-4" />
                </Link>
              </span>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/70 rounded-3xl border border-gray-100">
              <p className="text-xl font-semibold text-gray-800">{tag ? "No posts with this tag yet." : "Our first articles are on their way."}</p>
              <p className="text-gray-500 mt-2">
                Meanwhile, explore our <Link href="/programs" className="text-orange-600 font-semibold hover:underline">programs</Link> or{" "}
                <Link href="/gallery" className="text-orange-600 font-semibold hover:underline">gallery</Link>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} priority={i < 3} />
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <nav aria-label="Blog pages" className="mt-14 flex items-center justify-center gap-2 flex-wrap">
              {page > 1 && (
                <Link href={pageHref(page - 1, tag)} rel="prev" className="inline-flex items-center gap-1 px-4 h-11 rounded-xl bg-white border border-gray-200 font-semibold text-gray-700 hover:border-orange-300">
                  <ChevronLeft className="w-4 h-4" /> Newer
                </Link>
              )}
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === pagination.totalPages || Math.abs(n - page) <= 2)
                .map((n, i, list) => (
                  <span key={n} className="flex items-center gap-2">
                    {i > 0 && n - list[i - 1] > 1 && <span className="text-gray-400">…</span>}
                    <Link
                      href={pageHref(n, tag)}
                      aria-current={n === page ? "page" : undefined}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-semibold border ${
                        n === page ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                      }`}
                    >
                      {n}
                    </Link>
                  </span>
                ))}
              {page < pagination.totalPages && (
                <Link href={pageHref(page + 1, tag)} rel="next" className="inline-flex items-center gap-1 px-4 h-11 rounded-xl bg-white border border-gray-200 font-semibold text-gray-700 hover:border-orange-300">
                  Older <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          )}

          {posts.length > 0 && !tag && (
            <TagCloud tags={posts.flatMap((p) => p.tags)} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function TagCloud({ tags }: { tags: string[] }) {
  const unique = Array.from(new Set(tags)).slice(0, 20);
  if (unique.length === 0) return null;
  return (
    <section className="mt-16 text-center" aria-label="Topics">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Browse by topic</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {unique.map((t) => (
          <Link key={t} href={tagHref(t)} className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-300 hover:text-orange-700">
            {t}
          </Link>
        ))}
      </div>
    </section>
  );
}
