#!/bin/bash

# dev-setup.sh
# Purpose: Set up development environment with Docker
# Author: Cascade AI
# Date: 2025-01-08

set -euo pipefail

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check required tools
check_requirements() {
    local requirements=(docker docker-compose pnpm node)
    
    for cmd in "${requirements[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            log_error "$cmd is required but not installed."
            exit 1
        fi
    done
}

# Clean up existing containers and volumes
cleanup() {
    log_info "Cleaning up existing containers and volumes..."
    docker-compose down --volumes --remove-orphans || true
}

# Build and start services
start_services() {
    log_info "Building and starting services..."
    docker-compose up --build -d
    
    # Wait for services to be healthy
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose ps | grep -q "healthy"; then
            log_info "Services are healthy!"
            return 0
        fi
        log_info "Waiting for services to be healthy... (Attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
    
    log_error "Services failed to become healthy within the timeout period"
    return 1
}

# Main execution
main() {
    log_info "Starting development environment setup..."
    
    # Check requirements
    check_requirements
    
    # Clean up
    cleanup
    
    # Start services
    start_services
    
    # Show service status
    docker-compose ps
    
    log_info "Development environment is ready!"
    log_info "Access the application at http://localhost:3000"
}

# Execute main function
main "$@"
