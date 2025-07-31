#!/bin/bash

# ExamVector Monitoring Script
# This script monitors Redis cache and API performance

set -e

echo "ExamVector Monitoring Tool"
echo "========================"
echo ""

# Check if Redis is running
redis_running=$(docker ps | grep redis)
if [ -z "$redis_running" ]; then
    echo "Error: Redis container is not running. Please start it first."
    exit 1
fi

# Function to monitor Redis info
monitor_redis() {
    echo "Monitoring Redis Cache..."
    
    # Get Redis stats
    redis_info=$(docker exec redis redis-cli info)
    
    # Extract key metrics
    connected_clients=$(echo "$redis_info" | grep connected_clients | cut -d ':' -f2 | tr -d '\r')
    used_memory=$(echo "$redis_info" | grep used_memory_human | cut -d ':' -f2 | tr -d '\r')
    keyspace_hits=$(echo "$redis_info" | grep keyspace_hits | cut -d ':' -f2 | tr -d '\r')
    keyspace_misses=$(echo "$redis_info" | grep keyspace_misses | cut -d ':' -f2 | tr -d '\r')
    
    # Calculate hit rate
    hit_rate=0
    if [ "$keyspace_hits" -gt 0 ] || [ "$keyspace_misses" -gt 0 ]; then
        total=$((keyspace_hits + keyspace_misses))
        hit_rate=$(echo "scale=2; ($keyspace_hits / $total) * 100" | bc)
    fi
    
    # Display metrics
    echo -e "\nRedis Cache Statistics:"
    echo "---------------------"
    echo "Connected Clients: $connected_clients"
    echo "Memory Used: $used_memory"
    echo "Cache Hit Rate: ${hit_rate}%"
    echo "Total Cache Hits: $keyspace_hits"
    echo "Total Cache Misses: $keyspace_misses"
    
    # Get key statistics
    echo -e "\nCache Keys:"
    echo "-----------"
    db_size=$(docker exec redis redis-cli dbsize)
    echo "Total Keys: $db_size"
    
    # Sample some keys
    echo -e "\nSample Cache Keys:"
    echo "-----------------"
    docker exec redis redis-cli --scan --pattern "cache:*" | head -n 5 | while read -r key; do
        echo "- $key"
    done
}

# Function to check API health
check_api_health() {
    echo -e "\nChecking API Health..."
    
    # Try to get health status
    if response=$(curl -s -m 5 http://localhost/health); then
        if echo "$response" | grep -q '"status":"ok"'; then
            echo -n "API Status: "
            echo -e "\e[32mHEALTHY\e[0m"
        else
            echo -n "API Status: "
            echo -e "\e[33mWARNING\e[0m"
        fi
    else
        echo -n "API Status: "
        echo -e "\e[31mUNHEALTHY\e[0m"
        echo "Error: Could not connect to API"
    fi
    
    # Check running containers
    echo -e "\nRunning Containers:"
    echo "-----------------"
    docker-compose ps
}

# Main monitoring loop
start_monitoring() {
    while true; do
        clear
        echo "ExamVector Monitoring Tool"
        echo "========================"
        echo "Press Ctrl+C to exit"
        echo ""
        
        date=$(date '+%Y-%m-%d %H:%M:%S')
        echo "Last Updated: $date"
        
        monitor_redis
        check_api_health
        
        echo -e "\nRefreshing in 10 seconds..."
        sleep 10
    done
}

# Start monitoring
trap "echo -e '\nMonitoring stopped'; exit 0" INT
start_monitoring