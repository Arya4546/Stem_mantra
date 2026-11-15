#!/usr/bin/env bash
# Runs on the VPS (called by .github/workflows/deploy.yml after `git pull`):
#   bash deploy/deploy.sh <image-tag>
# Pulls the new image, restarts the container and waits until its health check passes.
set -euo pipefail

cd "$(dirname "$0")/.."
export IMAGE_TAG="${1:-latest}"
CONTAINER=stemmantra_site

if [ ! -f .env ]; then
  echo "❌ $(pwd)/.env is missing — create it from backend/.env.example first." >&2
  exit 1
fi

docker compose pull app
# --remove-orphans also removes the old frontend-only container (service "web") if it still exists.
docker compose up -d --remove-orphans --force-recreate app

echo "Waiting for ${CONTAINER} to become healthy…"
status=starting
for _ in $(seq 1 80); do
  status="$(docker inspect -f '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo starting)"
  if [ "$status" = "healthy" ] || [ "$status" = "unhealthy" ]; then break; fi
  sleep 3
done

if [ "$status" != "healthy" ]; then
  echo "❌ ${CONTAINER} is ${status}. Last log lines:" >&2
  docker compose logs --tail 80 app >&2 || true
  exit 1
fi

docker image prune -f >/dev/null
echo "✅ STEMmantra site deployed (${IMAGE_TAG})"
