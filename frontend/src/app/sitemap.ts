import type { MetadataRoute } from "next";
import { SITE_URL, orEmpty, siteApi } from "@/lib/site-api";
import { getProgramStaticParams } from "@/data/programs";
import { labTypes } from "@/data/lab-types";
import { roboticsLabCities } from "@/data/robotics-lab-cities";
import { stemLabCities } from "@/data/stem-lab-cities";
import { locationServices } from "@/data/location-services";

// Rebuilt on every request so new blog posts appear immediately.
export const dynamic = "force-dynamic";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

const STATIC_PAGES: [path: string, priority: number, changeFrequency: Freq][] = [
  ["", 1.0, "weekly"],
  ["/about", 0.8, "monthly"],
  ["/programs", 0.9, "monthly"],
  ["/gallery", 0.7, "weekly"],
  ["/clients", 0.7, "monthly"],
  ["/blog", 0.8, "weekly"],
  ["/contact", 0.8, "yearly"],
  ["/career", 0.6, "monthly"],
  ["/sitemap", 0.3, "monthly"],
  ["/privacy-policy", 0.2, "yearly"],
  ["/terms-of-service", 0.2, "yearly"],
  ["/refund-policy", 0.2, "yearly"],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await orEmpty(siteApi.blogSlugs(), [], "blog slugs");
  const entry = (path: string, priority: number, changeFrequency: Freq, lastModified?: string) => ({
    url: `${SITE_URL}${path}`,
    priority,
    changeFrequency,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    ...STATIC_PAGES.map(([path, priority, freq]) => entry(path, priority, freq)),
    ...getProgramStaticParams().map(({ slug }) => entry(`/programs/${slug}`, 0.8, "monthly")),
    ...Object.keys(labTypes).map((type) => entry(`/labs/${type}`, 0.6, "monthly")),
    ...Object.keys(roboticsLabCities).map((city) => entry(`/robotics-labs/${city}`, 0.5, "monthly")),
    ...Object.keys(stemLabCities).map((city) => entry(`/stem-labs/${city}`, 0.5, "monthly")),
    ...Object.keys(locationServices).map((slug) => entry(`/services/${slug}`, 0.5, "monthly")),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly", p.updatedAt)),
  ];
}
