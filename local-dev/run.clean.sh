#!/bin/bash

# ============================================
# Clean Development Environment Script
# ============================================
# Removes all containers, volumes, and networks

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

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_warning "This will remove all containers, volumes, and networks!"
log_warning "All data in development databases will be lost."
echo ""
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "Cleanup cancelled"
    exit 0
fi

log_info "Cleaning development environment..."

# Stop and remove frontend
if docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
    log_info "Removing frontend services..."
    docker compose -f "$FRONTEND_DIR/docker-compose.yml" down -v --remove-orphans
    log_success "Frontend cleaned"
fi

# Stop and remove backend
if docker compose -f "$BACKEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
    log_info "Removing backend services..."
    docker compose -f "$BACKEND_DIR/docker-compose.yml" down -v --remove-orphans
    log_success "Backend cleaned"
fi

# Optional: Remove dangling images
log_info "Removing dangling Docker images..."
docker image prune -f

log_success "Development environment cleaned successfully! 🧹"
log_info "Run ./local-dev/run.dev.sh to start fresh"
