#!/bin/sh
set -e
cd "$(dirname "$0")"

if command -v rbenv >/dev/null 2>&1; then
  eval "$(rbenv init - sh 2>/dev/null || rbenv init -)"
fi

if ! bundle check >/dev/null 2>&1; then
  echo "Installing gems (first run may take a minute)..."
  bundle install
fi

PORT="${JEKYLL_PORT:-4000}"
if lsof -ti ":$PORT" >/dev/null 2>&1; then
  echo "Stopping existing process on port $PORT..."
  lsof -ti ":$PORT" | xargs kill 2>/dev/null || true
  sleep 1
fi

exec bundle exec jekyll serve \
  --verbose \
  --livereload false \
  --port "$PORT" \
  "$@"
