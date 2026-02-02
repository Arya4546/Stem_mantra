# STEMmantra - Complete Project Plan & System Design

## 📋 Executive Summary

This document outlines the comprehensive plan to make STEMmantra a fully functional EdTech application with professional-grade backend APIs, admin dashboard, user management, and SEO-optimized frontend.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Public    │  │    User     │  │    Admin    │              │
│  │   Pages     │  │  Dashboard  │  │  Dashboard  │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
└─────────┼────────────────┼────────────────┼─────────────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │   API Layer │
                    │  (REST API) │
                    └──────┬──────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (Express.js)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     Middleware Layer                       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐ │   │
│  │  │  Auth   │ │  Rate   │ │  CORS   │ │   Validation    │ │   │
│  │  │ JWT/OTP │ │ Limiter │ │ Handler │ │   (Zod/Express) │ │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      Route Handlers                        │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │   │
│  │  │  Auth  │ │ Users  │ │Products│ │Programs│ │ Orders │  │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │   │
│  │  │  Blog  │ │ Leads  │ │Contact │ │Gallery │ │Analytics│  │   │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Service Layer                           │   │
│  │         Business Logic, Data Transformation                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Prisma ORM      │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   PostgreSQL DB   │
                    └───────────────────┘
```

---

## 👥 User Roles & Permissions

### Role Hierarchy
```
SUPER_ADMIN (Full access)
    ├── ADMIN (Manage all content & users)
    │       ├── MANAGER (Manage leads, orders, content)
    │       │       ├── SCHOOL_ADMIN (Manage school-specific data)
    │       │       │       ├── TEACHER (Access courses, manage students)
    │       │       │       │       ├── STUDENT (Access enrolled content)
    │       │       │       │       └── PARENT (View student progress)
    │       │       │       └── USER (Basic access)
```

### Permission Matrix

| Feature                | SUPER_ADMIN | ADMIN | MANAGER | SCHOOL_ADMIN | TEACHER | STUDENT | USER |
|------------------------|-------------|-------|---------|--------------|---------|---------|------|
| Manage Users           | ✅          | ✅    | ❌      | ❌           | ❌      | ❌      | ❌   |
| Manage Products        | ✅          | ✅    | ✅      | ❌           | ❌      | ❌      | ❌   |
| Manage Programs        | ✅          | ✅    | ✅      | ❌           | ❌      | ❌      | ❌   |
| Manage Blog            | ✅          | ✅    | ✅      | ❌           | ❌      | ❌      | ❌   |
| Manage Leads           | ✅          | ✅    | ✅      | ❌           | ❌      | ❌      | ❌   |
| View Analytics         | ✅          | ✅    | ✅      | ✅           | ❌      | ❌      | ❌   |
| Manage Orders          | ✅          | ✅    | ✅      | ❌           | ❌      | ❌      | ❌   |
| Access Dashboard       | ✅          | ✅    | ✅      | ✅           | ✅      | ✅      | ❌   |
| Purchase Products      | ✅          | ✅    | ✅      | ✅           | ✅      | ✅      | ✅   |
| View Public Pages      | ✅          | ✅    | ✅      | ✅           | ✅      | ✅      | ✅   |

---

## 📁 Database Schema Summary

### Core Models
1. **User** - User accounts with roles
2. **OTP** - One-time passwords for authentication
3. **RefreshToken** - JWT refresh token storage
4. **School** - School entities for B2B
5. **Program** - Educational programs (ATL Labs, Robotics, etc.)
6. **Course** - Courses within programs
7. **Enrollment** - User enrollments in programs

### Content Models
8. **BlogPost** - Blog articles with SEO
9. **BlogCategory** - Blog categorization
10. **BlogAuthor** - Blog authors
11. **GalleryItem** - Media gallery
12. **Testimonial** - Customer testimonials
13. **FAQ** - Frequently asked questions

### E-commerce Models
14. **Product** - Products and courses
15. **ProductCategory** - Product categories
16. **Cart** - Shopping cart
17. **Order** - Customer orders
18. **Coupon** - Discount coupons

### CRM Models
19. **Lead** - Sales leads
20. **ContactSubmission** - Contact form entries
21. **DemoBooking** - Demo bookings
22. **Event** - Webinars and events

### Analytics Models
23. **PageView** - Page analytics
24. **UserActivity** - User actions tracking

---

## 🔄 Application Flow

### 1. Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Register   │────▶│  Send OTP    │────▶│  Verify OTP  │
│   (Email)    │     │  (Email)     │     │  (Complete)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Dashboard  │◀────│   JWT Token  │◀────│ Create User  │
│   Access     │     │   Issued     │     │  Account     │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 2. Traditional Login Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Login     │────▶│   Validate   │────▶│  Generate    │
│ Email/Pass   │     │  Credentials │     │   Tokens     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │   Dashboard  │
                                          │    Access    │
                                          └──────────────┘
```

