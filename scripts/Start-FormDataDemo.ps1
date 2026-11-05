param([int]$Port = 5037)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$env:ASPNETCORE_ENVIRONMENT = 'FormDataDemo'
$env:ASPNETCORE_URLS = "http://127.0.0.1:$Port"
$env:ConnectionStrings__defaultConnection = 'Data Source=:memory:'
# Local, stateless demo only. This is not a deployment credential.
$env:JWTSecurity__SecretKey = 'form-data-demo-local-only-not-a-deployment-secret'

dotnet run --project (Join-Path $repoRoot 'API/API.csproj') --no-launch-profile
