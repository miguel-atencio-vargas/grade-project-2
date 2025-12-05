#!/bin/bash

# ============================================
# Development Environment Status Script
# ============================================

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

echo ""
echo -e "${CYAN}=========================================${NC}"
echo -e "${CYAN}  Development Environment Status${NC}"
echo -e "${CYAN}=========================================${NC}"
echo ""

# Check Docker
log_info "Checking Docker..."
if command -v docker &> /dev/null; then
    log_success "Docker is installed"
    if docker info &> /dev/null; then
        log_success "Docker daemon is running"
        DOCKER_VERSION=$(docker --version | cut -d ' ' -f3 | tr -d ',')
        echo "  Version: $DOCKER_VERSION"
    else
        log_error "Docker daemon is not running"
    fi
else
    log_error "Docker is not installed"
fi

echo ""

# Check Docker Compose
log_info "Checking Docker Compose..."
if docker compose version &> /dev/null; then
    log_success "Docker Compose is available"
    COMPOSE_VERSION=$(docker compose version --short)
    echo "  Version: $COMPOSE_VERSION"
else
    log_error "Docker Compose is not available"
fi

echo ""

# Check environment files
log_info "Checking environment files..."

if [ -f "$BACKEND_DIR/.env" ]; then
    log_success "Backend .env exists"
else
    log_warning "Backend .env missing (will be created on first run)"
fi

if [ -f "$FRONTEND_DIR/.env" ]; then
    log_success "Frontend .env exists"
else
    log_warning "Frontend .env missing (will be created on first run)"
fi

echo ""

# Check backend services
log_info "Checking backend services..."
BACKEND_RUNNING=$(docker compose -f "$BACKEND_DIR/docker-compose.yml" ps --services --filter "status=running" 2>/dev/null || echo "")

if [ -z "$BACKEND_RUNNING" ]; then
    log_warning "No backend services running"
else
    log_success "Backend services running:"
    echo "$BACKEND_RUNNING" | while read -r service; do
        STATUS=$(docker compose -f "$BACKEND_DIR/docker-compose.yml" ps "$service" --format "{{.Status}}" 2>/dev/null)
        echo "  • $service: $STATUS"
    done
fi

echo ""

# Check frontend services
log_info "Checking frontend services..."
FRONTEND_RUNNING=$(docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps --services --filter "status=running" 2>/dev/null || echo "")

if [ -z "$FRONTEND_RUNNING" ]; then
    log_warning "No frontend services running"
else
    log_success "Frontend services running:"
    echo "$FRONTEND_RUNNING" | while read -r service; do
        STATUS=$(docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps "$service" --format "{{.Status}}" 2>/dev/null)
        echo "  • $service: $STATUS"
    done
fi

echo ""

# Check ports (if services are running)
if [ ! -z "$BACKEND_RUNNING" ] || [ ! -z "$FRONTEND_RUNNING" ]; then
    log_info "Service endpoints:"
    
    # Try to read ports from .env files
    if [ -f "$BACKEND_DIR/.env" ]; then
        API_PORT=$(grep "^API_PORT=" "$BACKEND_DIR/.env" 2>/dev/null | cut -d '=' -f2)
        if [ ! -z "$API_PORT" ]; then
            echo "  • Backend API: http://localhost:$API_PORT"
        fi
    fi
    
    if [ -f "$FRONTEND_DIR/.env" ]; then
        FRONTEND_PORT=$(grep "^FRONTEND_PORT=" "$FRONTEND_DIR/.env" 2>/dev/null | cut -d '=' -f2)
        if [ ! -z "$FRONTEND_PORT" ]; then
            echo "  • Frontend: http://localhost:$FRONTEND_PORT"
        fi
    fi
    
    echo ""
fi

# Summary
echo -e "${CYAN}=========================================${NC}"
echo -e "${CYAN}  Quick Actions${NC}"
echo -e "${CYAN}=========================================${NC}"
echo ""

if [ -z "$BACKEND_RUNNING" ] && [ -z "$FRONTEND_RUNNING" ]; then
    echo "  Start services:  ./local-dev/run.dev.sh"
else
    echo "  View logs:       ./local-dev/run.logs.sh"
    echo "  Stop services:   ./local-dev/run.stop.sh"
    echo "  Restart:         ./local-dev/run.stop.sh && ./local-dev/run.dev.sh"
fi

echo "  Clean & rebuild: ./local-dev/run.clean.sh && ./local-dev/run.dev.sh --rebuild"
echo ""
