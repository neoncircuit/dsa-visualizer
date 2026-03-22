#!/usr/bin/env bash
set -euo pipefail

echo "=== DSA Visualizer Setup ==="

# ── Node.js ──

NODE_MIN_VERSION=18

if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing via nvm..."

    if ! command -v nvm &> /dev/null; then
        echo "nvm not found. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

        export NVM_DIR="${HOME}/.nvm"
        # shellcheck source=/dev/null
        [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
    fi

    nvm install --lts
    nvm use --lts
    echo "Node.js $(node --version) installed."
else
    CURRENT_NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
    if [ "${CURRENT_NODE_VERSION}" -lt "${NODE_MIN_VERSION}" ]; then
        echo "Node.js v${CURRENT_NODE_VERSION} found but v${NODE_MIN_VERSION}+ required."
        echo "Upgrading via nvm..."

        if ! command -v nvm &> /dev/null; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
            export NVM_DIR="${HOME}/.nvm"
            # shellcheck source=/dev/null
            [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
        fi

        nvm install --lts
        nvm use --lts
        echo "Node.js upgraded to $(node --version)."
    else
        echo "Node.js $(node --version) found."
    fi
fi

# ── pnpm ──

if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found. Installing..."

    if command -v corepack &> /dev/null; then
        corepack enable
        corepack prepare pnpm@latest --activate
    else
        echo "corepack not available. Installing pnpm via npm..."
        npm install -g pnpm
    fi

    echo "pnpm $(pnpm --version) installed."
else
    echo "pnpm $(pnpm --version) found."
fi

# ── Dependencies ──

echo "Installing/updating project dependencies..."
pnpm install

# Verify critical dependencies are present
if [ ! -d "node_modules/vite" ]; then
    echo "Vite not found after install. Forcing reinstall..."
    rm -rf node_modules pnpm-lock.yaml
    pnpm install
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Development server:"
echo ""
echo "  pnpm dev"
echo ""
echo "Production build:"
echo ""
echo "  pnpm build && pnpm preview"
echo ""
echo "Docker:"
echo ""
echo "  docker compose up --build"
echo ""
