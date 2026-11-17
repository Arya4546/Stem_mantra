# STEMmantra Website

www.stemmantra.com: the SEO-optimised website of STEMmantra (K-12 robotics & STEM education),
with an admin panel for the gallery, clients, testimonials, blog and enquiries.
> **Master The Skills "Drive Your Future..."**

## Structure

```
Stem_mantra/
├── backend/             # Node.js + TypeScript: Express 5 API, Prisma + PostgreSQL. Also serves the frontend.
│   ├── prisma/          # schema.prisma + migrations
│   └── src/             # modules: auth, gallery, clients, testimonials, blog, enquiries, uploads, media
├── frontend/            # Next.js 14 (App Router, Tailwind): public site + /login + /admin
├── deploy/              # nginx server block, VPS deploy script
├── Dockerfile           # one production image: backend + built frontend
├── docker-compose.yml   # runs on the VPS (pulls the image from GHCR)
└── .github/workflows/   # ci.yml, deploy.yml
```

## How it fits together

- **One Node.js process** (`backend/src/server.ts`) serves everything on the domain:
  `/api/*` (REST API), `/media/*` (uploaded images, streamed from Backblaze B2) and all other
  URLs through Next.js (the website and the admin panel).
- Public pages load their content (gallery, clients, testimonials, blog) from the API on the
  server, so search engines get complete HTML. `sitemap.xml` and `robots.txt` are generated.
- **Admin:** `https://www.stemmantra.com/login`. The super admin is created on start-up from
  `ADMIN_*` (the same credentials as the LMS) if none exists.
- **Contact / demo forms** are saved in the database (visible under Admin → Enquiries) and
  emailed to `ENQUIRY_RECIPIENTS` (sales@stemmantra.com) through the LMS's Brevo SMTP account.
- **Uploads** are checked, resized, converted to WebP (plus a thumbnail) and stored in the LMS
  B2 bucket under `B2_PREFIX/` (`website/` in production, `website-dev/` locally).

## Local development

```bash
npm run install:all                      # backend + frontend dependencies
cp backend/.env.example backend/.env     # fill in DATABASE_URL, SMTP, B2 (B2_PREFIX=website-dev), ADMIN_*
cd backend && npx prisma migrate dev && cd ..   # creates the database and tables
npm run dev                              # site + API + admin with hot reload on http://localhost:<PORT>
```

Checks (the same ones CI runs): `npm run type-check`, `npm run lint`, `npm run build`.

**Changing the database:** edit `backend/prisma/schema.prisma`, run
`cd backend && npx prisma migrate dev --name <what-changed>` and commit the new migration.
CI fails if the schema has changes that no migration covers.

## Logs and monitoring

- **Terminal / `docker compose logs`:** one line per API request (status, duration). In
  development every SQL query is printed with its duration (`LOG_QUERIES`). Queries over 200 ms
  are always logged as `SLOW QUERY`.
- **SigNoz:** set `OTEL_EXPORTER_OTLP_ENDPOINT` (plus `OTEL_EXPORTER_OTLP_HEADERS` for SigNoz
  Cloud) to send traces (HTTP, Express, every Prisma query), metrics and logs. If it is empty,
  telemetry is off.

## Deployment (VPS, Docker, GitHub Actions)

Push to `main` → **CI** (backend: type-check, build, migrations; frontend: type-check, lint,
build) → **image built and pushed** to `ghcr.io/arya4546/stem_mantra` → **SSH to the VPS** →
`deploy/deploy.sh` (pull, restart, wait for the health check; it prints the logs and fails if
the container doesn't become healthy).

On every start the container runs `prisma migrate deploy` (which creates the `stemmantra_site`
database the first time), then ensures the super admin exists. On the first start it also
imports the photos, clients and testimonials that were on the static site.

Ports on the VPS: `3000` LMS, `3001` TinkerGyan, `3002` this site (bound to 127.0.0.1; nginx proxies to it).

### One-time VPS setup

1. The LMS must be running: this site uses its Postgres container (`stemmantra_db`) through its
   Docker network (`stemmantra-lms_default`), with a separate database `stemmantra_site`.
2. `git clone git@github.com:Arya4546/Stem_mantra.git /opt/stemmantra-site`
3. Create `/opt/stemmantra-site/.env` from `backend/.env.example`, then run `chmod 600 .env`:
   - `SITE_URL=https://www.stemmantra.com` and `B2_PREFIX=website`
   - `DATABASE_URL=postgresql://<LMS POSTGRES_USER>:<LMS POSTGRES_PASSWORD>@stemmantra_db:5432/stemmantra_site?schema=public`
   - `SMTP_*`, `BACKBLAZE_*` and `ADMIN_*` copied from the LMS `.env`
   - a new `JWT_ACCESS_SECRET`: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
4. Let the VPS pull from GHCR: `docker login ghcr.io` (a GitHub user plus a PAT with `read:packages`),
   or make the package public.
5. DNS (Hostinger): point the `@` and `www` **A records** at the VPS. Leave MX / SPF / DKIM /
   DMARC and every other record untouched (email stays on Hostinger).
6. nginx + certificate (needs step 5 to have propagated):
   ```bash
   mkdir -p /var/www/certbot /var/cache/nginx
   cp deploy/nginx/stemmantra.com-http.conf /etc/nginx/sites-available/stemmantra.com-http
   ln -s /etc/nginx/sites-available/stemmantra.com-http /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   certbot certonly --webroot -w /var/www/certbot -d stemmantra.com -d www.stemmantra.com \
     --deploy-hook "systemctl reload nginx"
   cp deploy/nginx/stemmantra.com.conf /etc/nginx/sites-available/stemmantra.com
   ln -s /etc/nginx/sites-available/stemmantra.com /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   ```
   Certificates renew automatically through certbot's systemd timer (`certbot renew --dry-run` to test).
7. After the first GitHub Actions build: `cd /opt/stemmantra-site && bash deploy/deploy.sh latest`.

**GitHub repository secrets:** `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT` (same as the LMS).

### Day-to-day on the VPS

```bash
cd /opt/stemmantra-site
docker compose ps                    # status + health
docker compose logs -f app           # live logs: requests, slow queries, errors
docker exec -it stemmantra_db psql -U <LMS POSTGRES_USER> -d stemmantra_site
```

**Backups:** the site's data lives in the `stemmantra_site` database inside the LMS Postgres
container. Back it up together with the LMS database (e.g. `pg_dump -d stemmantra_site`).
Uploaded images are in B2 under `website/`.

## Notes

- URLs have no trailing slash; old `/page/` links redirect permanently (308) to `/page`.
- `frontend/src/_deferred_routes/` is parked code from the static-export days. It is not built,
  and the new admin panel replaces it.
