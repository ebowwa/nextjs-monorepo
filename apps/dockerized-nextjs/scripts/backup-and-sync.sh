#!/bin/bash

# backup-and-sync.sh
# Purpose: Backup current work and sync with git repository
# Usage: ./backup-and-sync.sh [commit_message]
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

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not a git repository. Please run this script from the root of a git repository."
        exit 1
    fi
}

# Function to create backup
create_backup() {
    local backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
    local exclude_file=".backupignore"
    
    # Create exclude patterns if they don't exist
    if [ ! -f "$exclude_file" ]; then
        cat > "$exclude_file" <<EOF
.git
node_modules
.next
backup_*
EOF
    fi
    
    # Create backup directory
    mkdir -p "../$backup_dir"
    
    # Create backup using rsync
    rsync -av --exclude-from="$exclude_file" ./ "../$backup_dir/"
    log_info "Backup created at ../$backup_dir"
}

# Function to stage and commit changes
commit_changes() {
    local commit_message="$1"
    local current_branch=$(git branch --show-current)
    
    # Stage all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        log_warn "No changes to commit"
        return 0
    fi
    
    # Commit changes
    git commit -m "$commit_message"
    log_info "Changes committed to branch: $current_branch"
}

# Function to sync with remote
sync_with_remote() {
    local current_branch=$(git branch --show-current)
    
    # Pull latest changes
    log_info "Pulling latest changes..."
    git pull origin "$current_branch" || {
        log_error "Failed to pull changes. Please resolve conflicts manually."
        exit 1
    }
    
    # Push changes
    log_info "Pushing changes..."
    git push origin "$current_branch" || {
        log_error "Failed to push changes. Please check your remote repository access."
        exit 1
    }
}

# Main execution
main() {
    local commit_message="${1:-Auto-backup $(date +%Y-%m-%d_%H-%M-%S)}"
    
    # Check if we're in a git repository
    check_git_repo
    
    # Create backup
    log_info "Creating backup..."
    create_backup
    
    # Commit changes
    log_info "Committing changes..."
    commit_changes "$commit_message"
    
    # Sync with remote
    log_info "Syncing with remote..."
    sync_with_remote
    
    log_info "Backup and sync completed successfully!"
}

# Execute main function with all arguments
main "$@"
