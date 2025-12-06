"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InfiniteScrollContainer from "@/components/ui/InfiniteScrollContainer";
import LoadingSkeleton, { EmptyState, ErrorState } from "@/components/ui/LoadingSkeleton";
import { X, ChevronLeft, ChevronRight, Download, Heart, Share2, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { apiClient, PaginatedResponse } from "@/lib/api";

// Gallery categories
const categories = [
  { id: "all", label: "All", emoji: "🎨" },
  { id: "atl-labs", label: "ATL Labs", emoji: "🔬" },
  { id: "robotics-labs", label: "Robotics Labs", emoji: "🤖" },
  { id: "stem-labs", label: "STEM Labs", emoji: "⚗️" },
  { id: "workshops", label: "Workshops", emoji: "🛠️" },
  { id: "events", label: "Events", emoji: "🎉" },
  { id: "student-projects", label: "Student Projects", emoji: "🏆" },
];

// Gallery image interface
interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  likes?: number;
  createdAt: string;
}

// Static gallery images for demo (when API is not available)
const staticImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
    title: "Students working on robotics project",
    category: "robotics-labs",
    tags: ["robotics", "teamwork", "learning"],
    likes: 42,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    title: "3D Printing workshop",
    category: "atl-labs",
    tags: ["3d-printing", "workshop", "innovation"],
    likes: 38,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    title: "Coding class in progress",
    category: "workshops",
    tags: ["coding", "programming", "education"],
    likes: 56,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    title: "Student presenting project",
    category: "student-projects",
    tags: ["presentation", "achievement", "innovation"],
    likes: 72,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
    title: "Electronics lab equipment",
    category: "stem-labs",
    tags: ["electronics", "stem", "technology"],
    likes: 31,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
    title: "AI & Machine Learning workshop",
    category: "workshops",
    tags: ["ai", "ml", "workshop"],
    likes: 89,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    title: "Robotics competition",
    category: "events",
    tags: ["competition", "robotics", "awards"],
    likes: 124,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
    title: "Team building robots",
    category: "robotics-labs",
    tags: ["teamwork", "robots", "building"],
    likes: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
    title: "3D printed models showcase",
    category: "student-projects",
    tags: ["3d-printing", "showcase", "creativity"],
    likes: 67,
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    title: "Circuit board assembly",
    category: "stem-labs",
    tags: ["circuits", "electronics", "assembly"],
    likes: 28,
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    title: "Science fair presentation",
    category: "events",
    tags: ["science-fair", "presentation", "awards"],
    likes: 93,
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    title: "ATL Lab inauguration",
    category: "atl-labs",
    tags: ["inauguration", "atl", "lab"],
    likes: 156,
    createdAt: new Date().toISOString(),
  },
];

// Mock fetch function (replace with actual API call when backend is ready)
const fetchGalleryImages = async (
  page: number,
  limit: number,
  category: string
): Promise<PaginatedResponse<GalleryImage>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Filter by category
  const filtered = category === "all" 
    ? staticImages 
    : staticImages.filter((img) => img.category === category);
  
  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const items = filtered.slice(startIndex, endIndex);
  
  return {
    items,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      hasMore: endIndex < filtered.length,
    },
  };
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  // Infinite scroll query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["gallery", selectedCategory],
    queryFn: ({ pageParam = 1 }) => fetchGalleryImages(pageParam, 8, selectedCategory),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });

  // Flatten all pages into single array
  const allImages = data?.pages.flatMap((page) => page.items) || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      let newIndex = direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;
      if (newIndex < 0) newIndex = allImages.length - 1;
      if (newIndex >= allImages.length) newIndex = 0;
      setLightboxIndex(newIndex);
    },
    [lightboxIndex, allImages.length]
  );

  const handleLike = (imageId: string) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
        toast.success("Removed from favorites");
      } else {
        newSet.add(imageId);
        toast.success("Added to favorites ❤️");
      }
      return newSet;
    });
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this amazing photo from STEM Mantra: ${image.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownload = async (image: GalleryImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `stemmantra-${image.title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    },
    [lightboxIndex, closeLightbox, navigateLightbox]
  );

  // Add keyboard listener
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                📸 Our Gallery
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Capturing
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}Moments of Innovation
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Explore our journey through labs, workshops, and amazing student projects. 
                Every image tells a story of curiosity, creativity, and breakthrough learning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-slate-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <LoadingSkeleton type="gallery" count={8} />
            ) : isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : allImages.length === 0 ? (
              <EmptyState
                icon={<span className="text-4xl">📷</span>}
                title="No images found"
                description="There are no images in this category yet. Check back soon!"
              />
            ) : (
              <InfiniteScrollContainer
                onLoadMore={() => fetchNextPage()}
                hasMore={hasNextPage || false}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
              >
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  layout
                >
                  <AnimatePresence mode="popLayout">
                    {allImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-200"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={image.thumbnail || image.url}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">
                            {image.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(image.id);
                              }}
                              className={`p-2 rounded-full transition-colors ${
                                likedImages.has(image.id)
                                  ? "bg-red-500 text-white"
                                  : "bg-white/20 text-white hover:bg-white/30"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(image);
                              }}
                              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Zoom indicator */}
                        <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </InfiniteScrollContainer>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[lightboxIndex].url}
                alt={allImages[lightboxIndex].title}
                width={1200}
                height={800}
                className="object-contain max-h-[70vh] rounded-lg"
                priority
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">
                      {allImages[lightboxIndex].title}
                    </h3>
                    {allImages[lightboxIndex].tags && (
                      <div className="flex flex-wrap gap-2">
                        {allImages[lightboxIndex].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(allImages[lightboxIndex].id)}
                      className={`p-3 rounded-full transition-colors ${
                        likedImages.has(allImages[lightboxIndex].id)
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedImages.has(allImages[lightboxIndex].id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleShare(allImages[lightboxIndex])}
                      className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(allImages[lightboxIndex])}
                      className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-xl px-4">
              {allImages.slice(Math.max(0, lightboxIndex - 3), lightboxIndex + 4).map((img, idx) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const realIndex = allImages.findIndex((i) => i.id === img.id);
                    setLightboxIndex(realIndex);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    allImages[lightboxIndex].id === img.id
                      ? "ring-2 ring-white scale-110"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.thumbnail || img.url}
                    alt={img.title}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
