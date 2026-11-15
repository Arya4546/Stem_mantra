// ============================================================
// STEMmantra Programs — Centralized Data Layer
// Based on: STEMmantra_Programs_Redesign_Brief.md
// ============================================================

export interface ProgramFAQ {
  question: string;
  answer: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  seoSubtitle: string;
  positioning: string;
  gradeRange: string;
  shortDescription: string;
  description: string;
  learningOutcomes: string[];
  techTags: string[];
  image: string;
  imageAlt: string;
  accentColor: string;
  accentBg: string;
  accentText: string;
  href: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  whatIsIt: string;
  curriculumApproach: string;
  infrastructure: string;
  implementationSteps: string[];
  faqs: ProgramFAQ[];
}

const rawPrograms: Program[] = [
  {
    id: "pre-tinkering-lab",
    slug: "pre-tinkering-lab",
    name: "Pre-Tinkering Lab",
    seoSubtitle: "Pre-Tinkering Lab for Schools",
    positioning: "Where curiosity begins.",
    gradeRange: "Grades 3–5",
    shortDescription:
      "A hands-on exploratory environment where younger learners discover how things work through building, simple machines, puzzles and guided experimentation.",
    description:
      "The Pre-Tinkering Lab introduces younger students to the joy of making and discovering. Through building blocks, simple machines, basic electronics, nature exploration and creative activities, students develop curiosity, observation skills and an early engineering mindset — all through play and guided experimentation.",
    learningOutcomes: [
      "Curiosity & observation",
      "Basic problem solving",
      "Making and building",
      "Collaboration",
      "Early engineering thinking",
      "Fine motor skills",
    ],
    techTags: ["Simple Machines", "Basic Electronics", "Building Blocks", "Nature Kits"],
    image: "/images/labs/pre-tinkering-lab.jpg",
    imageAlt:
      "Young Indian students working collaboratively with construction blocks and simple machines in a Pre-Tinkering Lab",
    accentColor: "border-orange-500",
    accentBg: "bg-orange-50",
    accentText: "text-orange-600",
    href: "/programs/pre-tinkering-lab",
    seoTitle: "Pre-Tinkering Lab for Schools | STEMmantra",
    metaDescription:
      "STEMmantra's Pre-Tinkering Lab helps Grades 3–5 students develop curiosity, observation and early engineering thinking through hands-on building, simple machines and guided experimentation.",
    h1: "Pre-Tinkering Lab — Hands-On Early STEM Exploration for Schools",
    whatIsIt:
      "The Pre-Tinkering Lab is a purpose-built exploratory learning environment for Grades 3–5. It introduces young learners to how things work through hands-on building activities, simple machines, beginner electronics, puzzles and nature exploration kits. The focus is on developing curiosity and the confidence to experiment.",
    curriculumApproach:
      "The curriculum uses activity-led, play-based learning where each session has a clear exploration goal. Students build, test, break and rebuild — developing an iterative mindset from an early age.",
    infrastructure:
      "The lab is designed as a bright, organized workspace with child-friendly workstations, material storage, display space for student creations, and dedicated zones for different activity types.",
    implementationSteps: [
      "Lab space design and setup",
      "Age-appropriate equipment supply",
      "Grade-wise curriculum handover",
      "Teacher enablement workshop",
      "First-session support and onboarding",
      "Ongoing curriculum and technical support",
    ],
    faqs: [
      {
        question: "Which grades is the Pre-Tinkering Lab designed for?",
        answer:
          "The Pre-Tinkering Lab is designed for students in Grades 3 to 5, typically ages 8–10. Activities are age-appropriate and focused on exploration rather than advanced technical skills.",
      },
      {
        question: "What equipment is included in a Pre-Tinkering Lab?",
        answer:
          "The lab typically includes construction kits, gear and wheel sets, simple machine models, basic circuit components, nature exploration tools and guided activity kits. The exact configuration depends on the school's requirements.",
      },
      {
        question: "How much space does a Pre-Tinkering Lab require?",
        answer:
          "We work with schools to design the lab within their available space. STEMmantra handles the layout planning as part of the setup process.",
      },
    ],
  },
  {
    id: "steamverse-lab",
    slug: "steamverse-lab",
    name: "STEAMverse Lab",
    seoSubtitle: "STEM & STEAM Innovation Lab for Schools",
    positioning: "Where ideas become inventions.",
    gradeRange: "Grades 3–12",
    shortDescription:
      "A multidisciplinary STEAM ecosystem combining science, technology, engineering, arts and mathematics through robotics, IoT, electronics, 3D printing and design thinking.",
    description:
      "The STEAMverse Lab is STEMmantra's flagship multidisciplinary STEAM learning environment. It brings together robotics, IoT, electronics, 3D printing, drone technology and design thinking into a single coherent learning ecosystem. Students across Grades 3–12 develop engineering design skills, scientific thinking and the ability to apply technology to real problems.",
    learningOutcomes: [
      "Engineering design",
      "Scientific thinking",
      "Creativity & prototyping",
      "Problem solving",
      "Collaboration",
      "Technology application",
      "Innovation mindset",
    ],
    techTags: ["Robotics", "IoT", "Electronics", "3D Printing", "Drones", "Design Thinking"],
    image: "/images/labs/steamverse-lab.jpg",
    imageAlt:
      "Indian middle-school students collaboratively building a robotic prototype in a STEAMverse STEM and STEAM innovation lab",
    accentColor: "border-teal-500",
    accentBg: "bg-teal-50",
    accentText: "text-teal-600",
    href: "/programs/steamverse-lab",
    seoTitle: "STEAMverse Lab — STEM & STEAM Innovation Lab for Schools | STEMmantra",
    metaDescription:
      "STEMmantra's STEAMverse Lab is a complete STEM and STEAM innovation lab for schools, combining robotics, IoT, electronics, 3D printing and design thinking for Grades 3–12.",
    h1: "STEAMverse Lab — STEM & STEAM Innovation Lab for Schools",
    whatIsIt:
      "The STEAMverse Lab is a multidisciplinary STEAM learning environment where students explore science, engineering, technology, arts and mathematics through practical project work. It combines robotics, electronics, sensors, microcontrollers, IoT, 3D printing, drones and design thinking into a coherent curriculum that scales from Grades 3 to 12.",
    curriculumApproach:
      "The curriculum is structured in progressive modules by grade level. Younger students build and explore. Older students design, code and prototype. Each grade level has clear learning objectives. The approach is project-based — students apply concepts to real or design challenges.",
    infrastructure:
      "The STEAMverse Lab includes purpose-designed workstations, electronics and component storage, a dedicated 3D printing zone, display and presentation space, and digital learning integration where applicable.",
    implementationSteps: [
      "School consultation and lab space design",
      "Equipment procurement and installation",
      "Grade-wise curriculum delivery",
      "Educator training and enablement",
      "First-month implementation support",
      "Ongoing curriculum and technical support",
    ],
    faqs: [
      {
        question: "What is the difference between a STEM lab and a STEAM lab?",
        answer:
          "A STEM lab focuses on science, technology, engineering and mathematics. A STEAM lab adds arts and design — including design thinking, visual communication and creative problem solving. The STEAMverse Lab is built around this broader, integrated STEAM approach.",
      },
      {
        question: "Which grades can use the STEAMverse Lab?",
        answer:
          "The STEAMverse Lab is designed for Grades 3–12. The curriculum and activities are differentiated by grade level.",
      },
      {
        question: "Does STEMmantra provide teacher training for the STEAMverse Lab?",
        answer:
          "Yes. Teacher enablement is a core part of STEMmantra's offering. We provide structured training so educators can confidently deliver the STEAMverse curriculum. Ongoing support is also available.",
      },
    ],
  },
  {
    id: "robotics-lab",
    slug: "robotics-lab",
    name: "Robotics Lab",
    seoSubtitle: "Robotics & Engineering Lab for Schools",
    positioning: "Build. Program. Test. Improve.",
    gradeRange: "Grades 4–12",
    shortDescription:
      "A progressive robotics learning environment where students move from understanding components to programming autonomous systems and real-world robotic projects.",
    description:
      "The Robotics Lab provides a structured, progressive learning pathway where students develop mechanical thinking, electronics knowledge, programming skills and engineering design abilities. Starting from understanding robot components and circuits, students progress through programming, sensor integration, automation and autonomous systems.",
    learningOutcomes: [
      "Mechanical thinking",
      "Electronics & sensors",
      "Programming & automation",
      "Engineering design",
      "Debugging & iteration",
      "Teamwork",
    ],
    techTags: ["Robotics", "Sensors", "Microcontrollers", "Programming", "Automation"],
    image: "/images/labs/robotics-lab.jpg",
    imageAlt:
      "Indian students assembling and programming educational robots at a professional workbench in a school Robotics Lab",
    accentColor: "border-blue-500",
    accentBg: "bg-blue-50",
    accentText: "text-blue-600",
    href: "/programs/robotics-lab",
    seoTitle: "Robotics Lab for Schools — Robotics & Engineering Learning | STEMmantra",
    metaDescription:
      "STEMmantra's Robotics Lab gives students in Grades 4–12 a hands-on robotics and engineering education — from components and circuits to programming, autonomous systems and real-world projects.",
    h1: "Robotics Lab — Robotics & Engineering Learning for Schools",
    whatIsIt:
      "The Robotics Lab is a dedicated robotics and engineering learning environment for school students. It takes students on a structured journey from understanding the basics of mechanics and electronics to building, programming and testing functional robots.",
    curriculumApproach:
      "The curriculum is progressive across grade levels. Students begin by understanding components and building simple mechanisms, then move to electronics, sensor integration, programming and finally to autonomous system design.",
    infrastructure:
      "The Robotics Lab includes professional workbenches, robotics kits, electronics components, sensors, motors, microcontrollers, programming tools, and display space for student projects.",
    implementationSteps: [
      "Lab space planning and setup",
      "Robotics equipment supply and installation",
      "Grade-wise curriculum handover",
      "Teacher enablement training",
      "Student onboarding sessions",
      "Ongoing support and competition guidance",
    ],
    faqs: [
      {
        question: "What does a school Robotics Lab include?",
        answer:
          "STEMmantra's Robotics Lab includes age-appropriate robotics kits, electronics components, sensors, motors, microcontrollers, programming tools and structured curriculum. The configuration is designed for your school's grade range and objectives.",
      },
      {
        question: "Which grades is the Robotics Lab suitable for?",
        answer:
          "The Robotics Lab is designed for Grades 4–12. Activities and complexity are differentiated by grade level.",
      },
      {
        question: "Can the Robotics Lab support competition preparation?",
        answer:
          "Yes. Where applicable, STEMmantra supports schools with competition readiness — including guidance on national robotics competitions and innovation challenges.",
      },
    ],
  },
  {
    id: "ai-coding-lab",
    slug: "ai-coding-lab",
    name: "AI & Coding Lab",
    seoSubtitle: "Artificial Intelligence & Coding Lab for Schools",
    positioning: "Build with code. Think with AI.",
    gradeRange: "Grades 5–12",
    shortDescription:
      "A future-ready technology learning environment where students develop programming, computational thinking and AI skills through Python, machine learning and real-world projects.",
    description:
      "The AI & Coding Lab provides students with a structured pathway into programming, computational thinking and artificial intelligence. Students learn Python, develop logical reasoning, explore machine learning concepts and apply computer vision techniques to real-world problems. Students build projects that demonstrate genuine understanding.",
    learningOutcomes: [
      "Computational thinking",
      "Python programming",
      "Artificial intelligence",
      "Machine learning basics",
      "Computer vision",
      "Data thinking",
      "Problem solving",
    ],
    techTags: ["Python", "AI", "Machine Learning", "Computer Vision", "Computational Thinking"],
    image: "/images/labs/ai-coding-lab.jpg",
    imageAlt:
      "Indian teenagers collaborating on Python and AI projects in a modern school AI and Coding Lab",
    accentColor: "border-violet-500",
    accentBg: "bg-violet-50",
    accentText: "text-violet-600",
    href: "/programs/ai-coding-lab",
    seoTitle: "AI & Coding Lab for Schools — Artificial Intelligence & Coding | STEMmantra",
    metaDescription:
      "STEMmantra's AI & Coding Lab gives students in Grades 5–12 hands-on experience in Python programming, machine learning, computer vision and artificial intelligence through real-world projects.",
    h1: "AI & Coding Lab — Artificial Intelligence & Coding Lab for Schools",
    whatIsIt:
      "The AI & Coding Lab is a technology learning environment where students develop programming and artificial intelligence skills through hands-on project work. Students learn Python, explore machine learning concepts, apply computer vision techniques and develop computational thinking.",
    curriculumApproach:
      "The curriculum begins with programming fundamentals and logical thinking, then progresses to data structures, Python projects, introduction to machine learning and computer vision applications.",
    infrastructure:
      "The AI & Coding Lab includes modern computer workstations, licensed software tools, AI and ML learning platforms, and teacher-facing dashboards where applicable.",
    implementationSteps: [
      "Lab hardware and software setup",
      "Curriculum delivery and teacher training",
      "Student onboarding and orientation",
      "Project milestone tracking",
      "Ongoing curriculum updates and support",
    ],
    faqs: [
      {
        question: "Does a student need prior coding experience for the AI & Coding Lab?",
        answer:
          "No. The curriculum is designed to accommodate students starting from scratch. The progression moves from fundamentals through to AI and machine learning.",
      },
      {
        question: "Which programming language does the AI & Coding Lab use?",
        answer:
          "The primary language is Python, which is widely used in data science, AI and machine learning. Foundational concepts of computational thinking are also developed.",
      },
      {
        question: "What is computer vision in the context of school learning?",
        answer:
          "Computer vision is a field of AI that enables computers to interpret visual information. In the AI & Coding Lab, students apply basic computer vision concepts through guided projects using accessible tools.",
      },
    ],
  },
  {
    id: "innoverse-lab",
    slug: "innoverse-lab",
    name: "Innoverse Lab",
    seoSubtitle: "Integrated Innovation & Technology Lab for Schools",
    positioning: "From concept to creation.",
    gradeRange: "Grades 3–12",
    shortDescription:
      "An integrated innovation environment bringing together robotics, coding, AI, electronics, IoT and prototyping through project-based problem solving.",
    description:
      "The Innoverse Lab brings together robotics, coding, AI, electronics, IoT, 3D design and prototyping into a single connected learning ecosystem. The central learning idea is Idea → Experiment → Prototype → Solution. Students develop an innovation mindset alongside practical technical skills through progressive project-based challenges.",
    learningOutcomes: [
      "Design thinking",
      "Prototyping",
      "Technology integration",
      "Problem solving",
      "Entrepreneurship mindset",
      "Collaboration",
      "Innovation",
    ],
    techTags: ["Robotics", "Coding", "AI", "IoT", "Electronics", "Prototyping"],
    image: "/images/labs/innoverse-lab.jpg",
    imageAlt:
      "Indian school students collaboratively transforming an idea into a physical prototype in the Innoverse innovation lab",
    accentColor: "border-purple-500",
    accentBg: "bg-purple-50",
    accentText: "text-purple-600",
    href: "/programs/innoverse-lab",
    seoTitle: "Innoverse Lab — Integrated Innovation & Technology Lab for Schools | STEMmantra",
    metaDescription:
      "STEMmantra's Innoverse Lab is an integrated innovation and technology lab for schools, combining robotics, coding, AI, IoT and prototyping through project-based learning for Grades 3–12.",
    h1: "Innoverse Lab — Integrated Innovation & Technology Lab for Schools",
    whatIsIt:
      "The Innoverse Lab is STEMmantra's comprehensive innovation environment — combining robotics, AI, coding, electronics, IoT and prototyping into a single learning ecosystem built around the innovation cycle: Idea → Experiment → Prototype → Solution.",
    curriculumApproach:
      "The curriculum is structured around challenge-based learning, where students identify problems and work through the full design-to-prototype cycle. Technology disciplines are integrated, not siloed.",
    infrastructure:
      "The Innoverse Lab is a fully equipped innovation workspace with robotics kits, electronics components, coding tools, IoT devices, prototyping materials and a flexible space layout that supports collaborative project work.",
    implementationSteps: [
      "Lab design and innovation space setup",
      "Comprehensive equipment and technology supply",
      "Challenge-based curriculum delivery",
      "Teacher and facilitator enablement",
      "Project exhibition and showcase support",
      "Ongoing innovation program support",
    ],
    faqs: [
      {
        question: "What makes the Innoverse Lab different from the STEAMverse Lab?",
        answer:
          "The STEAMverse Lab focuses on STEAM learning across disciplines. The Innoverse Lab is built specifically around the full innovation cycle — from idea through to prototype — and integrates all technology disciplines into project-based challenges.",
      },
      {
        question: "Is the Innoverse Lab suitable for younger students?",
        answer:
          "Yes. The curriculum is differentiated by grade level. Younger students work on simpler innovation challenges, while older students tackle more complex, multi-technology projects.",
      },
    ],
  },
  {
    id: "composite-skill-lab",
    slug: "composite-skill-lab",
    name: "Composite Skill Lab",
    seoSubtitle: "Composite Skill Lab & Practical Learning for Schools",
    positioning: "Skills for the world beyond school.",
    gradeRange: "Grades 6–12",
    shortDescription:
      "A multidisciplinary practical learning environment combining technology, engineering, design, making and hands-on skill development for school students.",
    description:
      "The Composite Skill Lab is a multidisciplinary practical learning environment that develops real-world skills through hands-on work in technology, engineering, design and fabrication. It helps secondary-school students develop practical competencies relevant beyond the classroom — building technical understanding, design sensibility and the ability to work with materials, tools and technology.",
    learningOutcomes: [
      "Practical skills",
      "Technical understanding",
      "Design & making",
      "Problem solving",
      "Career awareness",
      "Collaboration",
    ],
    techTags: ["Electronics", "Engineering", "Design", "Fabrication", "Practical Skills"],
    image: "/images/labs/composite-skill-lab.jpg",
    imageAlt:
      "Indian secondary school students working on practical multidisciplinary skill projects involving electronics, engineering and design in a Composite Skill Lab",
    accentColor: "border-amber-500",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    href: "/programs/composite-skill-lab",
    seoTitle: "Composite Skill Lab for Schools — Practical Skill Education | STEMmantra",
    metaDescription:
      "STEMmantra's Composite Skill Lab is a multidisciplinary practical learning environment for Grades 6–12, combining technology, engineering, design and hands-on skill development.",
    h1: "Composite Skill Lab — Practical Skill Learning for Schools",
    whatIsIt:
      "The Composite Skill Lab is a practical learning environment for secondary school students, providing hands-on experience across technology, engineering, design and fabrication — developing real-world skills that go beyond theoretical knowledge.",
    curriculumApproach:
      "The curriculum is structured around practical project work across multiple skill areas. Students apply technical knowledge to real tasks, developing understanding and the ability to work with tools, materials and technology.",
    infrastructure:
      "The Composite Skill Lab includes organized workstations, electronics and engineering equipment, design tools, fabrication materials, safety equipment and dedicated storage for materials and student projects.",
    implementationSteps: [
      "Lab space design and safe workspace setup",
      "Equipment and materials supply",
      "Curriculum delivery and teacher training",
      "Student skills assessment and tracking",
      "Ongoing support and curriculum updates",
    ],
    faqs: [
      {
        question: "What is a Composite Skill Lab?",
        answer:
          "A Composite Skill Lab is a multidisciplinary practical learning environment that develops hands-on skills in technology, engineering, design and fabrication for secondary school students.",
      },
      {
        question: "Which grades is the Composite Skill Lab for?",
        answer:
          "The Composite Skill Lab is designed for Grades 6–12, supporting students as they develop practical skills relevant to higher education and careers.",
      },
    ],
  },
  {
    id: "atal-tinkering-lab",
    slug: "atal-tinkering-lab",
    name: "Atal Tinkering Lab",
    seoSubtitle: "ATL Setup & School Innovation Ecosystem",
    positioning: "Create. Tinker. Innovate.",
    gradeRange: "Grades 6–12",
    shortDescription:
      "An end-to-end school innovation ecosystem including lab setup, equipment, curriculum support, teacher training, implementation and innovation project support.",
    description:
      "STEMmantra provides end-to-end support for establishing and running an Atal Tinkering Lab — from space design and equipment procurement through to curriculum support, teacher training, student mentorship and innovation project guidance. The goal is to create a genuinely functioning school innovation ecosystem.",
    learningOutcomes: [
      "Innovation mindset",
      "Design thinking",
      "Prototyping",
      "Problem solving",
      "Collaboration",
      "Entrepreneurship thinking",
    ],
    techTags: ["Robotics", "Electronics", "IoT", "3D Printing", "Innovation", "Prototyping"],
    image: "/images/labs/atal-tinkering-lab.jpg",
    imageAlt:
      "Indian students developing an innovation prototype using robotics and electronics in an Atal Tinkering Lab school environment",
    accentColor: "border-indigo-500",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-600",
    href: "/programs/atal-tinkering-lab",
    seoTitle: "Atal Tinkering Lab Setup for Schools | STEMmantra",
    metaDescription:
      "STEMmantra provides end-to-end Atal Tinkering Lab setup for schools — including space design, equipment, curriculum support, teacher training and ongoing innovation program support.",
    h1: "Atal Tinkering Lab — ATL Setup & School Innovation Ecosystem",
    whatIsIt:
      "An Atal Tinkering Lab is a school innovation space where students develop hands-on skills in robotics, electronics, IoT, 3D printing and design thinking. STEMmantra provides comprehensive end-to-end support — from initial design through to ongoing implementation support.",
    curriculumApproach:
      "The ATL curriculum is structured around innovation projects and challenges. Students identify real problems, develop concepts, prototype solutions and iterate on their designs. Teacher enablement and student mentorship are core components.",
    infrastructure:
      "The ATL setup includes lab space design, equipment procurement, installation, robotics kits, electronics, IoT devices, 3D printing capability, prototyping materials and organized storage for student projects.",
    implementationSteps: [
      "Lab space assessment and design",
      "Equipment specification and procurement",
      "Lab installation and setup",
      "Teacher training and enablement",
      "Student innovation program launch",
      "Ongoing curriculum and competition support",
    ],
    faqs: [
      {
        question: "What is an Atal Tinkering Lab?",
        answer:
          "An Atal Tinkering Lab (ATL) is a school innovation space established under the Atal Innovation Mission. It gives students in Grades 6–12 access to tools, technology and guided learning experiences that develop innovation, design thinking and problem-solving skills.",
      },
      {
        question: "What does STEMmantra provide for ATL setup?",
        answer:
          "STEMmantra provides comprehensive ATL support including lab space design, equipment procurement, installation, curriculum support, teacher training, student mentorship and innovation project guidance. Contact us for a detailed proposal.",
      },
      {
        question: "How long does it take to set up an Atal Tinkering Lab?",
        answer:
          "Setup timelines depend on lab size, school infrastructure and procurement requirements. We work with schools to plan realistically and communicate timelines clearly at the outset.",
      },
    ],
  },
];


const desiredOrder = [
  "steamverse-lab",
  "composite-skill-lab",
  "ai-coding-lab",
  "pre-tinkering-lab",
  "innoverse-lab",
  "atal-tinkering-lab",
  "robotics-lab"
];

export const programs: Program[] = [...rawPrograms].sort((a, b) => {
  const indexA = desiredOrder.indexOf(a.id);
  const indexB = desiredOrder.indexOf(b.id);
  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
});

export function getProgramBySlug(slug: string): Program | undefined {
  // Handle legacy slugs by mapping them to current ones
  const slugMap: Record<string, string> = {
    "atl-lab": "atal-tinkering-lab",
    "atl-labs": "atal-tinkering-lab",
    "stem-lab": "steamverse-lab",
    "stem-labs": "steamverse-lab",
    "robotics-labs": "robotics-lab",
  };
  
  const targetSlug = slugMap[slug] || slug;
  return programs.find((p) => p.slug === targetSlug);
}

export function getProgramStaticParams(): { slug: string }[] {
  return programs.map((p) => ({ slug: p.slug }));
}
