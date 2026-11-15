"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, MapPin, Search, X } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { initials } from "@/components/sections/testimonial-parts";
import type { ClientItem } from "@/types/site";

const PAGE = 12;

function ClientLogo({ client, className = "" }: { client: ClientItem; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {client.logo ? (
        <MediaImage media={client.logo} alt={`${client.name} logo`} variant="thumb" fill sizes="(min-width: 1024px) 300px, 45vw" className="object-contain" />
      ) : (
        <div aria-hidden className="absolute inset-0 m-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-teal-100 flex items-center justify-center text-2xl font-black text-orange-600">
          {initials(client.name)}
        </div>
      )}
    </div>
  );
}

function ClientCard({ client, onOpen }: { client: ClientItem; onOpen: () => void }) {
  const hasMore = (client.description?.length ?? 0) > 140 || Boolean(client.websiteUrl);
  return (
    <article className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden">
      <ClientLogo client={client} className="aspect-[3/2] m-6 mb-2" />
      <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 break-words" title={client.name}>
          {client.name}
        </h3>
        {client.location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="truncate">{client.location}</span>
          </p>
        )}
        {client.description && <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3 break-words">{client.description}</p>}
        {hasMore && (
          <button
            type="button"
            onClick={onOpen}
            className="mt-auto pt-4 self-start text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-4"
          >
            Read more<span className="sr-only"> about {client.name}</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default function ClientsContent({ clients }: { clients: ClientItem[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [openClient, setOpenClient] = useState<ClientItem | null>(null);
  const logoClients = useMemo(() => clients.filter((c) => c.isFeatured && c.logo), [clients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) => `${c.name} ${c.location ?? ""}`.toLowerCase().includes(q));
  }, [clients, query]);
  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Logo strip */}
      {logoClients.length > 0 && (
        <section className="py-20 overflow-hidden bg-transparent border-y border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide uppercase">Recognized By Industry Leaders</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="bg-white py-10">
            <LogoMarquee clients={logoClients} gapPx={48} secondsPerLogo={2.2} tileClassName="w-48 md:w-56 h-24 md:h-28 p-2" />
          </div>
        </section>
      )}

      {/* Client directory */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-transparent">
        <div className="w-full mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Esteemed Clients</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We empower visionary institutions with comprehensive STEM ecosystems. See who is leading the technological revolution in education.
            </p>
          </div>

          {clients.length > 8 && (
            <div className="max-w-md mx-auto mb-10 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="client-search" className="sr-only">Search schools</label>
              <input
                id="client-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(PAGE);
                }}
                placeholder="Search by school or city"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              {clients.length === 0 ? "Our client list is being updated." : `No schools match “${query}”.`}
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {shown.map((client) => (
                <ClientCard key={client.id} client={client} onOpen={() => setOpenClient(client)} />
              ))}
            </motion.div>
          )}

          {filtered.length > visible && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {shown.length} of {filtered.length}
              </p>
              <button
                onClick={() => setVisible((v) => v + PAGE)}
                className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm transition-colors"
              >
                Show more schools
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Details dialog (long descriptions) */}
      <Dialog.Root open={openClient !== null} onOpenChange={(open) => !open && setOpenClient(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in" />
          <Dialog.Content
            data-lenis-prevent
            className="fixed z-[151] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 focus:outline-none"
          >
            {openClient && (
              <>
                <Dialog.Close className="absolute right-4 top-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500" aria-label="Close">
                  <X className="w-5 h-5" />
                </Dialog.Close>
                <ClientLogo client={openClient} className="h-28 mb-6 mr-10" />
                <Dialog.Title className="text-2xl font-bold text-gray-900 break-words pr-6">{openClient.name}</Dialog.Title>
                {openClient.location && (
                  <p className="mt-1 flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-4 h-4 text-orange-500" /> {openClient.location}
                  </p>
                )}
                <Dialog.Description asChild>
                  <div className="mt-5 text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {openClient.description || "A valued STEMmantra partner school."}
                  </div>
                </Dialog.Description>
                {openClient.websiteUrl && (
                  <a
                    href={openClient.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors"
                  >
                    Visit website <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
