import Image, { type ImageProps } from "next/image";
import type { Media } from "@/types/site";

type MediaImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL"> & {
  media: Media;
  alt: string;
  /** "thumb" uses the 640px variant of uploaded images (grids, cards). */
  variant?: "thumb" | "full";
};

/** Uploaded images are already resized WebP files streamed from Backblaze. */
export const isUploadedMedia = (url: string) => url.startsWith("/media/");

/**
 * Renders a gallery/client/testimonial/blog image coming from the API.
 * • Photos shipped in /public are resized + converted by the Next.js image optimiser.
 * • Admin uploads (/media/...) are served as-is (they already have a WebP thumbnail).
 * Both get a blurred placeholder while loading.
 */
export default function MediaImage({ media, alt, variant = "full", fill, ...rest }: MediaImageProps) {
  const uploaded = isUploadedMedia(media.url);
  const src = uploaded && variant === "thumb" && media.thumbUrl ? media.thumbUrl : media.url;
  const size = fill ? {} : { width: media.width ?? 1200, height: media.height ?? 900 };

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      unoptimized={uploaded}
      placeholder={media.blurDataUrl ? "blur" : "empty"}
      blurDataURL={media.blurDataUrl ?? undefined}
      {...size}
      {...rest}
    />
  );
}
