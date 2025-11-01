#!/usr/bin/env bash

# Cards Against Humanity - Card Submission Script
# Supports both single card submission and batch imports

set -e

# Configuration
API_URL="${API_URL:-http://localhost:8080}"
CARDS_ENDPOINT="${API_URL}/api/cards"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Usage information
usage() {
    cat << EOF
Usage: $(basename "$0") [OPTIONS]

Submit cards to the Cards Against Humanity server.

OPTIONS:
    -s, --single TEXT TYPE [NUM_ANSWERS]
        Submit a single card
        TEXT: Card text (quoted string)
        TYPE: Card type (A or Q)
        NUM_ANSWERS: Number of answers (optional, for Q cards only, default: 1)

    -b, --batch FILE
        Submit cards from a batch file (JSON format)

    -u, --url URL
        API base URL (default: http://localhost:8080)

    -h, --help
        Show this help message

EXAMPLES:
    # Submit a single answer card
    $(basename "$0") -s "A really great answer" A

    # Submit a single question card
    $(basename "$0") -s "What is the meaning of ____?" Q 1

    # Submit from batch file
    $(basename "$0") -b example-cards.json

    # Use custom API URL
    $(basename "$0") -u http://example.com -b cards.json

EOF
    exit 0
}

# Print colored message
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Submit a single card
submit_single() {
    local text="$1"
    local card_type="$2"
    local num_answers="${3:-1}"

    if [[ -z "$text" ]]; then
        log_error "Card text is required"
        exit 1
    fi

    if [[ -z "$card_type" ]]; then
        log_error "Card type is required (A or Q)"
        exit 1
    fi

    if [[ ! "$card_type" =~ ^[AQ]$ ]]; then
        log_error "Card type must be 'A' or 'Q'"
        exit 1
    fi

    log_info "Submitting card: $text"

    local payload
    if [[ "$card_type" == "Q" ]]; then
        payload=$(jq -n \
            --arg text "$text" \
            --arg cardType "$card_type" \
            --argjson numAnswers "$num_answers" \
            '{text: $text, cardType: $cardType, numAnswers: $numAnswers}')
    else
        payload=$(jq -n \
            --arg text "$text" \
            --arg cardType "$card_type" \
            '{text: $text, cardType: $cardType}')
    fi

    local response
    response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "${CARDS_ENDPOINT}/submit")

    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | sed '$d')

    if [[ "$http_code" == "201" ]]; then
        local card_id=$(echo "$body" | jq -r '.cardId')
        log_info "Card submitted successfully! ID: $card_id"
        echo "$body" | jq '.'
    else
        log_error "Failed to submit card (HTTP $http_code)"
        echo "$body" | jq '.' || echo "$body"
        exit 1
    fi
}

# Submit batch of cards
submit_batch() {
    local file="$1"

    if [[ ! -f "$file" ]]; then
        log_error "File not found: $file"
        exit 1
    fi

    log_info "Loading cards from: $file"

    # Validate JSON
    if ! jq empty "$file" 2>/dev/null; then
        log_error "Invalid JSON in file: $file"
        exit 1
    fi

    # Extract cards array
    local cards=$(jq -c '.cards' "$file")
    local count=$(echo "$cards" | jq 'length')

    log_info "Found $count cards in batch file"

    if [[ "$count" -eq 0 ]]; then
        log_warning "No cards found in file"
        exit 0
    fi

    if [[ "$count" -gt 100 ]]; then
        log_error "Batch size exceeds maximum of 100 cards"
        exit 1
    fi

    local payload=$(jq -c -n --argjson cards "$cards" '{cards: $cards}')

    local response
    response=$(curl -s -w "\n%{http_code}" \
        -X POST \
        -H "Content-Type: application/json" \
        -d "$payload" \
        "${CARDS_ENDPOINT}/batch")

    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | sed '$d')

    if [[ "$http_code" == "201" ]]; then
        local submitted=$(echo "$body" | jq -r '.submitted')
        local failed=$(echo "$body" | jq -r '.failed')

        log_info "Batch submission complete!"
        log_info "Submitted: $submitted cards"

        if [[ "$failed" -gt 0 ]]; then
            log_warning "Failed: $failed cards"
            echo "$body" | jq '.results.failed'
        fi
    else
        log_error "Failed to submit batch (HTTP $http_code)"
        echo "$body" | jq '.' || echo "$body"
        exit 1
    fi
}

# Check dependencies
check_dependencies() {
    if ! command -v jq &> /dev/null; then
        log_error "jq is required but not installed. Install with: brew install jq"
        exit 1
    fi

    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed"
        exit 1
    fi
}

# Main script
main() {
    check_dependencies

    if [[ $# -eq 0 ]]; then
        usage
    fi

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                usage
                ;;
            -u|--url)
                API_URL="$2"
                CARDS_ENDPOINT="${API_URL}/api/cards"
                shift 2
                ;;
            -s|--single)
                submit_single "$2" "$3" "${4:-1}"
                exit 0
                ;;
            -b|--batch)
                submit_batch "$2"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                usage
                ;;
        esac
    done
}

main "$@"
