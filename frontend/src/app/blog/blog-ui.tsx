import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";
import type { BlogPostSummary } from "@/types/site";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

export function formatDate(iso: string | null): string {
  return iso ? dateFormat.format(new Date(iso)) : "";
}

export function tagHref(tag: string): string {
  return `/blog?tag=${encodeURIComponent(tag)}`;
}

export function PostMeta({ post, className = "" }: { post: BlogPostSummary; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 ${className}`}>
      {post.publishedAt && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        {post.readingMinutes} min read
      </span>
    </div>
  );
}

export function BlogCard({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-100 via-white to-teal-100 overflow-hidden">
        {post.cover ? (
          <MediaImage
            media={post.cover}
            alt={post.coverAlt || post.title}
            variant="thumb"
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={priority}
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center text-5xl font-black text-orange-200">STEM</div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 relative z-10">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={tagHref(tag)} className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold hover:bg-orange-100">
                {tag}
              </Link>
            ))}
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 break-words group-hover:text-orange-600 transition-colors">
          {/* the whole card is clickable through this link */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3 break-words">{post.excerpt}</p>}
        <PostMeta post={post} className="mt-auto pt-5" />
      </div>
    </article>
  );
}
