#!/usr/bin/env bash
set -euo pipefail

backup_dir="$(mktemp -d)"

restore_server_files() {
  for path in middleware.ts app/api app/admin; do
    if [ -e "$backup_dir/$path" ]; then
      mkdir -p "$(dirname "$path")"
      mv "$backup_dir/$path" "$path"
    fi
  done
  rm -rf "$backup_dir"
}

trap restore_server_files EXIT

for path in middleware.ts app/api app/admin; do
  if [ -e "$path" ]; then
    mkdir -p "$backup_dir/$(dirname "$path")"
    mv "$path" "$backup_dir/$path"
  fi
done

pnpm exec next build --webpack