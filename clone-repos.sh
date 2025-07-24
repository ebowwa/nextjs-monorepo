#!/bin/bash

# Array of repositories to clone
repos=(
  "unautomated"
  "goldson"
  "printondemand"
  "acceleration-blog"
  "next-client-yolo"
  "alchemist"
  "solana_next_example"
  "resmp.dev"
  "edesia-next"
  "giannacollectables"
  "https-x-workers-bots.vercel.app"
  "dockerized-nextjs"
  "app-router-pmndrs-tunnel-example"
)

# GitHub username
GITHUB_USER="ebowwa"

# Create apps directory if it doesn't exist
mkdir -p apps

# Function to check if local repo exists and has changes
check_local_repo() {
  local repo_name=$1
  local local_paths=(
    "$HOME/apps/$repo_name"
    "$HOME/Documents/$repo_name"
    "$HOME/Desktop/$repo_name"
    "$HOME/Projects/$repo_name"
    "$HOME/dev/$repo_name"
    "$HOME/$repo_name"
  )
  
  for path in "${local_paths[@]}"; do
    if [ -d "$path/.git" ]; then
      echo "Found local repo at: $path"
      cd "$path"
      
      # Check for uncommitted changes
      if ! git diff --quiet || ! git diff --cached --quiet; then
        echo "⚠️  Uncommitted changes found in $path"
        git status --short
      fi
      
      # Check for unpushed commits
      if [ -n "$(git log origin/main..HEAD 2>/dev/null)" ]; then
        echo "⚠️  Unpushed commits found in $path"
        git log origin/main..HEAD --oneline
      fi
      
      return 0
    fi
  done
  
  return 1
}

# Clone each repository
for repo in "${repos[@]}"; do
  echo "Processing: $repo"
  
  # Check if local version exists
  if check_local_repo "$repo"; then
    echo "Local version found. Skipping clone for now."
    echo "TODO: Merge local changes with remote"
  else
    # Clone from GitHub
    cd "$HOME/nextjs-monorepo/apps"
    git clone "https://github.com/$GITHUB_USER/$repo.git" 2>/dev/null
    
    if [ $? -eq 0 ]; then
      echo "✅ Successfully cloned $repo"
    else
      echo "❌ Failed to clone $repo (might not exist on GitHub)"
    fi
  fi
  
  echo "---"
done

echo "Repository check complete!"