# ExamVector Deployment Script for Windows
# This script deploys the ExamVector platform with Redis caching and load balancing

Write-Host "ExamVector Deployment Script"
Write-Host "============================" 
Write-Host ""

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Docker is not installed. Please install Docker and try again." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is installed
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Docker Compose is not installed. Please install Docker Compose and try again." -ForegroundColor Red
    exit 1
}

# Build and deploy
Write-Host "Building and deploying ExamVector platform..." -ForegroundColor Cyan

# Build the Docker images
Write-Host "Building Docker images..." -ForegroundColor Yellow
docker-compose build

# Start the containers
Write-Host "Starting containers..." -ForegroundColor Yellow
docker-compose up -d

# Check if containers are running
Write-Host "Checking container status..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
$runningContainers = (docker-compose ps --services --filter "status=running").Count
$totalContainers = (docker-compose ps --services).Count

if ($runningContainers -eq $totalContainers) {
    Write-Host "All containers are running successfully!" -ForegroundColor Green
} else {
    Write-Host "Warning: Some containers may not be running. Please check 'docker-compose ps' for details." -ForegroundColor Yellow
}

# Display access information
Write-Host ""
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "-------------------"
Write-Host "Frontend: http://localhost" -ForegroundColor Cyan
Write-Host "API: http://localhost/api" -ForegroundColor Cyan
Write-Host "Health Check: http://localhost/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "To scale API servers:" -ForegroundColor Yellow
Write-Host "  docker-compose up -d --scale api=6" -ForegroundColor White
Write-Host ""
Write-Host "To view logs:" -ForegroundColor Yellow
Write-Host "  docker-compose logs -f" -ForegroundColor White
Write-Host ""
Write-Host "To stop the application:" -ForegroundColor Yellow
Write-Host "  docker-compose down" -ForegroundColor White
Write-Host ""