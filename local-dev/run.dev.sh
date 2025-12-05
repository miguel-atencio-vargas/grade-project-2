#!/bin/bash

# ============================================
# Development Environment Setup Script
# ============================================
# ONLY FOR LOCAL DEV ENV

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go up one level since we're now in local-dev/
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# ============================================
# Helper Functions
# ============================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Cleanup function
cleanup() {
    log_warning "Shutting down services..."
    
    # Stop frontend services
    if docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
        log_info "Stopping frontend services..."
        docker compose -f "$FRONTEND_DIR/docker-compose.yml" down
    fi
    
    # Stop backend services
    if docker compose -f "$BACKEND_DIR/docker-compose.yml" ps --quiet 2>/dev/null | grep -q .; then
        log_info "Stopping backend services..."
        docker compose -f "$BACKEND_DIR/docker-compose.yml" down
    fi
    
    log_success "Cleanup completed"
    exit 0
}

# Trap Ctrl+C and other termination signals
trap cleanup SIGINT SIGTERM

# ============================================
# Pre-flight Checks
# ============================================

log_info "Running pre-flight checks..."

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running. Please start Docker."
    exit 1
fi

# Check if docker-compose is available
if ! docker compose version &> /dev/null; then
    log_error "Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

log_success "Pre-flight checks passed"

# ============================================
# Environment Setup
# ============================================

log_info "Setting up environment files..."

# Backend .env setup
if [ ! -f "$BACKEND_DIR/.env" ]; then
    if [ -f "$BACKEND_DIR/.env.example" ]; then
        cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
        log_success "Created backend/.env from .env.example"
    else
        log_warning "backend/.env.example not found, skipping..."
    fi
else
    log_info "backend/.env already exists, skipping copy"
fi

# Frontend .env setup
if [ ! -f "$FRONTEND_DIR/.env" ]; then
    if [ -f "$FRONTEND_DIR/.env.example" ]; then
        cp "$FRONTEND_DIR/.env.example" "$FRONTEND_DIR/.env"
        log_success "Created frontend/.env from .env.example"
    else
        log_warning "frontend/.env.example not found, skipping..."
    fi
else
    log_info "frontend/.env already exists, skipping copy"
fi

# ============================================
# Backend Services
# ============================================

log_info "Starting backend services (cache, database, api)..."

# Parse command line arguments
REBUILD=false
if [[ "$1" == "--rebuild" ]] || [[ "$1" == "-r" ]]; then
    REBUILD=true
    log_info "Rebuild flag detected, will rebuild containers..."
fi

# Start backend services
if [ "$REBUILD" = true ]; then
    docker compose -f "$BACKEND_DIR/docker-compose.yml" up -d --build
else
    docker compose -f "$BACKEND_DIR/docker-compose.yml" up -d
fi

# Wait for backend services to be healthy
log_info "Waiting for backend services to be ready..."
sleep 3

# Check if backend containers are running
BACKEND_CONTAINERS=$(docker compose -f "$BACKEND_DIR/docker-compose.yml" ps --services --filter "status=running")

if [ -z "$BACKEND_CONTAINERS" ]; then
    log_error "Backend services failed to start"
    log_info "Checking container logs..."
    docker compose -f "$BACKEND_DIR/docker-compose.yml" logs --tail=50
    cleanup
    exit 1
fi

log_success "Backend services are running:"
echo "$BACKEND_CONTAINERS" | while read -r service; do
    echo "  ✓ $service"
done

# Additional health check for API service
log_info "Performing health check on backend services..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    API_STATUS=$(docker compose -f "$BACKEND_DIR/docker-compose.yml" ps api --format json 2>/dev/null | grep -o '"State":"[^"]*"' | cut -d'"' -f4 || echo "unknown")
    
    if [ "$API_STATUS" = "running" ]; then
        log_success "Backend API is healthy"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
        log_error "Backend API failed to become healthy after $MAX_RETRIES attempts"
        log_info "API logs:"
        docker compose -f "$BACKEND_DIR/docker-compose.yml" logs api --tail=30
        cleanup
        exit 1
    fi
    
    sleep 1
done

# ============================================
# Frontend Services
# ============================================

log_info "Starting frontend services..."

# Start frontend services
if [ "$REBUILD" = true ]; then
    docker compose -f "$FRONTEND_DIR/docker-compose.yml" up -d --build
else
    docker compose -f "$FRONTEND_DIR/docker-compose.yml" up -d
fi

# Wait for frontend to start
sleep 2

# Check if frontend is running
FRONTEND_STATUS=$(docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps --services --filter "status=running")

if [ -z "$FRONTEND_STATUS" ]; then
    log_error "Frontend services failed to start"
    log_info "Checking frontend logs..."
    docker compose -f "$FRONTEND_DIR/docker-compose.yml" logs --tail=50
    cleanup
    exit 1
fi

log_success "Frontend services are running"

# ============================================
# Final Status
# ============================================

echo ""
log_success "========================================="
log_success "Development environment is ready! 🚀"
log_success "========================================="
echo ""

log_info "Running services:"
echo ""
echo "Backend Services:"
docker compose -f "$BACKEND_DIR/docker-compose.yml" ps
echo ""
echo "Frontend Services:"
docker compose -f "$FRONTEND_DIR/docker-compose.yml" ps
echo ""

log_info "To view logs, run:"
echo "  Backend:  ./local-dev/run.logs.sh backend
echo "  Frontend: ./local-dev/run.logs.sh frontend
echo ""

log_info "To stop all services, run:"
echo "  ./run.dev.sh (and press Ctrl+C)"
echo "  OR manually: docker compose -f ./backend/docker-compose.yml down && docker compose -f ./frontend/docker-compose.yml down"
echo ""

log_warning "Press Ctrl+C to stop all services and exit..."

# Keep script running and follow frontend logs
docker compose -f "$FRONTEND_DIR/docker-compose.yml" logs -f
