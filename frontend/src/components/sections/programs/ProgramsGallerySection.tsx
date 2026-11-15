"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  {
    src: "/images/gallery/session-1.png",
    alt: "Students working on a robotics session in a STEMmantra lab",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery/session-3.png",
    alt: "Students programming robots in a school robotics lab",
    span: "",
  },
  {
    src: "/images/gallery/session-5.png",
    alt: "Teacher mentoring students during a STEM activity",
    span: "",
  },
  {
    src: "/images/gallery/session-7.png",
    alt: "Students collaborating on an innovation project",
    span: "",
  },
  {
    src: "/images/gallery/exhibition-1.png",
    alt: "Students presenting their STEM projects at an exhibition",
    span: "",
  },
  {
    src: "/images/gallery/exhibition-3.png",
    alt: "School students demonstrating robotics at a STEM exhibition",
    span: "",
  },
  {
    src: "/images/gallery/session-2.png",
    alt: "Students building and testing prototypes in a school lab",
    span: "",
  },
  {
    src: "/images/gallery/exhibition-5.png",
    alt: "Young innovators showcasing their projects at a school exhibition",
    span: "",
  },
];

export default function ProgramsGallerySection() {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Heading */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            From Our Schools
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Real Students.{" "}
            <span className="text-orange-500">Real Projects.</span> Real Learning.
          </h2>
          <p className="text-gray-500 text-base max-w-xl">
            Authentic moments from STEMmantra lab sessions and school
            implementations across India.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className={`relative overflow-hidden rounded-xl bg-gray-200 ${img.span}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
