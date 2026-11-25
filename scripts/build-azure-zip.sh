#!/usr/bin/env bash
#
# Builds the site and packages it for an Azure App Service (Linux / Node) test
# deployment. Produces tmp/site.zip, which you upload by hand at:
#
#   https://<app-name>.scm.azurewebsites.net/ZipDeployUI
#
# The web app must have its Startup Command set to `node server.js`
# (Portal -> your app -> Settings -> Configuration -> General settings).
#
# This never touches the gh-pages deployment: it does not run `npm run deploy`,
# and it writes only to gitignored paths (dist/, tmp/).
#
# Usage:
#   ./scripts/build-azure-zip.sh            # build, smoke-test, package
#   ./scripts/build-azure-zip.sh --no-test  # skip the local smoke test
#   ./scripts/build-azure-zip.sh --skip-build   # repackage the existing dist/
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAGE="$ROOT/tmp/azure-deploy"
ZIP="$ROOT/tmp/site.zip"
BUILD_OUTPUT="$ROOT/dist/corporate-website/browser"
TEST_PORT="${TEST_PORT:-8123}"

run_test=true
skip_build=false
for arg in "$@"; do
  case "$arg" in
    --no-test) run_test=false ;;
    --test) run_test=true ;;   # accepted for compatibility; now the default
    --skip-build) skip_build=true ;;
    -h|--help) sed -n '2,20p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown option: $arg" >&2; exit 1 ;;
  esac
done

cd "$ROOT"

if [ "$skip_build" = false ]; then
  echo "==> Building"
  npm run build
  node scripts/inject-og.mjs
fi

[ -d "$BUILD_OUTPUT" ] || { echo "missing $BUILD_OUTPUT — run without --skip-build" >&2; exit 1; }

echo "==> Staging"
rm -rf "$STAGE" "$ZIP"
mkdir -p "$STAGE"
cp -r "$BUILD_OUTPUT" "$STAGE/browser"

# CNAME is a GitHub Pages artifact; it has no meaning on Azure.
rm -f "$STAGE/browser/CNAME"

cat > "$STAGE/server.js" <<'EOF'
const express = require('express');
const path = require('path');

const app = express();
const root = path.join(__dirname, 'browser');

// Serve the prerendered site: each route has its own index.html.
app.use(express.static(root, { maxAge: '1h' }));

// Anything not prerendered falls back to the app shell for client-side routing.
app.use((_req, res) => res.sendFile(path.join(root, 'index.html')));

app.listen(process.env.PORT || 8080);
EOF

# Azure installs these deps itself, so node_modules is deliberately not shipped.
cat > "$STAGE/package.json" <<'EOF'
{
  "name": "careteda-site",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": { "express": "^5.1.0" }
}
EOF

if [ "$run_test" = true ]; then
  echo "==> Smoke testing on port $TEST_PORT"
  ( cd "$STAGE" && npm install --silent --no-audit --no-fund express@^5.1.0 >/dev/null 2>&1 )

  PORT="$TEST_PORT" node "$STAGE/server.js" &
  server_pid=$!
  trap 'kill "$server_pid" 2>/dev/null || true' EXIT
  sleep 2

  failed=0
  for route in / /about /news/dac-2026 /blogs/verilator /blogs/verilator-5-050 /favicon.ico; do
    code="$(curl -sL -o /dev/null -w '%{http_code}' "http://localhost:$TEST_PORT$route" || echo 000)"
    [ "$code" = "200" ] || failed=1
    printf '    %-24s %s\n' "$route" "$code"
  done

  kill "$server_pid" 2>/dev/null || true
  wait "$server_pid" 2>/dev/null || true
  trap - EXIT
  rm -rf "$STAGE/node_modules" "$STAGE/package-lock.json"

  [ "$failed" -eq 0 ] || { echo "smoke test failed" >&2; exit 1; }
fi

echo "==> Packaging"
( cd "$STAGE" && zip -qr "$ZIP" . )

echo
echo "Ready: $ZIP  ($(du -h "$ZIP" | cut -f1))"
echo "Upload at https://<app-name>.scm.azurewebsites.net/ZipDeployUI"
