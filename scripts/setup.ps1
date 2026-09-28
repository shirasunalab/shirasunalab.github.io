Write-Host "Starting project setup..."

# Enable Corepack (bundled with recent Node versions)
Write-Host "Enabling corepack (for pnpm)..."
try {
    corepack enable
} catch {
    Write-Host "corepack enable failed; continuing..."
}

# Ensure pnpm is available
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found. Installing pnpm globally via npm..."
    npm install -g pnpm
}

Write-Host "Installing dependencies with pnpm... (this may take a while)"
pnpm install

Write-Host "Setup complete. Start the dev server with: pnpm dev"