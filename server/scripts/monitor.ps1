# ExamVector Monitoring Script for Windows
# This script monitors Redis cache and API performance

$ErrorActionPreference = "Stop"

Write-Host "ExamVector Monitoring Tool" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Check if Redis is running
$redisRunning = docker ps | Select-String -Pattern "redis"
if (-not $redisRunning) {
    Write-Host "Error: Redis container is not running. Please start it first." -ForegroundColor Red
    exit 1
}

# Function to monitor Redis info
function Monitor-Redis {
    Write-Host "Monitoring Redis Cache..." -ForegroundColor Yellow
    
    # Get Redis stats
    $redisInfo = docker exec redis redis-cli info | Out-String
    
    # Extract key metrics
    $connectedClients = ($redisInfo | Select-String -Pattern "connected_clients:(\d+)").Matches.Groups[1].Value
    $usedMemory = ($redisInfo | Select-String -Pattern "used_memory_human:([\w\.]+)").Matches.Groups[1].Value
    $hitRate = 0
    $keyspaceHits = ($redisInfo | Select-String -Pattern "keyspace_hits:(\d+)").Matches.Groups[1].Value
    $keyspaceMisses = ($redisInfo | Select-String -Pattern "keyspace_misses:(\d+)").Matches.Groups[1].Value
    
    if ([int]$keyspaceHits -gt 0 -or [int]$keyspaceMisses -gt 0) {
        $hitRate = [math]::Round(([int]$keyspaceHits / ([int]$keyspaceHits + [int]$keyspaceMisses) * 100), 2)
    }
    
    # Display metrics
    Write-Host "\nRedis Cache Statistics:" -ForegroundColor Green
    Write-Host "---------------------"
    Write-Host "Connected Clients: $connectedClients"
    Write-Host "Memory Used: $usedMemory"
    Write-Host "Cache Hit Rate: $hitRate%"
    Write-Host "Total Cache Hits: $keyspaceHits"
    Write-Host "Total Cache Misses: $keyspaceMisses"
    
    # Get key statistics
    Write-Host "\nCache Keys:" -ForegroundColor Green
    Write-Host "-----------"
    $dbSize = docker exec redis redis-cli dbsize | Out-String
    Write-Host "Total Keys: $dbSize"
    
    # Sample some keys
    Write-Host "\nSample Cache Keys:" -ForegroundColor Green
    Write-Host "-----------------"
    docker exec redis redis-cli --scan --pattern "cache:*" | Select-Object -First 5 | ForEach-Object {
        Write-Host "- $_"
    }
}

# Function to check API health
function Check-ApiHealth {
    Write-Host "\nChecking API Health..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost/health" -Method Get -TimeoutSec 5
        
        if ($response.status -eq "ok") {
            Write-Host "API Status: " -NoNewline
            Write-Host "HEALTHY" -ForegroundColor Green
        } else {
            Write-Host "API Status: " -NoNewline
            Write-Host "WARNING" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "API Status: " -NoNewline
        Write-Host "UNHEALTHY" -ForegroundColor Red
        Write-Host "Error: $_"
    }
    
    # Check running containers
    Write-Host "\nRunning Containers:" -ForegroundColor Green
    Write-Host "-----------------"
    docker-compose ps
}

# Main monitoring loop
function Start-Monitoring {
    while ($true) {
        Clear-Host
        Write-Host "ExamVector Monitoring Tool" -ForegroundColor Cyan
        Write-Host "========================" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to exit" -ForegroundColor DarkGray
        Write-Host ""
        
        $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "Last Updated: $date" -ForegroundColor DarkGray
        
        Monitor-Redis
        Check-ApiHealth
        
        Write-Host "\nRefreshing in 10 seconds..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 10
    }
}

# Start monitoring
try {
    Start-Monitoring
} catch {
    Write-Host "\nMonitoring stopped: $_" -ForegroundColor Red
}