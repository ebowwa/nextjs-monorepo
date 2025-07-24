#!/bin/bash

echo "# Next.js Monorepo Apps Summary"
echo
echo "## Apps Directory Contents:"
echo

cd apps

for dir in */; do
  if [ -f "$dir/package.json" ]; then
    name=$(grep '"name"' "$dir/package.json" | head -1 | sed 's/.*"name": "\(.*\)".*/\1/')
    version=$(grep '"version"' "$dir/package.json" | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
    
    echo "### $dir"
    echo "- Package name: $name"
    echo "- Version: $version"
    
    # Check for key technologies
    if grep -q '"@stripe/stripe-js"' "$dir/package.json" 2>/dev/null; then
      echo "- Features: Stripe integration"
    fi
    if grep -q '"@supabase/supabase-js"' "$dir/package.json" 2>/dev/null; then
      echo "- Features: Supabase integration"
    fi
    if grep -q '"@solana/web3.js"' "$dir/package.json" 2>/dev/null; then
      echo "- Features: Solana integration"
    fi
    if grep -q '"three"' "$dir/package.json" 2>/dev/null; then
      echo "- Features: Three.js/3D graphics"
    fi
    
    # Check README
    if [ -f "$dir/README.md" ]; then
      description=$(head -n 5 "$dir/README.md" | grep -v "^#" | grep -v "^$" | head -1)
      if [ -n "$description" ]; then
        echo "- Description: $description"
      fi
    fi
    
    echo
  fi
done

echo "## Non-Next.js Projects:"
echo
cd ../non-nextjs 2>/dev/null
if [ $? -eq 0 ]; then
  for dir in */; do
    echo "- $dir"
  done
fi