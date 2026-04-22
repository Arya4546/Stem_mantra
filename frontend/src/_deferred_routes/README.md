# ⚠️ Deferred Routes — DO NOT DELETE

> **Last Updated:** April 22, 2026
> **Moved By:** Development team during static deployment preparation
> **Reason:** These routes require a Node.js server (dynamic rendering, API calls, authentication) and were temporarily moved out of `src/app/` to enable a static HTML export (`output: 'export'`) for deployment on Hostinger shared hosting.

---

## What Is This Folder?

This folder (`src/_deferred_routes/`) contains **fully functional Next.js route folders** that were originally located inside `src/app/`. They were moved here because Next.js's static export mode (`output: 'export'` in `next.config.js`) cannot build pages that use:

- **Dynamic route segments** like `[slug]`, `[id]`, `[city]` (without `generateStaticParams()`)
- **Server-side authentication** (login/register pages)
- **Admin panels** that fetch data from the backend API
- **User dashboards** that require session/cookie-based auth

These files are **NOT deleted** — they are preserved here so they can be restored when the backend is deployed and the hosting environment supports Node.js.

---

## Folder Contents & Original Locations

Every folder listed below should be moved back to `src/app/` when restoring.

### Authentication
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `(auth)/` | `src/app/(auth)/` | Contains `/login` and `/register` pages. Uses Next.js route group `()` syntax (no URL prefix). |

### Admin Panel
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `admin/` | `src/app/admin/` | Complete admin dashboard with sub-pages: `analytics/`, `blog/` (with `[id]/` and `new/`), `faqs/`, `gallery/`, `leads/`, `orders/`, `products/`, `programs/`, `settings/`, `testimonials/`, `users/`. Contains `layout.tsx` (admin sidebar layout) and `page.tsx` (admin homepage). |

### User Dashboard
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `dashboard/` | `src/app/dashboard/` | Student/user dashboard with sub-pages: `achievements/`, `cart/`, `checkout/`, `courses/` (with `[slug]/`), `enrollments/`, `help/`, `orders/`, `schedule/`, `store/` (with `[slug]/`), `wishlist/`. Contains `page.tsx` (dashboard homepage). |

### User Profile & Settings
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `profile/` | `src/app/profile/` | User profile page. |
| `settings/` | `src/app/settings/` | User account settings page. |

### Blog
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `blog/` | `src/app/blog/` | Public blog listing page + dynamic `[slug]/` for individual blog posts. |

### Dynamic Content Pages
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `competitions/` | `src/app/competitions/` | Contains `[event]/` — dynamic competition/event pages. |
| `labs/` | `src/app/labs/` | Contains `[type]/` — dynamic lab type detail pages. |
| `services/` | `src/app/services/` | Contains `[service]/` and `[slug]/` — dynamic service pages for SEO landing pages. |
| `robotics-labs/` | `src/app/robotics-labs/` | Contains `[city]/` — city-specific robotics lab SEO pages. |
| `stem-labs/` | `src/app/stem-labs/` | Contains `[city]/` — city-specific STEM lab SEO pages. |

### Programs Sub-routes
| Folder | Original Path | Description |
|--------|---------------|-------------|
| `programs/[slug]/` | `src/app/programs/[slug]/` | Individual program detail pages (e.g., `/programs/steamverse-lab`). |
| `programs/[classType]/` | `src/app/programs/[classType]/` | Class-type filtered program pages. |

> **Note:** The static `programs/page.tsx` and `programs/layout.tsx` remain in `src/app/programs/` and are part of the current live deployment. Only the dynamic sub-routes (`[slug]` and `[classType]`) were moved here.

---

## How to Restore These Routes

### Prerequisites
Before restoring, ensure your hosting environment supports Node.js (e.g., Hostinger VPS, Vercel, or any platform that can run `npm start`).

### Step-by-Step Restoration

**Step 1: Remove static export config from `next.config.js`**

Open `frontend/next.config.js` and remove these two lines:
```diff
const nextConfig = {
-  output: 'export',
  images: {
-    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
```

**Step 2: Move all folders back to `src/app/`**

Run the following commands from the `frontend/` directory:

