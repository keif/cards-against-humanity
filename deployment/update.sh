#!/bin/bash
# Update running deployment with zero downtime

set -e

echo "================================"
echo "CAH Update Script"
echo "================================"
echo

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Rebuild app image
echo "Rebuilding application..."
docker-compose -f docker-compose.prod.yml build app

echo
echo "Restarting application with zero downtime..."
# Stop old container first to avoid docker-compose v1 ContainerConfig bug
docker-compose -f docker-compose.prod.yml stop app
docker-compose -f docker-compose.prod.yml rm -f app
docker-compose -f docker-compose.prod.yml up -d app

echo
echo "Waiting for new container to be healthy..."

# -T: the deploy runs over a non-interactive SSH session, and without it
# `exec` dies with "the input device is not a TTY" before wget ever runs.
# Poll until the app answers (it needs a few seconds to boot), and fail the
# deploy (non-zero exit, which fails the GitHub Actions job) if it never does.
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-120} # seconds
HEALTH_INTERVAL=3
elapsed=0
until docker-compose -f docker-compose.prod.yml exec -T app wget -q --spider http://localhost:8080/api/cards/health; do
    if [ "$elapsed" -ge "$HEALTH_TIMEOUT" ]; then
        echo -e "${RED}✗ Health check failed after ${HEALTH_TIMEOUT}s${NC}"
        echo "Recent app logs:"
        docker-compose -f docker-compose.prod.yml logs --tail=50 app
        exit 1
    fi
    sleep "$HEALTH_INTERVAL"
    elapsed=$((elapsed + HEALTH_INTERVAL))
done
echo -e "${GREEN}✓ Application is healthy (after ~${elapsed}s)${NC}"

echo
echo "================================"
echo -e "${GREEN}Update Complete!${NC}"
echo "================================"
echo
echo "View logs with:"
echo "  docker-compose -f docker-compose.prod.yml logs -f app"
