#!/usr/bin/env bash
# Configure GitHub branch protection for StackForgeAI website.
# Requires: gh CLI (https://cli.github.com/) authenticated as stackforgeai (admin).
#
# Usage:
#   ./scripts/configure-branch-protection.sh
#   ./scripts/configure-branch-protection.sh StackForgeAI-Projects/stackforgeai-website

set -euo pipefail

REPO="${1:-StackForgeAI-Projects/stackforgeai-website}"
# Only this GitHub user may push/merge to protected branches (StackForge, not DevStars).
ALLOWED_PUSH_USER="stackforgeai"

echo "→ Applying branch protection on ${REPO} (main + develop)…"
echo "  Push/merge restricted to: ${ALLOWED_PUSH_USER}"

apply_protection() {
  local branch="$1"
  gh api "repos/${REPO}/branches/${branch}/protection" -X PUT --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Lint · Typecheck · Test",
      "Build"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": true
  },
  "restrictions": {
    "users": ["${ALLOWED_PUSH_USER}"],
    "teams": [],
    "apps": []
  },
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true
}
EOF
  echo "✓ ${branch} protected"
}

apply_protection main
apply_protection develop

echo ""
echo "Done. Verify in GitHub → Settings → Branches."
echo "Only @${ALLOWED_PUSH_USER} can merge to main/develop; use Pull Requests."
