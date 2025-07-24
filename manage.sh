#!/bin/bash

# Next.js Monorepo Management Script

case "$1" in
  "delete-original-repos")
    echo "⚠️  WARNING: This will delete the original GitHub repositories!"
    echo "The following repos will be deleted:"
    echo
    cat <<EOF
- goldson
- acceleration-blog
- next-client-yolo
- alchemist
- solana_next_example
- resmp.dev
- edesia-next
- giannacollectables
- https-x-workers-bots.vercel.app
- dockerized-nextjs
- app-router-pmndrs-tunnel-example
EOF
    echo
    read -p "Are you ABSOLUTELY sure? Type 'DELETE' to confirm: " confirmation
    
    if [ "$confirmation" = "DELETE" ]; then
      for repo in goldson acceleration-blog next-client-yolo alchemist solana_next_example resmp.dev edesia-next giannacollectables https-x-workers-bots.vercel.app dockerized-nextjs app-router-pmndrs-tunnel-example; do
        echo "Deleting $repo..."
        gh repo delete "ebowwa/$repo" --yes
      done
      echo "✅ All original repositories have been deleted"
    else
      echo "❌ Deletion cancelled"
    fi
    ;;
    
  "push-monorepo")
    echo "Initializing and pushing monorepo to GitHub..."
    cd ~/nextjs-monorepo
    git init
    git add .
    git commit -m "Initial monorepo setup with all Next.js projects"
    gh repo create ebowwa/nextjs-monorepo --public --source=. --remote=origin --push
    echo "✅ Monorepo pushed to GitHub"
    ;;
    
  "dev")
    app=$2
    if [ -z "$app" ]; then
      echo "Running all apps in development mode..."
      npm run dev
    else
      echo "Running $app in development mode..."
      cd "apps/$app" && npm run dev
    fi
    ;;
    
  "build")
    echo "Building all apps..."
    npm run build
    ;;
    
  "summary")
    ./summarize-apps.sh
    ;;
    
  *)
    echo "Next.js Monorepo Management"
    echo
    echo "Usage: ./manage.sh [command]"
    echo
    echo "Commands:"
    echo "  summary              - Show summary of all apps"
    echo "  dev [app-name]       - Run development server (all apps or specific app)"
    echo "  build                - Build all apps"
    echo "  push-monorepo        - Create and push monorepo to GitHub"
    echo "  delete-original-repos - Delete original GitHub repositories (DANGEROUS!)"
    ;;
esac