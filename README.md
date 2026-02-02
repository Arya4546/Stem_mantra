# STEMmantra - Educational Platform

A modern, SEO-optimized educational platform for STEMmantra - a premier robotics and STEM education organization.

> **Master The Skills "Drive Your Future..."**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-316192?style=flat-square&logo=postgresql)

## 🏗️ Project Structure

```
stem-mantra/
├── frontend/              # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities
│   │   └── data/          # Static data
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Express middleware
│   │   └── config/        # Configuration
│   ├── prisma/            # Database schema & migrations
│   └── package.json
│
├── package.json           # Root package.json with workspace scripts
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Lenis** (Smooth Scrolling)

### Backend
- **Node.js** with **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

## 🛠️ Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Arya4546/Stem_mantra.git
cd Stem_mantra

# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Database Setup

```bash
# Create PostgreSQL database (using psql or pgAdmin)
CREATE DATABASE stem_mantra_db;

# Update backend/.env with your database credentials
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/stem_mantra_db?schema=public"

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Seed with sample data
npm run db:seed
```

### 3. Start Development

```bash
# Run both frontend and backend
npm run dev

# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend & backend in dev mode |
| `npm run dev:frontend` | Start only frontend (port 3000) |
| `npm run dev:backend` | Start only backend (port 5000) |
| `npm run build` | Build both projects |
| `npm run start` | Start both in production mode |
| `npm run install:all` | Install dependencies in all workspaces |
| `npm run setup` | Full setup (install + db generate) |

### Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database (no migration) |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and run migrations |

### Quality Commands

| Command | Description |
|---------|-------------|
| `npm run lint` | Run linting on both projects |
| `npm run type-check` | TypeScript type checking |
| `npm run clean` | Remove node_modules and build folders |

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login |
| GET | `/auth/profile` | Get user profile (protected) |
| PUT | `/auth/profile` | Update profile (protected) |

### Programs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/programs` | List all programs |
| GET | `/programs/featured` | Get featured programs |
| GET | `/programs/:slug` | Get program by slug |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Submit contact form |
| GET | `/contact` | Get all submissions (admin) |

## 🎨 Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, programs, testimonials |
| `/about` | About STEMmantra |
| `/programs/atl-labs` | ATL Labs Program |
| `/programs/robotics-lab` | Robotics Lab Program |
| `/programs/stem-lab` | STEM Lab Program |
| `/gallery` | Photo Gallery |
| `/contact` | Contact Form |

## 🔐 Security Features

- ✅ JWT-based authentication with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ Rate limiting (general, auth, contact)
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Input validation with express-validator

## 📊 Database Schema

| Model | Description |
|-------|-------------|
| User | User accounts with roles (Admin, Teacher, Student, etc.) |
| School | School management with types (CBSE, ICSE, etc.) |
| Program | STEM programs (ATL Lab, Robotics, AI/ML, etc.) |
| Course | Individual courses within programs |
| Enrollment | Student enrollments |
| ContactSubmission | Contact form entries |
| LabSetup | Lab installation tracking |

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/stem_mantra_db?schema=public"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - STEMmantra

## 📞 Contact

- **Address**: C-104 2nd Floor, Noida Sec-10, UP – 201301
- **Phone**: +91-6356631515
- **Website**: [stemmantra.com](https://stemmantra.com)

---

**Built with ❤️ by STEMmantra Team**
