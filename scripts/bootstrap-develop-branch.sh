#!/usr/bin/env bash
# Create and push the integration branch if it does not exist yet.
#
# Usage:
#   ./scripts/bootstrap-develop-branch.sh

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if git show-ref --verify --quiet refs/remotes/origin/develop; then
  echo "origin/develop already exists."
  git fetch origin develop
  exit 0
fi

echo "→ Creating develop from main…"
git fetch origin main
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop
echo "✓ develop pushed. Open PRs against develop for features; promote develop → main for releases."