```powershell
# Move all top-level route folders back
Move-Item -LiteralPath "src\_deferred_routes\(auth)" -Destination "src\app\(auth)"
Move-Item -LiteralPath "src\_deferred_routes\admin" -Destination "src\app\admin"
Move-Item -LiteralPath "src\_deferred_routes\dashboard" -Destination "src\app\dashboard"
Move-Item -LiteralPath "src\_deferred_routes\profile" -Destination "src\app\profile"
Move-Item -LiteralPath "src\_deferred_routes\settings" -Destination "src\app\settings"
Move-Item -LiteralPath "src\_deferred_routes\blog" -Destination "src\app\blog"
Move-Item -LiteralPath "src\_deferred_routes\competitions" -Destination "src\app\competitions"
Move-Item -LiteralPath "src\_deferred_routes\labs" -Destination "src\app\labs"
Move-Item -LiteralPath "src\_deferred_routes\services" -Destination "src\app\services"
Move-Item -LiteralPath "src\_deferred_routes\robotics-labs" -Destination "src\app\robotics-labs"
Move-Item -LiteralPath "src\_deferred_routes\stem-labs" -Destination "src\app\stem-labs"

# Move programs sub-routes back
Move-Item -LiteralPath "src\_deferred_routes\programs\[slug]" -Destination "src\app\programs\[slug]"
Move-Item -LiteralPath "src\_deferred_routes\programs\[classType]" -Destination "src\app\programs\[classType]"
```

Or on Linux/macOS:
```bash
# Move all top-level route folders back
mv src/_deferred_routes/\(auth\) src/app/\(auth\)
mv src/_deferred_routes/admin src/app/admin
mv src/_deferred_routes/dashboard src/app/dashboard
mv src/_deferred_routes/profile src/app/profile
mv src/_deferred_routes/settings src/app/settings
mv src/_deferred_routes/blog src/app/blog
mv src/_deferred_routes/competitions src/app/competitions
mv src/_deferred_routes/labs src/app/labs
mv src/_deferred_routes/services src/app/services
mv src/_deferred_routes/robotics-labs src/app/robotics-labs
mv src/_deferred_routes/stem-labs src/app/stem-labs

# Move programs sub-routes back
mv "src/_deferred_routes/programs/[slug]" "src/app/programs/[slug]"
mv "src/_deferred_routes/programs/[classType]" "src/app/programs/[classType]"
```

**Step 3: Delete the `_deferred_routes` folder**

```powershell
Remove-Item -Recurse -Force "src\_deferred_routes"
```

**Step 4: Clear the build cache and rebuild**

```bash
rm -rf .next
npm run build
```

**Step 5: Deploy to a Node.js-capable host**

- **Vercel:** Push to GitHub → Import in Vercel → Auto-deploys
- **Hostinger VPS:** SSH in → `npm install && npm run build && npm start`
- **Any Node.js host:** Upload code → `npm install && npm run build && npm start`

---

## Environment Variables Required

When restoring these routes, ensure the following environment variables are set in `.env.local` or your hosting provider's environment settings:

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL for admin/dashboard/auth | `https://api.stemmantra.com` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://www.stemmantra.com` |

---

## Architecture Notes

- **Admin routes** (`/admin/*`) use a shared `AdminLayout` component from `src/components/admin/AdminLayout.tsx`.
- **Dashboard routes** (`/dashboard/*`) fetch user data from the backend API and require authentication.
- **Auth routes** (`/login`, `/register`) use the `(auth)` route group pattern — the parentheses mean they share a layout but don't add `/auth/` to the URL.
- **SEO city pages** (`/robotics-labs/[city]`, `/stem-labs/[city]`) are dynamically generated pages for local SEO targeting specific Indian cities.
- **Services pages** (`/services/[slug]`) include pre-generated static paths using `generateStaticParams()` for known service slugs.

---

## Important Warnings

> ⚠️ **DO NOT** simply add `output: 'export'` back to `next.config.js` after restoring these folders. The build will fail because dynamic routes like `[slug]` and `[id]` require a running Node.js server.

> ⚠️ **DO NOT** delete the `src/components/admin/` folder from the main source tree — it contains shared components (`AdminLayout.tsx`) imported by the admin routes stored here.

> ⚠️ When restoring, check that no import paths are broken. All imports use `@/` aliases which resolve to `src/`, so moving folders between `src/app/` and `src/_deferred_routes/` should not break imports to shared components.
