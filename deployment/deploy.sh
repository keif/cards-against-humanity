#!/bin/bash
# Main deployment script for Cards Against Humanity

set -e

echo "================================"
echo "CAH Deployment Script"
echo "================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Please create a .env file from .env.production.template"
    echo "Run: cp .env.production.template .env"
    echo "Then edit .env with your production values"
    exit 1
fi

# Check required environment variables
echo "Checking environment configuration..."
required_vars=("SESSION_SECRET" "ADMIN_KEY" "ALLOWED_ORIGINS")
missing_vars=()

for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env || grep -q "^${var}=REPLACE" .env; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo -e "${RED}Error: Missing or unconfigured environment variables:${NC}"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    echo
    echo "Please edit your .env file and set these variables"
    exit 1
fi

echo -e "${GREEN}✓ Environment configuration valid${NC}"
echo

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    echo "Please start Docker and try again"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"
echo

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose not found${NC}"
    echo "Please install docker-compose and try again"
    exit 1
fi

echo -e "${GREEN}✓ docker-compose is installed${NC}"
echo

# Pull latest code (if git repo)
if [ -d ".git" ]; then
    echo "Pulling latest code..."
    git pull
    echo -e "${GREEN}✓ Code updated${NC}"
    echo
fi

# Build and start containers
echo "Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo
echo "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

echo
echo "Waiting for services to be healthy..."
sleep 10

# Check service health
echo
echo "Checking service status..."
docker-compose -f docker-compose.prod.yml ps

echo
echo "================================"
echo -e "${GREEN}Deployment Complete!${NC}"
echo "================================"
echo
echo "Your application is now running:"
echo "  - Redis: Running on internal network"
echo "  - App: Running on internal network (port 8080)"
echo "  - Nginx: http://localhost:80, https://localhost:443"
echo
echo "View logs with:"
echo "  docker-compose -f docker-compose.prod.yml logs -f"
echo
echo "Stop services with:"
echo "  docker-compose -f docker-compose.prod.yml down"
echo
echo -e "${YELLOW}Note: If this is your first deployment, run init-ssl.sh to set up SSL certificates${NC}"
