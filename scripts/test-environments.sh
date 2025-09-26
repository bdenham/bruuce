#!/bin/bash

echo "🧪 Testing different deployment environments..."

# Test 1: Local environment (no env vars)
echo "📍 Testing LOCAL environment..."
unset GITHUB_PAGES
pnpm build
echo "✅ Local build complete"

# Test 2: GitHub Pages environment
echo "📍 Testing GITHUB_PAGES environment..."
export GITHUB_PAGES=true
pnpm build
echo "✅ GitHub Pages build complete"

# Test 3: Check built files
echo "📍 Checking asset paths in built HTML..."
if grep -r "/bruuce/_astro" dist/ > /dev/null; then
    echo "❌ Found /bruuce/ paths in HTML - this will break on custom domain"
    grep -r "/bruuce/_astro" dist/ | head -3
else
    echo "✅ No /bruuce/ paths found - assets should load correctly"
fi

# Test 4: Preview the build
echo "📍 Starting preview server..."
echo "🌐 Open http://localhost:4321 to test"
pnpm preview