### 3. Product Purchase Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browse     │────▶│  Add to Cart │────▶│   Checkout   │
│   Products   │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Order      │◀────│   Payment    │◀────│   Review     │
│   Complete   │     │  (Razorpay)  │     │   Order      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 4. Lead Management Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Contact    │────▶│  Create Lead │────▶│   Assign     │
│    Form      │     │              │     │   To Team    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Convert    │◀────│   Follow-up  │◀────│   Track      │
│   to Sale    │     │   Actions    │     │   Status     │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🛠️ Implementation Plan

### Phase 1: Backend Foundation (Current Session)

#### 1.1 Authentication System ✅
- [x] User registration (traditional)
- [x] User login (email/password)
- [x] OTP-based registration
- [x] OTP-based login
- [x] Password reset with OTP
- [x] JWT token management
- [x] Refresh token rotation

#### 1.2 User Management
- [x] Get users (paginated)
- [x] Get user by ID
- [x] Update user
- [x] Delete user
- [x] Toggle user status
- [x] Change user role
- [x] User statistics

#### 1.3 Email Service (Dummy for now)
- [ ] Configure email templates
- [ ] OTP email sending (mock)
- [ ] Welcome email (mock)
- [ ] Order confirmation (mock)

### Phase 2: Core Features

#### 2.1 Programs Management
- [ ] CRUD for programs
- [ ] Program enrollment
- [ ] Course management within programs

#### 2.2 Products & E-commerce
- [ ] Product CRUD
- [ ] Product categories
- [ ] Shopping cart
- [ ] Order management
- [ ] Coupon system

#### 2.3 Content Management
- [ ] Blog posts CRUD
- [ ] Gallery management
- [ ] Testimonials
- [ ] FAQs

#### 2.4 CRM Features
- [ ] Lead management
- [ ] Contact submissions
- [ ] Demo bookings
- [ ] Event management

### Phase 3: Frontend Development

#### 3.1 Public Pages
- [ ] Homepage
- [ ] Programs listing
- [ ] Products/Shop
- [ ] Blog
- [ ] Contact page
- [ ] About page

#### 3.2 User Dashboard
- [ ] Profile management
- [ ] Order history
- [ ] Enrolled programs
- [ ] Settings

#### 3.3 Admin Dashboard
- [ ] Analytics overview
- [ ] User management
- [ ] Content management
- [ ] Order management
- [ ] Lead management

### Phase 4: SEO & Performance

#### 4.1 SEO Optimization
- [ ] Dynamic meta tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Open Graph tags
- [ ] Twitter cards

#### 4.2 Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Caching strategy
- [ ] Core Web Vitals optimization

---

## 📡 API Endpoints Reference

### Authentication
```
POST   /api/v1/auth/register              - Register new user
POST   /api/v1/auth/login                 - Login with email/password
POST   /api/v1/auth/refresh-token         - Refresh JWT token
POST   /api/v1/auth/logout                - Logout user
GET    /api/v1/auth/profile               - Get current user profile
POST   /api/v1/auth/change-password       - Change password

# OTP-based
POST   /api/v1/auth/otp/register/send     - Send registration OTP
POST   /api/v1/auth/otp/register/verify   - Verify registration OTP
POST   /api/v1/auth/otp/login/send        - Send login OTP
POST   /api/v1/auth/otp/login/verify      - Verify login OTP
POST   /api/v1/auth/forgot-password       - Request password reset
POST   /api/v1/auth/reset-password        - Reset password with OTP
```

