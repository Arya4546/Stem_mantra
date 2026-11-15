# STEMmantra Website

SEO-optimised website for STEMmantra, a K-12 robotics & STEM education company.
> **Master The Skills "Drive Your Future..."**

## Structure

```
Stem_mantra/
├── frontend/          # Next.js 14 (App Router, TypeScript, Tailwind) - the website
│   ├── Dockerfile     # multi-stage, Next "standalone" output
│   └── src/_deferred_routes/   # admin / dashboard / blog routes parked until the new backend exists
├── deploy/nginx/      # nginx server block for the VPS
├── docker-compose.yml # runs on the VPS (pulls the image from GHCR)
└── .github/workflows/ # ci.yml, deploy.yml
```

The previous Express/Prisma backend was removed (it is still in git history). A new
Node.js + TypeScript + PostgreSQL + Prisma backend will be added at `backend/`.

## Local development

```bash
cd frontend
npm ci
npm run dev          # http://localhost:3000
npm run type-check && npm run lint && npm run build
```

## Deployment (VPS, Docker, GitHub Actions)

Push to `main` -> **CI** (type-check, lint, build) -> **build image & push to GHCR**
(`ghcr.io/arya4546/stem_mantra-web`) -> **SSH to the VPS**, `docker compose pull web && up -d`.

Ports on the VPS: `3000` LMS, `3001` TinkerGyan, `3002` this site (bound to 127.0.0.1; nginx proxies to it).

### One-time VPS setup
1. `git clone git@github.com:Arya4546/Stem_mantra.git /opt/stemmantra-site`
2. `docker login ghcr.io` (user + a GitHub PAT with `read:packages`)
3. Copy `deploy/nginx/stemmantra.com.conf` to `/etc/nginx/sites-available/`, enable it,
   `certbot --nginx -d stemmantra.com -d www.stemmantra.com`, `nginx -t && systemctl reload nginx`.
4. First run: `cd /opt/stemmantra-site && docker compose pull && docker compose up -d`
5. Point DNS (`@` and `www`) A records at the VPS.

### GitHub repository secrets
`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT` (same values as the LMS / TinkerGyan repos).

## Known interim limitation
The contact / demo forms still post to `/send-mail.php` (the old Hostinger PHP mailer), which does
not exist on the VPS. They will be rebuilt against the new backend.
