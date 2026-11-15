import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MediaImage from "@/components/ui/MediaImage";
import { SITE_URL, absoluteUrl, siteApi } from "@/lib/site-api";
import { jsonLd, truncate } from "@/lib/seo";
import { BlogCard, PostMeta, tagHref } from "../blog-ui";
import ShareButtons from "./ShareButtons";

export const dynamic = "force-dynamic";

const DEFAULT_IMAGE = "https://learn.stemmantra.com/og-image.png";

type Props = { params: { slug: string } };

// generateMetadata and the page share one API call per request.
const getPost = cache((slug: string) => siteApi.blogPost(slug));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPost(params.slug);
  if (!data) return { title: "Post not found", robots: { index: false, follow: true } };
  const { post } = data;

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || truncate(post.title, 160);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.cover
    ? { url: absoluteUrl(post.cover.url), width: post.cover.width ?? undefined, height: post.cover.height ?? undefined, alt: post.coverAlt || post.title }
    : { url: DEFAULT_IMAGE, width: 1200, height: 630, alt: "STEMmantra" };

  return {
    title: { absolute: `${title} | STEMmantra Blog` },
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    authors: post.authorName ? [{ name: post.authorName }] : [{ name: "STEMmantra" }],
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "STEMmantra",
      locale: "en_IN",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPost(params.slug);
  if (!data) notFound();
  const { post, related } = data;
  const url = `${SITE_URL}/blog/${post.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      image: post.cover ? [absoluteUrl(post.cover.url)] : [DEFAULT_IMAGE],
      datePublished: post.publishedAt ?? undefined,
      dateModified: post.updatedAt,
      author: post.authorName
        ? { "@type": "Person", name: post.authorName }
        : { "@type": "Organization", name: "STEMmantra", url: SITE_URL },
      publisher: { "@type": "Organization", name: "STEMmantra", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags.join(", ") || undefined,
      timeRequired: `PT${post.readingMinutes}M`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <main className="min-h-screen bg-transparent pt-28 md:pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-4 md:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
              <li aria-hidden><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link href="/blog" className="hover:text-orange-600">Blog</Link></li>
              <li aria-hidden><ChevronRight className="w-3.5 h-3.5" /></li>
              <li className="text-gray-700 font-medium line-clamp-1 max-w-[60vw]" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <header className="mb-8">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link key={tag} href={tagHref(tag)} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold hover:bg-orange-100">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight break-words">{post.title}</h1>
            {post.excerpt && <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4">
              <div className="flex items-center gap-3">
                <div aria-hidden className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-teal-500 text-white font-bold flex items-center justify-center">
                  {(post.authorName || "S").charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{post.authorName || "STEMmantra Team"}</p>
                  <PostMeta post={post} />
                </div>
              </div>
              <ShareButtons url={url} title={post.title} />
            </div>
          </header>

          {post.cover && (
            <figure className="mb-10 -mx-4 md:-mx-16">
              <div className="relative overflow-hidden md:rounded-3xl bg-gray-100">
                <MediaImage
                  media={post.cover}
                  alt={post.coverAlt || post.title}
                  priority
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="w-full h-auto"
                />
              </div>
            </figure>
          )}

          <div
            className="prose prose-lg prose-gray max-w-none break-words prose-headings:font-bold prose-headings:tracking-tight prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-img:rounded-2xl prose-blockquote:border-orange-400 prose-pre:bg-gray-900"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-12 pt-6 border-t border-gray-100">
            <ShareButtons url={url} title={post.title} />
          </div>

          <aside className="mt-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold">Bring hands-on STEM learning to your school</h2>
            <p className="mt-3 text-gray-300">Robotics, AI &amp; coding and Atal Tinkering Labs — designed, set up and run by STEMmantra.</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold transition-colors">Talk to our team</Link>
              <Link href="/programs" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold border border-white/10 transition-colors">Explore programs</Link>
            </div>
          </aside>
        </article>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {related.slice(0, 3).map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
