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
