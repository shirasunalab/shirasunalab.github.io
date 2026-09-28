# Generate a 32-byte (64 hex chars) random secret for ADMIN_SECRET
$bytes = New-Object 'System.Byte[]' 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$hex = -join ($bytes | ForEach-Object { $_.ToString('x2') })
Write-Output $hex

# Usage: powershell -ExecutionPolicy Bypass -File .\scripts\generate_admin_secret.ps1
