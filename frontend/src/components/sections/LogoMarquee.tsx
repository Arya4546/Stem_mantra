import MediaImage from "@/components/ui/MediaImage";
import type { ClientItem } from "@/types/site";

/**
 * Infinite, CSS-only logo strip (pauses on hover, static for reduced-motion users).
 * Works for any number of logos: short lists are repeated so the strip never shows a gap.
 */
export default function LogoMarquee({
  clients,
  tileClassName = "w-40 h-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-4",
  gapPx = 40,
  secondsPerLogo = 2.5,
}: {
  clients: ClientItem[];
  tileClassName?: string;
  gapPx?: number;
  secondsPerLogo?: number;
}) {
  const withLogo = clients.filter((c) => c.logo);
  if (withLogo.length === 0) return null;

  const repeat = Math.max(1, Math.ceil(12 / withLogo.length));
  const lane = Array.from({ length: repeat }, () => withLogo).flat();
  const duration = Math.max(20, lane.length * secondsPerLogo);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max animate-logo-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          // Each copy carries the gap as right padding so the -50% loop is seamless.
          <ul key={copy} className="flex" style={{ gap: gapPx, paddingRight: gapPx }} aria-hidden={copy === 1 ? true : undefined}>
            {lane.map((client, i) => {
              const primary = copy === 0 && i < withLogo.length;
              return (
                <li
                  key={`${client.id}-${i}`}
                  aria-hidden={primary ? undefined : true}
                  title={client.name}
                  className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-orange-200 ${tileClassName}`}
                >
                  <div className="relative w-full h-full">
                    <MediaImage
                      media={client.logo!}
                      alt={primary ? `${client.name} logo` : ""}
                      variant="thumb"
                      fill
                      sizes="224px"
                      className="object-contain"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
