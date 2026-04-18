"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Inline SVG gear icon matching the brochure exactly */
function GearsSvg() {
  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[90px] md:max-w-[140px] h-auto"
    >
      {/* Large gear (left) */}
      <g>
        <path
          d="M52,22 L56,10 L64,10 L68,22 L78,18 L82,8 L90,12 L86,24 L94,32 L106,28 L110,36 L98,40 L100,50 L112,54 L110,62 L98,60 L94,70 L106,78 L100,84 L90,76 L82,82 L86,94 L78,96 L74,84 L64,86 L62,98 L54,96 L56,84 L46,78 L34,84 L30,76 L42,70 L38,60 L26,62 L24,54 L36,50 L34,40 L22,36 L26,28 L38,32 L46,24 L42,12 L50,8 L52,22Z"
          fill="#3d5a80"
          stroke="#2c4a6e"
          strokeWidth="1"
        />
        <circle cx="67" cy="52" r="16" fill="white" stroke="#3d5a80" strokeWidth="2" />
      </g>

      {/* Small gear (right) */}
      <g transform="translate(6, 0)">
        <path
          d="M100,50 L103,42 L108,42 L111,50 L118,47 L120,40 L125,43 L122,50 L128,56 L135,54 L137,59 L130,61 L131,68 L138,70 L137,75 L130,74 L127,80 L134,85 L130,89 L124,83 L119,87 L121,94 L116,96 L114,88 L108,90 L107,97 L102,96 L103,88 L97,84 L90,88 L87,83 L94,79 L92,72 L84,71 L84,66 L92,65 L93,58 L86,55 L88,50 L95,52 L100,50Z"
          fill="#5a7fa5"
          stroke="#3d5a80"
          strokeWidth="1"
        />
        <circle cx="111" cy="70" r="11" fill="white" stroke="#3d5a80" strokeWidth="2" />
      </g>

      {/* Teal check circle (center overlap) */}
      <circle cx="82" cy="58" r="22" fill="#5bc0be" />
      <circle cx="82" cy="58" r="19" fill="#5bc0be" />
      {/* Checkmark */}
      <polyline
        points="72,58 79,66 94,50"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small decorative dots */}
      <circle cx="52" cy="20" r="2.5" fill="#5a7fa5" opacity="0.5" />
      <circle cx="60" cy="15" r="2" fill="#f97316" opacity="0.6" />
      <circle cx="68" cy="18" r="2.5" fill="#5a7fa5" opacity="0.5" />
      <circle cx="76" cy="14" r="2" fill="#f97316" opacity="0.6" />

      <circle cx="60" cy="98" r="2.5" fill="#5a7fa5" opacity="0.5" />
      <circle cx="68" cy="102" r="2" fill="#f97316" opacity="0.6" />
      <circle cx="76" cy="100" r="2.5" fill="#5a7fa5" opacity="0.5" />
      <circle cx="84" cy="103" r="2" fill="#f97316" opacity="0.6" />
    </svg>
  );
}

export default function ExecutionModeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="w-full pt-16 lg:pt-24 pb-8 lg:pb-12 bg-white overflow-hidden"
    >
      <div className="mx-auto px-2 md:px-8 lg:px-16 max-w-6xl">

        {/* EXECUTION heading — orange, bold, underlined */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-black text-orange-500 mb-12 tracking-tight pl-2"
          style={{
            textDecoration: "underline",
            textDecorationColor: "#f97316",
            textUnderlineOffset: "6px",
            textDecorationThickness: "3px",
          }}
        >
          EXECUTION
        </motion.h3>

        {/* Main diagram container - Using a mathematical grid layout to guarantee perfect dashed-line alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex flex-col items-center w-full max-w-[1000px] mx-auto pb-2"
        >
          {/* Top Box ("Mode of Execution") */}
          {/* We calculate width exactly. If left/right columns are 34%, their centers sit exactly at 17% and 83% of the container. 83-17 = 66%. Thus, a 66% width top box guarantees edges align perfectly with column centers regardless of screen size. */}
          <div className="relative w-[66%] flex justify-center z-10">
            {/* Outline box */}
            <div className="w-full border-[3px] border-solid border-[#555] border-l-dashed border-r-dashed bg-white py-4 md:py-6 shadow-sm">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[42px] font-bold text-gray-900 text-center tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Mode of Execution
              </h2>
            </div>
            
            {/* Dashed lines attached to left and right edges */}
            <div className="absolute left-[0px] md:left-[-1.5px] top-[100%] h-[40px] md:h-[60px] border-l-[2px] md:border-l-[3px] border-dashed border-[#888]"></div>
            <div className="absolute right-[0px] md:right-[-1.5px] top-[100%] h-[40px] md:h-[60px] border-l-[2px] md:border-l-[3px] border-dashed border-[#888]"></div>
          </div>

          {/* Bottom Row */}
          <div className="flex w-full mt-[40px] md:mt-[60px] items-start">
            
            {/* Left Box (34% width) */}
            <div className="w-[34%] flex flex-col items-center px-1 lg:px-4">
              <div className="w-full border-[3px] md:border-[4px] border-[#f97316] rounded-lg md:rounded-xl bg-white px-2 md:px-6 py-4 md:py-8 text-center shadow-sm">
                <span className="text-[14px] sm:text-lg md:text-2xl lg:text-[26px] font-bold text-gray-900 leading-snug md:leading-tight block" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  Lead by<br/>STEMMANTRA<br/>Team
                </span>
              </div>
              <div className="my-2 md:my-3">
                <div className="h-[20px] md:h-[40px] border-l-[2px] md:border-l-[3px] border-dashed border-[#888]"></div>
              </div>
              <p className="text-center text-gray-700 text-[10px] sm:text-xs md:text-base lg:text-lg font-medium leading-snug md:leading-relaxed">
                STEMMANTRA Engineer will visit school to conduct session for the students as per given time schedule.
              </p>
            </div>

            {/* Center Gear (32% width) */}
            <div className="w-[32%] flex flex-col items-center justify-start -mt-2 md:-mt-6">
              <GearsSvg />
              <div className="mt-2 md:mt-4">
                <div className="h-[40px] md:h-[100px] border-l-[2px] md:border-l-[3px] border-dashed border-orange-500"></div>
              </div>
            </div>

            {/* Right Box (34% width) */}
            <div className="w-[34%] flex flex-col items-center px-1 lg:px-4">
              <div className="w-full border-[3px] md:border-[4px] border-[#f97316] rounded-lg md:rounded-xl bg-white px-2 md:px-6 py-4 md:py-8 text-center shadow-sm">
                <span className="text-[14px] sm:text-lg md:text-2xl lg:text-[26px] font-bold text-gray-900 leading-snug md:leading-tight block" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                  Lead by<br/>School<br/>Teachers
                </span>
              </div>
              <div className="my-2 md:my-3">
                <div className="h-[20px] md:h-[40px] border-l-[2px] md:border-l-[3px] border-dashed border-[#888]"></div>
              </div>
              <p className="text-center text-gray-700 text-[10px] sm:text-xs md:text-base lg:text-lg font-medium leading-snug md:leading-relaxed">
                STEMMANTRA Engineer will train school teachers &amp; school teachers will conduct sessions for students.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
