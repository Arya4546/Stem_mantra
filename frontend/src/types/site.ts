/** Shapes returned by the public website API (backend/src/modules/*). */

export interface Media {
  id: string;
  /** /images/... (shipped with the site) or /media/... (uploaded by an admin) */
  url: string;
  thumbUrl: string | null;
  width: number | null;
  height: number | null;
  blurDataUrl: string | null;
}

export interface GalleryPhoto {
  id: string;
  title: string | null;
  altText: string;
  caption: string | null;
  media: Media;
}

export type GalleryLayout = "GRID" | "MASONRY";

export interface GallerySection {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  accent: string;
  layout: GalleryLayout;
  images: GalleryPhoto[];
}

export interface ClientItem {
  id: string;
  name: string;
  location: string | null;
  description: string | null;
  websiteUrl: string | null;
  isFeatured: boolean;
  logo: Media | null;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  designation: string | null;
  organization: string | null;
  content: string;
  rating: number;
  photo: Media | null;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover: Media | null;
  coverAlt: string | null;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  authorName: string | null;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
