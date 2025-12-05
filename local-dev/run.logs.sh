#!/bin/bash

# ============================================
# View Development Logs Script
# ============================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# Color codes
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Default to showing all logs
SERVICE=${1:-all}

case $SERVICE in
    backend)
        log_info "Showing backend logs (Ctrl+C to exit)..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs -f
        ;;
    frontend)
        log_info "Showing frontend logs (Ctrl+C to exit)..."
        docker compose -f "$FRONTEND_DIR/docker-compose.yml" logs -f
        ;;
    api)
        log_info "Showing API logs (Ctrl+C to exit)..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs -f api
        ;;
    cache)
        log_info "Showing cache logs (Ctrl+C to exit)..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs -f cache
        ;;
    database)
        log_info "Showing database logs (Ctrl+C to exit)..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs -f database
        ;;
    all|*)
        log_info "Showing all logs (Ctrl+C to exit)..."
        echo ""
        echo "=== BACKEND LOGS ==="
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs --tail=20
        echo ""
        echo "=== FRONTEND LOGS ==="
        docker compose -f "$FRONTEND_DIR/docker-compose.yml" logs --tail=20
        echo ""
        log_info "Following all logs..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs -f &
        docker compose -f "$FRONTEND_DIR/docker-compose.yml" logs -f
        ;;
esac
