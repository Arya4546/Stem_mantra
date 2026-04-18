"use client";
import { galleryImages } from "@/data/gallery";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// Image Component for re-use
const GalleryImage = ({ image, className, customStyle = {} }: { image: any, className: string, customStyle?: any }) => (
  <motion.figure
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className={`relative group overflow-hidden bg-gray-100 rounded-3xl shadow-sm break-inside-avoid ${className}`}
    style={customStyle}
    itemProp="associatedMedia" itemScope itemType="https://schema.org/ImageObject"
  >
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      loading="lazy"
    />
  </motion.figure>
);


// Premium asymmetric layout components
const SessionSection = ({ images }: { images: any[] }) => {
  const [expanded, setExpanded] = useState(false);
  const displayImages = expanded ? images : images.slice(0, 5);

  return (
    <section className="py-20 border-t border-gray-100">
      <div className="mb-10 md:mb-16">
        <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">Hands-on Learning</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Session in Action</h2>
        <p className="text-lg text-gray-600 max-w-2xl">Witness the sheer joy of hands-on learning as our students actively build, code, and explore real-world robotics and IoT applications.</p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        <AnimatePresence mode="popLayout">
          {displayImages.map((image) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              className="w-full" 
            />
          ))}
        </AnimatePresence>
      </div>

      {images.length > 5 && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setExpanded(!expanded)} className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg">
            {expanded ? "Collapse Gallery" : "View All Sessions"}
          </button>
        </div>
      )}
    </section>
  );
};

const ExhibitionSection = ({ images }: { images: any[] }) => {
  const [expanded, setExpanded] = useState(false);
  const displayImages = expanded ? images : images.slice(0, 4);

  return (
    <section className="py-20 border-t border-gray-100">
      <div className="mb-10 md:mb-16">
        <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">Student Showcases</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">STEMmantra Exhibition</h2>
        <p className="text-lg text-gray-600 max-w-2xl">A spotlight on major academic showcases, fairs, and competitions where our young inventors proudly present their robust technological creations.</p>
      </div>

      {/* Masonry Layout for Exhibitions */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 mt-8">
         <AnimatePresence mode="popLayout">
          {displayImages.map((image) => (
             <GalleryImage 
              key={image.id} 
              image={image} 
              className="w-full" 
            />
          ))}
        </AnimatePresence>
      </div>

      {images.length > 4 && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setExpanded(!expanded)} className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg">
            {expanded ? "Collapse Gallery" : "Explore More Exhibitions"}
          </button>
        </div>
      )}
    </section>
  );
};

const MediaSection = ({ images }: { images: any[] }) => {
  const [expanded, setExpanded] = useState(false);
  const displayImages = expanded ? images : images.slice(0, 6);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 border-t border-gray-100">
      <div className="mb-10 md:mb-16 text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">Press & Coverage</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">STEMmantra In Media</h2>
        <p className="text-lg text-gray-600">Discover our impact across India, featured by esteemed publications and local media outlining our relentless push toward a digital educational future.</p>
      </div>

      {/* Structured Magazine Grid layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        <AnimatePresence mode="popLayout">
          {displayImages.map((image) => (
             <GalleryImage 
              key={image.id} 
              image={image} 
              className="w-full" 
            />
          ))}
        </AnimatePresence>
      </div>

       {images.length > 6 && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setExpanded(!expanded)} className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg">
            {expanded ? "Collapse Gallery" : "See More Press"}
          </button>
        </div>
      )}
    </section>
  );
};


export default function GalleryContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const sessionImages = galleryImages.filter(img => img.category === "Session in Action");
  const exhibitionImages = galleryImages.filter(img => img.category === "STEMmantra Exhibition");
  const mediaImages = galleryImages.filter(img => img.category === "STEMmantra In Media");

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 font-sans">
      <article ref={ref} className="mx-auto px-4 md:px-8 lg:px-16 max-w-screen-2xl">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center max-w-4xl mx-auto"
          itemScope itemType="https://schema.org/ImageGallery"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tighter">
            Our <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">Journeys</span> in Action
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
            A visual diary of empowerment. Step into our world of immersive education, grand exhibitions, and widespread inspiration.
          </p>
        </motion.header>

        {/* Categories mapped sequentially without tabs */}
        <SessionSection images={sessionImages} />
        {exhibitionImages.length > 0 && <ExhibitionSection images={exhibitionImages} />}
        {mediaImages.length > 0 && <MediaSection images={mediaImages} />}

      </article>
    </main>
  );
}