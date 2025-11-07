#!/bin/bash

# Script to clear Cards Against Humanity card data from Redis
# This forces the server to re-seed cards from source data on next startup
# Use this when you suspect Redis has corrupted card data

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

REDIS_HOST="${REDIS_HOST:-localhost}"
REDIS_PORT="${REDIS_PORT:-6379}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Clear Redis Card Data${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Redis Host: $REDIS_HOST"
echo "Redis Port: $REDIS_PORT"
echo ""

# Check if redis-cli is available
if ! command -v redis-cli &> /dev/null; then
    echo -e "${RED}✗ redis-cli not found${NC}"
    echo "Please install Redis CLI tools"
    exit 1
fi

# Test Redis connection
echo -n "Testing Redis connection... "
if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Connected${NC}"
else
    echo -e "${RED}✗ Failed${NC}"
    echo "Could not connect to Redis at $REDIS_HOST:$REDIS_PORT"
    exit 1
fi

# Warn user
echo ""
echo -e "${YELLOW}⚠️  This will DELETE all card data from Redis:${NC}"
echo "   • All card hashes (card:*)"
echo "   • Question card sets (cards:official:*:Q)"
echo "   • Answer card sets (cards:official:*:A)"
echo "   • Initialization flag (cards:initialized)"
echo ""
echo -e "${YELLOW}The server will automatically re-seed cards on next startup.${NC}"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Aborted${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}Clearing card data...${NC}"
echo ""

# Count cards before deletion
CARD_COUNT=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" --raw EVAL "return #redis.call('keys', 'card:*')" 0 2>/dev/null || echo "0")
echo "Found $CARD_COUNT card entries"

# Delete all card hashes (in batches to avoid blocking)
echo -n "Deleting card hashes... "
DELETED=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" --raw EVAL "
local keys = redis.call('keys', 'card:*')
if #keys == 0 then return 0 end
for i=1,#keys,1000 do
    redis.call('del', unpack(keys, i, math.min(i+999, #keys)))
end
return #keys
" 0 2>/dev/null || echo "0")
echo -e "${GREEN}✓ Deleted $DELETED cards${NC}"

# Delete card sets
echo -n "Deleting card sets... "
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" DEL \
    cards:official:Base:Q \
    cards:official:Base:A > /dev/null 2>&1
echo -e "${GREEN}✓ Done${NC}"

# Delete initialization flag
echo -n "Clearing initialization flag... "
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" DEL cards:initialized > /dev/null 2>&1
echo -e "${GREEN}✓ Done${NC}"

# Verify deletion
echo ""
echo -n "Verifying... "
INIT_EXISTS=$(redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" EXISTS cards:initialized)
if [ "$INIT_EXISTS" = "0" ]; then
    echo -e "${GREEN}✓ All card data cleared${NC}"
else
    echo -e "${RED}✗ Verification failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Success!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Restart your server"
echo "  2. Cards will be automatically re-seeded from source data"
echo ""
