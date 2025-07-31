# Start Redis if not running
$redisRunning = docker ps | Select-String -Pattern "redis"
if (-not $redisRunning) {
    Write-Host "Starting Redis container..."
    docker run --name redis -p 6379:6379 -d redis:alpine
} else {
    Write-Host "Redis is already running"
}

# Check if port 5000 is in use and kill the process if needed
$portUsed = netstat -ano | Select-String ":5000"
if ($portUsed) {
    $pid = ($portUsed -split "\s+")[-1]
    Write-Host "Port 5000 is in use by PID $pid. Killing process..."
    Stop-Process -Id $pid -Force
    Start-Sleep -Seconds 2
}

# Start the development server
Write-Host "Starting ExamVector API server..."
npm run dev