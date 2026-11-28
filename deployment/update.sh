#!/bin/bash
# Rebuild and restart the app container. The old container is stopped before
# the new one starts, so there is a short gap. If the new container never
# becomes healthy, the previous image is restored and the script exits 1.

set -e

echo "================================"
echo "CAH Update Script"
echo "================================"
echo

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

COMPOSE="docker-compose -f docker-compose.prod.yml"
CONTAINER=cah-app             # container_name in docker-compose.prod.yml
ROLLBACK_TAG=cah-app:rollback # pins the previous image so the build can't orphan it
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-120} # seconds
HEALTH_INTERVAL=3

# -T: the deploy runs over a non-interactive SSH session, and without it
# `exec` dies with "the input device is not a TTY" before wget ever runs.
# Poll until the app answers (it needs a few seconds to boot).
wait_healthy() {
    local start=$SECONDS
    until $COMPOSE exec -T app wget -q --spider http://localhost:8080/api/cards/health; do
        if [ $((SECONDS - start)) -ge "$HEALTH_TIMEOUT" ]; then
            return 1
        fi
        sleep "$HEALTH_INTERVAL"
    done
    echo -e "${GREEN}✓ Application is healthy (after ~$((SECONDS - start))s)${NC}"
}

restart_app() {
    # Stop old container first to avoid docker-compose v1 ContainerConfig bug
    $COMPOSE stop app
    $COMPOSE rm -f app
    $COMPOSE up -d --no-build app
}

# Remember what is running now, before the build retags the image name.
# Empty on a first deploy (no container yet), in which case there is nothing
# to roll back to.
PREV_IMAGE_ID=$(docker inspect --format '{{.Image}}' "$CONTAINER" 2>/dev/null || true)
IMAGE_NAME=$(docker inspect --format '{{.Config.Image}}' "$CONTAINER" 2>/dev/null || true)
if [ -n "$PREV_IMAGE_ID" ]; then
    docker tag "$PREV_IMAGE_ID" "$ROLLBACK_TAG"
    echo "Saved current image as $ROLLBACK_TAG"
fi

# Rebuild app image (a failed build exits here, leaving the old container up)
echo "Rebuilding application..."
$COMPOSE build app

echo
echo "Restarting application..."
restart_app

echo
echo "Waiting for new container to be healthy..."
if wait_healthy; then
    echo
    echo "================================"
    echo -e "${GREEN}Update Complete!${NC}"
    echo "================================"
    echo
    echo "View logs with:"
    echo "  $COMPOSE logs -f app"
    exit 0
fi

echo -e "${RED}✗ Health check failed after ${HEALTH_TIMEOUT}s${NC}"
echo "Recent app logs from the failed container:"
$COMPOSE logs --tail=50 app

if [ -z "$PREV_IMAGE_ID" ] || [ -z "$IMAGE_NAME" ]; then
    echo -e "${RED}No previous image to roll back to. The app is down.${NC}"
    exit 1
fi

echo
echo -e "${YELLOW}Rolling back to the previous image...${NC}"
docker tag "$ROLLBACK_TAG" "$IMAGE_NAME"
restart_app

if wait_healthy; then
    echo -e "${YELLOW}Rolled back: the previous version is running. This deploy failed.${NC}"
else
    echo -e "${RED}Rollback is not healthy either. The app is down.${NC}"
    $COMPOSE logs --tail=50 app
fi
# Either way the deploy itself failed, so fail the GitHub Actions job
exit 1
