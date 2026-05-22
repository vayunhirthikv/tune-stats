# TuneStats local setup helper (Windows PowerShell)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "`n=== TuneStats Local Setup ===`n" -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example — edit it before continuing.`n" -ForegroundColor Yellow
}

$envContent = Get-Content ".env" -Raw
if ($envContent -match "REPLACE_WITH_YOUR_SPOTIFY") {
  Write-Host "ACTION REQUIRED: Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env" -ForegroundColor Yellow
  Write-Host "  1. https://developer.spotify.com/dashboard" -ForegroundColor Gray
  Write-Host "  2. Create app -> Settings -> Redirect URI:" -ForegroundColor Gray
  Write-Host "     http://localhost:3000/api/auth/callback/spotify`n" -ForegroundColor Gray
}

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing npm packages..." -ForegroundColor Cyan
  npm install
}

Write-Host "Pushing Prisma schema to database..." -ForegroundColor Cyan
npx prisma db push

if ($LASTEXITCODE -ne 0) {
  Write-Host "`nDatabase connection failed." -ForegroundColor Red
  Write-Host "Use ONE of these options:" -ForegroundColor Yellow
  Write-Host "  A) Docker:  docker compose up -d   (then re-run this script)" -ForegroundColor Gray
  Write-Host "  B) Neon:    https://neon.tech -> free DB -> paste DATABASE_URL in .env" -ForegroundColor Gray
  exit 1
}

Write-Host "`nSetup OK. Starting dev server at http://localhost:3000`n" -ForegroundColor Green
npm run dev
