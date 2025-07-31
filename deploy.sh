#!/bin/bash

# ExamVector Deployment Script
# This script deploys the ExamVector platform with Redis caching and load balancing

echo "ExamVector Deployment Script"
echo "============================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Function to display a spinner while waiting
function spinner {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# Build and deploy
echo "Building and deploying ExamVector platform..."

# Build the Docker images
echo "Building Docker images..."
docker-compose build &
spinner $!

# Start the containers
echo "Starting containers..."
docker-compose up -d

# Check if containers are running
echo "Checking container status..."
sleep 5
running_containers=$(docker-compose ps --services --filter "status=running" | wc -l)
total_containers=$(docker-compose ps --services | wc -l)

if [ "$running_containers" -eq "$total_containers" ]; then
    echo "All containers are running successfully!"
else
    echo "Warning: Some containers may not be running. Please check 'docker-compose ps' for details."
fi

# Display access information
echo ""
echo "Deployment Complete!"
echo "-------------------"
echo "Frontend: http://localhost"
echo "API: http://localhost/api"
echo "Health Check: http://localhost/health"
echo ""
echo "To scale API servers:"
echo "  docker-compose up -d --scale api=6"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the application:"
echo "  docker-compose down"
echo ""