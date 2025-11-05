"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaTimes } from "react-icons/fa";

const categories = [
  "All",
  "ATL Labs",
  "Robotics Labs",
  "STEM Labs",
  "Workshops",
  "Events",
  "Student Projects",
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    alt: "Students working on robotics project",
    category: "Robotics Labs",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    alt: "3D Printing workshop",
    category: "ATL Labs",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Coding class in progress",
    category: "Workshops",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Student presenting project",
    category: "Student Projects",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    alt: "Electronics lab equipment",
    category: "STEM Labs",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "AI & ML workshop",
    category: "Workshops",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    alt: "Robotics competition",
    category: "Events",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    alt: "Team working on robot",
    category: "Robotics Labs",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    alt: "3D printed models",
    category: "Student Projects",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    alt: "Circuit board assembly",
    category: "STEM Labs",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    alt: "Science fair presentation",
    category: "Events",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    alt: "ATL Lab setup",
    category: "ATL Labs",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (id: number) => {
    setLightboxImage(id);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage);
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) newIndex = filteredImages.length - 1;
    if (newIndex >= filteredImages.length) newIndex = 0;
    
    setLightboxImage(filteredImages[newIndex].id);
  };

  const currentLightboxImage = filteredImages.find((img) => img.id === lightboxImage);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 blur-bg" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full filter blur-3xl" />
          
          <div className="container relative mx-auto px-4 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">Gallery</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                Explore our world of innovation, learning, and creativity
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 glass sticky top-20 z-40 border-b border-indigo-100">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300 hover:scale-105"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  onClick={() => openLightbox(image.id)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold">{image.alt}</p>
                      <p className="text-indigo-200 text-sm">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">
                  No images found in this category
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage !== null && currentLightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={currentLightboxImage.src}
                  alt={currentLightboxImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-white text-xl font-semibold mb-2">
                  {currentLightboxImage.alt}
                </p>
                <p className="text-blue-300">{currentLightboxImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
