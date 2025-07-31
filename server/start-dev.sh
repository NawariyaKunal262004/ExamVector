#!/bin/bash

# Start Redis if not running
redis_running=$(docker ps | grep redis)
if [ -z "$redis_running" ]; then
  echo "Starting Redis container..."
  docker run --name redis -p 6379:6379 -d redis:alpine
else
  echo "Redis is already running"
fi

# Start the development server
echo "Starting ExamVector API server..."
npm run dev