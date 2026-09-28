param()

function Get-PythonCmd {
    foreach ($cmd in @("python", "python3", "py")) {
        try {
            $ver = & $cmd -V 2>&1
            if ($LASTEXITCODE -eq 0 -or $ver) { return $cmd }
        } catch { }
    }
    return $null
}

Write-Host "--- Environment Info (project) ---"

$pythonCmd = Get-PythonCmd
if ($null -ne $env:VIRTUAL_ENV) {
    Write-Host "Virtualenv: $env:VIRTUAL_ENV"
} elseif ($null -ne $env:CONDA_PREFIX) {
    Write-Host "Conda env: $env:CONDA_PREFIX"
} elseif (Test-Path .\.venv -PathType Container) {
    Write-Host "Found local venv directory: .\.venv"
    Write-Host "Activate with: .\\.venv\\Scripts\\Activate.ps1"
} elseif (Test-Path .\venv -PathType Container) {
    Write-Host "Found local venv directory: .\\venv"
    Write-Host "Activate with: .\\venv\\Scripts\\Activate.ps1"
} else {
    Write-Host "No active Python virtual environment detected."
}

if ($pythonCmd) {
    try {
        & $pythonCmd -c "import sys,platform; print('Python:', sys.version.splitlines()[0]); print('Prefix:', sys.prefix)"
    } catch {
        Write-Host "Failed to query python details with $pythonCmd"
    }
} else {
    Write-Host "Python not found on PATH."
}

Write-Host ""
Write-Host "--- Helpful commands ---"
Write-Host "Activate local venv (PowerShell): .\\.venv\\Scripts\\Activate.ps1"
Write-Host "Create venv: python -m venv .venv"
