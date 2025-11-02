#!/bin/bash

# Test script for card moderation authentication
# Tests that endpoints are properly protected

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="${API_URL:-http://localhost:8080}"
ADMIN_KEY="${ADMIN_KEY:-test-admin-key-123}"

echo "Testing Card Moderation Authentication"
echo "========================================"
echo "API URL: $API_URL"
echo ""

# Create a session and store cookies
COOKIE_FILE=$(mktemp)
trap "rm -f $COOKIE_FILE" EXIT

echo "1. Testing /api/cards/auth/role (should work for any session)"
echo "-----------------------------------------------------------"
ROLE_RESPONSE=$(curl -s -c $COOKIE_FILE -b $COOKIE_FILE "$API_URL/api/cards/auth/role")
echo "$ROLE_RESPONSE" | jq '.'
INITIAL_ROLE=$(echo "$ROLE_RESPONSE" | jq -r '.role')

if [ "$INITIAL_ROLE" == "user" ]; then
  echo -e "${GREEN}✓ Default role is 'user'${NC}\n"
else
  echo -e "${RED}✗ Expected default role 'user', got '$INITIAL_ROLE'${NC}\n"
  exit 1
fi

echo "2. Testing /api/cards/pending WITHOUT moderator role (should fail with 403)"
echo "--------------------------------------------------------------------------"
PENDING_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -b $COOKIE_FILE "$API_URL/api/cards/pending")
HTTP_STATUS=$(echo "$PENDING_RESPONSE" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d':' -f2)
BODY=$(echo "$PENDING_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" == "403" ]; then
  echo -e "${GREEN}✓ Correctly blocked with 403 Forbidden${NC}"
  echo "$BODY" | jq '.'
else
  echo -e "${RED}✗ Expected 403, got $HTTP_STATUS${NC}"
  echo "$BODY"
  exit 1
fi
echo ""

echo "3. Testing /api/cards/approve/:id WITHOUT moderator role (should fail with 403)"
echo "------------------------------------------------------------------------------"
APPROVE_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -b $COOKIE_FILE -X POST -H "Content-Type: application/json" "$API_URL/api/cards/approve/1")
HTTP_STATUS=$(echo "$APPROVE_RESPONSE" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d':' -f2)
BODY=$(echo "$APPROVE_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" == "403" ]; then
  echo -e "${GREEN}✓ Correctly blocked with 403 Forbidden${NC}"
  echo "$BODY" | jq '.'
else
  echo -e "${RED}✗ Expected 403, got $HTTP_STATUS${NC}"
  echo "$BODY"
  exit 1
fi
echo ""

echo "4. Promoting user to moderator with admin key"
echo "--------------------------------------------"
PROMOTE_RESPONSE=$(curl -s -b $COOKIE_FILE -c $COOKIE_FILE -X POST -H "Content-Type: application/json" -d "{\"adminKey\": \"$ADMIN_KEY\"}" "$API_URL/api/cards/auth/promote")
echo "$PROMOTE_RESPONSE" | jq '.'
NEW_ROLE=$(echo "$PROMOTE_RESPONSE" | jq -r '.role')

if [ "$NEW_ROLE" == "moderator" ]; then
  echo -e "${GREEN}✓ Successfully promoted to moderator${NC}\n"
else
  echo -e "${RED}✗ Failed to promote to moderator${NC}\n"
  exit 1
fi

echo "5. Verifying new role"
echo "-------------------"
ROLE_RESPONSE=$(curl -s -b $COOKIE_FILE "$API_URL/api/cards/auth/role")
echo "$ROLE_RESPONSE" | jq '.'
CURRENT_ROLE=$(echo "$ROLE_RESPONSE" | jq -r '.role')

if [ "$CURRENT_ROLE" == "moderator" ]; then
  echo -e "${GREEN}✓ Role is now 'moderator'${NC}\n"
else
  echo -e "${RED}✗ Expected role 'moderator', got '$CURRENT_ROLE'${NC}\n"
  exit 1
fi

echo "6. Testing /api/cards/pending WITH moderator role (should succeed)"
echo "-----------------------------------------------------------------"
PENDING_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -b $COOKIE_FILE "$API_URL/api/cards/pending?type=A&limit=5")
HTTP_STATUS=$(echo "$PENDING_RESPONSE" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d':' -f2)
BODY=$(echo "$PENDING_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" == "200" ]; then
  echo -e "${GREEN}✓ Successfully accessed pending cards${NC}"
  echo "$BODY" | jq '.'
else
  echo -e "${RED}✗ Expected 200, got $HTTP_STATUS${NC}"
  echo "$BODY"
  exit 1
fi
echo ""

echo "7. Testing promotion with invalid admin key (should fail)"
echo "--------------------------------------------------------"
# Create new session
rm -f $COOKIE_FILE
COOKIE_FILE=$(mktemp)
INVALID_PROMOTE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -b $COOKIE_FILE -c $COOKIE_FILE -X POST -H "Content-Type: application/json" -d '{"adminKey": "wrong-key"}' "$API_URL/api/cards/auth/promote")
HTTP_STATUS=$(echo "$INVALID_PROMOTE" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d':' -f2)
BODY=$(echo "$INVALID_PROMOTE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" == "403" ]; then
  echo -e "${GREEN}✓ Correctly rejected invalid admin key${NC}"
  echo "$BODY" | jq '.'
else
  echo -e "${RED}✗ Expected 403, got $HTTP_STATUS${NC}"
  echo "$BODY"
  exit 1
fi
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}All authentication tests passed!${NC}"
echo -e "${GREEN}================================${NC}"
