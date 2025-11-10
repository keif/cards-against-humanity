#!/bin/bash
# Update running deployment with zero downtime

set -e

echo "================================"
echo "CAH Update Script"
echo "================================"
echo

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Pull latest code
if [ -d ".git" ]; then
    echo "Pulling latest code..."
    git pull
    echo -e "${GREEN}✓ Code updated${NC}"
    echo
fi

# Rebuild app image
echo "Rebuilding application..."
docker-compose -f docker-compose.prod.yml build app

echo
echo "Restarting application with zero downtime..."
docker-compose -f docker-compose.prod.yml up -d --no-deps app

echo
echo "Waiting for new container to be healthy..."
sleep 5

# Check if app is healthy
if docker-compose -f docker-compose.prod.yml exec app wget -q --spider http://localhost:8080/api/cards/health; then
    echo -e "${GREEN}✓ Application is healthy${NC}"
else
    echo -e "${YELLOW}Warning: Health check failed${NC}"
    echo "Check logs with: docker-compose -f docker-compose.prod.yml logs app"
fi

echo
echo "================================"
echo -e "${GREEN}Update Complete!${NC}"
echo "================================"
echo
echo "View logs with:"
echo "  docker-compose -f docker-compose.prod.yml logs -f app"