### Users (Admin)
```
GET    /api/v1/users                      - List users (paginated)
GET    /api/v1/users/stats                - User statistics
GET    /api/v1/users/:id                  - Get user by ID
PATCH  /api/v1/users/:id                  - Update user
DELETE /api/v1/users/:id                  - Delete user
PATCH  /api/v1/users/:id/toggle-status    - Toggle user status
PATCH  /api/v1/users/:id/role             - Change user role
```

### Programs
```
GET    /api/v1/programs                   - List programs
GET    /api/v1/programs/featured          - Featured programs
GET    /api/v1/programs/:slug             - Get program by slug
GET    /api/v1/programs/:id               - Get program by ID
POST   /api/v1/programs                   - Create program (Admin)
PUT    /api/v1/programs/:id               - Update program (Admin)
DELETE /api/v1/programs/:id               - Delete program (Admin)
```

### Products
```
GET    /api/v1/products                   - List products
GET    /api/v1/products/featured          - Featured products
GET    /api/v1/products/slug/:slug        - Get product by slug
GET    /api/v1/products/:id               - Get product by ID
POST   /api/v1/products                   - Create product (Admin)
PUT    /api/v1/products/:id               - Update product (Admin)
DELETE /api/v1/products/:id               - Delete product (Admin)
```

### Blog
```
GET    /api/v1/blog                       - List blog posts
GET    /api/v1/blog/:slug                 - Get blog post by slug
POST   /api/v1/blog                       - Create blog post (Admin)
PUT    /api/v1/blog/:id                   - Update blog post (Admin)
DELETE /api/v1/blog/:id                   - Delete blog post (Admin)
```

### Contact & Leads
```
POST   /api/v1/contact                    - Submit contact form
GET    /api/v1/leads                      - List leads (Admin)
POST   /api/v1/leads                      - Create lead (Admin)
PUT    /api/v1/leads/:id                  - Update lead (Admin)
DELETE /api/v1/leads/:id                  - Delete lead (Admin)
```

### Orders
```
GET    /api/v1/orders                     - List orders (Admin/User)
GET    /api/v1/orders/:id                 - Get order by ID
POST   /api/v1/orders                     - Create order
PATCH  /api/v1/orders/:id/status          - Update order status (Admin)
```

### Analytics
```
GET    /api/v1/analytics/dashboard        - Dashboard stats
GET    /api/v1/analytics/users            - User analytics
GET    /api/v1/analytics/orders           - Order analytics
GET    /api/v1/analytics/page-views       - Page view analytics
```

---

## 🔐 Security Measures

1. **Authentication**
   - JWT with short expiry (7 days)
   - Refresh token rotation (30 days)
   - OTP rate limiting
   - Password hashing (bcrypt, 12 rounds)

2. **Authorization**
   - Role-based access control (RBAC)
   - Route protection middleware
   - Resource-level permissions

3. **Data Protection**
   - Input validation (Zod)
   - SQL injection prevention (Prisma)
   - XSS protection (Helmet)
   - CORS configuration

4. **Rate Limiting**
   - General API: 100 req/15min
   - Auth endpoints: 5 req/min
   - OTP endpoints: 3 req/min

---

## 🎯 Current Status & Next Steps

### Current Status
- ✅ Backend structure established
- ✅ Database schema defined (Prisma)
- ✅ Authentication service implemented
- ✅ Basic route structure in place
- ⚠️ Some services need completion
- ⚠️ Email service needs mock implementation
- ⚠️ Frontend needs API integration

### Immediate Next Steps
1. Fix email service to work without Brevo (mock mode)
2. Verify database connection and run migrations
3. Test authentication endpoints
4. Complete program CRUD operations
5. Complete product CRUD operations
6. Add admin seeder for initial setup

---

## 📝 Technical Notes

### Email Service Mock Mode
For development without external email service:
- OTP will be logged to console
- Email templates will be skipped
- Success response will include OTP in development mode

### Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (creates admin user)
npm run prisma:seed
```

### Environment Variables Required
```
DATABASE_URL           - PostgreSQL connection string
JWT_SECRET            - JWT signing secret
JWT_REFRESH_SECRET    - Refresh token secret
CORS_ORIGIN           - Frontend URL
```

---

## 🚀 Quick Start Guide

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Test APIs
```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123456","firstName":"Test","lastName":"User"}'
```

---

*Document Version: 1.0*
*Last Updated: December 14, 2025*
