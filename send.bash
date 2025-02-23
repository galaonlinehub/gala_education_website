#!/bin/bash

branch_name=$(git rev-parse --abbrev-ref HEAD)

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to commit."
  exit 0
fi

git add --all

read -p "Enter commit message: " commit_message

git commit -m "$commit_message"

git push origin "$branch_name"

echo "Changes pushed to the '$branch_name' branch."
