# STEM Mantra Backend

Professional Node.js backend API for STEM Mantra educational platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Logging**: Winston

## Prerequisites

Before running the backend, ensure you have:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v13 or higher) - either installed locally or via pgAdmin
3. **npm** or **yarn**

## Database Setup

### Step 1: Start PostgreSQL

Make sure PostgreSQL is running on `localhost:5432`.

### Step 2: Create Database

Open pgAdmin or psql and create a new database:

```sql
CREATE DATABASE stem_mantra_db;
```

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env` (if not already done)
2. Update the `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/stem_mantra_db?schema=public"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### Step 4: Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

Or push the schema directly:

```bash
npx prisma db push
```

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Base URL
- Development: `http://localhost:5000/api/v1`

### Health Check
- `GET /api/v1/health` - Check if API is running

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get current user profile (protected)
- `PUT /api/v1/auth/profile` - Update user profile (protected)
- `PUT /api/v1/auth/change-password` - Change password (protected)
- `POST /api/v1/auth/refresh` - Refresh access token

### Contact
- `POST /api/v1/contact` - Submit contact form (public)
- `GET /api/v1/contact` - Get all contact submissions (admin)
- `GET /api/v1/contact/:id` - Get single submission (admin)
- `PATCH /api/v1/contact/:id/status` - Update status (admin)
- `DELETE /api/v1/contact/:id` - Delete submission (admin)

### Programs
- `GET /api/v1/programs` - Get all programs
- `GET /api/v1/programs/featured` - Get featured programs
- `GET /api/v1/programs/type/:type` - Get programs by type
- `GET /api/v1/programs/slug/:slug` - Get program by slug
- `GET /api/v1/programs/:id` - Get program by ID

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/
│   │   ├── database.ts     # Prisma client singleton
│   │   └── index.ts        # Configuration module
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── contact.controller.ts
│   │   └── program.controller.ts
│   ├── middlewares/
│   │   ├── auth.ts         # JWT authentication
│   │   ├── errorHandler.ts # Global error handling
│   │   ├── rateLimiter.ts  # Rate limiting
│   │   └── validate.ts     # Request validation
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── program.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── contact.service.ts
│   │   └── program.service.ts
│   ├── utils/
│   │   ├── errors.ts       # Custom error classes
│   │   ├── logger.ts       # Winston logger
│   │   └── response.ts     # API response helpers
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   └── contact.validator.ts
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json
└── tsconfig.json
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | Access token expiry | 7d |
| `JWT_REFRESH_SECRET` | Refresh token secret | - |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | 30d |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name your_migration_name

# Push schema to database (no migration)
npx prisma db push

# Open Prisma Studio (GUI for database)
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Troubleshooting

### Database Connection Failed
1. Ensure PostgreSQL is running on localhost:5432
2. Verify database `stem_mantra_db` exists
3. Check username and password in DATABASE_URL

### Prisma Client Not Generated
Run:
```bash
npx prisma generate
```

### Port Already in Use
Change the PORT in `.env` file or kill the process using the port.

## Security Features

- **Helmet.js** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Protect against brute-force attacks
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing
- **Input Validation** - express-validator

## License

Private - STEM Mantra
