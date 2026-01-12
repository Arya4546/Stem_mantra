import { PrismaClient, UserRole, UserStatus, ProgramType, ProgramStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stemmantra.com' },
    update: {},
    create: {
      email: 'admin@stemmantra.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'STEM Mantra',
      phone: '+91-6356631515',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
  });
  console.log(`✅ Created admin user: ${admin.email}`);

  // Create programs
  const programs = [
    {
      name: 'Atal Tinkering Lab (ATL)',
      slug: 'atl-labs',
      type: ProgramType.ATL_LAB,
      description: 'NITI Aayog initiative to set up state-of-the-art innovation workspaces in schools. Our ATL Labs come equipped with cutting-edge technology, robotics kits, 3D printers, IoT devices, and comprehensive curriculum aligned with NEP 2020.',
      shortDescription: 'Complete ATL Lab setup with training and curriculum support',
      duration: '1 Year',
      price: 500000,
      discountPrice: 450000,
      features: [
        '3D Printers & Scanners',
        'Robotics Kits',
        'Electronics & IoT Tools',
        'Teacher Training',
        'Curriculum Support',
        'Annual Maintenance',
      ],
      isFeatured: true,
      status: ProgramStatus.ACTIVE,
    },
    {
      name: 'Robotics & AI Lab',
      slug: 'robotics-lab',
      type: ProgramType.ROBOTICS_LAB,
      description: 'Advanced robotics and artificial intelligence laboratory for schools. Includes programmable robots, AI/ML kits, computer vision tools, and project-based curriculum designed for students from grades 4-12.',
      shortDescription: 'Complete Robotics & AI Lab with hands-on learning kits',
      duration: '1 Year',
      price: 400000,
      discountPrice: 360000,
      features: [
        'Programmable Robots',
        'AI/ML Development Kits',
        'Computer Vision Tools',
        'Project-Based Curriculum',
        'Competition Preparation',
        'Teacher Certification',
      ],
      isFeatured: true,
      status: ProgramStatus.ACTIVE,
    },
    {
      name: 'STEM Innovation Lab',
      slug: 'stem-lab',
      type: ProgramType.STEM_LAB,
      description: 'Comprehensive STEM lab focusing on science, technology, engineering, and mathematics. Perfect for schools wanting to implement NEP 2020 guidelines with hands-on experiential learning.',
      shortDescription: 'Complete STEM Lab for holistic science education',
      duration: '1 Year',
      price: 350000,
      discountPrice: 315000,
      features: [
        'Science Experiment Kits',
        'Engineering Models',
        'Mathematics Manipulatives',
        'Technology Integration',
        'Project Ideas Bank',
        'Assessment Tools',
      ],
      isFeatured: true,
      status: ProgramStatus.ACTIVE,
    },
    {
      name: 'Coding for Kids',
      slug: 'coding-for-kids',
      type: ProgramType.CODING,
      description: 'Age-appropriate coding curriculum for young learners. From block-based programming with Scratch to Python and web development, we make coding fun and accessible.',
      shortDescription: 'Fun and engaging coding courses for students',
      duration: '6 Months',
      price: 15000,
      discountPrice: 12000,
      features: [
        'Block-Based Programming',
        'Python Fundamentals',
        'Web Development Basics',
        'Game Development',
        'Project Portfolio',
        'Certificate',
      ],
      isFeatured: false,
      status: ProgramStatus.ACTIVE,
    },
    {
      name: 'IoT & Electronics',
      slug: 'iot-electronics',
      type: ProgramType.IOT,
      description: 'Learn Internet of Things and electronics with Arduino, ESP32, sensors, and real-world projects. Perfect for students interested in building smart devices.',
      shortDescription: 'Build smart devices with IoT and electronics',
      duration: '4 Months',
      price: 18000,
      discountPrice: 15000,
      features: [
        'Arduino Programming',
        'Sensor Integration',
        'WiFi & Bluetooth',
        'Smart Home Projects',
        'Cloud Connectivity',
        'Take-Home Kit',
      ],
      isFeatured: false,
      status: ProgramStatus.ACTIVE,
    },
    {
      name: 'AI & Machine Learning',
      slug: 'ai-ml',
      type: ProgramType.AI_ML,
      description: 'Introduction to artificial intelligence and machine learning for school students. Covers basic concepts, practical applications, and hands-on projects.',
      shortDescription: 'Learn AI and Machine Learning fundamentals',
      duration: '6 Months',
      price: 25000,
      discountPrice: 20000,
      features: [
        'AI Fundamentals',
        'Machine Learning Basics',
        'Image Recognition',
        'Natural Language Processing',
        'Chatbot Development',
        'Real-World Projects',
      ],
      isFeatured: true,
      status: ProgramStatus.ACTIVE,
    },
  ];

  for (const program of programs) {
    const created = await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program,
    });
    console.log(`✅ Created program: ${created.name}`);
  }

  // Create Product Categories
  const categories = [
    { name: 'Robotics Kits', slug: 'robotics-kits', description: 'Complete robotics kits for students and schools' },
    { name: 'Electronics', slug: 'electronics', description: 'Electronic components and kits' },
    { name: '3D Printing', slug: '3d-printing', description: '3D printers and accessories' },
    { name: 'Learning Materials', slug: 'learning-materials', description: 'Books, guides, and educational content' },
    { name: 'Lab Equipment', slug: 'lab-equipment', description: 'Equipment for science and STEM labs' },
  ];

  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log(`✅ Created category: ${category.name}`);
  }

  // Create Products
  const products = [
    {
      name: 'Arduino Starter Kit',
      slug: 'arduino-starter-kit',
      sku: 'ARD-001',
      type: 'PHYSICAL' as const,
      status: 'ACTIVE' as const,
      price: 2999,
      compareAtPrice: 3499,
      shortDescription: 'Complete Arduino starter kit with components and tutorials',
      description: 'Get started with electronics and programming with our comprehensive Arduino Starter Kit. Includes Arduino Uno, breadboard, LEDs, sensors, motors, and detailed project guides.',
      features: ['Arduino Uno R3', '65+ Jump Wires', 'USB Cable', 'Breadboard', 'LEDs & Resistors', '10 Project Guides'],
      trackInventory: true,
      quantity: 100,
      isFeatured: true,
      isNew: true,
    },
    {
      name: 'Robotics Builder Pro Kit',
      slug: 'robotics-builder-pro',
      sku: 'RBT-001',
      type: 'PHYSICAL' as const,
      status: 'ACTIVE' as const,
      price: 7999,
      compareAtPrice: 9999,
      shortDescription: 'Advanced robotics kit for building programmable robots',
      description: 'Build and program your own robots with our Robotics Builder Pro Kit. Includes motors, sensors, microcontroller, structural components, and programming tutorials.',
      features: ['Servo Motors', 'Ultrasonic Sensors', 'IR Sensors', 'Microcontroller', 'Building Blocks', 'Programming Guide'],
      trackInventory: true,
      quantity: 50,
      isFeatured: true,
      isBestSeller: true,
    },
    {
      name: 'Python Programming Course',
      slug: 'python-programming-course',
      sku: 'CRS-PY01',
      type: 'DIGITAL' as const,
      status: 'ACTIVE' as const,
      price: 1999,
      compareAtPrice: 2999,
      shortDescription: 'Learn Python programming from scratch',
      description: 'Comprehensive Python programming course designed for beginners. Learn variables, loops, functions, OOP, and build real projects.',
      features: ['50+ Video Lessons', 'Practice Exercises', 'Project Files', 'Certificate', 'Lifetime Access'],
      accessDuration: 365,
      isFeatured: true,
    },
    {
      name: 'IoT Sensor Kit',
      slug: 'iot-sensor-kit',
      sku: 'IOT-001',
      type: 'PHYSICAL' as const,
      status: 'ACTIVE' as const,
      price: 4999,
      compareAtPrice: 5999,
      shortDescription: 'Complete IoT sensor kit with ESP32',
      description: 'Build smart IoT projects with our comprehensive sensor kit. Includes ESP32, various sensors, display, and cloud connectivity tutorials.',
      features: ['ESP32 Board', 'Temperature Sensor', 'Humidity Sensor', 'OLED Display', 'Motion Sensor', 'Cloud Tutorials'],
      trackInventory: true,
      quantity: 75,
      isFeatured: false,
      isNew: true,
    },
    {
      name: 'AI & Machine Learning E-Book Bundle',
      slug: 'ai-ml-ebook-bundle',
      sku: 'EBK-AI01',
      type: 'DIGITAL' as const,
      status: 'ACTIVE' as const,
      price: 999,
      compareAtPrice: 1999,
      shortDescription: 'Collection of AI and ML learning resources',
      description: 'Comprehensive e-book bundle covering artificial intelligence and machine learning fundamentals. Perfect for students and educators.',
      features: ['5 E-Books', 'PDF Format', 'Code Examples', 'Practice Datasets', 'Instant Download'],
      isFeatured: false,
    },
    {
      name: 'STEM Lab Complete Package',
      slug: 'stem-lab-complete',
      sku: 'LAB-001',
      type: 'BUNDLE' as const,
      status: 'ACTIVE' as const,
      price: 149999,
      compareAtPrice: 179999,
      shortDescription: 'Complete STEM lab setup for schools',
      description: 'Everything you need to set up a professional STEM lab. Includes equipment, furniture, curriculum, and training support.',
      features: ['Lab Equipment', 'Workstations', 'Curriculum Materials', 'Teacher Training', 'Installation Support', '1 Year Warranty'],
      trackInventory: true,
      quantity: 10,
      isFeatured: true,
      isBestSeller: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`✅ Created product: ${product.name}`);
  }

  // Create Testimonials
  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      designation: 'Principal',
      schoolName: 'St. Thomas Girls School, Delhi',
      content: 'STEM Mantra has transformed our school\'s science education. The ATL Lab setup was professional and the ongoing support has been exceptional. Our students are now winning robotics competitions!',
      rating: 5,
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Rajesh Kumar',
      designation: 'Science Teacher',
      schoolName: 'DAV Public School, Noida',
      content: 'The training provided by STEM Mantra helped me become confident in teaching robotics. The curriculum is well-designed and students love the hands-on approach.',
      rating: 5,
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Mrs. Anjali Gupta',
      designation: 'Director',
      schoolName: 'Modern Academy, Gurgaon',
      content: 'We chose STEM Mantra for our robotics lab setup and it was the best decision. The equipment quality is excellent and the support team is always helpful.',
      rating: 5,
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Amit Singh',
      designation: 'Parent',
      schoolName: 'Delhi Public School, Faridabad',
      content: 'My son has developed a passion for coding and robotics after joining the STEM Mantra program. The teachers are knowledgeable and make learning fun.',
      rating: 5,
      isApproved: true,
      isFeatured: false,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.name.toLowerCase().replace(/[^a-z]/g, '-') + '-testimonial' },
      update: {},
      create: testimonial,
    });
    console.log(`✅ Created testimonial: ${testimonial.name}`);
  }

  // Create FAQs
  const faqs = [
    {
      question: 'What is STEM education?',
      answer: 'STEM education is an interdisciplinary approach that integrates Science, Technology, Engineering, and Mathematics into a cohesive learning paradigm. It emphasizes hands-on, project-based learning that prepares students for real-world challenges.',
      category: 'General',
      sortOrder: 1,
    },
    {
      question: 'How long does it take to set up an ATL Lab?',
      answer: 'A typical ATL Lab setup takes 4-6 weeks from order confirmation. This includes equipment procurement, installation, teacher training, and curriculum integration.',
      category: 'Lab Setup',
      sortOrder: 2,
    },
    {
      question: 'Do you provide teacher training?',
      answer: 'Yes, we provide comprehensive teacher training as part of all our lab setup packages. This includes hands-on workshops, curriculum training, and ongoing support.',
      category: 'Training',
      sortOrder: 3,
    },
    {
      question: 'What age groups are your programs suitable for?',
      answer: 'Our programs are designed for students from grades 4-12 (ages 9-18). We have different curriculum levels tailored to each age group.',
      category: 'Programs',
      sortOrder: 4,
    },
    {
      question: 'Do you offer online courses?',
      answer: 'Yes, we offer online courses in coding, robotics, and AI/ML. These courses include video lessons, interactive exercises, and project-based assessments.',
      category: 'Programs',
      sortOrder: 5,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    });
    console.log(`✅ Created FAQ: ${faq.question.substring(0, 30)}...`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
