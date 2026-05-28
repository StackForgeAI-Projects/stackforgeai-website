#!/usr/bin/env bash
# Pin this repository to the StackForgeAI GitHub identity (not personal/DevStars configs).
#
# Usage (run once per clone):
#   ./scripts/setup-git-identity.sh
#
# Commits will appear as stackforgeai on GitHub when using the noreply email below.
# Optional: add hello@stackforgeai.africa to github.com/stackforgeai → Settings → Emails
# and switch GIT_AUTHOR_EMAIL in this script after verification.

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

GIT_AUTHOR_NAME="StackForgeAI"
# Links commits to https://github.com/stackforgeai (user id 283279871)
GIT_AUTHOR_EMAIL="283279871+stackforgeai@users.noreply.github.com"

git config --local user.name "${GIT_AUTHOR_NAME}"
git config --local user.email "${GIT_AUTHOR_EMAIL}"

echo "✓ Repository git identity set:"
git config --local --get user.name
git config --local --get user.email
echo ""
echo "Future commits from this clone will attribute to @stackforgeai on GitHub."
echo "Past commits keep their original author (history is not rewritten)."
