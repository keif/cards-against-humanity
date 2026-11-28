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
    # Stop old container first to avoid docker-compose v1 ContainerConfig bug.
    # Chained with && because callers run this inside `if`, where set -e is
    # off: a failed step must be returned, not skipped over.
    $COMPOSE stop app &&
        $COMPOSE rm -f app &&
        $COMPOSE up -d --no-build app
}

# Remember what is running now, before the build retags the image name.
# Empty on a first deploy (no container yet), in which case there is nothing
# to roll back to.
PREV_IMAGE_ID=$(docker inspect --format '{{.Image}}' "$CONTAINER" 2>/dev/null || true)
IMAGE_NAME=$(docker inspect --format '{{.Config.Image}}' "$CONTAINER" 2>/dev/null || true)
if [ -n "$PREV_IMAGE_ID" ]; then
    if docker tag "$PREV_IMAGE_ID" "$ROLLBACK_TAG"; then
        echo "Saved current image as $ROLLBACK_TAG"
    else
        echo -e "${YELLOW}Could not save the current image; deploying without a rollback point${NC}"
        PREV_IMAGE_ID=""
    fi
fi

# Rebuild app image (a failed build exits here, leaving the old container up)
echo "Rebuilding application..."
$COMPOSE build app

echo
echo "Restarting application..."
# Any failure from here on (container won't start, or never gets healthy)
# must fall through to the rollback below, not exit under set -e.
if restart_app && echo "Waiting for new container to be healthy..." && wait_healthy; then
    echo
    echo "================================"
    echo -e "${GREEN}Update Complete!${NC}"
    echo "================================"
    echo
    echo "View logs with:"
    echo "  $COMPOSE logs -f app"
    exit 0
fi

echo -e "${RED}✗ New container failed to start or never became healthy (timeout ${HEALTH_TIMEOUT}s)${NC}"
echo "Recent app logs from the failed container:"
$COMPOSE logs --tail=50 app || true

if [ -z "$PREV_IMAGE_ID" ] || [ -z "$IMAGE_NAME" ]; then
    echo -e "${RED}No previous image to roll back to. The app is down.${NC}"
    exit 1
fi

echo
echo -e "${YELLOW}Rolling back to the previous image...${NC}"
if docker tag "$ROLLBACK_TAG" "$IMAGE_NAME" && restart_app && wait_healthy; then
    echo -e "${YELLOW}Rolled back: the previous version is running. This deploy failed.${NC}"
else
    echo -e "${RED}Rollback failed too. The app is down.${NC}"
    $COMPOSE logs --tail=50 app || true
fi
# Either way the deploy itself failed, so fail the GitHub Actions job
exit 1
