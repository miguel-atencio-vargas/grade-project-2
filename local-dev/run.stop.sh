#!/bin/bash

# ============================================
# Stop Development Environment Script
# ============================================

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_info "Stopping all development services..."

# Stop frontend
if docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
    log_info "Stopping frontend services..."
    docker compose -f "$FRONTEND_DIR/docker-compose.yml" down
    log_success "Frontend services stopped"
else
    log_info "Frontend services not running"
fi

# Stop backend
if docker compose -f "$BACKEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
    log_info "Stopping backend services..."
    docker compose -f "$BACKEND_DIR/docker-compose.yml" down
    log_success "Backend services stopped"
else
    log_info "Backend services not running"
fi

log_success "All services stopped successfully! 🛑"
